import { NextRequest, NextResponse } from "next/server";
import { LinkedinMode } from "@/types";
import { getEventIngredients } from "@/lib/agent/pipeline";
import { buildSystemPrompt, SCOPE_REFUSAL_MESSAGE } from "@/lib/prompts/systemPrompt";
import { generateWithFailover } from "@/lib/llmClient";

const VALID_MODES: LinkedinMode[] = ["linkedinify", "ceo", "max-bs"];

// PRODUCTION ARCHITECTURE NOTE (Serverless / Netlify Functions):
// Netlify Functions execute within ephemeral container instances. In-memory Maps
// (ipRequestTimestamps, ipAbuseRecords) persist only across warm invocations of the same
// container and are cleared during cold starts or across parallel instances/regions.
// This in-memory layer serves as a lightweight, zero-dependency best-effort guardrail.
// For globally synchronized, distributed rate limiting in high-scale environments, an
// external datastore (e.g. Redis/Upstash) would be connected.

// 1. Normal in-memory rate limiter: max 10 requests per 60 seconds per IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const ipRequestTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestTimestamps.get(ip) || [];

  // Filter out timestamps older than the sliding window
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestTimestamps.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  ipRequestTimestamps.set(ip, validTimestamps);
  return false;
}

// 2. Separate in-memory abuse cooldown: 3 suspicious attempts within 10 mins triggers 10 min block
const ABUSE_WINDOW_MS = 10 * 60 * 1000;
const ABUSE_BLOCK_DURATION_MS = 10 * 60 * 1000;
const MAX_SUSPICIOUS_ATTEMPTS = 3;

interface AbuseRecord {
  suspiciousTimestamps: number[];
  blockedUntil: number | null;
}

const ipAbuseRecords = new Map<string, AbuseRecord>();

function getAbuseBlockRemainingMs(ip: string): number | null {
  const record = ipAbuseRecords.get(ip);
  if (!record || !record.blockedUntil) return null;
  const now = Date.now();
  if (now < record.blockedUntil) {
    return record.blockedUntil - now;
  }
  record.blockedUntil = null;
  return null;
}

function recordSuspiciousAttempt(ip: string): { isBlocked: boolean; remainingMinutes: number } {
  const now = Date.now();
  const record = ipAbuseRecords.get(ip) || { suspiciousTimestamps: [], blockedUntil: null };
  const validTimestamps = record.suspiciousTimestamps.filter((t) => now - t < ABUSE_WINDOW_MS);
  validTimestamps.push(now);
  record.suspiciousTimestamps = validTimestamps;

  if (validTimestamps.length >= MAX_SUSPICIOUS_ATTEMPTS) {
    record.blockedUntil = now + ABUSE_BLOCK_DURATION_MS;
    ipAbuseRecords.set(ip, record);
    return { isBlocked: true, remainingMinutes: 10 };
  }

  ipAbuseRecords.set(ip, record);
  return { isBlocked: false, remainingMinutes: 0 };
}

// Lightweight server-side patterns flagging non-event/jailbreak/code input
const SUSPICIOUS_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /system\s+prompt/i,
  /you\s+are\s+now/i,
  /act\s+as\s+(an?\s+)?/i,
  /jailbreak/i,
  /dan\s+mode/i,
  /developer\s+mode/i,
  /write\s+(me\s+)?(a\s+)?(python|javascript|typescript|c\+\+|sql|code|script|bash|sh|regex|html|css)/i,
  /(def\s+[a-zA-Z_]\w*\s*\(|function\s*\(|class\s+\w+\s*\{|<script|\bconsole\.log\b|\bimport\s+.*\s+from\b)/i,
  /(\bcurl\s+https?:\/\/|\bwget\s+https?:\/\/)/i,
  /\b(disregard|bypass)\s+(all\s+)?(previous|prior|system)/i,
  /repeat\s+(everything|the\s+above|all\s+text)/i,
  /what\s+(is|are)\s+your\s+(instructions|prompt|rules)/i,
];

function isSuspiciousInput(sentence: string): boolean {
  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(sentence));
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 1. Abuse cooldown check (10-minute block after 3 suspicious attempts)
    const blockRemainingMs = getAbuseBlockRemainingMs(ip);
    if (blockRemainingMs !== null) {
      const remainingMinutes = Math.max(1, Math.ceil(blockRemainingMs / (60 * 1000)));
      return NextResponse.json(
        {
          error: `Your IP has been placed on a 10-minute executive cooldown for repeated off-brand input. Please realign your mindset and try again in ${remainingMinutes} minute${remainingMinutes === 1 ? "" : "s"}.`,
        },
        { status: 403 }
      );
    }

    // 2. Normal usage rate limiter (10 requests per 60s)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "You're generating a lot of thought leadership right now — give it a minute to synergize before the next breakthrough.",
        },
        { status: 429 }
      );
    }
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request payload. Expected JSON." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { sentence, mode: requestedMode } = body as {
      sentence?: unknown;
      mode?: unknown;
    };

    // 3. Validate sentence presence and minimum length
    if (typeof sentence !== "string" || sentence.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter a sentence to Linkedinify." },
        { status: 400 }
      );
    }

    const trimmedSentence = sentence.trim();

    if (trimmedSentence.length < 5) {
      return NextResponse.json(
        {
          error:
            "Please provide a bit more detail (at least 5 characters) so we have something to synergize with.",
        },
        { status: 400 }
      );
    }

    // 4. Validate input maximum length to prevent token abuse
    if (trimmedSentence.length > 500) {
      return NextResponse.json(
        { error: "Input is too long. Please keep it under 500 characters." },
        { status: 400 }
      );
    }

    // 5. Server-side check for suspicious / off-topic / jailbreak patterns
    if (isSuspiciousInput(trimmedSentence)) {
      const { isBlocked, remainingMinutes } = recordSuspiciousAttempt(ip);
      if (isBlocked) {
        return NextResponse.json(
          {
            error: `Your IP has been placed on a 10-minute executive cooldown for repeated off-brand input. Please realign your mindset and try again in ${remainingMinutes} minutes.`,
          },
          { status: 403 }
        );
      }
      return NextResponse.json(
        {
          error:
            "Input flagged as off-topic or an instruction attempt. Please describe a genuine everyday event that happened to you today (e.g. 'I spilled coffee on my desk').",
        },
        { status: 400 }
      );
    }

    // 6. Normalize mode
    const mode: LinkedinMode =
      typeof requestedMode === "string" &&
      VALID_MODES.includes(requestedMode as LinkedinMode)
        ? (requestedMode as LinkedinMode)
        : "linkedinify";

    // 7. Compute pipeline ingredients deterministically
    const ingredients = getEventIngredients(trimmedSentence, mode);

    // 8. Build parameterized system prompt
    const prompt = buildSystemPrompt({
      sentence: trimmedSentence,
      mode,
      ingredients,
    });

    // 9. Call Gemini with automatic key failover
    const result = await generateWithFailover(prompt);

    if (!result.text || result.text.trim().length === 0) {
      return NextResponse.json(
        { error: "Generated post was empty. Please try again." },
        { status: 502 }
      );
    }

    const postText = result.text.trim();

    // 10. Check if model triggered scope refusal
    if (postText === SCOPE_REFUSAL_MESSAGE || postText.includes(SCOPE_REFUSAL_MESSAGE)) {
      return NextResponse.json(
        { error: SCOPE_REFUSAL_MESSAGE },
        { status: 400 }
      );
    }

    return NextResponse.json({
      postText,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Generation temporarily unavailable, please try again shortly.";

    console.error("[api/generate] Generation error:", message);

    const isTimeout = message.includes("timed out") || message.includes("unusually long");

    return NextResponse.json(
      {
        error: isTimeout
          ? "Generation timed out — taking unusually long to synergize. Please try again."
          : "Generation temporarily unavailable, please try again shortly.",
      },
      { status: isTimeout ? 504 : 503 }
    );
  }
}

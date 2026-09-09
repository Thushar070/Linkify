import { NextRequest, NextResponse } from "next/server";
import { LinkedinMode } from "@/types";
import { getEventIngredients } from "@/lib/agent/pipeline";
import { buildSystemPrompt } from "@/lib/prompts/systemPrompt";
import { generateWithFailover } from "@/lib/llmClient";

const VALID_MODES: LinkedinMode[] = ["linkedinify", "ceo", "max-bs"];

// In-memory rate limiter: max 10 requests per 60 seconds per IP
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

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

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

    // 1. Validate sentence presence and minimum length
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

    // 2. Validate input maximum length to prevent token abuse
    if (trimmedSentence.length > 500) {
      return NextResponse.json(
        { error: "Input is too long. Please keep it under 500 characters." },
        { status: 400 }
      );
    }

    // 3. Normalize mode
    const mode: LinkedinMode =
      typeof requestedMode === "string" &&
      VALID_MODES.includes(requestedMode as LinkedinMode)
        ? (requestedMode as LinkedinMode)
        : "linkedinify";

    // 4. Compute pipeline ingredients deterministically
    const ingredients = getEventIngredients(trimmedSentence, mode);

    // 5. Build parameterized system prompt
    const prompt = buildSystemPrompt({
      sentence: trimmedSentence,
      mode,
      ingredients,
    });

    // 6. Call Gemini with automatic key failover
    const result = await generateWithFailover(prompt);

    if (!result.text || result.text.trim().length === 0) {
      return NextResponse.json(
        { error: "Generated post was empty. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      postText: result.text.trim(),
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

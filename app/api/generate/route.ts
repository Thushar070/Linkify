import { NextRequest, NextResponse } from "next/server";
import { LinkedinMode } from "@/types";
import { getEventIngredients } from "@/lib/agent/pipeline";
import { buildSystemPrompt } from "@/lib/prompts/systemPrompt";
import { generateWithFailover } from "@/lib/llmClient";

const VALID_MODES: LinkedinMode[] = ["linkedinify", "ceo", "max-bs"];

export async function POST(req: NextRequest) {
  try {
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

    // 1. Validate sentence presence and type
    if (typeof sentence !== "string" || sentence.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter a sentence to Linkedinify." },
        { status: 400 }
      );
    }

    const trimmedSentence = sentence.trim();

    // 2. Validate input length to prevent token abuse
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

    return NextResponse.json(
      { error: "Generation temporarily unavailable, please try again shortly." },
      { status: 503 }
    );
  }
}

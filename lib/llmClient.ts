import { GoogleGenAI } from "@google/genai";

/**
 * Returns the list of configured Gemini API keys in priority order.
 * Adding a third or fourth key in the future is a one-line addition to this array.
 */
export function getApiKeys(): string[] {
  const keys = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3, // One-line addition for future keys
  ];

  return keys.filter((k): k is string => Boolean(k && k.trim().length > 0));
}

/**
 * Low-level call to the Gemini API using @google/genai SDK.
 */
async function callGeminiApi(apiKey: string, prompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      maxOutputTokens: 600,
      temperature: 0.85,
    },
  });

  const text = response.text;
  if (!text || text.trim().length === 0) {
    throw new Error("Gemini returned an empty response.");
  }

  return text.trim();
}

export interface GeneratePostResult {
  text: string;
  keyUsedIndex: number;
}

/**
 * Calls Gemini with automatic failover between available API keys.
 * Tries GEMINI_API_KEY_1 first. If a rate limit (429), quota issue, or other failure
 * occurs, immediately retries with GEMINI_API_KEY_2 (and subsequent keys).
 * If all keys fail, throws a user-friendly error message.
 */
export async function generateWithFailover(prompt: string): Promise<GeneratePostResult> {
  const keys = getApiKeys();

  if (keys.length === 0) {
    console.error("[llmClient] No Gemini API keys are configured in environment.");
    throw new Error("Generation temporarily unavailable, please try again shortly.");
  }

  let lastError: Error | null = null;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const keyLabel = `GEMINI_API_KEY_${i + 1}`;

    try {
      console.log(`[llmClient] Invoking Gemini API using ${keyLabel}...`);
      const text = await callGeminiApi(key, prompt);
      console.log(`[llmClient] Successfully generated post using ${keyLabel}.`);
      return {
        text,
        keyUsedIndex: i + 1,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      lastError = err instanceof Error ? err : new Error(errorMessage);

      console.warn(
        `[llmClient] Failover triggered: ${keyLabel} failed with error: "${errorMessage}".`
      );

      if (i < keys.length - 1) {
        console.warn(`[llmClient] Automatically failing over to GEMINI_API_KEY_${i + 2}...`);
      }
    }
  }

  console.error(
    `[llmClient] All ${keys.length} Gemini API keys failed or were rate-limited. Last error: ${lastError?.message}`
  );
  throw new Error("Generation temporarily unavailable, please try again shortly.");
}

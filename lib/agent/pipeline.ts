import { EventIngredients, LinkedinifyInput, LinkedinifyResult, LinkedinMode } from "@/types";
import { analyzeEvent } from "./analyzeEvent";
import { selectBuzzwords } from "./selectBuzzwords";
import { selectEmojis } from "./selectEmojis";
import { generateHashtags } from "./generateHashtags";

/**
 * Computes deterministic ingredients (category, buzzwords, emojis, hashtags)
 * from an input sentence and mode.
 */
export function getEventIngredients(
  sentence: string,
  mode: LinkedinMode = "linkedinify"
): EventIngredients {
  const category = analyzeEvent(sentence);
  const buzzwords = selectBuzzwords(category, mode);
  const emojis = selectEmojis(category, mode);
  const hashtags = generateHashtags(category, mode);

  return {
    category,
    buzzwords,
    emojis,
    hashtags,
  };
}

/**
 * Generates a deterministic mock post prose based on category and selected mode.
 * Serves as fallback or fast preview.
 */
export function buildDeterministicPost(
  sentence: string,
  category: string,
  buzzwords: string[],
  emojis: string[],
  hashtags: string[],
  mode: LinkedinMode
): string {
  const emojiString = emojis.slice(0, 3).join(" ");
  const hashtagString = hashtags.join(" ");
  const b1 = buzzwords[0] || "strategic throughput";
  const b2 = buzzwords[1] || "operational excellence";
  const b3 = buzzwords[2] || "value realization";

  if (mode === "ceo") {
    return `When evaluating capital allocation, most managers miss the foundational baseline. ${emojis[0] || "💼"}

Yesterday: "${sentence}"

To the uninitiated, this was an isolated everyday action.
To leadership, it was a masterclass in ${b1}.

Executive Takeaways:
1. Ruthless Prioritization: Zero latency between intent and execution.
2. Compounding Output: Turning baseline events into ${b2}.
3. Capital Discipline: Extracting maximal ROI from every micro-action.

Execution isn't a conversation. It's the only metric that compounds.

${hashtagString}`;
  }

  if (mode === "max-bs") {
    return `I am profoundly humbled and electrified to share this inflection point. ${emojiString}

Most individuals would summarize this as:
"${sentence}"

How painfully short-sighted.

We didn't merely engage in an everyday occurrence. We orchestrated an end-to-end multi-stakeholder ecosystem of ${b1}, ${b2}, and quantum ${b3}.

3 Paradigm-Shifting Lessons:
• Inflection 1: Radical ownership over baseline reality.
• Inflection 2: Deconstruct legacy friction through real-time agility.
• Inflection 3: Scale the outcome or systematically deprecate the initiative.

If you aren't optimizing every second of your existence, what are you even building?

Agree? 👇

${hashtagString}`;
  }

  // Default: linkedinify mode
  return `Most people see an ordinary task. ${emojis[0] || "🚀"}

I saw a critical inflection point in strategic operational execution.

Yesterday: "${sentence}"

Here is what 99% of professionals fail to realize about ${b1}:

1. Autonomous Execution: Waiting for instructions is a legacy framework. Elite performers optimize ${b2} in real time.
2. High-Velocity Decision Making: Evaluate the risk matrix, grasp the opportunity, and execute without friction.
3. Continuous Optimization: Once ${b3} is unlocked, systematically scale the outcome.

Stop asking for permission to drive impact.

The board doesn't ask if it was easy.
The board asks if you delivered.

Agree? 👇

${hashtagString}`;
}

/**
 * Orchestrates category detection, buzzword selection, emoji selection,
 * and hashtag generation into a cohesive LinkedinifyResult.
 */
export function runAgentPipeline(input: LinkedinifyInput): LinkedinifyResult {
  const ingredients = getEventIngredients(input.sentence, input.mode);

  const postText = buildDeterministicPost(
    input.sentence,
    ingredients.category,
    ingredients.buzzwords,
    ingredients.emojis,
    ingredients.hashtags,
    input.mode
  );

  return {
    originalSentence: input.sentence,
    mode: input.mode,
    category: ingredients.category,
    postText,
    buzzwords: ingredients.buzzwords,
    emojis: ingredients.emojis,
    hashtags: ingredients.hashtags,
  };
}

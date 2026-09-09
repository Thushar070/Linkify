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
    return `Execution isn't a democracy. It's a compounding discipline. ${emojis[0] || "💼"}

Yesterday's operational event:
"${sentence}"

To average managers, this looks like mundane trivia.
To high-performing operators, it's an asymmetric inflection in ${b1}.

3 Executive Directives:
1. Capital Discipline: Zero latency between observation and ${b2}.
2. Friction Deprecation: Eliminate legacy bottlenecks before they compound.
3. Moat Expansion: Systematize every action into repeatable ${b3}.

We don't negotiate with operational debt.
Ship or get displaced.

${hashtagString}`;
  }

  if (mode === "max-bs") {
    return `Read that again. Now let it marinate in your prefrontal cortex. ${emojiString}

You thought this was merely:
"${sentence}"

How cosmically short-sighted.

We didn't just observe an occurrence. We co-created a quantum multi-stakeholder paradigm of ${b1}, neural ${b2}, and metaphysical ${b3}.

3 Quantum Mindset Shifts:
🌐 Vector 1: Synergize baseline realities into omni-channel transcendence.
🧬 Vector 2: Deprecate existential bandwidth friction through radical agility.
🚀 Vector 3: Holistically productize your energetic ROI across the corporate multiverse.

Are you synergizing your human capital, or merely occupying spacetime?

Thoughts from the quantum realm? 👇

${hashtagString}`;
  }

  // Default: linkedinify mode
  return `I almost didn't post this today. ${emojis[0] || "🚀"}

Yesterday: "${sentence}"

Most people would brush it off and keep scrolling.
I stopped. I took a deep breath. And I asked myself:
"What is this moment trying to teach me about ${b1}?"

Here are 3 leadership breakthroughs this everyday moment unlocked:

1. Vulnerability is a Superpower: Elite performers don't wait for permission. They turn ${b2} into personal growth.
2. The Power of the Pivot: When life gives you friction, adapt your mindset in real time.
3. Compounding Small Wins: True leadership is built on micro-habits and consistent ${b3}.

Stop waiting for the perfect conditions.
The best investment you will ever make is in yourself.

What small moment inspired you this week?
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

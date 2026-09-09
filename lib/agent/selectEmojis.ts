import { EventCategory, LinkedinMode } from "@/types";

const EMOJI_DICTIONARY: Record<EventCategory, string[]> = {
  food: ["🍎", "☕", "🍽️", "🌱", "🥗", "🥑", "⚡", "🎯"],
  coding: ["💻", "⚙️", "🚀", "⚡", "🛠️", "🔍", "🔥", "📈"],
  gym: ["🏋️‍♂️", "💪", "🏃‍♂️", "📈", "🥊", "🏆", "🔥", "⚡"],
  sleep: ["😴", "🧠", "🌙", "🔋", "🛌", "💤", "✨", "🎯"],
  idle: ["🌿", "🧘", "☀️", "🍃", "💭", "🚶", "🌱", "✨"],
  work: ["📊", "🤝", "🎯", "💼", "📈", "👔", "🚀", "💡"],
  social: ["👥", "🥂", "💬", "🤝", "🌟", "🎙️", "💡", "🎯"],
  generic: ["🚀", "💡", "📈", "🎯", "🔑", "✨", "💼", "🔥"],
};

const MODE_EMOJI_COUNT_MAP: Record<LinkedinMode, number> = {
  ceo: 2,
  linkedinify: 3,
  "max-bs": 6,
};

/**
 * Selects emojis tailored to the category with density scaled by mode.
 */
export function selectEmojis(
  category: EventCategory,
  mode: LinkedinMode = "linkedinify"
): string[] {
  const pool = EMOJI_DICTIONARY[category] || EMOJI_DICTIONARY.generic;
  const count = MODE_EMOJI_COUNT_MAP[mode] || 3;

  return pool.slice(0, count);
}


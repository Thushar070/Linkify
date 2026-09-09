import { EventCategory, BullshitLevel } from "@/types";

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

const EMOJI_DENSITY_MAP: Record<BullshitLevel, number> = {
  mild: 2,
  corporate: 3,
  influencer: 5,
  "final-boss": 8,
};

/**
 * Selects emojis tailored to the category with density scaled by inflation level.
 */
export function selectEmojis(
  category: EventCategory,
  level: BullshitLevel = "corporate"
): string[] {
  const pool = EMOJI_DICTIONARY[category] || EMOJI_DICTIONARY.generic;
  const count = EMOJI_DENSITY_MAP[level] || 3;

  return pool.slice(0, count);
}

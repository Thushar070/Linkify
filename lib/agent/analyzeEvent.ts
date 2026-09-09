import { EventCategory } from "@/types";

const CATEGORY_KEYWORDS: Record<Exclude<EventCategory, "generic">, string[]> = {
  food: [
    "eat",
    "ate",
    "eating",
    "apple",
    "coffee",
    "tea",
    "drink",
    "drank",
    "drinking",
    "breakfast",
    "lunch",
    "dinner",
    "snack",
    "food",
    "meal",
    "cooking",
    "cooked",
    "bake",
    "baked",
    "biryani",
    "pizza",
    "burger",
    "salad",
    "water",
    "hungry",
  ],
  coding: [
    "code",
    "coding",
    "coded",
    "bug",
    "typo",
    "fix",
    "fixed",
    "git",
    "commit",
    "pushed",
    "push",
    "pr",
    "pull request",
    "merge",
    "merged",
    "repo",
    "repository",
    "javascript",
    "typescript",
    "python",
    "react",
    "nextjs",
    "terminal",
    "vs code",
    "syntax",
    "compile",
    "debug",
    "debugging",
    "test",
    "deploy",
    "deployed",
  ],
  gym: [
    "gym",
    "workout",
    "workout",
    "exercise",
    "run",
    "running",
    "ran",
    "jog",
    "jogging",
    "lift",
    "lifting",
    "weights",
    "pushup",
    "pushups",
    "squat",
    "squats",
    "cardio",
    "stretch",
    "stretching",
    "fitness",
    "training",
    "muscle",
  ],
  sleep: [
    "sleep",
    "slept",
    "sleeping",
    "nap",
    "napped",
    "napping",
    "bed",
    "woke",
    "wake",
    "waking",
    "tired",
    "rest",
    "rested",
    "resting",
    "alarm",
    "insomnia",
    "dream",
    "dreaming",
  ],
  idle: [
    "grass",
    "walk",
    "walking",
    "walked",
    "sit",
    "sat",
    "sitting",
    "stare",
    "stared",
    "staring",
    "scroll",
    "scrolled",
    "scrolling",
    "couch",
    "nothing",
    "idle",
    "bored",
    "watch",
    "watched",
    "watching",
    "movie",
    "youtube",
    "tv",
    "relax",
  ],
  work: [
    "meeting",
    "call",
    "email",
    "emailed",
    "slack",
    "zoom",
    "presentation",
    "slides",
    "deck",
    "spreadsheet",
    "excel",
    "manager",
    "sync",
    "syncing",
    "ticket",
    "jira",
    "interview",
    "hire",
    "hired",
    "project",
    "deadline",
    "client",
    "report",
  ],
  social: [
    "friend",
    "friends",
    "party",
    "hangout",
    "hang",
    "talk",
    "talked",
    "talking",
    "chat",
    "chatted",
    "chatting",
    "family",
    "dinner with",
    "coffee with",
    "meet",
    "met",
    "birthday",
    "wedding",
  ],
};

/**
 * Analyzes an input sentence to categorize the everyday action.
 */
export function analyzeEvent(sentence: string): EventCategory {
  if (!sentence || !sentence.trim()) {
    return "generic";
  }

  const normalized = sentence.toLowerCase();
  const words = normalized.split(/\W+/);

  let bestCategory: EventCategory = "generic";
  let maxScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;

    for (const keyword of keywords) {
      if (keyword.includes(" ")) {
        if (normalized.includes(keyword)) {
          score += 2;
        }
      } else {
        if (words.includes(keyword)) {
          score += 1;
        }
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestCategory = category as EventCategory;
    }
  }

  return bestCategory;
}

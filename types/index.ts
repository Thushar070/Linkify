export type LinkedinMode = "linkedinify" | "ceo" | "max-bs";

export type EventCategory =
  | "food"
  | "coding"
  | "gym"
  | "sleep"
  | "idle"
  | "work"
  | "social"
  | "generic";

export interface EventIngredients {
  category: EventCategory;
  buzzwords: string[];
  emojis: string[];
  hashtags: string[];
}

export interface LinkedinifyInput {
  sentence: string;
  mode: LinkedinMode;
}

export interface LinkedinifyResult {
  originalSentence: string;
  mode: LinkedinMode;
  category: EventCategory;
  postText: string;
  buzzwords: string[];
  emojis: string[];
  hashtags: string[];
}

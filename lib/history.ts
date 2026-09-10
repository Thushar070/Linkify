import { LinkedinMode } from "@/types";

export interface HistoryEntry {
  id: string;
  timestamp: number;
  originalSentence: string;
  mode: LinkedinMode;
  postText: string;
}

const STORAGE_KEY = "linkify_generation_history";
const MAX_HISTORY_ITEMS = 50;

/**
 * Safely reads all history entries from localStorage.
 * Returns empty array if localStorage is unavailable or corrupt.
 */
export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn("[history] Failed to read from localStorage:", err);
    return [];
  }
}

/**
 * Saves a newly generated post to history.
 * Prepends the item and caps total entries at MAX_HISTORY_ITEMS (50).
 */
export function saveToHistory(
  entry: Omit<HistoryEntry, "id" | "timestamp"> & {
    id?: string;
    timestamp?: number;
  }
): HistoryEntry | null {
  if (typeof window === "undefined") return null;

  try {
    const current = getHistory();
    const newEntry: HistoryEntry = {
      id: entry.id || `hist_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: entry.timestamp || Date.now(),
      originalSentence: entry.originalSentence,
      mode: entry.mode,
      postText: entry.postText,
    };

    // Filter out duplicates if same id exists, then prepend
    const updated = [newEntry, ...current.filter((item) => item.id !== newEntry.id)].slice(
      0,
      MAX_HISTORY_ITEMS
    );

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (err) {
    console.warn("[history] Failed to save to localStorage:", err);
    return null;
  }
}

/**
 * Deletes a single history entry by ID.
 */
export function deleteHistoryEntry(id: string): void {
  if (typeof window === "undefined") return;

  try {
    const current = getHistory();
    const updated = current.filter((item) => item.id !== id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("[history] Failed to delete entry from localStorage:", err);
  }
}

/**
 * Clears all generation history.
 */
export function clearHistory(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("[history] Failed to clear history from localStorage:", err);
  }
}

/**
 * Formats a timestamp into a friendly relative time string (e.g. "Just now", "2m ago", "1h ago").
 */
export function formatRelativeTime(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);

  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  return `${diffDays}d ago`;
}

/**
 * Exports the full local history as a downloadable formatted .json file.
 * Includes all fields: id, timestamp, date, sentence, originalSentence, mode, postText.
 */
export function exportHistoryAsJson(history: HistoryEntry[]): void {
  if (typeof window === "undefined" || history.length === 0) return;

  try {
    const exportData = history.map((item) => ({
      id: item.id,
      timestamp: item.timestamp,
      date: new Date(item.timestamp).toISOString(),
      sentence: item.originalSentence,
      originalSentence: item.originalSentence,
      mode: item.mode,
      postText: item.postText,
    }));

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `linkedinify-history-${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("[history] Failed to export history:", err);
  }
}

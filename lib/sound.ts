/**
 * Web Audio API synthesized ding sound effect.
 * Generates a clean, subtle chime without external audio assets or network requests.
 */

const SOUND_STORAGE_KEY = "linkify_sound_enabled";

export function getSoundPreference(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = window.localStorage.getItem(SOUND_STORAGE_KEY);
    return stored === "true";
  } catch {
    return false;
  }
}

export function setSoundPreference(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SOUND_STORAGE_KEY, enabled ? "true" : "false");
  } catch (err) {
    console.warn("[sound] Failed to store sound preference:", err);
  }
}

/**
 * Plays a subtle, pleasant executive ding sound.
 */
export function playDingSound(): void {
  if (typeof window === "undefined") return;

  try {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioCtxClass) return;

    const ctx = new AudioCtxClass();

    // In case context is suspended
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Dual-tone harmonic chime
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "triangle";

    // Primary bell pitch: C6 (1046.5 Hz) rising to E6 (1318.5 Hz)
    osc1.frequency.setValueAtTime(1046.5, now);
    osc1.frequency.exponentialRampToValueAtTime(1318.5, now + 0.08);

    // Harmonic overtone: G6 (1567.98 Hz)
    osc2.frequency.setValueAtTime(1567.98, now);

    // Exponential decay envelope (soft attack, smooth fade)
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.42);
    osc2.stop(now + 0.42);

    // Clean up AudioContext after sound finishes
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 600);
  } catch (err) {
    console.warn("[sound] Playback unavailable:", err);
  }
}

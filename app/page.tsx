"use client";

import React, { useState, useEffect } from "react";
import InputCard from "@/components/InputCard";
import ModeSelector, { LinkedinMode } from "@/components/ModeSelector";
import GenerateButton from "@/components/GenerateButton";
import LinkedInPostCard from "@/components/LinkedInPostCard";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import AmbientNetwork3D from "@/components/AmbientNetwork3D";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import HistoryPanel from "@/components/HistoryPanel";
import {
  getHistory,
  saveToHistory,
  deleteHistoryEntry,
  clearHistory,
  HistoryEntry,
} from "@/lib/history";
import { playDingSound, getSoundPreference, setSoundPreference } from "@/lib/sound";
import {
  AlertCircle,
  RotateCcw,
  PanelLeft,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from "lucide-react";

function HomeContent() {
  const [sentence, setSentence] = useState("");
  const [mode, setMode] = useState<LinkedinMode>("linkedinify");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPostText, setGeneratedPostText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load history, sound preference, and current theme on mount
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setHistory(getHistory());
      setIsSoundEnabled(getSoundPreference());

      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleToggleSound = () => {
    const nextState = !isSoundEnabled;
    setIsSoundEnabled(nextState);
    setSoundPreference(nextState);
    if (nextState) {
      playDingSound();
    }
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("linkify_theme", nextTheme);
    } catch {}
  };

  const handleGenerate = async () => {
    if (!sentence.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 20000);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sentence: sentence.trim(),
          mode,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            "Generation temporarily unavailable, please try again shortly."
        );
      } else if (data.postText) {
        setGeneratedPostText(data.postText);
        setHasGenerated(true);
        setError(null);

        // Play ding sound if enabled
        if (isSoundEnabled) {
          playDingSound();
        }

        const savedEntry = saveToHistory({
          originalSentence: sentence.trim(),
          mode,
          postText: data.postText,
        });

        if (savedEntry) {
          setHistory((prev) => [
            savedEntry,
            ...prev.filter((item) => item.id !== savedEntry.id),
          ].slice(0, 50));
        }
      } else {
        setError(
          "Generation temporarily unavailable, please try again shortly."
        );
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === "AbortError") {
        setError(
          "Generation is taking unusually long — the synergy pipeline timed out. Give it another try."
        );
      } else {
        console.error("[frontend] Generation request failed:", err);
        setError("Generation temporarily unavailable, please try again shortly.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryEntry = (entry: HistoryEntry) => {
    setSentence(entry.originalSentence);
    setMode(entry.mode);
    setGeneratedPostText(entry.postText);
    setHasGenerated(true);
    setError(null);
  };

  const handleDeleteHistoryEntry = (id: string) => {
    deleteHistoryEntry(id);
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleReset = () => {
    setSentence("");
    setGeneratedPostText("");
    setHasGenerated(false);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div
      className={`min-h-screen bg-background text-text flex flex-col justify-between selection:bg-text selection:text-background transition-[padding] duration-300 ${
        isHistoryOpen ? "md:pl-80" : "md:pl-0"
      }`}
    >
      {/* Top Header */}
      <header className="border-b border-border backdrop-blur-md sticky top-0 z-20 bg-background/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsHistoryOpen((prev) => !prev)}
              className="p-2 rounded-xl border border-border bg-surface hover:bg-surface-hover text-text transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-text flex items-center gap-1.5"
              title={isHistoryOpen ? "Close history sidebar" : "Open history sidebar"}
              aria-label={isHistoryOpen ? "Close history sidebar" : "Open history sidebar"}
            >
              <PanelLeft className="w-4 h-4 text-text" />
              <span className="text-xs font-semibold hidden sm:inline">History</span>
              {history.length > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-surface-subtle text-text-muted border border-border">
                  {history.length}
                </span>
              )}
            </button>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-text select-none inline-flex items-baseline">
              Linkedinify
              <sup className="text-[0.5em] font-semibold text-text-muted ml-0.5 select-none">
                ™
              </sup>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Sound Toggle Button */}
            <button
              type="button"
              onClick={handleToggleSound}
              className={`p-2 rounded-xl border transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-text ${
                isSoundEnabled
                  ? "border-text bg-text text-background font-semibold shadow-xs"
                  : "border-border bg-surface text-text-muted hover:text-text hover:bg-surface-hover"
              }`}
              title={isSoundEnabled ? "Mute completion sound" : "Enable completion sound"}
              aria-label={isSoundEnabled ? "Mute completion sound" : "Enable completion sound"}
            >
              {isSoundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={handleToggleTheme}
              className="p-2 rounded-xl border border-border bg-surface hover:bg-surface-hover text-text transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-text"
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-text" />
              ) : (
                <Moon className="w-4 h-4 text-text" />
              )}
            </button>

            {/* Mode Selector */}
            <ModeSelector
              value={mode}
              onChange={setMode}
              disabled={isLoading}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 flex-1">
        <AmbientNetwork3D />

        {/* Hero Title */}
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-text leading-[1.15]">
            Transform mundane actions into unhinged influence.
          </h2>
          <p className="text-base sm:text-lg text-text-muted font-normal leading-relaxed">
            Write what happened in plain English. We&apos;ll turn it into viral, unapologetic corporate thought leadership.
          </p>
        </div>

        {/* Input section: Centerpiece of the app */}
        <section className="space-y-5" aria-label="Input Configuration">
          <InputCard
            value={sentence}
            onChange={setSentence}
            disabled={isLoading}
          />

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3">
              <GenerateButton
                onClick={handleGenerate}
                loading={isLoading}
                disabled={sentence.trim().length < 5}
                text={hasGenerated ? "Regenerate Post" : "Linkedinify"}
              />

              {hasGenerated && (
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="px-5 py-3.5 rounded-xl border border-border bg-surface text-text hover:bg-surface-hover text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <RotateCcw className="w-4 h-4 text-text-subtle" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-text-subtle font-medium">
              <span>Persona:</span>
              <span className="text-text font-bold uppercase tracking-wider text-[11px]">
                {mode === "ceo" ? "CEO Mode" : mode === "max-bs" ? "Maximum Bullshit" : "LinkedInify"}
              </span>
            </div>
          </div>
        </section>

        {/* Error notification banner */}
        {error && (
          <section
            className="p-4 sm:p-5 rounded-xl border border-border bg-surface text-text flex items-start sm:items-center justify-between gap-4 text-sm sm:text-base animate-slide-up-fade shadow-xs"
            role="alert"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-border flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 text-text" />
              </div>
              <span className="text-text text-sm sm:text-base font-medium leading-relaxed">{error}</span>
            </div>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading || sentence.trim().length < 5}
              className="px-3 py-1.5 rounded-lg border border-border bg-surface-subtle hover:bg-surface-hover text-text text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Try again
            </button>
          </section>
        )}

        {/* Loading State */}
        {isLoading && (
          <section className="pt-6 border-t border-border">
            <LoadingState />
          </section>
        )}

        {/* Results section */}
        {!isLoading && hasGenerated && (
          <section
            className="space-y-6 pt-6 border-t border-border animate-slide-up-fade"
            aria-label="Generated Results"
          >
            <LinkedInPostCard
              postText={generatedPostText}
              onRegenerate={handleGenerate}
              isRegenerating={isLoading}
            />
          </section>
        )}

        {/* Empty State before any generation has occurred */}
        {!isLoading && !hasGenerated && (
          <EmptyState
            onSelectPrompt={(selectedPrompt) => {
              setSentence(selectedPrompt);
              setError(null);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-text-subtle">
          <div className="flex items-baseline gap-1">
            <span className="font-semibold text-text inline-flex items-baseline">
              Linkedinify
              <sup className="text-[0.6em] font-semibold text-text-muted ml-0.5">
                ™
              </sup>
            </span>
            <span>— The satire thought leadership engine.</span>
          </div>
          <div className="text-text-muted text-xs">
            Zero fluff. Infinite synergy.
          </div>
        </div>
      </footer>

      {/* History Sidebar Panel */}
      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectEntry={handleSelectHistoryEntry}
        onDeleteEntry={handleDeleteHistoryEntry}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ErrorBoundary>
      <HomeContent />
    </ErrorBoundary>
  );
}

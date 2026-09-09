"use client";

import React, { useState } from "react";
import InputCard from "@/components/InputCard";
import ModeSelector, { LinkedinMode } from "@/components/ModeSelector";
import GenerateButton from "@/components/GenerateButton";
import LinkedInPostCard from "@/components/LinkedInPostCard";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import AmbientNetwork3D from "@/components/AmbientNetwork3D";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AlertCircle, RotateCcw } from "lucide-react";

function HomeContent() {
  const [sentence, setSentence] = useState("");
  const [mode, setMode] = useState<LinkedinMode>("linkedinify");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPostText, setGeneratedPostText] = useState("");
  const [error, setError] = useState<string | null>(null);

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

  const handleReset = () => {
    setSentence("");
    setGeneratedPostText("");
    setHasGenerated(false);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col justify-between selection:bg-accent selection:text-black">
      {/* Top Header */}
      <header className="border-b border-border/60 backdrop-blur-md sticky top-0 z-20 bg-black/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white select-none inline-flex items-baseline">
              Linkedinify
              <sup className="text-[0.5em] font-semibold text-neutral-400 ml-0.5 select-none">
                ™
              </sup>
            </h1>
          </div>
          <div className="flex items-center">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
            Transform mundane actions into unhinged influence.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
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
                  className="px-5 py-3.5 rounded-xl border border-neutral-800 bg-surface text-neutral-300 hover:text-white hover:bg-surface-hover text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <RotateCcw className="w-4 h-4 text-neutral-400" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500 font-medium">
              <span>Persona:</span>
              <span className="text-neutral-300 font-semibold uppercase tracking-wider text-[11px]">
                {mode === "ceo" ? "CEO Mode" : mode === "max-bs" ? "Maximum Bullshit" : "LinkedInify"}
              </span>
            </div>
          </div>
        </section>

        {/* Error notification banner */}
        {error && (
          <section
            className="p-4 sm:p-5 rounded-xl border border-amber-500/20 bg-amber-950/20 text-neutral-200 flex items-start sm:items-center justify-between gap-4 text-sm sm:text-base animate-slide-up-fade shadow-lg"
            role="alert"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-neutral-200 text-sm sm:text-base font-medium leading-relaxed">{error}</span>
            </div>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading || sentence.trim().length < 5}
              className="px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Try again
            </button>
          </section>
        )}

        {/* Loading State */}
        {isLoading && (
          <section className="pt-6 border-t border-neutral-800/80">
            <LoadingState />
          </section>
        )}

        {/* Results section */}
        {!isLoading && hasGenerated && (
          <section
            className="space-y-6 pt-6 border-t border-neutral-800/80 animate-slide-up-fade"
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
      <footer className="mt-16 border-t border-border/80 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-500">
          <div className="flex items-baseline gap-1">
            <span className="font-semibold text-neutral-300 inline-flex items-baseline">
              Linkedinify
              <sup className="text-[0.6em] font-semibold text-neutral-400 ml-0.5">
                ™
              </sup>
            </span>
            <span>— The satire thought leadership engine.</span>
          </div>
          <div className="text-neutral-500 text-xs">
            Zero fluff. Infinite synergy.
          </div>
        </div>
      </footer>
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


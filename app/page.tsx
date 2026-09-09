"use client";

import React, { useState } from "react";
import InputCard from "@/components/InputCard";
import ModeSelector, { LinkedinMode } from "@/components/ModeSelector";
import GenerateButton from "@/components/GenerateButton";
import LinkedInPostCard from "@/components/LinkedInPostCard";
import LoadingState from "@/components/LoadingState";
import AmbientNetwork3D from "@/components/AmbientNetwork3D";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Home() {
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
      });

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
      console.error("[frontend] Generation request failed:", err);
      setError("Generation temporarily unavailable, please try again shortly.");
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
                disabled={!sentence.trim()}
                text={hasGenerated ? "Regenerate Post" : "Linkedinify"}
              />

              {hasGenerated && (
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="px-5 py-3.5 rounded-xl border border-neutral-800 bg-surface text-neutral-300 hover:text-white hover:bg-surface-hover text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
            className="p-5 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-200 flex items-start sm:items-center justify-between gap-4 text-sm sm:text-base animate-slide-up-fade shadow-lg"
            role="alert"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="text-xs sm:text-sm font-bold text-accent hover:underline shrink-0 cursor-pointer disabled:opacity-50"
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

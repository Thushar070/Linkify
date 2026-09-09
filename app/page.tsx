"use client";

import React, { useState } from "react";
import InputCard from "@/components/InputCard";
import ExampleChips from "@/components/ExampleChips";
import BullshitLevelSelector, {
  BullshitLevel,
} from "@/components/BullshitLevelSelector";
import ModeSelector, { LinkedinMode } from "@/components/ModeSelector";
import GenerateButton from "@/components/GenerateButton";
import LinkedInPostCard from "@/components/LinkedInPostCard";
import StatsGrid from "@/components/StatsGrid";
import RealityCheckCard from "@/components/RealityCheckCard";
import LoadingState from "@/components/LoadingState";
import { Sparkles, RotateCcw } from "lucide-react";

export default function Home() {
  const [sentence, setSentence] = useState("");
  const [bullshitLevel, setBullshitLevel] = useState<BullshitLevel>("corporate");
  const [mode, setMode] = useState<LinkedinMode>("linkedinify");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectExample = (example: string) => {
    setSentence(example);
  };

  const handleGenerate = () => {
    if (!sentence.trim()) {
      setSentence("I ate an apple.");
    }
    setIsLoading(true);
    // Mock generation delay for Phase 1
    setTimeout(() => {
      setIsLoading(false);
      setHasGenerated(true);
    }, 800);
  };

  const handleReset = () => {
    setSentence("");
    setHasGenerated(false);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="bg-surface border-b border-border sticky top-0 z-30 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-white font-bold text-base shadow-2xs">
              in
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-text">
                Linkedinify<span className="text-accent">™</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-medium px-2 py-0.5 rounded bg-surface-subtle border border-border text-text-muted">
                Synergy Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-text-subtle hidden md:inline">
              Turning mundane life into executive presence
            </span>
            <span className="inline-flex items-center text-[10px] font-semibold px-2 py-1 rounded bg-accent-subtle text-accent border border-accent/20">
              Phase 1 • Static Shell
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Hero banner */}
        <div className="bg-surface rounded-linkedin border border-border p-4 sm:p-5 shadow-xs">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Narrative Studio</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text">
                Transform ordinary moments into corporate lore
              </h1>
              <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl leading-normal">
                Did you eat an apple? Drink a coffee? Fix a comma? That wasn't a
                routine event — that was a cross-functional inflection point in
                value realization.
              </p>
            </div>
          </div>
        </div>

        {/* Input section */}
        <section className="space-y-4" aria-label="Input Configuration">
          <InputCard
            value={sentence}
            onChange={setSentence}
            disabled={isLoading}
          />

          <ExampleChips
            onSelect={handleSelectExample}
            selected={sentence}
            disabled={isLoading}
          />

          <BullshitLevelSelector
            value={bullshitLevel}
            onChange={setBullshitLevel}
            disabled={isLoading}
          />

          <ModeSelector
            value={mode}
            onChange={setMode}
            disabled={isLoading}
          />

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <GenerateButton
                onClick={handleGenerate}
                loading={isLoading}
                text={hasGenerated ? "Regenerate Post" : "Linkedinify This"}
              />

              {hasGenerated && (
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="px-4 py-3 rounded-full border border-border bg-surface text-text hover:bg-surface-hover hover:border-accent/40 text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-text-muted" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="text-right text-[11px] text-text-subtle hidden sm:block">
              <span>Zero blue pixels • 100% corporate delirium</span>
            </div>
          </div>
        </section>

        {/* Loading State */}
        {isLoading && (
          <section className="pt-4 border-t border-border/80">
            <LoadingState />
          </section>
        )}

        {/* Results section (hidden until generated and not loading) */}
        {!isLoading && hasGenerated && (
          <section
            className="space-y-6 pt-4 border-t border-border/80 animate-in fade-in duration-300"
            aria-label="Generated Results"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-text tracking-tight">
                  Generated Thought Leadership
                </h2>
                <p className="text-xs text-text-muted">
                  Ready to post to your non-consenting professional network
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-accent font-semibold px-2.5 py-1 rounded-full bg-accent-subtle border border-accent/20">
                  Ready for LinkedIn
                </span>
              </div>
            </div>

            {/* LinkedIn Post Card */}
            <LinkedInPostCard />

            {/* Inflation & Synergy Stats */}
            <StatsGrid />

            {/* Reality Check Audit */}
            <RealityCheckCard />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border bg-surface py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <div>
            <span className="font-semibold text-text">Linkedinify™</span> —
            Turning nothing into a professional achievement.
          </div>
          <div className="flex items-center gap-4 text-text-subtle">
            <span>Built with Next.js & Tailwind</span>
            <span>•</span>
            <span>Zero Blue Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

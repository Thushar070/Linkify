"use client";

import React, { useState } from "react";
import InputCard from "@/components/InputCard";
import ModeSelector, { LinkedinMode } from "@/components/ModeSelector";
import GenerateButton from "@/components/GenerateButton";
import LinkedInPostCard from "@/components/LinkedInPostCard";
import LoadingState from "@/components/LoadingState";
import { RotateCcw } from "lucide-react";
import { runAgentPipeline } from "@/lib/agent/pipeline";

export default function Home() {
  const [sentence, setSentence] = useState("");
  const [mode, setMode] = useState<LinkedinMode>("linkedinify");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPostText, setGeneratedPostText] = useState("");

  const handleGenerate = () => {
    if (!sentence.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      const result = runAgentPipeline({
        sentence,
        mode,
      });
      setGeneratedPostText(result.postText);
      setIsLoading(false);
      setHasGenerated(true);
    }, 600);
  };

  const handleReset = () => {
    setSentence("");
    setGeneratedPostText("");
    setHasGenerated(false);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white select-none">
            Linkedinify
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Input section */}
        <section className="space-y-4" aria-label="Input Configuration">
          <InputCard
            value={sentence}
            onChange={setSentence}
            disabled={isLoading}
          />

          <ModeSelector
            value={mode}
            onChange={setMode}
            disabled={isLoading}
          />

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <GenerateButton
                onClick={handleGenerate}
                loading={isLoading}
                disabled={!sentence.trim()}
                text={hasGenerated ? "Regenerate" : "Linkedinify"}
              />

              {hasGenerated && (
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="px-4 py-2.5 rounded-md border border-border bg-surface text-text hover:bg-surface-hover text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-text-muted" />
                  <span>Reset</span>
                </button>
              )}
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
            className="space-y-6 pt-4 border-t border-border/80 animate-slide-up-fade"
            aria-label="Generated Results"
          >
            {/* LinkedIn Post Card */}
            <LinkedInPostCard postText={generatedPostText} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-text-subtle">
          <span>Linkedinify</span>
        </div>
      </footer>
    </div>
  );
}

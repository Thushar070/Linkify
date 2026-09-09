"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

const SAMPLE_PROMPTS = [
  "I ate a bowl of cereal for breakfast",
  "I replied to an email within 2 minutes",
  "I did 5 pushups and called it a full workout",
  "I accidentally unmuted on a 50-person Zoom",
];

export default function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <section
      className="border border-dashed border-neutral-800/80 bg-[#090909]/60 rounded-2xl p-6 sm:p-10 text-center space-y-5 animate-slide-up-fade"
      aria-label="Empty State and Prompt Suggestions"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="space-y-1.5 max-w-md mx-auto">
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Awaiting mundane human activity
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Type any ordinary event above, or select an everyday occurrence below to see it transformed into viral corporate thought leadership.
        </p>
      </div>

      {/* Suggested Inspiration Pills */}
      <div className="pt-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-3">
          Need inspiration? Try one of these:
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
          {SAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onSelectPrompt(prompt)}
              className="px-3.5 py-1.5 rounded-lg border border-neutral-800 bg-surface/80 hover:bg-surface-hover hover:border-neutral-700 text-neutral-300 hover:text-white text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

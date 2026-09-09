"use client";

import React, { useRef, useEffect } from "react";
import { PenLine } from "lucide-react";

interface InputCardProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function InputCard({
  value,
  onChange,
  placeholder = "e.g. I accidentally made eye contact with a coworker by the water cooler...",
  disabled = false,
}: InputCardProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const minHeight = window.innerWidth < 640 ? 160 : 200;
      textareaRef.current.style.height = `${Math.max(minHeight, textareaRef.current.scrollHeight)}px`;
    }
  }, [value]);

  return (
    <div className="bg-surface/90 rounded-2xl border border-neutral-800 p-5 sm:p-7 md:p-8 shadow-2xl transition-all duration-300 focus-within:border-accent/80 focus-within:ring-1 focus-within:ring-accent/80 focus-within:shadow-[0_0_35px_rgba(229,169,60,0.18)]">
      {/* Header bar of textarea */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 shrink-0">
            <PenLine className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              The Everyday Event
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              What ordinary thing did you do today? Keep it factual.
            </p>
          </div>
        </div>

        <span className="text-xs sm:text-sm font-mono text-neutral-400 font-medium">
          {value.length}/300
        </span>
      </div>

      {/* Centerpiece Textarea */}
      <div className="relative">
        <label htmlFor="everyday-event-input" className="sr-only">
          The everyday event to LinkedInify
        </label>
        <textarea
          id="everyday-event-input"
          name="everyday-event-input"
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={300}
          aria-label="The everyday event to LinkedInify"
          aria-describedby={value.trim().length > 0 && value.trim().length < 5 ? "short-input-nudge" : undefined}
          className="w-full resize-none overflow-hidden rounded-xl border border-neutral-800/80 bg-[#080808] p-4 sm:p-5 md:p-6 text-base sm:text-xl md:text-2xl text-white placeholder:text-neutral-600 focus:bg-[#0a0a0a] focus:border-amber-500/50 focus:outline-hidden leading-relaxed font-normal transition-all duration-200"
          style={{ minHeight: "180px" }}
        />
      </div>

      {/* Soft nudge for short/vague inputs */}
      {value.trim().length > 0 && value.trim().length < 5 && (
        <p
          id="short-input-nudge"
          className="mt-3 text-xs sm:text-sm text-amber-400/90 font-medium flex items-center gap-1.5 animate-slide-up-fade"
        >
          <span>✦</span>
          <span>Give us a little more to synergize with (at least 5 characters of mundane reality).</span>
        </p>
      )}
    </div>
  );
}

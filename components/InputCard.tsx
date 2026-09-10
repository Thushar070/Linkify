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
      const isMobile = window.innerWidth < 640;
      const minHeight = isMobile ? 120 : 180;
      const maxHeight = isMobile ? 220 : 360;
      const scrollH = textareaRef.current.scrollHeight;
      const targetHeight = Math.min(maxHeight, Math.max(minHeight, scrollH));
      textareaRef.current.style.height = `${targetHeight}px`;
      textareaRef.current.style.overflowY = scrollH > maxHeight ? "auto" : "hidden";
    }
  }, [value]);

  return (
    <div className="bg-surface rounded-2xl border border-border p-4 sm:p-7 md:p-8 shadow-xs transition-all duration-300 focus-within:border-text/70 focus-within:ring-1 focus-within:ring-text/70">
      {/* Header bar of textarea */}
      <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-subtle border border-border text-text shrink-0">
            <PenLine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-lg font-bold text-text tracking-tight">
              The Everyday Event
            </h2>
            <p className="text-[11px] sm:text-sm text-text-muted">
              What ordinary thing did you do today? Keep it factual.
            </p>
          </div>
        </div>

        <span className="text-xs sm:text-sm font-mono text-text-subtle font-medium shrink-0">
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
          className="w-full resize-none rounded-xl border border-border bg-surface-subtle p-3.5 sm:p-5 md:p-6 text-base sm:text-xl md:text-2xl text-text placeholder:text-text-subtle focus:border-text focus:outline-hidden leading-relaxed font-normal transition-all duration-200 min-h-[120px] sm:min-h-[180px] max-h-[220px] sm:max-h-[360px]"
        />
      </div>

      {/* Soft nudge for short/vague inputs */}
      {value.trim().length > 0 && value.trim().length < 5 && (
        <p
          id="short-input-nudge"
          className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-text-muted font-medium flex items-center gap-1.5 animate-slide-up-fade"
        >
          <span>✦</span>
          <span>Give us a little more to synergize with (at least 5 characters of mundane reality).</span>
        </p>
      )}
    </div>
  );
}

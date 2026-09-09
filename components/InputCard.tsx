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
  placeholder = "What happened today?",
  disabled = false,
}: InputCardProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(84, textareaRef.current.scrollHeight)}px`;
    }
  }, [value]);

  return (
    <div className="bg-surface rounded-linkedin border border-border p-4 sm:p-5 shadow-xs transition-all duration-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-surface-subtle border border-border text-text">
          <PenLine className="w-3.5 h-3.5" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text tracking-tight">
            Event Description
          </h2>
          <p className="text-xs text-text-muted">
            Enter what occurred in plain language
          </p>
        </div>
      </div>

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={300}
          className="w-full resize-none overflow-hidden rounded-md border border-border bg-surface-subtle p-3 text-sm text-text placeholder:text-text-subtle focus:bg-surface focus:border-accent focus:outline-hidden focus:ring-1 focus:ring-accent focus:shadow-[0_0_15px_rgba(229,169,60,0.15)] transition-all duration-200"
          style={{ minHeight: "84px" }}
        />
        <div className="flex justify-between items-center mt-1.5 px-0.5 text-xs text-text-subtle">
          <span>Keep it simple and factual.</span>
          <span>{value.length}/300</span>
        </div>
      </div>
    </div>
  );
}

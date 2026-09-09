import React from "react";
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
  placeholder = "What happened today? (e.g. I ate an apple, I fixed a typo, I drank coffee...)",
  disabled = false,
}: InputCardProps) {
  return (
    <div className="bg-surface rounded-linkedin border border-border p-4 sm:p-5 shadow-xs transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent-subtle text-accent">
          <PenLine className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text tracking-tight">
            The Mundane Event
          </h2>
          <p className="text-xs text-text-muted">
            Describe what you actually did in plain, honest words
          </p>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={3}
          maxLength={300}
          className="w-full resize-none rounded-md border border-border bg-surface-subtle p-3 text-sm text-text placeholder:text-text-subtle focus:bg-surface focus:border-accent focus:outline-hidden focus:ring-1 focus:ring-accent transition-all duration-150"
        />
        <div className="flex justify-between items-center mt-1.5 px-0.5 text-xs text-text-subtle">
          <span>Be painfully honest. No buzzwords yet.</span>
          <span>{value.length}/300</span>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Lightbulb } from "lucide-react";

export const DEFAULT_EXAMPLES = [
  "I ate an apple.",
  "I drank coffee.",
  "I fixed a typo.",
  "I slept for 8 hours.",
  "I touched grass.",
  "I ate biryani.",
  "I opened VS Code.",
  "I attended a meeting.",
];

interface ExampleChipsProps {
  onSelect: (sentence: string) => void;
  selected?: string;
  disabled?: boolean;
}

export default function ExampleChips({
  onSelect,
  selected,
  disabled = false,
}: ExampleChipsProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
        <Lightbulb className="w-3.5 h-3.5 text-accent" />
        <span>Try a real mundane action:</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {DEFAULT_EXAMPLES.map((example) => {
          const isSelected = selected === example;
          return (
            <button
              key={example}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(example)}
              className={`rounded-full border px-3 py-1 text-xs transition-all duration-150 text-left font-normal cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                isSelected
                  ? "border-accent bg-accent-subtle font-medium text-accent shadow-2xs"
                  : "border-border bg-surface text-text hover:border-accent/60 hover:bg-surface-hover"
              }`}
            >
              {example}
            </button>
          );
        })}
      </div>
    </div>
  );
}

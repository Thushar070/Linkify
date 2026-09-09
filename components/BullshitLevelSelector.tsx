import React from "react";
import { Gauge } from "lucide-react";

export type BullshitLevel = "mild" | "corporate" | "influencer" | "final-boss";

export interface BullshitLevelOption {
  id: BullshitLevel;
  label: string;
  sublabel: string;
  description: string;
}

export const BULLSHIT_LEVELS: BullshitLevelOption[] = [
  {
    id: "mild",
    label: "Mild",
    sublabel: "Stage 1",
    description: "Modest spin, 1-2 buzzwords, polite exaggeration.",
  },
  {
    id: "corporate",
    label: "Corporate",
    sublabel: "Stage 2",
    description: "Standard corporate jargon: synergy, strategic alignment, paradigms.",
  },
  {
    id: "influencer",
    label: "Influencer",
    sublabel: "Stage 3",
    description: "Short punchy lines, unsolicited life lessons, aggressive positivity.",
  },
  {
    id: "final-boss",
    label: "Final Boss",
    sublabel: "Stage 4",
    description: "Peak corporate delirium. Quantum leadership, pure ego.",
  },
];

interface BullshitLevelSelectorProps {
  value: BullshitLevel;
  onChange: (level: BullshitLevel) => void;
  disabled?: boolean;
}

export default function BullshitLevelSelector({
  value,
  onChange,
  disabled = false,
}: BullshitLevelSelectorProps) {
  const activeIndex = BULLSHIT_LEVELS.findIndex((l) => l.id === value);
  const activeOption = BULLSHIT_LEVELS[activeIndex] || BULLSHIT_LEVELS[1];

  return (
    <div className="bg-surface rounded-linkedin border border-border p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-surface-subtle border border-border text-text">
            <Gauge className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text tracking-tight">
              Inflation Level
            </h2>
            <p className="text-xs text-text-muted">
              Select how aggressively the narrative is inflated
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-subtle border border-border text-text-muted">
          {activeOption.label} • {activeOption.sublabel}
        </span>
      </div>

      {/* Segmented control with animated sliding indicator */}
      <div
        role="radiogroup"
        aria-label="Inflation level selector"
        className="relative grid grid-cols-4 p-1 bg-surface-subtle rounded-md border border-border-subtle select-none"
      >
        {/* Animated sliding pill */}
        <div
          className="absolute top-1 bottom-1 left-1 rounded-sm bg-white shadow-xs transition-all duration-200 ease-out pointer-events-none"
          style={{
            width: "calc((100% - 8px) / 4)",
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />

        {BULLSHIT_LEVELS.map((level) => {
          const isActive = value === level.id;
          return (
            <button
              key={level.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              disabled={disabled}
              onClick={() => onChange(level.id)}
              className={`relative z-10 flex flex-col items-center justify-center py-2 px-1 rounded-sm text-xs transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                isActive
                  ? "text-black font-semibold"
                  : "text-text-muted hover:text-white"
              }`}
            >
              <span className="font-medium truncate">{level.label}</span>
              <span className="text-[10px] opacity-75 font-normal truncate">
                {level.sublabel}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-text-muted italic px-1">
        "{activeOption.description}"
      </p>
    </div>
  );
}

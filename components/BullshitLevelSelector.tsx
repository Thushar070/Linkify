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
    description: "Standard LinkedIn jargon: synergy, strategic alignment, paradigms.",
  },
  {
    id: "influencer",
    label: "Influencer",
    sublabel: "Stage 3",
    description: "One-sentence paragraphs, toxic positivity, unsolicited life lessons.",
  },
  {
    id: "final-boss",
    label: "Final Boss",
    sublabel: "Stage 4",
    description: "Peak corporate delirium. Quantum leadership, universe impact, pure ego.",
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
  const activeOption = BULLSHIT_LEVELS.find((l) => l.id === value) || BULLSHIT_LEVELS[1];

  return (
    <div className="bg-surface rounded-linkedin border border-border p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent-subtle text-accent">
            <Gauge className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text tracking-tight">
              Bullshit Level
            </h2>
            <p className="text-xs text-text-muted">
              Select how aggressively the narrative is inflated
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-accent-subtle text-accent border border-accent/20">
          {activeOption.label} • {activeOption.sublabel}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-surface-subtle rounded-md border border-border-subtle">
        {BULLSHIT_LEVELS.map((level) => {
          const isActive = value === level.id;
          return (
            <button
              key={level.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(level.id)}
              className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-sm text-xs transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                isActive
                  ? "bg-surface text-accent font-semibold shadow-xs border border-accent/30"
                  : "text-text-muted hover:text-text hover:bg-surface/50 border border-transparent"
              }`}
            >
              <span className="font-semibold">{level.label}</span>
              <span className="text-[10px] opacity-75 font-normal">{level.sublabel}</span>
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

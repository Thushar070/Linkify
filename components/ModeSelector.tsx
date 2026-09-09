import React from "react";
import { Sparkles, Briefcase, Flame } from "lucide-react";

export type LinkedinMode = "linkedinify" | "ceo" | "max-bs";

export interface ModeOption {
  id: LinkedinMode;
  name: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const MODE_OPTIONS: ModeOption[] = [
  {
    id: "linkedinify",
    name: "LinkedInify",
    tagline: "Standard executive spin",
    icon: Sparkles,
  },
  {
    id: "ceo",
    name: "CEO Mode",
    tagline: "Strategic resource allocation",
    icon: Briefcase,
  },
  {
    id: "max-bs",
    name: "Maximum Bullshit",
    tagline: "Unhinged corporate delirium",
    icon: Flame,
  },
];

interface ModeSelectorProps {
  value: LinkedinMode;
  onChange: (mode: LinkedinMode) => void;
  disabled?: boolean;
}

export default function ModeSelector({
  value,
  onChange,
  disabled = false,
}: ModeSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-text-muted">
        Persona
      </span>

      {/* Model-switcher style segmented pill */}
      <div
        role="radiogroup"
        aria-label="Persona mode selector"
        className="inline-flex p-1 rounded-lg bg-surface border border-border w-full sm:w-auto"
      >
        {MODE_OPTIONS.map((mode) => {
          const isSelected = value === mode.id;
          const Icon = mode.icon;

          return (
            <button
              key={mode.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange(mode.id)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-md text-xs transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                isSelected
                  ? "bg-white text-black font-semibold shadow-xs"
                  : "text-text-muted hover:text-white hover:bg-surface-hover"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{mode.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

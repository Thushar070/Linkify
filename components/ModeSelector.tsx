import React from "react";
import { Sparkles, Briefcase, Flame } from "lucide-react";

export type LinkedinMode = "linkedinify" | "ceo" | "max-bs";

export interface ModeOption {
  id: LinkedinMode;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const MODE_OPTIONS: ModeOption[] = [
  {
    id: "linkedinify",
    name: "LinkedInify",
    icon: Sparkles,
  },
  {
    id: "ceo",
    name: "CEO Mode",
    icon: Briefcase,
  },
  {
    id: "max-bs",
    name: "Maximum Bullshit",
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
  const activeIndex = MODE_OPTIONS.findIndex((m) => m.id === value);

  const getIndicatorColor = () => {
    switch (value) {
      case "linkedinify":
        return "bg-white";
      case "ceo":
        return "bg-accent";
      case "max-bs":
        return "bg-gradient-to-r from-red-600 via-orange-500 to-amber-500";
      default:
        return "bg-white";
    }
  };

  const getActiveTextColor = () => {
    switch (value) {
      case "linkedinify":
      case "ceo":
        return "text-black font-semibold";
      case "max-bs":
        return "text-white font-semibold";
      default:
        return "text-black font-semibold";
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-text-muted">
        Persona Mode
      </span>

      {/* Segmented control container with sliding pill */}
      <div
        role="radiogroup"
        aria-label="Persona mode selector"
        className="relative flex p-1 rounded-lg bg-surface border border-border w-full sm:w-[440px] select-none"
      >
        {/* Animated sliding indicator pill */}
        <div
          className={`absolute top-1 bottom-1 left-1 rounded-md transition-all duration-200 ease-out pointer-events-none shadow-xs ${getIndicatorColor()}`}
          style={{
            width: "calc((100% - 8px) / 3)",
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />

        {/* Mode buttons */}
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
              className={`relative z-10 flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 text-xs transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                isSelected
                  ? getActiveTextColor()
                  : "text-text-muted hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{mode.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

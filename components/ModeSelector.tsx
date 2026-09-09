import React from "react";
import { Briefcase } from "lucide-react";

export type LinkedinMode =
  | "linkedinify"
  | "ceo"
  | "influencer"
  | "humble-brag"
  | "recruiter"
  | "max-bs";

export interface ModeOption {
  id: LinkedinMode;
  emoji: string;
  name: string;
  tagline: string;
}

export const MODE_OPTIONS: ModeOption[] = [
  {
    id: "linkedinify",
    emoji: "🚀",
    name: "LinkedInify",
    tagline: "The classic thought leader transformation",
  },
  {
    id: "ceo",
    emoji: "🧑‍💼",
    name: "CEO Mode",
    tagline: "Terse, strategic capital allocation tone",
  },
  {
    id: "influencer",
    emoji: "📢",
    name: "Influencer Mode",
    tagline: "One-liners, toxic positivity, 'Agree?'",
  },
  {
    id: "humble-brag",
    emoji: "🙏",
    name: "Humble Brag",
    tagline: "False modesty masking shameless bragging",
  },
  {
    id: "recruiter",
    emoji: "💼",
    name: "Recruiter Mode",
    tagline: "Action-oriented resume & hiring buzzwords",
  },
  {
    id: "max-bs",
    emoji: "🔥",
    name: "Maximum Bullshit",
    tagline: "Unhinged corporate jargon overload",
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
    <div className="bg-surface rounded-linkedin border border-border p-4 sm:p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent-subtle text-accent">
          <Briefcase className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text tracking-tight">
            Persona & Tone Mode
          </h2>
          <p className="text-xs text-text-muted">
            Choose the personality that narrates your daily achievement
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {MODE_OPTIONS.map((mode) => {
          const isSelected = value === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(mode.id)}
              className={`flex flex-col items-start p-3 rounded-md border text-left transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                isSelected
                  ? "border-accent bg-accent-subtle/40 ring-1 ring-accent text-text"
                  : "border-border bg-surface hover:border-accent/40 hover:bg-surface-hover text-text"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base leading-none">{mode.emoji}</span>
                <span className="text-xs font-semibold text-text">
                  {mode.name}
                </span>
              </div>
              <span className="text-[11px] text-text-muted line-clamp-2 leading-tight">
                {mode.tagline}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

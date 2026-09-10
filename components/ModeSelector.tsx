"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Briefcase, Flame, ChevronDown, Check } from "lucide-react";

export type LinkedinMode = "linkedinify" | "ceo" | "max-bs";

export interface ModeOption {
  id: LinkedinMode;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const MODE_OPTIONS: ModeOption[] = [
  {
    id: "linkedinify",
    name: "LinkedInify",
    shortName: "LinkedIn",
    tagline: "Thought Leader",
    description: "Classic viral storytelling, humblebrags & dramatic line breaks",
    icon: Sparkles,
  },
  {
    id: "ceo",
    name: "CEO Mode",
    shortName: "CEO",
    tagline: "Executive",
    description: "Ruthless execution, quarterly velocity & unhinged hustle culture",
    icon: Briefcase,
  },
  {
    id: "max-bs",
    name: "Maximum Bullshit",
    shortName: "Max BS",
    tagline: "Peak Satire",
    description: "Quantum corporate word salad, paradigm shifts & cosmic synergy",
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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    MODE_OPTIONS.find((m) => m.id === value) || MODE_OPTIONS[0];
  const CurrentIcon = selectedOption.icon;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (mode: LinkedinMode) => {
    onChange(mode);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left shrink-0">
      {/* Compact trigger pill with mobile short name */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none min-h-[36px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          isOpen
            ? "bg-surface-hover border-border text-text shadow-sm ring-1 ring-border"
            : "bg-surface hover:bg-surface-hover border-border text-text"
        }`}
      >
        <CurrentIcon className="w-3.5 h-3.5 shrink-0 text-text" />
        <span className="font-semibold hidden sm:inline">{selectedOption.name}</span>
        <span className="font-semibold sm:hidden text-xs">{selectedOption.shortName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-text-subtle transition-transform duration-200 ease-out ${
            isOpen ? "rotate-180 text-text" : ""
          }`}
        />
      </button>

      {/* Floating Menu clamped to viewport */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select generation persona"
          className="absolute right-0 mt-2 w-[calc(100vw-28px)] max-w-xs sm:w-80 rounded-xl bg-surface border border-border shadow-2xl p-1.5 z-40 backdrop-blur-xl animate-slide-up-fade max-h-[80vh] overflow-y-auto"
        >
          <div className="px-2.5 py-1.5 text-[11px] font-semibold text-text-subtle uppercase tracking-wider">
            Generation Persona
          </div>

          <div className="space-y-1">
            {MODE_OPTIONS.map((option) => {
              const isSelected = option.id === value;
              const Icon = option.icon;

              return (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full text-left flex items-start gap-3 p-2.5 sm:p-3 rounded-lg transition-colors duration-150 cursor-pointer min-h-[44px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                    isSelected
                      ? "bg-surface-hover text-text font-medium border border-border"
                      : "hover:bg-surface-subtle text-text-muted hover:text-text border border-transparent"
                  }`}
                >
                  <div className="mt-0.5 p-1.5 rounded-md bg-surface-subtle border border-border shrink-0">
                    <Icon className="w-4 h-4 text-text" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-xs sm:text-sm font-semibold text-text truncate">
                        {option.name}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-text shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

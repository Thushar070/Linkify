"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Briefcase, Flame, ChevronDown, Check } from "lucide-react";

export type LinkedinMode = "linkedinify" | "ceo" | "max-bs";

export interface ModeOption {
  id: LinkedinMode;
  name: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

export const MODE_OPTIONS: ModeOption[] = [
  {
    id: "linkedinify",
    name: "LinkedInify",
    tagline: "Thought Leader",
    description: "Classic viral storytelling, humblebrags & dramatic line breaks",
    icon: Sparkles,
    iconColor: "text-amber-400",
  },
  {
    id: "ceo",
    name: "CEO Mode",
    tagline: "Executive",
    description: "Ruthless execution, quarterly velocity & unhinged hustle culture",
    icon: Briefcase,
    iconColor: "text-neutral-200",
  },
  {
    id: "max-bs",
    name: "Maximum Bullshit",
    tagline: "Peak Satire",
    description: "Quantum corporate word salad, paradigm shifts & cosmic synergy",
    icon: Flame,
    iconColor: "text-orange-500",
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
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Claude-style compact trigger pill */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
          isOpen
            ? "bg-neutral-900 border-neutral-700 text-white shadow-md shadow-black/40 ring-1 ring-neutral-700"
            : "bg-surface/80 hover:bg-surface-hover border-border text-neutral-300 hover:text-white"
        }`}
      >
        <CurrentIcon className={`w-3.5 h-3.5 shrink-0 ${selectedOption.iconColor}`} />
        <span className="font-semibold">{selectedOption.name}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ease-out ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select generation persona"
          className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-[#0d0d0d] border border-neutral-800 shadow-2xl p-1.5 z-40 backdrop-blur-xl animate-slide-up-fade"
        >
          <div className="px-2.5 py-1.5 text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
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
                  className={`w-full text-left flex items-start gap-3 p-2.5 rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500/80 focus-visible:ring-offset-1 focus-visible:ring-offset-black ${
                    isSelected
                      ? "bg-neutral-800/80 text-white"
                      : "hover:bg-neutral-900 text-neutral-300 hover:text-white"
                  }`}
                >
                  <div className="mt-0.5 p-1.5 rounded-md bg-neutral-900 border border-neutral-800 shrink-0">
                    <Icon className={`w-4 h-4 ${option.iconColor}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-xs font-semibold text-white truncate">
                        {option.name}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-snug mt-0.5 line-clamp-2">
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

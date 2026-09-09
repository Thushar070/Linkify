import React from "react";
import { ArrowRight, Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
}

export default function GenerateButton({
  onClick,
  loading = false,
  disabled = false,
  text = "Linkedinify",
}: GenerateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-accent text-accent-foreground font-bold text-base sm:text-lg transition-all duration-300 ease-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 shadow-[0_0_16px_rgba(229,169,60,0.25)] hover:shadow-[0_0_28px_rgba(229,169,60,0.5)] hover:bg-accent-hover active:scale-[0.99] select-none ${
        loading ? "pr-8 pl-7" : ""
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin text-accent-foreground shrink-0 transition-all duration-200" />
          <span className="transition-opacity duration-200">Generating...</span>
        </>
      ) : (
        <>
          <span className="transition-opacity duration-200">{text}</span>
          <ArrowRight className="w-5 h-5 shrink-0 transition-transform duration-200" />
        </>
      )}
    </button>
  );
}

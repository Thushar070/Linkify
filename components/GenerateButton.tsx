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
      className={`relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-accent text-accent-foreground font-semibold text-sm transition-all duration-300 ease-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_0_12px_rgba(229,169,60,0.2)] hover:shadow-[0_0_24px_rgba(229,169,60,0.45)] hover:bg-accent-hover active:scale-[0.99] ${
        loading ? "pr-6 pl-5" : ""
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-accent-foreground shrink-0 transition-all duration-200" />
          <span className="transition-opacity duration-200">Generating...</span>
        </>
      ) : (
        <>
          <span className="transition-opacity duration-200">{text}</span>
          <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200" />
        </>
      )}
    </button>
  );
}

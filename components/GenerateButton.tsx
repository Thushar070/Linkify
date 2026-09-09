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
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-accent text-accent-foreground font-semibold text-sm shadow-xs hover:bg-accent-hover active:scale-[0.99] transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-accent-foreground" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

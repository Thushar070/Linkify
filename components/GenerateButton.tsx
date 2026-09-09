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
  text = "Linkedinify This",
}: GenerateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold text-sm shadow-xs hover:bg-accent-hover active:scale-[0.99] transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-white" />
          <span>Transforming into Synergy...</span>
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

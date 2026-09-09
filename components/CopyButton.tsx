"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text to clipboard:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : "Copy post text"}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-200 cursor-pointer active:scale-95 select-none ${
        copied
          ? "border-accent-success/40 bg-accent-success-subtle text-accent-success shadow-2xs"
          : "border-border bg-surface text-text hover:border-text-muted hover:bg-surface-hover shadow-2xs"
      } ${className}`}
    >
      <span
        className={`inline-flex items-center transition-transform duration-200 ease-out ${
          copied ? "scale-125" : "scale-100"
        }`}
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-accent-success" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-text-muted" />
        )}
      </span>
      <span className="transition-opacity duration-150">
        {copied ? "Copied!" : "Copy Post"}
      </span>
    </button>
  );
}

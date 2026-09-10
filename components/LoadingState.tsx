"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const LOADING_MESSAGES = [
  "Generating executive narrative...",
  "Applying corporate spin...",
  "Structuring strategic takeaways...",
  "Finalizing thought leadership post...",
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3 animate-in fade-in duration-200">
      <div className="flex items-center justify-center gap-2 p-3 rounded-md bg-surface border border-border text-text-muted text-xs">
        <Loader2 className="w-4 h-4 animate-spin text-text" />
        <span>{LOADING_MESSAGES[messageIndex]}</span>
      </div>

      <div className="bg-surface rounded-linkedin border border-border p-5 shadow-xs space-y-3">
        <div className="h-3.5 w-11/12 bg-surface-subtle rounded-sm animate-pulse" />
        <div className="h-3 w-full bg-surface-subtle/80 rounded-sm animate-pulse" />
        <div className="h-3 w-4/5 bg-surface-subtle/80 rounded-sm animate-pulse" />
        <div className="h-3 w-2/3 bg-surface-subtle/60 rounded-sm animate-pulse" />
        <div className="h-3 w-3/4 bg-surface-subtle/80 rounded-sm animate-pulse pt-2" />
        <div className="h-3 w-1/2 bg-surface-subtle/60 rounded-sm animate-pulse" />
      </div>
    </div>
  );
}

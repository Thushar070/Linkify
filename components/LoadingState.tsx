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
        <Loader2 className="w-4 h-4 animate-spin text-accent" />
        <span>{LOADING_MESSAGES[messageIndex]}</span>
      </div>

      <div className="bg-surface rounded-linkedin border border-border p-5 shadow-xs space-y-3">
        <div className="h-3.5 w-11/12 bg-border/60 rounded animate-pulse" />
        <div className="h-3 w-full bg-border/40 rounded animate-pulse" />
        <div className="h-3 w-4/5 bg-border/40 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-border/30 rounded animate-pulse" />
        <div className="h-3 w-3/4 bg-border/40 rounded animate-pulse pt-2" />
        <div className="h-3 w-1/2 bg-border/30 rounded animate-pulse" />
      </div>
    </div>
  );
}

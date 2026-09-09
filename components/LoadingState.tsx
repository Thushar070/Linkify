"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const LOADING_MESSAGES = [
  "Extracting executive synergy from mundane action...",
  "Formulating unsolicited LinkedIn life lessons...",
  "Calculating corporate inflation percentage...",
  "Synthesizing cross-functional paradigm shifts...",
  "Consulting non-existent advisory board...",
  "Adding 'Agree? 👇' to end of paragraph...",
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
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Humorous status ticker */}
      <div className="flex items-center justify-center gap-2 p-3 rounded-md bg-accent-subtle/50 border border-accent/20 text-accent text-xs font-medium">
        <Loader2 className="w-4 h-4 animate-spin text-accent" />
        <span className="transition-all duration-300">
          {LOADING_MESSAGES[messageIndex]}
        </span>
      </div>

      {/* LinkedIn Post Card Skeleton */}
      <div className="bg-surface rounded-linkedin border border-border p-4 sm:p-5 shadow-xs space-y-4">
        {/* Header skeleton */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-border/60 animate-pulse shrink-0" />
          <div className="space-y-2 flex-1 pt-1">
            <div className="h-3.5 w-32 bg-border/70 rounded animate-pulse" />
            <div className="h-2.5 w-3/4 bg-border/50 rounded animate-pulse" />
            <div className="h-2 w-20 bg-border/40 rounded animate-pulse" />
          </div>
        </div>

        {/* Post body skeleton */}
        <div className="space-y-2.5 pt-2">
          <div className="h-3 w-11/12 bg-border/60 rounded animate-pulse" />
          <div className="h-3 w-full bg-border/50 rounded animate-pulse" />
          <div className="h-3 w-4/5 bg-border/50 rounded animate-pulse" />
          <div className="h-3 w-2/3 bg-border/40 rounded animate-pulse" />
        </div>

        {/* Bullet points skeleton */}
        <div className="space-y-2 py-2">
          <div className="h-2.5 w-3/4 bg-border/50 rounded animate-pulse" />
          <div className="h-2.5 w-5/6 bg-border/50 rounded animate-pulse" />
          <div className="h-2.5 w-1/2 bg-border/40 rounded animate-pulse" />
        </div>

        {/* Footer actions skeleton */}
        <div className="pt-3 border-t border-border/40 flex items-center justify-between">
          <div className="h-3 w-24 bg-border/40 rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="h-3 w-12 bg-border/40 rounded animate-pulse" />
            <div className="h-3 w-12 bg-border/40 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

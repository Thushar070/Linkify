"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[RouteError] Unhandled route error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background text-text flex items-center justify-center p-4 selection:bg-text selection:text-background">
      <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-6 sm:p-8 text-center shadow-2xl space-y-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-surface-subtle border border-border text-text">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-text-subtle">
            Runtime Volatility
          </span>
          <h1 className="text-2xl font-black tracking-tight text-text">
            Unexpected Synergy Disruption
          </h1>
          <p className="text-sm text-text-muted leading-relaxed">
            Our corporate algorithms encountered an unhandled exception during paradigm execution. Let&apos;s realign operational focus and retry.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] py-3 px-4 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:bg-accent-hover transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Recalibrate (Retry)</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] py-3 px-4 rounded-xl border border-border bg-surface-subtle hover:bg-surface-hover text-text font-semibold text-sm transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

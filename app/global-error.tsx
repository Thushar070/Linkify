"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[GlobalError] Root layout failure:", error);
  }, [error]);

  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full bg-[#000000] text-[#FFFFFF] font-sans antialiased flex items-center justify-center p-4 overflow-x-hidden">
        <div className="max-w-md w-full rounded-2xl border border-[#262626] bg-[#0d0d0d] p-6 sm:p-8 text-center shadow-2xl space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#171717] border border-[#262626] text-[#FFFFFF]">
            <AlertOctagon className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#737373]">
              Fatal Exception
            </span>
            <h1 className="text-2xl font-black tracking-tight text-[#FFFFFF]">
              Critical System Halt
            </h1>
            <p className="text-sm text-[#A3A3A3] leading-relaxed">
              A foundational infrastructure disruption occurred at the root layout layer. Recalibrate immediately to resume thought leadership operations.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] py-3 px-5 rounded-xl bg-[#FFFFFF] text-[#000000] font-bold text-sm hover:bg-[#E5E5E5] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restart Infrastructure</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

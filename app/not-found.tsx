import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-text flex items-center justify-center p-4 selection:bg-text selection:text-background">
      <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-6 sm:p-8 text-center shadow-2xl space-y-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-surface-subtle border border-border text-text">
          <Compass className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-text-subtle">
            Error 404
          </span>
          <h1 className="text-2xl font-black tracking-tight text-text">
            Strategic Direction Not Found
          </h1>
          <p className="text-sm text-text-muted leading-relaxed">
            The synergy pipeline was unable to locate this operational endpoint. It may have been deprecated, restructured, or eliminated for cross-functional efficiency.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full min-h-[44px] py-3 px-5 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:bg-accent-hover transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Thought Leadership</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

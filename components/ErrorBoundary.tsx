"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught leadership error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background text-text flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-subtle border border-border text-text">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-text">
              A Strategic Synergy Interruption
            </h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Even high-performing thought leaders encounter unexpected runtime volatility. Take a deep breath and recalibrate your operational alignment.
            </p>
            <button
              onClick={this.handleReset}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent-hover transition-colors focus:outline-hidden focus:ring-2 focus:ring-text cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Recalibrate Paradigm
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

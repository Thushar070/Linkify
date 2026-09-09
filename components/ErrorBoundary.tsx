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
        <div className="min-h-screen bg-[#0E0D0C] text-[#FAF6EE] flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl border border-[#2A2825] bg-[#171614] p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5A93C]/10 border border-[#E5A93C]/20 text-[#E5A93C]">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#FAF6EE]">
              A Strategic Synergy Interruption
            </h2>
            <p className="mt-3 text-sm text-[#A8A29E] leading-relaxed">
              Even high-performing thought leaders encounter unexpected runtime volatility. Take a deep breath and recalibrate your operational alignment.
            </p>
            <button
              onClick={this.handleReset}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#E5A93C] px-5 py-2.5 text-sm font-semibold text-[#0E0D0C] hover:bg-[#F0B84D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/50"
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

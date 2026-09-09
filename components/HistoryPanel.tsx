"use client";

import React, { useState, useEffect } from "react";
import { HistoryEntry, formatRelativeTime } from "@/lib/history";
import CopyButton from "./CopyButton";
import { X, Trash2, Clock, ArrowRight, AlertCircle } from "lucide-react";

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  onSelectEntry: (entry: HistoryEntry) => void;
  onDeleteEntry: (id: string) => void;
  onClearHistory: () => void;
}

export default function HistoryPanel({
  isOpen,
  onClose,
  history,
  onSelectEntry,
  onDeleteEntry,
  onClearHistory,
}: HistoryPanelProps) {
  const [confirmClear, setConfirmClear] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset clear confirmation and lock body scroll when panel open/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setConfirmClear(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case "ceo":
        return "CEO Mode";
      case "max-bs":
        return "Max BS";
      case "linkedinify":
      default:
        return "LinkedInify";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-[#141312] border-l border-[#2A2825] shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Generation History"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#2A2825] flex items-center justify-between bg-[#171614]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E5A93C]/10 border border-[#E5A93C]/20 text-[#E5A93C]">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-[#FAF6EE] flex items-center gap-2">
                Generation History
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-[#2A2825] text-[#A8A29E]">
                  {history.length}
                </span>
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A8A29E] hover:text-[#FAF6EE] hover:bg-[#2A2825] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E5A93C]/50 cursor-pointer"
            aria-label="Close history panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* History List or Empty State */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-xl border border-dashed border-[#E5A93C]/30 bg-[#E5A93C]/5 flex items-center justify-center text-[#E5A93C] mb-3">
                <Clock className="w-6 h-6 opacity-80" />
              </div>
              <h3 className="text-sm font-semibold text-[#FAF6EE]">No history yet</h3>
              <p className="mt-1.5 text-xs text-[#A8A29E] max-w-[240px] leading-relaxed">
                Posts you generate will be saved automatically here in your browser for quick access.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl border border-[#2A2825] bg-[#171614] hover:border-[#E5A93C]/40 hover:bg-[#1C1A18] transition-all p-3.5 flex flex-col gap-2.5 shadow-xs"
              >
                {/* Top row: Mode badge, relative timestamp, action buttons */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide uppercase bg-[#2A2825] text-[#E5A93C] border border-[#E5A93C]/20">
                      {getModeLabel(item.mode)}
                    </span>
                    <span className="text-[11px] text-[#A8A29E]">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <CopyButton
                      text={item.postText}
                      className="px-2 py-1 text-[11px] rounded-md"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteEntry(item.id);
                      }}
                      className="p-1 rounded-md text-[#78716C] hover:text-red-400 hover:bg-red-950/20 transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-red-500/50 cursor-pointer"
                      title="Delete this entry"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Original prompt sentence */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectEntry(item);
                    onClose();
                  }}
                  className="text-left group/btn focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#E5A93C] rounded-sm cursor-pointer"
                >
                  <p className="text-xs sm:text-sm font-medium text-[#FAF6EE] line-clamp-2 leading-snug group-hover/btn:text-[#E5A93C] transition-colors">
                    &ldquo;{item.originalSentence}&rdquo;
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] text-[#A8A29E] group-hover/btn:text-[#FAF6EE]">
                    <span>Load into editor</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                  </div>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Clear All */}
        {history.length > 0 && (
          <div className="p-3.5 border-t border-[#2A2825] bg-[#171614] flex items-center justify-between gap-3">
            {confirmClear ? (
              <div className="flex items-center justify-between w-full gap-2 animate-fade-in">
                <span className="text-xs text-[#E5A93C] flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  Clear all {history.length} entries?
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onClearHistory();
                      setConfirmClear(false);
                    }}
                    className="px-2.5 py-1 rounded-md bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Yes, clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="px-2.5 py-1 rounded-md bg-[#2A2825] text-[#FAF6EE] text-xs hover:bg-[#383531] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="w-full py-2 rounded-lg border border-[#2A2825] bg-transparent text-[#A8A29E] hover:text-red-400 hover:border-red-950/40 hover:bg-red-950/10 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500/50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear all history</span>
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

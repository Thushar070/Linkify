"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HistoryEntry, formatRelativeTime, exportHistoryAsJson } from "@/lib/history";
import CopyButton from "./CopyButton";
import { X, Trash2, Clock, ArrowRight, AlertCircle, Download, PanelLeftClose } from "lucide-react";

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

  const handleClose = useCallback(() => {
    setConfirmClear(false);
    onClose();
  }, [onClose]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Lock body scroll on mobile only when drawer is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case "ceo":
        return "CEO";
      case "max-bs":
        return "Max BS";
      case "linkedinify":
      default:
        return "LinkedIn";
    }
  };

  const handleEntryClick = (item: HistoryEntry) => {
    onSelectEntry(item);
    if (window.innerWidth < 768) {
      handleClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Left Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 z-50 md:z-30 h-full w-80 max-w-[90vw] sm:max-w-xs bg-surface border-r border-border shadow-2xl md:shadow-none flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="region"
        aria-label="Generation History Sidebar"
      >
        {/* Sidebar Header */}
        <div className="h-16 px-4 border-b border-border flex items-center justify-between bg-surface shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-subtle border border-border text-text">
              <Clock className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-text">
                History
              </h2>
              {history.length > 0 && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-surface-subtle text-text-muted border border-border">
                  {history.length}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {history.length > 0 && (
              <button
                type="button"
                onClick={() => exportHistoryAsJson(history)}
                className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-subtle transition-colors cursor-pointer"
                title="Download history as JSON"
                aria-label="Download history as JSON"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-subtle transition-colors cursor-pointer"
              aria-label="Close sidebar"
              title="Close sidebar"
            >
              <PanelLeftClose className="h-4 w-4 hidden md:block" />
              <X className="h-4 w-4 md:hidden" />
            </button>
          </div>
        </div>

        {/* History List or Empty State */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-xl border border-dashed border-border bg-surface-subtle flex items-center justify-center text-text-subtle mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-text">No history yet</h3>
              <p className="mt-1.5 text-xs text-text-muted max-w-[220px] leading-relaxed">
                Posts you generate will appear here automatically for one-click reloading and export.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl border border-border bg-surface hover:border-text-muted hover:bg-surface-hover transition-all p-3 flex flex-col gap-2 shadow-xs"
              >
                {/* Top row: Mode badge, relative timestamp, actions */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase bg-surface-subtle text-text border border-border shrink-0">
                      {getModeLabel(item.mode)}
                    </span>
                    <span className="text-[11px] text-text-subtle truncate">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <CopyButton
                      text={item.postText}
                      className="px-2 py-1 min-h-[32px] text-[11px] rounded-md"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteEntry(item.id);
                      }}
                      className="p-1.5 min-h-[32px] min-w-[32px] flex items-center justify-center rounded-md text-text-subtle hover:text-text hover:bg-surface-subtle transition-colors cursor-pointer"
                      title="Delete entry"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Prompt Sentence Preview & Click to Load */}
                <button
                  type="button"
                  onClick={() => handleEntryClick(item)}
                  className="w-full text-left group/btn focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-text rounded-xs cursor-pointer min-h-[44px] flex flex-col justify-center"
                >
                  <p className="text-xs font-medium text-text line-clamp-2 leading-snug">
                    &ldquo;{item.originalSentence}&rdquo;
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] text-text-muted group-hover/btn:text-text">
                    <span>Load into editor</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                  </div>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {history.length > 0 && (
          <div className="p-3 border-t border-border bg-surface flex flex-col gap-2 shrink-0">
            {confirmClear ? (
              <div className="flex items-center justify-between w-full gap-2 p-1 animate-fade-in">
                <span className="text-xs text-text flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  Clear all?
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onClearHistory();
                      setConfirmClear(false);
                    }}
                    className="px-2.5 py-1.5 min-h-[36px] rounded-md bg-text text-background text-xs font-bold transition-opacity hover:opacity-90 cursor-pointer"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="px-2.5 py-1.5 min-h-[36px] rounded-md bg-surface-subtle text-text text-xs hover:bg-surface-hover transition-colors cursor-pointer border border-border"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => exportHistoryAsJson(history)}
                  className="flex-1 py-2 px-2.5 min-h-[40px] rounded-lg border border-border bg-surface-subtle hover:bg-surface-hover text-text text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Export history to JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  className="py-2 px-3 min-h-[40px] rounded-lg border border-border bg-transparent text-text-muted hover:text-text hover:bg-surface-subtle text-xs font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title="Clear all generation history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

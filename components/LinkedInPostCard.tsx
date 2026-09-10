"use client";

import React, { useState, useEffect } from "react";
import CopyButton from "./CopyButton";
import { RotateCw } from "lucide-react";

export const MOCK_POST = `Most people see an ordinary task.

I saw a critical inflection point in strategic operational execution.

Yesterday, I executed a foundational initiative with zero cross-functional friction.

Here is what 99% of professionals fail to realize:

1. Autonomous Execution: Waiting for instructions is a legacy framework. Elite performers optimize throughput in real-time.
2. High-Velocity Decision Making: Evaluate the risk matrix, grasp the opportunity, and execute without hesitation.
3. Continuous Optimization: Once value is extracted, systematically refine the operating model.

Stop asking for permission to drive impact.

The board doesn't ask if it was easy.
The board asks if you delivered.

#Leadership #Strategy #GrowthMindset #Execution #OperationalExcellence`;

interface LinkedInPostCardProps {
  postText?: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export default function LinkedInPostCard({
  postText = MOCK_POST,
  onRegenerate,
  isRegenerating = false,
}: LinkedInPostCardProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!postText) {
      const resetTimer = setTimeout(() => {
        setDisplayedText("");
        setIsTyping(false);
      }, 0);
      return () => clearTimeout(resetTimer);
    }

    const words = postText.split(" ");
    let currentWordIndex = 0;

    const startTimer = setTimeout(() => {
      setIsTyping(true);
      setDisplayedText(words[0] || "");
    }, 0);

    const interval = setInterval(() => {
      currentWordIndex += 1;
      if (currentWordIndex >= words.length) {
        setDisplayedText(postText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(words.slice(0, currentWordIndex + 1).join(" "));
      }
    }, 20);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, [postText]);

  return (
    <div className="bg-surface rounded-linkedin border border-border shadow-xs overflow-hidden interactive-card">
      {/* Header with title, regenerate, and copy button */}
      <div className="px-4 sm:px-5 py-3 border-b border-border flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Generated Post
        </span>
        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button
              type="button"
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface text-text-muted hover:text-text hover:bg-surface-hover text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-1 focus-visible:ring-offset-background"
              title="Regenerate post"
            >
              <RotateCw
                className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin text-text" : ""}`}
              />
              <span>Regenerate</span>
            </button>
          )}
          <CopyButton text={postText} />
        </div>
      </div>

      {/* Post body with typewriter streaming effect */}
      <div className="p-5 sm:p-6">
        <div className="text-sm sm:text-base text-text whitespace-pre-line leading-relaxed font-normal">
          {displayedText}
          {isTyping && (
            <span
              className="inline-block w-1.5 h-4 ml-1 bg-text animate-pulse align-middle rounded-xs"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}

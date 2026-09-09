"use client";

import React, { useState, useEffect } from "react";
import CopyButton from "./CopyButton";

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
}

export default function LinkedInPostCard({
  postText = MOCK_POST,
}: LinkedInPostCardProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!postText) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    const words = postText.split(" ");
    let currentWordIndex = 0;
    setIsTyping(true);
    setDisplayedText(words[0] || "");

    const interval = setInterval(() => {
      currentWordIndex += 1;
      if (currentWordIndex >= words.length) {
        setDisplayedText(postText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(words.slice(0, currentWordIndex + 1).join(" "));
      }
    }, 24);

    return () => clearInterval(interval);
  }, [postText]);

  return (
    <div className="bg-surface rounded-linkedin border border-border shadow-xs overflow-hidden interactive-card">
      {/* Header with title and copy button */}
      <div className="px-4 sm:px-5 py-3 border-b border-border flex items-center justify-between">
        <span className="text-xs font-medium text-text-muted">
          Generated Post
        </span>
        <CopyButton text={postText} />
      </div>

      {/* Post body with typewriter streaming effect */}
      <div className="p-4 sm:p-5">
        <div className="text-sm text-text whitespace-pre-line leading-relaxed font-normal">
          {displayedText}
          {isTyping && (
            <span
              className="inline-block w-1.5 h-3.5 ml-1 bg-accent animate-pulse align-middle rounded-xs"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}

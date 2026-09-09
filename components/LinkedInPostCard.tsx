import React from "react";
import {
  Globe,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  Award,
} from "lucide-react";
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
  authorName?: string;
  authorHeadline?: string;
  timestamp?: string;
  headerAction?: React.ReactNode;
}

export default function LinkedInPostCard({
  postText = MOCK_POST,
  authorName = "Alex Vance, MBA",
  authorHeadline = "Chief Strategic Synergy Officer | 2x Forbes 30u30 Nominee | Keynote Speaker | Turning everyday oxygen into ROI | Ex-Everything",
  timestamp = "Just now",
  headerAction,
}: LinkedInPostCardProps) {
  const actionButton = headerAction !== undefined ? headerAction : <CopyButton text={postText} />;
  return (
    <div className="bg-surface rounded-linkedin border border-border shadow-xs overflow-hidden">
      {/* Header row */}
      <div className="p-4 sm:p-5 pb-3 flex items-start justify-between gap-3 border-b border-border/40">
        <div className="flex items-start gap-3">
          {/* Avatar circle */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-surface-subtle border border-border flex items-center justify-center font-bold text-sm text-accent shadow-2xs">
              AV
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-white flex items-center justify-center">
              <Award className="w-2.5 h-2.5 text-white" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm text-text hover:underline cursor-pointer">
                {authorName}
              </span>
              <span className="text-xs text-text-muted">• 1st</span>
            </div>
            <p className="text-xs text-text-muted leading-tight mt-0.5 line-clamp-2">
              {authorHeadline}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-text-subtle mt-1">
              <span>{timestamp}</span>
              <span>•</span>
              <Globe className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Top right actions */}
        <div className="flex items-center gap-1 shrink-0">
          {actionButton}
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-surface-subtle text-text-muted transition-colors cursor-pointer"
            aria-label="Post options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Post body */}
      <div className="p-4 sm:p-5 pt-3 pb-4">
        <div className="text-sm text-text whitespace-pre-line leading-relaxed font-normal">
          {postText}
        </div>
      </div>

      {/* Social proof / Reactions stats row */}
      <div className="px-3 sm:px-5 py-2 border-t border-border/40 flex items-center justify-between gap-2 flex-wrap text-xs text-text-muted">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="flex -space-x-1 items-center shrink-0">
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent-subtle text-[10px]"
              title="Like"
            >
              👍
            </span>
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent-warn-subtle text-[10px]"
              title="Love"
            >
              ❤️
            </span>
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent-subtle text-[10px]"
              title="Insightful"
            >
              💡
            </span>
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent-success-subtle text-[10px]"
              title="Celebrate"
            >
              👏
            </span>
          </div>
          <span className="hover:underline hover:text-accent cursor-pointer text-[11px] sm:text-xs truncate">
            1,842 reactions
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-text-subtle shrink-0">
          <span className="hover:underline cursor-pointer">128 comments</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">47 reposts</span>
        </div>
      </div>

      {/* Action buttons bar */}
      <div className="px-1 sm:px-2 py-1 border-t border-border/40 grid grid-cols-4 gap-0.5 sm:gap-1">
        <button
          type="button"
          className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-md hover:bg-surface-subtle text-text-muted hover:text-text transition-colors text-[11px] sm:text-xs font-medium cursor-pointer"
        >
          <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Like</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-md hover:bg-surface-subtle text-text-muted hover:text-text transition-colors text-[11px] sm:text-xs font-medium cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Comment</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-md hover:bg-surface-subtle text-text-muted hover:text-text transition-colors text-[11px] sm:text-xs font-medium cursor-pointer"
        >
          <Repeat2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Repost</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-md hover:bg-surface-subtle text-text-muted hover:text-text transition-colors text-[11px] sm:text-xs font-medium cursor-pointer"
        >
          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
}

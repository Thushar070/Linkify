import React from "react";
import {
  TrendingUp,
  Flame,
  Hash,
  Smile,
  ShieldCheck,
  Users,
  Target,
  Sparkles,
} from "lucide-react";

export interface LinkedinifyStats {
  actualImportance: number; // 0 - 100
  linkedinImportance: number; // 0 - 100
  inflationPercentage: number; // e.g. 4800
  corporateBsScore: number; // 0 - 100
  buzzwordCount: number;
  emojiCount: number;
  leadershipScore: number; // 0 - 100
  stakeholdersCount: number;
}

export const MOCK_STATS: LinkedinifyStats = {
  actualImportance: 2,
  linkedinImportance: 98,
  inflationPercentage: 4800,
  corporateBsScore: 94,
  buzzwordCount: 12,
  emojiCount: 6,
  leadershipScore: 99,
  stakeholdersCount: 4,
};

interface StatsGridProps {
  stats?: LinkedinifyStats;
}

export default function StatsGrid({ stats = MOCK_STATS }: StatsGridProps) {
  return (
    <div className="bg-surface rounded-linkedin border border-border p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/40">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent-subtle text-accent">
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text tracking-tight">
              Inflation & Synergy Analytics
            </h2>
            <p className="text-xs text-text-muted">
              Quantifying the gap between mundane reality and LinkedIn grandeur
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-accent-warn-subtle text-accent-warn border border-accent-warn/20">
          Critical Inflation Detected
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Inflation % Highlight Card */}
        <div className="p-3 rounded-md bg-accent-subtle/30 border border-accent/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-accent font-medium">
            <span>Inflation</span>
            <TrendingUp className="w-3.5 h-3.5 text-accent" />
          </div>
          <div className="my-1.5">
            <span className="text-2xl font-bold tracking-tight text-accent">
              +{stats.inflationPercentage.toLocaleString()}%
            </span>
          </div>
          <span className="text-[10px] text-text-muted leading-tight">
            Multiplier vs. reality
          </span>
        </div>

        {/* Corporate BS Score */}
        <div className="p-3 rounded-md bg-surface-subtle border border-border-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-text-muted font-medium">
            <span>Corporate BS</span>
            <Flame className="w-3.5 h-3.5 text-accent-warn" />
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight text-text">
                {stats.corporateBsScore}
              </span>
              <span className="text-xs text-text-subtle">/100</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-border-subtle rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div
                className="bg-accent-warn h-full rounded-full transition-all duration-300"
                style={{ width: `${stats.corporateBsScore}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-text-muted leading-tight">
            Stage 4: Final Boss
          </span>
        </div>

        {/* Actual vs LinkedIn Importance */}
        <div className="p-3 rounded-md bg-surface-subtle border border-border-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-text-muted font-medium">
            <span>Importance Delta</span>
            <Target className="w-3.5 h-3.5 text-text-subtle" />
          </div>
          <div className="my-1.5 flex items-baseline gap-2">
            <div>
              <span className="text-xs text-text-subtle">Real: </span>
              <span className="text-base font-bold text-text-muted">
                {stats.actualImportance}
              </span>
            </div>
            <span className="text-xs text-text-subtle">→</span>
            <div>
              <span className="text-xs text-accent font-medium">Post: </span>
              <span className="text-lg font-bold text-accent">
                {stats.linkedinImportance}
              </span>
            </div>
          </div>
          <span className="text-[10px] text-text-muted leading-tight">
            Perceived executive weight
          </span>
        </div>

        {/* Leadership Score */}
        <div className="p-3 rounded-md bg-surface-subtle border border-border-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-text-muted font-medium">
            <span>Leadership Score</span>
            <ShieldCheck className="w-3.5 h-3.5 text-accent-success" />
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight text-text">
                {stats.leadershipScore}
              </span>
              <span className="text-xs text-text-subtle">/100</span>
            </div>
          </div>
          <span className="text-[10px] text-text-muted leading-tight">
            Extreme ownership projected
          </span>
        </div>

        {/* Buzzword Count */}
        <div className="p-3 rounded-md bg-surface-subtle border border-border-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-text-muted font-medium">
            <span>Buzzwords</span>
            <Hash className="w-3.5 h-3.5 text-accent" />
          </div>
          <div className="my-1.5">
            <span className="text-2xl font-bold tracking-tight text-text">
              {stats.buzzwordCount}
            </span>
          </div>
          <span className="text-[10px] text-text-muted leading-tight">
            Synergies & paradigms deployed
          </span>
        </div>

        {/* Emoji Count */}
        <div className="p-3 rounded-md bg-surface-subtle border border-border-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-text-muted font-medium">
            <span>Emoji Density</span>
            <Smile className="w-3.5 h-3.5 text-accent" />
          </div>
          <div className="my-1.5">
            <span className="text-2xl font-bold tracking-tight text-text">
              {stats.emojiCount}
            </span>
          </div>
          <span className="text-[10px] text-text-muted leading-tight">
            Strategically placed icons
          </span>
        </div>

        {/* Stakeholders Implicated */}
        <div className="p-3 rounded-md bg-surface-subtle border border-border-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-text-muted font-medium">
            <span>Stakeholders</span>
            <Users className="w-3.5 h-3.5 text-text-subtle" />
          </div>
          <div className="my-1.5">
            <span className="text-2xl font-bold tracking-tight text-text">
              {stats.stakeholdersCount}
            </span>
          </div>
          <span className="text-[10px] text-text-muted leading-tight">
            Non-consenting groups involved
          </span>
        </div>

        {/* Synergy Factor */}
        <div className="p-3 rounded-md bg-surface-subtle border border-border-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-text-muted font-medium">
            <span>Executive Aura</span>
            <Sparkles className="w-3.5 h-3.5 text-accent" />
          </div>
          <div className="my-1.5">
            <span className="text-2xl font-bold tracking-tight text-accent-success">
              Optimal
            </span>
          </div>
          <span className="text-[10px] text-text-muted leading-tight">
            Unsolicited mentorship vibe
          </span>
        </div>
      </div>
    </div>
  );
}

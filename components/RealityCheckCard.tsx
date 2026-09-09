import React from "react";
import { Eye, ArrowRight, ShieldAlert } from "lucide-react";

export interface RealityCheckPair {
  claim: string;
  reality: string;
}

export const MOCK_REALITY_PAIRS: RealityCheckPair[] = [
  {
    claim:
      "Executed a single-origin pectin intake initiative with zero cross-functional friction.",
    reality:
      "Took a Granny Smith apple out of the fridge and chewed it while staring blankly at the wall.",
  },
  {
    claim:
      "High-velocity risk evaluation and branch-level opportunity acquisition.",
    reality:
      "Too lazy to turn on the stove or wash a frying pan.",
  },
  {
    claim:
      "Systematically offboarded biodegradable biomass to sustainable municipal receptacles.",
    reality:
      "Threw the sticky core into the dustbin from 4 feet away and missed on the first attempt.",
  },
  {
    claim:
      "The board doesn't ask if you're hungry. The board asks if you scaled.",
    reality:
      "There is no board. You are wearing sweatpants and haven't left the apartment since Tuesday.",
  },
];

interface RealityCheckCardProps {
  pairs?: RealityCheckPair[];
  verdict?: string;
}

export default function RealityCheckCard({
  pairs = MOCK_REALITY_PAIRS,
  verdict = "Net Professional Value: Absolute zero. You merely performed basic biological refueling.",
}: RealityCheckCardProps) {
  return (
    <div className="bg-surface rounded-linkedin border border-border p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/40">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent-warn-subtle text-accent-warn">
            <Eye className="w-4 h-4 text-accent-warn" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text tracking-tight">
              Reality Check: Claim vs. Ground Truth
            </h2>
            <p className="text-xs text-text-muted">
              Deconstructing corporate narrative inflation back into factual reality
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-surface-subtle text-text-muted border border-border">
          <ShieldAlert className="w-3 h-3 text-accent-warn" />
          Audit Complete
        </span>
      </div>

      <div className="space-y-3">
        {pairs.map((pair, index) => (
          <div
            key={index}
            className="rounded-md border border-border-subtle bg-surface-subtle/50 p-3 text-xs"
          >
            {/* The Claim */}
            <div className="flex items-start gap-2 mb-2">
              <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-accent-subtle text-accent border border-accent/20">
                CLAIM
              </span>
              <p className="font-medium text-text leading-relaxed italic">
                "{pair.claim}"
              </p>
            </div>

            {/* Transition indicator */}
            <div className="flex items-center gap-1.5 my-1.5 pl-1 text-[11px] text-text-subtle font-medium">
              <ArrowRight className="w-3 h-3 text-text-subtle" />
              <span>What actually happened:</span>
            </div>

            {/* The Reality */}
            <div className="flex items-start gap-2 pl-1">
              <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-surface text-text-muted border border-border">
                REALITY
              </span>
              <p className="text-text-muted leading-relaxed font-normal">
                {pair.reality}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Verdict footer */}
      <div className="mt-4 p-3 rounded-md bg-accent-warn-subtle/30 border border-accent-warn/20 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-accent-warn shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-semibold text-accent-warn">Verdict: </span>
          <span className="text-text-muted">{verdict}</span>
        </div>
      </div>
    </div>
  );
}

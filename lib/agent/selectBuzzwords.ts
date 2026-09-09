import { EventCategory, BullshitLevel } from "@/types";

const BUZZWORD_DICTIONARY: Record<EventCategory, string[]> = {
  food: [
    "nutritional asset allocation",
    "metabolic throughput",
    "caloric capital deployment",
    "biological supply chain",
    "cellular optimization protocol",
    "sustenance engineering",
    "digestive synergy",
    "organic resource intake",
  ],
  coding: [
    "mission-critical architecture",
    "production resilience",
    "zero-downtime refactor",
    "algorithmic efficiency",
    "technical debt deprecation",
    "high-velocity deployment",
    "systemic fault tolerance",
    "scalable codebase paradigm",
  ],
  gym: [
    "physical capacity building",
    "musculoskeletal synergy",
    "biometric resistance framework",
    "kinetic asset enhancement",
    "endurance KPI tracking",
    "iterative hypertrophy",
    "high-intensity discipline architecture",
    "physiological performance engineering",
  ],
  sleep: [
    "cognitive defragmentation",
    "neurological firmware update",
    "regenerative downtime protocol",
    "circadian rhythm synchronization",
    "unconscious bandwidth restoration",
    "metabolic recovery infrastructure",
    "restorative capital compounding",
  ],
  idle: [
    "strategic headspace incubation",
    "operational deceleration",
    "ambient cognitive synthesis",
    "deep observation framework",
    "zero-latency contemplative state",
    "intentional idle architecture",
    "non-linear value gestation",
  ],
  work: [
    "cross-functional alignment",
    "synergistic stakeholder convergence",
    "strategic inflection orchestration",
    "paradigm shift acceleration",
    "holistic bandwidth allocation",
    "high-impact delivery cadence",
    "value stream realization",
  ],
  social: [
    "relational capital building",
    "interpersonal ecosystem resonance",
    "high-trust stakeholder dialogue",
    "network topology expansion",
    "collaborative cultural alignment",
    "empathetic executive presence",
  ],
  generic: [
    "operational excellence",
    "strategic paradigm shift",
    "transformational value realization",
    "extreme ownership framework",
    "cross-functional execution",
    "high-velocity agility",
    "systemic impact orchestration",
  ],
};

const LEVEL_COUNT_MAP: Record<BullshitLevel, number> = {
  mild: 2,
  corporate: 3,
  influencer: 4,
  "final-boss": 6,
};

/**
 * Selects appropriate buzzwords based on the event category and bullshit intensity level.
 */
export function selectBuzzwords(
  category: EventCategory,
  level: BullshitLevel = "corporate"
): string[] {
  const pool = BUZZWORD_DICTIONARY[category] || BUZZWORD_DICTIONARY.generic;
  const count = LEVEL_COUNT_MAP[level] || 3;

  // Select unique buzzwords from the category pool
  return pool.slice(0, count);
}

import { EventCategory, LinkedinMode } from "@/types";

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

const MODE_COUNT_MAP: Record<LinkedinMode, number> = {
  linkedinify: 3,
  ceo: 4,
  "max-bs": 6,
};

/**
 * Selects appropriate buzzwords based on the event category and mode.
 */
export function selectBuzzwords(
  category: EventCategory,
  mode: LinkedinMode = "linkedinify"
): string[] {
  const pool = BUZZWORD_DICTIONARY[category] || BUZZWORD_DICTIONARY.generic;
  const count = MODE_COUNT_MAP[mode] || 3;

  return pool.slice(0, count);
}


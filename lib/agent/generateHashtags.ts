import { EventCategory, LinkedinMode } from "@/types";

const CATEGORY_HASHTAGS: Record<EventCategory, string[]> = {
  food: [
    "#NutritionalStrategy",
    "#BioOptimization",
    "#SustainableEnergy",
    "#MicroHabits",
    "#HealthROI",
  ],
  coding: [
    "#SoftwareEngineering",
    "#TechLeadership",
    "#SystemArchitecture",
    "#CleanCode",
    "#DeveloperMindset",
  ],
  gym: [
    "#PhysicalDiscipline",
    "#PeakPerformance",
    "#Endurance",
    "#ExtremeOwnership",
    "#Grit",
  ],
  sleep: [
    "#SleepArchitecture",
    "#CognitiveOptimization",
    "#RecoveryMode",
    "#WorkLifeIntegration",
    "#HighPerformance",
  ],
  idle: [
    "#Mindfulness",
    "#StrategicDeceleration",
    "#DeepWork",
    "#MentalClarity",
    "#IntentionalLiving",
  ],
  work: [
    "#CorporateStrategy",
    "#LeadershipExcellence",
    "#StakeholderAlignment",
    "#AgileLeadership",
    "#ExecutivePresence",
  ],
  social: [
    "#RelationshipCapital",
    "#HumanConnection",
    "#CollaborativeCulture",
    "#EmpathyInLeadership",
    "#Networking",
  ],
  generic: [
    "#Leadership",
    "#GrowthMindset",
    "#Strategy",
    "#OperationalExcellence",
    "#ExtremeOwnership",
  ],
};

const GENERIC_ANCHORS = [
  "#ThoughtLeadership",
  "#ProfessionalGrowth",
  "#FutureOfWork",
  "#Innovation",
  "#Success",
];

/**
 * Generates a relevant set of hashtags combining category tags and generic professional anchors.
 */
export function generateHashtags(
  category: EventCategory,
  mode: LinkedinMode = "linkedinify"
): string[] {
  const categoryPool =
    CATEGORY_HASHTAGS[category] || CATEGORY_HASHTAGS.generic;

  const categoryTagCount = mode === "max-bs" ? 4 : mode === "ceo" ? 2 : 3;
  const genericTagCount = mode === "max-bs" ? 4 : 2;

  const selectedCategoryTags = categoryPool.slice(0, categoryTagCount);
  const selectedGenericTags = GENERIC_ANCHORS.slice(0, genericTagCount);

  // Return combined unique list
  return Array.from(new Set([...selectedCategoryTags, ...selectedGenericTags]));
}


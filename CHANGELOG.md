# Changelog

All notable changes to the Linkedinify™ project will be documented in this file.

## Phase 0 — Repo & Project Setup

- Initialized Next.js App Router project with TypeScript and Tailwind CSS.
- Purged all default Next.js boilerplate, default icons, and default styling.
- Configured custom LinkedIn-inspired Tailwind color theme (`background`, `surface`, `text`, `accent`, `accent-warn`, `accent-success`) strictly adhering to the design rules with zero blue, purple, violet, or indigo.
- Installed and configured `lucide-react` icon library.
- Created `README.md` and initial `CHANGELOG.md`.

## Phase 1 — Static UI Shell

- Added `InputCard` component for entering mundane everyday actions with character counter.
- Added `ExampleChips` with clickable preset test sentences ("I ate an apple.", "I drank coffee.", etc.).
- Added `BullshitLevelSelector` 4-stage segmented control (Mild, Corporate, Influencer, Final Boss).
- Added `ModeSelector` persona grid (LinkedInify, CEO Mode, Influencer Mode, Humble Brag, Recruiter Mode, Maximum Bullshit).
- Added `GenerateButton` with theme styling, loading indicator, and micro-animations.
- Added `LinkedInPostCard` with authentic LinkedIn styling: circular avatar, headline, timestamps, post prose, reaction icons row (👍❤️💡👏), and social interaction actions.
- Added `CopyButton` component integrated directly into `LinkedInPostCard` with clipboard copy and visual "Copied!" confirmation.
- Added `StatsGrid` displaying corporate inflation %, BS score meter, importance delta, leadership score, and buzzword/emoji counts.
- Added `RealityCheckCard` with AI Claim vs Ground Truth comparisons and audit verdict.
- Built full page layout connecting input studio to generated results.
- Enhanced mobile and desktop responsiveness.
- Added `LoadingState` skeleton card with rotating status ticker.

## Phase 1 Revision — Minimal Dark Redesign & Streamlined Output

- Rebuilt design system around a pure black background (`#000000`) and white text (`#FFFFFF`) with minimal functional color.
- Removed all hardcoded example sentences and deleted `ExampleChips.tsx` for a clean, user-driven empty input state.
- Removed marketing and hero copy blocks ("Executive Narrative Studio") in favor of a minimal, clean header.
- Completely removed `RealityCheckCard.tsx`, `StatsGrid.tsx`, and associated stats calculations/stubs to focus strictly on generated text.
- Simplified `LinkedInPostCard.tsx` down to clean plain text output with retained functional `CopyButton`.
- Replaced the 6-button persona grid with a compact chat-model-switcher style `ModeSelector` offering exactly 3 modes: LinkedInify, CEO Mode, and Maximum Bullshit.
- Cleaned up repository tracking: removed `plan.md` from the remote repository while preserving it locally in `.gitignore`.

## Phase 2 — Deterministic Agent Helpers & UI Motion

### Part A: UI Polish & Motion Pass
- Replaced flat black background with subtle vertical/radial gradient overlay and fine grain noise texture.
- Enlarged and emphasized the `Linkedinify` wordmark as a bold anchor for the page.
- Implemented smooth sliding pill indicators for both `ModeSelector` and `BullshitLevelSelector` with spring transitions and intensity color coding (neutral white, amber, red-orange gradient).
- Added auto-grow height and amber focus glow to `InputCard` textarea.
- Enhanced `GenerateButton` with smooth state morphing and amber hover glow shadow.
- Added scale pulse and checkmark morphing animation to `CopyButton`.
- Added `slideUpFade` reveal animation to post result section.
- Added subtle scale and border brightening hover states to all cards across the application.

### Part B: Deterministic Agent Logic
- Defined clean shared types in `types/index.ts` stripped of legacy stats.
- Created `analyzeEvent` helper with keyword-based category detection across 8 event categories (food, coding, gym, sleep, idle, work, social, generic).
- Built `selectBuzzwords` lookup dictionary returning curated executive jargon per category.
- Built `selectEmojis` selector with density scaling by inflation level.
- Built `generateHashtags` generator combining category-specific tags with generic thought-leadership anchors.
- Orchestrated deterministic agent pipeline in `runAgentPipeline`.
- Added typewriter streaming text reveal effect to `LinkedInPostCard`.
- Verified category detection and pipeline behavior with internal test cases.


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


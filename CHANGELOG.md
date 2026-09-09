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

## Phase 3 — LLM Integration & UI Enhancements

### Part A: Gemini API Integration with Automatic Key Failover
- Built `lib/llmClient.ts` with built-in automatic failover logic across configured API keys (`GEMINI_API_KEY_1`, `GEMINI_API_KEY_2`, with extensible array architecture for adding future keys in one line).
- Handled rate-limit (429), quota errors, and credentials transparently with immediate fallback to backup keys.
- Implemented server-side logging for failover debugging and clean friendly error state handling for the UI.
- Built parameterized agent system prompt in `lib/prompts/systemPrompt.ts` combining input sentence, selected mode (LinkedInify, CEO Mode, Maximum Bullshit), and deterministic ingredients (category, buzzwords, emojis, hashtags), returning plain post text only.
- Built `app/api/generate/route.ts` POST endpoint with comprehensive input validation (rejecting empty or >500 character inputs), pipeline ingredient generation, and LLM failover execution.

### Part B: Connected Frontend to Real API
- Connected `GenerateButton` to `POST /api/generate` with live user input and selected persona mode.
- Replaced mock post text in `LinkedInPostCard` with real API responses revealed via smooth typewriter streaming effect.
- Wired `CopyButton` to copy real generated post text with visual confirmation feedback.
- Added a dedicated `Regenerate` button to `LinkedInPostCard` and action bar to re-run generation with the same input.
- Bound existing loading animations to real request lifecycles with user-friendly error banners and retry options.

### Part C: Outstanding UI Fixes
- Removed the `BullshitLevelSelector` component, state, and references across `app/page.tsx` and the pipeline; bullshit intensity is now governed solely by the 3 modes.
- Rebuilt `ModeSelector` into a Claude-style compact pill dropdown button (`"LinkedInify ▾"`) that opens a floating menu with one-line descriptions and checkmarks, animated smoothly with outside-click dismiss.
- Enlarged the input textarea in `InputCard` to serve as the dominant visual centerpiece across all devices (mobile, tablet, desktop) with auto-grow preserved.
- Established a confident, larger global typography scale across headings, body copy, and buttons.
- Updated app branding to render strictly as `Linkedinify™` with superscript trademark symbol in header and footer.
- Added an original animated 3D professional networking mark using Three.js (`AmbientNetwork3D.tsx`) rotating slowly in negative space in the header background, strictly styled with dark gray, white, and warm amber.

## Phase 4 — Polish & Full QA Pass

### Section A: Mode Tuning & Quality Verification
- Refined `lib/prompts/systemPrompt.ts` and `lib/agent/pipeline.ts` to enforce stark, unmistakable stylistic and structural distinctions across all 3 modes:
  - **LinkedInify**: Deeply emotional, faux-vulnerable, dramatic storytelling ("I almost didn't post this today...", "What is this moment trying to teach me about...", 3 leadership breakthroughs, warm engagement signoff).
  - **CEO Mode**: Ruthless, metrics-obsessed Silicon Valley executive memo ("Execution isn't a democracy. It's a compounding discipline...", 3 Executive Directives, "We don't negotiate with operational debt. Ship or get displaced.").
  - **Maximum Bullshit**: Completely unhinged cosmic corporate word-salad and paradigm parody ("Read that again. Now let it marinate in your prefrontal cortex...", 3 Quantum Mindset Shifts, "Are you synergizing your human capital, or merely occupying spacetime?").
- Tested across 5 varied categories (Food, Work, Gym, Sleep, Generic) verifying tone quality holds up across scenarios.
- Verified automatic key failover simulation with primary key exhaustion cleanly delegating to secondary key and returning friendly system state when keys are exhausted.

### Section B: Full Design & Code Audit
- Conducted comprehensive codebase audit confirming zero occurrences of banned colors (blue, purple, violet, indigo, periwinkle, lavender) across Tailwind arbitrary values, CSS variables, and Three.js materials.
- Audited spacing, font weights, and className patterns across all component files for visual hierarchy consistency.
- Optimized `AmbientNetwork3D.tsx` to strictly respect `prefers-reduced-motion: reduce` (renders a single static frame with zero animation loop overhead) and automatically pause the requestAnimationFrame loop when the browser tab is hidden (`visibilitychange`).
- Traced interaction states and eliminated race conditions (added timeout ref cleanup in `CopyButton`).

### Section C: Empty States & Edge Cases
- Added dedicated `EmptyState.tsx` component with dashed border, warm amber glyph, and interactive sample inspiration prompts that instantly populate the input on click.
- Added client-side soft validation nudge beneath the textarea for inputs shorter than 5 characters ("Give us a little more to synergize with...").
- Added backend validation in `/api/generate` rejecting inputs shorter than 5 characters with 400 Bad Request.
- Restyled error notification banner with on-theme amber borders (`border-amber-500/20`), amber glass background, and styled retry action button.

### Section D: Metadata & Accessibility
- Created custom on-theme SVG favicon at `public/favicon.svg` and `app/icon.svg` featuring the geometric networking ring mark.
- Updated `app/layout.tsx` with complete metadata, OpenGraph, Twitter card, dark theme-color (`#000000`), and viewport definitions.
- Configured universal focus-visible outlines in `globals.css` with warm amber focus rings (`outline: 2px solid #E5A93C`) and explicit focus-visible classes on interactive components, eliminating default browser blue outlines.
- Verified keyboard navigation flow (textarea → mode picker → generate → copy/regenerate) and Escape key dropdown dismiss.
- Confirmed WCAG AA/AAA color contrast ratios (21:1 for white text on black, 10.02:1 for amber accents on black, 10.02:1 for black text on amber buttons).

### Section E: Responsive CSS Audit
- Verified responsive Tailwind classes (`sm:`, `md:`, `lg:`) across containers, textarea font sizes (`text-base sm:text-xl md:text-2xl`), action bar stacking on mobile, and right-anchored mode dropdown positioning.
- Executed clean `npm run build`, `npx tsc --noEmit`, and `npm run lint` with 0 errors and 0 warnings.

# Linkedinify™

> Turning nothing into a professional achievement.

Linkedinify™ is a high-satire AI web application that transforms mundane, everyday occurrences (such as *"I ate an apple"*, *"I tied my shoes"*, or *"I unmuted on Zoom"*) into unhinged, viral LinkedIn thought leadership posts. Powered by Google Gemini (`gemini-3.5-flash-lite`) with automatic API key failover, deterministic corporate jargon synthesis, and three satirical personas (LinkedInify, CEO Mode, Maximum Bullshit), it packages ordinary human existence into corporate influence.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 with dynamic CSS variables and strict monochrome design (pure black, pure white, neutral grays)
- **Visualization:** Three.js ambient rotating network visualization
- **Icons:** [lucide-react](https://lucide.dev)
- **AI / LLM:** Google GenAI SDK (`@google/genai`) with automated multi-key failover and prompt-injection guardrails
- **Deployment:** Netlify with `@netlify/plugin-nextjs` for Next.js App Router and serverless API route support

## Local Development Setup

### Prerequisites

- Node.js 18+ or 20+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Thushar070/Linkify.git
cd Linkify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root based on `.env.example`:

```bash
cp .env.example .env.local
```

Populate your Google AI Studio Gemini API keys:

```env
GEMINI_API_KEY_1=your_primary_gemini_api_key_here
GEMINI_API_KEY_2=your_secondary_gemini_api_key_here
```

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production build check

```bash
npm run build
npx tsc --noEmit
npm run lint
```

## Production Deployment (Netlify)

This repository includes a pre-configured `netlify.toml` utilizing `@netlify/plugin-nextjs` to package Next.js App Router and serverless API routes (`/api/generate`).

### Live URL

*(URL to be confirmed upon Netlify deployment completion)*

### Environment Variables on Netlify

In your Netlify site dashboard under **Site configuration > Environment variables**, add:
- `GEMINI_API_KEY_1`
- `GEMINI_API_KEY_2`

### Architecture Note on Rate Limiting & Cooldowns

The server-side rate limiter (10 requests/minute per IP) and abuse cooldown (10-minute block following 3 suspicious off-brand attempts) utilize an in-memory tracking store (`Map`). In serverless environments like Netlify Functions:
- Function invocations run in ephemeral, containerized instances that may scale horizontally or experience cold starts.
- Memory is **not** shared across parallel instances or regions.
- As a result, the in-memory limiter acts as a lightweight, zero-dependency **best-effort** guardrail within warm instances rather than a globally synchronized rate limiter.
- For strict distributed rate limiting in multi-region enterprise production, connect an external low-latency key-value store such as Redis or Upstash.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history and phase milestones.

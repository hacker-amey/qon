# QONEQT CREATORX
### Autonomous AI-Powered Content Production Pipeline for Qoneqt
> **"From idea to feed, automatically."**
> Built for the **Qoneqt ? CTRL FREAK** challenge.

---

## ?? Overview

**Qoneqt CreatorX** is a full-stack, multi-agent AI content production pipeline that converts a single topic, prompt, idea, or trend into a publish-ready vertical (9:16) social video distributed directly to the **Qoneqt Global Feed**.

Unlike simple "prompt-to-video" wrappers, CreatorX orchestrates a deterministic, 10-stage media production workflow:

```
USER IDEA
   ?
   ?
1. IDEA INGESTION (Concept normalization & intent vectorization)
   ?
2. CONTENT GENOME (Extracting tone, audience, pacing, duration, and style DNA)
   ?
3. AI CREATIVE DIRECTOR (Hook Battle: 3 competing hooks scored on Curiosity & Retention)
   ?
4. SCRIPT ENGINE (4-act narrative structure: Hook, Body, Payoff, CTA)
   ?
5. SCENE PLANNER (Directing 4 cinematic beats with camera motions & framing)
   ?
6. MULTIMODAL GENERATION (High-res 9:16 imagery & video motion synthesis)
   ?
7. VOICE ENGINE (Acoustic voice synthesis, sub-frame sync & waveform visualizer)
   ?
8. VIDEO COMPOSITION (Deterministic 1080x1920 assembly, kinetic captions, Ken Burns, ducked BGM, brand end-card)
   ?
9. AI QUALITY CONTROL (Multi-factor QA scorecard & targeted scene-level regeneration)
   ?
10. QONEQT GLOBAL FEED (Publishing gateway & live feed distribution)
   ?
   ?
READY-TO-PUBLISH SOCIAL VIDEO
```

---

## ?? Proposed Innovations (CreatorX Differentiators)

1. **AI Creative Director (Hook Battle)**: Generates 3 candidate opening hooks and scores them on Curiosity, Clarity, and Engagement Potential, predicting 3-second short-form video retention before picking the winning direction.
2. **The Content Genome**: A structured schema tracking 11 narrative and stylistic properties across every stage to ensure consistent thematic coherence.
3. **Targeted Scene-Level Regeneration**: When the AI Quality Control check flags an issue (e.g. *"Scene 03 visual doesn't sufficiently match narration"*), CreatorX rerolls **only that specific scene**, avoiding expensive full video re-renders.
4. **Deterministic 9:16 Video Compositor**: Real-time canvas playback and MediaRecorder export producing real downloadable `.webm`/`.mp4` video files with kinetic word-highlighted captions, Ken Burns pan/zoom, and branded animated end-cards.
5. **Integrated Qoneqt Global Feed**: Complete mock and live publishing gateway with real-time feed synchronization.

---

## ?? Tech Stack

- **Frontend & Full-Stack Engine**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4.
- **Visual Design System**: Dark cyber-studio aesthetic (`#05060A`, `#080B12`, Electric Violet `#8B5CF6`, Cyan `#22D3EE`), glassmorphism, Space Grotesk & Inter typography.
- **Deterministic Rendering & Audio**: HTML5 Canvas, Web Audio API synthesis with voice ducking, MediaRecorder API for 1080x1920 video export, Remotion-ready architecture.
- **Provider Abstraction Layer**:
  - `LLMProvider` (Google Gemini 2.0 Flash / OpenAI GPT-4o / High-Fidelity Demo)
  - `ImageProvider` (Runware / Flux / Curated Macro Tech Library)
  - `TTSProvider` (ElevenLabs / Web Speech Synthesis / Waveform Generator)
  - `VideoProvider` (Neural Motion Engine Fallback)
- **Backend Service**: Modular Python FastAPI service (`/backend`) with Pydantic typed contracts and SQLite schema.

---

## ? Quick Start & Running Locally

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm 9+
- (Optional) Python 3.10+ for the backend service

### 1. Installation
```bash
git clone https://github.com/your-org/qoneqt-creatorx.git
cd qon
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Launch Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. (Optional) Run Python FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## ?? Judge Fast-Track (Demo Mode)

The entire application includes a **High-Fidelity Offline DEMO MODE** that operates with zero external API dependencies:
1. Open the homepage at `http://localhost:3000`.
2. Click the judge shortcut button: **`Instant Load: "Why do humans dream?"`**
3. Inspect the live 9:16 vertical video player, the 10-stage pipeline visualizer, the Hook Battle card, the 4-act script editor, and the AI Quality Scorecard.
4. Click **`? GENERATE VIDEO`** to watch the multi-agent pipeline execute live.
5. Click **`PUBLISH TO QONEQT`** to broadcast the video directly to the simulated Qoneqt Global Feed!

---

## ?? API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/generate` | Executes the full 10-stage production pipeline |
| `POST` | `/api/projects` | Creates and persists a new video project |
| `GET` | `/api/projects?id={id}` | Fetches a specific project by ID |
| `POST` | `/api/scenes/regenerate` | Performs targeted scene-level regeneration |
| `POST` | `/api/quality-check` | Audits composition and returns multi-factor scores |
| `POST` | `/api/publish` | Packages and publishes video to Qoneqt Global Feed |
| `GET` | `/api/assets` | Returns media assets and master recordings |
| `GET` | `/api/history` | Lists past generation runs and project statuses |

---

## ?? Security
- No API keys are bundled or exposed to the client.
- Sensitive environment variables are kept server-side in `.env.local`.
- Provider failovers operate gracefully without UI freezes.

---

## ?? Attribution
Built with pride for the **Qoneqt ? CTRL FREAK Challenge**.
*"From idea to feed, automatically."*

# Mark Hintz Portfolio — PRD

## Problem Statement
Engineering/manufacturing portfolio landing page with a blueprint CAD drawing as the visual substrate.
The page features a phase-triggered cinematic "rollercoaster" scroll where the camera dollies between
project stations on a technical drawing — wide-shot intro, perspective hero, then overshoot/settle
whip-pans to each station.

## Users
Phase 1 (now): Freelance clients, hiring managers, recruiters.
Mark Hintz — Design + Manufacturing Bridge — full stack, CNC, systems.

## Brand Personality
Blunt, competent, floor-tested (per /app/PRODUCT.md). Not portfolio-pretty. No generic gradients,
no glassmorphism. Engineering callouts, precision typography, technical specificity over marketing fluff.

## Architecture
- Vite + React + TypeScript (no StrictMode — it conflicts with GSAP contexts on dev HMR)
- GSAP + ScrollTrigger for camera/substrate animation
- No backend (pure frontend SPA)
- Tailwind CSS v4 (via @tailwindcss/vite)
- Router basename: `import.meta.env.BASE_URL` (supports root `/` and GitHub Pages `/Mark_Hintz-Portfolio-v2/`)

## Core Files
- `/app/src/components/drawing-package/DrawingPackagePage.tsx` — main GSAP scene controller
- `/app/src/components/drawing-package/ProjectZone.tsx` — station circle/label with imperative `active` prop
- `/app/src/components/drawing-package/TitleBlockStation.tsx` — title block station
- `/app/src/styles/drawing-package.css` — scene-level CSS, scroll-hint keyframes
- `/app/src/data/portfolioData.ts` — content data
- `/app/main.tsx` — root render (StrictMode REMOVED to prevent GSAP double-mount issues)
- `/app/vite.config.ts` — `allowedHosts: true` for preview environment

## Substrate
8800×6800px CAD drawing (Lower Receiver-Machined Forging (22).svg)
CSS filter: `invert(1)` on dark background = white-lines-on-dark.

## Camera System (as of 2026-02-13)
### Phase flow
1. **Wide shot** (page load): entire 8800×6800 substrate fits in viewport at scale ~0.10.
2. **Hero fly-in** (auto-play, 0.25s delay + 1.35s ease): substrate scales up & tilts to rotateX=20°.
3. **Hero text unroll** (sequential):
   - super-header slides in from left
   - MARK HINTZ name unrolls left→right via `clip-path: inset(0 100%→0% 0 0)`
   - subtitle fades in
   - spec block (ROLE/TOL/STATUS) slides up
4. **Scroll past 600px → Station A**: ROLLERCOASTER sequence — hero text exits, camera flattens to
   rotateX=0, blur builds, hard `power4.out` whip OVERSHOOTS Station A by 7%, blur clears, then
   camera SETTLES back to exact target with rotateX=10° ("looking back at the station").
5. **Scroll past 1800/3200/4600/6200px → B/C/D/T**: same rollercoaster pattern with per-station
   settle tilts: B=35°, C=8°, D=12°, T=0° (flat finale).
6. **Reverse scroll**: softer `power3.inOut` reverse without overshoot/blur (1.05s).

### Key helper: `flyToStationRollercoaster(stop, opts)`
- `whipDuration` (default 1.12s) — duration of the overshoot whip
- `settleDuration` (default 0.52s) — duration of the settle-back tween
- `overshoot` (default 0.07) — fraction beyond target scale; translation overshoot is 88px in x, 58px in y
  along the direction of travel (`Math.sign(stop.x)`)

### ScrollTrigger
- Single pin trigger on `containerRef`, `start: 'top top'`, `end: '+=7000'`
- `onUpdate` maps scroll progress to station index via `TRIGGERS_PX` array
- Reverts to previous station on scroll back
- `prevStation` debounce — same station = early return, no retrigger

## ProjectZone Fix
IntersectionObserver doesn't fire for CSS-transformed elements.
Fix: imperative `active?: boolean` prop. When `active` becomes true via `useEffect`,
`playZoneIntro()` fires once. Parent passes `active={activeStation === N}`.

## Station Progress Indicator
- Fixed right edge, 5 boxes (A/B/C/D/T) with engineering tick marks
- Active station: lit with accent color + label slides in
- Visited: dim blue. Unvisited: grey.

## Station Coordinates (Calibration Baseline: 975×550)
- A: x=-1400, y=-3730, scale=1.2 — Trigger Guard radius area (settle tilt 10°)
- B: x=-6320+0.495*(vw-975), y=-740+0.47*(vh-550), scale=1.2 — Buffer Tube (settle tilt 35°)
- C: x=-3920+0.5*(vw-975), y=-4980, scale=1.2 — Pump Package (settle tilt 8°)
- D: x=-7880+0.48*(vw-975), y=-4740, scale=1.2 — Renderings (settle tilt 12°)
- T: dynamic center on title block at (6900, 6025), scale capped at 1.2 (settle tilt 0°)

## What's Been Implemented
- [2026-02-13] Removed StrictMode (was creating multiple competing GSAP contexts on dev HMR)
- [2026-02-13] Wide-shot → hero fly-in cinematic intro
- [2026-02-13] Hero text sequential reveal (header → name unroll → subtitle → spec)
- [2026-02-13] Generic `flyToStationRollercoaster` helper used for all stations B/C/D/T
- [2026-02-13] Per-station settle tilts for "perspective shift back" character
- [2026-02-13] `window.scrollTo(0, 0)` on mount to prevent stale scroll position triggering
- [2026-02-13] Dev-only `window.__gsap` exposure for headless test introspection
- [2026-05] Cinematic phase-trigger scroll (replaced scrub timeline)
- [2026-05] Hero text visible on load (no scroll required)
- [2026-05] Station progress indicator (engineering callout style)
- [2026-05] ProjectZone active prop trigger fix
- [2026-05] Scroll hint with animated bar

## Critical Info for Next Agent
- **StrictMode is OFF.** Do not re-add it to `main.tsx`. It double-mounts the GSAP context which
  creates competing tweens and a "stuck on wide shot" symptom.
- **Vite 8 host config:** `vite.config.ts` uses `allowedHosts: true` (boolean) — required for the
  Emergent preview environment. Do not change to a string array.
- **Playwright headless rAF throttling:** rAF in Playwright headless mode runs at ~1fps, making
  GSAP timelines appear frozen. This is NOT a real bug. To verify animations in tests, manually
  advance `window.__gsap.globalTimeline.time(...)` to force completion. Real browsers run at 60fps.
- **Path Routing:** Router basename uses `import.meta.env.BASE_URL`. In Emergent preview, base is `/`,
  so route is `/drawing-package`. In GitHub Pages build, base is `/Mark_Hintz-Portfolio-v2/`.
- **IntersectionObserver dead code:** `ProjectZone.tsx` still has the observer fallback but the
  active-prop path is canonical (transforms break the observer).

## Backlog / P1
- [ ] Fine-tune station coordinate calibration on real 100% zoom laptop
- [ ] Add click/keyboard nav (arrow keys) between stations
- [ ] Station detail expansion panel (click circle to expand project description)
- [ ] Mobile responsiveness (current is desktop-first)
- [ ] Page transition animation from HomePage → DrawingPackagePage

## P2 / Future
- [ ] Sound design (subtle whip-pan SFX, ambient machinery hum)
- [ ] More project stations
- [ ] Remotion-based video export of the sequence
- [ ] `prefers-reduced-motion` fallback (skip rollercoaster, use straight fades)

# Mark Hintz Portfolio — PRD

## Problem Statement
Engineering/manufacturing portfolio landing page with a blueprint CAD drawing as the visual substrate.
The page features a "whip-pan" camera effect that navigates through project stations on a technical drawing.

## Users
Phase 1 (now): Freelance clients, hiring managers, recruiters
Mark Hintz — Design + Manufacturing Bridge — full stack, CNC, systems

## Architecture
- Vite + React + TypeScript
- GSAP + ScrollTrigger for camera/substrate animation
- No backend (pure frontend)
- Tailwind CSS v4 (via @tailwindcss/vite)

## Core Files
- `/app/src/components/drawing-package/DrawingPackagePage.tsx` — main scene
- `/app/src/components/drawing-package/ProjectZone.tsx` — station circle/label component
- `/app/src/components/drawing-package/TitleBlockStation.tsx` — title block
- `/app/src/styles/drawing-package.css` — scene-level CSS
- `/app/src/data/portfolioData.ts` — content data
- `/app/docs/the-plan-worth-doing.md` — full design spec
- `/app/.continue-here.md` — calibration notes

## Substrate
8800×6800px CAD drawing (Lower Receiver-Machined Forging (22).svg)
CSS filter: `invert(1)` on dark background = white-lines-on-dark

## Camera System (as of 2026-05)
### Previous (broken)
- Single scrubbed GSAP timeline: `scrub: 2.5`, scroll position → camera position 1:1
- Hero stop: `scale: 2.2` — zoomed so far in that only "TZ" of name visible
- Hero text: opacity:0 on load, revealed by scrubbing

### Current (cinematic phase-trigger system)
- Hero text auto-plays on load (no scroll needed)
- `getHeroStop()` uses dynamic scale: `min(vw*0.85/1600, vh*0.68/560, 1.3)` — fits hero text
- Single pin ScrollTrigger (`end: +=7000`) with `onUpdate` callback
- `onUpdate` maps progress to 5 station zones by pixel thresholds:
  - 0–599px: hero zone (show name)
  - 600px: fly to Station A (1.45s, power4.inOut, blur in/out)
  - 1800px: fly to Station B (35° tilt)
  - 3200px: fly to Station C
  - 4600px: fly to Station D
  - 6200px: fly to Title Block
- Reverse scroll returns to previous station (no blur, 1.05s)
- `flyTo()` always kills any in-progress tween before starting

## ProjectZone Fix (2026-05)
IntersectionObserver doesn't fire for CSS-transformed elements.
Fix: added `active?: boolean` prop to ProjectZone. When `active` becomes true,
`playZoneIntro()` fires via `useEffect`. Parent (DrawingPackagePage) passes
`active={activeStation === N}` for each zone.

## Station Progress Indicator
- Fixed position right edge: engineering-callout style
- 5 boxes (A, B, C, D, T) with tick marks
- Active: lit with accent color + label text slides in
- Visited: dim blue
- Unvisited: grey

## Scroll Hint
- Shows "SCROLL TO ADVANCE" at bottom center in hero zone
- Animated bar slides down a vertical track
- Fades out when first station fires

## What's Been Implemented
- [2026-05] Cinematic phase-trigger scroll (replaced scrub timeline)
- [2026-05] Hero text visible on load (no scroll required)
- [2026-05] Hero stop scale fix (full name visible at any laptop size)
- [2026-05] Station progress indicator (engineering callout style)
- [2026-05] ProjectZone active prop trigger fix
- [2026-05] Scroll hint with animated bar
- [2026-05] Impeccable skill activated (PRODUCT.md read, brand=precision/floor-tested)

## Station Coordinates (Calibration Baseline: 975×550)
- A: x=-1400, y=-3730, scale=1.2, rotateX=0 — Trigger Guard radius area
- B: x=-6320+0.495*(vw-975), y=-740+0.47*(vh-550), scale=1.2, rotateX=35 — Buffer Tube
- C: x=-3920+0.5*(vw-975), y=-4980, scale=1.2, rotateX=0 — Pump Package
- D: x=-7880+0.48*(vw-975), y=-4740, scale=1.2, rotateX=0 — Renderings
- T: dynamic center on title block at (6900, 6025)

## Backlog / P1
- [ ] Fine-tune station coordinate calibration on real 100% zoom laptop
- [ ] Add click/keyboard nav (arrows) between stations
- [ ] Station detail expansion panel (click circle to expand project description)
- [ ] Mobile responsiveness (current is desktop-first)
- [ ] Page transition animation from HomePage → DrawingPackagePage

## P2 / Future
- [ ] Sound design (subtle whip-pan SFX, ambient machinery hum)
- [ ] More project stations
- [ ] Remotion-based video export of the sequence

# Mark Hintz Portfolio — Spatial Engineering Drawing

This worktree contains the experimental drawing-package route for Mark Hintz's manufacturing-first portfolio.

The current direction is a **paper desk projection diorama**: a native engineering drawing lies on a physical-looking drafting desk, the viewport acts as a fixed inspection camera, and active project details project upward from the 2D drawing into crisp screen-space media and metadata.

## Current Route

```text
http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package
```

The `/drawing-package` route is standalone. It should not show the normal portfolio navbar, theme toggle, or homepage sections.

## Quick Start

```bash
npm install
npm run dev
```

The dev script opens the drawing-package route on port `5174` so it can coexist with other local portfolio checkouts.

Useful verification:

```bash
npm run build
```

For visual checks, use Playwright or Chrome DevTools. The native agent browser has been unreliable for this worktree.

## What This Experience Is

- A full-screen spatial portfolio route built with Vite, React, TypeScript, GSAP, and Tailwind CSS.
- An event-driven camera state machine controlled by wheel, keyboard, and touch input.
- A native SVG substrate, `Lower Receiver_Final.svg`, rendered as ink on paper.
- A screen-space station projection overlay that keeps detail media and text crisp.
- A mechanical-first portfolio surface, not a generic developer landing page.

## What This Experience Is Not

- Not a regular vertical scrolling page.
- Not a ScrollTrigger scrub timeline.
- Not a black-background HUD with white CAD lines.
- Not a Remotion-driven UI.
- Not a Three.js scene for the interactive drawing-package route.
- Not a SaaS/card-grid portfolio template.

## Core Files

```text
.continue-here.md
AGENTS.md
DESIGN.md
PRODUCT.md
memory/PRD.md
src/App.tsx
src/components/drawing-package/DrawingPackagePage.tsx
src/components/drawing-package/ProjectZone.tsx
src/components/drawing-package/TitleBlockStation.tsx
src/styles/drawing-package.css
public/assets/images/Lower Receiver_Final.svg
```

## Architecture Summary

`DrawingPackagePage.tsx` owns the GSAP camera state machine, station order, substrate rendering, hero, station progress, and `StationProjectionOverlay`.

`ProjectZone.tsx` owns the substrate-space station origin. In `projectionMode`, it preserves the 2D origin behavior while hiding the old pixelated substrate-space detail circle and label.

`drawing-package.css` owns the paper/desk environment, projection beam, lifted detail object, metadata plate, and route-level visual system.

The current station-detail model is intentionally split:

- **Substrate layer:** map, anchor points, title block, camera motion.
- **Projection layer:** readable media, text, leader/beam, lifted detail object.

This split is the fix for the earlier pixelation issue caused by magnifying tiny substrate-space text and media through CSS transforms.

## Current Substrate And Camera

- Asset: `public/assets/images/Lower Receiver_Final.svg`.
- Native viewBox: `1625 × 1075`.
- Render scale: `RENDER_SCALE = 2`.
- Camera stops are authored in substrate-native coordinates and converted through `computeStop(target, vw, vh)`.
- Navigation is event-driven with wheel accumulation and post-transition quiet windows to prevent trackpad overshoot.

Current camera targets live in `DrawingPackagePage.tsx` and are mirrored in `.continue-here.md` and `AGENTS.md` when they change.

## Documentation Rules

To reduce session-to-session doc churn:

- Read `.continue-here.md` first every session. It is the current checkpoint and exact next-action file.
- Read `PRODUCT.md`, `DESIGN.md`, and `AGENTS.md` before substantial product or UI work.
- Update `.continue-here.md` whenever the session state or next action changes.
- Update `AGENTS.md` and `DESIGN.md` only when architecture, coordinates, or visual-system decisions change.
- Update `memory/PRD.md`, `README.md`, and `PRODUCT.md` only when the project direction, goals, or stable architecture change.

Do not create a new handoff document by default. Prefer keeping `.continue-here.md` current unless the user explicitly asks for a dated handoff or a major branch handoff is needed.

## Current Next Work

The current checkpoint is in `.continue-here.md`. At the time of this README update, the next work is:

- Verify and tune the paper projection overlay on Stations B/C/D and mobile.
- Resume Phase 4 prune after projection placement is acceptable.
- Preserve `Lower Receiver_Final.svg` and the station projection images currently used by the live route.

## Remotion Boundary

The `remotion/` workspace is separate and may be used for offline showreel or station media renders. Remotion must not drive `/drawing-package` navigation, DOM rendering, or interactive UI.

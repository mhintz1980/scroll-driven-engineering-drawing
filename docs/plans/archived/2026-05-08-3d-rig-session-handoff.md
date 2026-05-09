# Session Handoff: 3D Perspective Floor Plane
**Date:** 2026-05-08
**Worktree:** `scroll-driven-engineering-drawing`
**Branch:** `scroll-driven-engineering-drawing`
**Dev server:** `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package`

---

## Session Goal
Transform the flat 2D GSAP scroll canvas into a perspective 3D experience:
drawing on XZ floor plane, camera above it, ProjectZone circles lifting off toward camera with DOF blur.

## Work Completed This Session

### Debugging: FOUC (Flash of Unstyled Content)
**Problem:** User saw a 1/10-second flash of two lines on refresh.
**Root cause:** `useEffect` runs *after* first browser paint. GSAP coordinates were applied after the
substrate had already rendered at `x:0, y:0` (top-left corner of the CAD border — exactly "two lines").
**Fix:**
- Switched `useEffect` → `useLayoutEffect` in `DrawingPackagePage.tsx` (fires before paint)
- Added `opacity-0`, `scale-0`, and `strokeDasharray: 1000` as initial states on all `ProjectZone`
  elements so they can never be visible before GSAP touches them

### Debugging: ProjectZone Invisible
**Root cause:** `IntersectionObserver` threshold was `0.5`. Camera coordinates `x:-800, y:-3400`
put only ~32% of the 600x500 component on-screen in a 1280x720 viewport → observer never fired.
**Fix:**
- Recalculated GSAP start coordinates to center the component: `x: -1400, y: -3730`
- Lowered threshold from `0.5` → `0.1`

### SVG Linework (Task 1)
- Received SVG from user (committed to `main` as `Lower Receiver-Machined Forging (1).svg`)
- Pulled into worktree via `git checkout origin/main -- "public/assets/images/..."`
- SVG: `800x600` viewBox, `fill="none"`, `stroke="#000"` — black lines on transparent background
- Applied `filter: invert(1)` + `mix-blend-screen` to get clean white linework on dark blue
- Replaced `.webp` background-image div with `<img ref={bgLayerRef}>` for cleaner SVG rendering
- DOF blur updated to preserve invert: `filter: 'invert(1) blur(10px)'`

### CSS 3D Stage (Task 2)
- `perspective: '1800px', perspectiveOrigin: '50% 40%'` on outer container
- `transformStyle: 'preserve-3d'` on substrate div

### Cinematic Tilt (Task 3)
- `gsap.set`: added `rotateX: 0` (explicit flat start)
- First `tl.to` (whip departure): `rotateX: 0` — stays flat at speed
- Second `tl.to` (final stop): `rotateX: 62` — tilts as camera decelerates to stop

### Focal Lift (Task 4)
- `ProjectZoneProps` interface: added `onLift?: () => void`
- Container div: added `transformStyle: 'preserve-3d'`
- IntersectionObserver GSAP timeline: appended `z: 400, scale: 1.08` tween
- `onStart: () => onLift?.()` fires DOF blur exactly when lift begins

### Depth-of-Field Blur (Task 5)
- `bgLayerRef = useRef<HTMLImageElement>()` attached to `<img>` tag
- `handleLift` GSAP tween: `filter: 'invert(1) blur(10px)', duration: 1.0, ease: 'power2.inOut'`
- Passed as `onLift={handleLift}` to `<ProjectZone>`

### Lint Fix
- `transformPerspective: 500` on `labelRef` div → changed to `perspective: '500px'`
  (`transformPerspective` is a GSAP-only shorthand, not a valid React `CSSProperties` key)

### Playwright Setup
- Installed Playwright browser binaries: `npx playwright install chromium`
- Installed `playwright` as dev dependency for Node script usage: `npm install -D playwright`
- Verified: `screenshot-3d-rig-initial.png` confirms ProjectZone fully animated at load

---

## Commits This Session

| Hash | Description |
|---|---|
| `5e2514c` | ProjectZone spatial station + FOUC fix + camera calibration |
| `a1635b3` | 3D rig: Tasks 2–5 (perspective, tilt, lift, DOF blur) |
| `81ae35c` | SVG asset + invert(1) white linework (Task 1) |
| `c2c771e` | Playwright dep, DXF source file, updated plan doc |
| `c5438a3` | Lint fix (`perspective: '500px'`), session handoff + plan checklist update |
| `6794de2` | **Task 6 complete** — camera recalibration + Station B ProjectZone |
| `63a89e1` | Docs: mark all tasks complete, update living context with station map |

---

## Current State of Key Files

### `DrawingPackagePage.tsx` *(post-Task-6)*
- `useLayoutEffect` (not `useEffect`) for zero-FOUC GSAP initialization
- `containerRef` div: `perspective: 4000px, perspectiveOrigin: 50% 40%`  ← was 1800px
- `substrateRef` div: `transformStyle: preserve-3d`, `8800×6800px`
- `bgLayerRef` img: SVG at 8800×6800, `filter: invert(1)`, `mix-blend-screen`, `opacity: 0.9`
- GSAP start (Station A): `x: -1400, y: -3730, scale: 1.2, rotateX: 0`
- GSAP pan 1 (whip/transit): `x: -4800, y: -2000, scale: 1.6, rotateX: 0`
- GSAP pan 2 (tilt stop / Station B): `x: -6400, y: -1000, scale: 1.2, rotateX: 35` ← was 62°
- `handleLift`: tweens `bgLayerRef` to `invert(1) blur(10px)` over 1s

### `ProjectZone.tsx` *(unchanged from Tasks 2-5)*
- `onLift?: () => void` prop
- `containerRef` div: `transformStyle: preserve-3d`
- `labelRef` div: `perspective: '500px'` (lint-fixed from `transformPerspective: 500`)
- All elements hidden by CSS on mount (no FOUC)
- IntersectionObserver threshold: `0.1`
- Animation order: dot → path draw → circle reveal → label pop → text blur-in → **z: 400 lift**
- `onStart: () => onLift?.()` fires DOF blur at lift start

### `ProjectZone` instances on canvas
| Station | id | Title | top | left | onLift |
|---|---|---|---|---|---|
| A | `"A"` | TRIGGER GUARD RADIUS | `3200px` | `1450px` | `handleLift` ✅ |
| B | `"B"` | BUFFER TUBE SOCKET | `833px` | `5567px` | *(none — DOF fires from A only)* |

---

## ✅ All Tasks Complete

Task 6 (camera recalibration + Station B) is fully shipped.

**Geometry bug discovered and fixed during Task 6:**
- Original `rotateX: 62° + perspective: 1800px` caused content at substrate Y≈3200px to
  exceed the focal plane depth (3392px > 1800px) → invisible.
- Fix: `perspective: 4000px`, `rotateX: 35°`.
  Max safe substrate Y at scale 1.2: `4000 / (sin(35°) × 1.2) ≈ 5806px`.

**Station B coordinates (Playwright-verified):**
- Substrate: `left=5567px, top=833px`
- Derived camera center: `((640+6400)/1.2, (360+1000)/1.2) = (5867, 1133)` shifted 300px left/up
- Camera stop: `x=-6400, y=-1000, scale=1.2, rotateX=35`

## Design Decisions Made
- `invert(1)` is the correct filter for black-on-transparent SVG → white linework
- `mix-blend-screen` makes the white linework visible, transparent areas become the dark `bg-slate-950`
- DOF blur must include `invert(1)` in the blurred state or lines turn black again
- `perspective` on *parent*, `preserve-3d` on *element* — CSS 3D requires this hierarchy
- `useLayoutEffect` is mandatory for any GSAP initialization that sets initial visual state
- DOF blur fires from Station A only; Station B has no `onLift` (blur already active)

## Skills Used
- `frontend-design` — shop-floor blueprint aesthetic, blending modes
- `systematic-debugging` — root cause analysis for FOUC and invisible component bugs
- `impeccable` — spatial design, 4pt grid, touch targets for ProjectZone

---

> **Next session:** Rig is complete. Likely directions:
> - Add real video/image content inside the ProjectZone circles
> - Add Station C (third whip-pan stop) at a new drawing detail
> - Integrate title block / general notes into the drawing-package layout
> - Hook the Drawing Package page into the main portfolio nav

# Session Handoff: Spatial Rig Audit Fixes

**Date:** 2026-05-09
**Worktree:** `scroll-driven-engineering-drawing`
**Branch:** `scroll-driven-engineering-drawing`
**Dev server:** `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package`
**Audit source:** `/home/markimus/projects/Spatial Rig Audit Report.md`

---

## Session Goal

Restore the active context docs to the proper `docs/plans/` location, then address the current spatial rig audit issues before continuing with content, Station C, title block, or navigation work.

---

## Work Completed

### Context Drift Fixed

Restored the active docs that README expects:

- `docs/plans/2026-05-07-3d-perspective-floor-plane.md`
- `docs/plans/2026-05-08-3d-rig-session-handoff.md`

The archived copies remain under `docs/plans/archived/`.

### Station B Viewport Calibration

**Problem:** At the 975×550 audit viewport, Station B's detail circle was above the viewport. The old fixed stop was:

```txt
x = -6400
y = -1000
scale = 1.2
rotateX = 35
```

**Root cause:** The 35° perspective projection moves the Station B detail circle as viewport width and height change. A fixed `x/y` stop only works for the viewport it was calibrated against.

**Fix:** Station B now uses a viewport-aware stop from a 975×550 baseline:

```txt
x = -6320 + 0.495*(vw - 975)
y = -740 + 0.47*(vh - 550)
scale = 1.2
rotateX = 35
```

Implementation lives in `getStationBStop()` inside `src/components/drawing-package/DrawingPackagePage.tsx`.

### DOF Initial State

The background image now gets an explicit initial GSAP state before the timeline is created:

```txt
filter = invert(1) blur(0px)
```

The GSAP scroll timeline now animates it to:

```txt
filter = invert(1) blur(10px)
```

This keeps white linework intact, preserves a sharp first stop, and avoids Station A auto-blurring the page on mount.

### ProjectZone Trigger Behavior

`ProjectZone` no longer resets on exit. Each zone now:

- starts from a hidden/dashed GSAP state
- animates in the first time its `IntersectionObserver` sees it
- unobserves after that first reveal so the station doesn't fight the scrubbed camera path or re-fire blur logic on re-entry

This preserves the autonomous local reveal behavior without reintroducing mid-scroll state churn.

### Standalone Route + Overlay Geometry

The route now imports the drawing-package stylesheet directly and applies the `drawing-package` wrapper class. While the route is mounted, `html` and `body` get a `drawing-package-route` class that hides the native scrollbar without disabling GSAP scroll behavior.

Station overlays also changed:

- Station A and Station B now use station-specific leader-line paths and circle placement instead of the shared `top-10 right-10` circle layout
- the circle uses responsive sizing with `clamp(...)`
- the label compacts on narrow screens so the phone viewport stays readable
- Station A adds a narrow-screen x correction below `768px` so the first stop remains visible on phones

---

## Current Coordinates

| Stop | x | y | scale | rotateX |
|---|---|---|---|---|
| Station A | `-1400` desktop/tablet, `-1400 + 0.55*(vw - 975)` under `768px` | `-3730` | `1.2` | `0` |
| Whip transit | `-4800` | `-2000` | `1.6` | `0` |
| Station B | `-6320 + 0.495*(vw - 975)` | `-740 + 0.47*(vh - 550)` | `1.2` | `35` |

| Station | id | Title | Component position |
|---|---|---|---|
| A | `"A"` | `TRIGGER GUARD RADIUS` | `left: 1450px, top: 3200px` |
| B | `"B"` | `BUFFER TUBE SOCKET` | `left: 5567px, top: 833px` |

---

## Verification

### Browser Verification

Playwright checked the standalone route and station framing at:

- `975×550`
- `1280×720`
- `1440×900`
- `390×844`

Confirmed:

- no navbar
- no theme toggle
- no home-page sections on `/drawing-package`
- initial drawing filter is `invert(1) blur(0px)`
- final drawing filter is `invert(1) blur(10px)`
- Station A circle/label are visible at the first stop
- Station B circle/label are visible at the final stop, including `390×844`

Additional Playwright checks:

- native scrollbar is hidden while the pinned route remains scroll-scrubbable

### Commands

Passed:

```bash
npx eslint src/components/drawing-package/DrawingPackagePage.tsx src/components/drawing-package/ProjectZone.tsx
npm run build
```

Known unrelated failures:

```bash
npm run lint
npm run test
```

`npm run lint` still fails on pre-existing Remotion/UI lint issues outside this fix. `npm run test` still fails on a pre-existing image filename case mismatch: expected `AR-15 Lower Reciever-Forged.JPG`, received `AR-15 Lower Reciever-Forged.jpg`.

---

## Files Updated

- `AGENTS.md`
- `.continue-here.md`
- `README.md`
- `docs/plans/2026-05-07-3d-perspective-floor-plane.md`
- `docs/plans/2026-05-08-3d-rig-session-handoff.md`
- `docs/plans/2026-05-09-spatial-rig-audit-fixes-handoff.md`
- `src/components/drawing-package/DrawingPackagePage.tsx`
- `src/components/drawing-package/ProjectZone.tsx`
- `src/styles/drawing-package.css`

Note: `docs/the-plan-worth-doing.md` was already modified before this work and was not edited during this audit fix.

---

## Browser Audit (2026-05-11)

Playwright-driven scroll-state audit at 1908×860 viewport:

### Findings

**Station A visible at scroll 0.** Camera positioned correctly. Detail circle renders with "CAD_SPIN_RENDER.mp4" text placeholder, label box with "A / TRIGGER GUARD RADIUS" visible. IntersectionObserver fires on first appearance, stays revealed after.

**Whip-pan mid-transit.** At scroll ~1000px, substrate at `translate3d(-4700, -2027) scale(1.59)`. DOF blur at ~9.4px. Drawing linework softens convincingly. Station A departed viewport, Station B not yet centered.

**Station B never fully centers.** At scroll ~2000px (near end), substrate at `translate3d(-4800, -2000) scale(1.6)`. This is the whip-pan apex, not the Station B stop. The second GSAP `.to()` targets `getStationBStop()` but the scrub appears to plateau before reaching it. Station B circle rect at `top: -667, left: 4107` — only partially clipping into viewport. The camera stop values (`x: -6320+`, `y: -740+`, `rotateX: 35`) are never reached during normal scroll.

**Only 2 of 9 planned stations rendered.** `drawingScenes` in `drawingPackageData.ts` defines 9 stops (A-J: hero, 5 projects, services, testimonials, contact). Only A and B are instantiated in `DrawingPackagePage.tsx`.

**Background SVG resolution concern.** Native `naturalWidth: 800px` stretched to CSS `8800px`. Linework soft even at initial zoom. The new DXF-derived candidates (`Lower Receiver-Machined Forging (22).svg` etc.) should improve this once calibrated.

**No scroll affordance.** `scrollbar-width: none` hides the scrollbar with no visual replacement. Users have no cue that the page scrolls.

**No content below pinned scene.** The entire route is one GSAP ScrollTrigger pinned section. No hero section, no project details, no services/testimonials/contact — all defined in data but not rendered.

### State Summary

| Aspect | Status |
|--------|--------|
| Camera rig mechanics | Working — pinned scrub, whip-pan, DOF blur |
| Station A framing | Good — visible at scroll 0, circle/label intact |
| Station B framing | Camera stop not reached during scroll — circle barely clips viewport |
| Content in circles | Placeholder text only ("CAD_SPIN_RENDER.mp4") |
| Stations rendered | 2 of 9 planned |
| Hero/Title Block | Not implemented |
| Services/Testimonials/Contact | Not implemented |
| SVG resolution | 800px native → soft at 8800px display |
| Scroll affordance | None — no scrollbar, no indicator |

---

## Next Tasks

1. Fix Station B scroll reach — camera stop values (`getStationBStop()`) not reached during normal scroll. Substrate plateaus at whip-pan apex instead of arriving at Station B. Investigate timeline end values or scroll duration.
2. Add real video/image content inside the ProjectZone detail circles.
3. Add Station C — identify a third drawing detail, place `<ProjectZone>`, calibrate with Playwright.
4. Integrate Hero / Title Block as a spatial station.
5. Hook the Drawing Package page into main portfolio navigation.

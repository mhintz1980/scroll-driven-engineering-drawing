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

Station A lift still animates it to:

```txt
filter = invert(1) blur(10px)
```

This keeps white linework intact and makes the rack-focus behavior explicit.

### ProjectZone Replay Behavior

`ProjectZone` now resets local GSAP state when it leaves view:

- leader path returns to dashed/undrawn state
- dots hide
- circle hides and resets scale/rotation
- label and text return to pre-reveal states
- container resets from `z: 400, scale: 1.08` to `z: 0, scale: 1`

This allows station leader/circle animations to replay on re-entry.

---

## Current Coordinates

| Stop | x | y | scale | rotateX |
|---|---|---|---|---|
| Station A | `-1400` | `-3730` | `1.2` | `0` |
| Whip transit | `-4800` | `-2000` | `1.6` | `0` |
| Station B | `-6320 + 0.495*(vw - 975)` | `-740 + 0.47*(vh - 550)` | `1.2` | `35` |

| Station | id | Title | Component position |
|---|---|---|---|
| A | `"A"` | `TRIGGER GUARD RADIUS` | `left: 1450px, top: 3200px` |
| B | `"B"` | `BUFFER TUBE SOCKET` | `left: 5567px, top: 833px` |

---

## Verification

### Browser Verification

Playwright checked Station B at:

- `975×550`
- `1280×720`
- `1440×900`
- `390×844`

Result: Station B detail-circle center landed within about 15px of viewport center in all checked viewports.

Additional Playwright checks:

- Initial filter: `invert(1) blur(0px)`
- Lifted filter: `invert(1) blur(10px)`
- Station reset behavior: `ProjectZone` returns to unlifted local state after leaving view

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

Note: `docs/the-plan-worth-doing.md` was already modified before this work and was not edited during this audit fix.

---

## Next Tasks

1. Add real video/image content inside the ProjectZone detail circles.
2. Add Station C, then calibrate it with Playwright.
3. Integrate Hero / Title Block as a spatial station.
4. Hook the Drawing Package page into main portfolio navigation.

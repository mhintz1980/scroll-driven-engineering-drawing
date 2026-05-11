# Session Handoff: Project Images in Detail Circles

**Date:** 2026-05-11
**Worktree:** `scroll-driven-engineering-drawing`
**Branch:** `scroll-driven-engineering-drawing`
**Dev server:** `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package`

---

## Session Goal

Replace the static "CAD_SPIN_RENDER.mp4" text placeholder inside ProjectZone detail circles with real project images. Lays the groundwork for Stations C and D.

---

## Work Completed

### ProjectZone Image Support

**Problem:** Detail circles showed placeholder monospace text "CAD_SPIN_RENDER.mp4". No visual content.

**Fix:** `ProjectZone` now accepts an `imageSrc?: string` prop. When provided, renders the image inside the detail circle with `object-cover` and `mix-blend-luminosity` at 80% opacity (keeps the blue technical overlay visible). When omitted, falls back to the original text placeholder.

Changes in `src/components/drawing-package/ProjectZone.tsx`:
- Added `imageSrc` to `ProjectZoneProps` interface
- Replaced text div with conditional image/fallback wrapper
- Image container uses `absolute inset-6 rounded-full overflow-hidden` to clip inside the circle with inner-ring padding

### Station A — Industrial Torque Wrench

- Image: `torque-wrench-03.webp`
- Renders inside Station A's detail circle at scroll 0

### Station B — Armament Components

- Image: `Billet Receiver Set AR15.webp`
- Renders inside Station B's detail circle at the tilt stop

---

## Project Image Map

| Station | Project | Image | Status |
|---------|---------|-------|--------|
| A | Industrial Torque Wrench | `torque-wrench-03.webp` | Active |
| B | Armament Components | `Billet Receiver Set AR15.webp` | Active |
| C | Industrial Dewatering Pump | `pump-package-04.webp` | Pending placement |
| D | Renderings & Visualizations | `rendering-06.webp` | Pending placement |

---

## Files Updated

- `src/components/drawing-package/ProjectZone.tsx` — `imageSrc` prop + image rendering
- `src/components/drawing-package/DrawingPackagePage.tsx` — image paths passed to Stations A and B

---

## Verification

- `npm run build` passes
- Browser verified: Station A renders torque wrench image inside detail circle at initial viewport

---

## Next Tasks

1. Add Station C (Industrial Dewatering Pump) — place `<ProjectZone>` on substrate, assign `pump-package-04.webp`, calibrate camera stop with `?calibrate=1` + Playwright.
2. Add Station D (Renderings) — place `<ProjectZone>` on substrate, assign `rendering-06.webp`, calibrate camera stop.
3. Extend GSAP timeline to include Stations C and D camera stops (currently only A → whip → B).
4. Integrate Hero / Title Block as a spatial station.
5. Hook Drawing Package page into main portfolio navigation.

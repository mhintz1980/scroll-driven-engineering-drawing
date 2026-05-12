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
| C | Industrial Dewatering Pump | `pump-package-04.webp` | Active (calibrated 2026-05-11) |
| D | Renderings & Visualizations | `rendering-06.webp` | Active (calibrated 2026-05-11) |
| T | Title Block (no image) | N/A | Active (built 2026-05-12) |
| Hero | Zoomed-out substrate + text overlay | N/A | Active (built 2026-05-12) |

---

## Files Updated

- `src/components/drawing-package/ProjectZone.tsx` — `imageSrc` prop + image rendering
- `src/components/drawing-package/DrawingPackagePage.tsx` — image paths, hero overlay, title block stop, extended GSAP timeline (`+=7000`)
- `src/components/drawing-package/TitleBlockStation.tsx` — new component (ANSI title block with revision table, contact info)
- `src/styles/drawing-package.css` — `dp-word-slide-in` keyframe animation for hero word cycle
- `src/data/portfolioData.ts` — "Drawing" nav link added to navigation array

---

## Verification

- `npm run build` passes
- Browser verified: Station A renders torque wrench image inside detail circle at initial viewport

---

## Next Tasks

1. ~~Add Station C (Industrial Dewatering Pump)~~ — Done 2026-05-11. Calibrated at all 3 viewports.
2. ~~Add Station D (Renderings)~~ — Done 2026-05-11. Calibrated at all 3 viewports.
3. ~~Extend GSAP timeline to include Stations C and D camera stops~~ — Done 2026-05-11.
4. ~~Integrate Hero / Title Block as spatial stations~~ — Done 2026-05-12.
   - Hero overlay: zoomed-out substrate + animated word cycle + spec block, fades on scroll into Station A
   - Title Block (Station T): ANSI-style table with revision history, contact info, status. Final camera stop after Station D
   - GSAP timeline extended: `end: '+=7000'`, added Hero→A transition + D→Title Block transit
5. ~~Hook Drawing Package page into main portfolio navigation~~ — Done 2026-05-12. "Drawing" link added to navbar via `portfolioData.navigation`.

### Remaining

1. Title Block camera calibration across viewports (975x550, 1440x900, 390x844)
2. Hero overlay mobile testing and visual polish
3. Multi-viewport full journey verification (Hero→A→B→C→D→T)
4. Clean up orphaned components (DrawingHero.tsx, TitleBlockHeader.tsx, TitleBlockFooter.tsx)
5. Performance audit for long scroll (`+=7000` scrub)

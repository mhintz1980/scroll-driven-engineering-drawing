# Session Handoff: Phase 3 — Station Calibration

**Date:** 2026-05-15
**Worktree:** `scroll-driven-engineering-drawing`
**Branch:** `scroll-driven-engineering-drawing` tracking `engineering-drawing/main`
**Dev server:** `npm run dev -- --port 5174` → `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package`
**Build status:** ✅ green (`npm run build` passes, zero TS errors, zero console errors)
**Phase 3 status:** ✅ complete at baseline desktop viewports

---

## Phase 3 Calibration Completed

The native `1625×1075` substrate now has a verified baseline station map. The major fixes were:

1. **Hero camera state corrected**
   - Hero now uses the full drawing overview instead of the former detail close-up.
   - Hero target: `cx: 812.5`, `cy: 537.5`, `scale: wide`, `rotateX: 0`.
   - Verified 975×550 hero transform: `translate(121.686px, 33px) scale(0.4502)`.

2. **ProjectZone inactive state fixed**
   - Removed the runtime IntersectionObserver trigger path.
   - `active` is canonical for A/B/C/D station reveals.
   - First mount skips animation, so inactive circles and labels stay hidden on hero load.
   - Calibration mode still forces overlays visible.

3. **Native-substrate detail geometry calibrated**
   - Detail lift is now `z: 75`, not old-substrate `z: 400`.
   - Detail circle size is `clamp(34px, 5.7vw, 50px)`.
   - Label bars sit inside the lower circle arc so they remain in-frame.

4. **TitleBlockStation calibrated**
   - Uses active-prop triggering like ProjectZone.
   - Camera target is `cx: 1274`, `cy: 953`, `scale: 5.4`, `rotateX: 0`.
   - Component position is `top: 910px`, `left: 1196px`, `width: 130px`.

### Current Camera Targets

```tsx
const STATIONS: Target[] = [
  { id: 'A', label: 'TRIGGER GUARD', cx: 291,  cy: 528, scale: 6.5, rotateX: 10 },
  { id: 'B', label: 'BUFFER TUBE',   cx: 1048, cy: 134, scale: 6.5, rotateX: 35 },
  { id: 'C', label: 'PUMP PACKAGE',  cx: 678,  cy: 692, scale: 6.5, rotateX: 8 },
  { id: 'D', label: 'RENDERINGS',    cx: 1288, cy: 661, scale: 6.5, rotateX: 12 },
  { id: 'T', label: 'TITLE BLOCK',   cx: 1274, cy: 953, scale: 5.4, rotateX: 0 },
];
```

### Current Station Layouts

| Station | top | left | anchor | circleStyle |
|---|---:|---:|---|---|
| A | `278px` | `0px` | `(291,250)` | `top: 235px; left: 285px` |
| B | `0px` | `748px` | `(300,134)` | `top: 150px; left: 285px` |
| C | `442px` | `378px` | `(300,250)` | `top: 240px; left: 285px` |
| D | `411px` | `988px` | `(300,250)` | `top: 245px; left: 285px` |

### Verification

- `npm run build` passes.
- Playwright browser pass at `975×550`, `1280×720`, `1440×900`, and `1920×1080`.
- Hero state: A/B/C/D circles hidden, A/B/C/D labels hidden, title block hidden.
- Active station states: circles and labels stay in-frame at every tested viewport.
- Title block state: panel stays in-frame at every tested viewport.
- `?calibrate=1`: A/B/C/D circles, labels, and title block are visible with no console errors.

---

## What happened this session

Two phases of recovery work were completed. No work remains from these phases — they're done.

### Phase 1 — Compile recovery
Fixed three categories of TypeScript errors that were blocking `npm run build`:

1. **Null-guarded hero `querySelector` results** in the GSAP intro timeline (lines ~168-171 in DrawingPackagePage.tsx). The `querySelector` calls return `Element | null`, which GSAP's `.to()` doesn't accept. Wrapped each in an `if` guard.

2. **Created station layout objects** (`STATION_A/B/C/D_LAYOUT`) for all four `ProjectZone` instances. The previous rewrite stripped these constants but `ProjectZone` requires a `layout: ProjectZoneLayout` prop containing `pathD`, `anchor`, and `circleStyle`. `pathD` is dead code — set to `""` everywhere.

3. **Added `active` prop to `TitleBlockStation`** — the component used `IntersectionObserver` for its intro trigger, but that can't fire under CSS 3D transforms. Added the same `active` → `useEffect` → `playIntro()` pattern that `ProjectZone` uses (lines 56-62 in TitleBlockStation.tsx).

### Phase 2 — Substrate swap
Migrated from the old 8800×6800 stretched rendering to the native SVG coordinate space:

| What | Old | New |
|------|-----|-----|
| `SUBSTRATE_W` | 8800 | 1625 |
| `SUBSTRATE_H` | 6800 | 1075 |
| `SUBSTRATE_ASSET` | `Lower Receiver-Machined Forging (22).svg` | `Lower Receiver_Final.svg` |
| `SUBSTRATE_NEEDS_INVERT` | `true` | `false` |
| Station camera scale | 1.2 | 6.5 |
| Scale factors used | — | X÷5.415, Y÷6.326 |

The old SVG was rendered at 8800×6800 with runtime `filter: invert(1)` + `mix-blend-screen`. The new SVG (`Lower Receiver_Final.svg`) has white strokes natively — no GPU filtering needed. This is a major perf win.

All coordinates were mechanically converted:
- Station `cx/cy` values divided by 5.415 (X) and 6.326 (Y)
- Station zoom multiplied by 5.415 (1.2 → 6.5)
- ProjectZone `top/left` positions recalculated so anchor dots land near camera targets
- Hero text position, container width, and all font sizes scaled down proportionally
- TitleBlockStation position and width scaled
- `computeScale` hero formula constants updated (1600→295, 560→89, 0.52→2.82)

**Important:** The old substrate was non-uniformly stretched (X and Y scale factors differ), so the drawing now has correct proportions. Phase 3 visual calibration has since replaced the rough mechanical conversion values with the verified map at the top of this file.

---

## What needs to happen now: Phase 4 — Prune

The page compiles, runs, and has a verified calibrated station map. Next work should remove dead compatibility code and duplicate assets without changing the calibrated coordinates.

### Prune workflow

1. Start the dev server: `npm run dev -- --port 5174`
2. Preserve the Phase 3 camera and station layout values above
3. Remove duplicate substrate assets and dead runtime fields
4. Re-run `npm run build`
5. Run the 975×550 browser sanity check, plus `?calibrate=1`

### Values to preserve

**Station camera targets:**
```tsx
const STATIONS: Target[] = [
  { id: 'A', label: 'TRIGGER GUARD', cx: 291, cy: 528, scale: 6.5, rotateX: 10 },
  { id: 'B', label: 'BUFFER TUBE',   cx: 1048, cy: 134, scale: 6.5, rotateX: 35 },
  { id: 'C', label: 'PUMP PACKAGE',  cx: 678, cy: 692, scale: 6.5, rotateX:  8 },
  { id: 'D', label: 'RENDERINGS',    cx: 1288, cy: 661, scale: 6.5, rotateX: 12 },
  { id: 'T', label: 'TITLE BLOCK',   cx: 1274, cy: 953, scale: 5.4, rotateX:  0 },
];
```

**Hero:**
- Target: `cx: 812.5`, `cy: 537.5`, `scale: wide`, `rotateX: 0`
- Text: `left: 812.5px`, `top: 537.5px`, width `920px`

**ProjectZone detail geometry:**
- Circle size: `clamp(34px, 5.7vw, 50px)`
- Lift: `z: 75`

### Viewports to keep testing
- 975×550 (baseline)
- 1280×720
- 1440×900
- 1920×1080

---

## Files to read (in order)

1. `.continue-here.md` — execution checkpoint
2. This file — architectural context
3. `src/components/drawing-package/DrawingPackagePage.tsx` — the main file you'll edit
4. `src/components/drawing-package/ProjectZone.tsx` — station circle/line component
5. `src/components/drawing-package/TitleBlockStation.tsx` — title block station
6. `docs/the-handoff-and-plan-from-other-agent-session.md` — original architectural plan (line 329 onward)

## Architecture reminders

- **Event-driven camera**, NOT ScrollTrigger. Wheel/key/touch → `advance(±1)` → GSAP timeline per transition. Input locked during transitions. No scroll position mapping.
- **Viewport is pinned.** The substrate moves, not the user. `100vh` body, no scrollbar.
- **`computeStop(target, vw, vh)`** converts a `Target` (substrate point + zoom) into CSS transform values `{x, y, scale, rotateX}` that position the substrate so the target is centered in the viewport.
- **ProjectZone's `active` prop** is canonical. IntersectionObserver is harmless dead code — it can't fire under CSS 3D transforms.
- **`useLayoutEffect` is mandatory** for GSAP initial state to avoid refresh flashes.
- **StrictMode is OFF** in `main.tsx`. Do NOT re-enable it — double-mount kills GSAP.
- Use **Playwright or Chrome DevTools MCP** for browser verification, not the native agent browser.

## Git state

```
Run `git status --short --branch` for current state. The Phase 3 calibration changes were intentionally left uncommitted for review.
```

## Phase 4 — Prune

- Delete duplicate substrates: `Machined Forging (1).svg`, `(22).svg`, `-11.AI.svg`
- Delete dead `pathD` from `ProjectZoneLayout` interface
- Conditionally render ProjectZone heavy decorations behind `active` prop
- Convert hero word-cycle from `useState`/`setInterval` to CSS `@keyframes`

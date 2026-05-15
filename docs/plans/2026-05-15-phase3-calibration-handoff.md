# Session Handoff: Phase 3 — Station Calibration

**Date:** 2026-05-15
**Worktree:** `scroll-driven-engineering-drawing`
**Branch:** `scroll-driven-engineering-drawing` tracking `engineering-drawing/main`
**Dev server:** `npm run dev -- --port 5174` → `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package`
**Build status:** ✅ green (`npm run build` passes, zero TS errors, zero console errors)

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

**Important:** The old substrate was non-uniformly stretched (X and Y scale factors differ), so the drawing now has correct proportions but station framing needs visual calibration. The math got us in the ballpark, not pixel-perfect.

---

## What needs to happen now: Phase 3 — Calibration

The page compiles and runs. The drawing renders at native resolution with white strokes. Camera movement works (wheel/key/touch → station-by-station advance). But the station positions, hero text sizing, and ProjectZone anchor geometry all need visual tuning on the new coordinate system.

### Calibration workflow

1. Start the dev server: `npm run dev -- --port 5174`
2. Open `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package?calibrate=1`
3. The `?calibrate=1` flag forces all station zones visible with amber border overlays
4. Step through each station (scroll/arrow keys) and verify framing
5. Adjust values in `DrawingPackagePage.tsx` and hot-reload

### What to tune

**Station camera targets** (lines ~58-63 in DrawingPackagePage.tsx):
```tsx
const STATIONS: Target[] = [
  { id: 'A', label: 'TRIGGER GUARD', cx: 291, cy: 528, scale: 6.5, rotateX: 10 },
  { id: 'B', label: 'BUFFER TUBE',   cx: 1048, cy: 134, scale: 6.5, rotateX: 35 },
  { id: 'C', label: 'PUMP PACKAGE',  cx: 678, cy: 692, scale: 6.5, rotateX:  8 },
  { id: 'D', label: 'RENDERINGS',    cx: 1288, cy: 661, scale: 6.5, rotateX: 12 },
  { id: 'T', label: 'TITLE BLOCK',   cx: 1274, cy: 953, scale: 6.5, rotateX:  0 },
];
```
- `cx/cy` = substrate point (in native 1625×1075 SVG pixels) to center under the viewport
- `scale` = zoom factor — 6.5 is the converted value; may need per-station tuning
- These should target interesting drawing features (trigger guard detail, buffer tube socket, etc.)

**ProjectZone positions** (lines ~521-556):
- `top` / `left` = where the 600×500 zone box sits on the substrate
- Currently computed as `cx - anchor.x` and `cy - anchor.y` with anchor at center (300, 250)
- The zone boxes are large relative to the substrate (600px on a 1625px substrate = 37%) — that's OK because the camera zooms in enough that only a small part is visible

**ProjectZone layout objects** (lines ~66-89):
- `anchor` = dot position within the 600×500 zone SVG viewBox
- `circleStyle` = CSS absolute position of the detail circle within the zone
- Currently all anchors are at (300, 250) center — should be varied per station

**Hero text** (lines ~558-630):
- Position: `left: 369px, top: 304px` on substrate
- Container width: `295px`
- Font sizes are tiny in substrate-pixels (33px name, 6px header, 5px subtitle, 3.5-4.5px spec) — they get scaled up by the camera zoom (~1.7 at hero stop) to readable screen-pixels
- These may need adjustment if they look too small/large on screen

**TitleBlockStation** (in TitleBlockStation.tsx, lines ~63-67):
- Position: `top: 917px, left: 1182px, width: 185px`
- Internal font sizes (text-3xl, text-xl, text-2xl, etc.) are in screen-space CSS classes but will appear at 6.5× scale — likely way too big. May need scaling down.

### Viewports to test
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
## scroll-driven-engineering-drawing...engineering-drawing/main
 M .continue-here.md
 M package-lock.json
 M package.json
 M src/components/drawing-package/DrawingPackagePage.tsx
 M src/components/drawing-package/TitleBlockStation.tsx
?? docs/the-handoff-and-plan-from-other-agent-session.md
```

All changes are uncommitted. `docs/the-handoff-and-plan-from-other-agent-session.md` is untracked — preserve it.

## After calibration (Phase 4 — Prune)

- Delete duplicate substrates: `Machined Forging (1).svg`, `(22).svg`, `-11.AI.svg`
- Delete dead `pathD` from `ProjectZoneLayout` interface
- Conditionally render ProjectZone heavy decorations behind `active` prop
- Convert hero word-cycle from `useState`/`setInterval` to CSS `@keyframes`

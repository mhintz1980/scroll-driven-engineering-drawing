# Session Handoff: Pixelation + Navigation Recovery

**Date:** 2026-05-15
**Worktree:** `scroll-driven-engineering-drawing`
**Route:** `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package`
**Branch:** `scroll-driven-engineering-drawing` tracking `engineering-drawing/main`
**Status:** Phase 3 coordinates are useful as a reference, but the experience is not acceptable yet because the close-up stations are visibly pixelated and wheel navigation overshoots.

---

## Read First

1. `.continue-here.md`
2. This handoff
3. `docs/plans/2026-05-15-phase3-calibration-handoff.md`
4. `docs/the-handoff-and-plan-from-other-agent-session.md` from line 329 onward
5. Runtime files:
   - `src/components/drawing-package/DrawingPackagePage.tsx`
   - `src/components/drawing-package/ProjectZone.tsx`
   - `src/components/drawing-package/TitleBlockStation.tsx`
   - `src/styles/drawing-package.css`

Use Playwright or Chrome DevTools for verification. Do not rely on the native agent browser.

---

## User-Reported Problems

### 1. Everything looks pixelated

The background drawing, detail circles, detail images, labels, and text all look pixelated at station stops.

Likely causes:

- The runtime uses the native `1625×1075` SVG substrate, then zooms detail stations to `scale: 6.5`.
- Text and UI live inside the transformed substrate, so browser rasterization/compositing scales tiny CSS pixels up during 3D transforms.
- Detail images inside the circles are clipped into very small substrate-space circles, then magnified by the station zoom.
- The background may be an SVG, but CSS 3D transforms, `rotateX`, blur, filters, and GPU compositing can rasterize it before the final scale.
- Current ProjectZone labels use tiny type such as `text-[1.55px]`, then rely on `scale: 6.5` to become readable. That is fragile and visually soft.

Current relevant values:

```tsx
const SUBSTRATE_W = 1625;
const SUBSTRATE_H = 1075;
const SUBSTRATE_ASSET = 'Lower Receiver_Final.svg';

const STATIONS: Target[] = [
  { id: 'A', label: 'TRIGGER GUARD', cx: 291,  cy: 528, scale: 6.5, rotateX: 10 },
  { id: 'B', label: 'BUFFER TUBE',   cx: 1048, cy: 134, scale: 6.5, rotateX: 35 },
  { id: 'C', label: 'PUMP PACKAGE',  cx: 678,  cy: 692, scale: 6.5, rotateX: 8 },
  { id: 'D', label: 'RENDERINGS',    cx: 1288, cy: 661, scale: 6.5, rotateX: 12 },
  { id: 'T', label: 'TITLE BLOCK',   cx: 1274, cy: 953, scale: 5.4, rotateX: 0 },
];
```

### 2. Mouse/trackpad navigation overshoots

It is too easy for one scroll gesture to advance past the intended next station.

Likely causes in `DrawingPackagePage.tsx`:

- `advance()` buffers one direction while `isTransitioning` is true:

```tsx
if (isTransitioning) {
  bufferedDir = dir;
  return;
}
```

- On timeline completion, the buffered direction immediately advances again:

```tsx
if (bufferedDir !== null) {
  const d = bufferedDir;
  bufferedDir = null;
  advance(d);
}
```

- Trackpads continue emitting wheel events during a single physical flick. The current `380ms` wheel cooldown is shorter than the station animation, so late inertial wheel events are captured as the next buffered command.
- Result: one user scroll can mean "go to next station, then auto-consume buffered inertial scroll and go to the station after that."

---

## Recommended Fix Direction

### Priority A: Fix image/text sharpness structurally

Do not just tweak blur or CSS shadows. The problem is architectural.

Recommended options, in order:

1. **Use a higher-resolution substrate for station zooms**
   - Keep coordinates in native SVG units if possible, but render the drawing at 2x or 4x CSS dimensions before applying camera math.
   - Example target: `3250×2150` or `6500×4300`, using proportional coordinate scaling.
   - This may require recalibrating stop math, but it directly addresses background pixelation.

2. **Keep callout UI screen-space instead of substrate-space**
   - Background substrate can move/tilt/zoom.
   - Detail circles, labels, and readable text should be projected from station coordinates into viewport coordinates and rendered in a fixed overlay layer.
   - This avoids tiny `1px` and `2px` text being magnified by CSS transforms.
   - Preserve the spatial concept: anchors remain attached to the drawing, but content panels stay crisp in screen pixels.

3. **Use high-res/correct-size media in detail circles**
   - If circles stay large on screen, the source images need enough pixels at final displayed size.
   - Avoid scaling small WebP assets through substrate-space transforms.

4. **Audit CSS filters/compositing**
   - Blur during whip-pan is fine, but ensure final station state has `filter: blur(0px)`.
   - If SVG is still soft, test whether `rotateX` or transformed parent compositing is causing rasterization.

Good first experiment:

- Add a temporary high-resolution substrate render mode, such as `RENDER_SCALE = 2`.
- Render the image/container at `SUBSTRATE_W * RENDER_SCALE`, `SUBSTRATE_H * RENDER_SCALE`.
- Convert `computeStop()` and station placement so visual framing is identical.
- Compare screenshots at 975×550 and 1440×900 against the current version.

If high-res substrate fixes the drawing but text/detail UI remains soft, move UI to a screen-space overlay.

### Priority B: Make scroll navigation deliberate

Recommended behavior:

- One physical wheel gesture should advance at most one station.
- Do not buffer wheel input while transitioning.
- Keyboard input can remain discrete and may buffer or ignore during transition.
- Touch swipes should be one gesture per station.

Suggested implementation:

1. Split input source:
   - `advance(dir, source)` where source is `'wheel' | 'key' | 'touch'`.
2. For wheel:
   - If transitioning, ignore wheel input. Do not set `bufferedDir`.
   - Add a longer post-transition wheel lockout, e.g. `900ms`.
   - Consider accumulating wheel delta and triggering only after a threshold, then reset accumulation.
3. For keyboard:
   - Either ignore during transitions or allow a single buffered key command. Do not share this with wheel.
4. For trackpads:
   - Treat inertial wheel events as part of the same gesture. A simple practical guard is:
     - trigger once
     - lock wheel until the transition completes
     - then require a quiet period before accepting another wheel event

Current risky code is the shared `bufferedDir` in `DrawingPackagePage.tsx`; start there.

---

## Other Known Issues / Follow-Up Risks

- `ProjectZoneLayout.pathD` is still dead compatibility code. Do not prioritize this before pixelation/navigation.
- Phase 4 prune was next, but it should be paused until the user-visible quality issues above are fixed.
- `ProjectZone` still uses heavy always-mounted decorations; this can be optimized later by rendering expensive circle internals only when active or in calibration mode.
- Hero word cycle still uses `useState` + `setInterval`; can become CSS keyframes later.
- TitleBlockStation and ProjectZone both still depend on tiny substrate-pixel type. Screen-space overlay work would likely remove this class of issue.
- Existing calibrated coordinates are valuable for target positions, but do not treat the current `scale: 6.5` implementation as sacred. It is the likely source of the visual quality failure.

---

## Acceptance Criteria For Next Session

### Pixelation

- At 975×550 and 1440×900, station A and B screenshots show crisp drawing linework at rest.
- Detail circle image content is not visibly blocky at the final displayed size.
- Labels and title block text are crisp, not scaled-up tiny CSS text.
- Final station state has no unintended background blur.

### Navigation

- One mouse-wheel notch or trackpad flick advances one station only.
- Wheel input during a transition does not auto-advance again when the transition completes.
- Arrow keys still advance predictably by one station.
- Reverse navigation does not skip stations.

### Verification

Run:

```bash
npm run build
```

Browser checks:

- `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package`
- `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package?calibrate=1`
- Viewports: `975×550`, `1280×720`, `1440×900`, `1920×1080`

Capture before/after screenshots for:

- Hero overview
- Station A
- Station B
- Title block

---

## Suggested First Task

Start with navigation, because it is smaller and will make browser calibration easier:

1. Change wheel handling so wheel events are ignored while transitioning.
2. Remove wheel participation in `bufferedDir`.
3. Add a post-transition wheel quiet period.
4. Verify one wheel gesture cannot skip from hero to B or A to C.

Then address pixelation with either a high-res substrate render-scale experiment or a screen-space overlay prototype.

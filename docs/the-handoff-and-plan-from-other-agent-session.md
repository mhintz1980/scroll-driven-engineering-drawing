Read this handoff then tell me what can be improved. The page we will working on is supposed to feel like a opening credits scene of a thriller or Deadpool movie; short focused segments separated by disorienting rapid whip-pan camera movements. The user should have limited control over scrolling. Once the user arrives at a station the animation proceeds regardless of user action. This is meant to keep the experience smooth. Having the user's scroll fully control the movement has proven to be beyond our mine and the other agents capabiltities. Perhaps you should also review what, if anything is bloated and bogging the page down. If i need to modify the SVG file used for the background then let me know.

# HANDOFF SUMMARY (for fresh agent)

**LANGUAGE INSTRUCTION**: Respond in English only.

## Original problem statement

Build a cinematic CAD-blueprint portfolio landing page. The user wants a "rollercoaster" camera that:

- Starts zoomed out (wide shot)
- Pans/zooms into hero with text unrolling left→right via clip-path
- On scroll, whip-pans to each station with a slight OVERSHOOT then SETTLES back into a slight perspective tilt
- Activate the "impeccable" skill — brand is precision/floor-tested per `/app/PRODUCT.md` (no AI-slop, no generic gradients)

## What currently exists

React + Vite + GSAP SPA with a `/drawing-package` route rendering an 8800×6800px CAD blueprint substrate. Camera moves via GSAP transforms on the substrate while a single pinned ScrollTrigger maps scroll progress to 5 station triggers (A/B/C/D/T).

## Last working item — IN PROGRESS

Implementing the "rollercoaster" cinematic with overshoot + per-station settle tilts.

- ✅ Removed StrictMode from `main.tsx` (was creating competing GSAP contexts → hero text invisible bug)
- ✅ Wide → hero intro flies in, hero text unrolls correctly
- ✅ Generic `flyToStationRollercoaster()` helper used for all stations
- ✅ Per-station settle tilts (A=10°, B=35°, C=8°, D=12°, T=0°)
- ❌ **NEW BUG (visible in user screenshot)**: Station C frames incorrectly — the detail circle is pushed off the right edge of the viewport, the "INDUSTRIAL DEWATERING PUMP" label is truncated to "INDUSTRIAL DEWATER...", and the pump image inside the circle is cropped. The blueprint behind shows empty space ("SCALE 1" visible top-right). User wants this fixed and is handing off to a fresh agent.

## All Pending/In progress Issue list

### Issue 1: Station C off-frame + label clipped (P0, user-visible regression)

- Visible in user screenshot at `/Mark_Hintz-Portfolio-v2/artifacts/nsppq3tq_image.png`
- Symptoms: circle pushed to right edge, label clipped, pump image cropped, blueprint area mostly empty
- Likely root causes (investigate in order):
  1. **Station C stop coordinates wrong for current viewport** — `getStationCStop` returns `{x: -3920 + 0.5*(vw-975), y: -4980, scale: 1.2, rotateX: 0}`. With wide viewports (e.g., 1920+), `x` becomes more positive, pulling substrate to the right and pushing the C zone off-screen right.
  2. **My new settle tilt (rotateX=8°)** may be stretching the circle vertically and contributing to misframing.
  3. **Overshoot in rollercoaster** — when settling, the camera returns to `stop.x` exactly, but the calibration was done against the previous (no-overshoot) flow.
- Next debug checklist:
  - Open `/app/src/components/drawing-package/DrawingPackagePage.tsx` `getStationCStop` (line ~68) and `SETTLE_TILTS` array (line ~298)
  - Verify Station C's `top: '4200px', left: '3500px'` (in JSX at line ~482) is correct for the substrate, and the circle's `left: '360px'` offset in `STATION_C_LAYOUT.circleStyle` puts it where you want
  - Test at multiple viewport widths (1366, 1440, 1920)
  - Recalibrate `getStationCStop().x` so the detail circle is roughly centered (vw/2) at the user's primary viewport
- Why fix: User specifically wants impeccable visual polish. Station C is currently broken on a typical desktop viewport.
- Status: NOT STARTED (just reported by user)
- Should test frontend/backend/both after fix: **Frontend only** — but Playwright headless throttles rAF, so VISUALLY test in user's real browser by asking user to verify after each adjustment.

### Issue 2: Other stations may also be off (P1, suspected)

- If Station C is mis-framed, B/D/T calibrations may also need re-checking with the new rollercoaster + tilt flow
- Status: NOT STARTED — investigate after fixing C

## In progress Task list

### Task 1: Polish the rollercoaster numbers (P2)

- The overshoot is 7% in scale + 88px/58px in x/y. Whip duration is 1.12s tightening per station. Settle is 0.52s. These are tunable in `flyToStationRollercoaster(stop, opts)` defaults at line ~256.
- User may want to feel "tighter" or "more dramatic" after seeing it on real browser.
- Status: WAITING_USER_FEEDBACK after fixing Issue 1.

## Upcoming and Future Tasks

- [ ] Click/keyboard arrow nav between stations
- [ ] Station detail expansion panel (click the circle → expand project description)
- [ ] HomePage → DrawingPackagePage page transition animation
- [ ] Mobile responsiveness (currently desktop-first; rollercoaster assumes desktop viewport)
- [ ] `prefers-reduced-motion` fallback (skip rollercoaster, use straight fades)
- [ ] Optional: subtle grain shimmer that intensifies during whip-pan (offered to user, no response yet)
- [ ] Sound design (whip-pan SFX, ambient machinery hum)
- [ ] Remotion-based video export of the sequence

## Completed work in this session

- [2026-02-13] Removed React StrictMode in `main.tsx` — fixed hero-text-invisible bug caused by GSAP context double-mount
- [2026-02-13] Added `window.scrollTo(0, 0)` on mount in DrawingPackagePage to prevent stale scroll position triggering ScrollTrigger mid-intro
- [2026-02-13] Refactored Station A's bespoke rollercoaster into generic `flyToStationRollercoaster(stop, opts)`
- [2026-02-13] Wired stations B/C/D/T through the new helper (forward scroll only)
- [2026-02-13] Reverse scroll uses softer `flyTo()` without overshoot/blur for cleaner backward travel
- [2026-02-13] Added per-station `SETTLE_TILTS = [10, 35, 8, 12, 0]` so each station ends at a unique tilt
- [2026-02-13] Tightened `whipDuration` per station for momentum continuity (`tightening = min(targetStation * 0.04, 0.16)`)
- [2026-02-13] Added dev-only `window.__gsap` exposure (gated by `import.meta.env.DEV`) for headless test introspection
- [2026-02-13] Updated `/app/memory/PRD.md` with full architecture + critical-info-for-next-agent

## Earlier issues found but not fixed

None remaining.

## Known issue recurrence

- StrictMode → competing GSAP contexts: FIXED. Do NOT re-enable StrictMode without a different GSAP guard.

## Code Architecture

```
/app/
├── src/
│   ├── components/drawing-package/
│   │   ├── DrawingPackagePage.tsx    # Main GSAP camera controller (~600 lines)
│   │   ├── ProjectZone.tsx           # Station circles with imperative `active` prop
│   │   └── TitleBlockStation.tsx     # Title block (last station)
│   ├── styles/drawing-package.css    # Scene CSS + scroll-cue keyframe
│   ├── data/portfolioData.ts         # Content
│   ├── main.tsx                      # Root render (NO StrictMode)
│   └── App.tsx                       # Router with basename = import.meta.env.BASE_URL
├── frontend/package.json             # Supervisor alias for `yarn start`
├── vite.config.ts                    # allowedHosts: true (REQUIRED for preview)
└── memory/PRD.md                     # Full architecture + critical notes
```

## Key Technical Concepts

React (no StrictMode), Vite 8, GSAP (Timeline + ScrollTrigger + `gsap.context` lifecycle management), CSS `clip-path` for name unroll, 3D transforms with `perspective: 4000px` + `rotateX` + `transformStyle: preserve-3d`.

## Key DB schema

N/A — pure frontend.

## Changes in tech stack

None. Vite 8 host config (`allowedHosts: true` boolean) and StrictMode removal are the only env-level changes.

## All files of reference

1. `/app/src/components/drawing-package/DrawingPackagePage.tsx` — **PRIMARY FILE**. Contains intro timeline (line ~196), `flyTo()` helper (line ~217), `flyToStationRollercoaster()` (line ~252), `flyToStationARollercoaster()` (line ~295), ScrollTrigger setup (line ~302), and the JSX with substrate + ProjectZones + TitleBlockStation
2. `/app/src/components/drawing-package/ProjectZone.tsx` — Station circle with `active` prop (line ~25), `playZoneIntro()` (line ~100), 3D leader line math (line ~42)
3. `/app/src/main.tsx` — StrictMode removed (CRITICAL — do not re-add)
4. `/app/vite.config.ts` — `allowedHosts: true` (CRITICAL — do not change to string array)
5. `/app/frontend/package.json` — supervisor `yarn start` alias (Emergent infrastructure)
6. `/app/memory/PRD.md` — full architecture + critical-info-for-next-agent

## Critical Info for New Agent

### 🚨 Playwright headless rAF throttling

**Playwright's headless Chrome throttles `requestAnimationFrame` to ~1fps**, making ALL GSAP timelines look frozen during tests. This is NOT a real bug.

To verify animations in headless tests:

```python
# Force globalTimeline to advance N seconds (skips the rAF wait)
await page.evaluate("() => window.__gsap.globalTimeline.time(window.__gsap.globalTimeline.time() + 5)")
await page.wait_for_timeout(200)  # let layout commit
```

`window.__gsap` is exposed only in dev (gated by `import.meta.env.DEV`) — at `/app/src/components/drawing-package/DrawingPackagePage.tsx` line 14.

**Do not "fix" code based on Playwright headless timing observations.** Ask user to verify in their real browser at 60fps.

### 🚨 StrictMode is OFF

Do NOT re-add `<StrictMode>` to `/app/src/main.tsx`. It double-mounts the GSAP context on dev HMR which creates competing intro tweens and leaves substrate frozen at wide-shot.

### 🚨 Preview URL

The Emergent preview runs Vite with `--base /` (overrides `vite.config.ts`'s `base: '/Mark_Hintz-Portfolio-v2/'`). The drawing-package route is therefore at:
`https://smooth-hero-motion.preview.emergentagent.com/drawing-package`
NOT `/Mark_Hintz-Portfolio-v2/drawing-package`. Router basename uses `import.meta.env.BASE_URL` which adapts automatically.

### 🚨 ProjectZone IntersectionObserver fallback is DEAD CODE

The substrate uses CSS 3D transforms, which break IntersectionObserver. ProjectZone has both an observer path AND an `active` prop path — the `active` prop is canonical. Parent passes `active={activeStation === N}`. Don't refactor the observer code; it's harmless.

### 🚨 Backend supervisor

There is NO backend (pure frontend SPA). `supervisorctl status` shows `backend FATAL` — this is expected and OK. Do not try to start it.

## Key API endpoints

N/A — pure frontend.

## Documents and test reports created in this job

- `/app/memory/PRD.md` — rewritten with full architecture + rollercoaster details + critical-info section
- `/app/test_reports/iteration_1.json` — old, from previous fork (before rollercoaster work)

## Last 10 user messages and any pending HUMAN messages

1. _User:_ "why can't i preview the page?..." (RESOLVED)
2. _User:_ "Blocked request. This host... is not allowed..." (RESOLVED — `allowedHosts: true`)
3. _User:_ "still getting error: Failed to load resource: the server responded with a status of 403" (RESOLVED)
4. _User:_ "much smoother. I feel like there should be a bit more camera movement involving zoom levels. For example, the hero section should be zoomed out... unrolling effect... rollercoaster feeling. As Station A is reached the camera slows down quickly and slightly overshoots... shifts back to a slight perspective..." (PARTIALLY IMPLEMENTED — see Issue 1 above)
5. _User:_ "go for it. continue and use the 'impeccable' skill" (DONE)
6. _User (most recent, with screenshot):_ **"can you handoff to a fresh agent?"** — user wants a fresh start with the Station C miscalibration visible in their screenshot

**PENDING from user**: Fix Station C framing as visible in the user's attached screenshot. Verify other stations (B, D, T) at their real browser viewport while you're in there.

## Project Health Check

- ✅ Vite dev server: running on port 3000
- ✅ Preview URL: `https://smooth-hero-motion.preview.emergentagent.com/drawing-package` returns the SPA correctly
- ✅ Hero intro: working (wide shot → fly in → text unroll, verified by force-advancing GSAP timeline)
- ✅ Station A rollercoaster: working
- ❌ **Station C: BROKEN — see user screenshot.** Circle off-frame, label clipped.
- ⚠️ Stations B/D/T: untested at the user's real viewport. Likely also need calibration review now that overshoot+settle is in.

## 3rd Party Integrations

None active. Pure GSAP/CSS.

## Testing status

- `testing_agent_v3_fork`: USED in prior fork (iteration_1.json, before rollercoaster). NOT useful for this app because Playwright headless throttles rAF.
- `troubleshoot_agent`: NOT NEEDED (current agent diagnosed and fixed the StrictMode bug directly)
- Test files: `/app/test_reports/iteration_1.json` (stale, pre-rollercoaster)
- Known regressions: Station C miscalibration (Issue 1 above)
- **Testing strategy for next agent**: Self-test by forcibly advancing `window.__gsap.globalTimeline.time()` in screenshot scripts. Then hand off to USER for final real-browser verification — Playwright is unreliable for cinematic timing tests.

## Credentials to test flow

None required — public static SPA.

## What agent forgot to execute

Nothing critical. The user is handing off proactively after seeing Station C broken in real browser. Next agent should:

1. Ask user to confirm the exact viewport size from the screenshot (looks like ~1920+ wide)
2. Recalibrate `getStationCStop()` coordinates so the detail circle centers in the viewport
3. Audit B/D/T calibrations the same way (one screenshot per station from user, then tune)

## Debugging checklist for current issue (Station C)

**Issue: Station C circle off-frame, "INDUSTRIAL DEWATER..." label clipped**

Frontend files to check:

- `/app/src/components/drawing-package/DrawingPackagePage.tsx`
  - Line ~68 `getStationCStop()` — adjust `x` and `y` (test at vw=1920 first)
  - Line ~33 `STATION_C_LAYOUT` — `circleStyle.left: '360px'` may need adjustment
  - Line ~298 `SETTLE_TILTS = [10, 35, 8, 12, 0]` — try setting C to 0 to rule out tilt distortion
  - Line ~482 ProjectZone for C: `top="4200px" left="3500px"` — position on substrate
- `/app/src/components/drawing-package/ProjectZone.tsx`
  - Line ~246 — circle dimensions are `h-[clamp(180px,31vw,300px)]` — could be sizing too large on wide viewports

Suggested approach:

1. Add a `?calibrate` URL param to force all zones visible (already supported in ProjectZone line ~164)
2. Visit `https://smooth-hero-motion.preview.emergentagent.com/drawing-package?calibrate` and screenshot
3. Identify where on the substrate Station C's circle actually is, vs where the camera takes you
4. Adjust `getStationCStop()` x/y until the circle is centered when the camera arrives at Station C

---

I've read the handoff, audited the code, and looked at the assets. Here's my honest assessment — going to be blunt because that's what gets you somewhere.

---

## The real problem: the paradigm is wrong

The current model is **ScrollTrigger pin + 7000px scroll area + onUpdate continuously mapping scroll position to discrete station triggers.** That is precisely the hybrid that has been beating up every agent — including me — for the last 3 forks. It's neither scroll-scrubbed (where scroll position drives every pixel) nor event-triggered (where one gesture = one cinematic beat). It's both, and they fight each other.

What you described — _"short focused segments separated by disorienting rapid whip-pan camera movements. Once the user arrives at a station the animation proceeds regardless of user action. User has limited control over scrolling."_ — is the **event-triggered** model. Not scroll-position-driven. The fix is to throw out ScrollTrigger entirely for this page and do this:

```
state machine: { current: hero | A | B | C | D | T, isTransitioning: bool }
input: wheel | ArrowDown/Up | touch swipe | space
rule: if isTransitioning → SWALLOW input (or buffer 1)
      else → go to next/prev station, lock input until onComplete fires
```

That's it. ~40 lines replaces ~200 lines of ScrollTrigger plumbing. The page doesn't need to be 8080px tall. The browser scrollbar stays at the top. The user has _exactly_ the limited control you want: one tick of the wheel = one cinematic beat. They cannot scroll past, scroll halfway, or interrupt. Movies don't let you scrub mid-cut; neither should this.

This single change kills:

- Station C's calibration regression (no more "scroll-progress vs station-index" disagreement)
- The mid-flight retrigger bug (input is locked during transitions)
- The 7000px pin spacer (body stays at 100vh)
- The "scroll backward = different animation than forward" awkwardness
- Maybe half the file size of DrawingPackagePage.tsx

---

## The SVG — yes, you should modify it. This is your highest-ROI win.

Three things, in order of impact:

### 1. Pre-invert it to white-on-transparent (CRITICAL)

Right now the runtime applies `filter: invert(1)` AND `mix-blend-screen` on an 8800×6800 raster layer. The browser has to allocate a ~60-megapixel composite buffer and re-filter it on **every transform change**. That is the single biggest reason whip-pans feel mushy.

In Inkscape: select all → Object → Object Properties → fill black → invert to white. Save as a new file. Then in `DrawingPackagePage.tsx` drop `filter: invert(1)` and `mix-blend-screen`. Background stays `bg-slate-950`. Lines render natively as white.

Expected framerate gain: 2-5× on whip-pans, depending on GPU. This alone may make the page feel acceptable on cheaper hardware.

### 2. Match the SVG's natural size — stop the 5.4× upscale

The SVG's intrinsic viewBox is **1625×1075**, but the React substrate is sized **8800×6800** in CSS. That's a 5.4× upscale that forces a giant rasterization. There's no reason for the substrate to be 8800px. Render at 1625×1075 (or 3250×2150 if you want some retina headroom) and recalibrate stations in the SVG's native coordinate system. Camera math becomes 5× cleaner numbers.

### 3. Inline the SVG and tag the anchor points

Right now stations live at "magic numbers on a substrate that has no semantic relationship to the drawing." `top: '3200px', left: '1450px'` is just where someone hand-tuned the trigger-guard circle to land. When viewport changes, you bolt a linear regression onto it (`x: -3920 + 0.5*(vw - 975)`), and it drifts. That's why Station C broke.

The proper fix: inline the SVG (it's 1.3 MB but Vite can import it as a React component, and you only need the visible paths — strip Inkscape's metadata and you'll halve the size). Add `<g id="anchor-trigger-guard">` directly on the drawing element where Station A should land. Then:

```tsx
const target = svg
  .querySelector("#anchor-trigger-guard")
  .getBoundingClientRect();
// compute camera so this rect is centered + scaled to viewport
```

No more `-3920 + 0.5 * (vw - 975)` magic numbers. The anchor is _in the drawing_, not bolted onto a parallel coordinate system. Stations will follow the drawing through any viewport change.

If inlining is too disruptive right now, the cheaper version is: keep `<img>` but stop using hand-tuned coordinates. Define each station as a fractional point on the substrate `{u: 0.16, v: 0.62}` and let the camera function do the math. At least kill the magic numbers.

---

## Bloat & dead weight

**Heavy stuff that's slowing the page:**

1. **`/public/assets/images/` is 17 MB**, and at least three are 1+ MB duplicates of the same SVG (`(1).svg`, `(22).svg`, `-11.AI.svg`). The drawing-package route only references **one image per station** (4 images) plus the SVG. Everything else is from the HomePage and shouldn't be loaded eagerly. Move the unused ones into a subfolder so they don't ship.

2. **`mix-blend-screen` + `backdrop-blur-md` + `filter: invert(1)` + `perspective(4000px)` + `rotateX` on the substrate** is a 5-stack of GPU effects. Each one forces a separate composite layer. Removing `mix-blend-screen` and `invert` (via pre-inverted SVG, point 1 above) cuts this in half.

3. **`ProjectZone` has ~17 nested divs per station** with dashed border + dashed border + reticle + crosshair + diagonal hash gradient + spinning inner ring + drop-shadow + backdrop-blur — and there are 4 of these mounted simultaneously off-screen. The spinning `animate-[spin_60s_linear_infinite]` keeps repainting even when the station is invisible. Most of this should be conditionally rendered (`{active ? <reticle/> : null}`) or paused via `animation-play-state: paused` when not active.

4. **Hero word-cycle `setInterval` fires `setState` every 2.5s indefinitely**, even during whip-pans, causing React reconciliation mid-animation. Convert this to a pure CSS `@keyframes` cycle on a `<span>` stack — no React state, no re-renders.

**Dead code that bloats the file but doesn't slow runtime:**

- `ProjectZone.tsx` IntersectionObserver path (lines 175-189) — handoff says it's dead. Delete it. The `active` prop path is canonical.
- `ProjectZoneLayout.pathD` field — comment says "Kept for interface compatibility but we will use dynamic 3D lines." Delete it. Also delete the `pathD` values from all four `STATION_*_LAYOUT` constants.
- The whole "scroll-snap-type: y proximity" CSS in `drawing-package.css` — irrelevant once the ScrollTrigger pin is gone.
- `console.log` debug hook for `window.__gsap` — useful for headless tests but ships as dev-only DCE'd anyway; leave it.

---

## What I'd actually do, in order

1. **Tear out ScrollTrigger.** Replace with a wheel/key/touch state machine. ~1 hour, biggest UX win.
2. **You modify the SVG** → pre-invert to white-on-transparent + strip Inkscape metadata. Drop `filter: invert(1)` and `mix-blend-screen` in code. ~15 min on your end, 2 min on mine.
3. **Shrink the substrate** from 8800×6800 to either 1625×1075 (1:1 with SVG) or 3250×2150 (retina). Recalibrate stations once, in SVG-native coordinates.
4. **Kill the dead code & static heavy assets** (IntersectionObserver fallback, pathD, mix-blend, the unused 17MB of images).
5. **Move ProjectZone's heavy decorations behind `active`** so only the visible station is animating.
6. _Then_ tune the rollercoaster numbers. With those four fixes done, the cinematic timing actually becomes the only thing to debate.

If you do (1) + (2) + (3), I'd bet money the whole page becomes 60fps on any laptop, the "Station C broken" class of bugs becomes structurally impossible, and the cinematic feel hits Deadpool-credits territory instead of "scroll-driven CAD demo."

Tell me which of these you want to greenlight and I'll start. If you can do the SVG pre-invert in Inkscape and drop it in `/app/public/assets/images/` (or paste the file path), I can start the code work in parallel.

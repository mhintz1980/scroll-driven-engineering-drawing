# Session Handoff

Date: 2026-04-14
Repo: `mark-hintz-portfolio_bg-cad`
Scope: image sequences + text clouds for all V2 project scenes, rendered video wired into portfolio page

---

## Current Repo State

Branch: `main`
HEAD commit: `f982ccd` — feat(remotion): image sequences + text clouds for all V2 project scenes, rendered video on portfolio page

Verified this session:

- `cd remotion && npx tsc --noEmit` — CLEAN
- All 11 referenced image assets verified to exist in `remotion/public/assets/images/`
- ShowreelRemixV2 rendered to MP4 (25.8 MB) — confirmed playing on portfolio page
- All changes committed and pushed to `origin/main`

---

## What Changed This Session

### 1. RemixProjectScene.tsx — imageSequence crossfade rendering

`remotion/src/remix/scenes/RemixProjectScene.tsx`

- Replaced single static `<Img>` with conditional rendering
- When no `imageSequence` provided: renders the existing static hero image (backward compatible)
- When `imageSequence` present: renders crossfading reel with 12-frame fade-in/out, per-image scale animation
- Same logic as `IdentityImageViewport` — no schema changes needed (`imageSequence` was already in `SceneOverlaySchema`)

### 2. resumeText.ts — pump + pumptracker phrase sets

`remotion/src/remix/resumeText.ts`

Added `pumpPhrases` (12 terms) and `pumptrackerPhrases` (12 terms) with pre-built text block exports:

Pump:
```
"SHEET METAL", "AIRFLOW LOGIC", "SERVICE ACCESS", "SOUND CONTROL",
"BEND RADIUS", "STRUCTURAL FRAME", "DFM / DFA", "ENCLOSURE FIT",
"BOM COMPLETE", "FLOOR READY", "ZERO REWORK", "BUILDABLE"
```

PumpTracker:
```
"FLOW VISIBILITY", "CAPACITY SIGNAL", "SHOP INPUT", "PLANNING LAYER",
"ADMIN RECOVERED", "HUMAN JUDGMENT", "LIVE SCHEDULES", "REACT / TS",
"LIGHTWEIGHT SYSTEM", "FLOOR SUPPORT", "30+ HRS / WEEK", "SYSTEMS PROOF"
```

### 3. Root.tsx — image sequences + text clouds for all 3 V2 projectScenes

`remotion/src/Root.tsx`

All three V2 `projectScenes` now have:
- `imageSequence` arrays with 12-frame crossfade overlaps (360 frame max)
- `resumeTextBlocks` — full 12-block kinetic text clouds using same lane geometry as identity scene

| Scene | Images | Text cloud |
|---|---|---|
| projectScenes[0] Pump | pump-package-04, rendering-05, pump-package-03, side-door (4 images) | ✓ pump phrases |
| projectScenes[1] Torque | side-door, torque-wrench-06, -05, -03, -02 (5 images) | ✓ gearbox phrases (already existed) |
| projectScenes[2] PumpTracker | pumptracker-04, pumptracker-light-final.png, pumptracker-03 (3 images) | ✓ pumptracker phrases |

### 4. EngineeringReel.tsx — video wired into portfolio page

`src/components/sections/EngineeringReel.tsx`

- `REEL_SRC` set to `'assets/video/engineering-review-loop.mp4'`
- Video rendered from ShowreelRemixV2 composition (25.8 MB h264)
- Placed at `public/assets/video/engineering-review-loop.mp4`
- Auto-plays, loops, muted on the portfolio page

---

## First Task For Next Session

Add new project scenes to the `ShowreelRemixV2` composition: **Armament**, **Renderings**, and optionally **Metrology**.

Each new scene requires four things:
1. New entry in `projects[]` array in V2 defaultProps in `Root.tsx`
2. New entry in `projectScenes[]` with tracePaths, reticle, imageSequence, and resumeTextBlocks
3. New `<TransitionSeries.Sequence>` block in `ShowreelRemixV2Video.tsx`
4. Update `TOTAL_FRAMES` in `Root.tsx` (currently `(8+10+12+12+12+8)*FPS - 5*20`) and `projectDirections` array

> **Do one scene at a time. Verify in Studio before adding the next.**

### Armament scene (add as projectScenes[3])

Project data:
```ts
{
  key: "armament",
  title: "ARMAMENT",
  subtitle: "Precision defense mechanism components",
  category: "Defense mechanisms / precision machining / GD&T",
  reviewLabel: "PRIMARY SIGNAL",
  emphasis: "primary" as const,
  outcome: "MIL-SPEC",
  outcomeLabel: "TOLERANCE COMPLIANCE",
  image: "assets/images/rendering-06.webp",
  tags: ["Defense", "Precision", "GD&T", "Mechanism Design"],
  problem: "Defense mechanism components require repeatable precision under operational loading without exceeding cost thresholds.",
  constraint: "MIL-SPEC tolerances, heat treat distortion, and assembly repeatability all constrain the geometry simultaneously.",
  decision: "Applied inspection-first dimensioning with fixture strategy and post-HT cleanup machined into the process plan.",
  validation: "Dimensional compliance verified through inspection plan before release, not assumed from drawing alone.",
  callouts: ["MIL-SPEC COMPLIANCE", "FIXTURE STRATEGY", "INSPECTION-FIRST"],
}
```

Image sequence:
```ts
imageSequence: [
  { src: "assets/images/rendering-06.webp", startFrame: 0,   endFrame: 120, scaleFrom: 1.02, scaleTo: 1.10, opacity: 0.94 },
  { src: "assets/images/rendering-07.webp", startFrame: 108, endFrame: 240, scaleFrom: 1.00, scaleTo: 1.08, opacity: 0.94 },
  { src: "assets/images/rendering-09.webp", startFrame: 228, endFrame: 360, scaleFrom: 1.01, scaleTo: 1.09, opacity: 0.94 },
],
```

Phrases (add to `resumeText.ts` as `armamentPhrases`):
```ts
"MIL-SPEC TOLERANCE", "MECHANISM DESIGN", "REPEATABLE ASSEMBLY", "HEAT TREAT STRATEGY",
"INSPECTION FIRST", "CRITICAL CLEARANCES", "±0.0001 BORE FIT", "HARDENED COMPONENTS",
"DYNAMIC LOADING", "FUNCTION TEST", "MATERIAL CERT", "RELEASE READY"
```

### Renderings scene (add as projectScenes[4])

Project data:
```ts
{
  key: "renderings",
  title: "RENDERINGS",
  subtitle: "Technical visualization supporting engineering decisions",
  category: "SolidWorks Visualize / KeyShot / design communication",
  reviewLabel: "SECONDARY PROOF",
  emphasis: "secondary" as const,
  outcome: "ZERO",
  outcomeLabel: "REVISION CYCLES",
  image: "assets/images/renderings-hero.webp",
  tags: ["Visualization", "SolidWorks", "Design Review", "Communication"],
  problem: "Technical stakeholders need to evaluate design intent before fabrication — 2D drawings alone leave interpretation gaps.",
  constraint: "Renderings must accurately reflect manufacturability, not hide it under stylized lighting.",
  decision: "Used visualization as a design-review tool tied to real geometry, not a post-design marketing step.",
  validation: "Renderings used in design reviews reduced clarification back-and-forth before fab release.",
  callouts: ["REVIEW FIDELITY", "GEOMETRY-ACCURATE", "STAKEHOLDER CLARITY"],
}
```

Image sequence:
```ts
imageSequence: [
  { src: "assets/images/rendering-01.webp", startFrame: 0,   endFrame: 80,  scaleFrom: 1.02, scaleTo: 1.10, opacity: 0.94 },
  { src: "assets/images/rendering-04.webp", startFrame: 68,  endFrame: 150, scaleFrom: 1.01, scaleTo: 1.09, opacity: 0.94 },
  { src: "assets/images/rendering-08.webp", startFrame: 138, endFrame: 230, scaleFrom: 1.00, scaleTo: 1.08, opacity: 0.94 },
  { src: "assets/images/rendering-10.webp", startFrame: 218, endFrame: 310, scaleFrom: 1.02, scaleTo: 1.11, opacity: 0.94 },
  { src: "assets/images/renderings-hero.webp", startFrame: 298, endFrame: 360, scaleFrom: 1.01, scaleTo: 1.09, opacity: 0.94 },
],
```

> **Note:** Renderings scene needs `renderings-hero.webp` — verify this asset exists before wiring. If missing, use `rendering-01.webp` as fallback for the project data `image` field.

### Metrology scene (optional, add as projectScenes[5])

Project data skeleton exists in `docs/plans/2026-04-13-session-handoff.md` → "Metrology / GD&T scene". Images TBD — may need to be deferred or use existing torque wrench images.

### TOTAL_FRAMES update pattern

Current formula: `(8+10+12+12+12+8)*FPS - 5*20`

Each new 12-second project scene adds `12*FPS` frames and one more transition overlap (`-20`):
- 4 scenes: `(8+10+12+12+12+12+8)*FPS - 6*20`
- 5 scenes: `(8+10+12+12+12+12+12+8)*FPS - 7*20`

### ShowreelRemixV2Video.tsx update

This file needs a new `<TransitionSeries.Sequence>` block for each added scene. Copy the pattern from the existing project scene sequences. The component renders `<RemixProjectScene>` with the project data and sceneOverlay passed in.

`projectDirections` array in Root.tsx V2 defaultProps also needs extending — use alternating `"up"`, `"down"` pattern.

---

## Important Context To Preserve

Positioning hierarchy (never breaks):
- Primary: manufacturable mechanical design credibility
- Supporting: tolerance, inspection, assembly, fabrication lifecycle judgment
- Secondary: software and automation as supporting leverage, not identity

**"Armament"** is the correct engineering term. Not "firearms." DoD / MIL-SPEC / prime contractor language.

Image sequence constraints:
- 360 frames max per project scene (12s × 30fps)
- 12-frame overlaps for smooth crossfades
- `endFrame` must not exceed 360
- All values must be inlined literals in Root.tsx (no variable references — Studio save breaks otherwise)

---

## Current Working Tree

All changes committed and pushed. Working tree is clean.

```
HEAD: f982ccd — feat(remotion): image sequences + text clouds for all V2 project scenes, rendered video on portfolio page
```

No uncommitted changes.

---

## Files Worth Reading First Next Session

Read in this order:

1. This file (`docs/plans/2026-04-14-session-handoff.md`)
2. `.continue-here.md` if present
3. `remotion/src/ShowreelRemixV2Video.tsx` — add new TransitionSeries.Sequence blocks here
4. `remotion/src/Root.tsx` — find the `ShowreelRemixV2` defaultProps block; add new projects + projectScenes + update TOTAL_FRAMES
5. `remotion/src/remix/resumeText.ts` — add armament phrase set

---

## Skills To Use Next Session

- `remotion-best-practices`
- `remotion-video-toolkit`

---

## Known Behavior Notes

1. **Studio save issue**: if Studio shows "Can't save default props" for `ShowreelRemixV2`, it means `Root.tsx` has a non-literal value in `defaultProps`. All blocks must be inlined — no variable references.

2. **Hot reload stale**: if image sequences don't appear after edits, stop the Studio process on port 3333, restart `npm run studio`, hard refresh browser.

3. **imageSequence already in schema**: `SceneOverlaySchema` in `remixSchema.ts` already has `imageSequence: z.array(IdentityImageSchema).optional()`. No schema changes needed.

4. **Frame count for project scenes**: each project scene is `12 * FPS` = 360 frames at 30fps. Image sequence `endFrame` values should not exceed 360. Use 12-frame overlaps for smooth crossfades.

5. **New scenes extend duration**: adding 4th, 5th, or 6th project slots requires updating `TOTAL_FRAMES` in `Root.tsx` and adding new `<TransitionSeries.Sequence>` blocks in `ShowreelRemixV2Video.tsx`.

6. **Rendering images may not exist**: verify `rendering-04.webp`, `rendering-08.webp`, `rendering-10.webp`, and `renderings-hero.webp` exist before wiring the Renderings scene. If missing, swap with available rendering-XX.webp files.

7. **Re-render video**: after adding new scenes, re-render the ShowreelRemixV2 to update the MP4 on the portfolio page. Command: `cd remotion && npx remotion render src/Root.tsx ShowreelRemixV2 out/showreel-remix-v2.mp4 --codec h264`, then copy to `public/assets/video/engineering-review-loop.mp4`.

8. **Browser agent not working in WSL**: do not attempt browser-based verification via subagent. Mark will verify visually.

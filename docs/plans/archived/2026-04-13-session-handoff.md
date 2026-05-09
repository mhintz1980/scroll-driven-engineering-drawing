# Session Handoff

Date: 2026-04-13 (late) / 2026-04-14
Repo: `mark-hintz-portfolio_bg-cad`
Scope: full-bleed image + text cloud treatment, new V2 composition, next session image wiring

---

## Current Repo State

Branch: `main`
HEAD commit: `67f0b74` — feat(remotion): full-bleed image treatment + V2 composition with text cloud

Verified this session:

- `cd remotion && npx tsc --noEmit` — CLEAN (run twice, after each major change)
- All changes committed and pushed to `origin/main`

---

## What Changed This Session

### 1. ShowreelRemixV2Video.tsx — new file

`remotion/src/ShowreelRemixV2Video.tsx`

- Identical scene structure to `ShowreelRemixVideo`, different export name
- This is the safe iteration sandbox — original `ShowreelRemix` and `ShowreelRemix1080` compositions are NOT touched
- Registered in `Root.tsx` as composition `ShowreelRemixV2`

### 2. Full-bleed image treatment — identity scene

`remotion/src/remix/scenes/RemixIdentityCardScene.tsx`

Before: image lived in a right-column grid cell with a visible panel border.

After:
- `IdentityImageViewport` renders as `position: absolute, inset: 0` — full viewport coverage
- Left-to-right gradient inside the viewport: `bg → bg (solid) 0–20%`, dissolves through 20–58%, transparent at 58%+
- This means images bleed from the RIGHT edge, fade to bg color toward the LEFT text panel
- `ResumeTextCloud` rides on top of the image layer (unchanged behavior)
- Grid removed — text content is a single `maxWidth: 680` flex column, absolute positioned
- Badge repositioned from top-left to bottom-right of image layer

### 3. Full-bleed image treatment — project scenes

`remotion/src/remix/scenes/RemixProjectScene.tsx`

Before: image in left grid cell with `borderRight`, text in right grid cell.

After:
- Image renders as `position: absolute, inset: 0` — full viewport
- `clipPath` reveal animation preserved — scenes still wipe in from their direction
- Right-to-bg gradient: transparent 0–40%, dissolves through 40–68%, solid `theme.bg` 68%+
- This means images bleed from the LEFT edge, fade to bg color toward the RIGHT text panel
- `ProjectSceneTextCloud` rides between image and gradient layers (unchanged behavior)
- Grid removed — text panel is `position: absolute, right: 0, width: 45%`
- Callout badges stay top-left on the image layer

### 4. resumeText.ts — gearbox phrase set

`remotion/src/remix/resumeText.ts`

Added `gearboxPhrases` (12 terms) and `defaultGearboxTextBlocks` export:

```
"AGMA CLASS 9", "POST-HT CLEANUP", "RUNOUT CONTROL", "HEAT TREAT",
"INSPECTION PLAN", "GEAR GEOMETRY", "±0.0002 TOL", "FIXTURE DESIGN",
"MATERIAL SELECTION", "PROCESS CAPABILITY", "FINAL TEST LOAD", "BUILDABLE PRECISION"
```

### 5. Root.tsx — V2 composition + torque wrench image sequence

`remotion/src/Root.tsx`

- Registered `ShowreelRemixV2` composition using `ShowreelRemixV2Video`
- V2 identity scene has same image sequence as original (`rendering-02`, `rendering-07`, `pump-package-01`, `rendering-09`, `pumptracker_light_mode_composite`)
- V2 `projectScenes[1]` (torque wrench) has `resumeTextBlocks` wired with gearbox phrases
- `projectScenes[0]` (pump) and `projectScenes[2]` (pumptracker) have NO image sequences yet — next session task

---

## First Task For Next Session

Wire `imageSequence` arrays into V2 project scenes and add new scenes.

> **The key pattern to replicate:** look at `identityScene.imageSequence` in `Root.tsx` (around line 450–500 of the V2 defaultProps block). Each image object has this shape:
>
> ```ts
> { src: "assets/images/FILENAME", startFrame: N, endFrame: N, scaleFrom: 1, scaleTo: 1.08, opacity: 0.94 }
> ```
>
> For a 12-second scene at 30fps = 360 total frames. Overlap images by ~12 frames so crossfades are smooth.

### Step 1 — Pump Package scene (projectScenes[0])

Find `// Project 0: Pump Package — no text cloud yet` in the `ShowreelRemixV2` defaultProps in `Root.tsx`.

Add `imageSequence` to that scene object:

```ts
imageSequence: [
  { src: "assets/images/pump-package-04.webp",  startFrame: 0,   endFrame: 90,  scaleFrom: 1.02, scaleTo: 1.10, opacity: 0.94 },
  { src: "assets/images/rendering-05.webp",     startFrame: 78,  endFrame: 168, scaleFrom: 1.00, scaleTo: 1.08, opacity: 0.94 },
  { src: "assets/images/pump-package-03.webp",  startFrame: 156, endFrame: 252, scaleFrom: 1.02, scaleTo: 1.11, opacity: 0.94 },
  { src: "assets/images/side-door.webp",        startFrame: 240, endFrame: 360, scaleFrom: 1.01, scaleTo: 1.09, opacity: 0.94 },
],
```

Also add pump-specific phrase blocks (see phrase guidance below).

### Step 2 — Torque Wrench scene (projectScenes[1])

Find `// Project 1: Torque Wrench / Precision Gearbox — TEXT CLOUD ACTIVE` in Root.tsx.

Add `imageSequence` alongside the existing `resumeTextBlocks`:

```ts
imageSequence: [
  { src: "assets/images/side-door.webp",         startFrame: 0,   endFrame: 80,  scaleFrom: 1.01, scaleTo: 1.09, opacity: 0.94 },
  { src: "assets/images/torque-wrench-06.webp",  startFrame: 68,  endFrame: 150, scaleFrom: 1.02, scaleTo: 1.10, opacity: 0.94 },
  { src: "assets/images/torque-wrench-05.webp",  startFrame: 138, endFrame: 220, scaleFrom: 1.00, scaleTo: 1.08, opacity: 0.94 },
  { src: "assets/images/torque-wrench-03.webp",  startFrame: 208, endFrame: 290, scaleFrom: 1.02, scaleTo: 1.11, opacity: 0.94 },
  { src: "assets/images/torque-wrench-02.webp",  startFrame: 278, endFrame: 360, scaleFrom: 1.01, scaleTo: 1.09, opacity: 0.94 },
],
```

### Step 3 — PumpTracker scene (projectScenes[2])

Find `// Project 2: PumpTracker — no text cloud yet`.

Add `imageSequence`:

```ts
imageSequence: [
  { src: "assets/images/pumptracker-04.webp",                                startFrame: 0,   endFrame: 90,  scaleFrom: 1.02, scaleTo: 1.10, opacity: 0.94 },
  { src: "assets/images/pumptracker-light-final.png",                        startFrame: 78,  endFrame: 192, scaleFrom: 1.00, scaleTo: 1.08, opacity: 0.94 },
  { src: "assets/images/pumptracker-03.webp",                                startFrame: 180, endFrame: 360, scaleFrom: 1.01, scaleTo: 1.09, opacity: 0.94 },
],
```

---

## How the Image Sequence Renders (mechanism explained)

The image reel happens in the project scene because `RemixProjectScene.tsx` now renders the image as a full-bleed absolute layer with a right-to-bg fade. However, `RemixProjectScene` currently renders a **single static `image` prop** — it does not yet consume an `imageSequence` array like the identity scene does.

> **This means Step 1–3 above require a small code addition first:**

### Add imageSequence support to RemixProjectScene

In `RemixProjectScene.tsx`, find the `<Img>` block (around line 187–195) and replace the single static image with this crossfade pattern (same as `IdentityImageViewport`):

```tsx
{/* Static hero image — shown when no imageSequence provided */}
{!sceneOverlay.imageSequence || sceneOverlay.imageSequence.length === 0 ? (
  <Img
    src={staticFile(image)}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      transform: `scale(${interpolate(frame, [0, fps * 12], [1.08, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })})`,
      filter:
        emphasis === "secondary"
          ? "saturate(0.92) contrast(1.08) brightness(0.76)"
          : "saturate(1.04) contrast(1.12) brightness(0.86)",
    }}
  />
) : (
  // Image sequence — crossfading reel
  sceneOverlay.imageSequence.map((img, index) => {
    const fadeInEnd = Math.min(img.startFrame + 12, img.endFrame);
    const fadeOutStart = Math.max(img.endFrame - 12, img.startFrame);
    const opacity = interpolate(
      frame,
      [img.startFrame, fadeInEnd, fadeOutStart, img.endFrame],
      [0, img.opacity, img.opacity, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    const scale = interpolate(frame, [img.startFrame, img.endFrame], [img.scaleFrom, img.scaleTo], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return (
      <div
        key={`${img.src}-${index}`}
        style={{
          position: "absolute",
          inset: 0,
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile(img.src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter:
              emphasis === "secondary"
                ? "saturate(0.92) contrast(1.08) brightness(0.76)"
                : "saturate(1.04) contrast(1.12) brightness(0.86)",
          }}
        />
      </div>
    );
  })
)}
```

Note: `imageSequence` is already in `SceneOverlaySchema` in `remixSchema.ts` — no schema changes needed.

---

## New Scenes To Add (after image sequences are dialed in)

These are additional project slots that do not exist yet. They require:
1. Adding a new entry to the `projects` array in V2 defaultProps (4th, 5th, 6th entry)
2. Expanding `projectScenes` to match
3. Updating `TOTAL_FRAMES` or scene count if duration changes
4. Possibly updating `ShowreelRemixV2Video.tsx` to render 4–6 project scenes instead of 3

> **Wait until image sequences are verified in Studio before adding new scenes.** Tackle one at a time.

### Armament scene

Project data suggestion:
```ts
{
  key: "armament",
  title: "ARMAMENT",
  subtitle: "Precision defense mechanism components",
  category: "Defense mechanisms / precision machining / GD&T",
  reviewLabel: "PRIMARY SIGNAL",
  emphasis: "primary",
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

Image sequence for armament:
```ts
imageSequence: [
  { src: "assets/images/rendering-06.webp", startFrame: 0,   endFrame: 120, scaleFrom: 1.02, scaleTo: 1.10, opacity: 0.94 },
  { src: "assets/images/rendering-07.webp", startFrame: 108, endFrame: 240, scaleFrom: 1.00, scaleTo: 1.08, opacity: 0.94 },
  { src: "assets/images/rendering-09.webp", startFrame: 228, endFrame: 360, scaleFrom: 1.01, scaleTo: 1.09, opacity: 0.94 },
],
```

Text cloud phrases for armament (add to `resumeText.ts` as `armamentPhrases`):
```ts
"MIL-SPEC TOLERANCE"
"MECHANISM DESIGN"
"REPEATABLE ASSEMBLY"
"HEAT TREAT STRATEGY"
"INSPECTION FIRST"
"CRITICAL CLEARANCES"
"±0.0001 BORE FIT"
"HARDENED COMPONENTS"
"DYNAMIC LOADING"
"FUNCTION TEST"
"MATERIAL CERT"
"RELEASE READY"
```

### Rendering / Visualization scene

Project data suggestion:
```ts
{
  key: "renderings",
  title: "RENDERINGS",
  subtitle: "Technical visualization supporting engineering decisions",
  category: "SolidWorks Visualize / KeyShot / design communication",
  reviewLabel: "SECONDARY PROOF",
  emphasis: "secondary",
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

Image sequence (surprise picks — the best rendering variety from the asset library):
```ts
imageSequence: [
  { src: "assets/images/rendering-01.webp", startFrame: 0,   endFrame: 80,  scaleFrom: 1.02, scaleTo: 1.10, opacity: 0.94 },
  { src: "assets/images/rendering-04.webp", startFrame: 68,  endFrame: 150, scaleFrom: 1.01, scaleTo: 1.09, opacity: 0.94 },
  { src: "assets/images/rendering-08.webp", startFrame: 138, endFrame: 230, scaleFrom: 1.00, scaleTo: 1.08, opacity: 0.94 },
  { src: "assets/images/rendering-10.webp", startFrame: 218, endFrame: 310, scaleFrom: 1.02, scaleTo: 1.11, opacity: 0.94 },
  { src: "assets/images/renderings-hero.webp", startFrame: 298, endFrame: 360, scaleFrom: 1.01, scaleTo: 1.09, opacity: 0.94 },
],
```

### Metrology / GD&T scene (if added)

```ts
{
  key: "metrology",
  title: "METROLOGY",
  subtitle: "Applied GD&T and inspection-first dimensional strategy",
  category: "Inspection planning / GD&T / CMM / tolerance stack",
  reviewLabel: "PRIMARY SIGNAL",
  emphasis: "primary",
  outcome: "FIRST PASS",
  outcomeLabel: "INSPECTION YIELD",
  image: "assets/images/torque-wrench-04.webp",
  tags: ["CMM", "GD&T", "Runout", "Tolerance Stack"],
  problem: "GD&T only controls quality if inspection intent is designed in, not applied as a cosmetic layer on a finished drawing.",
  constraint: "Tolerance stacks, datum schemes, and fixturing must be resolved during design, not discovered on the inspection table.",
  decision: "Applied GD&T from a metrology standpoint — each callout tied to a functional requirement and an inspectable method.",
  validation: "Dimensional strategies survived first-article inspection without rework or tolerance relaxation.",
  callouts: ["DATUM STRATEGY", "TOLERANCE STACK", "FIRST-ARTICLE FIT"],
}
```

---

## Phrase Sets Still Needed (add to resumeText.ts)

### Pump Package phrases

```ts
export const pumpPhrases = [
  "SHEET METAL",
  "AIRFLOW LOGIC",
  "SERVICE ACCESS",
  "SOUND CONTROL",
  "BEND RADIUS",
  "STRUCTURAL FRAME",
  "DFM / DFA",
  "ENCLOSURE FIT",
  "BOM COMPLETE",
  "FLOOR READY",
  "ZERO REWORK",
  "BUILDABLE",
] as const;
```

### PumpTracker phrases

```ts
export const pumptrackerPhrases = [
  "FLOW VISIBILITY",
  "CAPACITY SIGNAL",
  "SHOP INPUT",
  "PLANNING LAYER",
  "ADMIN RECOVERED",
  "HUMAN JUDGMENT",
  "LIVE SCHEDULES",
  "REACT / TS",
  "LIGHTWEIGHT SYSTEM",
  "FLOOR SUPPORT",
  "30+ HRS / WEEK",
  "SYSTEMS PROOF",
] as const;
```

---

## Important Context To Preserve

Positioning hierarchy (never breaks):
- Primary: manufacturable mechanical design credibility
- Supporting: tolerance, inspection, assembly, fabrication lifecycle judgment
- Secondary: software and automation as supporting leverage, not identity

**"Armament"** is the correct engineering term. Not "firearms." DoD / MIL-SPEC / prime contractor language.

The fade stops are tunable per scene. Current values:

| Scene | Gradient (key stops) |
|---|---|
| Identity (images on right, fade LEFT) | `bg 0%, bg 20%, 88% at 32%, 50% at 44%, transparent 58%` |
| Project (images on left, fade RIGHT) | `transparent 0%, transparent 40%, 52% at 55%, bg 68%, bg 100%` |

Mark may want to adjust these after reviewing in Studio. They are in:
- `IdentityImageViewport` in `RemixIdentityCardScene.tsx`
- The right-fade gradient `<div>` in `RemixProjectScene.tsx`

---

## Current Working Tree

All changes committed and pushed. Working tree is clean.

```
HEAD: 67f0b74 — feat(remotion): full-bleed image treatment + V2 composition with text cloud
```

No uncommitted changes.

---

## Files Worth Reading First Next Session

Read in this order:

1. `AGENTS.md`
2. `docs/context/session-handoff-standard.md`
3. This file
4. `.continue-here.md` if present

Then inspect only the active files:

- `remotion/src/Root.tsx` — find the `ShowreelRemixV2` defaultProps block; this is where all image sequences go
- `remotion/src/remix/scenes/RemixProjectScene.tsx` — add imageSequence rendering support (see "How the Image Sequence Renders" section above)
- `remotion/src/remix/resumeText.ts` — add pump and pumptracker phrase sets

---

## Skills To Use Next Session

- `remotion-best-practices`
- `verification-before-completion`
- `systematic-debugging` (if Studio doesn't hot-reload correctly — restart on port 3333)

---

## Known Behavior Notes

1. **Studio save issue**: if Studio shows "Can't save default props" for `ShowreelRemixV2`, it means `Root.tsx` has a non-literal value in `defaultProps`. All blocks must be inlined — no variable references.

2. **Hot reload stale**: if image sequences don't appear after edits, stop the Studio process on port 3333, restart `npm run studio`, hard refresh browser.

3. **imageSequence already in schema**: `SceneOverlaySchema` in `remixSchema.ts` already has `imageSequence: z.array(IdentityImageSchema).optional()`. No schema changes needed.

4. **Frame count for project scenes**: each project scene is `12 * FPS` = 360 frames at 30fps. Image sequence `endFrame` values should not exceed 360. Use 12-frame overlaps for smooth crossfades.

5. **New scenes extend duration**: adding 4th, 5th, or 6th project slots requires updating `TOTAL_FRAMES` in `Root.tsx` (currently `(8+10+12+12+12+8)*FPS - 5*20`) and `ShowreelRemixV2Video.tsx` (add new `<TransitionSeries.Sequence>` blocks). Do this AFTER image sequences are verified.

# Showreel Remix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a same-Studio remix variant of the Remotion showreel that preserves the current story structure while introducing a monochrome industrial palette, reversed or perpendicular motion, and editable technical overlays.

**Architecture:** Keep the existing showreel intact and register new remix compositions alongside it in `Root.tsx`. Implement the remix with separate video and scene files plus a remix schema so the new look and motion controls stay Studio-editable without threading conditionals through the original scenes.

**Tech Stack:** Remotion, React, TypeScript, Zod, `@remotion/paths`, `@remotion/noise`, optional `@remotion/lottie`

---

### Task 1: Add remix-specific editable data model

**Files:**
- Create: `remotion/src/remixSchema.ts`

- [ ] Define remix props for duplicated showreel text content plus editable theme, overlay, and motion direction controls.
- [ ] Export strongly typed defaults that the remix video and scenes can share without touching the base schema.

### Task 2: Build remix-only scene system

**Files:**
- Create: `remotion/src/remix/remixTheme.ts`
- Create: `remotion/src/remix/RemixOverlays.tsx`
- Create: `remotion/src/remix/scenes/RemixBlueprintGridScene.tsx`
- Create: `remotion/src/remix/scenes/RemixIdentityCardScene.tsx`
- Create: `remotion/src/remix/scenes/RemixProjectScene.tsx`
- Create: `remotion/src/remix/scenes/RemixSkillsCTAScene.tsx`

- [ ] Duplicate the original showreel scene structure into remix-owned files.
- [ ] Apply an industrial monochrome theme that can be changed from Studio.
- [ ] Add `@remotion/paths` traces and technical line-draw overlays with restrained `@remotion/noise` texture.
- [ ] Reverse or rotate key motion directions so the remix feels distinct while preserving the narrative order.

### Task 3: Compose the remix video

**Files:**
- Create: `remotion/src/ShowreelRemixVideo.tsx`

- [ ] Wire the remix scenes into a composition sequence matching the current reel timing.
- [ ] Keep project-level motion direction editable per scene so Studio can tune the remix without code edits.

### Task 4: Register same-Studio remix compositions

**Files:**
- Modify: `remotion/src/Root.tsx`

- [ ] Add `ShowreelRemix` and `ShowreelRemix1080` to the same Studio registry as the current reel.
- [ ] Inline default props for both remix compositions to preserve Remotion Studio save-back behavior.

### Task 5: Verify remix buildability

**Files:**
- Modify: none

- [ ] Run `npm run tsc` in `remotion`.
- [ ] Run `npx remotion compositions src/Root.tsx` in `remotion`.
- [ ] Render a remix still with `npx remotion still src/Root.tsx ShowreelRemix /tmp/showreel-remix-verify.png --frame=1450`.

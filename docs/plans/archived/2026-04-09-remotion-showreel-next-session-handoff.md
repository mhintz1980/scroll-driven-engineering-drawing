# Remotion Showreel Next-Session Handoff

Date: 2026-04-09
Repo: `mark-hintz-portfolio_bg-cad`
Scope: current Remotion state, Studio editability, animation package additions, and recommended next moves

## What Changed In This Session

The Remotion showreel moved from a mostly hard-coded composition into a more editable Studio-driven setup.

Key upgrades completed:
- preserved the technical fixes from the previous session
- implemented the `Engineering Review Deck` visual system across the main showreel scenes
- repositioned the project order so the mechanical work leads and software stays secondary
- added Studio-editable props for the showreel headline, closing statements, contact line, and all 3 project records
- installed new Remotion packages for future animation work:
  - `@remotion/paths`
  - `@remotion/noise`
- added `zod` and `@remotion/zod-types` and used `zTextarea()` to make long narrative fields easier to edit in Studio

## Current Positioning State

The reel is intentionally built around:

`Mechanical design with manufacturing reality built in.`

The ordering and copy now support:
- primary signal: manufacturable mechanical execution
- supporting proof: tolerance, inspection, and lifecycle judgment
- secondary proof: software and automation as operational leverage, not co-equal identity

This should continue to govern any future edits.

## Current Studio State

Studio is working again after a full restart. Refresh alone was not enough when it got into a bad HMR state.

If Studio breaks in a similar way again:
1. stop the Studio process
2. restart `npm run studio`
3. hard refresh the browser

### Editable in Studio now

For `Showreel` and `Showreel1080`:
- intro headline top
- intro headline accent
- intro headline bottom
- intro body
- closing headline top
- closing headline bottom
- closing body
- closing summary primary
- closing summary secondary
- contact email
- full `projects` array with nested editable records:
  - key
  - title
  - subtitle
  - category
  - reviewLabel
  - emphasis
  - outcome
  - outcomeLabel
  - image
  - tags
  - problem
  - constraint
  - decision
  - validation
  - callouts

For `CaseStudies`:
- sequence label prefix
- image footer note

### Important Studio implementation detail

`defaultProps` are intentionally inlined in `remotion/src/Root.tsx`.

Reason:
- Remotion Studio's "save default props" behavior had trouble extracting imported constants.
- Inlining made save-back more reliable.

## Current Package State

Installed and available:
- `remotion`
- `@remotion/cli`
- `@remotion/transitions`
- `@remotion/google-fonts`
- `@remotion/lottie`
- `@remotion/captions`
- `@remotion/media-utils`
- `@remotion/motion-blur`
- `@remotion/shapes`
- `@remotion/noise`
- `@remotion/paths`
- `@remotion/zod-types`
- `zod`

Recommended use of the new packages:
- `@remotion/noise`: subtle blueprint texture, analog instability, screen-life overlays
- `@remotion/paths`: animated technical leader lines, traced geometry, engineered callouts

These are installed but not yet deeply integrated into the scene system.

## Verified Working At End Of Session

Fresh checks run on 2026-04-09:
- `cd remotion && npm run tsc`
- `cd remotion && npx remotion compositions src/Root.tsx`
- `cd remotion && npx remotion still src/Root.tsx Showreel /tmp/showreel-handoff-verify.png --frame=1450`

All passed.

## Recommended Next Moves

### Highest-value next step

Use the newly editable Studio controls to iterate on:
- project copy
- project order
- image paths
- emphasis labels

This should happen before adding more complex motion so the story content is stable first.

### Best animation follow-up

After content settles, apply the new packages to the shared visual language:
- use `@remotion/paths` to add animated leader lines and more convincing technical callouts
- use `@remotion/noise` for subtle environmental texture, not heavy glitch effects

### Expected upcoming content change

The current `CaseStudies` composition is temporary and is expected to be replaced with more relevant studies and new imagery later. Do not over-invest in those current case studies unless asked.

## Files Most Worth Reading First In A Future Session

- `docs/plans/2026-04-08-remotion-showreel-strategy-and-handoff.md`
- `docs/plans/2026-04-08-remotion-showreel-visual-grammar-and-scene-plan.md`
- `docs/context/mark-agent-onboarding.md`
- `remotion/src/Root.tsx`
- `remotion/src/schemas.ts`
- `remotion/src/Video.tsx`

## Recommendation On Persistent User Context

Yes, a standing onboarding document for Mark is worth keeping.

Reason:
- the project direction depends heavily on who Mark actually is
- agents can otherwise drift back toward generic "mechanical designer + software" framing
- onboarding is faster if the human context, positioning, and working preferences live in one stable place

That document has been added at:

`docs/context/mark-agent-onboarding.md`

# Showreel Remix And Portfolio Media Handoff

Date: 2026-04-10
Repo: `mark-hintz-portfolio_bg-cad`
Scope: Remotion remix status, current portfolio-media direction, and parallel-task guidance for other agents

## Current Status

The Remotion remix work is in a good place conceptually:
- `ShowreelRemix` and `ShowreelRemix1080` exist alongside the original showreel in the same Remotion Studio
- the remix keeps the manufacturing-first narrative but uses a harder industrial shell
- project imagery in the remix should stay in color
- the remix shell should remain mostly monochrome with restrained blueprint-blue accents on selected words, markers, and path traces

The portfolio site itself is a separate Vite app under `src/`, not the `remotion/` directory.

## Important Positioning Constraint

Do not drift toward generic "mechanical + software" branding.

Keep the hierarchy:
- primary: manufacturable mechanical design credibility
- supporting: tolerance, inspection, assembly, lifecycle judgment
- secondary: software and automation as leverage, not identity

## Current Portfolio Read

Relevant files:
- `src/App.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Projects.tsx`
- `src/data/portfolioData.ts`
- `src/components/CadBackground.tsx`

Current structure:
- `Hero`
- `About`
- `Projects`
- `Services`
- `Testimonials`
- `Contact`

The `Projects` data already has gallery arrays for:
- PumpTracker
- Pump Package
- Industrial Torque Wrench
- Renderings & Visualizations

But `src/components/sections/Projects.tsx` currently only renders the single hero image for each project. The gallery arrays are not yet being used.

## Background Assessment

The existing CAD background is one of the strongest visual systems on the site.

Why it works:
- it uses real work-derived imagery rather than generic engineering decoration
- the scroll-driven scaling/fading feels premium and interactive
- it supports the content rather than overpowering it

Recommendation:
- keep the parallax CAD background
- do **not** replace it with a full always-playing background video right now
- use motion in contained areas instead: a short loop near the top of the page and richer project-detail media deeper in the site

## Recommended Media Strategy

### 1. Top-of-page video placement

Best placement for one short loop:
- a dedicated showreel/review-reel section between `Hero` and `Projects`

Reason:
- it gives immediate motion proof without turning the hero into visual noise
- it preserves the existing background system

The loop should be short and silent, not the full reel.

### 2. Project media strategy

The highest-value next portfolio improvement is not a brand-new media section.

It is:
- upgrading `Projects.tsx` to actually use the existing per-project `gallery` arrays
- adding a project-detail experience or expandable media strip
- placing extra drawings, models, exploded views, and screen-record captures inside the relevant project rather than in a generic dump

### 3. New Onshape opportunity

Mark has now installed Onshape locally and can generate/export media from CAD without needing office access.

Promising media types:
- short screen-record loops of exploded assemblies
- isolate/hide/reveal passes on critical assemblies
- slow CAD orbits of torque tool/gearing work
- drawing-sheet pans/zooms on firearm or torque-tool details
- side-by-side pairings: render on one side, CAD/exploded view on the other

## Strongest Mechanical Media Candidates

Priority order:
1. torque tool / planetary gearbox assemblies
2. pump package assemblies and exploded views
3. firearm-related work if it can be framed cleanly and professionally
4. supporting drawings/models that explain decision-making, not just aesthetics

## Good Parallel Task For Another Agent

A second agent can help most by working on concept development and media planning without touching the same hot Remotion files.

Good task shape:
- analyze how firearm/torque/pump CAD media could become one short animation concept
- propose 2-3 concept directions
- stay out of shared infrastructure files unless explicitly needed

## Multi-Agent Safety

There are active uncommitted changes in the repo that may belong to another agent or another task.

Current git state at time of writing included:
- modified: `remotion/src/Root.tsx`
- modified: `remotion/src/schemas.ts`
- untracked: `public/assets/lotties/`
- untracked: `remotion/src/ProjectDetailVideo.tsx`

That means a parallel agent should:
- read before editing
- avoid reverting anything
- avoid assuming all current changes are theirs
- prefer additive concept or planning work unless assigned a clearly isolated file set

## Suggested Next Moves

Recommended order:
1. decide on the short loop placement between `Hero` and `Projects`
2. design the project-detail/gallery pattern so the existing galleries are finally used
3. collect/export the best Onshape media
4. build one flagship mechanical-media concept around the torque tool or gearbox work


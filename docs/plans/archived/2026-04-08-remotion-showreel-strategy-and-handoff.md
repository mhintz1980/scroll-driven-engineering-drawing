# Remotion Showreel Strategy And Handoff

Date: 2026-04-08
Repo: `mark-hintz-portfolio_bg-cad`
Scope: Remotion showreel direction, portfolio positioning, technical state, and next-session handoff

## Why This Document Exists

This document preserves the project direction that emerged after a deep discussion about Mark's real engineering and manufacturing background. The goal is to keep future sessions anchored to the strongest positioning and avoid drifting back into generic "mechanical design portfolio" language or generic motion design decisions.

This is both:
- a strategic positioning note for the portfolio and videos
- a handoff for the next implementation session

## Core Positioning Decision

Primary positioning for freelance work:

`Design + Manufacturing Bridge`

Supporting differentiators:
- `Precision / Inspection / Tolerance Authority`
- `Full Lifecycle Systems Thinker`

Reasoning:
- The broadest and strongest freelance-market signal is not abstract systems thinking.
- Clients usually hire for manufacturable execution first: CAD, DFM, assembly awareness, tolerance judgment, drawings, and production reality.
- Mark's deeper systems thinking is real and valuable, but should appear as a credibility multiplier rather than the first headline.

Recommended front-facing message:

`Mechanical design with manufacturing reality built in.`

Secondary language that can support this:
- `CAD informed by assembly, inspection, tooling, and cost`
- `Designs that survive machining, heat treat, tolerance stack, and use`
- `From concept to floor-ready documentation`

## Important Human Context To Preserve

Mark is not just a CAD user or conceptual mechanical designer. His value comes from unusual cross-exposure across the product lifecycle, especially where design meets reality.

Key context to preserve:

- Mark has spent meaningful time on the shop floor, not just in CAD.
- He understands machine setup, programming support, and operation well enough to design with process limitations and setup realities in mind.
- He has experience around punch press, laser cutting, and press brake work for sheet metal parts.
- During his time at a precision machine shop, he designed high-end gearboxes and firearm components with direct awareness of how they were assembled and inspected.
- He has participated in assembly work such as pressing pins into gearbox components, fitting bushings, and dealing with real assembly constraints.
- He has operated and supported complex mill-turn work enough to understand offsets, wear, tool changes, and why those realities matter to design.
- He has done 3D toolpath work when needed and understands programming pressure even if he was not the lead multi-axis setup machinist.
- He has strong inspection intuition and knows how to use advanced metrology creatively when ideal tooling is unavailable.
- He understands GD&T because he has seen why it matters in assembly, runout control, vibration risk, and high-RPM failure conditions.
- He thinks in terms of manufacturability, distortion, heat treat behavior, post-HT cleanup allowances, cost pressure, and real-world production tradeoffs.
- He has quoted work, managed assemblies at scale, worked through material sourcing logic, and understands why not every part can be designed from premium material regardless of technical merit.
- He has rare context across design, manufacturing, inspection, assembly, quoting, materials, and lifecycle tradeoffs.

This context should shape the reel and the written portfolio. The portfolio should feel authored by someone who understands why parts fail, why prints are dimensioned the way they are, why assemblies fight you, and why cost/manufacturability decisions matter.

## Current Motion Direction

Chosen direction:

`Industrial / Technical / Blueprint`

But not in a superficial style-only sense.

The visual system should feel like it was designed by someone who understands:
- drawing packages
- datum references
- callouts
- inspection logic
- setup constraints
- assembly order
- revision control
- manufacturing process
- design intent versus production reality

The reel should feel less like:
- a generic motion design reel
- a flashy product promo
- a startup explainer

And more like:
- a technical systems presentation
- an engineered design review
- a blueprint-driven manufacturing narrative

## Creative Thesis For The Showreel

The showreel should communicate:

`Mark designs parts and systems that can actually be made, assembled, inspected, and trusted.`

The animation language should reflect:
- deliberate precision
- controlled motion
- technical annotation
- measured reveals
- shop-floor credibility

We should avoid:
- overuse of flashy wipes and effects
- too many simultaneous motions
- generic "cool engineering" vibes
- visual noise that makes the work feel templated

## Scene Strategy

### 1. BlueprintGridScene

Purpose:
- establish the thesis statement
- communicate technical authority immediately

Upgrade ideas:
- animate grid and construction lines like a real layout reference plane
- use datum tags, centerlines, crosshairs, rev stamps, and coordinate marks
- introduce core verbs such as `DESIGN`, `MANUFACTURE`, `ASSEMBLE`, `INSPECT`, `OPTIMIZE`
- add subtle parallax and restrained motion blur
- treat this as a title-sequence system, not a background effect

### 2. IdentityCardScene

Purpose:
- present Mark as a technical operator/designer with real production context

Upgrade ideas:
- make the name feel like a title block or drawing package identifier
- replace generic profile-card energy with engineering dossier energy
- use spec bands and qualification strips
- visually imply experience in DFM, GD&T, assembly fit, inspection logic, and shop-floor context

### 3. ProjectScene

Purpose:
- show not just projects, but engineering judgment

Upgrade ideas:
- show `problem -> constraints -> decisions -> result`
- animate image callouts like design review annotations
- use labels such as `RUNOUT CONTROL`, `POST-HT FINISH`, `TOOL WEAR OFFSET`, `ASSEMBLY ACCESS`, `MATERIAL / COST TRADEOFF`
- use shapes/overlays to highlight geometry, process-critical regions, or inspection-relevant areas

### 4. CaseStudies

Purpose:
- become mini engineering narratives, not static slides

Narrative structure:
- `Problem`
- `Constraint`
- `Approach`
- `Validation`
- `Outcome`

Visual goals:
- cleaner technical layouts
- cropped imagery plus annotations
- restrained graphics
- narrative authority rather than decorative motion

### 5. Skills / CTA Ending

Purpose:
- end with authority, not just activity

Possible closing ideas:
- `FROM CONCEPT TO FLOOR`
- `DESIGN THAT SURVIVES REALITY`
- `MECHANICAL SYSTEMS WITH MANUFACTURING CONTEXT`

The final scene should feel like a concluding statement, not a leftover ticker.

## Portfolio Integration Strategy

Recommended use of videos on the portfolio page:

### 1. Hero Loop

Use a short silent looped cut from the showreel in the hero section.

Goal:
- immediate premium first impression
- establish technical identity quickly

### 2. Dedicated Showreel Section

Embed the full showreel in a dedicated section with supporting copy that frames Mark's value properly.

Goal:
- make the reel a proof artifact, not just decoration

### 3. Case Study Embeds

Later, export shorter focused clips for specific case studies or flagship projects.

Goal:
- support deeper exploration with motion that is specific to the project

Recommended rollout:
1. Short hero loop
2. Full embedded showreel
3. Smaller case-study clips later

## Installed Remotion Packages

Installed in `remotion/package.json` as of this session:
- `remotion`
- `@remotion/cli`
- `@remotion/transitions`
- `@remotion/google-fonts`
- `@remotion/lottie`
- `lottie-web`
- `@remotion/captions`
- `@remotion/media-utils`
- `@remotion/motion-blur`
- `@remotion/shapes`

Why they were chosen:
- `@remotion/google-fonts`: stronger typography system
- `@remotion/lottie` + `lottie-web`: premium micro-animation accents when used sparingly
- `@remotion/captions`: useful if subtitles or voiceover are added later
- `@remotion/media-utils`: media handling utilities
- `@remotion/motion-blur`: helps motion feel less stiff
- `@remotion/shapes`: useful for technical overlays, callouts, geometry accents, HUD elements

Not installed:
- `@remotion/install-whisper-cpp`

Reason:
- useful only if transcription/local caption generation becomes part of the workflow
- not necessary for visual quality alone

## Technical State At End Of Session

### Problems that were found and fixed

1. Remotion render/composition issues were not caused by nested git repo structure.
2. A fixed global port in Remotion config caused render/composition collisions with Studio.
3. Asset path handling needed to be normalized for both Studio and CLI rendering.
4. `CaseStudies` was not registered as a composition initially.
5. `CaseStudiesVideo.tsx` had a parser failure caused by a stray `~` at the start of the file.
6. React warning caused by spreading project objects containing `key` into JSX was removed.

### Important technical decisions made

- Removed the fixed port from `remotion/remotion.config.ts`
- Kept `npm run studio` on port `3333` for convenience
- Normalized static asset paths to `assets/images/...`
- Added `remotion/public -> ../public` symlink so Studio and CLI use the same assets
- Registered `CaseStudies` in `remotion/src/Root.tsx`

### Verified working at end of session

These checks passed during the session:
- `cd remotion && npm run tsc`
- `cd remotion && npx remotion compositions src/Root.tsx`
- `cd remotion && npx remotion still src/Root.tsx Showreel /tmp/showreel-verify.png --frame=330`
- `cd remotion && npx remotion still src/Root.tsx CaseStudies /tmp/case-studies-verify.png --frame=120`

Compositions available:
- `Showreel`
- `Showreel1080`
- `CaseStudies`

## How To Open The Videos In The Browser

From `remotion/`:

```bash
npm run studio
```

Open:
- `http://localhost:3333/Showreel`
- `http://localhost:3333/Showreel1080`
- `http://localhost:3333/CaseStudies`

## Best Skills To Use Next Session

Strongest fit:
- `superpowers:brainstorming`
- `superpowers:writing-plans`
- `superpowers:verification-before-completion`
- `remotion-best-practices`
- `remotion-video-toolkit`

Likely useful:
- `remotion-video-production`
- `remotion-script-writer`
- `industrial-brutalist-ui`
- `high-end-visual-design`
- `redesign-existing-projects`
- `web-design-reviewer` when integrating videos into the portfolio page

## Recommended Next Session Plan

The next session should not jump straight into random scene edits.

Recommended order:

1. Define the visual grammar for the reel
   - typography system
   - annotation/callout style
   - transition rules
   - pacing rules
   - recurring motion motifs

2. Rewrite the reel scene-by-scene
   - upgrade `BlueprintGridScene`
   - upgrade `IdentityCardScene`
   - redesign `ProjectScene`
   - redesign `SkillsCTAScene`
   - elevate `CaseStudies`

3. Export variants for portfolio usage
   - homepage hero loop
   - full showreel embed
   - shorter case-study cuts

4. Integrate into portfolio page
   - hero background or adjacent hero media block
   - dedicated showreel section
   - optional case study embeds

## Suggested First Deliverables

High-priority outputs for the next implementation session:
- a one-line positioning statement
- homepage hero copy
- scene-by-scene showreel rewrite plan
- updated motion system rules
- first upgraded scene implementation

## Handoff Summary

If starting a fresh session, the opening brief should be:

`Continue the Remotion showreel redesign for mark-hintz-portfolio_bg-cad. The strategic direction is industrial/technical/blueprint with Mark positioned primarily as a design + manufacturing bridge, supported by deep tolerance/inspection knowledge and broader lifecycle systems thinking. Use the handoff document at docs/plans/2026-04-08-remotion-showreel-strategy-and-handoff.md as source of truth. Preserve the technical fixes already made to the remotion subproject and start by defining the visual grammar before editing scenes.`


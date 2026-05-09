# Remotion Showreel Visual Grammar And Scene Plan

Date: 2026-04-08
Repo: `mark-hintz-portfolio_bg-cad`
Depends on: `docs/plans/2026-04-08-remotion-showreel-strategy-and-handoff.md`

## Approved Direction

The showreel will use an `Engineering Review Deck` visual grammar.

That means:
- dark blueprint-field backgrounds
- disciplined mono-led typography
- revision, title-block, and drawing-package language
- datum, callout, and annotation logic
- measured reveal motion instead of promo-style transitions
- layouts that feel like technical communication rather than portfolio cards

The reel should feel like it was authored by someone who understands:
- manufacturability
- assembly order
- inspection setup
- tolerance risk
- quoting and material tradeoffs
- lifecycle thinking

## Positioning Rules

Primary message:

`Mechanical design with manufacturing reality built in.`

Supporting message:

`Mark is a design + manufacturing bridge with rare tolerance, inspection, and lifecycle context.`

Secondary message:

`Software and automation remain visible, but only as supporting systems proof.`

This means software should appear as:
- operational leverage
- systems support
- throughput improvement

It should not appear as:
- a co-equal identity
- the dominant visual story
- a pivot away from mechanical credibility

## Visual Grammar

### Typography

- Use strong industrial mono typography for labels, headers, and callouts.
- Use a clean technical sans for supporting body copy when needed.
- Favor uppercase for system labels and review metadata.
- Reserve larger headline scale for thesis statements and scene conclusions.

### Layout Language

- Prefer panels, title blocks, evidence strips, and review columns over hero cards.
- Treat each scene as a sheet in a design review package.
- Use borders, keylines, registration marks, and grid references with restraint.
- Keep the screen legible and calm; avoid effect stacking.

### Motion Rules

- Motion verbs: `draw`, `register`, `reveal`, `annotate`, `validate`, `conclude`
- Favor clip reveals, line draws, and short offset staggers.
- Avoid aggressive slides, flashy wipes, and decorative kinetic noise.
- Let the content settle cleanly before introducing the next layer.

### Color Rules

- Keep the palette dark, blueprint-adjacent, and technically neutral.
- Use one primary accent blue for emphasis and active annotation.
- Use muted neutrals for structure, secondary metadata, and low-priority information.

## Scene-By-Scene Upgrade Plan

### 1. BlueprintGridScene

Goal:
- establish authority immediately

Upgrade:
- open like a design review sheet coming online
- build the thesis around `mechanical design with manufacturing reality built in`
- show a controlled verbs rail such as `DESIGN`, `MANUFACTURE`, `ASSEMBLE`, `INSPECT`
- add a right-side review block with revision/title-block language

### 2. IdentityCardScene

Goal:
- position Mark as an operator-designer with real production context

Upgrade:
- replace profile-card energy with engineering dossier energy
- keep the photo, but subordinate it to the qualifications and evidence
- show tolerance, experience, location, and cross-functional context
- present software/automation as secondary support, not primary identity

### 3. ProjectScene

Goal:
- show judgment, not just output

Upgrade:
- restructure each project around `problem`, `constraint`, `decision`, `result`
- add image callouts that feel like review annotations
- differentiate the software project as `systems support / secondary proof`
- keep the mechanical projects as the dominant signal

### 4. CaseStudies

Goal:
- turn the case studies into mini engineering narratives

Upgrade:
- use `problem`, `constraint`, `approach`, `validation`, `outcome`
- make the left side read like a narrated review sheet
- make the right-side image feel annotated and contextualized

### 5. Skills / CTA

Goal:
- close with authority and conviction

Upgrade:
- replace the casual CTA language with a clear final thesis
- lead with statements like `FROM CONCEPT TO FLOOR` and `DESIGN THAT SURVIVES REALITY`
- keep the contact moment simple and credible
- retain software/automation in the skills evidence band, but not as the headline

## Implementation Notes

- Preserve the existing Remotion technical fixes, especially:
  - no fixed Remotion config port
  - normalized asset paths under `assets/images/...`
  - `remotion/public -> ../public` symlink
  - `CaseStudies` composition registration
- Keep the current composition structure unless a change is needed for visual clarity.
- Favor shared UI atoms for the review-deck language so scenes stay visually coherent.

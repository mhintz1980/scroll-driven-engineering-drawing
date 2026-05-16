---
name: Spatial Web Engineering Portfolio
description: Native-SVG drawing package route with an event-driven camera and blueprint callouts.
colors:
  blueprint-bg: "oklch(0.12 0.02 245)"
  blueprint-surface: "oklch(0.15 0.02 245 / 0.65)"
  blueprint-border: "oklch(0.85 0.02 245 / 0.85)"
  blueprint-border-dim: "oklch(0.70 0.02 245 / 0.45)"
  blueprint-text: "oklch(0.96 0.01 245)"
  blueprint-text-dim: "oklch(0.80 0.02 245 / 0.8)"
  signal-blue: "oklch(0.70 0.21 255)"
  signal-blue-dim: "oklch(0.70 0.21 255 / 0.2)"
  leader-blue: "oklch(0.70 0.21 255 / 0.65)"
  note-bg: "oklch(0.12 0.02 255 / 0.85)"
  status-green: "oklch(0.72 0.19 155)"
  chip-blue: "#3b82f6"
  chip-ink: "#0f172a"
typography:
  display:
    fontFamily: "Michroma, Archivo, system-ui, sans-serif"
    fontSize: "104px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.05em"
  headline:
    fontFamily: "JetBrains Mono, Cascadia Code, SF Mono, monospace"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.4em"
  body:
    fontFamily: "JetBrains Mono, Cascadia Code, SF Mono, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.1em"
  label:
    fontFamily: "JetBrains Mono, Cascadia Code, SF Mono, monospace"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.28em"
  micro:
    fontFamily: "JetBrains Mono, Cascadia Code, SF Mono, monospace"
    fontSize: "2px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  square: "0px"
  micro: "1.6px"
  full: "9999px"
spacing:
  hairline: "2px"
  tight: "5px"
  standard: "10px"
  gutter: "12px"
components:
  hero-spec-strip:
    backgroundColor: "{colors.note-bg}"
    textColor: "{colors.blueprint-text}"
    rounded: "{rounded.square}"
    padding: "5px 10px"
  detail-circle:
    backgroundColor: "{colors.note-bg}"
    textColor: "{colors.blueprint-text}"
    rounded: "{rounded.full}"
    size: "109px"
  station-title-plate:
    backgroundColor: "{colors.chip-blue}"
    textColor: "{colors.chip-ink}"
    rounded: "{rounded.micro}"
    width: "104px"
    padding: "8px 24px"
  title-block-panel:
    backgroundColor: "{colors.blueprint-surface}"
    textColor: "{colors.blueprint-text}"
    rounded: "{rounded.square}"
    width: "130px"
    padding: "4px 8px"
  scroll-hint:
    backgroundColor: "{colors.blueprint-bg}"
    textColor: "{colors.blueprint-text-dim}"
    rounded: "{rounded.square}"
---

## Overview

**Creative North Star: "Blueprint Diorama"**

This route is a full-screen spatial drawing package, not a normal vertical portfolio page. The viewport is the camera. Wheel, key, and touch input step between authored camera targets while the native `1625×1075` SVG substrate moves, scales, and tilts under a fixed viewer.

The design has to read like a precision drawing pulled off a fabrication desk and turned into a cinematic inspection pass. The substrate stays mechanically legible. Callouts, title block, and hero overlays feel like shop-document markup that has lifted off the paper just enough to prove state and hierarchy.

Reject generic SaaS cards, cream landing-page tropes, glassmorphism, purple-neon developer theatrics, and anything that makes software look like the primary identity. The mechanical work is the first signal.

- Full-screen, pinned camera composition
- Native CAD substrate with restrained blue signal color
- Mono-first interface language with one display-family exception
- Active-only callout motion, no decorative always-on churn
- Manufacturing-first hierarchy, software as supporting evidence

## Colors

The palette is blueprint-dark with one calibrated signal blue and a single status green for availability.

### Primary
- **Signal Blue** (`oklch(0.70 0.21 255)`): Active targets, leader lines, hero metadata labels, and measurement-like emphasis.

### Neutral
- **Blueprint Black** (`oklch(0.12 0.02 245)`): Route background and the visual floor for the whole scene.
- **Raised Drafting Film** (`oklch(0.15 0.02 245 / 0.65)`): Title block panels and lifted annotation surfaces.
- **Spec Border** (`oklch(0.85 0.02 245 / 0.85)`): High-contrast technical strokes and panel outlines.
- **Dim Spec Border** (`oklch(0.70 0.02 245 / 0.45)`): Secondary rules, dividers, and inactive scaffolding.
- **Drawing White** (`oklch(0.96 0.01 245)`): Primary legibility color over the dark substrate.
- **Muted Draft Text** (`oklch(0.80 0.02 245 / 0.8)`): Secondary metadata, prompts, and technical support text.

### Tertiary
- **Status Green** (`oklch(0.72 0.19 155)`): Sparse status proof only, currently reserved for availability/revision highlights.

### Named Rules
**The Blueprint Signal Rule.** Accent blue marks activation, targeting, and measurement. It is not a decorative wash.

## Typography

**Display Font:** `Michroma`, with `Archivo` and system sans fallback  
**Body Font:** `JetBrains Mono`, with `Cascadia Code`, `SF Mono`, and monospace fallback  
**Label/Mono Font:** same mono stack, used across labels, station plates, and title-block microcopy

**Character:** The hero name gets one engineered display voice. Everything else stays in drafting-room mono so the page reads like technical documentation before it reads like marketing.

### Hierarchy
- **Display** (`700`, `104px`, `1`): Hero name only. Uppercase, tight, clean, and bright enough to sit over the drawing without gradient tricks.
- **Headline** (`700`, `18px`, `1.2`): Superheader and route-level callouts.
- **Body** (`400`, `15px`, `1.2`): Hero spec strip values and any readable screen-space explanatory text.
- **Label** (`700`, `10px`, `1.2`, `0.28em`): Scroll hint, compact tags, and active-state UI cues.
- **Micro** (`700`, `2px`, `1.2`, `0.18em`): Title block rows and substrate-space drafting metadata that is meant to scale with the camera.

### Named Rules
**The One Sans Rule.** `Michroma` is for the hero name and other rare identity moments only. Do not let it leak into the technical UI.

## Elevation

Depth is mostly structural, not card-based. The substrate supplies the main 3D read through camera scale and `rotateX`; UI elevation comes from z-lifted detail circles, visible leader lines, and a few restrained glow/shadow treatments. Flat at rest, lifted on activation.

### Shadow Vocabulary
- **Active Circle Lift**: use the existing circle ring and shadow stack to separate detail media from the substrate, not to make it look glossy.
- **Annotation Panel Lift**: keep title plates and title block on subtle dark-film surfaces with thin borders and low blur only where already established.

### Named Rules
**The Flat-At-Rest Rule.** If a surface is not active, it should read as printed or lightly laminated, not floating.

## Components

### Hero Nameplate
The hero is the identity stamp on the drawing, not a landing-page banner.
- **Shape:** square edges, no pill treatments
- **Primary:** `Michroma` name in `blueprint-text` with a faint signal-blue ghost layer behind it
- **Supporting UI:** mono superheader, mono cycling subtitle, and a spec strip on `note-bg`
- **Behavior:** hero text peels away during the first forward whip, then only returns when the camera comes back home

### Detail Circle
This is the core active station surface.
- **Shape:** perfect circle (`109px` authored size before camera transforms)
- **Content:** `engineering-review-loop.mp4` or future media, clipped cleanly, no ornamental framing beyond the established technical rings
- **State:** only the active station lifts to `z: 75 * S * ZONE_SCALE`; inactive circles stay hidden outside calibration mode
- **Leader Line:** visible SVG line, high-contrast blue, no fake hand-drawn curves

### Station Title Plate
The station label sits on the right flank of the detail circle and stays out of the media area.
- **Shape:** micro-radius technical plate
- **Color:** `chip-blue` plate with dark ink text
- **Width:** `104px`, fixed so stations read as one system
- **Behavior:** reveal only with the active station; keep title bars aligned off the circle edge

### Title Block
The title block is a compact technical proof panel, not a profile card.
- **Shape:** square, ruled, drafting-table proportions
- **Background:** `blueprint-surface` over the dark field
- **Typography:** mono microcopy with one sparse green status accent
- **Behavior:** active-prop driven reveal, same as ProjectZone, never observer-driven

### Navigation Hint
The bottom-center prompt is a quiet operational cue.
- **Style:** mono uppercase text with a thin animated bar
- **State:** visible only while `activeStation === -1`
- **Tone:** terse, instructional, non-marketing

## Do's and Don'ts

### Do:
- **Do** keep `/drawing-package` as a standalone pinned route where the viewport is the camera and the substrate moves.
- **Do** keep the native `Lower Receiver_Final.svg` substrate and its `RENDER_SCALE = 2` oversampling path as the baseline visual contract.
- **Do** gate ProjectZone intros from `active`, preserve equal circle sizing, keep the right-flank title plates, and keep the SVG leader lines visible at active stations.
- **Do** use Remotion only for offline MP4/WebM media such as the detail-circle loop, never for runtime navigation or UI composition.
- **Do** preserve the manufacturing-first hierarchy: mechanical work first, software as supporting proof.

### Don't:
- **Don't** reintroduce a regular vertical page, scroll-scrubbed `ScrollTrigger` navigation, or a homepage shell around this route.
- **Don't** use generic Wix/Squarespace developer portfolio patterns with gradient cards, glassmorphism, or "I'm passionate about building things" copy.
- **Don't** use SaaS-cream landing-page styling: beige backgrounds, pill-shaped buttons, rounded-everything, generic icon grids, or three-column feature cards.
- **Don't** drift into overly techy dark-mode neon styling that makes the page read software-first and treats mechanical work as a footnote.
- **Don't** lead with frameworks, languages, or decorative UI wrappers instead of what was built, fabricated, inspected, or rendered.
- **Don't** ship Dribbble-bait motion that looks beautiful but says nothing.

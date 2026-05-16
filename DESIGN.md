---
name: Spatial Web Engineering Portfolio
description: Native-SVG drawing package route with an event-driven camera and paper-desk projection callouts.
colors:
  blueprint-bg: "oklch(0.12 0.02 245)"
  desk-bg: "oklch(0.33 0.012 245)"
  paper: "oklch(0.78 0.012 245)"
  paper-warm: "oklch(0.84 0.018 78)"
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

**Creative North Star: "Paper Desk Projection Diorama"**

This route is a full-screen spatial drawing package, not a normal vertical portfolio page. The viewport is the camera. Wheel, key, and touch input step between authored camera targets while the native `1625×1075` SVG substrate moves, scales, and tilts under a fixed viewer.

The design now reads like a precision drawing sitting on a dim office/drafting desk, with active details projected out of the paper. The substrate stays mechanically legible as ink on paper. Station detail media and labels should feel like a controlled holographic inspection projection rising from the 2D drawing, not like a retro HUD printed on a black screen.

Reject generic SaaS cards, cream landing-page tropes, glassmorphism, purple-neon developer theatrics, and anything that makes software look like the primary identity. The mechanical work is the first signal.

- Full-screen, pinned camera composition
- Physical paper/desk environment with restrained blue projection light
- Mono-first interface language with one display-family exception
- Active-only projection motion, no decorative always-on churn
- Manufacturing-first hierarchy, software as supporting evidence

## Colors

The palette is paper-desk neutral with one calibrated signal blue and a single status green for availability. The page should not return to plain black-and-white HUD styling.

### Primary
- **Signal Blue** (`oklch(0.70 0.21 255)`): Active targets, leader lines, hero metadata labels, and measurement-like emphasis.

### Neutral
- **Desk Graphite** (`oklch(0.33 0.012 245)`): Route background and the dim office/drafting desk floor.
- **Drawing Paper** (`oklch(0.78 0.012 245)`): Main substrate surface.
- **Warm Paper Light** (`oklch(0.84 0.018 78)`): Subtle sheet highlight and material warmth.
- **Blueprint Black** (`oklch(0.12 0.02 245)`): Deepest shadows, plates, and projection contrast.
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

Depth is mostly structural, not card-based. The substrate supplies the paper plane through camera scale, `rotateX`, sheet shadow, and desk lighting. Active station detail UI now lifts in a fixed screen-space projection layer so text and media stay crisp while the beam visually connects back to the paper origin.

### Shadow Vocabulary
- **Projection Object Lift**: use a visible origin ring, vertical leader, translucent beam, object shadow, and circular media surface to make the station feel projected out of the drawing.
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

### Station Projection Overlay
This is the core active station surface.
- **Shape:** physical 2D origin ring on the paper, translucent projection cone, lifted circular media object, and crisp metadata plate
- **Content:** station-specific images for A/B/C/D until final 3D media exists
- **State:** active station only; inactive stations should not render heavy projection UI
- **Leader Line:** visible blue projection line/beam from the paper origin to the lifted object
- **Crispness:** readable media, text, and labels belong in screen-space overlay, not in the zoomed substrate layer

### Station Title Plate
The station label is now part of the screen-space projection overlay.
- **Shape:** square technical metadata plate
- **Color:** dark raised drafting film with signal-blue identifiers
- **Behavior:** reveal only with the active projection; do not render readable labels as tiny substrate-space text

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
- **Do** keep active station readable UI in `StationProjectionOverlay` so text/media are screen-crisp and projected from the paper origin.
- **Do** preserve the physical paper/desk environment and projection-beam metaphor established by the `2d-to-3d.png` reference.
- **Do** use Remotion only for offline MP4/WebM media such as the detail-circle loop, never for runtime navigation or UI composition.
- **Do** preserve the manufacturing-first hierarchy: mechanical work first, software as supporting proof.

### Don't:
- **Don't** reintroduce a regular vertical page, scroll-scrubbed `ScrollTrigger` navigation, or a homepage shell around this route.
- **Don't** revert the route to plain black background with white linework and floating HUD labels.
- **Don't** put readable station text/media back into the zoomed substrate layer; that is the known pixelation failure.
- **Don't** use generic Wix/Squarespace developer portfolio patterns with gradient cards, glassmorphism, or "I'm passionate about building things" copy.
- **Don't** use SaaS-cream landing-page styling: beige backgrounds, pill-shaped buttons, rounded-everything, generic icon grids, or three-column feature cards.
- **Don't** drift into overly techy dark-mode neon styling that makes the page read software-first and treats mechanical work as a footnote.
- **Don't** lead with frameworks, languages, or decorative UI wrappers instead of what was built, fabricated, inspected, or rendered.
- **Don't** ship Dribbble-bait motion that looks beautiful but says nothing.

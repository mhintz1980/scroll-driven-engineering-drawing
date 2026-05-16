# Mark Hintz Portfolio — Drawing Package PRD

## Product Goal

Build a standalone spatial portfolio route that makes Mark's mechanical design and manufacturing credibility immediately legible. The experience should feel like a precision drawing on a drafting desk where selected details project upward from the paper for inspection.

The route is not a normal scrolling landing page. It is a pinned spatial inspection pass over a real engineering substrate, with deliberate station-to-station camera movement and crisp projected detail callouts.

## Target Users

- **Primary now:** Freelance clients, engineering managers, manufacturing operations leads, procurement decision-makers, and industrial OEM stakeholders evaluating Mark for mechanical design, DFM review, fabrication support, internal tooling, or documentation work.
- **Secondary later:** Recruiters and hiring managers looking for a mechanical designer who can also build useful software tools without making software the main identity.

## Product Positioning

Mark is the design-and-manufacturing bridge: CAD, fabrication, inspection, documentation, and software systems applied to real shop-floor problems.

The visitor should leave with three conclusions:

- Mark designs parts and systems that survive fabrication, assembly, inspection, and field use.
- His documentation and GD&T are built for manufacturability, inspection, and tool life, not just nice geometry.
- His software and AI work supports manufacturing operations; it is not a pivot away from mechanical credibility.

## Experience Direction

The current creative direction is **paper desk projection diorama**.

The browser viewport is a fixed camera above a physical-looking engineering sheet on a dim drafting desk. The native lower-receiver SVG reads as dark ink on paper. When a station activates, a 2D origin point on the drawing emits a blue projection beam and a screen-space detail object lifts upward, with crisp media and metadata that stay readable.

The reference direction is `2d-to-3d.png`: a 3D part or detail projected from a 2D engineering drawing, with paper texture, soft office lighting, physical shadows, and restrained blue projection light.

## Non-Goals

- Do not return to a plain black background with white CAD lines and floating HUD cards.
- Do not render readable station text or media inside the zoomed/rotated substrate layer; that was the source of pixelation.
- Do not build this route as a regular vertical homepage section.
- Do not use Remotion for interactive UI, camera navigation, or DOM rendering.
- Do not lead with frameworks, languages, or generic developer-portfolio patterns.

## Current Architecture

- **Framework:** Vite, React, TypeScript.
- **Animation engine:** GSAP timelines for camera movement and active-state transitions.
- **Navigation:** Event-driven wheel/key/touch state machine. Scroll position is not the runtime source of truth.
- **Route:** `/Mark_Hintz-Portfolio-v2/drawing-package` in local GitHub Pages-style dev mode.
- **Standalone contract:** No navbar, no theme toggle, no regular homepage sections.
- **Styling:** Tailwind CSS v4 plus route CSS in `src/styles/drawing-package.css`.
- **3D model:** CSS perspective/preserve-3d only for the drawing-package page. No Three.js dependency in the interactive route.
- **Remotion boundary:** Offline MP4/WebM media only.

## Core Runtime Files

- `src/components/drawing-package/DrawingPackagePage.tsx`: event-driven GSAP camera state machine, substrate, hero, station progress, and `StationProjectionOverlay`.
- `src/components/drawing-package/ProjectZone.tsx`: substrate-space station origin component. In `projectionMode`, it preserves the 2D origin behavior and hides legacy substrate-space detail UI.
- `src/components/drawing-package/TitleBlockStation.tsx`: title-block station reveal.
- `src/styles/drawing-package.css`: paper/desk environment, projection overlay, route scroll suppression, and drawing-package visual system.
- `src/App.tsx`: route mounting.
- `public/assets/images/Lower Receiver_Final.svg`: authoritative native substrate.

## Substrate And Camera

- **Substrate asset:** `Lower Receiver_Final.svg`.
- **Native viewBox:** `1625 × 1075`.
- **Render path:** `RENDER_SCALE = 2`; the image is rendered oversampled and counter-scaled so camera math stays in SVG-native coordinates.
- **Line treatment:** the white-on-transparent SVG is runtime-filtered to read as dark ink on paper: `invert(1) contrast(1.05) saturate(0.12)`, with multiply blending.
- **Camera:** authored stops use substrate-native `cx`, `cy`, `scale`, and `rotateX`, converted through `computeStop(target, vw, vh)`.
- **Station order:** Hero, A, B, C, D, Title Block.

## Current Camera Targets

| Stop | cx | cy | scale | rotateX |
|---|---:|---:|---|---:|
| Wide | `812.5` | `537.5` | `wide` | `0` |
| Hero | `812.5` | `537.5` | `wide` | `0` |
| Station A | `291` | `528` | `6.5` | `10` |
| Station B | `1048` | `134` | `6.5` | `35` |
| Station C | `678` | `692` | `6.5` | `8` |
| Station D | `1288` | `661` | `6.5` | `12` |
| Title Block | `1274` | `953` | `5.4` | `0` |

## Station Projection System

`StationProjectionOverlay` is the current active-station detail model.

It renders outside the transformed substrate so station media and text stay crisp. It includes:

- 2D origin ring on the drawing plane.
- Translucent blue projection beam.
- Lifted circular media object with physical shadow.
- Metadata plate with station ID, label, title, and manufacturing-relevant context.

Current station media:

| Station | Image |
|---|---|
| A | `Billet Receiver Set AR15.webp` |
| B | `torque-wrench-03.webp` |
| C | `pump-package-04.webp` |
| D | `rendering-06.webp` |

## Document Model

To reduce documentation drift:

- `.continue-here.md` is the live per-session checkpoint and exact next-action file.
- `AGENTS.md` stores agent rules, protected architecture decisions, and current coordinate map.
- `DESIGN.md` stores visual-system decisions.
- `memory/PRD.md`, `README.md`, and `PRODUCT.md` should change only when product direction, architecture, or project-level goals change.

## Acceptance Criteria

- `/drawing-package` opens as a standalone full-screen spatial route.
- The page reads as paper on a drafting desk, not as a black HUD.
- Active station media and labels are crisp at station stops.
- A visible projection connects the drawing origin to the lifted detail object.
- Wheel, keyboard, and touch advance one station at a time without trackpad overshoot.
- `npm run build` passes after changes.
- Browser verification uses Playwright or Chrome DevTools, not the unreliable native agent browser.

## Near-Term Backlog

- Verify and tune `StationProjectionOverlay` across Stations B/C/D and mobile.
- Continue Phase 4 prune against the new projection-mode architecture.
- Remove duplicate substrate assets while preserving `Lower Receiver_Final.svg`.
- Remove dead `pathD` compatibility once no runtime code depends on it.
- Remove or conditionally render legacy `ProjectZone` heavy decorations hidden by `projectionMode`.
- Convert hero word-cycle from React interval state to CSS keyframes.
- Replace still projection images with final station-specific 3D spins or rendered media when available.

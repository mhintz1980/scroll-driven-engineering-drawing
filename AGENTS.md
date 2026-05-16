<claude-mem-context>
# Memory Context

# [mark-hintz-portfolio_bg-cad/scroll-driven-engineering-drawing] recent context, 2026-05-11 3:46am EDT

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 7 obs (1,952t read) | 0t work

### May 4, 2026
192 2:30a 🔵 Git worktree portfolio launches main branch version in browser
193 2:34a 🔵 Git worktree portfolio launching wrong branch version in browser
195 2:48a ✅ Scroll-driven engineering drawing design requirements refined
196 2:49a 🔵 Impeccable frontend design skill context loaded for scroll-driven engineering drawing worktree
197 " 🔵 Scroll-driven engineering drawing implementation structure revealed: DrawingHero component and drawingPackageData data model
198 10:22p 🔵 Git worktree portfolio launches wrong branch version
### May 5, 2026
S85 Caveman mode activated. User requested terse, direct communication style. (May 5, 1:52 AM)
### May 11, 2026
201 2:22a 🔵 DXF to SVG conversion optimization research initiated
</claude-mem-context>

## Spatial Portfolio Project Context

**Role:** Senior Creative Technologist and GSAP Architect.

**Architecture:** The drawing package page is a standalone pinned spatial web route, not a normal vertical page. The viewport is the camera. Wheel, key, and touch input step an event-driven GSAP state machine between authored camera stops while the native SVG substrate translates, scales, and tilts underneath. Substrate stations are absolute React components on the `1625×1075` map; `ProjectZone` now acts as the active 2D origin marker in `projectionMode`, while readable station media/text is rendered by a fixed screen-space `StationProjectionOverlay` so it stays crisp and appears projected out of the paper drawing.

**Rules:**
- Keep the viewport pinned; move the substrate, not the user.
- Do not reintroduce `ScrollTrigger` or any scroll-position-driven runtime navigation for `/drawing-package`.
- Keep Remotion out of the interactive UI. Remotion is only for offline MP4/WebM media rendered into station detail circles.
- Keep the manufacturing-first mechanical drawing aesthetic. The current environment is a physical paper-on-desk projection diorama, not a plain black HUD and not generic SaaS/card styling.
- New spatial stations must reveal from explicit active-state orchestration. `IntersectionObserver` is no longer the runtime trigger path.
- Use Playwright or Chrome DevTools for browser verification. The native agent browser is not reliable in this worktree.
- Update `.continue-here.md`, `DESIGN.md`, and this context when station coordinates or rig decisions change.

## Current State & Coordinates

### Map Substrate

- Asset: `Lower Receiver_Final.svg`
- Native viewBox: `1625 × 1075`
- Render path: `RENDER_SCALE = 2`, then counter-scale the image back into the native substrate box so camera math stays in SVG-native coordinates
- Background linework: preserve white-on-transparent `Lower Receiver_Final.svg`; runtime filter is currently `invert(1) contrast(1.05) saturate(0.12)` with multiply blending so the drawing reads as dark ink on paper
- Environment: `.drawing-substrate-paper` provides the physical paper plane, grid/noise texture, and sheet shadow; the route background reads as a dim office/drafting desk
- DOF blur states:
  - Initial/rest: `blur(0px)`
  - Whip transit: temporary blur only during travel timelines
- CSS 3D:
  - Outer container: `perspective: 4000px`, `perspectiveOrigin: 50% 40%`
  - Substrate: `transformStyle: preserve-3d`
  - Route shell: `w-screen h-screen overflow-hidden` with route-scoped scrollbar suppression

### Camera Targets

All camera stops are authored as substrate-native targets and converted through `computeStop(target, vw, vh)`.

| Stop | cx | cy | scale | rotateX |
|---|---:|---:|---|---:|
| Wide | `812.5` | `537.5` | `wide` | `0` |
| Hero | `812.5` | `537.5` | `wide` | `0` |
| Station A | `291` | `528` | `6.5` | `10` |
| Station B | `1048` | `134` | `6.5` | `35` |
| Station C | `678` | `692` | `6.5` | `8` |
| Station D | `1288` | `661` | `6.5` | `12` |
| Title Block | `1274` | `953` | `5.4` | `0` |

### Active Stations

#### ProjectZone map

| Station | title | top | left | anchor | circle | circleScale |
|---|---|---:|---:|---|---|---|
| A | `ARMAMENT COMPONENTS & RECEIVER SYSTEMS` | `278px` | `0px` | `(291,250)` | `top 235px, left 285px` | `{ x: 1.01, y: 1.02 }` |
| B | `INDUSTRIAL TORQUE WRENCH` | `0px` | `748px` | `(300,134)` | `top 150px, left 285px` | `{ x: 1, y: 1.15 }` |
| C | `PUMP PACKAGE DESIGN SYSTEM` | `442px` | `378px` | `(300,250)` | `top 240px, left 285px` | `{ x: 1, y: 1 }` |
| D | `RENDERINGS & VISUALIZATIONS` | `411px` | `988px` | `(300,250)` | `top 245px, left 285px` | `{ x: 0.91, y: 0.93 }` |

#### Title block

- Target: `cx: 1274`, `cy: 953`, `scale: 5.4`, `rotateX: 0`
- Component: `top: 910px`, `left: 1196px`, `width: 130px`

#### Hero

- Target: `cx: 812.5`, `cy: 537.5`, `scale: wide`, `rotateX: 0`
- Nameplate: `left: 812.5px`, `top: 537.5px`, width `920px`
- Hero display font: `Michroma`

#### Verification matrix

- Build: `npm run build` passes
- Browser-verified: `975×550`, `1280×720`, `1440×900`, `1920×1080`
- Calibration mode: `?calibrate=1` forces A/B/C/D circles, labels, and title block visible

### Current Decisions

- Event-driven wheel/key/touch camera is canonical. Wheel input uses an accumulator threshold and post-transition quiet window so one physical gesture advances one station.
- The native SVG substrate and oversampled render path are the current sharpness baseline. Preserve `Lower Receiver_Final.svg` and `RENDER_SCALE = 2` unless a verified browser pass proves a better replacement.
- `ProjectZone` `active` is the canonical trigger. `TitleBlockStation` follows the same pattern.
- ProjectZone detail circles are intentionally equalized in screen size across A/B/C/D, with station-specific `circleScale` compensation to counter perspective distortion.
- New active station detail UI belongs in `StationProjectionOverlay`, not inside the zoomed substrate. This is the current fix for pixelated station text/media.
- Projection contract: show a 2D origin ring on the drawing, a visible vertical leader/beam, and a lifted circular object/metadata plate that feels projected from the paper into 3D space.
- `ProjectZone projectionMode` hides the legacy substrate-space detail circle/media/label while preserving active origin behavior.
- Station-specific projection images are currently `Billet Receiver Set AR15.webp`, `torque-wrench-03.webp`, `pump-package-04.webp`, and `rendering-06.webp`.
- Hidden calibration mode exists at `?calibrate=1`; it forces overlays visible and outlines each station box for solving.
- `useLayoutEffect` remains mandatory for GSAP initial state to avoid refresh flashes.
- This route remains standalone: no navbar, no theme toggle, no regular homepage sections.

### Next Implementation Tasks

1. Verify and tune `StationProjectionOverlay` on Stations B/C/D plus mobile, while preserving calibrated station camera targets.
2. Phase 4 prune, removing dead duplicate substrates and remaining legacy ProjectZone detail-circle decorations that projection mode makes obsolete.
3. Hook the Drawing Package page into the main portfolio navigation only after the standalone route stays visually stable.

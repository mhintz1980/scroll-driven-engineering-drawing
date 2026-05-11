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

**Architecture:** The drawing package page is a pinned spatial web experience, not a normal vertical page. The viewport is the camera. Scroll scrubs a GSAP `ScrollTrigger` timeline that translates, scales, and tilts the massive drawing substrate. UI stations are absolute React components on the 8800×6800 map.

**Rules:**
- Keep the viewport pinned; move the substrate, not the user.
- Keep Remotion out of the interactive UI. Remotion is only for offline MP4/WebM media rendered into station detail circles.
- New spatial stations must own their local animation with `IntersectionObserver`, not the master GSAP scroll timeline.
- Use Playwright or Chrome DevTools for browser verification. The native agent browser is not reliable in this worktree.
- Update `.continue-here.md`, the active station map, and this context when station coordinates or rig decisions change.

## Current State & Coordinates

### Map Substrate

- Asset: `Lower Receiver-Machined Forging (22).svg`
- Rendered size: 8800px wide × 6800px tall
- Background linework: black-on-transparent SVG using `filter: invert(1)` and `mix-blend-screen`
- DOF blur states:
  - Initial: `invert(1) blur(0px)`
  - Lifted: `invert(1) blur(10px)`
- CSS 3D:
  - Outer container: `perspective: 4000px`, `perspectiveOrigin: 50% 40%`
  - Substrate: `transformStyle: preserve-3d`
  - Safe substrate Y at `scale: 1.2`: about 5806px

### Camera Stops

| Stop | x | y | scale | rotateX |
|---|---|---|---|---|
| Station A | `-1400` | `-3730 - max(0, 720 - vh)*0.35` | `1.2` | `0` |
| Whip transit | `-4800` | `-2000` | `1.6` | `0` |
| Station B | `-6320 + 0.495*(vw - 975)` | `-740 + 0.47*(vh - 550)` | `1.2` | `35` |

### Active Stations

**Station A:** `TRIGGER GUARD RADIUS`
- Component: `left: 1450px`, `top: 3200px`
- Camera stop: `x: -1400`, `y: -3730 - max(0, 720 - vh)*0.35`, `scale: 1.2`, `rotateX: 0`
- Triggers DOF blur via `onLift`

**Station B:** `BUFFER TUBE SOCKET`
- Component: `left: 5567px`, `top: 833px`
- Camera stop is viewport-aware from a 975×550 baseline:
  - `x: -6320 + 0.495*(vw - 975)`
  - `y: -740 + 0.47*(vh - 550)`
  - `scale: 1.2`
  - `rotateX: 35`
- Verified on `Lower Receiver-Machined Forging (22).svg` at `975×550`, `1280×720`, `1440×900`, and `390×844`.

### Current Decisions

- Station B cannot use fixed `x/y` coordinates because the 35° perspective projection shifts with viewport dimensions.
- Both new DXF-derived exports live in `public/assets/images/`, and the runtime is now on `Lower Receiver-Machined Forging (22).svg`.
- Station A keeps the old x baseline and adds a short-viewport y correction: `- max(0, 720 - vh)*0.35`.
- Hidden calibration mode exists at `?calibrate=1`; it forces ProjectZone overlays visible and outlines each 600×500 station box for station solving.
- `ProjectZone` resets its local GSAP state on exit so leader lines and circles can replay on re-entry.
- `useLayoutEffect` remains mandatory for GSAP initial visual state to avoid refresh flashes.
- The active docs are restored at:
  - `docs/plans/2026-05-07-3d-perspective-floor-plane.md`
  - `docs/plans/2026-05-08-3d-rig-session-handoff.md`

### Next Implementation Tasks

1. Add real video/image content inside the ProjectZone detail circles.
2. Add Station C, then calibrate it with Playwright and `?calibrate=1`.
3. Integrate Hero / Title Block as a spatial station.
4. Hook the Drawing Package page into main portfolio navigation.

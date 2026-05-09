# 🚀 Session Handoff & Context: The Spatial Portfolio

**Date:** May 8, 2026
**Project Directory:** `portfolio`
**Current Phase:** 3D Rigging & Perspective Floor Plan Integration

## 1. Objective & Current State

We are building a "Spatial Web Experience." The portfolio is not a vertical-scrolling website; it is a massive 8800x6800px mechanical engineering drawing. The user's scroll scrubs a GSAP timeline that whips the virtual camera across the blueprint.

**Recent Milestones Achieved:**

- **The 3D Pivot:** We transitioned from a flat 2D canvas to a 3D perspective floor plan. The outer container now has CSS `perspective`, and the massive substrate uses `transform-style: preserve-3d`.
- **SVG Substrate:** Migrated from a WebP image to `AR-15-Lower-Reciever-v2.svg` with an `invert(1)` filter for white linework on a dark background.
- **Dynamic Camera Tilt:** The GSAP camera now performs flat whip-pans (x/y translations) but tilts into a 3/4 overhead perspective (`rotateX`) when stopping at specific stations.

## 2. Active Next Steps (For the Coding Agent)

1. **Depth-of-Field Integration:** Implement the `handleLift` callback to apply a CSS `blur()` to the background layer when the `<ProjectZone />` intersection observer fires.
2. **The Z-Axis Pop:** Ensure that when a `<ProjectZone />` triggers, its internal elements animate "up" towards the camera using `translateZ: 400px`.
3. **Coordinate Calibration:** Because `rotateX` foreshortening shifts visual positions, we need to empirically recalibrate the `tl.to` x/y values for the camera stops (expecting a +200-400px y-axis correction).

---

## 🤖 AI Custom Instructions (The Living Context)

_Agent: You must adhere strictly to these rules and reference these coordinates._

**ROLE & PERSONA**
Act as a Senior Creative Technologist and GSAP Architect. Do not output generic, vertical-scrolling web development patterns.

**1. CORE ARCHITECTURE (THE VISION)**

- **The Concept:** A high-resolution mechanical engineering drawing acts as a 3D floor plan. The browser viewport is a virtual camera.
- **The Navigation:** Viewport is pinned (`pin: true`, `100vw/100vh`). Vertical scrolling scrubs a GSAP `ScrollTrigger` timeline, which translates (`x`, `y`, `scale`, `rotateX`) the massive background substrate in the opposite direction.
- **The Aesthetic:** "Frozen Diorama Whip-Pan" (rapid, motion-blurred spatial sweeps between completely static UI zones).

**2. STRICT TECH STACK BOUNDARIES**

- **The Engine:** React (Vite) + GSAP (`ScrollTrigger`).
- **Styling:** TailwindCSS.
- **Remotion is BANNED for UI:** Remotion is strictly relegated to rendering offline MP4/WebM media (like 360° CAD spins). NEVER use Remotion to drive the main scroll timeline, manage DOM navigation, or render interactive UI elements.

**3. COMPONENT PHILOSOPHY**

- **Modular Stations:** UI elements (`<ProjectZone />`) are standard React components placed using absolute positioning (`top`, `left`) on the massive master canvas map.
- **Autonomous Triggers:** Components use `IntersectionObserver` to detect when the GSAP camera has physically dragged them into the viewport, firing their own local timelines (drawing SVG leader lines, translating Z-axis, popping up detail circles).

**4. THE "LIVING CONTEXT" PROTOCOL (CRITICAL)**
At the end of every major coding session or feature implementation, you (the AI) must proactively offer to update the "STATE & COORDINATES" section below to log the current `x`/`y` map coordinates of major components.

**5. CURRENT STATE & COORDINATES (THE MAP)**
_Map Substrate (The 3D Rig):_

- **Asset:** `AR-15-Lower-Reciever-v2.svg` (`invert(1)` filter for white linework, `mix-blend-screen` on dark background).
- **Native Resolution:** `8800px` (Width) x `6800px` (Height).
- **Geometry:** Outer container `perspective: 4000px`, substrate `transformStyle: preserve-3d`.

_Active Stations & Camera Stops:_

- **Station A [id="A", TRIGGER GUARD RADIUS]:** \* Component Position: `left: 1450px`, `top: 3200px`
  - Camera Stop: `x: -1400`, `y: -3730`, `scale: 1.2`, `rotateX: 0` (Flat start, triggers DOF blur).
- **Station B [id="B", BUFFER TUBE SOCKET]:**
  - Component Position: `left: 5567px`, `top: 833px`
  - Camera Stop: `x: -6400`, `y: -1000`, `scale: 1.2`, `rotateX: 35` (35-degree tilted stop).
- **[Hero / Title Block]:** Pending placement.

# Mark Hintz Portfolio — `scroll-driven-engineering-drawing`

**Design + Manufacturing Bridge**

A scroll-driven, 3D perspective engineering drawing portfolio built on React + Vite + GSAP. The drawing lies on a virtual XZ floor plane; the camera pans cinematic whip-pan routes across the CAD substrate and tilts into a 3/4 overhead perspective at each `ProjectZone` station.

---

## 🤖 For AI Agents — READ THIS FIRST

> **If you are an AI agent starting a session in this worktree, this section is mandatory reading before touching any code.**

### 1. Read `.continue-here.md` — Your Session Briefing

Before anything else, open:

```
.continue-here.md
```

This file is the **authoritative current state** of the project: what's done, what's next, all critical coordinates and geometry constants, and the exact `next_action` to start with. It is updated multiple times per session.

### 2. Read the Living Context Protocol — The Station Map

The current implementation plan and station map lives at:

```
docs/plans/2026-05-07-3d-perspective-floor-plane.md
```

This is the **source of truth** for:
- All `ProjectZone` station coordinates (`left`, `top` on substrate; `x`, `y`, `scale`, `rotateX` for GSAP)
- CSS 3D geometry constraints (perspective depth, max safe substrate Y, rotateX limits)
- The completion checklist (task-by-task with commit hashes)
- Design decisions that must not be reversed without understanding the rationale

### 3. Read the Most Recent Session Handoff

Session handoffs live in `docs/plans/` and follow the naming pattern `YYYY-MM-DD-*-handoff.md`. The most recent one as of 2026-05-08 is:

```
docs/plans/2026-05-08-3d-rig-session-handoff.md
```

Handoffs document: what was built, what bugs were found and how they were fixed, the exact state of key files after the session, and concrete "next session" directions.

---

## ⚠️ Doc Update Protocol — This Is Not Optional

**Docs go stale fast.** Stale docs cause the next agent to re-do work, re-discover bugs, or break working geometry. Follow this protocol every session:

| Trigger | Action |
|---|---|
| Start of session | Read `.continue-here.md`, the living context plan, and the most recent handoff |
| After any GSAP coordinate change | Update the station map table in `2026-05-07-3d-perspective-floor-plane.md` |
| After any architectural decision | Add it to the "Design Decisions Made" section of the active handoff |
| After completing a task | Update the checklist in `2026-05-07-3d-perspective-floor-plane.md`, update `.continue-here.md` |
| Mid-session (every ~45 min) | Update `.continue-here.md` with current state |
| End of session | Write a new `docs/plans/YYYY-MM-DD-*-handoff.md` summarizing what was done and what comes next, update `.continue-here.md` to "complete" or hand off clearly |

> **Rule of thumb:** If you changed something that the *next agent* would need to know to start without confusion, write it down before your session ends. Updating docs takes 5 minutes. Re-debugging a geometry bug takes an hour.

---

## 📁 Project Structure

```
.continue-here.md               ← READ FIRST — current state + next action
AGENTS.md                       ← Agent rules and skill context (auto-loaded)
PRODUCT.md                      ← Product identity for impeccable skill
docs/
  plans/
    2026-05-07-3d-perspective-floor-plane.md   ← Living context: station map, task checklist
    2026-05-08-3d-rig-session-handoff.md       ← Most recent session handoff
    prompt-recent/                             ← Archived prompt history
src/
  components/
    drawing-package/
      DrawingPackagePage.tsx     ← Main GSAP camera engine + substrate + DOF blur
      ProjectZone.tsx            ← Spatial station component (lift, label, IntersectionObserver)
public/
  assets/images/                 ← SVG engineering drawing assets
remotion/                        ← Remotion showreel studio (separate npm context)
```

---

## 🚀 Quick Start

### Portfolio Website (React + Vite)

```bash
npm install
npm run dev
```

**Dev URL:** `http://localhost:5174/Mark_Hintz-Portfolio-v2/drawing-package`

> This worktree runs on port `5174` to coexist with the main branch on `5173`.

### Remotion Showreel Studio

```bash
cd remotion && npm run studio
```

**Studio URL:** `http://localhost:3333`

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19, TypeScript, Vite |
| Animation | GSAP + ScrollTrigger |
| 3D | CSS `perspective` / `preserve-3d` / `rotateX` (no Three.js on drawing page) |
| Styling | Tailwind CSS v4 |
| Calibration | Playwright (Node scripts for scroll-and-screenshot iteration) |
| Video | Remotion |

---

## 🗺 Current Station Map (as of 2026-05-08)

| Station | id | Title | Substrate pos | GSAP camera stop |
|---|---|---|---|---|
| A | `"A"` | TRIGGER GUARD RADIUS | `left: 1450px, top: 3200px` | `x=-1400, y=-3730, scale=1.2, rotateX=0` *(start)* |
| B | `"B"` | BUFFER TUBE SOCKET | `left: 5567px, top: 833px` | `x=-6400, y=-1000, scale=1.2, rotateX=35` *(tilt stop)* |

**Key geometry constants:**
- `perspective: 4000px` on container (never lower — content goes past focal plane)
- `rotateX: 35°` at final stop (was 62° — caused invisible content bug)
- Max safe substrate Y at `scale: 1.2`: `4000 / (sin(35°) × 1.2) ≈ 5806px`

> Always verify the station map in `docs/plans/2026-05-07-3d-perspective-floor-plane.md` for the most current values — that file wins over this README if they disagree.

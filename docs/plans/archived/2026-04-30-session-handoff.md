# Session Handoff - 2026-04-30

## Current Repo State
- **Branch:** `main`
- **Active Dev Server:** `npm run dev` running on `http://localhost:5173/Mark_Hintz-Portfolio-v2/`
- **Remotion:** Video rendered at `remotion/out/showreel.mp4`.
- **Status:** Uncommitted changes in `portfolioData.ts`, `constants.ts`, and minor UI files.

## What Changed This Session
- **Skill Activation:** Located and activated the `impeccable` skill and installed the `humanizer-zh` skill.
- **Messaging Audit:** Audited the portfolio and showreel messaging using Mark's career context (specifically the "raw-what-i-do-rant").
- **Humanization:** Replaced generic "AI-ish" triplets and marketing-speak with high-signal technical descriptions:
    - **Hero:** Focused on "killing manual grunt work."
    - **About/Technical:** Detailed GD&T strategy, tool life, and specific inspection tools (sin blocks, Micro Height).
    - **Pump Package:** Evocative description of "trapping and killing roars" using "staggered baffles" and "tortuous paths."
    - **CTA:** Shifted to "sub-thou tolerances" and shop-floor credibility.
- **Verification:** Rendered the Remotion showreel and verified the Vite dev server. (Note: Browser subagent failed to load the local site, so manual review is recommended).

## First Task For Next Session
- **Variation Design:** Use the `impeccable` skill (specifically `$impeccable craft` or `$impeccable shape`) to design 3 variations of the portfolio page.
- **Side-by-Side Review:** Implement a layout/harness that allows viewing 3 variations at a time in the browser with equal screen space allocated to each.

## Important Context To Preserve
- **Mark's Voice:** The "raw-what-i-do-rant" in `docs/career/` is the source of truth for tone. Maintain the "Design + Manufacturing Bridge" positioning.
- **Impeccable Setup:** The `impeccable` skill is at `/home/markimus/.agents/skills/impeccable`. It requires `PRODUCT.md` for context.

## Current Working Tree
- `src/data/portfolioData.ts`: Updated messaging.
- `remotion/src/constants.ts`: Updated showreel narratives.
- `remotion/out/showreel.mp4`: Latest rendered video.

## Files Worth Reading First Next Session
- `docs/career/raw-what-i-do-rant.md`
- `src/data/portfolioData.ts`
- `remotion/src/constants.ts`
- `.agents/skills/impeccable/SKILL.md`

## Skills To Use Next Session
- `impeccable` (for design variations)
- `brainstorming` (for the variation strategy)
- `frontend-design` (for the 3-up view harness)

## Known Behavior Note
- The browser subagent has been timing out on `localhost:5173`. Next agent may need to debug network access or rely on the user for visual confirmation.

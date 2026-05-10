# VISION STATEMENT & ARCHITECTURE: The "Blueprint" Portfolio

## 1. The Core Concept

The portfolio is not a traditional vertical website; it is a **Spatial Web Experience**. The user is exploring a single, massive, highly detailed mechanical engineering drawing. The browser window acts as a virtual camera. As the user scrolls, the camera executes high-speed, motion-blurred "whip-pans" and "macro-zooms" across the blueprint, traveling from the Title Block (Hero) to isolated Detail Views (Projects) and General Notes (Services/Testimonials).

**Aesthetic Reference:** The "Frozen Diorama Whip-Pan" (e.g., the opening credits of _Deadpool_ or _Panic Room_).

## 2. Technical Philosophy

- **Modular Construction:** Every UI zone is an independent, self-governing React component.
- **Ruthless Simplicity:** Do not over-engineer the navigation. Move the background, not the components.
- **Native Interactivity First:** The illusion of a video must be maintained, but the reality is standard DOM elements. Text must be selectable, links must be clickable, and SEO must remain intact.

## 3. The Architecture (The "Ingredients")

### A. The Substrate (The Static Canvas)

- **What it is:** A massive (e.g., 300vw x 300vh), absolute-positioned `div` containing the base mechanical drawing.
- **Format:** Ideally a massive SVG to maintain infinite zoom crispness, or a highly optimized 8K WebP.
- **Preparation:** The drawing is "hollowed out." Text in the Title Block and Revision Table is deleted in CAD before export, leaving only the empty grid lines to frame our React components.
- **Spacing:** The layout is "decompressed." Wide margins of empty grid space are intentionally left between major visual elements to manufacture "travel time" for the camera during scroll-whips.

### B. The Virtual Camera (GSAP + ScrollTrigger)

- **What it is:** The central navigation engine.
- **How it works:** The viewport is strictly pinned (`pin: true`). The user's vertical scroll does not move them down a page; instead, it scrubs a GSAP timeline.
- **The Movement:** This timeline aggressively translates (`x`, `y`) and scales (`scale`) the massive Substrate `div` in the opposite direction, creating the illusion that the camera is flying over the blueprint to pre-defined exact coordinates (`cameraStops`).

### C. The Dynamic UI (React Stations)

- **What they are:** Standard React components (`<TitleBlockHeader />`, `<GeneralNotes />`) absolutely positioned at specific `top` and `left` coordinates on the master Substrate map.
- **Behavior:** Because the text and UI are not baked into the image, they remain perfectly crisp, fully interactive, and responsive to screen sizes.

### D. Autonomous Detail Views (`<ProjectZone />`)

- **What they are:** The showcase sections for individual portfolio projects.
- **The Animation:** They do _not_ rely on the master scroll timeline for their internal animations. Instead, they use an `IntersectionObserver`.
- **The Sequence:** When the GSAP camera physically drags a `ProjectZone` into the center of the user's screen, the observer triggers a local timeline:
  1. An SVG "Leader Line" draws itself from the background drawing's anchor point towards the user.
  2. A "Detail Circle" pops up and scales into view.
  3. The project media begins playing.

### E. Remotion's Confined Role

- **What it is:** Relegated exclusively to media generation, _not_ site navigation.
- **Usage:** Remotion is used strictly to render the heavy, complex, programmatic MP4/WebM 360° spinning CAD assets that play _inside_ the Detail View circles once they pop up.

---

**End of Document**

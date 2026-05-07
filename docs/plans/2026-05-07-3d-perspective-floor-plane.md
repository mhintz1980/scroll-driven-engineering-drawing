# 3D Perspective Floor Plane Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the flat 2D scroll-driven drawing canvas into a perspective 3D experience where the drawing lies on the XZ floor plane, the camera pans and then tilts into a 3/4 overhead view, and `ProjectZone` detail circles lift off the floor toward the camera with a simulated depth-of-field blur effect.

**Architecture:** CSS `perspective` on the outer container establishes the 3D stage. The substrate div uses `transform-style: preserve-3d` so children share the same 3D coordinate space. GSAP tweens `rotateX` on the substrate in the same keyframe as the final position stop of each whip-pan, creating a seamless "camera dropping into perspective" feel. A dedicated background image layer (already separated) receives `blur()` via GSAP when `ProjectZone` triggers its `translateZ` lift animation.

**Tech Stack:** React, GSAP + ScrollTrigger, CSS 3D transforms (`perspective`, `transform-style`, `translateZ`, `rotateX`), CSS `filter: blur()`, inline SVG (pending asset from user), `IntersectionObserver`

**Pre-condition:** User provides a new SVG export of the engineering drawing with white/light lines on a transparent or black background. Drop SVG into `public/assets/images/`. This plan references it as `AR-15-Lower-Reciever-v2.svg` — update the filename once confirmed.

---

## Task 1: Integrate SVG Asset and Normalize Colors

**Files:**
- Modify: `src/components/drawing-package/DrawingPackagePage.tsx` (background image layer ~L60)

**Context:** The existing `.webp` uses `grayscale/contrast` CSS filters to approximate white lines. SVG allows direct CSS `stroke` overrides. We swap the background div for an `<img>` pointing to the SVG and apply a clean filter stack.

**Step 1: Drop the SVG into public assets**

Place the exported SVG at:
```
public/assets/images/AR-15-Lower-Reciever-v2.svg
```

If the SVG was exported with **black lines on white background**, use this filter stack:
```css
filter: invert(100%) sepia(20%) saturate(500%) hue-rotate(180deg) brightness(90%);
```

If exported with **white lines on transparent/black**, use:
```css
filter: brightness(100%);
```

**Step 2: Update the background layer in DrawingPackagePage.tsx**

Replace the background `<div>` with an `<img>` tag:
```tsx
<img
  ref={bgLayerRef}
  src={`${import.meta.env.BASE_URL}assets/images/AR-15-Lower-Reciever-v2.svg`}
  className="absolute inset-0 pointer-events-none select-none"
  style={{
    width: '8800px',
    height: '6800px',
    filter: 'invert(100%) brightness(85%)',
    opacity: 0.9,
  }}
  alt=""
  aria-hidden="true"
/>
```

**Step 3: Take a Playwright screenshot to verify color**
```bash
npx playwright screenshot --wait-for-timeout=2000 \
  http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package \
  screenshot-svg-check.png
```
Expected: All linework (solid, dashed, dimensions, GD&T, crosshatch) appears as uniform white/light grey against dark blue background.

**Step 4: Commit**
```bash
git add public/assets/images/AR-15-Lower-Reciever-v2.svg \
        src/components/drawing-package/DrawingPackagePage.tsx
git commit -m "feat: integrate SVG drawing asset with unified white linework"
```

---

## Task 2: Enable CSS 3D Stage

**Files:**
- Modify: `src/components/drawing-package/DrawingPackagePage.tsx` (container div ~L50, substrate div ~L54)

**Step 1: Add `perspective` to the outer container div**
```tsx
<div
  ref={containerRef}
  className="w-screen h-screen overflow-hidden bg-slate-950"
  style={{ perspective: '1800px', perspectiveOrigin: '50% 40%' }}
>
```

**Step 2: Add `transformStyle: 'preserve-3d'` to the substrate div**
```tsx
<div
  ref={substrateRef}
  className="origin-top-left relative"
  style={{
    width: '8800px',
    height: '6800px',
    transformStyle: 'preserve-3d',
  }}
>
```

**Step 3: Screenshot to verify nothing breaks**
```bash
npx playwright screenshot --wait-for-timeout=2000 \
  http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package \
  screenshot-3d-stage.png
```
Expected: Page looks identical (no tilt yet).

**Step 4: Commit**
```bash
git add src/components/drawing-package/DrawingPackagePage.tsx
git commit -m "feat: enable CSS 3D stage with perspective container"
```

---

## Task 3: Add `rotateX` Tilt to Pan Endpoints

**Files:**
- Modify: `src/components/drawing-package/DrawingPackagePage.tsx` (GSAP timeline ~L31-43)

**Context:** The first whip-pan stop stays flat (`rotateX: 0`). Each subsequent stop tilts progressively. Final stop reaches full perspective tilt (`rotateX: 62`). The camera "drops into perspective" as it slows to a halt.

**Step 1: Update `gsap.set` to include explicit `rotateX: 0`**
```tsx
gsap.set(substrateRef.current, {
  x: -1400,
  y: -3730,
  scale: 1.2,
  rotateX: 0,
});
```

**Step 2: Update the first `tl.to` — stays flat during whip**
```tsx
tl.to(substrateRef.current, {
  x: -4500,
  y: -3000,
  scale: 1.8,
  rotateX: 0,
  duration: 1,
  ease: 'power3.inOut',
})
```

**Step 3: Update the second `tl.to` — tilts into perspective on stop**
```tsx
.to(substrateRef.current, {
  x: -7500,
  y: -5500,
  scale: 1.3,
  rotateX: 62,
  duration: 1,
  ease: 'power3.inOut',
});
```

> **Note:** Camera x/y coordinates will need recalibration (Task 6) after seeing perspective distortion.

**Step 4: Commit**
```bash
git add src/components/drawing-package/DrawingPackagePage.tsx
git commit -m "feat: add rotateX perspective tilt to GSAP whip-pan endpoints"
```

---

## Task 4: Lift `ProjectZone` Off the Floor with `translateZ`

**Files:**
- Modify: `src/components/drawing-package/ProjectZone.tsx` (IntersectionObserver callback ~L42-75, container div ~L91)

**Step 1: Add `transformStyle: 'preserve-3d'` to the ProjectZone container div**
```tsx
<div
  ref={containerRef}
  className="absolute pointer-events-none w-[600px] h-[500px]"
  style={{ top, left, transformStyle: 'preserve-3d' }}
>
```

**Step 2: Add `translateZ` tween to the IntersectionObserver GSAP timeline**

After the label pop-in animation:
```tsx
tl.to(containerRef.current, {
  z: 400,
  scale: 1.08,
  duration: 1.2,
  ease: 'power2.out',
  onStart: () => onLift?.(),
}, "-=0.3");
```

**Step 3: Add `onLift` prop to interface**
```tsx
interface ProjectZoneProps {
  id: string;
  title: string;
  top: string;
  left: string;
  onLift?: () => void;
}
```

**Step 4: Screenshot with 3.5s wait**
```bash
npx playwright screenshot --wait-for-timeout=3500 \
  http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package \
  screenshot-lift.png
```
Expected: ProjectZone circle appears larger and visually above the drawing floor.

**Step 5: Commit**
```bash
git add src/components/drawing-package/ProjectZone.tsx
git commit -m "feat: lift ProjectZone off floor plane with translateZ animation"
```

---

## Task 5: Add Depth-of-Field Blur on Lift

**Files:**
- Modify: `src/components/drawing-package/DrawingPackagePage.tsx` (add `bgLayerRef`, `handleLift` callback)

**Step 1: Add `bgLayerRef` ref**
```tsx
const bgLayerRef = useRef<HTMLImageElement>(null);
```

**Step 2: Create `handleLift` callback**
```tsx
const handleLift = useCallback(() => {
  gsap.to(bgLayerRef.current, {
    filter: 'invert(100%) brightness(85%) blur(10px)',
    duration: 1.0,
    ease: 'power2.inOut',
  });
}, []);
```

**Step 3: Pass `onLift` to ProjectZone**
```tsx
<ProjectZone
  id="A"
  title="TRIGGER GUARD RADIUS"
  top="3200px"
  left="1450px"
  onLift={handleLift}
/>
```

**Step 4: Screenshot to verify DOF blur**
```bash
npx playwright screenshot --wait-for-timeout=3500 \
  http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package \
  screenshot-dof.png
```
Expected: Background linework is softly blurred. ProjectZone circle is crisp and sharp.

**Step 5: Commit**
```bash
git add src/components/drawing-package/DrawingPackagePage.tsx \
        src/components/drawing-package/ProjectZone.tsx
git commit -m "feat: depth-of-field blur on background when ProjectZone lifts"
```

---

## Task 6: Recalibrate Camera Coordinates

**Files:**
- Modify: `src/components/drawing-package/DrawingPackagePage.tsx` (GSAP `set` and `tl.to` x/y values)

**Context:** `rotateX` foreshortening shifts visual positions. Expect y-coordinates to need `+200-400px` correction.

Centering formula (without perspective correction):
```
x_gsap = -(px * scale) + (viewport_w / 2) - (component_w / 2)
y_gsap = -(py * scale) + (viewport_h / 2) - (component_h / 2)
```
Then adjust empirically based on Playwright screenshots.

**Step 1: Take a scrolled screenshot to see final tilted state**

Use a Playwright script to scroll halfway then screenshot:
```bash
node -e "
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setViewportSize({ width: 1280, height: 720 });
  await p.goto('http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package');
  await p.evaluate(() => window.scrollTo(0, 1250));
  await p.waitForTimeout(1500);
  await p.screenshot({ path: 'screenshot-scroll-mid.png' });
  await b.close();
})();
"
```

**Step 2: Adjust coordinates, re-screenshot, repeat until centered**

**Step 3: Commit**
```bash
git add src/components/drawing-package/DrawingPackagePage.tsx
git commit -m "fix: recalibrate camera coordinates after perspective tilt"
```

---

## Completion Checklist

- [ ] SVG asset integrated with unified white linework
- [ ] CSS 3D stage active (`perspective` on container, `preserve-3d` on substrate)
- [ ] Whip-pans stay flat; final stop tilts to `rotateX: 62deg`
- [ ] `ProjectZone` lifts with `z: 400` when IntersectionObserver triggers
- [ ] Depth-of-field blur fires on background layer when lift starts
- [ ] Camera coordinates recalibrated for perspective
- [ ] All Playwright screenshots confirm visual output at each step

---

> **Waiting on:** SVG asset from user before Task 1 can begin. Tasks 2-5 can proceed immediately.

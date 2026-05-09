# Drawing Environment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the portfolio background into a staged drawing environment built from several real drawing assets, with controlled depth, cropping, and scroll timing.

**Architecture:** Split the background into layered visual plates: a base master sheet (inverted to dark), secondary drawing ghosts placed strategically, and active scene plates that emphasize based on scroll position. Replace hand-drawn SVG geometries with `motion.img` layers of the real CAD files.

**Tech Stack:** React, Framer Motion, Tailwind CSS, Vite

---

### Task 1: Clean Up Synthetic SVG Linework

**Files:**
- Modify: `src/components/drawing-package/DrawingBackground.tsx`

**Step 1: Write the failing test**
(N/A - visual refactor, no unit tests for structural component removal)

**Step 2: Write minimal implementation**
Remove dense synthetic geometries like fake orthographic boards and duplicated block groups from `DrawingBackground.tsx`.
Delete `ProjectDrawingBoard`, `IsometricHousing`, `IsometricMotor`, `OrthographicGearbox`, `OrthographicPump`, `LargeAssemblyGhost`, `ServicesTable`, and `Testimonials` components. 
Retain structural SVGs like `SheetFrame`, `SectionTick`, `TitleBlock`, `RevisionBlock`, `FooterBlock`, `DetailBubble` (remove the motor inside it), `LeaderNetwork`, and `CalloutText`.

**Step 3: Commit**
```bash
git add src/components/drawing-package/DrawingBackground.tsx
git commit -m "refactor: remove synthetic SVG linework to prepare for real drawing plates"
```

### Task 2: Implement Drawing Plate Configuration

**Files:**
- Modify: `src/data/drawingPackageData.ts`

**Step 1: Write the failing test**
(N/A - data structure definition)

**Step 2: Write minimal implementation**
Define a `DrawingPlate` type in `drawingPackageData.ts` and export a configuration array mapping sections to specific images.

```typescript
export type DrawingPlate = {
  src: string;
  section: "hero" | "project" | "services" | "testimonials" | "contact" | "base";
  x: string | number;
  y: string | number;
  width: string | number;
  baseOpacity: number;
  activeOpacity: number;
  scale: number;
  parallaxStrength: number;
  invert?: boolean;
};

export const drawingPlates: DrawingPlate[] = [
  { src: "assets/images/3-1.png", section: "base", x: "-5%", y: "-5%", width: "110%", baseOpacity: 0.16, activeOpacity: 0.16, scale: 1, parallaxStrength: 0.05, invert: true },
  { src: "assets/images/6.png", section: "hero", x: "10%", y: "5%", width: "40%", baseOpacity: 0.05, activeOpacity: 0.25, scale: 1.2, parallaxStrength: 0.2, invert: true },
  { src: "assets/images/1.png", section: "project", x: "50%", y: "30%", width: "50%", baseOpacity: 0.1, activeOpacity: 0.35, scale: 1.1, parallaxStrength: 0.3, invert: false },
  { src: "assets/images/5.png", section: "services", x: "15%", y: "60%", width: "45%", baseOpacity: 0.08, activeOpacity: 0.25, scale: 1.0, parallaxStrength: 0.25, invert: true },
  { src: "assets/images/4.png", section: "contact", x: "40%", y: "80%", width: "60%", baseOpacity: 0.1, activeOpacity: 0.3, scale: 1.3, parallaxStrength: 0.4, invert: true },
];
```

**Step 3: Commit**
```bash
git add src/data/drawingPackageData.ts
git commit -m "feat: define drawing plate configuration"
```

### Task 3: Render Plate Layers in DrawingBackground

**Files:**
- Modify: `src/components/drawing-package/DrawingBackground.tsx`

**Step 1: Write minimal implementation**
In `DrawingBackground.tsx`, map through `drawingPlates` and render `<motion.img>` elements behind the SVG overlay.
Apply CSS filters for white-bg images.

```tsx
import { drawingPlates } from '../../data/drawingPackageData';

// Inside DrawingBackground, before the <svg>
<div className="absolute inset-0 z-[-1]">
  {drawingPlates.map((plate, i) => {
    const yOffset = useTransform(progress, [0, 1], [0, -1000 * plate.parallaxStrength * parallaxScale]);
    const filter = plate.invert ? 'invert(1) hue-rotate(180deg) brightness(0.8) contrast(1.2)' : 'none';
    
    return (
      <motion.img
        key={i}
        src={plate.src}
        alt=""
        style={{
          position: 'absolute',
          left: plate.x,
          top: plate.y,
          width: plate.width,
          opacity: plate.baseOpacity, // Will update in next task
          scale: plate.scale,
          y: yOffset,
          filter,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />
    );
  })}
</div>
```

**Step 2: Commit**
```bash
git add src/components/drawing-package/DrawingBackground.tsx
git commit -m "feat: render real drawing plates with parallax and dark mode inversion"
```

### Task 4: Implement Scene-Linked Emphasizer

**Files:**
- Modify: `src/components/drawing-package/DrawingBackground.tsx`

**Step 1: Write minimal implementation**
Determine the active section based on `scrollYProgress` and interpolate plate opacity to emphasize the plate associated with the active section.

```tsx
// Inside DrawingBackground
// A simplistic approach using useTransform for opacity based on scroll progress zones
// Or simply let CSS handle active states if active section is passed down as a prop.
```
*Note: Since progress ranges 0 to 1, define `useTransform` opacity interpolations based on approximate section scroll boundaries.*

**Step 2: Commit**
```bash
git add src/components/drawing-package/DrawingBackground.tsx
git commit -m "feat: add scene-specific plate emphasis on scroll"
```

### Task 5: Text Legibility & Polish

**Files:**
- Modify: `src/components/drawing-package/DrawingHero.tsx`
- Modify: `src/components/drawing-package/ProjectZone.tsx`

**Step 1: Write minimal implementation**
Add a subtle dark background or backdrop blur to text blocks so they are legible against the now-busy real drawing background.

```tsx
// Example in ProjectZone.tsx or DrawingHero.tsx:
style={{
  background: 'rgba(4, 8, 14, 0.6)',
  backdropFilter: 'blur(4px)',
  // ...
}}
```

**Step 2: Commit**
```bash
git add src/components/drawing-package/DrawingHero.tsx src/components/drawing-package/ProjectZone.tsx
git commit -m "style: ensure text legibility over new CAD plates via backdrop-blur"
```

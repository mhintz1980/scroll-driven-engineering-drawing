i took care of ot. look at this real quick

### 1. The Detail View Component (`ProjectZone.tsx`)

This component uses an SVG for the leader line. We use the `stroke-dasharray` and `stroke-dashoffset` CSS trick to make the line "draw" itself from the part up to the detail circle.

```tsx
// src/components/drawing-package/ProjectZone.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ProjectZoneProps {
  id: string;
  title: string;
  videoSrc?: string; // We will map the Remotion video here later
  top: string;
  left: string;
}

export default function ProjectZone({
  id,
  title,
  videoSrc,
  top,
  left,
}: ProjectZoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We use an Intersection Observer so the animation only plays
    // when the GSAP canvas physically drags this component into the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // The Animation Timeline
            const tl = gsap.timeline();

            // 1. Draw the leader line
            tl.to(lineRef.current, {
              strokeDashoffset: 0,
              duration: 1,
              ease: "power2.out",
            })
              // 2. Pop the Detail Circle up
              .to(
                circleRef.current,
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.6,
                  ease: "back.out(1.7)",
                },
                "-=0.4",
              ); // Start slightly before the line finishes drawing

            observer.disconnect(); // Only play once
          }
        });
      },
      { threshold: 0.5 },
    ); // Trigger when 50% visible

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute w-[600px] h-[500px] pointer-events-none"
      style={{ top, left }}
    >
      {/* The SVG Leader Line. 
        Path (d) traces from bottom-left (the drawing) to top-right (the circle).
      */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500">
        <path
          ref={lineRef}
          d="M 50 450 L 300 200 L 450 200"
          fill="none"
          stroke="#3b82f6" // Tailwind blue-500
          strokeWidth="4"
          // These properties hide the line initially for the draw effect
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        {/* The origin dot on the blueprint */}
        <circle cx="50" cy="450" r="8" fill="#3b82f6" />
      </svg>

      {/* The Detail View Circle */}
      <div
        ref={circleRef}
        className="absolute top-[40px] right-[10px] w-[300px] h-[300px] rounded-full border-4 border-blue-500 bg-slate-900 shadow-[0_0_30px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center pointer-events-auto opacity-0 scale-50"
      >
        {/* Placeholder for your 360 CAD spin video */}
        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-slate-800">
          <span className="text-slate-400 font-mono text-sm">
            CAD_SPIN_RENDER.mp4
          </span>
        </div>

        {/* Detail Label */}
        <div className="absolute -bottom-12 bg-slate-900 border border-blue-500 px-4 py-2 font-mono text-blue-400">
          DETAIL {id.toUpperCase()}
          <div className="text-xs text-slate-400">{title}</div>
        </div>
      </div>
    </div>
  );
}
```

### 2. The Interactive Canvas (`DrawingPackagePage.tsx`)

Here we apply the uploaded AR-15 background and map the `ProjectZone` to a specific coordinate on that drawing.

```tsx
// src/components/drawing-package/DrawingPackagePage.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectZone from "./ProjectZone";

gsap.registerPlugin(ScrollTrigger);

export default function DrawingPackagePage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: viewportRef.current,
          start: "top top",
          end: "+=3000", // 3000px of scroll travel distance
          scrub: 1.2,
          pin: true,
        },
      });

      // Frame 1: Zoom in on the Title Block (Bottom Right)
      tl.to(canvasRef.current, {
        x: "-60vw", // Pan left
        y: "-60vh", // Pan up
        scale: 1.2,
        duration: 1,
        ease: "power2.inOut",
      })
        // Frame 2: Whip-pan to the trigger housing detail (Center Left)
        .to(canvasRef.current, {
          x: "10vw",
          y: "20vh",
          scale: 1.5,
          duration: 1,
          ease: "power2.inOut",
        });
    }, viewportRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={viewportRef}
      className="h-screen w-screen bg-slate-950 overflow-hidden text-white"
    >
      {/* The Master Canvas. Sized 3x larger than the screen.
        Using your uploaded AR-15 forging drawing as the substrate.
      */}
      <div
        ref={canvasRef}
        className="absolute top-0 left-0 w-[300vw] h-[300vh] origin-center bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage:
            "url(/assets/images/AR-15-Lower-Reciever-Forged.jpg)",
        }}
      >
        {/* Placing the Detail View. 
          The 'top' and 'left' values anchor it over the trigger guard area of the drawing.
          When the GSAP timeline translates the canvas so this area is visible, 
          the component's internal IntersectionObserver will fire the animation.
        */}
        <ProjectZone id="A" title="TRIGGER GUARD RADIUS" top="45%" left="35%" />

        {/* We would place <TitleBlockHeader /> at bottom right here */}
      </div>
    </div>
  );
}
```

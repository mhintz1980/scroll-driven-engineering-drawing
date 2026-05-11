import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectZone } from './ProjectZone';
import '../../styles/drawing-package.css';

gsap.registerPlugin(ScrollTrigger);

const STATION_A_LAYOUT = {
  pathD: 'M 52 388 L 144 388 L 144 260 L 56 218',
  anchor: { x: 52, y: 388 },
  circleStyle: {
    top: '68px',
    left: '32px',
  },
} as const;

const STATION_B_LAYOUT = {
  pathD: 'M 64 404 L 176 404 L 176 254 L 28 198',
  anchor: { x: 64, y: 404 },
  circleStyle: {
    top: '56px',
    left: '12px',
  },
} as const;

const getStationAStop = () => ({
  x: window.innerWidth < 768
    ? -1400 + 0.55 * (window.innerWidth - 975)
    : -1400,
  y: -3730,
  scale: 1.2,
  rotateX: 0,
});

const getStationBStop = () => ({
  x: -6320 + 0.495 * (window.innerWidth - 975),
  y: -740 + 0.47 * (window.innerHeight - 550),
  scale: 1.2,
  rotateX: 35,
});

export function DrawingPackagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const substrateRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    document.documentElement.classList.add('drawing-package-route');
    document.body.classList.add('drawing-package-route');

    return () => {
      document.documentElement.classList.remove('drawing-package-route');
      document.body.classList.remove('drawing-package-route');
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const stationAStop = getStationAStop();

      gsap.set(bgLayerRef.current, {
        filter: 'invert(1) blur(0px)',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: '+=2500',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Task 2 & 3: Camera starts flat, centered on ProjectZone
      gsap.set(substrateRef.current, {
        x: stationAStop.x,
        y: stationAStop.y,
        scale: stationAStop.scale,
        rotateX: stationAStop.rotateX, // explicitly flat — Task 3
      });

      // Task 3: First stop — whip-pan departs flat, covering ground across drawing
      tl.to(substrateRef.current, {
        x: -4800,
        y: -2000,
        scale: 1.6,
        rotateX: 0,
        duration: 1,
        ease: 'power3.inOut',
      })
      .to(bgLayerRef.current, {
        filter: 'invert(1) blur(10px)',
        duration: 0.65,
        ease: 'none',
      }, 0.18)
      // Task 3/6: Second stop — decelerates and tilts into 35-deg floor-plane view.
      // perspective:4000px keeps substrate Y≤4000 within focal plane at scale 1.2.
      // Target: upper-right quadrant of drawing, viewport-corrected so Station B
      // stays centered across calibration, desktop, and mobile browser heights.
      .to(substrateRef.current, {
        x: () => getStationBStop().x,
        y: () => getStationBStop().y,
        scale: () => getStationBStop().scale,
        rotateX: () => getStationBStop().rotateX,
        duration: 1,
        ease: 'power3.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Task 2: perspective on the outer container establishes the 3D stage
    <div
      ref={containerRef}
      className="drawing-package drawing-scene w-screen h-screen overflow-hidden bg-slate-950"
      style={{ perspective: '4000px', perspectiveOrigin: '50% 40%' }}
    >
      {/* Task 2: preserve-3d so children share the same 3D coordinate space */}
      <div
        ref={substrateRef}
        className="origin-top-left relative"
        style={{
          width: '8800px',
          height: '6800px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* SVG drawing layer — black-on-transparent SVG, invert(1) makes lines white.
             mix-blend-screen lets white lines glow through on the dark bg-slate-950.
             Isolated ref for Task 5 DOF blur. */}
        <img
          ref={bgLayerRef}
          src={`${import.meta.env.BASE_URL}assets/images/Lower Receiver-Machined Forging (1).svg`}
          className="absolute inset-0 pointer-events-none select-none mix-blend-screen"
          style={{
            width: '8800px',
            height: '6800px',
            filter: 'invert(1)',
            opacity: 0.9,
          }}
          alt=""
          aria-hidden="true"
        />
        <ProjectZone
          id="A"
          title="TRIGGER GUARD RADIUS"
          top="3200px"
          left="1450px"
          layout={STATION_A_LAYOUT}
        />
        {/* Station B — Buffer Tube Socket / Pistol Grip Mount
            Substrate coords: left=5567px, top=833px
            Camera stop is viewport-corrected from a 975x550 calibration baseline:
            x=-6320 + 0.495*(vw-975), y=-740 + 0.47*(vh-550), scale=1.2, rotateX=35. */}
        <ProjectZone
          id="B"
          title="BUFFER TUBE SOCKET"
          top="833px"
          left="5567px"
          layout={STATION_B_LAYOUT}
        />
      </div>
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectZone } from './ProjectZone';
import '../../styles/drawing-package.css';

gsap.registerPlugin(ScrollTrigger);

const SUBSTRATE_WIDTH = 8800;
const SUBSTRATE_HEIGHT = 6800;
const SUBSTRATE_ASSET = 'Lower Receiver-Machined Forging (22).svg';

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

const STATION_C_LAYOUT = {
  pathD: 'M 540 410 L 440 410 L 440 260 L 548 210',
  anchor: { x: 540, y: 410 },
  circleStyle: {
    top: '60px',
    left: '360px',
  },
} as const;

const STATION_D_LAYOUT = {
  pathD: 'M 460 390 L 560 390 L 560 240 L 452 190',
  anchor: { x: 460, y: 390 },
  circleStyle: {
    top: '48px',
    left: '340px',
  },
} as const;

const getStationAStop = () => ({
  x: window.innerWidth < 768
    ? -1400 + 0.55 * (window.innerWidth - 975)
    : -1400,
  y: -3730 - Math.max(0, 720 - window.innerHeight) * 0.35,
  scale: 1.2,
  rotateX: 0,
});

const getStationBStop = () => ({
  x: -6320 + 0.495 * (window.innerWidth - 975),
  y: -740 + 0.47 * (window.innerHeight - 550),
  scale: 1.2,
  rotateX: 35,
});

const getStationCStop = () => ({
  x: -3920 + 0.5 * (window.innerWidth - 975),
  y: -4980 - Math.max(0, 720 - window.innerHeight) * 0.3,
  scale: 1.2,
  rotateX: 0,
});

const getStationDStop = () => ({
  x: -7880 + 0.48 * (window.innerWidth - 975),
  y: -4740 - Math.max(0, 720 - window.innerHeight) * 0.3,
  scale: 1.2,
  rotateX: 0,
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
          end: '+=4000',
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
      .to(substrateRef.current, {
        x: () => getStationBStop().x,
        y: () => getStationBStop().y,
        scale: () => getStationBStop().scale,
        rotateX: () => getStationBStop().rotateX,
        duration: 1,
        ease: 'power3.inOut',
      })
      // Transit B → C: flatten out, sweep left and down
      .to(bgLayerRef.current, {
        filter: 'invert(1) blur(8px)',
        duration: 0.4,
        ease: 'none',
      })
      .to(substrateRef.current, {
        x: -5000,
        y: -3800,
        scale: 1.4,
        rotateX: 10,
        duration: 0.8,
        ease: 'power3.inOut',
      })
      // Third stop — Station C, flat view of lower-left quadrant
      .to(bgLayerRef.current, {
        filter: 'invert(1) blur(0px)',
        duration: 0.3,
        ease: 'none',
      })
      .to(substrateRef.current, {
        x: () => getStationCStop().x,
        y: () => getStationCStop().y,
        scale: () => getStationCStop().scale,
        rotateX: () => getStationCStop().rotateX,
        duration: 0.7,
        ease: 'power3.inOut',
      })
      // Transit C → D: sweep right across bottom of drawing
      .to(bgLayerRef.current, {
        filter: 'invert(1) blur(8px)',
        duration: 0.4,
        ease: 'none',
      })
      .to(substrateRef.current, {
        x: -6800,
        y: -3600,
        scale: 1.5,
        rotateX: 5,
        duration: 0.8,
        ease: 'power3.inOut',
      })
      // Fourth stop — Station D, flat view of lower-right quadrant
      .to(bgLayerRef.current, {
        filter: 'invert(1) blur(0px)',
        duration: 0.3,
        ease: 'none',
      })
      .to(substrateRef.current, {
        x: () => getStationDStop().x,
        y: () => getStationDStop().y,
        scale: () => getStationDStop().scale,
        rotateX: () => getStationDStop().rotateX,
        duration: 0.7,
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
          width: `${SUBSTRATE_WIDTH}px`,
          height: `${SUBSTRATE_HEIGHT}px`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* SVG drawing layer — black-on-transparent SVG, invert(1) makes lines white.
             mix-blend-screen lets white lines glow through on the dark bg-slate-950.
             Isolated ref for Task 5 DOF blur. */}
        <img
          ref={bgLayerRef}
          src={`${import.meta.env.BASE_URL}assets/images/${SUBSTRATE_ASSET}`}
          className="absolute inset-0 pointer-events-none select-none mix-blend-screen"
          style={{
            width: `${SUBSTRATE_WIDTH}px`,
            height: `${SUBSTRATE_HEIGHT}px`,
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
          imageSrc={`${import.meta.env.BASE_URL}assets/images/torque-wrench-03.webp`}
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
          imageSrc={`${import.meta.env.BASE_URL}assets/images/Billet Receiver Set AR15.webp`}
        />
        {/* Station C — Industrial Dewatering Pump
            Substrate coords: left=3500px, top=4200px */}
        <ProjectZone
          id="C"
          title="INDUSTRIAL DEWATERING PUMP"
          top="4200px"
          left="3500px"
          layout={STATION_C_LAYOUT}
          imageSrc={`${import.meta.env.BASE_URL}assets/images/pump-package-04.webp`}
        />
        {/* Station D — Renderings & Visualizations
            Substrate coords: left=6800px, top=4000px */}
        <ProjectZone
          id="D"
          title="RENDERINGS"
          top="4000px"
          left="6800px"
          layout={STATION_D_LAYOUT}
          imageSrc={`${import.meta.env.BASE_URL}assets/images/rendering-06.webp`}
        />
      </div>
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectZone } from './ProjectZone';
import { TitleBlockStation } from './TitleBlockStation';
import { wordCycleData, portfolioData } from '../../data/portfolioData';
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

const getHeroStop = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const fitScale = Math.min(vw / SUBSTRATE_WIDTH, vh / SUBSTRATE_HEIGHT);
  const scale = fitScale * 0.82;
  return {
    x: (vw - SUBSTRATE_WIDTH * scale) / 2,
    y: (vh - SUBSTRATE_HEIGHT * scale) / 2,
    scale,
    rotateX: 0,
  };
};

const getTitleBlockStop = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const tbCenterX = 7400;
  const tbCenterY = 6100;
  return {
    x: vw / 2 - tbCenterX * 1.2,
    y: vh / 2 - tbCenterY * 1.2,
    scale: 1.2,
    rotateX: 0,
  };
};

const WORD_CYCLE = wordCycleData;

export function DrawingPackagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const substrateRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % WORD_CYCLE.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
      const heroStop = getHeroStop();

      gsap.set(bgLayerRef.current, {
        filter: 'invert(1) blur(0px)',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: '+=7000',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Hero: start zoomed out, showing full substrate
      gsap.set(substrateRef.current, {
        x: heroStop.x,
        y: heroStop.y,
        scale: heroStop.scale,
        rotateX: heroStop.rotateX,
      });

      // Hero → Station A: fade text, zoom camera into first station
      tl.to(heroRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
      })
      .to(heroTextRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      }, 0)
      .to(substrateRef.current, {
        x: () => getStationAStop().x,
        y: () => getStationAStop().y,
        scale: () => getStationAStop().scale,
        rotateX: () => getStationAStop().rotateX,
        duration: 1.2,
        ease: 'power3.inOut',
      }, 0)

      // Station A → whip-pan transit
      .to(substrateRef.current, {
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
      }, '<0.18')
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
      })
      // Transit D → Title Block: sweep down-right to lower corner
      .to(bgLayerRef.current, {
        filter: 'invert(1) blur(6px)',
        duration: 0.4,
        ease: 'none',
      })
      .to(substrateRef.current, {
        x: () => window.innerWidth / 2 - 7000 * 1.1,
        y: () => window.innerHeight / 2 - 5800 * 1.1,
        scale: 1.1,
        rotateX: 5,
        duration: 0.8,
        ease: 'power3.inOut',
      })
      // Final stop — Title Block, flat view
      .to(bgLayerRef.current, {
        filter: 'invert(1) blur(0px)',
        duration: 0.3,
        ease: 'none',
      })
      .to(substrateRef.current, {
        x: () => getTitleBlockStop().x,
        y: () => getTitleBlockStop().y,
        scale: () => getTitleBlockStop().scale,
        rotateX: () => getTitleBlockStop().rotateX,
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
        {/* Title Block — final camera stop in lower-right corner */}
        <TitleBlockStation />
      </div>

      {/* Hero overlay — zoomed-out drawing with animated text. Fades on scroll. */}
      <div
        ref={heroRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ zIndex: 60 }}
      >
        <div
          ref={heroTextRef}
          className="text-center px-6 max-w-2xl"
        >
          <div
            className="text-[11px] uppercase tracking-[0.22em] mb-4"
            style={{ color: 'var(--dp-accent)' }}
          >
            {portfolioData.personal.superHeader}
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-medium leading-none uppercase tracking-[0.03em] mb-6"
            style={{ color: 'var(--dp-text)', fontFamily: "'Michroma', 'Archivo', system-ui, sans-serif" }}
          >
            {portfolioData.personal.name}
          </h1>
          <div
            className="text-sm md:text-base uppercase leading-relaxed tracking-[0.02em] mb-8 inline-flex items-center gap-2"
            style={{ color: 'var(--dp-text-dim, #94a3b8)' }}
          >
            <span>Built for</span>
            <span
              className="font-bold relative inline-flex h-[1.35em] min-w-[18ch] overflow-hidden align-baseline"
              style={{ color: 'var(--dp-accent)' }}
            >
              <span className="invisible whitespace-nowrap pointer-events-none">
                {WORD_CYCLE.reduce((a, b) => (a.length > b.length ? a : b), '')}
              </span>
              <span
                key={WORD_CYCLE[currentWord]}
                className="absolute bottom-0 left-0 whitespace-nowrap dp-word-cycle"
              >
                {WORD_CYCLE[currentWord]}
              </span>
            </span>
          </div>
          <div
            className="text-xs leading-relaxed inline-flex flex-col items-start gap-1 px-5 py-4 border backdrop-blur-sm"
            style={{
              borderColor: 'var(--dp-border)',
              background: 'rgba(9, 16, 25, 0.5)',
              color: 'var(--dp-text)',
            }}
          >
            {([
              ['SPEC', portfolioData.personal.name],
              ['ROLE', 'Mechanical Designer + Systems Builder'],
              ['TOL', '±0.0005" | 15 YRS | JAX, FL'],
              ['STATUS', 'AVAILABLE FOR WORK'],
              ['STACK', 'SolidWorks · PDM · Python · AI Tooling'],
            ] as const).map(([key, val]) => (
              <div key={key} className="flex">
                <span className="mr-2 font-bold" style={{ color: 'var(--dp-accent)' }}>
                  &gt; {key}:
                </span>
                <span
                  style={{
                    color: key === 'STATUS' ? 'oklch(0.72 0.19 155)' : 'var(--dp-text)',
                  }}
                  className={key === 'STATUS' ? 'font-bold' : ''}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] animate-pulse"
          style={{ color: 'var(--dp-text-dim, #64748b)' }}
        >
          Scroll to explore
        </div>
      </div>
    </div>
  );
}

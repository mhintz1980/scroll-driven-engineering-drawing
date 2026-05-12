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
  return {
    x: vw / 2 - 2000 * 2.2,
    y: vh / 2 - 2000 * 2.2,
    scale: 2.2,
    rotateX: 15,
  };
};

const getTitleBlockStop = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const tbCenterX = 6900; // left: 6400 + width/2: 500
  const tbCenterY = 6025; // top: 5800 + ~225 (half native height ~450)
  const scale = Math.min(1.2, vw * 0.85 / 1000);
  return {
    x: vw / 2 - tbCenterX * scale,
    y: vh / 2 - tbCenterY * scale,
    scale,
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
          scrub: 2.5,
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

      // Hero: Cinematic Intro Text on Substrate
      gsap.set(heroTextRef.current, {
        opacity: 0,
        scale: 0.9,
        z: 200,
        rotateX: -15, // Counteract initial camera tilt for face-on text
      });

      // Intro sequence: Hero text appears
      tl.to(heroTextRef.current, {
        opacity: 1,
        scale: 1,
        z: 400,
        duration: 0.8,
        ease: 'power3.out',
      })
      // Hold for a moment, then fade text and whip-pan to Station A
      .to(heroTextRef.current, {
        opacity: 0,
        y: -100,
        z: 800,
        duration: 0.6,
        ease: 'power2.in',
      }, '+=0.4')
      .to(substrateRef.current, {
        x: () => getStationAStop().x,
        y: () => getStationAStop().y,
        scale: () => getStationAStop().scale,
        rotateX: () => getStationAStop().rotateX,
        duration: 1.5,
        ease: 'power4.inOut',
      }, '<0.2')

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
        x: () => {
          const s = Math.min(1.1, window.innerWidth * 0.8 / 1000);
          return window.innerWidth / 2 - 6900 * s;
        },
        y: () => {
          const s = Math.min(1.1, window.innerWidth * 0.8 / 1000);
          return window.innerHeight / 2 - 5800 * s;
        },
        scale: () => Math.min(1.1, window.innerWidth * 0.8 / 1000),
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
        {/* Hero Text 3D Station */}
        <div
          ref={heroRef}
          className="absolute"
          style={{
            left: '2000px',
            top: '2000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            ref={heroTextRef}
            className="flex flex-col items-center justify-center w-[1600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none origin-center"
            style={{ 
              transformStyle: 'preserve-3d'
            }}
          >
            <div
              className="text-[32px] uppercase tracking-[0.4em] mb-8 font-bold"
              style={{ color: 'var(--dp-accent)' }}
            >
              {portfolioData.personal.superHeader}
            </div>
            
            <div className="relative mb-12">
              {/* Massive cinematic shadow behind text */}
              <h1
                className="text-[180px] font-bold leading-none uppercase tracking-[0.05em] absolute top-2 left-2 blur-2xl opacity-50"
                style={{ color: 'var(--dp-accent)', fontFamily: "'Michroma', 'Archivo', system-ui, sans-serif" }}
              >
                {portfolioData.personal.name}
              </h1>
              
              <h1
                className="text-[180px] font-bold leading-none uppercase tracking-[0.05em] relative drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                style={{ color: 'var(--dp-text)', fontFamily: "'Michroma', 'Archivo', system-ui, sans-serif" }}
              >
                {portfolioData.personal.name}
              </h1>
            </div>

            <div
              className="text-[28px] uppercase tracking-[0.2em] mb-16 inline-flex items-center gap-6"
              style={{ color: 'var(--dp-text-dim, #94a3b8)' }}
            >
              <span>Systems Designed For</span>
              <span
                className="font-bold relative inline-flex h-[1.35em] min-w-[12ch] overflow-hidden align-baseline"
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
            
            <div className="flex gap-16 border-t-4 border-b-4 py-8 px-16 backdrop-blur-md bg-slate-950/40" style={{ borderColor: 'var(--dp-accent)' }}>
              {([
                ['ROLE', 'Systems Builder'],
                ['TOL', '±0.0005" | 15 YRS'],
                ['STATUS', 'AVAILABLE'],
              ] as const).map(([key, val]) => (
                <div key={key} className="flex flex-col gap-2">
                  <span className="text-xl font-bold tracking-widest" style={{ color: 'var(--dp-accent)' }}>
                    {key}
                  </span>
                  <span className="text-2xl font-mono text-white tracking-wider">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Title Block — final camera stop in lower-right corner */}
        <TitleBlockStation />
      </div>
    </div>
  );
}

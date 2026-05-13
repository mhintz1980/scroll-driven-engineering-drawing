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

// Station stops — all unchanged from prior calibration
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

// Hero stop: compute scale so the 1600px-wide hero text block
// fits within 85% of viewport width (capped at 1.3).
const getHeroStop = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // hero text div is ~1600px wide × ~560px tall at native scale
  const scale = Math.min(vw * 0.85 / 1600, vh * 0.68 / 560, 1.3);
  return {
    x: vw / 2 - 2000 * scale,
    y: vh / 2 - 2000 * scale,
    scale,
    rotateX: 0,
  };
};

const getTitleBlockStop = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const tbCenterX = 6900;
  const tbCenterY = 6025;
  const scale = Math.min(1.2, vw * 0.85 / 1000);
  return {
    x: vw / 2 - tbCenterX * scale,
    y: vh / 2 - tbCenterY * scale,
    scale,
    rotateX: 0,
  };
};

// Ordered station definitions for the progress indicator
const STATION_DEFS = [
  { id: 'A', label: 'TRIGGER GUARD' },
  { id: 'B', label: 'BUFFER TUBE' },
  { id: 'C', label: 'PUMP PACKAGE' },
  { id: 'D', label: 'RENDERINGS' },
  { id: 'T', label: 'TITLE BLOCK' },
] as const;

const WORD_CYCLE = wordCycleData;

// Scroll trigger points (pixels past pin start)
const TRIGGER_A   = 600;
const TRIGGER_B   = 1800;
const TRIGGER_C   = 3200;
const TRIGGER_D   = 4600;
const TRIGGER_T   = 6200;

export function DrawingPackagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const substrateRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(0);
  // -1 = hero, 0-4 = stations A-T
  const [activeStation, setActiveStation] = useState<number>(-1);

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

      // ── Initial state ──────────────────────────────────────────
      gsap.set(substrateRef.current, {
        x: heroStop.x,
        y: heroStop.y,
        scale: heroStop.scale,
        rotateX: heroStop.rotateX,
      });
      gsap.set(bgLayerRef.current, { filter: 'invert(1) blur(0px)' });
      gsap.set(heroTextRef.current, { opacity: 0, y: 28 });

      // Auto-play hero text on load — no scroll needed
      gsap.to(heroTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        delay: 0.35,
        ease: 'power3.out',
      });

      // ── flyTo helper ────────────────────────────────────────────
      // Fires a self-paced whip-pan at a fixed duration.
      // Kills any in-progress tween before starting (no overlap).
      type Stop = { x: number; y: number; scale: number; rotateX: number };
      const flyTo = (stop: Stop, opts: { blur?: boolean; duration?: number } = {}) => {
        const { blur = true, duration = 1.45 } = opts;
        gsap.killTweensOf([substrateRef.current, bgLayerRef.current]);

        if (blur) {
          // Blur immediately as the whip-pan begins
          gsap.to(bgLayerRef.current, {
            filter: 'invert(1) blur(11px)',
            duration: 0.22,
            ease: 'none',
          });
          // Camera launches 80ms later — blur is already building
          gsap.to(substrateRef.current, {
            x: stop.x,
            y: stop.y,
            scale: stop.scale,
            rotateX: stop.rotateX,
            duration,
            ease: 'power4.inOut',
            delay: 0.08,
          });
          // Focus pull: sharpen as camera arrives (~last 35% of travel)
          gsap.to(bgLayerRef.current, {
            filter: 'invert(1) blur(0px)',
            duration: 0.38,
            ease: 'power1.out',
            delay: 0.08 + duration * 0.62,
          });
        } else {
          gsap.to(substrateRef.current, {
            x: stop.x,
            y: stop.y,
            scale: stop.scale,
            rotateX: stop.rotateX,
            duration,
            ease: 'power3.inOut',
          });
        }
      };

      // ── Station stop functions in order ──────────────────────────
      const STOPS: Array<() => Stop> = [
        getStationAStop,
        getStationBStop,
        getStationCStop,
        getStationDStop,
        getTitleBlockStop,
      ];
      const TRIGGERS_PX = [TRIGGER_A, TRIGGER_B, TRIGGER_C, TRIGGER_D, TRIGGER_T];
      let prevStation = -1;

      // ── Single pin + onUpdate — resolves cross-trigger timing issues ──
      // onUpdate fires on every scroll tick; station only changes when
      // the progress px crosses a threshold. flyTo is self-paced and
      // always plays at 1.45 s regardless of scroll speed.
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: '+=7000',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const px = self.progress * 7000;

          // Determine target station (-1 = hero zone)
          let targetStation = -1;
          for (let i = TRIGGERS_PX.length - 1; i >= 0; i--) {
            if (px >= TRIGGERS_PX[i]) { targetStation = i; break; }
          }

          if (targetStation === prevStation) return;

          const goingForward = targetStation > prevStation;
          prevStation = targetStation;

          if (targetStation === -1) {
            // Returned to hero zone
            flyTo(heroStop, { blur: false, duration: 1.05 });
            gsap.to(heroTextRef.current, {
              opacity: 1, y: 0, duration: 0.7, delay: 0.38, ease: 'power3.out',
            });
            setActiveStation(-1);
          } else {
            // Entering a station
            if (goingForward && targetStation === 0) {
              // First departure — fade out hero text
              gsap.killTweensOf(heroTextRef.current);
              gsap.to(heroTextRef.current, { opacity: 0, y: -45, duration: 0.42, ease: 'power2.in' });
            }
            flyTo(STOPS[targetStation](), {
              blur: goingForward,
              duration: goingForward ? 1.45 : 1.05,
            });
            setActiveStation(targetStation);
          }
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="drawing-package drawing-scene w-screen h-screen overflow-hidden bg-slate-950"
      style={{ perspective: '4000px', perspectiveOrigin: '50% 40%' }}
    >
      {/* Station progress indicator — right edge, engineering-callout style */}
      <div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[70] flex flex-col gap-3 pointer-events-none"
        aria-label="Section navigator"
        data-testid="station-progress-indicator"
      >
        {STATION_DEFS.map((s, i) => {
          const isActive = activeStation === i;
          const isVisited = activeStation > i;
          return (
            <div
              key={s.id}
              className="flex items-center gap-2 group"
              data-testid={`station-dot-${s.id}`}
            >
              {/* Label — slides in when active */}
              <span
                className="font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-300"
                style={{
                  color: isActive ? 'var(--dp-accent)' : 'transparent',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(6px)',
                  transitionProperty: 'color, opacity, transform',
                }}
              >
                {s.label}
              </span>
              {/* Tick mark */}
              <div
                className="flex items-center gap-1.5"
                style={{ transition: 'opacity 0.3s ease' }}
              >
                {/* Short horizontal rule — like a drawing callout tick */}
                <div
                  className="h-px transition-all duration-300"
                  style={{
                    width: isActive ? '16px' : '8px',
                    backgroundColor: isActive
                      ? 'var(--dp-accent)'
                      : isVisited
                        ? 'oklch(0.70 0.21 255 / 0.45)'
                        : 'oklch(0.50 0.01 245 / 0.5)',
                  }}
                />
                {/* Station ID box */}
                <div
                  className="font-mono text-[10px] font-bold tracking-wider transition-all duration-300"
                  style={{
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${isActive ? 'var(--dp-accent)' : isVisited ? 'oklch(0.70 0.21 255 / 0.4)' : 'oklch(0.50 0.01 245 / 0.35)'}`,
                    color: isActive ? 'var(--dp-accent)' : isVisited ? 'oklch(0.70 0.21 255 / 0.55)' : 'oklch(0.55 0.01 245 / 0.6)',
                    backgroundColor: isActive ? 'oklch(0.70 0.21 255 / 0.12)' : 'transparent',
                    boxShadow: isActive ? '0 0 8px oklch(0.70 0.21 255 / 0.25)' : 'none',
                  }}
                >
                  {s.id}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll hint — shown in hero zone, fades when first station fires */}
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500"
        style={{ opacity: activeStation === -1 ? 1 : 0 }}
        data-testid="scroll-hint"
      >
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--dp-text-dim)' }}>
          SCROLL TO ADVANCE
        </span>
        <div className="w-px h-8 overflow-hidden" style={{ backgroundColor: 'oklch(0.50 0.01 245 / 0.3)' }}>
          <div className="w-full h-4 animate-[dp-scroll-cue_1.8s_ease-in-out_infinite]" style={{ backgroundColor: 'var(--dp-accent)' }} />
        </div>
      </div>
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
          active={activeStation === 0}
        />
        {/* Station B — Buffer Tube Socket / Pistol Grip Mount */}
        <ProjectZone
          id="B"
          title="BUFFER TUBE SOCKET"
          top="833px"
          left="5567px"
          layout={STATION_B_LAYOUT}
          imageSrc={`${import.meta.env.BASE_URL}assets/images/Billet Receiver Set AR15.webp`}
          active={activeStation === 1}
        />
        {/* Station C — Industrial Dewatering Pump */}
        <ProjectZone
          id="C"
          title="INDUSTRIAL DEWATERING PUMP"
          top="4200px"
          left="3500px"
          layout={STATION_C_LAYOUT}
          imageSrc={`${import.meta.env.BASE_URL}assets/images/pump-package-04.webp`}
          active={activeStation === 2}
        />
        {/* Station D — Renderings & Visualizations */}
        <ProjectZone
          id="D"
          title="RENDERINGS"
          top="4000px"
          left="6800px"
          layout={STATION_D_LAYOUT}
          imageSrc={`${import.meta.env.BASE_URL}assets/images/rendering-06.webp`}
          active={activeStation === 3}
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

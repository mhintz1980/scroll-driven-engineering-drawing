import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ProjectZone } from './ProjectZone';
import type { ProjectZoneLayout } from './ProjectZone';
import { TitleBlockStation } from './TitleBlockStation';
import { wordCycleData, portfolioData } from '../../data/portfolioData';
import '../../styles/drawing-package.css';

// Dev-only debug hook — exposes GSAP for headless-test introspection.
// Tree-shaken in production builds.
if (import.meta.env.DEV && typeof window !== 'undefined') {
  (window as unknown as { __gsap?: typeof gsap }).__gsap = gsap;
}

// ── Substrate dimensions ─────────────────────────────────────────────
// Native SVG viewBox: 1625 × 1075.  White strokes on transparent.
// No runtime invert needed — the SVG is pre-inverted.
const SUBSTRATE_W = 1625;
const SUBSTRATE_H = 1075;
const SUBSTRATE_ASSET = 'Lower Receiver_Final.svg';
const SUBSTRATE_NEEDS_INVERT = false;
// Migration scale factors (old 8800×6800 → native 1625×1075):
//   X_SCALE = 5.415,  Y_SCALE = 6.326

// ── Camera targets ───────────────────────────────────────────────────
// Each target = a point on the substrate (in substrate-pixel coords) to
// CENTER under the viewport, plus a zoom and a settle tilt. No more
// magic-number drift across viewports — one math function handles all.
type Target = {
  id: string;
  label: string;
  cx: number;                          // substrate-x of camera target
  cy: number;                          // substrate-y of camera target
  scale: number | 'wide' | 'hero';     // zoom factor (numeric) or special
  rotateX: number;                     // perspective tilt in degrees
};

// Wide opening: fits the entire substrate within the viewport.
const WIDE: Target = {
  id: 'wide', label: 'WIDE',
  cx: SUBSTRATE_W / 2, cy: SUBSTRATE_H / 2,
  scale: 'wide', rotateX: 0,
};

// Hero: cinematic perspective on the central drawing area.
const HERO: Target = {
  id: 'hero', label: 'HERO',
  cx: 369, cy: 304,
  scale: 'hero', rotateX: 20,
};

// Project stations — listed in viewing order.
// Coordinates in native SVG space (1625×1075).  Scale 6.5 keeps the
// same visual framing as the old 1.2 on the 8800-wide substrate.
const STATIONS: Target[] = [
  { id: 'A', label: 'TRIGGER GUARD', cx: 291, cy: 528, scale: 6.5, rotateX: 10 },
  { id: 'B', label: 'BUFFER TUBE',   cx: 1048, cy: 134, scale: 6.5, rotateX: 35 },
  { id: 'C', label: 'PUMP PACKAGE',  cx: 678, cy: 692, scale: 6.5, rotateX:  8 },
  { id: 'D', label: 'RENDERINGS',    cx: 1288, cy: 661, scale: 6.5, rotateX: 12 },
  { id: 'T', label: 'TITLE BLOCK',   cx: 1274, cy: 953, scale: 6.5, rotateX:  0 },
];

// ── Station layouts ──────────────────────────────────────────────────
// Anchor = dot position within the 600×500 zone box.
// Circle offset = where the detail circle floats (CSS absolute, relative
// to zone origin).  These are starting values — Phase 3 calibration
// will tune them visually.
const STATION_A_LAYOUT: ProjectZoneLayout = {
  pathD: '',
  anchor: { x: 300, y: 250 },
  circleStyle: { position: 'absolute', top: '-60px', left: '280px' },
};
const STATION_B_LAYOUT: ProjectZoneLayout = {
  pathD: '',
  anchor: { x: 300, y: 250 },
  circleStyle: { position: 'absolute', top: '-80px', left: '300px' },
};
const STATION_C_LAYOUT: ProjectZoneLayout = {
  pathD: '',
  anchor: { x: 300, y: 250 },
  circleStyle: { position: 'absolute', top: '-40px', left: '320px' },
};
const STATION_D_LAYOUT: ProjectZoneLayout = {
  pathD: '',
  anchor: { x: 300, y: 250 },
  circleStyle: { position: 'absolute', top: '-60px', left: '300px' },
};

// ── Camera math ──────────────────────────────────────────────────────
type Stop = { x: number; y: number; scale: number; rotateX: number };

function computeScale(t: Target, vw: number, vh: number): number {
  if (t.scale === 'wide') {
    return Math.max(0.10, Math.min(vw * 0.88 / SUBSTRATE_W, vh * 0.88 / SUBSTRATE_H));
  }
  if (t.scale === 'hero') {
    // 295 ≈ 1600/5.415,  89 ≈ 560/6.326,  2.82 ≈ 0.52*5.415
    return Math.min(vw * 0.40 / 295, vh * 0.38 / 89, 2.82);
  }
  return t.scale;
}

function computeStop(t: Target, vw: number, vh: number): Stop {
  const scale = computeScale(t, vw, vh);
  return {
    x: vw / 2 - t.cx * scale,
    y: vh / 2 - t.cy * scale,
    scale,
    rotateX: t.rotateX,
  };
}

const WORD_CYCLE = wordCycleData;

export function DrawingPackagePage() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const substrateRef  = useRef<HTMLDivElement>(null);
  const bgLayerRef    = useRef<HTMLImageElement>(null);
  const heroRef       = useRef<HTMLDivElement>(null);
  const heroTextRef   = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(0);
  // -1 = hero, 0..STATIONS.length-1 = each station
  const [activeStation, setActiveStation] = useState<number>(-1);

  // ── Hero word cycle (independent of GSAP) ──────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % WORD_CYCLE.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // ── Body class lifecycle ───────────────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.add('drawing-package-route');
    document.body.classList.add('drawing-package-route');
    return () => {
      document.documentElement.classList.remove('drawing-package-route');
      document.body.classList.remove('drawing-package-route');
    };
  }, []);

  // ── Main cinematic state machine ───────────────────────────────────
  useLayoutEffect(() => {
    // currentIdx & isTransitioning live in the closure (not React state)
    // because they must be read synchronously from event handlers.
    let currentIdx = -1;
    let isTransitioning = true;          // intro starts immediately
    let bufferedDir: 1 | -1 | null = null;

    const setStation = (idx: number) => {
      currentIdx = idx;
      setActiveStation(idx);
    };

    const ctx = gsap.context(() => {
      // ─── Initial state ────────────────────────────────────────────
      const vw0 = window.innerWidth;
      const vh0 = window.innerHeight;
      gsap.set(substrateRef.current, computeStop(WIDE, vw0, vh0));
      if (SUBSTRATE_NEEDS_INVERT) {
        gsap.set(bgLayerRef.current, { filter: 'invert(1) blur(0px)' });
      } else {
        gsap.set(bgLayerRef.current, { filter: 'blur(0px)' });
      }

      const heroStop0 = computeStop(HERO, vw0, vh0);
      // Hero text counter-tilts the substrate's perspective so it stays face-on
      gsap.set(heroTextRef.current, { opacity: 0, rotateX: -heroStop0.rotateX });

      // Hero text children start hidden — sequential reveal during intro
      const superHeaderEl = heroTextRef.current?.querySelector('[data-hero="header"]');
      const nameWrapEl    = heroTextRef.current?.querySelector('[data-hero="name"]');
      const subtitleEl    = heroTextRef.current?.querySelector('[data-hero="subtitle"]');
      const specEl        = heroTextRef.current?.querySelector('[data-hero="spec"]');
      if (superHeaderEl) gsap.set(superHeaderEl, { opacity: 0, x: -40 });
      if (nameWrapEl)    gsap.set(nameWrapEl,    { clipPath: 'inset(0 100% 0 0)' });
      if (subtitleEl)    gsap.set(subtitleEl,    { opacity: 0, x: -20 });
      if (specEl)        gsap.set(specEl,        { opacity: 0, y: 18 });

      // ─── Helper: blur the substrate (focus pull) ──────────────────
      const blurFilter = (px: number) =>
        SUBSTRATE_NEEDS_INVERT ? `invert(1) blur(${px}px)` : `blur(${px}px)`;

      // ─── Intro: wide → hero, then unroll hero text ────────────────
      const introTl = gsap.timeline({ delay: 0.25 });
      introTl
        .to(substrateRef.current, {
          ...heroStop0,
          duration: 1.35, ease: 'power3.inOut',
        })
        .set(heroTextRef.current!, { opacity: 1 });
      if (superHeaderEl) introTl.to(superHeaderEl, { opacity: 1, x: 0, duration: 0.42, ease: 'power2.out' });
      if (nameWrapEl)    introTl.to(nameWrapEl,    { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut' }, '<0.1');
      if (subtitleEl)    introTl.to(subtitleEl,    { opacity: 1, x: 0, duration: 0.48, ease: 'power2.out' }, '<0.52');
      if (specEl)        introTl.to(specEl,        { opacity: 1, y: 0, duration: 0.44, ease: 'power2.out' }, '<0.32');

      // ─── flyTo helpers ────────────────────────────────────────────
      // Rollercoaster: cinematic forward whip with overshoot + settle.
      // 1. Camera flattens (rotateX → 0) — "aimed straight down the track"
      // 2. Blur builds as the whip launches
      // 3. HARD power4.out whip OVERSHOOTS the target
      // 4. Blur clears as the camera arrives
      // 5. SETTLES back to exact target with the station's calibrated tilt
      const flyToRollercoaster = (target: Target, opts: {
        whipDuration?: number;
        settleDuration?: number;
        overshootScale?: number;
        overshootPx?: number;
      } = {}) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const stop = computeStop(target, vw, vh);
        const {
          whipDuration = 1.05,
          settleDuration = 0.5,
          overshootScale = 0.07,
          overshootPx = 90,
        } = opts;

        // Direction of travel: substrate moves opposite to the camera
        // motion. We pull the substrate slightly PAST the final stop in
        // the same direction the camera is moving.
        const currentSubX = parseFloat(gsap.getProperty(substrateRef.current, 'x') as string) || 0;
        const currentSubY = parseFloat(gsap.getProperty(substrateRef.current, 'y') as string) || 0;
        const dx = stop.x - currentSubX;
        const dy = stop.y - currentSubY;
        const dirX = Math.sign(dx) || -1;
        const dirY = Math.sign(dy) || -1;

        const FLATTEN_AT  = 0;
        const BLUR_AT     = 0.18;
        const WHIP_AT     = 0.30;
        const WHIP_END    = WHIP_AT + whipDuration;
        const BLUR_CLR    = WHIP_END - 0.34;
        const SETTLE_AT   = WHIP_END + 0.04;

        return gsap.timeline()
          .to(substrateRef.current, { rotateX: 0, duration: 0.42, ease: 'power2.in' }, FLATTEN_AT)
          .to(bgLayerRef.current,   { filter: blurFilter(14), duration: 0.28, ease: 'power1.in' }, BLUR_AT)
          .to(substrateRef.current, {
            x: stop.x + dirX * overshootPx,
            y: stop.y + dirY * overshootPx * 0.65,
            scale: stop.scale * (1 + overshootScale),
            rotateX: 0,
            duration: whipDuration,
            ease: 'power4.out',
          }, WHIP_AT)
          .to(bgLayerRef.current, { filter: blurFilter(0), duration: 0.35, ease: 'power1.out' }, BLUR_CLR)
          .to(substrateRef.current, {
            x: stop.x, y: stop.y, scale: stop.scale, rotateX: stop.rotateX,
            duration: settleDuration, ease: 'power2.inOut',
          }, SETTLE_AT);
      };

      // Backward: softer reverse without overshoot or blur.
      const flyToReverse = (target: Target) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const stop = computeStop(target, vw, vh);
        return gsap.timeline()
          .to(substrateRef.current, {
            x: stop.x, y: stop.y, scale: stop.scale, rotateX: stop.rotateX,
            duration: 0.95, ease: 'power3.inOut',
          });
      };

      // Hero entry/exit — handles text reveal alongside the camera move.
      const flyToHero = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const stop = computeStop(HERO, vw, vh);
        gsap.set(heroTextRef.current, { rotateX: -stop.rotateX });
        return gsap.timeline()
          .to(substrateRef.current, {
            x: stop.x, y: stop.y, scale: stop.scale, rotateX: stop.rotateX,
            duration: 1.05, ease: 'power3.inOut',
          })
          .to(heroTextRef.current, {
            opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
          }, '-=0.35');
      };

      const exitHeroAndFlyTo = (target: Target) => {
        // Hero text peels up & out, then standard rollercoaster.
        gsap.to(heroTextRef.current, {
          opacity: 0, y: -45, duration: 0.38, ease: 'power2.in',
        });
        return flyToRollercoaster(target, { whipDuration: 1.12, settleDuration: 0.52 });
      };

      // ─── State-machine controller ────────────────────────────────
      const advance = (dir: 1 | -1) => {
        if (isTransitioning) {
          // Buffer at most ONE input — overwrite any previous buffer.
          bufferedDir = dir;
          return;
        }
        const nextIdx = currentIdx + dir;
        if (nextIdx < -1 || nextIdx >= STATIONS.length) return; // clamp

        const prevIdx = currentIdx;
        setStation(nextIdx);
        isTransitioning = true;

        // Kill anything in flight on these targets before starting new tween
        gsap.killTweensOf([substrateRef.current, bgLayerRef.current, heroTextRef.current]);

        let tl: gsap.core.Timeline;
        if (nextIdx === -1) {
          // Back to hero
          tl = flyToHero();
        } else if (dir === 1 && prevIdx === -1) {
          // Hero → first station: peel hero text away during the whip
          tl = exitHeroAndFlyTo(STATIONS[nextIdx]);
        } else if (dir === 1) {
          // Forward station-to-station: tighten whip slightly for later stations
          const tightening = Math.min(nextIdx * 0.03, 0.12);
          tl = flyToRollercoaster(STATIONS[nextIdx], {
            whipDuration: 1.05 - tightening,
            settleDuration: 0.5,
          });
        } else {
          // Backward: softer reverse
          tl = flyToReverse(STATIONS[nextIdx]);
        }

        tl.eventCallback('onComplete', () => {
          isTransitioning = false;
          if (bufferedDir !== null) {
            const d = bufferedDir;
            bufferedDir = null;
            advance(d);
          }
        });
      };

      // When the intro completes, unlock input.
      introTl.eventCallback('onComplete', () => {
        isTransitioning = false;
        if (bufferedDir !== null) {
          const d = bufferedDir;
          bufferedDir = null;
          advance(d);
        }
      });

      // ─── Input listeners ──────────────────────────────────────────
      // Wheel: debounced. Trackpads emit 60Hz tiny deltas during a single
      // flick — collapse those into a single advance. We open a fresh
      // cooldown window each time we see fresh strong wheel motion.
      let wheelCooldownUntil = 0;
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (Math.abs(e.deltaY) < 8) return;          // ignore micro-deltas
        const now = performance.now();
        if (now < wheelCooldownUntil) return;
        wheelCooldownUntil = now + 380;              // 380ms input lockout
        advance(e.deltaY > 0 ? 1 : -1);
      };

      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          advance(1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          advance(-1);
        }
      };

      // Touch: simple Y-swipe with 40px threshold
      let touchStartY = 0;
      const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
      const onTouchEnd = (e: TouchEvent) => {
        const dy = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(dy) > 40) advance(dy > 0 ? 1 : -1);
      };

      // Resize: recompute and SNAP to current target (no animation).
      const onResize = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const target = currentIdx === -1 ? HERO : STATIONS[currentIdx];
        const stop = computeStop(target, vw, vh);
        gsap.set(substrateRef.current, stop);
        if (currentIdx === -1) {
          gsap.set(heroTextRef.current, { rotateX: -stop.rotateX });
        }
      };

      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('keydown', onKey);
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
      window.addEventListener('resize', onResize);

      // Cleanup is registered with the context — runs on ctx.revert()
      return () => {
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('resize', onResize);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── Render ─────────────────────────────────────────────────────────
  // Build the substrate filter declaratively so toggling SUBSTRATE_NEEDS_INVERT
  // re-renders the bg layer correctly.
  const substrateImgStyle: React.CSSProperties = {
    width: `${SUBSTRATE_W}px`,
    height: `${SUBSTRATE_H}px`,
    opacity: 0.9,
    ...(SUBSTRATE_NEEDS_INVERT
      ? { filter: 'invert(1)', mixBlendMode: 'screen' as const }
      : {}),
  };

  return (
    <div
      ref={containerRef}
      className="drawing-package drawing-scene w-screen h-screen overflow-hidden bg-slate-950"
      style={{ perspective: '4000px', perspectiveOrigin: '50% 40%' }}
      data-testid="drawing-package-scene"
    >
      {/* Station progress indicator — engineering callout style */}
      <div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[70] flex flex-col gap-3 pointer-events-none"
        aria-label="Section navigator"
        data-testid="station-progress-indicator"
      >
        {STATIONS.map((s, i) => {
          const isActive = activeStation === i;
          const isVisited = activeStation > i;
          return (
            <div
              key={s.id}
              className="flex items-center gap-2 group"
              data-testid={`station-dot-${s.id}`}
            >
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
              <div className="flex items-center gap-1.5" style={{ transition: 'opacity 0.3s ease' }}>
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
                <div
                  className="font-mono text-[10px] font-bold tracking-wider transition-all duration-300"
                  style={{
                    width: '20px', height: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
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

      {/* Input hint — shown in hero zone, fades when first station fires */}
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500"
        style={{ opacity: activeStation === -1 ? 1 : 0 }}
        data-testid="scroll-hint"
      >
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--dp-text-dim)' }}>
          SCROLL · ↓ · TAP TO ADVANCE
        </span>
        <div className="w-px h-8 overflow-hidden" style={{ backgroundColor: 'oklch(0.50 0.01 245 / 0.3)' }}>
          <div className="w-full h-4 animate-[dp-scroll-cue_1.8s_ease-in-out_infinite]" style={{ backgroundColor: 'var(--dp-accent)' }} />
        </div>
      </div>

      {/* Substrate — the giant CAD drawing layer that the camera moves over */}
      <div
        ref={substrateRef}
        className="origin-top-left relative"
        style={{
          width: `${SUBSTRATE_W}px`,
          height: `${SUBSTRATE_H}px`,
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          ref={bgLayerRef}
          src={`${import.meta.env.BASE_URL}assets/images/${SUBSTRATE_ASSET}`}
          className="absolute inset-0 pointer-events-none select-none"
          style={substrateImgStyle}
          alt=""
          aria-hidden="true"
        />

        <ProjectZone
          id="A"
          title="TRIGGER GUARD RADIUS"
          top="278px"
          left="-9px"
          layout={STATION_A_LAYOUT}
          imageSrc={`${import.meta.env.BASE_URL}assets/images/torque-wrench-03.webp`}
          active={activeStation === 0}
        />
        <ProjectZone
          id="B"
          title="BUFFER TUBE SOCKET"
          top="-116px"
          left="748px"
          layout={STATION_B_LAYOUT}
          imageSrc={`${import.meta.env.BASE_URL}assets/images/Billet Receiver Set AR15.webp`}
          active={activeStation === 1}
        />
        <ProjectZone
          id="C"
          title="INDUSTRIAL DEWATERING PUMP"
          top="442px"
          left="378px"
          layout={STATION_C_LAYOUT}
          imageSrc={`${import.meta.env.BASE_URL}assets/images/pump-package-04.webp`}
          active={activeStation === 2}
        />
        <ProjectZone
          id="D"
          title="RENDERINGS"
          top="411px"
          left="988px"
          layout={STATION_D_LAYOUT}
          imageSrc={`${import.meta.env.BASE_URL}assets/images/rendering-06.webp`}
          active={activeStation === 3}
        />

        {/* Hero text — pinned on substrate, counter-tilted to face the camera.
            Sizes are in substrate-pixels (tiny) because camera zoom ≈1.7 scales
            them up to readable screen-pixels. */}
        <div
          ref={heroRef}
          className="absolute"
          style={{ left: '369px', top: '304px', transformStyle: 'preserve-3d' }}
        >
          <div
            ref={heroTextRef}
            className="flex flex-col items-center justify-center w-[295px] -translate-x-1/2 -translate-y-1/2 pointer-events-none origin-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              data-hero="header"
              className="text-[6px] uppercase tracking-[0.4em] mb-[1.5px] font-bold"
              style={{ color: 'var(--dp-accent)' }}
            >
              {portfolioData.personal.superHeader}
            </div>

            <div data-hero="name" className="relative mb-[2px]">
              <h1
                className="text-[33px] font-bold leading-none uppercase tracking-[0.05em] absolute top-[0.4px] left-[0.4px] blur-xs opacity-50"
                style={{ color: 'var(--dp-accent)', fontFamily: "'Michroma', 'Archivo', system-ui, sans-serif" }}
              >
                {portfolioData.personal.name}
              </h1>
              <h1
                className="text-[33px] font-bold leading-none uppercase tracking-[0.05em] relative drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
                style={{ color: 'var(--dp-text)', fontFamily: "'Michroma', 'Archivo', system-ui, sans-serif" }}
              >
                {portfolioData.personal.name}
              </h1>
            </div>

            <div
              data-hero="subtitle"
              className="text-[5px] uppercase tracking-[0.2em] mb-[3px] inline-flex items-center gap-px"
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

            <div
              data-hero="spec"
              className="flex gap-[3px] border-t border-b py-[1.5px] px-[3px] backdrop-blur-[1px] bg-slate-950/40"
              style={{ borderColor: 'var(--dp-accent)' }}
            >
              {([
                ['ROLE',   'Systems Builder'],
                ['TOL',    '±0.0005" | 15 YRS'],
                ['STATUS', 'AVAILABLE'],
              ] as const).map(([key, val]) => (
                <div key={key} className="flex flex-col gap-[0.5px]">
                  <span className="text-[3.5px] font-bold tracking-widest" style={{ color: 'var(--dp-accent)' }}>{key}</span>
                  <span className="text-[4.5px] font-mono text-white tracking-wider">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <TitleBlockStation active={activeStation === 4} />
      </div>
    </div>
  );
}

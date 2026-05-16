import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';

const S = 0.1846;
const DETAIL_Z = 75 * S;

// Oversample factor — the zone renders at ZONE_SCALE× CSS dimensions
// then counter-scales to its original footprint.  This gives the GPU
// 4× more pixels before CSS 3D transforms magnify the raster.
const ZONE_SCALE = 4;
const DETAIL_CIRCLE_SIZE = 148 * S * ZONE_SCALE;
const LABEL_WIDTH = 104;
const LABEL_GAP = 12 * S * ZONE_SCALE;

export interface ProjectZoneLayout {
  pathD: string; // Kept for interface compatibility but we will use dynamic 3D lines
  anchor: {
    x: number;
    y: number;
  };
  circleStyle: CSSProperties;
  circleScale?: {
    x: number;
    y: number;
  };
}

export interface ProjectZoneProps {
  id: string;
  title: string;
  top: string;
  left: string;
  layout: ProjectZoneLayout;
  imageSrc?: string;
  videoSrc?: string;
  cameraRotateX?: number;
  projectionMode?: boolean;
  /** Set to true when the camera arrives at this station to trigger the intro animation */
  active?: boolean;
}

export function ProjectZone({
  id,
  title,
  top,
  left,
  layout,
  imageSrc,
  videoSrc,
  cameraRotateX = 0,
  projectionMode = false,
  active,
}: ProjectZoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const dotInnerRef = useRef<SVGCircleElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  
  const hasTriggered = useRef(false);
  const hasMounted = useRef(false);
  // Stable ref to the intro function so it can be called from multiple effects
  const playIntroRef = useRef<(() => void) | null>(null);
  const resetZoneRef = useRef<(() => void) | null>(null);
  const calibrationMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('calibrate');
  const circleScaleX = layout.circleScale?.x ?? 1;
  const circleScaleY = layout.circleScale?.y ?? 1;
  const detailSize = projectionMode ? 24 * S * ZONE_SCALE : DETAIL_CIRCLE_SIZE;

  const [lineMath, setLineMath] = useState({ L: 0, x1: 0, y1: 0, x2: 0, y2: 0 });

  // Calculate 3D line geometry connecting anchor to circle center
  useEffect(() => {
    const updateLine = () => {
      if (!circleRef.current) return;
      const anchorX = layout.anchor.x * ZONE_SCALE;
      const anchorY = layout.anchor.y * ZONE_SCALE;
      const circleTop = projectionMode
        ? anchorY - detailSize / 2
        : (parseInt(layout.circleStyle.top as string, 10) || 0) * ZONE_SCALE;
      const circleLeft = projectionMode
        ? anchorX - detailSize / 2
        : (parseInt(layout.circleStyle.left as string, 10) || 0) * ZONE_SCALE;
      const radius = detailSize / 2;

      const cx = circleLeft + radius;
      const cy = circleTop + radius;

      const dx = cx - anchorX;
      const dy = cy - anchorY;
      const L = Math.sqrt(dx * dx + dy * dy);
      const nextLineMath = { L, x1: anchorX, y1: anchorY, x2: cx, y2: cy };

      setLineMath(nextLineMath);
      if (lineRef.current) {
        lineRef.current.style.strokeDasharray = `${nextLineMath.L}`;
        lineRef.current.style.strokeDashoffset = `${hasTriggered.current ? 0 : nextLineMath.L}`;
      }
    };

    updateLine();
    window.addEventListener('resize', updateLine);
    // Observe circle size changes directly
    const ro = new ResizeObserver(updateLine);
    if (circleRef.current) ro.observe(circleRef.current);
    
    return () => {
      window.removeEventListener('resize', updateLine);
      ro.disconnect();
    };
  }, [layout]);

  useLayoutEffect(() => {
    const resetZone = () => {
      if (dotRef.current && dotInnerRef.current && circleRef.current && labelRef.current && textRef.current && lineRef.current) {
        gsap.killTweensOf([
          dotRef.current,
          dotInnerRef.current,
          circleRef.current,
          labelRef.current,
          textRef.current,
          lineRef.current
        ]);

        gsap.set([dotRef.current, dotInnerRef.current], { scale: 0, opacity: 0, transformOrigin: 'center' });
        gsap.set(circleRef.current, {
          scaleX: 0,
          scaleY: 0,
          opacity: 0,
          rotateX: -cameraRotateX,
          rotationZ: -45,
          z: 0,
        });
        gsap.set(labelRef.current, { x: -8 * ZONE_SCALE, yPercent: -50, opacity: 0 });
        gsap.set(textRef.current, { opacity: 0, filter: 'blur(4px)' });
        gsap.set(lineRef.current, {
          opacity: 0,
          strokeDasharray: lineMath.L,
          strokeDashoffset: lineMath.L,
        });
      }
    };

    resetZone();
    resetZoneRef.current = resetZone;
    const container = containerRef.current;
    if (!container) return undefined;

    const playZoneIntro = () => {
      if (!dotRef.current || !dotInnerRef.current || !circleRef.current || !labelRef.current || !textRef.current || !lineRef.current) {
        return;
      }

      resetZone();

      const tl = gsap.timeline();
      // 1. Anchor dot appears on the blueprint
      tl.to([dotRef.current, dotInnerRef.current], {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(2.5)',
      })
      // 2. 3D Line shoots out from the dot to the target Z
      .to(lineRef.current, {
        strokeDashoffset: 0,
        opacity: 0.95,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.1')
      // 3. Detail circle scales up and lifts off the substrate to meet the line
      .to(
        circleRef.current,
        {
          scaleX: projectionMode ? 1 : circleScaleX,
          scaleY: projectionMode ? 1 : circleScaleY,
          opacity: 1,
          z: projectionMode ? 1 : DETAIL_Z * ZONE_SCALE,
          rotateX: -cameraRotateX,
          rotationZ: 0,
          duration: projectionMode ? 0.62 : 1.2,
          ease: 'expo.out',
        },
        '-=0.4',
      )
      // 4. Content inside circle fades in
      .to(
        textRef.current,
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.4,
          ease: 'power1.out',
        },
        '-=0.8',
      )
      // 5. Label flips down
      .to(
        labelRef.current,
        {
          x: 0,
          yPercent: -50,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.6',
      );
    };

    // Store the intro function in a ref so the active-prop watcher can call it
    playIntroRef.current = playZoneIntro;

    if (calibrationMode) {
      if (dotRef.current && dotInnerRef.current && circleRef.current && labelRef.current && textRef.current && lineRef.current) {
        gsap.set([dotRef.current, dotInnerRef.current], { scale: 1, opacity: 1, transformOrigin: 'center' });
        gsap.set(circleRef.current, {
          scaleX: circleScaleX,
          scaleY: circleScaleY,
          opacity: 1,
          rotateX: -cameraRotateX,
          rotationZ: 0,
          z: projectionMode ? 1 : DETAIL_Z * ZONE_SCALE,
        });
        gsap.set(labelRef.current, { x: 0, yPercent: -50, opacity: 1 });
        gsap.set(textRef.current, { opacity: 1, filter: 'blur(0px)' });
        gsap.set(lineRef.current, { strokeDasharray: lineMath.L, strokeDashoffset: 0, opacity: 0.95 });
      }
      return undefined;
    }

    return undefined;
  }, [layout, calibrationMode, cameraRotateX, circleScaleX, circleScaleY, lineMath.L]);

  // The active prop is canonical. Skip the first passive effect so inactive
  // zones never play their enter animation while the hero is mounting.
  useEffect(() => {
    if (calibrationMode) return;

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (active && !hasTriggered.current && playIntroRef.current) {
      hasTriggered.current = true;
      playIntroRef.current();
    } else if (!active) {
      hasTriggered.current = false;
      resetZoneRef.current?.();
    }
  }, [active, calibrationMode]);

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        top, left,
        width: `${600 * ZONE_SCALE}px`,
        height: `${500 * ZONE_SCALE}px`,
        transformStyle: 'preserve-3d',
        transformOrigin: '0 0',
        transform: `scale(${1 / ZONE_SCALE})`,
      }}
      data-zone-id={id}
    >
      {calibrationMode ? (
        <div className="absolute inset-0 border border-amber-400/60" />
      ) : null}
      
      {/* SVG leader line from blueprint anchor to floating detail view */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        fill="none"
        viewBox={`0 0 ${600 * ZONE_SCALE} ${500 * ZONE_SCALE}`}
        style={{
          zIndex: 12,
          transformStyle: 'preserve-3d',
        }}
        data-zone-line={id}
      >
        <line
          ref={lineRef}
          x1={lineMath.x1}
          y1={lineMath.y1}
          x2={lineMath.x2}
          y2={lineMath.y2}
          opacity="0"
          stroke="oklch(0.70 0.21 255)"
          strokeWidth={Math.max(1.5, 2 * S * ZONE_SCALE)}
          strokeLinecap="round"
          strokeDasharray={lineMath.L}
          strokeDashoffset={lineMath.L}
          vectorEffect="non-scaling-stroke"
          filter="drop-shadow(0 0 8px rgba(59,130,246,0.85))"
        />
      </svg>

      {/* The Anchor Dot (Flat on substrate at Z=0) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        fill="none"
        viewBox={`0 0 ${600 * ZONE_SCALE} ${500 * ZONE_SCALE}`}
        data-zone-anchor={id}
      >
        <circle
          ref={dotRef}
          cx={layout.anchor.x * ZONE_SCALE}
          cy={layout.anchor.y * ZONE_SCALE}
          r={8 * S * ZONE_SCALE}
          className="fill-slate-900 scale-0 opacity-0 transform-origin-center"
          stroke="oklch(0.70 0.21 255)"
          strokeWidth={3 * S * ZONE_SCALE}
        />
        <circle
          ref={dotInnerRef}
          cx={layout.anchor.x * ZONE_SCALE}
          cy={layout.anchor.y * ZONE_SCALE}
          r={3 * S * ZONE_SCALE}
          className="fill-blue-400 scale-0 opacity-0 transform-origin-center"
        />
      </svg>

      {/* The Detail Circle (Elevates to Z) */}
      <div
        ref={circleRef}
        className="absolute rounded-full bg-slate-900/90 backdrop-blur-sm pointer-events-auto flex items-center justify-center flex-col opacity-0 group"
        style={{
          position: 'absolute',
          top: projectionMode
            ? `${layout.anchor.y * ZONE_SCALE - detailSize / 2}px`
            : `${(parseInt(layout.circleStyle.top as string, 10) || 0) * ZONE_SCALE}px`,
          left: projectionMode
            ? `${layout.anchor.x * ZONE_SCALE - detailSize / 2}px`
            : `${(parseInt(layout.circleStyle.left as string, 10) || 0) * ZONE_SCALE}px`,
          width: `${detailSize}px`,
          height: `${detailSize}px`,
          border: `${0.5 * S * ZONE_SCALE}px solid oklch(0.70 0.21 255)`,
          boxShadow: projectionMode
            ? `0 0 ${14 * S * ZONE_SCALE}px rgba(59,130,246,0.65), inset 0 0 ${5 * S * ZONE_SCALE}px rgba(59,130,246,0.4)`
            : `0 ${4 * S * ZONE_SCALE}px ${10 * S * ZONE_SCALE}px rgba(0,0,0,0.5), 0 0 ${8 * S * ZONE_SCALE}px rgba(59,130,246,0.3), inset 0 0 ${4 * S * ZONE_SCALE}px rgba(59,130,246,0.2)`,
          transformStyle: 'preserve-3d',
          zIndex: 20,
          display: projectionMode ? 'none' : undefined,
        }}
        data-zone-circle={id}
      >
        {/* Inner rings for technical aesthetic */}
        <div
          className="absolute rounded-full border-dashed animate-[spin_60s_linear_infinite]"
          style={{
            inset: `${4 * S * ZONE_SCALE}px`,
            border: `${0.5 * S * ZONE_SCALE}px dashed oklch(0.70 0.21 255 / 0.4)`,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            inset: `${8 * S * ZONE_SCALE}px`,
            border: `${0.5 * S * ZONE_SCALE}px solid oklch(0.70 0.21 255 / 0.2)`,
          }}
        />

        {/* Diagonal hashing pattern background */}
        <div className="absolute inset-0 rounded-full opacity-10" 
             style={{ 
               backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent ${5 * S * ZONE_SCALE}px, #3b82f6 ${5 * S * ZONE_SCALE}px, #3b82f6 ${6 * S * ZONE_SCALE}px)` 
             }} 
        />

        {/* Reticle / Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full bg-blue-500/30" style={{ height: `${1 * S * ZONE_SCALE}px` }} />
          <div className="absolute bg-blue-500/30" style={{ width: `${1 * S * ZONE_SCALE}px`, height: '100%' }} />
          <div className="rounded-full" style={{ width: `${8 * S * ZONE_SCALE}px`, height: `${8 * S * ZONE_SCALE}px`, border: `${0.5 * S * ZONE_SCALE}px solid oklch(0.70 0.21 255 / 0.5)` }} />
        </div>

        {/* Project Image / Video */}
        <div
          ref={textRef}
          className="z-10 opacity-0 absolute rounded-full overflow-hidden"
          style={{
            inset: projectionMode ? 0 : `${6 * S * ZONE_SCALE}px`,
            border: projectionMode ? 'none' : `${0.5 * S * ZONE_SCALE}px solid oklch(0.70 0.21 255 / 0.3)`,
            display: projectionMode ? 'none' : undefined,
          }}
        >
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover mix-blend-luminosity opacity-80 scale-105 group-hover:scale-100 transition-transform duration-700"
            />
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover mix-blend-luminosity opacity-80 scale-105 group-hover:scale-100 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-400/80 font-mono tracking-[0.2em] bg-slate-900/50" style={{ fontSize: `${2 * S * ZONE_SCALE}px`, border: `${0.5 * S * ZONE_SCALE}px solid oklch(0.70 0.21 255 / 0.2)` }}>
              CAD_SPIN_RENDER.mp4
            </div>
          )}
        </div>

        <div
          ref={labelRef}
          className="zone-label-typeset-v1 absolute opacity-0 bg-slate-900/95 backdrop-blur-sm flex flex-row items-center whitespace-normal group-hover:scale-105 transition-all duration-300 ease-out"
          style={{
            top: '50%',
            left: `calc(100% + ${LABEL_GAP}px)`,
            width: `${LABEL_WIDTH}px`,
            padding: `${2 * ZONE_SCALE}px ${4.5 * ZONE_SCALE}px`,
            gap: `${2.75 * ZONE_SCALE}px`,
            border: `${0.5 * S * ZONE_SCALE}px solid oklch(0.70 0.21 255)`,
            boxShadow: `0 ${2 * S * ZONE_SCALE}px ${6 * S * ZONE_SCALE}px rgba(0,0,0,0.5), 0 0 ${4 * S * ZONE_SCALE}px rgba(59,130,246,0.3)`,
            transformStyle: 'preserve-3d',
            zIndex: 30,
            display: projectionMode ? 'none' : undefined,
          }}
          data-zone-label={id}
        >
          <div
            className="zone-label-typeset-v1__id flex items-center justify-center bg-blue-500 text-slate-900 font-mono font-bold"
            style={{
              height: `${3.1 * ZONE_SCALE}px`,
              minWidth: `${3.1 * ZONE_SCALE}px`,
              borderRadius: `${0.4 * ZONE_SCALE}px`,
            }}
          >
            {id}
          </div>
          <div className="flex min-w-0 flex-col justify-center" style={{ gap: `${0.8 * ZONE_SCALE}px` }}>
            <div className="zone-label-typeset-v1__title text-slate-100 font-mono font-bold uppercase">
              {title}
            </div>
            <div className="zone-label-typeset-v1__rule bg-blue-400/70" style={{ width: `${12 * ZONE_SCALE}px`, height: `${0.35 * S * ZONE_SCALE}px` }} />
          </div>
          <div className="absolute top-0 left-0" style={{ width: `${1.5 * ZONE_SCALE}px`, height: `${1.5 * ZONE_SCALE}px`, borderTop: `${0.5 * S * ZONE_SCALE}px solid oklch(0.80 0.15 255)`, borderLeft: `${0.5 * S * ZONE_SCALE}px solid oklch(0.80 0.15 255)` }} />
          <div className="absolute bottom-0 right-0" style={{ width: `${1.5 * ZONE_SCALE}px`, height: `${1.5 * ZONE_SCALE}px`, borderBottom: `${0.5 * S * ZONE_SCALE}px solid oklch(0.80 0.15 255)`, borderRight: `${0.5 * S * ZONE_SCALE}px solid oklch(0.80 0.15 255)` }} />
        </div>
      </div>
    </div>
  );
}

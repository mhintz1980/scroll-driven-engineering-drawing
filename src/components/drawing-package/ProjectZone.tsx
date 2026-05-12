import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';

export interface ProjectZoneLayout {
  pathD: string; // Kept for interface compatibility but we will use dynamic 3D lines
  anchor: {
    x: number;
    y: number;
  };
  circleStyle: CSSProperties;
}

export interface ProjectZoneProps {
  id: string;
  title: string;
  top: string;
  left: string;
  layout: ProjectZoneLayout;
  imageSrc?: string;
}

export function ProjectZone({ id, title, top, left, layout, imageSrc }: ProjectZoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const dotInnerRef = useRef<SVGCircleElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  const hasTriggered = useRef(false);
  const calibrationMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('calibrate');

  const [lineMath, setLineMath] = useState({ L: 0, aZ: 0, aY: 0 });

  // Calculate 3D line geometry connecting anchor to circle center
  useEffect(() => {
    const updateLine = () => {
      if (!circleRef.current) return;
      const circleTop = parseInt(layout.circleStyle.top as string, 10) || 0;
      const circleLeft = parseInt(layout.circleStyle.left as string, 10) || 0;
      // Get actual width from DOM for responsive clamp()
      const radius = circleRef.current.offsetWidth / 2;
      
      const cx = circleLeft + radius;
      const cy = circleTop + radius;
      
      const dx = cx - layout.anchor.x;
      const dy = cy - layout.anchor.y;
      const dz = 400; // Target Z elevation
      
      const L = Math.sqrt(dx*dx + dy*dy + dz*dz);
      const aZ = Math.atan2(dy, dx);
      const aY = Math.asin(dz / L);
      
      setLineMath({ L, aZ, aY });
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
        gsap.set(circleRef.current, { scale: 0, opacity: 0, rotationZ: -45, z: 0 });
        gsap.set(labelRef.current, { y: 20, opacity: 0, rotateX: 90 });
        gsap.set(textRef.current, { opacity: 0, filter: 'blur(4px)' });
        gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });
      }
    };

    resetZone();
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
        scaleX: 1,
        opacity: 0.8,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.1')
      // 3. Detail circle scales up AND translates to Z=400 to meet the line
      .to(
        circleRef.current,
        {
          scale: 1,
          opacity: 1,
          z: 400,
          rotationZ: 0,
          duration: 1.2,
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
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.6',
      );
    };

    if (calibrationMode) {
      if (dotRef.current && dotInnerRef.current && circleRef.current && labelRef.current && textRef.current && lineRef.current) {
        gsap.set([dotRef.current, dotInnerRef.current], { scale: 1, opacity: 1, transformOrigin: 'center' });
        gsap.set(circleRef.current, { scale: 1, opacity: 1, rotationZ: 0, z: 400 });
        gsap.set(labelRef.current, { y: 0, opacity: 1, rotateX: 0 });
        gsap.set(textRef.current, { opacity: 1, filter: 'blur(0px)' });
        gsap.set(lineRef.current, { scaleX: 1, opacity: 0.8 });
      }
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true;
            playZoneIntro();
            observer.unobserve(container);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [layout, calibrationMode]);

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none w-[600px] h-[500px]"
      style={{ top, left, transformStyle: 'preserve-3d' }}
      data-zone-id={id}
    >
      {calibrationMode ? (
        <div className="absolute inset-0 border border-amber-400/60" />
      ) : null}
      
      {/* 3D Connecting Line */}
      <div 
        ref={lineRef}
        className="absolute h-0.5 bg-blue-400 origin-left shadow-[0_0_10px_rgba(59,130,246,0.8)] opacity-0"
        style={{
          left: layout.anchor.x,
          top: layout.anchor.y,
          width: lineMath.L,
          transform: `rotateZ(${lineMath.aZ}rad) rotateY(${-lineMath.aY}rad)`,
          transformStyle: 'preserve-3d',
        }}
      />

      {/* The Anchor Dot (Flat on substrate at Z=0) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" fill="none" viewBox="0 0 600 500">
        <circle
          ref={dotRef}
          cx={layout.anchor.x}
          cy={layout.anchor.y}
          r="8"
          className="fill-slate-900 stroke-blue-500 stroke-[3px] scale-0 opacity-0 transform-origin-center"
        />
        <circle
          ref={dotInnerRef}
          cx={layout.anchor.x}
          cy={layout.anchor.y}
          r="3"
          className="fill-blue-400 scale-0 opacity-0 transform-origin-center"
        />
      </svg>

      {/* The Detail Circle (Elevates to Z=400) */}
      <div
        ref={circleRef}
        className="absolute h-[clamp(180px,31vw,300px)] w-[clamp(180px,31vw,300px)] rounded-full border-[3px] border-blue-500 bg-slate-900/90 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(59,130,246,0.3),inset_0_0_20px_rgba(59,130,246,0.2)] pointer-events-auto flex items-center justify-center flex-col opacity-0 group"
        style={{ ...layout.circleStyle, transformStyle: 'preserve-3d' }}
        data-zone-circle={id}
      >
        {/* Inner rings for technical aesthetic */}
        <div className="absolute inset-2 rounded-full border border-blue-500/40 border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-blue-500/20" />

        {/* Diagonal hashing pattern background */}
        <div className="absolute inset-0 rounded-full opacity-10" 
             style={{ 
               backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 5px, #3b82f6 5px, #3b82f6 6px)` 
             }} 
        />

        {/* Reticle / Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-blue-500/30" />
          <div className="h-full w-px bg-blue-500/30 absolute" />
          <div className="w-8 h-8 border border-blue-500/50 rounded-full" />
        </div>

        {/* Project Image */}
        <div ref={textRef} className="z-10 opacity-0 absolute inset-6 rounded-full overflow-hidden border border-blue-500/30">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover mix-blend-luminosity opacity-80 scale-105 group-hover:scale-100 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-400/80 font-mono text-sm tracking-[0.2em] bg-slate-900/50 border border-blue-500/20">
              CAD_SPIN_RENDER.mp4
            </div>
          )}
        </div>

        {/* Label Box (attached to circle, so it also floats at Z=400) */}
        <div 
          ref={labelRef}
          className="absolute opacity-0 -bottom-8 bg-slate-900/95 backdrop-blur-sm border-2 border-blue-500 px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.3)] flex flex-row items-center gap-4 whitespace-nowrap group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
          data-zone-label={id}
        >
          <div className="flex items-center justify-center bg-blue-500 text-slate-900 font-mono font-bold text-lg h-8 min-w-[32px] rounded-sm">
            {id}
          </div>
          <div className="text-slate-100 font-mono text-[14px] font-bold tracking-widest uppercase">
            {title}
          </div>
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-300" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-300" />
        </div>
      </div>
    </div>
  );
}

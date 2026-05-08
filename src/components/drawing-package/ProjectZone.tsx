import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface ProjectZoneProps {
  id: string;
  title: string;
  top: string;
  left: string;
  onLift?: () => void; // Task 4/5: fires when translateZ lift starts, triggers DOF blur
}

export function ProjectZone({ id, title, top, left, onLift }: ProjectZoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const dotInnerRef = useRef<SVGCircleElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // We only want to animate once when it comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true;
            
            if (pathRef.current && dotRef.current && dotInnerRef.current && circleRef.current && labelRef.current && textRef.current) {
              const length = pathRef.current.getTotalLength();
              gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
              gsap.set([dotRef.current, dotInnerRef.current], { scale: 0, opacity: 0, transformOrigin: "center" });
              gsap.set(labelRef.current, { y: 20, opacity: 0, rotateX: 90 });
              gsap.set(textRef.current, { opacity: 0, filter: "blur(4px)" });

              const tl = gsap.timeline();

              tl.to([dotRef.current, dotInnerRef.current], {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: "back.out(2.5)",
              })
              .to(pathRef.current, {
                strokeDashoffset: 0,
                duration: 0.8,
                ease: "power2.inOut",
              }, "-=0.2")
              .fromTo(circleRef.current, 
                { scale: 0.5, opacity: 0, rotationZ: -15 },
                {
                  scale: 1,
                  opacity: 1,
                  rotationZ: 0,
                  duration: 1,
                  ease: "expo.out",
                },
                "-=0.3"
              )
              .to(labelRef.current, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
              }, "-=0.6")
              .to(textRef.current, {
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.4,
                ease: "power1.out",
              }, "-=0.4")
              // Task 4: lift the whole container off the floor plane toward camera
              .to(containerRef.current, {
                z: 400,
                scale: 1.08,
                duration: 1.2,
                ease: "power2.out",
                onStart: () => onLift?.(),
              }, "-=0.3");
            }
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none w-[600px] h-[500px]"
      style={{ top, left, transformStyle: 'preserve-3d' }}
    >
      {/* The Leader Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" fill="none" viewBox="0 0 600 500">
        <path
          ref={pathRef}
          d="M 20 480 L 150 480 L 410 340"
          className="stroke-blue-500"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
        />
        {/* Anchor point dot with inner core */}
        <circle ref={dotRef} cx="20" cy="480" r="8" className="fill-slate-900 stroke-blue-500 stroke-[3px] scale-0 opacity-0 transform-origin-center" />
        <circle ref={dotInnerRef} cx="20" cy="480" r="3" className="fill-blue-400 scale-0 opacity-0 transform-origin-center" />
      </svg>

      {/* The Detail Circle */}
      <div
        ref={circleRef}
        className="w-[300px] h-[300px] rounded-full absolute top-10 right-10 border-4 border-blue-500 bg-slate-900/90 backdrop-blur-md shadow-[0_0_40px_rgba(59,130,246,0.25),inset_0_0_20px_rgba(59,130,246,0.15)] pointer-events-auto flex items-center justify-center flex-col relative opacity-0 group"
      >
        {/* Inner rings for technical aesthetic */}
        <div className="absolute inset-2 rounded-full border border-blue-500/30 border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-blue-500/10" />

        {/* Diagonal hashing pattern background */}
        <div className="absolute inset-0 rounded-full opacity-10" 
             style={{ 
               backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 5px, #3b82f6 5px, #3b82f6 6px)` 
             }} 
        />

        {/* Reticle / Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-blue-500/20" />
          <div className="h-full w-px bg-blue-500/20 absolute" />
        </div>

        {/* Video Placeholder */}
        <div ref={textRef} className="z-10 opacity-0 text-blue-400/80 font-mono text-sm tracking-[0.2em] text-center px-4 mix-blend-screen bg-slate-900/50 p-2 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
          CAD_SPIN_RENDER.mp4
        </div>

        {/* Label Box */}
        <div 
          ref={labelRef}
          className="absolute opacity-0 -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm border-2 border-blue-500 px-6 py-2.5 shadow-[0_4px_20px_rgba(59,130,246,0.3)] whitespace-nowrap flex items-center gap-4 group-hover:scale-105 transition-transform duration-300"
          style={{ transformPerspective: 500 }}
        >
          <div className="flex items-center justify-center bg-blue-500 text-slate-900 font-mono font-bold text-lg h-7 min-w-[28px] px-1 rounded-sm">
            {id}
          </div>
          <div className="text-slate-100 font-mono text-[13px] font-semibold tracking-widest">
            {title}
          </div>
          {/* Decorative corner accents on the label */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-blue-300" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-blue-300" />
        </div>
      </div>
    </div>
  );
}

import { useCallback, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectZone } from './ProjectZone';

gsap.registerPlugin(ScrollTrigger);

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

  // Task 5: DOF blur callback — fires when ProjectZone starts its translateZ lift
  // Keep invert(1) in the blur state so the linework stays white while blurring
  const handleLift = useCallback(() => {
    gsap.to(bgLayerRef.current, {
      filter: 'invert(1) blur(10px)',
      duration: 1.0,
      ease: 'power2.inOut',
    });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
        x: -1400,
        y: -3730,
        scale: 1.2,
        rotateX: 0, // explicitly flat — Task 3
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
      className="w-screen h-screen overflow-hidden bg-slate-950"
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
          onLift={handleLift}
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
        />
      </div>
    </div>
  );
}

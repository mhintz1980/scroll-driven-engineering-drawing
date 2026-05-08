import { useCallback, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectZone } from './ProjectZone';

gsap.registerPlugin(ScrollTrigger);

export function DrawingPackagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const substrateRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);

  // Task 5: DOF blur callback — fires when ProjectZone starts its translateZ lift
  const handleLift = useCallback(() => {
    gsap.to(bgLayerRef.current, {
      filter: 'grayscale(100%) contrast(400%) brightness(120%) blur(10px)',
      duration: 1.0,
      ease: 'power2.inOut',
    });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: '+=2500',
          scrub: 1.2,
        },
      });

      // Task 2 & 3: Camera starts flat, centered on ProjectZone
      gsap.set(substrateRef.current, {
        x: -1400,
        y: -3730,
        scale: 1.2,
        rotateX: 0, // explicitly flat — Task 3
      });

      // Task 3: First stop — whip-pan departs flat, no tilt
      tl.to(substrateRef.current, {
        x: -4500,
        y: -3000,
        scale: 1.8,
        rotateX: 0,
        duration: 1,
        ease: 'power3.inOut',
      })
      // Task 3: Second stop — tilts into perspective as camera decelerates
      .to(substrateRef.current, {
        x: -7500,
        y: -5500,
        scale: 1.3,
        rotateX: 62,
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
      style={{ perspective: '1800px', perspectiveOrigin: '50% 40%' }}
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
        {/* Background image layer — isolated for Task 5 DOF blur */}
        <div
          ref={bgLayerRef}
          className="absolute inset-0 bg-no-repeat mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url('${import.meta.env.BASE_URL}assets/images/AR-15-Lower-Reciever-Forged.webp')`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'top left',
            filter: 'grayscale(100%) contrast(400%) brightness(120%)',
            opacity: 0.8,
          }}
        />
        <ProjectZone
          id="A"
          title="TRIGGER GUARD RADIUS"
          top="3200px"
          left="1450px"
          onLift={handleLift}
        />
      </div>
    </div>
  );
}

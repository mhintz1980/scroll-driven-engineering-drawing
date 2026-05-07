import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function DrawingPackagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const substrateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: '+=2500', // Short scroll distance to force aggressive whip-pan speeds
          scrub: 1.2,
        },
      });

      tl.to(substrateRef.current, {
        x: -4500,
        y: -3000,
        scale: 1.8,
        duration: 1,
        ease: 'power3.inOut', // Sharper ease for the whip effect
      }).to(substrateRef.current, {
        x: -7500,
        y: -5500,
        scale: 1.3,
        duration: 1,
        ease: 'power3.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-hidden bg-slate-950"
    >
      <div
        ref={substrateRef}
        className="origin-top-left bg-no-repeat"
        style={{
          width: '8800px',
          height: '6800px',
          backgroundImage: `url('${import.meta.env.BASE_URL}assets/images/AR-15-Lower-Reciever-Forged.webp')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'top left',
        }}
      />
    </div>
  );
}

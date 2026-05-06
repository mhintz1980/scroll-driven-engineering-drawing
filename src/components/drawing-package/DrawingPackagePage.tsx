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
          end: '+=4000',
          scrub: 1.2,
        },
      });

      tl.to(substrateRef.current, {
        x: '-60vw',
        y: '-50vh',
        scale: 1.5,
        duration: 1,
        ease: 'power2.inOut',
      }).to(substrateRef.current, {
        x: '-120vw',
        y: '-10vh',
        scale: 1.2,
        duration: 1,
        ease: 'power2.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[100vw] h-[100vh] overflow-hidden bg-slate-950"
    >
      <div
        ref={substrateRef}
        className="w-[300vw] h-[300vh] origin-top-left bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}assets/images/AR-15-Lower-Reciever-Forged.webp')`,
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}

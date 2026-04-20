import { ExpandOnHover } from '../components/ui/expand-cards';
import { GlowCard } from '../components/ui/spotlight-card';
import { TextGlitch } from '../components/ui/text-glitch';
import { BlurTextAnimation } from '../components/ui/blur-text';
import { TubesCursor } from '../components/ui/tubes-cursor';
import StackingCard from '../components/ui/stacking-card';
import StickyScroll from '../components/ui/sticky-scroll';
import { FramerCarousel } from '../components/ui/framer-carousel';
import PricingSection4 from '../components/ui/pricing-section-4';
import InfiniteGallery  from '../components/ui/3d-gallery-photography';

const sampleImages = [
  { src: `${import.meta.env.BASE_URL}assets/images/308 KB.webp`, alt: '308 KB' },
  { src: `${import.meta.env.BASE_URL}assets/images/3D View-3.webp`, alt: '3D View-3' },
  { src: `${import.meta.env.BASE_URL}assets/images/709870988691 - BARREL NUT.webp`, alt: '709870988691 - BARREL NUT' },
  { src: `${import.meta.env.BASE_URL}assets/images/AR-15 Lower Reciever-Forged.JPG`, alt: 'AR-15 Lower Reciever-Forged' },
  { src: `${import.meta.env.BASE_URL}assets/images/Billet Receiver Set AR15.webp`, alt: 'Billet Receiver Set AR15' },
  { src: `${import.meta.env.BASE_URL}assets/images/HYDRAULIC-TORQUE-MXT03-ASSY.jpg`, alt: 'HYDRAULIC-TORQUE-MXT03-ASSY' },
  { src: `${import.meta.env.BASE_URL}assets/images/JGUN-DS-APACHE.JPG`, alt: 'JGUN-DS-APACHE' },
  { src: `${import.meta.env.BASE_URL}assets/images/Rendering of Upper and Lower Receiver Assembly for an AR15 That I designed for a Leader in the weapons Industry.jpg`, alt: 'Rendering of Upper and Lower Receiver Assembly for an AR15' },
  { src: `${import.meta.env.BASE_URL}assets/images/TAURUS-8.875-1P-3K-Rev1-3 view.webp`, alt: 'TAURUS-8.875-1P-3K-Rev1-3 view' },
  { src: `${import.meta.env.BASE_URL}assets/images/case-study-asset-lifecycle.webp`, alt: 'case-study-asset-lifecycle' },
  { src: `${import.meta.env.BASE_URL}assets/images/case-study-capabilities-deck.webp`, alt: 'case-study-capabilities-deck' },
  { src: `${import.meta.env.BASE_URL}assets/images/case-study-power-tee.webp`, alt: 'case-study-power-tee' },
  { src: `${import.meta.env.BASE_URL}assets/images/kanban-light.png`, alt: 'kanban-light' },
  { src: `${import.meta.env.BASE_URL}assets/images/profile copy.webp`, alt: 'profile copy' },
  { src: `${import.meta.env.BASE_URL}assets/images/profile.webp`, alt: 'profile' },
  { src: `${import.meta.env.BASE_URL}assets/images/pump-package-01.webp`, alt: 'pump-package-01' },
  { src: `${import.meta.env.BASE_URL}assets/images/pump-package-02.webp`, alt: 'pump-package-02' },
  { src: `${import.meta.env.BASE_URL}assets/images/pump-package-03.webp`, alt: 'pump-package-03' },
  { src: `${import.meta.env.BASE_URL}assets/images/pump-package-04.webp`, alt: 'pump-package-04' },
  { src: `${import.meta.env.BASE_URL}assets/images/pump-package-hero.webp`, alt: 'pump-package-hero' },
  { src: `${import.meta.env.BASE_URL}assets/images/pumptracker-01.webp`, alt: 'pumptracker-01' },
  { src: `${import.meta.env.BASE_URL}assets/images/pumptracker-02.webp`, alt: 'pumptracker-02' },
  { src: `${import.meta.env.BASE_URL}assets/images/pumptracker-03.webp`, alt: 'pumptracker-03' },
  { src: `${import.meta.env.BASE_URL}assets/images/pumptracker-04.webp`, alt: 'pumptracker-04' },
  { src: `${import.meta.env.BASE_URL}assets/images/pumptracker-hero.webp`, alt: 'pumptracker-hero' },
  { src: `${import.meta.env.BASE_URL}assets/images/pumptracker-light-01.png`, alt: 'pumptracker-light-01' },
  { src: `${import.meta.env.BASE_URL}assets/images/pumptracker-light-final.png`, alt: 'pumptracker-light-final' },
  { src: `${import.meta.env.BASE_URL}assets/images/pumptracker_light_mode_composite_1775435494270.png`, alt: 'pumptracker_light_mode_composite' },
  { src: `${import.meta.env.BASE_URL}assets/images/rendering-01.webp`, alt: 'rendering-01' },
  { src: `${import.meta.env.BASE_URL}assets/images/rendering-02.webp`, alt: 'rendering-02' },
  { src: `${import.meta.env.BASE_URL}assets/images/rendering-03.webp`, alt: 'rendering-03' },
  { src: `${import.meta.env.BASE_URL}assets/images/rendering-04.webp`, alt: 'rendering-04' },
  { src: `${import.meta.env.BASE_URL}assets/images/rendering-05.webp`, alt: 'rendering-05' },
  { src: `${import.meta.env.BASE_URL}assets/images/rendering-06.webp`, alt: 'rendering-06' },
  { src: `${import.meta.env.BASE_URL}assets/images/rendering-07.webp`, alt: 'rendering-07' },
  { src: `${import.meta.env.BASE_URL}assets/images/rendering-08.webp`, alt: 'rendering-08' },
  { src: `${import.meta.env.BASE_URL}assets/images/rendering-09.webp`, alt: 'rendering-09' },
  { src: `${import.meta.env.BASE_URL}assets/images/rendering-10.webp`, alt: 'rendering-10' },
  { src: `${import.meta.env.BASE_URL}assets/images/renderings-hero.webp`, alt: 'renderings-hero' },
  { src: `${import.meta.env.BASE_URL}assets/images/resume-preview.webp`, alt: 'resume-preview' },
  { src: `${import.meta.env.BASE_URL}assets/images/side-door.webp`, alt: 'side-door' },
  { src: `${import.meta.env.BASE_URL}assets/images/torque-wrench-01.webp`, alt: 'torque-wrench-01' },
  { src: `${import.meta.env.BASE_URL}assets/images/torque-wrench-02.webp`, alt: 'torque-wrench-02' },
  { src: `${import.meta.env.BASE_URL}assets/images/torque-wrench-03.webp`, alt: 'torque-wrench-03' },
  { src: `${import.meta.env.BASE_URL}assets/images/torque-wrench-04.webp`, alt: 'torque-wrench-04' },
  { src: `${import.meta.env.BASE_URL}assets/images/torque-wrench-05.webp`, alt: 'torque-wrench-05' },
  { src: `${import.meta.env.BASE_URL}assets/images/torque-wrench-06.webp`, alt: 'torque-wrench-06' },
  { src: `${import.meta.env.BASE_URL}assets/images/torque-wrench-hero.webp`, alt: 'torque-wrench-hero' },
];

const stackingProjects = [
  {
    title: 'Matthias Leidinger',
    description: 'Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.',
    link: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=500&auto=format&fit=crop',
    color: '#5196fd',
  },
  {
    title: 'Clément Chapillon',
    description: 'This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes.',
    link: 'https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?w=500&auto=format&fit=crop&q=60',
    color: '#8f89ff',
  },
  {
    title: 'Zissou',
    description: 'Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal.',
    link: 'https://images.unsplash.com/photo-1605106901227-991bd663255c?w=500&auto=format&fit=crop',
    color: '#13006c',
  },
  {
    title: 'Mathias Svold',
    description: 'The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers.',
    link: 'https://images.unsplash.com/photo-1605106715994-18d3fecffb98?w=500&auto=format&fit=crop&q=60',
    color: '#ed649e',
  },
];


export function FeaturesPlaygroundPage() {
  return (
    <div className="min-h-screen bg-black text-white w-full">
      <div className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-white">UI Features Playground</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-body">
          Testing area for high-end components. Scroll down to see the integrations.
        </p>
        <div className="mt-8">
          <a href="/#projects" className="inline-block border border-white/20 text-white font-heading font-bold px-6 py-3 uppercase tracking-wider text-sm transition-colors hover:border-white/40">
            Return to Home
          </a>
        </div>
      </div>
      
      {/* Feature Demos Will Be Mounted Below */}
      <div className="flex flex-col w-full gap-32 py-32 items-center text-center text-white">
        
        {/* GROUP A: Cards & Hover Effects */}
        <section className="w-full flex flex-col items-center">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Group A: Cards & Hover Effects</h2>
            <p className="text-gray-400">Expandable card gallery and generic cards with cursor-chasing spotlights.</p>
          </div>
          
          <div className="w-full max-w-7xl px-4">
            <h3 className="text-2xl font-bold mb-8 text-left text-secondary border-b border-white/10 pb-2">ExpandOnHover</h3>
            <ExpandOnHover />
          </div>

          <div className="w-full max-w-7xl px-4 mt-24">
            <h3 className="text-2xl font-bold mb-8 text-left text-secondary border-b border-white/10 pb-2">GlowCard / Spotlight</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center bg-[#0a0a0a] p-12 rounded-3xl border border-white/5">
              <GlowCard size="md" glowColor="blue">
                <div className="h-full flex flex-col justify-end text-left relative z-20">
                  <h4 className="text-xl font-bold mb-2">Industrial Blueprint</h4>
                  <p className="text-sm text-gray-400">Pneumatic system layouts.</p>
                </div>
              </GlowCard>
              <GlowCard size="md" glowColor="orange">
                 <div className="h-full flex flex-col justify-end text-left relative z-20">
                  <h4 className="text-xl font-bold mb-2">Thermal Testing</h4>
                  <p className="text-sm text-gray-400">Heat dissipation specs.</p>
                </div>
              </GlowCard>
              <GlowCard size="md" glowColor="purple">
                 <div className="h-full flex flex-col justify-end text-left relative z-20">
                  <h4 className="text-xl font-bold mb-2">Kinetic Analysis</h4>
                  <p className="text-sm text-gray-400">Vibration tolerance maps.</p>
                </div>
              </GlowCard>
            </div>
          </div>
        </section>

        {/* GROUP B: Text & Interactions */}
        <section className="w-full flex flex-col items-center mt-32">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Group B: Text & Interactions</h2>
            <p className="text-gray-400">Glitch effects, cinematic blur, and dynamic WebGL cursors.</p>
          </div>
          
          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl mb-12">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Text Glitch Effect</h3>
            <TextGlitch text="MECHANICAL" hoverText="PRECISION." />
          </div>

          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl mb-12">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Cinematic Blur Texts</h3>
            <BlurTextAnimation 
              text="Optimized load characteristics and dynamic kinetic stress thresholds exceed standard operational limits."
              fontSize="text-3xl md:text-5xl"
            />
          </div>

          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Interactive WebGL Cursor Wrapper</h3>
            <p className="mb-4 text-gray-500 text-sm">Click anywhere within the box below to randomize particle colors.</p>
            <TubesCursor />
          </div>
        </section>

        {/* GROUP C: Scroll Dynamics */}
        <section className="w-full flex flex-col items-center mt-32">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Group C: Scroll Dynamics</h2>
            <p className="text-gray-400">Complex scroll behaviors bounded within constrained viewports.</p>
          </div>
          
          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl mb-12 bg-black">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Parallax Scroll Cards</h3>
            <p className="mb-6 text-gray-500 text-sm">Scroll within the box below to see stacking cards.</p>
            <StackingCard projects={stackingProjects} />
          </div>

          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl mb-12 bg-black">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Sticky Scroll Gallery</h3>
             <p className="mb-6 text-gray-500 text-sm">Scroll within the box below to reveal the sticky image gallery.</p>
            <StickyScroll />
          </div>

          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl bg-black">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Framer Carousel</h3>
            <p className="mb-6 text-gray-500 text-sm">Horizontal motion carousel with progress indicators.</p>
            <FramerCarousel />
          </div>
        </section>

        {/* GROUP D: Layouts & 3D */}
        <section className="w-full flex flex-col items-center mt-32">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Group D: Layouts & 3D</h2>
            <p className="text-gray-400">Complex orchestrated layouts and high-end WebGL elements.</p>
          </div>
          
          <div className="w-full max-w-7xl px-4 text-left mb-12 relative overflow-hidden">
             <PricingSection4 />
          </div>

          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl bg-black relative">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2 z-20 relative">3D Photography Gallery</h3>
            <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-neutral-900">
               <InfiniteGallery
                 images={sampleImages}
                 speed={1.0}
                 zSpacing={3}
                 visibleCount={8}
                 falloff={{ near: 0.8, far: 14 }}
                 className="h-[600px] w-full"
               />
               <div className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-exclusion text-white">
                 <h2 className="text-5xl md:text-7xl font-bold opacity-30 italic">Perspective</h2>
               </div>
               <div className="absolute bottom-6 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-widest text-white/50">
                 Scroll to fly through space
               </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

import { ExpandOnHover } from '../components/ui/expand-cards';
import { GlowCard } from '../components/ui/spotlight-card';
import { TextGlitch } from '../components/ui/text-glitch';
import { BlurTextAnimation } from '../components/ui/blur-text';
import { TubesCursor } from '../components/ui/tubes-cursor';

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

      </div>
    </div>
  );
}

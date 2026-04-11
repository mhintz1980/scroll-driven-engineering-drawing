import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useState } from 'react';

const REEL_SRC = ''; // Set to a short loop URL when ready, e.g. 'assets/video/engineering-review-loop.mp4'

export const EngineeringReel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="py-24 w-full max-w-7xl mx-auto px-8 md:px-20 relative z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="mb-10 flex items-end justify-between gap-8 flex-wrap">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-secondary mb-3">
              // ENGINEERING REVIEW REEL
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-primary">
              See the work in motion.
            </h2>
          </div>
          <div className="font-mono text-xs text-secondary max-w-xs leading-relaxed hidden md:block">
            A short look at how design moves from concept through manufacturing reality.
          </div>
        </motion.div>

        {/* Video frame */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-sm overflow-hidden border border-secondary/10 bg-surface shadow-lg"
        >
          {/* Technical annotation strip — top */}
          <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-secondary/10 font-mono text-[11px] text-secondary">
            <span className="uppercase tracking-wider">ENG-REEL-001</span>
            <span className="text-accent-primary">REV A</span>
            <span className="uppercase tracking-wider">SHEET 1 OF 1</span>
          </div>

          {/* Video / placeholder area — 16:9 */}
          <div className="relative aspect-video bg-background flex items-center justify-center overflow-hidden">
            {REEL_SRC ? (
              <video
                src={`${import.meta.env.BASE_URL}${REEL_SRC}`}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            ) : (
              <ReelPlaceholder />
            )}
          </div>

          {/* Bottom strip */}
          <div className="flex items-center justify-between px-4 py-2 bg-surface border-t border-secondary/10 font-mono text-[11px] text-secondary">
            <span>MECHANICAL DESIGN WITH MANUFACTURING REALITY BUILT IN</span>
            <span className="text-accent-primary">● {isPlaying ? 'PLAYING' : 'STANDBY'}</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

/** Premium placeholder until a real loop file is dropped in. */
function ReelPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--color-secondary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Center content */}
      <div className="relative text-center px-8">
        {/* Play icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full border-2 border-accent-primary/30 flex items-center justify-center">
          <div className="ml-1 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-accent-primary/50" />
        </div>

        <div className="font-mono text-sm uppercase tracking-[0.12em] text-secondary mb-2">
          Engineering Review Reel
        </div>
        <div className="font-heading text-xl md:text-2xl font-bold text-primary/40">
          Short loop coming soon
        </div>
        <div className="font-mono text-[11px] text-secondary/60 mt-4">
          {/* Hook point: replace REEL_SRC constant above to activate */}
          ASSET PENDING — DROP LOOP FILE AND SET REEL_SRC
        </div>
      </div>

      {/* Corner registration marks */}
      {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-6 h-6`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-secondary/15" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-secondary/15" />
        </div>
      ))}
    </div>
  );
}

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { portfolioData, wordCycleData } from '../../data/portfolioData';
import { useState, useEffect } from 'react';

/**
 * DrawingHero — Hero/About zone styled as the "general notes" area of a drawing.
 * Retains the spec block and word-cycle from the original hero.
 */
export function DrawingHero() {
  const shouldReduceMotion = useReducedMotion();
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % wordCycleData.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.6 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-32 relative">
      {/* Section line marker */}
      <div
        className="absolute top-8 left-8 text-[10px] uppercase tracking-[0.2em]"
        style={{ color: 'var(--dp-text-dim)' }}
      >
        A — A
      </div>

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[11px] uppercase tracking-[0.22em] mb-6"
        style={{ color: 'var(--dp-accent)' }}
      >
        {portfolioData.personal.superHeader}
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-5"
      >
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-medium leading-none uppercase tracking-[0.03em]"
          style={{ color: 'var(--dp-text)', fontFamily: "'Michroma', 'Archivo', system-ui, sans-serif" }}
        >
          {portfolioData.personal.name}
        </h1>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mb-8 max-w-xl p-4 rounded backdrop-blur-sm"
        style={{
          color: 'var(--dp-text)',
          background: 'rgba(9, 16, 25, 0.4)',
        }}
      >
        <div className="text-sm md:text-base uppercase leading-relaxed tracking-[0.02em]">
          Mechanical designer specializing in bridging design and manufacturing. Built for{' '}
          <span
            className="font-bold relative inline-flex h-[1.35em] min-w-[22ch] overflow-hidden align-baseline"
            style={{ color: 'var(--dp-accent)' }}
          >
            <span className="invisible whitespace-nowrap pointer-events-none">
              {wordCycleData.reduce((a, b) => (a.length > b.length ? a : b), '')}
            </span>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={wordCycleData[currentWord]}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 whitespace-nowrap"
              >
                {wordCycleData[currentWord]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4 mb-10"
      >
        {portfolioData.heroActions.map((action, i) => (
          <a
            key={i}
            href={action.href}
            target={action.target}
            className="inline-flex items-center px-6 py-3 text-[13px] uppercase tracking-[0.15em] font-bold transition-all duration-200"
            style={{
              background: action.primary ? 'var(--dp-accent)' : 'transparent',
              color: action.primary ? 'var(--dp-bg)' : 'var(--dp-text)',
              border: action.primary ? 'none' : '1px solid var(--dp-border)',
            }}
          >
            {action.label}
          </a>
        ))}
      </motion.div>

      {/* Spec block — typewriter style */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="text-xs leading-relaxed p-5 max-w-[500px] border backdrop-blur-sm"
        style={{
          borderColor: 'var(--dp-border)',
          background: 'rgba(9, 16, 25, 0.6)',
        }}
      >
        {[
          ['SPEC', portfolioData.personal.name],
          ['ROLE', 'Mechanical Designer + Systems Builder'],
          ['TOL', '±0.0005" | 15 YRS | JAX, FL'],
          ['STATUS', 'AVAILABLE FOR WORK'],
          ['STACK', 'SolidWorks · PDM · Python · AI Tooling'],
        ].map(([key, val]) => (
          <motion.div key={key} variants={fadeUp} className="flex">
            <span className="mr-2 font-bold" style={{ color: 'var(--dp-accent)' }}>
              &gt; {key}:
            </span>
            <span
              style={{
                color: key === 'STATUS' ? 'oklch(0.72 0.19 155)' : 'var(--dp-text)',
              }}
              className={key === 'STATUS' ? 'font-bold' : ''}
            >
              {val}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

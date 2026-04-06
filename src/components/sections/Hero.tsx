import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { portfolioData, wordCycleData } from '../../data/portfolioData';
import { MagneticText } from '../ui/MagneticText';
import { useState, useEffect } from 'react';

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % wordCycleData.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const typewriterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  const typewriterChild = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <section id="top" className="min-h-screen flex flex-col justify-center py-32 relative z-10 w-full max-w-7xl mx-auto px-8 md:px-20">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="font-mono text-[14px] font-medium uppercase tracking-[0.1em] text-secondary mb-8"
      >
        {portfolioData.personal.superHeader}
      </motion.div>

      <div className="mb-12 max-w-max space-y-4">
        <MagneticText
          className="text-6xl md:text-8xl font-extrabold leading-[1.1] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-primary to-secondary !flex-nowrap pr-4 pb-2 md:pr-6 w-max"
          text={portfolioData.personal.title.line1}
        />
        <MagneticText
          className="text-6xl md:text-8xl font-extrabold leading-[1.1] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-primary to-secondary !flex-nowrap pr-4 pb-2 md:pr-6 w-max"
          text={portfolioData.personal.title.line2}
        />
      </div>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-accent-primary/5 border border-accent-primary/10 rounded-sm p-6 mb-12 max-w-3xl"
      >
        <div className="text-lg md:text-xl font-normal leading-relaxed text-primary flex flex-wrap gap-x-2">
          <span>Bridging the gap between SolidWorks design and high-efficiency production through</span>
          <span className="text-accent-primary font-bold relative inline-flex overflow-hidden h-[1.4em] align-bottom items-center min-w-[280px]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={wordCycleData[currentWord]}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                className="absolute whitespace-nowrap"
              >
                {wordCycleData[currentWord]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="flex flex-wrap items-center gap-4 mb-4"
      >
        {portfolioData.heroActions.map((action, i) => (
          <motion.a
            key={i}
            href={action.href}
            target={action.target}
            className={`
              inline-flex items-center justify-center px-7 py-3.5 
              text-[15px] rounded-sm transition-all
              ${action.primary 
                ? 'font-heading font-bold uppercase tracking-widest bg-accent-primary text-white hover:bg-accent-primary/90 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)] border-none'
                : 'font-semibold bg-white/50 dark:bg-slate-800/50 backdrop-blur text-primary border border-secondary/20 hover:border-accent-primary hover:text-accent-primary shadow-sm'}
            `}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            {action.label}
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        variants={typewriterContainer}
        initial="hidden"
        animate="visible"
        className="font-mono text-sm leading-relaxed mt-8 p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-secondary/20 border-l-[3px] border-l-accent-primary rounded-sm shadow-sm max-w-[540px]"
      >
        <motion.div variants={typewriterChild} className="flex"><span className="text-accent-primary font-medium mr-2">&gt; SPEC:</span> <span className="text-primary">{portfolioData.personal.name}</span></motion.div>
        <motion.div variants={typewriterChild} className="flex"><span className="text-accent-primary font-medium mr-2">&gt; ROLE:</span> <span className="text-primary">Mechanical Designer + Automation Engineer</span></motion.div>
        <motion.div variants={typewriterChild} className="flex"><span className="text-accent-primary font-medium mr-2">&gt; TOL:</span> <span className="text-primary">±0.0005&quot; | 15 YRS | JAX, FL</span></motion.div>
        <motion.div variants={typewriterChild} className="flex"><span className="text-accent-primary font-medium mr-2">&gt; STATUS:</span> <span className="text-emerald-500 font-medium animate-pulse">AVAILABLE FOR WORK</span></motion.div>
        <motion.div variants={typewriterChild} className="flex"><span className="text-accent-primary font-medium mr-2">&gt; STACK:</span> <span className="text-primary">SolidWorks · PDM · Python · AI Tooling</span></motion.div>
      </motion.div>
    </section>
  );
};

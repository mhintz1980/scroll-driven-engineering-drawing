import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { coreServices } from '../../data/portfolioData';
import { SectionTitle } from '../ui/MagneticText';
import PricingSection4 from '../ui/pricing-section-4';

export const Services = () => {


  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <section id="services" className="py-32 w-full max-w-7xl mx-auto px-8 md:px-20 relative z-10">
      <SectionTitle>Services</SectionTitle>

      {/* Core Services Section from older layout */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-12 mb-20"
      >
        {coreServices.map((service, index) => (
          <motion.div 
            key={`core-service-${index}`} 
            variants={item}
            className="flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="md:w-1/3">
              <h3 className="text-2xl font-heading font-bold text-primary dark:text-white group-hover:text-accent-primary transition-colors">{service.title}</h3>
            </div>
            <div className="md:w-2/3">
              <p className="text-secondary dark:text-slate-400 leading-relaxed mb-4 text-lg">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="px-3 py-1 bg-accent-primary/10 dark:bg-accent-secondary/20 text-accent-primary dark:text-accent-secondary text-sm font-semibold rounded-full font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 w-full max-w-[1200px] mx-auto">
        <PricingSection4 />
      </div>
      
      {/* Conversion Banner injected after services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-24 p-12 rounded-sm text-center relative overflow-hidden border border-slate-800/80 bg-slate-950 text-white shadow-[0_18px_60px_rgba(2,6,23,0.35)]"
      >
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent-primary to-accent-warm" />
        <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">Tight tolerance. Rough drawing. Impossible deadline?</h3>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">Skip the intake form. Send me what you have — a sketch, a spec, a problem you've been circling for weeks. Let's see what it actually takes to solve it.</p>
        <a 
          href="/#contact" 
          className="inline-block rounded-sm bg-white px-8 py-4 uppercase font-bold tracking-widest text-slate-950 transition-transform hover:scale-105 hover:bg-slate-100"
        >
          Start the Conversation
        </a>
      </motion.div>
    </section>
  );
};

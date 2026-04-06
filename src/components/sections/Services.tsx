import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { portfolioData, coreServices } from '../../data/portfolioData';
import { SectionTitle } from '../ui/MagneticText';

export const Services = () => {
  const shouldReduceMotion = useReducedMotion();

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

      <div className="mb-12">
        <h3 className="text-3xl font-heading font-bold mb-4 opacity-50 text-center uppercase tracking-widest">Specialized Capabilities</h3>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {portfolioData.services.map((service, index) => (
          <motion.div 
            key={index}
            variants={item}
            whileHover={shouldReduceMotion ? {} : { y: -8 }}
            className="flex flex-col h-full bg-white border border-secondary/10 shadow-sm p-8 rounded-sm transition-all hover:shadow-xl group relative overflow-hidden"
          >
            {/* Top right decorative corner */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none transform translate-x-1/2 -translate-y-1/2 rotate-45 border border-cad-line-primary/20 bg-background/50" />
            
            <div className="mb-6 flex-1">
              <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-accent-primary transition-colors">{service.title}</h3>
              <p className="font-mono text-sm text-accent-secondary mb-6 tracking-wide uppercase">{service.subtitle}</p>
              <p className="text-secondary leading-relaxed mb-8">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.deliverables.map((deliverable, dIndex) => (
                  <li key={dIndex} className="flex items-start">
                    <span className="text-accent-primary mt-1 mr-3 flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-primary text-[15px]">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-auto pt-6 border-t border-cad-line-primary/20">
              <p className="text-sm font-semibold text-primary mb-4 bg-background px-3 py-1.5 inline-block rounded-sm">{service.rate}</p>
              <a 
                href={service.cta.href} 
                className="group/btn flex items-center justify-between w-full py-4 px-6 border border-accent-secondary/30 text-accent-secondary font-bold font-heading hover:bg-accent-primary hover:text-white hover:border-accent-primary transition-colors rounded-sm uppercase tracking-wide"
              >
                <span>{service.cta.label.replace('→', '').trim()}</span>
                <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Conversion Banner injected after services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-24 p-12 bg-primary text-white rounded-sm text-center relative overflow-hidden"
      >
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent-primary to-accent-warm" />
        <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">Hard problem? Rough drawing?</h3>
        <p className="text-lg text-secondary/80 mb-8 max-w-2xl mx-auto">Skip the back-and-forth. Send me what you have, and let's see if we can engineer a cleaner solution.</p>
        <a 
          href="#contact" 
          className="inline-block bg-white text-primary uppercase font-bold tracking-widest px-8 py-4 rounded-sm hover:scale-105 transition-transform"
        >
          Start the Conversation
        </a>
      </motion.div>
    </section>
  );
};

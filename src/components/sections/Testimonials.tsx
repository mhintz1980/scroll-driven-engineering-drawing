import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { SectionTitle } from '../ui/MagneticText';
import { SkillsBand } from '../ui/SkillsBand';

export const Testimonials = () => {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate for seamless loop
  const testimonials = [
    ...portfolioData.testimonials,
    ...portfolioData.testimonials,
    ...portfolioData.testimonials,
    ...portfolioData.testimonials,
  ];

  return (
    <>
      <SkillsBand />
      <section id="testimonials" className="py-24 w-full relative z-10 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-8 md:px-20 mb-8">
          <SectionTitle>References</SectionTitle>
        </div>
        
        <div className="flex w-full overflow-hidden pb-12 pt-4 group">
          <motion.div
            className="flex gap-8 w-max items-stretch px-4"
            animate={shouldReduceMotion ? {} : { x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[400px] md:w-[500px]"
              >
                <div className="bg-white dark:bg-slate-900 p-10 h-full border border-secondary/20 shadow-sm flex flex-col justify-between rounded-sm cursor-pointer hover:shadow-xl dark:hover:shadow-black/50 transition-shadow">
                  <svg className="w-8 h-8 text-accent-primary/20 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  
                  <blockquote className="text-[17px] leading-relaxed italic text-primary font-medium mb-10 flex-1">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <div className="font-heading font-bold text-lg mb-1">{testimonial.author}</div>
                      <div className="font-mono text-xs uppercase tracking-wide text-secondary">{testimonial.role}</div>
                    </div>
                    {testimonial.score && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-sm border border-emerald-100 dark:border-emerald-800/50">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{testimonial.score}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

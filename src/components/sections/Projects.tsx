import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { SectionTitle } from '../ui/MagneticText';
import { buildProjectMediaItems } from './projects-media';

export const Projects = () => {
  const shouldReduceMotion = useReducedMotion();
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(0);
  const [activeMediaByProject, setActiveMediaByProject] = useState<Record<string, number>>({});

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
  };

  const getActiveMediaIndex = (projectTitle: string, mediaCount: number) => {
    const nextIndex = activeMediaByProject[projectTitle] ?? 0;
    return Math.min(nextIndex, mediaCount - 1);
  };

  return (
    <section id="projects" className="py-32 w-full max-w-7xl mx-auto px-8 md:px-20 relative z-10">
      <SectionTitle>Projects</SectionTitle>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {portfolioData.projects.map((project, index) => {
          const mediaItems = buildProjectMediaItems(project);
          const activeMediaIndex = getActiveMediaIndex(project.title, mediaItems.length);
          const activeMedia = mediaItems[activeMediaIndex];
          const isExpanded = expandedProjectIndex === index;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -8 }}
              className={`
                group relative flex flex-col bg-surface overflow-hidden rounded-sm
                border border-secondary/10 shadow-sm transition-shadow hover:shadow-xl
                ${project.featured ? 'md:col-span-2' : ''}
              `}
            >
            {/* The CAD Tolerance decoration overlay for featured projects */}
            {project.featured && (
              <div className="absolute top-4 right-4 z-20 pointer-events-none hidden md:block">
                <div className="bg-surface/80 backdrop-blur-md border border-accent-secondary/50 text-accent-secondary p-2 text-xs font-mono shadow-sm">
                  <div>[REF] PRODUCTION SCALE</div>
                  <div className="border-t border-accent-secondary/30 my-1"></div>
                  <div>AUTOMATION: 100%</div>
                </div>
              </div>
            )}

            <div className={`relative flex flex-col ${project.featured ? 'md:flex-row' : ''}`}>
            <div className={`relative overflow-hidden ${project.featured ? 'md:w-1/2' : 'w-full'} aspect-[16/10] bg-background`}>
              <motion.img 
                src={`${import.meta.env.BASE_URL}${activeMedia.src}`} 
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
              <div className="absolute left-4 top-4 bg-surface/85 backdrop-blur-md border border-accent-primary/20 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.16em] text-primary shadow-sm">
                <div className="text-secondary">Media Frame</div>
                <div className="mt-1 text-accent-primary">{activeMedia.sequence} / {String(mediaItems.length).padStart(2, '0')}</div>
              </div>
            </div>
            
            <div className={`p-8 flex flex-col justify-between flex-1 ${project.featured ? 'md:w-1/2' : ''}`}>
              <div>
                <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-accent-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-mono text-secondary mb-6">
                  {project.category}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-2.5 py-1 text-xs font-medium bg-secondary/10 text-primary rounded-sm tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {project.outcome && (
                <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 text-primary border-l-2 border-emerald-500 rounded-r-sm">
                  <span className="text-emerald-500 flex-shrink-0 mt-0.5">→</span>
                  <p className="text-[15px] font-medium leading-snug">{project.outcome}</p>
                </div>
              )}

              <div className="mt-8 border-t border-secondary/10 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">
                      Project Media
                    </div>
                    <p className="mt-2 text-sm text-primary/80">
                      Review drawings, CAD captures, and supporting project frames directly inside the project card.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedProjectIndex((currentIndex) => (currentIndex === index ? null : index))
                    }
                    className="inline-flex items-center gap-2 border border-accent-primary/20 bg-accent-primary/5 px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] text-accent-primary transition-colors hover:bg-accent-primary/10"
                  >
                    {isExpanded ? 'Hide Media Strip' : 'Review Media Strip'}
                    <span className="text-primary/50">[{String(mediaItems.length).padStart(2, '0')}]</span>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded ? (
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
                        <div className="relative overflow-hidden rounded-sm border border-secondary/10 bg-background">
                          <img
                            src={`${import.meta.env.BASE_URL}${activeMedia.src}`}
                            alt={`${project.title} ${activeMedia.label}`}
                            className="aspect-[16/10] w-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent p-5">
                            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">
                              {activeMedia.kind === 'hero' ? 'Primary review frame' : 'Supporting detail'}
                            </div>
                            <div className="mt-2 text-lg font-semibold text-white">
                              {activeMedia.label}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          {mediaItems.map((item, mediaIndex) => {
                            const isActive = mediaIndex === activeMediaIndex;

                            return (
                              <button
                                key={item.src}
                                type="button"
                                onClick={() =>
                                  setActiveMediaByProject((current) => ({
                                    ...current,
                                    [project.title]: mediaIndex,
                                  }))
                                }
                                className={`grid grid-cols-[88px_minmax(0,1fr)] gap-3 rounded-sm border p-2 text-left transition-colors ${
                                  isActive
                                    ? 'border-accent-primary/40 bg-accent-primary/8'
                                    : 'border-secondary/10 bg-white/30 hover:border-accent-primary/20 hover:bg-accent-primary/5 dark:bg-slate-900/20'
                                }`}
                              >
                                <img
                                  src={`${import.meta.env.BASE_URL}${item.src}`}
                                  alt={`${project.title} ${item.label}`}
                                  className="h-20 w-full rounded-[2px] object-cover"
                                />
                                <div className="min-w-0">
                                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">
                                    Frame {item.sequence}
                                  </div>
                                  <div className="mt-1 truncate text-sm font-semibold text-primary">
                                    {item.label}
                                  </div>
                                  <div className="mt-2 text-xs text-primary/60">
                                    {item.kind === 'hero' ? 'Anchor image' : 'Gallery detail'}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
            </div>
          </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

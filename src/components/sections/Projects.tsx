import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { SectionTitle } from '../ui/MagneticText';
import { ProjectCard } from './ProjectCard';

export const Projects = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);
  const [activeMediaByProjectIndex, setActiveMediaByProjectIndex] = useState<Record<number, number>>({});

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
          const isExpanded = expandedProjectIndex === index;

          return (
            <ProjectCard
              key={project.title}
              project={project}
              isExpanded={isExpanded}
              onToggleExpanded={() =>
                setExpandedProjectIndex((currentIndex) => (currentIndex === index ? null : index))
              }
              selectedMediaIndex={activeMediaByProjectIndex[index]}
              onSelectMedia={(mediaIndex) =>
                setActiveMediaByProjectIndex((current) => ({
                  ...current,
                  [index]: mediaIndex,
                }))
              }
              shouldReduceMotion={shouldReduceMotion}
              variants={itemVariants}
            />
          );
        })}
      </motion.div>
    </section>
  );
};

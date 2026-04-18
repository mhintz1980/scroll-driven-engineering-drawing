import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { cn } from '../../lib/utils';
import { useReducedMotion } from 'framer-motion';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  
  // Condense navbar on scroll
  const navY = useTransform(scrollY, [0, 50], [0, -10]);
  const navScale = useTransform(scrollY, [0, 50], [1, 0.95]);

  return (
    <motion.nav
      style={shouldReduceMotion ? {} : { y: navY, scale: navScale }}
      className={cn(
        "fixed top-8 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-12 px-6 py-3",
        "bg-surface/80 backdrop-blur-md rounded-full",
        "border border-secondary/20 shadow-lg shadow-black/5"
      )}
    >
      <a 
        href="/#top" 
        className="font-heading font-semibold text-lg uppercase tracking-wider text-primary whitespace-nowrap"
      >
        {portfolioData.personal.name}
      </a>
      
      <div className="hidden md:flex items-center gap-8">
        {portfolioData.navigation.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[15px] font-medium text-secondary hover:text-accent-primary transition-colors relative group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all group-hover:w-full" />
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

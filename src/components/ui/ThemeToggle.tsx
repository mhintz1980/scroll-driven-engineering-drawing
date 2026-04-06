import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from '@phosphor-icons/react';

export function ThemeToggle() {
const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Only access localStorage/window if in browser
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light';
      
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
      return initialTheme;
    }
    return 'light';
  });

  const toggleTheme = () => {
    if (!theme) return;
    
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!theme) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative flex h-10 w-20 items-center rounded-[2rem] p-1 
        transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-accent-primary focus-visible:ring-offset-2
        ${theme === 'dark' ? 'bg-surface-raised border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' : 'bg-surface-raised border border-primary/10 shadow-sm'}
      `}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-surface shadow-sm"
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
        style={{
          left: theme === 'dark' ? 'calc(100% - 2.25rem)' : '0.25rem',
        }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 360 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {theme === 'light' ? (
            <Sun size={18} weight="bold" className="text-accent-warm" />
          ) : (
            <Moon size={18} weight="bold" className="text-secondary" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}

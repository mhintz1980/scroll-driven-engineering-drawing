You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
framer-carousel.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';

export const items = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?q=80&w=880&auto=format&fit=crop',
    title: 'Misty Mountain Majesty',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1539552678512-4005a33c64db?q=80&w=880&auto=format&fit=crop',
    title: 'Winter Wonderland',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1709983966747-58c311fa6976?q=80&w=880&auto=format&fit=crop',
    title: 'Autumn Mountain Retreat',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1683722319473-f851deb3fdf2?q=80&w=880&auto=format&fit=crop',
    title: 'Tranquil Lake Reflection',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1560790671-b76ca4de55ef?q=80&w=734&auto=format&fit=crop',
    title: 'Misty Mountain Peaks',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1698774303292-7af9410c3a57?q=80&w=436&auto=format&fit=cropv',
    title: 'Golden Hour Glow',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1643994542584-1247b5266429?q=80&w=869&auto=format&fit=crop',
    title: 'Snowy Mountain Highway',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1613681230409-6423a38c43e1?q=80&w=871&auto=format&fit=crop',
    title: 'Foggy Mountain Forest',
  },
];

export function FramerCarousel() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x]);

  return (
    <div className='lg:p-10 sm:p-4 p-2 max-w-4xl mx-auto'>
      <div className='flex flex-col gap-3'>
        <div className='relative overflow-hidden rounded-lg' ref={containerRef}>
          <motion.div className='flex' style={{ x }}>
            {items.map((item) => (
              <div key={item.id} className='shrink-0 w-full h-[500px]'>
                <img
                  src={item.url}
                  alt={item.title}
                  className='w-full h-full object-cover rounded-lg select-none pointer-events-none'
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${
                index === 0
                  ? 'opacity-40 cursor-not-allowed'
                  : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
              }`}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </motion.button>

          {/* Next Button */}
          <motion.button
            disabled={index === items.length - 1}
            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${
                index === items.length - 1
                  ? 'opacity-40 cursor-not-allowed'
                  : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
              }`}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </motion.button>
          {/* Progress Indicator */}
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-white/20 rounded-xl border border-white/30'>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


demo.tsx
import { FramerCarousel } from "@/components/ui/framer-carousel";

export default function DemoOne() {
  return <FramerCarousel />;
}

```

Install NPM dependencies:
```bash
motion
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

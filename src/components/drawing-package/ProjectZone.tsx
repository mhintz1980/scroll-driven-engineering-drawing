import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { ProjectDetail, CalloutNote } from '../../data/drawingPackageData';

/**
 * ProjectZone — a project displayed as a detail view on an engineering drawing.
 * Features:
 * - Circular detail view border with label
 * - Leader line extending from the circle
 * - Scroll-driven entrance animation (scales from small to final)
 * - 4 callout notes with leader lines and horizontal text shelves
 */
export function ProjectZone({
  project,
  index,
  onClick,
}: {
  project: ProjectDetail;
  index: number;
  onClick?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Alternate layout: even projects on left, odd on right
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={containerRef}
      className="relative py-16 md:py-24 px-8 md:px-24"
      style={{ minHeight: '120vh' }}
    >
      <div className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-16 max-w-6xl mx-auto`}>

        {/* Detail view circle with image */}
        <motion.div
          className="relative flex-shrink-0"
        >
          {/* Detail view label above circle */}
          <div
            className="text-center mb-3 text-[11px] uppercase tracking-[0.2em] font-bold"
            style={{ color: 'var(--dp-accent)' }}
          >
            {project.detailLabel}
            <span className="ml-2 font-normal" style={{ color: 'var(--dp-text-dim)' }}>
              SCALE 2:1
            </span>
          </div>

          {/* Circular frame */}
          <button
            type="button"
            onClick={onClick}
            className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] cursor-pointer rounded-full overflow-hidden border-2 bg-transparent p-0 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
            style={{
              borderColor: 'var(--dp-accent)',
              boxShadow: '0 0 0 1px color-mix(in oklch, var(--dp-text) 26%, transparent), 0 0 40px color-mix(in oklch, var(--dp-accent) 18%, transparent)',
            }}
            aria-label={`Inspect ${project.title}`}
          >
            <span
              className="absolute inset-0 z-10 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 45% 35%, transparent 0 46%, rgba(20, 120, 255, 0.16) 72%, rgba(20, 120, 255, 0.24) 100%)',
                mixBlendMode: 'screen',
              }}
            />
            <img
              src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
              alt={project.title}
              className="h-full w-full object-cover opacity-90 saturate-[0.72] contrast-125"
              loading="lazy"
            />
          </button>

          {/* Leader line extending from circle to background */}
          <svg
            className="absolute pointer-events-none"
            style={{
              width: '120px',
              height: '120px',
              [isLeft ? 'right' : 'left']: '-100px',
              top: '20%',
            }}
            viewBox="0 0 120 120"
          >
            <line
              x1={isLeft ? 0 : 120}
              y1="60"
              x2={isLeft ? 100 : 20}
              y2="20"
              stroke="var(--dp-accent)"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Arrow at start */}
            <circle
              cx={isLeft ? 0 : 120}
              cy="60"
              r="3"
              fill="var(--dp-accent)"
              opacity="0.5"
            />
          </svg>

          {/* Project title below circle */}
          <div
            className="text-center mt-4 text-[12px] uppercase tracking-[0.1em] font-bold max-w-[360px]"
            style={{ color: 'var(--dp-text)' }}
          >
            {project.title}
          </div>
        </motion.div>

        {/* Callout notes — stacked vertically beside the detail view */}
        <div 
          className="flex-1 space-y-4 max-w-md p-6 rounded backdrop-blur-sm"
          style={{ background: 'rgba(9, 16, 25, 0.4)' }}
        >
          {project.calloutNotes.map((note, i) => (
            <LeaderCallout
              key={note.label}
              note={note}
              index={i}
              scrollProgress={scrollYProgress}
              reducedMotion={shouldReduceMotion ?? false}
              fromLeft={isLeft}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * LeaderCallout — a callout note with leader line and horizontal text shelf.
 * The leader starts with a dot (representing attachment to the detail view),
 * extends at an angle, then runs horizontal with text above.
 */
function LeaderCallout({
  note,
  index,
  scrollProgress,
  reducedMotion,
  fromLeft,
}: {
  note: CalloutNote;
  index: number;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  reducedMotion: boolean;
  fromLeft: boolean;
}) {
  const start = 0.2 + index * 0.1;
  const end = start + 0.08;
  const noteOpacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const noteX = useTransform(scrollProgress, [start, end], [fromLeft ? -30 : 30, 0]);

  // SVG leader line path length for draw-in animation
  const pathLength = useTransform(scrollProgress, [start, end], [0, 1]);

  return (
    <motion.div
      style={reducedMotion ? {} : { opacity: noteOpacity, x: noteX }}
      className="flex items-start gap-3"
    >
      {/* Leader line */}
      <svg width="60" height="32" viewBox="0 0 60 32" className="shrink-0 mt-1">
        {/* Angled segment */}
        <motion.line
          x1="0" y1="28" x2="20" y2="8"
          stroke="var(--dp-accent)"
          strokeWidth="1"
          style={reducedMotion ? {} : { pathLength }}
          opacity="0.7"
        />
        {/* Horizontal shelf */}
        <motion.line
          x1="20" y1="8" x2="58" y2="8"
          stroke="var(--dp-accent)"
          strokeWidth="1"
          style={reducedMotion ? {} : { pathLength }}
          opacity="0.7"
        />
        {/* Arrow dot at start */}
        <circle cx="0" cy="28" r="2.5" fill="var(--dp-accent)" opacity="0.7" />
        {/* Arrowhead at end */}
        <polygon points="55,5 60,8 55,11" fill="var(--dp-accent)" opacity="0.7" />
      </svg>

      {/* Note text */}
      <div
        className="border-b pb-2 flex-1"
        style={{ borderColor: 'var(--dp-border-dim)' }}
      >
        <div
          className="text-[9px] uppercase tracking-[0.15em] font-bold mb-0.5"
          style={{ color: 'var(--dp-accent)' }}
        >
          {note.label}
        </div>
        <div
          className="text-[11px] uppercase tracking-[0.03em] leading-snug"
          style={{ color: 'var(--dp-text)' }}
        >
          {note.value}
        </div>
      </div>
    </motion.div>
  );
}

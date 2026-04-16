import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect, useEffectEvent, useState } from 'react';
import {
  buildProjectMediaItems,
  getProjectMediaAutoplayDelay,
  getNextProjectMediaIndex,
  getProjectMediaIndex,
  getPreviousProjectMediaIndex,
  type ProjectMediaItem,
} from './projects-media';

type ProjectCardProject = {
  title: string;
  category: string;
  tags: string[];
  outcome?: string;
  image: string;
  gallery?: string[];
};

type ProjectCardProps = {
  projectIndex: number;
  project: ProjectCardProject;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  selectedMediaIndex?: number;
  onSelectMedia: (mediaIndex: number) => void;
  shouldReduceMotion: boolean;
  variants: Variants;
};

const formatFrameCount = (value: number) => String(value).padStart(2, '0');

const resolveProjectMediaSrc = (src: string) => `${import.meta.env.BASE_URL}${src}`;

const ProjectCardMediaHero = ({
  item,
  projectTitle,
  totalFrames,
  shouldReduceMotion,
  canPaginate,
  isLifted,
  onHoverChange,
  onSelectNext,
  onSelectPrevious,
}: {
  item: ProjectMediaItem;
  projectTitle: string;
  totalFrames: number;
  shouldReduceMotion: boolean;
  canPaginate: boolean;
  isLifted: boolean;
  onHoverChange: (isHovered: boolean) => void;
  onSelectNext: () => void;
  onSelectPrevious: () => void;
}) => (
  <div
    className="relative z-20 w-full aspect-[16/10]"
    onMouseEnter={() => onHoverChange(true)}
    onMouseLeave={() => onHoverChange(false)}
  >
    <motion.div
      className="absolute inset-0 origin-top"
      animate={
        shouldReduceMotion
          ? { scale: 1, y: 0 }
          : isLifted
            ? { scale: 1.08, y: -18 }
            : { scale: 1.01, y: 0 }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`relative h-full w-full overflow-hidden bg-background ${
          isLifted
            ? 'rounded-sm border border-accent-primary/15 shadow-[0_30px_90px_rgba(8,12,18,0.42)]'
            : 'border-b border-secondary/10'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={item.src}
            src={resolveProjectMediaSrc(item.src)}
            alt={projectTitle}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: shouldReduceMotion ? 1 : 1.02 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.65, ease: 'easeInOut' },
              scale: { duration: 0.65, ease: 'easeOut' },
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
        <div className="absolute left-4 top-4 z-10 bg-surface/85 backdrop-blur-md border border-accent-primary/20 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.16em] text-primary shadow-sm">
          <div className="text-secondary">Media Frame</div>
          <div className="mt-1 text-accent-primary">
            {item.sequence} / {formatFrameCount(totalFrames)}
          </div>
        </div>

        {canPaginate ? (
          <>
            <button
              type="button"
              aria-label={`Show previous ${projectTitle} image`}
              onClick={onSelectPrevious}
              className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/12 bg-black/55 text-white/80 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/35 hover:bg-black/68 hover:text-accent-primary focus-visible:opacity-100 group-hover:opacity-100"
            >
              <span className="font-mono text-base">←</span>
            </button>
            <button
              type="button"
              aria-label={`Show next ${projectTitle} image`}
              onClick={onSelectNext}
              className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/12 bg-black/55 text-white/80 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/35 hover:bg-black/68 hover:text-accent-primary focus-visible:opacity-100 group-hover:opacity-100"
            >
              <span className="font-mono text-base">→</span>
            </button>
          </>
        ) : null}
      </div>
    </motion.div>
  </div>
);

const ProjectCardMediaStage = ({
  item,
  projectTitle,
}: {
  item: ProjectMediaItem;
  projectTitle: string;
}) => (
  <div className="relative overflow-hidden rounded-sm border border-secondary/10 bg-background">
    <img
      src={resolveProjectMediaSrc(item.src)}
      alt={`${projectTitle} ${item.label}`}
      className="aspect-[16/10] w-full object-cover"
    />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent p-5">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">
        {item.overlayLabel}
      </div>
      <div className="mt-2 text-lg font-semibold text-white">
        {item.label}
      </div>
    </div>
  </div>
);

const ProjectCardMediaButton = ({
  item,
  projectTitle,
  isActive,
  onSelect,
}: {
  item: ProjectMediaItem;
  projectTitle: string;
  isActive: boolean;
  onSelect: () => void;
}) => (
  <button
    type="button"
    onClick={onSelect}
    className={`grid grid-cols-[88px_minmax(0,1fr)] gap-3 rounded-sm border p-2 text-left transition-colors ${
      isActive
        ? 'border-accent-primary/40 bg-accent-primary/8'
        : 'border-secondary/10 bg-surface/55 hover:border-accent-primary/20 hover:bg-accent-primary/5'
    }`}
  >
    <img
      src={resolveProjectMediaSrc(item.src)}
      alt={`${projectTitle} ${item.label}`}
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
        {item.thumbnailLabel}
      </div>
    </div>
  </button>
);

export const ProjectCard = ({
  projectIndex,
  project,
  isExpanded,
  onToggleExpanded,
  selectedMediaIndex,
  onSelectMedia,
  shouldReduceMotion,
  variants,
}: ProjectCardProps) => {
  const [isMediaHovered, setIsMediaHovered] = useState(false);
  const mediaItems = buildProjectMediaItems(project);
  const activeMediaIndex = getProjectMediaIndex(selectedMediaIndex, mediaItems.length);
  const activeMedia = mediaItems[activeMediaIndex];
  const autoplayDelay = getProjectMediaAutoplayDelay(projectIndex);
  const advanceHeroMedia = useEffectEvent(() => {
    onSelectMedia(getNextProjectMediaIndex(activeMediaIndex, mediaItems.length));
  });
  const selectPreviousMedia = useEffectEvent(() => {
    onSelectMedia(getPreviousProjectMediaIndex(activeMediaIndex, mediaItems.length));
  });
  const selectNextMedia = useEffectEvent(() => {
    onSelectMedia(getNextProjectMediaIndex(activeMediaIndex, mediaItems.length));
  });

  useEffect(() => {
    if (shouldReduceMotion || mediaItems.length <= 1) {
      return;
    }

    const autoplayInterval = window.setInterval(() => {
      advanceHeroMedia();
    }, autoplayDelay);

    return () => {
      window.clearInterval(autoplayInterval);
    };
  }, [autoplayDelay, mediaItems.length, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsMediaHovered(false);
    }
  }, [shouldReduceMotion]);

  return (
    <motion.div
      variants={variants}
      whileHover={shouldReduceMotion ? {} : { y: -8 }}
      className={`group relative flex flex-col rounded-sm transition-shadow ${
        isMediaHovered ? 'z-40' : 'z-10'
      }`}
    >
      <div className="relative flex flex-col rounded-sm border border-secondary/10 bg-surface shadow-sm transition-shadow hover:shadow-xl">
        <ProjectCardMediaHero
          item={activeMedia}
          projectTitle={project.title}
          totalFrames={mediaItems.length}
          shouldReduceMotion={shouldReduceMotion}
          canPaginate={mediaItems.length > 1}
          isLifted={!shouldReduceMotion && isMediaHovered}
          onHoverChange={setIsMediaHovered}
          onSelectNext={selectNextMedia}
          onSelectPrevious={selectPreviousMedia}
        />

        <div className="flex flex-1 flex-col justify-between p-8">
          <div>
            <h3 className="mb-2 text-2xl font-heading font-bold transition-colors group-hover:text-accent-primary">
              {project.title}
            </h3>
            <p className="mb-6 text-sm font-mono text-secondary">
              {project.category}
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-secondary/10 px-2.5 py-1 text-xs font-medium tracking-wide text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.outcome ? (
            <div className="flex items-start gap-3 rounded-r-sm border-l-2 border-emerald-500 bg-emerald-50 p-4 text-primary dark:bg-emerald-950/30">
              <span className="mt-0.5 flex-shrink-0 text-emerald-500">→</span>
              <p className="text-[15px] font-medium leading-snug">{project.outcome}</p>
            </div>
          ) : null}

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
                onClick={onToggleExpanded}
                className="inline-flex items-center gap-2 border border-accent-primary/20 bg-accent-primary/5 px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] text-accent-primary transition-colors hover:bg-accent-primary/10"
              >
                {isExpanded ? 'Hide Media Strip' : 'Review Media Strip'}
                <span className="text-primary/50">[{formatFrameCount(mediaItems.length)}]</span>
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
                    <ProjectCardMediaStage item={activeMedia} projectTitle={project.title} />

                    <div className="flex flex-col gap-3">
                      {mediaItems.map((item, mediaIndex) => (
                        <ProjectCardMediaButton
                          key={item.src}
                          item={item}
                          projectTitle={project.title}
                          isActive={mediaIndex === activeMediaIndex}
                          onSelect={() => onSelectMedia(mediaIndex)}
                        />
                      ))}
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
};

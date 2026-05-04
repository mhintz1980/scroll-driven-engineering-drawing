import { useEffect, useState } from 'react';
import { drawingScenes } from '../../data/drawingPackageData';

export function SceneIndicator() {
  const [activeScene, setActiveScene] = useState('scene-hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveScene(visibleEntries[0].target.id);
        }
      },
      { threshold: [0.25, 0.4, 0.6] }
    );

    drawingScenes.forEach((scene) => {
      const element = document.getElementById(scene.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToScene = (sceneId: string) => {
    document.getElementById(sceneId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      aria-label="Drawing sections"
    >
      {drawingScenes.map((scene) => {
        const isActive = activeScene === scene.id;

        return (
          <button
            key={scene.id}
            type="button"
            onClick={() => scrollToScene(scene.id)}
            className={`group relative flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[8px] font-bold transition-all duration-200 ${
              isActive ? 'scale-125' : 'scale-100'
            }`}
            style={{
              borderColor: isActive ? 'var(--dp-accent)' : 'var(--dp-border)',
              color: isActive ? 'var(--dp-accent)' : 'var(--dp-text-dim)',
              background: isActive ? 'var(--dp-accent-dim)' : 'var(--dp-bg)',
            }}
            aria-label={`${scene.label}: ${scene.subtitle}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {scene.label}
            <span
              className="pointer-events-none absolute right-full mr-3 whitespace-nowrap border px-2 py-1 text-[9px] uppercase tracking-[0.16em] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{
                borderColor: 'var(--dp-border)',
                color: 'var(--dp-text-dim)',
                background: 'var(--dp-bg)',
              }}
            >
              {scene.subtitle}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

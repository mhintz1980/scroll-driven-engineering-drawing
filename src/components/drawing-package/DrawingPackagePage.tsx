import '../../styles/drawing-package.css';
import { AnimatePresence, useReducedMotion, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import { DrawingBackground } from './DrawingBackground';
import { DrawingSheetBorder } from './DrawingSheetBorder';
import { TitleBlockHeader } from './TitleBlockHeader';
import { DrawingHero } from './DrawingHero';
import { ProjectZone } from './ProjectZone';
import { ProjectInspectionModal } from './ProjectInspectionModal';
import { SceneIndicator } from './SceneIndicator';
import { SpecTable } from './SpecTable';
import { GeneralNotes } from './GeneralNotes';
import { TitleBlockFooter } from './TitleBlockFooter';
import { projectDetails, type ProjectDetail } from '../../data/drawingPackageData';

/**
 * DrawingPackagePage — the full "Drawing Package" portfolio variation.
 * Structured as a continuous engineering drawing sheet with SVG linework background.
 */
export function DrawingPackagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inspectedProject, setInspectedProject] = useState<ProjectDetail | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div ref={containerRef} className="drawing-package relative min-h-screen">
      <DrawingBackground scrollYProgress={shouldReduceMotion ? undefined : scrollYProgress} />
      <DrawingSheetBorder />
      <TitleBlockHeader />

      <main className="relative z-10">
        <section id="scene-hero" className="drawing-scene">
          <DrawingHero />
        </section>

        {/* Section divider with section line convention */}
        <SectionDivider label="C — C" subtitle="PROJECT DETAIL VIEWS" />

        {/* Projects — detail views */}
        {projectDetails.map((project, i) => (
          <section key={project.id} id={`scene-p${i + 1}`} className="drawing-scene">
            <ProjectZone project={project} index={i} onClick={() => setInspectedProject(project)} />
          </section>
        ))}

        <SectionDivider label="D — D" subtitle="CAPABILITIES SPECIFICATION" />
        <section id="scene-services" className="drawing-scene">
          <SpecTable />
        </section>

        <SectionDivider label="E — E" subtitle="GENERAL NOTES" />
        <section id="scene-notes" className="drawing-scene">
          <GeneralNotes />
        </section>
      </main>

      <section id="scene-titleblock" className="drawing-scene relative z-10">
        <TitleBlockFooter />
      </section>

      <SceneIndicator />

      <AnimatePresence>
        {inspectedProject && (
          <ProjectInspectionModal
            project={inspectedProject}
            onClose={() => setInspectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * SectionDivider — engineering drawing section line marker.
 * Displays a horizontal ruled line with section label.
 */
function SectionDivider({ label, subtitle }: { label: string; subtitle: string }) {
  return (
    <div className="px-8 md:px-24 py-12">
      <div className="flex items-center gap-4">
        {/* Left marker */}
        <div
          className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-bold shrink-0"
          style={{ borderColor: 'var(--dp-accent)', color: 'var(--dp-accent)' }}
        >
          {label.charAt(0)}
        </div>
        {/* Line */}
        <div className="flex-1 border-t" style={{ borderColor: 'var(--dp-border)' }} />
        {/* Label */}
        <div className="text-[10px] uppercase tracking-[0.2em] shrink-0" style={{ color: 'var(--dp-text-dim)' }}>
          {subtitle}
        </div>
        {/* Line */}
        <div className="flex-1 border-t" style={{ borderColor: 'var(--dp-border)' }} />
        {/* Right marker */}
        <div
          className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-bold shrink-0"
          style={{ borderColor: 'var(--dp-accent)', color: 'var(--dp-accent)' }}
        >
          {label.charAt(0)}
        </div>
      </div>
    </div>
  );
}

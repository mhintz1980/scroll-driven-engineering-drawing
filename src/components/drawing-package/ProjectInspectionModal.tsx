import { motion } from 'framer-motion';
import { useEffect, useId, useRef } from 'react';
import type { ProjectDetail } from '../../data/drawingPackageData';

type ProjectInspectionModalProps = {
  project: ProjectDetail;
  onClose: () => void;
};

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function ProjectInspectionModal({ project, onClose }: ProjectInspectionModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    previousActiveElement.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return;
      }

      const focusableElements = [...panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)];
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;

      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default bg-black/80"
        onClick={onClose}
        aria-label="Close inspection overlay"
      />

      <motion.div
        ref={panelRef}
        className="relative z-10 grid h-dvh max-h-dvh w-full max-w-none grid-cols-1 overflow-y-auto border-2 md:mx-4 md:h-auto md:max-h-none md:max-w-5xl md:grid-cols-2 md:overflow-hidden"
        style={{ borderColor: 'var(--dp-border)', background: 'var(--dp-bg)' }}
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="h-[40dvh] w-full overflow-hidden border-b md:aspect-square md:h-auto md:border-b-0 md:border-r" style={{ borderColor: 'var(--dp-border)' }}>
          <img
            src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex min-h-0 flex-col p-5 md:min-h-[420px] md:p-6">
          <div className="mb-6 flex items-start justify-between gap-6 border-b pb-4" style={{ borderColor: 'var(--dp-border)' }}>
            <div>
              <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--dp-accent)' }}>
                {project.detailLabel} Inspection View
              </div>
              <h2 id={titleId} className="text-xl font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--dp-text)' }}>
                {project.title}
              </h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center border text-sm font-bold transition-colors focus:outline-none focus:ring-2"
              style={{
                borderColor: 'var(--dp-border)',
                color: 'var(--dp-accent)',
                background: 'var(--dp-surface)',
              }}
              aria-label="Close project inspection"
            >
              X
            </button>
          </div>

          <div className="mb-3 grid grid-cols-12 border text-[9px] font-bold uppercase tracking-[0.16em]" style={{ borderColor: 'var(--dp-border)', color: 'var(--dp-accent)' }}>
            <div className="col-span-4 border-r px-3 py-2" style={{ borderColor: 'var(--dp-border)' }}>
              Field
            </div>
            <div className="col-span-8 px-3 py-2">
              Specification
            </div>
          </div>

          <div className="flex-1 border-x border-t" style={{ borderColor: 'var(--dp-border-dim)' }}>
            {project.calloutNotes.map((note) => (
              <div
                key={note.label}
                className="grid grid-cols-12 border-b text-[11px] uppercase tracking-[0.05em]"
                style={{ borderColor: 'var(--dp-border-dim)' }}
              >
                <div className="col-span-4 border-r px-3 py-3 font-bold" style={{ borderColor: 'var(--dp-border-dim)', color: 'var(--dp-accent)' }}>
                  {note.label}
                </div>
                <div className="col-span-8 break-words px-3 py-3 leading-relaxed" style={{ color: 'var(--dp-text)' }}>
                  {note.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--dp-text-dim)' }}>
            Full image review | manufacturing notes
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

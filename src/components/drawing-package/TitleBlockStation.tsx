import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { titleBlock, revisionTable } from '../../data/drawingPackageData';
import { portfolioData } from '../../data/portfolioData';

export function TitleBlockStation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);
  const calibrationMode =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('calibrate');

  useLayoutEffect(() => {
    if (!containerRef.current || !tableRef.current) return;

    if (calibrationMode) {
      gsap.set(tableRef.current, { opacity: 1 });
      return;
    }

    gsap.set(tableRef.current, { opacity: 0, y: 30 });

    const container = containerRef.current;
    const playIntro = () => {
      if (!tableRef.current) return;
      gsap.to(tableRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true;
            playIntro();
            observer.unobserve(container);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [calibrationMode]);

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        top: '5800px',
        left: '6200px',
        width: '2400px',
        transformStyle: 'preserve-3d',
      }}
      data-zone-id="T"
    >
      {calibrationMode && (
        <div className="absolute inset-0 border border-amber-400/60" />
      )}

      <div ref={tableRef}>
        {/* Outer border */}
        <div
          className="border-2 bg-slate-950/95 backdrop-blur-sm"
          style={{ borderColor: 'var(--dp-accent)' }}
        >
          {/* Header: drawing title */}
          <div
            className="border-b-2 px-4 py-3 text-center"
            style={{ borderColor: 'var(--dp-accent)' }}
          >
            <div
              className="text-xl font-bold tracking-[0.12em] uppercase"
              style={{ color: 'var(--dp-accent)' }}
            >
              {titleBlock.drawingTitle}
            </div>
            <div
              className="text-[10px] tracking-[0.2em] mt-1"
              style={{ color: 'var(--dp-text-dim)' }}
            >
              {titleBlock.sheetLabel}
            </div>
          </div>

          {/* Revision table */}
          <div
            className="border-b px-4 py-2"
            style={{ borderColor: 'var(--dp-border-dim)' }}
          >
            <div
              className="text-[9px] uppercase tracking-[0.18em] mb-2 font-bold"
              style={{ color: 'var(--dp-accent)' }}
            >
              REVISION HISTORY
            </div>
            <table
              className="w-full text-[11px]"
              style={{ color: 'var(--dp-text)' }}
            >
              <tbody>
                {revisionTable.map((row) => (
                  <tr
                    key={row.rev}
                    className="border-b last:border-b-0"
                    style={{ borderColor: 'var(--dp-border-dim)' }}
                  >
                    <td
                      className="pr-3 py-1 font-bold w-12"
                      style={{
                        color:
                          row.rev === 'C'
                            ? 'oklch(0.72 0.19 155)'
                            : 'var(--dp-text-dim)',
                      }}
                    >
                      {row.rev}
                    </td>
                    <td className="pr-3 py-1 w-20 font-mono" style={{ color: 'var(--dp-text-dim)' }}>
                      {row.date}
                    </td>
                    <td className="py-1">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Field grid */}
          <div className="grid grid-cols-4 gap-px px-4 py-3">
            {(
              [
                ['DRAWN BY', titleBlock.drawnBy],
                ['CHECKED BY', titleBlock.checkedBy],
                ['DATE', titleBlock.date],
                ['REVISION', titleBlock.revision],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <div
                  className="text-[8px] uppercase tracking-[0.18em] mb-0.5"
                  style={{ color: 'var(--dp-text-dim)' }}
                >
                  {label}
                </div>
                <div className="text-sm font-bold" style={{ color: 'var(--dp-text)' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Contact row */}
          <div
            className="border-t-2 grid grid-cols-3 gap-px px-4 py-3"
            style={{ borderColor: 'var(--dp-accent)' }}
          >
            <div>
              <div
                className="text-[8px] uppercase tracking-[0.18em] mb-0.5"
                style={{ color: 'var(--dp-text-dim)' }}
              >
                CONTACT
              </div>
              <div className="text-sm" style={{ color: 'var(--dp-text)' }}>
                {portfolioData.personal.email}
              </div>
            </div>
            <div>
              <div
                className="text-[8px] uppercase tracking-[0.18em] mb-0.5"
                style={{ color: 'var(--dp-text-dim)' }}
              >
                LOCATION
              </div>
              <div className="text-sm" style={{ color: 'var(--dp-text)' }}>
                {portfolioData.personal.location}
              </div>
            </div>
            <div>
              <div
                className="text-[8px] uppercase tracking-[0.18em] mb-0.5"
                style={{ color: 'var(--dp-text-dim)' }}
              >
                STATUS
              </div>
              <div className="text-sm font-bold" style={{ color: 'oklch(0.72 0.19 155)' }}>
                AVAILABLE FOR WORK
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

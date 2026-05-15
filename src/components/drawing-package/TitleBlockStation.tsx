import { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { titleBlock, revisionTable } from '../../data/drawingPackageData';
import { portfolioData } from '../../data/portfolioData';

interface TitleBlockStationProps {
  /** Set to true when the camera arrives at this station */
  active?: boolean;
}

export function TitleBlockStation({ active }: TitleBlockStationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);
  const hasMounted = useRef(false);
  const playIntroRef = useRef<(() => void) | null>(null);
  const resetIntroRef = useRef<(() => void) | null>(null);
  const calibrationMode =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('calibrate');

  useLayoutEffect(() => {
    if (!containerRef.current || !tableRef.current) return;

    if (calibrationMode) {
      gsap.set(tableRef.current, { opacity: 1 });
      return;
    }

    const resetIntro = () => {
      if (!tableRef.current) return;
      gsap.killTweensOf(tableRef.current);
      gsap.set(tableRef.current, { opacity: 0, y: 30 });
    };

    resetIntro();
    resetIntroRef.current = resetIntro;

    const playIntro = () => {
      if (!tableRef.current) return;
      resetIntro();
      gsap.to(tableRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    // Store for active-prop trigger
    playIntroRef.current = playIntro;
    return undefined;
  }, [calibrationMode]);

  // The active prop is canonical for the event-driven camera.
  useEffect(() => {
    if (calibrationMode) return;

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (active && !hasTriggered.current && playIntroRef.current) {
      hasTriggered.current = true;
      playIntroRef.current();
    } else if (!active) {
      hasTriggered.current = false;
      resetIntroRef.current?.();
    }
  }, [active, calibrationMode]);

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        top: '910px',
        left: '1196px',
        width: '130px',
        transformStyle: 'preserve-3d',
      }}
      data-zone-id="T"
    >
      {calibrationMode && (
        <div className="absolute inset-0 border border-amber-400/60" />
      )}

      <div ref={tableRef}>
        <div
          className="border-[0.5px] bg-slate-950/95 backdrop-blur-[0.5px]"
          style={{ borderColor: 'var(--dp-accent)' }}
        >
          {/* Header */}
          <div
            className="border-b-[0.5px] px-2 py-1 text-center"
            style={{ borderColor: 'var(--dp-accent)' }}
          >
            <div
              className="text-[5px] font-bold tracking-[0.12em] uppercase"
              style={{ color: 'var(--dp-accent)' }}
            >
              {titleBlock.drawingTitle}
            </div>
            <div
              className="text-[2px] tracking-[0.2em] mt-0.5"
              style={{ color: 'var(--dp-text-dim)' }}
            >
              {titleBlock.sheetLabel}
            </div>
          </div>

          {/* Revision table */}
          <div
            className="border-b-[0.5px] px-2 py-1"
            style={{ borderColor: 'var(--dp-border-dim)' }}
          >
            <div
              className="text-[2px] uppercase tracking-[0.18em] mb-0.5 font-bold"
              style={{ color: 'var(--dp-accent)' }}
            >
              REVISION HISTORY
            </div>
            <table
              className="w-full text-[2px]"
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
                      className="pr-1 py-0.5 font-bold w-4"
                      style={{
                        color:
                          row.rev === 'C'
                            ? 'oklch(0.72 0.19 155)'
                            : 'var(--dp-text-dim)',
                      }}
                    >
                      {row.rev}
                    </td>
                    <td className="pr-1 py-0.5 w-7 font-mono" style={{ color: 'var(--dp-text-dim)' }}>
                      {row.date}
                    </td>
                    <td className="py-0.5">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Field grid */}
          <div className="grid grid-cols-4 gap-0.5 px-2 py-1">
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
                  className="text-[1.5px] uppercase tracking-[0.18em] mb-0.5"
                  style={{ color: 'var(--dp-text-dim)' }}
                >
                  {label}
                </div>
                <div className="text-[2.2px] font-bold" style={{ color: 'var(--dp-text)' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Contact row */}
          <div
            className="border-t-[0.5px] grid grid-cols-3 gap-0.5 px-2 py-1"
            style={{ borderColor: 'var(--dp-accent)' }}
          >
            <div>
              <div
                className="text-[1.5px] uppercase tracking-[0.18em] mb-0.5"
                style={{ color: 'var(--dp-text-dim)' }}
              >
                CONTACT
              </div>
              <div className="text-[2px]" style={{ color: 'var(--dp-text)' }}>
                {portfolioData.personal.email}
              </div>
            </div>
            <div>
              <div
                className="text-[1.5px] uppercase tracking-[0.18em] mb-0.5"
                style={{ color: 'var(--dp-text-dim)' }}
              >
                LOCATION
              </div>
              <div className="text-[2px]" style={{ color: 'var(--dp-text)' }}>
                {portfolioData.personal.location}
              </div>
            </div>
            <div>
              <div
                className="text-[1.5px] uppercase tracking-[0.18em] mb-0.5"
                style={{ color: 'var(--dp-text-dim)' }}
              >
                STATUS
              </div>
              <div className="text-[2px] font-bold" style={{ color: 'oklch(0.72 0.19 155)' }}>
                AVAILABLE FOR WORK
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

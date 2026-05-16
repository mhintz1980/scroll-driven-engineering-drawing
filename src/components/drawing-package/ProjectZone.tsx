import { useRef } from 'react';

const S = 0.1846;
const ZONE_SCALE = 4;

export interface ProjectZoneLayout {
  anchor: {
    x: number;
    y: number;
  };
}

export interface ProjectZoneProps {
  id: string;
  top: string;
  left: string;
  layout: ProjectZoneLayout;
  active?: boolean;
}

export function ProjectZone({
  id,
  top,
  left,
  layout,
  active,
}: ProjectZoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const calibrationMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('calibrate');

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        width: `${600 * ZONE_SCALE}px`,
        height: `${500 * ZONE_SCALE}px`,
        transformStyle: 'preserve-3d',
        transformOrigin: '0 0',
        transform: `scale(${1 / ZONE_SCALE})`,
      }}
      data-zone-id={id}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        fill="none"
        viewBox={`0 0 ${600 * ZONE_SCALE} ${500 * ZONE_SCALE}`}
        data-zone-anchor={id}
      >
        <circle
          cx={layout.anchor.x * ZONE_SCALE}
          cy={layout.anchor.y * ZONE_SCALE}
          r={8 * S * ZONE_SCALE}
          className={`fill-slate-900 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${active || calibrationMode ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          stroke="oklch(0.70 0.21 255)"
          strokeWidth={3 * S * ZONE_SCALE}
          style={{ transformOrigin: '50% 50%', transformBox: 'fill-box' }}
        />
        <circle
          cx={layout.anchor.x * ZONE_SCALE}
          cy={layout.anchor.y * ZONE_SCALE}
          r={3 * S * ZONE_SCALE}
          className={`fill-blue-400 transition-all duration-500 delay-100 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${active || calibrationMode ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          style={{ transformOrigin: '50% 50%', transformBox: 'fill-box' }}
        />
      </svg>
    </div>
  );
}

import { motion, motionValue, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * DrawingBackground — SVG engineering drawing linework background.
 * Renders faint white orthographic views, cross-sections, auxiliary views,
 * dimension lines, center marks, and hidden lines across the viewport.
 * Does NOT need to be geometrically accurate — just needs to read as
 * "engineering drawing" at a glance.
 */
export function DrawingBackground({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
  const stroke = 'rgba(255,255,255,0.07)';
  const strokeDim = 'rgba(255,255,255,0.04)';
  const strokeAccent = 'rgba(255,255,255,0.09)';
  const dash = '8 6';
  const centerDash = '20 4 4 4';
  const [isMobile, setIsMobile] = useState(false);
  const fallbackProgress = motionValue(0);
  const progress = scrollYProgress ?? fallbackProgress;
  const parallaxScale = isMobile ? 0.45 : 1;

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const updateIsMobile = () => setIsMobile(query.matches);

    updateIsMobile();
    query.addEventListener('change', updateIsMobile);

    return () => query.removeEventListener('change', updateIsMobile);
  }, []);

  const bgX = useTransform(progress, [0, 1], [0, -60 * parallaxScale]);
  const bgY = useTransform(progress, [0, 1], [0, -80 * parallaxScale]);
  const midX = useTransform(progress, [0, 1], [0, -100 * parallaxScale]);
  const midY = useTransform(progress, [0, 1], [0, -140 * parallaxScale]);
  const fgX = useTransform(progress, [0, 1], [0, -150 * parallaxScale]);
  const fgY = useTransform(progress, [0, 1], [0, -200 * parallaxScale]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1920 4800"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: slow parallax — dim background views */}
        <motion.g style={{ x: bgX, y: bgY }}>
        {/* === VIEW 3: Large assembly outline — mid page === */}
        <g>
          {/* Rectangular housing */}
          <rect x="800" y="200" width="500" height="300" fill="none" stroke={strokeDim} strokeWidth="0.6" />
          <rect x="830" y="230" width="440" height="240" fill="none" stroke={strokeDim} strokeWidth="0.3" />
          {/* Bolt holes */}
          {[850, 950, 1050, 1150, 1250].map((x) => (
            <g key={`bolt-${x}`}>
              <circle cx={x} cy={220} r="6" fill="none" stroke={strokeDim} strokeWidth="0.5" />
              <line x1={x} y1="212" x2={x} y2="228" stroke={strokeDim} strokeWidth="0.3" strokeDasharray={centerDash} />
              <line x1={x - 8} y1="220" x2={x + 8} y2="220" stroke={strokeDim} strokeWidth="0.3" strokeDasharray={centerDash} />
            </g>
          ))}
          {/* Internal features — hidden lines */}
          <rect x="900" y="280" width="300" height="160" fill="none" stroke={strokeDim} strokeWidth="0.4" strokeDasharray={dash} />
          <circle cx="1050" cy="360" r="60" fill="none" stroke={strokeDim} strokeWidth="0.4" strokeDasharray={dash} />
        </g>

        {/* === VIEW 5: Auxiliary view — angled projection === */}
        <g transform="rotate(-30, 1400, 800)">
          <rect x="1300" y="700" width="200" height="120" fill="none" stroke={strokeDim} strokeWidth="0.5" />
          <line x1="1350" y1="700" x2="1350" y2="820" stroke={strokeDim} strokeWidth="0.3" strokeDasharray={dash} />
          <line x1="1450" y1="700" x2="1450" y2="820" stroke={strokeDim} strokeWidth="0.3" strokeDasharray={dash} />
        </g>

        {/* === VIEW 6: Lower housing — spread across mid-page === */}
        <g>
          <rect x="600" y="1200" width="600" height="200" fill="none" stroke={strokeDim} strokeWidth="0.5" />
          <rect x="650" y="1230" width="500" height="140" fill="none" stroke={strokeDim} strokeWidth="0.3" />
          {/* Holes */}
          {[700, 800, 900, 1000, 1100].map((x) => (
            <circle key={`hole2-${x}`} cx={x} cy="1300" r="8" fill="none" stroke={strokeDim} strokeWidth="0.4" />
          ))}
          {/* Section line */}
          <line x1="580" y1="1300" x2="1220" y2="1300" stroke={strokeDim} strokeWidth="0.4" strokeDasharray={centerDash} />
        </g>

        {/* === Repeat some views further down for scrolling depth === */}
        <g transform="translate(200, 1800)">
          <rect x="80" y="120" width="400" height="250" fill="none" stroke={strokeDim} strokeWidth="0.5" />
          <circle cx="280" cy="245" r="70" fill="none" stroke={strokeDim} strokeWidth="0.4" />
          <circle cx="280" cy="245" r="40" fill="none" stroke={strokeDim} strokeWidth="0.3" strokeDasharray={dash} />
          <line x1="140" y1="245" x2="420" y2="245" stroke={strokeDim} strokeWidth="0.3" strokeDasharray={centerDash} />
          <line x1="280" y1="140" x2="280" y2="350" stroke={strokeDim} strokeWidth="0.3" strokeDasharray={centerDash} />
        </g>

        <g transform="translate(800, 2200)">
          <rect x="100" y="100" width="500" height="180" fill="none" stroke={strokeDim} strokeWidth="0.4" />
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={`h3-${i}`} cx={160 + i * 80} cy="190" r="10" fill="none" stroke={strokeDim} strokeWidth="0.3" />
          ))}
        </g>

        <g transform="translate(100, 3000)">
          <rect x="200" y="100" width="350" height="200" fill="none" stroke={strokeDim} strokeWidth="0.5" />
          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={`hatch3-${i}`}
              x1={200 + i * 20}
              y1="100"
              x2={200 + i * 20 + 50}
              y2="300"
              stroke={strokeDim}
              strokeWidth="0.2"
            />
          ))}
        </g>

        <g transform="translate(900, 3400)">
          <circle cx="200" cy="200" r="90" fill="none" stroke={strokeDim} strokeWidth="0.4" />
          <circle cx="200" cy="200" r="60" fill="none" stroke={strokeDim} strokeWidth="0.3" />
          <circle cx="200" cy="200" r="25" fill="none" stroke={strokeDim} strokeWidth="0.4" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return <line key={`t2-${i}`} x1={200 + Math.cos(a) * 60} y1={200 + Math.sin(a) * 60} x2={200 + Math.cos(a) * 90} y2={200 + Math.sin(a) * 90} stroke={strokeDim} strokeWidth="0.3" />;
          })}
        </g>
        </motion.g>

        {/* Layer 2: medium parallax — primary orthographic views */}
        <motion.g style={{ x: midX, y: midY }}>
        {/* === ORTHOGRAPHIC VIEW 1: Top-left — Front view of a shaft/housing === */}
        <g>
          {/* Outer rectangle */}
          <rect x="80" y="120" width="320" height="180" fill="none" stroke={stroke} strokeWidth="0.8" />
          {/* Inner bore */}
          <circle cx="240" cy="210" r="50" fill="none" stroke={stroke} strokeWidth="0.8" />
          <circle cx="240" cy="210" r="30" fill="none" stroke={strokeDim} strokeWidth="0.5" />
          {/* Center lines */}
          <line x1="160" y1="210" x2="320" y2="210" stroke={strokeDim} strokeWidth="0.4" strokeDasharray={centerDash} />
          <line x1="240" y1="140" x2="240" y2="280" stroke={strokeDim} strokeWidth="0.4" strokeDasharray={centerDash} />
          {/* Dimension lines */}
          <line x1="80" y1="330" x2="400" y2="330" stroke={strokeDim} strokeWidth="0.3" />
          <line x1="80" y1="300" x2="80" y2="340" stroke={strokeDim} strokeWidth="0.3" />
          <line x1="400" y1="300" x2="400" y2="340" stroke={strokeDim} strokeWidth="0.3" />
          {/* Arrows */}
          <polygon points="84,330 80,327 80,333" fill={strokeDim} />
          <polygon points="396,330 400,327 400,333" fill={strokeDim} />
        </g>

        {/* === ORTHOGRAPHIC VIEW 2: Right side — Side view === */}
        <g>
          <rect x="500" y="120" width="180" height="180" fill="none" stroke={stroke} strokeWidth="0.8" />
          {/* Hidden lines (dashed) for bore */}
          <line x1="560" y1="120" x2="560" y2="300" stroke={strokeDim} strokeWidth="0.5" strokeDasharray={dash} />
          <line x1="620" y1="120" x2="620" y2="300" stroke={strokeDim} strokeWidth="0.5" strokeDasharray={dash} />
          {/* Center line */}
          <line x1="590" y1="100" x2="590" y2="320" stroke={strokeDim} strokeWidth="0.4" strokeDasharray={centerDash} />
        </g>

        {/* === CROSS-SECTION A-A: Below front view === */}
        <g>
          <text x="80" y="440" fill={strokeAccent} fontSize="10" fontFamily="monospace" letterSpacing="2">SECTION A-A</text>
          <rect x="80" y="460" width="320" height="160" fill="none" stroke={stroke} strokeWidth="0.8" />
          {/* Hatching */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`hatch1-${i}`}
              x1={80 + i * 16}
              y1="460"
              x2={80 + i * 16 + 40}
              y2="620"
              stroke={strokeDim}
              strokeWidth="0.3"
            />
          ))}
          {/* Bore cutout (no hatching inside) */}
          <rect x="180" y="500" width="120" height="80" fill="var(--dp-bg, #1a1f35)" stroke={stroke} strokeWidth="0.6" />
        </g>

        {/* === VIEW 4: Gear profile — lower left === */}
        <g>
          <circle cx="300" cy="900" r="120" fill="none" stroke={stroke} strokeWidth="0.8" />
          <circle cx="300" cy="900" r="100" fill="none" stroke={strokeDim} strokeWidth="0.5" />
          <circle cx="300" cy="900" r="35" fill="none" stroke={stroke} strokeWidth="0.6" />
          {/* Gear teeth suggestion */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const x1 = 300 + Math.cos(angle) * 100;
            const y1 = 900 + Math.sin(angle) * 100;
            const x2 = 300 + Math.cos(angle) * 120;
            const y2 = 900 + Math.sin(angle) * 120;
            return <line key={`tooth-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeDim} strokeWidth="0.5" />;
          })}
          {/* Center lines */}
          <line x1="140" y1="900" x2="460" y2="900" stroke={strokeDim} strokeWidth="0.3" strokeDasharray={centerDash} />
          <line x1="300" y1="740" x2="300" y2="1060" stroke={strokeDim} strokeWidth="0.3" strokeDasharray={centerDash} />
        </g>

        {/* === VIEW 7: Detail cross section — lower right === */}
        <g>
          <text x="1400" y="1100" fill={strokeAccent} fontSize="10" fontFamily="monospace" letterSpacing="2">SECTION B-B</text>
          <rect x="1400" y="1120" width="200" height="280" fill="none" stroke={stroke} strokeWidth="0.7" />
          {/* Hatching */}
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={`hatch2-${i}`}
              x1={1400 + i * 14}
              y1="1120"
              x2={1400 + i * 14 + 60}
              y2="1400"
              stroke={strokeDim}
              strokeWidth="0.3"
            />
          ))}
        </g>

        </motion.g>

        {/* Layer 3: fast parallax — dimension annotations and labels */}
        <motion.g style={{ x: fgX, y: fgY }}>
        {/* === Scattered dimension lines and annotations === */}
        {/* Horizontal dimension */}
        <g>
          <line x1="800" y1="560" x2="1300" y2="560" stroke={strokeDim} strokeWidth="0.3" />
          <line x1="800" y1="550" x2="800" y2="570" stroke={strokeDim} strokeWidth="0.3" />
          <line x1="1300" y1="550" x2="1300" y2="570" stroke={strokeDim} strokeWidth="0.3" />
          <text x="1020" y="555" fill={strokeDim} fontSize="8" fontFamily="monospace" textAnchor="middle">12.500</text>
        </g>

        {/* Vertical dimension */}
        <g>
          <line x1="460" y1="460" x2="460" y2="620" stroke={strokeDim} strokeWidth="0.3" />
          <line x1="450" y1="460" x2="470" y2="460" stroke={strokeDim} strokeWidth="0.3" />
          <line x1="450" y1="620" x2="470" y2="620" stroke={strokeDim} strokeWidth="0.3" />
          <text x="475" y="545" fill={strokeDim} fontSize="8" fontFamily="monospace">4.250</text>
        </g>

        </motion.g>

        {/* Border frame */}
        <rect x="20" y="20" width="1880" height="4760" fill="none" stroke={strokeDim} strokeWidth="1" />
        <rect x="30" y="30" width="1860" height="4740" fill="none" stroke={strokeDim} strokeWidth="0.4" />
      </svg>
    </div>
  );
}

import { motion, motionValue, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { drawingPlates } from '../../data/drawingPackageData';



const sectionTicks = [
  { x: 470, y: 20, label: 'A' },
  { x: 970, y: 20, label: 'B' },
  { x: 1450, y: 20, label: 'C' },
  { x: 20, y: 350, label: 'A' },
  { x: 20, y: 760, label: 'B' },
  { x: 20, y: 1120, label: 'C' },
  { x: 1900, y: 350, label: 'A' },
  { x: 1900, y: 760, label: 'B' },
  { x: 1900, y: 1120, label: 'C' },
];



/**
 * DrawingBackground renders the sheet itself. It should read as a mechanical
 * drawing first, with page content floating over a complete blueprint surface.
 */
export function DrawingBackground({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
  const line = 'rgba(230,239,250,0.48)';
  const lineDim = 'rgba(230,239,250,0.22)';
  const lineFaint = 'rgba(230,239,250,0.12)';
  const lineStrong = 'rgba(245,249,255,0.72)';
  const blue = 'rgba(41,145,255,0.78)';
  const blueDim = 'rgba(41,145,255,0.34)';
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

  const plateX = useTransform(progress, [0, 1], [0, -34 * parallaxScale]);
  const plateY = useTransform(progress, [0, 1], [0, -26 * parallaxScale]);
  const drawingX = useTransform(progress, [0, 1], [0, -92 * parallaxScale]);
  const drawingY = useTransform(progress, [0, 1], [0, -76 * parallaxScale]);
  const detailX = useTransform(progress, [0, 1], [0, -150 * parallaxScale]);
  const detailY = useTransform(progress, [0, 1], [0, -116 * parallaxScale]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true" style={{ backgroundColor: '#091019' }}>
      <div className="absolute inset-0 z-0">
        {drawingPlates.map((plate, i) => (
          <DrawingPlateImage key={i} plate={plate} progress={progress} parallaxScale={parallaxScale} />
        ))}
      </div>
      <svg
        viewBox="0 0 1920 1400"
        className="h-full w-full relative z-10"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="minor-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={lineFaint} strokeWidth="0.55" />
          </pattern>
          <pattern id="major-grid" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke={lineDim} strokeWidth="0.9" />
          </pattern>
          <radialGradient id="sheet-vignette" cx="50%" cy="50%" r="68%">
            <stop offset="0%" stopColor="rgba(18,26,36,0)" />
            <stop offset="70%" stopColor="rgba(9,14,22,0.30)" />
            <stop offset="100%" stopColor="rgba(4,8,14,0.72)" />
          </radialGradient>
          <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="0.9" floodColor="rgba(188,220,255,0.28)" />
          </filter>
        </defs>

        <rect width="1920" height="1400" fill="url(#minor-grid)" />
        <rect width="1920" height="1400" fill="url(#major-grid)" />
        <rect width="1920" height="1400" fill="url(#sheet-vignette)" />

        <motion.g style={{ x: plateX, y: plateY }} filter="url(#line-glow)">
          <SheetFrame line={lineStrong} lineDim={lineDim} />
          <TitleBlock x={44} y={34} line={lineStrong} lineDim={lineDim} blue={blue} />
          <RevisionBlock x={1254} y={34} line={line} lineDim={lineDim} blue={blue} />
          <FooterBlock x={1060} y={1228} line={lineStrong} lineDim={lineDim} blue={blue} />

          {sectionTicks.map((tick) => (
            <SectionTick key={`${tick.x}-${tick.y}`} {...tick} line={lineStrong} />
          ))}
        </motion.g>

        <motion.g style={{ x: drawingX, y: drawingY }} filter="url(#line-glow)">
          {/* Project content drawing overlay lines will go here if needed */}
        </motion.g>

        <motion.g style={{ x: detailX, y: detailY }} filter="url(#line-glow)">
          <LeaderNetwork line={blue} blueDim={blueDim} />
          <DetailBubble cx={310} cy={620} r={170} label="DETAIL A" line={lineStrong} blue={blue} />
          <DetailBubble cx={670} cy={1030} r={142} label="DETAIL B" line={lineStrong} blue={blue} />
          <DetailBubble cx={1215} cy={470} r={146} label="DETAIL C" line={lineStrong} blue={blue} />
          <DetailBubble cx={360} cy={1188} r={138} label="DETAIL D" line={lineStrong} blue={blue} />
          <CalloutText x={1450} y={442} line={lineStrong} blue={blue} />
          <CalloutText x={148} y={930} line={lineStrong} blue={blue} compact />
          <CalloutText x={575} y={1186} line={lineStrong} blue={blue} compact />
        </motion.g>
      </svg>
    </div>
  );
}

function SheetFrame({ line, lineDim }: { line: string; lineDim: string }) {
  return (
    <g>
      <rect x="28" y="28" width="1864" height="1328" fill="none" stroke={line} strokeWidth="2.2" />
      <rect x="50" y="50" width="1820" height="1284" fill="none" stroke={lineDim} strokeWidth="1" />
      <line x1="28" y1="128" x2="1888" y2="128" stroke={lineDim} strokeWidth="1" />
      <line x1="28" y1="1210" x2="1888" y2="1210" stroke={lineDim} strokeWidth="1" />
    </g>
  );
}

function SectionTick({ x, y, label, line }: { x: number; y: number; label: string; line: string }) {
  const vertical = x < 40 || x > 1880;
  return (
    <g>
      {vertical ? (
        <line x1={x} y1={y - 40} x2={x} y2={y + 40} stroke={line} strokeWidth="1.4" />
      ) : (
        <line x1={x - 55} y1={y} x2={x + 55} y2={y} stroke={line} strokeWidth="1.4" />
      )}
      <text x={x + (vertical ? 18 : 0)} y={y + (vertical ? 4 : 20)} fill={line} fontSize="18" fontFamily="monospace" textAnchor={vertical ? 'start' : 'middle'}>
        {label}
      </text>
    </g>
  );
}

function TitleBlock({ x, y, line, lineDim, blue }: { x: number; y: number; line: string; lineDim: string; blue: string }) {
  return (
    <g>
      <rect x={x} y={y} width="900" height="168" fill="rgba(9,16,25,0.34)" stroke={line} strokeWidth="1.7" />
      <line x1={x} y1={y + 84} x2={x + 900} y2={y + 84} stroke={line} strokeWidth="1.1" />
      <line x1={x + 520} y1={y + 84} x2={x + 520} y2={y + 168} stroke={lineDim} strokeWidth="1" />
      <line x1={x + 660} y1={y + 84} x2={x + 660} y2={y + 168} stroke={lineDim} strokeWidth="1" />
      <text x={x + 18} y={y + 28} fill={line} fontSize="15" fontFamily="monospace">DRAWING TITLE:</text>
      <text x={x + 70} y={y + 72} fill={line} fontSize="43" fontFamily="monospace" letterSpacing="4">DESIGN + MANUFACTURING BRIDGE</text>
      <text x={x + 18} y={y + 115} fill={line} fontSize="15" fontFamily="monospace">NAME:</text>
      <text x={x + 70} y={y + 154} fill={line} fontSize="31" fontFamily="monospace" letterSpacing="2">MARK HINTZ</text>
      <text x={x + 540} y={y + 115} fill={lineDim} fontSize="14" fontFamily="monospace">REVISION:</text>
      <text x={x + 585} y={y + 154} fill={blue} fontSize="32" fontFamily="monospace">C</text>
      <text x={x + 680} y={y + 115} fill={lineDim} fontSize="14" fontFamily="monospace">DATE:</text>
      <text x={x + 720} y={y + 154} fill={line} fontSize="28" fontFamily="monospace">2026</text>
      <path d={`M ${x + 520} ${y + 168} v 40 h 35`} fill="none" stroke={line} strokeWidth="1.1" />
      <text x={x + 552} y={y + 221} fill={line} fontSize="20" fontFamily="monospace">A</text>
    </g>
  );
}

function RevisionBlock({ x, y, line, lineDim, blue }: { x: number; y: number; line: string; lineDim: string; blue: string }) {
  return (
    <g>
      <rect x={x} y={y} width="520" height="64" fill="rgba(9,16,25,0.28)" stroke={line} strokeWidth="1.2" />
      <line x1={x + 84} y1={y} x2={x + 84} y2={y + 64} stroke={lineDim} />
      <line x1={x + 330} y1={y} x2={x + 330} y2={y + 64} stroke={lineDim} />
      <line x1={x} y1={y + 24} x2={x + 520} y2={y + 24} stroke={lineDim} />
      <text x={x + 18} y={y + 17} fill={line} fontSize="10" fontFamily="monospace">REV</text>
      <text x={x + 104} y={y + 17} fill={line} fontSize="10" fontFamily="monospace">DESCRIPTION</text>
      <text x={x + 350} y={y + 17} fill={line} fontSize="10" fontFamily="monospace">DATE</text>
      {['A', 'B'].map((rev, index) => (
        <g key={rev}>
          <text x={x + 24} y={y + 42 + index * 16} fill={blue} fontSize="12" fontFamily="monospace">{rev}</text>
          <text x={x + 104} y={y + 42 + index * 16} fill={lineDim} fontSize="10" fontFamily="monospace">
            {index === 0 ? 'INITIAL RELEASE' : 'DRAWING PACKAGE BUILD'}
          </text>
          <text x={x + 350} y={y + 42 + index * 16} fill={lineDim} fontSize="10" fontFamily="monospace">
            {index === 0 ? '2024' : '2026'}
          </text>
        </g>
      ))}
    </g>
  );
}

function FooterBlock({ x, y, line, lineDim, blue }: { x: number; y: number; line: string; lineDim: string; blue: string }) {
  const columns = ['CONTACT', 'LINKS', 'CAPABILITY', 'SHEET NOTES'];
  return (
    <g>
      <rect x={x} y={y} width="760" height="86" fill="rgba(9,16,25,0.36)" stroke={line} strokeWidth="1.4" />
      {columns.map((label, i) => (
        <g key={label}>
          {i > 0 && <line x1={x + i * 190} y1={y} x2={x + i * 190} y2={y + 86} stroke={lineDim} />}
          <text x={x + 18 + i * 190} y={y + 25} fill={line} fontSize="13" fontFamily="monospace">{label}</text>
          <text x={x + 18 + i * 190} y={y + 50} fill={blue} fontSize="10" fontFamily="monospace">MARKWORKS.DEV</text>
          <text x={x + 18 + i * 190} y={y + 67} fill={lineDim} fontSize="10" fontFamily="monospace">FIELD READY</text>
        </g>
      ))}
    </g>
  );
}




function DetailBubble({ cx, cy, r, label, line, blue }: { cx: number; cy: number; r: number; label: string; line: string; blue: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="rgba(21,36,56,0.28)" stroke={blue} strokeWidth="2.2" />
      <circle cx={cx} cy={cy} r={r - 18} fill="none" stroke="rgba(230,239,250,0.16)" strokeWidth="0.9" />
      <text x={cx} y={cy + r + 38} fill={blue} fontSize="17" fontFamily="monospace" textAnchor="middle">{label}</text>
      <text x={cx + 72} y={cy + r + 38} fill={line} fontSize="13" fontFamily="monospace">SCALE 2:1</text>
    </g>
  );
}

function LeaderNetwork({ line, blueDim }: { line: string; blueDim: string }) {
  return (
    <g>
      <polyline points="310,620 650,620 835,770 1030,770" fill="none" stroke={line} strokeWidth="1.7" />
      <polyline points="670,1030 850,830 1215,470" fill="none" stroke={line} strokeWidth="1.7" />
      <polyline points="360,1188 500,1080 670,1030" fill="none" stroke={line} strokeWidth="1.7" />
      <polyline points="1215,470 1380,470 1440,442" fill="none" stroke={line} strokeWidth="1.7" />
      <circle cx="835" cy="770" r="7" fill="none" stroke={line} strokeWidth="1.5" />
      <circle cx="1030" cy="770" r="4" fill={line} />
      <path d="M 70 1220 C 310 1110, 580 1180, 845 1325" fill="none" stroke={blueDim} strokeWidth="1.2" />
      <path d="M 970 210 C 1130 150, 1310 210, 1518 342" fill="none" stroke={blueDim} strokeWidth="1.2" />
    </g>
  );
}

function CalloutText({ x, y, line, blue, compact = false }: { x: number; y: number; line: string; blue: string; compact?: boolean }) {
  const rows = compact
    ? [
        ['MAT', '6061-T6 ALUMINUM'],
        ['TOL', '+/- 0.005 MM'],
        ['PROC', '5-AXIS CNC MILLING'],
        ['OUT', 'TESTED PACKAGE'],
      ]
    : [
        ['MATERIAL', '7075-T6 ALUMINUM'],
        ['TOLERANCE', '+/- 0.0005 IN'],
        ['PROCESS', 'MILL-TURN + INSPECTION'],
        ['OUTCOME', 'FIELD-READY PACKAGE'],
      ];

  return (
    <g>
      {rows.map(([label, value], index) => (
        <g key={label}>
          <text x={x} y={y + index * 25} fill={line} fontSize={compact ? 14 : 17} fontFamily="monospace">{label}:</text>
          <text x={x + (compact ? 62 : 118)} y={y + index * 25} fill={index === rows.length - 1 ? blue : line} fontSize={compact ? 14 : 17} fontFamily="monospace">{value}</text>
        </g>
      ))}
    </g>
  );
}

function DrawingPlateImage({ plate, progress, parallaxScale }: { plate: any; progress: MotionValue<number>; parallaxScale: number }) {
  const yOffset = useTransform(progress, [0, 1], [0, -1000 * plate.parallaxStrength * parallaxScale]);
  const filter = plate.invert ? 'invert(1) hue-rotate(180deg) brightness(0.8) contrast(1.2)' : 'none';
  
  return (
    <motion.img
      src={plate.src}
      alt=""
      style={{
        position: 'absolute',
        left: plate.x,
        top: plate.y,
        width: plate.width,
        opacity: plate.activeOpacity,
        scale: plate.scale,
        y: yOffset,
        filter,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
}









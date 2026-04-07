/**
 * Scene 1 — Blueprint Grid Draw-in
 * SVG grid animates in line-by-line, then typewriter text reveals.
 * Duration: 8s (240 frames)
 */
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, H, MARK, W } from "../constants";
import { TypewriterText } from "../components/AnimationPrimitives";
import { CornerMark, HRule, ScanlineOverlay } from "../components/UIAtoms";

export const BlueprintGridScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grid line reveal — staggered dash offset
  const gridOpacity = interpolate(frame, [0, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cross-hair center reveal
  const crossOpacity = interpolate(frame, [fps * 1.5, fps * 2.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Corner marks
  const cornerOpacity = interpolate(frame, [fps * 2, fps * 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Header rule scale
  const ruleStart = fps * 3;

  // Location tag
  const locationOpacity = interpolate(frame, [fps * 5, fps * 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const GRID_COLS = 16;
  const GRID_ROWS = 9;
  const cellW = W / GRID_COLS;
  const cellH = H / GRID_ROWS;

  return (
    <AbsoluteFill style={{ background: COLORS.bg, overflow: "hidden" }}>
      <ScanlineOverlay opacity={0.05} />

      {/* Blueprint grid SVG */}
      <svg
        width={W}
        height={H}
        style={{ position: "absolute", inset: 0, opacity: gridOpacity }}
        viewBox={`0 0 ${W} ${H}`}
      >
        {/* Vertical lines */}
        {Array.from({ length: GRID_COLS + 1 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={i * cellW}
            y1={0}
            x2={i * cellW}
            y2={H}
            stroke={COLORS.gridLine}
            strokeWidth={i === 0 || i === GRID_COLS ? 0.5 : 0.5}
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: GRID_ROWS + 1 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * cellH}
            x2={W}
            y2={i * cellH}
            stroke={COLORS.gridLine}
            strokeWidth={0.5}
          />
        ))}
        {/* Center crosshair */}
        <g opacity={crossOpacity}>
          <line x1={W / 2 - 40} y1={H / 2} x2={W / 2 + 40} y2={H / 2} stroke={COLORS.accent} strokeWidth={0.8} />
          <line x1={W / 2} y1={H / 2 - 24} x2={W / 2} y2={H / 2 + 24} stroke={COLORS.accent} strokeWidth={0.8} />
          <circle cx={W / 2} cy={H / 2} r={6} stroke={COLORS.accent} strokeWidth={0.8} fill="none" />
          {/* Diagonal tick marks at center */}
          <line x1={W / 2 - 4} y1={H / 2 - 4} x2={W / 2 + 4} y2={H / 2 + 4} stroke={COLORS.accent} strokeWidth={0.5} opacity={0.5} />
        </g>
        {/* Dots at grid intersections (sample) */}
        {[2, 4, 8, 12, 14].map((col) =>
          [2, 4, 5, 7].map((row) => (
            <circle
              key={`dot-${col}-${row}`}
              cx={col * cellW}
              cy={row * cellH}
              r={1.5}
              fill={COLORS.accent}
              opacity={gridOpacity * 0.4}
            />
          ))
        )}
      </svg>

      {/* Corner marks */}
      <div style={{ position: "absolute", inset: 0, opacity: cornerOpacity }}>
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />
      </div>

      {/* Content area — centered column */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        {/* Super header typewriter */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 13,
            color: COLORS.accent,
            letterSpacing: "0.14em",
            marginBottom: 20,
          }}
        >
          <TypewriterText
            text={MARK.superHeader}
            startFrame={Math.floor(fps * 2.5)}
            speed={18}
          />
        </div>

        {/* Horizontal rule */}
        <div style={{ marginBottom: 24 }}>
          <HRule startFrame={ruleStart} />
        </div>

        {/* Main title block */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            textTransform: "uppercase",
            opacity: interpolate(frame, [fps * 3.5, fps * 5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(
              frame,
              [fps * 3.5, fps * 5],
              [32, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}px)`,
          }}
        >
          PRECISION
          <br />
          <span style={{ color: COLORS.accent }}>ENGINEERING</span>
          <br />
          + AUTOMATION
        </div>

        {/* Bottom metadata row */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 32,
            opacity: locationOpacity,
          }}
        >
          {[
            { label: "LOCATION", value: "JAX FL" },
            { label: "EXPERIENCE", value: "15 YRS" },
            { label: "SPECIALTY", value: "MECH + SW" },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 9,
                  color: COLORS.textMuted,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  letterSpacing: "0.06em",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Version stamp */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 40,
          fontFamily: FONTS.mono,
          fontSize: 9,
          color: COLORS.textMuted,
          letterSpacing: "0.1em",
          opacity: cornerOpacity,
        }}
      >
        REV 1.0 · MARK-HINTZ-PORTFOLIO
      </div>
    </AbsoluteFill>
  );
};

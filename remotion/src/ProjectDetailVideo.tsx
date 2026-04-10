import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, interpolate, staticFile, Easing, spring } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";
import { noise2D } from "@remotion/noise";
import { COLORS, FONTS } from "./constants";
import { ProjectDetailProps } from "./schemas";
import { CornerMark, ScanlineOverlay, HRule } from "./components/UIAtoms";

import { Lottie } from "@remotion/lottie";
import reticleAnimation from "../public/assets/lotties/reticle.json";

// Component to draw GD&T Datum Symbol (e.g. [ A ], [ B ])
const DatumSymbol: React.FC<{ symbol: string; x: number; y: number; startFrame: number }> = ({ symbol, x, y, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 100 }
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const yOffset = interpolate(progress, [0, 1], [20, 0]);

  return (
    <g transform={`translate(${x}, ${y + yOffset})`} opacity={opacity}>
      <rect x={-15} y={-15} width={30} height={30} fill={COLORS.bgDeep} stroke={COLORS.accent} strokeWidth={1.5} />
      {/* Triangle leader anchor */}
      <polygon points="0,-15 -5,-25 5,-25" fill={COLORS.accent} />
      <line x1={0} y1={-25} x2={0} y2={-45} stroke={COLORS.accent} strokeWidth={1.5} />
      <text x={0} y={5} fill={COLORS.text} fontSize={16} fontFamily={FONTS.mono} fontWeight="bold" textAnchor="middle">
        {symbol}
      </text>
    </g>
  );
};

// Component for Technical Callout lines using @remotion/paths
const TechnicalLeader: React.FC<{ x1: number; y1: number; x2: number; y2: number; startFrame: number; label?: string }> = ({
  x1, y1, x2, y2, startFrame, label
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });

  const currentX = x1 + (x2 - x1) * progress;
  const currentY = y1 + (y2 - y1) * progress;

  return (
    <g>
      <line x1={x1} y1={y1} x2={currentX} y2={currentY} stroke={COLORS.accent} strokeWidth={1.5} opacity={progress > 0.1 ? 1 : 0} />
      {progress > 0.8 && (
        <circle cx={x1} cy={y1} r={3} fill={COLORS.accent} />
      )}
      {progress === 1 && label && (
        <text 
          x={x2 + 10} 
          y={y2 + 4} 
          fill={COLORS.accent} 
          fontSize={12} 
          fontFamily={FONTS.mono}
          opacity={interpolate(frame, [startFrame + 15, startFrame + 25], [0, 1], { extrapolateRight: "clamp" })}
        >
          {label}
        </text>
      )}
    </g>
  );
};

// Noise overlay combining @remotion/noise for analog tracking artifact
const AnalogNoise: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  // Calculate a slowly drifting noise offset
  const offsetX = frame * 2;
  const offsetY = frame * -1;
  const opacity = interpolate(noise2D("noiseAlpha", frame / 10, 0), [-1, 1], [0.03, 0.08]);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        mixBlendMode: "screen",
      }}
    />
  );
};

const SubPictureScene: React.FC<{
  item: ProjectDetailProps["subPictures"][0];
  index: number;
  total: number;
}> = ({ item, index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle digital zoom
  const scale = interpolate(frame, [0, fps * 4], [1, 1.05], { extrapolateRight: "clamp" });

  const labelSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200 },
  });

  const labelX = interpolate(labelSpring, [0, 1], [-20, 0]);
  const labelOpacity = interpolate(labelSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: COLORS.bgDeep }}>
      <AbsoluteFill style={{ scale: String(scale) }}>
        <Img 
          src={staticFile(item.src)} 
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} 
        />
        {/* Vignette mask */}
        <AbsoluteFill style={{ background: `radial-gradient(circle at center, transparent 40%, ${COLORS.bgDeep} 100%)` }} />
      </AbsoluteFill>

      {/* SVG overlays */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {/* Draw a structured reticle box */}
        <rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke={COLORS.gridLineBright} strokeWidth={1} strokeDasharray="4 8" />
        
        {/* Datum symbols */}
        {item.datumSymbols?.map((datum, i) => (
          <DatumSymbol 
            key={datum} 
            symbol={datum} 
            x={150 + i * 120} 
            y={500} 
            startFrame={30 + i * 10} 
          />
        ))}

        {/* Technical Callout dimension lines */}
        {item.dimensionLines?.map((line, i) => (
          <TechnicalLeader
            key={i}
            x1={line.x1} y1={line.y1}
            x2={line.x2} y2={line.y2}
            label={line.label}
            startFrame={40 + i * 15}
          />
        ))}
      </svg>

      <CornerMark position="tl" opacity={0.5} />
      <CornerMark position="br" opacity={0.5} />
      <ScanlineOverlay opacity={0.08} />
      <AnalogNoise />

      {/* Lottie Spinning Reticle Overlay in top-right */}
      <div style={{ position: "absolute", top: 35, right: 35, width: 40, height: 40, opacity: 0.7 }}>
        <Lottie animationData={reticleAnimation} />
      </div>

      {/* UI Hud for picture index */}
      <div style={{ position: "absolute", top: 40, left: 40, fontFamily: FONTS.mono, color: COLORS.accent, fontSize: 12, letterSpacing: "0.2em" }}>
        FILE {index + 1} // {total}
      </div>

      {/* UI Hud for picture label */}
      <div 
        style={{ 
          position: "absolute", 
          bottom: 60, 
          left: 60, 
          transform: `translateX(${labelX}px)`, 
          opacity: labelOpacity,
          padding: "12px 24px",
          borderLeft: `2px solid ${COLORS.accent}`,
          background: COLORS.bgPanel,
          backdropFilter: "blur(4px)"
        }}
      >
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textSecondary, marginBottom: 4, letterSpacing: "0.15em" }}>
          SYS.TARGET_LOCK
        </div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 24, fontWeight: "bold", color: COLORS.text, letterSpacing: "0.05em" }}>
          {item.label}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ProjectDetailVideo: React.FC<ProjectDetailProps> = ({ projectTitle, subPictures }) => {
  const { fps } = useVideoConfig();
  const INTER_SCENE_FRAMES = 4 * fps;

  return (
    <AbsoluteFill style={{ background: COLORS.bgDeep }}>
      <TransitionSeries>
        {subPictures.map((item, index) => (
          <React.Fragment key={index}>
            <TransitionSeries.Sequence durationInFrames={INTER_SCENE_FRAMES}>
              <SubPictureScene item={item} index={index} total={subPictures.length} />
            </TransitionSeries.Sequence>
            {index < subPictures.length - 1 && (
              <TransitionSeries.Transition
                presentation={wipe({ direction: index % 2 === 0 ? "from-top" : "from-left" })}
                timing={springTiming({ config: { damping: 200, mass: 0.5 }, durationInFrames: 25 })}
              />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>

      {/* Persistent global title */}
      <div style={{
        position: "absolute", top: 40, right: 40,
        fontFamily: FONTS.mono, color: COLORS.textMuted, fontSize: 12, letterSpacing: "0.15em"
      }}>
        {projectTitle}
      </div>
    </AbsoluteFill>
  );
};

import {noise2D} from "@remotion/noise";
import {getLength, getPointAtLength} from "@remotion/paths";
import {interpolate, useCurrentFrame} from "remotion";
import {H, W} from "../constants";
import type {RemixOverlayProps, RemixTheme, RemixTracePathConfig} from "../remixSchema";

export const tracePointsToSvgPath = (points: RemixTracePathConfig["points"]): string => {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ");
};

export const RemixBlueprintField: React.FC<{
  theme: RemixTheme;
  opacity?: number;
  cell?: number;
  majorEvery?: number;
}> = ({theme, opacity = 0.16, cell = 64, majorEvery = 4}) => {
  const frame = useCurrentFrame();
  const columns = Math.ceil(W / cell);
  const rows = Math.ceil(H / cell);

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{position: "absolute", inset: 0, opacity, pointerEvents: "none"}}
    >
      {Array.from({length: columns + 1}, (_, index) => {
        const jitter = noise2D(`remix-v-${index}`, frame * 0.01, 0) * 2.2;
        const x = index * cell + jitter;

        return (
          <line
            key={`v-${index}`}
            x1={x}
            y1={0}
            x2={x}
            y2={H}
            stroke={index % majorEvery === 0 ? theme.gridLineBright : theme.gridLine}
            strokeWidth={index % majorEvery === 0 ? 0.8 : 0.45}
          />
        );
      })}
      {Array.from({length: rows + 1}, (_, index) => {
        const jitter = noise2D(`remix-h-${index}`, 0, frame * 0.01) * 2.2;
        const y = index * cell + jitter;

        return (
          <line
            key={`h-${index}`}
            x1={0}
            y1={y}
            x2={W}
            y2={y}
            stroke={index % majorEvery === 0 ? theme.gridLineBright : theme.gridLine}
            strokeWidth={index % majorEvery === 0 ? 0.8 : 0.45}
          />
        );
      })}
    </svg>
  );
};

export const RemixNoiseOverlay: React.FC<{
  theme: RemixTheme;
  overlays: RemixOverlayProps;
}> = ({theme, overlays}) => {
  const frame = useCurrentFrame();
  const driftX = noise2D("noise-x", frame * 0.015, 0) * 18;
  const driftY = noise2D("noise-y", 0, frame * 0.015) * 18;
  const flash = 0.9 + noise2D("noise-flash", frame * 0.02, frame * 0.01) * 0.08;

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: overlays.noiseOpacity * flash,
          transform: `translate(${driftX}px, ${driftY}px) scale(1.03)`,
          backgroundImage: [
            `repeating-linear-gradient(0deg, transparent, transparent 2px, ${theme.scanline} 2px, ${theme.scanline} 3px)`,
            `radial-gradient(circle at 20% 20%, ${theme.accentSoft} 0%, transparent 36%)`,
            `radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 0%, transparent 28%)`,
          ].join(", "),
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 18%, transparent 82%, rgba(255,255,255,0.04) 100%)",
          opacity: 0.55,
        }}
      />
    </>
  );
};

export const RemixTracePath: React.FC<{
  theme: RemixTheme;
  overlays: RemixOverlayProps;
  points: RemixTracePathConfig["points"];
  startFrame?: number;
  endFrame?: number;
  label?: string;
}> = ({theme, overlays, points, startFrame = 0, endFrame = 30, label}) => {
  const frame = useCurrentFrame();
  const path = tracePointsToSvgPath(points);
  const length = getLength(path);
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentLength = Math.max(0, length * progress);
  const point = getPointAtLength(path, currentLength);

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible"}}
    >
      <path
        d={path}
        fill="none"
        stroke={theme.accent}
        strokeWidth={overlays.traceStrokeWidth}
        strokeOpacity={overlays.traceOpacity * 0.28}
        strokeDasharray={`${Math.max(1, length * 0.1)} ${Math.max(1, length * 0.03)}`}
      />
      <path
        d={path}
        fill="none"
        stroke={theme.accent}
        strokeWidth={overlays.traceStrokeWidth}
        strokeOpacity={overlays.traceOpacity}
        strokeDasharray={length}
        strokeDashoffset={length - currentLength}
      />
      <circle
        cx={point.x}
        cy={point.y}
        r={3}
        fill={theme.accent}
        fillOpacity={progress > 0.98 ? 0.35 : 0.85}
      />
      {label ? (
        <text
          x={point.x + 12}
          y={point.y - 10}
          fill={theme.textSecondary}
          fontSize={10}
          letterSpacing="0.16em"
          style={{textTransform: "uppercase"}}
        >
          {label}
        </text>
      ) : null}
    </svg>
  );
};

export const RemixReticle: React.FC<{
  theme: RemixTheme;
  overlays: RemixOverlayProps;
  x: number;
  y: number;
  radius?: number;
}> = ({theme, overlays, x, y, radius = 44}) => {
  const frame = useCurrentFrame();
  const drift = noise2D(`reticle-${x}-${y}`, frame * 0.01, 0) * 5;

  return (
    <div
      style={{
        position: "absolute",
        left: x + drift - radius,
        top: y - drift - radius,
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        border: `1px solid ${theme.borderStrong}`,
        opacity: overlays.reticleOpacity,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 10,
          borderRadius: "50%",
          border: `1px dashed ${theme.border}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: -12,
          bottom: -12,
          width: 1,
          background: theme.borderStrong,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: -12,
          right: -12,
          height: 1,
          background: theme.borderStrong,
        }}
      />
    </div>
  );
};

import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, W } from "../constants";

interface SpecReadoutProps {
  value: string;
  label: string;
  startFrame?: number;
  accent?: boolean;
}

/** Animates a single spec stat card — value slams in, label fades up */
export const SpecReadout: React.FC<SpecReadoutProps> = ({
  value,
  label,
  startFrame = 0,
  accent = false,
}) => {
  const frame = useCurrentFrame();

  const valueOpacity = interpolate(frame, [startFrame, startFrame + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const valueY = interpolate(frame, [startFrame, startFrame + 12], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });
  const labelOpacity = interpolate(frame, [startFrame + 8, startFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        borderLeft: `2px solid ${accent ? COLORS.accent : COLORS.gridLineBright}`,
        paddingLeft: 16,
        minWidth: 160,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 36,
          fontWeight: 700,
          color: accent ? COLORS.accent : COLORS.text,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          opacity: valueOpacity,
          transform: `translateY(${valueY}px)`,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 10,
          fontWeight: 400,
          color: COLORS.textSecondary,
          letterSpacing: "0.12em",
          marginTop: 6,
          opacity: labelOpacity,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
};

/** Blueprint scanline overlay — purely visual texture */
export const ScanlineOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)",
      opacity,
      pointerEvents: "none",
      zIndex: 100,
    }}
  />
);

/** Blueprint corner mark at a given position */
export const CornerMark: React.FC<{
  position: "tl" | "tr" | "bl" | "br";
  size?: number;
  opacity?: number;
}> = ({ position, size = 24, opacity = 0.6 }) => {
  const posStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 50,
    opacity,
  };

  const transforms: Record<string, React.CSSProperties> = {
    tl: { top: 32, left: 32 },
    tr: { top: 32, right: 32, transform: "rotate(90deg)" },
    bl: { bottom: 32, left: 32, transform: "rotate(-90deg)" },
    br: { bottom: 32, right: 32, transform: "rotate(180deg)" },
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ ...posStyle, ...transforms[position] }}
    >
      <path
        d="M0 12 L0 0 L12 0"
        stroke={COLORS.accent}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
};

/** Tag chip */
export const TagChip: React.FC<{ label: string; index: number; startFrame: number }> = ({
  label,
  index,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const delay = startFrame + index * 4;
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [delay, delay + 12], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: "inline-block",
        background: "rgba(37,99,235,0.12)",
        border: `1px solid rgba(37,99,235,0.4)`,
        borderRadius: 2,
        padding: "3px 10px",
        fontFamily: FONTS.mono,
        fontSize: 11,
        color: COLORS.accent,
        letterSpacing: "0.06em",
        textTransform: "uppercase" as const,
      }}
    >
      {label}
    </div>
  );
};

/** Horizontal rule / divider line */
export const HRule: React.FC<{ startFrame?: number; color?: string; opacity?: number }> = ({
  startFrame = 0,
  color = COLORS.gridLineBright,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const scaleX = interpolate(frame, [startFrame, startFrame + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  return (
    <div
      style={{
        width: "100%",
        height: 1,
        background: color,
        opacity,
        transformOrigin: "left center",
        transform: `scaleX(${scaleX})`,
      }}
    />
  );
};

/** Skills ticker — horizontally scrolling text strip */
export const SkillsTicker: React.FC<{
  skills: string[];
  speed?: number; // px per frame
}> = ({ skills, speed = 1.2 }) => {
  const frame = useCurrentFrame();
  const fullText = skills.map((s) => `${s}  ·  `).join("") + skills.map((s) => `${s}  ·  `).join("");
  // Estimated width per char ~12px at font-size 13
  const charWidth = 12;
  const totalWidth = fullText.length * charWidth * 0.6;
  const offset = (frame * speed) % (totalWidth / 2);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          transform: `translateX(-${offset}px)`,
          fontFamily: FONTS.mono,
          fontSize: 13,
          color: COLORS.textSecondary,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {fullText}
      </div>
    </div>
  );
};

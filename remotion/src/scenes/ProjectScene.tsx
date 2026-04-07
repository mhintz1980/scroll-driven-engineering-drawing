/**
 * ProjectScene — Reusable scene for each project showcase
 * Used 3× with different props (PumpTracker, Pump Package, Torque Wrench)
 * Duration: 12s (360 frames) each
 *
 * Layout: Full-bleed image LEFT, label card RIGHT
 * Entry: Image wipes in from left edge, label slams in from right
 */
import {
  AbsoluteFill,
  Img,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../constants";
import { CornerMark, HRule, ScanlineOverlay, TagChip } from "../components/UIAtoms";

export interface ProjectSceneProps {
  title: string;
  subtitle: string;
  category: string;
  outcome: string;
  outcomeLabel: string;
  image: string; // path relative to staticFile, e.g. "assets/images/..."
  tags: readonly string[];
  /** Wipe direction: "left" = image enters from left, "right" = from right */
  wipeDirection?: "left" | "right";
  /** Accent bar color override */
  accentColor?: string;
  projectIndex?: number;
}

export const ProjectScene: React.FC<ProjectSceneProps> = ({
  title,
  subtitle,
  category,
  outcome,
  outcomeLabel,
  image,
  tags,
  wipeDirection = "left",
  projectIndex = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image wipe reveal — clip-path from left or right
  const wipeProgress = interpolate(frame, [0, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const fromLeft = wipeDirection === "left";
  const clipStart = fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
  const clipEnd = "inset(0 0 0 0)";
  // We interpolate a percentage
  const pct = interpolate(wipeProgress, [0, 1], [100, 0]);
  const clipPath = fromLeft ? `inset(0 ${pct}% 0 0)` : `inset(0 0 0 ${pct}%)`;

  // Slight ken burns zoom on image
  const imgScale = interpolate(frame, [0, fps * 12], [1.06, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Label card slide-in
  const cardSpring = spring({
    frame: frame - fps * 0.8,
    fps,
    config: { damping: 200 },
    durationInFrames: fps * 0.8,
  });
  const cardX = interpolate(cardSpring, [0, 1], [60, 0]);
  const cardOpacity = interpolate(frame, [fps * 0.6, fps * 1.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Outcome stat spring
  const statSpring = spring({
    frame: frame - fps * 1.5,
    fps,
    config: { damping: 15, stiffness: 200, mass: 0.8 },
    durationInFrames: fps * 0.6,
  });
  const statY = interpolate(statSpring, [0, 1], [-30, 0]);
  const statOpacity = interpolate(frame, [fps * 1.3, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tag strip animate in
  const tagsStart = fps * 2;

  // Project number
  const numOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, overflow: "hidden" }}>
      <ScanlineOverlay opacity={0.05} />
      <CornerMark position="tl" opacity={0.4} />
      <CornerMark position="br" opacity={0.4} />

      {/* Full-bleed project image — LEFT 60% */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "60%",
          height: "100%",
          clipPath,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile(image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            transform: `scale(${imgScale})`,
          }}
        />
        {/* Dark gradient from right so card is legible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, transparent 40%, rgba(15,23,42,0.85) 100%)",
          }}
        />
        {/* Top-bottom vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(15,23,42,0.6) 0%, transparent 30%, transparent 70%, rgba(15,23,42,0.4) 100%)",
          }}
        />

        {/* Project number stamp */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: COLORS.accent,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: numOpacity,
          }}
        >
          {`// PROJECT.0${projectIndex + 1}`}
        </div>
      </div>

      {/* Label card — RIGHT column */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "46%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 60px 0 48px",
          transform: `translateX(${cardX}px)`,
          opacity: cardOpacity,
        }}
      >
        {/* Category mono label */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            color: COLORS.textMuted,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {category}
        </div>

        {/* Project title */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 42,
            fontWeight: 900,
            color: COLORS.text,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 13,
            color: COLORS.textSecondary,
            letterSpacing: "0.02em",
            marginBottom: 24,
          }}
        >
          {subtitle}
        </div>

        <HRule startFrame={0} />

        {/* Outcome stat */}
        <div
          style={{
            marginTop: 24,
            transform: `translateY(${statY}px)`,
            opacity: statOpacity,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 52,
              fontWeight: 900,
              color: COLORS.accent,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {outcome}
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11,
              color: COLORS.textSecondary,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            {outcomeLabel}
          </div>
        </div>

        {/* Tag strip */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap" as const,
            gap: 8,
            marginTop: 28,
          }}
        >
          {tags.map((tag, i) => (
            <TagChip key={tag} label={tag} index={i} startFrame={tagsStart} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

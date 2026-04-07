/**
 * Scene 2 — Identity Card
 * Mark's name slams in, spec readouts animate, profile image fades.
 * Duration: 10s (300 frames)
 */
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, MARK } from "../constants";
import { FadeIn } from "../components/AnimationPrimitives";
import { CornerMark, HRule, ScanlineOverlay, SpecReadout } from "../components/UIAtoms";

export const IdentityCardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Name slam-in with spring
  const nameSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 180, mass: 1.2 },
    durationInFrames: 30,
  });

  const nameY = interpolate(nameSpring, [0, 1], [-80, 0]);
  const nameOpacity = interpolate(nameSpring, [0, 0.4], [0, 1]);

  // Accent line scale
  const accentScale = interpolate(frame, [12, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });

  // Profile image
  const imgOpacity = interpolate(frame, [fps * 1.5, fps * 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [fps * 1.5, fps * 3.5], [1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Blueprint overlay on image
  const imgOverlayOpacity = interpolate(frame, [fps * 3, fps * 5], [0.5, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [fps * 4, fps * 5.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, overflow: "hidden" }}>
      <ScanlineOverlay opacity={0.05} />
      <CornerMark position="tl" opacity={0.5} />
      <CornerMark position="tr" opacity={0.5} />
      <CornerMark position="bl" opacity={0.5} />
      <CornerMark position="br" opacity={0.5} />

      {/* Left column — identity text */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 0,
          bottom: 0,
          width: 580,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Super label */}
        <FadeIn startFrame={0} durationFrames={20}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              color: COLORS.accent,
              letterSpacing: "0.18em",
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            // CANDIDATE PROFILE
          </div>
        </FadeIn>

        {/* Name — spring slam */}
        <div
          style={{
            transform: `translateY(${nameY}px)`,
            opacity: nameOpacity,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 80,
              fontWeight: 900,
              color: COLORS.text,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >
            {MARK.name}
          </div>
        </div>

        {/* Accent bar */}
        <div
          style={{
            marginTop: 20,
            marginBottom: 24,
            height: 3,
            background: COLORS.accent,
            transformOrigin: "left center",
            transform: `scaleX(${accentScale})`,
            width: 360,
          }}
        />

        {/* Spec readouts */}
        <div style={{ display: "flex", gap: 28, marginBottom: 32 }}>
          <SpecReadout value={MARK.tolerance} label="Tolerance" startFrame={fps * 2} accent />
          <SpecReadout value={MARK.experience} label="Experience" startFrame={fps * 2 + 12} />
          <SpecReadout value={MARK.location} label="Location" startFrame={fps * 2 + 24} />
        </div>

        {/* Horizontal rule */}
        <HRule startFrame={fps * 3} />

        {/* Tagline */}
        <div
          style={{
            marginTop: 20,
            fontFamily: FONTS.mono,
            fontSize: 18,
            color: COLORS.textSecondary,
            letterSpacing: "0.04em",
            opacity: taglineOpacity,
          }}
        >
          {MARK.tagline}
        </div>
      </div>

      {/* Right column — profile photo */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 460,
          overflow: "hidden",
          opacity: imgOpacity,
        }}
      >
        {/* Photo */}
        <Img
          src={staticFile("assets/images/profile.webp")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            transform: `scale(${imgScale})`,
          }}
        />

        {/* Blueprint overlay tint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, ${COLORS.bg} 0%, rgba(15,23,42,0.4) 50%, transparent 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(37,99,235,${imgOverlayOpacity})`,
            mixBlendMode: "multiply",
          }}
        />

        {/* Blueprint grid overlay on photo */}
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, opacity: 0.12 }}
          viewBox="0 0 460 720"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <line
              key={`pv${i}`}
              x1={i * 46}
              y1={0}
              x2={i * 46}
              y2={720}
              stroke={COLORS.accent}
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: 16 }, (_, i) => (
            <line
              key={`ph${i}`}
              x1={0}
              y1={i * 45}
              x2={460}
              y2={i * 45}
              stroke={COLORS.accent}
              strokeWidth={0.5}
            />
          ))}
        </svg>

        {/* Name tag label */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 32,
            fontFamily: FONTS.mono,
            fontSize: 10,
            color: COLORS.textSecondary,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: taglineOpacity,
          }}
        >
          PROFILE.WEBP · MH-2026
        </div>
      </div>
    </AbsoluteFill>
  );
};

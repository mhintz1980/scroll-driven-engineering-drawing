/**
 * Scene 6 — Skills Ticker + CTA
 * Final scene: scrolling skills strip, Mark's name, tagline, CTA text.
 * Duration: 8s (240 frames)
 */
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, MARK, SKILLS_TICKER } from "../constants";
import { CornerMark, HRule, ScanlineOverlay, SkillsTicker } from "../components/UIAtoms";

export const SkillsCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grid background reveal
  const bgOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Name spring entrance
  const nameSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: fps * 0.8,
  });
  const nameY = interpolate(nameSpring, [0, 1], [40, 0]);

  // Accent line
  const accentScale = interpolate(frame, [fps * 0.5, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });

  // Tagline
  const tagOpacity = interpolate(frame, [fps * 1.2, fps * 2.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA
  const ctaOpacity = interpolate(frame, [fps * 2.5, fps * 3.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(frame, [fps * 2.5, fps * 3.5], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ticker strip opacity
  const tickerOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom bar (email/contact)
  const bottomOpacity = interpolate(frame, [fps * 4, fps * 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse on CTA border
  const pulseOpacity = interpolate(
    Math.sin((frame / fps) * Math.PI * 1.5),
    [-1, 1],
    [0.3, 0.9]
  );

  return (
    <AbsoluteFill style={{ background: COLORS.bg, overflow: "hidden" }}>
      <ScanlineOverlay opacity={0.05} />

      {/* Blueprint background grid */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, opacity: bgOpacity * 0.5 }}
        viewBox="0 0 1280 720"
      >
        {Array.from({ length: 17 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={i * 80}
            y1={0}
            x2={i * 80}
            y2={720}
            stroke={COLORS.gridLine}
            strokeWidth={0.5}
          />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 80}
            x2={1280}
            y2={i * 80}
            stroke={COLORS.gridLine}
            strokeWidth={0.5}
          />
        ))}
      </svg>

      <CornerMark position="tl" />
      <CornerMark position="tr" />
      <CornerMark position="bl" />
      <CornerMark position="br" />

      {/* Skills ticker band */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          background: `rgba(37,99,235,0.08)`,
          borderBottom: `1px solid ${COLORS.gridLineBright}`,
          display: "flex",
          alignItems: "center",
          opacity: tickerOpacity,
          overflow: "hidden",
        }}
      >
        <SkillsTicker skills={SKILLS_TICKER} speed={1.4} />
      </div>

      {/* Main content — centered */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          gap: 0,
        }}
      >
        {/* Super label */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: COLORS.accent,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 16,
            opacity: bgOpacity,
          }}
        >
          // AVAILABLE FOR WORK
        </div>

        {/* Name */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 96,
            fontWeight: 900,
            color: COLORS.text,
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
            textTransform: "uppercase",
            transform: `translateY(${nameY}px)`,
            textAlign: "center",
          }}
        >
          {MARK.name}
        </div>

        {/* Accent bar */}
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            height: 3,
            background: COLORS.accent,
            transformOrigin: "center",
            transform: `scaleX(${accentScale})`,
            width: 480,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 20,
            color: COLORS.textSecondary,
            letterSpacing: "0.04em",
            textAlign: "center",
            opacity: tagOpacity,
            marginBottom: 36,
          }}
        >
          {MARK.tagline}
        </div>

        <div style={{ marginBottom: 36, width: "100%", maxWidth: 600 }}>
          <HRule startFrame={fps * 2.5} />
        </div>

        {/* CTA block */}
        <div
          style={{
            transform: `translateY(${ctaY}px)`,
            opacity: ctaOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              color: COLORS.textSecondary,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Come on. Let's build something cool together.
          </div>

          {/* Contact pill */}
          <div
            style={{
              marginTop: 8,
              border: `1px solid rgba(37,99,235,${pulseOpacity})`,
              borderRadius: 2,
              padding: "12px 32px",
              fontFamily: FONTS.mono,
              fontSize: 18,
              color: COLORS.accent,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "rgba(37,99,235,0.08)",
            }}
          >
            markworks.dev@gmail.com
          </div>
        </div>
      </div>

      {/* Bottom ticker band */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          background: `rgba(37,99,235,0.06)`,
          borderTop: `1px solid ${COLORS.gridLineBright}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          opacity: bottomOpacity,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            color: COLORS.textMuted,
            letterSpacing: "0.12em",
          }}
        >
          linkedin.com/in/mark-hintz-builds
        </span>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            color: COLORS.textMuted,
            letterSpacing: "0.12em",
          }}
        >
          JAX FL · {new Date().getFullYear()}
        </span>
      </div>
    </AbsoluteFill>
  );
};

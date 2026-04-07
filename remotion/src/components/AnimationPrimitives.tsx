import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../constants";

interface TypewriterProps {
  text: string;
  startFrame?: number;
  /** chars per second */
  speed?: number;
  style?: React.CSSProperties;
  cursorVisible?: boolean;
}

/**
 * Typewriter effect driven purely by useCurrentFrame().
 * Characters reveal one-by-one. No CSS animations.
 */
export const TypewriterText: React.FC<TypewriterProps> = ({
  text,
  startFrame = 0,
  speed = 14,
  style,
  cursorVisible = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const charsPerFrame = speed / fps;
  const elapsed = Math.max(0, frame - startFrame);
  const revealedCount = Math.min(text.length, Math.floor(elapsed * charsPerFrame));
  const revealed = text.slice(0, revealedCount);
  const isDone = revealedCount >= text.length;

  // Cursor blink — every 15 frames
  const cursorOpacity = isDone
    ? Math.floor(frame / 15) % 2 === 0 ? 1 : 0
    : 1;

  return (
    <span style={{ fontFamily: FONTS.mono, ...style }}>
      {revealed}
      {cursorVisible && (
        <span
          style={{
            opacity: cursorOpacity,
            color: COLORS.accent,
            marginLeft: 2,
          }}
        >
          █
        </span>
      )}
    </span>
  );
};

/** Simple fade-in wrapper driven by frame */
export const FadeIn: React.FC<{
  children: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
  style?: React.CSSProperties;
}> = ({ children, startFrame = 0, durationFrames = 20, style }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <div style={{ opacity, ...style }}>{children}</div>;
};

/** Slide-up entrance */
export const SlideUp: React.FC<{
  children: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, startFrame = 0, durationFrames = 20, distance = 40, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
  });
  const translateY = interpolate(progress, [0, 1], [distance, 0]);
  const opacity = interpolate(frame, [startFrame, startFrame + durationFrames * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ transform: `translateY(${translateY}px)`, opacity, ...style }}>
      {children}
    </div>
  );
};

import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {MARK} from "../../constants";
import {TypewriterText} from "../../components/AnimationPrimitives";
import type {
  RemixOverlayProps,
  RemixSceneOverlay,
  RemixTheme,
  ShowreelRemixProps,
} from "../../remixSchema";
import {
  RemixBlueprintField,
  RemixNoiseOverlay,
  RemixReticle,
  RemixTracePath,
} from "../RemixOverlays";
import {directionToAxis, directionToSign, getRemixBackground, remixFonts} from "../remixTheme";

const OPENING_VERBS = ["DESIGN", "MANUFACTURE", "ASSEMBLE", "INSPECT"] as const;

type RemixBlueprintGridSceneProps = Pick<
  ShowreelRemixProps,
  "introHeadlineTop" | "introHeadlineAccent" | "introHeadlineBottom" | "introBody"
> & {
  theme: RemixTheme;
  overlays: RemixOverlayProps;
  direction: "left" | "right" | "up" | "down";
  sceneOverlay: RemixSceneOverlay;
};

export const RemixBlueprintGridScene: React.FC<RemixBlueprintGridSceneProps> = ({
  introHeadlineTop,
  introHeadlineAccent,
  introHeadlineBottom,
  introBody,
  theme,
  overlays,
  direction,
  sceneOverlay,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const axis = directionToAxis(direction);
  const sign = directionToSign(direction);

  const titleOpacity = interpolate(frame, [fps * 1.1, fps * 2.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOffset = interpolate(frame, [fps * 1.1, fps * 2.2], [32 * sign, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyOpacity = interpolate(frame, [fps * 2, fps * 3.1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        position: "relative",
        background: getRemixBackground(theme),
        overflow: "hidden",
      }}
    >
      <RemixBlueprintField theme={theme} opacity={0.24} cell={56} majorEvery={4} />
      <RemixNoiseOverlay theme={theme} overlays={overlays} />
      {sceneOverlay.tracePaths.map((tracePath, index) => (
        <RemixTracePath
          key={`${tracePath.label ?? "trace"}-${index}`}
          theme={theme}
          overlays={overlays}
          points={tracePath.points}
          startFrame={tracePath.startFrame}
          endFrame={tracePath.endFrame}
          label={tracePath.label}
        />
      ))}
      {sceneOverlay.reticle ? (
        <RemixReticle
          theme={theme}
          overlays={overlays}
          x={sceneOverlay.reticle.x}
          y={sceneOverlay.reticle.y}
          radius={sceneOverlay.reticle.radius}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "58px 70px 54px",
          display: "grid",
          gridTemplateColumns: "1.45fr 0.9fr",
          gap: 36,
        }}
      >
        <div style={{display: "flex", flexDirection: "column"}}>
          <div
            style={{
              fontFamily: remixFonts.mono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: theme.accent,
            }}
          >
            OPENING SHEET / INDUSTRIAL REMIX
          </div>

          <div
            style={{
              marginTop: 18,
              fontFamily: remixFonts.mono,
              fontSize: 14,
              letterSpacing: "0.16em",
              color: theme.textSecondary,
            }}
          >
            <TypewriterText text="// MONOCHROME REVIEW FIELD" startFrame={8} speed={18} />
          </div>

          <div
            style={{
              marginTop: 30,
              opacity: titleOpacity,
              transform:
                axis === "x" ? `translateX(${titleOffset}px)` : `translateY(${titleOffset}px)`,
              fontFamily: remixFonts.mono,
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.06em",
              textTransform: "uppercase",
              color: theme.text,
              maxWidth: 760,
            }}
          >
            {introHeadlineTop}
            <br />
            <span style={{color: theme.accent}}>{introHeadlineAccent}</span>
            <br />
            {introHeadlineBottom}
          </div>

          <div
            style={{
              marginTop: 24,
              maxWidth: 770,
              opacity: bodyOpacity,
              fontFamily: remixFonts.sans,
              fontSize: 21,
              lineHeight: 1.45,
              color: theme.textSecondary,
            }}
          >
            {introBody}
          </div>

          <div style={{display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28}}>
            {OPENING_VERBS.map((verb, index) => (
              <div
                key={verb}
                style={{
                  opacity: interpolate(frame, [fps * 2.2 + index * 4, fps * 2.8 + index * 4], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(
                    frame,
                    [fps * 2.2 + index * 4, fps * 2.8 + index * 4],
                    [14, 0],
                    {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
                  )}px)`,
                  padding: "7px 12px",
                  border: `1px solid ${index === 0 ? theme.borderStrong : theme.border}`,
                  background: index === 0 ? theme.accentSoft : theme.panel,
                  color: index === 0 ? theme.text : theme.textSecondary,
                  fontFamily: remixFonts.mono,
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {verb}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {MARK.focusAreas.map((item, index) => (
              <div
                key={item}
                style={{
                  padding: "14px 14px 12px",
                  border: `1px solid ${theme.border}`,
                  background: theme.panel,
                  opacity: interpolate(frame, [fps * 3 + index * 4, fps * 3.6 + index * 4], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <div
                  style={{
                    fontFamily: remixFonts.mono,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: theme.textSecondary,
                  }}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
          {[
            ["Positioning", "Design + Manufacturing Bridge"],
            ["Primary signal", "Mechanical execution that survives production"],
            ["Visual mode", "High-contrast review deck / inspection overlay"],
          ].map(([label, value], index) => (
            <div
              key={label}
              style={{
                padding: "18px 18px 20px",
                border: `1px solid ${theme.border}`,
                background: theme.panel,
                opacity: interpolate(frame, [fps * 2 + index * 6, fps * 2.8 + index * 6], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateX(${interpolate(
                  frame,
                  [fps * 2 + index * 6, fps * 2.8 + index * 6],
                  [24, 0],
                  {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
                )}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: remixFonts.mono,
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: theme.textMuted,
                  marginBottom: 10,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: remixFonts.sans,
                  fontSize: 18,
                  lineHeight: 1.35,
                  color: theme.text,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

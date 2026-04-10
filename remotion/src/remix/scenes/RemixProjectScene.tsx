import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type {RemixOverlayProps, RemixProject, RemixSceneOverlay, RemixTheme} from "../../remixSchema";
import {
  RemixBlueprintField,
  RemixNoiseOverlay,
  RemixReticle,
  RemixTracePath,
} from "../RemixOverlays";
import {directionToAxis, directionToSign, getRemixBackground, remixFonts} from "../remixTheme";

export const RemixProjectScene: React.FC<
  Omit<RemixProject, "key"> & {
    theme: RemixTheme;
    overlays: RemixOverlayProps;
    direction: "left" | "right" | "up" | "down";
    sceneOverlay: RemixSceneOverlay;
  }
> = ({
  title,
  subtitle,
  category,
  reviewLabel,
  emphasis,
  outcome,
  outcomeLabel,
  image,
  tags,
  problem,
  constraint,
  decision,
  validation,
  callouts,
  theme,
  overlays,
  direction,
  sceneOverlay,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const axis = directionToAxis(direction);
  const sign = directionToSign(direction);

  const revealProgress = interpolate(frame, [0, fps * 1.15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const pct = interpolate(revealProgress, [0, 1], [100, 0]);
  const clipPath =
    direction === "left"
      ? `inset(0 ${pct}% 0 0)`
      : direction === "right"
        ? `inset(0 0 0 ${pct}%)`
        : direction === "up"
          ? `inset(${pct}% 0 0 0)`
          : `inset(0 0 ${pct}% 0)`;

  const panelOpacity = interpolate(frame, [fps * 0.75, fps * 1.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panelOffset = interpolate(frame, [fps * 0.75, fps * 1.8], [28 * sign, 0], {
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
      <RemixBlueprintField theme={theme} opacity={0.14} cell={66} majorEvery={4} />
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
          display: "grid",
          gridTemplateColumns: "1.18fr 0.95fr",
        }}
      >
        <div
          style={{
            position: "relative",
            clipPath,
            overflow: "hidden",
            borderRight: `1px solid ${theme.border}`,
          }}
        >
          <Img
            src={staticFile(image)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: `scale(${interpolate(frame, [0, fps * 12], [1.08, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })})`,
              filter:
                emphasis === "secondary"
                  ? "saturate(0.92) contrast(1.08) brightness(0.76)"
                  : "saturate(1.04) contrast(1.12) brightness(0.86)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.34) 38%, rgba(0,0,0,0.76) 100%)",
            }}
          />

          <div style={{position: "absolute", top: 28, left: 28, right: 28}}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 18,
                fontFamily: remixFonts.mono,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: theme.textSecondary,
              }}
            >
              <span>{category}</span>
              <span>{reviewLabel}</span>
            </div>

            <div style={{display: "flex", gap: 10, flexWrap: "wrap", maxWidth: 420}}>
              {callouts.map((callout, index) => (
                <div
                  key={callout}
                  style={{
                    padding: "6px 10px",
                    border: `1px solid ${index === 0 ? theme.borderStrong : theme.border}`,
                    background: index === 0 ? theme.accentSoft : theme.panelStrong,
                    color: index === 0 ? theme.text : theme.textSecondary,
                    fontFamily: remixFonts.mono,
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    opacity: interpolate(frame, [fps * 1.1 + index * 4, fps * 1.5 + index * 4], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  {callout}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "56px 56px 48px 44px",
            display: "flex",
            flexDirection: "column",
            opacity: panelOpacity,
            transform:
              axis === "x" ? `translateX(${panelOffset}px)` : `translateY(${panelOffset}px)`,
          }}
        >
          <div
            style={{
              fontFamily: remixFonts.mono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: theme.accent,
            }}
          >
            {emphasis === "primary" ? "Engineering review / remix" : "Systems review / remix"}
          </div>

          <div
            style={{
              marginTop: 14,
              fontFamily: remixFonts.mono,
              fontSize: 44,
              lineHeight: 0.92,
              letterSpacing: "-0.05em",
              fontWeight: 700,
              textTransform: "uppercase",
              color: theme.text,
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 10,
              fontFamily: remixFonts.sans,
              fontSize: 20,
              lineHeight: 1.35,
              color: theme.textSecondary,
            }}
          >
            {subtitle}
          </div>

          <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 22}}>
            {[
              ["Problem", problem],
              ["Constraint", constraint],
              ["Decision", decision],
              ["Validation", validation],
            ].map(([label, value], index) => (
              <div
                key={label}
                style={{
                  padding: "14px 16px 16px",
                  border: `1px solid ${theme.border}`,
                  background: label === "Validation" ? theme.panelStrong : theme.panel,
                  opacity: interpolate(frame, [fps * 1.1 + index * 6, fps * 1.8 + index * 6], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(
                    frame,
                    [fps * 1.1 + index * 6, fps * 1.8 + index * 6],
                    [18, 0],
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
                    color: theme.accent,
                    marginBottom: 8,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: remixFonts.sans,
                    fontSize: label === "Validation" ? 17 : 18,
                    lineHeight: 1.35,
                    color: label === "Validation" ? theme.textSecondary : theme.text,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "auto",
              padding: "18px 20px 20px",
              border: `1px solid ${theme.borderStrong}`,
              background: theme.panelStrong,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: remixFonts.mono,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: theme.textMuted,
                    marginBottom: 6,
                  }}
                >
                  Result
                </div>
                <div
                  style={{
                    fontFamily: remixFonts.mono,
                    fontSize: 52,
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                    color: theme.accent,
                  }}
                >
                  {outcome}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: remixFonts.mono,
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: theme.textSecondary,
                  }}
                >
                  {outcomeLabel}
                </div>
              </div>

              <div style={{display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end"}}>
                {tags.map((tag, index) => (
                  <div
                    key={tag}
                    style={{
                      padding: "6px 10px",
                      border: `1px solid ${theme.border}`,
                      background: theme.panel,
                      color: theme.textSecondary,
                      fontFamily: remixFonts.mono,
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      opacity: interpolate(frame, [fps * 3.1 + index * 3, fps * 3.6 + index * 3], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 12,
              }}
            >
              {[
                ["Category", category],
                ["Signal", emphasis === "primary" ? "Mechanical lead proof" : "Systems support proof"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    padding: "12px 14px",
                    border: `1px solid ${theme.border}`,
                    background: theme.panel,
                  }}
                >
                  <div
                    style={{
                      fontFamily: remixFonts.mono,
                      fontSize: 9,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: theme.textMuted,
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: remixFonts.sans,
                      fontSize: 15,
                      lineHeight: 1.3,
                      color: theme.text,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

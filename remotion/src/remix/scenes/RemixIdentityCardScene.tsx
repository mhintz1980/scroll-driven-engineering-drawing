import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {MARK} from "../../constants";
import type {RemixOverlayProps, RemixSceneOverlay, RemixTheme} from "../../remixSchema";
import {
  RemixBlueprintField,
  RemixNoiseOverlay,
  RemixReticle,
  RemixTracePath,
} from "../RemixOverlays";
import {directionToAxis, directionToSign, getRemixBackground, remixFonts} from "../remixTheme";

export const RemixIdentityCardScene: React.FC<{
  theme: RemixTheme;
  overlays: RemixOverlayProps;
  direction: "left" | "right" | "up" | "down";
  sceneOverlay: RemixSceneOverlay;
}> = ({theme, overlays, direction, sceneOverlay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const axis = directionToAxis(direction);
  const sign = directionToSign(direction);
  const textOpacity = interpolate(frame, [12, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textOffset = interpolate(frame, [12, fps * 1.5], [26 * sign, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const photoOpacity = interpolate(frame, [fps * 1.1, fps * 2.4], [0, 1], {
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
      <RemixBlueprintField theme={theme} opacity={0.18} cell={58} majorEvery={4} />
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
          padding: "58px 72px 54px",
          display: "grid",
          gridTemplateColumns: "1.42fr 0.8fr",
          gap: 34,
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
            PROFILE SHEET / INSPECTION DOSSIER
          </div>

          <div
            style={{
              marginTop: 18,
              opacity: textOpacity,
              transform:
                axis === "x" ? `translateX(${textOffset}px)` : `translateY(${textOffset}px)`,
            }}
          >
            <div
              style={{
                fontFamily: remixFonts.mono,
                fontSize: 74,
                lineHeight: 0.92,
                letterSpacing: "-0.06em",
                fontWeight: 700,
                textTransform: "uppercase",
                color: theme.text,
              }}
            >
              {MARK.name}
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: remixFonts.sans,
                fontSize: 26,
                lineHeight: 1.25,
                color: theme.textSecondary,
                maxWidth: 720,
              }}
            >
              {MARK.headline}
            </div>
          </div>

          <div style={{display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap"}}>
            {[["Tolerance", MARK.tolerance], ["Experience", MARK.experience], ["Location", MARK.location]].map(
              ([label, value], index) => (
                <div
                  key={label}
                  style={{
                    minWidth: 170,
                    padding: "14px 14px 12px",
                    border: `1px solid ${index === 0 ? theme.borderStrong : theme.border}`,
                    background: theme.panel,
                    opacity: interpolate(frame, [fps * 1.2 + index * 4, fps * 1.8 + index * 4], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <div
                    style={{
                      fontFamily: remixFonts.mono,
                      fontSize: 29,
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      color: index === 0 ? theme.accent : theme.text,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontFamily: remixFonts.mono,
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: theme.textSecondary,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ),
            )}
          </div>

          <div
            style={{
              marginTop: 22,
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            {MARK.credentials.map((credential, index) => (
              <div
                key={credential.label}
                style={{
                  padding: "16px 16px 18px",
                  border: `1px solid ${theme.border}`,
                  background: theme.panel,
                  opacity: interpolate(frame, [fps * 2 + index * 4, fps * 2.7 + index * 4], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(
                    frame,
                    [fps * 2 + index * 4, fps * 2.7 + index * 4],
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
                    marginBottom: 10,
                  }}
                >
                  {credential.label}
                </div>
                <div
                  style={{
                    fontFamily: remixFonts.sans,
                    fontSize: 18,
                    lineHeight: 1.35,
                    color: theme.text,
                  }}
                >
                  {credential.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display: "flex", flexDirection: "column", gap: 14}}>
          <div
            style={{
              padding: "14px 16px",
              border: `1px solid ${theme.border}`,
              background: theme.panelStrong,
              display: "flex",
              justifyContent: "space-between",
              fontFamily: remixFonts.mono,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: theme.textMuted,
            }}
          >
            <span>Candidate profile</span>
            <span>MH-2026-RMX</span>
          </div>

          <div
            style={{
              position: "relative",
              flex: 1,
              overflow: "hidden",
              border: `1px solid ${theme.border}`,
              background: theme.panel,
              opacity: photoOpacity,
            }}
          >
            <Img
              src={staticFile("assets/images/profile.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(1) contrast(1.08) brightness(0.9)",
                transform: `scale(${interpolate(frame, [0, fps * 8], [1.08, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })})`,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.32) 34%, rgba(0,0,0,0.7) 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

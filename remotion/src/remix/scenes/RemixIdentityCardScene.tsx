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

const ResumeTextCloud: React.FC<{
  theme: RemixTheme;
  sceneOverlay: RemixSceneOverlay;
}> = ({theme, sceneOverlay}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        border: `1px solid ${theme.border}`,
        background: `radial-gradient(circle at 20% 20%, ${theme.accentSoft} 0%, transparent 30%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 18,
          border: `1px dashed ${theme.border}`,
          opacity: 0.38,
        }}
      />
      {sceneOverlay.resumeTextBlocks?.map((block, index) => {
        const opacity = interpolate(
          frame,
          [block.startFrame, block.startFrame + 10, block.endFrame - 12, block.endFrame],
          [block.opacityFrom, block.opacityTo, block.opacityTo, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );
        const translateX = interpolate(frame, [block.startFrame, block.endFrame], [0, block.driftX], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const translateY = interpolate(frame, [block.startFrame, block.endFrame], [0, block.driftY], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const scale = interpolate(frame, [block.startFrame, block.endFrame], [block.scaleFrom, block.scaleTo], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const extraScale =
          block.movement === "scale-up" ? interpolate(frame, [block.startFrame, block.endFrame], [1, 1.12], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }) : block.movement === "scale-down" ? interpolate(frame, [block.startFrame, block.endFrame], [1, 0.92], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }) : 1;

        const color =
          block.emphasis === "hero" ? theme.text : block.emphasis === "accent" ? theme.accent : theme.textSecondary;
        const letterSpacing =
          block.emphasis === "hero" ? "-0.04em" : block.emphasis === "accent" ? "0.04em" : "0.12em";

        return (
          <div
            key={`${block.text}-${index}`}
            style={{
              position: "absolute",
              left: `${block.x * 100}%`,
              top: `${block.y * 100}%`,
              transform: `translate(${translateX}px, ${translateY}px) rotate(${block.rotate}deg) scale(${scale * extraScale})`,
              transformOrigin: "center",
              opacity,
              fontFamily: remixFonts.mono,
              fontSize: block.fontSize,
              fontWeight: block.emphasis === "support" ? 500 : 700,
              letterSpacing,
              textTransform: "uppercase",
              color,
              whiteSpace: "nowrap",
              textShadow:
                block.emphasis === "hero" ? `0 0 22px ${theme.accentSoft}` : "none",
            }}
          >
            {block.text}
          </div>
        );
      })}
    </div>
  );
};

const IdentityImageViewport: React.FC<{
  theme: RemixTheme;
  sceneOverlay: RemixSceneOverlay;
}> = ({theme, sceneOverlay}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        border: `1px solid ${theme.border}`,
        background: theme.panelStrong,
      }}
    >
      {sceneOverlay.imageSequence?.map((image, index) => {
        const fadeInEnd = Math.min(image.startFrame + 12, image.endFrame);
        const fadeOutStart = Math.max(image.endFrame - 12, image.startFrame);
        const opacity = interpolate(
          frame,
          [image.startFrame, fadeInEnd, fadeOutStart, image.endFrame],
          [0, image.opacity, image.opacity, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );
        const scale = interpolate(frame, [image.startFrame, image.endFrame], [image.scaleFrom, image.scaleTo], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={`${image.src}-${index}`}
            style={{
              position: "absolute",
              inset: 0,
              opacity,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            <Img
              src={staticFile(image.src)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "saturate(0.88) contrast(1.02) brightness(0.78)",
              }}
            />
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(3, 3, 3, 0.18) 0%, rgba(3, 3, 3, 0.04) 26%, rgba(3, 3, 3, 0.38) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 20% 22%, transparent 0%, transparent 34%, ${theme.bgDeep} 100%)`,
          mixBlendMode: "multiply",
          opacity: 0.82,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 18,
          border: `1px dashed ${theme.border}`,
          opacity: 0.34,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 18,
          top: 16,
          padding: "10px 12px 8px",
          border: `1px solid ${theme.border}`,
          background: "rgba(0, 0, 0, 0.46)",
          display: "flex",
          justifyContent: "space-between",
          gap: 14,
          fontFamily: remixFonts.mono,
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: theme.textMuted,
        }}
      >
        <span>Rendering viewport</span>
        <span>MH-2026-RMX</span>
      </div>
    </div>
  );
};

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
  const cloudOpacity = interpolate(frame, [fps * 1.1, fps * 2.4], [0, 1], {
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

        <div
          style={{
            position: "relative",
            minHeight: 0,
            opacity: cloudOpacity,
          }}
        >
          <IdentityImageViewport theme={theme} sceneOverlay={sceneOverlay} />
          <ResumeTextCloud theme={theme} sceneOverlay={sceneOverlay} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

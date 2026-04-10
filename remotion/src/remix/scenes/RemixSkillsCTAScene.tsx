import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {MARK, SKILLS_TICKER} from "../../constants";
import type {
  RemixOverlayProps,
  RemixSceneOverlay,
  RemixTheme,
  ShowreelRemixProps,
} from "../../remixSchema";
import {
  RemixBlueprintField,
  RemixNoiseOverlay,
  RemixTracePath,
} from "../RemixOverlays";
import {directionToAxis, directionToSign, getRemixBackground, remixFonts} from "../remixTheme";

type RemixSkillsCTASceneProps = Pick<
  ShowreelRemixProps,
  | "closingHeadlineTop"
  | "closingHeadlineBottom"
  | "closingBody"
  | "closingSummaryPrimary"
  | "closingSummarySecondary"
  | "contactEmail"
> & {
  theme: RemixTheme;
  overlays: RemixOverlayProps;
  direction: "left" | "right" | "up" | "down";
  sceneOverlay: RemixSceneOverlay;
};

export const RemixSkillsCTAScene: React.FC<RemixSkillsCTASceneProps> = ({
  closingHeadlineTop,
  closingHeadlineBottom,
  closingBody,
  closingSummaryPrimary,
  closingSummarySecondary,
  contactEmail,
  theme,
  overlays,
  direction,
  sceneOverlay,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const axis = directionToAxis(direction);
  const sign = directionToSign(direction);
  const headlineOpacity = interpolate(frame, [fps * 0.4, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineOffset = interpolate(frame, [fps * 0.4, fps * 1.5], [28 * sign, 0], {
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
      <RemixBlueprintField theme={theme} opacity={0.18} cell={64} majorEvery={4} />
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

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 44,
          display: "flex",
          alignItems: "center",
          padding: "0 26px",
          borderBottom: `1px solid ${theme.border}`,
          background: theme.bgPanel,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 28,
            whiteSpace: "nowrap",
            transform: `translateX(${-(frame * 2.4) % 600}px)`,
          }}
        >
          {[...SKILLS_TICKER, ...SKILLS_TICKER].map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              style={{
                fontFamily: remixFonts.mono,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: index % 3 === 0 ? theme.accent : theme.textSecondary,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "92px 96px 70px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
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
          CLOSING STATEMENT / MANUFACTURING THESIS
        </div>

        <div
          style={{
            marginTop: 20,
            opacity: headlineOpacity,
            transform:
              axis === "x" ? `translateX(${headlineOffset}px)` : `translateY(${headlineOffset}px)`,
            fontFamily: remixFonts.mono,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
            color: theme.text,
          }}
        >
          {closingHeadlineTop}
          <br />
          <span style={{color: theme.accent}}>{closingHeadlineBottom}</span>
        </div>

        <div
          style={{
            marginTop: 20,
            maxWidth: 840,
            opacity: interpolate(frame, [fps * 1.4, fps * 2.4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: remixFonts.sans,
            fontSize: 24,
            lineHeight: 1.45,
            color: theme.textSecondary,
          }}
        >
          {closingBody}
        </div>

        <div style={{display: "flex", gap: 10, flexWrap: "wrap", marginTop: 30, justifyContent: "center"}}>
          {[
            "MANUFACTURING FIRST",
            "INSPECTION VISIBLE",
            "ASSEMBLY LITERATE",
            "SYSTEMS AS SUPPORT",
          ].map((label, index) => (
            <div
              key={label}
              style={{
                padding: "6px 10px",
                border: `1px solid ${index === 0 ? theme.borderStrong : theme.border}`,
                background: index === 0 ? theme.accentSoft : theme.panelStrong,
                color: index === 0 ? theme.text : theme.textSecondary,
                fontFamily: remixFonts.mono,
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: interpolate(frame, [fps * 1.9 + index * 4, fps * 2.5 + index * 4], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 34,
            maxWidth: 900,
            padding: "22px 28px",
            border: `1px solid ${theme.borderStrong}`,
            background: theme.panelStrong,
            opacity: interpolate(frame, [fps * 2.4, fps * 3.5], [0, 1], {
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
              color: theme.textMuted,
              marginBottom: 10,
            }}
          >
            Positioning summary
          </div>
          <div
            style={{
              fontFamily: remixFonts.sans,
              fontSize: 22,
              lineHeight: 1.45,
              color: theme.text,
            }}
          >
            {closingSummaryPrimary}
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: remixFonts.sans,
              fontSize: 18,
              lineHeight: 1.45,
              color: theme.textSecondary,
            }}
          >
            {closingSummarySecondary}
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: remixFonts.mono,
              fontSize: 16,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: theme.textSecondary,
            }}
          >
            {MARK.name}
          </div>
          <div
            style={{
              padding: "14px 28px",
              border: `1px solid ${theme.borderStrong}`,
              background: theme.panelStrong,
            }}
          >
            <div
              style={{
                fontFamily: remixFonts.mono,
                fontSize: 18,
                letterSpacing: "0.08em",
                color: theme.accent,
                textTransform: "uppercase",
              }}
            >
              {contactEmail}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

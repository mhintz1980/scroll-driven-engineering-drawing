import {TransitionSeries, linearTiming, springTiming} from "@remotion/transitions";
import {fade} from "@remotion/transitions/fade";
import {wipe} from "@remotion/transitions/wipe";
import {AbsoluteFill} from "remotion";
import {FPS, TRANSITION_FRAMES} from "./constants";
import {defaultShowreelRemixProps, type ShowreelRemixProps} from "./remixSchema";
import {RemixBlueprintGridScene} from "./remix/scenes/RemixBlueprintGridScene";
import {RemixIdentityCardScene} from "./remix/scenes/RemixIdentityCardScene";
import {RemixProjectScene} from "./remix/scenes/RemixProjectScene";
import {RemixSkillsCTAScene} from "./remix/scenes/RemixSkillsCTAScene";

const SCENE_BLUEPRINT = 8 * FPS;
const SCENE_IDENTITY = 10 * FPS;
const SCENE_PROJECT = 12 * FPS;
const SCENE_CTA = 8 * FPS;

const toTransitionDirection = (direction: "left" | "right" | "up" | "down") => {
  if (direction === "left") {
    return "from-left" as const;
  }

  if (direction === "right") {
    return "from-right" as const;
  }

  if (direction === "up") {
    return "from-left" as const;
  }

  return "from-right" as const;
};

export const ShowreelRemixVideo: React.FC<ShowreelRemixProps> = ({
  introHeadlineTop = defaultShowreelRemixProps.introHeadlineTop,
  introHeadlineAccent = defaultShowreelRemixProps.introHeadlineAccent,
  introHeadlineBottom = defaultShowreelRemixProps.introHeadlineBottom,
  introBody = defaultShowreelRemixProps.introBody,
  closingHeadlineTop = defaultShowreelRemixProps.closingHeadlineTop,
  closingHeadlineBottom = defaultShowreelRemixProps.closingHeadlineBottom,
  closingBody = defaultShowreelRemixProps.closingBody,
  closingSummaryPrimary = defaultShowreelRemixProps.closingSummaryPrimary,
  closingSummarySecondary = defaultShowreelRemixProps.closingSummarySecondary,
  contactEmail = defaultShowreelRemixProps.contactEmail,
  projects = defaultShowreelRemixProps.projects,
  theme = defaultShowreelRemixProps.theme,
  overlays = defaultShowreelRemixProps.overlays,
  introDirection = defaultShowreelRemixProps.introDirection,
  identityDirection = defaultShowreelRemixProps.identityDirection,
  projectDirections = defaultShowreelRemixProps.projectDirections,
  closingDirection = defaultShowreelRemixProps.closingDirection,
  introScene = defaultShowreelRemixProps.introScene,
  identityScene = defaultShowreelRemixProps.identityScene,
  projectScenes = defaultShowreelRemixProps.projectScenes,
  closingScene = defaultShowreelRemixProps.closingScene,
}) => {
  const [projectOneRaw, projectTwoRaw, projectThreeRaw] = projects;
  const {key: _projectOneKey, ...projectOne} = projectOneRaw;
  const {key: _projectTwoKey, ...projectTwo} = projectTwoRaw;
  const {key: _projectThreeKey, ...projectThree} = projectThreeRaw;

  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_BLUEPRINT}>
          <RemixBlueprintGridScene
            introHeadlineTop={introHeadlineTop}
            introHeadlineAccent={introHeadlineAccent}
            introHeadlineBottom={introHeadlineBottom}
            introBody={introBody}
            theme={theme}
            overlays={overlays}
            direction={introDirection}
            sceneOverlay={introScene}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_IDENTITY}>
          <RemixIdentityCardScene
            theme={theme}
            overlays={overlays}
            direction={identityDirection}
            sceneOverlay={identityScene}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({direction: toTransitionDirection(projectDirections[0])})}
          timing={springTiming({config: {damping: 200}, durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <RemixProjectScene
            {...projectOne}
            theme={theme}
            overlays={overlays}
            direction={projectDirections[0]}
            sceneOverlay={projectScenes[0]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({direction: toTransitionDirection(projectDirections[1])})}
          timing={springTiming({config: {damping: 200}, durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <RemixProjectScene
            {...projectTwo}
            theme={theme}
            overlays={overlays}
            direction={projectDirections[1]}
            sceneOverlay={projectScenes[1]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({direction: toTransitionDirection(projectDirections[2])})}
          timing={springTiming({config: {damping: 200}, durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <RemixProjectScene
            {...projectThree}
            theme={theme}
            overlays={overlays}
            direction={projectDirections[2]}
            sceneOverlay={projectScenes[2]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_CTA}>
          <RemixSkillsCTAScene
            closingHeadlineTop={closingHeadlineTop}
            closingHeadlineBottom={closingHeadlineBottom}
            closingBody={closingBody}
            closingSummaryPrimary={closingSummaryPrimary}
            closingSummarySecondary={closingSummarySecondary}
            contactEmail={contactEmail}
            theme={theme}
            overlays={overlays}
            direction={closingDirection}
            sceneOverlay={closingScene}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

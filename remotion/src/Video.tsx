/**
 * Video.tsx — Main Showreel Composition
 *
 * Stitches all 6 scenes together using TransitionSeries.
 * Scene durations are calculated to land on TOTAL_FRAMES.
 *
 * Scenes:
 *  1. BlueprintGridScene  — 8s  (240 frames)
 *  2. IdentityCardScene   — 10s (300 frames)
 *  3. ProjectScene (PT)   — 12s (360 frames)
 *  4. ProjectScene (PP)   — 12s (360 frames)
 *  5. ProjectScene (TW)   — 12s (360 frames)
 *  6. SkillsCTAScene      — 8s  (240 frames)
 *
 * 5 transitions × 20 frames = 100 frames overlap
 * Total = 240+300+360+360+360+240 - 100 = 1760 frames ≈ 58.7s
 */
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill } from "remotion";

import { BlueprintGridScene } from "./scenes/BlueprintGridScene";
import { IdentityCardScene } from "./scenes/IdentityCardScene";
import { ProjectScene } from "./scenes/ProjectScene";
import { SkillsCTAScene } from "./scenes/SkillsCTAScene";
import { PROJECTS, TRANSITION_FRAMES, FPS } from "./constants";

const SCENE_BLUEPRINT = 8 * FPS;   // 240
const SCENE_IDENTITY  = 10 * FPS;  // 300
const SCENE_PROJECT   = 12 * FPS;  // 360
const SCENE_CTA       = 8 * FPS;   // 240

export const ShowreelVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* ── Scene 1: Blueprint Grid ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE_BLUEPRINT}>
          <BlueprintGridScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* ── Scene 2: Identity Card ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE_IDENTITY}>
          <IdentityCardScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES })}
        />

        {/* ── Scene 3: PumpTracker ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <ProjectScene
            {...PROJECTS[0]}
            image={PROJECTS[0].image.replace("../public/", "")}
            wipeDirection="left"
            projectIndex={0}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES })}
        />

        {/* ── Scene 4: Pump Package ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <ProjectScene
            {...PROJECTS[1]}
            image={PROJECTS[1].image.replace("../public/", "")}
            wipeDirection="right"
            projectIndex={1}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES })}
        />

        {/* ── Scene 5: Torque Wrench ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <ProjectScene
            {...PROJECTS[2]}
            image={PROJECTS[2].image.replace("../public/", "")}
            wipeDirection="left"
            projectIndex={2}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* ── Scene 6: Skills + CTA ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE_CTA}>
          <SkillsCTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

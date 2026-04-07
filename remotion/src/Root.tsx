/**
 * Root.tsx — Composition Registry
 *
 * This file registers ALL Remotion compositions for this project.
 * Future compositions (experiments, alternate scenes) should be added here.
 *
 * Registered compositions:
 *  - Showreel     : 1280×720  — Primary showreel (all 6 scenes)
 *  - Showreel1080 : 1920×1080 — Same video at full HD (for export)
 *
 * To add a new experimental composition:
 *  1. Create scenes in src/scenes/experiments/<name>/
 *  2. Create a video file in src/experiments/<name>.tsx
 *  3. Register below with a unique id
 */
import { Composition } from "remotion";
import { ShowreelVideo } from "./Video";
import { FPS, W, H } from "./constants";

// Total frames = sum of scene durations - (5 transitions × 20 frames)
const TOTAL_FRAMES = (8 + 10 + 12 + 12 + 12 + 8) * FPS - 5 * 20; // 1760

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── Primary: 1280 × 720 ── */}
      <Composition
        id="Showreel"
        component={ShowreelVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* ── Full HD: 1920 × 1080 ── */}
      <Composition
        id="Showreel1080"
        component={ShowreelVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/*
       * ── Experiment Slot ──
       * Uncomment and customize to add future experiments:
       *
       * import { MyExperiment } from "./experiments/MyExperiment";
       * <Composition
       *   id="Experiment01"
       *   component={MyExperiment}
       *   durationInFrames={900}
       *   fps={FPS}
       *   width={W}
       *   height={H}
       * />
       */}
    </>
  );
};

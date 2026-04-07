# Mark Hintz — Portfolio Showreel (Remotion)

Programmatic video showreel built with [Remotion](https://remotion.dev).

## Structure

```
remotion/
├── src/
│   ├── Root.tsx              ← Composition registry (register experiments here)
│   ├── Video.tsx             ← Main showreel — all 6 scenes sequenced
│   ├── constants.ts          ← Design tokens, video spec, portfolio data
│   ├── scenes/
│   │   ├── BlueprintGridScene.tsx   ← Scene 1: SVG grid draw-in
│   │   ├── IdentityCardScene.tsx    ← Scene 2: Name + spec readouts
│   │   ├── ProjectScene.tsx         ← Scenes 3-5: Reusable project card
│   │   ├── SkillsCTAScene.tsx       ← Scene 6: Skills ticker + CTA
│   │   └── experiments/             ← Alternate scene experiments (add here)
│   └── components/
│       ├── AnimationPrimitives.tsx  ← TypewriterText, FadeIn, SlideUp
│       └── UIAtoms.tsx              ← SpecReadout, TagChip, HRule, SkillsTicker...
├── out/                      ← Rendered videos (gitignored)
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

## Images

Images are loaded via `staticFile()` from:
```
../public/assets/images/   →   portfolio's public folder
```

No copying required — Remotion's dev server resolves these paths correctly.

## Commands

```bash
cd remotion
npm install

# Open Remotion Studio (preview + scrub)
npm run studio

# Render 720p showreel
npm run render

# Render 1080p showreel
npm run render:1080

# TypeScript check
npm run tsc
```

## Adding a New Experiment

1. Create `src/scenes/experiments/MyScene.tsx`
2. Create `src/experiments/MyVideo.tsx` (compose scenes)
3. Register in `src/Root.tsx`:

```tsx
import { MyVideo } from "./experiments/MyVideo";

<Composition
  id="Experiment01"
  component={MyVideo}
  durationInFrames={900}
  fps={30}
  width={1280}
  height={720}
/>
```

## Embed in Portfolio

After rendering, copy `out/showreel.mp4` to `../public/showreel.mp4` then:

```tsx
<video autoPlay loop muted playsInline src="/showreel.mp4" />
```

import {zTextarea} from "@remotion/zod-types";
import {z} from "zod";
import {defaultResumeTextBlocks} from "./remix/resumeText";

const ProjectSchema = z.object({
  key: z.string(),
  title: z.string(),
  subtitle: z.string(),
  category: z.string(),
  reviewLabel: z.string(),
  emphasis: z.enum(["primary", "secondary"]),
  outcome: z.string(),
  outcomeLabel: z.string(),
  image: z.string(),
  tags: z.array(z.string()),
  problem: zTextarea(),
  constraint: zTextarea(),
  decision: zTextarea(),
  validation: zTextarea(),
  callouts: z.array(z.string()),
});

const MotionDirectionSchema = z.enum(["left", "right", "up", "down"]);

const RemixThemeSchema = z.object({
  bg: z.string(),
  bgDeep: z.string(),
  bgPanel: z.string(),
  panel: z.string(),
  panelStrong: z.string(),
  accent: z.string(),
  accentSoft: z.string(),
  border: z.string(),
  borderStrong: z.string(),
  text: z.string(),
  textSecondary: z.string(),
  textMuted: z.string(),
  textFaint: z.string(),
  gridLine: z.string(),
  gridLineBright: z.string(),
  scanline: z.string(),
});

const OverlaySchema = z.object({
  noiseOpacity: z.number(),
  traceOpacity: z.number(),
  traceStrokeWidth: z.number(),
  reticleOpacity: z.number(),
});

const TracePointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const TracePathSchema = z.object({
  label: z.string().optional(),
  startFrame: z.number(),
  endFrame: z.number(),
  points: z.array(TracePointSchema).min(2),
});

const ReticleSchema = z.object({
  x: z.number(),
  y: z.number(),
  radius: z.number().optional(),
});

const ResumeTextBlockSchema = z.object({
  text: z.string(),
  emphasis: z.enum(["hero", "accent", "support"]),
  movement: z.enum(["drift", "scale-up", "scale-down"]),
  x: z.number(),
  y: z.number(),
  startFrame: z.number(),
  endFrame: z.number(),
  fontSize: z.number(),
  rotate: z.number(),
  opacityFrom: z.number(),
  opacityTo: z.number(),
  scaleFrom: z.number(),
  scaleTo: z.number(),
  driftX: z.number(),
  driftY: z.number(),
});

const IdentityImageSchema = z.object({
  src: z.string(),
  startFrame: z.number(),
  endFrame: z.number(),
  scaleFrom: z.number(),
  scaleTo: z.number(),
  opacity: z.number(),
});

const SceneOverlaySchema = z.object({
  tracePaths: z.array(TracePathSchema),
  reticle: ReticleSchema.optional(),
  resumeTextBlocks: z.array(ResumeTextBlockSchema).optional(),
  imageSequence: z.array(IdentityImageSchema).optional(),
});

export const ShowreelRemixSchema = z.object({
  introHeadlineTop: z.string(),
  introHeadlineAccent: z.string(),
  introHeadlineBottom: z.string(),
  introBody: zTextarea(),
  closingHeadlineTop: z.string(),
  closingHeadlineBottom: z.string(),
  closingBody: zTextarea(),
  closingSummaryPrimary: zTextarea(),
  closingSummarySecondary: zTextarea(),
  contactEmail: z.string(),
  projects: z.array(ProjectSchema).length(3),
  theme: RemixThemeSchema,
  overlays: OverlaySchema,
  introDirection: MotionDirectionSchema,
  identityDirection: MotionDirectionSchema,
  projectDirections: z.array(MotionDirectionSchema).length(3),
  closingDirection: MotionDirectionSchema,
  introScene: SceneOverlaySchema,
  identityScene: SceneOverlaySchema,
  projectScenes: z.array(SceneOverlaySchema).length(3),
  closingScene: SceneOverlaySchema,
});

export type RemixTheme = z.infer<typeof RemixThemeSchema>;
export type RemixOverlayProps = z.infer<typeof OverlaySchema>;
export type RemixProject = z.infer<typeof ProjectSchema>;
export type RemixTracePathConfig = z.infer<typeof TracePathSchema>;
export type RemixReticleConfig = z.infer<typeof ReticleSchema>;
export type RemixSceneOverlay = z.infer<typeof SceneOverlaySchema>;
export type ShowreelRemixProps = z.infer<typeof ShowreelRemixSchema>;

export const defaultShowreelRemixProps: ShowreelRemixProps = {
  introHeadlineTop: "Mechanical design",
  introHeadlineAccent: "manufacturing systems",
  introHeadlineBottom: "under load",
  introBody:
    "The same engineering review narrative, remixed through a harder monochrome field with trace overlays, reversed motion, and inspection-first framing.",
  closingHeadlineTop: "Built for",
  closingHeadlineBottom: "the floor",
  closingBody:
    "Design intent, fabrication logic, assembly fit, and inspection visibility stay connected from first concept through release.",
  closingSummaryPrimary: "Industrial remix with the same manufacturing-first thesis.",
  closingSummarySecondary:
    "Software and automation remain secondary evidence, while the visual language shifts toward high-contrast review-sheet motion.",
  contactEmail: "markworks.dev@gmail.com",
  projects: [
    {
      key: "pump-package",
      title: "PUMP PACKAGE",
      subtitle: "Portable pump enclosure and support structure",
      category: "Mechanical design / sheet metal / DFM",
      reviewLabel: "PRIMARY SIGNAL",
      emphasis: "primary",
      outcome: "ZERO",
      outcomeLabel: "TOLERANCE FAILURES",
      image: "assets/images/pump-package-hero.webp",
      tags: ["Sheet Metal", "Airflow", "Service Access", "DFM / DFA"],
      problem:
        "The package had to survive fabrication, fit-up, service access, and operating reality without turning into an expensive build headache.",
      constraint:
        "Airflow, sound control, sheet metal logic, structure, and cost pressure all pulled on the geometry at the same time.",
      decision:
        "Balanced enclosure form, support structure, access strategy, and fabrication logic so the design stayed buildable and maintainable.",
      validation:
        "Presented as floor-ready documentation rather than a concept-only enclosure study.",
      callouts: ["ASSEMBLY ACCESS", "BEND LOGIC", "AIRFLOW / SOUND"],
    },
    {
      key: "torque-wrench",
      title: "TORQUE WRENCH",
      subtitle: "Precision gearbox and high-accuracy assembly context",
      category: "Precision assemblies / machining / GD&T",
      reviewLabel: "PRIMARY SIGNAL",
      emphasis: "primary",
      outcome: "22%",
      outcomeLabel: "MFG COST REDUCTION",
      image: "assets/images/torque-wrench-hero.webp",
      tags: ["Gearboxes", "Runout", "Heat Treat", "Inspection"],
      problem:
        "Precision gearbox components had to hold functional accuracy without inflating machining cost or assembly risk.",
      constraint:
        "Runout, heat treat distortion, post-HT cleanup, assembly fit, and process capability all mattered at once.",
      decision:
        "Designed for manufacturable precision with inspection intent and post-heat-treat cleanup built into the dimensional strategy.",
      validation:
        "The dimensioning logic supported assembly performance, repeatable inspection, and better manufacturing economics.",
      callouts: ["RUNOUT CONTROL", "POST-HT FINISH", "ASSEMBLY FIT"],
    },
    {
      key: "pumptracker",
      title: "PUMPTRACKER",
      subtitle: "Operations software supporting engineering throughput",
      category: "React / TypeScript / planning systems",
      reviewLabel: "SECONDARY PROOF",
      emphasis: "secondary",
      outcome: "30+ HRS/WEEK",
      outcomeLabel: "ADMIN TIME RECOVERED",
      image: "assets/images/pumptracker-hero.webp",
      tags: ["Planning", "Capacity", "React", "Workflow Support"],
      problem:
        "Production visibility was trapped in spreadsheets, inboxes, and tribal knowledge, which slowed scheduling and coordination.",
      constraint:
        "The system had to help the floor move faster without replacing the human judgment already driving the operation.",
      decision:
        "Built a lightweight planning and capacity layer that made work visible and actionable for the team using it.",
      validation:
        "Framed as systems support around real engineering and production work, not as a replacement for that domain knowledge.",
      callouts: ["FLOW VISIBILITY", "CAPACITY SIGNAL", "SHOP INPUT"],
    },
  ],
  theme: {
    bg: "#0b0b0c",
    bgDeep: "#010101",
    bgPanel: "rgba(18, 18, 18, 0.92)",
    panel: "rgba(21, 21, 21, 0.78)",
    panelStrong: "rgba(7, 7, 7, 0.95)",
    accent: "#7fb8ff",
    accentSoft: "rgba(127, 184, 255, 0.16)",
    border: "rgba(241, 238, 230, 0.20)",
    borderStrong: "rgba(127, 184, 255, 0.42)",
    text: "#f6f3ec",
    textSecondary: "#cbc4b8",
    textMuted: "#8e8579",
    textFaint: "#635d55",
    gridLine: "rgba(255, 255, 255, 0.06)",
    gridLineBright: "rgba(255, 255, 255, 0.20)",
    scanline: "rgba(255, 255, 255, 0.05)",
  },
  overlays: {
    noiseOpacity: 0.12,
    traceOpacity: 0.88,
    traceStrokeWidth: 1.35,
    reticleOpacity: 0.46,
  },
  introDirection: "down",
  identityDirection: "left",
  projectDirections: ["up", "down", "up"],
  closingDirection: "right",
  introScene: {
    tracePaths: [
      {
        points: [
          {x: 84, y: 138},
          {x: 356, y: 138},
          {x: 356, y: 246},
          {x: 692, y: 246},
        ],
        startFrame: 6,
        endFrame: 52,
        label: "REVISION PATH",
      },
      {
        points: [
          {x: 1098, y: 102},
          {x: 1098, y: 260},
          {x: 924, y: 260},
        ],
        startFrame: 26,
        endFrame: 74,
        label: "FIELD REGISTER",
      },
    ],
    reticle: {x: 1040, y: 548, radius: 56},
  },
  identityScene: {
    tracePaths: [
      {
        points: [
          {x: 186, y: 612},
          {x: 186, y: 170},
          {x: 480, y: 170},
        ],
        startFrame: 8,
        endFrame: 42,
        label: "DOSSIER START",
      },
    ],
    reticle: {x: 980, y: 272, radius: 52},
    imageSequence: [
      {
        src: "assets/images/rendering-02.webp",
        startFrame: 0,
        endFrame: 72,
        scaleFrom: 1,
        scaleTo: 1.08,
        opacity: 0.94,
      },
      {
        src: "assets/images/rendering-07.webp",
        startFrame: 60,
        endFrame: 132,
        scaleFrom: 1.01,
        scaleTo: 1.1,
        opacity: 0.94,
      },
      {
        src: "assets/images/pump-package-01.webp",
        startFrame: 120,
        endFrame: 192,
        scaleFrom: 1.02,
        scaleTo: 1.11,
        opacity: 0.94,
      },
      {
        src: "assets/images/rendering-09.webp",
        startFrame: 180,
        endFrame: 252,
        scaleFrom: 1.01,
        scaleTo: 1.09,
        opacity: 0.94,
      },
      {
        src: "assets/images/pumptracker_light_mode_composite_1775435494270.png",
        startFrame: 240,
        endFrame: 300,
        scaleFrom: 1.02,
        scaleTo: 1.12,
        opacity: 0.94,
      },
    ],
    resumeTextBlocks: defaultResumeTextBlocks,
  },
  projectScenes: [
    {
      tracePaths: [
        {
          points: [
            {x: 76, y: 612},
            {x: 300, y: 612},
            {x: 300, y: 144},
            {x: 588, y: 144},
          ],
          startFrame: 12,
          endFrame: 58,
          label: "PRIMARY REVIEW",
        },
      ],
      reticle: {x: 330, y: 210, radius: 48},
    },
    {
      tracePaths: [
        {
          points: [
            {x: 1206, y: 108},
            {x: 934, y: 108},
            {x: 934, y: 596},
            {x: 722, y: 596},
          ],
          startFrame: 12,
          endFrame: 58,
          label: "PRIMARY REVIEW",
        },
      ],
      reticle: {x: 974, y: 500, radius: 48},
    },
    {
      tracePaths: [
        {
          points: [
            {x: 76, y: 612},
            {x: 300, y: 612},
            {x: 300, y: 144},
            {x: 588, y: 144},
          ],
          startFrame: 12,
          endFrame: 58,
          label: "SUPPORTING SYSTEM",
        },
      ],
      reticle: {x: 330, y: 210, radius: 48},
    },
  ],
  closingScene: {
    tracePaths: [
      {
        points: [
          {x: 168, y: 94},
          {x: 1120, y: 94},
          {x: 1120, y: 632},
          {x: 916, y: 632},
        ],
        startFrame: 0,
        endFrame: 52,
        label: "CLOSING PASS",
      },
    ],
  },
};

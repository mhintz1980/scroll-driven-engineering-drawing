import {loadFont as loadMonoFont} from "@remotion/google-fonts/SpaceMono";
import {loadFont as loadSansFont} from "@remotion/google-fonts/InstrumentSans";

const {fontFamily: monoFamily} = loadMonoFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const {fontFamily: sansFamily} = loadSansFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// ─────────────────────────────────────────────────
// DESIGN TOKENS — Engineering review deck
// ─────────────────────────────────────────────────

export const COLORS = {
  bg: "#071019",
  bgDeep: "#03080f",
  bgPanel: "rgba(9, 18, 28, 0.88)",
  panel: "rgba(10, 20, 31, 0.72)",
  panelStrong: "rgba(8, 15, 24, 0.94)",
  accent: "#73b7ff",
  accentSoft: "rgba(115, 183, 255, 0.18)",
  accentGlow: "rgba(115, 183, 255, 0.22)",
  border: "rgba(115, 183, 255, 0.26)",
  borderStrong: "rgba(115, 183, 255, 0.44)",
  text: "#f3f8ff",
  textSecondary: "#a7bfd8",
  textMuted: "#6e859c",
  textFaint: "#52677c",
  gridLine: "rgba(115, 183, 255, 0.10)",
  gridLineBright: "rgba(115, 183, 255, 0.26)",
  scanline: "rgba(0, 0, 0, 0.14)",
} as const;

export const FONTS = {
  mono: monoFamily,
  sans: sansFamily,
} as const;

// ─────────────────────────────────────────────────
// VIDEO SPEC
// ─────────────────────────────────────────────────
export const W = 1280;
export const H = 720;
export const FPS = 30;

export const SCENE_BLUEPRINT_FRAMES = 8 * FPS;
export const SCENE_IDENTITY_FRAMES = 10 * FPS;
export const SCENE_PROJECT_FRAMES = 12 * FPS;
export const SCENE_CTA_FRAMES = 8 * FPS;
export const TRANSITION_FRAMES = 20;

export const TOTAL_FRAMES =
  SCENE_BLUEPRINT_FRAMES +
  SCENE_IDENTITY_FRAMES +
  SCENE_PROJECT_FRAMES * 3 +
  SCENE_CTA_FRAMES -
  TRANSITION_FRAMES * 5;

// ─────────────────────────────────────────────────
// PORTFOLIO DATA
// ─────────────────────────────────────────────────

export const MARK = {
  superHeader: "// DESIGN + MANUFACTURING BRIDGE",
  name: "MARK HINTZ",
  headline: "I DESIGN MECHANICAL SYSTEMS AND BUILD SOFTWARE AND AI TOOLS THAT MAKE WORK FASTER, CLEARER, AND MORE CAPABLE.",
  primaryTagline: "Built from the shop floor up.",
  secondaryTagline:
    "15 years of tolerances, heat treat decisions, and assembly realities inform every design before a drawing is released.",
  softwareTagline:
    "Software and AI tools appear as operational proof — faster decisions, not a co-equal identity.",
  location: "JAX, FL",
  experience: "15+ YRS",
  tolerance: "±0.0005\"",
  dossierLabel: "Designer with 15 years of fabrication, inspection, and assembly context",
  focusAreas: [
    "DFM / DFA",
    "GD&T / Inspection",
    "Assembly Fit",
    "Materials / Cost",
  ],
  credentials: [
    {
      label: "Manufacturing context",
      value: "7-axis mill-turn support, fabrication reality, and shop-floor inspection",
    },
    {
      label: "Inspection logic",
      value: "High-end digital gages, sin blocks, and tolerance intent — not just callouts",
    },
    {
      label: "Assembly awareness",
      value: "Built the gearboxes by hand. Pressed pins through planetary stages. Knows what fails.",
    },
    {
      label: "Systems support",
      value: "AI tools and operational software that make engineering decisions faster and more visible",
    },
  ],
} as const;

export interface ProjectStory {
  key: string;
  title: string;
  subtitle: string;
  category: string;
  reviewLabel: string;
  emphasis: "primary" | "secondary";
  outcome: string;
  outcomeLabel: string;
  image: string;
  tags: readonly string[];
  problem: string;
  constraint: string;
  decision: string;
  validation: string;
  callouts: readonly string[];
}

export const PROJECTS: readonly ProjectStory[] = [
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
] as const;

export const SKILLS_TICKER = [
  "Mechanical Design",
  "DFM / DFA",
  "GD&T",
  "Inspection Planning",
  "Assembly Fit",
  "Tolerance Stack",
  "Sheet Metal",
  "Precision Machining",
  "Quoting Logic",
  "Lifecycle Thinking",
  "Operational Software",
  "AI Workflows",
];

export interface CaseStudyStory {
  key: string;
  title: string;
  problem: string;
  constraint: string;
  approach: string;
  validation: string;
  outcome: string;
  image: string;
}

export const CASE_STUDIES: readonly CaseStudyStory[] = [
  {
    key: "asset-lifecycle",
    title: "Extending Asset Lifecycle",
    problem: "Critical equipment was wearing out under abrasive operating conditions.",
    constraint:
      "The solution had to increase service life without creating a maintenance workflow the team would resist.",
    approach:
      "Combined failure-mode analysis, tribopolymer strategy, and monitoring signals to inform maintenance timing.",
    validation:
      "The work was framed around reliability and field performance rather than a one-off component change.",
    outcome: "+2 years asset life",
    image: "assets/images/case-study-asset-lifecycle.webp",
  },
  {
    key: "capabilities-deck",
    title: "Capabilities Deck Repositioning",
    problem:
      "The business was being understood too generically, which blurred the strength of its engineering offering.",
    constraint:
      "The repositioning had to stay commercially clear while still carrying technical authority.",
    approach:
      "Built a sharper engineering-first narrative with a custom visual and messaging framework.",
    validation:
      "Used strategic framing to improve signal quality instead of adding more general-purpose collateral.",
    outcome: "3 new high-value leads",
    image: "assets/images/case-study-capabilities-deck.webp",
  },
  {
    key: "power-tee",
    title: "Jacksonville Expansion Support",
    problem:
      "A growing operation needed stronger systems support to scale technical and scheduling decisions.",
    constraint:
      "Any improvement had to fit the pace of a real operation rather than become another fragile tool to maintain.",
    approach:
      "Applied AI-enabled planning and operational support around the production workflow.",
    validation:
      "Positioned the work as operational leverage in support of domain expertise already on the ground.",
    outcome: "Immediate operational scale",
    image: "assets/images/case-study-power-tee.webp",
  },
] as const;

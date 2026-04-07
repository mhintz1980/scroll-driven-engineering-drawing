// ─────────────────────────────────────────────────
// DESIGN TOKENS — Industrial / Blueprint aesthetic
// ─────────────────────────────────────────────────

export const COLORS = {
  bg: "#0f172a",          // dark slate
  bgDeep: "#080e1a",      // near-black for depth
  accent: "#2563eb",      // portfolio blue
  accentGlow: "rgba(37,99,235,0.25)",
  text: "#f8fafc",        // near-white
  textSecondary: "#94a3b8", // muted slate
  textMuted: "#475569",
  gridLine: "rgba(37,99,235,0.18)",
  gridLineBright: "rgba(37,99,235,0.35)",
  scanline: "rgba(0,0,0,0.12)",
} as const;

export const FONTS = {
  mono: "'JetBrains Mono', 'Courier New', monospace",
  sans: "Inter, system-ui, sans-serif",
} as const;

// ─────────────────────────────────────────────────
// VIDEO SPEC
// ─────────────────────────────────────────────────
export const W = 1280;
export const H = 720;
export const FPS = 30;

// Scene durations (in frames)
export const SCENE_BLUEPRINT_FRAMES = 8 * FPS;   // 8s
export const SCENE_IDENTITY_FRAMES  = 10 * FPS;  // 10s
export const SCENE_PROJECT_FRAMES   = 12 * FPS;  // 12s × 3 projects
export const SCENE_CTA_FRAMES       = 8 * FPS;   // 8s

// Transition length
export const TRANSITION_FRAMES = 20;

// Total (accounting for 5 transitions)
// = 8 + 10 + 12 + 12 + 12 + 8 - 5*20/30... handled by TransitionSeries
export const TOTAL_FRAMES =
  SCENE_BLUEPRINT_FRAMES +
  SCENE_IDENTITY_FRAMES +
  SCENE_PROJECT_FRAMES * 3 +
  SCENE_CTA_FRAMES -
  TRANSITION_FRAMES * 5; // 5 transitions between 6 scenes

// ─────────────────────────────────────────────────
// PORTFOLIO DATA (sourced from portfolioData.ts)
// ─────────────────────────────────────────────────
export const MARK = {
  superHeader: "// MECHANICAL SYSTEMS & AUTOMATION",
  name: "MARK HINTZ",
  tagline: "SolidWorks brain. JavaScript hands.",
  location: "JAX FL",
  experience: "15 YRS",
  tolerance: "±0.0005\"",
  bio: "I automate the work that shouldn't be manual.",
};

export const PROJECTS = [
  {
    key: "pumptracker",
    title: "PUMPTRACKER",
    subtitle: "Production Scheduling + Capacity Planning",
    category: "React · TypeScript · Firebase · Supabase",
    outcome: "30+ HRS/WEEK",
    outcomeLabel: "RECOVERED",
    image: "../public/assets/images/pumptracker-hero.webp",
    tags: ["React", "TypeScript", "Supabase", "AI Workflows"],
  },
  {
    key: "pump-package",
    title: "PUMP PACKAGE",
    subtitle: "Design System — Skids, Enclosures, Mounts",
    category: "SolidWorks · DFM/DFA · GD&T",
    outcome: "ZERO",
    outcomeLabel: "TOLERANCE FAILURES",
    image: "../public/assets/images/pump-package-hero.webp",
    tags: ["SolidWorks", "DFM/DFA", "GD&T", "Sheet Metal"],
  },
  {
    key: "torque-wrench",
    title: "TORQUE WRENCH",
    subtitle: "Industrial · Planetary Gearbox",
    category: "Mechanical Design · Precision Assemblies",
    outcome: "22%",
    outcomeLabel: "MFG COST REDUCTION",
    image: "../public/assets/images/torque-wrench-hero.webp",
    tags: ["SolidWorks", "Planetary Gearboxes", "Precision Machining", "DFM"],
  },
] as const;

export const SKILLS_TICKER = [
  "SolidWorks",
  "GD&T",
  "DFM/DFA",
  "Photo-Realistic Renderings",
  "Sheet Metal Design",
  "Weldments",
  "React/TypeScript",
  "AI Workflows",
  "Production Scheduling",
  "CNC Programming Support",
  "ASME Prints",
  "Planetary Gearboxes",
];

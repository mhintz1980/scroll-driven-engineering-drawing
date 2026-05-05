/**
 * Data specific to the "Drawing Package" portfolio variation.
 * Extends portfolioData with title block metadata, per-project callout notes,
 * and revision table entries.
 */

export const titleBlock = {
  drawingTitle: "DESIGN + MANUFACTURING BRIDGE",
  name: "MARK HINTZ",
  revision: "C",
  date: "2026-04-30",
  sheetLabel: "SHEET 1 OF 1",
  scale: "NTS",
  drawnBy: "M. HINTZ",
  checkedBy: "SHOP FLOOR",
};

export const revisionTable = [
  { rev: "A", date: "2010", description: "INITIAL RELEASE — DRAFTING & CNC SUPPORT" },
  { rev: "B", date: "2018", description: "ADDED GEARBOX DESIGN & DFM REVIEW" },
  { rev: "C", date: "2026", description: "CURRENT — FULL STACK + AI TOOLING" },
];

export type CalloutNote = {
  label: string;
  value: string;
  /** Angle in degrees for leader line direction from detail view center */
  angle: number;
};

export type ProjectDetail = {
  id: string;
  title: string;
  detailLabel: string;
  image: string;
  videoSrc?: string;
  calloutNotes: CalloutNote[];
};

export type DrawingScene = {
  id: string;
  label: string;
  subtitle: string;
  section: 'hero' | 'project' | 'services' | 'testimonials' | 'contact';
  /** How much the background SVG should offset at this scene (0-1 multiplier). */
  parallaxHint: { xFactor: number; yFactor: number; scaleFactor: number };
  projectId?: string;
};

export const drawingScenes: DrawingScene[] = [
  {
    id: 'scene-hero',
    label: 'A',
    subtitle: 'TITLE & SPECS',
    section: 'hero',
    parallaxHint: { xFactor: 0, yFactor: 0, scaleFactor: 1 },
  },
  {
    id: 'scene-p1',
    label: 'B',
    subtitle: 'DETAIL A',
    section: 'project',
    projectId: 'torque-wrench',
    parallaxHint: { xFactor: -0.08, yFactor: -0.04, scaleFactor: 1.02 },
  },
  {
    id: 'scene-p2',
    label: 'C',
    subtitle: 'DETAIL B',
    section: 'project',
    projectId: 'armament',
    parallaxHint: { xFactor: 0.06, yFactor: -0.1, scaleFactor: 1.02 },
  },
  {
    id: 'scene-p3',
    label: 'D',
    subtitle: 'DETAIL C',
    section: 'project',
    projectId: 'pump-package',
    parallaxHint: { xFactor: -0.12, yFactor: -0.16, scaleFactor: 1.02 },
  },
  {
    id: 'scene-p4',
    label: 'E',
    subtitle: 'DETAIL D',
    section: 'project',
    projectId: 'pumptracker',
    parallaxHint: { xFactor: 0.04, yFactor: -0.22, scaleFactor: 1.02 },
  },
  {
    id: 'scene-p5',
    label: 'F',
    subtitle: 'DETAIL E',
    section: 'project',
    projectId: 'renderings',
    parallaxHint: { xFactor: -0.06, yFactor: -0.28, scaleFactor: 1.02 },
  },
  {
    id: 'scene-services',
    label: 'G',
    subtitle: 'CAPABILITIES',
    section: 'services',
    parallaxHint: { xFactor: 0.02, yFactor: -0.34, scaleFactor: 1 },
  },
  {
    id: 'scene-notes',
    label: 'H',
    subtitle: 'GENERAL NOTES',
    section: 'testimonials',
    parallaxHint: { xFactor: -0.1, yFactor: -0.4, scaleFactor: 1 },
  },
  {
    id: 'scene-titleblock',
    label: 'J',
    subtitle: 'TITLE BLOCK',
    section: 'contact',
    parallaxHint: { xFactor: -0.04, yFactor: -0.46, scaleFactor: 1.04 },
  },
];

export const projectDetails: ProjectDetail[] = [
  {
    id: "torque-wrench",
    title: "Industrial Torque Wrench",
    detailLabel: "DETAIL A",
    image: "assets/images/torque-wrench-hero.webp",
    calloutNotes: [
      { label: "MATERIAL", value: "17-4PH SS & 4340 ALLOY | HARDENED TO 40 HRC", angle: 45 },
      { label: "TOLERANCE", value: "±0.0005\" ON BORE & SHAFT INTERFACES", angle: 135 },
      { label: "PROCESS", value: "7-AXIS MILL-TURN | PLANETARY GEAR ASSEMBLY", angle: 225 },
      { label: "OUTCOME", value: "DFM REVIEW CUT MFG COST BY 22%", angle: 315 },
    ],
  },
  {
    id: "armament",
    title: "Armament Components & Receiver Systems",
    detailLabel: "DETAIL B",
    image: "assets/images/AR-15 Lower Reciever-Forged.jpg",
    calloutNotes: [
      { label: "MATERIAL", value: "7075-T6 ALUMINUM | FORGED RECEIVER", angle: 45 },
      { label: "GEOMETRY", value: "FIT & FUNCTION RESOLVED FOR ASSEMBLY", angle: 135 },
      { label: "DRAWINGS", value: "FULL MFG PACKAGE FOR 5-AXIS CNC", angle: 225 },
      { label: "SCOPE", value: "UPPER, LOWER, BARREL NUT, HANDGUARD", angle: 315 },
    ],
  },
  {
    id: "pump-package",
    title: "Pump Package Design System",
    detailLabel: "DETAIL C",
    image: "assets/images/pump-package-hero.webp",
    calloutNotes: [
      { label: "ACOUSTIC", value: "STAGGERED BAFFLES | TORTUOUS PATH DESIGN", angle: 45 },
      { label: "STRUCTURE", value: "11 GA STEEL | SHEET METAL + WELDMENTS", angle: 135 },
      { label: "ISOLATION", value: "VIBRATION DECOUPLING | MLV + OPEN CELL FOAM", angle: 225 },
      { label: "SYSTEM", value: "SKIDS, ENCLOSURES, MOUNTS, LIFTING", angle: 315 },
    ],
  },
  {
    id: "pumptracker",
    title: "PumpTracker",
    detailLabel: "DETAIL D",
    image: "assets/images/pumptracker-hero.webp",
    calloutNotes: [
      { label: "STACK", value: "REACT + TYPESCRIPT | FIREBASE & SUPABASE", angle: 45 },
      { label: "PROBLEM", value: "PRODUCTION SCHEDULING WAS TRIBAL KNOWLEDGE", angle: 135 },
      { label: "OUTCOME", value: "30+ HRS/WEEK RECOVERED FROM MANUAL WORK", angle: 225 },
      { label: "SCOPE", value: "CAPACITY PLANNING + PROCUREMENT VISIBILITY", angle: 315 },
    ],
  },
  {
    id: "renderings",
    title: "Renderings & Visualizations",
    detailLabel: "DETAIL E",
    image: "assets/images/renderings-hero.webp",
    calloutNotes: [
      { label: "TOOLS", value: "PHOTOVIEW 360 | SOLIDWORKS VISUALIZE", angle: 45 },
      { label: "QUALITY", value: "PHOTOREALISTIC PRODUCT RENDERS | HDRI LIT", angle: 135 },
      { label: "OUTCOME", value: "ELIMINATED PHYSICAL MOCKUP COST", angle: 225 },
      { label: "USE", value: "SALES COLLATERAL | DESIGN REVIEW | QC REF", angle: 315 },
    ],
  },
];

export type DrawingPlate = {
  src: string;
  section: "hero" | "project" | "services" | "testimonials" | "contact" | "base";
  x: string | number;
  y: string | number;
  width: string | number;
  baseOpacity: number;
  activeOpacity: number;
  scale: number;
  parallaxStrength: number;
  invert?: boolean;
};

export const drawingPlates: DrawingPlate[] = [
  { src: "assets/images/3-1.png", section: "base", x: "-5%", y: "-5%", width: "110%", baseOpacity: 0.16, activeOpacity: 0.16, scale: 1, parallaxStrength: 0.05, invert: true },
  { src: "assets/images/6.png", section: "hero", x: "10%", y: "5%", width: "40%", baseOpacity: 0.05, activeOpacity: 0.25, scale: 1.2, parallaxStrength: 0.2, invert: true },
  { src: "assets/images/1.png", section: "project", x: "50%", y: "30%", width: "50%", baseOpacity: 0.1, activeOpacity: 0.35, scale: 1.1, parallaxStrength: 0.3, invert: false },
  { src: "assets/images/5.png", section: "services", x: "15%", y: "60%", width: "45%", baseOpacity: 0.08, activeOpacity: 0.25, scale: 1.0, parallaxStrength: 0.25, invert: true },
  { src: "assets/images/4.png", section: "contact", x: "40%", y: "80%", width: "60%", baseOpacity: 0.1, activeOpacity: 0.3, scale: 1.3, parallaxStrength: 0.4, invert: true },
];

export const resumeXmlPhrases = [
  "15+ YEARS",
  "DESIGN-TO-ORDER",
  "CUSTOM EQUIPMENT",
  "SOLIDWORKS",
  "2D FABRICATION",
  "BOM MANAGEMENT",
  "SHOP-TRUSTED",
  "COMMON COMPONENTS",
  "MANUFACTURABILITY",
  "LIGHT AUTOMATION",
  "REDUCE ERRORS",
  "BUILDABLE",
] as const;

export type ResumeTextEmphasis = "hero" | "accent" | "support";
export type ResumeTextMovement = "drift" | "scale-up" | "scale-down";

export type ResumeTextBlock = {
  text: string;
  emphasis: ResumeTextEmphasis;
  movement: ResumeTextMovement;
  x: number;
  y: number;
  startFrame: number;
  endFrame: number;
  fontSize: number;
  rotate: number;
  opacityFrom: number;
  opacityTo: number;
  scaleFrom: number;
  scaleTo: number;
  driftX: number;
  driftY: number;
};

const blockTemplates: Omit<ResumeTextBlock, "text">[] = [
  // H-River A (L→R) — background anchor, glacier-slow
  {emphasis: "hero",    movement: "drift",    x: -0.55, y: 0.08, startFrame: 0,   endFrame: 300, fontSize: 130, rotate: 0, opacityFrom: 0, opacityTo: 0.18, scaleFrom: 1,    scaleTo: 1,    driftX: 120,  driftY: 0},
  // H-River A foreground read (L→R)
  {emphasis: "accent",  movement: "drift",    x: -0.06, y: 0.20, startFrame: 0,   endFrame: 220, fontSize: 36,  rotate: 0, opacityFrom: 0, opacityTo: 0.88, scaleFrom: 1,    scaleTo: 1,    driftX: 200,  driftY: 0},
  // V-Descent lane 1 (top → bottom)
  {emphasis: "support", movement: "drift",    x: 0.78,  y: -0.18, startFrame: 12, endFrame: 290, fontSize: 20,  rotate: 0, opacityFrom: 0, opacityTo: 0.50, scaleFrom: 1,    scaleTo: 1,    driftX: 0,    driftY: 260},
  // H-River B (R→L) — support
  {emphasis: "support", movement: "drift",    x: 1.0,   y: 0.30, startFrame: 18,  endFrame: 250, fontSize: 26,  rotate: 0, opacityFrom: 0, opacityTo: 0.62, scaleFrom: 1,    scaleTo: 1,    driftX: -230, driftY: 0},
  // V-Descent macro ambient (top → bottom)
  {emphasis: "accent",  movement: "drift",    x: -0.04, y: -0.38, startFrame: 30, endFrame: 300, fontSize: 100, rotate: 0, opacityFrom: 0, opacityTo: 0.22, scaleFrom: 1,    scaleTo: 1,    driftX: 0,    driftY: 260},
  // V-Ascent lane (bottom → top)
  {emphasis: "support", movement: "drift",    x: 0.22,  y: 0.96, startFrame: 40,  endFrame: 290, fontSize: 17,  rotate: 0, opacityFrom: 0, opacityTo: 0.54, scaleFrom: 1,    scaleTo: 1,    driftX: 0,    driftY: -220},
  // H-River B mid-weight hero (R→L)
  {emphasis: "hero",    movement: "scale-up", x: 1.05,  y: 0.52, startFrame: 70,  endFrame: 290, fontSize: 44,  rotate: 0, opacityFrom: 0, opacityTo: 0.82, scaleFrom: 0.95, scaleTo: 1.05, driftX: -270, driftY: 0},
  // V-Descent lane 2 (top → bottom)
  {emphasis: "support", movement: "drift",    x: 0.52,  y: -0.14, startFrame: 60, endFrame: 290, fontSize: 19,  rotate: 0, opacityFrom: 0, opacityTo: 0.52, scaleFrom: 1,    scaleTo: 1,    driftX: 0,    driftY: 250},
  // H-River A climactic credential (L→R)
  {emphasis: "accent",  movement: "drift",    x: -0.14, y: 0.68, startFrame: 100, endFrame: 300, fontSize: 54,  rotate: 0, opacityFrom: 0, opacityTo: 0.88, scaleFrom: 1,    scaleTo: 1,    driftX: 210,  driftY: 0},
  // V-Ascent support (software — deliberately weaker)
  {emphasis: "support", movement: "drift",    x: 0.56,  y: 0.98, startFrame: 120, endFrame: 300, fontSize: 15,  rotate: 0, opacityFrom: 0, opacityTo: 0.40, scaleFrom: 1,    scaleTo: 1,    driftX: 0,    driftY: -195},
  // H-River B climactic hero sweep (R→L)
  {emphasis: "hero",    movement: "scale-up", x: 1.06,  y: 0.32, startFrame: 148, endFrame: 300, fontSize: 72,  rotate: 0, opacityFrom: 0, opacityTo: 0.90, scaleFrom: 0.90, scaleTo: 1.12, driftX: -340, driftY: 0},
  // V-Ascent finale accent (bottom → top)
  {emphasis: "accent",  movement: "scale-up", x: 0.38,  y: 1.04, startFrame: 168, endFrame: 300, fontSize: 46,  rotate: 0, opacityFrom: 0, opacityTo: 0.84, scaleFrom: 0.90, scaleTo: 1.08, driftX: 0,    driftY: -210},
];

export const buildResumeTextBlocks = (phrases: readonly string[]): ResumeTextBlock[] => {
  return phrases.map((text, index) => ({
    text,
    ...blockTemplates[index],
  }));
};

export const defaultResumeTextBlocks = buildResumeTextBlocks(resumeXmlPhrases);

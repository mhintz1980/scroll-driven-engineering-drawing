import {zTextarea} from "@remotion/zod-types";
import {z} from "zod";

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

export const ShowreelSchema = z.object({
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
});

export type EditableProject = z.infer<typeof ProjectSchema>;
export type ShowreelProps = z.infer<typeof ShowreelSchema>;

export const defaultShowreelProps: ShowreelProps = {
  introHeadlineTop: "Mechanical design",
  introHeadlineAccent: "with manufacturing",
  introHeadlineBottom: "reality built in",
  introBody:
    "Drawings, setup reality, inspection intent, assembly fit, and cost pressure are treated as design inputs rather than afterthoughts.",
  closingHeadlineTop: "From concept",
  closingHeadlineBottom: "to floor",
  closingBody:
    "Mechanical design informed by manufacturing reality, inspection logic, and lifecycle tradeoffs.",
  closingSummaryPrimary: "From concept to floor-ready documentation.",
  closingSummarySecondary:
    "Software and automation appear as supporting systems proof, not a co-equal identity.",
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
};

export const CaseStudiesSchema = z.object({
  sequenceLabelPrefix: z.string(),
  imageFooterNote: zTextarea(),
});

export type CaseStudiesProps = z.infer<typeof CaseStudiesSchema>;

export const defaultCaseStudiesProps: CaseStudiesProps = {
  sequenceLabelPrefix: "CASE STUDY",
  imageFooterNote: "Each case study is framed as a decision path, not a decorative slide.",
};

export const SubPictureSchema = z.object({
  src: z.string(),
  label: z.string(),
  datumSymbols: z.array(z.string()).optional(),
  dimensionLines: z.array(z.object({
    x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(), label: z.string().optional()
  })).optional()
});

export const ProjectDetailSchema = z.object({
  projectTitle: z.string(),
  subPictures: z.array(SubPictureSchema),
});

export type ProjectDetailProps = z.infer<typeof ProjectDetailSchema>;

export const defaultProjectDetailProps: ProjectDetailProps = {
  projectTitle: "PUMP PACKAGE: DETAIL RENDERINGS",
  subPictures: [
    { src: "assets/images/pump-package-hero.webp", label: "PRIMARY ASSEMBLY", datumSymbols: ["A", "B"] },
    { src: "assets/images/torque-wrench-hero.webp", label: "INTERNAL GEARBOX", datumSymbols: ["C"] },
    { src: "assets/images/pumptracker-hero.webp", label: "SOFTWARE HUD", datumSymbols: [] }
  ]
};


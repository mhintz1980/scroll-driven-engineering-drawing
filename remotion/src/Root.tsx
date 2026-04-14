/**
 * Root.tsx — Composition Registry
 */
import {Composition, registerRoot} from "remotion";
import {CASE_STUDIES, FPS, H, W} from "./constants";
import {CaseStudiesVideo} from "./experiments/CaseStudiesVideo";
import {ShowreelRemixVideo} from "./ShowreelRemixVideo";
import {ShowreelVideo} from "./Video";
import {ShowreelWithPathsVideo} from "./VideoWithPaths";
import {ShowreelRemixSchema} from "./remixSchema";
import {CaseStudiesSchema, ShowreelSchema, ProjectDetailSchema, defaultProjectDetailProps} from "./schemas";
import {ProjectDetailVideo} from "./ProjectDetailVideo";

const TOTAL_FRAMES = (8 + 10 + 12 + 12 + 12 + 8) * FPS - 5 * 20;
const CASE_STUDIES_FRAMES = CASE_STUDIES.length * 12 * FPS - (CASE_STUDIES.length - 1) * 20;
const SUB_PICTURES_FRAMES = 3 * (4 * FPS) + 2 * 25; // 3 pictures * 4 seconds + 2 transitions (25 frames)

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Showreel"
        component={ShowreelVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{"introHeadlineTop":"Mechanical design","introHeadlineAccent":"with manufacturing","introHeadlineBottom":"reality built in","introBody":"Drawings, setup reality, inspection intent, assembly fit, and cost pressure are treated as design inputs rather than afterthoughts.","closingHeadlineTop":"From concept","closingHeadlineBottom":"to floor","closingBody":"Mechanical design informed by manufacturing reality, inspection logic, and lifecycle tradeoffs.","closingSummaryPrimary":"From concept to floor-ready documentation.","closingSummarySecondary":"Software and automation appear as supporting systems proof, not a co-equal identity.","contactEmail":"markworks.dev@gmail.com","projects":[{"key":"pump-package","title":"PUMP PACKAGE","subtitle":"Portable pump enclosure and support structure","category":"Mechanical design / sheet metal / DFM","reviewLabel":"PRIMARY SIGNAL","emphasis":"primary" as const,"outcome":"ZERO","outcomeLabel":"TOLERANCE FAILURES","image":"assets/images/pump-package-hero.webp","tags":["Sheet Metal","Airflow","Service Access","DFM / DFA"],"problem":"The package had to survive fabrication, fit-up, service access, and operating reality without turning into an expensive build headache.","constraint":"Airflow, sound control, sheet metal logic, structure, and cost pressure all pulled on the geometry at the same time.","decision":"Balanced enclosure form, support structure, access strategy, and fabrication logic so the design stayed buildable and maintainable.","validation":"Presented as floor-ready documentation rather than a concept-only enclosure study.","callouts":["ASSEMBLY ACCESS","BEND LOGIC","AIRFLOW / SOUND"]},{"key":"torque-wrench","title":"TORQUE WRENCH","subtitle":"Precision gearbox and high-accuracy assembly context","category":"Precision assemblies / machining / GD&T","reviewLabel":"PRIMARY SIGNAL","emphasis":"primary" as const,"outcome":"22%","outcomeLabel":"MFG COST REDUCTION","image":"assets/images/torque-wrench-hero.webp","tags":["Gearboxes","Runout","Heat Treat","Inspection"],"problem":"Precision gearbox components had to hold functional accuracy without inflating machining cost or assembly risk.","constraint":"Runout, heat treat distortion, post-HT cleanup, assembly fit, and process capability all mattered at once.","decision":"Designed for manufacturable precision with inspection intent and post-heat-treat cleanup built into the dimensional strategy.","validation":"The dimensioning logic supported assembly performance, repeatable inspection, and better manufacturing economics.","callouts":["RUNOUT CONTROL","POST-HT FINISH","ASSEMBLY FIT"]},{"key":"pumptracker","title":"PUMPTRACKER","subtitle":"Operations software supporting engineering throughput","category":"React / TypeScript / planning systems","reviewLabel":"SECONDARY PROOF","emphasis":"secondary" as const,"outcome":"30+ HRS/WEEK","outcomeLabel":"ADMIN TIME RECOVERED","image":"assets/images/pumptracker-hero.webp","tags":["Planning","Capacity","React","Workflow Support"],"problem":"Production visibility was trapped in spreadsheets, inboxes, and tribal knowledge, which slowed scheduling and coordination.","constraint":"The system had to help the floor move faster without replacing the human judgment already driving the operation.","decision":"Built a lightweight planning and capacity layer that made work visible and actionable for the team using it.","validation":"Framed as systems support around real engineering and production work, not as a replacement for that domain knowledge.","callouts":["FLOW VISIBILITY","CAPACITY SIGNAL","SHOP INPUT"]}]}}
        schema={ShowreelSchema}
      />
      <Composition
        id="Showreel1080"
        component={ShowreelVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
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
        }}
        schema={ShowreelSchema}
      />
      <Composition
        id="ShowreelWithPaths"
        component={ShowreelWithPathsVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{"introHeadlineTop":"Mechanical design","introHeadlineAccent":"with manufacturing","introHeadlineBottom":"reality built in","introBody":"Drawings, setup reality, inspection intent, assembly fit, and cost pressure are treated as design inputs rather than afterthoughts.","closingHeadlineTop":"From concept","closingHeadlineBottom":"to floor","closingBody":"Mechanical design informed by manufacturing reality, inspection logic, and lifecycle tradeoffs.","closingSummaryPrimary":"From concept to floor-ready documentation.","closingSummarySecondary":"Software and automation appear as supporting systems proof, not a co-equal identity.","contactEmail":"markworks.dev@gmail.com","projects":[{"key":"pump-package","title":"PUMP PACKAGE","subtitle":"Portable pump enclosure and support structure","category":"Mechanical design / sheet metal / DFM","reviewLabel":"PRIMARY SIGNAL","emphasis":"primary" as const,"outcome":"ZERO","outcomeLabel":"TOLERANCE FAILURES","image":"assets/images/pump-package-hero.webp","tags":["Sheet Metal","Airflow","Service Access","DFM / DFA"],"problem":"The package had to survive fabrication, fit-up, service access, and operating reality without turning into an expensive build headache.","constraint":"Airflow, sound control, sheet metal logic, structure, and cost pressure all pulled on the geometry at the same time.","decision":"Balanced enclosure form, support structure, access strategy, and fabrication logic so the design stayed buildable and maintainable.","validation":"Presented as floor-ready documentation rather than a concept-only enclosure study.","callouts":["ASSEMBLY ACCESS","BEND LOGIC","AIRFLOW / SOUND"]},{"key":"torque-wrench","title":"TORQUE WRENCH","subtitle":"Precision gearbox and high-accuracy assembly context","category":"Precision assemblies / machining / GD&T","reviewLabel":"PRIMARY SIGNAL","emphasis":"primary" as const,"outcome":"22%","outcomeLabel":"MFG COST REDUCTION","image":"assets/images/torque-wrench-hero.webp","tags":["Gearboxes","Runout","Heat Treat","Inspection"],"problem":"Precision gearbox components had to hold functional accuracy without inflating machining cost or assembly risk.","constraint":"Runout, heat treat distortion, post-HT cleanup, assembly fit, and process capability all mattered at once.","decision":"Designed for manufacturable precision with inspection intent and post-heat-treat cleanup built into the dimensional strategy.","validation":"The dimensioning logic supported assembly performance, repeatable inspection, and better manufacturing economics.","callouts":["RUNOUT CONTROL","POST-HT FINISH","ASSEMBLY FIT"]},{"key":"pumptracker","title":"PUMPTRACKER","subtitle":"Operations software supporting engineering throughput","category":"React / TypeScript / planning systems","reviewLabel":"SECONDARY PROOF","emphasis":"secondary" as const,"outcome":"30+ HRS/WEEK","outcomeLabel":"ADMIN TIME RECOVERED","image":"assets/images/pumptracker-hero.webp","tags":["Planning","Capacity","React","Workflow Support"],"problem":"Production visibility was trapped in spreadsheets, inboxes, and tribal knowledge, which slowed scheduling and coordination.","constraint":"The system had to help the floor move faster without replacing the human judgment already driving the operation.","decision":"Built a lightweight planning and capacity layer that made work visible and actionable for the team using it.","validation":"Framed as systems support around real engineering and production work, not as a replacement for that domain knowledge.","callouts":["FLOW VISIBILITY","CAPACITY SIGNAL","SHOP INPUT"]}]}}
        schema={ShowreelSchema}
      />
      <Composition
        id="ShowreelRemix"
        component={ShowreelRemixVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{"introHeadlineTop":"Mechanical design","introHeadlineAccent":"manufacturing systems","introHeadlineBottom":"under load","introBody":"The same engineering review narrative, remixed through a harder monochrome field with trace overlays, reversed motion, and inspection-first framing.","closingHeadlineTop":"Built for","closingHeadlineBottom":"the floor","closingBody":"Design intent, fabrication logic, assembly fit, and inspection visibility stay connected from first concept through release.","closingSummaryPrimary":"Industrial remix with the same manufacturing-first thesis.","closingSummarySecondary":"Software and automation remain secondary evidence, while the visual language shifts toward high-contrast review-sheet motion.","contactEmail":"markworks.dev@gmail.com","projects":[{"key":"pump-package","title":"PUMP PACKAGE","subtitle":"Portable pump enclosure and support structure","category":"Mechanical design / sheet metal / DFM","reviewLabel":"PRIMARY SIGNAL","emphasis":"primary" as const,"outcome":"ZERO","outcomeLabel":"TOLERANCE FAILURES","image":"assets/images/pump-package-hero.webp","tags":["Sheet Metal","Airflow","Service Access","DFM / DFA"],"problem":"The package had to survive fabrication, fit-up, service access, and operating reality without turning into an expensive build headache.","constraint":"Airflow, sound control, sheet metal logic, structure, and cost pressure all pulled on the geometry at the same time.","decision":"Balanced enclosure form, support structure, access strategy, and fabrication logic so the design stayed buildable and maintainable.","validation":"Presented as floor-ready documentation rather than a concept-only enclosure study.","callouts":["ASSEMBLY ACCESS","BEND LOGIC","AIRFLOW / SOUND"]},{"key":"torque-wrench","title":"TORQUE WRENCH","subtitle":"Precision gearbox and high-accuracy assembly context","category":"Precision assemblies / machining / GD&T","reviewLabel":"PRIMARY SIGNAL","emphasis":"primary" as const,"outcome":"22%","outcomeLabel":"MFG COST REDUCTION","image":"assets/images/torque-wrench-hero.webp","tags":["Gearboxes","Runout","Heat Treat","Inspection"],"problem":"Precision gearbox components had to hold functional accuracy without inflating machining cost or assembly risk.","constraint":"Runout, heat treat distortion, post-HT cleanup, assembly fit, and process capability all mattered at once.","decision":"Designed for manufacturable precision with inspection intent and post-heat-treat cleanup built into the dimensional strategy.","validation":"The dimensioning logic supported assembly performance, repeatable inspection, and better manufacturing economics.","callouts":["RUNOUT CONTROL","POST-HT FINISH","ASSEMBLY FIT"]},{"key":"pumptracker","title":"PUMPTRACKER","subtitle":"Operations software supporting engineering throughput","category":"React / TypeScript / planning systems","reviewLabel":"SECONDARY PROOF","emphasis":"secondary" as const,"outcome":"30+ HRS/WEEK","outcomeLabel":"ADMIN TIME RECOVERED","image":"assets/images/pumptracker-hero.webp","tags":["Planning","Capacity","React","Workflow Support"],"problem":"Production visibility was trapped in spreadsheets, inboxes, and tribal knowledge, which slowed scheduling and coordination.","constraint":"The system had to help the floor move faster without replacing the human judgment already driving the operation.","decision":"Built a lightweight planning and capacity layer that made work visible and actionable for the team using it.","validation":"Framed as systems support around real engineering and production work, not as a replacement for that domain knowledge.","callouts":["FLOW VISIBILITY","CAPACITY SIGNAL","SHOP INPUT"]}],"theme":{"bg":"#0b0b0c","bgDeep":"#010101","bgPanel":"rgba(18, 18, 18, 0.92)","panel":"rgba(21, 21, 21, 0.78)","panelStrong":"rgba(7, 7, 7, 0.95)","accent":"#7fb8ff","accentSoft":"rgba(127, 184, 255, 0.16)","border":"rgba(241, 238, 230, 0.20)","borderStrong":"rgba(127, 184, 255, 0.42)","text":"#f6f3ec","textSecondary":"#cbc4b8","textMuted":"#8e8579","textFaint":"#635d55","gridLine":"rgba(255, 255, 255, 0.06)","gridLineBright":"rgba(255, 255, 255, 0.20)","scanline":"rgba(255, 255, 255, 0.05)"},"overlays":{"noiseOpacity":0.12,"traceOpacity":0.88,"traceStrokeWidth":1.35,"reticleOpacity":0.46},"introDirection":"down" as const,"identityDirection":"left" as const,"projectDirections":["up" as const,"down" as const,"up" as const],"closingDirection":"right" as const,"introScene":{"tracePaths":[{"points":[{"x":84,"y":138},{"x":356,"y":138},{"x":356,"y":246},{"x":692,"y":246}],"startFrame":6,"endFrame":52,"label":"REVISION PATH"},{"points":[{"x":1098,"y":102},{"x":1098,"y":260},{"x":924,"y":260}],"startFrame":26,"endFrame":74,"label":"FIELD REGISTER"}],"reticle":{"x":1040,"y":548,"radius":56}},"identityScene":{"tracePaths":[{"points":[{"x":186,"y":612},{"x":186,"y":170},{"x":480,"y":170}],"startFrame":8,"endFrame":42,"label":"DOSSIER START"}],"reticle":{"x":980,"y":272,"radius":52},"imageSequence":[{"src":"assets/images/rendering-02.webp","startFrame":0,"endFrame":72,"scaleFrom":1,"scaleTo":1.08,"opacity":0.94},{"src":"assets/images/rendering-07.webp","startFrame":60,"endFrame":132,"scaleFrom":1.01,"scaleTo":1.1,"opacity":0.94},{"src":"assets/images/pump-package-01.webp","startFrame":120,"endFrame":192,"scaleFrom":1.02,"scaleTo":1.11,"opacity":0.94},{"src":"assets/images/rendering-09.webp","startFrame":180,"endFrame":252,"scaleFrom":1.01,"scaleTo":1.09,"opacity":0.94},{"src":"assets/images/pumptracker_light_mode_composite_1775435494270.png","startFrame":240,"endFrame":300,"scaleFrom":1.02,"scaleTo":1.12,"opacity":0.94}],"resumeTextBlocks":[{"text":"15+ YEARS","emphasis":"hero" as const,"movement":"drift" as const,"x":-0.55,"y":0.08,"startFrame":0,"endFrame":300,"fontSize":130,"rotate":0,"opacityFrom":0,"opacityTo":0.18,"scaleFrom":1,"scaleTo":1,"driftX":120,"driftY":0},{"text":"DESIGN-TO-ORDER","emphasis":"accent" as const,"movement":"drift" as const,"x":-0.06,"y":0.20,"startFrame":0,"endFrame":220,"fontSize":36,"rotate":0,"opacityFrom":0,"opacityTo":0.88,"scaleFrom":1,"scaleTo":1,"driftX":200,"driftY":0},{"text":"CUSTOM EQUIPMENT","emphasis":"support" as const,"movement":"drift" as const,"x":0.78,"y":-0.18,"startFrame":12,"endFrame":290,"fontSize":20,"rotate":0,"opacityFrom":0,"opacityTo":0.50,"scaleFrom":1,"scaleTo":1,"driftX":0,"driftY":260},{"text":"SOLIDWORKS","emphasis":"support" as const,"movement":"drift" as const,"x":1.0,"y":0.30,"startFrame":18,"endFrame":250,"fontSize":26,"rotate":0,"opacityFrom":0,"opacityTo":0.62,"scaleFrom":1,"scaleTo":1,"driftX":-230,"driftY":0},{"text":"2D FABRICATION","emphasis":"accent" as const,"movement":"drift" as const,"x":-0.04,"y":-0.38,"startFrame":30,"endFrame":300,"fontSize":100,"rotate":0,"opacityFrom":0,"opacityTo":0.22,"scaleFrom":1,"scaleTo":1,"driftX":0,"driftY":260},{"text":"BOM MANAGEMENT","emphasis":"support" as const,"movement":"drift" as const,"x":0.22,"y":0.96,"startFrame":40,"endFrame":290,"fontSize":17,"rotate":0,"opacityFrom":0,"opacityTo":0.54,"scaleFrom":1,"scaleTo":1,"driftX":0,"driftY":-220},{"text":"SHOP-TRUSTED","emphasis":"hero" as const,"movement":"scale-up" as const,"x":1.05,"y":0.52,"startFrame":70,"endFrame":290,"fontSize":44,"rotate":0,"opacityFrom":0,"opacityTo":0.82,"scaleFrom":0.95,"scaleTo":1.05,"driftX":-270,"driftY":0},{"text":"COMMON COMPONENTS","emphasis":"support" as const,"movement":"drift" as const,"x":0.52,"y":-0.14,"startFrame":60,"endFrame":290,"fontSize":19,"rotate":0,"opacityFrom":0,"opacityTo":0.52,"scaleFrom":1,"scaleTo":1,"driftX":0,"driftY":250},{"text":"MANUFACTURABILITY","emphasis":"accent" as const,"movement":"drift" as const,"x":-0.14,"y":0.68,"startFrame":100,"endFrame":300,"fontSize":54,"rotate":0,"opacityFrom":0,"opacityTo":0.88,"scaleFrom":1,"scaleTo":1,"driftX":210,"driftY":0},{"text":"LIGHT AUTOMATION","emphasis":"support" as const,"movement":"drift" as const,"x":0.56,"y":0.98,"startFrame":120,"endFrame":300,"fontSize":15,"rotate":0,"opacityFrom":0,"opacityTo":0.40,"scaleFrom":1,"scaleTo":1,"driftX":0,"driftY":-195},{"text":"REDUCE ERRORS","emphasis":"hero" as const,"movement":"scale-up" as const,"x":1.06,"y":0.32,"startFrame":148,"endFrame":300,"fontSize":72,"rotate":0,"opacityFrom":0,"opacityTo":0.90,"scaleFrom":0.90,"scaleTo":1.12,"driftX":-340,"driftY":0},{"text":"BUILDABLE","emphasis":"accent" as const,"movement":"scale-up" as const,"x":0.38,"y":1.04,"startFrame":168,"endFrame":300,"fontSize":46,"rotate":0,"opacityFrom":0,"opacityTo":0.84,"scaleFrom":0.90,"scaleTo":1.08,"driftX":0,"driftY":-210}]},"projectScenes":[{"tracePaths":[{"points":[{"x":76,"y":612},{"x":300,"y":612},{"x":300,"y":144},{"x":588,"y":144}],"startFrame":12,"endFrame":58,"label":"PRIMARY REVIEW"}],"reticle":{"x":330,"y":210,"radius":48}},{"tracePaths":[{"points":[{"x":1206,"y":108},{"x":934,"y":108},{"x":934,"y":596},{"x":722,"y":596}],"startFrame":12,"endFrame":58,"label":"PRIMARY REVIEW"}],"reticle":{"x":974,"y":500,"radius":48}},{"tracePaths":[{"points":[{"x":76,"y":612},{"x":300,"y":612},{"x":300,"y":144},{"x":588,"y":144}],"startFrame":12,"endFrame":58,"label":"SUPPORTING SYSTEM"}],"reticle":{"x":330,"y":210,"radius":48}}],"closingScene":{"tracePaths":[{"points":[{"x":168,"y":94},{"x":1120,"y":94},{"x":1120,"y":632},{"x":916,"y":632}],"startFrame":0,"endFrame":52,"label":"CLOSING PASS"}]}}}
        schema={ShowreelRemixSchema}
      />
      <Composition
        id="ShowreelRemix1080"
        component={ShowreelRemixVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
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
	              {src: "assets/images/rendering-02.webp", startFrame: 0, endFrame: 72, scaleFrom: 1, scaleTo: 1.08, opacity: 0.94},
	              {src: "assets/images/rendering-07.webp", startFrame: 60, endFrame: 132, scaleFrom: 1.01, scaleTo: 1.1, opacity: 0.94},
	              {src: "assets/images/pump-package-01.webp", startFrame: 120, endFrame: 192, scaleFrom: 1.02, scaleTo: 1.11, opacity: 0.94},
	              {src: "assets/images/rendering-09.webp", startFrame: 180, endFrame: 252, scaleFrom: 1.01, scaleTo: 1.09, opacity: 0.94},
	              {src: "assets/images/pumptracker_light_mode_composite_1775435494270.png", startFrame: 240, endFrame: 300, scaleFrom: 1.02, scaleTo: 1.12, opacity: 0.94},
	            ],
	            resumeTextBlocks: [
	              // H-River A (L→R) — background anchor, glacier-slow
	              {text: "15+ YEARS",          emphasis: "hero",    movement: "drift",    x: -0.55, y: 0.08,  startFrame: 0,   endFrame: 300, fontSize: 130, rotate: 0, opacityFrom: 0, opacityTo: 0.18, scaleFrom: 1,    scaleTo: 1,    driftX: 120,  driftY: 0},
	              // H-River A foreground read (L→R)
	              {text: "DESIGN-TO-ORDER",    emphasis: "accent",  movement: "drift",    x: -0.06, y: 0.20,  startFrame: 0,   endFrame: 220, fontSize: 36,  rotate: 0, opacityFrom: 0, opacityTo: 0.88, scaleFrom: 1,    scaleTo: 1,    driftX: 200,  driftY: 0},
	              // V-Descent lane 1 (top → bottom)
	              {text: "CUSTOM EQUIPMENT",   emphasis: "support", movement: "drift",    x: 0.78,  y: -0.18, startFrame: 12,  endFrame: 290, fontSize: 20,  rotate: 0, opacityFrom: 0, opacityTo: 0.50, scaleFrom: 1,    scaleTo: 1,    driftX: 0,    driftY: 260},
	              // H-River B (R→L) — support
	              {text: "SOLIDWORKS",         emphasis: "support", movement: "drift",    x: 1.0,   y: 0.30,  startFrame: 18,  endFrame: 250, fontSize: 26,  rotate: 0, opacityFrom: 0, opacityTo: 0.62, scaleFrom: 1,    scaleTo: 1,    driftX: -230, driftY: 0},
	              // V-Descent macro ambient (top → bottom)
	              {text: "2D FABRICATION",     emphasis: "accent",  movement: "drift",    x: -0.04, y: -0.38, startFrame: 30,  endFrame: 300, fontSize: 100, rotate: 0, opacityFrom: 0, opacityTo: 0.22, scaleFrom: 1,    scaleTo: 1,    driftX: 0,    driftY: 260},
	              // V-Ascent lane (bottom → top)
	              {text: "BOM MANAGEMENT",     emphasis: "support", movement: "drift",    x: 0.22,  y: 0.96,  startFrame: 40,  endFrame: 290, fontSize: 17,  rotate: 0, opacityFrom: 0, opacityTo: 0.54, scaleFrom: 1,    scaleTo: 1,    driftX: 0,    driftY: -220},
	              // H-River B mid-weight hero (R→L)
	              {text: "SHOP-TRUSTED",       emphasis: "hero",    movement: "scale-up", x: 1.05,  y: 0.52,  startFrame: 70,  endFrame: 290, fontSize: 44,  rotate: 0, opacityFrom: 0, opacityTo: 0.82, scaleFrom: 0.95, scaleTo: 1.05, driftX: -270, driftY: 0},
	              // V-Descent lane 2 (top → bottom)
	              {text: "COMMON COMPONENTS",  emphasis: "support", movement: "drift",    x: 0.52,  y: -0.14, startFrame: 60,  endFrame: 290, fontSize: 19,  rotate: 0, opacityFrom: 0, opacityTo: 0.52, scaleFrom: 1,    scaleTo: 1,    driftX: 0,    driftY: 250},
	              // H-River A climactic credential (L→R)
	              {text: "MANUFACTURABILITY",  emphasis: "accent",  movement: "drift",    x: -0.14, y: 0.68,  startFrame: 100, endFrame: 300, fontSize: 54,  rotate: 0, opacityFrom: 0, opacityTo: 0.88, scaleFrom: 1,    scaleTo: 1,    driftX: 210,  driftY: 0},
	              // V-Ascent support (software — deliberately weaker)
	              {text: "LIGHT AUTOMATION",   emphasis: "support", movement: "drift",    x: 0.56,  y: 0.98,  startFrame: 120, endFrame: 300, fontSize: 15,  rotate: 0, opacityFrom: 0, opacityTo: 0.40, scaleFrom: 1,    scaleTo: 1,    driftX: 0,    driftY: -195},
	              // H-River B climactic hero sweep (R→L)
	              {text: "REDUCE ERRORS",      emphasis: "hero",    movement: "scale-up", x: 1.06,  y: 0.32,  startFrame: 148, endFrame: 300, fontSize: 72,  rotate: 0, opacityFrom: 0, opacityTo: 0.90, scaleFrom: 0.90, scaleTo: 1.12, driftX: -340, driftY: 0},
	              // V-Ascent finale accent (bottom → top)
	              {text: "BUILDABLE",          emphasis: "accent",  movement: "scale-up", x: 0.38,  y: 1.04,  startFrame: 168, endFrame: 300, fontSize: 46,  rotate: 0, opacityFrom: 0, opacityTo: 0.84, scaleFrom: 0.90, scaleTo: 1.08, driftX: 0,    driftY: -210},
	            ],
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
        }}
        schema={ShowreelRemixSchema}
      />
      <Composition
        id="CaseStudies"
        component={CaseStudiesVideo}
        durationInFrames={CASE_STUDIES_FRAMES}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{
          sequenceLabelPrefix: "CASE STUDY",
          imageFooterNote: "Each case study is framed as a decision path, not a decorative slide.",
        }}
        schema={CaseStudiesSchema}
      />
    </>
  );
};

registerRoot(RemotionRoot);

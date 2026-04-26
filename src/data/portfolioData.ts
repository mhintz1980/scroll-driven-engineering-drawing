export const portfolioData = {
  personal: {
    name: "Mark Hintz",
    superHeader: "// DESIGN + MANUFACTURING BRIDGE",
    title: {
      line1: "Built from the",
      line2: "shop floor up."
    },
    bio: "I design mechanical systems and build software and AI tools that make work faster, clearer, and more capable.",
    about:
      "I've spent 15 years where design meets fabrication reality — planetary gearboxes built to ±0.0005\" and tested by hand, pump packages that had to survive welding, assembly, and field use, and firearms components toleranced for function, not just geometry. I've operated and supported 7-axis mill-turn centers, inspected with height gages and sin blocks where most shops would call for a CMM, and quoted jobs from single parts to 100-piece assemblies. When the manufacturing side is solid, the software layer gets sharper too — I build AI tools and internal systems that make engineering decisions faster and more visible across the operation.",
    location: "Jacksonville, FL",
    email: "markworks.dev@gmail.com",
    phone: "(904) 862-1945",
    linkedin: "https://linkedin.com/in/mark-hintz-builds",
    footerCTA: "Ready to build something that actually holds tolerance?",
    copyright: `© ${new Date().getFullYear()} Mark Hintz. All rights reserved.`
  },

  navigation: [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Services", href: "/#services" },
    { label: "Case Studies", href: "/#case-studies" },
    { label: "Contact", href: "/#contact" }
  ],

  heroActions: [
    { label: "Let's Talk Work", href: "/#contact", primary: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/mark-hintz-builds", target: "_blank" }
  ],

  projects: [
    {
      title: "Industrial Torque Wrench",
      category: "Mechanical design • Planetary gearboxes • Precision assemblies",
      image: "assets/images/torque-wrench-hero.webp",
      outcome: "DFM review cut manufacturing cost by 22%",
      tags: ["SolidWorks", "Planetary Gearboxes", "Precision Machining", "DFM"],
      gallery: [
        "assets/images/torque-wrench-01.webp",
        "assets/images/torque-wrench-02.webp",
        "assets/images/torque-wrench-03.webp",
        "assets/images/torque-wrench-04.webp",
        "assets/images/torque-wrench-05.webp",
        "assets/images/torque-wrench-06.webp"
      ]
    },
    {
      title: "Armament Components & Receiver Systems",
      category: "Mechanical design • Receivers • Weapon-system components",
      image: "assets/images/AR-15 Lower Reciever-Forged.jpg",
      outcome: "Receiver and component geometry resolved for fit, function, and manufacturability",
      tags: ["SolidWorks", "Receiver Design", "Fit & Function", "Manufacturing Drawings"],
      gallery: [
        "assets/images/308 KB.webp",
        "assets/images/3D View-3.webp",
        "assets/images/Rendering of Upper and Lower Receiver Assembly for an AR15 That I designed for a Leader in the weapons Industry.jpg",
        "assets/images/TAURUS-8.875-1P-3K-Rev1-3 view.webp"
      ]
    },
    {
      title: "Renderings & Visualizations",
      category: "PhotoView 360 • SolidWorks Visualize • Product renders",
      image: "assets/images/renderings-hero.webp",
      outcome: "Photorealistic renders — eliminated physical mockup cost",
      tags: ["PhotoView 360", "SolidWorks Visualize", "Keyshot", "HDRI"],
      gallery: [
        "assets/images/rendering-01.webp",
        "assets/images/rendering-02.webp",
        "assets/images/rendering-03.webp",
        "assets/images/rendering-04.webp",
        "assets/images/rendering-05.webp",
        "assets/images/rendering-06.webp",
        "assets/images/rendering-07.webp",
        "assets/images/rendering-08.webp",
        "assets/images/rendering-09.webp",
        "assets/images/rendering-10.webp",
        "assets/images/HYDRAULIC-TORQUE-MXT03-ASSY.jpg"
      ]
    },
    {
      title: "Pump Package Design System (Skids, Enclosures, Mounts, Lifting)",
      category: "Mechanical design • SolidWorks • DFM/DFA",
      image: "assets/images/pump-package-hero.webp",
      outcome: "Zero tolerance failures across 47-component assembly",
      tags: ["SolidWorks", "DFM/DFA", "GD&T", "Sheet Metal", "Weldments"],
      gallery: [
        "assets/images/pump-package-01.webp",
        "assets/images/pump-package-02.webp",
        "assets/images/pump-package-03.webp",
        "assets/images/pump-package-04.webp"
      ]
    },
    {
      title: "PumpTracker (Production Scheduling + Capacity Planning)",
      category: "Internal tool • React/TypeScript • Firebase/Supabase",
      image: "assets/images/pumptracker-hero.webp",
      outcome: "Eliminated manual scheduling — 30+ hrs/week recovered",
      tags: ["React", "TypeScript", "Supabase", "Firebase", "AI Workflows"],
      gallery: [
        "assets/images/pumptracker-01.webp",
        "assets/images/pumptracker-02.webp",
        "assets/images/pumptracker-03.webp",
        "assets/images/pumptracker-04.webp"
      ]
    }
  ],

  services: [
    {
      title: "CAD Automation",
      subtitle: "SolidWorks · PDM · Design Tables",
      description: "If your engineers are dragging drawing trees by hand, your tools aren't working hard enough. I build macros, API hooks, and design table systems that cut repetitive CAD work down to seconds and enforce standards without chasing people.",
      deliverables: [
        "SolidWorks macros & API automation",
        "PDM Vault workflow optimization",
        "Design Table systems & configurators",
        "Drawing package automation"
      ],
      rate: "Starting at $85/hr · Fixed-price projects available",
      cta: { label: "Get a quote →", href: "/#contact" }
    },
    {
      title: "AI Integration",
      subtitle: "Python · Claude SDK · Custom Tooling",
      description: "Most AI tools are built by people who have never held a drawing package. I understand the mechanical context first, then build the tool around it — custom agents, intelligent documentation systems, and workflow automation that fits how engineering shops actually run.",
      deliverables: [
        "Custom AI agents for engineering workflows",
        "Natural language interfaces for CAD/PDM systems",
        "Automated reporting & documentation",
        "Intelligent design review tooling"
      ],
      rate: "Starting at $100/hr · Premium niche",
      cta: { label: "Discuss your project →", href: "/#contact" }
    },
    {
      title: "Design Review & DFM",
      subtitle: "SolidWorks · GD&T · Manufacturing Feedback",
      description: "I've assembled the gearboxes, run the parts through inspection, and quoted the job. That background changes the DFM conversation — I'm not guessing what the shop will hate, I've been the one dealing with it. Delivered as actionable redlines, not a lecture.",
      deliverables: [
        "DFM/DFA analysis & redlines",
        "GD&T review & correction",
        "Tolerance stack-up analysis",
        "Drawing package audit"
      ],
      rate: "Starting at $75/hr · Per-drawing packages available",
      cta: { label: "Request a review →", href: "/#contact" }
    }
  ],

  caseStudies: [
    {
      title: "Reliability Engineering: Extending Asset Lifecycle from 3 to 5 Years",
      summary: { 
        problem: "Grinding paste failure mode", 
        solution: "Tribopolymer + IoT monitoring", 
        result: "+2 years asset life" 
      },
      image: "assets/images/case-study-asset-lifecycle.webp"
    },
    {
      title: "Designing the Future of Practice: A Capabilities Deck",
      summary: { 
        problem: "Generic design perception", 
        solution: "Custom engineering-first framework", 
        result: "3 new high-value leads" 
      },
      image: "assets/images/case-study-capabilities-deck.webp"
    },
    {
      title: "Strategic Engineering Hire for Power Tee's Jacksonville Expansion",
      summary: { 
        problem: "Lack of technical automation", 
        solution: "AI-driven production stack", 
        result: "Immediate operational scale" 
      },
      image: "assets/images/case-study-power-tee.webp"
    }
  ],

  testimonials: [
    {
      text:
        "Mark is the only designer I know who models a gearbox, then actually builds it and tests it on the torque guns himself. And while he doesn't program the twin turret mill-turn centers, he designs parts that account for the toolpaths and setups we need. He understands the machining strategy before he even draws the first line.",
      author: "Kevin B.",
      role: "Head CNC Programmer, STS",
      score: "98/100"
    },
    {
      text:
        "Mark understands that a tight tolerance on a print costs money. Because he's inspected these parts himself, he applies GD&T that strictly controls the critical geometry but leaves the rest open for speed. He balances precision with production.",
      author: "Lisa Fullem",
      role: "Quality Assurance Lead, STS",
      score: "100/100"
    },
    {
      text:
        "It's rare to find a designer who understands the constraints of a 5-axis mill and the realities of the assembly line. Mark designs parts that are easy to machine and foolproof to assemble. He's run the machines, built the gearboxes, and tested the product. That experience is visible in every drawing he releases.",
      author: "Darrin Phipps",
      role: "President, Black Creek Precision",
      score: "100/100"
    }
  ],

  footerCredits: [
    "Designed + built by Mark Hintz",
    "±0.0005\" on the floor. TypeScript in the chair."
  ]
};

export const skillsTickerData = [
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
  "Planetary Gearboxes"
];

export const coreServices = [
  {
    title: "Mechanical design with fabrication built in",
    description:
      "SolidWorks assemblies designed by someone who's built them — sheet metal that bends cleanly, weldments that fit up right, gearbox components toleranced through heat treat, and drawings that give the shop what it actually needs to make the part correctly.",
    tags: ["SolidWorks", "Sheet metal", "GD&T", "DFM/DFA"],
  },
  {
    title: "Documentation that holds up in production",
    description:
      "BOMs, fabrication drawings, DXFs, flat patterns, revision control, part-number systems — all the structural work that prevents the floor from running on tribal knowledge and inference. Built to last past the first build.",
    tags: ["BOMs", "PDM", "ASME prints", "DXF/CNC prep"],
  },
  {
    title: "Internal tools that match how engineering actually runs",
    description:
      "Production scheduling, capacity tracking, procurement visibility, AI-powered documentation — built lean, deployed fast, maintained without a full-time dev team. The kind of tool a designer builds when the shop is losing weeks to things that should be automatic.",
    tags: ["React/TypeScript", "SQL", "Firebase/Supabase", "AI workflows"],
  },
];

export const wordCycleData = [
  "manufacturing reality built in",
  "floor-ready documentation",
  "software as operational proof"
];

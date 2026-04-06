export const portfolioData = {
  personal: {
    name: "Mark Hintz",
    superHeader: "// MECHANICAL SYSTEMS & AUTOMATION",
    title: {
      line1: "Precision Engineering.",
      line2: "Automated Logic."
    },
    bio: "I automate the work that shouldn't be manual.",
    about:
      "Mechanical designer and modern toolmaker with experience in diesel-powered industrial pump systems, sound-attenuated enclosures, firearms and related accessories, and the design/development of planetary reduction gearboxes that power industrial tooling. I work at the intersection of hardware and software: designing real-world equipment in SolidWorks, supporting machine shops, fabrication, and assembly—while building AI-powered tools that reduce friction in engineering, documentation, and troubleshooting. I'm especially interested in roles that value practical, field-ready design plus smarter internal tools and workflows.",
    location: "Jacksonville, FL",
    email: "markworks.dev@gmail.com",
    phone: "(904) 862-1945",
    linkedin: "https://linkedin.com/in/mark-hintz-builds",
    footerCTA: "Come on. Let's build something cool together.",
    copyright: `© ${new Date().getFullYear()} Mark Hintz. All rights reserved.`
  },

  navigation: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Contact", href: "#contact" }
  ],

  heroActions: [
    { label: "Let's Talk Work", href: "#contact", primary: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/mark-hintz-builds", target: "_blank" }
  ],

  projects: [
    {
      title: "PumpTracker (Production Scheduling + Capacity Planning)",
      category: "Internal tool • React/TypeScript • Firebase/Supabase",
      image: "assets/images/pumptracker-hero.webp",
      featured: true,
      outcome: "Eliminated manual scheduling — 30+ hrs/week recovered",
      tags: ["React", "TypeScript", "Supabase", "Firebase", "AI Workflows"],
      gallery: [
        "assets/images/pumptracker-01.webp",
        "assets/images/pumptracker-02.webp",
        "assets/images/pumptracker-03.webp",
        "assets/images/pumptracker-04.webp"
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
        "assets/images/rendering-10.webp"
      ]
    }
  ],

  services: [
    {
      title: "CAD Automation",
      subtitle: "SolidWorks · PDM · Design Tables",
      description: "Stop doing manually what a macro can do in seconds. I build SolidWorks automation that eliminates repetitive tasks, enforces standards, and lets your engineers focus on engineering.",
      deliverables: [
        "SolidWorks macros & API automation",
        "PDM Vault workflow optimization",
        "Design Table systems & configurators",
        "Drawing package automation"
      ],
      rate: "Starting at $85/hr · Fixed-price projects available",
      cta: { label: "Get a quote →", href: "#contact" }
    },
    {
      title: "AI Integration",
      subtitle: "Python · Claude SDK · Custom Tooling",
      description: "The rare engineer who can build the AI tool AND understand the mechanical context it operates in. Custom agents, workflow automation, and intelligent tooling for engineering environments.",
      deliverables: [
        "Custom AI agents for engineering workflows",
        "Natural language interfaces for CAD/PDM systems",
        "Automated reporting & documentation",
        "Intelligent design review tooling"
      ],
      rate: "Starting at $100/hr · Premium niche",
      cta: { label: "Discuss your project →", href: "#contact" }
    },
    {
      title: "Design Review & DFM",
      subtitle: "SolidWorks · GD&T · Manufacturing Feedback",
      description: "15+ years on the shop floor means I catch what CAD-only designers miss. DFM/DFA analysis, drawing package review, tolerance stack-up — delivered as actionable redlines.",
      deliverables: [
        "DFM/DFA analysis & redlines",
        "GD&T review & correction",
        "Tolerance stack-up analysis",
        "Drawing package audit"
      ],
      rate: "Starting at $75/hr · Per-drawing packages available",
      cta: { label: "Request a review →", href: "#contact" }
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
    "SolidWorks brain, JavaScript hands"
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
    title: "Mechanical design that survives the shop floor",
    description:
      "SolidWorks assemblies: sheet metal weldments, engine mounts, industrial torque wrenches, lifting structures, and production-ready drawings that reduce rework, confusion, and tribal-knowledge dependency.",
    tags: ["SolidWorks", "Sheet metal", "GD&T", "DFM/DFA"],
  },
  {
    title: "Manufacturing documentation + release hygiene",
    description:
      "BOMs, fabrication drawings, DXFs/flat patterns, revision control, naming/part-number systems, and the boring-but-critical stuff that keeps production from face-planting.",
    tags: ["BOMs", "PDM", "ASME prints", "DXF/CNC prep"],
  },
  {
    title: "Internal tools + automation (practical, not science-fair)",
    description:
      "Lightweight apps and automations that connect the dots between engineering, scheduling, purchasing, and production—so the team can see bottlenecks before they become late shipments.",
    tags: ["React/TypeScript", "SQL", "Firebase/Supabase", "AI workflows"],
  },
];

export const wordCycleData = [
  "AI-driven custom tooling",
  "Production-ready designs",
  "Engineering precision"
];

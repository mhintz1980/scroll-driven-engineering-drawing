# Portfolio Text, Image, and Reel Cheat Sheet

This is the fast edit map for the live Vite portfolio page and the Remotion showreel content that feeds the embedded video on that page.

Core rule:
- Most page copy and project images come from `src/data/portfolioData.ts`.
- The portfolio page reel is just a rendered MP4 embed.
- The content inside that MP4 is controlled in Remotion, not in the page component.

## 1. Global Data Source

### `src/data/portfolioData.ts`
- Main page copy source: [portfolioData.ts](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/data/portfolioData.ts:1)
- Personal info block: lines `2-18`
- Navigation labels: lines `20-26`
- Hero CTA buttons: lines `28-31`
- Projects array, including order, titles, categories, outcomes, tags, hero image, and gallery images: lines `33-109`
- Services and rates: lines `111-151`
- Case studies: lines `153-181`
- Testimonials / references: lines `183-205`
- Footer credits: lines `207-210`

Project order is whatever order the objects appear in `portfolioData.projects`.

## 2. Text Cheats

### Navigation
File: [Navbar.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/components/layout/Navbar.tsx)
- Brand name: sourced from `portfolioData.personal.name`
- Nav labels: sourced from `portfolioData.navigation`
- Color cheat: `text-primary`, with links using `text-secondary` and `hover:text-accent-primary`

### Hero
File: [Hero.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/components/sections/Hero.tsx:1)
- Super header: line `41`, from `portfolioData.personal.superHeader`
- Big title lines: lines `47`, `51`, from `portfolioData.personal.title`
- Cycler sentence lead-in: lines `61-63`, hardcoded
- Cycler rotating phrases: lines `66-73`, from `wordCycleData`
- Hero buttons: lines `86-103`, from `portfolioData.heroActions`
- Spec terminal values:
  - Name: line `112`, from `portfolioData.personal.name`
  - Role: line `113`, hardcoded
  - Tolerance / years / location: line `114`, hardcoded
  - Status: line `115`, hardcoded
  - Stack: line `116`, hardcoded
- Color cheat:
  - Main text: `text-primary`
  - Accent phrase: `text-accent-primary`
  - Super header: `text-secondary`
  - Primary CTA: `bg-accent-primary text-white`

### Projects
Files:
- Data: [portfolioData.ts](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/data/portfolioData.ts:33)
- Card UI: [ProjectCard.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/components/sections/ProjectCard.tsx:1)

What to edit:
- Project title, category, outcome, tags, hero image, and gallery image list:
  - edit the matching object in `portfolioData.projects`, lines `33-109`
- Current project order:
  - `Industrial Torque Wrench`
  - `Armament Components & Receiver Systems`
  - `Renderings & Visualizations`
  - `Pump Package Design System (Skids, Enclosures, Mounts, Lifting)`
  - `PumpTracker (Production Scheduling + Capacity Planning)`
- Media strip label:
  - `"Project Media"` line `216`
  - helper sentence lines `219-220`
  - button label lines `223-229`
- Hero image frame badge:
  - `"Media Frame"` line `69`
- Color cheat:
  - Title: `text-primary`, hover `text-accent-primary`
  - Category: `text-secondary`
  - Tags: `bg-secondary/10 text-primary`
  - Outcome panel: `bg-emerald-50`, `border-emerald-500`

### Engineering Reel section text
File: [EngineeringReel.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/components/sections/EngineeringReel.tsx:1)
- Section eyebrow: line `31`, hardcoded `// ENGINEERING REVIEW REEL`
- Section title: lines `34-36`, hardcoded `See the work in motion.`
- Supporting sentence: lines `38-40`, hardcoded
- Top strip:
  - `ENG-REEL-001` line `52`
  - `REV A` line `53`
  - `SHEET 1 OF 1` line `54`
- Bottom strip:
  - manufacturing-first sentence line `75`
  - `PLAYING / STANDBY` line `76`
- Fallback placeholder text:
  - title and helper copy lines `104-111`

### Contact / Footer
File: [Contact.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/components/sections/Contact.tsx:1)
- Main footer CTA: line `33`, from `portfolioData.personal.footerCTA`
- Supporting paragraph: lines `35-38`, hardcoded
- Main button label: line `47`, hardcoded `Start a Project`
- Location / contact / social labels: lines `66-67`, `74-75`, `91-92`, hardcoded
- Email, phone, LinkedIn: lines `70`, `81`, `87`, `95-100`, from `portfolioData.personal`
- Footer credits: lines `107-111`, from `portfolioData.personal.copyright` and `portfolioData.footerCredits`

## 3. Project Image Cheats

### Portfolio page project images
Data source: [portfolioData.ts](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/data/portfolioData.ts:33)

How it works:
- `image` = main hero image for the project card
- `gallery` = extra project images used by the expanded media strip
- The card UI normalizes them in [projects-media.ts](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/components/sections/projects-media.ts:1)
- The hero card on the page crossfades and auto-rotates through that combined list in [ProjectCard.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/components/sections/ProjectCard.tsx:36)

Current live project image records:
- Torque Wrench: lines `35-47`
- Armament: lines `50-61`
- Renderings: lines `64-81`
- Pump Package: lines `84-94`
- PumpTracker: lines `97-107`

Portfolio page image behavior cheats:
- Fade transition duration: [ProjectCard.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/components/sections/ProjectCard.tsx:61)
  - opacity fade is `0.65s`
- Per-card autoplay delay source: [projects-media.ts](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/components/sections/projects-media.ts:1)
  - used from [ProjectCard.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/components/sections/ProjectCard.tsx:153)
  - timer setup is lines `158-170`

## 4. Reel Video Cheats

### What the portfolio page actually shows
File: [EngineeringReel.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/components/sections/EngineeringReel.tsx:5)
- Current page video source: `assets/video/engineering-review-loop.mp4`
- To swap the embedded file on the page only:
  - change `REEL_SRC` on line `5`
- To change the actual content inside that file:
  - edit the Remotion composition
  - render a new MP4
  - overwrite `public/assets/video/engineering-review-loop.mp4`

### Which Remotion composition matters
Primary file: [Root.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/remotion/src/Root.tsx:417)
- Current rendered loop should be treated as coming from `ShowreelRemixV2`
- Composition block starts at line `417`
- `projects` content for the reel starts at line `438`
- `projectScenes` image sequences start at line `631`

Timing file: [ShowreelRemixV2Video.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/remotion/src/ShowreelRemixV2Video.tsx:23)
- Blueprint scene duration: line `23`, `8 * FPS` = `8s`
- Identity scene duration: line `24`, `10 * FPS` = `10s`
- Each project scene duration: line `25`, `12 * FPS` = `12s`
- CTA scene duration: line `26`, `8 * FPS` = `8s`
- Scene transition frames: lines `90-93`, `104-107`, `119-122`, `134-137`, `149-152`, `179-182`

Base FPS source: [constants.ts](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/remotion/src/constants.ts:48)
- `FPS = 30`

Quick conversion cheat:
- `30 frames = 1 second`
- `60 frames = 2 seconds`
- `90 frames = 3 seconds`
- `120 frames = 4 seconds`
- `180 frames = 6 seconds`
- `300 frames = 10 seconds`
- `360 frames = 12 seconds`

### Current image timing inside the rendered reel

These are the image sequences that currently determine how long each still appears on screen inside the Remotion video.

Identity montage:
- File: [Root.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/remotion/src/Root.tsx:613)
- `rendering-02.webp` frames `0-72`, about `2.4s`
- `rendering-07.webp` frames `60-132`, about `2.4s`
- `pump-package-01.webp` frames `120-192`, about `2.4s`
- `rendering-09.webp` frames `180-252`, about `2.4s`
- `pumptracker_light_mode_composite_1775435494270.png` frames `240-300`, about `2.0s`

Project 0, Pump Package:
- File: [Root.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/remotion/src/Root.tsx:648)
- `pump-package-04.webp` frames `0-90`, `3.0s`
- `rendering-05.webp` frames `78-168`, `3.0s`
- `pump-package-03.webp` frames `156-252`, `3.2s`
- `side-door.webp` frames `240-360`, `4.0s`

Project 1, Torque Wrench:
- File: [Root.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/remotion/src/Root.tsx:683)
- `torque-wrench-01.webp` frames `0-70`, about `2.3s`
- `torque-wrench-06.webp` frames `58-128`, about `2.3s`
- `JGUN-DS-APACHE.JPG` frames `116-186`, about `2.3s`
- `torque-wrench-05.webp` frames `174-244`, about `2.3s`
- `torque-wrench-03.webp` frames `232-302`, about `2.3s`
- `torque-wrench-02.webp` frames `290-360`, about `2.3s`

Project 2, PumpTracker:
- File: [Root.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/remotion/src/Root.tsx:717)
- `pumptracker-04.webp` frames `0-90`, `3.0s`
- `pumptracker-light-final.png` frames `78-192`, `3.8s`
- `pumptracker-03.webp` frames `180-360`, `6.0s`

Project 3, Armament:
- File: [Root.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/remotion/src/Root.tsx:748)
- `rendering-06.webp` frames `0-120`, `4.0s`
- `rendering-07.webp` frames `108-240`, `4.4s`
- `rendering-09.webp` frames `228-360`, `4.4s`

Project 4, Renderings:
- File: [Root.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/remotion/src/Root.tsx:779)
- `rendering-01.webp` frames `0-80`, about `2.7s`
- `rendering-04.webp` frames `68-150`, about `2.7s`
- `rendering-08.webp` frames `138-230`, about `3.1s`
- `rendering-10.webp` frames `218-310`, about `3.1s`
- `renderings-hero.webp` frames `298-360`, about `2.1s`

### Remotion Studio cheats

Open in Studio:
- Composition: `ShowreelRemixV2`
- File owner of the composition definition: [Root.tsx](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/remotion/src/Root.tsx:417)

Change in Studio if you want to avoid code edits:
- `projects`
  - use this to swap project title, subtitle, category, hero image path, tags, and narrative copy
- `projectScenes`
  - use this to swap `imageSequence` image paths
  - use this to change `startFrame` and `endFrame` per image
- `identityScene`
  - use this to change the identity montage `imageSequence`

Important Studio note:
- The project has historically relied on inline `defaultProps` in `remotion/src/Root.tsx` so Studio “Save default props” writes back more reliably there than through imported constants.
- If Studio edits do not persist the way you expect, make the same change directly in `Root.tsx`.

### Render / publish cheat

After changing Remotion content:
- render from `remotion/`
- export the updated MP4
- copy the finished file into `public/assets/video/engineering-review-loop.mp4`
- the portfolio page embed in `EngineeringReel.tsx` will then pick it up automatically

## 5. Color Architecture Reminder

If you need to change the underlying palette instead of swapping Tailwind utility usage:
- edit [index.css](/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad/src/index.css)

Common live site text utilities:
- `text-primary`: main reading text
- `text-secondary`: muted support text
- `text-accent-primary`: main brand accent
- `text-accent-secondary`: secondary cyan accent

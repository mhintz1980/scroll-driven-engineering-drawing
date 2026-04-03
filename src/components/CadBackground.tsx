import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

type Drawing = {
  src: string;
  alt: string;
  className: string;
  initialScale: number;
  finalScale: number;
  yOffset: number;
  fadeInStart?: number;
  fadeInEnd?: number;
  fadeOutStart?: number;
  fadeOutEnd?: number;
  maxOpacity: number;
};

// Configuration for each background drawing
const drawings: Drawing[] = [
  // --- DRAWING GROUP 1: Visible immediately (Opted OUT of fade-in) ---
  {
    src: "/P001812.jpg",
    alt: "Input Shaft",
    className: "bottom-[5%] left-[26%] w-[20vw] md:w-[35vw]",
    initialScale: 3,
    finalScale: 0.75,
    yOffset: -500,
    fadeOutStart: 0.15,
    fadeOutEnd: 0.7,
    maxOpacity: 0.25,
  },
  {
    src: "/P000473.jpg",
    alt: "Output Shaft",
    className: "top-[-0%] left-[0%] w-[20vw] md:w-[35vw]",
    initialScale: 1.95,
    finalScale: 6,
    yOffset: 500,
    fadeOutStart: 0.18,
    fadeOutEnd: 0.5,
    maxOpacity: 0.6,
  },
  {
    src: "/A000629.jpg",
    alt: "Gearbox Assembly",
    className: "bottom-[0%] right-[0%] w-[40vw] md:w-[40vw]",
    initialScale: 1.5,
    finalScale: 4,
    yOffset: 250,
    fadeOutStart: 0.15,
    fadeOutEnd: 0.5,
    maxOpacity: 0.35,
  },
  // --- DRAWING GROUP 2 We want these to sneak in, so we define the fade-in points
  {
    src: "/P000420.jpg",
    alt: "Intermediate Housing",
    className: "bottom-[-10%] right-[0%] w-[20vw] md:w-[45vw]",
    initialScale: 1.2,
    finalScale: 2.5,
    yOffset: -200,
    fadeInStart: 0.25,
    fadeInEnd: 0.4,
    maxOpacity: 0.75,
  },
  {
    src: "/P001382.jpg",
    alt: "Big Housing",
    className: "bottom-[20%] left-[10%] w-[20vw] md:w-[35vw]",
    initialScale: 1,
    finalScale: 3,
    yOffset: 0,
    fadeInStart: 0.25,
    fadeInEnd: 0.6,
    maxOpacity: 0.85,
  },
];

// A re-usable component for a single animating drawing layer
function DrawingLayer({
  drawing,
  scrollYProgress,
}: {
  drawing: Drawing;
  scrollYProgress: MotionValue<number>;
}) {
  const {
    src,
    alt,
    className,
    initialScale,
    finalScale,
    yOffset,
    fadeInStart,
    fadeInEnd,
    fadeOutStart,
    fadeOutEnd,
    maxOpacity,
  } = drawing;

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [initialScale, finalScale],
  );
  const y = useTransform(scrollYProgress, [0, 1], [0, yOffset]);

  // Dynamically build the scroll timeline based strictly on configured properties
  const scrollPoints: number[] = [];
  const opacityPoints: number[] = [];

  const hasFadeIn = fadeInStart !== undefined && fadeInEnd !== undefined;
  const hasFadeOut = fadeOutStart !== undefined && fadeOutEnd !== undefined;

  if (hasFadeIn) {
    scrollPoints.push(0, fadeInStart, fadeInEnd);
    opacityPoints.push(0, 0, maxOpacity);
  }

  if (hasFadeOut) {
    if (!hasFadeIn) {
      scrollPoints.push(0);
      opacityPoints.push(maxOpacity);
    } else if (fadeInEnd !== undefined && fadeOutStart !== undefined && fadeOutStart > fadeInEnd) {
      // Hold max opacity between fade-in end and fade-out start
      if (scrollPoints[scrollPoints.length - 1] !== fadeOutStart) {
        scrollPoints.push(fadeOutStart);
        opacityPoints.push(maxOpacity);
      }
    }
    scrollPoints.push(fadeOutStart, fadeOutEnd);
    opacityPoints.push(maxOpacity, 0);
  }

  if (scrollPoints.length === 0) {
    scrollPoints.push(0, 1);
    opacityPoints.push(maxOpacity, maxOpacity);
  } else {
    // Explicitly add a point at scroll = 1 if the timeline stops early
    // This absolutely forces Framer Motion to hold the final interpolated value
    // rather than doing anything unpredictable at the bottom of the page.
    const lastScrollValue = scrollPoints[scrollPoints.length - 1];
    if (lastScrollValue < 1) {
      scrollPoints.push(1);
      opacityPoints.push(opacityPoints[opacityPoints.length - 1]);
    }
  }

  // Feed the dynamically generated timeline to Framer Motion
  const opacity = useTransform(scrollYProgress, scrollPoints, opacityPoints) as MotionValue<number>;

  return (
    <motion.div
      style={{ scale, opacity, y }}
      className={`absolute pointer-events-none ${className} flex items-center justify-center`}
    >
      <div
        className="w-full h-full"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)",
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`}
          alt={alt}
          className="w-full h-auto mix-blend-multiply grayscale opacity-85"
        />
      </div>
    </motion.div>
  );
}

export function CadBackground() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center bg-[#f8f9fa] overflow-hidden font-sans -z-10">
      {drawings.map((drawing, index) => (
        <DrawingLayer
          key={index}
          drawing={drawing}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

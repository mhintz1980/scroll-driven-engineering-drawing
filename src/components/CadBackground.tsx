import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Configuration for each background drawing
// Add more objects here to make the background denser!
const drawings = [
  {
    src: "/P000420.jpg",
    alt: "Mechanical Drawing 1",
    // Position and size using Tailwind utilities
    className: "top-[10%] left-[5%] w-[50vw] md:w-[35vw]",
    // Animation parameters
    initialScale: 1.0,
    finalScale: 1.8,
    fadeEnd: 0.6, // Fades out completely by 60% of the scroll
    yOffset: 200, // Drifts down 100px
  },
  {
    src: "/P000473.jpg",
    alt: "Mechanical Drawing 2",
    className: "top-[30%] right-[0%] w-[60vw] md:w-[40vw]",
    initialScale: 0.8,
    finalScale: 1.2,
    fadeEnd: 0.8, // Fades out slower
    yOffset: 150,
  },
  {
    src: "/P001382.png",
    alt: "Mechanical Drawing 3",
    className: "bottom-[15%] left-[15%] w-[45vw] md:w-[30vw]",
    initialScale: 1.1,
    finalScale: 1.6,
    fadeEnd: 0.5, // Fades out faster
    yOffset: 200,
  },
  {
    src: "/P000629.jpg",
    alt: "Mechanical Drawing 4",
    className: "-top-[5%] right-[25%] w-[40vw] md:w-[25vw]",
    initialScale: 0.9,
    finalScale: 1.3,
    fadeEnd: 0.7,
    yOffset: 120,
  },
];

// A re-usable component for a single animating drawing layer
function DrawingLayer({ drawing, scrollYProgress }) {
  const { src, alt, className, initialScale, finalScale, fadeEnd, yOffset } =
    drawing;

  // Create unique animations for this specific drawing based on its config
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [initialScale, finalScale],
  );
  // Fade from a starting opacity down to 0 at the specified fadeEnd point
  const opacity = useTransform(scrollYProgress, [0, fadeEnd], [0.4, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, yOffset]);

  return (
    <motion.div
      style={{ scale, opacity, y }}
      className={`absolute pointer-events-none ${className} flex items-center justify-center`}
    >
      {/* The radial gradient mask */}
      <div
        className="w-full h-full"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
        }}
      >
        {/* The image with blend mode and grayscale filter */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto mix-blend-multiply grayscale opacity-70"
        />
      </div>
    </motion.div>
  );
}

export function CadBackground() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center bg-[#f8f9fa] overflow-hidden font-sans -z-10">
      {/* Map through the configuration array and create a layer for each drawing */}
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

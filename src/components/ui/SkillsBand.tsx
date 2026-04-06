import { motion, useReducedMotion } from "framer-motion";
import { skillsTickerData } from "../../data/portfolioData";

export const SkillsBand = () => {
  const shouldReduceMotion = useReducedMotion();

  // Tripling the list for seamless loop
  const skills = [
    ...skillsTickerData,
    ...skillsTickerData,
    ...skillsTickerData,
  ];

  return (
    <div
      className="skills-band py-8 overflow-hidden border-y border-secondary/10 bg-black text-white"
    >
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex gap-16 w-max items-center"
          animate={shouldReduceMotion ? {} : { x: ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
        >
          {skills.map((skill, index) => (
            <span
              key={index}
              className="text-2xl md:text-3xl font-heading font-bold opacity-50 whitespace-nowrap tracking-wide"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

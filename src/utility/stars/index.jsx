import { motion } from "framer-motion";
import { useMemo } from "react";

const GalaxyStars = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 150 }, (_, i) => ({
        id: i,
        // Spread stars across a wider area to support the slow drift
        top: `${Math.random() * 140 - 20}%`,
        left: `${Math.random() * 140 - 20}%`,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2, // For individual twinkling
        opacity: Math.random() * 0.7 + 0.3,
      })),
    [],
  );
  return (
    <motion.div
      className="relative w-full h-full"
      animate={{
        x: [-20, 20, -20], // Slow horizontal pan
        y: [-10, 10, -10], // Slow vertical drift
      }}
      transition={{
        duration: 30, // Very slow cinematic movement
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.4)`,
          }}
          animate={{
            opacity: [star.opacity, 0.1, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default GalaxyStars;
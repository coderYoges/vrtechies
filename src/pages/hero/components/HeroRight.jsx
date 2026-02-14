import { motion, AnimatePresence } from "framer-motion";
import BannerComponent from "../../../assets/banner";

export const HeroRight = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -15, 0],
        }}
        transition={{
          opacity: { duration: 0.8 },
          x: { duration: 0.8 },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative w-full flex justify-center lg:justify-end"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            backgroundColor: "var(--color-primary)",
          }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[120px] -z-10"
        />

        <BannerComponent />
      </motion.div>
    </AnimatePresence>
  );
};

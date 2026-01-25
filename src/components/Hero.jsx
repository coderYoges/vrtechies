import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import Brain from "../hooks/BrainModal";
import { useTheme } from "../hooks/ThemeContext";
import { GLOBAL_THEMES } from "../config/constants";

const Hero = () => {
  const { theme, isDark, colorIndex } = useTheme();
  const activeColor = isDark ? theme?.dark.primary : theme?.light.primary;
  const { title, description, ctaTitle } = GLOBAL_THEMES[colorIndex] || {};

  return (
    <section className="relative flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-white dark:bg-slate-900">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 35 }}>
          <ambientLight intensity={1.5} />
          <Suspense fallback={null}>
            <Brain color={activeColor} />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          key={colorIndex} // optional, if you want color-based re-animation
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }} // triggers when in viewport
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.5 }} // animate every time it enters, when 50% visible
          className="flex flex-col items-center gap-6"
        >
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {(title || "").toUpperCase()}
          </h1>

          <button
            style={{ backgroundColor: activeColor }}
            aria-label={ctaTitle || "Get Started"}
            className="rounded-full px-8 py-3 text-xs font-black uppercase tracking-widest text-white shadow-2xl transition hover:brightness-110 active:scale-95 sm:px-12 sm:py-4 sm:text-sm md:text-base"
          >
            {ctaTitle || "Get Started"}
          </button>
        </motion.div>
      </div>

      {/* Color Glow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }} // animate when it enters viewport
        transition={{ delay: 0.4, duration: 0.5 }}
        viewport={{ once: false, amount: 0.5 }} // triggers every time
        className="absolute inset-x-0 bottom-16 z-10 px-4 text-center"
      >
        <p className="mx-auto max-w-2xl text-center text-base sm:text-lg md:text-xl font-medium leading-relaxed text-slate-700 dark:text-slate-300">
          {description}
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;

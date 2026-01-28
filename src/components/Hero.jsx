import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import Brain from "../hooks/BrainModal";
import { useTheme } from "../hooks/ThemeContext";
import { GLOBAL_THEMES, COLORS } from "../config/constants";

const Hero = () => {
  const { theme, isDark, colorIndex } = useTheme();
  const activeColor = isDark ? theme?.dark.primary : theme?.light.primary;
  const { title, description, ctaTitle } = GLOBAL_THEMES[colorIndex] || {};

  return (
    <section
      className={`relative flex h-[100dvh] w-screen items-center justify-center overflow-hidden  ${isDark ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}
    >
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
          key={colorIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <h1
            className="font-['Roboto'] text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              color: isDark ? COLORS.DARK_PRIMARY : COLORS.LIGHT_PRIMARY,
            }}
          >
            {title}
          </h1>
          <button
            style={{
              backgroundColor: `${activeColor}15`,
              borderColor: activeColor,
              outline: "none",
            }}
            aria-label={ctaTitle || "Get Started"}
            className="group relative overflow-hidden rounded-full border-[1.5px] px-8 py-3 text-xs font-['Roboto'] uppercase tracking-widest shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md hover:backdrop-blur-xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-95 sm:px-12 sm:py-4 sm:text-sm md:text-base"
          >
            {/* Darker sheen effect for white backgrounds */}
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full transition-transform duration-100 group-hover:translate-x-full" />
            <span className="relative z-10">{ctaTitle || "Get Started"}</span>
          </button>
        </motion.div>
      </div>

      {/* Color Glow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        viewport={{ once: false, amount: 0.5 }}
        className="absolute inset-x-0 bottom-16 z-10 px-4 text-center"
      >
        <p
          style={{
            color: isDark ? COLORS.DARK_PRIMARY : COLORS.LIGHT_PRIMARY,
          }}
          className="mx-auto max-w-2xl text-center text-base sm:text-lg md:text-xl font-medium leading-relaxed"
        >
          {description}
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;

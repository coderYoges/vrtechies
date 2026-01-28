import { motion } from "framer-motion";
import { useTheme } from "../hooks/ThemeContext";
import { COLORS } from "../config/constants";

const AboutUs = () => {
  const { theme, isDark } = useTheme();
  const activeColor = isDark ? theme?.dark.primary : theme?.light.primary;

  return (
    <>
      <section
        className={`
        relative w-full flex items-center justify-center px-6 py-12
        transition-colors duration-500
        ${isDark ? "bg-slate-900" : "bg-slate-50"}
      `}
        style={{ color: isDark ? COLORS.DARK_PRIMARY : COLORS.LIGHT_PRIMARY }}
        id="about"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-2">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              About <span style={{ color: activeColor }}>Us</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl">
              We build human-centered digital experiences where design,
              technology, and intelligence meet. Our work blends creativity with
              precision, crafting products that feel as good as they perform.
            </p>

            <p className="mt-4 text-sm sm:text-base leading-relaxed max-w-xl">
              From immersive 3D interfaces to scalable web platforms, we believe
              great software should be intuitive, expressive, and quietly
              powerful.
            </p>
          </motion.div>

          {/* Visual / Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative grid grid-cols-2 gap-6"
          >
            {[
              { label: "Projects", value: "120+" },
              { label: "Clients", value: "60+" },
              { label: "Years Experience", value: "8+" },
              { label: "Technologies", value: "20+" },
            ].map((item) => (
              <motion.div
                key={item.label}
                className={`
        rounded-2xl p-6 shadow-lg border backdrop-blur-xl
        transition-colors duration-500
        ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200/50"}
      `}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
                  rotate: 1, // subtle tilt
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <p
                  className="text-3xl font-black"
                  style={{ color: activeColor }}
                >
                  {item.value}
                </p>
                <p className="mt-1 text-sm font-medium">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Soft Color Accent */}
        <div
          className="absolute bottom-0 right-0 w-64 h-64 blur-[120px] opacity-30 pointer-events-none"
          style={{ backgroundColor: activeColor }}
        />
      </section>
    </>
  );
};

export default AboutUs;

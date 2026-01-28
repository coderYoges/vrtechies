import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/ThemeContext";
import { COLORS } from "../config/constants";

const PROJECT_DATA = [
  {
    id: 0,
    title: "CORE WEB",
    category: "Scalable Ecosystems",
    image: "https://images.unsplash.com",
  },
  {
    id: 1,
    title: "NATIVE GO",
    category: "Mobile Architecture",
    image: "https://images.unsplash.com",
  },
  {
    id: 2,
    title: "NEURAL LOGIC",
    category: "AI & Machine Learning",
    image: "https://images.unsplash.com",
  },
  {
    id: 3,
    title: "CLOUD SYNC",
    category: "Infrastructure & DevOps",
    image: "https://images.unsplash.com",
  },
  {
    id: 4,
    title: "OMNI INTERFACE",
    category: "UX / UI Engineering",
    image: "https://images.unsplash.com",
  },
];

const ProjectTiles = () => {
  const { colorIndex, isDark } = useTheme();

  return (
    <section
      className={`relative w-full py-12 px-6 overflow-hidden transition-colors duration-1000  ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end pb-8 md:pb-12 px-2">
          <motion.h2
            key={colorIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tighter"
            style={{
              color: isDark ? COLORS.DARK_PRIMARY : COLORS.LIGHT_PRIMARY,
            }}
          >
            Project{" "}
            <span
              style={{ color: "var(--color-primary)" }}
              className="transition-colors duration-500"
            >
              Sync
            </span>
          </motion.h2>
        </div>

        {/* --- GRID SYSTEM --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECT_DATA.map((project, i) => {
            const isActive = colorIndex === i;
            return (
              <motion.div
                key={project.id}
                className={`relative h-[500px] rounded-[2.5rem] overflow-hidden border-2 cursor-pointer transition-all duration-700 
                  ${isActive ? "z-20 scale-105 shadow-2xl active-glow" : "z-10 opacity-30 grayscale scale-95"}`}
                style={{
                  borderColor: isActive
                    ? "var(--color-primary)"
                    : "rgba(148, 163, 184, 0.1)",
                }}
              >
                <img
                  src={project.image}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90" />

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      initial={{ x: 60, y: -60 }}
                      animate={{ x: 0, y: 0 }}
                      exit={{ x: 60, y: -60 }}
                      className="absolute top-0 right-0 w-24 h-24 z-30"
                      style={{
                        backgroundColor: "var(--dynamic-color)",
                        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                      }}
                    />
                  )}
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-2 h-2 rounded-full ${isActive ? "animate-ping" : ""}`}
                      style={{
                        backgroundColor: isActive
                          ? "var(--dynamic-color)"
                          : "#94a3b8",
                      }}
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                      {isActive ? "Processing" : "Locked"}
                    </span>
                  </div>

                  <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8">
                    {project.title}
                  </h3>

                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key={`progress-${colorIndex}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                          className="h-full"
                          style={{ backgroundColor: "var(--dynamic-color)" }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectTiles;

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hrmsWeb from "../assets/hrmDashboard.png";
import attandanceApp from "../assets/attendanceApp.png";
import protfoloioSite from "../assets/protfolioSite.png";
import grocerySite from "../assets/grocerySite.png";
import bookingSite from "../assets/bookingSite.png";
import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useTheme } from "../hooks/ThemeContext";
import { COLORS } from "../config/constants";

const PROJECT_DATA = [
  {
    id: 0,
    title: "HRMS Admin Panel",
    category: "",
    image: hrmsWeb,
  },
  {
    id: 1,
    title: "Portfolio Website",
    category: "",
    image: protfoloioSite,
  },
  {
    id: 2,
    title: "Grocery Sites",
    category: "",
    image: grocerySite,
  },
  {
    id: 3,
    title: "Booking web applications",
    category: "",
    image: bookingSite,
  },
  {
    id: 4,
    title: "Attendance Tracker App",
    category: "",
    image: attandanceApp,
  },
];

const ProjectTiles = () => {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const { colorIndex, isDark, theme } = useTheme();
  const activeColor = isDark ? theme?.dark.primary : theme?.light.primary;
  return (
    <section
      className={`relative h--100 w-full px-6 py-12 overflow-hidden ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
      id="work"
    >
      <div className="max-w-7xl mx-auto z-10 overflow-hidden">
        <div className="flex justify-between items-end pb-8 md:pb-12">
          <motion.h2
            key={colorIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow]}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          autoplay={{ delay: 5000 }}
          className="relative w-full py-10"
        >
          {PROJECT_DATA.map((project, i) => (
            <SwiperSlide key={project.id} className="w-[75%] md:w-[450px]">
              <motion.div className="relative h-[550px] rounded-[2.5rem] overflow-hidden">
                <img
                  src={project.image}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                  <h3 className="text-4xl font-black text-white italic">
                    {project.title}
                  </h3>
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 5 }}
                      className="h-full bg-[var(--color-primary)]"
                    />
                  </div>

                  {/* Zoom Button - Only shows when slide is active */}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="pt-2"
                  >
                    <button
                      className="text-white/80 text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{
                        margin: 0,
                        padding: 0,
                        backgroundColor: "transparent",
                      }}
                      onClick={() => setSelectedProject(i)}
                    >
                      Click here to zoom
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}

          {/* NAVIGATION CONTAINER */}
          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 pointer-events-none z-50">
            {/* PREVIOUS BUTTON */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="prev-btn pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 text-white transition-colors duration-500 hover:border-[var(--dynamic-color)]"
              style={{ boxShadow: `0 0 20px ${activeColor}33` }}
            >
              <ChevronLeft color={activeColor} size={40} strokeWidth={1.5} />
            </motion.button>

            {/* NEXT BUTTON */}
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="next-btn pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 text-white transition-colors duration-500 hover:border-[var(--dynamic-color)]"
              style={{ boxShadow: `0 0 20px ${activeColor}33` }}
            >
              <ChevronRight color={activeColor} size={40} strokeWidth={1.5} />
            </motion.button>
          </div>
        </Swiper>

        {selectedProject !== null && PROJECT_DATA[selectedProject].title && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out opacity-100"
            onClick={() => setSelectedProject(null)} // Close when clicking background
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-50 text-white text-4xl font-extralight hover:text-gray-300 transition duration-150"
              onClick={() => setSelectedProject(null)}
              style={{ color: "var(--color-primary)" }}
            >
              &times;
            </button>

            {/* Expanded Image */}
            <div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl transform scale-95 opacity-0 transition-all duration-300 ease-out motion-safe:scale-100 motion-safe:opacity-100"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
            >
              <img
                src={PROJECT_DATA[selectedProject].image}
                className="w-full max-h-full object-contain mx-auto"
                alt={PROJECT_DATA[selectedProject].title}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectTiles;

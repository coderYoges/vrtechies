import BannerComponent from "../../assets/banner";
import GalaxyStars from "../../utility/stars";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { HERO_CONSTANTS } from "../../config";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SwiperTiles from "./components/SwiperTiles";

// Import CSS - Ensure these are at the top of your file
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full min-h-screen bg-[#0f172a] flex overflow-hidden pt-20 ">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <GalaxyStars />
        {/* Optional: Dark gradient overlay to fade stars near the text area */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent_0%,#0f172a_100%)] opacity-60" />
      </div>
      {/* Add inside the relative container */}
      <div className="absolute top-1/3 left-[45%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-[40%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Main Container: Stack on mobile, side-by-side on desktop */}

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 h-full items-center pt-10 lg:pt-0 gap-0 lg:gap-8">
        {/* LEFT SIDE: Content - Centered by default, left-aligned on lg */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full px-6 md:px-12 lg:pl-16 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="w-full"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {HERO_CONSTANTS.map((item, index) => (
              <SwiperSlide key={index}>
                {/* Slide Content Alignment */}
                <div className="flex flex-col items-center lg:items-start py-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic text-white leading-tight tracking-tight">
                    {item.headline1} <br />
                    <span className="text-[var(--color-primary)]">
                      {item.headline2}
                    </span>
                  </h1>

                  <p className="text-slate-400 mt-4 md:mt-6 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg">
                    {item.description}
                  </p>

                  <div className="mt-8 md:mt-10">
                    <button className="px-8 py-3 md:px-10 md:py-4 bg-white text-[#0f172a] text-xs md:text-sm font-bold rounded-lg hover:bg-blue-50 transition-colors cursor-pointer shadow-lg">
                      {item.ctaButton}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {/* BOTTOM TILES COMPONENT */}
            <SwiperTiles activeIndex={activeIndex} items={HERO_CONSTANTS} />
          </Swiper>
        </motion.div>

        {/* RIGHT SIDE: Banner Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full flex items-center justify-center lg:justify-end pr-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex} // Triggers entry animation on slide change
              initial={{ opacity: 0, x: 30 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -15, 0], // The Bobbing sequence
              }}
              transition={{
                // Slide-in transition
                opacity: { duration: 0.8 },
                x: { duration: 0.8 },
                // Infinite Bobbing transition
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative w-full flex justify-center lg:justify-end"
            >
              {/* Visual Depth Glow (Optional) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  backgroundColor: "var(--color-primary)",
                }}
                transition={{ duration: 1.5 }} // Smooth color cross-fade
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[120px] -z-10"
              />

              <BannerComponent />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

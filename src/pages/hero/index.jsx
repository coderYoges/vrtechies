import GalaxyStars from "../../utility/stars";
import { useState } from "react";
import { motion } from "framer-motion";
import { SwiperTiles } from "./components/SwiperTiles";
import { HeroSwipper } from "./components/HeroSwiper";
import { HeroTrust } from "./components/HeroTrust";
import { HeroRight } from "./components/HeroRight";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const setSwiperIndex = (swiper) => setActiveIndex(swiper.realIndex);

  return (
    <section className="relative w-full min-h-screen bg-[#0f172a] flex overflow-hidden pt-20 ">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <GalaxyStars />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent_0%,#0f172a_100%)] opacity-60" />
      </div>
      <div className="absolute top-1/3 left-[45%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-[40%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 h-full items-center pt-10 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full px-6 md:px-12 lg:pl-16 flex flex-col items-center text-center"
        >
          <HeroSwipper setSwiperIndex={setSwiperIndex}>
            <SwiperTiles activeIndex={activeIndex} />
          </HeroSwipper>
          <HeroTrust />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full flex items-center justify-center lg:justify-end pr-4"
        >
          <HeroRight />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

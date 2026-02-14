import React from "react";
import { HERO_CONSTANTS } from "../../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

export const HeroSwipper = ({ setSwiperIndex, children }) => {
  return (
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
      onSlideChange={setSwiperIndex}
    >
      {HERO_CONSTANTS.map((item, index) => (
        <SwiperSlide key={"hero-section-" + index}>
          <div className="flex flex-col items-center py-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic text-white leading-tight tracking-tight">
              {item.headline1} <br />
              <span className="text-[var(--color-primary)]">
                {item.headline2}
              </span>
            </h1>

            <p className="text-slate-400 mt-4 md:mt-6 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg">
              {item.description}
            </p>
          </div>
        </SwiperSlide>
      ))}
      {children}
    </Swiper>
  );
};

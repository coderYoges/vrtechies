import { useSwiper } from "swiper/react";

const SwiperTiles = ({ activeIndex, items }) => {
  const swiper = useSwiper();

  return (
    <div className="flex gap-4 my-6 lg:my-12 w-full select-none">
      {items.map((_, index) => (
        <button
          key={index}
          onClick={() => swiper.slideToLoop(index)}
          className="group flex-1 flex flex-col gap-3 transition-all cursor-pointer text-left outline-none"
        >
          {/* Tile Header: Number + Label */}
          <div
            className={`text-center gap-2 text-[10px] font-bold transition-colors duration-300 ${activeIndex === index ? "text-[var(--color-primary)]" : "text-slate-600"}`}
          >
            {index + 1}.0
          </div>

          {/* Progress Bar Track */}
          <div className="relative h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
            {activeIndex === index && (
              <div
                className="absolute inset-0 bg-[var(--color-primary)] origin-left animate-progress-fill"
                style={{ animationDuration: "5000ms" }} // Matches Swiper autoplay delay
              />
            )}
            {/* Hover Indicator */}
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default SwiperTiles;
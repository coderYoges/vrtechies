import { HeroTrust1, HeroTrust2, HeroTrust3 } from "../../../assets/svgs";
import { HERO_SUB_TITLE } from "../../../config";

const HERO_TRUST_CONSTANTS = [
  {
    title: "Velocity & Vigor",
    component: HeroTrust1,
  },
  {
    title: "Elastic Growth",
    component: HeroTrust2,
  },
  {
    title: "Unified Synergy",
    component: HeroTrust3,
  },
];

export const HeroTrust = () => {
  return (
    <div className="relative w-full py-4 lg:py-8 overflow-hidden select-none">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-400 text-[11px] md:text-[13px] font-medium uppercase tracking-[0.15em] mb-10">
          {HERO_SUB_TITLE}
        </p>
        <div className="grid grid-cols-3 gap-6 items-center justify-items-center">
          {HERO_TRUST_CONSTANTS.map((item, index) => (
            <div
              key={"hero-section-trust-" + index}
              className="flex flex-col items-center gap-3 group text-center cursor-pointer"
            >
              <item.component />
              <span className="text-slate-400 text-[10px] sm:text-xs font-medium tracking-wide group-hover:text-white transition-colors">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

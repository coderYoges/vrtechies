import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import { COLORS, COMPANY_NAME, WELCOME_MSG } from "../../config";

const LoadingScreen = ({ isRevealing }) => {
  return (
    <div className="fixed inset-0 z-100 overflow-hidden pointer-events-none">
      {/* Background Transition Panels */}
      <div
        className={`fixed inset-0 bg-[${COLORS.LOADING_BG_PANEL}] transition-all duration-1000 ease-in-out ${isRevealing ? "[clip-path:polygon(0_0,_0_0,_0_0)]" : "[clip-path:polygon(0_0,_100%_0,_0_100%)]"}`}
      />
      <div
        className={`fixed inset-0 bg-[${COLORS.LOADING_BG_PANEL}] transition-all duration-1000 ease-in-out ${isRevealing ? "[clip-path:polygon(100%_100%,_100%_100%,_100%_100%)]" : "[clip-path:polygon(100%_0,_100%_100%,_0_100%)]"}`}
      />

      {/* Diagonal Loading Line - Original Amber */}
      <div
        className={`fixed top-0 left-0 w-full h-0.5 bg-amber-400 transform origin-left-right transition-all duration-1000 ease-in-out ${isRevealing ? "scale-x-0 opacity-0" : "scale-x-1 opacity-100"}`}
        style={{
          transform: isRevealing ? "scaleX(0)" : "scaleX(1)",
          transformOrigin: "top left",
          width: "150vw",
          top: "50vh",
          left: "-25vw",
          rotate: "-45deg",
        }}
      />

      {!isRevealing && (
        <div
          className={`fixed inset-0 z-120 flex flex-col items-center justify-center bg-[${COLORS.LOADING_BG_PANEL}] px-4 text-center select-none`}
        >
          {/* Metallic Gold Infinity Spinner */}
          <div className="mb-4 opacity-90">
            <InfinitySpin width="200" color={COLORS.LOADING_GOLD_VIA} />
          </div>

          <div className="mb-2 md:mb-6">
            {/* High-Contrast Gold Company Name - Static */}
            <h1
              className={`bg-gradient-to-b from-[${COLORS.LOADING_GOLD_FROM}] via-[${COLORS.LOADING_GOLD_VIA}] to-[${COLORS.LOADING_GOLD_TO}] 
                         bg-clip-text text-transparent font-serif italic font-bold 
                         tracking-[0.4em] sm:tracking-[0.6em] uppercase 
                         text-2xl sm:text-4xl md:text-6xl lg:text-7xl`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {COMPANY_NAME.FULLNAME}
            </h1>

            {/* Template Amber Underline */}
            <div className="mx-auto mt-2 h-px w-full max-w-[200px] md:max-w-md bg-gradient-to-r from-transparent via-amber-200/60 to-transparent origin-center animate-[expand-line_2.5s_ease-in-out_forwards]" />
          </div>

          {/* Template Slate Bottom Text - Static */}
          <div className="flex flex-col items-center px-2">
            <p
              className="text-slate-300 font-serif italic tracking-wider sm:tracking-[0.15em] text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {WELCOME_MSG.FIRST_LINE} <br className="sm:hidden" />{" "}
              {WELCOME_MSG.SECOND_LINE}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;

import * as React from "react";
import { useTheme } from "../hooks/ThemeContext";
import { GLOBAL_THEMES, COLORS } from "../config/constants";

const SVGComponent = () => {
  const { isDark, colorIndex = 0 } = useTheme();

  const mainColor = isDark
    ? GLOBAL_THEMES[colorIndex].dark.primary
    : GLOBAL_THEMES[colorIndex].light.primary;
  const secondaryColor = isDark ? COLORS.DARK_PRIMARY : COLORS.LIGHT_PRIMARY;

  return (
    <div
      style={{
        width: "clamp(32px, 6vw, 60px)",
        aspectRatio: "1/1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 3 3"
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
          cursor: "pointer",
        }}
        xmlns="http://www.w3.org"
      >
        <style>
          {`
            @keyframes jump {
              /* When at ground level */
              0%, 100% { 
                transform: translateY(0); 
                filter: drop-shadow(0 0.05px 0.02px rgba(0, 0, 0, 0.4)); /* Small shadow */
              }
              /* When at peak height */
              50% { 
                transform: translateY(-0.3px); 
                filter: drop-shadow(0 0.15px 0.1px rgba(0, 0, 0, 0.6)); /* Larger, blurrier shadow */
              }
            }
            .svg-wrapper {
              transform-origin: center;
              animation: jump 0.8s ease-in-out infinite;
              will-change: transform, filter; /* Add filter to will-change */
            }
            .cls-1 { fill: ${mainColor}; transition: fill 0.3s ease; }
            .cls-2 { fill: ${secondaryColor}; transition: fill 0.3s ease; }
            .cls-1, .cls-2 { fill-rule: evenodd; }
          `}
        </style>
        <g className="svg-wrapper">
          <path
            className="cls-1"
            d="M2.08 1.891L2.172 1.735L2.614 1.735L2.75 1.5L2.478 1.031L2.094 1.031L1.961 0.799L1.813 0.799L1.813 0.641L2.055 0.641L2.188 0.875L2.386 0.875L2.112 0.406L1.579 0.406L1.579 1.031L1.795 1.031L1.886 1.188L1.579 1.188L1.579 1.5L1.861 1.5L1.992 1.266L2.344 1.266L2.434 1.423L2.084 1.423L1.952 1.656L1.579 1.656L1.579 2.204L2.004 2.204L1.914 2.36L1.579 2.36L1.579 2.594L2.112 2.594L2.522 1.891L2.261 1.891L2.17 2.047L1.813 2.047L1.813 1.891L2.08 1.891Z"
          />
          <path
            className="cls-2"
            d="M0.92 1.891L0.828 1.735L0.386 1.735L0.25 1.5L0.522 1.031L0.906 1.031L1.039 0.799L1.188 0.799L1.188 0.641L0.945 0.641L0.813 0.875L0.614 0.875L0.887 0.406L1.423 0.406L1.423 1.031L1.205 1.031L1.114 1.188L1.423 1.188L1.423 1.5L1.139 1.5L1.008 1.266L0.656 1.266L0.566 1.423L0.916 1.423L1.048 1.656L1.423 1.656L1.423 2.204L0.996 2.204L1.086 2.36L1.423 2.36L1.423 2.594L0.887 2.594L0.477 1.891L0.739 1.891L0.83 2.047L1.188 2.047L1.188 1.891L0.92 1.891Z"
          />
        </g>
      </svg>
    </div>
  );
};

export default SVGComponent;

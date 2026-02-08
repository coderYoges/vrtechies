import { motion } from "framer-motion";

const AnimatedLogo = ({ 
  mainColor = "var(--color-primary)", 
  secondaryColor = "#94a3b8" 
}) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.1 }}
      className="w-[clamp(28px,4vw,42px)] aspect-square flex items-center justify-center"
    >
      <svg 
        viewBox="0 0 3 3" 
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org"
      >
        <g className="animate-jump origin-center will-change-[transform,filter]">
          <path 
            fill={mainColor} 
            className="transition-colors duration-300"
            d="M2.08 1.891L2.172 1.735L2.614 1.735L2.75 1.5L2.478 1.031L2.094 1.031L1.961 0.799L1.813 0.799L1.813 0.641L2.055 0.641L2.188 0.875L2.386 0.875L2.112 0.406L1.579 0.406L1.579 1.031L1.795 1.031L1.886 1.188L1.579 1.188L1.579 1.5L1.861 1.5L1.992 1.266L2.344 1.266L2.434 1.423L2.084 1.423L1.952 1.656L1.579 1.656L1.579 2.204L2.004 2.204L1.914 2.36L1.579 2.36L1.579 2.594L2.112 2.594L2.522 1.891L2.261 1.891L2.17 2.047L1.813 2.047L1.813 1.891L2.08 1.891Z" 
          />
          <path 
            fill={secondaryColor} 
            className="transition-colors duration-300"
            d="M0.92 1.891L0.828 1.735L0.386 1.735L0.25 1.5L0.522 1.031L0.906 1.031L1.039 0.799L1.188 0.799L1.188 0.641L0.945 0.641L0.813 0.875L0.614 0.875L0.887 0.406L1.423 0.406L1.423 1.031L1.205 1.031L1.114 1.188L1.423 1.188L1.423 1.5L1.139 1.5L1.008 1.266L0.656 1.266L0.566 1.423L0.916 1.423L1.048 1.656L1.423 1.656L1.423 2.204L0.996 2.204L1.086 2.36L1.423 2.36L1.423 2.594L0.887 2.594L0.477 1.891L0.739 1.891L0.83 2.047L1.188 2.047L1.188 1.891L0.92 1.891Z" 
          />
        </g>
      </svg>
    </motion.div>
  );
};

export default AnimatedLogo;
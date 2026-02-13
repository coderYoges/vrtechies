import { motion } from "framer-motion";
import GalaxyStars from "../../utility/stars";

// --- Realistic UFO Component ---
const RealisticUFO = () => (
  <div className="relative group filter drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
    <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
      {/* Glass Dome with Reflection */}
      <ellipse cx="50" cy="22" rx="20" ry="12" fill="url(#domeGrad)" />
      <path
        d="M40 18Q50 12 60 18"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Metallic Body */}
      <path
        d="M10 30Q10 25 50 25Q90 25 90 30L85 40Q85 45 50 45Q15 45 15 40Z"
        fill="url(#metalGrad)"
      />

      {/* Rotating Induction Lights */}
      {[25, 38, 50, 62, 75].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy="35"
          r="1.5"
          animate={{
            fill: ["#0ea5e9", "#7dd3fc", "#0ea5e9"],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <defs>
        <radialGradient id="domeGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
        </radialGradient>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// --- Realistic Rocket Component with Unique IDs ---
const RealisticRocket = () => (
  <div className="relative rotate-[-45deg] filter drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
    <svg
      width="60"
      height="120"
      viewBox="0 0 40 100"
      xmlns="http://www.w3.org"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* UNIQUE ID: Prevents clashing with UFO gradients */}
        <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* Pulsing Engine Flame */}
      <motion.path
        d="M12 75Q20 95 28 75L20 85Z"
        animate={{
          fill: ["#f59e0b", "#ef4444", "#f59e0b"],
          scaleY: [1, 1.4, 1],
        }}
        transition={{ duration: 0.15, repeat: Infinity }}
      />

      {/* Rocket Body */}
      <path d="M20 5Q35 40 32 75H8Q5 40 20 5Z" fill="url(#rocketBodyGrad)" />

      {/* Fins & Details */}
      <path d="M8 60L2 75H8V60Z" fill="#ef4444" />
      <path d="M32 60L38 75H32V60Z" fill="#ef4444" />
      <circle
        cx="20"
        cy="35"
        r="4"
        fill="#0f172a"
        stroke="#ffffff"
        strokeWidth="0.5"
      />
    </svg>
  </div>
);

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const message = error.message || "Something went wrong";

  // Reusable drifting animation wrapper
  const SpaceDrifter = ({
    children,
    x,
    y,
    duration,
    delay = 0,
    className = "",
  }) => (
    <motion.div
      initial={{ x: x[0], y: y[0], opacity: 0 }}
      animate={{
        x,
        y,
        opacity: [0, 1, 1, 0], // Smooth fade-in and fade-out
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.1, 0.9, 1],
      }}
      className={`absolute pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-[#0f172a] text-white overflow-hidden select-none">
      {/* 1. LAYER: DEEP BACKGROUND (Saturn) */}
      <SpaceDrifter
        x={["-30vw", "120vw"]}
        y={["15vh", "25vh"]}
        duration={80} // Extremely slow for parallax depth
        className="z-0 opacity-40 blur-[1px]"
      >
        <div className="relative w-48 h-48 bg-gradient-to-br from-yellow-900 to-black rounded-full shadow-[0_0_60px_rgba(251,191,36,0.1)]">
          <div className="absolute top-1/2 left-[-50%] w-[200%] h-2 bg-yellow-600/20 rotate-[25deg] rounded-full blur-[1px]" />
        </div>
      </SpaceDrifter>

      {/* 2. LAYER: MID-GROUND (Ships Sync) */}
      <div className="absolute inset-0 z-10">
        {/* UFO: Moving Right */}
        <SpaceDrifter
          x={["-20vw", "110vw"]}
          y={["30vh", "40vh", "30vh"]}
          duration={24}
        >
          <motion.div
            animate={{ rotate: [5, 15, 5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <RealisticUFO />
          </motion.div>
        </SpaceDrifter>

        {/* Rocket: Moving Left (Synced to meet UFO in the center) */}
        <SpaceDrifter
          x={["110vw", "-20vw"]}
          y={["40vh", "30vh", "40vh"]}
          duration={24}
          delay={0}
        >
          <motion.div
            style={{ rotate: -45 }} // Pointing top-left
            animate={{ y: [0, -10, 0] }} // Gentle bobbing
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <RealisticRocket />
          </motion.div>
        </SpaceDrifter>
      </div>

      {/* 3. LAYER: FOREGROUND (Asteroid) */}
      <SpaceDrifter
        x={["-10vw", "110vw"]}
        y={["75vh", "85vh"]}
        duration={12}
        delay={5}
        className="z-40"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-8 h-6 bg-neutral-700 rounded-sm shadow-2xl"
        />
      </SpaceDrifter>

      {/* 4. Warp Starfield */}
      <GalaxyStars />

      {/* 5. Floating Independent 404 */}
      <motion.div
        animate={{
          y: [0, -30, 0, 30, 0],
          x: [0, 15, 0, -15, 0],
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center z-0"
      >
        <motion.h1
          animate={{
            scale: 1,
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ opacity: { duration: 4, repeat: Infinity } }}
          className="text-[35vw] font-black text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
        >
          404
        </motion.h1>
      </motion.div>

      {/* Central Content - Focused on Clarity */}
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-50 text-center px-6 flex flex-col items-center"
      >
        {/* The Visual Hook */}
        <h2 className="text-6xl md:text-8xl font-black mb-2 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 uppercase">
          Lost in void
        </h2>

        {/* The "Easy to Understand" Part */}
        <p className="text-cyan-400 font-mono text-sm md:text-base tracking-[0.2em] mb-2 uppercase">
          {message}
        </p>

        <p className="text-neutral-500 max-w-xs mb-10 text-xs md:text-sm leading-relaxed">
          The coordinates you entered don't exist. Our deep-space sensors
          suggest heading back to the main station.
        </p>

        {/* Clear Call to Action (CTA) */}

        <button
          onClick={() => (window.location.href = "/")}
          className="px-10 py-4 bg-white text-black font-black text-xs tracking-widest uppercase rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
        >
          Return to Earth
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorFallback;

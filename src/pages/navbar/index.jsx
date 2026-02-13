import { motion, useScroll, useSpring } from "framer-motion";
import StackedBranding from "./components/StackedBranding";
import DesktopCmpt from "./components/Desktop";
import MobileCmpt from "./components/Mobile";

const NavbarCmpt = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b border-gray-800 bg-slate-900/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex justify-between items-center">
        <StackedBranding />
        <DesktopCmpt />
        <MobileCmpt />
      </div>

      {/* Progress Bar moved below the content to avoid overlap */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] origin-left"
        style={{ scaleX, backgroundColor: "var(--color-primary)" }}
      />
    </motion.nav>
  );
};

export default NavbarCmpt;

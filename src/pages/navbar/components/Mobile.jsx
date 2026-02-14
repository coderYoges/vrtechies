import { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS, CTA_TEXT, NAV_CONSTANTS } from "../../../config";
import { Menu, X } from "lucide-react";

const MobileCmpt = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);
  const closeMenu = () => setIsOpen(false);
  const stopPropagation = (e) => e.stopPropagation();
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <Fragment>
      <div className="md:hidden flex items-center gap-3 select-none">
        <button
          onClick={toggleMenu}
          className="z-50 p-2 transition-transform active:scale-90 text-[var(--color-primary)] bg-transparent"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 backdrop-blur-sm md:hidden bg-slate-900/80 backdrop-blur-xl"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: -50, opacity: 0 }} // Animate from left
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5 }} // Slower animation
              onClick={stopPropagation}
              viewport={{ once: false }}
              className="absolute top-20 w-full rounded-2xl p-6 bg-[#0f172a]"
            >
              <div className="flex flex-col space-y-3">
                {NAV_CONSTANTS.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    style={{
                      color: "var(--color-primary)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)", // Base panel color
                      boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.05)", // Subtle initial border
                    }}
                    className="block px-6 py-4 text-base font-semibold rounded-2xl select-none transition-shadow duration-300"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    whileHover={{
                      boxShadow: `
        0 0 5px rgba(255, 255, 255, 0.5),   // Inner white glow
        0 0 15px var(--color-primary),      // Primary color main glow
        0 0 30px var(--color-primary)       // Wide primary color bloom
      `,
                      scale: 1.05,
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.button
                onClick={closeMenu}
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: COLORS.NAVBAR_TEXT_PRIMARY,
                }}
                className="mt-3 w-full py-4 rounded-2xl font-bold select-none transition-all shadow-lg"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 * NAV_CONSTANTS.length,
                  duration: 0.4,
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `
      0 0 10px rgba(255, 255, 255, 0.4), 
      0 0 25px var(--color-primary), 
      0 0 45px var(--color-primary)
    `,
                  filter: "brightness(1.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {CTA_TEXT}
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default MobileCmpt;

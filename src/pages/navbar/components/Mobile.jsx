import { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS, CTA_TEXT, NAV_CONSTANTS, COMPANY_NAME } from "../../../config";
import { Menu, X } from "lucide-react";

const MobileCmpt = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);
  const closeMenu = () => setIsOpen(false);

  return (
    <Fragment>
      <div className="md:hidden flex items-center gap-3 select-none">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="z-50 p-2 transition-transform active:scale-90"
          style={{
            color: "var(--color-primary)",
            backgroundColor: "transparent",
          }}
          aria-label="Toggle Menu"
        >
          {/* Smooth Icon Morphing could be added here */}
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
            style={{ backgroundColor: COLORS.NAVBAR_BG_PANEL }}
          >
            <motion.div
              initial={{ x: -50, opacity: 0 }} // Animate from left
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5 }} // Slower animation
              onClick={(e) => e.stopPropagation()}
              className="absolute top-10 w-full rounded-2xl p-6"
              style={{ backgroundColor: COLORS.NAVBAR_BG_PANEL }}
            >
              <div className="flex flex-col space-y-3 px-3 py-2">
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
                    // The NEON GLOW animation on hover
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
                // Added 'select-none' and 'relative' for better hit-area and text handling
                className="mt-3 w-full py-4 rounded-xl font-bold select-none transition-all shadow-lg"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 * NAV_CONSTANTS.length,
                  duration: 0.4,
                }}
                // THE NEON EFFECT
                whileHover={{
                  scale: 1.02,
                  boxShadow: `
      0 0 10px rgba(255, 255, 255, 0.4), 
      0 0 25px var(--color-primary), 
      0 0 45px var(--color-primary)
    `,
                  filter: "brightness(1.2)", // Makes the background color pop more
                }}
                whileTap={{ scale: 0.95 }}
              >
                {CTA_TEXT}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default MobileCmpt;

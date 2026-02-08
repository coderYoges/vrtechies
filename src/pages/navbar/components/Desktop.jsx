import { motion } from "framer-motion";
import { COLORS, CTA_TEXT, NAV_CONSTANTS } from "../../../config";
import { Fragment } from "react";

const DesktopCmpt = () => {
  return (
    <Fragment>
      {/* Centered Navigation */}
      <div className="items-center space-x-8 hidden md:flex">
        {NAV_CONSTANTS.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            // Staggered entry animation
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            style={{ color: COLORS.NAVBAR_TEXT_PRIMARY }}
            className="relative text-md font-semibold transition-colors select-none group"
          >
            {link.name}

            {/* Animated Underline */}
            <motion.span
              className="absolute left-0 -bottom-1 h-[2px] w-full"
              style={{ backgroundColor: "var(--color-primary)" }}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            {/* Subtle click feedback */}
            <motion.div
              className="absolute inset-0 rounded-lg -z-10"
              whileTap={{ scale: 0.95 }}
            />
          </motion.a>
        ))}
      </div>

      {/* CTA Button */}
      <button
        style={{
          backgroundColor: "var(--color-primary)",
          color: COLORS.NAVBAR_TEXT_PRIMARY,
        }}
        className="px-6 py-2 rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 select-none hidden md:flex"
      >
        {CTA_TEXT}
      </button>
    </Fragment>
  );
};

export default DesktopCmpt;

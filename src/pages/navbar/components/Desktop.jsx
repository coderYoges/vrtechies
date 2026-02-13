import { motion } from "framer-motion";
import { CTA_TEXT, NAV_CONSTANTS } from "../../../config";
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="relative text-md font-semibold transition-colors select-none group text-[#f8fafc] hover:text-[var(--color-primary)]"
          >
            {link.name}
          </motion.a>
        ))}
      </div>

      {/* CTA Button */}
      <button className="px-4 py-1.5 rounded-full font-semibold text-sm text-[#f8fafc] bg-[var(--color-primary)] shadow-md transition-transform hover:scale-105 active:scale-95 select-none hidden md:flex">
        {CTA_TEXT}
      </button>
    </Fragment>
  );
};

export default DesktopCmpt;

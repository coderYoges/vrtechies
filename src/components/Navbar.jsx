import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import LogoCmpt from "../assets/Logo.jsx";
import { useTheme } from "../hooks/ThemeContext";
import { COLORS } from "../config/constants.js";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { isDark, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b ${
          isDark ? "bg-black border-gray-800" : "bg-white border-gray-200"
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
          style={{ scaleX, backgroundColor: "var(--color-primary)" }}
        />

        <div className="max-w-7xl mx-auto px-6 h-22 flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-col items-center space-x-1 md:space-x-2 lg:space-x-3">
            <LogoCmpt
              activeColor="var(--color-primary)"
              size={
                window.innerWidth < 768
                  ? 40
                  : window.innerWidth < 1024
                    ? 50
                    : 60
              }
            />
            <div className="flex text-lg md:text-2xl lg:text-3xl font-bold tracking-tight leading-none">
              <span style={{ color: "var(--color-primary)" }}>VR</span>
              <span
                style={{
                  color: isDark ? COLORS.DARK_PRIMARY : COLORS.LIGHT_PRIMARY,
                }}
              >
                Techies
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{ color: "var(--color-primary)" }}
                className="text-md md:text-lg lg:text-xl font-semibold transition-colors hover:brightness-120 active:scale-80"
              >
                {link.name}
              </a>
            ))}

            <div
              className="h-6 w-[2px]"
              style={{
                backgroundColor: isDark
                  ? COLORS.DARK_PRIMARY
                  : COLORS.LIGHT_PRIMARY,
              }}
            />

            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              style={{ padding: 0, border: "none", outline: "none" }}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Moon
                  size={24}
                  className="bg-black"
                  style={{ color: "var(--color-primary)" }}
                />
              ) : (
                <Sun
                  size={24}
                  className="bg-white"
                  style={{ color: "var(--color-primary)" }}
                />
              )}
            </button>

            {/* CTA Button */}
            <button
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "var(--color-primary)",
                color: isDark ?  COLORS.LIGHT_PRIMARY : COLORS.WHITE,
              }}
              className="px-5 py-2.5 rounded-full text-md md:text-lg lg:text-xl font-bold transition-all hover:brightness-110 active:scale-95 shadow-lg"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              style={{ padding: 0, border: "none", outline: "none" }}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Moon
                  size={24}
                  style={{ color: "var(--color-primary)" }}
                  className="bg-black"
                />
              ) : (
                <Sun
                  size={24}
                  style={{ color: "var(--color-primary)" }}
                  className="bg-white"
                />
              )}
            </button>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              style={{
                padding: 0,
                border: "none",
                outline: "none",
                color: "var(--color-primary)",
                backgroundColor: "transparent",
              }}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: -50, opacity: 0 }} // Animate from left
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5 }} // Slower animation
              onClick={(e) => e.stopPropagation()}
              className={`absolute top-4 left-4 right-4 rounded-2xl shadow-xl p-6 ${
                isDark ? "bg-black" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-0">
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col space-y-2 px-3 py-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    style={{ color: "var(--color-primary)" }}
                    className="block px-6 py-4 text-base font-semibold rounded-2xl shadow-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105 dark:hover:bg-gray-800"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.button
                onClick={closeMenu}
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: isDark ?  COLORS.LIGHT_PRIMARY : COLORS.WHITE,
                }}
                className="mt-2 w-full text-white py-3 rounded-xl font-bold transition-all hover:brightness-110 active:scale-80"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * navLinks.length, duration: 0.4 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

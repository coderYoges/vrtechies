import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { theme, isDark } = useTheme();
  const activeColor = isDark ? theme?.dark.primary : theme?.light.primary;
  // Show the arrow after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 left-6 lg:left-20 z-50 p-3 rounded-full shadow-lg
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
      style={{
        backgroundColor: activeColor,
        color: "white",
        border: "none",
        outline: "none",
      }}
    >
      {/* Simple up arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default BackToTop;

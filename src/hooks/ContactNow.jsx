import { useTheme } from "./ThemeContext";
import { MessageCircle, MessageSquare } from "lucide-react";

const ContactNow = () => {
  const { theme, isDark } = useTheme();
  const activeColor = isDark ? theme?.dark.primary : theme?.light.primary;

  // 1. Define your phone number (International format without '+' or '00')
  const phoneNumber = "918925615416";
  // 2. Define an optional pre-filled message
  const message = encodeURIComponent(
    "Hello! I have a question about your services.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const handleChatClick = () => {
    // 3. Open the link in a new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <button
      onClick={handleChatClick}
      className={`
        fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg
        transition-all duration-300 hover:scale-110 active:scale-95
      `}
      style={{
        backgroundColor: activeColor,
        color: "white",
        border: "none",
        outline: "none",
      }}
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle color="#fff" size={24} />
    </button>
  );
};

export default ContactNow;

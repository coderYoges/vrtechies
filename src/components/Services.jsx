import { motion } from "framer-motion";
import {
  BrainCircuit,
  Cpu,
  Globe,
  Smartphone,
  Shield,
  BarChart3,
} from "lucide-react";
import { useTheme } from "../hooks/ThemeContext";
import { COLORS } from "../config/constants";

const SERVICES = [
  {
    title: "Web Development",
    desc: "High-performance, SEO-optimized web applications built with modern frameworks and scalable architectures.",
    icon: <Globe size={32} />,
  },
  {
    title: "Mobile App Development",
    desc: "Beautiful, fast, and reliable iOS and Android apps designed for seamless user experiences.",
    icon: <Smartphone size={32} />,
  },
  {
    title: "AI Solutions",
    desc: "Custom AI and machine learning models that automate workflows, extract insights, and drive smarter decisions.",
    icon: <BrainCircuit size={32} />,
  },
  {
    title: "Cloud & Backend Systems",
    desc: "Secure, scalable backend infrastructures with real-time APIs, cloud integrations, and robust data pipelines.",
    icon: <Cpu size={32} />,
  },
  {
    title: "Security & Compliance",
    desc: "Enterprise-grade security practices, data protection, and compliance baked into every layer of development.",
    icon: <Shield size={32} />,
  },
  {
    title: "Data & Analytics",
    desc: "Interactive dashboards and analytics tools that turn raw data into clear, actionable business insights.",
    icon: <BarChart3 size={32} />,
  },
];

const Services = () => {
  const { theme, isDark } = useTheme();
  const activeColor = isDark ? theme?.dark.primary : theme?.light.primary;
  const activeBorder = isDark ? theme?.dark.hover : theme?.light.hover;
  const activeFont = isDark ? theme?.dark.text : theme?.light.text;
  return (
    <section
      style={{ color: isDark ? COLORS.DARK_PRIMARY : COLORS.LIGHT_PRIMARY }}
      className={`relative h--100 w-full px-6 py-8 overflow-hidden ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
      id="services"
    >
      <div className="max-w-7xl mx-auto gap-3">
        {/* Section Header */}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-black tracking-tighter pb-8"
        >
          Empowering the next <br />
          <span className="opacity-40 italic" style={{ color: activeColor }}>
            generation of web, app, and AI solutions.
          </span>
        </motion.h2>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              style={{ border: `2px solid ${activeBorder}` }}
              className={`
  rounded-2xl p-6 border backdrop-blur-xl
  transition-all duration-500 cursor-pointer
  ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200/50"}
  hover:bg-[#a9a9a9]
`}
            >
              {/* Icon */}
              <motion.div
                className="mb-6"
                style={{ color: activeColor }}
                initial={{ y: 0 }}
                whileHover={{ y: -4, scale: 1.08 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              >
                {service.icon}
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="text-xl font-black mb-4 tracking-tight"
                style={{ color: activeFont }}
              >
                {service.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.18 }}
                className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium"
              >
                {service.desc}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

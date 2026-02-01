import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  User,
  Mail,
  Phone,
  BriefcaseIcon,
  LocateFixed,
} from "lucide-react";
import { useTheme } from "../hooks/ThemeContext";
import { COLORS } from "../config/constants";
import { useState } from "react";
import { db } from "../config/firebase";

const SubmitButton = ({ status }) => {
  const { isDark, theme } = useTheme();
  const activeColor = isDark ? theme?.dark.primary : theme?.light.primary;

  // Mapping status to text and icons
  const content = {
    idle: { text: "Let's talk", icon: <Send size={20} /> },
    loading: {
      text: "Sending...",
      icon: <Loader2 className="animate-spin" size={20} />,
    },
    success: { text: "Success!", icon: <CheckCircle2 size={20} /> },
    error: { text: "Try Again", icon: <AlertCircle size={20} /> },
  };

  const current = content[status] || content.idle;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={status === "loading"}
      style={{ backgroundColor: activeColor, color: COLORS.LIGHT_PRIMARY }}
      className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all
        disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2"
        >
          {current.icon}
          <span>{current.text}</span>
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

const Error = ({ msg, isGlobal = false }) => (
  <AnimatePresence>
    {msg && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className={`${isGlobal ? "bg-red-500/10 p-3 rounded-xl mb-4 border border-red-500/20" : "mt-1 ml-2"}`}
      >
        <span className="text-red-500 text-xs font-bold flex items-center gap-1">
          <AlertCircle size={14} /> {msg}
        </span>
      </motion.div>
    )}
  </AnimatePresence>
);

const Footer = () => {
  const { isDark } = useTheme();
  const [status, setStatus] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formFields = [
    {
      id: "name",
      icon: User,
      placeholder: "Your Name",
      type: "text",
    },
    {
      id: "email",
      icon: Mail,
      placeholder: "Email Address",
      type: "email",
    },
    {
      id: "phone",
      icon: Phone,
      placeholder: "Contact Number",
      type: "tel",
    },
    {
      id: "address",
      icon: LocateFixed,
      placeholder: "Address",
      type: "text",
    },
    {
      id: "role",
      placeholder: "Select Project Type",
      type: "select",
      icon: BriefcaseIcon,
      options: [
        { label: "Personal", value: "personal" },
        { label: "Merchants", value: "merchants" },
        { label: "Organisation", value: "organisation" },
        { label: "Customized", value: "customized" },
        { label: "Startup Idea", value: "startUp" },
      ],
    },
  ];

  // Global Input Style
  const inputClass =
    "w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-black transition-all";

  const onSubmit = async (data) => {
    setStatus("loading");
    try {
      await addDoc(collection(db, "clients"), data);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      setStatus("idle");
    } finally {
      reset(); // Clear all form fields via React Hook Form
    }
  };

  return (
    <section
      className={`py-12 px-6 w-full transition-colors duration-500 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}
      id="contact"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-12">
        {/* LEFT COLUMN: BRAND STORY & CAPABILITIES */}
        <div className="flex flex-col justify-between order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* Value Proposition */}
            <header className="pb-2 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">
                Partner With Us
              </h3>
              <h1
                className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
                style={{ color: "var(--color-primary)" }}
              >
                Architecting <br />
                <span className="italic font-serif font-light text-slate-400">
                  digital legacies.
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl">
                We specialize in bespoke web ecosystems and high-performance
                mobile applications that scale with your vision.
              </p>
            </header>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-2 pt-8 border-t border-slate-200 dark:border-slate-800">
              {[
                {
                  title: "Capabilities",
                  items: ["Web Platforms", "Mobile Apps"],
                },
                {
                  title: "Strategy",
                  items: ["System Design", "Product Growth"],
                },
              ].map((group) => (
                <div key={group.title} className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">
                    {group.title}
                  </p>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 font-medium">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] opacity-40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Inquiry & Location Block */}
            <footer className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800/50">
              <div className="flex flex-col md:flex-row md:items-start justify-between">
                {/* Contact Side - Editorial Typography */}
                <div className="space-y-4 group mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">
                      Presence
                    </p>
                  </div>

                  <div className="pl-6 border-l border-slate-200 dark:border-slate-800 space-y-3">
                    <address className="not-italic text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      TNPHC, Melakottaiyur <br />
                      Chennai, Tamilnadu, India <br />
                      Pincode - 600127
                    </address>

                    <a
                      href="https://www.google.com/maps/place/TNPHC+(Tamil+Nadu+Police+Housing+Corporation)/@12.8379018,80.131692,15z/data=!4m6!3m5!1s0x3a52584db0cb7195:0x3a4edabebd30a829!8m2!3d12.8379929!4d80.1407075!16s%2Fg%2F11c2lfwq85?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex italic text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium hover:text-[var(--color-primary)] transition-colors duration-500 block"
                    >
                      <span>Get Directions</span>
                      <span className="text-md pl-2 transition-transform group-hover:translate-x-2">
                        →
                      </span>
                    </a>
                    <div className="relative overflow-hidden inline-block">
                      <a
                        href="mailto:hello@vrtechies.co.in"
                        className="italic text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium hover:text-[var(--color-primary)] transition-colors duration-500 block"
                      >
                        hello@vrtechies.co.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM SECTION: LEGAL & SOCIAL UTILITY BAR */}
              <div className="pt-10 pb-6 border-t border-slate-200 dark:border-slate-800/50 flex flex-col justify-between items-center gap-8">
                <nav className="flex gap-10 order-2 lg:order-1">
                  {["Privacy", "Terms", "Cookies"].map((link) => (
                    <a
                      key={link}
                      href={`/${link.toLowerCase()}`}
                      className="text-[10px] font-bold text-slate-400 hover:text-[var(--color-primary)] uppercase tracking-[0.2em] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  ))}
                </nav>

                {/* Identity - Automated Year */}
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] order-1 lg:order-2 text-slate-400 dark:text-slate-500">
                  © {new Date().getFullYear()} VR TECHIES — Digital Architects
                </div>

                {/* Social Links - Identity Consistency */}
                <div className="flex gap-8 order-3">
                  {["LinkedIn", "GitHub", "X"].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="text-[10px] font-black text-slate-500 hover:text-white dark:hover:text-white uppercase tracking-widest transition-colors duration-300 relative group/link"
                    >
                      {platform}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-primary)] transition-all duration-300 group-hover/link:w-full" />
                    </a>
                  ))}
                </div>
              </div>
            </footer>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: THE INTERACTIVE FORM */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-slate-800/40 p-8 lg:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm order-1 md:order-2"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Ready to Connect?</h2>
            <p className="text-slate-500 text-sm">
              Fill out the form below and we'll reach out within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Error msg={errors.root?.serverError?.message} isGlobal={true} />

            {/* Form Fields - Single Column for Best Focus */}
            {formFields.map((field) => (
              <div key={field.id} className="relative group mb-4">
                {/* Common Icon */}
                <field.icon
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-primary)] transition-colors pointer-events-none z-10"
                  size={20}
                />

                {field.type === "select" ? (
                  <div className="relative">
                    <select
                      {...register(field.id, {
                        required: `${field.placeholder} is required`,
                      })}
                      className={`${inputClass} !pl-12 !py-4 w-full rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all appearance-none cursor-pointer`}
                    >
                      <option value="" disabled selected hidden>
                        {field.placeholder}
                      </option>
                      {field.options?.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className="bg-white dark:bg-slate-800"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {/* Dropdown Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <input
                    {...register(field.id, {
                      required: `${field.placeholder} is required`,
                    })}
                    type={field.type}
                    className={`${inputClass} !pl-12 !py-4 w-full rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all`}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            <div className="relative group">
              <MessageSquare
                className="absolute left-4 top-5 text-slate-400 group-focus-within:text-[var(--color-primary)]"
                size={20}
              />
              <textarea
                {...register("details", {
                  required: "Project details are required",
                })}
                rows="4"
                className={`${inputClass} !pl-12 !pt-4 resize-none rounded-xl border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all`}
                placeholder="Tell us about your project..."
              />
              {formFields.map((field) => (
                <Error msg={errors[field.id]?.message} />
              ))}
            </div>

            <SubmitButton
              status={status}
              className="w-full !py-4 text-lg font-bold rounded-xl transition-transform active:scale-95"
            />
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;

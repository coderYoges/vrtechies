import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, Globe, Zap, Shield, BarChart3 } from 'lucide-react';

const SERVICES = [
  {
    title: "Neural Architectures",
    desc: "We design custom LLM pathways tailored to your proprietary data ecosystems.",
    icon: <BrainCircuit size={32} />,
  },
  {
    title: "Edge Computing",
    desc: "Bringing cognitive processing power closer to the source for zero-latency execution.",
    icon: <Cpu size={32} />,
  },
  {
    title: "Global Intelligence",
    desc: "Scalable cloud infrastructures that sync neural states across continents instantly.",
    icon: <Globe size={32} />,
  },
  {
    title: "Predictive Scaling",
    desc: "Systems that anticipate traffic surges and scale resources before the load hits.",
    icon: <Zap size={32} />,
  },
  {
    title: "Encrypted Cognition",
    desc: "End-to-end holographic encryption for all neural data processing.",
    icon: <Shield size={32} />,
  },
  {
    title: "Data Visualization",
    desc: "Transforming complex neural outputs into intuitive, actionable executive dashboards.",
    icon: <BarChart3 size={32} />,
  }
];

const Services = () => {
  return (
    <section className="relative h--100 w-full px-6 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-[1px]" style={{ backgroundColor: 'var(--dynamic-color)' }} />
            <span className="text-xs font-black uppercase tracking-[0.3em] opacity-60 dark:text-white">Capabilities</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter"
          >
            Empowering the next <br /> 
            <span className="opacity-40 italic">generation of AI.</span>
          </motion.h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 overflow-hidden transition-all"
            >
              {/* Animated Glow Backdrop */}
              <div 
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: 'var(--dynamic-color)' }}
              />

              <div 
                className="mb-6 transition-colors duration-500" 
                style={{ color: 'var(--dynamic-color)' }}
              >
                {service.icon}
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                {service.title}
              </h3>
              
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">
                {service.desc}
              </p>

              {/* Bottom Accent Line */}
              <motion.div 
                className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: 'var(--dynamic-color)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-radial-gradient from-[var(--dynamic-color)] to-transparent opacity-[0.03] blur-[100px] pointer-events-none" />
    </section>
  );
};

export default Services;
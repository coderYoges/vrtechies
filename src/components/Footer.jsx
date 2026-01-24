import { motion } from 'framer-motion';
import { Send, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative w-full py-24 px-6 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      
      {/* Background Glow - Pulls from the Global Active Color */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] opacity-10 blur-[120px] pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: 'var(--dynamic-color)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Side: Call to Action */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8"
            >
              Ready to <br />
              <span style={{ color: 'var(--dynamic-color)' }} className="transition-colors duration-500">Connect?</span>
            </motion.h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-md font-medium leading-relaxed">
              Our neural network is always listening. Reach out to start your next high-performance deployment.
            </p>
            
            <div className="flex gap-6 mt-12">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: 'var(--dynamic-color)' }}
                  className="text-slate-400 transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side: Dynamic Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="group relative">
              <input 
                type="text" 
                placeholder="Name"
                className="w-full bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 p-4 outline-none transition-all focus:border-[var(--dynamic-color)] dark:text-white font-bold"
              />
            </div>
            
            <div className="group relative">
              <input 
                type="email" 
                placeholder="Email"
                className="w-full bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 p-4 outline-none transition-all focus:border-[var(--dynamic-color)] dark:text-white font-bold"
              />
            </div>

            <div className="group relative">
              <textarea 
                rows="4" 
                placeholder="Project Details"
                className="w-full bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 p-4 outline-none transition-all focus:border-[var(--dynamic-color)] dark:text-white font-bold resize-none"
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-2xl text-white font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-2xl transition-colors duration-500"
              style={{ backgroundColor: 'var(--dynamic-color)' }}
            >
              Initialize Contact <Send size={18} />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-32 pt-10 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <p>© 2024 NEURAL INTERFACE AGENCY</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
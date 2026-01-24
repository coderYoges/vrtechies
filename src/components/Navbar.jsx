import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion'; 
import { Sun, Moon } from 'lucide-react';

const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

    // Remove useScrollDirection if you want it PERMANENTLY visible
    // const isVisible = useScrollDirection(); 

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }} // Corrected typo: "animate" instead of "nimate"
            transition={{ duration: 0.5 }}
            /* added top-0 left-0 to ensure it's anchored correctly */
            className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50 transition-colors duration-300"
        >
            {/* The Reading Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 origin-left"
                style={{ scaleX }}
            />

            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-black dark:text-white tracking-tighter">
                    VR<span className="text-blue-600">Techies</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-semibold text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}

                    <div className="h-6 w-px bg-gray-200 dark:bg-slate-700" />

                    <button 
                        onClick={() => setIsDark(!isDark)} 
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-white transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                        Get Started
                    </button>
                </div>
                
                {/* Mobile Controls & Menu logic stays the same... */}
            </div>
        </motion.nav>
    );
};

export default Navbar;
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const PROJECT_DATA = [
    { id: 0, title: "NEXA AI", category: "Neural Logistics", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800" },
    { id: 1, title: "SYNTH", category: "Edge Analytics", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800" },
    { id: 2, title: "VIRTUALIS", category: "Spatial Cognition", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800" }
];

const ProjectTiles = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-cycle logic: moves the glow to the next card every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % PROJECT_DATA.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    return (
        <section className="relative w-full py-24 px-6 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-1000">

            {/* --- NEURAL MAP BACKGROUND --- */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40">
                <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none">
                    <motion.path
                        animate={{
                            d: activeIndex === 0 ? "M0 200 Q 150 200 333 200" :
                                activeIndex === 1 ? "M333 200 Q 500 200 666 200" :
                                    "M666 200 Q 850 200 1000 200"
                        }}
                        stroke="var(--dynamic-color)"
                        strokeWidth="2"
                        fill="none"
                        className="drop-shadow-[0_0_8px_var(--dynamic-color)] transition-all duration-1000"
                    />
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16 px-4">
                    <motion.h2
                        key={activeIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter"
                    >
                        Project <span style={{ color: 'var(--dynamic-color)' }} className="transition-colors duration-500">Sync</span>
                    </motion.h2>
                </div>

                {/* --- GRID SYSTEM --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PROJECT_DATA.map((project, i) => {
                        const isActive = activeIndex === i;

                        return (
                            <motion.div
                                key={project.id}
                                onClick={() => setActiveIndex(i)} // Manual override
                                className={`relative h-[500px] rounded-[2.5rem] overflow-hidden border-2 cursor-pointer transition-all duration-700 
                  ${isActive ? 'z-20 scale-105 shadow-2xl active-glow' : 'z-10 opacity-30 grayscale scale-95'}`}
                                style={{
                                    borderColor: isActive ? 'var(--dynamic-color)' : 'rgba(148, 163, 184, 0.1)',
                                }}
                            >
                                {/* Background Image */}
                                <img
                                    src={project.image}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    alt={project.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90" />

                                {/* --- FULLY COVERED CORNER --- */}
                                <AnimatePresence mode="wait">
                                    {isActive && (
                                        <motion.div
                                            initial={{ x: 60, y: -60 }}
                                            animate={{ x: 0, y: 0 }}
                                            exit={{ x: 60, y: -60 }}
                                            className="absolute top-0 right-0 w-24 h-24 z-30"
                                            style={{
                                                backgroundColor: 'var(--dynamic-color)',
                                                clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
                                            }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Content Area */}
                                <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className={`w-2 h-2 rounded-full ${isActive ? 'animate-ping' : ''}`}
                                            style={{ backgroundColor: isActive ? 'var(--dynamic-color)' : '#94a3b8' }} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                                            {isActive ? 'Processing' : 'Locked'}
                                        </span>
                                    </div>

                                    <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8">
                                        {project.title}
                                    </h3>

                                    {/* --- THE SCANNING TIMER BAR --- */}
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    key={`progress-${activeIndex}`}
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 5, ease: "linear" }}
                                                    className="h-full"
                                                    style={{ backgroundColor: 'var(--dynamic-color)' }}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProjectTiles;
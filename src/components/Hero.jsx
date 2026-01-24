// Hero.jsx
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import Brain from '../hooks/BrainModal';

const HERO_CONTENT = [
    {
        title: "Unlock the Future of Digital",
        desc: "Neural Network Solutions for Modern Brands",
        color: "#2563eb",
        stats: { nodes: "1.2k", latency: "14ms", status: "Active" }
    },
    {
        title: "Cognitive Web Architecture",
        desc: "Smart Systems that Think and Scale",
        color: "#9333ea",
        stats: { nodes: "4.8k", latency: "09ms", status: "Optimizing" }
    },
    {
        title: "Intelligent UI Design",
        desc: "User Experiences Driven by Data",
        color: "#db2777",
        stats: { nodes: "2.4k", latency: "22ms", status: "Learning" }
    }
];

const Hero = () => {
    const [index, setIndex] = useState(0);
    const activeColor = HERO_CONTENT[index].color;

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % HERO_CONTENT.length);
            document.documentElement.style.setProperty('--dynamic-color', HERO_CONTENT[index].color);
        }, 5000);
        return () => clearInterval(interval);
    }, [index]);

    return (
        <section className="relative w-screen h-[80dvh] bg-white dark:bg-slate-900 overflow-hidden flex flex-col items-center justify-center">

            {/* 3D Canvas Layer */}
            <div className="absolute inset-0 z-0">
                <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 35 }}>
                    <ambientLight intensity={1.5} />
                    <Suspense fallback={null}>
                        <Brain color={activeColor} />
                    </Suspense>
                </Canvas>
            </div>

            {/* NEW CONTENT: Left Side Floating Stats (Hidden on Mobile) */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-8">
                {Object.entries(HERO_CONTENT[index].stats).map(([key, value]) => (
                    <div key={key} className="border-l-2 pl-4 transition-colors duration-500" style={{ borderColor: activeColor }}>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">{key}</p>
                        <p className="text-2xl font-black dark:text-white leading-none mt-1">{value}</p>
                    </div>
                ))}
            </div>

            {/* Main Centered Content */}
            <div className="relative z-10 w-full max-w-5xl px-6 text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col items-center"
                    >
                        <motion.span
                            animate={{ color: activeColor }}
                            className="mb-6 text-xs font-black tracking-[0.4em] uppercase"
                        >
                            System Online / 00{index + 1}
                        </motion.span>

                        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                            {HERO_CONTENT[index].title}
                        </h1>

                        <p className="mt-8 text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-xl leading-relaxed">
                            Leading the transition from static interfaces to dynamic, cognitive digital ecosystems.
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row gap-5">
                            <button
                                style={{ backgroundColor: activeColor }}
                                className="px-12 py-4 rounded-full text-white font-black uppercase tracking-widest text-xs shadow-2xl transition-all hover:brightness-110 active:scale-95"
                            >
                                Launch Console
                            </button>
                            <button className="px-12 py-4 rounded-full border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                Documentation
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>


            {/* Background Color Bleed */}
            <div
                className="absolute top-0 left-0 w-full h-32 opacity-10 blur-[100px] pointer-events-none transition-colors duration-1000"
                style={{ backgroundColor: activeColor }}
            />
        </section>
    );
};

export default Hero;
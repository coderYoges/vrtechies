import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Sections';
import ProjectTiles from './components/Projects';
import Footer from './components/Footer';

function App() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    // Synchronize all sections to a 5-second neural pulse
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % GLOBAL_THEMES.length);
    }, 5000);

    // Update the CSS variable globally so all components can access it
    document.documentElement.style.setProperty(
      '--dynamic-color',
      GLOBAL_THEMES[index].color
    );

    return () => clearInterval(interval);
  }, [index]);
  const GLOBAL_THEMES = [
    { color: "#2563eb", name: "Blue" },    // Nexa AI / Hero 1
    { color: "#9333ea", name: "Purple" },  // Synth / Hero 2
    { color: "#db2777", name: "Pink" }     // Virtualis / Hero 3
  ];
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <Navbar />
      <Hero index={index} />
      <Services activeIndex={index} />
      <ProjectTiles activeIndex={index} />
      <Footer />
      {/* GLOBAL HUD: Optional UI element to show current system status */}
      <div className="fixed bottom-6 left-6 z-50 hidden md:block">
        <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: 'var(--dynamic-color)' }}
          />
          <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-80">
            System Status: {GLOBAL_THEMES[index].name}_ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Services from './components/Sections';
import ProjectTiles from './components/Projects';
import Footer from './components/Footer';
import BackToTop from './hooks/BackToTop';

function App() {
  return (
    <div
      className="min-h-screen transition-colors duration-500">
      <Navbar />
      <Hero />
      <AboutUs />
      <Services />
      <ProjectTiles />
      <Footer />
      <BackToTop />
      {/* GLOBAL HUD: Optional UI element to show current system status */}
      <div className="fixed bottom-6 left-6 z-50 hidden md:block">
        <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
          <div className="w-2 h-2 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-80" style={{ color: 'var(--dynamic-color)' }}>
            System Status: ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
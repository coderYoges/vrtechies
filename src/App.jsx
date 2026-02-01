import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import ProjectTiles from "./components/Projects";
import Footer from "./components/Footer";
import BackToTop from "./hooks/BackToTop";
import Divider from "./components/Divider";
import ContactNow from "./hooks/ContactNow";

function App() {
  return (
    <div className="min-h-screen transition-colors duration-500">
      <Navbar />
      <Hero />
      <Divider />
      <AboutUs />
      <Divider />
      <Services />
      <Divider />
      <ProjectTiles />
      <Divider />
      <Footer />
      <BackToTop />
      <ContactNow />
    </div>
  );
}

export default App;

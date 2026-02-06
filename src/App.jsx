import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import ProjectTiles from "./components/Projects";
import Footer from "./components/Footer";
import BackToTop from "./hooks/BackToTop";
import Divider from "./components/Divider";
import ContactNow from "./hooks/ContactNow";
import SVGComponent from "./assets/Logo"; // Your Lightning Star
import LoadingScreen from "./pages/loadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealing(true);
      setTimeout(() => {
        setIsNavbarVisible(true);
        setIsLoading(false);
      }, 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. Loading Indicator & Shutter Panels */}
      {isLoading && <LoadingScreen isRevealing={isRevealing} />}

      {/* 2. Main Content with Blur Effect */}
      <div
        className={`min-h-screen transition-all duration-1000 ${isRevealing ? "blur-0" : "blur-md"}`}
      >
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
    </>
  );
}

export default App;

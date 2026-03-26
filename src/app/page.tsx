"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/layout/Preloader";
import MagneticCursor from "@/components/layout/MagneticCursor";
import PageTransition from "@/components/layout/PageTransition";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

function SectionDivider() {
  return <div className="section-divider" />;
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="noise-overlay">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <MagneticCursor />
      <SmoothScroll>
        <Navbar />
        <PageTransition>
          <main>
            <Hero />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Contact />
          </main>
          <Footer />
        </PageTransition>
      </SmoothScroll>
    </div>
  );
}

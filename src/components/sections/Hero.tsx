"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import SplitText from "@/components/ui/SplitText";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});

function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-card rounded-2xl">
      <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function MobileHero() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/6 w-80 h-80 rounded-full bg-accent blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/6 w-64 h-64 rounded-full bg-accent-dark blur-[100px]"
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12 lg:px-20"
    >
      {/* Mobile fallback background */}
      <div className="md:hidden">
        <MobileHero />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center pt-24 md:pt-0">
        {/* Left column - Typography (60%) */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <div>
            <SplitText
              as="p"
              className="font-mono text-accent text-xs sm:text-sm tracking-[0.2em] uppercase mb-4"
              direction="right"
              scrollTrigger={false}
              delay={0.3}
            >
              Software Engineer
            </SplitText>
          </div>

          <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.05em]">
            <SplitText
              as="span"
              className="block"
              direction="up"
              scrollTrigger={false}
              delay={0.5}
            >
              Karan
            </SplitText>
            <SplitText
              as="span"
              className="block text-accent"
              direction="up"
              scrollTrigger={false}
              delay={0.8}
            >
              Chandekar
            </SplitText>
          </h1>

          <div>
            <SplitText
              as="p"
              className="text-foreground/50 text-base md:text-lg max-w-md leading-relaxed"
              direction="up"
              scrollTrigger={false}
              delay={1.1}
              stagger={0.02}
            >
              I build AI-powered full-stack applications with modern web technologies
            </SplitText>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start gap-6 mt-4"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 text-accent font-mono text-sm tracking-wider hover:gap-3 transition-all duration-300"
              data-cursor="link"
            >
              Selected Work
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 font-mono text-sm tracking-wider hover:text-foreground/70 transition-colors"
              data-cursor="link"
            >
              Resume &rarr;
            </a>
          </motion.div>
        </div>

        {/* Right column - 3D Scene window (40%) */}
        <div className="md:col-span-2 hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-foreground/5 bg-card"
          >
            <Suspense fallback={<SceneFallback />}>
              <Scene />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

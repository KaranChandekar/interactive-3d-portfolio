"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});

function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function MobileHero() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-cyan blur-[80px]"
      />
      <svg
        viewBox="0 0 400 400"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-10"
      >
        <motion.polygon
          points="200,50 350,150 300,320 100,320 50,150"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="1"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="#a855f7"
          strokeWidth="0.5"
          strokeDasharray="10 5"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient background base */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-accent/5" />

      {/* 3D Canvas - Desktop only */}
      <div className="absolute inset-0 hidden md:block">
        <Suspense fallback={<SceneFallback />}>
          <Scene />
        </Suspense>
      </div>

      {/* Mobile fallback */}
      <div className="md:hidden">
        <MobileHero />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-4">
          <SplitText
            as="p"
            className="text-accent text-sm md:text-base font-mono tracking-wider uppercase"
            direction="right"
            scrollTrigger={false}
            delay={0.5}
          >
            Creative Developer
          </SplitText>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          <SplitText
            as="span"
            className="block"
            direction="up"
            scrollTrigger={false}
            delay={0.8}
          >
            Hello, I&apos;m
          </SplitText>
          <SplitText
            as="span"
            className="block text-transparent bg-clip-text bg-linear-to-r from-accent via-accent-light to-cyan"
            direction="center"
            scrollTrigger={false}
            delay={1.2}
          >
            Alex Chen
          </SplitText>
        </h1>

        <div className="mb-10">
          <SplitText
            as="p"
            className="text-foreground/60 text-base md:text-lg max-w-xl mx-auto"
            direction="up"
            scrollTrigger={false}
            delay={1.6}
            stagger={0.02}
          >
            I build immersive digital experiences with modern web technologies
          </SplitText>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton href="#projects">
            View My Work
            <ArrowDown size={16} />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="bg-transparent! border! border-foreground/20! text-foreground! hover:border-accent! hover:text-accent!"
          >
            Get In Touch
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-foreground/40 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

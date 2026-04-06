"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const techCategories = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS"],
  },
  {
    label: "AI / ML",
    items: ["LLM Integration", "RAG Pipelines", "AI Agents", "Prompt Engineering"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Docker", "Framer Motion", "GSAP", "Three.js"],
  },
];

const timeline = [
  {
    role: "Software Engineer",
    company: "Salk AI",
    period: "Aug 2023 — Present",
    description:
      "Built and deployed AI-powered applications including task-specific AI agents for enterprise-grade lead generation and sales automation. Integrated LLMs into production systems with RAG pipelines and prompt engineering.",
  },
  {
    role: "Frontend Developer Intern",
    company: "StampMyVisa",
    period: "Mar 2023 — Jun 2023",
    description:
      "Translated complex Figma designs into pixel-perfect, responsive UI components using React, Next.js, TypeScript, and Tailwind CSS.",
  },
  {
    role: "Frontend Developer Intern",
    company: "UCPI",
    period: "Oct 2022 — Dec 2022",
    description:
      "Developed and shipped end-to-end web applications for multiple products using React, resulting in a 40% increase in user engagement.",
  },
  {
    role: "BCA",
    company: "Shivaji Science College, Nagpur",
    period: "Graduated July 2024",
    description:
      "Bachelor of Computer Applications.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Parallax background glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/4 blur-[120px] pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <SplitText
            as="h2"
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] mb-6"
            direction="up"
          >
            About Me
          </SplitText>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/50 text-base md:text-lg leading-relaxed"
          >
            Software Engineer with 3+ years of experience building and deploying
            AI-powered full-stack applications. Proficient in React, Next.js,
            TypeScript, Node.js, and Python.
          </motion.p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-8">
              Technologies
            </h3>
            <div className="space-y-8">
              {techCategories.map((category) => (
                <div key={category.label}>
                  <h4 className="text-sm font-medium text-foreground/70 mb-3">
                    {category.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 rounded-full border border-foreground/10 text-sm text-foreground/60 hover:border-accent/30 hover:text-foreground/80 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Experience timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-8">
              Experience
            </h3>
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-4 items-start"
                >
                  <span className="text-xs font-mono text-accent tracking-wider pt-1">
                    {item.period}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-foreground">
                      {item.role}
                    </h4>
                    <p className="text-sm text-muted font-medium mt-0.5">
                      {item.company}
                    </p>
                    <p className="text-sm text-foreground/35 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

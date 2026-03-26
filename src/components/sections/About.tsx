"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 92 },
  { name: "Three.js / R3F", level: 85 },
  { name: "Node.js", level: 90 },
  { name: "Python", level: 82 },
  { name: "PostgreSQL", level: 88 },
  { name: "AWS / Cloud", level: 80 },
  { name: "UI/UX Design", level: 78 },
  { name: "GraphQL", level: 85 },
  { name: "Docker / K8s", level: 75 },
];

const experience = [
  {
    role: "Senior Frontend Engineer",
    company: "TechCorp",
    period: "2023 — Present",
    description:
      "Lead the frontend architecture for a suite of SaaS products serving 2M+ users. Introduced micro-frontend patterns and improved Core Web Vitals by 40%.",
  },
  {
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    period: "2021 — 2023",
    description:
      "Built the core platform from 0 to 1, implementing real-time collaboration features, payment integrations, and a custom design system.",
  },
  {
    role: "Frontend Developer",
    company: "DigitalAgency",
    period: "2019 — 2021",
    description:
      "Developed interactive websites and web applications for Fortune 500 clients. Specialized in animation-heavy experiences using GSAP and Three.js.",
  },
  {
    role: "Junior Developer",
    company: "WebStudio",
    period: "2018 — 2019",
    description:
      "Started career building responsive websites and learning modern JavaScript frameworks. Contributed to 20+ client projects.",
  },
];

function SkillBar({
  name,
  level,
  index,
}: {
  name: string;
  level: number;
  index: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!barRef.current || !numberRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.08,
        }
      );

      const obj = { val: 0 };
      gsap.to(obj, {
        val: level,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.08,
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = `${Math.round(obj.val)}%`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [level, index]);

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground/80">{name}</span>
        <span ref={numberRef} className="text-xs font-mono text-accent tabular-nums">
          0%
        </span>
      </div>
      <div className="h-1.5 bg-foreground/5 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-linear-to-r from-accent to-accent-light rounded-full origin-left"
          style={{ width: `${level}%`, transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof experience)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      className="relative pl-10 pb-10 last:pb-0"
    >
      {/* Connecting line */}
      <div className="absolute left-2.25 top-4.5 bottom-0 w-px bg-white/8" />
      {/* Dot */}
      <div className="absolute left-0 top-2.5 w-4.75 h-4.75 rounded-full border-2 border-accent bg-background flex items-center justify-center">
        <div className="w-1.75 h-1.75 rounded-full bg-accent" />
      </div>

      <div className="bg-white/2 border border-white/5 rounded-xl p-5 hover:border-accent/20 transition-colors duration-300">
        <span className="text-xs font-mono text-accent tracking-wider">
          {item.period}
        </span>
        <h4 className="text-base font-bold mt-1.5 text-foreground">{item.role}</h4>
        <p className="text-sm text-foreground/50 font-medium mt-0.5">
          {item.company}
        </p>
        <p className="text-sm text-foreground/35 mt-3 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Parallax background glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-accent/4 blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: midY }}
        className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-cyan/4 blur-[100px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <SplitText
            as="h2"
            className="text-3xl md:text-5xl font-bold"
            direction="up"
          >
            About Me
          </SplitText>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/50 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            I&apos;m a creative developer with 6+ years of experience building
            digital products that merge clean engineering with thoughtful design.
            I specialize in interactive web experiences, real-time applications,
            and systems that scale.
          </motion.p>
        </div>

        {/* Skills + Experience two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-accent" />
              Technical Skills
            </h3>
            <div>
              {skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={i}
                />
              ))}
            </div>
          </motion.div>

          {/* Right - Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-accent" />
              Experience
            </h3>
            <div>
              {experience.map((item, i) => (
                <TimelineItem key={item.company} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

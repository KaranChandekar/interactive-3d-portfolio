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

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
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
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      );

      const obj = { val: 0 };
      gsap.to(obj, {
        val: level,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1,
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
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium">{name}</span>
        <span ref={numberRef} className="text-xs font-mono text-accent">
          0%
        </span>
      </div>
      <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
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
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Connecting line */}
      <div className="absolute left-[7px] top-3 bottom-0 w-[1px] bg-border last:hidden" />
      {/* Dot */}
      <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-accent bg-background" />

      <div>
        <span className="text-xs font-mono text-accent">{item.period}</span>
        <h4 className="text-base font-bold mt-1">{item.role}</h4>
        <p className="text-sm text-foreground/60 font-medium">{item.company}</p>
        <p className="text-sm text-foreground/40 mt-2 leading-relaxed">
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

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Parallax background shapes */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: midY }}
        className="absolute top-1/2 -left-32 w-72 h-72 rounded-full bg-cyan/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Decorative */}
          <div className="relative hidden lg:flex items-center justify-center">
            <motion.div
              style={{ y: bgY }}
              className="absolute w-64 h-64 rounded-3xl bg-accent/10 rotate-12"
            />
            <motion.div
              style={{ y: midY }}
              className="absolute w-48 h-48 rounded-3xl bg-cyan/10 -rotate-6 translate-x-12 translate-y-12"
            />
            <div className="relative w-72 h-72 rounded-3xl bg-linear-to-br from-accent/20 to-cyan/20 flex items-center justify-center">
              <span className="text-8xl font-bold text-accent/20">AC</span>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <SplitText
              as="h2"
              className="text-3xl md:text-5xl font-bold mb-8"
              direction="up"
            >
              About Me
            </SplitText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-foreground/60 leading-relaxed mb-12"
            >
              I&apos;m a creative developer with 6+ years of experience building
              digital products that merge clean engineering with thoughtful
              design. I specialize in interactive web experiences, real-time
              applications, and systems that scale. Currently focused on pushing
              the boundaries of what&apos;s possible in the browser with 3D
              graphics and animation.
            </motion.p>

            {/* Skills */}
            <div className="mb-12">
              <h3 className="text-lg font-bold mb-6">Technical Skills</h3>
              {skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={i}
                />
              ))}
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-lg font-bold mb-6">Experience</h3>
              {experience.map((item, i) => (
                <TimelineItem key={item.company} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

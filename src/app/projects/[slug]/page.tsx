"use client";

import { use, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { getProjectBySlug, getRelatedProjects, projects } from "@/data/projects";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import MagneticCursor from "@/components/layout/MagneticCursor";
import Footer from "@/components/layout/Footer";
import SplitText from "@/components/ui/SplitText";

function GalleryCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrent((p) => (p - 1 + images.length) % images.length);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="relative h-64 md:h-96">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              opacity: i === current ? 1 : 0,
              scale: i === current ? 1 : 0.95,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={img}
              alt={`Gallery image ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </motion.div>
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-accent transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-accent transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-accent" : "bg-foreground/30"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  const related = getRelatedProjects(slug, 3);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="text-accent hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <MagneticCursor />
      <SmoothScroll>
        <Navbar />

        {/* Hero */}
        <div ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-accent transition-colors mb-6 group"
              data-cursor="link"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to projects
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`text-[11px] px-3 py-1 rounded-full font-mono tracking-wider uppercase backdrop-blur-md ${
                  project.category === "AI Applications"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                    : project.category === "Professional"
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                      : "bg-accent/15 text-accent/80 border border-accent/20"
                }`}
              >
                {project.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/50">
              <span>{project.date}</span>
              <span>·</span>
              <span>{project.team}</span>
              <span>·</span>
              <span>{project.client}</span>
              {project.liveUrl && (
                <>
                  <span>·</span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
                    data-cursor="link"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
          {/* Challenge */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4 text-accent">
              The Challenge
            </h2>
            <p className="text-foreground/60 leading-relaxed">
              {project.challenge}
            </p>
          </motion.section>

          {/* Solution */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4 text-accent">
              The Solution
            </h2>
            <p className="text-foreground/60 leading-relaxed mb-6">
              {project.solution}
            </p>
            <pre className="bg-foreground/5 border border-border rounded-xl p-6 overflow-x-auto text-sm font-mono text-foreground/70">
              <code>{project.codeSnippet}</code>
            </pre>
          </motion.section>

          {/* Tech Stack */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4 text-accent">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-xl bg-accent/10 text-accent text-sm font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Outcomes */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6 text-accent">
              Outcomes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.outcomes.map((outcome) => (
                <div
                  key={outcome.label}
                  className="text-center p-6 rounded-2xl bg-foreground/5 border border-border"
                >
                  <p className="text-2xl md:text-3xl font-bold text-accent mb-1">
                    {outcome.value}
                  </p>
                  <p className="text-xs text-foreground/40 uppercase tracking-wider">
                    {outcome.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Gallery */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6 text-accent">Gallery</h2>
            <GalleryCarousel images={project.gallery} />
          </motion.section>

          {/* Related Projects */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/projects/${rel.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all"
                  data-cursor="project"
                >
                  <div className="relative h-40">
                    <Image
                      src={rel.thumbnail}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold group-hover:text-accent transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-foreground/40 mt-1 line-clamp-1">
                      {rel.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <Footer />
      </SmoothScroll>
    </>
  );
}

"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  projects,
  categories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import SplitText from "@/components/ui/SplitText";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 1024) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 6;
    card.style.transform = `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block"
        data-cursor="project"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative rounded-2xl overflow-hidden transition-[transform,box-shadow] duration-300 ease-out will-change-transform"
        >
          {/* Image with overlay */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-center">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
                  <ArrowUpRight size={20} className="text-background" />
                </div>
                <span className="text-sm font-medium text-white">View Project</span>
              </div>
            </div>
          </div>

          {/* Card info */}
          <div className="pt-4 pb-2">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold group-hover:text-accent transition-colors duration-200 truncate">
                {project.title}
              </h3>
              <span className="text-xs text-muted font-mono shrink-0">
                {project.date}
              </span>
            </div>
            <span className="text-xs text-muted font-mono tracking-wider uppercase mt-1 block">
              {project.category}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <SplitText
            as="h2"
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em]"
            direction="up"
          >
            Selected Projects
          </SplitText>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-6 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative font-mono text-sm tracking-wider whitespace-nowrap transition-colors duration-300 pb-2 ${
                activeCategory === category
                  ? "text-accent"
                  : "text-foreground/30 hover:text-foreground/60"
              }`}
              data-cursor="link"
            >
              {category}
              {activeCategory === category && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-foreground/30 text-lg mb-2">
              No projects found
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 text-sm text-accent hover:underline"
              data-cursor="link"
            >
              Show all projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

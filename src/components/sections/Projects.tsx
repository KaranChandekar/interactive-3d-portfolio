"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp, Search, X } from "lucide-react";
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
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 8;
    card.style.transform = `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  };

  const categoryColor =
    project.category === "AI Applications"
      ? "bg-emerald-500/10 text-emerald-400"
      : project.category === "Professional"
        ? "bg-amber-500/10 text-amber-400"
        : "bg-accent/10 text-accent/80";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
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
          className="group relative rounded-2xl bg-white/3 border border-white/6 overflow-hidden transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/[0.07]"
        >
          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[10px] px-2.5 py-1 rounded-full font-mono tracking-wider uppercase backdrop-blur-md ${categoryColor}`}
            >
              {project.category}
            </span>
          </div>

          {/* Thumbnail */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
            {/* Hover arrow */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight size={18} className="text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 pt-3">
            <h3 className="text-base font-bold mb-1.5 group-hover:text-accent transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-sm text-foreground/45 line-clamp-2 mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-accent/8 text-accent/70 font-mono tracking-wide"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-foreground/30 font-mono">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const INITIAL_COUNT = 6;
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (activeCategory !== "All") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const isFiltering = activeCategory !== "All" || searchQuery.trim() !== "";
  const visibleProjects =
    isFiltering || showAll
      ? filteredProjects
      : filteredProjects.slice(0, INITIAL_COUNT);
  const hasMore = !isFiltering && filteredProjects.length > INITIAL_COUNT;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section id="projects" className="relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <SplitText
            as="h2"
            className="text-3xl md:text-5xl font-bold"
            direction="center"
          >
            Selected Projects
          </SplitText>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/45 mt-4 max-w-lg mx-auto text-sm md:text-base"
          >
            A collection of{" "}
            <span className="text-foreground/70 font-medium">
              {projects.length} projects
            </span>{" "}
            spanning AI applications, interactive websites, and professional
            work.
          </motion.p>
        </div>

        {/* Filters bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
        >
          {/* Category tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-sm">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                  activeCategory === category
                    ? "text-white"
                    : "text-foreground/40 hover:text-foreground/70"
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-accent/20 border border-accent/30 rounded-xl"
                    transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  />
                )}
                <span className="relative z-10">
                  {category}
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {categoryCounts[category] || 0}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-accent/40 transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => {
                setShowSearch(!showSearch);
                if (showSearch) setSearchQuery("");
              }}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground/40 hover:text-foreground/70 hover:border-white/20 transition-colors"
            >
              {showSearch ? <X size={16} /> : <Search size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Results count */}
        {(activeCategory !== "All" || searchQuery) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-foreground/30 mb-6"
          >
            Showing {filteredProjects.length} of {projects.length} projects
            {searchQuery && (
              <>
                {" "}
                for &ldquo;
                <span className="text-accent/70">{searchQuery}</span>&rdquo;
              </>
            )}
          </motion.p>
        )}

        {/* Project grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Show More / Show Less */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-foreground/50 hover:text-foreground/80 bg-white/3 hover:bg-white/6 border border-white/8 hover:border-white/15 rounded-2xl transition-all duration-300"
              data-cursor="link"
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp
                    size={16}
                    className="group-hover:-translate-y-0.5 transition-transform"
                  />
                </>
              ) : (
                <>
                  Show More
                  <span className="text-accent/60 text-xs">
                    +{filteredProjects.length - INITIAL_COUNT}
                  </span>
                  <ChevronDown
                    size={16}
                    className="group-hover:translate-y-0.5 transition-transform"
                  />
                </>
              )}
            </button>
          </motion.div>
        )}

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
            <p className="text-foreground/20 text-sm">
              Try a different category or search term
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setShowSearch(false);
              }}
              className="mt-4 px-4 py-2 text-sm text-accent/70 hover:text-accent border border-accent/20 hover:border-accent/40 rounded-xl transition-colors"
            >
              Show all projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

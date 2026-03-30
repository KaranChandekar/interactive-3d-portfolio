export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  thumbnail: string;
  heroImage: string;
  tags: string[];
  date: string;
  team: string;
  client: string;
  challenge: string;
  solution: string;
  codeSnippet: string;
  outcomes: { label: string; value: string }[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "auto-salk",
    title: "Auto Salk",
    description: "AI-powered communication platform providing calling, WhatsApp, and email agents for automotive dealerships.",
    fullDescription: "Built the full frontend for a multi-tenant SaaS platform providing AI-powered calling, WhatsApp, and email agents for automotive dealerships and service businesses across India, Australia, US, and New Zealand.",
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn/ui", "TanStack Query"],
    date: "2023 — Present",
    team: "Salk AI",
    client: "Salk AI",
    challenge: "Building a multi-tenant SaaS platform that handles AI-powered calling, WhatsApp, and email agents at scale for automotive dealerships across multiple countries with different regulations and payment systems.",
    solution: "Developed with Next.js, React, TypeScript, Tailwind CSS, Shadcn/ui, and TanStack Query. Integrated Stripe, Razorpay, SendGrid, LiveKit, and OpenAI APIs for a seamless multi-channel communication experience.",
    codeSnippet: `// AI Agent communication handler
async function handleAgentMessage(
  channel: 'call' | 'whatsapp' | 'email',
  dealerId: string,
  leadId: string
) {
  const agent = await getAgentConfig(dealerId, channel);
  const context = await buildLeadContext(leadId);
  const response = await openai.chat.completions.create({
    model: agent.model,
    messages: [
      { role: 'system', content: agent.prompt },
      ...context.history,
    ],
  });
  return processAgentResponse(response, channel);
}`,
    outcomes: [
      { label: "Countries Served", value: "4" },
      { label: "Prospecting Effort", value: "-60%" },
      { label: "Channels", value: "3" },
      { label: "Platform Type", value: "Multi-tenant SaaS" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
    ],
  },
  {
    slug: "linear-clone",
    title: "Linear Clone",
    description: "A pixel-perfect recreation of Linear.app's landing page with complex scroll animations.",
    fullDescription: "Rebuilt Linear.app's landing page with Next.js, Tailwind CSS, and Framer Motion, replicating complex scroll animations and responsive layouts with attention to every detail.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    date: "Feb 2023",
    team: "Solo Project",
    client: "Personal",
    challenge: "Recreating Linear's sophisticated scroll-driven animations and fluid transitions while maintaining performance and responsiveness across all device sizes.",
    solution: "Leveraged Framer Motion's scroll-linked animations and viewport detection to build performant, GPU-accelerated animations. Used Tailwind CSS for rapid styling with a consistent design system.",
    codeSnippet: `// Scroll-linked parallax animation
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"],
});

const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

return (
  <motion.div style={{ y, opacity }}>
    {children}
  </motion.div>
);`,
    outcomes: [
      { label: "Animations", value: "15+" },
      { label: "Performance", value: "60fps" },
      { label: "Responsive", value: "All Devices" },
      { label: "Lighthouse", value: "95+" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
    ],
  },
  {
    slug: "metaverse-website",
    title: "Metaverse Website",
    description: "A modern metaverse-themed landing page with immersive animations and interactive effects.",
    fullDescription: "Designed a modern metaverse-themed landing page with immersive animations using Next.js, Tailwind CSS, and Framer Motion. Features engaging visual effects and smooth transitions that create an otherworldly browsing experience.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    date: "Jan 2023",
    team: "Solo Project",
    client: "Personal",
    challenge: "Creating an immersive, futuristic web experience that captures the essence of the metaverse while keeping the site performant and accessible.",
    solution: "Combined Framer Motion's animation capabilities with creative CSS techniques to build layered parallax effects, dynamic gradients, and interactive hover states that respond to user interaction.",
    codeSnippet: `// Immersive hover effect
const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  const { left, top, width, height } =
    ref.current.getBoundingClientRect();
  const x = (clientX - left) / width - 0.5;
  const y = (clientY - top) / height - 0.5;

  controls.start({
    rotateX: y * 20,
    rotateY: x * 20,
    transition: { type: "spring", stiffness: 300 },
  });
};`,
    outcomes: [
      { label: "Visual Effects", value: "10+" },
      { label: "Load Time", value: "<2s" },
      { label: "Accessibility", value: "A11y Ready" },
      { label: "Mobile Optimized", value: "Yes" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=500&fit=crop",
    ],
  },
  {
    slug: "emoji-search-app",
    title: "Emoji Search App",
    description: "A React-based emoji search tool with real-time filtering and one-click clipboard copy.",
    fullDescription: "Built a React-based emoji search tool with real-time filtering and one-click clipboard copy functionality. Users can instantly search through thousands of emojis and copy them to clipboard with a single click.",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=600&fit=crop",
    tags: ["React", "JavaScript", "CSS"],
    date: "Jan 2023",
    team: "Solo Project",
    client: "Personal",
    challenge: "Building a fast, responsive search experience that filters through a large emoji dataset in real-time without lag or janky UI updates.",
    solution: "Implemented debounced search with optimized filtering algorithms. Used clipboard API for seamless copy functionality and added visual feedback for user interactions.",
    codeSnippet: `// Real-time emoji search with debounce
const [query, setQuery] = useState('');
const [results, setResults] = useState(allEmojis);

useEffect(() => {
  const timer = setTimeout(() => {
    const filtered = allEmojis.filter(emoji =>
      emoji.keywords.some(kw =>
        kw.toLowerCase().includes(query.toLowerCase())
      )
    );
    setResults(filtered);
  }, 150);
  return () => clearTimeout(timer);
}, [query]);

const copyToClipboard = async (emoji: string) => {
  await navigator.clipboard.writeText(emoji);
  toast.success('Copied!');
};`,
    outcomes: [
      { label: "Emojis Available", value: "1800+" },
      { label: "Search Speed", value: "<150ms" },
      { label: "Copy Method", value: "1-Click" },
      { label: "Filter Type", value: "Real-time" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, count = 3): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, count);
}

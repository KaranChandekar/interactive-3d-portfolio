export type ProjectCategory =
  | "All"
  | "AI Applications"
  | "Frontend Websites"
  | "Professional";

export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  thumbnail: string;
  heroImage: string;
  tags: string[];
  category: ProjectCategory;
  date: string;
  team: string;
  client: string;
  challenge: string;
  solution: string;
  codeSnippet: string;
  outcomes: { label: string; value: string }[];
  gallery: string[];
  liveUrl?: string;
}

export const categories: ProjectCategory[] = [
  "All",
  "AI Applications",
  "Frontend Websites",
  "Professional",
];

// Ordered from most impressive → least, so employers see the strongest work first
const projectSortOrder: string[] = [
  // Professional — real-world production SaaS
  "auto-salk",
  // AI apps — full-stack AI with complex architectures
  "smart-collaborative-editor",
  "browser-ai-research-agent",
  "generative-dashboard-builder",
  "ai-code-review-assistant",
  // Technically demanding 3D / WebGL
  "music-visualizer",
  "interactive-world-map",
  "webgl-shader-gallery",
  "ecommerce-product-showcase",
  // AI + data
  "ai-data-storyteller",
  "ai-design-system-generator",
  // Strong frontend / animation craft
  "scroll-storytelling",
  "creative-agency-landing",
  "data-viz-dashboard",
  "ai-interview-prep",
  // Showcases & libraries
  "cursor-micro-interactions",
  "animated-component-library",
  "generative-art-canvas",
  "modern-magazine-editorial",
  // Earlier projects
  "linear-clone",
  "metaverse-website",
  "emoji-search-app",
];

const _projects: Project[] = [
  // ── Professional Projects ──────────────────────────────────────────
  {
    slug: "auto-salk",
    title: "Auto Salk",
    description:
      "AI-powered communication platform providing calling, WhatsApp, and email agents for automotive dealerships.",
    fullDescription:
      "Built the full frontend for a multi-tenant SaaS platform providing AI-powered calling, WhatsApp, and email agents for automotive dealerships and service businesses across India, Australia, US, and New Zealand.",
    thumbnail:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "TanStack Query",
    ],
    category: "Professional",
    date: "2023 — Present",
    team: "Salk AI",
    client: "Salk AI",
    challenge:
      "Building a multi-tenant SaaS platform that handles AI-powered calling, WhatsApp, and email agents at scale for automotive dealerships across multiple countries with different regulations and payment systems.",
    solution:
      "Developed with Next.js, React, TypeScript, Tailwind CSS, Shadcn/ui, and TanStack Query. Integrated Stripe, Razorpay, SendGrid, LiveKit, and OpenAI APIs for a seamless multi-channel communication experience.",
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
    liveUrl: "https://salk.ai",
  },

  // ── Frontend Website Projects ──────────────────────────────────────
  {
    slug: "creative-agency-landing",
    title: "Creative Agency Landing",
    description:
      "Awwwards-quality creative agency landing page with kinetic typography, horizontal scroll, and morphing cursor.",
    fullDescription:
      "An Awwwards-quality creative agency landing page featuring kinetic typography, horizontal scroll showcases, custom morphing cursor, parallax effects, and smooth scroll with velocity-based skew. Built with Next.js, GSAP, and Tailwind CSS.",
    thumbnail: "/images/projects/creative-agency-landing/thumbnail.png",
    heroImage: "/images/projects/creative-agency-landing/thumbnail.png",
    tags: ["Next.js", "GSAP", "Tailwind CSS", "Zustand", "Lenis"],
    category: "Frontend Websites",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Creating an Awwwards-level agency landing page with smooth kinetic typography, horizontal scroll showcases, and a morphing cursor that feels premium and buttery smooth across all devices.",
    solution:
      "Leveraged GSAP for timeline-based animations, Lenis for momentum scroll, Zustand for state management, and custom cursor physics with spring-based interpolation for a studio-quality feel.",
    codeSnippet: `// Velocity-based skew on scroll
const skew = useRef(0);
lenis.on('scroll', ({ velocity }) => {
  const target = velocity * 0.15;
  skew.current += (target - skew.current) * 0.1;
  wrapper.style.transform = \`skewY(\${skew.current}deg)\`;
});`,
    outcomes: [
      { label: "Animations", value: "20+" },
      { label: "Performance", value: "60fps" },
      { label: "Lighthouse", value: "95+" },
      { label: "Responsive", value: "All Devices" },
    ],
    gallery: [
      "/images/projects/creative-agency-landing/thumbnail.png",
      "/images/projects/creative-agency-landing/screenshot-1.png",
      "/images/projects/creative-agency-landing/screenshot-2.png",
      "/images/projects/creative-agency-landing/screenshot-3.png",
    ],
    liveUrl: "https://creative-agency-landing-kc.vercel.app/",
  },
  {
    slug: "data-viz-dashboard",
    title: "Data Viz Dashboard",
    description:
      "Animated real-time data visualization dashboard with glassmorphism UI, animated charts, and drag-to-reorder widgets.",
    fullDescription:
      "An animated real-time data visualization dashboard featuring glassmorphism UI, animated charts with Recharts, number counters, drag-to-reorder widgets, and dark/light mode transitions. Built with Next.js, Framer Motion, and Zustand.",
    thumbnail: "/images/projects/data-viz-dashboard/thumbnail.png",
    heroImage: "/images/projects/data-viz-dashboard/thumbnail.png",
    tags: [
      "Next.js",
      "Recharts",
      "Framer Motion",
      "Zustand",
      "Tailwind CSS",
    ],
    category: "Frontend Websites",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Building a real-time analytics dashboard with smooth animated charts, glassmorphism effects, draggable widgets, and seamless dark/light mode transitions without layout shifts.",
    solution:
      "Used Recharts for data visualization, Framer Motion for layout animations and drag-to-reorder, Zustand for widget state management, and CSS backdrop-filter for glassmorphism effects.",
    codeSnippet: `// Animated number counter
function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
}`,
    outcomes: [
      { label: "Widgets", value: "12+" },
      { label: "Chart Types", value: "6" },
      { label: "Theme Modes", value: "Dark/Light" },
      { label: "Drag & Drop", value: "Yes" },
    ],
    gallery: [
      "/images/projects/data-viz-dashboard/thumbnail.png",
      "/images/projects/data-viz-dashboard/screenshot-1.png",
    ],
    liveUrl: "https://data-viz-dashboard-kc.vercel.app/",
  },
  {
    slug: "music-visualizer",
    title: "Music Visualizer",
    description:
      "Immersive music visualizer with real-time audio analysis, 3D frequency spectrum, and shader-based visual effects.",
    fullDescription:
      "An immersive music visualizer web app with real-time audio analysis using Tone.js, 3D frequency spectrum via Three.js, particle systems that react to beats, and shader-based visual effects. Built with Next.js and React Three Fiber.",
    thumbnail: "/images/projects/music-visualizer/thumbnail.png",
    heroImage: "/images/projects/music-visualizer/thumbnail.png",
    tags: [
      "Next.js",
      "Three.js",
      "React Three Fiber",
      "Tone.js",
      "GSAP",
      "Shaders",
    ],
    category: "Frontend Websites",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Building a real-time audio visualizer that synchronizes 3D graphics, particle systems, and shader effects with music in the browser at 60fps.",
    solution:
      "Used Tone.js Web Audio API for real-time FFT analysis, React Three Fiber for 3D rendering, custom GLSL shaders for visual effects, and GSAP for smooth transitions between visualizer modes.",
    codeSnippet: `// Real-time FFT audio analysis
const analyser = new Tone.Analyser('fft', 256);
player.connect(analyser);

useFrame(() => {
  const spectrum = analyser.getValue();
  bars.forEach((bar, i) => {
    const amplitude = (spectrum[i] + 140) / 140;
    bar.scale.y = lerp(bar.scale.y, amplitude * 5, 0.1);
  });
});`,
    outcomes: [
      { label: "Visual Modes", value: "5" },
      { label: "Audio Analysis", value: "Real-time" },
      { label: "3D Rendering", value: "WebGL" },
      { label: "Performance", value: "60fps" },
    ],
    gallery: [
      "/images/projects/music-visualizer/thumbnail.png",
      "/images/projects/music-visualizer/screenshot-1.png",
      "/images/projects/music-visualizer/screenshot-2.png",
      "/images/projects/music-visualizer/screenshot-3.png",
      "/images/projects/music-visualizer/screenshot-4.png",
    ],
    liveUrl: "https://music-visualizer-kc.vercel.app/",
  },
  {
    slug: "scroll-storytelling",
    title: "Scroll Storytelling",
    description:
      "Immersive scroll-driven storytelling with Apple-style pinned sections, video scrubbing, and parallax layers.",
    fullDescription:
      "An immersive scroll-driven storytelling website featuring Apple-style pinned sections, video scrubbing on scroll, typewriter text effects, parallax image layers, inline data visualizations with D3.js, and chapter transitions.",
    thumbnail: "/images/projects/scroll-storytelling/thumbnail.png",
    heroImage: "/images/projects/scroll-storytelling/thumbnail.png",
    tags: ["Next.js", "GSAP", "D3.js", "Framer Motion", "Lenis"],
    category: "Frontend Websites",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Building an Apple-quality scroll-driven narrative with pinned sections, synchronized video scrubbing, and inline data visualizations that feel like a premium editorial experience.",
    solution:
      "Used GSAP ScrollTrigger for pinned sections and video scrubbing, D3.js for inline data visualizations, Lenis for momentum scrolling, and Framer Motion for chapter transition animations.",
    codeSnippet: `// Video scrubbing synced to scroll
gsap.to(videoRef.current, {
  currentTime: videoRef.current.duration,
  ease: "none",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5,
    pin: true,
  },
});`,
    outcomes: [
      { label: "Chapters", value: "8" },
      { label: "Scroll Effects", value: "15+" },
      { label: "Data Viz", value: "D3.js" },
      { label: "Video Scrub", value: "On Scroll" },
    ],
    gallery: [
      "/images/projects/scroll-storytelling/thumbnail.png",
      "/images/projects/scroll-storytelling/screenshot-1.png",
      "/images/projects/scroll-storytelling/screenshot-2.png",
      "/images/projects/scroll-storytelling/screenshot-3.png",
      "/images/projects/scroll-storytelling/screenshot-4.png",
      "/images/projects/scroll-storytelling/screenshot-5.png",
      "/images/projects/scroll-storytelling/screenshot-6.png",
      "/images/projects/scroll-storytelling/screenshot-7.png",
    ],
    liveUrl: "https://scroll-storytelling.vercel.app/",
  },
  {
    slug: "animated-component-library",
    title: "Animated Component Library",
    description:
      "Live interactive playground with 20+ beautifully animated UI components and real-time prop editing.",
    fullDescription:
      "An animated UI component library with a live interactive playground, featuring 20+ beautifully animated components (magnetic buttons, spring modals, stagger toasts, sliding tabs, accordion, dropdown) with real-time prop editing and code snippets.",
    thumbnail: "/images/projects/animated-component-library/thumbnail.png",
    heroImage: "/images/projects/animated-component-library/thumbnail.png",
    tags: [
      "Next.js",
      "Framer Motion",
      "GSAP",
      "Radix UI",
      "Shiki",
      "Tailwind CSS",
    ],
    category: "Frontend Websites",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Building a component library playground where users can interact with 20+ animated components in real-time, edit props dynamically, and copy production-ready code.",
    solution:
      "Combined Framer Motion for component animations, GSAP for complex timelines, Radix UI for accessible primitives, and Shiki for syntax-highlighted code display with copy functionality.",
    codeSnippet: `// Spring modal with backdrop blur
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", damping: 25 }}
    >
      {children}
    </motion.div>
  )}
</AnimatePresence>`,
    outcomes: [
      { label: "Components", value: "20+" },
      { label: "Live Editing", value: "Real-time" },
      { label: "Accessibility", value: "Radix UI" },
      { label: "Code Snippets", value: "Copyable" },
    ],
    gallery: [
      "/images/projects/animated-component-library/thumbnail.png",
      "/images/projects/animated-component-library/screenshot-1.png",
      "/images/projects/animated-component-library/screenshot-2.png",
      "/images/projects/animated-component-library/screenshot-3.png",
    ],
    liveUrl: "https://animated-component-library.vercel.app/",
  },
  {
    slug: "webgl-shader-gallery",
    title: "WebGL Shader Gallery",
    description:
      "Virtual art gallery showcasing real-time WebGL shader effects — liquid distortions, ray marching, fractals, and noise landscapes.",
    fullDescription:
      "A virtual art gallery showcasing real-time WebGL shader effects including liquid distortions, ray marching, fractals, and noise landscapes, navigable through smooth scroll with mouse-reactive interactions.",
    thumbnail: "/images/projects/webgl-shader-gallery/thumbnail.png",
    heroImage: "/images/projects/webgl-shader-gallery/thumbnail.png",
    tags: [
      "Next.js",
      "Three.js",
      "React Three Fiber",
      "GLSL Shaders",
      "GSAP",
    ],
    category: "Frontend Websites",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Creating a gallery of real-time WebGL shader effects that are performant, visually stunning, and smoothly navigable with mouse-reactive interactions.",
    solution:
      "Built custom GLSL fragment and vertex shaders for each effect, used React Three Fiber for rendering, and GSAP ScrollTrigger for gallery navigation with smooth transitions between shader exhibits.",
    codeSnippet: `// Liquid distortion shader
uniform float uTime;
uniform vec2 uMouse;

void main() {
  vec2 uv = vUv;
  float dist = distance(uv, uMouse);
  float ripple = sin(dist * 20.0 - uTime * 3.0);
  uv += normalize(uv - uMouse) * ripple * 0.02;
  vec3 color = texture2D(uTexture, uv).rgb;
  gl_FragColor = vec4(color, 1.0);
}`,
    outcomes: [
      { label: "Shader Effects", value: "8+" },
      { label: "Rendering", value: "WebGL" },
      { label: "Mouse Reactive", value: "Yes" },
      { label: "Performance", value: "60fps" },
    ],
    gallery: [
      "/images/projects/webgl-shader-gallery/thumbnail.png",
      "/images/projects/webgl-shader-gallery/screenshot-1.png",
      "/images/projects/webgl-shader-gallery/screenshot-2.png",
      "/images/projects/webgl-shader-gallery/screenshot-3.png",
      "/images/projects/webgl-shader-gallery/screenshot-4.png",
      "/images/projects/webgl-shader-gallery/screenshot-5.png",
      "/images/projects/webgl-shader-gallery/screenshot-6.png",
      "/images/projects/webgl-shader-gallery/screenshot-7.png",
    ],
    liveUrl: "https://webgl-shader-gallery.vercel.app/",
  },
  {
    slug: "cursor-micro-interactions",
    title: "Cursor Micro-Interactions",
    description:
      "Showcase of advanced cursor effects — magnetic buttons, cursor trails, text repulsion, image distortion, and drag physics.",
    fullDescription:
      "A single-page showcase of advanced cursor effects and micro-interactions including magnetic buttons, cursor trails, text repulsion, image distortion on hover, ripple clicks, drag-and-drop physics, elastic scroll, and spotlight galleries.",
    thumbnail: "/images/projects/cursor-micro-interactions/thumbnail.png",
    heroImage: "/images/projects/cursor-micro-interactions/thumbnail.png",
    tags: ["Next.js", "Framer Motion", "GSAP", "Lenis", "Tailwind CSS"],
    category: "Frontend Websites",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Creating a diverse showcase of cursor-based micro-interactions that demonstrate advanced physics, magnetic effects, and visual feedback patterns across different UI contexts.",
    solution:
      "Used GSAP for physics-based cursor tracking, Framer Motion for spring animations, custom math for magnetic and repulsion effects, and Lenis for elastic scroll behavior.",
    codeSnippet: `// Magnetic button effect
const handleMouseMove = (e: MouseEvent) => {
  const { left, top, width, height } = btn.getBoundingClientRect();
  const x = e.clientX - (left + width / 2);
  const y = e.clientY - (top + height / 2);
  const distance = Math.sqrt(x * x + y * y);
  const strength = Math.max(0, 1 - distance / 150);
  gsap.to(btn, { x: x * strength * 0.4, y: y * strength * 0.4 });
};`,
    outcomes: [
      { label: "Interactions", value: "12+" },
      { label: "Cursor Effects", value: "8 Types" },
      { label: "Physics", value: "Spring-based" },
      { label: "Touch Support", value: "Fallbacks" },
    ],
    gallery: [
      "/images/projects/cursor-micro-interactions/thumbnail.png",
      "/images/projects/cursor-micro-interactions/screenshot-1.png",
      "/images/projects/cursor-micro-interactions/screenshot-2.png",
      "/images/projects/cursor-micro-interactions/screenshot-3.png",
      "/images/projects/cursor-micro-interactions/screenshot-4.png",
      "/images/projects/cursor-micro-interactions/screenshot-5.png",
      "/images/projects/cursor-micro-interactions/screenshot-6.png",
      "/images/projects/cursor-micro-interactions/screenshot-7.png",
    ],
    liveUrl: "https://cursor-micro-interactions.vercel.app/",
  },
  {
    slug: "modern-magazine-editorial",
    title: "Modern Magazine Editorial",
    description:
      "Digital magazine with editorial typography, asymmetric grid layouts, kinetic text, and 3D tilt article cards.",
    fullDescription:
      "A modern digital magazine featuring editorial typography, asymmetric CSS Grid layouts, kinetic text animations, scroll-triggered image reveals, 3D tilt article cards, infinite horizontal scroll, and dark/light mode with color morphing.",
    thumbnail: "/images/projects/modern-magazine-editorial/thumbnail.png",
    heroImage: "/images/projects/modern-magazine-editorial/thumbnail.png",
    tags: [
      "Next.js",
      "GSAP",
      "Framer Motion",
      "CSS Grid",
      "Tailwind CSS",
      "Typography",
    ],
    category: "Frontend Websites",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Designing a magazine-quality editorial layout with asymmetric grids, kinetic typography, and 3D card effects that feels like a premium print publication brought to life on the web.",
    solution:
      "Used advanced CSS Grid for asymmetric layouts, GSAP for kinetic text animations and scroll-triggered reveals, Framer Motion for 3D tilt cards, and custom color morphing for theme transitions.",
    codeSnippet: `// Kinetic text animation on scroll
gsap.fromTo(chars, {
  y: 100, opacity: 0, rotateX: -90,
}, {
  y: 0, opacity: 1, rotateX: 0,
  stagger: 0.03,
  scrollTrigger: {
    trigger: heading,
    start: "top 80%",
    end: "top 20%",
    scrub: 1,
  },
});`,
    outcomes: [
      { label: "Layout", value: "Asymmetric Grid" },
      { label: "Typography", value: "Kinetic" },
      { label: "Cards", value: "3D Tilt" },
      { label: "Themes", value: "Dark/Light" },
    ],
    gallery: [
      "/images/projects/modern-magazine-editorial/thumbnail.png",
      "/images/projects/modern-magazine-editorial/screenshot-1.png",
      "/images/projects/modern-magazine-editorial/screenshot-2.png",
      "/images/projects/modern-magazine-editorial/screenshot-3.png",
    ],
    liveUrl: "https://modern-magazine-editorial.vercel.app/",
  },
  {
    slug: "interactive-world-map",
    title: "Interactive World Map",
    description:
      "3D globe explorer with click-to-zoom navigation, real-time data overlays, animated data cards, and flight paths.",
    fullDescription:
      "An interactive 3D globe explorer with click-to-zoom country navigation, real-time data overlays (population, weather, GDP), animated data cards, flight path particles, and day/night cycle visualization.",
    thumbnail: "/images/projects/interactive-world-map/thumbnail.png",
    heroImage: "/images/projects/interactive-world-map/thumbnail.png",
    tags: [
      "Next.js",
      "Three.js",
      "React Three Fiber",
      "Recharts",
      "Zustand",
      "Framer Motion",
    ],
    category: "Frontend Websites",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Building an interactive 3D globe with click-to-zoom navigation, real-time data overlays, and smooth flight path animations while maintaining performance.",
    solution:
      "Used React Three Fiber for 3D globe rendering, custom shaders for day/night cycle, Zustand for country selection state, Recharts for data cards, and Framer Motion for panel transitions.",
    codeSnippet: `// Click-to-zoom country navigation
const handleCountryClick = (country: Country) => {
  const { lat, lng } = country.coordinates;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const target = new THREE.Vector3(
    -Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta)
  );
  gsap.to(camera.position, {
    ...target.multiplyScalar(2),
    duration: 1.5, ease: "power3.inOut",
  });
};`,
    outcomes: [
      { label: "Countries", value: "195" },
      { label: "Data Overlays", value: "3 Types" },
      { label: "3D Globe", value: "Interactive" },
      { label: "Day/Night", value: "Real-time" },
    ],
    gallery: [
      "/images/projects/interactive-world-map/thumbnail.png",
      "/images/projects/interactive-world-map/screenshot-1.png",
      "/images/projects/interactive-world-map/screenshot-2.png",
      "/images/projects/interactive-world-map/screenshot-3.png",
      "/images/projects/interactive-world-map/screenshot-4.png",
    ],
    liveUrl: "https://interactive-world-map-kc.vercel.app/",
  },
  {
    slug: "generative-art-canvas",
    title: "Generative Art Canvas",
    description:
      "Create real-time procedural art through sliders, presets, and randomization — particle systems, fractals, and flow fields.",
    fullDescription:
      "A generative art canvas web app where users create real-time procedural art through sliders, presets, and randomization — featuring particle systems, fractal patterns, flow fields, and exportable high-res output using p5.js.",
    thumbnail: "/images/projects/generative-art-canvas/thumbnail.png",
    heroImage: "/images/projects/generative-art-canvas/thumbnail.png",
    tags: [
      "Next.js",
      "p5.js",
      "Simplex Noise",
      "Framer Motion",
      "Zustand",
      "Tailwind CSS",
    ],
    category: "Frontend Websites",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Building a generative art tool that lets users create and customize procedural art in real-time with intuitive controls and high-res export capabilities.",
    solution:
      "Used p5.js for canvas rendering, Simplex Noise for organic flow fields, Zustand for parameter state management, and Framer Motion for UI panel animations with file-saver for PNG export.",
    codeSnippet: `// Flow field particle system
function drawFlowField(p: p5) {
  particles.forEach((particle) => {
    const angle = noise(
      particle.x * noiseScale,
      particle.y * noiseScale,
      frameCount * 0.005
    ) * TWO_PI * 2;
    particle.vx += cos(angle) * 0.2;
    particle.vy += sin(angle) * 0.2;
    particle.x += particle.vx;
    particle.y += particle.vy;
    p.point(particle.x, particle.y);
  });
}`,
    outcomes: [
      { label: "Art Modes", value: "5+" },
      { label: "Export", value: "Hi-Res PNG" },
      { label: "Presets", value: "10+" },
      { label: "Real-time", value: "Interactive" },
    ],
    gallery: [
      "/images/projects/generative-art-canvas/thumbnail.png",
      "/images/projects/generative-art-canvas/screenshot-1.png",
      "/images/projects/generative-art-canvas/screenshot-2.png",
      "/images/projects/generative-art-canvas/screenshot-3.png",
      "/images/projects/generative-art-canvas/screenshot-4.png",
      "/images/projects/generative-art-canvas/screenshot-5.png",
    ],
    liveUrl: "https://generative-art-canvas.vercel.app/",
  },
  {
    slug: "ecommerce-product-showcase",
    title: "E-Commerce Showcase",
    description:
      "Premium animated e-commerce product showcase with 3D product viewers, color morphing, and add-to-cart animations.",
    fullDescription:
      "A premium animated e-commerce product showcase featuring 3D product viewers with React Three Fiber, color variant morphing, add-to-cart fly animations, swipe galleries with spring physics, and scroll-triggered feature highlights.",
    thumbnail: "/images/projects/ecommerce-product-showcase/thumbnail.png",
    heroImage: "/images/projects/ecommerce-product-showcase/thumbnail.png",
    tags: [
      "Next.js",
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "Framer Motion",
      "Tailwind CSS",
    ],
    category: "Frontend Websites",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Creating a premium e-commerce experience with interactive 3D product viewers, smooth color variant transitions, and physics-based cart animations.",
    solution:
      "Leveraged React Three Fiber for interactive 3D product models, GSAP for scroll-triggered animations, Framer Motion for spring-based swipe galleries, and custom shaders for color morphing effects.",
    codeSnippet: `// 3D product viewer with orbit controls
<Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
  <ambientLight intensity={0.5} />
  <spotLight position={[10, 10, 10]} />
  <Suspense fallback={null}>
    <ProductModel
      color={selectedColor}
      rotation={autoRotate ? [0, time * 0.5, 0] : undefined}
    />
    <OrbitControls enableZoom={false} />
  </Suspense>
</Canvas>`,
    outcomes: [
      { label: "3D Products", value: "Interactive" },
      { label: "Color Variants", value: "Morphing" },
      { label: "Cart Animation", value: "Fly Effect" },
      { label: "Gallery", value: "Spring Physics" },
    ],
    gallery: [
      "/images/projects/ecommerce-product-showcase/thumbnail.png",
      "/images/projects/ecommerce-product-showcase/screenshot-2.png",
      "/images/projects/ecommerce-product-showcase/screenshot-3.png",
      "/images/projects/ecommerce-product-showcase/screenshot-4.png",
    ],
    liveUrl: "https://ecommerce-product-showcase-kc.vercel.app/",
  },

  // ── Existing Projects ──────────────────────────────────────────────
  {
    slug: "linear-clone",
    title: "Linear Clone",
    description:
      "A pixel-perfect recreation of Linear.app's landing page with complex scroll animations.",
    fullDescription:
      "Rebuilt Linear.app's landing page with Next.js, Tailwind CSS, and Framer Motion, replicating complex scroll animations and responsive layouts with attention to every detail.",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Frontend Websites",
    date: "Feb 2023",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Recreating Linear's sophisticated scroll-driven animations and fluid transitions while maintaining performance and responsiveness across all device sizes.",
    solution:
      "Leveraged Framer Motion's scroll-linked animations and viewport detection to build performant, GPU-accelerated animations. Used Tailwind CSS for rapid styling with a consistent design system.",
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
    description:
      "A modern metaverse-themed landing page with immersive animations and interactive effects.",
    fullDescription:
      "Designed a modern metaverse-themed landing page with immersive animations using Next.js, Tailwind CSS, and Framer Motion. Features engaging visual effects and smooth transitions that create an otherworldly browsing experience.",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Frontend Websites",
    date: "Jan 2023",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Creating an immersive, futuristic web experience that captures the essence of the metaverse while keeping the site performant and accessible.",
    solution:
      "Combined Framer Motion's animation capabilities with creative CSS techniques to build layered parallax effects, dynamic gradients, and interactive hover states that respond to user interaction.",
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
    description:
      "A React-based emoji search tool with real-time filtering and one-click clipboard copy.",
    fullDescription:
      "Built a React-based emoji search tool with real-time filtering and one-click clipboard copy functionality. Users can instantly search through thousands of emojis and copy them to clipboard with a single click.",
    thumbnail:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=600&fit=crop",
    tags: ["React", "JavaScript", "CSS"],
    category: "Frontend Websites",
    date: "Jan 2023",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Building a fast, responsive search experience that filters through a large emoji dataset in real-time without lag or janky UI updates.",
    solution:
      "Implemented debounced search with optimized filtering algorithms. Used clipboard API for seamless copy functionality and added visual feedback for user interactions.",
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

  // ── AI Application Projects ────────────────────────────────────────
  {
    slug: "ai-code-review-assistant",
    title: "AI Code Review Assistant",
    description:
      "AI-powered code review tool that analyzes code for bugs, security vulnerabilities, and performance issues with diff previews.",
    fullDescription:
      "An AI-powered code review and architecture assistant that analyzes code for bugs, security vulnerabilities, performance issues, and suggests fixes with diff previews. Built with Next.js and Claude API.",
    thumbnail: "/images/projects/ai-code-review-assistant/thumbnail.png",
    heroImage: "/images/projects/ai-code-review-assistant/thumbnail.png",
    tags: ["Next.js", "Claude API", "TypeScript", "Monaco Editor", "Tailwind CSS"],
    category: "AI Applications",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Building an intelligent code review tool that can detect bugs, security issues, and suggest architectural improvements with inline diff previews.",
    solution:
      "Integrated Claude API for code analysis, Monaco Editor for syntax-highlighted code input, and built a custom diff viewer to display suggested fixes alongside original code.",
    codeSnippet: `// AI code analysis pipeline
const analysis = await claude.messages.create({
  model: "claude-sonnet-4-20250514",
  messages: [{
    role: "user",
    content: \`Review this code for bugs, security,
    and performance:\\n\${code}\`
  }],
  system: "You are a senior code reviewer...",
});
const suggestions = parseSuggestions(analysis);
return { bugs, security, performance: suggestions };`,
    outcomes: [
      { label: "Analysis Types", value: "4" },
      { label: "Languages", value: "10+" },
      { label: "Diff Preview", value: "Inline" },
      { label: "AI Model", value: "Claude" },
    ],
    gallery: [
      "/images/projects/ai-code-review-assistant/thumbnail.png",
      "/images/projects/ai-code-review-assistant/screenshot-1.png",
    ],
    liveUrl: "https://ai-code-review-assistant-kc.vercel.app/",
  },
  {
    slug: "ai-data-storyteller",
    title: "AI Data Storyteller",
    description:
      "Transform CSV/Excel uploads into interactive narratives with auto-generated charts and AI-driven insights.",
    fullDescription:
      "An AI data storyteller that transforms CSV/Excel uploads into interactive narratives with auto-generated charts, key insights extraction, and natural language explanations of trends and patterns.",
    thumbnail: "/images/projects/ai-data-storyteller/thumbnail.png",
    heroImage: "/images/projects/ai-data-storyteller/thumbnail.png",
    tags: [
      "Next.js",
      "Claude API",
      "Recharts",
      "TypeScript",
      "Papa Parse",
      "Tailwind CSS",
    ],
    category: "AI Applications",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Automatically analyzing uploaded datasets to generate meaningful narratives, select appropriate chart types, and extract non-obvious insights from data.",
    solution:
      "Used Papa Parse for CSV processing, Claude API for data analysis and narrative generation, Recharts for auto-generated visualizations, and streaming for real-time story building.",
    codeSnippet: `// Auto-generate chart from data analysis
const analysis = await analyzeDataset(parsedCSV);
const charts = analysis.insights.map(insight => ({
  type: insight.bestChartType, // 'bar' | 'line' | 'pie'
  data: insight.relevantData,
  title: insight.headline,
  narrative: insight.explanation,
}));`,
    outcomes: [
      { label: "File Types", value: "CSV/Excel" },
      { label: "Chart Types", value: "Auto-select" },
      { label: "Insights", value: "AI-driven" },
      { label: "Narratives", value: "Interactive" },
    ],
    gallery: [
      "/images/projects/ai-data-storyteller/thumbnail.png",
      "/images/projects/ai-data-storyteller/screenshot-1.png",
      "/images/projects/ai-data-storyteller/screenshot-2.png",
      "/images/projects/ai-data-storyteller/screenshot-3.png",
      "/images/projects/ai-data-storyteller/screenshot-4.png",
    ],
    liveUrl: "https://ai-data-storyteller.vercel.app/",
  },
  {
    slug: "ai-design-system-generator",
    title: "AI Design System Generator",
    description:
      "Generate complete design systems from brand descriptions — color palettes, typography scales, and component previews.",
    fullDescription:
      "An AI design system generator that creates complete design systems from brand descriptions — color palettes with accessibility ratings, typography scales, component previews, and exportable Tailwind configs.",
    thumbnail: "/images/projects/ai-design-system-generative/thumbnail.png",
    heroImage: "/images/projects/ai-design-system-generative/thumbnail.png",
    tags: [
      "Next.js",
      "Claude API",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    category: "AI Applications",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Generating cohesive design systems from natural language brand descriptions that include accessible color palettes, harmonious typography, and production-ready component previews.",
    solution:
      "Used Claude API for brand analysis and design token generation, built a real-time preview system for components, implemented WCAG contrast checking, and Tailwind config export.",
    codeSnippet: `// Generate design tokens from brand description
const designSystem = await generateDesignSystem({
  brandDescription: "Modern fintech, trustworthy...",
  preferences: { style: "minimal", mood: "professional" },
});
// Returns: colors, typography, spacing, components
const { palette, fonts, scale } = designSystem;
const tailwindConfig = exportToTailwind(designSystem);`,
    outcomes: [
      { label: "Tokens", value: "Color/Type/Space" },
      { label: "Accessibility", value: "WCAG AA" },
      { label: "Export", value: "Tailwind Config" },
      { label: "Preview", value: "Live Components" },
    ],
    gallery: [
      "/images/projects/ai-design-system-generative/thumbnail.png",
      "/images/projects/ai-design-system-generative/screenshot-1.png",
    ],
    liveUrl: "https://ai-design-system-generator.vercel.app/",
  },
  {
    slug: "ai-interview-prep",
    title: "AI Interview Prep",
    description:
      "AI-powered mock interview platform with adaptive difficulty, voice mode, and performance analytics.",
    fullDescription:
      "An AI-powered mock interview platform featuring adaptive difficulty that adjusts to user performance, voice mode for realistic practice, and detailed performance analytics with improvement suggestions.",
    thumbnail: "/images/projects/ai-interview-prep/thumbnail.png",
    heroImage: "/images/projects/ai-interview-prep/thumbnail.png",
    tags: [
      "Next.js",
      "Claude API",
      "Web Speech API",
      "Recharts",
      "TypeScript",
      "Tailwind CSS",
    ],
    category: "AI Applications",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Creating a realistic mock interview experience with adaptive questioning, voice interaction, and meaningful performance analytics.",
    solution:
      "Used Claude API for dynamic question generation and response evaluation, Web Speech API for voice mode, and Recharts for performance analytics dashboards.",
    codeSnippet: `// Adaptive interview question generation
const nextQuestion = await generateQuestion({
  role: selectedRole,
  difficulty: adaptiveDifficulty,
  previousAnswers: sessionHistory,
  weakAreas: analytics.weakPoints,
});
// Difficulty adjusts based on answer quality
adaptiveDifficulty += response.score > 7 ? 0.5 : -0.3;`,
    outcomes: [
      { label: "Question Types", value: "Behavioral/Technical" },
      { label: "Voice Mode", value: "Speech API" },
      { label: "Analytics", value: "Detailed" },
      { label: "Difficulty", value: "Adaptive" },
    ],
    gallery: [
      "/images/projects/ai-interview-prep/thumbnail.png",
      "/images/projects/ai-interview-prep/screenshot-1.png",
    ],
    liveUrl: "https://ai-interview-prep-kc.vercel.app/",
  },
  {
    slug: "browser-ai-research-agent",
    title: "Browser AI Research Agent",
    description:
      "Autonomous AI research agent that searches, reads, and synthesizes multiple sources into cited reports.",
    fullDescription:
      "An autonomous AI research agent that searches the web, reads and comprehends multiple sources, and synthesizes findings into well-cited reports with visible reasoning and source tracking.",
    thumbnail: "/images/projects/browser-ai-research-agent/thumbnail.png",
    heroImage: "/images/projects/browser-ai-research-agent/thumbnail.png",
    tags: [
      "Next.js",
      "Claude API",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
    ],
    category: "AI Applications",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Building an autonomous research agent that can search, read, and synthesize information from multiple sources while showing its reasoning process transparently.",
    solution:
      "Used Claude API with tool use for autonomous research loops, built a visible reasoning chain UI, implemented source citation tracking, and streaming output for real-time report generation.",
    codeSnippet: `// Autonomous research loop
async function researchTopic(query: string) {
  const plan = await agent.plan(query);
  for (const step of plan.steps) {
    const sources = await agent.search(step.query);
    const insights = await agent.analyze(sources);
    report.addSection(step.title, insights, sources);
    yield { type: 'progress', step, insights };
  }
  return agent.synthesize(report);
}`,
    outcomes: [
      { label: "Research", value: "Autonomous" },
      { label: "Sources", value: "Multi-source" },
      { label: "Citations", value: "Auto-tracked" },
      { label: "Reasoning", value: "Visible Chain" },
    ],
    gallery: [
      "/images/projects/browser-ai-research-agent/thumbnail.png",
      "/images/projects/browser-ai-research-agent/screenshot-1.png",
    ],
    liveUrl: "https://browser-ai-research-agent.vercel.app/",
  },
  {
    slug: "generative-dashboard-builder",
    title: "Generative Dashboard Builder",
    description:
      "Describe dashboards in natural language and AI streams fully interactive charts, KPIs, and layouts in real-time.",
    fullDescription:
      "An AI-powered generative dashboard builder where users describe dashboards in natural language and the AI streams fully interactive charts, KPIs, and layouts in real-time using Claude API.",
    thumbnail: "/images/projects/generative-dashboard-builder/thumbnail.png",
    heroImage: "/images/projects/generative-dashboard-builder/thumbnail.png",
    tags: [
      "Next.js",
      "Claude API",
      "Recharts",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
    ],
    category: "AI Applications",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Building a system where natural language descriptions are transformed into fully interactive, real-time dashboards with appropriate chart types and layouts.",
    solution:
      "Used Claude API for natural language understanding and dashboard schema generation, Recharts for chart rendering, and streaming for real-time dashboard assembly with Framer Motion transitions.",
    codeSnippet: `// Natural language to dashboard
const schema = await claude.messages.create({
  messages: [{
    role: "user",
    content: "Sales dashboard with monthly revenue,
    top products, and regional breakdown"
  }],
  stream: true,
});
// Streams: { widgets: [KPI, BarChart, PieChart, ...] }
for await (const chunk of schema) {
  dashboard.addWidget(chunk.widget);
}`,
    outcomes: [
      { label: "Input", value: "Natural Language" },
      { label: "Output", value: "Interactive Dashboard" },
      { label: "Charts", value: "Auto-generated" },
      { label: "Streaming", value: "Real-time" },
    ],
    gallery: [
      "/images/projects/generative-dashboard-builder/thumbnail.png",
      "/images/projects/generative-dashboard-builder/screenshot-1.png",
    ],
    liveUrl: "https://generative-dashboard-builder.vercel.app/",
  },
  {
    slug: "smart-collaborative-editor",
    title: "Smart Collaborative Editor",
    description:
      "AI-enhanced collaborative document editor with block-based editing, inline AI suggestions, and real-time collaboration.",
    fullDescription:
      "An AI-enhanced collaborative document editor featuring block-based editing (like Notion), inline AI suggestions for writing improvement, and real-time collaboration via Yjs CRDT.",
    thumbnail: "/images/projects/smart-collaborative-editor/thumbnail.png",
    heroImage: "/images/projects/smart-collaborative-editor/thumbnail.png",
    tags: [
      "Next.js",
      "Claude API",
      "Yjs",
      "TypeScript",
      "Tiptap",
      "Tailwind CSS",
    ],
    category: "AI Applications",
    date: "Mar 2026",
    team: "Solo Project",
    client: "Personal",
    challenge:
      "Building a Notion-like block editor with real-time multi-user collaboration and intelligent inline AI suggestions that enhance writing without disrupting flow.",
    solution:
      "Used Tiptap for block-based editing, Yjs for CRDT-based real-time collaboration, Claude API for inline writing suggestions, and WebSocket for live cursor sharing.",
    codeSnippet: `// Real-time collaboration with Yjs
const ydoc = new Y.Doc();
const provider = new WebsocketProvider(wsUrl, docId, ydoc);
const editor = useEditor({
  extensions: [
    StarterKit,
    Collaboration.configure({ document: ydoc }),
    CollaborationCursor.configure({
      provider,
      user: { name, color },
    }),
    AISuggestion.configure({ model: 'claude' }),
  ],
});`,
    outcomes: [
      { label: "Editor", value: "Block-based" },
      { label: "Collaboration", value: "Real-time (Yjs)" },
      { label: "AI", value: "Inline Suggestions" },
      { label: "Blocks", value: "15+ Types" },
    ],
    gallery: [
      "/images/projects/smart-collaborative-editor/thumbnail.png",
      "/images/projects/smart-collaborative-editor/screenshot-1.png",
      "/images/projects/smart-collaborative-editor/screenshot-2.png",
      "/images/projects/smart-collaborative-editor/screenshot-3.png",
    ],
    liveUrl: "https://smart-collaborative-editor.vercel.app/",
  },
];

// Sort projects by the defined order (most impressive first)
export const projects: Project[] = [..._projects].sort((a, b) => {
  const ai = projectSortOrder.indexOf(a.slug);
  const bi = projectSortOrder.indexOf(b.slug);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
});

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, count = 3): Project[] {
  const current = projects.find((p) => p.slug === currentSlug);
  if (!current) return projects.slice(0, count);

  const sameCategory = projects.filter(
    (p) => p.slug !== currentSlug && p.category === current.category
  );
  const others = projects.filter(
    (p) => p.slug !== currentSlug && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, count);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  if (category === "All") return projects;
  return projects.filter((p) => p.category === category);
}

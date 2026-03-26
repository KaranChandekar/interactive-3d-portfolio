# Interactive 3D Portfolio

A modern, immersive portfolio website built with Next.js 15, featuring a real-time 3D scene, scroll-driven animations, and a custom magnetic cursor. Designed to showcase creative development work with smooth, 60fps interactions.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=flat-square&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)

## Features

- **3D Hero Scene** — React Three Fiber canvas with floating geometric shapes (icosahedron, torus, octahedron), mouse-tracking quaternion rotation, parallax depth layers, and a particle field background
- **GSAP ScrollTrigger Animations** — Character-level split-text reveals, animated skill bars with counting numbers, scroll-pinned elements, and reversible scroll animations
- **Custom Magnetic Cursor** — Desktop-only circular cursor that follows the mouse with spring physics, scales on hover, shows contextual labels, and morphs over project cards
- **Framer Motion Transitions** — Page enter/exit animations, staggered card reveals, parallax depth layers in the About section, and smooth component-level motion
- **Lenis Smooth Scroll** — Momentum-based scrolling integrated with GSAP ScrollTrigger for synchronized scroll-driven animations
- **Project Showcase** — 3D tilt cards with perspective transforms, hover glow effects, image overlays, and staggered tag animations. Each project links to a full detail page
- **Project Detail Pages** — Dynamic `/projects/[slug]` routes with parallax hero images, code snippet displays, outcome metrics, image gallery carousel, and related projects
- **Contact Form** — Floating label inputs, animated border focus states, real-time validation with shake feedback, loading/success states, and character counter
- **Glassmorphism Navbar** — Fixed navigation with backdrop blur, animated underline links, and a mobile slide-in menu with staggered items
- **Animated Preloader** — GSAP-powered 0-100% counter with loading bar and slide-up exit transition
- **Responsive Design** — Full 3D on desktop, simplified on tablet, 2D SVG fallback on mobile with `prefers-reduced-motion` support
- **Visual Polish** — Noise texture overlay, gradient section dividers, custom scrollbar, gradient text, and card glow effects

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| 3D Graphics | Three.js, React Three Fiber, Drei |
| Scroll Animations | GSAP 3.12+ with ScrollTrigger |
| Component Animation | Framer Motion |
| Smooth Scroll | Lenis |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React + Custom SVGs |
| Fonts | Space Grotesk, JetBrains Mono (Google Fonts) |

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/KaranChandekar/interactive-3d-portfolio.git
cd interactive-3d-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css                 # Tailwind v4 theme, utilities, effects
│   ├── layout.tsx                  # Root layout with fonts
│   ├── page.tsx                    # Home page (all sections)
│   └── projects/[slug]/page.tsx    # Dynamic project detail pages
├── components/
│   ├── layout/                     # Navbar, Footer, Preloader, Cursor, SmoothScroll
│   ├── sections/                   # Hero, Projects, About, Contact
│   ├── three/                      # R3F 3D scene
│   └── ui/                         # SplitText, MagneticButton, SocialIcons
├── data/
│   └── projects.ts                 # Project data and helpers
└── lib/
    ├── fonts.ts                    # Google Fonts config
    └── utils.ts                    # Utility functions
```

## Customization

- **Personal info** — Update name, bio, and contact details in the section components
- **Projects** — Edit `src/data/projects.ts` with your own projects, images, and descriptions
- **Colors** — Modify CSS variables in `src/app/globals.css` under `@theme inline`
- **Resume** — Replace `public/resume.pdf` with your actual resume

## Deployment

Optimized for [Vercel](https://vercel.com):

```bash
npm run build   # Verify build succeeds
vercel deploy   # Deploy to Vercel
```

## License

This project is open source and available under the [MIT License](LICENSE).

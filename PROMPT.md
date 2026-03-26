Build me a modern interactive 3D portfolio website from scratch using Next.js 15 with App Router, React Three Fiber, GSAP with ScrollTrigger, Framer Motion, Lenis smooth scroll, and Tailwind CSS v4.

**Project Requirements:**

**Tech Stack & Setup**
- Next.js 15 with App Router and TypeScript
- Three.js + React Three Fiber + Drei for 3D graphics
- GSAP 3.12+ with ScrollTrigger plugin for scroll-triggered animations
- Framer Motion for component-level animations
- Lenis for smooth scrolling that syncs with GSAP
- Tailwind CSS v4 with custom configuration
- Proper TypeScript types throughout (@types/three, @types/node)

**Hero Section (Above the Fold)**
- Full-screen 3D canvas using React Three Fiber
- Three rotating geometric shapes: icosahedron, torus, octahedron
- Shapes use semi-transparent materials with subtle colors (blue, purple, pink gradients)
- Mouse tracking: shapes rotate based on cursor position using quaternion interpolation
- Floating animation using Drei's `<Float>` component with random seed per shape
- Scroll-pinned canvas: use GSAP ScrollTrigger `pin: true` to keep canvas fixed while user scrolls
- Camera animation: camera moves and rotates through 3D space as user scrolls down the page
- Parallax effect: background shapes move at different speeds than foreground shapes
- Hero text overlay: "Hello, I'm [Name]" with split-text character reveal animation
- CTA button with magnetic hover effect

**Custom Magnetic Cursor**
- Replace default cursor on desktop (cursor-none via Tailwind)
- Circular cursor element that smoothly follows mouse with GSAP
- Cursor scales up when hovering over interactive elements (links, buttons, cards)
- Cursor changes color on hover over projects (accent color)
- Text labels appear in cursor when hovering links
- On project cards, cursor morphs to arrow icon
- Fade out smoothly when mouse leaves viewport
- Disable on tablet/mobile devices
- Cursor position tracked with 50px proximity detection radius

**Text Animations & Typography**
- All headings use Space Grotesk font from Google Fonts
- Code/technical text uses JetBrains Mono
- Implement GSAP SplitText character-level animations:
  - Characters animate in from opacity 0, translateY(20px)
  - Staggered with 0.05s delay between characters
  - Triggered on scroll using ScrollTrigger
  - Animations run bottom-to-top, right-to-left, or center-outward (vary per section)
  - Characters start rotated -5deg, animate to 0deg rotation
  - Reverse animations when scrolling backward
- Body text with optional line-by-line fade-in on first scroll into view

**Project Showcase Section**
- Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- Feature 6-8 projects (mock data or real projects)
- Each card displays: thumbnail image, project title, 2-line description, 3-5 tech tags, "View" button
- Hover effects on desktop:
  - Card scales to 1.05 with smooth easing
  - 3D tilt effect: card rotates based on mouse position relative to card center
    - Calculate tilt: rotateX/Y based on (mouseY - cardY) / cardHeight
    - Perspective 1000px on card parent
    - Smooth 0.3s transitions
  - Image brightness increases 20%
  - Border color animates to accent color
- Hover card: displays overlay with full description and "View Project" link
- Tags animate in with staggered Framer Motion container-item pattern
- Clicking a project navigates to `/projects/[slug]` detail page

**About Section**
- Parallax depth layers with 3 distinct layers moving at different scroll speeds:
  - Background layer: 0.3x scroll speed (slowest)
  - Mid-layer: 0.6x scroll speed
  - Content layer: 1x scroll speed (normal)
- Use Framer Motion `useScroll` with `useTransform` for parallax math
- Left side: animated images/shapes for each layer
- Right side: content sections
  - Headline "About Me" with character reveal animation
  - Biography paragraph (50-100 words) with line-by-line fade-in
  - Skills section: animated horizontal bar chart
    - 8-10 skills with proficiency bars
    - Bars animate width from 0 to full value over 1.2s on scroll into view
    - Each bar staggered 0.1s apart
    - Percentage labels animate from 0 to final value (e.g., 95)
    - Use GSAP `fromTo` with `modifiers.attr` for number animation
  - Experience timeline: 3-4 roles with dates, company, description
    - Connecting vertical line animates in on scroll
    - Each item fades and slides in from left with staggered delay
  - Certifications/Awards with hover flip cards

**Contact Section**
- Headline with split-text reveal
- Contact form with smooth interactions:
  - Input fields: Name, Email, Message (textarea)
  - Floating labels: labels float up (-24px) on input focus
  - Bottom border animates in from left (scaleX 0 → 1) on focus
  - Focus state: background lightens, border color changes to accent
  - Textarea with character counter (shows current/max characters)
  - Placeholder text with reduced opacity
- Form button:
  - Default state: solid background with text
  - Hover state: background color deepens, subtle shadow
  - Active/loading: button disables, spinner icon appears, text changes to "Sending..."
  - Success state: checkmark icon fades in, success message appears below button
  - Fade out success message after 3 seconds
- Form validation:
  - Show error message below field with red color if invalid on blur
  - Show checkmark icon next to valid fields (green)
  - Shake animation on invalid form submission (GSAP `shakeX`)
- Contact info displayed: email, phone, social links (GitHub, LinkedIn, Twitter)
- Social links have hover animations: icon rotates, background appears/animates

**Page Transitions & Routing**
- Each project has a detail page at `/projects/[slug]`
- Detail page includes:
  - Hero image with parallax and overlay gradient
  - Project title and metadata (date, team, client)
  - Problem/challenge section
  - Solution/approach section with code snippet display
  - Tech stack section with icon badges
  - Outcomes/results section with metrics/numbers
  - Gallery carousel with smooth transitions between images
  - Related projects carousel at bottom (3-4 projects)
- Framer Motion page transitions:
  - Page exit: fade out + slide up 20px
  - Page enter: fade in + slide down 20px with 0.2s delay
  - Use `AnimatePresence` with `mode="wait"`
  - Shared element transition for project images between list and detail view
- Back button with animated chevron icon that slides left on hover

**Navbar & Navigation**
- Fixed/sticky navbar at top with semi-transparent background (glassmorphism)
- Logo/name on left that links to home
- Navigation links: Home, Projects, About, Contact, Resume
- Links have underline animation on hover (borderBottom scaleX 0 → 1)
- Mobile hamburger menu that animates from bars (≡) to X (✕)
- Mobile menu slides in from right with overlay fade
- Active page indicator (dot or underline) animates to current nav item

**Preloader**
- Show on initial page load
- Animated counter from 0 to 100% (1-2 second duration)
- Design: centered counter with loading bar underneath
- On complete: fade out with slide-up transition
- Hide after first load (not on every page nav)

**Smooth Scroll Integration**
- Lenis smooth scrolling enabled globally
- Momentum and easing for natural feel
- Integrate with GSAP ScrollTrigger:
  ```javascript
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  ```
- Scroll velocity affects certain animations (e.g., skew effect on content sections)

**Responsive Design**
- Desktop (1024px+): Full 3D experience, magnetic cursor active, hover effects enabled
- Tablet (768px-1023px): Reduced 3D complexity, disable magnetic cursor, simpler animations
- Mobile (<768px): No 3D Three.js scene, fallback to 2D animated SVG hero, vertical-only layout
  - All cards stack vertically
  - Disable transform-based hover effects
  - Tap targets minimum 44x44px
  - Respects `prefers-reduced-motion` system setting for accessibility
  - Simplify animations: shorter durations, fewer staggered elements

**Performance Optimization**
- Lazy load 3D scene using Next.js `dynamic` with `ssr: false`
- Use Suspense with fallback loading state during 3D scene load
- Optimize images with `next/image` for responsive sizing and lazy loading
- Code-split route components
- Memoize expensive 3D components with `React.memo`
- GSAP animation framing: use `useGSAP` hook for proper context management
- Three.js: set `antialias: true`, cap `dpr` to 2, dispose of unused geometries/materials
- CSS GPU acceleration: `will-change: transform`, `transform: translateZ(0)` on animated elements
- Debounce scroll events
- Preload critical assets (hero image, fonts)
- Target Lighthouse score: >80 on desktop, >70 on mobile
- Final JS bundle size: <200KB gzipped

**Design & Styling**
- Color scheme:
  - Background: `#0f0f1e` (very dark blue)
  - Text: `#f5f0e8` (cream/off-white)
  - Accent: `#7c3aed` (purple) or `#06b6d4` (cyan) — choose one
  - Borders/dividers: `rgba(255, 255, 255, 0.1)`
- Tailwind CSS custom configuration:
  - Extend theme with custom spacing, colors, fonts
  - Use CSS variables for theme switching (if dark/light mode added later)
  - Custom utility classes for common animation patterns
- Typography scale: 12px base, 1.25 modular scale
- Spacing: 4px base unit (Tailwind default)
- Border radius: 12px default, 20px for cards
- Shadows: Subtle, layered (multiple box-shadows for depth)

**Free Resources to Use**
- **Fonts**: Google Fonts (Space Grotesk, JetBrains Mono) — load with next/font
- **3D Assets**: Poly Haven for HDRIs and textures (CC0 licensed)
- **Images**: Unsplash or Pexels for high-quality portfolio photos
- **Icons**: Lucide Icons React library for SVG icons
- **Color**: Use provided color scheme or customize from Tailwind palette

**Deployment**
- Deploy to Vercel (optimized for Next.js)
- Configure `vercel.json` for build settings
- Enable Vercel Analytics to monitor Core Web Vitals
- Set up environment variables for contact form backend (if using email service)
- Use `next/image` for automatic image optimization on production

**Deliverables**
- Fully functional Next.js project with all sections complete
- Smooth animations with no jank (60fps on desktop)
- Mobile-responsive experience
- Accessible (keyboard navigation, WCAG contrast ratios, screen reader support)
- Clean, commented code with proper TypeScript types
- README with setup instructions and environment variable guide
- Ready to deploy and customize with real project data

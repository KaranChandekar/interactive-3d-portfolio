---
name: interactive-3d-portfolio
description: Build an interactive 3D portfolio website with scroll-controlled 3D scenes, magnetic cursor effects, text split-reveal animations, and smooth page transitions. Use this skill when building a personal portfolio with Three.js/React Three Fiber, GSAP ScrollTrigger, Framer Motion, Lenis smooth scroll, and Tailwind CSS. Trigger when the user mentions 3D portfolio, interactive portfolio, WebGL portfolio, scroll-animated portfolio, or wants to build a developer portfolio with 3D elements.
---

# Interactive 3D Portfolio Website Skill

## Overview
This skill guides you through building a modern, interactive 3D portfolio website that showcases developer work with cutting-edge web technologies. The site features WebGL 3D scenes controlled by scroll, smooth animations, and magnetic cursor interactions.

## Tech Stack

### Core Framework
- **Next.js 15** with App Router
- **React 19** for component architecture
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling

### 3D & Animation
- **Three.js** (latest stable)
- **React Three Fiber** for declarative 3D
- **Drei** for reusable 3D components and helpers
- **GSAP 3.12+** with ScrollTrigger and SplitText plugins
- **Framer Motion 11+** for component animations
- **Lenis** for smooth scrolling integration

### Development Tools
- **@types/three** for TypeScript support
- **tailwindcss/typography** for content styling
- **eslint** with Next.js config

## Project Structure

```
01-interactive-3d-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx
│   └── globals.css
├── components/
│   ├── HeroScene.tsx (3D floating shapes)
│   ├── MagneticCursor.tsx
│   ├── TextReveal.tsx (Split reveal animation)
│   ├── ProjectCard.tsx
│   ├── AboutSection.tsx
│   ├── ContactForm.tsx
│   ├── Navbar.tsx
│   └── Preloader.tsx
├── lib/
│   ├── gsap-setup.ts
│   ├── animations.ts
│   └── utils.ts
├── public/
│   ├── fonts/
│   └── images/
└── package.json
```

## Hero Section Implementation

### Floating 3D Shapes
- Create three rotating geometric shapes: icosahedron, torus, octahedron
- Use Drei's `<Float>` component for automatic floating animation
- Implement mouse tracking with `useThree` and `useFrame` to rotate shapes based on cursor position
- Use quaternion interpolation for smooth rotation
- Add subtle color change on scroll using `useScroll` from Framer Motion
- Implement LOD (Level of Detail) for performance
- Apply semi-transparent materials with wireframe options

### Camera Movement & Scroll Control
- Use GSAP ScrollTrigger to pin the hero 3D canvas
- Create camera animation timeline that moves camera through the 3D space as user scrolls
- Implement focal point shifts that guide viewer attention
- Add subtle depth-of-field effect using postprocessing
- Parallax effect: different objects move at different speeds relative to scroll

### Magnetic Cursor Component
- Track mouse position with `useMousePosition` custom hook
- Create circular cursor element that follows mouse with ease-out easing (GSAP)
- Detect proximity to interactive elements (links, buttons)
- On proximity (within 50px), cursor scales up and changes color
- Add magnetic snap effect: cursor pulls slightly toward target element
- Implement text attraction: cursor grows and displays label when hovering links
- Hide default cursor with `cursor-none` in Tailwind
- Update cursor style based on `useScroll` progress

## Text Animations

### Split-Reveal on Scroll
- Use GSAP SplitText plugin to split headlines into characters
- Trigger animations with ScrollTrigger `useGSAP` hook
- Animation pattern: characters animate in from opacity 0, translateY(20px), with staggered delay
- Vary animation based on text position: bottom-to-top, right-to-left, or center-outward
- Combine with rotation: characters start rotated and normalize
- Use `performance: "auto"` in SplitText for optimization
- Reverse animation on scroll back for interactive feel

### Text Effects on Hover
- Implement character-level hover effects using Framer Motion
- Animate character scale, color, and rotation on parent hover
- Use motion.div with layoutId for shared layout animation
- Apply text-shadow glow effect with Tailwind arbitrary values

## Project Showcase Section

### Layout Grid
- Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- Use CSS Grid with `gap-6` and dynamic column sizing
- Implement infinite scroll or pagination with Framer Motion

### Card Hover Effects
- Use Framer Motion `whileHover` to scale card (1 → 1.05)
- Animate border color on hover
- 3D tilt effect: use custom hook to track mouse position over card
  - Calculate tilt angle based on mouse x/y relative to card center
  - Apply CSS perspective and rotateX/rotateY
  - Smooth transitions with `transition: transform 0.3s ease-out`

### Image Reveal Animation
- Use Framer Motion `initial`, `animate`, `whileHover` states
- Clip-path animation: start from small center point, expand to full rectangle
- Image brightness: increase on hover
- Add overlay gradient that fades on hover

### Project Metadata
- Display: Project title, description (max 2 lines), tech stack tags, view button
- Animate metadata in with staggered Framer Motion container
- Tags have subtle background animation on hover

## About Section

### Parallax Depth Layers
- Create 3+ layer system with different scroll speeds
- Layer 1 (background): slowest, scroll at 0.3x user scroll speed
- Layer 2 (mid): 0.6x speed
- Layer 3 (content): normal scroll speed
- Use Framer Motion `useScroll` with `useTransform` for smooth parallax
- Each layer has text and background image/shape
- Implement depth cues with subtle scale and opacity changes

### Content Structure
- Headline with split-text reveal
- Biography paragraph with line-by-line animation
- Skills section: animated bar chart with grow animation
- Experience timeline with animated connecting line
- Certifications/Awards with hover card flip

### Skill Visualization
- Bar chart: GSAP timeline animates width from 0 to full
- Each bar staggered start time
- Percentage labels animate with counter animation (0 → X%)
- Use GSAP `AttrPlugin` to animate SVG bar widths

## Contact Section

### Form Animation
- Input labels float up on focus (translateY(-24px))
- Border bottom animates in with `scaleX` from 0 to 1
- Focus state: border color changes, background lightens
- Success state: green checkmark fades in, button disables

### Form Layout
- Stack on mobile, side-by-side name/email on desktop
- Textarea with character counter
- Submit button with hover state:
  - Background color shift
  - Text color invert
  - Icons slide in from sides

### Validation Feedback
- Error messages fade in below field
- Checkmark icon appears next to valid fields
- Animation: shake on invalid submission

## Page Transitions & Routing

### Framer Motion AnimatePresence
- Wrap page content in `AnimatePresence` with `mode="wait"`
- Implement page exit animation: fade out + slideUp
- Implement page enter animation: fade in + slideDown with delay
- Use `layoutId` for shared element transitions between pages

### Project Detail Pages
- Dynamic route: `/projects/[slug]`
- Hero image with parallax and overlay gradient
- Content sections: problem/solution, tech stack, outcome
- Related projects carousel at bottom
- Back button with animated arrow

## Scroll Integration

### Lenis Smooth Scroll
- Initialize Lenis in root layout
- Connect Lenis with GSAP ScrollTrigger using:
  ```javascript
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  ```
- Set animation frame loop with `useAnimationFrame`
- Smooth momentum scrolling with easing

### ScrollTrigger Patterns
- Use `trigger`, `start`, `end` properties precisely
- Implement `pin` for hero section
- Use `toggleActions: "play pause resume reverse"` for common patterns
- Mark triggers with `markers: true` during development

## Responsive Design Strategy

### Desktop (1024px+)
- 3D canvas full viewport on hero
- Multi-column layouts
- Hover effects fully enabled
- Magnetic cursor active

### Tablet (768px - 1023px)
- Slightly reduced 3D scene complexity
- Magnetic cursor disabled (pointer doesn't exist on tablet)
- Simplified animations, longer durations
- Single image reveals instead of parallax

### Mobile (< 768px)
- Fallback to 2D animated hero (animated SVG or canvas 2D)
- Disable 3D Three.js scene entirely
- Use `prefers-reduced-motion: reduce` for accessibility
- Simpler CSS animations instead of GSAP (lower CPU impact)
- Touch-friendly: larger tap targets, remove hover effects
- Stack all layouts vertically

### Responsive Implementation
```javascript
// Use Next.js useMediaQuery hook or custom hook
const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(max-width: 1024px)');

// Conditionally render 3D scene
{!isMobile && <HeroScene />}
{isMobile && <Hero2D />}
```

## Performance Optimization

### 3D Scene Performance
- Use Drei's `Preload` component to preload assets
- Implement `useCallback` for event handlers
- Use `Suspense` with fallback while scene loads
- Lazy load project images with `next/image`
- Implement WebGL antialiasing: `antialias: true` in Three.js config
- Use `dpr: Math.min(window.devicePixelRatio, 2)` to cap pixel ratio
- Unload 3D scene when off-screen using `Intersection Observer`

### Animation Performance
- Use `will-change: transform` on animated elements
- Implement `transform: translateZ(0)` for GPU acceleration
- Use CSS animations over JavaScript where possible
- Debounce scroll events with `useThrottle`
- Memoize heavy components with `memo()`

### Code Splitting
- Dynamic imports for 3D components: `dynamic(() => import('...'), { ssr: false })`
- Split project detail pages
- Lazy load animation libraries on demand

### Accessibility
- Respect `prefers-reduced-motion` media query:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; }
  }
  ```
- Add `aria-label` to interactive elements
- Ensure color contrast ratio meets WCAG AA standard
- Test with keyboard navigation

## Free Resources

### 3D Assets & Textures
- **Poly Haven**: Free HDRIs, textures, models (CC0)
- **Sketchfab**: Search for free 3D models (various CC licenses)
- **Three.js Examples**: Built-in geometries (icosahedron, torus, etc.)

### Fonts
- **Google Fonts**: Space Grotesk (headings), JetBrains Mono (code)
- **Fontshare**: Open-source quality typefaces

### Images
- **Unsplash**: High-quality portfolio images
- **Pexels**: Alternative image source
- **Pixabay**: Royalty-free images

### Icons
- **Lucide Icons**: React icon library, built into project
- **Heroicons**: Alternative icon set

## Development Workflow

### Setup
1. Create Next.js 15 project with App Router
2. Install dependencies: `npm install three react-three-fiber drei gsap framer-motion lenis`
3. Configure TypeScript `tsconfig.json` with Three.js types
4. Set up Tailwind CSS v4 with custom theme

### Debugging
- Use React DevTools Profiler to identify slow renders
- Three.js DevTools extension for WebGL debugging
- GSAP console logging: `console.log(gsap.globalTimeline)`
- Disable animations with `prefers-reduced-motion` for testing

### Build & Deployment
- Build command: `next build`
- Deploy to Vercel for optimal Next.js performance
- Use Vercel analytics to monitor CWV metrics
- Enable image optimization with `next/image`

## Code Examples

### Magnetic Cursor Hook
```typescript
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};
```

### ScrollTrigger Text Reveal
```typescript
useGSAP(() => {
  const split = new SplitText(".reveal-text", { type: "chars" });
  gsap.to(split.chars, {
    scrollTrigger: { trigger: ".reveal-text", start: "top 80%", end: "top 20%" },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.05,
  });
}, []);
```

### Parallax Layer Transform
```typescript
const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
return <motion.div style={{ y }}>Parallax Content</motion.div>;
```

## Common Pitfalls & Solutions

- **GSAP/ScrollTrigger conflicts**: Always use `useGSAP` hook context
- **Three.js memory leaks**: Dispose geometries, materials, textures in cleanup
- **Lenis scroll conflict**: Don't use both Lenis and browser scroll events
- **Mobile 3D performance**: Pre-calculate animations, reduce geometry complexity
- **Lighthouse CWV issues**: Lazy load 3D, optimize images, code-split animations

## Testing Checklist

- [ ] Hero 3D scene renders without errors
- [ ] Cursor follows mouse smoothly on desktop
- [ ] Text animations trigger at correct scroll positions
- [ ] Project cards animate on hover with smooth transforms
- [ ] Page transitions work between project detail pages
- [ ] Contact form validates and animates feedback states
- [ ] Mobile fallback renders (no 3D scene)
- [ ] Keyboard navigation works (Tab through links)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Performance: Lighthouse score > 80 on desktop
- [ ] Bundle size: JS < 200KB (gzipped)

## Additional Resources

- Three.js Documentation: https://threejs.org/docs
- React Three Fiber Docs: https://docs.pmnd.rs/react-three-fiber
- GSAP ScrollTrigger Guide: https://greensock.com/scrolltrigger
- Framer Motion API: https://www.framer.com/motion
- Lenis Smooth Scroll: https://lenis.darkroom.engineering
- Next.js Performance: https://nextjs.org/learn/foundations/how-nextjs-works/rendering

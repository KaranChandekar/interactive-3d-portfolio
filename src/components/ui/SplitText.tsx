"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  direction?: "up" | "right" | "center";
  stagger?: number;
  delay?: number;
  scrollTrigger?: boolean;
}

export default function SplitText({
  children,
  className = "",
  as: Tag = "span",
  direction = "up",
  stagger = 0.05,
  delay = 0,
  scrollTrigger = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".split-char");

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      rotateZ: -5,
    };

    if (direction === "up") {
      fromVars.y = 20;
    } else if (direction === "right") {
      fromVars.x = -20;
    }

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      rotateZ: 0,
      stagger: direction === "center"
        ? { each: stagger, from: "center" }
        : stagger,
      delay,
      duration: 0.6,
      ease: "power3.out",
    };

    if (scrollTrigger) {
      toVars.scrollTrigger = {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      };
    }

    gsap.fromTo(chars, fromVars, toVars);

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [children, direction, stagger, delay, scrollTrigger]);

  const words = children.split(" ");

  // Use a wrapper div that holds the ref, render the semantic Tag inside
  return (
    <div ref={containerRef} className={`inline ${className}`} role="text">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="split-char inline-block"
              style={{ opacity: 0 }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </div>
  );
}

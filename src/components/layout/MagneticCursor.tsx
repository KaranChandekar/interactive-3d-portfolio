"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY };
    if (!isVisible) setIsVisible(true);

    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(cursorDotRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
    });
  }, [isVisible]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 1024) return;

    document.documentElement.classList.add("cursor-none-desktop");

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    const handleElementEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorType === "link") {
        setIsHovering(true);
        setCursorLabel(target.textContent?.slice(0, 20) || "");
      } else if (cursorType === "project") {
        setIsHovering(true);
        setCursorLabel("View →");
      } else if (cursorType) {
        setIsHovering(true);
        setCursorLabel("");
      }
    };

    const handleElementLeave = () => {
      setIsHovering(false);
      setCursorLabel("");
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    const interactiveElements = document.querySelectorAll("[data-cursor]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleElementEnter);
      el.addEventListener("mouseleave", handleElementLeave);
    });

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll("[data-cursor]");
      newElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementEnter);
        el.removeEventListener("mouseleave", handleElementLeave);
        el.addEventListener("mouseenter", handleElementEnter);
        el.addEventListener("mouseleave", handleElementLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementEnter);
        el.removeEventListener("mouseleave", handleElementLeave);
      });
      observer.disconnect();
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [handleMouseMove]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hidden lg:block ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isHovering
              ? "w-20 h-20 border-accent bg-accent/10"
              : "w-10 h-10 border-foreground/30"
          }`}
        >
          {cursorLabel && (
            <span className="text-[10px] font-medium text-accent whitespace-nowrap">
              {cursorLabel}
            </span>
          )}
        </div>
      </div>
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hidden lg:block ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

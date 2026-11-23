
"use client";

import { useEffect } from "react";

export default function ScrollRevealInitializer() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const sections = document.querySelectorAll("main section");

    const revealElements: HTMLElement[] = [];

    sections.forEach((section) => {
      const container = section.querySelector(":scope > div");

      if (!container) return;

      // Reveal direct content blocks inside each section.
      Array.from(container.children).forEach((child) => {
        if (!(child instanceof HTMLElement)) return;

        child.classList.add("scroll-reveal");
        revealElements.push(child);
      });

      // Stagger cards in section-level grids only.
      const grids = container.querySelectorAll(
        ":scope > .grid"
      );

      grids.forEach((grid) => {
        Array.from(grid.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement)) return;

          child.classList.add("scroll-reveal");
          child.style.setProperty(
            "--reveal-delay",
            `${Math.min(index * 90, 450)}ms`
          );

          revealElements.push(child);
        });
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.classList.add("is-visible");

          observer.unobserve(element);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}

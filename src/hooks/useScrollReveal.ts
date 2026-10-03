'use client';

import { useEffect, useRef } from 'react';

/**
 * IntersectionObserver-based scroll reveal hook.
 * Applies `.reveal-visible` to `.reveal` elements when they enter the viewport.
 * Triggers once per element, never re-hides.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      container.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('reveal-visible');
      });
      return;
    }

    // Make immediately visible if already in viewport or after quick fallback
    const elements = container.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.02,
        rootMargin: '100px 0px 100px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Fallback: ensure visible if IntersectionObserver delays on fast scroll
    const fallbackTimer = setTimeout(() => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) {
          el.classList.add('reveal-visible');
        }
      });
    }, 400);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  return containerRef;
}

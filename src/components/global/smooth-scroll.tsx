"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Lenis smooth-scroll momentum (matches the design handoff).
 * Skipped under `prefers-reduced-motion: reduce`, and disabled on /blog where the
 * momentum loop hurts long-form reading (find-in-page, scroll anchoring) and INP.
 */
const SmoothScroll = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/blog")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
};

export default SmoothScroll;

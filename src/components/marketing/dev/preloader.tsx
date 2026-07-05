"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-screen dark preloader. An eased 00→100 counter runs over ~1.05s, then the
 * panel slides up (translateY(-101%)). A hard 1.8s fallback guarantees it can
 * never trap the page, and it skips straight to done under prefers-reduced-motion.
 */
const Preloader = () => {
  const [pct, setPct] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const rafRef = useRef<number | null>(null);
  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPct(100);
      setLoaded(true);
      return;
    }

    const t0 = performance.now();
    const dur = 1050;
    let dead = false;

    const tick = (t: number) => {
      if (dead) return;
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => !dead && setLoaded(true), 180);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    fallbackRef.current = setTimeout(() => {
      if (dead) return;
      setPct(100);
      setLoaded(true);
    }, 1800);

    return () => {
      dead = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-dark text-onDark"
      style={{
        padding: "30px 36px",
        transition: "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
        transform: loaded ? "translateY(-101%)" : "none",
        pointerEvents: loaded ? "none" : "auto",
      }}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-sans font-bold text-[20px] tracking-[-0.03em]">Rhythmiq</span>
        <span className="font-mono text-[12px] tracking-[0.14em] text-hlOnDark">DEV</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <span className="font-mono text-[12px] tracking-[0.08em] text-onDark2">
          building the build partner
        </span>
        <span
          className="font-mono font-normal leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(72px, 12vw, 160px)" }}
        >
          {String(pct).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default Preloader;

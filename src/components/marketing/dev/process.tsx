"use client";

import { useEffect, useRef } from "react";
import { DEV_PROCESS_STEPS } from "./constants";

/**
 * Process — dark scrollytelling section. A sticky left column pins the intro;
 * the right column is a 4-step timeline. A vertical progress rail fills as you
 * scroll, and the active step brightens + nudges 8px right. A cursor-reactive
 * particle network drifts in the background (bails out under reduced-motion).
 */
const DevProcess = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  // Particle network background.
  useEffect(() => {
    const el = canvasRef.current;
    const sect = sectionRef.current;
    if (!el || !sect) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = el.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let dead = false;
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number; coral: boolean };
    let parts: P[] = [];

    const resize = () => {
      const r = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      el.width = W * dpr;
      el.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(110, Math.round((W * H) / 16000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1.1 + Math.random() * 1.3,
        coral: Math.random() < 0.1,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    sect.addEventListener("pointermove", onMove);
    sect.addEventListener("pointerleave", onLeave);

    const LINK = 110;
    const PUSH = 130;
    const loop = () => {
      if (dead) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < PUSH * PUSH) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / PUSH) * 0.6;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vx += (Math.random() - 0.5) * 0.012;
        p.vy += (Math.random() - 0.5) * 0.012;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.1;
            ctx.strokeStyle =
              a.coral || b.coral
                ? `rgba(255,154,120,${alpha + 0.03})`
                : `rgba(244,239,230,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of parts) {
        ctx.fillStyle = p.coral ? "rgba(255,154,120,0.8)" : "rgba(244,239,230,0.3)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      sect.removeEventListener("pointermove", onMove);
      sect.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Step activation + progress rail fill.
  useEffect(() => {
    const sect = sectionRef.current;
    if (!sect) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const steps = [...sect.querySelectorAll<HTMLElement>("[data-step]")];
    const fill = fillRef.current;

    const onScroll = () => {
      const mid = window.innerHeight * 0.55;
      let active = -1;
      steps.forEach((s, i) => {
        if (s.getBoundingClientRect().top < mid) active = i;
      });
      steps.forEach((s, i) => {
        s.style.opacity = i <= active ? "1" : "0.38";
        s.style.transform = i === active ? "translateX(8px)" : "none";
      });
      if (fill && steps.length) {
        const first = steps[0].getBoundingClientRect();
        const last = steps[steps.length - 1].getBoundingClientRect();
        const total = last.top + last.height * 0.5 - first.top;
        const passed = Math.min(Math.max(mid - first.top, 0), total);
        fill.style.height = (total > 0 ? (passed / total) * 100 : 0) + "%";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-label="Process"
      className="relative overflow-hidden bg-dark text-onDark"
      style={{ paddingBlock: "clamp(80px, 10vw, 140px)" }}
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 block h-full w-full pointer-events-none" />

      <div className="wrap relative grid items-stretch gap-[72px] lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="sticky top-[120px] flex flex-col gap-[18px]">
            <span className="eyebrow" style={{ color: "#A89F90" }}>
              How it runs
            </span>
            <h2 className="h-section font-heading text-onDark">
              Fixed scope,
              <br />
              weekly ships.
            </h2>
            <p className="lede max-w-[40ch] text-onDark2">
              The same discipline that keeps our voice AI answering every call keeps your project on
              schedule. No status decks, just a working link every Friday.
            </p>
            <span className="font-mono text-[12px] tracking-[0.08em] text-onDark2">
              fixed price · agreed up front
            </span>
          </div>
        </div>

        <div className="relative flex flex-col pl-[34px]">
          <span
            className="absolute left-0 top-3 bottom-3 w-0.5 rounded-[2px]"
            style={{ background: "rgba(244,239,230,0.14)" }}
          >
            <span ref={fillRef} className="block h-0 w-full rounded-[2px] bg-hlOnDark" />
          </span>

          {DEV_PROCESS_STEPS.map((step, i) => (
            <div
              key={step.title}
              data-step
              className="grid grid-cols-[110px_1fr] items-baseline gap-5 py-11"
              style={{
                borderBottom:
                  i < DEV_PROCESS_STEPS.length - 1 ? "1px solid var(--line-dark)" : "none",
                transition: "opacity 0.4s, transform 0.4s",
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-hlOnDark">
                {step.when}
              </span>
              <div className="flex flex-col gap-1.5">
                <b className="font-heading text-[19px] tracking-[-0.01em]">{step.title}</b>
                <span className="text-[15px] text-onDark2 leading-[1.55]">{step.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevProcess;

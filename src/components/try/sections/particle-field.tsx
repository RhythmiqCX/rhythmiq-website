"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-reactive particle network, generalized from the dev studio's process
 * section so any brand accent can tint it. Renders nothing (and costs nothing)
 * under prefers-reduced-motion. Sits as an absolutely-positioned background
 * behind hero copy.
 */
const ParticleField = ({ accent, dark }: { accent: string; dark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    // Accent as an "r,g,b" string for rgba() strokes.
    const h = accent.replace("#", "");
    const rgb = `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`;
    const base = dark ? "244,239,230" : "25,24,20";

    let W = 0,
      H = 0,
      dpr = 1,
      raf = 0,
      dead = false;
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number; hot: boolean };
    let parts: P[] = [];

    const resize = () => {
      const r = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      el.width = W * dpr;
      el.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(90, Math.round((W * H) / 18000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: 1.1 + Math.random() * 1.3,
        hot: Math.random() < 0.14,
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
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    const LINK = 118,
      PUSH = 130;
    const loop = () => {
      if (dead) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        const dx = p.x - mouse.x,
          dy = p.y - mouse.y,
          d2 = dx * dx + dy * dy;
        if (d2 < PUSH * PUSH) {
          const d = Math.sqrt(d2) || 1,
            f = (1 - d / PUSH) * 0.6;
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
          const a = parts[i],
            b = parts[j];
          const dx = a.x - b.x,
            dy = a.y - b.y,
            d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.1;
            ctx.strokeStyle =
              a.hot || b.hot ? `rgba(${rgb},${alpha + 0.05})` : `rgba(${base},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of parts) {
        ctx.fillStyle = p.hot ? `rgba(${rgb},0.85)` : `rgba(${base},0.28)`;
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
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [accent, dark]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 block h-full w-full pointer-events-none" />;
};

export default ParticleField;

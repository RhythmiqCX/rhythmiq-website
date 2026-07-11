"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta } from "../../sections/util";

/**
 * Finance / Wealth · Synthesis — a faithful build of the "Elias Norden — Health
 * Capital" scroll story: a 700vh section pins a viewport where an ambient shot
 * scrubs frame-by-frame with scroll (phase 1), cross-fades into a near-black
 * layer (phase 2), then reveals three statement paragraphs one by one (phase 3).
 * Dark-navy, white type, Instrument-Serif accents. Fixed identity.
 *
 * The scrub is an image sequence drawn to a canvas — NOT a <video> seek.
 * video.currentTime scrubbing tops out around ~30 uneven updates/s because
 * every seek runs through the browser's async seek pipeline; drawing
 * pre-extracted frames hits a steady 60fps. Frames live in
 * public/try/synthesis/frames/f001..f193.webp (1600w, from the source video)
 * and load coarse-to-fine (every 8th first) so the scrub works within the
 * first few hundred KB.
 *
 * DATA: business.name → logo (last word italic serif) · business.tagline →
 *   headline · signature → the italic headline accent · services[0..2].blurb →
 *   the three reveal paragraphs · contact → the "Inquire" CTA. Press names are
 *   editable template defaults.
 */

const NAVY = "#020b1f";
const SERIF = "var(--font-subheading), Georgia, serif";
const SANS = "var(--font-manrope), system-ui, sans-serif";
const SCRUB_END = 0.55;
const FADE_END = 0.65;
const FRAME_COUNT = 193;
const framePath = (i: number) => `/try/synthesis/frames/f${String(i + 1).padStart(3, "0")}.webp`;

const PRESS = [
  { label: "Praxis", cls: "font-bold tracking-wide", font: SERIF, italic: false },
  { label: "VENTURE BULLETIN", cls: "font-bold tracking-tight", font: SANS, italic: false },
  { label: "Blockdispatch", cls: "font-semibold italic", font: SANS, italic: true },
  { label: "Healthspan.Quarterly", cls: "font-medium tracking-tighter", font: "var(--font-mono), monospace", italic: false },
  { label: "Vetted / TJ", cls: "italic tracking-wide", font: SERIF, italic: true },
  { label: "biofuture.io", cls: "font-light tracking-widest", font: SANS, italic: false },
];

const Synthesis = ({ data }: { data: Prospect }) => {
  const brand = data.business.name || "Elias Norden";
  const brandParts = brand.trim().split(/\s+/);
  const brandHead = brandParts.slice(0, -1).join(" ");
  const brandTail = brandParts[brandParts.length - 1];
  const headline = data.business.tagline || "Merging science, defi and lifespans into";
  const accent = data.signature || "true wellness.";
  const navLinks = ["Articles", "Allocations", "Inquire"];
  const cta = primaryCta(data);
  const ext = cta.external ? { target: "_blank", rel: "noopener" } : {};

  const paras =
    data.services.length >= 1
      ? data.services.slice(0, 3).map((s) => s.blurb || s.title)
      : [
          "Elias is committed to a tomorrow where people enjoy more vibrant, rewarding decades beside loved ones.",
          "In pursuit of this purpose, he co-founded the Healthspan Research Alliance, a global nonprofit backing early-stage science on prolonging the healthy human lifespan.",
          "Elias is also a managing partner and co-founder of VitalVC, a venture capital firm backing bold pioneers in biotech and lifespans.",
        ];

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const navyLayerRef = useRef<HTMLDivElement>(null);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const drawnRef = useRef(-1);

  /** Cover-draw a loaded frame onto the canvas (crops like object-fit: cover). */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !loadedRef.current[index]) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    if (!cw || !ch) return;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw = cw;
    let dh = ch;
    let dx = 0;
    let dy = 0;
    if (ir > cr) {
      dh = ch;
      dw = ch * ir;
      dx = (cw - dw) / 2;
    } else {
      dw = cw;
      dh = cw / ir;
      dy = (ch - dh) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
    drawnRef.current = index;
  }, []);

  /** The loaded frame closest to the wanted index (loading is coarse-to-fine). */
  const nearestLoaded = useCallback((i: number) => {
    const loaded = loadedRef.current;
    if (loaded[i]) return i;
    for (let d = 1; d < FRAME_COUNT; d++) {
      if (i - d >= 0 && loaded[i - d]) return i - d;
      if (i + d < FRAME_COUNT && loaded[i + d]) return i + d;
    }
    return -1;
  }, []);

  // Frame preloading (coarse-to-fine) + canvas sizing.
  useEffect(() => {
    let dead = false;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    imagesRef.current = imgs;
    loadedRef.current = loaded;
    drawnRef.current = -1;

    const order: number[] = [];
    const queued = new Set<number>();
    for (const step of [8, 4, 2, 1]) {
      for (let i = 0; i < FRAME_COUNT; i += step) {
        if (!queued.has(i)) {
          queued.add(i);
          order.push(i);
        }
      }
    }
    order.forEach((i) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (dead) return;
        loaded[i] = true;
        if (drawnRef.current === -1) drawFrame(i);
      };
      img.src = framePath(i);
      imgs[i] = img;
    });

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      if (drawnRef.current >= 0) drawFrame(drawnRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      dead = true;
      window.removeEventListener("resize", resize);
    };
  }, [drawFrame]);

  useEffect(() => {
    let raf = 0;
    let smoothed = 0;
    const loop = () => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const raw = -rect.top / (section.offsetHeight - window.innerHeight);
        const target = raw < 0 ? 0 : raw > 1 ? 1 : raw;
        // 0.2 ≈ 80ms catch-up at 60fps. 0.1 trailed scroll by ~160ms and read
        // as lag; higher than ~0.3 loses the cinematic ease entirely.
        smoothed += (target - smoothed) * 0.2;

        // phase 1 — draw the frame matching the scroll position
        const p1 = Math.min(smoothed / SCRUB_END, 1);
        const idx = nearestLoaded(Math.round(p1 * (FRAME_COUNT - 1)));
        if (idx >= 0 && idx !== drawnRef.current) drawFrame(idx);

        // phase 2 — cross-fade hero → near-black
        const fade = smoothed <= SCRUB_END ? 0 : smoothed >= FADE_END ? 1 : (smoothed - SCRUB_END) / (FADE_END - SCRUB_END);
        if (heroLayerRef.current) heroLayerRef.current.style.opacity = String(1 - fade);
        if (navyLayerRef.current) {
          navyLayerRef.current.style.opacity = String(fade);
          navyLayerRef.current.style.pointerEvents = fade > 0.5 ? "auto" : "none";
        }

        // phase 3 — reveal paragraphs
        const p3 = smoothed <= FADE_END ? 0 : (smoothed - FADE_END) / (1 - FADE_END);
        const visible = Math.min(paras.length, Math.floor(p3 * paras.length) + (p3 > 0 ? 1 : 0));
        paraRefs.current.forEach((el, i) => {
          if (!el) return;
          const on = i < visible;
          el.style.opacity = on ? "1" : "0";
          el.style.transform = on ? "translateY(0)" : "translateY(2rem)";
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paras.length, drawFrame, nearestLoaded]);

  return (
    <div style={{ background: NAVY, color: "#fff", fontFamily: SANS }}>
      {/* navbar */}
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-12 md:py-7">
        <a href="#" className="text-lg tracking-tight text-white no-underline sm:text-xl md:text-2xl">
          {brandHead}{" "}
          <span style={{ fontFamily: SERIF, fontStyle: "italic" }}>{brandTail}</span>
        </a>
        <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
          {navLinks.map((l) => (
            <a key={l} href={cta.href} {...ext} className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/80 no-underline transition-colors duration-300 hover:text-white sm:text-[11px] sm:tracking-[0.18em] md:text-xs">
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* scroll-scrubbed hero */}
      <section ref={sectionRef} className="relative" style={{ height: "700vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden" style={{ background: NAVY }}>
          {/* hero layer */}
          <div ref={heroLayerRef} className="absolute inset-0" style={{ opacity: 1 }}>
            <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-black/35" />

            {/* headline */}
            <div className="absolute inset-0 flex items-center justify-center px-5">
              <h1 className="max-w-5xl text-center text-[2rem] leading-[1.15] tracking-tight text-white sm:text-5xl sm:leading-[1.1] md:text-6xl lg:text-7xl">
                {headline}{" "}
                <span style={{ fontFamily: SERIF, fontStyle: "italic" }}>{accent}</span>
              </h1>
            </div>

            {/* press strip */}
            <div className="absolute bottom-0 right-0 px-5 pb-10 sm:px-6 sm:pb-16 md:px-12 md:pb-24">
              <p className="mb-3 text-right text-xs text-white/70 sm:text-sm">In the news:</p>
              <div className="flex flex-wrap justify-end gap-x-5 gap-y-3 sm:gap-x-8 sm:gap-y-4 md:gap-x-12">
                {PRESS.map((p) => (
                  <span key={p.label} className={`text-sm text-white/90 transition-opacity duration-300 hover:opacity-60 sm:text-lg md:text-xl ${p.cls}`} style={{ fontFamily: p.font }}>
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* navy reveal layer */}
          <div ref={navyLayerRef} className="absolute inset-0 flex items-center justify-center px-6" style={{ background: "#000308", opacity: 0, pointerEvents: "none" }}>
            <div className="max-w-4xl space-y-6 text-center sm:space-y-10">
              {paras.map((para, i) => (
                <p
                  key={i}
                  ref={(el) => {
                    paraRefs.current[i] = el;
                  }}
                  className="text-lg leading-relaxed text-white transition-all duration-700 ease-out sm:text-2xl md:text-3xl md:leading-snug"
                  style={{ opacity: 0, transform: "translateY(2rem)" }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Synthesis;

"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta } from "../../sections/util";

/**
 * Retail / DTC · Wild scent — a faithful build of the "Wild Daisy Fragrances"
 * landing page: a video hero with an editorial title, a floating product card
 * and an italic "01" slide index, followed by two split product panels (blue +
 * lime) whose bottle, caption, scent-notes and CTA stagger in on scroll. Fixed
 * playful identity; theme.accent is ignored.
 *
 * DATA: business.name → header wordmark (split across two lines) · business
 *   .tagline → hero title (newline-separated) · services[0..2] (title/blurb/
 *   photo) → the three products (Fresh hero card, Sweet panel, Extra panel) ·
 *   contact → Shop / Add-to-Cart CTA. Scent notes are editable template defaults.
 */

const HERO_TEXT = "#332023";
const TEXT = "#000000";
const BG_BLUE = "#4BB3ED";
const BG_LIME = "#BDE84F";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const BASE = "/try/wilddaisy";
const SANS = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

// Scent notes per panel — editable defaults for the demo.
const SWEET_NOTES = [
  { label: "Fruity top", ingredient: "WHITE RASPBERRIES" },
  { label: "Floral heart", ingredient: "DAISY TREE PETALS" },
  { label: "Feminine base", ingredient: "SUGAR MUSKS" },
];
const EXTRA_NOTES = [
  { label: "Top", ingredient: "BANANA BLOSSOM ACCORD" },
  { label: "Heart", ingredient: "CHOCOLATE DAISY ACCORD" },
  { label: "Base", ingredient: "VETIVER OIL" },
];

function anim(visible: boolean, delay: number, opts: { y?: number; x?: number; duration?: number } = {}): CSSProperties {
  const { y = 20, x = 0, duration = 1600 } = opts;
  const from = y !== 0 ? `translateY(${y}px)` : x !== 0 ? `translateX(${x}px)` : "none";
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate(0,0)" : from,
    transition: `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
  };
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

type Product = { name: string; size: string; image: string };

function ProductPanel({ bg, product, notes, visible, bold }: { bg: string; product: Product; notes: { label: string; ingredient: string }[]; visible: boolean; bold?: boolean }) {
  return (
    <div className="relative flex flex-col px-6 pt-6 pb-8 md:px-8 md:pt-8 md:pb-10" style={{ backgroundColor: bg, minHeight: "100%" }}>
      {/* top labels */}
      <div className="mb-auto flex items-start justify-between" style={anim(visible, 0, { y: 12, duration: 1400 })}>
        <span className="text-xs" style={{ color: TEXT }}>{bold ? "Daisy wild" : "Daisy love"}</span>
        <span className="text-xs" style={{ color: TEXT }}>{bold ? "Playful" : "Sweet"}</span>
      </div>
      {/* bottle */}
      <div className="flex flex-col items-center py-8" style={{ flex: 1, justifyContent: "center", ...anim(visible, 300, { y: 40, duration: 1800 }) }}>
        <div className="overflow-hidden" style={{ width: "clamp(140px,40%,220px)", aspectRatio: "220/340", backgroundColor: "#D9D9D9", borderRadius: 2, flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div className="mt-4 text-center" style={anim(visible, 600, { y: 10, duration: 1400 })}>
          <p className="text-sm" style={{ color: TEXT }}>{product.name}</p>
          <p className="mt-1 text-xs" style={{ color: TEXT }}>{product.size}</p>
        </div>
      </div>
      {/* notes + CTA */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-0.5" style={anim(visible, 900, { y: 16, duration: 1400 })}>
          {notes.map((n, i) => (
            <div key={i}>
              <p className="text-xs leading-snug" style={{ color: TEXT, fontWeight: bold ? 700 : 400 }}>{n.label}</p>
              <p className="text-xs font-bold uppercase leading-snug tracking-widest" style={{ color: TEXT }}>{n.ingredient}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="group relative shrink-0 border px-6 py-3 text-xs font-bold uppercase tracking-widest"
          style={{ color: TEXT, borderColor: TEXT, backgroundColor: "transparent", ...anim(visible, 1150, { y: 16, duration: 1400 }) }}
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-black">Shop now</span>
          <span className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
        </button>
      </div>
    </div>
  );
}

const WildScent = ({ data }: { data: Prospect }) => {
  const name = data.business.name || "Wild Daisy Fragrances";
  const parts = name.trim().split(/\s+/);
  const brandLine1 = parts.length > 1 ? parts.slice(0, -1).join(" ") : name;
  const brandLine2 = parts.length > 1 ? parts[parts.length - 1] : "";
  const titleLines = (data.business.tagline || "Sweet Daisy\nPersonal Scent\nFinder").split("\n");
  const cta = primaryCta(data);
  const ext = cta.external ? { target: "_blank", rel: "noopener" } : {};

  const s = data.services;
  const products: Product[] = [
    { name: s[0]?.title || "Eau So Fresh", size: s[0]?.blurb || "100 ml / 3.4 oz", image: s[0]?.photo || `${BASE}/p-fresh.webp` },
    { name: s[1]?.title || "Eau So Sweet", size: s[1]?.blurb || "100 ml / 3.3 oz", image: s[1]?.photo || `${BASE}/p-sweet.webp` },
    { name: s[2]?.title || "Eau So Extra", size: s[2]?.blurb || "100 ml / 3.3 oz", image: s[2]?.photo || `${BASE}/p-extra.webp` },
  ];

  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), 200);
    return () => clearTimeout(t);
  }, []);

  const scent = useReveal();
  const wild = useReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff", fontFamily: SANS }}>
      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden">
        <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" style={{ zIndex: 0 }}>
          <source src={data.hero.videoMp4 || `${BASE}/hero.mp4`} type="video/mp4" />
        </video>

        {/* header */}
        <header className="absolute left-0 top-0 flex w-full items-center justify-between px-5 py-5 sm:px-8 sm:py-6" style={{ zIndex: 40, ...anim(v, 100, { y: -10, duration: 1400 }) }}>
          <div className="text-xs font-black uppercase leading-tight tracking-widest sm:text-sm" style={{ color: HERO_TEXT }}>
            <div>{brandLine1}</div>
            {brandLine2 && <div>{brandLine2}</div>}
          </div>
          <nav className="flex gap-5 sm:gap-8">
            {["Shop Now", "Cart"].map((t) => (
              <a key={t} href={cta.href} {...ext} className="group relative text-xs font-bold uppercase tracking-widest no-underline" style={{ color: HERO_TEXT }}>
                <span>{t}</span>
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" style={{ backgroundColor: HERO_TEXT }} />
              </a>
            ))}
          </nav>
        </header>

        {/* scroll indicator */}
        <div className="absolute right-8 hidden sm:block md:right-10" style={{ top: "50%", transform: "translateY(-50%)", zIndex: 20, ...anim(v, 1000, { x: 16, duration: 1600 }) }}>
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.25rem", letterSpacing: "0.1em", color: HERO_TEXT }}>Scroll</span>
        </div>

        {/* "01" slide index */}
        <div
          className="absolute left-6 hidden sm:block md:left-8"
          style={{
            top: "50%",
            transform: v ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(-24px)",
            fontFamily: "var(--font-playfair), 'Didot', 'Bodoni MT', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(2.5rem,6.5vw,6rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            zIndex: 10,
            color: HERO_TEXT,
            opacity: v ? 1 : 0,
            transition: `opacity 1600ms ${EASE} 500ms, transform 1600ms ${EASE} 500ms`,
          }}
        >
          01
        </div>

        {/* floating product card (desktop) */}
        <div className="absolute bottom-10 right-10 hidden items-center gap-2 rounded-2xl px-5 py-4 sm:flex" style={{ zIndex: 30, minWidth: 260, backgroundColor: "#fff", boxShadow: "0 4px 24px rgba(51,32,35,0.08), 0 1px 4px rgba(51,32,35,0.06)", ...anim(v, 1300, { y: 20, duration: 1400 }) }}>
          <div className="flex-shrink-0 overflow-hidden" style={{ width: 60, height: 76, borderRadius: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={products[0].image} alt={products[0].name} style={{ width: "130%", height: "130%", objectFit: "contain", display: "block", marginLeft: "-15%", marginTop: "-15%" }} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight tracking-wide" style={{ color: HERO_TEXT }}>{products[0].name}</span>
            <span className="tracking-wide" style={{ fontSize: 11, fontWeight: 500, marginTop: 3, color: HERO_TEXT }}>{products[0].size}</span>
            <a href={cta.href} {...ext} className="group relative mt-3.5 self-start overflow-hidden text-xs font-bold uppercase leading-tight tracking-widest no-underline" style={{ color: HERO_TEXT }}>
              <span className="relative z-10">Add to Cart</span>
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0" style={{ backgroundColor: HERO_TEXT }} />
              <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 transition-transform delay-150 duration-300 ease-out group-hover:scale-x-100" style={{ backgroundColor: HERO_TEXT, opacity: 0.4 }} />
            </a>
          </div>
        </div>

        {/* title + mobile card */}
        <div className="relative pb-0 pl-5 pr-0 sm:pb-12 sm:pl-8 sm:pr-8" style={{ zIndex: 10 }}>
          <h1 className="font-medium uppercase leading-tight sm:leading-none" style={{ fontSize: "clamp(2.2rem,8vw,4rem)", letterSpacing: "-0.01em" }}>
            {/* mobile lines */}
            <span className="block sm:hidden" style={{ color: "#fff", textShadow: "0 2px 16px rgba(0,0,0,0.4)", ...anim(v, 600, { y: 24 }) }}>{titleLines[0]}</span>
            {titleLines[1] && <span className="block sm:hidden" style={{ color: "rgba(255,255,255,0.8)", textShadow: "0 2px 12px rgba(0,0,0,0.35)", ...anim(v, 800, { y: 24 }) }}>{titleLines[1]}</span>}
            {titleLines[2] && <span className="block sm:hidden" style={{ color: "rgba(255,255,255,0.8)", textShadow: "0 2px 12px rgba(0,0,0,0.35)", ...anim(v, 1000, { y: 24 }) }}>{titleLines[2]}</span>}
            {/* desktop lines */}
            <span className="hidden sm:block" style={{ color: HERO_TEXT, ...anim(v, 600, { y: 24 }) }}>{titleLines[0]}</span>
            {titleLines[1] && <span className="hidden sm:block" style={{ color: "#B0A2A1", ...anim(v, 800, { y: 24 }) }}>{titleLines[1]}</span>}
            {titleLines[2] && <span className="hidden sm:block" style={{ color: "#B0A2A1", ...anim(v, 1000, { y: 24 }) }}>{titleLines[2]}</span>}
          </h1>

          {/* mobile inline card */}
          <div className="mb-8 mr-5 mt-4 flex items-center gap-3 rounded-2xl px-4 py-4 sm:hidden" style={{ backgroundColor: "#fff", boxShadow: "0 4px 24px rgba(51,32,35,0.08), 0 1px 4px rgba(51,32,35,0.06)", ...anim(v, 1300, { y: 20, duration: 1400 }) }}>
            <div className="flex-shrink-0 overflow-hidden" style={{ width: 56, height: 70, borderRadius: 6 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={products[0].image} alt={products[0].name} style={{ width: "130%", height: "130%", objectFit: "contain", display: "block", marginLeft: "-15%", marginTop: "-15%" }} />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-semibold leading-tight tracking-wide" style={{ color: HERO_TEXT }}>{products[0].name}</span>
              <span className="tracking-wide" style={{ fontSize: 11, fontWeight: 500, marginTop: 3, color: HERO_TEXT }}>{products[0].size}</span>
              <a href={cta.href} {...ext} className="group relative mt-3 self-start overflow-hidden text-xs font-bold uppercase leading-tight tracking-widest no-underline" style={{ color: HERO_TEXT }}>
                <span className="relative z-10">Add to Cart</span>
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0" style={{ backgroundColor: HERO_TEXT }} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SCENTFINDER ===================== */}
      <section ref={scent.ref as React.RefObject<HTMLElement>} className="relative w-full">
        <div className="flex flex-col md:grid md:min-h-screen" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <ProductPanel bg={BG_BLUE} product={products[1]} notes={SWEET_NOTES} visible={scent.visible} />
          <div className="relative hidden overflow-hidden md:block" style={{ backgroundColor: "#111", minHeight: "100%" }}>
            <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover"><source src={`${BASE}/scent.mp4`} type="video/mp4" /></video>
          </div>
          <div className="relative overflow-hidden md:hidden" style={{ height: "75vw", backgroundColor: "#111" }}>
            <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover"><source src={`${BASE}/scent.mp4`} type="video/mp4" /></video>
          </div>
        </div>
      </section>

      {/* ===================== WILDSCENT ===================== */}
      <section ref={wild.ref as React.RefObject<HTMLElement>} className="relative w-full">
        <div className="flex flex-col-reverse md:grid md:min-h-screen" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="relative hidden overflow-hidden md:block" style={{ backgroundColor: "#111", minHeight: "100%" }}>
            <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover"><source src={`${BASE}/wild.mp4`} type="video/mp4" /></video>
          </div>
          <div className="relative overflow-hidden md:hidden" style={{ height: "75vw", backgroundColor: "#111" }}>
            <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover"><source src={`${BASE}/wild.mp4`} type="video/mp4" /></video>
          </div>
          <ProductPanel bg={BG_LIME} product={products[2]} notes={EXTRA_NOTES} visible={wild.visible} bold />
        </div>
      </section>
    </div>
  );
};

export default WildScent;

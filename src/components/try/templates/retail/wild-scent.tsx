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
 * A demo cart lives in the header: it opens a slide-in drawer pre-seeded with
 * items, and every "Add to Cart" feeds it (+/- steppers, subtotal). "Shop"
 * links go to the prospect CTA; checkout does too.
 *
 * DATA: business.name → header wordmark (split across two lines) · business
 *   .tagline → hero title (newline-separated) · services[0..2] (title/blurb/
 *   photo/price) → the three products (Fresh hero card, Sweet panel, Extra
 *   panel) + cart lines · contact → Shop / checkout CTA. Scent notes are
 *   editable template defaults.
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

type Product = { name: string; size: string; image: string; price: string };
type CartLine = { idx: number; qty: number };

/** Slide-in demo cart: pre-seeded lines, +/- steppers, subtotal, checkout. */
function CartDrawer({
  open,
  onClose,
  lines,
  products,
  onQty,
  checkoutHref,
  external,
}: {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  products: Product[];
  onQty: (idx: number, delta: number) => void;
  checkoutHref: string;
  external: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const priceNum = (p: string) => Number(p.replace(/[^0-9.]/g, ""));
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const canTotal = lines.length > 0 && lines.every((l) => priceNum(products[l.idx].price) > 0);
  const total = lines.reduce((s, l) => s + priceNum(products[l.idx].price) * l.qty, 0);
  const ext = external ? { target: "_blank", rel: "noopener" } : {};

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 60, backgroundColor: "rgba(51,32,35,0.4)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: `opacity 500ms ${EASE}` }}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 70, width: "min(420px, 92vw)", backgroundColor: "#fff", color: HERO_TEXT, display: "flex", flexDirection: "column", transform: open ? "translateX(0)" : "translateX(105%)", transition: `transform 600ms ${EASE}`, boxShadow: "-8px 0 40px rgba(51,32,35,0.15)" }}
      >
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: `1px solid rgba(51,32,35,0.12)` }}>
          <span className="text-xs font-bold uppercase tracking-widest">Cart ({count})</span>
          <button type="button" onClick={onClose} aria-label="Close cart" className="text-xl leading-none" style={{ color: HERO_TEXT, background: "none", border: "none", cursor: "pointer" }}>
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm" style={{ opacity: 0.7 }}>Your cart is empty.</p>
            <a href={checkoutHref} {...ext} className="text-xs font-bold uppercase tracking-widest underline underline-offset-4" style={{ color: HERO_TEXT }}>
              Shop now
            </a>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {lines.map((l) => {
              const p = products[l.idx];
              return (
                <div key={l.idx} className="flex items-center gap-4 py-4" style={{ borderBottom: "1px solid rgba(51,32,35,0.08)" }}>
                  <div className="shrink-0 overflow-hidden" style={{ width: 56, height: 70, borderRadius: 6, backgroundColor: "#D9D9D9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-semibold">{p.name}</span>
                    <span className="mt-0.5 text-xs" style={{ opacity: 0.65 }}>{p.size}</span>
                    <span className="mt-1 text-xs font-bold">{p.price}</span>
                  </div>
                  <div className="flex shrink-0 items-center" style={{ border: `1px solid ${HERO_TEXT}` }}>
                    <button type="button" onClick={() => onQty(l.idx, -1)} aria-label={`Decrease ${p.name} quantity`} className="grid h-7 w-7 place-items-center text-sm" style={{ color: HERO_TEXT, background: "none", border: "none", cursor: "pointer" }}>
                      −
                    </button>
                    <span className="w-6 text-center text-xs font-bold">{l.qty}</span>
                    <button type="button" onClick={() => onQty(l.idx, 1)} aria-label={`Increase ${p.name} quantity`} className="grid h-7 w-7 place-items-center text-sm" style={{ color: HERO_TEXT, background: "none", border: "none", cursor: "pointer" }}>
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {lines.length > 0 && (
          <div className="px-6 pb-6 pt-4" style={{ borderTop: "1px solid rgba(51,32,35,0.12)" }}>
            {canTotal && (
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-xs font-bold uppercase tracking-widest">Subtotal</span>
                <span className="text-sm font-bold">${total.toFixed(2)}</span>
              </div>
            )}
            <p className="text-[11px]" style={{ opacity: 0.55 }}>Shipping calculated at checkout.</p>
            <a
              href={checkoutHref}
              {...ext}
              className="mt-4 block py-3.5 text-center text-xs font-bold uppercase tracking-widest no-underline transition-colors duration-300 hover:bg-[#BDE84F] hover:text-black"
              style={{ backgroundColor: HERO_TEXT, color: "#fff" }}
            >
              Checkout
            </a>
          </div>
        )}
      </aside>
    </>
  );
}

function ProductPanel({ bg, product, notes, visible, bold, shopHref, external }: { bg: string; product: Product; notes: { label: string; ingredient: string }[]; visible: boolean; bold?: boolean; shopHref: string; external: boolean }) {
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
        <a
          href={shopHref}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
          className="group relative shrink-0 border px-6 py-3 text-xs font-bold uppercase tracking-widest no-underline"
          style={{ color: TEXT, borderColor: TEXT, backgroundColor: "transparent", ...anim(visible, 1150, { y: 16, duration: 1400 }) }}
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-black">Shop now</span>
          <span className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
        </a>
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
    { name: s[0]?.title || "Eau So Fresh", size: s[0]?.blurb || "100 ml / 3.4 oz", image: s[0]?.photo || `${BASE}/p-fresh.webp`, price: s[0]?.price || "$72" },
    { name: s[1]?.title || "Eau So Sweet", size: s[1]?.blurb || "100 ml / 3.3 oz", image: s[1]?.photo || `${BASE}/p-sweet.webp`, price: s[1]?.price || "$78" },
    { name: s[2]?.title || "Eau So Extra", size: s[2]?.blurb || "100 ml / 3.3 oz", image: s[2]?.photo || `${BASE}/p-extra.webp`, price: s[2]?.price || "$84" },
  ];

  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Demo cart — pre-seeded so the drawer opens with something to play with.
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([
    { idx: 1, qty: 2 },
    { idx: 2, qty: 1 },
  ]);
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const addToCart = (idx: number) => {
    setCart((prev) => (prev.some((l) => l.idx === idx) ? prev.map((l) => (l.idx === idx ? { ...l, qty: l.qty + 1 } : l)) : [...prev, { idx, qty: 1 }]));
    setCartOpen(true);
  };
  const changeQty = (idx: number, delta: number) => {
    setCart((prev) => prev.map((l) => (l.idx === idx ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0));
  };

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
            <a href={cta.href} {...ext} className="group relative text-xs font-bold uppercase tracking-widest no-underline" style={{ color: HERO_TEXT }}>
              <span>Shop Now</span>
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" style={{ backgroundColor: HERO_TEXT }} />
            </a>
            <button type="button" onClick={() => setCartOpen(true)} className="group relative text-xs font-bold uppercase tracking-widest" style={{ color: HERO_TEXT, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <span>Cart ({cartCount})</span>
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" style={{ backgroundColor: HERO_TEXT }} />
            </button>
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
            <button type="button" onClick={() => addToCart(0)} className="group relative mt-3.5 self-start overflow-hidden text-xs font-bold uppercase leading-tight tracking-widest" style={{ color: HERO_TEXT, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <span className="relative z-10">Add to Cart</span>
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0" style={{ backgroundColor: HERO_TEXT }} />
              <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 transition-transform delay-150 duration-300 ease-out group-hover:scale-x-100" style={{ backgroundColor: HERO_TEXT, opacity: 0.4 }} />
            </button>
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
              <button type="button" onClick={() => addToCart(0)} className="group relative mt-3 self-start overflow-hidden text-xs font-bold uppercase leading-tight tracking-widest" style={{ color: HERO_TEXT, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <span className="relative z-10">Add to Cart</span>
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0" style={{ backgroundColor: HERO_TEXT }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SCENTFINDER ===================== */}
      <section ref={scent.ref as React.RefObject<HTMLElement>} className="relative w-full">
        <div className="flex flex-col md:grid md:min-h-screen" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <ProductPanel bg={BG_BLUE} product={products[1]} notes={SWEET_NOTES} visible={scent.visible} shopHref={cta.href} external={cta.external} />
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
          <ProductPanel bg={BG_LIME} product={products[2]} notes={EXTRA_NOTES} visible={wild.visible} bold shopHref={cta.href} external={cta.external} />
        </div>
      </section>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} lines={cart} products={products} onQty={changeQty} checkoutHref={cta.href} external={cta.external} />
    </div>
  );
};

export default WildScent;

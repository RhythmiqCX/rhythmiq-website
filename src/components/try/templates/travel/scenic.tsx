"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Menu, X } from "lucide-react";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta } from "../../sections/util";

/**
 * Travel · Scenic — a faithful build of the split-screen luxury-travel hero:
 * a cream left half and a full-bleed scenic video right half, with the same
 * headline rendered twice and clipped down the middle so it reads dark on the
 * cream side and white over the video. A floating "Hidden Gems" card (with its
 * own looping video) sits bottom-right. The top-right button opens a cream
 * side menu (numbered links → showcase, gold-eased slide + stagger). Collapses
 * to a single video panel with a fixed bottom card on mobile. Fixed identity;
 * theme.accent is ignored.
 *
 * DATA: business.name → star logo label + menu footer · business.tagline →
 *   headline (two lines, newline-split) · business.oneLiner → hero paragraph ·
 *   services[0] (title/blurb/photo) → the Hidden Gems card + its video ·
 *   hero.videoMp4 → the scenic background video · contact → the "Explore
 *   more" / "Start planning" CTAs.
 */

const GOLD = [0.76, 0, 0.24, 1] as const;
const BASE = "/try/scenic";
const SANS = "var(--font-inter), 'Inter', system-ui, sans-serif";
const MENU = ["Destinations", "Journeys", "Hidden Gems", "Journal", "Contact"];
// Demo site: menu entries lead back to the prototype showcase.
const MENU_HREF = "https://try.rhythmiqcx.com";

function HeroContent({ lines, body }: { lines: string[]; body: string }) {
  return (
    <div id="topContent" className="flex -translate-y-[40px] flex-col items-center justify-center px-6 md:-translate-y-[20px]">
      <div className="overflow-hidden">
        <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: GOLD }} className="font-light leading-[1.05] tracking-[-0.04em]" style={{ fontSize: "clamp(42px,6vw,80px)" }}>
          {lines[0]}
        </motion.h1>
      </div>
      <div className="mb-8 overflow-hidden">
        <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: GOLD, delay: 0.08 }} className="font-light leading-[1.05] tracking-[-0.04em]" style={{ fontSize: "clamp(42px,6vw,80px)" }}>
          {lines[1] || ""}
        </motion.h1>
      </div>
      <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55 }} className="mx-auto max-w-[550px] font-light leading-[1.7] tracking-wide opacity-80" style={{ fontSize: "clamp(14px,1vw,16px)" }}>
        {body}
      </motion.p>
    </div>
  );
}

const Scenic = ({ data }: { data: Prospect }) => {
  const brand = data.business.name || "Voyage";
  const lines = (data.business.tagline || "Discover the beauty\nof the world around").split("\n");
  const body = data.business.oneLiner;
  const gem = data.services[0];
  const gemTitle = gem?.title || "Hidden Gems";
  const gemBlurb = gem?.blurb || "Explore our handpicked collection of authentic stays and secluded retreats, where nature meets comfort in perfect harmony.";
  const gemVideo = gem?.photo || `${BASE}/gem.mp4`;
  const bgVideo = data.hero.videoMp4 || `${BASE}/hero.mp4`;
  const cta = primaryCta(data);
  const ext = cta.external ? { target: "_blank", rel: "noopener" } : {};

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const play = () => v.play().catch(() => {});
    play();
    v.addEventListener("loadeddata", play);
    return () => v.removeEventListener("loadeddata", play);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <div className="scenic min-h-screen overflow-hidden font-sans" style={{ background: "#f3ebe4", fontFamily: SANS, color: "#1c1c1c" }}>
      {/* minimal nav accents */}
      <Star size={30} fill="currentColor" strokeWidth={0} style={{ position: "fixed", top: 30, left: 30, zIndex: 1001 }} className="text-black max-[850px]:text-white" aria-label={brand} />
      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
        style={{ position: "fixed", top: 30, right: 30, zIndex: 1004 }}
        className={`transition-all duration-300 ease-out hover:scale-110 ${menuOpen ? "text-[#1c1c1c]" : "text-white"}`}
      >
        {menuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* side menu. No backdrop-filter on the scrim — re-blurring the playing
          videos every frame of the fade is what makes the slide stutter. */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 bg-black/40"
        style={{ zIndex: 1002, pointerEvents: menuOpen ? "auto" : "none" }}
      />
      <motion.aside
        role="dialog"
        aria-label="Menu"
        initial={false}
        animate={{ x: menuOpen ? 0 : "105%" }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="fixed bottom-0 right-0 top-0 flex flex-col justify-between px-10 py-24 md:px-14"
        style={{ zIndex: 1003, width: "min(420px, 88vw)", background: "#f3ebe4", color: "#1c1c1c", boxShadow: "-12px 0 50px rgba(0,0,0,0.18)" }}
      >
        <nav className="flex flex-col gap-3">
          {MENU.map((l, i) => (
            <motion.a
              key={l}
              href={MENU_HREF}
              initial={false}
              animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 18 }}
              transition={
                menuOpen
                  ? { duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.16 + i * 0.07 }
                  : { duration: 0.25, ease: "easeIn" }
              }
              className="group flex items-baseline gap-4 no-underline"
              style={{ color: "#1c1c1c" }}
            >
              <span className="text-[11px] tracking-[0.2em] opacity-40">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-light leading-[1.15] tracking-[-0.03em] opacity-55 transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:opacity-100" style={{ fontSize: "clamp(30px,4.5vh,40px)" }}>
                {l}
              </span>
              <ArrowRight size={18} className="-translate-x-2 self-center opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-70" />
            </motion.a>
          ))}
        </nav>
        <motion.div
          initial={false}
          animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 12 }}
          transition={menuOpen ? { duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.5 } : { duration: 0.25, ease: "easeIn" }}
        >
          <a href={cta.href} {...ext} className="flex w-fit items-center gap-2 rounded-full bg-black px-8 py-4 text-xs text-white no-underline transition-all duration-300 hover:bg-zinc-800 active:scale-95">
            Start planning <ArrowRight size={14} />
          </a>
          <p className="mt-6 text-[11px] tracking-[0.18em] opacity-40">{brand.toUpperCase()} — CURATED TRAVEL</p>
        </motion.div>
      </motion.aside>

      <main className="hero-container">
        <div className="left-bg" />
        <div className="right-bg">
          <div className="bg-image-wrapper">
            <motion.div initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: GOLD }} className="relative h-full w-full">
              <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover object-left">
                <source src={bgVideo} type="video/mp4" />
              </video>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-black/20 md:bg-transparent" />

          {/* gem card */}
          <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, delay: 0.5, ease: GOLD }} className="gem-card">
            <div className="gem-image-box relative shrink-0 overflow-hidden">
              <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover">
                <source src={gemVideo} type="video/mp4" />
              </video>
            </div>
            <div className="gem-content" style={{ gap: 20 }}>
              <div className="mb-5 md:mb-0">
                <h3 className="mb-2 text-xl font-semibold text-[#1c1c1c] md:text-base">{gemTitle}</h3>
                <p className="text-xs leading-relaxed text-gray-500">{gemBlurb}</p>
              </div>
              <a id="explorebtn" href={cta.href} {...ext} className="flex items-center gap-2 self-start rounded-full bg-black px-8 py-4 text-xs text-white no-underline transition-all duration-300 hover:bg-zinc-800 active:scale-95 md:px-5 md:py-2.5">
                Explore more <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* mirrored clip-path text */}
        <div className="text-layer-wrapper text-black-side">
          <HeroContent lines={lines} body={body} />
        </div>
        <div className="text-layer-wrapper text-white-side">
          <HeroContent lines={lines} body={body} />
        </div>
      </main>
    </div>
  );
};

export default Scenic;

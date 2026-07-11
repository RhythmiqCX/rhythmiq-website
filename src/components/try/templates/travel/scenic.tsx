"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Menu } from "lucide-react";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta } from "../../sections/util";

/**
 * Travel · Scenic — a faithful build of the split-screen luxury-travel hero:
 * a cream left half and a full-bleed scenic video right half, with the same
 * headline rendered twice and clipped down the middle so it reads dark on the
 * cream side and white over the video. A floating "Hidden Gems" card (with its
 * own looping video) sits bottom-right. Collapses to a single video panel with
 * a fixed bottom card on mobile. Fixed identity; theme.accent is ignored.
 *
 * DATA: business.name → star logo label · business.tagline → headline (two
 *   lines, newline-split) · business.oneLiner → hero paragraph · services[0]
 *   (title/blurb/photo) → the Hidden Gems card + its video · hero.videoMp4 →
 *   the scenic background video · contact → the "Explore more" CTA.
 */

const GOLD = [0.76, 0, 0.24, 1] as const;
const BASE = "/try/scenic";
const SANS = "var(--font-inter), 'Inter', system-ui, sans-serif";

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

  return (
    <div className="scenic min-h-screen overflow-hidden font-sans" style={{ background: "#f3ebe4", fontFamily: SANS, color: "#1c1c1c" }}>
      {/* minimal nav accents */}
      <Star size={30} fill="currentColor" strokeWidth={0} style={{ position: "fixed", top: 30, left: 30, zIndex: 1001 }} className="text-black max-[850px]:text-white" aria-label={brand} />
      <button type="button" aria-label="Menu" style={{ position: "fixed", top: 30, right: 30, zIndex: 300 }} className="text-white transition-transform duration-300 ease-out hover:scale-110">
        <Menu size={32} />
      </button>

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

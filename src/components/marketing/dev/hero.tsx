"use client";

import { useEffect, useRef } from "react";
import {
  DEV_HERO_VIDEO,
  DEV_HERO_VIDEO_WEBM,
  DEV_HERO_POSTER,
  DEV_BOOKING_URL,
} from "./constants";

// Prisma-style palette: warm cream text over dark cinematic footage.
const CREAM = "#E1E0CC";

// Film-grain noise overlay (inline SVG feTurbulence, same recipe as the
// source design) — sits over the video with mix-blend-overlay.
const NOISE_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/**
 * Hero, restyled after the Prisma creative-studio template: fullscreen looping
 * video (a lone builder on a laptop above the clouds), bottom-anchored content
 * on a 12-column grid — giant cream wordmark left, short manifesto + single
 * pill CTA right. Bottom-heavy gradient keeps the copy readable; a subtle
 * noise overlay gives the footage its filmic texture.
 *
 * The video is self-hosted (WebM preferred, MP4 fallback) with a poster frame
 * that paints instantly. `.muted` is forced imperatively and `.play()` is called
 * via ref because the JSX `muted` attribute alone is unreliable for autoplay.
 */
const DevHero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const p = el.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  // Parallax: the hero inner drifts and fades as you scroll past it.
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      const y = window.scrollY;
      inner.style.transform = `translateY(${Math.min(y * 0.16, 150)}px)`;
      inner.style.opacity = String(Math.max(0.05, 1 - y / 750));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative overflow-hidden bg-dark"
      style={{ minHeight: "100svh" }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={DEV_HERO_POSTER}
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={DEV_HERO_VIDEO_WEBM} type="video/webm" />
        <source src={DEV_HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Filmic grain over the footage. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_URI}")` }}
      />

      {/* Bottom-heavy gradient: clear mid-frame, darkens where the copy sits. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
      />

      <div
        ref={innerRef}
        className="absolute inset-x-0 bottom-0 grid grid-cols-12 items-end gap-x-6 gap-y-8 px-5 pb-7 md:px-9 md:pb-9"
        style={{ willChange: "transform" }}
      >
        <h1
          data-dev-anim
          className="col-span-12 m-0 font-subheading font-medium lg:col-span-8"
          style={{
            fontSize: "clamp(64px, 15vw, 240px)",
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
            color: CREAM,
            animation: "fadeUp 0.8s ease-out 1.15s both",
          }}
        >
          <span className="relative inline-block">
            Rhythmiq
            <span aria-hidden className="absolute -right-[0.32em] top-[0.06em] text-[0.31em]">
              *
            </span>
          </span>
        </h1>

        <div className="col-span-12 flex flex-col items-start gap-6 lg:col-span-4 lg:pb-3">
          <p
            data-dev-anim
            className="m-0 max-w-[40ch]"
            style={{
              fontSize: "clamp(14px, 1.15vw, 17px)",
              lineHeight: 1.25,
              color: "rgba(225, 224, 204, 0.72)",
              animation: "fadeUp 0.8s ease-out 1.35s both",
            }}
          >
            Rhythmiq Dev is a collective of senior engineers building websites, web apps
            and mobile products for businesses everywhere, bound not by an office or a
            timezone but by the craft of shipping software that works.
          </p>

          <a
            data-dev-anim
            href={DEV_BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 rounded-full py-1.5 pl-6 pr-1.5 font-semibold text-black no-underline transition-all duration-200 hover:gap-3"
            style={{
              background: CREAM,
              fontSize: "15px",
              animation: "fadeUp 0.8s ease-out 1.55s both",
            }}
          >
            Book a call
            <span
              className="grid h-10 w-10 place-items-center rounded-full bg-black transition-transform duration-200 group-hover:scale-110"
              style={{ color: CREAM }}
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DevHero;

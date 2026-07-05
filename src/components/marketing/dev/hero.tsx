"use client";

import { useEffect, useRef } from "react";
import {
  DEV_HERO_VIDEO,
  DEV_HERO_VIDEO_WEBM,
  DEV_HERO_POSTER,
  DEV_BOOKING_URL,
} from "./constants";

/**
 * Hero: fullscreen looping video (the `video-dark` variant, the approved
 * default). A soft radial scrim sits behind the copy so the white headline and
 * subtext stay readable over any frame, without a full flat overlay on the
 * footage. Primary "Book a call" is a solid coral pill; secondary "See what we
 * build" is a glass-outline pill so both read clearly.
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

  // Parallax: the hero inner drifts up and fades as you scroll past it.
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
      className="relative flex items-center justify-center overflow-hidden bg-dark"
      style={{ minHeight: "92vh" }}
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

      {/* Localized scrim: darkens just behind the copy, fades to clear at the
          edges so the video reads untouched. Keeps the text legible over any frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 78% 58% at 50% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 42%, rgba(0,0,0,0) 74%)",
        }}
      />

      <div
        ref={innerRef}
        className="wrap relative flex w-full flex-col items-center text-center text-white"
        style={{ paddingBlock: "130px 90px", willChange: "transform" }}
      >
        <h1
          data-dev-anim
          className="m-0 font-subheading font-normal max-w-[14ch]"
          style={{
            fontSize: "clamp(52px, 8.4vw, 128px)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            textShadow: "0 2px 28px rgba(0,0,0,0.5)",
            animation: "fadeUp 0.8s ease-out 1.15s both",
          }}
        >
          Where your business{" "}
          <em className="not-italic text-hlOnDark">rises above</em> the noise
          <em className="not-italic text-hlOnDark">.</em>
        </h1>

        <p
          data-dev-anim
          className="mt-7 mb-0 max-w-[42ch] font-medium"
          style={{
            fontSize: "clamp(17px, 1.5vw, 21px)",
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.97)",
            textShadow: "0 2px 20px rgba(0,0,0,0.65)",
            animation: "fadeUp 0.8s ease-out 1.35s both",
          }}
        >
          Websites, web apps, and mobile, built right the first time by the RhythmiqCX studio.
        </p>

        <div
          data-dev-anim
          className="mt-11 flex flex-wrap justify-center gap-3.5"
          style={{ animation: "fadeUp 0.8s ease-out 1.55s both" }}
        >
          {/* Primary: solid coral, lifted off the footage with a soft shadow. */}
          <a
            href={DEV_BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center rounded-full bg-coral font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral2"
            style={{
              padding: "16px 42px",
              fontSize: "16px",
              boxShadow: "0 16px 38px -12px rgba(0,0,0,0.6)",
            }}
          >
            Book a call
          </a>

          {/* Secondary: glass-outline pill so it reads as a real button. */}
          <a
            href="#services"
            className="group inline-flex items-center gap-2 rounded-full font-semibold text-white no-underline transition-all duration-200 hover:bg-white/15"
            style={{
              padding: "16px 32px",
              fontSize: "16px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.55)",
              boxShadow: "0 10px 28px -14px rgba(0,0,0,0.55)",
            }}
          >
            See what we build{" "}
            <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DevHero;

"use client";

import { useEffect, useRef } from "react";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta, secondaryCta } from "./util";
import ParticleField from "./particle-field";

/**
 * Hero — fullscreen (100svh), dispatches on `data.hero.mode`. The copy layer is
 * identical across modes (business name + one-liner + CTAs); only the background
 * swaps: a drifting aurora-gradient, a particle network, a Ken-Burns photo, or a
 * self-hosted stock video. Copy drifts + fades on scroll (parallax), a radial
 * scrim + vignette keep text legible, and an animated cue invites the scroll.
 * All motion respects prefers-reduced-motion.
 */
const TryHero = ({ data }: { data: Prospect }) => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dark = data.theme.scheme === "dark";
  const mode = data.hero.mode;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const p = el.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  // Parallax: hero copy drifts up + fades as you scroll past.
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      const y = window.scrollY;
      inner.style.transform = `translateY(${Math.min(y * 0.18, 170)}px)`;
      inner.style.opacity = String(Math.max(0.05, 1 - y / 820));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cta = primaryCta(data);
  const cta2 = secondaryCta(data, cta);
  const overline = data.business.tagline;

  const onImage = mode === "ken-burns" || mode === "video"; // white copy over media
  const scrim = onImage
    ? "radial-gradient(ellipse 95% 80% at 50% 42%, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.72) 100%)"
    : dark
      ? "radial-gradient(ellipse 75% 60% at 50% 48%, rgba(10,9,8,0) 0%, rgba(10,9,8,0.55) 100%)"
      : "radial-gradient(ellipse 75% 60% at 50% 48%, rgba(250,248,243,0) 0%, rgba(250,248,243,0.35) 78%, var(--bg) 100%)";

  return (
    <section
      id="top"
      aria-label="Hero"
      className="try-grain relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100svh", background: "var(--bg)" }}
    >
      {/* ---- Background layer ---- */}
      {mode === "gradient" && (
        <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ background: "var(--bg)" }}>
          <span
            className="try-drift-1 absolute rounded-full"
            style={{ width: "70vw", height: "70vw", left: "12%", top: "8%", background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)", opacity: dark ? 0.55 : 0.5, filter: "blur(30px)", willChange: "transform" }}
          />
          <span
            className="try-drift-2 absolute rounded-full"
            style={{ width: "58vw", height: "58vw", left: "58%", top: "34%", background: "radial-gradient(circle, var(--accent) 0%, transparent 62%)", opacity: dark ? 0.38 : 0.3, filter: "blur(40px)", willChange: "transform" }}
          />
          <span
            className="try-drift-3 absolute rounded-full"
            style={{ width: "52vw", height: "52vw", left: "30%", top: "62%", background: "radial-gradient(circle, var(--fg2) 0%, transparent 64%)", opacity: dark ? 0.2 : 0.16, filter: "blur(44px)", willChange: "transform" }}
          />
          {/* vignette for depth */}
          <span className="absolute inset-0" style={{ background: `radial-gradient(ellipse 90% 90% at 50% 40%, transparent 55%, ${dark ? "rgba(0,0,0,0.5)" : "rgba(25,24,20,0.10)"} 100%)` }} />
        </div>
      )}

      {mode === "particles" && (
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--bg)" }}>
          <ParticleField accent={data.theme.accent} dark={dark} />
        </div>
      )}

      {mode === "ken-burns" && data.hero.photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.hero.photo} alt="" aria-hidden className="try-kenburns absolute inset-0 h-full w-full object-cover" />
      )}

      {mode === "video" && (data.hero.videoWebm || data.hero.videoMp4) && (
        <video ref={videoRef} autoPlay loop muted playsInline preload="auto" poster={data.hero.poster} aria-hidden className="absolute inset-0 h-full w-full object-cover">
          {data.hero.videoWebm && <source src={data.hero.videoWebm} type="video/webm" />}
          {data.hero.videoMp4 && <source src={data.hero.videoMp4} type="video/mp4" />}
        </video>
      )}

      {/* ---- Scrim ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: scrim }} />

      {/* ---- Copy ---- */}
      <div
        ref={innerRef}
        className="wrap relative z-10 flex w-full flex-col items-center text-center"
        style={{ paddingBlock: "140px 120px", willChange: "transform", color: onImage ? "#FFFFFF" : "var(--fg)" }}
      >
        <span
          data-try-anim
          className="mb-7 inline-flex max-w-[90vw] items-center gap-2.5 rounded-full px-4 py-2 text-center font-mono text-[11px] font-medium uppercase leading-snug tracking-[0.12em] sm:text-[12px] sm:tracking-[0.16em]"
          style={{
            color: onImage ? "#FFFFFF" : "var(--fg2)",
            background: onImage ? "rgba(255,255,255,0.12)" : "var(--accent-soft)",
            border: `1px solid ${onImage ? "rgba(255,255,255,0.28)" : "var(--accent-line)"}`,
            backdropFilter: onImage ? "blur(6px)" : undefined,
            WebkitBackdropFilter: onImage ? "blur(6px)" : undefined,
            animationDelay: "0.85s",
          }}
        >
          <span className="inline-block h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
          {overline ?? "Now welcoming guests"}
        </span>

        <h1
          data-try-anim
          className="m-0 max-w-[15ch] font-heading font-medium"
          style={{
            fontSize: "clamp(40px, 9vw, 132px)",
            lineHeight: 0.94,
            letterSpacing: "-0.035em",
            textShadow: onImage ? "0 2px 40px rgba(0,0,0,0.5)" : "none",
            animationDelay: "1.0s",
          }}
        >
          {data.business.name}
        </h1>

        <p
          data-try-anim
          className="mt-8 mb-0 max-w-[44ch] font-sans"
          style={{
            fontSize: "clamp(18px, 1.7vw, 23px)",
            lineHeight: 1.5,
            color: onImage ? "rgba(255,255,255,0.95)" : "var(--fg2)",
            textShadow: onImage ? "0 2px 22px rgba(0,0,0,0.6)" : "none",
            animationDelay: "1.2s",
          }}
        >
          {data.business.oneLiner}
        </p>

        <div data-try-anim className="mt-12 flex flex-wrap justify-center gap-3.5" style={{ animationDelay: "1.4s" }}>
          <a
            href={cta.href}
            {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
            className="inline-flex items-center rounded-full font-sans font-semibold no-underline transition-transform duration-200 hover:-translate-y-0.5"
            style={{ padding: "17px 44px", fontSize: "16px", background: "var(--accent)", color: "var(--accent-ink)", boxShadow: "0 18px 44px -12px rgba(0,0,0,0.5)" }}
          >
            {cta.label}
          </a>
          {cta2 && (
            <a
              href={cta2.href}
              className="inline-flex items-center gap-2 rounded-full font-sans font-semibold no-underline transition-colors duration-200"
              style={{
                padding: "17px 32px",
                fontSize: "16px",
                color: onImage ? "#FFFFFF" : "var(--fg)",
                background: onImage ? "rgba(255,255,255,0.10)" : "transparent",
                backdropFilter: onImage ? "blur(6px)" : undefined,
                WebkitBackdropFilter: onImage ? "blur(6px)" : undefined,
                border: `1px solid ${onImage ? "rgba(255,255,255,0.5)" : "var(--line)"}`,
              }}
            >
              {cta2.label}
            </a>
          )}
        </div>
      </div>

      {/* ---- Scroll cue ---- */}
      <div aria-hidden className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
        <div
          className="try-scroll-cue flex h-9 w-[22px] items-start justify-center rounded-full pt-2"
          style={{ border: `1.5px solid ${onImage ? "rgba(255,255,255,0.6)" : "var(--line)"}` }}
        >
          <span className="block h-[6px] w-[2px] rounded-full" style={{ background: onImage ? "rgba(255,255,255,0.85)" : "var(--fg2)" }} />
        </div>
      </div>
    </section>
  );
};

export default TryHero;

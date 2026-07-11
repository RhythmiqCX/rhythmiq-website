"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { X } from "lucide-react";
import type { Prospect } from "@/lib/try/schema";

/**
 * Real estate · Luxury estate — a faithful build of the "Velar." single-page
 * luxury property site: a typewriter preloader that slides up to reveal an
 * oversized Syne hero over a cinematic render, a scroll-driven building that
 * rises from below and scales up as it pins into a dark sticky statement +
 * count-up stats block, and a hover-expand video gallery that slides over it.
 * Fixed identity (warm off-white + deep teal); theme.accent is ignored.
 *
 * DATA: business.name → wordmark + typewriter · business.tagline → hero top word
 *   ("LIVE IN") · signature → hero headline ("IRREPLACEABLE") · business.oneLiner
 *   → hero subtitle · business.about → dark statement paragraph · highlights[0..2]
 *   → count-up stats · hero.photo → hero background · hero.poster → the rising
 *   building PNG · photos[0..4] → the five gallery videos (.mp4).
 */

const TEAL = "#213138"; // preloader bg + default logo
const CREAM = "#f5f0ea"; // page canvas
const DARK = "#1a1a1a"; // statement + gallery bg
const SYNE = "var(--font-syne), ui-sans-serif, sans-serif";
const INTER = "var(--font-inter), ui-sans-serif, sans-serif";
const NAV = ["Residences", "Story", "Listings", "Inquire"];
// Demo site: menu entries all lead back to the prototype showcase.
const NAV_HREF = "https://try.rhythmiqcx.com";

// House geometry. The building art (house.webp) is transparent sky for its top
// ~40% — the opaque "red mass" starts at RED_TOP_RATIO of the image height.
// We sink the image so that red mass can never climb over the copy: it may
// start no higher than REST_RED_TOP of the viewport at rest (hero + dark-entry)
// and settles at FINAL_RED_TOP as the dark statement section plays out.
const FINAL_SCALE = 1.28;
const RED_TOP_RATIO = 0.4;
const REST_RED_TOP = 0.42;
const FINAL_RED_TOP = 0.7;

/** How far (px) the house must sink so its red mass starts at `target` × vh. */
function sinkFor(imgH: number, scale: number, target: number, vh: number): number {
  return Math.max(0, (1 - RED_TOP_RATIO) * imgH * scale - (1 - target) * vh);
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Wordmark that renders a trailing "." heavier, like the reference. */
function Wordmark({ text, style }: { text: string; style?: CSSProperties }) {
  const hasDot = text.endsWith(".");
  const body = hasDot ? text.slice(0, -1) : text;
  return (
    <span style={{ fontFamily: SYNE, letterSpacing: "-0.02em", ...style }}>
      <span style={{ fontWeight: 700 }}>{body}</span>
      {hasDot && <span style={{ fontWeight: 900 }}>.</span>}
    </span>
  );
}

/** Count from 0 → end once the element scrolls into view. */
function CountUp({ end, suffix, className, style }: { end: number; suffix: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done.current) {
            done.current = true;
            const dur = 2000;
            let raf = 0;
            const t0 = performance.now();
            const tick = (now: number) => {
              const p = clamp01((now - t0) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(eased * end));
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            return () => cancelAnimationFrame(raf);
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);
  return (
    <span ref={ref} className={className} style={style}>
      {val}
      {suffix}
    </span>
  );
}

/** Split a stat like "120+" / "98%" into a number + suffix for CountUp. */
function splitStat(value: string): { end: number; suffix: string } {
  const m = value.match(/^(\d+)(.*)$/);
  if (!m) return { end: 0, suffix: value };
  return { end: parseInt(m[1], 10), suffix: m[2] };
}

const LuxuryEstate = ({ data }: { data: Prospect }) => {
  const name = data.business.name || "Velar.";
  const topWord = (data.business.tagline || "Live in").toUpperCase();
  const bigWord = (data.signature || "Irreplaceable").toUpperCase();
  const subtitle = data.business.oneLiner;
  const statement = data.business.about || subtitle;
  const heroBg = data.hero.photo;
  const houseImg = data.hero.poster;
  const stats = (data.highlights ?? []).slice(0, 3);
  const videos = data.photos.slice(0, 5);

  // preloader / entrance
  const [typed, setTyped] = useState(0);
  const [typedDone, setTypedDone] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [lifting, setLifting] = useState(false);
  const [liftDone, setLiftDone] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [restSink, setRestSink] = useState(0);

  // nav
  const [navOnDark, setNavOnDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const houseWrapRef = useRef<HTMLDivElement>(null);
  const houseInnerRef = useRef<HTMLDivElement>(null);

  // Typewriter. The lift is released separately, once assets are also in.
  useEffect(() => {
    const CHAR = 140;
    const START = 600;
    const timers: number[] = [];
    for (let i = 1; i <= name.length; i++) {
      timers.push(window.setTimeout(() => setTyped(i), START + i * CHAR));
    }
    timers.push(window.setTimeout(() => setTypedDone(true), START + name.length * CHAR + 700));
    return () => timers.forEach(clearTimeout);
  }, [name.length]);

  // Preload the two hero-critical images while the typewriter plays, so the
  // preloader never lifts onto a half-loaded hero. Hard 6s cap so a failed
  // asset can't trap the page.
  useEffect(() => {
    let alive = true;
    const load = (src?: string | null) =>
      new Promise<void>((resolve) => {
        if (!src) return resolve();
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });
    const cap = window.setTimeout(() => {
      if (alive) setAssetsReady(true);
    }, 6000);
    Promise.all([load(heroBg), load(houseImg)]).then(() => {
      if (alive) setAssetsReady(true);
    });
    return () => {
      alive = false;
      clearTimeout(cap);
    };
  }, [heroBg, houseImg]);

  // Lift sequence: typewriter finished AND hero assets ready.
  useEffect(() => {
    if (!typedDone || !assetsReady) return;
    const inner = houseInnerRef.current;
    if (inner) setRestSink(sinkFor(inner.offsetHeight, 1, REST_RED_TOP, window.innerHeight));
    setShowCursor(false);
    const timers: number[] = [
      window.setTimeout(() => setLifting(true), 150),
      window.setTimeout(() => setHeroVisible(true), 1450),
      window.setTimeout(() => setLiftDone(true), 2250),
    ];
    return () => timers.forEach(clearTimeout);
  }, [typedDone, assetsReady]);

  // Scroll: nav colour + scroll-driven house transform.
  const onScroll = useCallback(() => {
    const dark = darkRef.current;
    if (dark) {
      const r = dark.getBoundingClientRect();
      setNavOnDark(r.top <= 4 && r.bottom > 60);
    }

    const hero = heroRef.current;
    const wrap = houseWrapRef.current;
    const inner = houseInnerRef.current;
    if (!hero || !wrap || !inner || !dark) return;
    if (!liftDone) return;

    const vh = window.innerHeight;
    const heroTop = hero.offsetTop;
    const heroH = hero.offsetHeight;
    const darkBottomAbs = dark.parentElement
      ? dark.parentElement.offsetTop + dark.parentElement.offsetHeight
      : heroTop + heroH;
    const y = window.scrollY;

    const start = heroTop + heroH * 0.3;
    const end = Math.max(start + 1, darkBottomAbs - vh);
    const progress = clamp01((y - start) / (end - start));
    const t = smooth(smooth(progress));

    const scale = 1 + (FINAL_SCALE - 1) * t;
    // Grow from the bottom-center while sinking from the resting line to the
    // settled line, so the red mass reads as a cinematic base anchoring the
    // dark stats — it can never climb over the statement text above it.
    const imgH = inner.offsetHeight;
    const from = sinkFor(imgH, 1, REST_RED_TOP, vh);
    const to = sinkFor(imgH, FINAL_SCALE, FINAL_RED_TOP, vh);
    inner.style.transform = `translateY(${from + (to - from) * t}px) scale(${scale})`;
    wrap.style.opacity = progress > 0.985 ? "0" : "1";
  }, [liftDone]);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  const navColor = navOnDark ? "#ffffff" : TEAL;

  return (
    <div className="velar" style={{ background: CREAM, fontFamily: INTER, color: TEAL, overflowX: "clip" }}>
      {/* ---------------- Preloader ---------------- */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: TEAL,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: lifting ? "translateY(-100%)" : "translateY(0)",
          transition: liftDone ? "none" : "transform 1.5s cubic-bezier(0.45,0,0.15,1)",
          pointerEvents: liftDone ? "none" : "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontFamily: SYNE, fontSize: "2.6rem", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
            {name.split("").map((ch, i) => (
              <span key={i} style={{ opacity: i < typed ? 1 : 0, fontWeight: ch === "." ? 900 : 700 }}>
                {ch}
              </span>
            ))}
          </span>
          {showCursor && (
            <span
              className="velar-cursor"
              style={{ display: "inline-block", width: 3, height: "1.1em", marginLeft: 2, background: "#fff", borderRadius: 2 }}
            />
          )}
        </div>
      </div>

      {/* ---------------- Fixed nav ---------------- */}
      <nav
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between" }}
        className="px-6 py-5 md:px-10 md:py-6 lg:px-16"
      >
        <Wordmark text={name} style={{ fontSize: "1.25rem", color: navColor, transition: "color 0.35s ease" }} />
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMenuOpen((o) => !o)}
          style={{ color: navColor, transition: "color 0.35s ease" }}
          className="group flex h-6 w-7 flex-col items-end justify-center gap-[7px]"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <>
              <span className="h-px w-7 transition-all group-hover:w-5" style={{ background: navColor }} />
              <span className="h-px w-7" style={{ background: navColor }} />
            </>
          )}
        </button>
      </nav>

      {/* mobile menu overlay */}
      {menuOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 40, background: CREAM }}
          className="flex flex-col items-center justify-center gap-6"
        >
          {NAV.map((l) => (
            <a
              key={l}
              href={NAV_HREF}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: SYNE }}
              className="text-4xl font-light uppercase tracking-widest text-black no-underline transition-colors hover:text-gray-500"
            >
              {l}
            </a>
          ))}
        </div>
      )}

      {/* ---------------- Hero ---------------- */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "visible",
          backgroundImage: heroBg ? `url("${heroBg}")` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="velar-hero-block"
          style={{
            position: "relative",
            zIndex: 10,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(-28px)",
            transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
          }}
        >
          <div className="velar-hero-top flex items-end justify-between px-6 md:px-10 lg:px-16" style={{ marginBottom: "-0.04em" }}>
            <span className="velar-own" style={{ fontFamily: SYNE, fontWeight: 800, textTransform: "uppercase", color: "#000", letterSpacing: "-0.03em", lineHeight: 1 }}>
              {topWord}
            </span>
            <p
              className="velar-sub-desktop"
              style={{ fontFamily: SYNE, fontWeight: 700, fontSize: "clamp(10px,0.95vw,14px)", maxWidth: 300, opacity: 0.7, lineHeight: 1.6, marginBottom: "0.2em", letterSpacing: "0.02em", textAlign: "right", margin: 0 }}
            >
              {subtitle}
            </p>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div className="velar-big px-6 md:px-10 lg:px-16" style={{ fontFamily: SYNE, fontWeight: 800, textTransform: "uppercase", color: "#000", letterSpacing: "-0.03em" }}>
              {bigWord}
            </div>
          </div>
          <p className="velar-sub-mobile px-6" style={{ fontFamily: SYNE, fontWeight: 600, fontSize: "clamp(12px,3vw,15px)", opacity: 0.65, marginTop: "0.9em" }}>
            {subtitle}
          </p>
        </div>
      </section>

      {/* ---------------- Scroll-driven house ---------------- */}
      {houseImg && (
        <div
          ref={houseWrapRef}
          aria-hidden
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            zIndex: 22,
            width: "100%",
            minWidth: 1400,
            transform: "translateX(-50%)",
            pointerEvents: "none",
            willChange: "transform, opacity",
          }}
        >
          <div
            ref={houseInnerRef}
            style={{
              transformOrigin: "bottom center",
              transform: lifting ? `translateY(${restSink}px)` : "translateY(102vh)",
              transition: liftDone ? "none" : "transform 1.5s cubic-bezier(0.45,0,0.15,1) 0.4s",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={houseImg} alt="" style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      )}

      {/* ---------------- Dark statement + stats (sticky) ---------------- */}
      <div style={{ position: "relative", height: "200vh", zIndex: 20 }}>
        <div style={{ height: "4vh", background: DARK }} />
        <div
          ref={darkRef}
          style={{ position: "sticky", top: 0, height: "100vh", background: DARK, overflow: "hidden" }}
          className="flex flex-col justify-start px-6 md:px-10 lg:px-16"
        >
          <div className="velar-s2-content" style={{ paddingTop: "clamp(48px,7vh,90px)" }}>
            <p
              className="velar-statement"
              style={{ fontFamily: INTER, fontWeight: 300, color: "#e8e4df", letterSpacing: "-0.02em", lineHeight: 1.35, fontSize: "clamp(22px,2.6vw,42px)", maxWidth: 1200, margin: "0 auto" }}
            >
              {statement}
            </p>
            <div className="velar-stats" style={{ maxWidth: 1200, margin: "clamp(48px,6vw,80px) auto 0", display: "flex" }}>
              {stats.map((s, i) => {
                const { end, suffix } = splitStat(s.value);
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.2)",
                      paddingLeft: i === 0 ? 0 : "clamp(20px,2.5vw,40px)",
                    }}
                  >
                    <CountUp
                      end={end}
                      suffix={suffix}
                      style={{ fontFamily: INTER, fontWeight: 300, color: "#fff", fontSize: "clamp(36px,4.5vw,72px)", lineHeight: 1.1, display: "block" }}
                    />
                    <div style={{ fontFamily: INTER, fontWeight: 400, color: "rgba(255,255,255,0.6)", fontSize: "clamp(12px,1.1vw,16px)", marginTop: "clamp(4px,0.5vw,8px)", letterSpacing: "0.01em" }}>
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Hover-expand gallery (slides over statement) ---------------- */}
      <div
        className="velar-gallery"
        style={{ position: "relative", zIndex: 25, marginTop: "-100vh", background: DARK, height: "100vh", overflow: "hidden" }}
      >
        {/* Giant scrolling wordmark. Top-anchored so it peeks above the video
            row (centered, it hid behind the opaque tiles), and animated so it
            reads as deliberate branding rather than a misprint. */}
        <div className="velar-ticker" aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-start", paddingTop: "3vh", overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
          <div className="velar-ticker-track" style={{ display: "flex" }}>
            {[0, 1].map((copy) => (
              <span key={copy} style={{ fontFamily: SYNE, fontWeight: 800, fontSize: "clamp(80px,10vw,160px)", color: "rgba(255,255,255,0.12)", whiteSpace: "pre", letterSpacing: "-0.02em", userSelect: "none" }}>
                {`${name}   ${name}   ${name}   ${name}   `}
              </span>
            ))}
          </div>
        </div>
        <div className="velar-gallery-content" style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(24px,4vw,60px)" }}>
          <div className="velar-row" style={{ display: "flex", gap: 6, height: "70%", width: "100%", maxWidth: 1200 }}>
            {videos.map((src, i) => (
              <div key={i} className="velar-item" style={{ flex: "1 1 0%", height: "100%", borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "flex 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
                <video src={src} autoPlay loop muted playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryEstate;

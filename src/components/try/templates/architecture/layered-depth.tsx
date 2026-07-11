"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta } from "../../sections/util";

/**
 * Architecture · Layered depth — a faithful build of the "Qelora" studio site:
 * a two-section, all-inline-styled page. The hero layers an ambient video, a
 * warm wash, an alpha-WebM bird that enters → idles → leaves on scroll, a giant
 * centred wordmark, a parallax sculpture slab, frosted nav pills, and two
 * bottom panels (tagline + CTA card). Section 2 is a full-bleed video with a
 * centred statement. Fixed warm/dark identity; theme.accent is ignored.
 *
 * DATA: business.name → wordmark + nav · business.tagline → hero tagline panel
 *   · business.oneLiner → CTA-card line · signature → Section-2 statement ·
 *   business.about → Section-2 subtext · hero.videoMp4 → hero bg · hero.poster
 *   → sculpture slab · photos[0] → CTA-card photo · photos[1] → Section-2 bg.
 */

const FONT = "var(--font-bricolage), ui-sans-serif, sans-serif";
const INK = "#241f21";
const GLASS = (a: number) => `rgba(248,245,240,${a})`;
const BASE = "/try/qelora";
const NAV = ["Projects", "Studio", "Responsibility", "Archive"];

type BirdState = "enter" | "idle1" | "idle2" | "leave" | "hidden";

const ArrowDown = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);
const Pin = () => (
  <svg width={24} height={28} viewBox="0 0 24 28" fill="none" stroke="#2a2420" strokeWidth={1.4} aria-hidden>
    <path d="M12 27c6-7 9-11 9-15A9 9 0 1 0 3 12c0 4 3 8 9 15Z" />
    <circle cx={12} cy={11} r={3} />
  </svg>
);
const Envelope = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#241f21" strokeWidth={1.6} aria-hidden>
    <rect x={3} y={5} width={18} height={14} rx={2} />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const on = () => setM(window.innerWidth < 768);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return m;
}

const LayeredDepth = ({ data }: { data: Prospect }) => {
  const name = data.business.name || "Qelora";
  const tagline = data.business.tagline || "Designing places beyond what's expected";
  const ctaLine = data.business.oneLiner || "Every lasting space begins with a quiet dialogue.";
  const statement = data.signature || "What stands the test of time is all that guides the work.";
  const subtext = data.business.about || "Civic bodies and private clients trust us to shape resilient communities and purposeful places.";
  const heroVideo = data.hero.videoMp4 || `${BASE}/bg.mp4`;
  const slab = data.hero.poster || `${BASE}/slab.webp`;
  const ctaPhoto = data.photos[0] || `${BASE}/cta.webp`;
  const bg2 = data.photos[1] || `${BASE}/bg2.mp4`;
  const cta = primaryCta(data);

  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bird, setBird] = useState<BirdState>("enter");
  const birdRef = useRef<BirdState>("enter");
  const setBirdState = (s: BirdState) => {
    birdRef.current = s;
    setBird(s);
  };

  const enterRef = useRef<HTMLVideoElement>(null);
  const idle1Ref = useRef<HTMLVideoElement>(null);
  const idle2Ref = useRef<HTMLVideoElement>(null);
  const leaveRef = useRef<HTMLVideoElement>(null);

  const play = (el: HTMLVideoElement | null) => {
    if (!el) return;
    el.currentTime = 0;
    const go = () => el.play().catch(() => {});
    if (el.readyState >= 2) go();
    else el.addEventListener("canplay", go, { once: true });
  };

  // bird state machine
  useEffect(() => {
    [enterRef, idle1Ref, idle2Ref, leaveRef].forEach((r) => r.current?.load());
    play(enterRef.current);
  }, []);

  // scroll: parallax + bird enter/leave
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      if (y > 10 && birdRef.current !== "leave") {
        [enterRef, idle1Ref, idle2Ref].forEach((r) => {
          if (r.current) {
            r.current.pause();
            r.current.currentTime = 0;
          }
        });
        setBirdState("leave");
        play(leaveRef.current);
      } else if (y <= 10 && birdRef.current === "leave") {
        leaveRef.current?.pause();
        setBirdState("enter");
        play(enterRef.current);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onEnterEnd = () => {
    if (birdRef.current === "leave") return;
    setBirdState("idle1");
    play(idle1Ref.current);
  };
  const onIdle1End = () => {
    if (birdRef.current === "leave") return;
    setBirdState("idle2");
    play(idle2Ref.current);
  };
  const onIdle2End = () => {
    if (birdRef.current === "leave") return;
    setBirdState("idle1");
    play(idle1Ref.current);
  };

  const birdStyle: CSSProperties = isMobile
    ? { position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)", width: "100%", height: "auto" }
    : { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" };

  const bottomOffset = isMobile ? 24 : 36;

  return (
    <div style={{ fontFamily: FONT, background: "#0e0c0a", overflowX: "hidden" }}>
      {/* ===================== HERO ===================== */}
      <section style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "visible", fontFamily: FONT }}>
        {/* bg video */}
        <video autoPlay muted loop playsInline preload="metadata" style={{ position: "absolute", inset: 0, width: "100%", height: "100vh", objectFit: "cover", zIndex: 0 }}>
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* warm overlay */}
        <div style={{ position: "absolute", inset: 0, height: "100vh", background: "rgba(235,230,218,0.12)", pointerEvents: "none", zIndex: 1 }} />

        {/* bird system */}
        <div aria-hidden style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", pointerEvents: "none", zIndex: 8 }}>
          <video ref={enterRef} muted playsInline preload="auto" onEnded={onEnterEnd} style={{ ...birdStyle, display: bird === "enter" ? "block" : "none" }}>
            <source src={`${BASE}/bird-enter.webm`} type="video/webm" />
          </video>
          <video ref={idle1Ref} muted playsInline preload="auto" onEnded={onIdle1End} style={{ ...birdStyle, display: bird === "idle1" ? "block" : "none" }}>
            <source src={`${BASE}/bird-idle1.webm`} type="video/webm" />
          </video>
          <video ref={idle2Ref} muted playsInline preload="auto" onEnded={onIdle2End} style={{ ...birdStyle, display: bird === "idle2" ? "block" : "none" }}>
            <source src={`${BASE}/bird-idle2.webm`} type="video/webm" />
          </video>
          <video ref={leaveRef} muted playsInline preload="auto" style={{ ...birdStyle, display: bird === "leave" ? "block" : "none" }}>
            <source src={`${BASE}/bird-leave.webm`} type="video/webm" />
          </video>
        </div>

        {/* center wordmark */}
        <div style={{ position: "absolute", inset: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 5 }}>
          <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: isMobile ? "26vw" : "22vw", letterSpacing: "-0.05em", color: INK, lineHeight: 1, marginBottom: isMobile ? "8vh" : "12vh" }}>
            {name}
          </span>
        </div>

        {/* sculpture slab with parallax */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slab}
          alt=""
          aria-hidden
          style={{ position: "absolute", top: "50%", left: "50%", transform: `translateX(-50%) translateY(${-scrollY * 0.3}px)`, width: isMobile ? "220vw" : "160vw", height: "auto", pointerEvents: "none", willChange: "transform", zIndex: 5 }}
        />

        {/* navbar */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "16px 20px" : "20px 36px", zIndex: 100 }}>
          <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: isMobile ? 20 : 24, letterSpacing: "-0.03em", color: INK }}>
            {name}
            <sup style={{ fontSize: "0.4em", verticalAlign: "super" }}>®</sup>
          </span>
          {!isMobile ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {NAV.map((n, i) => (
                <button key={n} type="button" style={{ position: "relative", background: GLASS(0.92), borderRadius: 12, padding: "13px 22px 8px", height: 40, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.07em", color: INK, fontWeight: i === 0 ? 700 : 500, border: "none", cursor: "pointer" }}>
                  {n}
                  {i === 0 && <span style={{ position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)", width: 3, height: 3, borderRadius: "50%", background: INK }} />}
                </button>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 4, borderRadius: 100, padding: "8px 14px", background: GLASS(0.88), backdropFilter: "blur(12px)", boxShadow: "0 2px 20px rgba(0,0,0,0.1)", fontSize: 13, letterSpacing: "0.06em", color: INK }}>
                EN
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth={2} aria-hidden><path d="m6 9 6 6 6-6" /></svg>
              </div>
            </div>
          ) : (
            <button type="button" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)} style={{ width: 42, height: 42, borderRadius: 100, background: GLASS(0.88), backdropFilter: "blur(12px)", boxShadow: "0 2px 20px rgba(0,0,0,0.1)", border: "none", display: "grid", placeItems: "center", color: INK }}>
              {menuOpen ? (
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth={2} aria-hidden><path d="M18 6 6 18M6 6l12 12" /></svg>
              ) : (
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth={2} aria-hidden><path d="M3 6h18M3 12h18M3 18h18" /></svg>
              )}
            </button>
          )}
        </nav>

        {/* mobile dropdown */}
        {isMobile && menuOpen && (
          <div style={{ position: "fixed", top: 70, left: 16, right: 16, background: GLASS(0.96), backdropFilter: "blur(16px)", borderRadius: 18, padding: 8, boxShadow: "0 8px 40px rgba(0,0,0,0.14)", zIndex: 99 }}>
            {NAV.map((n) => (
              <button key={n} type="button" onClick={() => setMenuOpen(false)} style={{ width: "100%", textAlign: "left", padding: "14px 20px", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.07em", color: INK, background: "none", border: "none", borderBottom: "1px solid rgba(40,36,37,0.08)" }}>
                {n}
              </button>
            ))}
            <div style={{ padding: "14px 20px", fontSize: 13, letterSpacing: "0.06em", color: INK }}>EN</div>
          </div>
        )}

        {/* bottom panels */}
        {!isMobile ? (
          <>
            <div style={{ position: "absolute", left: 36, bottom: bottomOffset + scrollY * 0.5, borderRadius: 18, padding: "22px 28px", maxWidth: 270, background: GLASS(0.72), backdropFilter: "blur(8px)", zIndex: 20 }}>
              <p style={{ fontSize: "clamp(17px,2vw,24px)", lineHeight: 1.28, color: "#282425", letterSpacing: "-0.01em", whiteSpace: "pre-line" }}>{tagline}</p>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(40,36,37,0.2)", display: "flex", alignItems: "center", gap: 8, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#282425" }}>
                Explore our approach <ArrowDown />
              </div>
            </div>

            <a href={cta.href} {...(cta.external ? { target: "_blank", rel: "noopener" } : {})} style={{ position: "absolute", right: 36, bottom: bottomOffset + scrollY * 0.5, borderRadius: 18, width: "clamp(210px,21vw,290px)", height: 180, overflow: "hidden", zIndex: 20, textDecoration: "none", display: "block", backgroundImage: `url("${ctaPhoto}")`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(16,14,12,0.55) 0%, transparent 60%)" }} />
              <p style={{ position: "relative", margin: "18px 20px", color: "#fff", fontSize: 13, lineHeight: 1.35 }}>{ctaLine}</p>
              <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 36, height: 36, borderRadius: 12, background: "#fff", display: "grid", placeItems: "center" }}><Envelope /></span>
                <span style={{ flex: 1, height: 36, borderRadius: 12, background: "#fff", color: INK, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", display: "grid", placeItems: "center" }}>Start a project</span>
              </div>
            </a>
          </>
        ) : (
          <div style={{ position: "absolute", left: 20, right: 20, bottom: bottomOffset + scrollY * 0.5, display: "flex", flexDirection: "column", gap: 12, zIndex: 20 }}>
            <div style={{ background: GLASS(0.72), backdropFilter: "blur(8px)", borderRadius: 16, padding: "18px 20px" }}>
              <p style={{ fontSize: 17, lineHeight: 1.28, color: "#282425", letterSpacing: "-0.01em" }}>{tagline.replace(/\n/g, " ")}</p>
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(40,36,37,0.2)", display: "flex", alignItems: "center", gap: 8, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#282425" }}>
                Explore our approach <ArrowDown />
              </div>
            </div>
            <a href={cta.href} {...(cta.external ? { target: "_blank", rel: "noopener" } : {})} style={{ position: "relative", borderRadius: 16, height: 120, overflow: "hidden", textDecoration: "none", display: "block", backgroundImage: `url("${ctaPhoto}")`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(16,14,12,0.55) 0%, transparent 60%)" }} />
              <p style={{ position: "relative", margin: "14px 16px", color: "#fff", fontSize: 12, lineHeight: 1.35 }}>{ctaLine}</p>
              <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 34, height: 34, borderRadius: 12, background: "#fff", display: "grid", placeItems: "center" }}><Envelope /></span>
                <span style={{ flex: 1, height: 34, borderRadius: 12, background: "#fff", color: INK, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", display: "grid", placeItems: "center" }}>Start a project</span>
              </div>
            </a>
          </div>
        )}
      </section>

      {/* ===================== SECTION 2 ===================== */}
      <section style={{ position: "relative", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", fontFamily: FONT }}>
        <video autoPlay muted loop playsInline preload="metadata" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
          <source src={bg2} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "rgba(242,238,230,0.38)", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", textAlign: "center", padding: "0 24px", zIndex: 2 }}>
          <h2 style={{ fontSize: "clamp(32px,5.5vw,80px)", lineHeight: 1.18, color: "#2a2420", maxWidth: 780, letterSpacing: "-0.025em", fontWeight: 400 }}>{statement}</h2>
        </div>
        <div style={{ position: "absolute", bottom: "clamp(24px,4vh,48px)", left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 24px", zIndex: 2 }}>
          <div style={{ width: 1, height: 56, background: "rgba(42,36,32,0.25)" }} />
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <Pin />
            <p style={{ fontSize: "clamp(11px,1.4vw,13px)", color: "#2a2420", letterSpacing: "0.04em", lineHeight: 1.6, maxWidth: 340, opacity: 0.75, textAlign: "center" }}>{subtext}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LayeredDepth;

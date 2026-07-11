"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta } from "../../sections/util";

/**
 * Architecture · Layered depth — a build of the "Qelora" studio site: the hero
 * layers an ambient video, a warm wash, an alpha bird video that enters →
 * idles → leaves on scroll, a giant centred wordmark, a parallax sculpture
 * slab, frosted nav pills, and two bottom panels (tagline + CTA card). Then:
 * a dark "approach" section (services), a full-bleed video statement, and a
 * dark closing CTA + footer. Fixed warm/dark identity; theme.accent ignored.
 *
 * The bird clips ship as VP9-alpha .webm plus HEVC-alpha .mov — WebKit
 * (Safari + everything on iOS) can't composite webm alpha and would paint a
 * black rectangle, so we UA-sniff and swap the extension.
 *
 * DATA: business.name → wordmark + nav · business.tagline → hero tagline panel
 *   · business.oneLiner → CTA-card line · signature → statement · business.about
 *   → statement subtext · services[0..2] → approach cards · hero.videoMp4 →
 *   hero bg · hero.poster → sculpture slab · photos[0] → CTA-card photo ·
 *   photos[1] → statement bg · contact.address → footer locations line.
 */

const FONT = "var(--font-bricolage), ui-sans-serif, sans-serif";
const INK = "#241f21";
const CREAM = "#f0ece4";
const GLASS = (a: number) => `rgba(248,245,240,${a})`;
const BASE = "/try/qelora";
const NAV = ["Projects", "Studio", "Responsibility", "Archive"];
// Demo site: nav + CTA destinations stay inside our properties.
const NAV_HREF = "https://try.rhythmiqcx.com";

const APPROACH_FALLBACK = [
  { title: "Projects", blurb: "Places designed beyond what's expected — houses, civic rooms, and quiet landmarks." },
  { title: "Studio", blurb: "A quiet dialogue between site, light, and use, carried from first sketch to last detail." },
  { title: "Responsibility", blurb: "Resilient communities and purposeful places, built to hold their meaning over decades." },
];

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
  const [birdExt, setBirdExt] = useState<"webm" | "mov">("webm");
  const birdRef = useRef<BirdState>("enter");
  const approachRef = useRef<HTMLElement>(null);
  const setBirdState = (s: BirdState) => {
    birdRef.current = s;
    setBird(s);
  };

  const services = (data.services.length ? data.services : APPROACH_FALLBACK).slice(0, 3);

  // WebKit engines (Safari, and every browser on iOS) can't composite
  // VP9-alpha webm — swap the bird clips to HEVC-alpha .mov there.
  useEffect(() => {
    const ua = navigator.userAgent;
    const webkitOnly = /iPhone|iPad|iPod/.test(ua) || (/Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR/.test(ua));
    if (webkitOnly) setBirdExt("mov");
  }, []);

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

  // bird state machine (re-arms if the source extension swaps for WebKit)
  useEffect(() => {
    [enterRef, idle1Ref, idle2Ref, leaveRef].forEach((r) => r.current?.load());
    play(enterRef.current);
  }, [birdExt]);

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

  const goApproach = () => approachRef.current?.scrollIntoView({ behavior: "smooth" });

  const birdStyle: CSSProperties = isMobile
    ? { position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)", width: "100%", height: "auto" }
    : { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" };

  const bottomOffset = isMobile ? 24 : 36;

  return (
    <div className="qelora" style={{ fontFamily: FONT, background: "#0e0c0a", overflowX: "hidden" }}>
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
            <source src={`${BASE}/bird-enter.${birdExt}`} type={birdExt === "webm" ? "video/webm" : "video/quicktime"} />
          </video>
          <video ref={idle1Ref} muted playsInline preload="auto" onEnded={onIdle1End} style={{ ...birdStyle, display: bird === "idle1" ? "block" : "none" }}>
            <source src={`${BASE}/bird-idle1.${birdExt}`} type={birdExt === "webm" ? "video/webm" : "video/quicktime"} />
          </video>
          <video ref={idle2Ref} muted playsInline preload="auto" onEnded={onIdle2End} style={{ ...birdStyle, display: bird === "idle2" ? "block" : "none" }}>
            <source src={`${BASE}/bird-idle2.${birdExt}`} type={birdExt === "webm" ? "video/webm" : "video/quicktime"} />
          </video>
          <video ref={leaveRef} muted playsInline preload="auto" style={{ ...birdStyle, display: bird === "leave" ? "block" : "none" }}>
            <source src={`${BASE}/bird-leave.${birdExt}`} type={birdExt === "webm" ? "video/webm" : "video/quicktime"} />
          </video>
        </div>

        {/* center wordmark — lifted so the slab only kisses the letter bases */}
        <div style={{ position: "absolute", inset: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 5 }}>
          <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: isMobile ? "26vw" : "22vw", letterSpacing: "-0.05em", color: INK, lineHeight: 1, marginBottom: isMobile ? "10vh" : "15vh" }}>
            {name}
          </span>
        </div>

        {/* sculpture slab with parallax. 118vw (was 160vw): at 160 the rock hid
            the middle of the wordmark; at 118 it overlaps only the baseline —
            layered, but the name stays readable. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slab}
          alt=""
          aria-hidden
          style={{ position: "absolute", top: "50%", left: "50%", transform: `translateX(-50%) translateY(${-scrollY * 0.3}px)`, width: isMobile ? "170vw" : "118vw", height: "auto", pointerEvents: "none", willChange: "transform", zIndex: 5 }}
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
                <a key={n} href={NAV_HREF} className="qelora-pill" style={{ position: "relative", background: GLASS(0.92), borderRadius: 12, padding: "13px 22px 8px", height: 40, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.07em", color: INK, fontWeight: i === 0 ? 700 : 500, border: "none", cursor: "pointer", textDecoration: "none", display: "inline-block" }}>
                  {n}
                  <span className={`qelora-dot${i === 0 ? " is-active" : ""}`} style={{ position: "absolute", bottom: 3, left: "50%", width: 3, height: 3, borderRadius: "50%", background: INK }} />
                </a>
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
              <a key={n} href={NAV_HREF} onClick={() => setMenuOpen(false)} style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 20px", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.07em", color: INK, background: "none", border: "none", borderBottom: "1px solid rgba(40,36,37,0.08)", textDecoration: "none" }}>
                {n}
              </a>
            ))}
            <div style={{ padding: "14px 20px", fontSize: 13, letterSpacing: "0.06em", color: INK }}>EN</div>
          </div>
        )}

        {/* bottom panels */}
        {!isMobile ? (
          <>
            <div style={{ position: "absolute", left: 36, bottom: bottomOffset + scrollY * 0.5, borderRadius: 18, padding: "22px 28px", maxWidth: 270, background: GLASS(0.72), backdropFilter: "blur(8px)", zIndex: 20 }}>
              <p style={{ fontSize: "clamp(17px,2vw,24px)", lineHeight: 1.28, color: "#282425", letterSpacing: "-0.01em", whiteSpace: "pre-line" }}>{tagline}</p>
              <button type="button" onClick={goApproach} className="qelora-explore" style={{ width: "100%", marginTop: 16, padding: "14px 0 0", background: "none", border: "none", borderTop: "1px solid rgba(40,36,37,0.2)", display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: FONT, textTransform: "uppercase", letterSpacing: "0.1em", color: "#282425", cursor: "pointer", textAlign: "left" }}>
                Explore our approach <ArrowDown />
              </button>
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
              <button type="button" onClick={goApproach} className="qelora-explore" style={{ width: "100%", marginTop: 14, padding: "12px 0 0", background: "none", border: "none", borderTop: "1px solid rgba(40,36,37,0.2)", display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: FONT, textTransform: "uppercase", letterSpacing: "0.1em", color: "#282425", cursor: "pointer", textAlign: "left" }}>
                Explore our approach <ArrowDown />
              </button>
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

      {/* ===================== SECTION 2 =====================
          Directly under the hero with no stacking override, so the slab floats
          seamlessly across the seam — the original layered look. */}
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

      {/* ===================== APPROACH (dark) =====================
          Scroll target of "Explore our approach". Placed after the statement
          video (not between hero and statement) so the slab's overhang into
          Section 2 is never clipped by a dark panel. */}
      <section ref={approachRef} style={{ position: "relative", background: "#0e0c0a", padding: "clamp(80px,12vh,150px) clamp(20px,5vw,72px)", fontFamily: FONT }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(240,236,228,0.5)" }}>Our approach</div>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(32px,4vw,64px)" }}>
            {services.map((s, i) => (
              <div key={i} style={{ borderTop: "1px solid rgba(248,245,240,0.14)", paddingTop: 24 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(240,236,228,0.4)" }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 style={{ marginTop: 12, fontSize: "clamp(20px,1.8vw,26px)", fontWeight: 600, letterSpacing: "-0.01em", color: CREAM, whiteSpace: "pre-line" }}>{s.title}</h3>
                {s.blurb && <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.65, color: "rgba(240,236,228,0.55)" }}>{s.blurb}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CLOSING CTA + FOOTER (dark) ===================== */}
      <section style={{ position: "relative", background: "#0e0c0a", padding: "clamp(90px,14vh,170px) 24px clamp(28px,4vh,44px)", textAlign: "center", fontFamily: FONT }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(240,236,228,0.5)" }}>Start the conversation</div>
        <h2 style={{ margin: "24px auto 0", maxWidth: 860, fontSize: "clamp(36px,6vw,84px)", lineHeight: 1.05, fontWeight: 700, letterSpacing: "-0.03em", color: CREAM }}>
          Let&apos;s shape what comes next.
        </h2>
        <a
          href={cta.href}
          {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
          className="qelora-cta-pill"
          style={{ display: "inline-block", marginTop: 40, padding: "16px 34px", borderRadius: 100, background: CREAM, color: INK, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none" }}
        >
          Start a project
        </a>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, maxWidth: 1200, margin: "clamp(80px,12vh,130px) auto 0", fontSize: 12, color: "rgba(240,236,228,0.45)" }}>
          <span style={{ fontWeight: 800, letterSpacing: "-0.03em", fontSize: 14, color: "rgba(240,236,228,0.7)" }}>
            {name}
            <sup style={{ fontSize: "0.5em", verticalAlign: "super" }}>®</sup>
          </span>
          {data.contact.address && <span>{data.contact.address}</span>}
          <a href="https://dev.rhythmiqcx.com" target="_blank" rel="noopener" className="qelora-foot-link" style={{ color: "rgba(240,236,228,0.6)", textDecoration: "none", opacity: 0.9 }}>
            Site by Rhythmiq Dev
          </a>
        </div>
      </section>
    </div>
  );
};

export default LayeredDepth;

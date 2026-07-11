"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useAnimationFrame,
  type MotionValue,
} from "framer-motion";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta } from "../../sections/util";

/**
 * Beauty · Luxury botanical — a faithful port of the "Beyond The Collection"
 * fragrance experience: a 600vh scroll story where a clip-path ellipse wipes
 * open to reveal a ring of bottles orbiting a motion-path, scaling up at the
 * focal point as the viewport pins, wrapped in serif brand overlays; then a
 * "Stay in the collection" newsletter section and a four-column footer. Reads
 * as a high-end perfumery / spa / skincare house. Fixed identity.
 *
 * DATA: business.name → header brand · business.tagline → "Beyond The Collection"
 *   wordmark · services[0..5] (title/blurb/photo) → the orbiting bottles + their
 *   note labels · hero.videoMp4 → ambient hero background · contact → CTA.
 */

const SERIF = "var(--font-subheading), 'Instrument Serif', serif";
const SANS = "var(--font-manrope), ui-sans-serif, system-ui, sans-serif";
const BASE = "/try/botanical";
const TARGET_RADIUS = 650;

type OrbitDatum = { src: string; title: string; desc: string };

function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function OrbitItem({
  item,
  title,
  desc,
  index,
  totalItems,
  pathValue,
  itemSizeValue,
  rotationValue,
  progress,
  fill,
  scaleStrength,
  focalPoint = 50,
}: {
  item: ReactNode;
  title: string | null;
  desc: string | null;
  index: number;
  totalItems: number;
  pathValue: MotionValue<string>;
  itemSizeValue: MotionValue<number>;
  rotationValue: MotionValue<number>;
  progress: MotionValue<number>;
  fill: boolean;
  scaleStrength: MotionValue<number>;
  focalPoint?: number;
}) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;
  const offsetPercentage = useTransform(progress, (p) => (((p + itemOffset) % 100) + 100) % 100);
  const offsetDistance = useTransform(offsetPercentage, (p) => `${p}%`);

  const itemScale = useTransform(() => {
    const rawPos = offsetPercentage.get();
    const strength = scaleStrength.get();
    let dist = Math.abs(rawPos - focalPoint);
    if (dist > 50) dist = 100 - dist;
    let targetScale = 1;
    if (dist < 20) {
      const ratio = dist / 20;
      const cosCurve = (Math.cos(ratio * Math.PI) + 1) / 2;
      targetScale = 0.4 + cosCurve * 0.6;
    } else {
      targetScale = 0.4;
    }
    return 1 - strength * (1 - targetScale);
  });

  const offsetPath = useMotionTemplate`path("${pathValue}")`;
  const zIndexMV = useTransform(itemScale, (s) => Math.round(s * 100));
  const counterRotate = useTransform(rotationValue, (r) => `rotate(${-r}deg)`);

  return (
    <motion.div
      className="orbit-item"
      style={{
        width: itemSizeValue,
        height: itemSizeValue,
        offsetPath,
        offsetRotate: "0deg",
        offsetAnchor: "center center",
        offsetDistance,
        scale: itemScale,
        zIndex: zIndexMV,
        pointerEvents: "auto",
      }}
    >
      <motion.div style={{ transform: counterRotate, width: "100%", height: "100%", position: "relative" }}>
        {item}
        {(title || desc) && (
          <motion.div
            style={{
              position: "absolute",
              left: "115%",
              top: "50%",
              transform: "translateY(-50%)",
              width: "min(360px, 95%)",
              color: "#000",
              opacity: scaleStrength,
              pointerEvents: "none",
              fontFamily: SANS,
            }}
          >
            {title && (
              <div style={{ fontFamily: SERIF, fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: 14 }}>{title}</div>
            )}
            {desc && (
              <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: "clamp(13px, 1vw, 15px)", lineHeight: 1.5, color: "rgba(0,0,0,0.72)" }}>{desc}</div>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function OrbitImages({
  images,
  baseWidth = 800,
  fill = true,
  responsive = true,
  progressOverride,
  radiusXOverride,
  radiusYOverride,
  itemSizeOverride,
  rotationOverride,
  translateXOverride,
  focusStrength,
}: {
  images: OrbitDatum[];
  baseWidth?: number;
  fill?: boolean;
  responsive?: boolean;
  progressOverride: MotionValue<number>;
  radiusXOverride: MotionValue<number>;
  radiusYOverride: MotionValue<number>;
  itemSizeOverride: MotionValue<number>;
  rotationOverride: MotionValue<number>;
  translateXOverride: MotionValue<number>;
  focusStrength: MotionValue<number>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const center = baseWidth / 2;

  const pathValue = useTransform([radiusXOverride, radiusYOverride], ([rx, ry]: number[]) => ellipsePath(center, center, rx, ry));

  useEffect(() => {
    if (!responsive || !containerRef.current) return;
    const el = containerRef.current;
    const update = () => setScale(el.clientWidth / baseWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [responsive, baseWidth]);

  const items = images.map((entry, index) => (
    <motion.img key={entry.src} src={entry.src} alt={`${entry.title} ${index + 1}`} draggable={false} className="orbit-image" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }} style={{ cursor: "pointer", pointerEvents: "auto" }} />
  ));

  return (
    <div ref={containerRef} className="orbit-container" style={{ width: "100%", height: "auto", aspectRatio: "1 / 1" }} aria-hidden>
      <div className="orbit-scaling-container orbit-scaling-container--responsive" style={{ width: baseWidth, height: baseWidth, transform: `translate(-50%, -50%) scale(${scale})` }}>
        <motion.div className="orbit-rotation-wrapper" style={{ rotate: rotationOverride, x: translateXOverride }}>
          {items.map((item, index) => (
            <OrbitItem
              key={index}
              item={item}
              title={images[index].title}
              desc={images[index].desc}
              index={index}
              totalItems={items.length}
              pathValue={pathValue}
              itemSizeValue={itemSizeOverride}
              rotationValue={rotationOverride}
              progress={progressOverride}
              fill={fill}
              scaleStrength={focusStrength}
              focalPoint={50}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function StaySection({ heroImg }: { heroImg: string }) {
  const blurUp = {
    initial: { opacity: 0, y: 40, filter: "blur(20px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 1, ease: "easeOut" },
  } as const;
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={heroImg} alt="" aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none" style={{ objectFit: "cover", objectPosition: "center bottom" }} />
      <div className="relative mx-auto flex min-h-screen max-w-[1480px] flex-col px-8 pb-20 pt-20 md:px-16 md:pb-24 md:pt-24" style={{ gap: 32 }}>
        <motion.div {...blurUp}>
          <div style={{ fontFamily: SERIF, fontSize: "clamp(60px, 11vw, 160px)", lineHeight: 0.95, letterSpacing: "-0.01em", color: "#000" }}>
            Stay <span style={{ fontStyle: "italic" }}>in</span>
          </div>
          <div style={{ fontFamily: SANS, fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.02em", color: "#000", fontSize: 64 }}>the collection</div>
        </motion.div>
        <motion.div {...blurUp} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} className="max-w-md">
          <p className="mb-6" style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.55, color: "rgba(0,0,0,0.78)" }}>Editions and invitations from the studio, sent twice a season.</p>
          <form className="flex items-center gap-3 border-b border-black/40 pb-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent outline-none" style={{ fontFamily: SANS, fontSize: 15, color: "#000" }} />
            <button type="submit" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "#000" }}>Subscribe →</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ brand }: { brand: string }) {
  const blurUp = {
    initial: { opacity: 0, y: 40, filter: "blur(20px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 1, ease: "easeOut" },
  } as const;
  const Column = ({ heading, items }: { heading: string; items: string[] }) => (
    <div>
      <div className="mb-5 text-black/55" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" }}>{heading}</div>
      <ul className="space-y-3">
        {items.map((l) => (
          <li key={l}>
            <a href="#" className="hover:underline" style={{ fontFamily: SANS, fontSize: 15, fontWeight: 400, color: "rgba(0,0,0,0.85)" }}>{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer className="relative w-full overflow-hidden text-black" style={{ backgroundColor: "#f4ecdc" }}>
      <div className="relative mx-auto max-w-[1480px] px-8 pb-12 pt-12 md:px-16 md:pt-14">
        <motion.div {...blurUp} transition={{ duration: 1, ease: "easeOut", delay: 0.15 }} className="mb-20 grid grid-cols-2 gap-12 md:mb-24 md:grid-cols-4 md:gap-10">
          <Column heading="Discover" items={["All fragrances", "The bottle", "Sustainability", "Editions"]} />
          <Column heading="Studio" items={["Our story", "Perfumers", "Atelier visits", "Press"]} />
          <Column heading="Contact" items={["Boutiques", "Concierge", "Returns", "Care guide"]} />
          <div>
            <div className="mb-5 text-black/55" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" }}>Newsletter</div>
            <p className="mb-5 text-black/65" style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.5 }}>Editions and invitations, sent twice a season.</p>
            <form className="flex items-center gap-3 border-b border-black/30 pb-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent outline-none" style={{ fontFamily: SANS, fontSize: 14, color: "#000" }} />
              <button type="submit" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase" }}>Subscribe →</button>
            </form>
          </div>
        </motion.div>
        <motion.div {...blurUp} transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }} className="flex flex-col items-start justify-between gap-6 border-t border-black/15 pt-8 md:flex-row md:items-center">
          <div className="text-black/55" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" }}>© 2026 {brand}</div>
          <div className="flex items-center gap-5" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase" }}>
            <a href="#" className="hover:underline">Instagram</a>
            <span className="text-black/30">·</span>
            <a href="#" className="hover:underline">TikTok</a>
            <span className="text-black/30">·</span>
            <a href="#" className="hover:underline">Spotify</a>
          </div>
          <div className="text-black/55" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" }}>EN · USD</div>
        </motion.div>
      </div>
    </footer>
  );
}

const LuxuryBotanical = ({ data }: { data: Prospect }) => {
  const brand = data.business.name || "Bentley";
  const taglineWords = (data.business.tagline || "Beyond The Collection").trim().split(/\s+/);
  const serifWords = taglineWords.slice(0, -1);
  const sansWord = taglineWords[taglineWords.length - 1];
  const cta = primaryCta(data);
  const ext = cta.external ? { target: "_blank", rel: "noopener" } : {};

  const orbit: OrbitDatum[] = (data.services.length ? data.services : []).slice(0, 6).map((s, i) => ({
    src: s.photo || `${BASE}/b${i + 1}.webp`,
    title: s.title,
    desc: s.blurb || "",
  }));
  const orbitData = orbit.length ? orbit : Array.from({ length: 6 }, (_, i) => ({ src: `${BASE}/b${i + 1}.webp`, title: "", desc: "" }));

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const rx = useTransform(scrollYProgress, [0, 0.08, 1], ["0%", "55%", "55%"]);
  const ry = useTransform(scrollYProgress, [0, 0.08, 1], ["0%", "55%", "55%"]);
  const clipPath = useMotionTemplate`ellipse(${rx} ${ry} at 50% 50%)`;

  const stops = [0.03, 0.08, 0.15, 0.22, 0.9, 0.98, 1];
  const textOpacity = useTransform(scrollYProgress, stops, [0, 1, 1, 0, 0, 1, 1]);
  const textBlurVal = useTransform(scrollYProgress, stops, [15, 0, 0, 15, 15, 0, 0]);
  const filterText = useMotionTemplate`blur(${textBlurVal}px)`;
  const yElement = useTransform(scrollYProgress, stops, [20, 0, 0, 20, 20, 0, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.03, 0.08], [1, 1, 0]);

  const orbitStops = [0.15, 0.25, 0.85, 0.95, 1];
  const orbitItemSize = useTransform(scrollYProgress, orbitStops, [80, 360, 360, 80, 80]);
  const orbitRx = useTransform(scrollYProgress, orbitStops, [330, TARGET_RADIUS, TARGET_RADIUS, 330, 330]);
  const orbitRy = useTransform(scrollYProgress, orbitStops, [140, TARGET_RADIUS, TARGET_RADIUS, 140, 140]);
  const orbitRotation = useTransform(scrollYProgress, orbitStops, [-15, 0, 0, -15, -15]);
  const orbitTx = useTransform(scrollYProgress, orbitStops, [0, -(TARGET_RADIUS + 200), -(TARGET_RADIUS + 200), 0, 0]);
  const focusStrength = useTransform(scrollYProgress, orbitStops, [0, 1, 1, 0, 0]);

  const orbitProgress = useMotionValue(0);
  const prevScroll = useRef(0);
  useAnimationFrame((_, delta) => {
    const pos = scrollYProgress.get();
    const d = pos - prevScroll.current;
    prevScroll.current = pos;
    const frameSpeed = pos > 0.15 && pos < 0.85 ? d * 200 : (delta / 1000) * 2.5;
    orbitProgress.set(orbitProgress.get() + frameSpeed);
  });

  return (
    <div className="botanical" style={{ background: "#000", fontFamily: SANS }}>
      <div ref={containerRef} className="relative h-[600vh] w-full bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden text-white">
          <video autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 z-0 h-full w-full object-cover">
            <source src={data.hero.videoMp4 || `${BASE}/bg.mp4`} type="video/mp4" />
          </video>

          {/* top-left wordmark */}
          <div className="absolute z-10 flex select-none flex-col items-start text-left leading-[0.95] text-black" style={{ top: 120, left: 96 }}>
            <div className="flex items-baseline">
              {serifWords.map((w, i) => (
                <span key={i} style={{ fontFamily: SERIF, fontStyle: i === 1 ? "italic" : "normal", fontSize: "clamp(32px,5vw,64px)", marginLeft: i ? "0.05em" : 0 }}>{w}</span>
              ))}
            </div>
            <span style={{ fontFamily: SANS, fontWeight: 400, fontSize: "clamp(28px,4.4vw,56px)", letterSpacing: "-0.01em", marginTop: "0.05em" }}>{sansWord}</span>
          </div>

          {/* scroll hint */}
          <motion.div className="pointer-events-none absolute left-1/2 z-10 flex -translate-x-1/2 select-none flex-col items-center text-white" style={{ bottom: 40, opacity: scrollHintOpacity }}>
            <div className="relative h-[34px] w-[20px] overflow-hidden">
              <svg className="scroll-arrow absolute inset-0" width="20" height="34" viewBox="0 0 20 34" fill="none" aria-hidden>
                <path d="M10 4 V28 M3 21 L10 28 L17 21" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>

          {/* clip-path reveal + orbit */}
          <motion.div className="absolute z-20 flex items-center justify-center overflow-hidden" style={{ clipPath, rotate: -15, width: "150vw", height: "150vh", left: "-25vw", top: "-25vh" }}>
            <div className="absolute inset-0 bg-white" />
            <div className="relative flex flex-col items-center justify-center" style={{ width: "100vw", height: "100vh", transform: "rotate(15deg)" }}>
              <motion.div className="relative z-0 aspect-square w-[90vw] max-w-[1200px]">
                <OrbitImages
                  images={orbitData}
                  baseWidth={800}
                  fill
                  responsive
                  progressOverride={orbitProgress}
                  radiusXOverride={orbitRx}
                  radiusYOverride={orbitRy}
                  itemSizeOverride={orbitItemSize}
                  rotationOverride={orbitRotation}
                  translateXOverride={orbitTx}
                  focusStrength={focusStrength}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* overlays */}
          <div className="pointer-events-none absolute inset-0 z-[60]">
            <div className="pointer-events-none absolute left-1/2 top-[48%] z-50 -translate-x-1/2 -translate-y-1/2">
              <motion.div className="pointer-events-auto flex flex-col items-center whitespace-nowrap" style={{ filter: filterText, opacity: textOpacity }}>
                <div className="mb-1 flex items-baseline leading-none text-black">
                  {serifWords.map((w, i) => (
                    <span key={i} style={{ fontFamily: SERIF, fontStyle: i === 1 ? "italic" : "normal", fontSize: "clamp(45px,4vw,55px)", letterSpacing: "-0.02em", marginLeft: i ? "0.15em" : 0 }}>{w}</span>
                  ))}
                </div>
                <span style={{ fontFamily: SANS, fontSize: "clamp(28px,3vw,36px)", letterSpacing: "-0.02em", color: "#000", marginTop: -5 }}>{sansWord}</span>
              </motion.div>
            </div>

            <motion.div className="pointer-events-auto absolute right-[calc(6vw+150px)] top-32 flex cursor-text flex-col items-start text-left md:right-[214px]" style={{ y: yElement, filter: filterText, opacity: textOpacity }}>
              <span style={{ fontFamily: SERIF, fontSize: 40, lineHeight: 1, marginBottom: 12, color: "#000" }}>2K26</span>
              <span style={{ fontFamily: SERIF, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.2em", color: "#000", lineHeight: "20px" }}>JOIN AN EXCLUSIVE<br />COMMUNITY</span>
            </motion.div>

            <motion.div className="pointer-events-auto absolute bottom-8 left-8 flex cursor-text flex-col items-start text-black md:bottom-16 md:left-16" style={{ y: yElement, filter: filterText, opacity: textOpacity }}>
              <span style={{ fontFamily: SERIF, fontSize: 40, lineHeight: 1, marginBottom: 4, color: "#000" }}>0651</span>
              <span style={{ fontFamily: SERIF, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.2em", color: "#000" }}>COLLECTION</span>
            </motion.div>

            <div className="pointer-events-auto absolute bottom-16 right-[6vw] z-10 flex flex-col items-start md:right-[10vw]">
              <motion.p className="mb-6 w-[240px] cursor-text text-left" style={{ fontFamily: SERIF, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.2em", color: "#000", lineHeight: "20px", y: yElement, filter: filterText, opacity: textOpacity }}>{data.business.oneLiner}</motion.p>
              <motion.div className="pointer-events-auto flex items-center gap-0" style={{ y: yElement, filter: filterText, opacity: textOpacity }}>
                <a href={cta.href} {...ext} className="z-10 rounded-[40px] bg-black px-8 py-3.5 uppercase text-white no-underline transition-colors hover:bg-black/90" style={{ fontFamily: SERIF, letterSpacing: "0.1em", fontSize: 14 }}>Buy collection</a>
                <a href={cta.href} {...ext} className="z-0 -ml-2 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-black text-white no-underline">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
              </motion.div>
            </div>
          </div>

          {/* header */}
          <motion.header className="pointer-events-none absolute left-0 top-0 z-[100] flex w-full items-center justify-between px-6 py-5 md:px-12 md:py-6" style={{ opacity: scrollHintOpacity }}>
            <a href="#" className="pointer-events-auto flex select-none items-center gap-3 text-black no-underline">
              <span style={{ fontFamily: SERIF, fontSize: 26, fontStyle: "italic" }}>{brand.slice(0, 1)}</span>
              <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 14, letterSpacing: "0.42em", textTransform: "uppercase" }}>{brand}</span>
            </a>
            <a href={cta.href} {...ext} className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-black py-2 pl-5 pr-2 text-white no-underline transition-colors hover:bg-black/85" style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              <span className="hidden sm:inline">Shop the collection</span>
              <span className="sm:hidden">Shop</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </a>
          </motion.header>
        </div>
      </div>

      <StaySection heroImg={`${BASE}/stay.webp`} />
      <Footer brand={data.business.tagline || "Beyond The Collection"} />
    </div>
  );
};

export default LuxuryBotanical;

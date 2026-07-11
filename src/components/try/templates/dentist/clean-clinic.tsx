"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
  type ReactNode,
  type MutableRefObject,
} from "react";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta } from "../../sections/util";

/**
 * Dentist · Clean clinic — a single-page dental landing built on the "masked
 * card" mosaic technique: sections 1 & 2 slice ONE shared image across several
 * cards so they read as a cohesive photo. A 0→100 splash counter, a fixed navbar
 * with a mobile slide-menu, and three near-seamless full-screen sections.
 * Strictly black / white / glass, Open Sauce One, huge clamp() headings, tight
 * leading. Faithfully adapted from a standalone spec — fixed identity, so
 * theme.accent is ignored.
 *
 * PHOTO SLOTS: hero.photo → section-1 shared bg · photos[0] → section-2 shared
 * bg · photos[1] + photos[2] → section-3 side images · photos[3] → section-3
 * tall image.
 * DATA: business.name → logo · tagline → nav subtitle · oneLiner → hero mission
 * line · signature → hero headline (default "Dental Care") · highlights →
 * feature bars · services (title, "\n" for a line break) → service cards ·
 * contact → CTAs + the location label.
 */

const FONT = "var(--font-opensauce), -apple-system, BlinkMacSystemFont, sans-serif";
const FALLBACK_BG = "#e7e5e4";

type Pos = { x: number; y: number; sw: number; sh: number };

/* -------------------------------- hooks ---------------------------------- */

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setIsMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return isMobile;
}

function useImageNatural(src: string): { w: number; h: number } | null {
  const [nat, setNat] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    if (!src) return;
    const img = new window.Image();
    img.onload = () => setNat({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = src;
  }, [src]);
  return nat;
}

/** ResizeObserver-driven layout offsets of each card relative to the section.
 *  Uses offsetLeft/Top (transform-independent) so the reveal animation can't
 *  throw off the shared-image alignment. */
function useMaskPositions(
  sectionRef: MutableRefObject<HTMLElement | null>,
  cardsRef: MutableRefObject<(HTMLDivElement | null)[]>,
): Pos[] {
  const [positions, setPositions] = useState<Pos[]>([]);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;
    const compute = () => {
      const sw = section.clientWidth;
      const sh = section.clientHeight;
      const pos = cardsRef.current.map((card) => {
        if (!card) return { x: 0, y: 0, sw, sh };
        let x = card.offsetLeft;
        let y = card.offsetTop;
        let node = card.offsetParent as HTMLElement | null;
        while (node && node !== section) {
          x += node.offsetLeft;
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        return { x, y, sw, sh };
      });
      setPositions(pos);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(section);
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [sectionRef, cardsRef]);
  return positions;
}

function useStaggeredReveal(threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  const getAnimStyle = (index: number): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
  });
  return { containerRef, getAnimStyle };
}

/* ------------------------------ MaskedCard ------------------------------- */

type MaskedCardProps = {
  bgImage: string;
  position?: Pos;
  natural: { w: number; h: number } | null;
  focalX: number;
  focalY?: number;
  className?: string;
  children?: ReactNode;
  cardRef?: (el: HTMLDivElement | null) => void;
  style?: CSSProperties;
};

/** A window into a shared image scaled to COVER the whole section, so several
 *  cards reconstruct one photo with no gaps on any viewport aspect ratio. */
function MaskedCard({ bgImage, position, natural, focalX, focalY = 0.35, className, children, cardRef, style }: MaskedCardProps) {
  let bg: CSSProperties = { backgroundColor: FALLBACK_BG };
  if (position && bgImage && natural && natural.w && natural.h) {
    const { sw, sh, x, y } = position;
    const scale = Math.max(sw / natural.w, sh / natural.h); // cover
    const dw = natural.w * scale;
    const dh = natural.h * scale;
    const offX = (dw - sw) * focalX;
    const offY = (dh - sh) * focalY;
    bg = {
      backgroundImage: `url("${bgImage}")`,
      backgroundSize: `${dw}px ${dh}px`,
      backgroundPosition: `-${x + offX}px -${y + offY}px`,
      backgroundRepeat: "no-repeat",
      backgroundColor: FALLBACK_BG,
    };
  }
  return (
    <div ref={cardRef} className={className} style={{ ...bg, ...style }}>
      {children}
    </div>
  );
}

/* ------------------------------- helpers --------------------------------- */

function trustLine(data: Prospect): string {
  const addr = data.contact.address;
  if (addr) {
    const parts = addr.split(",").map((s) => s.trim()).filter(Boolean);
    const city = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
    return `Trusted dentist in ${city}`;
  }
  return data.business.tagline ?? "Trusted dental care";
}

const extProps = (isExternal: boolean) =>
  isExternal ? ({ target: "_blank", rel: "noopener" } as const) : {};

/* ------------------------------ SplashScreen ----------------------------- */

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  useEffect(() => {
    let n = 0;
    const iv = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= 100) {
        clearInterval(iv);
        window.setTimeout(() => setExiting(true), 200);
        window.setTimeout(() => onComplete(), 900);
      }
    }, 20);
    return () => clearInterval(iv);
  }, [onComplete]);
  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex items-end justify-start transition-opacity duration-700 ${exiting ? "opacity-0" : "opacity-100"}`}
    >
      <div className="text-7xl md:text-9xl font-bold tabular-nums p-6 md:p-10 leading-none text-black">{count}</div>
    </div>
  );
}

/* -------------------------------- Navbar --------------------------------- */

function Navbar({ data }: { data: Prospect }) {
  const [open, setOpen] = useState(false);
  const cta = primaryCta(data);
  const words = data.business.name.trim().split(/\s+/);
  const line1 = words[0] ?? data.business.name;
  const line2 = words.slice(1).join(" ");
  const subtitle = data.business.tagline ?? "quality healthcare";
  const links = ["Home", "Services", "About", "Gallery", "Contact"];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-2 md:py-3 bg-white/80 backdrop-blur-md">
        <a href="#top" className="flex flex-col no-underline text-black">
          <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none">{line1}</span>
          {line2 && (
            <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none -mt-1.5 md:-mt-2">{line2}</span>
          )}
          <span className="text-[8px] md:text-[9px] font-medium leading-none mt-1.5 md:mt-2 uppercase tracking-wide">{subtitle}</span>
        </a>

        <div className="hidden md:flex items-center gap-5">
          <a
            href={cta.href}
            {...extProps(cta.external)}
            className="px-6 py-3 bg-white rounded-full border border-black text-sm font-semibold no-underline text-black hover:bg-black hover:text-white transition-colors duration-200"
          >
            Menu
          </a>
          <span className="text-sm font-semibold text-black">Dental Emergency</span>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex items-center justify-center relative"
        >
          <span className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${open ? "rotate-45 translate-y-0" : "-translate-y-2"}`} />
          <span className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`} />
          <span className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${open ? "-rotate-45 translate-y-0" : "translate-y-2"}`} />
        </button>
      </header>

      <div className={`md:hidden fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col justify-center h-full px-8 gap-1">
            {links.map((l, i) => (
              <a
                key={l}
                href="#top"
                onClick={() => setOpen(false)}
                className="text-4xl font-bold text-black hover:text-neutral-500 no-underline transition-all duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(2rem)",
                  transitionDelay: `${open ? 100 + i * 60 : 0}ms`,
                }}
              >
                {l}
              </a>
            ))}
            <div
              className="mt-8 pt-8 border-t border-neutral-200 transition-all duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(2rem)",
                transitionDelay: `${open ? 450 : 0}ms`,
              }}
            >
              <p className="text-sm font-semibold text-black mb-4">Dental Emergency</p>
              <a
                href={cta.href}
                {...extProps(cta.external)}
                className="block text-center w-full px-6 py-4 bg-black rounded-full text-white text-sm font-semibold no-underline hover:bg-neutral-800 transition-colors duration-200"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------- Section 1 ------------------------------- */

function Section1({ data }: { data: Prospect }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useMaskPositions(sectionRef, cardsRef);
  const bg = data.hero.photo ?? "";
  const natural = useImageNatural(bg);
  const isMobile = useIsMobile();
  const focalX = isMobile ? 0.7 : 0.8;
  const reveal = useStaggeredReveal();

  const bars =
    data.highlights && data.highlights.length
      ? data.highlights.slice(0, 3).map((h) => [h.value, h.label].filter(Boolean).join(" "))
      : ["Advanced Dentistry", "High Quality Equipment", "Friendly Staff"];

  const headWords = (data.signature ?? "Dental Care").trim().split(/\s+/);
  const h1 = headWords[0];
  const h2 = headWords.slice(1).join(" ");

  return (
    <section
      id="top"
      ref={(el) => {
        sectionRef.current = el;
        reveal.containerRef.current = el;
      }}
      className="relative h-screen w-full overflow-hidden flex flex-col pt-24 md:pt-24 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
    >
      {bars.map((b, i) => (
        <MaskedCard
          key={i}
          bgImage={bg}
          position={positions[i]}
          natural={natural}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[i] = el;
          }}
          className="w-full h-14 md:h-20 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative"
          style={reveal.getAnimStyle(i)}
        >
          <span className="flex items-center justify-center h-full text-black text-lg md:text-3xl font-bold text-center relative z-10">{b}</span>
        </MaskedCard>
      ))}

      <MaskedCard
        bgImage={bg}
        position={positions[3]}
        natural={natural}
        focalX={focalX}
        cardRef={(el) => {
          cardsRef.current[3] = el;
        }}
        className="w-full flex-1 min-h-0 rounded-xl md:rounded-2xl overflow-hidden relative"
        style={reveal.getAnimStyle(3)}
      >
        <div className="absolute top-4 left-4 md:top-7 md:left-7 text-black text-xs md:text-sm font-semibold leading-4 md:leading-5 max-w-[200px] md:max-w-[300px] z-10">
          {data.business.oneLiner}
        </div>
        <div className="absolute bottom-5 left-3 md:bottom-8 md:left-4 z-10">
          <span className="block text-black text-xs md:text-sm font-semibold mb-1 md:mb-2">{trustLine(data)}</span>
          <h1 className="text-black font-bold tracking-tight" style={{ fontSize: "clamp(3rem,11vw,11rem)", lineHeight: 0.79 }}>
            {h1}
            {h2 && (
              <>
                <br />
                {h2}
              </>
            )}
          </h1>
        </div>
        <div className="absolute bottom-6 right-4 md:bottom-10 md:right-8 text-white text-xs md:text-sm font-semibold z-10">Free Consultation</div>
      </MaskedCard>
    </section>
  );
}

/* ------------------------------- Section 2 ------------------------------- */

function Section2({ data }: { data: Prospect }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useMaskPositions(sectionRef, cardsRef);
  const bg = data.photos[0] ?? data.hero.photo ?? "";
  const natural = useImageNatural(bg);
  const isMobile = useIsMobile();
  const focalX = isMobile ? 0.65 : 0.8;
  const reveal = useStaggeredReveal();
  const cta = primaryCta(data);
  const phoneHref = data.contact.phone ? `tel:${data.contact.phone.replace(/\s+/g, "")}` : cta.href;
  const services = data.services.slice(0, 4);

  return (
    <section
      id="s2"
      ref={(el) => {
        sectionRef.current = el;
        reveal.containerRef.current = el;
      }}
      className="relative min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
    >
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto_auto] md:grid-rows-[1fr_1fr_0.8fr] gap-1.5 md:gap-2">
        <MaskedCard
          bgImage={bg}
          position={positions[0]}
          natural={natural}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[0] = el;
          }}
          className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0"
          style={reveal.getAnimStyle(0)}
        >
          <h2 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black text-2xl md:text-3xl font-bold z-10">Smile Gallery</h2>
          <span className="absolute bottom-4 left-5 md:bottom-6 md:left-7 text-white md:text-black text-xs md:text-sm font-semibold z-10">Our cosmetic dental work</span>
        </MaskedCard>

        <MaskedCard
          bgImage={bg}
          position={positions[1]}
          natural={natural}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[1] = el;
          }}
          className="md:row-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] md:min-h-0"
          style={reveal.getAnimStyle(1)}
        >
          <p className="absolute bottom-16 left-5 md:bottom-20 md:left-7 text-white text-xs md:text-sm font-semibold leading-4 md:leading-5 z-10">
            If you want a gorgeous smile,
            <br />
            call us to ask about a smile makeover.
          </p>
          <a
            href={phoneHref}
            className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold z-10 hover:scale-105 transition-transform no-underline"
          >
            Call Us
          </a>
        </MaskedCard>

        <MaskedCard
          bgImage={bg}
          position={positions[2]}
          natural={natural}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[2] = el;
          }}
          className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0"
          style={reveal.getAnimStyle(2)}
        >
          <h3 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black font-bold z-10" style={{ fontSize: "clamp(3rem,7vw,6rem)", lineHeight: 0.9 }}>
            Smile
            <br />
            makeover
          </h3>
        </MaskedCard>

        <MaskedCard
          bgImage={bg}
          position={positions[3]}
          natural={natural}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[3] = el;
          }}
          className="col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] md:min-h-0"
          style={reveal.getAnimStyle(3)}
        >
          <div className="absolute inset-0 z-10 flex flex-wrap md:flex-nowrap gap-1.5 md:gap-2 p-2 md:p-3">
            {services.map((svc, i) => {
              const num = i < 3 ? String(i + 1).padStart(2, "0") : null;
              const active = i === 0;
              return (
                <div
                  key={i}
                  className={`flex-1 min-w-[calc(50%-4px)] md:min-w-0 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between ${active ? "bg-white/90 backdrop-blur-md" : "bg-white/20 backdrop-blur-xl"}`}
                >
                  <h3 className={`text-xl md:text-4xl font-bold leading-[1.05] whitespace-pre-line ${active ? "text-black" : "text-white"}`}>{svc.title}</h3>
                  {num && (
                    <span
                      className={`self-end w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center text-xs md:text-sm font-semibold ${active ? "border-black text-black" : "border-white text-white"}`}
                    >
                      {num}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </MaskedCard>
      </div>
    </section>
  );
}

/* ------------------------------- Section 3 ------------------------------- */

function Arrow({ white }: { white?: boolean }) {
  return (
    <span className={`self-end w-9 h-9 md:w-12 md:h-12 rounded-full border flex items-center justify-center ${white ? "border-white text-white" : "border-black text-black"}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-[-45deg]">
        <path d="M1 7h12m0 0L8 2m5 5L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Section3({ data }: { data: Prospect }) {
  const reveal = useStaggeredReveal();
  const cta = primaryCta(data);
  const img1 = data.photos[1] ?? data.photos[0] ?? "";
  const img2 = data.photos[2] ?? data.photos[0] ?? "";
  const bgImg = data.photos[3] ?? data.photos[0] ?? "";

  return (
    <section
      id="s3"
      ref={(el) => {
        reveal.containerRef.current = el;
      }}
      className="relative min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
    >
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
        <div className="flex flex-col gap-1.5 md:gap-2">
          <div className="rounded-xl md:rounded-2xl bg-stone-50 p-5 md:p-7 flex flex-col justify-between flex-[1.2] min-h-[180px] md:min-h-0" style={reveal.getAnimStyle(0)}>
            <h2 className="font-bold text-black" style={{ fontSize: "clamp(3rem,7vw,6.5rem)", lineHeight: 0.95 }}>
              Implant
              <br />
              Dentistry
            </h2>
            <p className="text-xs md:text-sm font-semibold text-black">Restore Missing Teeth</p>
          </div>

          <div className="flex gap-1.5 md:gap-2 flex-1 min-h-[140px] md:min-h-0" style={reveal.getAnimStyle(1)}>
            <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img1} alt="Dental implant procedure" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img2} alt="Dental restoration" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="rounded-xl md:rounded-2xl bg-zinc-200 p-5 md:p-7 flex items-end justify-between flex-[0.8] min-h-[160px] md:min-h-0" style={reveal.getAnimStyle(2)}>
            <div>
              <p className="text-xs md:text-sm font-semibold text-black mb-2 md:mb-3">Consultation</p>
              <h3 className="text-xl md:text-3xl font-bold text-black leading-6 md:leading-8">
                Dental
                <br />
                Restoration
                <br />
                Services
              </h3>
            </div>
            <a
              href={cta.href}
              {...extProps(cta.external)}
              className="px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold hover:scale-105 transition-transform no-underline whitespace-nowrap"
            >
              Book Online
            </a>
          </div>
        </div>

        <div className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[350px] md:min-h-0" style={reveal.getAnimStyle(3)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bgImg} alt="Smiling patient" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 flex gap-1.5 md:gap-2">
            <div className="flex-1 bg-white rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52">
              <h4 className="text-lg md:text-2xl font-bold text-black leading-5 md:leading-7">
                The Process
                <br />
                of Installing
                <br />
                Implants
              </h4>
              <Arrow />
            </div>
            <div className="flex-1 bg-white/20 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52">
              <h4 className="text-lg md:text-2xl font-bold text-white leading-5 md:leading-7">
                Caring
                <br />
                for Dental
                <br />
                Implants
              </h4>
              <Arrow white />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- root ----------------------------------- */

const DentistCleanClinic = ({ data }: { data: Prospect }) => {
  const [showSplash, setShowSplash] = useState(true);
  const done = useCallback(() => setShowSplash(false), []);
  return (
    <div className="bg-white" style={{ fontFamily: FONT }}>
      {showSplash && <SplashScreen onComplete={done} />}
      <Navbar data={data} />
      <Section1 data={data} />
      <Section2 data={data} />
      <Section3 data={data} />
    </div>
  );
};

export default DentistCleanClinic;

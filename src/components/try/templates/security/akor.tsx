import type { Prospect } from "@/lib/try/schema";
import { primaryCta, secondaryCta } from "../../sections/util";

/**
 * Security · AKOR — a faithful 1:1 build of the "AKOR — Intelligent Security
 * Systems" dark landing page: a fixed navbar with a green hexagon mark, a
 * full-viewport video hero with bottom-left copy + two CTAs, an inverted
 * near-white Services section (2×2 icon cards), and a black About section with
 * a looping video beside a mission block. Sora type, vivid-green accent.
 * Fixed identity; theme.accent is ignored.
 *
 * DATA: business.name → wordmark · business.tagline → hero H1 (use \n for the
 *   line break) · oneLiner → hero subtext · business.about → Services heading ·
 *   services[0..3] (title with \n / blurb / photo=icon) → the 4 service cards ·
 *   signature → About heading · hero.videoMp4 → hero bg · photos[0] → About video.
 */

const SORA = "var(--font-sora), system-ui, sans-serif";
const BG = "hsl(0 0% 10%)";
const FG = "hsl(0 0% 96%)";
const PRIMARY = "hsl(119 99% 46%)";
const PRIMARY_FG = "hsl(0 0% 4%)";
const MUTED = "hsl(0 0% 60%)";
const HERO_BG = "hsl(0 0% 8%)";
const NAV_BTN = "hsl(0 0% 18%)";
const NAV = ["Services", "About Us", "Projects", "Team", "Contacts"];
const BASE = "/try/akor";

const ext = (external: boolean) => (external ? ({ target: "_blank", rel: "noopener" } as const) : {});

const Hexagon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 2 21 7v10l-9 5-9-5V7z" stroke={PRIMARY_FG} strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const Akor = ({ data }: { data: Prospect }) => {
  const brand = data.business.name || "AKOR";
  const h1 = data.business.tagline || "Intelligent\nSecurity Systems";
  const heroSub = data.business.oneLiner;
  const servicesHeading = data.business.about || "Security, automation, and AI, helping businesses enhance efficiency";
  const aboutHeading = data.signature || "AI-powered security, automation for businesses and smart infrastructures";
  const heroVideo = data.hero.videoMp4 || `${BASE}/hero.mp4`;
  const aboutVideo = data.photos[0] || `${BASE}/about.mp4`;
  const cta = primaryCta(data);
  const cta2 = secondaryCta(data, cta);

  const cards = (data.services.length ? data.services : []).slice(0, 4);
  const cardFallback = [
    { title: "AI-Driven\nSecurity Solutions", blurb: "", photo: `${BASE}/icon1.webp` },
    { title: "Smart Building\nAutomation", blurb: "", photo: `${BASE}/icon2.webp` },
    { title: "AI Consulting\nand Integration", blurb: "", photo: `${BASE}/icon3.webp` },
    { title: "Training\nand Support", blurb: "", photo: `${BASE}/icon4.webp` },
  ];
  const serviceCards = cards.length ? cards : cardFallback;

  const greenBtn = {
    background: PRIMARY,
    color: PRIMARY_FG,
  } as const;

  return (
    <div className="akor" style={{ background: BG, color: FG, fontFamily: SORA, WebkitFontSmoothing: "antialiased" }}>
      {/* ---------------- Navbar ---------------- */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-5 lg:px-16">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: PRIMARY }}>
            <Hexagon />
          </span>
          <span className="text-xl font-semibold tracking-tight" style={{ color: FG }}>{brand}</span>
        </div>
        <div className="hidden items-center gap-9 lg:flex">
          {NAV.map((n) => (
            <a key={n} href="#" className="text-sm uppercase tracking-widest no-underline transition-colors hover:opacity-100" style={{ color: MUTED }}>{n}</a>
          ))}
        </div>
        <a href={cta.href} {...ext(cta.external)} className="hidden h-11 items-center rounded-lg px-6 text-xs uppercase tracking-widest no-underline transition-transform active:scale-[0.97] lg:flex" style={{ background: NAV_BTN, color: FG }}>
          Get Quote
        </a>
      </nav>

      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden" style={{ background: HERO_BG }}>
        <video autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.15) 55%, transparent)" }} />
        <div className="relative z-10 px-8 pb-20 pt-32 lg:px-16 lg:pb-28">
          <h1 className="animate-fade-up whitespace-pre-line text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl lg:text-[5.5rem]" style={{ color: FG, animationDelay: "0.2s" }}>
            {h1}
          </h1>
          <p className="animate-fade-up mb-10 mt-6 max-w-xl text-base lg:text-lg" style={{ color: MUTED, animationDelay: "0.45s" }}>{heroSub}</p>
          <div className="animate-fade-up flex flex-wrap items-center gap-8" style={{ animationDelay: "0.65s" }}>
            <a href={cta.href} {...ext(cta.external)} className="flex h-11 items-center rounded-lg px-8 text-xs font-semibold uppercase tracking-widest no-underline transition-transform active:scale-[0.97]" style={greenBtn}>
              Get Consultation
            </a>
            <a href={cta2?.href || cta.href} {...ext(cta2?.external ?? cta.external)} className="pb-1 text-xs uppercase tracking-widest no-underline transition-colors" style={{ color: FG, borderBottom: `1px solid ${PRIMARY}` }}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Services (inverted) ---------------- */}
      <section className="px-8 py-20 lg:px-16 lg:py-28" style={{ background: FG, color: BG }}>
        <div className="mb-8 text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(0,0,0,0.45)" }}>Services</div>
        <div className="mb-16 h-px w-full" style={{ background: "rgba(0,0,0,0.15)" }} />
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          <div className="flex flex-col justify-center lg:w-[38%]">
            <h2 className="text-3xl font-normal leading-[1.15] tracking-tight sm:text-4xl" style={{ color: BG }}>{servicesHeading}</h2>
            <a href={cta.href} {...ext(cta.external)} className="mt-8 flex h-11 w-fit items-center rounded-lg px-8 text-xs font-semibold uppercase tracking-widest no-underline transition-transform active:scale-[0.97]" style={greenBtn}>
              Get Consultation
            </a>
          </div>
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-16 lg:w-[62%]">
            {serviceCards.map((c, i) => (
              <div key={i} className="pl-8" style={{ borderLeft: `1px solid rgba(0,0,0,0.15)` }}>
                {c.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.photo} alt="" className="mb-6 h-16 w-16 object-contain" />
                )}
                <div className="mb-2 text-xs" style={{ color: "rgba(0,0,0,0.35)" }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mb-3 whitespace-pre-line text-xl font-medium leading-tight" style={{ color: BG }}>{c.title}</h3>
                {c.blurb && <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>{c.blurb}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- About Us ---------------- */}
      <section className="px-8 pb-24 pt-12 lg:px-16 lg:pb-32 lg:pt-16" style={{ background: "#000" }}>
        <div className="mb-8 text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.4)" }}>About Us</div>
        <div className="mb-16 h-px w-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:gap-0">
          <div className="lg:w-[45%]">
            <video autoPlay loop muted playsInline preload="metadata" className="h-auto w-full rounded-sm">
              <source src={aboutVideo} type="video/mp4" />
            </video>
          </div>
          <div className="mx-10 mt-8 hidden w-px lg:block" style={{ background: "rgba(255,255,255,0.15)" }} />
          <div className="flex min-h-[500px] flex-1 flex-col justify-between lg:min-h-[600px]">
            <h2 className="text-3xl font-normal leading-[1.15] tracking-tight sm:text-4xl" style={{ color: FG }}>{aboutHeading}</h2>
            <div className="mt-auto">
              <p className="mb-10 max-w-xl text-base leading-relaxed" style={{ color: MUTED }}>
                We design and integrate intelligent security, automation, and AI systems that protect people, assets, and infrastructure — engineered to run quietly, scale cleanly, and stay a step ahead.
              </p>
              <a href={cta.href} {...ext(cta.external)} className="flex h-11 w-fit items-center rounded-lg px-10 text-xs font-semibold uppercase tracking-widest no-underline transition-transform active:scale-[0.97]" style={greenBtn}>
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Akor;

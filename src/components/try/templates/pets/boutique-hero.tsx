"use client";

import { Fragment, type ReactNode, type CSSProperties } from "react";
import { Search, ShoppingCart, Star, ArrowUpRight, Play, ArrowRight, Plus } from "lucide-react";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta } from "../../sections/util";

/**
 * Pets · Boutique hero — a single-viewport (h-screen, no-scroll) pet-store hero
 * modelled on "CozyPaws": mint canvas, DM Serif Display heading with a word-pop
 * entrance, floating product + video cards, and three bottom photos that reveal
 * upward with stat/rating/CTA overlays. Separate md+ and mobile layouts (show/
 * hide, not media queries). Fixed identity — theme.accent is ignored.
 *
 * DATA: business.name/logo → header logo · business.avatar → avatars ·
 *   business.tagline → hero heading (word 1 / rest split across two lines) ·
 *   services[0] (title/price/photo) → product card · hero.photo → video card ·
 *   photos[0..2] → bottom-left / bottom-center / bottom-right · highlights[0] →
 *   "98K+" stat · highlights[1] → rating · contact → the shop CTA.
 */

const MINT = "#EFFDF0";
const GREEN = "#1a3d1a";
const ORANGE = "#E86A10";
const SERIF = { fontFamily: "var(--font-dmserif), Georgia, serif" } as const;
const NAV = ["Home", "Shop", "Delivery and payment", "Brands", "Blog"];

const ext = (isExternal: boolean) => (isExternal ? ({ target: "_blank", rel: "noopener" } as const) : {});

function Badge({ children }: { children: ReactNode }) {
  return (
    <span
      className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold text-white"
      style={{ background: ORANGE, border: `2px solid ${MINT}` }}
    >
      {children}
    </span>
  );
}

function Header({ data }: { data: Prospect }) {
  const cta = primaryCta(data);
  const { logo, name, avatar } = { logo: data.business.logo, name: data.business.name, avatar: data.business.avatar };
  return (
    <header className="animate-fade-in delay-100 relative z-30 flex shrink-0 items-center justify-between px-4 py-4 md:px-8 lg:px-12">
      <a href="#" className="flex items-center no-underline">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={name} className="h-7 w-auto lg:h-11" />
        ) : (
          <span className="text-2xl font-normal lg:text-3xl" style={{ ...SERIF, color: GREEN }}>{name}</span>
        )}
      </a>

      <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
        {NAV.map((n, i) => (
          <a key={n} href="#" className={`no-underline transition-colors hover:text-gray-900 ${i === 0 ? "text-gray-900" : "text-gray-600"}`}>
            {n}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2.5 md:gap-3">
        <button type="button" aria-label="Search" className="hidden h-10 w-10 place-items-center rounded-full border transition-colors sm:grid" style={{ borderColor: GREEN, color: GREEN }}>
          <Search size={18} />
        </button>
        <button type="button" aria-label="Favorites" className="relative grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: ORANGE }}>
          <Star size={18} fill="white" />
          <Badge>4</Badge>
        </button>
        <a href={cta.href} {...ext(cta.external)} aria-label="Cart" className="relative grid h-10 w-10 place-items-center rounded-full border no-underline transition-colors" style={{ borderColor: GREEN, color: GREEN }}>
          <ShoppingCart size={18} />
          <Badge>1</Badge>
        </a>
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <span className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white" style={{ background: GREEN }}>
            {name.slice(0, 1)}
          </span>
        )}
      </div>
    </header>
  );
}

function Heading({ tagline }: { tagline: string }) {
  const words = tagline.trim().split(/\s+/);
  const line1 = words.slice(0, 1);
  const line2 = words.slice(1);
  const render = (arr: string[], startDelay: number) =>
    arr.map((w, i) => (
      <Fragment key={i}>
        <span className="inline-block animate-word-pop" style={{ animationDelay: `${startDelay + i * 100}ms` }}>{w}</span>
        {i < arr.length - 1 ? " " : ""}
      </Fragment>
    ));
  return (
    <h1 className="font-serif-display m-0 tracking-tight" style={{ color: GREEN, fontSize: "clamp(60px, 7.5vw, 110px)", lineHeight: 0.95 }}>
      <span className="block">{render(line1, 200)}</span>
      <span className="block">{render(line2, 300)}</span>
    </h1>
  );
}

function ProductCard({ data, className = "", style }: { data: Prospect; className?: string; style?: CSSProperties }) {
  const p = data.services[0];
  if (!p) return null;
  const cta = primaryCta(data);
  return (
    <div className={className} style={style}>
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "260 / 257", background: "#dfeee0" }}>
        {p.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt={p.title} className="h-full w-full object-cover" />
        )}
        <a href={cta.href} {...ext(cta.external)} aria-label={p.title} className="absolute bottom-2 right-2 grid h-9 w-9 place-items-center rounded-full text-white no-underline transition-colors md:h-10 md:w-10" style={{ background: GREEN }}>
          <ArrowUpRight size={18} />
        </a>
      </div>
      <p className="mt-2 mb-0 truncate text-gray-700" style={{ fontSize: "clamp(11px, 1vw, 14px)" }}>{p.title}</p>
      {p.price && <p className="m-0 font-semibold" style={{ color: GREEN, fontSize: "clamp(13px, 1.1vw, 16px)" }}>{p.price}</p>}
    </div>
  );
}

function VideoCard({ data, className = "", style }: { data: Prospect; className?: string; style?: CSSProperties }) {
  const img = data.hero.photo;
  return (
    <div className={className} style={style}>
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "177 / 287", background: "#dfeee0" }}>
        {img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt="" className="h-full w-full object-cover" />
        )}
        <span className="absolute bottom-14 left-1/2 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full text-white" style={{ background: GREEN }}>
          <Play size={18} fill="white" />
        </span>
        <p className="absolute inset-x-2 bottom-3 m-0 text-center text-[11px] font-medium leading-tight text-white">
          Watch Product Reviews on TikTok and YouTube
        </p>
      </div>
    </div>
  );
}

function StatCluster({ data }: { data: Prospect }) {
  const stat = data.highlights?.[0]?.value ?? "98K+";
  const avatar = data.business.avatar;
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" className="h-8 w-8 rounded-full border-2 object-cover" style={{ borderColor: MINT }} />
        ) : null}
        <span className="grid h-8 w-8 place-items-center rounded-full border-2 text-white" style={{ background: GREEN, borderColor: MINT }}>
          <Plus size={14} />
        </span>
      </div>
      <span className="font-semibold" style={{ color: GREEN }}>{stat}</span>
    </div>
  );
}

function RatingCluster({ data }: { data: Prospect }) {
  const rating = data.highlights?.[1]?.value ?? "4.6";
  return (
    <div className="flex items-center gap-1.5">
      <Star size={18} fill={ORANGE} color={ORANGE} />
      <span className="font-semibold" style={{ color: GREEN }}>{rating}</span>
    </div>
  );
}

function ExploreButton({ data, className = "" }: { data: Prospect; className?: string }) {
  const cta = primaryCta(data);
  return (
    <a
      href={cta.href}
      {...ext(cta.external)}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white no-underline transition-colors ${className}`}
      style={{ background: ORANGE }}
    >
      Explore Products
      <ArrowRight size={16} />
    </a>
  );
}

/* -------------------------------------------------------------------------- */

const PetsBoutiqueHero = ({ data }: { data: Prospect }) => {
  const tagline = data.business.tagline ?? "Everything Your Pets Love";
  const bottoms = data.photos;
  const overlayBottom = { bottom: "clamp(20px, 4vh, 50px)" } as const;

  return (
    <div className="cozypaws" style={{ background: MINT, color: GREEN, fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>
      <div className="flex h-screen flex-col overflow-hidden">
        <Header data={data} />

        {/* ===================== md+ (tablet + desktop) ===================== */}
        <section className="relative hidden flex-1 flex-col overflow-hidden md:flex">
          {/* heading */}
          <div className="relative z-[5] px-6 pt-[4rem] text-center lg:px-12 lg:pt-[5.4rem]">
            <Heading tagline={tagline} />
          </div>

          {/* left product card */}
          <ProductCard
            data={data}
            className="animate-slide-in-left delay-600 absolute top-[80px] left-4 z-20 lg:top-[50px] lg:left-12"
            style={{ width: "clamp(160px, 14vw, 260px)" }}
          />

          {/* right video card */}
          <VideoCard
            data={data}
            className="animate-slide-in-right delay-700 absolute top-[80px] right-4 z-20 lg:top-[50px] lg:right-12"
            style={{ width: "clamp(120px, 10vw, 177px)" }}
          />

          {/* bottom 3 photos + overlays */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end">
            <div className="animate-photo-reveal delay-700 relative min-w-0 flex-1" style={{ maxHeight: "min(70vh, 55vw)" }}>
              {bottoms[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={bottoms[0]} alt="" loading="lazy" className="block h-auto w-full" style={{ maxHeight: "min(70vh, 55vw)", objectFit: "contain", objectPosition: "bottom" }} />
              )}
              <div className="animate-scale-in delay-1000 absolute left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 shadow-sm backdrop-blur" style={overlayBottom}>
                <StatCluster data={data} />
              </div>
            </div>

            <div className="animate-photo-reveal delay-600 relative min-w-0 flex-[1.265]" style={{ maxHeight: "min(85vh, 70vw)" }}>
              {bottoms[1] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={bottoms[1]} alt="" loading="lazy" className="block h-auto w-full" style={{ maxHeight: "min(85vh, 70vw)", objectFit: "contain", objectPosition: "bottom" }} />
              )}
              <div className="animate-scale-in delay-1100 absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-center" style={overlayBottom}>
                <h3 className="m-0 font-semibold text-white drop-shadow" style={{ fontSize: "clamp(18px, 2vw, 30px)" }}>Best Products for Your Pet</h3>
                <ExploreButton data={data} />
              </div>
            </div>

            <div className="animate-photo-reveal delay-800 relative min-w-0 flex-1" style={{ maxHeight: "min(70vh, 55vw)" }}>
              {bottoms[2] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={bottoms[2]} alt="" loading="lazy" className="block h-auto w-full" style={{ maxHeight: "min(70vh, 55vw)", objectFit: "contain", objectPosition: "bottom" }} />
              )}
              <div className="animate-scale-in delay-1200 absolute left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 shadow-sm backdrop-blur" style={overlayBottom}>
                <RatingCluster data={data} />
              </div>
            </div>
          </div>
        </section>

        {/* ========================= mobile (< md) ========================= */}
        <section className="flex flex-1 flex-col overflow-hidden md:hidden">
          <div className="animate-fade-up delay-200 px-5 pt-6 text-center">
            <h1 className="font-serif-display m-0 text-balance tracking-tight" style={{ color: GREEN, fontSize: "clamp(26px, 8vw, 40px)", lineHeight: 1.05 }}>{tagline}</h1>
            <p className="mx-auto mt-2 mb-4 max-w-[34ch] text-sm text-gray-600">{data.business.oneLiner}</p>
            <ExploreButton data={data} />
          </div>

          <div className="animate-fade-up delay-300 flex gap-3 px-5 pt-5">
            <ProductCard data={data} className="min-w-0 flex-1" />
            <VideoCard data={data} className="min-w-0 flex-1" />
          </div>

          <div className="animate-fade-up delay-500 mt-5 flex items-center justify-center gap-4 px-5">
            <StatCluster data={data} />
            <span className="h-6 w-px bg-black/10" />
            <RatingCluster data={data} />
          </div>

          <div className="mt-auto flex items-end pt-5">
            {bottoms.slice(0, 3).map((src, i) => (
              <div key={i} className={`animate-photo-reveal min-w-0 ${i === 1 ? "flex-[1.265] delay-600" : i === 0 ? "flex-1 delay-700" : "flex-1 delay-800"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" className="block h-auto w-full" style={{ objectFit: "contain", objectPosition: "bottom" }} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PetsBoutiqueHero;

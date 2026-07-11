"use client";

import { Fragment, useEffect, useState, type ReactNode, type CSSProperties } from "react";
import { Search, ShoppingCart, Star, ArrowUpRight, Play, ArrowRight, Plus, X, Cat, Dog, Bone, Fish } from "lucide-react";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta } from "../../sections/util";

/**
 * Pets · Boutique hero — a single-viewport (h-screen, no-scroll) pet-store hero
 * modelled on "CozyPaws": mint canvas, DM Serif Display heading with a word-pop
 * entrance, floating product + video cards, and three bottom photos that reveal
 * upward with stat/rating/CTA overlays. Separate md+ and mobile layouts (show/
 * hide, not media queries). The header cart + favorites buttons open slide-in
 * demo drawers (seeded lines, qty steppers / move-to-cart). Fixed identity —
 * theme.accent is ignored.
 *
 * DATA: business.name/logo → header logo · business.avatar → avatars ·
 *   business.tagline → hero heading (word 1 / rest split across two lines) ·
 *   services[0] (title/price/photo) → product card + featured cart line ·
 *   hero.photo → video card · photos[0..2] → bottom-left / bottom-center /
 *   bottom-right · highlights[0] → "98K+" stat · highlights[1] → rating ·
 *   contact → the shop / checkout CTA.
 */

const MINT = "#EFFDF0";
const GREEN = "#1a3d1a";
const ORANGE = "#E86A10";
const SERIF = { fontFamily: "var(--font-dmserif), Georgia, serif" } as const;
const NAV = ["Home", "Shop", "Delivery and payment", "Brands", "Blog"];
// Demo site: nav entries lead back to the prototype showcase.
const NAV_HREF = "https://try.rhythmiqcx.com";

const ext = (isExternal: boolean) => (isExternal ? ({ target: "_blank", rel: "noopener" } as const) : {});

/* ------------------------------ demo shop state ------------------------------ */

type ShopItem = { id: string; name: string; price: number; img?: string; Icon: typeof Cat };

function Thumb({ item }: { item: ShopItem }) {
  return item.img ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.img} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
  ) : (
    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl" style={{ background: "#dfeee0", color: GREEN }}>
      <item.Icon size={24} />
    </span>
  );
}

/** Slide-in panel shared by the cart and favorites. Mint, rounded, springy. */
function Drawer({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/25"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.4s ease" }}
      />
      <aside
        role="dialog"
        aria-label={title}
        className="fixed bottom-0 right-0 top-0 z-50 flex flex-col"
        style={{
          width: "min(400px, 92vw)",
          background: MINT,
          color: GREEN,
          transform: open ? "translateX(0)" : "translateX(105%)",
          transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: "-10px 0 40px rgba(26,61,26,0.18)",
          borderTopLeftRadius: 24,
          borderBottomLeftRadius: 24,
        }}
      >
        <div className="flex items-center justify-between px-6 pb-4 pt-6" style={{ borderBottom: "1px solid rgba(26,61,26,0.12)" }}>
          <h2 className="m-0 text-2xl font-normal" style={{ ...SERIF }}>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border transition-colors hover:bg-white" style={{ borderColor: GREEN, color: GREEN }}>
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
        {footer}
      </aside>
    </>
  );
}

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

function Header({ data, cartCount, favCount, onCart, onFavs }: { data: Prospect; cartCount: number; favCount: number; onCart: () => void; onFavs: () => void }) {
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
          <a key={n} href={NAV_HREF} className={`no-underline transition-colors hover:text-gray-900 ${i === 0 ? "text-gray-900" : "text-gray-600"}`}>
            {n}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2.5 md:gap-3">
        <button type="button" aria-label="Search" className="hidden h-10 w-10 place-items-center rounded-full border transition-colors sm:grid" style={{ borderColor: GREEN, color: GREEN }}>
          <Search size={18} />
        </button>
        <button type="button" aria-label="Favorites" onClick={onFavs} className="relative grid h-10 w-10 place-items-center rounded-full text-white transition-transform hover:scale-105" style={{ background: ORANGE }}>
          <Star size={18} fill="white" />
          {favCount > 0 && <Badge>{favCount}</Badge>}
        </button>
        <button type="button" aria-label="Cart" onClick={onCart} className="relative grid h-10 w-10 place-items-center rounded-full border transition-transform hover:scale-105" style={{ borderColor: GREEN, color: GREEN, background: "transparent" }}>
          <ShoppingCart size={18} />
          {cartCount > 0 && <Badge>{cartCount}</Badge>}
        </button>
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
  const cta = primaryCta(data);

  // Demo shop: the real featured product + three invented companions.
  const featuredPrice = parseFloat((data.services[0]?.price || "$49.99").replace(/[^0-9.]/g, "")) || 49.99;
  const catalog: ShopItem[] = [
    { id: "featured", name: data.services[0]?.title || "Cozy Cat House", price: featuredPrice, img: data.services[0]?.photo, Icon: Cat },
    { id: "dog-bed", name: "Orthopedic Dog Bed", price: 89.0, Icon: Dog },
    { id: "rope-toy", name: "Rope Chew Toy", price: 12.99, Icon: Bone },
    { id: "salmon-treats", name: "Salmon Treats", price: 8.49, Icon: Fish },
  ];
  const byId = (id: string) => catalog.find((c) => c.id === id)!;

  const [panel, setPanel] = useState<"cart" | "favs" | null>(null);
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([
    { id: "featured", qty: 1 },
    { id: "salmon-treats", qty: 1 },
  ]);
  const [favs, setFavs] = useState<string[]>(catalog.map((c) => c.id));
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = cart.reduce((s, l) => s + byId(l.id).price * l.qty, 0);

  const changeQty = (id: string, delta: number) =>
    setCart((prev) => prev.map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0));
  const addToCart = (id: string) =>
    setCart((prev) => (prev.some((l) => l.id === id) ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...prev, { id, qty: 1 }]));
  const removeFav = (id: string) => setFavs((prev) => prev.filter((f) => f !== id));

  return (
    <div className="cozypaws" style={{ background: MINT, color: GREEN, fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>
      <div className="flex h-screen flex-col overflow-hidden">
        <Header data={data} cartCount={cartCount} favCount={favs.length} onCart={() => setPanel("cart")} onFavs={() => setPanel("favs")} />

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
              <div className="animate-scale-in delay-1000 absolute left-1/2 rounded-full bg-white/90 px-4 py-2 shadow-sm backdrop-blur" style={overlayBottom}>
                <StatCluster data={data} />
              </div>
            </div>

            {/* Height cap keeps the dog's head below the heading (~310px of
                header + heading + air) on short viewports; on normal screens
                the natural column width rules and nothing changes. */}
            <div className="animate-photo-reveal delay-600 relative min-w-0 flex-[1.265]" style={{ maxHeight: "min(calc(100vh - 310px), 70vw)" }}>
              {bottoms[1] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={bottoms[1]} alt="" loading="lazy" className="block h-auto w-full" style={{ maxHeight: "min(calc(100vh - 310px), 70vw)", objectFit: "contain", objectPosition: "bottom" }} />
              )}
              <div className="animate-scale-in delay-1100 absolute left-1/2 flex flex-col items-center gap-3 text-center" style={overlayBottom}>
                <h3 className="m-0 font-semibold text-white drop-shadow" style={{ fontSize: "clamp(14px, 1.4vw, 20px)" }}>Best Products for Your Pet</h3>
                <ExploreButton data={data} />
              </div>
            </div>

            <div className="animate-photo-reveal delay-800 relative min-w-0 flex-1" style={{ maxHeight: "min(70vh, 55vw)" }}>
              {bottoms[2] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={bottoms[2]} alt="" loading="lazy" className="block h-auto w-full" style={{ maxHeight: "min(70vh, 55vw)", objectFit: "contain", objectPosition: "bottom" }} />
              )}
              <div className="animate-scale-in delay-1200 absolute left-1/2 rounded-full bg-white/90 px-4 py-2 shadow-sm backdrop-blur" style={overlayBottom}>
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

      {/* ------------------------------ cart drawer ------------------------------ */}
      <Drawer
        open={panel === "cart"}
        onClose={() => setPanel(null)}
        title="Your Cart"
        footer={
          cart.length > 0 ? (
            <div className="px-6 pb-6 pt-4" style={{ borderTop: "1px solid rgba(26,61,26,0.12)" }}>
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest">Subtotal</span>
                <span className="text-base font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <p className="m-0 text-[11px] opacity-60">Treats for good boys ship free.</p>
              <a
                href={cta.href}
                {...ext(cta.external)}
                className="mt-4 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium text-white no-underline transition-transform hover:scale-[1.02] active:scale-95"
                style={{ background: ORANGE }}
              >
                Checkout <ArrowRight size={16} />
              </a>
            </div>
          ) : undefined
        }
      >
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <p className="m-0 text-sm opacity-70">Your cart is empty — someone&apos;s pet is missing out.</p>
            <button type="button" onClick={() => setPanel("favs")} className="text-sm font-medium underline underline-offset-4" style={{ color: ORANGE }}>
              Pick from favorites
            </button>
          </div>
        ) : (
          cart.map((l) => {
            const item = byId(l.id);
            return (
              <div key={l.id} className="flex items-center gap-3 py-3" style={{ borderBottom: "1px solid rgba(26,61,26,0.08)" }}>
                <Thumb item={item} />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">{item.name}</span>
                  <span className="text-xs font-semibold" style={{ color: ORANGE }}>${item.price.toFixed(2)}</span>
                </div>
                <div className="flex shrink-0 items-center rounded-full border" style={{ borderColor: GREEN }}>
                  <button type="button" onClick={() => changeQty(l.id, -1)} aria-label={`Decrease ${item.name} quantity`} className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-[#dfeee0]" style={{ color: GREEN }}>
                    −
                  </button>
                  <span className="w-5 text-center text-xs font-semibold">{l.qty}</span>
                  <button type="button" onClick={() => changeQty(l.id, 1)} aria-label={`Increase ${item.name} quantity`} className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-[#dfeee0]" style={{ color: GREEN }}>
                    +
                  </button>
                </div>
              </div>
            );
          })
        )}
      </Drawer>

      {/* ---------------------------- favorites drawer ---------------------------- */}
      <Drawer open={panel === "favs"} onClose={() => setPanel(null)} title="Favorites">
        {favs.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <Star size={28} color={ORANGE} />
            <p className="m-0 text-sm opacity-70">No favorites yet — star something you love.</p>
          </div>
        ) : (
          favs.map((id) => {
            const item = byId(id);
            return (
              <div key={id} className="flex items-center gap-3 py-3" style={{ borderBottom: "1px solid rgba(26,61,26,0.08)" }}>
                <Thumb item={item} />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">{item.name}</span>
                  <span className="text-xs font-semibold" style={{ color: ORANGE }}>${item.price.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(id)}
                  className="shrink-0 rounded-full px-3.5 py-2 text-xs font-medium text-white transition-transform hover:scale-105 active:scale-95"
                  style={{ background: ORANGE }}
                >
                  Add to cart
                </button>
                <button type="button" onClick={() => removeFav(id)} aria-label={`Remove ${item.name} from favorites`} className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors hover:bg-white">
                  <Star size={16} fill={ORANGE} color={ORANGE} />
                </button>
              </div>
            );
          })
        )}
      </Drawer>
    </div>
  );
};

export default PetsBoutiqueHero;

import type { Prospect } from "@/lib/try/schema";
import { primaryCta } from "../../sections/util";

/**
 * Restaurant · Retro / neo-brutalist ("VIBE") — a 70s-meets-Gen-Z landing page:
 * cream canvas, thick 3px black borders, hard offset drop-shadows, Syne display
 * caps, Playfair italic accents, Space Grotesk body, film grain + pizza
 * cursor, and rotated sticker chrome. Bold and loud on purpose.
 *
 * Palette (fixed identity): orange #ff4d00, blue #2d31fa, neon #bff000,
 * cream #fdf9f0, near-black #1a1a1a. The per-prospect theme.accent is ignored so
 * the look stays consistent.
 *
 * PHOTO SLOTS (drop high-fidelity images here):
 *   hero.photo         → framed hero image
 *   services[].photo   → the three "Chef's Favorites" menu cards
 *   photos[0..3]       → the Instagram grid (grayscale → colour on hover)
 *
 * DATA MAP: business.name → logo · business.tagline → hero headline ·
 *   business.oneLiner → hero sub · business.about → Vibe Check story ·
 *   signature → Vibe Check pull-quote · highlights → marquee ·
 *   services (title/blurb/price/tag/photo) → menu · socials.instagram → IG.
 */

const ORANGE = "#ff4d00";
const BLUE = "#2d31fa";
const NEON = "#bff000";
const CREAM = "#fdf9f0";
const DARK = "#1a1a1a";
const SYNE = "var(--font-syne), system-ui, sans-serif";
const PLAYFAIR = "var(--font-playfair), Georgia, serif";
const SPACE = "var(--font-space), ui-sans-serif, system-ui";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

const NAV = [
  { label: "Menu", href: "#menu" },
  { label: "Vibe Check", href: "#vibe" },
  { label: "Events", href: "#footer" },
  { label: "Locations", href: "#footer" },
];

const ext = (isExternal: boolean) =>
  isExternal ? ({ target: "_blank", rel: "noopener" } as const) : {};

const border = (w = 3) => `${w}px solid ${DARK}`;

/** "VIBE BISTRO" → VIBE ✱ BISTRO with an orange star between words. */
function Logo({ name, color = DARK }: { name: string; color?: string }) {
  const parts = name.toUpperCase().split(/\s+/).filter(Boolean);
  return (
    <span style={{ fontFamily: SYNE, fontWeight: 800, letterSpacing: "-0.01em", color, lineHeight: 1 }}>
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && <span style={{ color: ORANGE }}>✱</span>}
          {p}
        </span>
      ))}
    </span>
  );
}

/** Colour a badge by its tag keyword. */
function tagColor(tag: string): string {
  const t = tag.toLowerCase();
  if (t.includes("spicy") || t.includes("hot")) return ORANGE;
  if (t.includes("best") || t.includes("new")) return NEON;
  if (t.includes("popular") || t.includes("fan")) return BLUE;
  return NEON;
}

function igHandle(url?: string, fallback = ""): string {
  if (!url) return fallback;
  const h = url.replace(/\/+$/, "").split("/").pop() ?? fallback;
  return "@" + h.toUpperCase();
}

/* -------------------------------------------------------------------------- */

function Header({ data }: { data: Prospect }) {
  const cta = primaryCta(data);
  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: CREAM, borderBottom: border(3) }}
    >
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center gap-6 px-5 sm:px-8">
        <a href="#top" className="no-underline text-[22px]">
          <Logo name={data.business.name} />
        </a>
        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="no-underline uppercase transition-colors"
              style={{ fontFamily: SPACE, fontWeight: 500, fontSize: 13, letterSpacing: "0.06em", color: DARK }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={cta.href}
          {...ext(cta.external)}
          className="retro-press ml-auto shrink-0 no-underline uppercase md:ml-0"
          style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 13, letterSpacing: "0.04em", color: CREAM, background: DARK, border: border(3), padding: "10px 18px" }}
        >
          {cta.label}
        </a>
      </div>
    </header>
  );
}

function Hero({ data }: { data: Prospect }) {
  const cta = primaryCta(data);
  const headline = data.business.tagline ?? data.business.name;
  const [head1, head2] = headline.includes(",")
    ? [headline.slice(0, headline.indexOf(",") + 1), headline.slice(headline.indexOf(",") + 1).trim()]
    : [headline, ""];

  return (
    <section id="top" style={{ background: CREAM }}>
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        {/* copy */}
        <div className="relative">
          <span
            className="inline-block uppercase"
            style={{ fontFamily: SPACE, fontWeight: 700, fontSize: 13, letterSpacing: "0.14em", color: DARK, background: NEON, border: border(3), padding: "6px 14px", transform: "rotate(-2deg)", boxShadow: `4px 4px 0 0 ${DARK}` }}
          >
            ✦ Locally sourced · No rules
          </span>
          <h1 className="mb-0 mt-7 uppercase" style={{ fontFamily: SYNE, fontWeight: 800, fontSize: "clamp(46px, 8vw, 92px)", lineHeight: 0.92, letterSpacing: "-0.045em", color: DARK }}>
            {head1}
            {head2 && (
              <>
                {" "}
                <span style={{ color: ORANGE }}>{head2}</span>
              </>
            )}
          </h1>
          <p className="mb-0 mt-6 max-w-[46ch]" style={{ fontFamily: SPACE, fontSize: "clamp(16px, 1.5vw, 19px)", lineHeight: 1.55, color: DARK }}>
            {data.business.oneLiner}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={cta.href} {...ext(cta.external)} className="retro-press no-underline uppercase" style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 15, letterSpacing: "0.03em", color: CREAM, background: ORANGE, border: border(3), padding: "15px 30px" }}>
              {cta.label}
            </a>
            <a href="#menu" className="retro-press no-underline uppercase" style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 15, letterSpacing: "0.03em", color: DARK, background: CREAM, border: border(3), padding: "15px 30px" }}>
              See the menu
            </a>
          </div>
        </div>

        {/* framed image + stickers */}
        {data.hero.photo && (
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="relative overflow-hidden" style={{ border: border(3), boxShadow: `10px 10px 0 0 ${DARK}`, transform: "rotate(-2deg)", aspectRatio: "4 / 5", background: DARK }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.hero.photo} alt="" className="h-full w-full object-cover" />
            </div>
            <span className="absolute -right-3 -top-4 uppercase" style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 15, color: DARK, background: NEON, border: border(3), padding: "8px 14px", transform: "rotate(6deg)", boxShadow: `4px 4px 0 0 ${DARK}` }}>
              🔥 Fresh
            </span>
            <span className="absolute -bottom-5 -left-4 uppercase" style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 14, color: CREAM, background: BLUE, border: border(3), padding: "8px 14px", transform: "rotate(-5deg)", boxShadow: `4px 4px 0 0 ${DARK}` }}>
              Est. 2024
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

function Marquee({ data }: { data: Prospect }) {
  const items =
    data.highlights && data.highlights.length
      ? data.highlights.map((h) => `${h.value} ${h.label}`)
      : ["Smash burgers", "Craft cocktails", "Open til late", "No cap"];
  const strip = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden" style={{ background: BLUE, borderTop: border(3), borderBottom: border(3) }}>
      <div className="retro-marquee flex w-max items-center py-3.5">
        {strip.map((it, i) => (
          <span key={i} className="flex items-center whitespace-nowrap uppercase" style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 20, letterSpacing: "0.02em", color: i % 2 ? NEON : CREAM }}>
            {it}
            <span style={{ color: NEON, margin: "0 26px", fontSize: 18 }}>✱</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Menu({ data }: { data: Prospect }) {
  const items = data.services.slice(0, 3);
  if (!items.length) return null;
  return (
    <section id="menu" style={{ background: CREAM }}>
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-24">
        <div className="mb-10 flex flex-col gap-3">
          <span className="uppercase" style={{ fontFamily: SPACE, fontWeight: 700, fontSize: 13, letterSpacing: "0.16em", color: ORANGE }}>
            ✦ Straight from the pass
          </span>
          <h2 className="m-0 uppercase" style={{ fontFamily: SYNE, fontWeight: 800, fontSize: "clamp(34px, 5vw, 62px)", lineHeight: 0.95, letterSpacing: "-0.045em", color: DARK }}>
            Chef&rsquo;s <span style={{ fontFamily: PLAYFAIR, fontStyle: "italic", fontWeight: 400, textTransform: "none", color: ORANGE }}>favorites</span>
          </h2>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {items.map((item, i) => (
            <article key={i} className="retro-lift flex flex-col" style={{ background: "#fff", border: border(3) }}>
              {item.photo && (
                <div className="relative overflow-hidden" style={{ borderBottom: border(3), aspectRatio: "4 / 3" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.photo} alt={item.title} className="h-full w-full object-cover" />
                  {item.tag && (
                    <span className="absolute right-3 top-3 uppercase" style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 12, letterSpacing: "0.03em", color: DARK, background: tagColor(item.tag), border: border(3), padding: "5px 10px", transform: "rotate(4deg)", boxShadow: `3px 3px 0 0 ${DARK}` }}>
                      {item.tag}
                    </span>
                  )}
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="m-0 uppercase" style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 20, lineHeight: 1.05, letterSpacing: "-0.01em", color: DARK }}>
                    {item.title}
                  </h3>
                  {item.price && (
                    <span style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 20, color: ORANGE }}>{item.price}</span>
                  )}
                </div>
                {item.blurb && (
                  <p className="mb-0 mt-3" style={{ fontFamily: SPACE, fontSize: 14.5, lineHeight: 1.5, color: "#444" }}>
                    {item.blurb}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VibeCheck({ data }: { data: Prospect }) {
  const quote = data.signature ?? data.business.tagline;
  const story = data.business.about ?? data.business.oneLiner;
  return (
    <section id="vibe" style={{ background: DARK }}>
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28">
        <span className="uppercase" style={{ fontFamily: SPACE, fontWeight: 700, fontSize: 13, letterSpacing: "0.16em", color: NEON }}>
          ✦ The vibe check
        </span>
        {quote && (
          <p className="mb-0 mt-6 max-w-[20ch]" style={{ fontFamily: SYNE, fontWeight: 800, fontSize: "clamp(36px, 5.5vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.045em", color: CREAM, textTransform: "uppercase" }}>
            {quote}
          </p>
        )}
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
          <span className="block h-[6px] w-24" style={{ background: ORANGE }} />
          <p className="m-0 max-w-[52ch]" style={{ fontFamily: SPACE, fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65, color: "rgba(253,249,240,0.82)" }}>
            {story}
          </p>
        </div>
      </div>
    </section>
  );
}

function Instagram({ data }: { data: Prospect }) {
  const photos = data.photos.slice(0, 4);
  if (!photos.length) return null;
  const ig = data.socials?.instagram;
  const handle = igHandle(ig, "@" + data.business.name.replace(/\s+/g, ".").toUpperCase());
  return (
    <section id="social" style={{ background: CREAM }}>
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-24">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="uppercase" style={{ fontFamily: SPACE, fontWeight: 700, fontSize: 13, letterSpacing: "0.16em", color: BLUE }}>
              ✦ Follow the vibe
            </span>
            <h2 className="m-0 mt-2 uppercase" style={{ fontFamily: SYNE, fontWeight: 800, fontSize: "clamp(30px, 4.5vw, 54px)", lineHeight: 0.95, letterSpacing: "-0.045em", color: DARK }}>
              {handle}
            </h2>
          </div>
          {ig && (
            <a href={ig} target="_blank" rel="noopener" className="retro-press no-underline uppercase" style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 13, letterSpacing: "0.04em", color: CREAM, background: BLUE, border: border(3), padding: "11px 20px" }}>
              Follow us
            </a>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {photos.map((src, i) => (
            <a
              key={i}
              href={ig ?? "#social"}
              {...(ig ? { target: "_blank", rel: "noopener" } : {})}
              className="retro-ig-tile group relative block overflow-hidden no-underline"
              style={{ border: border(3), aspectRatio: "1 / 1" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ data }: { data: Prospect }) {
  const c = data.contact;
  const s = data.socials;
  const cta = primaryCta(data);
  return (
    <footer id="footer" style={{ background: DARK, color: CREAM, borderTop: `6px solid ${ORANGE}` }}>
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <div className="text-[26px]">
            <Logo name={data.business.name} color={CREAM} />
          </div>
          <p className="mt-4 max-w-[34ch]" style={{ fontFamily: SPACE, fontSize: 14.5, lineHeight: 1.55, color: "rgba(253,249,240,0.65)" }}>
            {data.business.tagline ?? data.business.oneLiner}
          </p>
          <a href={cta.href} {...ext(cta.external)} className="retro-press mt-6 inline-block no-underline uppercase" style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 13, letterSpacing: "0.04em", color: DARK, background: NEON, border: border(3), padding: "11px 20px" }}>
            {cta.label}
          </a>
        </div>

        <div style={{ fontFamily: SPACE, fontSize: 14.5 }}>
          <div className="mb-3 uppercase" style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", color: NEON }}>Find us</div>
          {c.address && <div className="mb-2" style={{ color: "rgba(253,249,240,0.8)", lineHeight: 1.5 }}>{c.address}</div>}
          {c.hours && <div className="mb-2" style={{ color: "rgba(253,249,240,0.6)" }}>{c.hours}</div>}
          {c.phone && (
            <a href={`tel:${c.phone.replace(/\s+/g, "")}`} className="block no-underline" style={{ color: CREAM }}>{c.phone}</a>
          )}
          {c.email && (
            <a href={`mailto:${c.email}`} className="block no-underline" style={{ color: CREAM }}>{c.email}</a>
          )}
        </div>

        <div style={{ fontFamily: SPACE, fontSize: 14.5 }}>
          <div className="mb-3 uppercase" style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", color: NEON }}>Explore</div>
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="mb-2 block no-underline uppercase" style={{ color: "rgba(253,249,240,0.8)", letterSpacing: "0.04em" }}>{n.label}</a>
          ))}
          {s?.instagram && (
            <a href={s.instagram} target="_blank" rel="noopener" className="mb-2 block no-underline uppercase" style={{ color: "rgba(253,249,240,0.8)", letterSpacing: "0.04em" }}>Instagram</a>
          )}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-6 uppercase sm:flex-row sm:justify-between sm:px-8" style={{ borderTop: "1px solid rgba(253,249,240,0.16)", fontFamily: SPACE, fontSize: 12, letterSpacing: "0.06em", color: "rgba(253,249,240,0.55)" }}>
        <span>© 2026 {data.business.name.toUpperCase()}</span>
        <span>Prototype by Rhythmiq — made with <span style={{ color: NEON }}>no cap</span></span>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */

const RestaurantRetroVibe = ({ data }: { data: Prospect }) => (
  <div className="retro-vibe" style={{ background: CREAM, color: DARK, minHeight: "100svh", overflowX: "clip", position: "relative" }}>
    {/* film grain overlay */}
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40" style={{ opacity: 0.28, mixBlendMode: "multiply", backgroundImage: GRAIN }} />
    <Header data={data} />
    <Hero data={data} />
    <Marquee data={data} />
    <Menu data={data} />
    <VibeCheck data={data} />
    <Instagram data={data} />
    <Footer data={data} />
  </div>
);

export default RestaurantRetroVibe;

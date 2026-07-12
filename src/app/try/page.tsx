import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { generateMetadata as buildMetadata } from "@/utils";
import { listLiveProspects } from "@/lib/try/load";
import { getVerticalMeta, monogram } from "@/lib/try/catalog";
import { DEV_WORK } from "@/components/marketing/dev/constants";
import type { Prospect } from "@/lib/try/schema";

export const metadata: Metadata = buildMetadata({
  title: "Rhythmiq: Website previews",
  description: "Live website previews designed and shipped by Rhythmiq Dev.",
  noIndex: true,
  alternates: { canonical: "https://try.rhythmiqcx.com/" },
  openGraph: { images: [] },
});

/**
 * Card thumbnail. Preferred: a real full-page screenshot captured into
 * `public/try/_showcase/<slug>.webp` (regenerate after big visual changes).
 * Fallback: first still image from the site's own assets, then a monogram tile.
 */
function screenshotFor(slug: string): string | null {
  const file = path.join(process.cwd(), "public/try/_showcase", `${slug}.webp`);
  return fs.existsSync(file) ? `/try/_showcase/${slug}.webp` : null;
}

function thumbFor(p: Prospect): string | null {
  const candidates = [p.hero.poster, p.hero.photo, ...p.photos];
  return candidates.find((src) => !!src && /\.(webp|jpe?g|png|avif)$/i.test(src)) ?? null;
}

/**
 * Showcase listing for try.rhythmiqcx.com. This is the page we share with
 * prospects to show the quality of our work. Every live prototype under
 * content/try/ appears automatically; archived ones drop off on the next build.
 */
export default function TryIndex() {
  const sites = listLiveProspects()
    .filter((p) => !p.unlisted)
    .sort((a, b) => a.business.name.localeCompare(b.business.name));

  return (
    <main className="min-h-[100svh] bg-paper px-6 pb-24 pt-20 text-ink md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <span className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink3">
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-coral" />
          Rhythmiq previews
        </span>
        <h1 className="h-section mt-5 max-w-[24ch] font-heading">
          Websites we design, built as live previews.
        </h1>
        <p className="lede mt-4 max-w-[56ch]">
          This page is a showcase of the quality of our work. Every preview is a real,
          working site: designed, built, and hosted by the Rhythmiq studio. We can build
          anything you like, or change any of these sites to fit your business. Open one
          and look around.
        </p>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((p) => {
            const thumb = screenshotFor(p.slug) ?? thumbFor(p);
            const meta = getVerticalMeta(p.vertical);
            return (
              <a key={p.slug} href={`/try/${p.slug}`} className="group block no-underline">
                <div
                  className="grid aspect-[16/10] place-items-center overflow-hidden rounded-xl border border-ink/10"
                  style={{ background: p.theme.scheme === "dark" ? "#141414" : "#efe9e1" }}
                >
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt={`${p.business.name} website preview`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <span
                      className="font-heading text-5xl transition-transform duration-500 ease-out group-hover:scale-110"
                      style={{ color: p.theme.accent }}
                    >
                      {monogram(p.business.name)}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-heading text-lg text-ink">{p.business.name}</span>
                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">
                    {meta.label}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-ink2">{p.business.oneLiner}</p>
              </a>
            );
          })}
        </div>

        <div className="mt-24 border-t border-ink/10 pt-12">
          <span className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink3">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-coral" />
            Our own work
          </span>
          <h2 className="mt-5 max-w-[26ch] font-heading text-[clamp(24px,3.2vw,36px)] leading-tight">
            Products we build and run ourselves.
          </h2>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink2">
            Not previews: these are live products from the Rhythmiq team, running in
            production today.
          </p>

          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {DEV_WORK.map((item) => {
              const media = (
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-ink/10 bg-paper2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={`${item.title}, ${item.caption}`}
                    loading="lazy"
                    className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              );
              const caption = (
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <b className="text-[15px] text-ink">{item.title}</b>
                    <span className="text-[13px] text-ink3">{item.caption}</span>
                  </div>
                  {item.href && (
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 text-ink3 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:text-ink"
                    >
                      ↗
                    </span>
                  )}
                </div>
              );
              return item.href ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  className="group block no-underline transition-transform duration-300 hover:-translate-y-1"
                >
                  {media}
                  {caption}
                </a>
              ) : (
                <div key={item.id} className="group">
                  {media}
                  {caption}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 border-t border-ink/10 pt-10 text-center">
          <p className="lede mx-auto max-w-[44ch]">Want one of these with your name on it?</p>
          <a href="https://dev.rhythmiqcx.com" className="btn btn-dark mt-6" target="_blank" rel="noopener">
            Talk to Rhythmiq Dev
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </main>
  );
}

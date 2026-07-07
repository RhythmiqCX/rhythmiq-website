import Reveal from "@/components/marketing/restaurant/reveal";
import type { Prospect } from "@/lib/try/schema";

/**
 * Gallery — a responsive photo grid. Renders nothing when the prospect has no
 * photos (many prototypes ship photo-less with a gradient hero). The first photo
 * spans two columns on larger screens for a more editorial rhythm.
 */
const TryGallery = ({ data }: { data: Prospect }) => {
  const photos = data.photos;
  if (photos.length === 0) return null;

  return (
    <section id="gallery" aria-label="Gallery" className="section" style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em]" style={{ color: "var(--fg3)" }}>
            <span className="inline-block h-[7px] w-[7px] rounded-full" style={{ background: "var(--accent)" }} />
            A look inside
          </span>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {photos.map((src, i) => (
            <Reveal
              key={src}
              delay={0.05 * i}
              className={i === 0 ? "col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-[14px]"
                style={{ aspectRatio: i === 0 ? "16 / 11" : "4 / 3", border: "1px solid var(--line-soft)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TryGallery;

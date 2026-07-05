import Image from "next/image";
import Reveal from "@/components/marketing/restaurant/reveal";
import { DEV_WORK } from "./constants";

/**
 * Selected work — 2×2 grid of shipped projects. Screenshots are shown
 * "contained" on a soft tint so the mixed shapes (landscape web + portrait
 * mobile) sit uncropped. Tiles with a live `href` are clickable and lift on hover.
 */
const DevWork = () => {
  return (
    <section id="work" aria-label="Selected work" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="flex flex-col gap-3.5">
            <Reveal>
              <span className="eyebrow">Selected work</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h-section font-heading">Built here, running out there.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <a className="link-arrow" href="#start">
              Ask for a walkthrough <span className="arrow">→</span>
            </a>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {DEV_WORK.map((item, i) => {
            const media = (
              <div
                className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[14px] bg-paper2"
                style={{ border: "1px solid var(--line-soft)" }}
              >
                <Image
                  src={item.image}
                  alt={`${item.title}, ${item.caption}`}
                  fill
                  sizes="(max-width:640px) 100vw, 50vw"
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            );

            const caption = (
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <b className="text-[15.5px]">{item.title}</b>
                  <span className="text-[13.5px] text-ink3">{item.caption}</span>
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

            return (
              <Reveal key={item.id} delay={(i % 2) * 0.1}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="group flex flex-col gap-3.5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    {media}
                    {caption}
                  </a>
                ) : (
                  <div className="group flex flex-col gap-3.5">
                    {media}
                    {caption}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DevWork;

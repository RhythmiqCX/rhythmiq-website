import Reveal from "@/components/marketing/restaurant/reveal";
import type { Prospect } from "@/lib/try/schema";

/**
 * Feature — a bold, oversized "signature" statement. When a photo is available
 * it becomes an editorial split (image + statement); otherwise a big
 * typographic block with an accent rule. Always renders (it derives from the
 * tagline/one-liner), so every prototype gets a substantial mid-page moment.
 */
const TryFeature = ({ data, label = "Why they'll remember you" }: { data: Prospect; label?: string }) => {
  const statement = data.signature ?? data.business.tagline ?? data.business.oneLiner;
  const support = data.signature ? data.business.oneLiner : undefined;
  const image = data.photos[0] ?? (data.hero.mode !== "ken-burns" ? undefined : data.hero.photo);

  return (
    <section aria-label="Signature" className="section" style={{ background: "var(--bg2)" }}>
      <div className={`wrap grid items-center gap-12 ${image ? "lg:grid-cols-2" : ""}`}>
        {image && (
          <Reveal>
            <div className="relative overflow-hidden rounded-[18px]" style={{ aspectRatio: "5 / 4", border: "1px solid var(--line-soft)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        )}

        <div className={image ? "" : "mx-auto max-w-[24ch] text-center"}>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em]" style={{ color: "var(--fg3)" }}>
              <span className="inline-block h-[7px] w-[7px] rounded-full" style={{ background: "var(--accent)" }} />
              {label}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="m-0 mt-5 font-heading font-medium"
              style={{ fontSize: "clamp(30px, 4.6vw, 62px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--fg)", textWrap: "balance" }}
            >
              {statement}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <span className="mt-7 block h-[3px] w-16 rounded-full" style={{ background: "var(--accent)", marginInline: image ? undefined : "auto" }} />
          </Reveal>
          {support && (
            <Reveal delay={0.18}>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.6]" style={{ color: "var(--fg2)" }}>
                {support}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default TryFeature;

import Reveal from "@/components/marketing/restaurant/reveal";
import type { Prospect } from "@/lib/try/schema";

/**
 * Highlights — a compact proof-point band (big value + small label). Reads great
 * without any photos, so it adds substance to photo-less prototypes. Renders
 * nothing when the prospect has no highlights.
 */
const TryHighlights = ({ data }: { data: Prospect }) => {
  const items = data.highlights;
  if (!items || items.length === 0) return null;

  return (
    <section
      aria-label="Highlights"
      style={{ background: "var(--card)", borderTop: "1px solid var(--line-soft)", borderBottom: "1px solid var(--line-soft)" }}
    >
      <div className="wrap">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 py-12 sm:py-16 md:grid-cols-4">
          {items.map((h, i) => (
            <Reveal key={h.label} delay={0.06 * i} className="text-center">
              <div className="font-heading font-semibold" style={{ fontSize: "clamp(34px, 4.4vw, 54px)", letterSpacing: "-0.03em", color: "var(--accent)", lineHeight: 1 }}>
                {h.value}
              </div>
              <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--fg3)" }}>
                {h.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TryHighlights;

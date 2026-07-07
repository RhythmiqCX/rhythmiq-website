import Reveal from "@/components/marketing/restaurant/reveal";
import type { Prospect } from "@/lib/try/schema";

/** Testimonial — a single pull-quote. Renders nothing when none is supplied. */
const TryTestimonial = ({ data }: { data: Prospect }) => {
  const t = data.testimonial;
  if (!t) return null;

  return (
    <section aria-label="Testimonial" className="section" style={{ background: "var(--bg2)" }}>
      <div className="wrap max-w-[46rem] text-center">
        <Reveal>
          <span aria-hidden className="font-heading text-[64px] leading-[0.2]" style={{ color: "var(--accent)" }}>
            &ldquo;
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <blockquote className="m-0 mt-6 font-heading font-medium" style={{ fontSize: "clamp(24px, 3.4vw, 40px)", lineHeight: 1.25, letterSpacing: "-0.02em", color: "var(--fg)", textWrap: "balance" }}>
            {t.quote}
          </blockquote>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-7 font-mono text-[13px] uppercase tracking-[0.12em]" style={{ color: "var(--fg3)" }}>
            — {t.author}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TryTestimonial;

import Reveal from "@/components/marketing/restaurant/reveal";
import type { Prospect } from "@/lib/try/schema";
import { primaryCta, secondaryCta, ctaVerb } from "./util";

/**
 * Closing CTA — the accent-filled conversion block. Big headline, the primary
 * action, and a quiet row of every other way to reach the business.
 */
const TryCTA = ({ data, headline }: { data: Prospect; headline?: string }) => {
  const cta = primaryCta(data);
  const cta2 = secondaryCta(data, cta);
  const { phone, email, address } = data.contact;
  const title = headline ?? `${ctaVerb(data)}?`;

  return (
    <section id="contact" aria-label="Get in touch" className="section" style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>
      <div className="wrap flex flex-col items-center text-center">
        <Reveal>
          <h2 className="h-display m-0 max-w-[16ch] font-heading" style={{ color: "var(--accent-ink)" }}>
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[42ch] text-[17px] leading-[1.55]" style={{ color: "var(--accent-ink)", opacity: 0.85 }}>
            {data.business.name} would love to see you. {data.contact.bookingUrl ? "Reserve your table in seconds." : "Reach out — we'll take it from there."}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            <a
              href={cta.href}
              {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
              className="rounded-full font-sans font-semibold no-underline transition-transform duration-200 hover:-translate-y-0.5"
              style={{ padding: "16px 40px", fontSize: "16px", background: "var(--accent-ink)", color: "var(--accent)" }}
            >
              {cta.label}
            </a>
            {cta2 && (
              <a
                href={cta2.href}
                className="rounded-full font-sans font-semibold no-underline transition-colors duration-200"
                style={{ padding: "16px 30px", fontSize: "16px", color: "var(--accent-ink)", border: "1px solid color-mix(in srgb, var(--accent-ink) 45%, transparent)" }}
              >
                {cta2.label}
              </a>
            )}
          </div>
        </Reveal>

        {(phone || email || address) && (
          <Reveal delay={0.22}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-mono text-[13px]" style={{ color: "var(--accent-ink)", opacity: 0.8 }}>
              {phone && <a href={`tel:${phone.replace(/\s+/g, "")}`} className="no-underline hover:underline" style={{ color: "inherit" }}>{phone}</a>}
              {email && <a href={`mailto:${email}`} className="no-underline hover:underline" style={{ color: "inherit" }}>{email}</a>}
              {address && <span>{address}</span>}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default TryCTA;

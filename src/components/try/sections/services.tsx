import Reveal from "@/components/marketing/restaurant/reveal";
import type { Prospect } from "@/lib/try/schema";
import { resolveServices } from "@/lib/try/load";

/**
 * Services — numbered cards. Uses the prospect's own services or the vertical's
 * sensible defaults. Cards lift on hover; every color comes from the theme vars
 * so one component renders every brand + scheme.
 */
const TryServices = ({ data, eyebrow = "What we offer", heading }: { data: Prospect; eyebrow?: string; heading?: string }) => {
  const services = resolveServices(data);
  const title = heading ?? "Everything you came for.";

  return (
    <section id="services" aria-label="Services" className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em]" style={{ color: "var(--fg3)" }}>
            <span className="inline-block h-[7px] w-[7px] rounded-full" style={{ background: "var(--accent)" }} />
            {eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="h-section mt-4 mb-11 max-w-[20ch] font-heading" style={{ color: "var(--fg)" }}>
            {title}
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => (
            <Reveal key={svc.title} delay={0.06 * i}>
              <div
                className="flex h-full flex-col gap-3 rounded-[16px] p-7 transition-transform duration-300 hover:-translate-y-1"
                style={{ background: "var(--card)", border: "1px solid var(--line-soft)" }}
              >
                <span className="font-mono text-[12px]" style={{ color: "var(--accent)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h-feature font-heading" style={{ color: "var(--fg)" }}>
                  {svc.title}
                </h3>
                {svc.blurb && (
                  <p className="m-0 text-[15px] leading-[1.55]" style={{ color: "var(--fg2)" }}>
                    {svc.blurb}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TryServices;

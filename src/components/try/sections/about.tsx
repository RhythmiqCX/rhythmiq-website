import Reveal from "@/components/marketing/restaurant/reveal";
import type { Prospect } from "@/lib/try/schema";

/**
 * About — a short statement plus a details card (address / hours) when we have
 * them. Falls back to a single centered column when there's nothing to put in
 * the card, so it never looks empty.
 */
const TryAbout = ({ data }: { data: Prospect }) => {
  const { address, hours, mapUrl } = data.contact;
  const hasDetails = Boolean(address || hours);
  const statement = data.business.tagline ?? data.business.oneLiner;
  const body = data.business.tagline ? data.business.oneLiner : undefined;

  return (
    <section id="about" aria-label="About" className="section" style={{ background: "var(--bg)" }}>
      <div className={`wrap grid gap-12 ${hasDetails ? "lg:grid-cols-[1.4fr_1fr] lg:items-center" : ""}`}>
        <div className={hasDetails ? "" : "mx-auto max-w-[40ch] text-center"}>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em]" style={{ color: "var(--fg3)" }}>
              <span className="inline-block h-[7px] w-[7px] rounded-full" style={{ background: "var(--accent)" }} />
              Who we are
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="h-section mt-4 font-heading" style={{ color: "var(--fg)", textWrap: "balance" }}>
              {statement}
            </p>
          </Reveal>
          {body && (
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.6]" style={{ color: "var(--fg2)" }}>
                {body}
              </p>
            </Reveal>
          )}
        </div>

        {hasDetails && (
          <Reveal delay={0.12}>
            <div className="rounded-[18px] p-7" style={{ background: "var(--card)", border: "1px solid var(--line-soft)" }}>
              {address && (
                <div className="mb-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--fg3)" }}>
                    Find us
                  </div>
                  <p className="mt-1.5 text-[16px] leading-[1.5]" style={{ color: "var(--fg)" }}>
                    {address}
                  </p>
                  {mapUrl && (
                    <a href={mapUrl} target="_blank" rel="noopener" className="mt-1 inline-block text-[14px] font-semibold underline-offset-2 hover:underline" style={{ color: "var(--accent)" }}>
                      Open in maps →
                    </a>
                  )}
                </div>
              )}
              {hours && (
                <div style={address ? { borderTop: "1px solid var(--line-soft)", paddingTop: 20 } : undefined}>
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--fg3)" }}>
                    Hours
                  </div>
                  <p className="mt-1.5 whitespace-pre-line text-[16px] leading-[1.6]" style={{ color: "var(--fg)" }}>
                    {hours}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default TryAbout;

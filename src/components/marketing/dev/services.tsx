import Reveal from "@/components/marketing/restaurant/reveal";
import { DEV_SERVICES } from "./constants";

/**
 * Services — three numbered cards on paper-2. Cards lift -4px with a soft shadow
 * on hover; mono tag pills sit under a hairline divider.
 */
const DevServices = () => {
  return (
    <section id="services" aria-label="Services" className="section bg-paper2">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">What we build</span>
        </Reveal>

        <div className="flex flex-wrap items-end justify-between gap-6 mt-3.5 mb-11">
          <Reveal delay={0.08}>
            <h2 className="h-section font-heading max-w-[22ch]">
              Senior engineers, no handoffs.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="m-0 max-w-[34ch] text-[15px] text-ink2 leading-[1.55]">
              Scoped on one page, priced before we start, shipped in weeks. You talk to the people
              writing the code.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="frame frame-pad grid gap-6 md:grid-cols-3">
            {DEV_SERVICES.map((svc) => (
              <div
                key={svc.no}
                className="flex flex-col gap-3 rounded-[14px] bg-white p-7 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(25,24,20,0.28)]"
                style={{
                  border: "1px solid var(--line-soft)",
                  transition:
                    "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <span className="font-mono text-[12px] text-coral">{svc.no}</span>
                <h3 className="h-feature font-heading">{svc.title}</h3>
                <p className="m-0 flex-1 text-[15px] text-ink2 leading-[1.55]">{svc.body}</p>
                <div
                  className="flex flex-wrap gap-2 pt-3.5"
                  style={{ borderTop: "1px solid var(--line-soft)" }}
                >
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] text-ink3 rounded-full px-[9px] py-[3px]"
                      style={{ border: "1px solid var(--line)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default DevServices;

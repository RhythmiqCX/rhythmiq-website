import Reveal from "@/components/marketing/restaurant/reveal";
import { DEV_PRINCIPLES, DEV_PEDIGREE } from "./constants";

/**
 * About — 2-col. Positioning copy + numbered principles on the left; a dark
 * "credentials" panel on the right (engineering pedigree + the network model)
 * standing in for a team photo.
 */
const DevAbout = () => {
  return (
    <section id="about" aria-label="About" className="section">
      <div className="wrap grid items-center gap-[72px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-5">
          <Reveal>
            <span className="eyebrow">Who builds it</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-section font-heading max-w-[20ch]">
              Senior engineers who&rsquo;ve shipped at scale.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede max-w-[52ch]">
              We&rsquo;re a group of senior engineers working at companies like Meta, Google, and
              Paytm, backed by a vetted network of freelance developers. We pick up work through that
              network as availability allows, so the people on your project build and run software at
              real scale every day. Web, mobile, backend, or AI, we take on application development at
              any level.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-2 flex flex-col">
              {DEV_PRINCIPLES.map((principle, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[26px_1fr] items-baseline gap-3.5 py-3.5"
                  style={{
                    borderTop: "1px solid var(--line-soft)",
                    borderBottom:
                      i === DEV_PRINCIPLES.length - 1 ? "1px solid var(--line-soft)" : undefined,
                  }}
                >
                  <span className="font-mono text-[12px] text-coral">/{i + 1}</span>
                  <span className="text-[15px] text-ink2 leading-[1.55]">{principle}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="frame frame-pad flex flex-col gap-3">
            <div
              className="flex flex-col gap-6 rounded-[14px] bg-dark p-8 text-onDark"
              style={{ border: "1px solid var(--line-dark)" }}
            >
              <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-onDark2">
                the people behind it
              </span>
              <div className="flex flex-wrap gap-2.5">
                {DEV_PEDIGREE.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full bg-dark2 px-3.5 py-1.5 font-mono text-[13px] text-onDark"
                    style={{ border: "1px solid var(--line-dark)" }}
                  >
                    {badge}
                  </span>
                ))}
                <span
                  className="inline-flex items-center rounded-full px-3.5 py-1.5 font-mono text-[13px] text-hlOnDark"
                  style={{ border: "1px solid rgba(255,154,120,0.35)" }}
                >
                  + network
                </span>
              </div>
              <div className="h-px w-full" style={{ background: "var(--line-dark)" }} />
              <p className="text-[15px] leading-[1.55] text-onDark">
                Senior engineers, backed by a vetted network of freelance developers we trust.
              </p>
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-hlOnDark">
                web · mobile · backend · AI
              </span>
            </div>
            <span
              className="self-start rounded-[5px] px-[9px] py-1 font-mono text-[11px] tracking-[0.04em] text-ink3"
              style={{
                background: "rgba(250,248,243,0.86)",
                border: "1px solid var(--line-soft)",
              }}
            >
              the engineers behind RhythmiqCX
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default DevAbout;

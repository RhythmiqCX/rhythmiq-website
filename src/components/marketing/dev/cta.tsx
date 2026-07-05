import Reveal from "@/components/marketing/restaurant/reveal";
import { DEV_BOOKING_URL, DEV_EMAIL } from "./constants";

/**
 * CTA — centered, on paper-2. A 20-minute call that leaves you with a one-page
 * scope and a price whether or not you hire us.
 */
const DevCTA = () => {
  return (
    <section id="start" aria-label="Start a project" className="section bg-paper2 text-center">
      <div className="wrap flex flex-col items-center gap-[26px]">
        <Reveal>
          <span className="eyebrow">Start a project</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-display font-heading">
            Tell us what
            <br />
            you&rsquo;re building.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="m-0 max-w-[44ch] text-[16px] text-ink2">
            A 20-minute call. You leave with a one-page scope and a price, whether or not you hire
            us.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3">
            <a className="btn btn-accent" href={DEV_BOOKING_URL} target="_blank" rel="noopener">
              Book a call
            </a>
            <a className="btn btn-ghost" href={`mailto:${DEV_EMAIL}`}>
              {DEV_EMAIL} <span className="arrow">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default DevCTA;

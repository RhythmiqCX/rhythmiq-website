import Link from "next/link";
import Reveal from "./reveal";
import { INTEGRATIONS_URL } from "@/constants/links";

const TILES = ["POS", "Reservations", "CRM", "Delivery", "Payments", "Calendar", "SMS", "Analytics"];

const Integrations = () => {
  return (
    <section className="section" id="integrations" aria-label="Integrations">
      <div className="wrap grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-center">
        <Reveal>
          <span className="eyebrow">Apps &amp; integrations</span>
          <h2 className="h-section my-3.5">Plugs into the stack you already run</h2>
          <p className="lede max-w-[46ch]">
            Two way sync with your POS, reservation book, and CRM. Rhythmiq writes bookings and
            orders where your team already looks, so there are no new screens to learn.
          </p>
          <Link href={INTEGRATIONS_URL} className="link-arrow mt-[18px] inline-flex">
            Browse integrations <span className="arrow">→</span>
          </Link>
        </Reveal>
        <Reveal delay={0.12} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TILES.map((tile) => (
            <div className="tile" key={tile}>
              <span className="gl">
                <span />
              </span>
              <small>{tile}</small>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Integrations;

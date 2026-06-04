import Link from "next/link";
import Reveal from "@/components/marketing/restaurant/reveal";
import { BOOK_DEMO_URL, DEMO_URL } from "@/constants/links";

const IntegrationsHero = () => {
  return (
    <section className="section text-center" aria-label="Integrations">
      <div className="wrap">
        <span className="eyebrow justify-center">Apps &amp; integrations</span>
        <h1 className="h-display mt-[18px] max-w-[16ch] mx-auto">
          Plugs into the stack you already run.
        </h1>
        <p className="lede mt-5 max-w-[54ch] mx-auto">
          Rhythmiq does two way sync with your POS, reservation book, and CRM. It
          writes bookings and orders where your team already looks, so there are
          no new screens for anyone to learn.
        </p>
        <Reveal className="flex gap-3 justify-center flex-wrap mt-7">
          <Link href={BOOK_DEMO_URL} className="btn btn-dark">
            Start free
          </Link>
          <Link href={DEMO_URL} className="btn btn-ghost">
            See the demo <span className="arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default IntegrationsHero;

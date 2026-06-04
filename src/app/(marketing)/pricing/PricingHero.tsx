import Link from "next/link";
import Reveal from "@/components/marketing/restaurant/reveal";
import { BOOK_DEMO_URL, DEMO_URL } from "@/constants/links";

const PricingHero = () => {
  return (
    <section className="section text-center" aria-label="Pricing">
      <div className="wrap">
        <span className="eyebrow justify-center">Pricing</span>
        <h1 className="h-display mt-[18px] max-w-[15ch] mx-auto">
          One flat price. No per minute surprises.
        </h1>
        <p className="lede mt-5 max-w-[52ch] mx-auto">
          Start at $29 a month and answer every call, book every table, and take
          every order. You pay for the plan, never for the minutes.
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

export default PricingHero;

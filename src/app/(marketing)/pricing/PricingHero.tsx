import Link from "next/link";
import Reveal from "@/components/marketing/restaurant/reveal";
import { BOOK_DEMO_URL, DEMO_URL } from "@/constants/links";

const PricingHero = () => {
  return (
    <section className="section text-center" aria-label="Pricing">
      <div className="wrap">
        <span className="eyebrow justify-center">Pricing</span>
        <h1 className="h-display mt-[18px] max-w-[18ch] mx-auto">
          Costs less than the tables you're missing.
        </h1>
        <p className="lede mt-5 max-w-[54ch] mx-auto">
          Every plan answers your phone 24/7, books tables, takes orders, and
          speaks your guests' language. Pick by how busy your phone gets. No setup
          fees, no surprise overage bills.
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

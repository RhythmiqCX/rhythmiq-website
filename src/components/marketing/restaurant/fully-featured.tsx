import Link from "next/link";
import Reveal from "./reveal";
import Placeholder from "./placeholder";
import { BOOK_DEMO_URL, DEMO_URL } from "@/constants/links";

const FullyFeatured = () => {
  return (
    <section className="section bg-paper2" aria-label="Fully featured">
      <div className="wrap grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
        <Reveal>
          <span className="eyebrow">Everything a phone host needs</span>
          <h2 className="h-section mt-3.5 mb-4">A fully-featured AI phone host</h2>
          <p className="lede mb-[22px] max-w-[46ch]">
            Reservations, orders, waitlists, FAQs, callbacks, and live transfers — Rhythmiq handles the
            whole front desk of the phone, then keeps improving on its own.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link href={BOOK_DEMO_URL} className="btn btn-dark">
              Start free trial
            </Link>
            <Link href={DEMO_URL} className="btn btn-ghost">
              Watch demo <span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="frame frame-light p-[30px]">
          <Placeholder tint="sand" tag="flock line illustration" className="aspect-[4/3] rounded-[14px]" />
        </Reveal>
      </div>
    </section>
  );
};

export default FullyFeatured;

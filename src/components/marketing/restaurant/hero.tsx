import Link from "next/link";
import Placeholder from "./placeholder";
import { BOOK_DEMO_URL, DEMO_URL } from "@/constants/links";

const Hero = () => {
  return (
    <section className="pt-10 lg:pt-[76px] pb-7 lg:pb-11" aria-label="Hero">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1.55fr_1fr] gap-7 lg:gap-[72px] lg:items-end">
          <h1 className="h-display">
            The voice that
            <br />
            never misses
            <br />a call.
          </h1>
          <div className="pb-2">
            <p className="text-ink2 text-base mb-[22px] max-w-[38ch]">
              Rhythmiq is the AI phone host for restaurants — answering every call, booking tables,
              taking orders, and sounding exactly like your best maître d&rsquo;.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link href={BOOK_DEMO_URL} className="btn btn-dark">
                Start free trial
              </Link>
              <Link href={DEMO_URL} className="btn btn-ghost">
                Hear a live call <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Eclectic image strip */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 mt-8 lg:mt-12">
          <Placeholder tint="sand" tag="dining room" className="aspect-[3/2.4] self-end" />
          <Placeholder tag="chef plating" className="aspect-[3/3.4]" />
          <Placeholder tint="sky" tag="phone ringing" className="aspect-[3/3.4]" />
          <Placeholder tint="coral" tag="illustration" className="aspect-[3/4]" />
          <Placeholder tag="host stand" className="aspect-[3/3.4]" />
          <Placeholder tint="sand" tag="guests" className="aspect-[3/2.6] self-end" />
          <Placeholder tint="ink" tag="night service" className="aspect-[3/3.4]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

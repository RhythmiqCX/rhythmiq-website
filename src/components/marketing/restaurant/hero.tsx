import Link from "next/link";
import {
  HeroDining,
  HeroChef,
  HeroPhone,
  HeroRings,
  HeroHost,
  HeroGuests,
  HeroNight,
} from "./visuals";
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
              Rhythmiq is the AI phone host for restaurants. It answers every call, books your
              tables, takes your orders, and sounds just like your best maître d&rsquo;.
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
          <HeroDining className="aspect-[3/2.4] self-end rounded-lg" />
          <HeroChef className="aspect-[3/3.4] rounded-lg" />
          <HeroPhone className="aspect-[3/3.4] rounded-lg" />
          <HeroRings className="aspect-[3/4] rounded-lg" />
          <HeroHost className="aspect-[3/3.4] rounded-lg" />
          <HeroGuests className="aspect-[3/2.6] self-end rounded-lg" />
          <HeroNight className="aspect-[3/3.4] rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

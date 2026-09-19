import Link from "next/link";
import { BOOK_DEMO_URL, DEMO_URL } from "@/constants/links";
import { MeshTile, ParcelArt, PhoneCallArt, ExchangeArt, CartCheckArt } from "./art";

const Hero = () => {
  return (
    <section className="pt-10 lg:pt-[76px] pb-7 lg:pb-11" aria-label="Hero">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1.55fr_1fr] gap-7 lg:gap-[72px] lg:items-end">
          <h1 className="h-display">
            The call that
            <br />
            saves the
            <br />
            order.
          </h1>
          <div className="pb-2">
            <p className="text-ink2 text-base mb-[22px] max-w-[38ch]">
              Rhythmiq is voice AI for D2C brands. It calls customers to rescue failed
              deliveries, confirm COD orders, turn returns into exchanges, and win back
              abandoned carts, in your customer&rsquo;s own language.
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

        {/* Eclectic art strip */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 mt-8 lg:mt-12">
          <MeshTile uid="hero-dark" variant="dark" className="aspect-[3/2.4] self-end rounded-lg" />
          <MeshTile uid="hero-coral" variant="coral" className="aspect-[3/3.4] rounded-lg" />
          <ParcelArt className="aspect-[3/3.4] rounded-lg" />
          <PhoneCallArt className="aspect-[3/4] rounded-lg" />
          <ExchangeArt className="aspect-[3/3.4] rounded-lg" />
          <MeshTile uid="hero-cool" variant="cool" className="aspect-[3/2.6] self-end rounded-lg" />
          <CartCheckArt className="aspect-[3/3.4] rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

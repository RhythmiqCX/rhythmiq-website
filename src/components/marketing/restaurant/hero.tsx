import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib";
import { BOOK_DEMO_URL, DEMO_URL } from "@/constants/links";

const HeroPhoto = ({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) => (
  <div className={cn("relative overflow-hidden bg-paper2", className)}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width:640px) 33vw, (max-width:1024px) 25vw, 14vw"
      className="object-cover"
      priority={priority}
    />
  </div>
);

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

        {/* Eclectic photo strip. Slots alternate landscape and portrait, and each
            photo sits in a slot matching its native orientation so nothing gets
            crushed by the crop. Staggered heights and `self-end` give the row its
            uneven, cut-and-paste rhythm. */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-8 lg:mt-12">
          <HeroPhoto src="/images/hero/handoff-01.webp" alt="A courier handing two parcels to a customer at the door" className="aspect-[3/2.4] self-end rounded-lg" priority />
          <HeroPhoto src="/images/hero/shopping-02.webp" alt="A shopper browsing clothes in an app, card in hand" className="aspect-[3/3.4] rounded-lg" priority />
          <HeroPhoto src="/images/hero/fragile-03.webp" alt="A delivery driver carrying a box marked fragile" className="aspect-[3/4] rounded-lg" priority />
          <HeroPhoto src="/images/hero/packing-04.webp" alt="Someone packing orders at a fulfilment desk" className="aspect-[3/2.6] self-end rounded-lg" />
          <HeroPhoto src="/images/hero/call-05.webp" alt="A customer taking a call at home about their order" className="aspect-[3/3.4] rounded-lg" />
          <HeroPhoto src="/images/hero/mailers-06.webp" alt="Branded mailer boxes with thank-you cards, ready to ship" className="aspect-[3/2.6] self-end rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

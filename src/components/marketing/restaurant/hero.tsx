import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib";
import { BOOK_DEMO_URL, DEMO_URL } from "@/constants/links";

const HeroPhoto = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <div className={cn("relative overflow-hidden bg-paper2", className)}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width:640px) 33vw, (max-width:1024px) 25vw, 14vw"
      className="object-cover"
    />
  </div>
);

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

        {/* Eclectic photo strip */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 mt-8 lg:mt-12">
          <HeroPhoto src="/images/hero/dine-05.webp" alt="Warm restaurant dining room" className="aspect-[3/2.4] self-end rounded-lg" />
          <HeroPhoto src="/images/hero/night-10.webp" alt="Restaurant glowing at night" className="aspect-[3/3.4] rounded-lg" />
          <HeroPhoto src="/images/hero/table-08.webp" alt="Table set for dinner service" className="aspect-[3/3.4] rounded-lg" />
          <HeroPhoto src="/images/hero/drink-01.webp" alt="Wine being poured at a table" className="aspect-[3/4] rounded-lg" />
          <HeroPhoto src="/images/hero/serve-03.webp" alt="A server greeting guests" className="aspect-[3/3.4] rounded-lg" />
          <HeroPhoto src="/images/hero/chef-11.webp" alt="Chef plating a dish in the kitchen" className="aspect-[3/2.6] self-end rounded-lg" />
          <HeroPhoto src="/images/hero/food-02.webp" alt="A plated dish, close up" className="aspect-[3/3.4] rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

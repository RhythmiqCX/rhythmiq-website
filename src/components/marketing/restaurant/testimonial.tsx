import Reveal from "./reveal";
import { ExchangeArt } from "./art";

const Testimonial = () => {
  return (
    <section className="section" aria-label="Testimonial">
      <div className="wrap grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-[72px] items-center">
        <Reveal>
          <div className="font-mono text-xs tracking-[0.12em] uppercase text-ink3 mb-[22px]">
            Northgate Skincare
          </div>
          <blockquote
            className="font-medium leading-[1.25] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(22px,2.6vw,33px)", textWrap: "balance" }}
          >
            &ldquo;A third of our COD orders were coming back undelivered. Rhythmiq calls before we
            ship, and our RTO rate dropped the week we switched it on. It paid for itself before
            the first invoice.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3.5">
            <span className="w-[46px] h-[46px] rounded-full bg-coral text-white flex-none grid place-items-center font-semibold text-[15px]">
              AK
            </span>
            <div>
              <b className="text-[15px] block">Ananya Kapoor</b>
              <span className="text-[13.5px] text-ink2">Head of Operations, Northgate Skincare</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <ExchangeArt className="aspect-[4/5] rounded-[14px]" />
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonial;

import Reveal from "./reveal";
import Placeholder from "./placeholder";

const Testimonial = () => {
  return (
    <section className="section" aria-label="Testimonial">
      <div className="wrap grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-[72px] items-center">
        <Reveal>
          <div className="font-mono text-xs tracking-[0.12em] uppercase text-ink3 mb-[22px]">
            Saltwater Hospitality Group
          </div>
          <blockquote
            className="font-medium leading-[1.25] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(22px,2.6vw,33px)", textWrap: "balance" }}
          >
            &ldquo;We were missing one in three calls at peak. Rhythmiq took that to zero — and our
            bookings went up the week we switched on. It pays for itself before the first service.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3.5">
            <span className="w-[46px] h-[46px] rounded-full bg-paper3 flex-none overflow-hidden ph" />
            <div>
              <b className="text-[15px] block">Mara Velez</b>
              <span className="text-[13.5px] text-ink2">Director of Operations, Saltwater</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <Placeholder tint="sand" tag="portrait" className="aspect-[4/5] rounded-[14px]" />
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonial;

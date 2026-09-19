import Reveal from "./reveal";
import { AnalyticsMockup } from "./mockups";

const SelfImproving = () => {
  return (
    <section className="section bg-paper3" aria-label="Self-improving">
      <div className="wrap">
        <Reveal className="mb-7">
          <AnalyticsMockup className="max-w-[880px] mx-auto w-full" />
        </Reveal>
        <Reveal className="max-w-[52ch]">
          <h3 className="h-feature mb-2.5">A system that gets sharper with every order</h3>
          <p className="text-ink2">
            Every call makes Rhythmiq better. It flags new objections, suggests answers for you to
            approve, and adapts to your busiest sale days. No engineering and no retraining.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default SelfImproving;

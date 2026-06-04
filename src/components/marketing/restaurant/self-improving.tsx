import Reveal from "./reveal";
import { AnalyticsUI } from "./visuals";

const SelfImproving = () => {
  return (
    <section className="section bg-paper3" aria-label="Self-improving">
      <div className="wrap">
        <Reveal className="frame frame-light p-6 mb-7">
          <AnalyticsUI className="aspect-[16/9] rounded-[10px]" />
        </Reveal>
        <Reveal className="max-w-[52ch]">
          <h3 className="h-feature mb-2.5">A system that gets sharper every shift</h3>
          <p className="text-ink2">
            Every call makes Rhythmiq better. It flags new questions, suggests answers for you to
            approve, and adapts to your busiest nights. No engineering and no retraining.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default SelfImproving;

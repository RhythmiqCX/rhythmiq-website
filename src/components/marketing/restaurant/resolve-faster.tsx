import Reveal from "./reveal";
import { CallComposerMockup } from "./mockups";

const ResolveFaster = () => {
  return (
    <section className="section" aria-label="Resolve faster">
      <div className="wrap">
        <Reveal className="mb-7">
          <span className="eyebrow">Answered in seconds</span>
          <h2 className="h-section mt-3.5 max-w-[18ch]">
            Answer every guest in seconds, day or night
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <CallComposerMockup className="max-w-[880px] mx-auto w-full" />
        </Reveal>
      </div>
    </section>
  );
};

export default ResolveFaster;

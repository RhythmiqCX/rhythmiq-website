import Reveal from "./reveal";
import Placeholder from "./placeholder";

const ResolveFaster = () => {
  return (
    <section className="section" aria-label="Resolve faster">
      <div className="wrap">
        <Reveal className="mb-7">
          <span className="eyebrow">Resolve calls faster</span>
          <h2 className="h-section mt-3.5 max-w-[18ch]">
            Answer every guest in seconds, day or night
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="frame frame-light p-6">
          <Placeholder
            tint="sky"
            tag="call composer + suggested answers screenshot"
            className="aspect-[16/9]"
          />
        </Reveal>
      </div>
    </section>
  );
};

export default ResolveFaster;

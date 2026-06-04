import Reveal from "./reveal";

const KPIS: { value: React.JSX.Element; label: string }[] = [
  { value: <span className="hl">0</span>, label: "Missed calls, ever" },
  {
    value: (
      <>
        &lt;1<span className="hl">s</span>
      </>
    ),
    label: "Average pickup time",
  },
  { value: <>24/7</>, label: "Always answering" },
  {
    value: (
      <>
        12<span className="hl">+</span>
      </>
    ),
    label: "Languages, one voice",
  },
];

const GuestIntelligence = () => {
  return (
    <section className="section bg-dark text-onDark" aria-label="Guest intelligence">
      <div className="wrap grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-[72px] items-center">
        <Reveal>
          <span className="eyebrow !text-onDark2">Live guest intelligence</span>
          <h2 className="h-section my-3.5 text-onDark">Know your guests before they walk in</h2>
          <p className="lede !text-onDark2">
            Rhythmiq remembers regulars, allergies, favorite tables, and last visit, so every call
            feels personal and every service runs smoother.
          </p>
        </Reveal>
        <Reveal delay={0.12} className="kpi-grid frame frame-light">
          {KPIS.map((kpi) => (
            <div className="kpi" key={kpi.label}>
              <div className="v">{kpi.value}</div>
              <div className="k">{kpi.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default GuestIntelligence;

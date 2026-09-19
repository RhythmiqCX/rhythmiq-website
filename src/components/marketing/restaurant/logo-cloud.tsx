const ROW_ONE = [
  { label: "Northgate", cls: "lg" },
  { label: "Maison Clair", cls: "lg serif" },
  { label: "VELAR/CO", cls: "lg mono" },
  { label: "Fable & Form", cls: "lg" },
  { label: "Qelora", cls: "lg serif" },
  { label: "DAISY LABS", cls: "lg mono" },
];

const ROW_TWO = [
  { label: "Botanical Co.", cls: "lg" },
  { label: "Synthesis", cls: "lg" },
  { label: "AKOR·GOODS", cls: "lg mono" },
  { label: "Le Petit Studio", cls: "lg serif" },
  { label: "Cluckin", cls: "lg" },
  { label: "SCENIC/WEAR", cls: "lg mono" },
];

const fadeMask = "[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]";

const LogoCloud = () => {
  return (
    <section className="section-tight overflow-hidden">
      <p className="text-center text-sm font-medium text-ink3 mb-8 wrap">
        Trusted by D2C brands making 4M+ recovery calls a year
      </p>
      <div className="flex flex-col gap-5">
        <div className={`overflow-hidden ${fadeMask}`}>
          {/* Each visible "half" must be wider than the viewport for the
              translateX(-50%) loop to be seamless, repeat the set 4×. */}
          <div className="marquee">
            {[...ROW_ONE, ...ROW_ONE, ...ROW_ONE, ...ROW_ONE].map((item, i) => (
              <span key={i} className={item.cls}>
                {item.label}
              </span>
            ))}
          </div>
        </div>
        <div className={`overflow-hidden ${fadeMask}`}>
          <div className="marquee marquee--rev">
            {[...ROW_TWO, ...ROW_TWO, ...ROW_TWO, ...ROW_TWO].map((item, i) => (
              <span key={i} className={item.cls}>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;

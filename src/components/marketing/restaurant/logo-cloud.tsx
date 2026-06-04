const ROW_ONE = [
  { label: "Saltwater", cls: "lg" },
  { label: "Maison Reine", cls: "lg serif" },
  { label: "NORTH/FORK", cls: "lg mono" },
  { label: "Olive & Ash", cls: "lg" },
  { label: "Rivolo", cls: "lg serif" },
  { label: "EMBER CO.", cls: "lg mono" },
];

const ROW_TWO = [
  { label: "Greenhouse", cls: "lg" },
  { label: "Tavola", cls: "lg" },
  { label: "HANA·HOUSE", cls: "lg mono" },
  { label: "Le Petit Marché", cls: "lg serif" },
  { label: "Brick Lane", cls: "lg" },
  { label: "SUNDAY/SET", cls: "lg mono" },
];

const fadeMask = "[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]";

const LogoCloud = () => {
  return (
    <section className="section-tight overflow-hidden">
      <p className="text-center text-sm font-medium text-ink3 mb-8 wrap">
        Trusted by hospitality teams pouring 4M+ guest calls a year
      </p>
      <div className="flex flex-col gap-5">
        <div className={`overflow-hidden ${fadeMask}`}>
          {/* Each visible "half" must be wider than the viewport for the
              translateX(-50%) loop to be seamless — repeat the set 4×. */}
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

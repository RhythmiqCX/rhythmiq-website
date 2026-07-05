import { DEV_MARQUEE_ITEMS } from "./constants";

const STYLE_CLASS: Record<string, string> = {
  heading: "font-heading font-semibold text-[26px] tracking-[-0.02em]",
  mono: "font-mono text-[21px] text-ink2",
  serif: "font-subheading italic text-[27px]",
};

const Track = () => (
  <div className="flex items-baseline gap-14 whitespace-nowrap">
    {DEV_MARQUEE_ITEMS.map((item, i) => (
      <span key={i} className="flex items-baseline gap-14">
        <span className={STYLE_CLASS[item.style]}>{item.text}</span>
        <span className="text-coral text-[22px]">·</span>
      </span>
    ))}
  </div>
);

/**
 * Capability marquee — infinite horizontal scroll (36s linear). The track is
 * duplicated so the -50% translate loops seamlessly. Uses the shared `marquee`
 * keyframe from globals.css.
 */
const DevMarquee = () => {
  return (
    <div
      aria-hidden
      className="overflow-hidden bg-paper"
      style={{
        paddingBlock: "22px",
        borderTop: "1px solid var(--line-soft)",
        borderBottom: "1px solid var(--line-soft)",
      }}
    >
      <div
        className="flex w-max gap-14"
        style={{ animation: "marquee 36s linear infinite" }}
      >
        <Track />
        <Track />
      </div>
    </div>
  );
};

export default DevMarquee;

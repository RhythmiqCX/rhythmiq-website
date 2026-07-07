import type { Prospect } from "@/lib/try/schema";
import { resolveServices } from "@/lib/try/load";

/**
 * Capability strip — an infinite marquee of the business's offerings with accent
 * dot separators. Reuses the shared `marquee` keyframe; the track is duplicated
 * so the -50% translate loops seamlessly.
 */
const TryMarquee = ({ data }: { data: Prospect }) => {
  const items = resolveServices(data).map((s) => s.title);
  if (items.length === 0) return null;

  const Track = () => (
    <div className="flex items-center gap-10 whitespace-nowrap pr-10">
      {items.map((text, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-heading text-[22px] font-semibold tracking-[-0.02em]" style={{ color: "var(--fg)" }}>
            {text}
          </span>
          <span className="text-[20px]" style={{ color: "var(--accent)" }}>
            ·
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className="overflow-hidden"
      style={{ paddingBlock: 20, background: "var(--bg2)", borderTop: "1px solid var(--line-soft)", borderBottom: "1px solid var(--line-soft)" }}
    >
      <div className="flex w-max" style={{ animation: "marquee 34s linear infinite" }}>
        <Track />
        <Track />
      </div>
    </div>
  );
};

export default TryMarquee;

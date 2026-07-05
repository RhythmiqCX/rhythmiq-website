import { LogoMark } from "@/components/marketing/restaurant/logo";
import { DEV_DOMAIN } from "./constants";

/**
 * Footer — dark. Brand lockup + dev.rhythmiqcx.com + legal line.
 */
const DevFooter = () => {
  return (
    <footer className="bg-dark text-onDark2" style={{ padding: "56px 0 36px" }}>
      <div className="wrap flex flex-col gap-9">
        <div className="flex flex-wrap items-center justify-between gap-[18px]">
          <span className="inline-flex items-center gap-2.5 font-sans font-bold text-[20px] tracking-[-0.03em] text-onDark">
            <LogoMark size={24} onDark />
            Rhythmiq
            <span
              className="font-mono text-[12px] tracking-[0.08em] pl-2.5 text-hlOnDark"
              style={{ borderLeft: "1px solid rgba(244,239,230,0.35)" }}
            >
              DEV
            </span>
          </span>
          <span className="font-mono text-[12px]">{DEV_DOMAIN}</span>
        </div>
        <div
          className="flex flex-wrap justify-between gap-3.5 pt-[22px] text-[13px]"
          style={{ borderTop: "1px solid var(--line-dark)" }}
        >
          <span>&copy; {new Date().getFullYear()} Rhythmiq, Inc.</span>
          <span>A studio by the team behind the AI phone host for restaurants.</span>
        </div>
      </div>
    </footer>
  );
};

export default DevFooter;

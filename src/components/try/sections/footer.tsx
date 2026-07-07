import type { Prospect } from "@/lib/try/schema";
import { monogram } from "@/lib/try/catalog";

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  website: "Website",
  x: "X",
};

/**
 * Footer — brand lockup, contact, socials, and a quiet "prototype by Rhythmiq"
 * credit that doubles as our attribution + a link back to the studio. This is a
 * prototype, so the credit is intentional (it's how the prospect learns who
 * built it).
 */
const TryFooter = ({ data }: { data: Prospect }) => {
  const socials = data.socials ? Object.entries(data.socials).filter(([, v]) => Boolean(v)) : [];

  return (
    <footer aria-label="Footer" style={{ background: "var(--bg2)", borderTop: "1px solid var(--line-soft)" }}>
      <div className="wrap flex flex-col gap-8 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-[8px] font-heading text-[13px] font-bold" style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>
              {monogram(data.business.name)}
            </span>
            <span className="font-heading text-[19px] font-bold tracking-[-0.02em]" style={{ color: "var(--fg)" }}>
              {data.business.name}
            </span>
          </div>
          <p className="mt-3 max-w-[38ch] text-[14px] leading-[1.55]" style={{ color: "var(--fg2)" }}>
            {data.business.oneLiner}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          {socials.length > 0 && (
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {socials.map(([key, url]) => (
                <a key={key} href={url as string} target="_blank" rel="noopener" className="text-[14px] font-medium no-underline hover:underline" style={{ color: "var(--fg2)" }}>
                  {SOCIAL_LABELS[key] ?? key}
                </a>
              ))}
            </div>
          )}
          {data.contact.phone && (
            <a href={`tel:${data.contact.phone.replace(/\s+/g, "")}`} className="font-mono text-[13px] no-underline" style={{ color: "var(--fg2)" }}>
              {data.contact.phone}
            </a>
          )}
        </div>
      </div>

      <div className="wrap flex flex-col gap-2 border-t py-6 text-[12.5px] sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--line-soft)", color: "var(--fg3)" }}>
        <span>© {data.business.name}</span>
        <a href="https://dev.rhythmiqcx.com" target="_blank" rel="noopener" className="font-mono no-underline hover:underline" style={{ color: "var(--fg3)" }}>
          Prototype crafted by Rhythmiq — let&apos;s build the real thing →
        </a>
      </div>
    </footer>
  );
};

export default TryFooter;

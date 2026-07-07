import type { Metadata } from "next";
import { generateMetadata as buildMetadata } from "@/utils";

export const metadata: Metadata = buildMetadata({
  title: "Rhythmiq — Preview",
  description: "Tailored website previews by the Rhythmiq studio.",
  noIndex: true,
  alternates: { canonical: "https://try.rhythmiqcx.com/" },
  openGraph: { images: [] },
});

/**
 * Bare-root landing for try.rhythmiqcx.com (no slug). Prototypes live at
 * /try/<slug>; this exists so the subdomain root doesn't 404. Intentionally
 * minimal + noindex.
 */
export default function TryIndex() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-paper px-6 text-center text-ink">
      <div className="max-w-[42ch]">
        <span className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink3">
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-coral" />
          Rhythmiq previews
        </span>
        <h1 className="h-section mt-5 font-heading">Nothing to see at this address.</h1>
        <p className="lede mt-4">
          Previews live at their own link. If someone from Rhythmiq sent you one, use the full
          address they shared.
        </p>
        <a
          href="https://dev.rhythmiqcx.com"
          className="btn btn-dark mt-8"
          target="_blank"
          rel="noopener"
        >
          Visit Rhythmiq Dev
          <span className="arrow">→</span>
        </a>
      </div>
    </main>
  );
}

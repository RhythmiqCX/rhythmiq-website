import { ImageResponse } from "next/og";
import { loadProspect, listSlugs } from "@/lib/try/load";
import { monogram, getVerticalMeta } from "@/lib/try/catalog";

// Node runtime so we can read the prospect JSON from the filesystem loader.
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Prototype site preview";

// Match the page's static params so the card is prerendered per slug.
export function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }));
}

// Black or white text that reads on top of the accent fill.
function accentInk(hex: string): string {
  const h = hex.replace("#", "");
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const L =
    0.2126 * lin(parseInt(h.slice(0, 2), 16)) +
    0.7152 * lin(parseInt(h.slice(2, 4), 16)) +
    0.0722 * lin(parseInt(h.slice(4, 6), 16));
  return L > 0.5 ? "#191814" : "#FFFFFF";
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = loadProspect(slug);

  const accent = data?.theme.accent ?? "#E8643C";
  const dark = data?.theme.scheme === "dark";
  const name = data?.business.name ?? "Rhythmiq";
  const tagline = data?.business.tagline ?? data?.business.oneLiner ?? "";
  const vertical = data ? getVerticalMeta(data.vertical).label : "Prototype";

  const bg = dark ? "#141210" : "#FAF8F3";
  const fg = dark ? "#F4EFE6" : "#191814";
  const fg2 = dark ? "#A89F90" : "#57534B";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 76,
          background: bg,
        }}
      >
        {/* top row: monogram + domain */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 74,
              height: 74,
              borderRadius: 18,
              background: accent,
              color: accentInk(accent),
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            {monogram(name)}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: fg2, letterSpacing: 1 }}>
            try.rhythmiqcx.com
          </div>
        </div>

        {/* main: name + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 10, width: 116, borderRadius: 6, background: accent, marginBottom: 34 }} />
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, color: fg, lineHeight: 1.02, letterSpacing: -2 }}>
            {name}
          </div>
          {tagline ? (
            <div style={{ display: "flex", fontSize: 34, color: fg2, marginTop: 24, maxWidth: 960, lineHeight: 1.3 }}>
              {tagline.length > 120 ? `${tagline.slice(0, 117)}…` : tagline}
            </div>
          ) : null}
        </div>

        {/* bottom row: vertical + credit */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", fontSize: 22, color: fg2 }}>
          <div style={{ display: "flex" }}>{vertical}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 6, background: accent }} />
            <div style={{ display: "flex" }}>Prototype by Rhythmiq</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

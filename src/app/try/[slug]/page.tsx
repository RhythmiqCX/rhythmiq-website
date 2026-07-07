import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateMetadata as buildMetadata } from "@/utils";
import { listSlugs, loadProspect } from "@/lib/try/load";
import { pickTemplate } from "@/components/try/registry";
import { buildThemeVars } from "@/components/try/theme";

// Only slugs with a committed data file exist; anything else 404s cleanly.
export const dynamicParams = false;

export function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = loadProspect(slug);
  if (!data) return buildMetadata({ title: "Prototype", noIndex: true });

  const meta = buildMetadata({
    title: data.business.name,
    description: data.business.tagline ?? data.business.oneLiner,
    // Prototypes must never be indexed by search engines.
    noIndex: true,
    alternates: { canonical: `https://try.rhythmiqcx.com/${slug}` },
    // Point OG + Twitter previews at this slug's generated card (served by the
    // sibling opengraph-image.tsx at this stable path). Explicit rather than
    // relying on file-convention auto-injection, which doesn't fire once
    // generateMetadata returns its own openGraph object.
    openGraph: { images: [`https://try.rhythmiqcx.com/${slug}/opengraph-image`] },
  });

  // This is the prospect's "own" site — use their name as the bare <title>,
  // `absolute` opts out of the root layout's "| Rhythmiq" template suffix.
  meta.title = { absolute: data.business.name };

  return meta;
}

export default async function TryProspectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = loadProspect(slug);
  if (!data) notFound();

  const Template = pickTemplate(data.vertical, data.variant);

  return (
    <main
      className="font-sans"
      style={{ ...buildThemeVars(data.theme), minHeight: "100svh", overflowX: "clip" }}
    >
      <Template data={data} />
    </main>
  );
}

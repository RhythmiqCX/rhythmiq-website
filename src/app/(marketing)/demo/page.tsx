import { Suspense } from "react";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import DemoFlow from "./DemoFlow";

export const metadata = genMeta({
  title: "Interactive Demo: See Voice AI Rescue a D2C Order",
  description:
    "Pick a real D2C scenario, tell us about your brand, and watch how Rhythmiq's voice AI would handle the call. Then create your account to try it live on your own number.",
  keywords: [
    "D2C voice AI demo",
    "NDR RTO call demo",
    "try voice AI ecommerce",
    "COD confirmation call demo",
  ],
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    images: ["/icons/og-default.png"],
    type: "website",
  },
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rhythmiqcx.com/" },
    { "@type": "ListItem", position: 2, name: "Demo", item: "https://rhythmiqcx.com/demo" },
  ],
};

export default function DemoPage() {
  return (
    <div className="min-h-screen w-full paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={breadcrumbSchema} />

      {/* Server-rendered hero (SEO content); the flow below is the only client island */}
      <section className="section pb-0 text-center" aria-label="Demo">
        <div className="wrap">
          <span className="eyebrow justify-center">Live demo</span>
          <h1 className="h-display mt-[18px] max-w-[16ch] mx-auto">
            See it rescue a real D2C order.
          </h1>
          <p className="lede mt-5 max-w-[52ch] mx-auto">
            Choose a scenario, add a few details about your brand, and watch how
            Rhythmiq would take the call. It only takes a minute.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <DemoFlow />
      </Suspense>
    </div>
  );
}

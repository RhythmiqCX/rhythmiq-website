import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import FinalCTA from "@/components/marketing/restaurant/final-cta";
import IntegrationsHero from "./IntegrationsHero";
import IntegrationGrid from "./IntegrationGrid";
import HowIntegrationsWork from "./HowIntegrationsWork";

export const metadata = genMeta({
  title: "Integrations: Shopify, OMS/WMS, CRM & More for D2C Brands",
  description:
    "Rhythmiq syncs two ways with your D2C stack, including Shopify, WooCommerce, OMS/WMS, CRM, payments, and messaging. Connect anything else with a REST API, webhooks, or Zapier.",
  keywords: [
    "D2C ecommerce voice AI integrations",
    "Shopify integration voice AI",
    "OMS WMS integration voice AI",
    "ecommerce CRM integration",
    "voice AI Zapier",
  ],
  alternates: {
    canonical: "/integrations",
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://rhythmiqcx.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Integrations",
      item: "https://rhythmiqcx.com/integrations",
    },
  ],
};

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen w-full paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={breadcrumbSchema} />
      <IntegrationsHero />
      <IntegrationGrid />
      <HowIntegrationsWork />
      <FinalCTA />
    </div>
  );
}

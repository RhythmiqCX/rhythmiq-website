import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import {
  Hero,
  ProductShowcase,
  LogoCloud,
  CompleteSolution,
  AIWorkspace,
  TwoUpCards,
  SelfImproving,
  WorldClassAgent,
  Testimonial,
  FullyFeatured,
  ResolveFaster,
  Omnichannel,
  GuestIntelligence,
  Integrations,
  FinalCTA,
} from "@/components/marketing/restaurant";

export const metadata = generateMetadata({
  title: "Rhythmiq: Voice AI That Rescues Failed Deliveries for D2C Brands",
  description:
    "Rhythmiq is voice AI for D2C brands. It calls customers to rescue failed deliveries, confirm COD orders, turn returns into exchanges, and recover abandoned carts, 24/7 in 12+ languages. Start free.",
  keywords: [
    "voice AI for D2C ecommerce",
    "reduce RTO with voice AI",
    "NDR reduction calling",
    "COD confirmation calls",
    "AI call for failed delivery",
    "returns to exchange voice AI",
    "reorder reminder calls",
    "abandoned cart call AI",
    "WISMO automation",
    "AI outbound calling ecommerce",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: ["/icons/og-default.png"],
    type: "website",
  },
});

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rhythmiq",
  url: "https://rhythmiqcx.com",
  description:
    "Voice AI for D2C brands that calls customers to rescue failed deliveries, confirm COD orders, turn returns into exchanges, and recover abandoned carts, 24/7 in 12+ languages.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://rhythmiqcx.com/blog?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const HomePage = () => {
  return (
    <div className="paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={websiteSchema} />
      <Hero />
      <ProductShowcase />
      <LogoCloud />
      <CompleteSolution />
      <AIWorkspace />
      <TwoUpCards />
      <SelfImproving />
      <WorldClassAgent />
      <Testimonial />
      <FullyFeatured />
      <ResolveFaster />
      <Omnichannel />
      <GuestIntelligence />
      <Integrations />
      <FinalCTA />
    </div>
  );
};

export default HomePage;

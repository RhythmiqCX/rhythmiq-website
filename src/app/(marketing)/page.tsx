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
  title: "Rhythmiq — The AI Phone Host for Restaurants | Never Miss a Call",
  description:
    "Rhythmiq is the AI phone host for restaurants — answering every call 24/7, booking tables, taking orders, and answering guest questions in 12+ languages. Start free.",
  keywords: [
    "AI phone host for restaurants",
    "restaurant phone answering service",
    "AI reservations",
    "restaurant voice AI",
    "AI host restaurant",
    "automated restaurant phone",
    "take restaurant orders by phone AI",
    "restaurant booking AI",
    "never miss a call restaurant",
    "AI maitre d",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: ["/icons/white.jpeg"],
    type: "website",
  },
});

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rhythmiq",
  url: "https://rhythmiqcx.com",
  description:
    "The AI phone host for restaurants — answers every call, books tables, takes orders, and answers guest questions, 24/7 in 12+ languages.",
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

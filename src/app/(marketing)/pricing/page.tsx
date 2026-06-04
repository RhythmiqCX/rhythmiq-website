import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import FinalCTA from "@/components/marketing/restaurant/final-cta";
import PricingComparison from "../voice-ai/PricingComparison";
import PricingHero from "./PricingHero";
import PricingTiers from "./PricingTiers";
import PricingFAQ from "./PricingFAQ";
import { PRICING_FAQS } from "@/constants/pricing-plans";

export const metadata = genMeta({
  title: "Pricing for Restaurants: Flat Monthly AI Phone Host",
  description:
    "Rhythmiq pricing starts at $29/mo, flat. No per minute fees. Answer every call, book every table, and take every order for one predictable price. See plans for single restaurants up to multi location groups.",
  keywords: [
    "AI phone host pricing",
    "restaurant voice AI pricing",
    "AI receptionist cost",
    "flat rate voice AI",
    "AI answering service pricing restaurants",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    images: ["/icons/og-default.png"],
    type: "website",
  },
});

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rhythmiq, AI Phone Host for Restaurants",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/pricing",
  description:
    "Rhythmiq is an AI phone host for restaurants that answers calls, books reservations, and takes orders 24/7. Flat monthly pricing from $29, with no per minute fees.",
  offers: {
    "@type": "Offer",
    price: "29",
    priceCurrency: "USD",
    priceValidUntil: "2027-01-01",
    description: "Flat monthly pricing, no per minute overages",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={offerSchema} />
      <JsonLd schema={faqSchema} />
      <PricingHero />
      <PricingTiers />
      <PricingComparison />
      <PricingFAQ />
      <FinalCTA />
    </div>
  );
}

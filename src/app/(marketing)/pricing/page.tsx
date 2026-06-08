import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import FinalCTA from "@/components/marketing/restaurant/final-cta";
import PricingComparison from "../voice-ai/PricingComparison";
import PricingHero from "./PricingHero";
import PricingTiers from "./PricingTiers";
import PricingFAQ from "./PricingFAQ";
import { PRICING_FAQS } from "@/constants/pricing-plans";

export const metadata = genMeta({
  title: "Pricing for Restaurants: AI Phone Host Plans",
  description:
    "Rhythmiq pricing starts at $149/mo. Answer every call, book every table, and take every order in 12+ languages. Pro adds full order taking and POS injection for $299/mo. Plans for single restaurants up to multi location groups, with no surprise overage bills.",
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
    "Rhythmiq is an AI phone host for restaurants that answers calls, books reservations, and takes orders 24/7 in 12+ languages. Plans from $149/mo, with no surprise overage bills.",
  offers: {
    "@type": "Offer",
    price: "149",
    priceCurrency: "USD",
    priceValidUntil: "2027-01-01",
    description: "Monthly plans from $149, no setup fees or surprise overage",
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

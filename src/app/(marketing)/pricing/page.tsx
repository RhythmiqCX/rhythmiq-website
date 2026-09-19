import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import FinalCTA from "@/components/marketing/restaurant/final-cta";
import PricingComparison from "../voice-ai/PricingComparison";
import PricingHero from "./PricingHero";
import PricingTiers from "./PricingTiers";
import PricingFAQ from "./PricingFAQ";
import { PRICING_FAQS } from "@/constants/pricing-plans";

export const metadata = genMeta({
  title: "Pricing for D2C Brands: Voice AI Plans",
  description:
    "Rhythmiq pricing starts at $149/mo. Rescue failed deliveries, confirm COD orders, and turn returns into exchanges in 12+ languages. Pro adds returns-to-exchange handling and full catalogue integration for $299/mo. Plans for single brands up to multi-warehouse groups, with no surprise overage bills.",
  keywords: [
    "voice AI pricing D2C",
    "NDR RTO reduction pricing",
    "COD confirmation call pricing",
    "flat rate voice AI",
    "AI outbound calling pricing ecommerce",
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
  name: "Rhythmiq, Voice AI for D2C Ecommerce",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/pricing",
  description:
    "Rhythmiq is voice AI for D2C brands that calls customers to rescue failed deliveries, confirm COD orders, and turn returns into exchanges, 24/7 in 12+ languages. Plans from $149/mo, with no surprise overage bills.",
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

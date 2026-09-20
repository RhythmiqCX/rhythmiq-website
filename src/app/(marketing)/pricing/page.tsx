import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import FinalCTA from "@/components/marketing/restaurant/final-cta";
import PricingComparison from "../voice-ai/PricingComparison";
import PricingHero from "./PricingHero";
import PricingTiers from "./PricingTiers";
import UsageCalculator from "./UsageCalculator";
import PricingFAQ from "./PricingFAQ";
import { PRICING_FAQS } from "@/constants/pricing-plans";

export const metadata = genMeta({
  title: "Pricing for D2C Brands: Voice AI Plans",
  description:
    "Rhythmiq pricing starts at $499/mo for 1,200 calls. Scale is $1,499/mo for 5,000 calls with returns-to-exchange handling and every language. Billed per call, not per minute, with usage-based Enterprise rates from $0.18 a call. Work out your number with the usage calculator.",
  keywords: [
    "voice AI pricing D2C",
    "NDR RTO reduction pricing",
    "COD confirmation call pricing",
    "usage based voice AI pricing",
    "enterprise voice AI pricing",
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
    "Rhythmiq is voice AI for D2C brands that calls customers to rescue failed deliveries, confirm COD orders, and turn returns into exchanges, 24/7 in 12+ languages. Plans from $499/mo, billed per call with published overage rates.",
  offers: {
    "@type": "Offer",
    price: "499",
    priceCurrency: "USD",
    priceValidUntil: "2027-01-01",
    description:
      "Monthly plans from $499 including 1,200 calls, billed per call with published overage rates and usage-based Enterprise pricing",
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
      <UsageCalculator />
      <PricingComparison />
      <PricingFAQ />
      <FinalCTA />
    </div>
  );
}

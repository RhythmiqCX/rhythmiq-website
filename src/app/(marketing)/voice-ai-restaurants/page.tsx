import RestaurantHero from "./components/RestaurantHero";
import AiCapabilities from "./components/AiCapabilities";
import RevenueCalculator from "./components/RevenueCalculator";
import CallSimulator from "./components/CallSimulator";
import NicheSolutions from "./components/NicheSolutions";
import IntegrationGrid from "./components/IntegrationGrid";
import RestaurantFAQ from "./components/RestaurantFAQ";
import RestaurantLinks from "./components/RestaurantLinks";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

export const metadata = genMeta({
  title: "AI Phone Answering & Voice AI for Restaurants | RhythmiqCX",
  description:
    "Deploy a conversational AI voice agent to answer restaurant phone bookings, process takeout orders, and answer FAQs 24/7. Syncs with Toast, Square, OpenTable, and Resy.",
  keywords: [
    "AI phone receptionist for restaurants",
    "restaurant voice AI assistant",
    "voice AI reservations",
    "automated phone ordering cafes",
    "missed call recovery restaurants",
    "after-hours restaurant phone answering",
    "Toast POS AI integration",
  ],
  alternates: {
    canonical: "/voice-ai-restaurants",
  },
  openGraph: {
    images: ["/icons/white.jpeg"],
    type: "website",
  },
});

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RhythmiqCX Restaurant Voice AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/voice-ai-restaurants",
  description:
    "An AI-powered phone receptionist and voice assistant for restaurants, cafes, and cloud kitchens. Syncs reservations and telephone orders directly to Toast, Square, OpenTable, and Resy 24/7.",
  offers: {
    "@type": "Offer",
    price: "29",
    priceCurrency: "USD",
    description: "Starts at $29/mo flat with no hidden per-minute overages.",
  },
  featureList: [
    "24/7 automated table reservations",
    "Takeout order phone handling",
    "Toast and Square POS menu syncing",
    "OpenTable and Resy reservation slot integration",
    "Loud kitchen background noise isolation",
    "Dietary restrictions and allergen tracking",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Rhythmiq handle loud kitchen and background dining noise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our AI voice receptionist utilizes advanced noise isolation filtering. It distinguishes clean speech from background kitchen noise and dining clatter, ensuring high accuracy.",
      },
    },
    {
      "@type": "Question",
      name: "Can it handle dietary modifications and allergen requests?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Rhythmiq handles specific menu modifications (e.g. gluten-free, no onions) and logs them as notes directly onto your POS kitchen tickets.",
      },
    },
  ],
};

export default function RestaurantVoiceAIPage() {
  return (
    <main className="min-h-screen w-full bg-[#0a0a0c] text-[#f8fafc] overflow-x-hidden">
      <JsonLd schema={softwareSchema} />
      <JsonLd schema={faqSchema} />

      {/* 1. Hero Section */}
      <RestaurantHero />

      

      {/* 3. What the AI Handles (Capabilities Matrix) */}
      <AiCapabilities />

      {/* 4. Live Call Simulator */}
      <CallSimulator />

      {/* 5. Revenue Leakage & ROI Calculator */}
      <RevenueCalculator />

      {/* 6. Target Audience Concept Tabs */}
      <NicheSolutions />

      {/* 7. Integration Grid */}
      <IntegrationGrid />

      {/* 8. Compare, Solutions & Resources Sections */}
      <RestaurantLinks />

      {/* 9. FAQ Section */}
      <RestaurantFAQ />

      {/* 9. Final CTA Block */}
      <section className="relative w-full py-14 md:py-16 bg-background overflow-hidden border-t border-slate-900/60">
        {/* Contained amber radial glow behind headline */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/[0.07] via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6 relative">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white tracking-tight leading-tight">
                Keep Your Kitchen Focused on Food
              </h2>
              <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Save your hosts and servers hours of phone time every week. Stop letting peak hours leak reservation revenue to competitors. Get started with Rhythmiq today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link href="/book-demo" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold py-6 px-8 rounded-xl shadow-lg shadow-amber-500/15 border-0 transition-all duration-300">
                  See Voice AI in Action
                </Button>
              </Link>
              
              <Link href="https://calendly.com/ray-rhythmiqcx/30min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-800 text-white hover:bg-slate-950/60 py-6 px-8 rounded-xl gap-2 bg-transparent transition-all duration-300">
                  <PhoneCall className="size-4" />
                  Book a Demo
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-slate-400 text-sm font-medium mt-6">
              <span className="flex items-center gap-1.5">
                <span className="text-sm text-slate-500">✓</span> Trusted by Restaurants
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-sm text-slate-500">✓</span> 24/7 AI Coverage
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-sm text-slate-500">✓</span> No Setup Fees
              </span>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

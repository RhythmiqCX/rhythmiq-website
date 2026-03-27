import React from "react";
import Hero from "./Hero";
import CallToAction from "./CallToAction";
import VoiceChatDemo from "./VoiceChatDemo";
import VoiceAIFeatures from "../../../components/marketing/VoiceAIFeatures";
import VoiceAIFAQ from "./VoiceAIFAQ";
import HowItWorks from "./HowItWorks";
import PricingComparison from "./PricingComparison";
import MarketsSection from "./MarketsSection";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";

export const metadata = genMeta({
  title: "AI Phone Receptionist & Voice AI Agents | RhythmiqCX — From $29/mo",
  description:
    "Deploy AI voice agents that answer customer calls 24/7 with human-like accuracy. No-code setup, 60+ languages, smart call routing — start free from $29/mo.",
  keywords: [
    "AI phone receptionist",
    "voice AI agents",
    "AI voice customer support",
    "AI answering service small business",
    "conversational voice AI",
    "no-code voice AI",
    "AI call routing",
    "replace IVR with AI",
    "AI receptionist India",
    "Indian English voice AI",
  ],
  alternates: {
    canonical: "/voice-ai",
  },
  openGraph: {
    images: ["/icons/white.jpeg"],
    type: "website",
  },
});

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RhythmiqCX Voice AI — AI Phone Receptionist",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/voice-ai",
  description:
    "RhythmiqCX Voice AI is a conversational AI phone receptionist platform that deploys human-like AI voice agents for 24/7 inbound and outbound call handling. Features voice cloning, neural TTS (Sarvam Bulbul v2), real-time synthesis, smart call routing, and no-code setup starting at $29/month.",
  offers: {
    "@type": "Offer",
    price: "29",
    priceCurrency: "USD",
    priceValidUntil: "2027-01-01",
    description: "Flat monthly pricing — no per-minute overages",
  },
  featureList: [
    "24/7 AI phone answering",
    "Voice cloning",
    "Neural TTS (Sarvam Bulbul v2)",
    "Indian-English support",
    "60+ language support",
    "Smart call routing",
    "No-code setup",
    "WhatsApp + Chat + Voice omnichannel",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does an AI phone receptionist cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX Voice AI starts at $29/month — flat rate with no per-minute overages. Competitors charge $0.07–$0.31/min or $99–$349/month. At $29/mo you get 24/7 AI call handling with voice, chat, and WhatsApp included.",
      },
    },
    {
      "@type": "Question",
      name: "How realistic does the AI phone receptionist sound?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX uses Sarvam Bulbul v2 neural TTS — one of the most advanced Indian-English voice models. Callers consistently describe the voice as natural and human-like. Voice cloning is available to match your brand persona.",
      },
    },
    {
      "@type": "Question",
      name: "What languages does Voice AI support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The default model is optimised for Indian-English with native accent support. The platform covers 60+ languages. Hindi, Tamil, Telugu, and SEA language voice personas are on the roadmap.",
      },
    },
    {
      "@type": "Question",
      name: "How long does AI receptionist setup take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most deployments go live within one business day. Configure your AI persona, connect your phone number, and upload your knowledge base. No coding required.",
      },
    },
    {
      "@type": "Question",
      name: "Can the AI handle complex customer queries?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The AI handles FAQs, bookings, and routine queries. Low-confidence calls automatically transfer to a live agent with the full transcript — customers never repeat themselves.",
      },
    },
  ],
};

const featuresObject = [
  {
    section1Subheading: "Always Available",
    section1Heading: "24/7 Instant Support",
    section1Content:
      "Our AI voice assistant responds instantly to customers anytime, handling queries without delays or human intervention.",
  },
  {
    section1Subheading: "Human-Like Interaction",
    section1Heading: "Natural Conversations",
    section1Content:
      "Deliver engaging, empathetic responses that make every interaction feel personal and human.",
  },
  {
    section1Subheading: "Effortless Handoff",
    section1Heading: "Smart Call Routing",
    section1Content:
      "Automatically route complex queries to human agents while your AI handles FAQs seamlessly.",
  },
];

const VoiceAIApp = () => {
  return (
    <div className="min-h-screen w-full">
      <JsonLd schema={softwareSchema} />
      <JsonLd schema={faqSchema} />

      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Definition paragraph for AEO / AI citation */}
      <section className="w-full max-w-3xl mx-auto px-6 py-8 text-center">
        <p className="text-gray-400 text-sm leading-relaxed">
          <strong className="text-white">RhythmiqCX Voice AI</strong> is a conversational AI phone receptionist platform that deploys human-like AI voice agents for 24/7 inbound and outbound call handling. Powered by Sarvam Bulbul v2 neural TTS and real-time speech-to-text, it routes calls intelligently, supports 60+ languages, and starts at <strong className="text-white">$29/month</strong> — no per-minute fees, no developer required.
        </p>
      </section>

      {/* How It Works */}
      <section>
        <HowItWorks />
      </section>

      {/* VoiceChatDemo + Features */}
      <section id="voice-demo" className="scroll-mt-16">
        <VoiceChatDemo />

        <VoiceAIFeatures
          section2={true}
          section1Content={featuresObject[0].section1Content}
          section1Heading={featuresObject[0].section1Heading}
          section1Subheading={featuresObject[0].section1Subheading}
          section2Content={featuresObject[1].section1Content}
          section2Heading={featuresObject[1].section1Heading}
          section2Subheading={featuresObject[1].section1Subheading}
          imageUrl1="images/mic_3.gif"
          imageUrl2="images/ai-voice-1.gif"
        />
        <VoiceAIFeatures
          section1Content={featuresObject[2].section1Content}
          section1Heading={featuresObject[2].section1Heading}
          section1Subheading={featuresObject[2].section1Subheading}
          imageUrl1="images/thirdimg1-unscreen.gif"
        />
      </section>

      {/* Markets */}
      <section>
        <MarketsSection />
      </section>

      {/* Pricing Comparison */}
      <section>
        <PricingComparison />
      </section>

      {/* FAQ */}
      <section>
        <VoiceAIFAQ />
      </section>

      {/* CTA */}
      <CallToAction />
    </div>
  );
};

export default VoiceAIApp;

import React from "react";
import Hero from "./Hero";
import CallToAction from "./CallToAction";
import VoiceChatDemo from "./VoiceChatDemo";
import VoiceAIFeatures from "../../../components/marketing/VoiceAIFeatures";
import VoiceAIFAQ from "./VoiceAIFAQ";
import HowItWorks from "./HowItWorks";
import PricingComparison from "./PricingComparison";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { AlwaysOnArt, ConversationArt, RoutingArt } from "@/components/marketing/voice-art";

export const metadata = genMeta({
  title: "Voice AI for D2C Ecommerce | RhythmiqCX from $499/mo",
  description:
    "Deploy AI voice agents that call D2C customers to rescue failed deliveries, confirm COD orders, and turn returns into exchanges, 24/7 with human-like accuracy. No-code setup, 12+ languages, plans from $499/mo.",
  keywords: [
    "voice AI for D2C ecommerce",
    "reduce RTO with voice AI",
    "NDR reduction calling",
    "COD confirmation calls",
    "conversational voice AI",
    "no-code voice AI",
    "returns to exchange voice AI",
    "abandoned cart call AI",
    "AI receptionist India",
    "Indian English voice AI",
  ],
  alternates: {
    canonical: "/voice-ai",
  },
  openGraph: {
    images: ["/icons/og-default.png"],
    type: "website",
  },
});

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RhythmiqCX Voice AI for D2C Ecommerce",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/voice-ai",
  description:
    "RhythmiqCX Voice AI is a conversational voice AI platform for D2C ecommerce that deploys human-like AI voice agents to rescue failed deliveries, confirm COD orders, turn returns into exchanges, and recover abandoned carts for 24/7 inbound and outbound call handling. Features voice cloning, neural TTS, real-time synthesis, and no-code setup. Plans from $499/month.",
  offers: {
    "@type": "Offer",
    price: "499",
    priceCurrency: "USD",
    priceValidUntil: "2027-01-01",
    description: "Monthly plans billed per call, with no per-minute meter",
  },
  featureList: [
    "24/7 outbound + inbound voice AI",
    "Failed-delivery rescue calls",
    "COD order confirmation",
    "Returns-to-exchange handling",
    "Abandoned cart recovery calls",
    "Voice cloning",
    "Neural TTS (Sarvam Bulbul v2)",
    "60+ language support",
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
      name: "How much does voice AI for D2C cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX plans start at $499/month, flat with no per-minute overages. Per-minute platforms charge $0.07–$0.31/min, which adds up fast at real call volume. With Rhythmiq you get 24/7 outbound and inbound call handling, returns-to-exchange handling, and 12+ languages included.",
      },
    },
    {
      "@type": "Question",
      name: "How realistic does the voice AI sound?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX uses Sarvam Bulbul v2 neural TTS one of the most advanced Indian-English voice models. Callers consistently describe the voice as natural and human-like. Voice cloning is available to match your brand persona.",
      },
    },
    {
      "@type": "Question",
      name: "Can it switch between Hindi and English mid-call?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The default model is optimised for Indian-English with native accent support, and the platform covers 60+ languages, including code-switching between English and Hindi, Arabic, or Spanish within the same call.",
      },
    },
    {
      "@type": "Question",
      name: "How long does voice AI setup take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most deployments go live within one business day. Configure your AI agent, connect your phone number, and upload your catalogue and return policy. No coding required.",
      },
    },
    {
      "@type": "Question",
      name: "Can the AI handle a customer's objection, not just a script?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The AI offers real alternatives like a size swap or store credit instead of reading a script. Low-confidence calls automatically transfer to a live agent with the full transcript, so customers never repeat themselves.",
      },
    },
  ],
};

const featuresObject = [
  {
    section1Subheading: "Always Calling",
    section1Heading: "24/7 Outbound & Inbound",
    section1Content:
      "Our voice AI agent calls customers the moment an order needs it, rescuing deliveries and confirming COD orders without delays or human intervention.",
  },
  {
    section1Subheading: "Human-Like Interaction",
    section1Heading: "Natural Conversations",
    section1Content:
      "Deliver engaging responses that handle a customer's objection with a real alternative, not a dead end.",
  },
  {
    section1Subheading: "Effortless Handoff",
    section1Heading: "Smart Call Routing",
    section1Content:
      "Automatically route complex queries to human agents while your AI handles the rest seamlessly.",
  },
];

const VoiceAIApp = () => {
  return (
    <div className="min-h-screen w-full paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={softwareSchema} />
      <JsonLd schema={faqSchema} />

      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Definition paragraph for AEO / AI citation */}
      <section className="w-full max-w-3xl mx-auto px-6 py-8 text-center">
        <p className="text-ink2 text-sm leading-relaxed">
          <strong className="text-ink">RhythmiqCX Voice AI</strong> is a
          conversational voice AI platform for D2C ecommerce that deploys
          human-like AI voice agents to rescue failed deliveries, confirm COD
          orders, and turn returns into exchanges, for 24/7 inbound and outbound
          call handling. Powered by Sarvam Bulbul v2 neural TTS and real-time
          speech-to-text, it supports 12+ languages, and starts at{" "}
          <strong className="text-ink">$499/month</strong>, with no per-minute
          fees and no developer required.
        </p>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="scroll-mt-16">
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
          art1={<AlwaysOnArt className="w-full h-full" />}
          art2={<ConversationArt className="w-full h-full" />}
        />
        <VoiceAIFeatures
          section1Content={featuresObject[2].section1Content}
          section1Heading={featuresObject[2].section1Heading}
          section1Subheading={featuresObject[2].section1Subheading}
          art1={<RoutingArt className="w-full h-full" />}
        />
      </section>

      {/* Pricing Comparison */}
      <section id="pricing" className="scroll-mt-16">
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

import React from "react";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { Check, X } from "lucide-react";

export const metadata = genMeta({
  title:
    "AI Receptionist for India 24/7 Indian-English Voice AI from ₹2,400/mo",
  description:
    "AI phone receptionist for Indian businesses. Native Indian-English voice (Sarvam Bulbul v2), WhatsApp + voice + chat, flat ₹2,400/month. No per-minute fees.",
  keywords: [
    "AI receptionist India",
    "AI voice generator India",
    "Indian English AI voice generator",
    "Sarvam AI voice",
    "AI phone answering India",
    "WhatsApp AI receptionist India",
    "AI receptionist Indian startups",
  ],
  alternates: { canonical: "/voice-ai/india" },
  openGraph: { type: "website" },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RhythmiqCX AI Receptionist for India",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/voice-ai/india",
  description:
    "AI phone receptionist for Indian businesses. Powered by Sarvam Bulbul v2 native Indian-English TTS. Flat ₹2,400/month — voice, WhatsApp, and chat on one platform.",
  offers: { "@type": "Offer", price: "29", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does an AI receptionist cost for Indian businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX AI Receptionist starts at $29/month (approximately ₹2,400/month). This is a flat rate — no per-minute call charges. Competitors like My AI Front Desk charge $99/month and don't support Indian-English.",
      },
    },
    {
      "@type": "Question",
      name: "Does the AI understand Indian-English accents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RhythmiqCX uses Sarvam Saarika v2.5 for speech recognition — trained specifically on Indian-English phonetics. It handles Indian accents far better than US-trained models like Google or Amazon Transcribe.",
      },
    },
    {
      "@type": "Question",
      name: "Does it support Hindi and regional Indian languages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The current AI voice model (Sarvam Bulbul v2) is optimised for Indian-English. Hindi, Tamil, and Telugu voice personas are on the roadmap. The platform's NLP layer supports 60+ languages.",
      },
    },
    {
      "@type": "Question",
      name: "Can Indian startups use this without a developer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RhythmiqCX is a no-code platform. Configure your AI persona, connect your phone number, and go live — most Indian startups are up and running within a day.",
      },
    },
    {
      "@type": "Question",
      name: "Does it integrate with WhatsApp for Indian businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RhythmiqCX is the only platform combining voice + WhatsApp + web chat in one plan. WhatsApp is the dominant business messaging channel in India, and our platform supports it natively.",
      },
    },
  ],
};

const competitors = [
  {
    name: "RhythmiqCX",
    price: "$29/mo (₹2,400)",
    indianEnglish: true,
    whatsapp: true,
    noCode: true,
    highlight: true,
  },
  {
    name: "My AI Front Desk",
    price: "$99/mo",
    indianEnglish: false,
    whatsapp: false,
    noCode: true,
    highlight: false,
  },
  {
    name: "Retell AI",
    price: "$0.07+/min",
    indianEnglish: false,
    whatsapp: false,
    noCode: false,
    highlight: false,
  },
  {
    name: "Bland AI",
    price: "$0.09+/min",
    indianEnglish: false,
    whatsapp: false,
    noCode: false,
    highlight: false,
  },
  {
    name: "ElevenLabs",
    price: "$22/mo",
    indianEnglish: false,
    whatsapp: false,
    noCode: true,
    highlight: false,
  },
];

export default function VoiceAIIndiaPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <JsonLd schema={schema} />
      <JsonLd schema={faqSchema} />

      {/* Hero */}
      <section className="w-full px-6 py-20 md:py-28 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400 mb-6">
          Made for India · Sarvam Bulbul v2
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          AI Receptionist for India —<br className="hidden md:block" /> 24/7
          Indian-English Voice AI
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          RhythmiqCX is the only AI phone receptionist built specifically for
          Indian businesses. Powered by Sarvam Bulbul v2 native Indian-English
          TTS that actually sounds right. Flat{" "}
          <strong className="text-white">₹2,400/month</strong>. No per-minute
          charges. Voice + WhatsApp + Chat in one platform.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400 mb-10">
          <span>✓ Native Indian-English accent</span>
          <span>✓ WhatsApp + Voice + Chat</span>
          <span>✓ No-code setup</span>
          <span>✓ ₹2,400/month flat</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/voice-ai#voice-demo"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
          >
            Try Live Demo
          </Link>
          <Link
            href="https://calendly.com/ray-rhythmiqcx/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-600 hover:border-orange-500 text-white px-8 py-3 rounded-lg transition-all"
          >
            Book a Demo
          </Link>
        </div>
      </section>

      {/* Why India needs this */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          Why Indian Businesses Choose RhythmiqCX
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Native Indian-English Voice",
              body: "Sarvam Bulbul v2 is the only neural TTS model built for Indian-English phonetics. American models (ElevenLabs, Google) sound unnatural for Indian callers.",
            },
            {
              title: "WhatsApp-First for India",
              body: "97% of Indian smartphone users use WhatsApp. RhythmiqCX combines voice + WhatsApp + web chat in one flat plan — no one else does this.",
            },
            {
              title: "₹2,400/mo vs ₹8,000+ Competitors",
              body: "My AI Front Desk charges $99/month ($99 ≈ ₹8,200). RhythmiqCX is $29/month (₹2,400). Same 24/7 AI calls. 3.4x cheaper.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-slate-700 bg-slate-900/40"
            >
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          RhythmiqCX vs. Competitors for India
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/60">
                <th className="text-left px-4 py-3 text-gray-300">Platform</th>
                <th className="text-center px-4 py-3 text-gray-300">Price</th>
                <th className="text-center px-4 py-3 text-gray-300">
                  Indian English
                </th>
                <th className="text-center px-4 py-3 text-gray-300">
                  WhatsApp
                </th>
                <th className="text-center px-4 py-3 text-gray-300">No-Code</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr
                  key={i}
                  className={`border-b border-slate-700/50 ${c.highlight ? "bg-orange-500/10 border-l-2 border-l-orange-500" : "bg-slate-900/30"}`}
                >
                  <td className="px-4 py-3 font-semibold text-white">
                    {c.highlight ? (
                      <span>
                        {c.name}{" "}
                        <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full ml-1">
                          Best for India
                        </span>
                      </span>
                    ) : (
                      c.name
                    )}
                  </td>
                  <td
                    className={`px-4 py-3 text-center ${c.highlight ? "text-orange-400 font-semibold" : "text-gray-300"}`}
                  >
                    {c.price}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.indianEnglish ? (
                      <Check className="w-4 h-4 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.whatsapp ? (
                      <Check className="w-4 h-4 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.noCode ? (
                      <Check className="w-4 h-4 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          FAQ — AI Receptionist for India
        </h2>
        <div className="space-y-4">
          {faqSchema.mainEntity.map((item, i) => (
            <div
              key={i}
              className="border border-slate-700 rounded-lg p-5 bg-slate-900/40"
            >
              <h3 className="text-white font-medium mb-2 text-sm">
                {item.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Deploy Your AI Receptionist?
        </h2>
        <p className="text-gray-400 mb-8 text-sm">
          Join Indian startups and SMBs using RhythmiqCX to handle every call
          24/7. Start from ₹2,400/month — no contracts, no per-minute fees.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/voice-ai"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
          >
            Explore Voice AI →
          </Link>
          <Link
            href="/tools/ai-indian-english-voice-generator"
            className="border border-slate-600 hover:border-orange-500 text-white px-8 py-3 rounded-lg transition-all"
          >
            Try Free Indian English Voice Generator
          </Link>
        </div>
      </section>
    </div>
  );
}

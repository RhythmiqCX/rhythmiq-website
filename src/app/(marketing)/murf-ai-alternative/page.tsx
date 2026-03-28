import React from "react";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { Check } from "lucide-react";

export const metadata = genMeta({
  title: "Best Murf AI Alternatives in 2026 — AI Voice for Business Calls",
  description:
    "Looking for a Murf AI alternative? RhythmiqCX goes beyond TTS it's a full AI phone receptionist with WhatsApp + call handling from $29/month. Compare now.",
  keywords: [
    "Murf AI alternative",
    "Murf AI alternatives 2026",
    "Murf AI vs RhythmiqCX",
    "best Murf alternative",
    "Murf AI alternative India",
    "Murf AI alternative free",
    "Murf AI competitor",
  ],
  alternates: { canonical: "/murf-ai-alternative" },
  openGraph: { type: "website" },
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best Murf AI alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For businesses needing voice AI for customer calls, RhythmiqCX is the best Murf AI alternative. It adds AI phone receptionist capabilities on top of TTS — handling live inbound calls, WhatsApp automation, and web chat at $29/month flat.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free Murf AI alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RhythmiqCX offers 5 free voice generator tools with no sign-up: Hindi, Indian English, Bahasa Indonesia, Tagalog, and Malay. Murf AI's free plan is limited to 10 minutes of audio per month.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best Murf AI alternative for India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX is the best Murf AI alternative for India. Murf AI uses American-trained voice models that sound unnatural in Indian English. RhythmiqCX uses Sarvam Bulbul v2 — built specifically for Indian-English phonetics. It also includes WhatsApp integration, which is critical for Indian business communication.",
      },
    },
  ],
};

const comparison = [
  {
    feature: "Primary use case",
    rhythmiq: "AI phone receptionist + TTS",
    murf: "TTS for presentations/videos",
  },
  {
    feature: "Price",
    rhythmiq: "$29/month flat",
    murf: "$29–$99/month (minute limits)",
  },
  {
    feature: "Inbound call handling",
    rhythmiq: "✓ Core feature",
    murf: "✗ Not available",
  },
  {
    feature: "WhatsApp integration",
    rhythmiq: "✓ Included",
    murf: "✗ Not available",
  },
  {
    feature: "Indian-English TTS",
    rhythmiq: "✓ Sarvam Bulbul v2 (native)",
    murf: "Limited — US-trained models",
  },
  {
    feature: "Free tools (no sign-up)",
    rhythmiq: "✓ 5 tools, no account needed",
    murf: "10 min/month free plan",
  },
  {
    feature: "No-code AI receptionist",
    rhythmiq: "✓ Deploy in a day",
    murf: "✗ TTS only",
  },
  {
    feature: "Voice cloning",
    rhythmiq: "✓ Brand persona cloning",
    murf: "✓ Available on paid plans",
  },
];

export default function MurfAIAlternativePage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <JsonLd schema={faqSchema} />

      <section className="w-full px-6 py-20 md:py-28 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-400 mb-6">
          Murf AI Alternative · 8,400 searches/month
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          Best Murf AI Alternatives in 2026 —<br className="hidden md:block" />{" "}
          For Business Voice AI
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
          Murf AI is a great TTS tool for videos and presentations — but
          it&apos;s not built for business phone calls. If you need AI that
          actually handles customer calls and WhatsApp, here&apos;s the complete
          breakdown.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/voice-ai"
            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold px-8 py-3 rounded-lg"
          >
            Try RhythmiqCX Voice AI
          </Link>
          <Link
            href="/tools/ai-indian-english-voice-generator"
            className="border border-slate-600 hover:border-pink-500 text-white px-8 py-3 rounded-lg"
          >
            Free Voice Generator (No Sign-up)
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-8">
        <div className="p-6 rounded-xl border border-pink-500/20 bg-pink-500/5">
          <h2 className="text-lg font-bold text-white mb-3">
            TL;DR — Murf AI vs. RhythmiqCX
          </h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <strong className="text-pink-400">
                For AI phone calls (inbound/outbound):
              </strong>{" "}
              RhythmiqCX — $29/month flat AI receptionist. Murf AI can&apos;t do
              this.
            </li>
            <li>
              <strong className="text-pink-400">For Indian-English TTS:</strong>{" "}
              RhythmiqCX (Sarvam Bulbul v2) sounds far more natural than
              Murf&apos;s US-trained models.
            </li>
            <li>
              <strong className="text-pink-400">
                For WhatsApp business automation:
              </strong>{" "}
              RhythmiqCX only — Murf AI has no messaging integrations.
            </li>
            <li>
              <strong className="text-pink-400">
                For presentation/video voiceover:
              </strong>{" "}
              Murf AI is still a strong choice for this specific use case.
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          RhythmiqCX vs. Murf AI: Full Comparison
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/60">
                <th className="text-left px-4 py-3 text-gray-300">Feature</th>
                <th className="text-center px-4 py-3 text-pink-400 font-semibold">
                  RhythmiqCX
                </th>
                <th className="text-center px-4 py-3 text-gray-300">Murf AI</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-700/50 bg-slate-900/30"
                >
                  <td className="px-4 py-3 text-gray-300 font-medium">
                    {row.feature}
                  </td>
                  <td className="px-4 py-3 text-center text-pink-300 font-medium">
                    {row.rhythmiq}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-400">
                    {row.murf}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-white text-center mb-6">
          Free Murf AI Alternatives (No Sign-up Required)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Indian English Voice",
              href: "/tools/ai-indian-english-voice-generator",
            },
            {
              label: "Hindi Voice Generator",
              href: "/tools/ai-hindi-voice-generator",
            },
            {
              label: "Bahasa Indonesia TTS",
              href: "/tools/ai-indonesian-voice-generator",
            },
            {
              label: "Tagalog Voice Generator",
              href: "/tools/ai-tagalog-voice-generator",
            },
          ].map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="p-4 rounded-xl border border-slate-700 bg-slate-900/40 hover:border-pink-500 transition-colors text-center"
            >
              <p className="text-white text-sm font-medium">{tool.label}</p>
              <p className="text-gray-500 text-xs mt-1">Free · No sign-up</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          FAQ — Murf AI Alternatives
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

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Beyond TTS — AI That Handles Real Customer Calls
        </h2>
        <p className="text-gray-400 mb-8 text-sm">
          Voice + WhatsApp + Chat. $29/month. Indian-English native. Deploy in a
          day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/voice-ai"
            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold px-10 py-3 rounded-lg inline-block"
          >
            Explore RhythmiqCX Voice AI →
          </Link>
          <Link
            href="/elevenlabs-alternative"
            className="border border-slate-600 hover:border-pink-500 text-white px-8 py-3 rounded-lg"
          >
            Also Compare: ElevenLabs vs. RhythmiqCX
          </Link>
        </div>
      </section>
    </div>
  );
}

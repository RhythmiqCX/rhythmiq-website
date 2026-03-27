import React from "react";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";

export const metadata = genMeta({
  title: "AI Answering Service for Southeast Asia — Voice AI for SEA Businesses",
  description:
    "No-code AI answering service for Southeast Asian SMBs. Supports Bahasa Indonesia, Tagalog, Malay, and English. $29/month flat — Indonesia, Philippines, Malaysia, Singapore.",
  keywords: [
    "AI answering service Southeast Asia",
    "no code AI voice bot Southeast Asia",
    "AI receptionist SME Southeast Asia",
    "Bahasa Indonesia AI voice",
    "AI receptionist Malaysia",
    "AI voice Philippines",
    "affordable AI voice generator Asia",
  ],
  alternates: { canonical: "/voice-ai/southeast-asia" },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RhythmiqCX AI Answering Service for Southeast Asia",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/voice-ai/southeast-asia",
  description:
    "AI answering service for Southeast Asian businesses. No-code voice AI supporting Bahasa Indonesia, Tagalog, Malay, and English. Flat $29/month.",
  offers: { "@type": "Offer", price: "29", priceCurrency: "USD" },
};

const markets = [
  { country: "Indonesia", flag: "🇮🇩", population: "270M", keyword: "Bahasa Indonesia AI voice generator", kd: 8, tool: "/tools/ai-indonesian-voice-generator", toolLabel: "Try Free Bahasa Indonesia Voice Generator" },
  { country: "Philippines", flag: "🇵🇭", population: "110M (100M+ Tagalog speakers)", keyword: "AI receptionist Philippines", kd: 12, tool: "/tools/ai-tagalog-voice-generator", toolLabel: "Try Free Tagalog Voice Generator" },
  { country: "Malaysia", flag: "🇲🇾", population: "33M", keyword: "AI text to speech Malay", kd: 8, tool: "/tools/ai-malay-text-to-speech", toolLabel: "Try Free Malay TTS" },
  { country: "Singapore", flag: "🇸🇬", population: "6M (premium tech market)", keyword: "AI receptionist Singapore", kd: 16, tool: "/voice-ai", toolLabel: "Explore Voice AI" },
];

export default function VoiceAISEAPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <JsonLd schema={schema} />

      <section className="w-full px-6 py-20 md:py-28 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-6">
          Southeast Asia · Indonesia · Philippines · Malaysia · Singapore
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          AI Answering Service for <br className="hidden md:block" />Southeast Asia
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          The only AI voice platform built for SEA&apos;s multilingual SMB market.
          Bahasa Indonesia, Tagalog, Malay, and English — all in one no-code platform.
          <strong className="text-white"> $29/month flat</strong>. No per-minute fees.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400 mb-10">
          <span>✓ Bahasa Indonesia support</span>
          <span>✓ Tagalog voice AI</span>
          <span>✓ Malay TTS</span>
          <span>✓ No-code setup</span>
          <span>✓ $29/month</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/voice-ai#voice-demo" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition-all">
            Try Live Demo
          </Link>
          <Link href="https://calendly.com/ray-rhythmiqcx/30min" target="_blank" rel="noopener noreferrer" className="border border-slate-600 hover:border-emerald-500 text-white px-8 py-3 rounded-lg transition-all">
            Book a Demo
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">Voice AI by SEA Market</h2>
        <p className="text-gray-400 text-center text-sm mb-10">
          Southeast Asia is 700M+ people across diverse languages. Western AI voice tools handle Asian accents poorly — RhythmiqCX is built differently.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {markets.map((m, i) => (
            <div key={i} className="p-6 rounded-xl border border-slate-700 bg-slate-900/40">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{m.flag}</span>
                <div>
                  <h3 className="font-semibold text-white">{m.country}</h3>
                  <p className="text-xs text-gray-400">{m.population} people</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Top keyword: <span className="text-gray-200 font-medium">&ldquo;{m.keyword}&rdquo;</span> — KD {m.kd} (very low competition)
              </p>
              <Link href={m.tool} className="text-emerald-400 text-sm hover:underline">
                {m.toolLabel} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-10">Why Western AI Voice Tools Fail in Southeast Asia</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Poor Asian Accent Recognition", body: "Models trained on US English struggle with Filipino, Indonesian, and Malaysian accents. RhythmiqCX is trained on Asian language phonetics." },
            { title: "No Local Language TTS", body: "ElevenLabs and Murf AI have no Bahasa Indonesia, Tagalog, or Malay TTS. RhythmiqCX supports these natively with dedicated voice models." },
            { title: "Overpriced for SEA Markets", body: "$99–$349/month pricing is designed for US budgets. At $29/month (≈ RM 130 / IDR 470K / PHP 1,600), RhythmiqCX is accessible to SEA SMBs." },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-xl border border-slate-700 bg-slate-900/40">
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Deploy Your SEA AI Receptionist Today</h2>
        <p className="text-gray-400 mb-8 text-sm">$29/month. No contracts. Multilingual. Deploy in a day.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <Link href="/voice-ai" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-8 py-3 rounded-lg">Explore Voice AI →</Link>
          <Link href="/tools/ai-indonesian-voice-generator" className="border border-slate-600 text-white px-8 py-3 rounded-lg hover:border-emerald-500">Free Indonesian Voice Tool</Link>
          <Link href="/tools/ai-tagalog-voice-generator" className="border border-slate-600 text-white px-8 py-3 rounded-lg hover:border-emerald-500">Free Tagalog Voice Tool</Link>
        </div>
      </section>
    </div>
  );
}

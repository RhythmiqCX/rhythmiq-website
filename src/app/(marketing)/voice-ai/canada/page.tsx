import React from "react";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { Check, X } from "lucide-react";

export const metadata = genMeta({
  title: "AI Receptionist Canada — Bilingual EN/FR Voice AI from $29/mo | RhythmiqCX",
  description:
    "Bilingual AI phone receptionist for Canadian businesses. English + French (Quebec) support. Flat $29 USD/month ($40 CAD). No per-minute fees. Deploy in a day.",
  keywords: [
    "AI receptionist Canada",
    "AI voice generator Canada",
    "bilingual AI voice generator",
    "réceptionniste IA Québec",
    "AI phone answering Canada",
    "French English AI receptionist",
    "small business answering service Canada",
  ],
  alternates: { canonical: "/voice-ai/canada" },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RhythmiqCX AI Receptionist for Canada — Bilingual EN/FR",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/voice-ai/canada",
  description:
    "Bilingual AI phone receptionist for Canadian businesses. English and French (Quebec) support. Flat $29 USD/month. No per-minute overages.",
  offers: { "@type": "Offer", price: "29", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does the AI receptionist support French and English for Canadian businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RhythmiqCX supports both English and French (including Quebec French). The AI can switch languages based on the caller's preference — essential for businesses in Quebec, Ontario, New Brunswick, and other bilingual markets.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an AI receptionist cost for Canadian small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX is $29 USD/month (~$40 CAD/month). A human virtual receptionist in Canada costs $250–$600 CAD/month. A full-time front desk employee costs $2,500–$4,000 CAD/month.",
      },
    },
    {
      "@type": "Question",
      name: "Can Quebec businesses use RhythmiqCX in French (Français)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The platform supports Quebec French for both STT (speech recognition) and TTS (text-to-speech). Configure your AI persona entirely in French — ideal for Quebec SMBs that need to comply with Bill 96 language requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What Canadian industries benefit most from AI receptionists?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Legal (lawyers, notaires), healthcare (clinics, GPs), contractors and trades, real estate agents, and restaurants. These industries share high call volume with frequent routine queries that AI handles well.",
      },
    },
  ],
};

const competitors = [
  { name: "RhythmiqCX", price: "$29 USD (~$40 CAD)", bilingual: true, frenchQc: true, noCode: true, highlight: true },
  { name: "My AI Front Desk", price: "$99 USD (~$135 CAD)", bilingual: false, frenchQc: false, noCode: true, highlight: false },
  { name: "Retell AI", price: "$0.07+/min", bilingual: false, frenchQc: false, noCode: false, highlight: false },
  { name: "Synthflow", price: "$99 USD (~$135 CAD)", bilingual: false, frenchQc: false, noCode: true, highlight: false },
];

export default function VoiceAICanadaPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <JsonLd schema={schema} />
      <JsonLd schema={faqSchema} />

      <section className="w-full px-6 py-20 md:py-28 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 mb-6">
          Canada · English + French · Bilingual AI
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          AI Receptionist for Canada —<br className="hidden md:block" /> Bilingual English &amp; French
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          The only AI phone receptionist built for Canada&apos;s bilingual market.
          English + French (including Quebec French) — no competitor offers this.
          <strong className="text-white"> $29 USD/month (~$40 CAD)</strong>. Flat pricing, no per-minute overages.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400 mb-10">
          <span>✓ English + French support</span>
          <span>✓ Quebec French (Québécois)</span>
          <span>✓ ~$40 CAD/month flat</span>
          <span>✓ No-code setup</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/voice-ai#voice-demo" className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold px-8 py-3 rounded-lg transition-all">
            Try Live Demo
          </Link>
          <Link href="https://calendly.com/ray-rhythmiqcx/30min" target="_blank" rel="noopener noreferrer" className="border border-slate-600 hover:border-red-500 text-white px-8 py-3 rounded-lg transition-all">
            Réserver une démo
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">Why Canadian Businesses Choose RhythmiqCX</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Only Bilingual AI Receptionist", body: "US competitors (Retell AI, My AI Front Desk, Bland AI) are English-only. Canada&apos;s bilingual market needs EN/FR — RhythmiqCX is the only platform that delivers this at under $50 CAD/month." },
            { title: "Quebec French Support", body: "Bill 96 in Quebec requires French-language service. RhythmiqCX handles Québécois French accurately — critical for Quebec businesses serving francophone customers." },
            { title: "$40 CAD vs. $135 CAD Competitors", body: "Synthflow and My AI Front Desk both cost $99 USD/month (~$135 CAD). RhythmiqCX is $29 USD/month (~$40 CAD). Same 24/7 AI coverage, 70% cheaper." },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-xl border border-slate-700 bg-slate-900/40">
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">RhythmiqCX vs. Competitors for Canada</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/60">
                <th className="text-left px-4 py-3 text-gray-300">Platform</th>
                <th className="text-center px-4 py-3 text-gray-300">Price (CAD)</th>
                <th className="text-center px-4 py-3 text-gray-300">Bilingual EN/FR</th>
                <th className="text-center px-4 py-3 text-gray-300">Quebec French</th>
                <th className="text-center px-4 py-3 text-gray-300">No-Code</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr key={i} className={`border-b border-slate-700/50 ${c.highlight ? "bg-red-500/10 border-l-2 border-l-red-500" : "bg-slate-900/30"}`}>
                  <td className="px-4 py-3 font-semibold text-white">
                    {c.highlight ? <span>{c.name} <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full ml-1">Best for Canada</span></span> : c.name}
                  </td>
                  <td className={`px-4 py-3 text-center ${c.highlight ? "text-red-400 font-semibold" : "text-gray-300"}`}>{c.price}</td>
                  <td className="px-4 py-3 text-center">{c.bilingual ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                  <td className="px-4 py-3 text-center">{c.frenchQc ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                  <td className="px-4 py-3 text-center">{c.noCode ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">FAQ — AI Receptionist Canada</h2>
        <div className="space-y-4">
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="border border-slate-700 rounded-lg p-5 bg-slate-900/40">
              <h3 className="text-white font-medium mb-2 text-sm">{item.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Canada&apos;s Only Bilingual AI Receptionist
        </h2>
        <p className="text-gray-400 mb-8 text-sm">~$40 CAD/month. No contracts. English + French. Deploy in a day.</p>
        <Link href="/voice-ai" className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold px-10 py-3 rounded-lg inline-block">
          Explore Voice AI for Canada →
        </Link>
      </section>
    </div>
  );
}

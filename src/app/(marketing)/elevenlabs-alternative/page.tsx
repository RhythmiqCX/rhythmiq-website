import React from "react";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { Check, X } from "lucide-react";

export const metadata = genMeta({
  title: "Best ElevenLabs Alternative in 2026 — AI Voice for Business Calls",
  description:
    "Looking for an ElevenLabs alternative for business phone calls? RhythmiqCX adds AI receptionist + WhatsApp + chat at $29/month flat — not per-character TTS pricing.",
  keywords: [
    "ElevenLabs alternative",
    "ElevenLabs alternative India",
    "best ElevenLabs alternative 2026",
    "ElevenLabs vs RhythmiqCX",
    "ElevenLabs alternative for business",
    "ElevenLabs alternative free",
    "cheaper ElevenLabs alternative",
  ],
  alternates: { canonical: "/elevenlabs-alternative" },
  openGraph: { type: "website" },
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best ElevenLabs alternative for business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For businesses that need voice AI for customer calls (not just TTS), RhythmiqCX is the leading ElevenLabs alternative. It includes AI phone receptionist, WhatsApp automation, and web chat — all for $29/month flat. ElevenLabs is pure TTS; it doesn't handle inbound calls or customer interactions.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free ElevenLabs alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX offers free voice generator tools (Indian English, Bahasa Indonesia, Tagalog, Malay, Hindi) with no sign-up required. For a full AI receptionist, plans start at $29/month. ElevenLabs' free plan is limited to 10,000 characters/month.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best ElevenLabs alternative for India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX is the best ElevenLabs alternative for India because it uses Sarvam Bulbul v2 — a neural TTS model trained on Indian-English phonetics. ElevenLabs is trained on American/British English and produces unnatural-sounding Indian English. RhythmiqCX also costs $29/month vs ElevenLabs at $22–$99/month for comparable usage.",
      },
    },
    {
      "@type": "Question",
      name: "How does RhythmiqCX differ from ElevenLabs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ElevenLabs is a TTS (text-to-speech) platform for generating voice audio files. RhythmiqCX is a full AI phone receptionist platform — it handles live inbound calls, routes complex queries to human agents, integrates with WhatsApp, and includes web chat. Different tools for different use cases.",
      },
    },
  ],
};

const comparison = [
  { feature: "Primary use case", rhythmiq: "AI phone receptionist + TTS", eleven: "TTS voice generation" },
  { feature: "Price", rhythmiq: "$29/month flat", eleven: "$22–$99/month (character limits)" },
  { feature: "Inbound call handling", rhythmiq: "✓ Core feature", eleven: "✗ Not available" },
  { feature: "WhatsApp integration", rhythmiq: "✓ Included", eleven: "✗ Not available" },
  { feature: "Indian-English TTS", rhythmiq: "✓ Sarvam Bulbul v2 (native)", eleven: "✗ American/British trained" },
  { feature: "Bahasa Indonesia voice", rhythmiq: "✓ Available", eleven: "Limited support" },
  { feature: "No-code setup", rhythmiq: "✓ Deploy in a day", eleven: "API-focused" },
  { feature: "Free tool available", rhythmiq: "✓ 5 free tools, no sign-up", eleven: "10K char/month free plan" },
  { feature: "Voice cloning", rhythmiq: "✓ Brand persona cloning", eleven: "✓ Advanced voice cloning" },
  { feature: "Smart call routing", rhythmiq: "✓ Auto-escalation to human", eleven: "✗ Not applicable" },
];

export default function ElevenLabsAlternativePage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <JsonLd schema={faqSchema} />

      <section className="w-full px-6 py-20 md:py-28 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400 mb-6">
          ElevenLabs Alternative · 22,000 searches/month
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          Best ElevenLabs Alternatives in 2026 —<br className="hidden md:block" /> For Business Voice AI
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
          ElevenLabs is a great TTS tool — but it&apos;s not an AI phone receptionist.
          If you need AI that actually <em>answers customer calls</em>, handles WhatsApp, and integrates with your CRM,
          here&apos;s what to use instead.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/voice-ai" className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg">
            Try RhythmiqCX Voice AI
          </Link>
          <Link href="/tools/ai-indian-english-voice-generator" className="border border-slate-600 hover:border-violet-500 text-white px-8 py-3 rounded-lg">
            Free Voice Generator (No Sign-up)
          </Link>
        </div>
      </section>

      {/* TL;DR */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <div className="p-6 rounded-xl border border-violet-500/20 bg-violet-500/5">
          <h2 className="text-lg font-bold text-white mb-3">TL;DR — ElevenLabs vs. Alternatives</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><strong className="text-violet-400">For AI phone calls (inbound/outbound):</strong> RhythmiqCX — $29/month, no-code AI receptionist with Indian-English support</li>
            <li><strong className="text-violet-400">For Indian-English TTS:</strong> RhythmiqCX (Sarvam Bulbul v2) — far better Indian accent than ElevenLabs</li>
            <li><strong className="text-violet-400">For free TTS (no sign-up):</strong> RhythmiqCX free tools — Hindi, Indian English, Bahasa Indonesia, Tagalog, Malay</li>
            <li><strong className="text-violet-400">For advanced voice cloning only:</strong> ElevenLabs is still strong for pure TTS use cases</li>
          </ul>
        </div>
      </section>

      {/* Comparison table */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">RhythmiqCX vs. ElevenLabs: Full Comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/60">
                <th className="text-left px-4 py-3 text-gray-300">Feature</th>
                <th className="text-center px-4 py-3 text-violet-400 font-semibold">RhythmiqCX</th>
                <th className="text-center px-4 py-3 text-gray-300">ElevenLabs</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} className="border-b border-slate-700/50 bg-slate-900/30">
                  <td className="px-4 py-3 text-gray-300 font-medium">{row.feature}</td>
                  <td className="px-4 py-3 text-center text-violet-300 font-medium">{row.rhythmiq}</td>
                  <td className="px-4 py-3 text-center text-gray-400">{row.eleven}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* When to use each */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">When to Use Each Tool</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-violet-500/30 bg-violet-500/5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">🎯</span> Use RhythmiqCX when you need:
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {["An AI that answers live customer phone calls", "WhatsApp + voice + chat in one platform", "Indian-English, Bahasa, Tagalog, or Malay TTS", "A no-code AI receptionist from $29/month", "Free voice generator tools (no sign-up)"].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-slate-700 bg-slate-900/40">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">🔊</span> Use ElevenLabs when you need:
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {["Advanced voice cloning for media production", "Audiobook narration", "Gaming / entertainment character voices", "High-fidelity American/British English TTS only"].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Free tools CTA */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-white text-center mb-6">Try These Free ElevenLabs Alternatives (No Sign-up)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Indian English Voice", href: "/tools/ai-indian-english-voice-generator", color: "orange" },
            { label: "Hindi Voice Generator", href: "/tools/ai-hindi-voice-generator", color: "indigo" },
            { label: "Bahasa Indonesia TTS", href: "/tools/ai-indonesian-voice-generator", color: "emerald" },
            { label: "Tagalog Voice Generator", href: "/tools/ai-tagalog-voice-generator", color: "blue" },
          ].map((tool, i) => (
            <Link key={i} href={tool.href} className="p-4 rounded-xl border border-slate-700 bg-slate-900/40 hover:border-violet-500 transition-colors text-center">
              <p className="text-white text-sm font-medium">{tool.label}</p>
              <p className="text-gray-500 text-xs mt-1">Free · No sign-up</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">FAQ — ElevenLabs Alternatives</h2>
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
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready for More Than Just TTS?</h2>
        <p className="text-gray-400 mb-8 text-sm">AI that answers calls. Handles WhatsApp. Works in Indian English. $29/month.</p>
        <Link href="/voice-ai" className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold px-10 py-3 rounded-lg inline-block">
          Explore RhythmiqCX Voice AI →
        </Link>
      </section>
    </div>
  );
}

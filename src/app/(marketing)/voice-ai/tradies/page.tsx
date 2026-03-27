import React from "react";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";

export const metadata = genMeta({
  title: "AI Receptionist for Tradies Australia — Never Miss a Job Quote Call Again",
  description:
    "AI phone receptionist for Australian tradies and sole traders. Answer every call 24/7 while you're on site. From $29/month. Plumbers, electricians, builders, HVAC.",
  keywords: [
    "AI receptionist for tradies Australia",
    "AI phone answering for tradies",
    "virtual receptionist sole trader Australia",
    "AI answering service Australia",
    "AI receptionist for plumbers",
    "AI receptionist for electricians",
  ],
  alternates: { canonical: "/voice-ai/tradies" },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RhythmiqCX AI Receptionist for Tradies",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/voice-ai/tradies",
  description:
    "AI phone receptionist for Australian tradies. Never miss a job quote call again. 24/7 AI call answering for plumbers, electricians, builders, and sole traders.",
  offers: { "@type": "Offer", price: "29", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does an AI receptionist help tradies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tradies constantly miss calls while on-site. Every missed call is a potential job quote lost. RhythmiqCX AI answers every call 24/7, captures the customer's name, number, job details, and preferred call-back time — then sends you a summary. You never lose a lead.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an AI answering service cost for sole traders in Australia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX starts at $29 USD/month (approximately $45 AUD/month). A human virtual receptionist in Australia typically costs $250–$500/month. AI gives you 24/7 coverage at a fraction of the cost with no sick days or holiday pay.",
      },
    },
    {
      "@type": "Question",
      name: "Does the AI understand Australian accents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RhythmiqCX uses advanced speech recognition that handles Australian English accents accurately. The AI understands tradie terminology, suburb names, and common job types like plumbing, electrical, HVAC, and construction.",
      },
    },
    {
      "@type": "Question",
      name: "Can I set it up without a developer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RhythmiqCX is a no-code platform. Most tradies are up and running in under a day — configure your AI persona, connect your number, and go live. No tech skills needed.",
      },
    },
  ],
};

const trades = [
  { emoji: "🔧", trade: "Plumbers", benefit: "Answer emergency calls at 2 AM without callout fees" },
  { emoji: "⚡", trade: "Electricians", benefit: "Capture job quotes while you're testing circuits" },
  { emoji: "🏗️", trade: "Builders", benefit: "Handle enquiries while you're on-site managing crew" },
  { emoji: "❄️", trade: "HVAC / Air Con", benefit: "Book service calls during peak summer demand" },
  { emoji: "🌿", trade: "Landscapers", benefit: "Take garden quote requests while mowing or planting" },
  { emoji: "🚗", trade: "Auto Mechanics", benefit: "Schedule bookings while you're under the car" },
];

export default function VoiceAITradiesPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <JsonLd schema={schema} />
      <JsonLd schema={faqSchema} />

      <section className="w-full px-6 py-20 md:py-28 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400 mb-6">
          Australia · Tradies &amp; Sole Traders
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          AI Receptionist for Tradies —<br className="hidden md:block" /> Never Miss a Job Quote Call Again
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          You&apos;re on-site. Phone rings. Another missed call, another job quote lost.
          RhythmiqCX AI Receptionist answers every call 24/7, captures job details, and sends you a summary.
          <strong className="text-white"> From $29/month</strong> (~$45 AUD). No contracts.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400 mb-10">
          <span>✓ 24/7 call answering</span>
          <span>✓ Captures job details</span>
          <span>✓ No-code setup</span>
          <span>✓ ~$45 AUD/month</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/voice-ai#voice-demo" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all">
            Try Live Demo
          </Link>
          <Link href="https://calendly.com/ray-rhythmiqcx/30min" target="_blank" rel="noopener noreferrer" className="border border-slate-600 hover:border-yellow-500 text-white px-8 py-3 rounded-lg transition-all">
            Book a Demo
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">Built for Every Trade</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {trades.map((t, i) => (
            <div key={i} className="p-5 rounded-xl border border-slate-700 bg-slate-900/40">
              <div className="text-2xl mb-2">{t.emoji}</div>
              <h3 className="font-semibold text-white text-sm mb-1">{t.trade}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{t.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-10">AI vs. Human Virtual Receptionist for Australian Tradies</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/60">
                <th className="text-left px-4 py-3 text-gray-300"></th>
                <th className="text-center px-4 py-3 text-yellow-400 font-semibold">RhythmiqCX AI</th>
                <th className="text-center px-4 py-3 text-gray-300">Human Receptionist</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Monthly cost", "~$45 AUD/month", "$250–$500 AUD/month"],
                ["Hours covered", "24/7 including nights & weekends", "Business hours only"],
                ["Sick days / holidays", "Never", "Yes"],
                ["Concurrent calls", "Unlimited", "One at a time"],
                ["Setup time", "1 day", "2–4 weeks"],
                ["Call transcript sent to you", "✓ Automatic", "Depends on service"],
              ].map(([feature, ai, human], i) => (
                <tr key={i} className="border-b border-slate-700/50">
                  <td className="px-4 py-3 text-gray-300 font-medium">{feature}</td>
                  <td className="px-4 py-3 text-center text-yellow-400 font-semibold">{ai}</td>
                  <td className="px-4 py-3 text-center text-gray-400">{human}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">FAQ — AI Receptionist for Tradies</h2>
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
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stop Losing Jobs to Missed Calls</h2>
        <p className="text-gray-400 mb-8 text-sm">~$45 AUD/month. No contracts. Go live in a day. Every call answered.</p>
        <Link href="/voice-ai" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold px-10 py-3 rounded-lg inline-block">
          Explore Voice AI for Tradies →
        </Link>
      </section>
    </div>
  );
}

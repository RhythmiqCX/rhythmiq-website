import React from "react";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { Check, X } from "lucide-react";

export const metadata = genMeta({
  title: "AI Receptionist for Philippines — 24/7 Voice AI for Philippine Businesses",
  description:
    "AI phone receptionist for Philippine businesses and BPO sector. English-first AI voice handles inbound calls 24/7. Replace tier-1 BPO agents at $29/month.",
  keywords: [
    "AI receptionist Philippines",
    "AI voice generator Philippines",
    "BPO AI voice automation Philippines",
    "call center AI Philippines",
    "AI voice for Tagalog",
    "Philippines AI answering service",
  ],
  alternates: { canonical: "/voice-ai/philippines" },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RhythmiqCX AI Receptionist for Philippines",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/voice-ai/philippines",
  description:
    "AI phone receptionist for Philippine businesses. English-first AI voice agent handles inbound calls 24/7. Ideal for BPO sector automation at $29/month.",
  offers: { "@type": "Offer", price: "29", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can an AI receptionist replace BPO tier-1 agents in the Philippines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes for routine queries. AI handles order status, FAQs, appointment scheduling, and account queries — the bulk of tier-1 BPO work. Complex escalations are routed to human agents with full transcripts. Philippine BPOs using AI typically reduce tier-1 headcount by 30–40%.",
      },
    },
    {
      "@type": "Question",
      name: "Does the AI support Tagalog or Filipino English?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The default model is optimised for General English (Philippine English is English-dominant). Tagalog TTS is on the roadmap. For free Tagalog voice generation, try our free AI Tagalog Voice Generator tool.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an AI phone receptionist cost compared to BPO agents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX costs $29/month flat. A single entry-level BPO agent in the Philippines costs $400–$600/month in salary alone. AI scales to 1,000+ concurrent calls at the same flat rate.",
      },
    },
  ],
};

export default function VoiceAIPhilippinesPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <JsonLd schema={schema} />
      <JsonLd schema={faqSchema} />

      <section className="w-full px-6 py-20 md:py-28 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 mb-6">
          Philippines · BPO Sector · English-First
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          AI Receptionist for Philippines —<br className="hidden md:block" /> Replace Tier-1 BPO Calls with AI
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          The Philippines BPO industry has 1.5 million+ agents. AI now handles 40% of tier-1 calls —
          order status, FAQs, appointment scheduling — at <strong className="text-white">$29/month flat</strong>.
          No per-minute fees. 24/7 coverage without overtime.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400 mb-10">
          <span>✓ English-first voice AI</span>
          <span>✓ 1,000+ concurrent calls</span>
          <span>✓ BPO tier-1 automation</span>
          <span>✓ $29/month flat</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/voice-ai#voice-demo" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-all">
            Try Live Demo
          </Link>
          <Link href="https://calendly.com/ray-rhythmiqcx/30min" target="_blank" rel="noopener noreferrer" className="border border-slate-600 hover:border-blue-500 text-white px-8 py-3 rounded-lg transition-all">
            Book a Demo
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">Why Philippine Businesses Choose AI Receptionists</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "BPO Cost Savings", body: "A single BPO agent costs $400–$600/month. RhythmiqCX is $29/month and handles 1,000+ concurrent calls. ROI is clear in the first week." },
            { title: "24/7 Without Overtime", body: "Philippine BPOs struggle with after-hours coverage. AI answers every call at 2 AM, on holidays, during typhoon season — without overtime pay." },
            { title: "English-First, Tagalog Coming", body: "Philippine English is world-class English. Our AI recognises Filipino accents accurately. Tagalog voice support is on the roadmap for 2026." },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-xl border border-slate-700 bg-slate-900/40">
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">FAQ — AI Receptionist Philippines</h2>
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
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Start Automating Philippine Call Handling</h2>
        <p className="text-gray-400 mb-8 text-sm">$29/month flat. No contracts. No per-minute fees. Deploy in a day.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/voice-ai" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-3 rounded-lg">Explore Voice AI →</Link>
          <Link href="/tools/ai-tagalog-voice-generator" className="border border-slate-600 hover:border-blue-500 text-white px-8 py-3 rounded-lg">Try Free Tagalog Voice Generator</Link>
        </div>
      </section>
    </div>
  );
}

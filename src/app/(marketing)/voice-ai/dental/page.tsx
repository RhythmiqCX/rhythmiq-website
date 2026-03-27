import React from "react";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";

export const metadata = genMeta({
  title: "AI Receptionist for Dental Offices — HIPAA-Aligned AI Phone Answering",
  description:
    "AI phone receptionist for dental practices. Handle appointment scheduling, rescheduling, and patient FAQs 24/7. HIPAA-aligned. From $29/month.",
  keywords: [
    "AI receptionist for dental office",
    "AI phone answering for dentists",
    "dental AI receptionist",
    "HIPAA compliant AI phone answering",
    "AI answering service dental practice",
    "automated dental appointment scheduling",
  ],
  alternates: { canonical: "/voice-ai/dental" },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RhythmiqCX AI Receptionist for Dental Offices",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/voice-ai/dental",
  description:
    "AI phone receptionist for dental practices. Handles appointment scheduling, patient FAQs, and after-hours calls. HIPAA-aligned. From $29/month.",
  offers: { "@type": "Offer", price: "29", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is an AI dental receptionist HIPAA compliant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX uses encryption in transit and at rest, in-region data storage options, and full audit logs for HIPAA-aligned compliance. Enterprise deployments can request a Business Associate Agreement (BAA). The AI does not store or transmit protected health information (PHI) beyond what is necessary for the call.",
      },
    },
    {
      "@type": "Question",
      name: "Can the AI schedule dental appointments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The AI can capture appointment requests, confirm existing appointments, handle rescheduling requests, and communicate available time slots — all via voice. It integrates with most practice management software via API.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an AI receptionist for a dental office cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX starts at $29/month. A human dental receptionist in the US costs $15–$22/hour ($2,400–$3,500/month full-time). AI handles after-hours, overflow, and routine queries at 1% of the cost.",
      },
    },
    {
      "@type": "Question",
      name: "What can the dental AI receptionist handle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New patient FAQs (insurance, location, services), appointment scheduling and rescheduling, appointment reminders (outbound calls), after-hours emergency escalation, and general office hour/location queries.",
      },
    },
  ],
};

export default function VoiceAIDentalPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <JsonLd schema={schema} />
      <JsonLd schema={faqSchema} />

      <section className="w-full px-6 py-20 md:py-28 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 mb-6">
          US Dental Practices · HIPAA-Aligned
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          AI Receptionist for Dental Offices —<br className="hidden md:block" /> 24/7 Patient Call Handling
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          Your front desk can&apos;t answer every call. RhythmiqCX AI handles appointment scheduling,
          rescheduling, patient FAQs, and after-hours calls — so you never lose a new patient enquiry.
          <strong className="text-white"> From $29/month</strong>. HIPAA-aligned.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400 mb-10">
          <span>✓ Appointment scheduling</span>
          <span>✓ After-hours coverage</span>
          <span>✓ HIPAA-aligned</span>
          <span>✓ $29/month flat</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/voice-ai#voice-demo" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all">
            Try Live Demo
          </Link>
          <Link href="https://calendly.com/ray-rhythmiqcx/30min" target="_blank" rel="noopener noreferrer" className="border border-slate-600 hover:border-cyan-500 text-white px-8 py-3 rounded-lg transition-all">
            Book a Demo
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">What the Dental AI Receptionist Handles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "New Patient FAQs", body: "Insurance accepted, office location, parking, services offered, new patient registration — answered instantly without hold queues." },
            { title: "Appointment Scheduling", body: "Captures patient name, contact, preferred time, and type of appointment. Syncs with your practice management software via API." },
            { title: "Rescheduling & Reminders", body: "Handles rescheduling requests and sends outbound reminder calls — reducing no-shows without staff time." },
            { title: "After-Hours Coverage", body: "Answers calls at nights and weekends. Urgent dental emergencies can be escalated to the on-call number with full transcript." },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-xl border border-slate-700 bg-slate-900/40">
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">AI Receptionist vs. Human Staff for Dental</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/60">
                <th className="text-left px-4 py-3 text-gray-300"></th>
                <th className="text-center px-4 py-3 text-cyan-400 font-semibold">RhythmiqCX AI</th>
                <th className="text-center px-4 py-3 text-gray-300">Human Front Desk</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Monthly cost", "$29/month", "$2,400–$3,500/month"],
                ["After-hours coverage", "24/7 included", "Not available"],
                ["Concurrent calls", "Unlimited", "One at a time"],
                ["Consistent script/tone", "Always", "Varies by day"],
                ["HIPAA-aligned", "✓ Encrypted + audit logs", "Depends on training"],
                ["Setup time", "1 day", "2–4 weeks onboarding"],
              ].map(([feature, ai, human], i) => (
                <tr key={i} className="border-b border-slate-700/50">
                  <td className="px-4 py-3 text-gray-300 font-medium">{feature}</td>
                  <td className="px-4 py-3 text-center text-cyan-400 font-semibold">{ai}</td>
                  <td className="px-4 py-3 text-center text-gray-400">{human}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">FAQ — AI Receptionist for Dental Offices</h2>
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
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Never Lose a New Patient to Voicemail Again</h2>
        <p className="text-gray-400 mb-8 text-sm">$29/month. HIPAA-aligned. Deploy in a day. No per-minute fees.</p>
        <Link href="/voice-ai" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-10 py-3 rounded-lg inline-block">
          Explore Dental AI Receptionist →
        </Link>
      </section>
    </div>
  );
}

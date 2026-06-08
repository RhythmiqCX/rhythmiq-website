"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib";

const faqs = [
  {
    q: "How realistic does the AI phone receptionist sound?",
    a: "RhythmiqCX uses Sarvam Bulbul v2 neural TTS one of the most advanced Indian-English voice models available. Callers consistently describe the voice as natural and human-like, with configurable pitch and pace. Voice cloning is also available to match your specific brand persona.",
  },
  {
    q: "What languages does Voice AI support?",
    a: "The default voice model (Sarvam Saarika + Bulbul) is optimised for Indian-English with native accent support. The platform covers 60+ languages at the text level. More regional voice personas (Hindi, Tamil, Telugu, and SEA languages) are actively on the roadmap.",
  },
  {
    q: "How much does an AI phone receptionist cost?",
    a: "RhythmiqCX plans start at $149/month, flat and predictable, with no per-minute overages. Per-minute platforms like Retell AI ($0.07+/min) and Bland ($0.09+/min) get unpredictable fast on a busy service. With Rhythmiq you know your bill before the month starts, and order taking plus 12+ languages are included.",
  },
  {
    q: "How long does setup take?",
    a: "Most deployments go live within a day. Configure your AI persona, connect your phone number or embed the widget, and upload your knowledge base. No coding required  our no-code setup works with most telephony providers and CRM stacks.",
  },
  {
    q: "Can the AI handle complex customer queries?",
    a: "Yes, up to a threshold. The AI is trained on your knowledge base for FAQs, booking, and routine queries. When confidence is low, it automatically transfers the caller to a live agent  with the full transcript  so the customer never needs to repeat themselves.",
  },
  {
    q: "Is call data secure and GDPR/HIPAA compliant?",
    a: "Yes. All calls are encrypted in transit and at rest. In-region data storage is available. Full audit logs are maintained for GDPR and HIPAA-aligned compliance. Enterprise deployments can request a DPA.",
  },
  {
    q: "Does it work with our existing phone system?",
    a: "Yes. A REST API connects to most telephony providers and IVR systems. No-code connectors are available for common platforms, and custom integrations typically take a few hours.",
  },
  {
    q: "What is the difference between RhythmiqCX and a traditional IVR?",
    a: "Traditional IVR forces callers through rigid press-1 menus. RhythmiqCX uses natural language understanding  callers simply speak their request in plain English (or Hindi, or 60+ other languages) and the AI responds conversationally. No menus, no frustration.",
  },
];

const VoiceAIFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <span className="eyebrow justify-center">FAQ</span>
        <h2 className="h-feature text-ink mt-3">
          Common Questions About AI Phone Receptionists
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-ink/10 rounded-lg overflow-hidden bg-white"
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left text-ink font-medium text-sm md:text-base hover:bg-paper2 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-ink2 flex-shrink-0 ml-4 transition-transform duration-200",
                  open === i && "rotate-180",
                )}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-ink2 text-sm leading-relaxed border-t border-ink/10 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default VoiceAIFAQ;

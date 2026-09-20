"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib";

const faqs = [
  {
    q: "How realistic does the voice AI sound?",
    a: "RhythmiqCX uses Sarvam Bulbul v2 neural TTS one of the most advanced Indian-English voice models available. Callers consistently describe the voice as natural and human-like, with configurable pitch and pace. Voice cloning is also available to match your specific brand persona.",
  },
  {
    q: "Can it handle a customer switching between Hindi and English mid-sentence?",
    a: "Yes. The default voice model (Sarvam Saarika + Bulbul) is optimised for Indian-English with native accent support, and the platform covers 60+ languages at the text level, including code-switching between English and Hindi, Arabic, or Spanish within the same call.",
  },
  {
    q: "How much does voice AI for D2C cost?",
    a: "RhythmiqCX starts at $499/month including 1,200 calls, and bills per completed call rather than per minute. Generic per-minute platforms get unpredictable fast once call volume grows, because a longer conversation costs you more. Past 20,000 calls a month we price on usage, from $0.18 a call. Returns-to-exchange handling and 12+ languages are included.",
  },
  {
    q: "How long does setup take?",
    a: "Most deployments go live within a day. Configure your AI agent, connect your store platform and phone number, and upload your catalogue and return policy. No coding required, our no-code setup works with most ecommerce stacks.",
  },
  {
    q: "Can the AI handle a customer's objection, not just a script?",
    a: "Yes, up to a threshold. The AI is trained on your catalogue and policies to offer real alternatives like a size swap or store credit. When confidence is low, it automatically transfers the caller to a live agent, with the full transcript, so the customer never needs to repeat themselves.",
  },
  {
    q: "Is call data secure and GDPR/HIPAA compliant?",
    a: "Yes. All calls are encrypted in transit and at rest. In-region data storage is available. Full audit logs are maintained for GDPR and HIPAA-aligned compliance. Enterprise deployments can request a DPA.",
  },
  {
    q: "Does it work with our existing store platform?",
    a: "Yes. A REST API connects to Shopify, WooCommerce, most OMS/WMS platforms, and CRM stacks. No-code connectors are available for common platforms, and custom integrations typically take a few hours.",
  },
  {
    q: "What is the difference between RhythmiqCX and a generic voice AI platform?",
    a: "Generic dev platforms give you a script that reads well until a customer says something unexpected. RhythmiqCX is trained on your catalogue and return policy, so it can actually offer a swap, confirm a COD order, or reschedule a delivery, in plain English, Hindi, or 60+ other languages. No dead ends, no forced handoff.",
  },
];

const VoiceAIFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <span className="eyebrow justify-center">FAQ</span>
        <h2 className="h-feature text-ink mt-3">
          Common Questions About Voice AI for D2C
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

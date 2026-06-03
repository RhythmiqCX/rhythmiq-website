"use client";

import React from "react";
import { CheckCircle2, HelpCircle } from "lucide-react";
import Container from "@/components/global/container";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const RestaurantFAQ = () => {
  const faqs: FAQItem[] = [
    {
      question: "How does Rhythmiq handle loud kitchen and background dining noise?",
      answer: "Our AI voice receptionist utilizes advanced noise isolation filtering and acoustic modeling. It easily isolates clean customer speech from background dining chatter, clanging plates, and kitchen noise, maintaining highly accurate transcription."
    },
    {
      question: "Can it handle dietary modifications and complex allergy requests?",
      answer: "Yes, Rhythmiq is trained on hospitality-specific scripts. For reservations, it proactively logs dietary restrictions. For food orders, it understands menu edits (e.g., 'no onions', 'gluten-free crust') and writes those alerts directly to POS tickets."
    },
    {
      question: "What happens if a reservation requires a credit card deposit or booking fee?",
      answer: "For reservations that require credit card holds (like Valentine's Day or tables for 8+), Rhythmiq books the tentative spot and immediately sends a secure Stripe payment link via SMS. Once the deposit is completed, the reservation confirms automatically."
    },
    {
      question: "How long does the POS and reservation system setup take?",
      answer: "Setup takes less than a day. In your Rhythmiq dashboard, you authenticate your Toast, Square, or OpenTable account, map your operating hours, and select which menu to sync. No coding or developer support is required."
    },
    {
      question: "What happens if a customer asks a question the AI receptionist cannot answer?",
      answer: "For highly custom requests (e.g., 'Can I book out the entire dining room for a filming session next Tuesday?'), Rhythmiq triggers a smart transfer. It rings your on-premise phone and feeds a summarized live transcript of the call to your manager's screen so they know the exact context."
    }
  ];

  return (
    <section className="relative w-full py-24 bg-background border-t border-slate-900/60">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Sticky Left Column for FAQ Headers */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900 text-slate-300 text-xs font-semibold uppercase tracking-wider">
              <HelpCircle className="size-3.5" />
              FAQ
            </div>
            
            <h2 className="text-3xl font-bold font-heading text-white leading-tight">
              Operations Questions, Answered
            </h2>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Everything restaurant owners and managers need to know about setting up Rhythmiq AI.
            </p>
            <div className="mt-10 space-y-6">
  <div className="flex items-center gap-3">
    <CheckCircle2 className="size-4 text-amber-500" />
    <span className="text-slate-300 text-sm">
      Setup in days, not months
    </span>
  </div>

  <div className="flex items-center gap-3">
    <CheckCircle2 className="size-4 text-amber-500" />
    <span className="text-slate-300 text-sm">
      Native POS & reservation integrations
    </span>
  </div>

  <div className="flex items-center gap-3">
    <CheckCircle2 className="size-4 text-amber-500" />
    <span className="text-slate-300 text-sm">
      Human handoff when needed
    </span>
  </div>
</div>
          </div>

          {/* Right Column: Premium Card-styled Accordion */}
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`item-${idx}`} 
                  className="border border-slate-800/60 bg-slate-950/30 hover:border-amber-500/20 data-[state=open]:border-amber-500/30
data-[state=open]:bg-slate-900/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/20 hover:shadow-[0_0_20px_rgba(245,158,11,0.02)] data-[state=open]:bg-slate-900/40 data-[state=open]:border-amber-500/35 data-[state=open]:shadow-[0_0_30px_rgba(245,158,11,0.04)]"
                >
                  <AccordionTrigger className="flex justify-between text-left text-base font-semibold text-slate-200 hover:text-amber-400 px-7 py-6 no-underline hover:no-underline transition-colors duration-200 [&[data-state=open]]:text-amber-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-400 leading-relaxed px-7 pb-6 pt-0 transition-all duration-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RestaurantFAQ;

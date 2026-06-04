"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib";
import { PRICING_FAQS } from "@/constants/pricing-plans";

const PricingFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16" aria-label="Pricing FAQ">
      <div className="text-center mb-10">
        <span className="eyebrow justify-center">FAQ</span>
        <h2 className="h-feature text-ink mt-3">Pricing questions, answered</h2>
      </div>

      <div className="space-y-3">
        {PRICING_FAQS.map((faq, i) => (
          <div
            key={faq.q}
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

export default PricingFAQ;

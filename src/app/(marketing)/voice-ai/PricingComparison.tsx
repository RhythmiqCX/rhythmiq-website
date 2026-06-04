import React from "react";
import { Check, X } from "lucide-react";
import Link from "next/link";

const competitors = [
  {
    name: "RhythmiqCX",
    price: "$29/mo",
    model: "Flat rate",
    noCode: true,
    whatsapp: true,
    indianEnglish: true,
    highlight: true,
  },
  {
    name: "Retell AI",
    price: "$0.07+/min",
    model: "Per-minute",
    noCode: false,
    whatsapp: false,
    indianEnglish: false,
    highlight: false,
  },
  {
    name: "Synthflow",
    price: "$99/mo",
    model: "Monthly (min)",
    noCode: true,
    whatsapp: false,
    indianEnglish: false,
    highlight: false,
  },
  {
    name: "My AI Front Desk",
    price: "$99/mo",
    model: "Monthly (interactions)",
    noCode: true,
    whatsapp: false,
    indianEnglish: false,
    highlight: false,
  },
  {
    name: "Bland AI",
    price: "$0.09+/min",
    model: "Per-minute",
    noCode: false,
    whatsapp: false,
    indianEnglish: false,
    highlight: false,
  },
  {
    name: "Ringly.io",
    price: "$349/mo",
    model: "Monthly",
    noCode: true,
    whatsapp: false,
    indianEnglish: false,
    highlight: false,
  },
];

const PricingComparison = () => {
  return (
    <section className="w-full py-16 px-4 bg-paper">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="eyebrow justify-center">Pricing</span>
          <h2 className="h-feature text-ink mt-3">
            $29/mo vs. $99 $349/mo Competitors
          </h2>
          <p className="text-ink2 mt-3 text-sm max-w-xl mx-auto">
            One flat price. No per-minute surprises. The only platform combining
            voice + chat + WhatsApp in one plan.
          </p>
        </div>

        <div
          className="overflow-x-auto rounded-[14px]"
          style={{ border: "1px solid var(--line)" }}
        >
          <table className="w-full text-sm bg-white">
            <thead>
              <tr className="bg-paper2 text-ink">
                <th className="text-left px-4 py-3 font-semibold">
                  Platform
                </th>
                <th className="text-center px-4 py-3 font-semibold">
                  Price
                </th>
                <th className="text-center px-4 py-3 font-semibold">
                  Pricing Model
                </th>
                <th className="text-center px-4 py-3 font-semibold">
                  No-Code
                </th>
                <th className="text-center px-4 py-3 font-semibold">
                  WhatsApp
                </th>
                <th className="text-center px-4 py-3 font-semibold">
                  Indian English
                </th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr
                  key={i}
                  className={`border-t ${c.highlight ? "bg-coral/5 border-l-2 border-l-coral" : ""}`}
                  style={{ borderTopColor: "var(--line-soft)" }}
                >
                  <td className="px-4 py-3 font-semibold text-ink">
                    {c.highlight ? (
                      <span className="flex items-center gap-2">
                        {c.name}
                        <span className="text-[10px] bg-coral/15 text-coral px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Best Value
                        </span>
                      </span>
                    ) : (
                      c.name
                    )}
                  </td>
                  <td
                    className={`px-4 py-3 text-center font-semibold ${c.highlight ? "text-coral" : "text-ink2"}`}
                  >
                    {c.price}
                  </td>
                  <td className="px-4 py-3 text-center text-ink2">
                    {c.model}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.noCode ? (
                      <Check className="w-4 h-4 text-[#1F7A4D] mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-[#C9461F] mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.whatsapp ? (
                      <Check className="w-4 h-4 text-[#1F7A4D] mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-[#C9461F] mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.indianEnglish ? (
                      <Check className="w-4 h-4 text-[#1F7A4D] mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-[#C9461F] mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 text-coral text-sm hover:underline"
          >
            Talk to us about pricing →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;

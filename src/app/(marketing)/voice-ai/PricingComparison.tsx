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
    <section className="w-full py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-cyan-400 uppercase tracking-widest mb-2">
            Pricing
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            $29/mo vs. $99 $349/mo Competitors
          </h2>
          <p className="text-gray-400 mt-3 text-sm max-w-xl mx-auto">
            One flat price. No per-minute surprises. The only platform combining
            voice + chat + WhatsApp in one plan.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/60">
                <th className="text-left px-4 py-3 text-gray-300 font-semibold">
                  Platform
                </th>
                <th className="text-center px-4 py-3 text-gray-300 font-semibold">
                  Price
                </th>
                <th className="text-center px-4 py-3 text-gray-300 font-semibold">
                  Pricing Model
                </th>
                <th className="text-center px-4 py-3 text-gray-300 font-semibold">
                  No-Code
                </th>
                <th className="text-center px-4 py-3 text-gray-300 font-semibold">
                  WhatsApp
                </th>
                <th className="text-center px-4 py-3 text-gray-300 font-semibold">
                  Indian English
                </th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr
                  key={i}
                  className={`border-b border-slate-700/50 ${
                    c.highlight
                      ? "bg-cyan-500/10 border-l-2 border-l-cyan-500"
                      : "bg-slate-900/30"
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-white">
                    {c.highlight ? (
                      <span className="flex items-center gap-2">
                        {c.name}
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Best Value
                        </span>
                      </span>
                    ) : (
                      c.name
                    )}
                  </td>
                  <td
                    className={`px-4 py-3 text-center font-semibold ${c.highlight ? "text-cyan-400" : "text-gray-300"}`}
                  >
                    {c.price}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-400">
                    {c.model}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.noCode ? (
                      <Check className="w-4 h-4 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.whatsapp ? (
                      <Check className="w-4 h-4 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.indianEnglish ? (
                      <Check className="w-4 h-4 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/ai-chatbot-pricing"
            className="inline-flex items-center gap-2 text-cyan-400 text-sm hover:underline"
          >
            See full pricing breakdown →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;

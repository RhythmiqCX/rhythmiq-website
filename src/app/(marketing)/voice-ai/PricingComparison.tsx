import React from "react";
import { Check, X } from "lucide-react";
import Link from "next/link";

// Restaurant voice-AI comparison. Claims are sourced from competitor pricing
// pages and reviews: Slang.ai is reservation/info focused (no in-call orders)
// and charges +$99/mo for Spanish; Loman uses minute caps with overage; pure
// dev platforms bill per minute. Rhythmiq includes orders + 12+ languages.
const competitors = [
  {
    name: "RhythmiqCX",
    price: "From $149/mo",
    model: "Simple plan",
    orders: true,
    languages: true,
    noSurprise: true,
    highlight: true,
  },
  {
    name: "Slang.ai",
    price: "$399–599/mo",
    model: "Per location",
    orders: false,
    languages: false,
    noSurprise: true,
    highlight: false,
  },
  {
    name: "Loman",
    price: "$199–529/mo",
    model: "Monthly + minute caps",
    orders: true,
    languages: false,
    noSurprise: false,
    highlight: false,
  },
  {
    name: "Retell / Bland",
    price: "$0.07–0.09+/min",
    model: "Per-minute",
    orders: true,
    languages: true,
    noSurprise: false,
    highlight: false,
  },
];

const PricingComparison = () => {
  return (
    <section className="w-full py-16 px-4 bg-paper">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="eyebrow justify-center">How we compare</span>
          <h2 className="h-feature text-ink mt-3">
            More than Slang and Loman, for less.
          </h2>
          <p className="text-ink2 mt-3 text-sm max-w-xl mx-auto">
            Takes the whole order, speaks 12+ languages out of the box, and never
            sends a surprise overage bill.
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
                  Takes orders
                </th>
                <th className="text-center px-4 py-3 font-semibold">
                  Languages included
                </th>
                <th className="text-center px-4 py-3 font-semibold">
                  No surprise bill
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
                    {c.orders ? (
                      <Check className="w-4 h-4 text-[#1F7A4D] mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-[#C9461F] mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.languages ? (
                      <Check className="w-4 h-4 text-[#1F7A4D] mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-[#C9461F] mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.noSurprise ? (
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

        <p className="text-center text-[12px] text-ink3 mt-3">
          Comparison based on competitors' published pricing and features. Slang.ai
          charges +$99/mo for Spanish and redirects order callers online; Loman
          applies minute caps with overage.
        </p>

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

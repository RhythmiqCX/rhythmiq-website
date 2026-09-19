import React from "react";
import { Check, X } from "lucide-react";
import Link from "next/link";

// D2C voice-AI comparison against the two real alternatives brands are
// actually choosing between today: doing it manually with an ops team, or
// building on a generic per-minute dev platform (Vapi/Retell/Bland-style).
// No named-competitor pricing is claimed here; see the *-alternative pages
// for platform-specific comparisons.
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
    name: "Manual calling team",
    price: "Salary + attrition",
    model: "Fixed headcount",
    orders: true,
    languages: false,
    noSurprise: false,
    highlight: false,
  },
  {
    name: "Generic dev voice platforms",
    price: "$0.07–0.09+/min",
    model: "Per-minute",
    orders: false,
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
            More than a manual team, for less than per-minute AI.
          </h2>
          <p className="text-ink2 mt-3 text-sm max-w-xl mx-auto">
            Handles objections instead of reading a script, speaks 12+ languages out
            of the box, and never sends a surprise overage bill.
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
                  Handles objections
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
          A manual calling team costs a fixed salary whether call volume is high or
          low. Generic dev voice platforms bill per minute and read a script, so a
          customer&rsquo;s objection or a &ldquo;but&rdquo; tends to break the flow.
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

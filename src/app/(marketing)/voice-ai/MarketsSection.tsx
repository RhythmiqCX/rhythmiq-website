import React from "react";
import Link from "next/link";

const markets = [
  { flag: "🇮🇳", label: "India", sub: "Indian-English · ₹2,400/mo", href: "/voice-ai/india" },
  { flag: "🇵🇭", label: "Philippines", sub: "English-first · BPO sector", href: "/voice-ai/philippines" },
  { flag: "🌏", label: "Southeast Asia", sub: "Bahasa · Tagalog · Malay", href: "/voice-ai/southeast-asia" },
  { flag: "🇦🇺", label: "Australia — Tradies", sub: "Never miss a job quote", href: "/voice-ai/tradies" },
  { flag: "🇺🇸", label: "Dental Offices", sub: "HIPAA-aligned · US market", href: "/voice-ai/dental" },
  { flag: "🇨🇦", label: "Canada", sub: "Bilingual EN/FR · Quebec", href: "/voice-ai/canada" },
];

const MarketsSection = () => {
  return (
    <section className="w-full py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-cyan-400 uppercase tracking-widest mb-2">
            Global Markets
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Voice AI Built for Your Market
          </h2>
          <p className="text-gray-400 mt-2 text-sm max-w-xl mx-auto">
            Native language support, local pricing, and industry-specific configurations for every region.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {markets.map((m, i) => (
            <Link
              key={i}
              href={m.href}
              className="flex items-start gap-3 p-4 rounded-xl border border-slate-700 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{m.flag}</span>
              <div>
                <p className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                  {m.label}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{m.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketsSection;

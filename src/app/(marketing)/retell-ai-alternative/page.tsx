import React from "react";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { BOOK_DEMO_URL } from "@/constants/links";

export const metadata = generateMetadata({
  title: "Retell AI Alternative  RhythmiqCX Voice AI | From $29/mo Flat",
  description:
    "Looking for a Retell AI alternative? RhythmiqCX gives you AI phone receptionist, voice cloning, and 60+ languages at a flat $29/mo  no per-minute billing surprises.",
  keywords: [
    "Retell AI alternative",
    "Retell AI competitor",
    "RhythmiqCX vs Retell AI",
    "AI voice agent alternative",
    "flat rate voice AI",
    "no per-minute voice AI",
    "AI phone receptionist Retell",
  ],
  alternates: {
    canonical: "/retell-ai-alternative",
  },
  openGraph: {
    images: ["/icons/og-default.png"],
    type: "website",
  },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Retell AI Alternative: RhythmiqCX Voice AI Comparison",
  description:
    "Side-by-side comparison of RhythmiqCX and Retell AI covering pricing, features, ease of setup, and omnichannel support.",
  url: "https://rhythmiqcx.com/retell-ai-alternative",
  author: { "@type": "Organization", name: "RhythmiqCX" },
  publisher: {
    "@type": "Organization",
    name: "RhythmiqCX",
    logo: {
      "@type": "ImageObject",
      url: "https://rhythmiqcx.com/icons/rhythmiq-mark-512.png",
    },
  },
};

const Pos = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 text-[#1F7A4D]">
    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
    <span className="text-ink2">{children}</span>
  </div>
);

const Neg = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 text-[#C9461F]">
    <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
    <span className="text-ink2">{children}</span>
  </div>
);

const ROWS: [string, React.ReactNode, React.ReactNode][] = [
  [
    "Pricing Model",
    <Neg key="r">$0.07+/min  costs scale unpredictably with call volume. 500 calls × 3 min = $105+/mo minimum.</Neg>,
    <Pos key="rx"><strong className="text-ink">Flat $29/mo</strong>  no per-minute overages, no billing surprises. Predictable cost at any volume.</Pos>,
  ],
  [
    "Setup & No-Code",
    <Neg key="r">Developer-only. Requires API integration, custom telephony setup, and engineering time.</Neg>,
    <Pos key="rx"><strong className="text-ink">No-code setup.</strong> Configure AI persona, connect phone number, go live  all within one business day.</Pos>,
  ],
  [
    "Omnichannel (Voice + Chat + WhatsApp)",
    <Neg key="r">Voice only. No native web chat or WhatsApp channel.</Neg>,
    <Pos key="rx"><strong className="text-ink">Full omnichannel.</strong> Voice AI + web chat widget + WhatsApp AI on one unified platform.</Pos>,
  ],
  [
    "Indian-English & Regional Languages",
    <Neg key="r">No native Indian-English optimisation. Limited regional language voice support.</Neg>,
    <Pos key="rx"><strong className="text-ink">Built for Indian-English.</strong> Sarvam Bulbul v2 TTS + Saarika v2.5 STT. 60+ languages total.</Pos>,
  ],
  [
    "Smart Call Routing",
    <Neg key="r">Requires custom development to implement escalation logic.</Neg>,
    <Pos key="rx"><strong className="text-ink">Built-in smart routing.</strong> Low-confidence calls auto-transfer to a live agent with full transcript.</Pos>,
  ],
  [
    "Voice Cloning",
    <Neg key="r">Available but requires API-level configuration.</Neg>,
    <Pos key="rx"><strong className="text-ink">Voice cloning included.</strong> Train on a real voice sample  no coding needed.</Pos>,
  ],
  [
    "Concurrent Call Capacity",
    <Neg key="r">Scales with usage  but costs escalate proportionally per minute.</Neg>,
    <Pos key="rx"><strong className="text-ink">1,000+ concurrent calls</strong>  GPU-accelerated, flat cost regardless of volume.</Pos>,
  ],
  [
    "Support",
    <Neg key="r">Developer-focused documentation. Support primarily via Discord and docs.</Neg>,
    <Pos key="rx"><strong className="text-ink">24×7 support</strong> via email, phone, and ticketing on all plans.</Pos>,
  ],
];

export default function RetellAlternative() {
  return (
    <div className="paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={schema} />

      {/* Hero */}
      <section className="section-tight text-center">
        <div className="wrap max-w-4xl">
          <span className="eyebrow justify-center">Comparison · Retell AI</span>
          <h1 className="h-section mt-4">Retell AI Alternative  Why Teams Choose RhythmiqCX</h1>
          <p className="lede mx-auto max-w-2xl mt-4">
            Flat $29/mo vs unpredictable per-minute billing. No developer required.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={BOOK_DEMO_URL} className="btn btn-accent">Book a free demo</Link>
            <Link href="/voice-ai" className="btn btn-ghost">Explore Voice AI <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <div className="wrap max-w-5xl pb-4 space-y-14">
        <section id="intro" className="text-center">
          <h2 className="h-feature mb-3">The core problem with Retell AI</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Retell AI is a capable voice AI platform  but it charges $0.07+ per minute, which adds up fast.
            A business handling 500 calls/month averaging 3 minutes each pays $105+ before any platform fees,
            and that cost scales unpredictably with volume. On top of that, Retell requires developer integration:
            there's no no-code setup, no built-in WhatsApp or web chat channel, and no omnichannel dashboard.
            RhythmiqCX was built for teams who want voice AI that just works  flat monthly pricing, no-code setup
            in under a day, and voice + chat + WhatsApp on one platform starting at $29/month.
          </p>
        </section>

        <section id="table">
          <h2 className="h-feature text-center mb-6">Feature comparison</h2>
          <div className="overflow-x-auto rounded-[14px]" style={{ border: "1px solid var(--line)" }}>
            <table className="w-full table-auto border-collapse text-sm bg-white">
              <thead>
                <tr className="bg-paper2 text-ink">
                  <th className="p-3 text-left font-semibold">Capability</th>
                  <th className="p-3 text-left font-semibold">Retell AI</th>
                  <th className="p-3 text-left font-semibold">RhythmiqCX</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([cap, retell, rhythm], i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "var(--line-soft)" }}>
                    <td className="p-3 text-ink font-medium align-top">{cap}</td>
                    <td className="p-3 align-top">{retell}</td>
                    <td className="p-3 align-top">{rhythm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="pros-cons">
          <h2 className="h-feature text-center mb-6">Pros & cons</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-[14px]" style={{ border: "1px solid var(--line-soft)" }}>
              <h3 className="text-lg font-semibold text-[#1F7A4D] mb-3 text-center">RhythmiqCX</h3>
              <h4 className="text-ink font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1F7A4D]" /> Pros</h4>
              <ul className="pl-5 list-disc text-ink2 space-y-1">
                <li><strong className="text-ink">Flat predictable pricing</strong>  $29/mo regardless of call volume</li>
                <li><strong className="text-ink">No-code setup</strong>  live in under one business day</li>
                <li><strong className="text-ink">True omnichannel</strong>  voice + chat + WhatsApp on one dashboard</li>
                <li><strong className="text-ink">Indian-English native</strong>  Sarvam models built for the accent</li>
                <li><strong className="text-ink">Smart call routing</strong>  built-in, no custom dev needed</li>
                <li>Voice cloning included, no API work required</li>
                <li>24×7 human support on all plans</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Newer platform  smaller developer ecosystem than Retell</li>
                <li>Custom API integrations require Growth tier or above</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-[14px]" style={{ border: "1px solid var(--line-soft)" }}>
              <h3 className="text-lg font-semibold text-[#C9461F] mb-3 text-center">Retell AI</h3>
              <h4 className="text-ink font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1F7A4D]" /> Pros</h4>
              <ul className="pl-5 list-disc text-ink2 space-y-1">
                <li>Strong developer API with good documentation</li>
                <li>Large community of developers familiar with the platform</li>
                <li>Supports multiple LLM backends</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Per-minute pricing  costs unpredictable and rise with every call</li>
                <li>No no-code setup  requires a developer</li>
                <li>Voice only  no web chat or WhatsApp channel</li>
                <li>No native Indian-English or regional language voice support</li>
                <li>Smart routing requires custom development</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="why-rhythmiq" className="bg-paper2 p-6 lg:p-8 rounded-[14px] text-center">
          <h2 className="h-feature mb-3">RhythmiqCX  the Retell AI alternative built for non-developers</h2>
          <p className="text-ink2 max-w-3xl mx-auto mb-4 leading-[1.6]">
            Retell AI is powerful if you have an engineering team and can absorb variable per-minute costs.
            RhythmiqCX is for the rest of us  business owners, support leads, and operations teams who want an
            AI phone receptionist that works out of the box, costs a flat rate, and handles voice, WhatsApp,
            and web chat from one place.
          </p>
          <ul className="list-disc text-ink2 text-left max-w-3xl mx-auto space-y-1 pl-5">
            <li><strong className="text-ink">$29/mo flat</strong>  vs $0.07+/min that compounds with every call</li>
            <li><strong className="text-ink">No code, no developer</strong>  configure and go live in under a day</li>
            <li><strong className="text-ink">Omnichannel by default</strong>  not just voice, but chat and WhatsApp too</li>
            <li><strong className="text-ink">Indian-English native</strong>  the only platform built on Sarvam models</li>
          </ul>
        </section>

        <section id="conclusion" className="text-center">
          <h2 className="h-feature mb-3">Conclusion</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            If you need deep API customisation and have developer resources, Retell AI works. But if you want a
            voice AI receptionist that's <strong className="text-ink">affordable, no-code, omnichannel, and optimised
            for Indian-English</strong>, RhythmiqCX is the clear choice at a fraction of the cost.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={BOOK_DEMO_URL} className="btn btn-accent">Book a free demo</Link>
            <Link href="/voice-ai" className="btn btn-ghost">Explore Voice AI <span className="arrow">→</span></Link>
          </div>
        </section>
      </div>
    </div>
  );
}

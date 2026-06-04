import React from "react";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { BOOK_DEMO_URL } from "@/constants/links";

export const metadata = generateMetadata({
  title: "Bland AI Alternative  RhythmiqCX Voice AI | No-Code, $29/mo Flat",
  description:
    "Searching for a Bland AI alternative? RhythmiqCX is no-code, costs $29/mo flat, and includes voice + chat + WhatsApp  no enterprise contract, no developer needed.",
  keywords: [
    "Bland AI alternative",
    "Bland AI competitor",
    "RhythmiqCX vs Bland AI",
    "AI voice agent no code",
    "enterprise voice AI alternative",
    "Bland AI pricing alternative",
    "AI phone receptionist",
  ],
  alternates: {
    canonical: "/bland-ai-alternative",
  },
  openGraph: {
    images: ["/icons/white.jpeg"],
    type: "website",
  },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Bland AI Alternative: RhythmiqCX Voice AI Comparison",
  description:
    "Side-by-side comparison of RhythmiqCX and Bland AI covering pricing, no-code setup, omnichannel support, and Indian-English capabilities.",
  url: "https://rhythmiqcx.com/bland-ai-alternative",
  author: { "@type": "Organization", name: "RhythmiqCX" },
  publisher: {
    "@type": "Organization",
    name: "RhythmiqCX",
    logo: {
      "@type": "ImageObject",
      url: "https://rhythmiqcx.com/icons/rhythmiq-icon.png",
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
    <Neg key="b-price">~$0.09/min per-minute billing. Enterprise contracts. Costs scale fast with call volume.</Neg>,
    <Pos key="rx-price"><strong className="text-ink">Flat $29/mo</strong> no per-minute billing, no enterprise contract needed. Start immediately.</Pos>,
  ],
  [
    "Target Customer",
    <Neg key="b-target">Enterprise-only. Requires developer team and procurement process to get started.</Neg>,
    <Pos key="rx-target"><strong className="text-ink">SMB to enterprise.</strong> Any business owner can set up and go live no developer needed.</Pos>,
  ],
  [
    "Setup Complexity",
    <Neg key="b-setup">Requires developer integration. Complex configuration for non-technical teams.</Neg>,
    <Pos key="rx-setup"><strong className="text-ink">No-code setup.</strong> Configure AI persona, upload knowledge base, connect phone live in one day.</Pos>,
  ],
  [
    "Omnichannel",
    <Neg key="b-omni">Voice-focused. No native web chat or WhatsApp channel bundled in.</Neg>,
    <Pos key="rx-omni"><strong className="text-ink">Voice + Chat + WhatsApp</strong> on one platform. Unified inbox for all channels.</Pos>,
  ],
  [
    "Indian-English Support",
    <Neg key="b-lang">No native Indian-English voice model. Standard TTS may struggle with Indian accents.</Neg>,
    <Pos key="rx-lang"><strong className="text-ink">Native Indian-English.</strong> Powered by Sarvam Bulbul v2 TTS + Saarika STT. 60+ languages.</Pos>,
  ],
  [
    "Smart Call Routing",
    <Neg key="b-route">Configurable via API but requires development work to implement escalation flows.</Neg>,
    <Pos key="rx-route"><strong className="text-ink">Built-in smart routing.</strong> Auto-escalates with full transcript customer never repeats themselves.</Pos>,
  ],
  [
    "Time to Go Live",
    <Neg key="b-time">Weeks requires procurement, developer onboarding, and custom integration build.</Neg>,
    <Pos key="rx-time"><strong className="text-ink">Under 1 business day.</strong> Most deployments go live same day of sign-up.</Pos>,
  ],
  [
    "Support",
    <Neg key="b-sup">Enterprise support tier. Self-serve and SMB customers get limited support options.</Neg>,
    <Pos key="rx-sup"><strong className="text-ink">24×7 support</strong> on every plan email, phone, and ticketing from day one.</Pos>,
  ],
];

export default function BlandAlternative() {
  return (
    <div className="paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={schema} />

      {/* Hero */}
      <section className="section-tight text-center">
        <div className="wrap max-w-4xl">
          <span className="eyebrow justify-center">Comparison · Bland AI</span>
          <h1 className="h-section mt-4">Bland AI Alternative RhythmiqCX Voice AI</h1>
          <p className="lede mx-auto max-w-2xl mt-4">
            No enterprise contract. No developer. Flat $29/mo with voice, chat, and WhatsApp included.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={BOOK_DEMO_URL} className="btn btn-accent">Book a free demo</Link>
            <Link href="/voice-ai" className="btn btn-ghost">Explore Voice AI <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <div className="wrap max-w-5xl pb-4 space-y-14">
        <section id="intro" className="text-center">
          <h2 className="h-feature mb-3">Why Teams Look for a Bland AI Alternative</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Bland AI markets itself as an enterprise-grade conversational AI phone
            platform and it delivers on that promise, but with enterprise-level
            friction. Getting started requires developer resources, per-minute
            pricing at around $0.09/min, and an enterprise sales process. For most
            small to mid-sized businesses that just need an AI phone receptionist
            to answer calls, book appointments, or handle FAQs, Bland AI is
            overkill and overpriced. RhythmiqCX offers the same core capabilities
            human-like voice AI, smart routing, 60+ languages in a no-code package
            starting at $29/month with no developer required.
          </p>
        </section>

        <section id="table">
          <h2 className="h-feature text-center mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-[14px]" style={{ border: "1px solid var(--line)" }}>
            <table className="w-full table-auto border-collapse text-sm bg-white">
              <thead>
                <tr className="bg-paper2 text-ink">
                  <th className="p-3 text-left font-semibold">Capability</th>
                  <th className="p-3 text-left font-semibold">Bland AI</th>
                  <th className="p-3 text-left font-semibold">RhythmiqCX</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([cap, bland, rhythm], i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "var(--line-soft)" }}>
                    <td className="p-3 text-ink font-medium align-top">{cap}</td>
                    <td className="p-3 align-top">{bland}</td>
                    <td className="p-3 align-top">{rhythm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="pros-cons">
          <h2 className="h-feature text-center mb-6">Pros & Cons</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-[14px]" style={{ border: "1px solid var(--line-soft)" }}>
              <h3 className="text-lg font-semibold text-[#1F7A4D] mb-3 text-center">RhythmiqCX</h3>
              <h4 className="text-ink font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1F7A4D]" /> Pros</h4>
              <ul className="pl-5 list-disc text-ink2 space-y-1">
                <li><strong className="text-ink">Flat $29/mo</strong> zero per-minute billing risk</li>
                <li><strong className="text-ink">No-code, no developer</strong> any ops team can run it</li>
                <li><strong className="text-ink">Live in one day</strong> no procurement or contract delays</li>
                <li><strong className="text-ink">True omnichannel</strong> voice + WhatsApp + web chat</li>
                <li><strong className="text-ink">Indian-English native</strong> Sarvam models built for the accent</li>
                <li>1,000+ concurrent calls on GPU infrastructure</li>
                <li>24×7 human support on all plans</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Less mature enterprise feature set than Bland AI</li>
                <li>Smaller developer community</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-[14px]" style={{ border: "1px solid var(--line-soft)" }}>
              <h3 className="text-lg font-semibold text-[#C9461F] mb-3 text-center">Bland AI</h3>
              <h4 className="text-ink font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1F7A4D]" /> Pros</h4>
              <ul className="pl-5 list-disc text-ink2 space-y-1">
                <li>Advanced enterprise features and SLAs</li>
                <li>Strong API documentation for developers</li>
                <li>High customisability for complex call flows</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>~$0.09/min expensive at scale</li>
                <li>Enterprise-only no self-serve for SMBs</li>
                <li>Requires developer to set up and maintain</li>
                <li>Voice-only no chat or WhatsApp channel</li>
                <li>No Indian-English native voice support</li>
                <li>Weeks to go live vs hours</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="why-rhythmiq" className="bg-paper2 p-6 lg:p-8 rounded-[14px] text-center">
          <h2 className="h-feature mb-3">Who Should Choose RhythmiqCX Over Bland AI?</h2>
          <p className="text-ink2 max-w-3xl mx-auto mb-4 leading-[1.6]">
            If you're a founder, support lead, or ops manager who needs an AI
            phone receptionist live this week not after a 6-week enterprise
            procurement RhythmiqCX is the answer. You get the same core
            capabilities (human-like voice, smart routing, 24/7 availability)
            without the developer dependency, the per-minute billing roulette, or
            the enterprise contract.
          </p>
          <ul className="list-disc text-ink2 text-left max-w-3xl mx-auto space-y-1 pl-5">
            <li><strong className="text-ink">No developer needed</strong> configure from a dashboard, not code</li>
            <li><strong className="text-ink">Predictable cost</strong> flat $29/mo vs $0.09/min that spikes with volume</li>
            <li><strong className="text-ink">Omnichannel from day one</strong> voice, chat, and WhatsApp all included</li>
            <li><strong className="text-ink">Indian market ready</strong> native Sarvam TTS and STT models</li>
          </ul>
        </section>

        <section id="conclusion" className="text-center">
          <h2 className="h-feature mb-3">Conclusion</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Bland AI is built for large enterprises with developer teams and
            enterprise budgets. RhythmiqCX is built for everyone else{" "}
            <strong className="text-ink">flat pricing, no-code, live in a day, omnichannel by default.</strong>{" "}
            If you're looking for a Bland AI alternative that doesn't require a
            procurement process, the choice is clear.
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

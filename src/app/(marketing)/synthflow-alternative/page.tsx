import React from "react";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { BOOK_DEMO_URL } from "@/constants/links";

export const metadata = generateMetadata({
  title: "Synthflow Alternative  RhythmiqCX Voice AI | $29/mo vs $99/mo",
  description:
    "Synthflow removed its $29 tier  now starts at $99/mo with minute limits. RhythmiqCX offers AI phone receptionist + chat + WhatsApp at flat $29/mo with no minute caps.",
  keywords: [
    "Synthflow alternative",
    "Synthflow competitor",
    "RhythmiqCX vs Synthflow",
    "cheaper Synthflow alternative",
    "Synthflow pricing",
    "AI voice agent $29",
    "AI phone receptionist affordable",
  ],
  alternates: {
    canonical: "/synthflow-alternative",
  },
  openGraph: {
    images: ["/icons/og-default.png"],
    type: "website",
  },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Synthflow Alternative: RhythmiqCX Voice AI Comparison",
  description:
    "Side-by-side comparison of RhythmiqCX and Synthflow covering pricing, minute limits, omnichannel support, and value for money.",
  url: "https://rhythmiqcx.com/synthflow-alternative",
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
    "Entry Price",
    <Neg key="s-price">$99/mo entry tier (removed the $29 plan). 3.4× more expensive for the same core use case.</Neg>,
    <Pos key="rx-price"><strong className="text-ink">Still $29/mo.</strong> Flat rate, no minute caps, no plan downgrades.</Pos>,
  ],
  [
    "Minute Caps",
    <Neg key="s-min">Monthly minute allowances on all plans. Overage costs apply when you exceed your limit.</Neg>,
    <Pos key="rx-min"><strong className="text-ink">No minute caps.</strong> Flat monthly pricing regardless of call duration or volume.</Pos>,
  ],
  [
    "Omnichannel (WhatsApp + Chat)",
    <Neg key="s-omni">Voice only. No WhatsApp channel, no web chat widget.</Neg>,
    <Pos key="rx-omni"><strong className="text-ink">Voice + WhatsApp + web chat</strong> on one unified platform. No extra cost.</Pos>,
  ],
  [
    "Indian-English Support",
    <Neg key="s-lang">No dedicated Indian-English voice model. Primarily optimised for US/UK English.</Neg>,
    <Pos key="rx-lang"><strong className="text-ink">Native Indian-English.</strong> Sarvam Bulbul v2 TTS + Saarika STT. 60+ languages total.</Pos>,
  ],
  [
    "No-Code Setup",
    <Neg key="s-setup">Setup requires configuration and some technical familiarity. Not as instant as claimed.</Neg>,
    <Pos key="rx-setup"><strong className="text-ink">Truly no-code.</strong> Configure AI persona, upload knowledge base, connect phone live in under a day.</Pos>,
  ],
  [
    "Smart Call Routing",
    <Neg key="s-route">Basic routing available. Full escalation logic requires additional configuration.</Neg>,
    <Pos key="rx-route"><strong className="text-ink">Built-in smart routing.</strong> Auto-escalates to human agent with full call transcript zero customer repetition.</Pos>,
  ],
  [
    "Concurrent Calls",
    <Neg key="s-conc">Limited concurrent call capacity on lower plans. Higher plans required for volume.</Neg>,
    <Pos key="rx-conc"><strong className="text-ink">1,000+ concurrent calls</strong> GPU-accelerated, included on all plans.</Pos>,
  ],
  [
    "Support",
    <Neg key="s-sup">Support quality varies by plan tier. Lower plans get limited support access.</Neg>,
    <Pos key="rx-sup"><strong className="text-ink">24×7 support</strong> via email, phone, and ticketing on every plan including entry.</Pos>,
  ],
];

export default function SynthflowAlternative() {
  return (
    <div className="paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={schema} />

      {/* Hero */}
      <section className="section-tight text-center">
        <div className="wrap max-w-4xl">
          <span className="eyebrow justify-center">Comparison · Synthflow</span>
          <h1 className="h-section mt-4">Synthflow Alternative $29/mo vs $99/mo, No Minute Caps</h1>
          <p className="lede mx-auto max-w-2xl mt-4">
            Synthflow dropped its $29 plan. RhythmiqCX kept it and added WhatsApp, web chat, and no minute limits.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={BOOK_DEMO_URL} className="btn btn-accent">Book a free demo</Link>
            <Link href="/voice-ai" className="btn btn-ghost">Explore Voice AI <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <div className="wrap max-w-5xl pb-4 space-y-14">
        <section id="intro" className="text-center">
          <h2 className="h-feature mb-3">Why Teams Are Looking for a Synthflow Alternative</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Synthflow used to offer a $29/month entry tier it removed it. Their
            current entry plan starts at $99/month and comes with a monthly minute
            cap. That's a 3.4× price increase for the same core use case: an AI
            voice agent that answers customer calls. On top of that, Synthflow is
            voice-only there's no WhatsApp channel, no web chat widget, and no
            omnichannel inbox. RhythmiqCX fills exactly that gap: the same AI
            voice capabilities, still at $29/month flat, with web chat and
            WhatsApp included in the same dashboard.
          </p>
        </section>

        <section id="table">
          <h2 className="h-feature text-center mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-[14px]" style={{ border: "1px solid var(--line)" }}>
            <table className="w-full table-auto border-collapse text-sm bg-white">
              <thead>
                <tr className="bg-paper2 text-ink">
                  <th className="p-3 text-left font-semibold">Capability</th>
                  <th className="p-3 text-left font-semibold">Synthflow</th>
                  <th className="p-3 text-left font-semibold">RhythmiqCX</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([cap, synthflow, rhythm], i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "var(--line-soft)" }}>
                    <td className="p-3 text-ink font-medium align-top">{cap}</td>
                    <td className="p-3 align-top">{synthflow}</td>
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
                <li><strong className="text-ink">$29/mo flat</strong> 3.4× cheaper than Synthflow's entry tier</li>
                <li><strong className="text-ink">No minute caps</strong> flat cost regardless of call volume</li>
                <li><strong className="text-ink">True omnichannel</strong> voice + WhatsApp + web chat included</li>
                <li><strong className="text-ink">Indian-English native</strong> Sarvam models built for the accent</li>
                <li>1,000+ concurrent calls on all plans</li>
                <li>24×7 human support on entry plan</li>
                <li>Built-in smart call routing</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Newer brand less established in Western markets</li>
                <li>Fewer third-party integrations than Synthflow</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-[14px]" style={{ border: "1px solid var(--line-soft)" }}>
              <h3 className="text-lg font-semibold text-[#C9461F] mb-3 text-center">Synthflow</h3>
              <h4 className="text-ink font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1F7A4D]" /> Pros</h4>
              <ul className="pl-5 list-disc text-ink2 space-y-1">
                <li>Established product with good US market presence</li>
                <li>Clean no-code interface for voice AI configuration</li>
                <li>Range of pre-built industry templates</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Removed $29/mo tier now starts at $99/mo (3.4× more expensive)</li>
                <li>Monthly minute caps overages cost more</li>
                <li>Voice only no WhatsApp or web chat channel</li>
                <li>No Indian-English or regional language voice support</li>
                <li>Primarily US/UK market focused</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="why-rhythmiq" className="bg-paper2 p-6 lg:p-8 rounded-[14px] text-center">
          <h2 className="h-feature mb-3">Same Core Features. 3.4× Cheaper. With WhatsApp Included.</h2>
          <p className="text-ink2 max-w-3xl mx-auto mb-4 leading-[1.6]">
            If you were on Synthflow's old $29 plan and it disappeared, or if
            you're comparing options before committing to $99/mo, RhythmiqCX gives
            you everything you need: AI voice agents, smart routing, voice cloning
            plus WhatsApp and web chat all at the price Synthflow used to charge.
          </p>
          <ul className="list-disc text-ink2 text-left max-w-3xl mx-auto space-y-1 pl-5">
            <li><strong className="text-ink">$29/mo vs $99/mo</strong> save $840/year on entry tier alone</li>
            <li><strong className="text-ink">No minute caps</strong> handle any call volume without overage anxiety</li>
            <li><strong className="text-ink">Omnichannel included</strong> voice + WhatsApp + chat, one subscription</li>
            <li><strong className="text-ink">Indian-English native</strong> the only platform with Sarvam voice models</li>
          </ul>
        </section>

        <section id="conclusion" className="text-center">
          <h2 className="h-feature mb-3">Conclusion</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Synthflow is a solid voice AI product, but at $99/mo with minute caps
            and no WhatsApp channel, it's hard to justify over RhythmiqCX. For{" "}
            <strong className="text-ink">the same AI phone receptionist capabilities at $29/mo flat with no caps, and omnichannel included</strong>
            , RhythmiqCX is the better value.
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

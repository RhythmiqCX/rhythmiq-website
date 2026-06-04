import React from "react";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { BOOK_DEMO_URL } from "@/constants/links";

export const metadata = generateMetadata({
  title: "Vapi AI Alternative  RhythmiqCX | Flat $29/mo, No 4-Vendor Setup",
  description:
    "Looking for a Vapi alternative? Skip the 4–6 vendor contracts. RhythmiqCX is an all-in-one AI phone receptionist at flat $29/mo  no hidden add-ons, no HIPAA upcharges.",
  keywords: [
    "Vapi alternative",
    "Vapi AI competitor",
    "RhythmiqCX vs Vapi",
    "Vapi AI pricing alternative",
    "AI voice agent all-in-one",
    "no vendor lock-in voice AI",
    "AI phone receptionist",
  ],
  alternates: {
    canonical: "/vapi-alternative",
  },
  openGraph: {
    images: ["/icons/white.jpeg"],
    type: "website",
  },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Vapi AI Alternative: RhythmiqCX Voice AI Comparison",
  description:
    "Side-by-side comparison of RhythmiqCX and Vapi AI covering pricing, vendor complexity, setup, and omnichannel support.",
  url: "https://rhythmiqcx.com/vapi-alternative",
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
    "True All-In Pricing",
    <Neg key="v-price">$0.13–$0.31/min true cost once LLM + TTS + STT + telephony vendor fees are added. Requires 4–6 contracts.</Neg>,
    <Pos key="rx-price"><strong className="text-ink">Flat $29/mo all-inclusive.</strong> AI, TTS, STT, and routing bundled. One invoice, one vendor.</Pos>,
  ],
  [
    "Vendor Complexity",
    <Neg key="v-vendor">Middleware layer you manage contracts with LLM, TTS, STT, and telephony separately.</Neg>,
    <Pos key="rx-vendor"><strong className="text-ink">All-in-one platform.</strong> Everything managed by RhythmiqCX zero vendor juggling.</Pos>,
  ],
  [
    "HIPAA Compliance",
    <Neg key="v-hipaa">HIPAA compliance is a $1,000/month add-on on top of per-minute usage costs.</Neg>,
    <Pos key="rx-hipaa"><strong className="text-ink">Compliance-ready at standard pricing.</strong> Encrypted in transit and at rest, audit logs included.</Pos>,
  ],
  [
    "No-Code Setup",
    <Neg key="v-setup">Developer-first. Non-technical teams can't configure or maintain it without engineering help.</Neg>,
    <Pos key="rx-setup"><strong className="text-ink">No-code dashboard.</strong> Configure your AI persona and go live without writing a line of code.</Pos>,
  ],
  [
    "Omnichannel",
    <Neg key="v-omni">Voice only. No bundled web chat or WhatsApp channel.</Neg>,
    <Pos key="rx-omni"><strong className="text-ink">Voice + Chat + WhatsApp</strong> on one platform at no extra cost.</Pos>,
  ],
  [
    "Indian-English & Regional Voices",
    <Neg key="v-lang">Depends on TTS vendor chosen. No built-in Indian-English optimisation.</Neg>,
    <Pos key="rx-lang"><strong className="text-ink">Sarvam Bulbul v2 + Saarika v2.5</strong> purpose-built for Indian-English. 60+ languages.</Pos>,
  ],
  [
    "Smart Call Routing",
    <Neg key="v-route">Custom routing requires additional development and configuration work.</Neg>,
    <Pos key="rx-route"><strong className="text-ink">Built-in smart routing.</strong> Low-confidence calls auto-escalate to a human with full transcript.</Pos>,
  ],
  [
    "Support",
    <Neg key="v-sup">Developer community support. Issues may span multiple vendors making root cause tricky.</Neg>,
    <Pos key="rx-sup"><strong className="text-ink">Single point of support.</strong> 24×7 on email, phone, ticketing. One vendor responsible for everything.</Pos>,
  ],
];

export default function VapiAlternative() {
  return (
    <div className="paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={schema} />

      {/* Hero */}
      <section className="section-tight text-center">
        <div className="wrap max-w-4xl">
          <span className="eyebrow justify-center">Comparison · Vapi AI</span>
          <h1 className="h-section mt-4">Vapi AI Alternative One Platform vs Four Vendors</h1>
          <p className="lede mx-auto max-w-2xl mt-4">
            Vapi requires 4–6 separate vendor contracts and bills $0.13–$0.31/min. RhythmiqCX is all-in-one at flat $29/mo.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={BOOK_DEMO_URL} className="btn btn-accent">Book a free demo</Link>
            <Link href="/voice-ai" className="btn btn-ghost">Explore Voice AI <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <div className="wrap max-w-5xl pb-4 space-y-14">
        <section id="intro" className="text-center">
          <h2 className="h-feature mb-3">The Hidden Cost of Vapi</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Vapi is marketed as a voice AI platform, but the reality is that it's
            a middleware layer that connects separate vendors you still need to
            independently contract with an LLM provider, a TTS provider, an STT
            provider, and a telephony provider. The true cost lands at
            $0.13–$0.31/min once all vendors are accounted for, and HIPAA
            compliance is an additional $1,000/month add-on. For businesses that
            want to deploy an AI phone receptionist without managing a vendor
            stack, RhythmiqCX offers a fully packaged solution: AI, TTS, STT,
            telephony, and smart routing all included at a flat $29/month.
          </p>
        </section>

        <section id="table">
          <h2 className="h-feature text-center mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-[14px]" style={{ border: "1px solid var(--line)" }}>
            <table className="w-full table-auto border-collapse text-sm bg-white">
              <thead>
                <tr className="bg-paper2 text-ink">
                  <th className="p-3 text-left font-semibold">Capability</th>
                  <th className="p-3 text-left font-semibold">Vapi AI</th>
                  <th className="p-3 text-left font-semibold">RhythmiqCX</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([cap, vapi, rhythm], i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "var(--line-soft)" }}>
                    <td className="p-3 text-ink font-medium align-top">{cap}</td>
                    <td className="p-3 align-top">{vapi}</td>
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
                <li><strong className="text-ink">One vendor, one invoice</strong> no contract juggling</li>
                <li><strong className="text-ink">Flat $29/mo</strong> true all-in cost, no hidden vendor fees</li>
                <li><strong className="text-ink">HIPAA-aligned at standard pricing</strong> no $1K add-on</li>
                <li><strong className="text-ink">No-code setup</strong> live in under a day</li>
                <li><strong className="text-ink">Omnichannel included</strong> voice + chat + WhatsApp</li>
                <li>Single support contact for all issues</li>
                <li>Indian-English native via Sarvam models</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Less LLM flexibility you use RhythmiqCX's model stack</li>
                <li>Smaller API surface for deep customisation</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-[14px]" style={{ border: "1px solid var(--line-soft)" }}>
              <h3 className="text-lg font-semibold text-[#C9461F] mb-3 text-center">Vapi AI</h3>
              <h4 className="text-ink font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1F7A4D]" /> Pros</h4>
              <ul className="pl-5 list-disc text-ink2 space-y-1">
                <li>Flexible LLM and TTS vendor choice</li>
                <li>Strong developer API</li>
                <li>Good for highly custom voice AI workflows</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>True cost $0.13–$0.31/min across all vendor fees</li>
                <li>Requires 4–6 separate vendor contracts</li>
                <li>HIPAA compliance = $1,000/month extra</li>
                <li>No no-code setup developer required</li>
                <li>Voice only no chat or WhatsApp</li>
                <li>Support spans multiple vendors accountability gaps</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="why-rhythmiq" className="bg-paper2 p-6 lg:p-8 rounded-[14px] text-center">
          <h2 className="h-feature mb-3">RhythmiqCX The Vapi Alternative That Just Works</h2>
          <p className="text-ink2 max-w-3xl mx-auto mb-4 leading-[1.6]">
            Vapi gives you maximum control but maximum complexity. You become the
            systems integrator responsible for stitching together LLM, TTS, STT,
            and telephony and paying each vendor separately. RhythmiqCX packages
            everything you need into one product, one bill, and one support
            contact. For teams who want voice AI working today not after a month
            of vendor negotiations that's the better deal.
          </p>
          <ul className="list-disc text-ink2 text-left max-w-3xl mx-auto space-y-1 pl-5">
            <li><strong className="text-ink">$29/mo flat</strong> vs true $0.13–$0.31/min all-in Vapi cost</li>
            <li><strong className="text-ink">One vendor</strong> vs 4–6 contracts and invoices</li>
            <li><strong className="text-ink">No HIPAA upcharge</strong> vs Vapi's $1,000/month add-on</li>
            <li><strong className="text-ink">Omnichannel</strong> voice + WhatsApp + chat, bundled</li>
          </ul>
        </section>

        <section id="conclusion" className="text-center">
          <h2 className="h-feature mb-3">Conclusion</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Vapi is a good choice if you need full control over every component
            and have the engineering resources to manage a multi-vendor stack. But
            if you want{" "}
            <strong className="text-ink">predictable pricing, no vendor complexity, and an AI phone receptionist that's live in a day</strong>
            , RhythmiqCX is the clear Vapi alternative.
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

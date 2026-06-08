import React from "react";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { BOOK_DEMO_URL } from "@/constants/links";

export const metadata = generateMetadata({
  title: "Vapi Alternative for Restaurants | RhythmiqCX All-in-One AI Phone Host",
  description:
    "Vapi is middleware you wire to 4–6 vendors, billed per minute. RhythmiqCX is the all-in-one, done-for-you AI phone host for restaurants: books tables, takes orders, 12+ languages, one vendor, flat plans from $149/mo.",
  keywords: [
    "Vapi alternative",
    "Vapi alternative for restaurants",
    "RhythmiqCX vs Vapi",
    "all-in-one AI phone host",
    "restaurant voice AI",
    "AI that takes orders over the phone",
  ],
  alternates: {
    canonical: "/vapi-alternative",
  },
  openGraph: {
    images: ["/icons/og-default.png"],
    type: "website",
  },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Vapi Alternative: RhythmiqCX All-in-One AI Phone Host for Restaurants",
  description:
    "Side-by-side comparison of RhythmiqCX and Vapi covering restaurant fit, order taking, all-in pricing, vendor complexity, and languages.",
  url: "https://rhythmiqcx.com/vapi-alternative",
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
    "Built for restaurants",
    <Neg key="v-fit">A developer middleware layer for any use case. You build the restaurant logic yourself.</Neg>,
    <Pos key="rx-fit"><strong className="text-ink">Purpose-built for restaurants.</strong> Reservations, orders, and menu questions out of the box.</Pos>,
  ],
  [
    "Takes orders on the call",
    <Neg key="v-order">Possible if you build it, across your own LLM, TTS, STT, and telephony vendors.</Neg>,
    <Pos key="rx-order"><strong className="text-ink">Takes the whole order.</strong> Modifiers and all, pushed into your POS, no build required.</Pos>,
  ],
  [
    "True all-in pricing",
    <Neg key="v-price">$0.13–$0.31/min once LLM + TTS + STT + telephony fees are added. Requires 4–6 contracts.</Neg>,
    <Pos key="rx-price"><strong className="text-ink">Flat plans from $149/mo, all-inclusive.</strong> AI, voice, telephony, and routing bundled. One invoice.</Pos>,
  ],
  [
    "Vendor complexity",
    <Neg key="v-vendor">You manage contracts with LLM, TTS, STT, and telephony providers separately.</Neg>,
    <Pos key="rx-vendor"><strong className="text-ink">All-in-one platform.</strong> Everything managed by RhythmiqCX, zero vendor juggling.</Pos>,
  ],
  [
    "Setup",
    <Neg key="v-setup">Developer-first. A non-technical restaurant team can't configure or maintain it.</Neg>,
    <Pos key="rx-setup"><strong className="text-ink">Done-for-you.</strong> Tell us your menu and hours, point your number at it, live in minutes.</Pos>,
  ],
  [
    "Languages",
    <Neg key="v-lang">Depends on the TTS vendor you wire in. No restaurant-tuned dialect support out of the box.</Neg>,
    <Pos key="rx-lang"><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more, at no extra charge.</Pos>,
  ],
  [
    "Compliance",
    <Neg key="v-hipaa">HIPAA compliance is a $1,000/month add-on on top of per-minute usage costs.</Neg>,
    <Pos key="rx-hipaa"><strong className="text-ink">Compliance-ready at standard pricing.</strong> Encrypted in transit and at rest, audit logs included.</Pos>,
  ],
  [
    "Support",
    <Neg key="v-sup">Issues can span multiple vendors, making root cause and accountability tricky.</Neg>,
    <Pos key="rx-sup"><strong className="text-ink">One point of support.</strong> One vendor responsible for everything, end to end.</Pos>,
  ],
];

export default function VapiAlternative() {
  return (
    <div className="paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={schema} />

      {/* Hero */}
      <section className="section-tight text-center">
        <div className="wrap max-w-4xl">
          <span className="eyebrow justify-center">Comparison · Vapi</span>
          <h1 className="h-section mt-4">Vapi Alternative: One Platform vs Four Vendors</h1>
          <p className="lede mx-auto max-w-2xl mt-4">
            Vapi wires together 4–6 separate vendors and bills $0.13–$0.31/min. RhythmiqCX is the all-in-one, done-for-you AI phone host for restaurants, flat from $149/mo.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={BOOK_DEMO_URL} className="btn btn-accent">Book a free demo</Link>
            <Link href="/voice-ai" className="btn btn-ghost">Explore Voice AI <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <div className="wrap max-w-5xl pb-20 lg:pb-28 space-y-14">
        <section id="intro" className="text-center">
          <h2 className="h-feature mb-3">The Hidden Cost of Vapi for Restaurants</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Vapi is marketed as a voice-AI platform, but it is really a middleware
            layer that connects separate vendors you still contract with yourself:
            an LLM provider, a TTS provider, an STT provider, and a telephony
            provider. The true cost lands at $0.13–$0.31/min once every vendor is
            counted, compliance is a costly add-on, and you are the systems
            integrator. A restaurant does not want to assemble a voice stack, it
            wants the phone answered and orders taken. RhythmiqCX packages
            everything, AI, voice, telephony, and routing, into one done-for-you
            product built for hospitality, on a flat plan from $149/month.
          </p>
        </section>

        <section id="table">
          <h2 className="h-feature text-center mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-[14px]" style={{ border: "1px solid var(--line)" }}>
            <table className="w-full table-auto border-collapse text-sm bg-white">
              <thead>
                <tr className="bg-paper2 text-ink">
                  <th className="p-3 text-left font-semibold">Capability</th>
                  <th className="p-3 text-left font-semibold">Vapi</th>
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
                <li><strong className="text-ink">Built for restaurants</strong> reservations, orders, and menu Q&A out of the box</li>
                <li><strong className="text-ink">One vendor, one invoice</strong> no contract juggling</li>
                <li><strong className="text-ink">Flat from $149/mo</strong> true all-in cost, no hidden vendor fees</li>
                <li><strong className="text-ink">Done-for-you</strong> live in minutes, no integration build</li>
                <li><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more</li>
                <li>Single support contact for everything</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Less LLM flexibility you use RhythmiqCX's model stack</li>
                <li>Smaller API surface for deep custom builds</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-[14px]" style={{ border: "1px solid var(--line-soft)" }}>
              <h3 className="text-lg font-semibold text-[#C9461F] mb-3 text-center">Vapi</h3>
              <h4 className="text-ink font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1F7A4D]" /> Pros</h4>
              <ul className="pl-5 list-disc text-ink2 space-y-1">
                <li>Flexible LLM and TTS vendor choice</li>
                <li>Strong developer API</li>
                <li>Good for highly custom voice-AI builds</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>True cost $0.13–$0.31/min across all vendor fees</li>
                <li>Requires 4–6 separate vendor contracts</li>
                <li>Compliance is a costly add-on</li>
                <li>No no-code setup a developer is required</li>
                <li>You build the reservation and ordering flows yourself</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="why-rhythmiq" className="bg-paper2 p-6 lg:p-8 rounded-[14px] text-center">
          <h2 className="h-feature mb-3">RhythmiqCX, the Vapi Alternative That Just Works</h2>
          <p className="text-ink2 max-w-3xl mx-auto mb-4 leading-[1.6]">
            Vapi gives you maximum control and maximum complexity. You become the
            systems integrator, stitching together LLM, TTS, STT, and telephony, and
            paying each vendor separately. RhythmiqCX packages everything a
            restaurant needs into one product, one bill, and one support contact, on
            a flat plan with no per-minute meter.
          </p>
          <ul className="list-disc text-ink2 text-left max-w-3xl mx-auto space-y-1 pl-5">
            <li><strong className="text-ink">Flat from $149/mo</strong> vs a true $0.13–$0.31/min all-in Vapi cost</li>
            <li><strong className="text-ink">One vendor</strong> vs 4–6 contracts and invoices</li>
            <li><strong className="text-ink">Restaurant-ready</strong> books tables and takes orders out of the box</li>
            <li><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more</li>
          </ul>
        </section>

        <section id="conclusion" className="text-center">
          <h2 className="h-feature mb-3">Conclusion</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Vapi is a good choice if you need control over every component and have
            engineers to manage a multi-vendor stack. But if you run a restaurant
            and want{" "}
            <strong className="text-ink">predictable pricing, no vendor complexity, and a phone host that takes real orders in any language</strong>
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

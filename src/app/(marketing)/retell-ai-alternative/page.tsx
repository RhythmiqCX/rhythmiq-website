import React from "react";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { BOOK_DEMO_URL } from "@/constants/links";

export const metadata = generateMetadata({
  title: "Retell AI Alternative for Restaurants | RhythmiqCX AI Phone Host",
  description:
    "Retell AI is a per-minute developer platform you build on. RhythmiqCX is the done-for-you AI phone host for restaurants: books tables, takes orders, answers in 12+ languages, on flat plans with no per-minute meter.",
  keywords: [
    "Retell AI alternative",
    "Retell AI alternative for restaurants",
    "RhythmiqCX vs Retell AI",
    "no per-minute voice AI",
    "AI phone host for restaurants",
    "AI that takes orders over the phone",
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
  headline: "Retell AI Alternative: RhythmiqCX AI Phone Host for Restaurants",
  description:
    "Side-by-side comparison of RhythmiqCX and Retell AI covering restaurant fit, order taking, per-minute vs flat pricing, setup, and languages.",
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
    "Built for restaurants",
    <Neg key="r-fit">A developer platform for building voice agents in any domain. You build the restaurant logic yourself.</Neg>,
    <Pos key="rx-fit"><strong className="text-ink">Purpose-built for restaurants.</strong> Reservations, orders, and menu questions work out of the box.</Pos>,
  ],
  [
    "Takes orders on the call",
    <Neg key="r-order">Possible with engineering. You build and maintain the ordering flow and POS integration.</Neg>,
    <Pos key="rx-order"><strong className="text-ink">Takes the whole order.</strong> Modifiers and all, pushed into your POS, no build required.</Pos>,
  ],
  [
    "Pricing model",
    <Neg key="r-price">$0.07+/min, metered. Costs compound on a busy service and the bill is never the same twice.</Neg>,
    <Pos key="rx-price"><strong className="text-ink">Flat plans from $149/mo.</strong> No per-minute meter, no surprise overage.</Pos>,
  ],
  [
    "Setup",
    <Neg key="r-setup">Developer-only. API integration, telephony wiring, and engineering time required.</Neg>,
    <Pos key="rx-setup"><strong className="text-ink">Done-for-you.</strong> Tell us your menu and hours, point your number at it, live in minutes.</Pos>,
  ],
  [
    "Languages",
    <Neg key="r-lang">Multilingual via configuration, but no restaurant-tuned dialect support out of the box.</Neg>,
    <Pos key="rx-lang"><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more, at no extra charge.</Pos>,
  ],
  [
    "Smart Call Routing",
    <Neg key="r-route">Requires custom development to implement escalation logic.</Neg>,
    <Pos key="rx-route"><strong className="text-ink">Built-in smart routing.</strong> Hands the call to your team with the full transcript.</Pos>,
  ],
  [
    "Concurrent Call Capacity",
    <Neg key="r-conc">Scales with usage, but costs scale per minute right along with it.</Neg>,
    <Pos key="rx-conc"><strong className="text-ink">1,000+ concurrent calls</strong> handles the dinner rush at a flat cost.</Pos>,
  ],
  [
    "Support",
    <Neg key="r-sup">Developer-focused documentation. Support primarily via Discord and docs.</Neg>,
    <Pos key="rx-sup"><strong className="text-ink">Real support</strong> on every plan, with a dedicated success manager on Enterprise.</Pos>,
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
          <h1 className="h-section mt-4">Retell AI Alternative: An AI Phone Host Built for Restaurants</h1>
          <p className="lede mx-auto max-w-2xl mt-4">
            Retell is a per-minute developer platform you build on. RhythmiqCX is done-for-you, restaurant-ready, and flat, no engineers and no per-minute meter.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={BOOK_DEMO_URL} className="btn btn-accent">Book a free demo</Link>
            <Link href="/voice-ai" className="btn btn-ghost">Explore Voice AI <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <div className="wrap max-w-5xl pb-20 lg:pb-28 space-y-14">
        <section id="intro" className="text-center">
          <h2 className="h-feature mb-3">The core problem with Retell AI for restaurants</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Retell AI is a powerful voice-AI platform, for developers. It bills by
            the minute, so the cost compounds on a busy service and the invoice is
            never the same twice. And it is a toolkit, not a product: there is no
            no-code setup, and you build the reservation and ordering logic, the POS
            integration, and the routing yourself. RhythmiqCX is the opposite: a
            done-for-you AI phone host built for restaurants. It already knows how to
            book a table, take a takeout order with modifiers, and answer guest
            questions in 12+ languages, on a flat plan with no per-minute meter
            running in the background.
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
                <li><strong className="text-ink">Built for restaurants</strong> reservations, orders, and menu Q&A out of the box</li>
                <li><strong className="text-ink">Flat, predictable pricing</strong> no per-minute meter, no surprise bill</li>
                <li><strong className="text-ink">Done-for-you</strong> live in minutes, no engineers</li>
                <li><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more</li>
                <li><strong className="text-ink">Built-in smart routing</strong> hands off with the full transcript</li>
                <li>Voice cloning included, no API work required</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Not a build-it-yourself developer toolkit</li>
                <li>Deep custom API work is an Enterprise conversation</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-[14px]" style={{ border: "1px solid var(--line-soft)" }}>
              <h3 className="text-lg font-semibold text-[#C9461F] mb-3 text-center">Retell AI</h3>
              <h4 className="text-ink font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1F7A4D]" /> Pros</h4>
              <ul className="pl-5 list-disc text-ink2 space-y-1">
                <li>Strong developer API with good documentation</li>
                <li>Large community of developers familiar with the platform</li>
                <li>Supports multiple LLM backends</li>
                <li>Flexible for any industry if you have engineers</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Per-minute pricing the bill compounds and is hard to predict</li>
                <li>No no-code setup it requires a developer</li>
                <li>You build the reservation and ordering flows yourself</li>
                <li>No restaurant-tuned Arabic, Spanish, or Hindi out of the box</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="why-rhythmiq" className="bg-paper2 p-6 lg:p-8 rounded-[14px] text-center">
          <h2 className="h-feature mb-3">RhythmiqCX, the Retell alternative for restaurants, not engineers</h2>
          <p className="text-ink2 max-w-3xl mx-auto mb-4 leading-[1.6]">
            Retell AI is a great fit if you have an engineering team and want to
            build on a per-minute platform. RhythmiqCX is for restaurant owners and
            operators who want the phone fully handled, on a flat plan, without
            hiring a developer or watching a minute meter.
          </p>
          <ul className="list-disc text-ink2 text-left max-w-3xl mx-auto space-y-1 pl-5">
            <li><strong className="text-ink">Flat, not metered</strong> no per-minute bill that compounds with every call</li>
            <li><strong className="text-ink">Restaurant-ready</strong> books tables and takes orders without you building flows</li>
            <li><strong className="text-ink">Done-for-you</strong> live in minutes, no engineers</li>
            <li><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more</li>
          </ul>
        </section>

        <section id="conclusion" className="text-center">
          <h2 className="h-feature mb-3">Conclusion</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            If you need deep API customisation and have developer resources, Retell
            AI works. But if you run a restaurant and want a phone host that is{" "}
            <strong className="text-ink">done-for-you, flat-priced, and takes real orders in any language</strong>
            , RhythmiqCX is purpose-built for that.
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

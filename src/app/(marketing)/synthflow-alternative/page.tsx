import React from "react";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { BOOK_DEMO_URL } from "@/constants/links";

export const metadata = generateMetadata({
  title: "Synthflow Alternative for Restaurants | RhythmiqCX AI Phone Host",
  description:
    "Synthflow is a generic voice AI builder you configure yourself, with monthly minute caps. RhythmiqCX is the done-for-you AI phone host built for restaurants: books tables, takes orders, and answers in 12+ languages on flat plans with no minute caps.",
  keywords: [
    "Synthflow alternative",
    "Synthflow alternative for restaurants",
    "RhythmiqCX vs Synthflow",
    "AI phone host for restaurants",
    "restaurant voice AI",
    "AI that takes orders over the phone",
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
  headline: "Synthflow Alternative: RhythmiqCX AI Phone Host for Restaurants",
  description:
    "Side-by-side comparison of RhythmiqCX and Synthflow covering restaurant fit, order taking, pricing model, minute caps, and languages.",
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
    "Built for restaurants",
    <Neg key="s-fit">A generic voice-AI builder. You design the call flows, prompts, and logic yourself, for any industry.</Neg>,
    <Pos key="rx-fit"><strong className="text-ink">Purpose-built for restaurants.</strong> Reservations, takeout and delivery orders, and menu questions work out of the box.</Pos>,
  ],
  [
    "Takes orders on the call",
    <Neg key="s-order">Possible, but you have to build and maintain the ordering flow and POS logic yourself.</Neg>,
    <Pos key="rx-order"><strong className="text-ink">Takes the whole order.</strong> Modifiers and all, pushed straight into your POS.</Pos>,
  ],
  [
    "Pricing model",
    <Neg key="s-price">From $99/mo with monthly minute caps. A busy month triggers overages, so the real cost is unpredictable.</Neg>,
    <Pos key="rx-price"><strong className="text-ink">Flat plans from $149/mo.</strong> No minute caps, no surprise overage bills.</Pos>,
  ],
  [
    "Languages",
    <Neg key="s-lang">Optimised for US/UK English. No native support for Arabic, Spanish, or Hindi callers.</Neg>,
    <Pos key="rx-lang"><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more, at no extra charge.</Pos>,
  ],
  [
    "Setup",
    <Neg key="s-setup">No-code, but you still design the agent, prompts, and flows yourself.</Neg>,
    <Pos key="rx-setup"><strong className="text-ink">Done-for-you.</strong> Tell us your menu and hours, point your number at it, live in minutes.</Pos>,
  ],
  [
    "Smart Call Routing",
    <Neg key="s-route">Basic routing available. Full escalation logic requires additional configuration.</Neg>,
    <Pos key="rx-route"><strong className="text-ink">Built-in smart routing.</strong> Hands the call to your team with the full transcript, zero customer repetition.</Pos>,
  ],
  [
    "Concurrent Calls",
    <Neg key="s-conc">Limited concurrent call capacity on lower plans. Higher plans required for the dinner rush.</Neg>,
    <Pos key="rx-conc"><strong className="text-ink">1,000+ concurrent calls</strong> handles the whole Friday rush at once.</Pos>,
  ],
  [
    "Support",
    <Neg key="s-sup">Support quality varies by plan tier. Lower plans get limited support access.</Neg>,
    <Pos key="rx-sup"><strong className="text-ink">Real support</strong> on every plan, with a dedicated success manager on Enterprise.</Pos>,
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
          <h1 className="h-section mt-4">Synthflow Alternative: An AI Phone Host Built for Restaurants</h1>
          <p className="lede mx-auto max-w-2xl mt-4">
            Synthflow is a generic voice-AI builder you configure yourself, with monthly minute caps. RhythmiqCX is the done-for-you AI phone host for restaurants: it books tables, takes orders, and answers in 12+ languages, on flat plans with no minute caps.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={BOOK_DEMO_URL} className="btn btn-accent">Book a free demo</Link>
            <Link href="/voice-ai" className="btn btn-ghost">Explore Voice AI <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <div className="wrap max-w-5xl pb-20 lg:pb-28 space-y-14">
        <section id="intro" className="text-center">
          <h2 className="h-feature mb-3">Why Restaurants Look for a Synthflow Alternative</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Synthflow is a capable, no-code voice-AI builder, but it is built for
            everyone, which means it is built for no one in particular. You design
            the call flows, write the prompts, and wire up your own ordering and
            reservation logic. Its plans start around $99/month with monthly minute
            caps, so a busy service can tip you into overages and an unpredictable
            bill. RhythmiqCX takes the opposite approach: it is a done-for-you AI
            phone host built specifically for restaurants. It already knows how to
            book a table, take a takeout order with modifiers, and answer the
            questions guests actually call about, in 12+ languages, on a flat plan
            with no minute meter running in the background.
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
                <li><strong className="text-ink">Built for restaurants</strong> reservations, orders, and menu Q&A out of the box</li>
                <li><strong className="text-ink">Takes the whole order</strong> modifiers and all, straight into your POS</li>
                <li><strong className="text-ink">Flat plans, no minute caps</strong> no overage anxiety on a busy night</li>
                <li><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more</li>
                <li>1,000+ concurrent calls for the dinner rush</li>
                <li>Done-for-you setup, live in minutes</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Not the cheapest generic builder it is a done-for-you product, priced like one</li>
                <li>Focused on hospitality, not a general-purpose voice platform</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-[14px]" style={{ border: "1px solid var(--line-soft)" }}>
              <h3 className="text-lg font-semibold text-[#C9461F] mb-3 text-center">Synthflow</h3>
              <h4 className="text-ink font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1F7A4D]" /> Pros</h4>
              <ul className="pl-5 list-disc text-ink2 space-y-1">
                <li>Established product with good US market presence</li>
                <li>Clean no-code interface for building voice agents</li>
                <li>Flexible for any industry, not just restaurants</li>
                <li>Lower entry price if your call volume is light</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Generic you build the reservation and ordering flows yourself</li>
                <li>Monthly minute caps overages make the real cost unpredictable</li>
                <li>No native Arabic, Spanish, or Hindi voice support</li>
                <li>Primarily US/UK market focused</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="why-rhythmiq" className="bg-paper2 p-6 lg:p-8 rounded-[14px] text-center">
          <h2 className="h-feature mb-3">Built for Restaurants, Not Assembled by You.</h2>
          <p className="text-ink2 max-w-3xl mx-auto mb-4 leading-[1.6]">
            If you run a restaurant and you are weighing Synthflow, the real
            question is not which builder is cheaper, it is whether you want to
            build and babysit a voice agent at all. RhythmiqCX is the phone host,
            already trained for hospitality, on a flat plan that does not punish you
            for a busy Friday.
          </p>
          <ul className="list-disc text-ink2 text-left max-w-3xl mx-auto space-y-1 pl-5">
            <li><strong className="text-ink">Restaurant-ready</strong> books tables and takes orders without you building flows</li>
            <li><strong className="text-ink">Flat, not minute-capped</strong> handle any volume without overage anxiety</li>
            <li><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more, no upcharge</li>
            <li><strong className="text-ink">Done-for-you</strong> live in minutes, not a build project</li>
          </ul>
        </section>

        <section id="conclusion" className="text-center">
          <h2 className="h-feature mb-3">Conclusion</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Synthflow is a solid general-purpose voice-AI builder. But if you run a
            restaurant and want the phone fully handled, orders, tables, and guest
            questions in any language, without assembling it yourself or watching a
            minute meter,{" "}
            <strong className="text-ink">RhythmiqCX is purpose-built for exactly that</strong>
            , on a flat plan with no caps.
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

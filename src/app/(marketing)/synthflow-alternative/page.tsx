import React from "react";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { BOOK_DEMO_URL } from "@/constants/links";

export const metadata = generateMetadata({
  title: "Synthflow Alternative for D2C Brands | RhythmiqCX Voice AI",
  description:
    "Synthflow is a generic voice AI builder you configure yourself, with monthly minute caps. RhythmiqCX is the done-for-you voice AI built for D2C brands: rescues failed deliveries, confirms COD orders, and answers in 12+ languages on flat plans with no minute caps.",
  keywords: [
    "Synthflow alternative",
    "Synthflow alternative for D2C ecommerce",
    "RhythmiqCX vs Synthflow",
    "voice AI for D2C brands",
    "D2C voice AI",
    "AI that confirms COD orders",
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
  headline: "Synthflow Alternative: RhythmiqCX Voice AI for D2C Brands",
  description:
    "Side-by-side comparison of RhythmiqCX and Synthflow covering D2C fit, order recovery, pricing model, minute caps, and languages.",
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
    "Built for D2C ecommerce",
    <Neg key="s-fit">A generic voice-AI builder. You design the call flows, prompts, and logic yourself, for any industry.</Neg>,
    <Pos key="rx-fit"><strong className="text-ink">Purpose-built for D2C ecommerce.</strong> Failed deliveries, returns, and COD orders work out of the box.</Pos>,
  ],
  [
    "Handles objections on the call",
    <Neg key="s-order">Possible, but you have to build and maintain the returns flow and OMS logic yourself.</Neg>,
    <Pos key="rx-order"><strong className="text-ink">Handles the whole objection.</strong> Swap, credit, or discount, written straight into your OMS.</Pos>,
  ],
  [
    "Pricing model",
    <Neg key="s-price">From $99/mo with monthly minute caps. A busy month triggers overages, so the real cost is unpredictable.</Neg>,
    <Pos key="rx-price"><strong className="text-ink">Flat plans from $499/mo.</strong> No minute caps, no surprise overage bills.</Pos>,
  ],
  [
    "Languages",
    <Neg key="s-lang">Optimised for US/UK English. No native support for Arabic, Spanish, or Hindi callers.</Neg>,
    <Pos key="rx-lang"><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more, at no extra charge.</Pos>,
  ],
  [
    "Setup",
    <Neg key="s-setup">No-code, but you still design the agent, prompts, and flows yourself.</Neg>,
    <Pos key="rx-setup"><strong className="text-ink">Done-for-you.</strong> Tell us your catalogue and policies, point your number at it, live in minutes.</Pos>,
  ],
  [
    "Smart Call Routing",
    <Neg key="s-route">Basic routing available. Full escalation logic requires additional configuration.</Neg>,
    <Pos key="rx-route"><strong className="text-ink">Built-in smart routing.</strong> Hands the call to your team with the full transcript, zero customer repetition.</Pos>,
  ],
  [
    "Concurrent Calls",
    <Neg key="s-conc">Limited concurrent call capacity on lower plans. Higher plans required for a sale-day spike.</Neg>,
    <Pos key="rx-conc"><strong className="text-ink">1,000+ concurrent calls</strong> handles a whole flash-sale spike at once.</Pos>,
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
          <h1 className="h-section mt-4">Synthflow Alternative: Voice AI Built for D2C Brands</h1>
          <p className="lede mx-auto max-w-2xl mt-4">
            Synthflow is a generic voice-AI builder you configure yourself, with monthly minute caps. RhythmiqCX is the done-for-you voice AI for D2C brands: it rescues failed deliveries, confirms COD orders, and answers in 12+ languages, on flat plans with no minute caps.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={BOOK_DEMO_URL} className="btn btn-accent">Book a free demo</Link>
            <Link href="/voice-ai" className="btn btn-ghost">Explore Voice AI <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <div className="wrap max-w-5xl pb-20 lg:pb-28 space-y-14">
        <section id="intro" className="text-center">
          <h2 className="h-feature mb-3">Why D2C Brands Look for a Synthflow Alternative</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Synthflow is a capable, no-code voice-AI builder, but it is built for
            everyone, which means it is built for no one in particular. You design
            the call flows, write the prompts, and wire up your own returns
            logic. Its plans start around $99/month with monthly minute
            caps, so real call volume can tip you into overages and an unpredictable
            bill. RhythmiqCX takes the opposite approach: it is a done-for-you voice
            AI built specifically for D2C ecommerce. It already knows how to
            rescue a failed delivery, confirm a COD order, and answer the
            questions customers actually call about, in 12+ languages, on a flat plan
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
                <li><strong className="text-ink">Built for D2C ecommerce</strong> failed deliveries, returns, and COD orders out of the box</li>
                <li><strong className="text-ink">Handles the whole objection</strong> swap, credit, or discount, straight into your OMS</li>
                <li><strong className="text-ink">Flat plans, no minute caps</strong> no overage anxiety on a busy day</li>
                <li><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more</li>
                <li>1,000+ concurrent calls for a sale-day spike</li>
                <li>Done-for-you setup, live in minutes</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Not the cheapest generic builder it is a done-for-you product, priced like one</li>
                <li>Focused on D2C ecommerce, not a general-purpose voice platform</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-[14px]" style={{ border: "1px solid var(--line-soft)" }}>
              <h3 className="text-lg font-semibold text-[#C9461F] mb-3 text-center">Synthflow</h3>
              <h4 className="text-ink font-medium mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4 text-[#1F7A4D]" /> Pros</h4>
              <ul className="pl-5 list-disc text-ink2 space-y-1">
                <li>Established product with good US market presence</li>
                <li>Clean no-code interface for building voice agents</li>
                <li>Flexible for any industry, not just D2C ecommerce</li>
                <li>Lower entry price if your call volume is light</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Generic you build the returns flows yourself</li>
                <li>Monthly minute caps overages make the real cost unpredictable</li>
                <li>No native Arabic, Spanish, or Hindi voice support</li>
                <li>Primarily US/UK market focused</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="why-rhythmiq" className="bg-paper2 p-6 lg:p-8 rounded-[14px] text-center">
          <h2 className="h-feature mb-3">Built for D2C Ecommerce, Not Assembled by You.</h2>
          <p className="text-ink2 max-w-3xl mx-auto mb-4 leading-[1.6]">
            If you run a D2C brand and you are weighing Synthflow, the real
            question is not which builder is cheaper, it is whether you want to
            build and babysit a voice agent at all. RhythmiqCX is the voice AI,
            already trained for D2C ecommerce, on a flat plan that does not punish you
            for a flash sale.
          </p>
          <ul className="list-disc text-ink2 text-left max-w-3xl mx-auto space-y-1 pl-5">
            <li><strong className="text-ink">D2C-ready</strong> rescues deliveries and confirms orders without you building flows</li>
            <li><strong className="text-ink">Flat, not minute-capped</strong> handle any volume without overage anxiety</li>
            <li><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more, no upcharge</li>
            <li><strong className="text-ink">Done-for-you</strong> live in minutes, not a build project</li>
          </ul>
        </section>

        <section id="conclusion" className="text-center">
          <h2 className="h-feature mb-3">Conclusion</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Synthflow is a solid general-purpose voice-AI builder. But if you run a
            D2C brand and want the call queue fully handled, deliveries, returns, and
            customer questions in any language, without assembling it yourself or watching a
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

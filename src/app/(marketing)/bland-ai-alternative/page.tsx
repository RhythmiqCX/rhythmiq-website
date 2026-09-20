import React from "react";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { BOOK_DEMO_URL } from "@/constants/links";

export const metadata = generateMetadata({
  title: "Bland AI Alternative for D2C Brands | RhythmiqCX Voice AI",
  description:
    "Bland AI is a per-minute, developer-first platform with enterprise friction. RhythmiqCX is the done-for-you voice AI for D2C brands: rescues failed deliveries, confirms COD orders, answers in 12+ languages, on flat plans from $499/mo with no contract.",
  keywords: [
    "Bland AI alternative",
    "Bland AI alternative for D2C ecommerce",
    "RhythmiqCX vs Bland AI",
    "no-code voice AI",
    "D2C voice AI",
    "AI that confirms COD orders",
  ],
  alternates: {
    canonical: "/bland-ai-alternative",
  },
  openGraph: {
    images: ["/icons/og-default.png"],
    type: "website",
  },
});

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Bland AI Alternative: RhythmiqCX Voice AI for D2C Brands",
  description:
    "Side-by-side comparison of RhythmiqCX and Bland AI covering D2C fit, order recovery, pricing, setup, and languages.",
  url: "https://rhythmiqcx.com/bland-ai-alternative",
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
    <Neg key="b-fit">A general-purpose, developer-first voice platform. You build the D2C logic yourself.</Neg>,
    <Pos key="rx-fit"><strong className="text-ink">Purpose-built for D2C ecommerce.</strong> Failed deliveries, returns, and COD orders out of the box.</Pos>,
  ],
  [
    "Handles objections on the call",
    <Neg key="b-order">Possible with engineering. You build and maintain the returns flow and OMS integration.</Neg>,
    <Pos key="rx-order"><strong className="text-ink">Handles the whole objection.</strong> Swap, credit, or discount, written into your OMS, no build required.</Pos>,
  ],
  [
    "Pricing model",
    <Neg key="b-price">Per-minute billing and enterprise plans. Costs scale with volume and the bill is hard to predict.</Neg>,
    <Pos key="rx-price"><strong className="text-ink">Flat plans from $499/mo.</strong> No per-minute meter, no enterprise contract, no surprise overage.</Pos>,
  ],
  [
    "Setup",
    <Neg key="b-setup">Developer integration and configuration. Tough for a non-technical D2C team.</Neg>,
    <Pos key="rx-setup"><strong className="text-ink">Done-for-you.</strong> Tell us your catalogue and policies, point your number at it, live in minutes.</Pos>,
  ],
  [
    "Languages",
    <Neg key="b-lang">Standard TTS may struggle with non-English callers. No D2C-tuned dialect support.</Neg>,
    <Pos key="rx-lang"><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more, at no extra charge.</Pos>,
  ],
  [
    "Smart Call Routing",
    <Neg key="b-route">Configurable via API, but requires development work to implement escalation flows.</Neg>,
    <Pos key="rx-route"><strong className="text-ink">Built-in smart routing.</strong> Hands the call to your team with the full transcript.</Pos>,
  ],
  [
    "Time to Go Live",
    <Neg key="b-time">Procurement, developer onboarding, and a custom integration build.</Neg>,
    <Pos key="rx-time"><strong className="text-ink">Minutes, not weeks.</strong> Most brands go live the same day they sign up.</Pos>,
  ],
  [
    "Support",
    <Neg key="b-sup">Enterprise support tier. Self-serve and smaller customers get limited options.</Neg>,
    <Pos key="rx-sup"><strong className="text-ink">Real support</strong> on every plan, with a dedicated success manager on Enterprise.</Pos>,
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
          <h1 className="h-section mt-4">Bland AI Alternative: Voice AI Built for D2C Brands</h1>
          <p className="lede mx-auto max-w-2xl mt-4">
            No developer, no per-minute meter, no enterprise contract. RhythmiqCX is the done-for-you voice AI that rescues deliveries and confirms orders, on a flat plan from $499/mo.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={BOOK_DEMO_URL} className="btn btn-accent">Book a free demo</Link>
            <Link href="/voice-ai" className="btn btn-ghost">Explore Voice AI <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <div className="wrap max-w-5xl pb-20 lg:pb-28 space-y-14">
        <section id="intro" className="text-center">
          <h2 className="h-feature mb-3">Why D2C Brands Look for a Bland AI Alternative</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Bland AI is a capable, enterprise-grade conversational voice platform,
            but it comes with enterprise friction. Getting started takes developer
            resources, the per-minute billing makes real call volume hard to forecast,
            and it is a toolkit rather than a finished product: you build the
            returns logic yourself. For a D2C brand that just
            needs the call queue answered, deliveries rescued, and orders confirmed, that is a lot
            of overhead. RhythmiqCX delivers the same core capability, human-like
            voice that handles real calls, as a done-for-you product built for
            D2C ecommerce, on a flat plan from $499/month with no developer required.
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
                <li><strong className="text-ink">Built for D2C ecommerce</strong> failed deliveries, returns, and COD orders out of the box</li>
                <li><strong className="text-ink">Flat plans, no per-minute meter</strong> no surprise bill on a busy day</li>
                <li><strong className="text-ink">No developer, no contract</strong> live in minutes</li>
                <li><strong className="text-ink">Handles the whole objection</strong> swap, credit, or discount, into your OMS</li>
                <li><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more</li>
                <li>1,000+ concurrent calls for a sale-day spike</li>
              </ul>
              <h4 className="text-ink font-medium mt-4 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4 text-ink3" /> Cons</h4>
              <ul className="pl-5 list-disc text-ink3 space-y-1">
                <li>Not a build-it-yourself developer toolkit</li>
                <li>Focused on D2C ecommerce, not a general-purpose platform</li>
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
                <li>Per-minute billing the cost is hard to predict at volume</li>
                <li>Enterprise friction and contracts to get started</li>
                <li>Requires a developer to set up and maintain</li>
                <li>You build the returns flows yourself</li>
                <li>No D2C-tuned Arabic, Spanish, or Hindi out of the box</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="why-rhythmiq" className="bg-paper2 p-6 lg:p-8 rounded-[14px] text-center">
          <h2 className="h-feature mb-3">Who Should Choose RhythmiqCX Over Bland AI?</h2>
          <p className="text-ink2 max-w-3xl mx-auto mb-4 leading-[1.6]">
            If you run a D2C brand and want the call queue fully handled this week, not
            after a procurement cycle and a developer build, RhythmiqCX is the
            answer. You get human-like voice, order recovery, and 24/7 coverage
            without the developer dependency, the per-minute billing roulette, or
            the enterprise contract.
          </p>
          <ul className="list-disc text-ink2 text-left max-w-3xl mx-auto space-y-1 pl-5">
            <li><strong className="text-ink">No developer needed</strong> done-for-you, not a build project</li>
            <li><strong className="text-ink">Predictable cost</strong> flat plans, not a per-minute meter</li>
            <li><strong className="text-ink">D2C-ready</strong> rescues deliveries and confirms orders out of the box</li>
            <li><strong className="text-ink">12+ languages included</strong> Arabic, Spanish, Hindi and more</li>
          </ul>
        </section>

        <section id="conclusion" className="text-center">
          <h2 className="h-feature mb-3">Conclusion</h2>
          <p className="text-ink2 max-w-3xl mx-auto leading-[1.6]">
            Bland AI is built for large enterprises with developer teams. RhythmiqCX
            is built for D2C brands,{" "}
            <strong className="text-ink">flat pricing, done-for-you, live in a day, and it actually recovers orders.</strong>{" "}
            If you want a Bland AI alternative without the procurement process, the
            choice is clear.
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

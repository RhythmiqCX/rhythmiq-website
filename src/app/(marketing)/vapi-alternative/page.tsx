import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";

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

export default function VapiAlternative() {
  return (
    <article className="max-w-5xl mx-auto p-6 prose prose-invert prose-headings:text-white text-white bg-background/80 rounded-2xl shadow-lg">
      <JsonLd schema={schema} />

      <header className="mb-8 border-b border-gray-700 pb-4 text-center">
        <h1 className="text-4xl font-bold text-white">
          Vapi AI Alternative One Platform vs Four Vendors
        </h1>
        <p className="text-gray-300 text-lg mt-2">
          Vapi requires 4–6 separate vendor contracts and bills $0.13–$0.31/min.
          RhythmiqCX is all-in-one at flat $29/mo.
        </p>
      </header>

      <section id="intro" className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-white">
          The Hidden Cost of Vapi
        </h2>
        <p>
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

      <section id="table" className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Feature Comparison
        </h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="mx-auto w-full max-w-5xl table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-800 text-gray-200">
                <th className="p-3 text-left font-semibold">Capability</th>
                <th className="p-3 text-left font-semibold">Vapi AI</th>
                <th className="p-3 text-left font-semibold">RhythmiqCX</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "True All-In Pricing",
                  <div
                    className="flex items-start gap-2 text-red-400"
                    key="v-price"
                  >
                    <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      $0.13–$0.31/min true cost once LLM + TTS + STT + telephony
                      vendor fees are added. Requires 4–6 contracts.
                    </span>
                  </div>,
                  <div
                    className="flex items-start gap-2 text-green-400"
                    key="rx-price"
                  >
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-green-300">
                        Flat $29/mo all-inclusive.
                      </strong>{" "}
                      AI, TTS, STT, and routing bundled. One invoice, one
                      vendor.
                    </span>
                  </div>,
                ],
                [
                  "Vendor Complexity",
                  <div
                    className="flex items-start gap-2 text-red-400"
                    key="v-vendor"
                  >
                    <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      Middleware layer you manage contracts with LLM, TTS, STT,
                      and telephony separately.
                    </span>
                  </div>,
                  <div
                    className="flex items-start gap-2 text-green-400"
                    key="rx-vendor"
                  >
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-green-300">
                        All-in-one platform.
                      </strong>{" "}
                      Everything managed by RhythmiqCX zero vendor juggling.
                    </span>
                  </div>,
                ],
                [
                  "HIPAA Compliance",
                  <div
                    className="flex items-start gap-2 text-red-400"
                    key="v-hipaa"
                  >
                    <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      HIPAA compliance is a $1,000/month add-on on top of
                      per-minute usage costs.
                    </span>
                  </div>,
                  <div
                    className="flex items-start gap-2 text-green-400"
                    key="rx-hipaa"
                  >
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-green-300">
                        Compliance-ready at standard pricing.
                      </strong>{" "}
                      Encrypted in transit and at rest, audit logs included.
                    </span>
                  </div>,
                ],
                [
                  "No-Code Setup",
                  <div
                    className="flex items-start gap-2 text-red-400"
                    key="v-setup"
                  >
                    <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      Developer-first. Non-technical teams can't configure or
                      maintain it without engineering help.
                    </span>
                  </div>,
                  <div
                    className="flex items-start gap-2 text-green-400"
                    key="rx-setup"
                  >
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-green-300">
                        No-code dashboard.
                      </strong>{" "}
                      Configure your AI persona and go live without writing a
                      line of code.
                    </span>
                  </div>,
                ],
                [
                  "Omnichannel",
                  <div
                    className="flex items-start gap-2 text-red-400"
                    key="v-omni"
                  >
                    <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      Voice only. No bundled web chat or WhatsApp channel.
                    </span>
                  </div>,
                  <div
                    className="flex items-start gap-2 text-green-400"
                    key="rx-omni"
                  >
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-green-300">
                        Voice + Chat + WhatsApp
                      </strong>{" "}
                      on one platform at no extra cost.
                    </span>
                  </div>,
                ],
                [
                  "Indian-English & Regional Voices",
                  <div
                    className="flex items-start gap-2 text-red-400"
                    key="v-lang"
                  >
                    <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      Depends on TTS vendor chosen. No built-in Indian-English
                      optimisation.
                    </span>
                  </div>,
                  <div
                    className="flex items-start gap-2 text-green-400"
                    key="rx-lang"
                  >
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-green-300">
                        Sarvam Bulbul v2 + Saarika v2.5
                      </strong>{" "}
                      purpose-built for Indian-English. 60+ languages.
                    </span>
                  </div>,
                ],
                [
                  "Smart Call Routing",
                  <div
                    className="flex items-start gap-2 text-red-400"
                    key="v-route"
                  >
                    <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      Custom routing requires additional development and
                      configuration work.
                    </span>
                  </div>,
                  <div
                    className="flex items-start gap-2 text-green-400"
                    key="rx-route"
                  >
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-green-300">
                        Built-in smart routing.
                      </strong>{" "}
                      Low-confidence calls auto-escalate to a human with full
                      transcript.
                    </span>
                  </div>,
                ],
                [
                  "Support",
                  <div
                    className="flex items-start gap-2 text-red-400"
                    key="v-sup"
                  >
                    <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      Developer community support. Issues may span multiple
                      vendors making root cause tricky.
                    </span>
                  </div>,
                  <div
                    className="flex items-start gap-2 text-green-400"
                    key="rx-sup"
                  >
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-green-300">
                        Single point of support.
                      </strong>{" "}
                      24×7 on email, phone, ticketing. One vendor responsible
                      for everything.
                    </span>
                  </div>,
                ],
              ].map(([cap, vapi, rhythm], i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/50"}
                >
                  <td className="p-3 text-gray-200 font-medium">{cap}</td>
                  <td className="p-3">{vapi}</td>
                  <td className="p-3">{rhythm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="pros-cons" className="mb-10">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Pros & Cons
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900/60 p-5 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-green-400 mb-2 text-center">
              RhythmiqCX
            </h3>
            <h4 className="text-green-300 font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Pros
            </h4>
            <ul className="pl-5 text-gray-300 space-y-1">
              <li>
                <strong>One vendor, one invoice</strong> no contract juggling
              </li>
              <li>
                <strong>Flat $29/mo</strong> true all-in cost, no hidden vendor
                fees
              </li>
              <li>
                <strong>HIPAA-aligned at standard pricing</strong> no $1K add-on
              </li>
              <li>
                <strong>No-code setup</strong> live in under a day
              </li>
              <li>
                <strong>Omnichannel included</strong> voice + chat + WhatsApp
              </li>
              <li>Single support contact for all issues</li>
              <li>Indian-English native via Sarvam models</li>
            </ul>
            <h4 className="text-green-300 font-medium mt-4 mb-2 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-gray-400" /> Cons
            </h4>
            <ul className="pl-5 text-gray-400 space-y-1">
              <li>Less LLM flexibility you use RhythmiqCX's model stack</li>
              <li>Smaller API surface for deep customisation</li>
            </ul>
          </div>
          <div className="bg-gray-900/60 p-5 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-red-400 mb-2 text-center">
              Vapi AI
            </h3>
            <h4 className="text-red-300 font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Pros
            </h4>
            <ul className="pl-5 text-gray-300 space-y-1">
              <li>Flexible LLM and TTS vendor choice</li>
              <li>Strong developer API</li>
              <li>Good for highly custom voice AI workflows</li>
            </ul>
            <h4 className="text-red-300 font-medium mt-4 mb-2 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-gray-400" /> Cons
            </h4>
            <ul className="pl-5 text-gray-400 space-y-1">
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

      <section
        id="why-rhythmiq"
        className="mb-10 bg-gray-900/70 p-6 rounded-xl border border-gray-700 text-center"
      >
        <h2 className="text-2xl font-semibold text-white mb-3">
          RhythmiqCX The Vapi Alternative That Just Works
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-4">
          Vapi gives you maximum control but maximum complexity. You become the
          systems integrator responsible for stitching together LLM, TTS, STT,
          and telephony and paying each vendor separately. RhythmiqCX packages
          everything you need into one product, one bill, and one support
          contact. For teams who want voice AI working today not after a month
          of vendor negotiations that's the better deal.
        </p>
        <ul className="list-disc text-gray-300 text-left max-w-3xl mx-auto space-y-1">
          <li>
            <strong>$29/mo flat</strong> vs true $0.13–$0.31/min all-in Vapi
            cost
          </li>
          <li>
            <strong>One vendor</strong> vs 4–6 contracts and invoices
          </li>
          <li>
            <strong>No HIPAA upcharge</strong> vs Vapi's $1,000/month add-on
          </li>
          <li>
            <strong>Omnichannel</strong> voice + WhatsApp + chat, bundled
          </li>
        </ul>
      </section>

      <section id="conclusion" className="mt-10 text-center">
        <h2 className="text-2xl font-semibold text-white mb-3">Conclusion</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Vapi is a good choice if you need full control over every component
          and have the engineering resources to manage a multi-vendor stack. But
          if you want{" "}
          <strong>
            predictable pricing, no vendor complexity, and an AI phone
            receptionist that's live in a day
          </strong>
          , RhythmiqCX is the clear Vapi alternative.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="https://calendly.com/ray-rhythmiqcx/30min"
            className="no-underline inline-block px-5 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition"
          >
            Book a Free Demo
          </a>
          <a
            href="/voice-ai"
            className="no-underline inline-block px-5 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-800 transition"
          >
            Explore Voice AI
          </a>
        </div>
      </section>
    </article>
  );
}

import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function RhythmiqComparison() {
  return (
    <article className="max-w-5xl mx-auto p-6 prose prose-invert prose-headings:text-white text-white bg-background/80 rounded-2xl shadow-lg">
      {/* Header */}
      <header className="mb-8 border-b border-gray-700 pb-4 text-center">
        <h1 className="text-4xl font-bold text-white">RhythmiqCX vs Tawk.to : Honest Comparison</h1>
        <p className="text-gray-300 text-lg mt-2">
          A concise side-by-side look to help you choose the right chat platform for your business.
        </p>
      </header>

      {/* 1. Intro */}
      <section id="intro" className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-white">Introduction : The Smart Upgrade for Teams Ready to Scale With AI</h2>
        <p>
When comparing chat platforms, the biggest decision often comes down to whether you want simplicity and zero
cost or depth, automation, and scalability. Tawk.to has earned popularity for its forever-free live chat that
helps businesses communicate instantly with customers. It’s a great entry-level choice for those who simply
need to respond to website visitors without worrying about budgets or limits. However, as customer
expectations grow and automation becomes key to scaling support and sales, the value of a platform that can
intelligently handle inquiries, qualify leads, and track performance becomes undeniable. That’s where
RhythmiqCX stands apart. Built as an AI-first chat platform, RhythmiqCX offers multilingual support, powerful
analytics, unlimited customization, and 24x7 premium assistance all designed to improve engagement and
conversions. While tawk.to focuses on providing accessible communication, RhythmiqCX is engineered for teams
that want to convert more demos, automate support, and measure ROI effortlessly. This comparison dives into
what sets them apart so you can choose the best fit for your growth goals.
</p>
      </section>

{/* 2. Differences table */}
  <>
      {/* 2. Differences table */}
      <section id="table" className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Feature Comparison
        </h2>

        {/* Logos Row */}
        <div className="flex justify-center items-center gap-12 mb-4">
          <div className="flex flex-col items-center">
            <img src="/images/tawk.png" alt="Tawk.to Logo" className="h-12 mb-2" />
            <span className="text-gray-300 text-sm font-medium">Tawk.to</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/icons/rhythmiq-icon.png" alt="RhythmiqCX Logo" className="h-12 mb-2" />
            <span className="text-gray-300 text-sm font-medium">RhythmiqCX</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="mx-auto w-full max-w-5xl table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-800 text-gray-200">
                <th className="p-3 text-left font-semibold">Capability</th>
                <th className="p-3 text-left font-semibold">Tawk.to</th>
                <th className="p-3 text-left font-semibold">RhythmiqCX</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Pricing Model",
                  <>
                    <div className="flex items-start gap-2 text-red-400">
                      <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        Fragmented  free base product but every add-on (AI, branding, video)
                        costs extra per website.
                      </span>
                    </div>
                  </>,
                  <>
                    <div className="flex items-start gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        Transparent all-in-one pricing ($29 / $79 / $299 or ₹1,999 / ₹4,999 / ₹24,999) with AI,
                        analytics, and support included.
                      </span>
                    </div>
                  </>,
                ],
                [
                  "AI Capabilities",
                  <>
                    <div className="flex items-start gap-2 text-red-400">
                      <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        Paid AI Assist: $29 plan = 1,000 messages, $99 plan = 5,000 messages, $399 plan = 20,000 messages.
                        <br />
                        <strong className="text-red-300">Expensive and limited!</strong>
                      </span>
                    </div>
                  </>,
                  <>
                    <div className="flex items-start gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        <strong className="text-green-300">5x more value:</strong> $29 = 5,000 messages, $79 = 10,000 messages, $299 = 25,000+ messages.
                        <br />
                        <strong className="text-green-300">Built-in multilingual AI support included!</strong>
                      </span>
                    </div>
                  </>,
                ],
                [
                  "Customization & Branding",
                  <>
                    <div className="flex items-start gap-2 text-red-400">
                      <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Branding removal costs $39/month extra.</span>
                    </div>
                  </>,
                  <>
                    <div className="flex items-start gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Full white-label customization included at no cost.</span>
                    </div>
                  </>,
                ],
                [
                  "Knowledge Base & Training",
                  <>
                    <div className="flex items-start gap-2 text-red-400">
                      <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        Limited web crawling: $29 = 500 pages, $99 = 2,000 pages, $399 = 10,000 pages.
                        <br />
                        <strong className="text-red-300">No custom document uploads!</strong>
                      </span>
                    </div>
                  </>,
                  <>
                    <div className="flex items-start gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        <strong className="text-green-300">Unlimited Knowledge Base Documents</strong> on every plan.
                        <br />
                        Upload PDFs, docs, FAQs - no limits or restrictions!
                      </span>
                    </div>
                  </>,
                ],
                [
                  "AI Agents (Simultaneous Conversations)",
                  <>
                    <div className="flex items-start gap-2 text-red-400">
                      <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        Limited simultaneous AI conversations: $29 = 3, $99 = 5, $399 = 10.
                        <br />
                        <strong className="text-red-300">Restricts how many customers AI can help at once!</strong>
                      </span>
                    </div>
                  </>,
                  <>
                    <div className="flex items-start gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        <strong className="text-green-300">More simultaneous AI conversations:</strong> $29 = 5, $79 = 10, $299 = 25.
                        <br />
                        <strong className="text-green-300">Handle more customers simultaneously!</strong>
                      </span>
                    </div>
                  </>,
                ],
                [
                  "Custom Integrations",
                  <>
                    <div className="flex items-start gap-2 text-red-400">
                      <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        Limited integration options. Custom integrations require additional development costs.
                        <br />
                        <strong className="text-red-300">You handle the integration work yourself!</strong>
                      </span>
                    </div>
                  </>,
                  <>
                    <div className="flex items-start gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        <strong className="text-green-300">Custom integrations included on higher tiers.</strong>
                        <br />
                        <strong className="text-green-300">We build and maintain integrations for you!</strong>
                      </span>
                    </div>
                  </>,
                ],
                [
                  "Analytics & Reporting",
                  <>
                    <div className="flex items-start gap-2 text-red-400">
                      <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Basic reporting with limited data visibility.</span>
                    </div>
                  </>,
                  <>
                    <div className="flex items-start gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Real-time analytics and lead conversion insights included.</span>
                    </div>
                  </>,
                ],
                [
                  "Overage Pricing (Extra Messages)",
                  <>
                    <div className="flex items-start gap-2 text-red-400">
                      <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        Expensive overages: $0.03 per message (Growth) and $100 per 5,000 messages (Enterprise).
                        <br />
                        <strong className="text-red-300">$30 per 1,000 messages vs our $15!</strong>
                      </span>
                    </div>
                  </>,
                  <>
                    <div className="flex items-start gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>
                        <strong className="text-green-300">50% cheaper overages:</strong> $15 per 1,000 messages (Basic/Growth), $10 per 1,000 (Enterprise).
                        <br />
                        <strong className="text-green-300">Up to 67% savings at Enterprise.</strong>
                        <br />
                        <strong className="text-green-300">Much more affordable scaling!</strong>
                      </span>
                    </div>
                  </>,
                ],
                [
                  "Support",
                  <>
                    <div className="flex items-start gap-2 text-red-400">
                      <XCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Community/ticket-only support unless on top tier.</span>
                    </div>
                  </>,
                  <>
                    <div className="flex items-start gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>24×7 email, web, phone and human support across all plans.</span>
                    </div>
                  </>,
                ],
              ].map(([cap, tawk, rhythm], i) => (
                <tr
                  key={cap}
                  className={`${i % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/50"}`}
                >
                  <td className="p-3 text-gray-200 font-medium">{cap}</td>
                  <td className="p-3">{tawk}</td>
                  <td className="p-3">{rhythm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Pros & Cons */}
      <section id="pros-cons" className="mb-10">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Pros & Cons</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* RhythmiqCX */}
          <div className="bg-gray-900/60 p-5 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-green-400 mb-2 text-center">
              RhythmiqCX
            </h3>
            <h4 className="text-green-300 font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Pros
            </h4>
            <ul className="pl-5 text-gray-300 space-y-1">
              <li><strong>More AI capacity for less:</strong> $29 = 5,000 messages, $79 = 10,000 messages, $299 = 25,000+ messages.</li>
              <li><strong>Cheaper overages:</strong> $15 per 1,000 (Basic/Growth), $10 per 1,000 (Enterprise) — up to 67% savings.</li>
              <li><strong>More simultaneous conversations:</strong> 5 / 10 / 25 vs 3 / 5 / 10.</li>
              <li><strong>Unlimited knowledge base:</strong> Upload unlimited docs vs Tawk.to's 500–10,000 page crawl limits.</li>
              <li><strong>Custom integrations on higher tiers:</strong> we build and maintain integrations for you.</li>
              <li>Transparent pricing  AI and analytics included in all tiers.</li>
              <li>AI-first, multilingual chat designed for conversions.</li>
              <li>Real-time analytics and agent fallback logic.</li>
              <li>24×7 human support across email, web, and phone.</li>
            </ul>

            <h4 className="text-green-300 font-medium mt-4 mb-2 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-gray-400" /> Cons
            </h4>
            <ul className="pl-5 text-gray-400 space-y-1">
              <li>Not free  entry starts at ₹1,999/month ($29/month).</li>
              <li>Advanced CRM integrations from Growth tier upward.</li>
            </ul>
          </div>

          {/* Tawk.to */}
          <div className="bg-gray-900/60 p-5 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-red-400 mb-2 text-center">
              Tawk.to
            </h3>
            <h4 className="text-red-300 font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Pros
            </h4>
            <ul className="pl-5 text-gray-300 space-y-1">
              <li>Free base tier.</li>
              <li>Simple setup for small websites.</li>
              <li>Optional add-ons for branding, AI, and video.</li>
            </ul>

            <h4 className="text-red-300 font-medium mt-4 mb-2 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-gray-400" /> Cons
            </h4>
            <ul className="pl-5 text-gray-400 space-y-1">
              <li>Expensive overages: $30 per 1,000 (Growth) and $20 per 1,000 (Enterprise).</li>
              <li>Lower AI message limits: 1,000 / 5,000 / 20,000.</li>
              <li>Fewer simultaneous AI conversations: 3 / 5 / 10.</li>
              <li>Knowledge base limits: 500 / 2,000 / 10,000 crawled pages; no doc uploads.</li>
              <li>Add-ons billed per property — scales poorly with growth.</li>
            </ul>
          </div>
        </div>
      </section>
    </>


      {/* 4. Why RhythmiqCX */}
      <section id="why-rhythmiq" className="mb-10 bg-gray-900/70 p-6 rounded-xl border border-gray-700 text-center">
        <h2 className="text-2xl font-semibold text-white mb-3">
          RhythmiqCX  The Smarter Low-Cost Alternative to Tawk.to
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-4">
          RhythmiqCX was built for teams that love the accessibility of free chat tools like Tawk.to 
          but want more reliability, built-in AI, and analytics without breaking the bank.
          You get predictable costs, automation that scales, and professional support from day one.
        </p>

        <ul className="list-disc text-gray-300 text-left max-w-3xl mx-auto space-y-1">
          <li><strong>5x more AI value:</strong> $29 gets 5,000 messages vs Tawk.to's 1,000 messages. $79 gets 10,000 vs their 5,000 messages. $299 gets 25,000+ vs their 20,000 messages.</li>
          <li><strong>Unlimited knowledge base:</strong> Upload unlimited documents vs Tawk.to's 500-10,000 page crawling limits.</li>
          <li><strong>Custom integrations on higher tiers:</strong> dedicated help to connect your CRM, data, and workflows.</li>
          <li><strong>Affordable growth path:</strong> start small, keep all core features  no need for costly add-ons.</li>
          <li><strong>AI included:</strong> every plan comes with multilingual AI and generous message quotas.</li>
          <li><strong>Conversion-ready:</strong> analytics, tracking, and reporting built for demo pipelines.</li>
          <li><strong>Enterprise feel at startup pricing:</strong> all essentials plus premium 24×7 support.</li>
        </ul>

        <p className="text-sm text-gray-500 italic mt-4">
          (Tawk.to remains a great free starter tool  but RhythmiqCX gives you serious capability at a still-affordable cost.)
        </p>
      </section>

      {/* 5. Conclusion */}
      <section id="conclusion" className="mt-10 text-center">
        <h2 className="text-2xl font-semibold text-white mb-3">Conclusion</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          If you just need basic, free live chat, Tawk.to is fine. But if you care about scale, AI coverage, and cost predictability, the choice is clear:
          <strong> RhythmiqCX gives 5x more AI messages on entry, more simultaneous AI conversations, unlimited knowledge base, and up to 67% cheaper overages.</strong>
          You’ll serve more customers, with better outcomes, at a lower total cost.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="https://calendly.com/ray-rhythmiqcx/30min"
            className="no-underline inline-block px-5 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition"
          >
            Try RhythmiqCX Demo
          </a>

          <a
            href="https://www.tawk.to/"
            className="no-underline inline-block px-5 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-800 transition"
          >
            Explore Tawk.to
          </a>
        </div>
      </section>
    </article>
  );
}

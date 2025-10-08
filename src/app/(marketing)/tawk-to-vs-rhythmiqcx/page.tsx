import React from "react";

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
cost or depth, automation, and scalability. tawk.to has earned popularity for its forever-free live chat that
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
<section id="table" className="mb-10 text-center">
  <h2 className="text-2xl font-semibold text-white mb-6">
    Feature Comparison
  </h2>

  {/* Logos Row */}
  <div className="flex justify-center items-center gap-12 mb-4">
    <div className="flex flex-col items-center">
      <img
        src="/images/tawk.png"
        alt="Tawk.to Logo"
        className="h-12 mb-2"
      />
      <span className="text-gray-300 text-sm font-medium">Tawk.to</span>
    </div>
    <div className="flex flex-col items-center">
      <img
        src="/icons/rhythmiq-icon.png"
        alt="RhythmiqCX Logo"
        className="h-12 mb-2"
      />
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
            "Price model",
            "Free core product; optional paid add-ons per property (branding removal, AI, voice/video).",
            "Low-cost paid plans: $29 / $79 / $299+ (Enterprise). Predictable pricing with AI message quota included.",
          ],
          [
            "Agents",
            "Unlimited human agents for free.",
            "Unlimited human + AI agents; included in all plans.",
          ],
          [
            "AI support",
            "Optional AI Assist add-on, billed per property.",
            "AI-first system multilingual support and included quotas (5k / 10k / 25k+).",
          ],
          [
            "Customization & branding",
            "$39/mo add-on to remove branding.",
            "Full customization and white-label branding included.",
          ],
          [
            "Analytics & reporting",
            "Basic reporting only.",
            "Detailed analytics and demo performance tracking built-in.",
          ],
          [
            "Support",
            "Community help docs; paid service options.",
            "24×7 premium support (email, phone, ticket).",
          ],
          [
            "Integrations",
            "Basic; requires custom scripting for advanced needs.",
            "Native CRM integrations on Growth+ plans.",
          ],
        ].map(([cap, Tawk, rhythm], i) => (
          <tr
            key={cap}
            className={`${
              i % 2 === 0 ? "bg-gray-900/50" : "bg-gray-800/50"
            }`}
          >
            <td className="p-3 text-gray-200 font-medium">{cap}</td>
            <td className="p-3 text-gray-400">{Tawk}</td>
            <td className="p-3 text-gray-300">{rhythm}</td>
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
            <h3 className="text-xl font-semibold text-indigo-400 mb-2 text-center">RhythmiqCX</h3>
            <h4 className="text-indigo-300 font-medium mb-2">Pros</h4>
            <ul className="list-disc pl-5 text-gray-300 space-y-1">
              <li>Low-cost, transparent pricing that includes AI usage.</li>
              <li>AI-first chat experience  built-in multilingual and lead qualification.</li>
              <li>Full customization with no “branding removal” upsell.</li>
              <li>Analytics designed to measure demo and conversion performance.</li>
              <li>24×7 premium support  no paywall for reliability.</li>
              <li>Scales smoothly for teams moving from startup to enterprise.</li>
            </ul>

            <h4 className="text-indigo-300 font-medium mt-4 mb-2">Cons</h4>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Not completely free  entry plan starts at $29/mo.</li>
              <li>Some advanced integrations require Growth+ tier.</li>
            </ul>
          </div>

          {/* Tawk.to */}
          <div className="bg-gray-900/60 p-5 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-amber-400 mb-2 text-center">Tawk.to</h3>
            <h4 className="text-amber-300 font-medium mb-2">Pros</h4>
            <ul className="list-disc pl-5 text-gray-300 space-y-1">
              <li>Completely free for unlimited agents.</li>
              <li>Quick setup  great for hobby projects or small sites.</li>
              <li>Flexible add-ons for branding, AI, and video chat.</li>
            </ul>

            <h4 className="text-amber-300 font-medium mt-4 mb-2">Cons</h4>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Fragmented add-ons  each property billed separately.</li>
              <li>AI, voice, and analytics require extra paid modules.</li>
              <li>Limited reporting for demo/conversion tracking.</li>
              <li>No included enterprise-grade support.</li>
            </ul>
          </div>
        </div>
      </section>

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
          <li><strong>Affordable growth path:</strong> start small, keep all core features  no need for costly add-ons.</li>
          <li><strong>AI included:</strong> every plan comes with multilingual AI and message quotas.</li>
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
          If your goal is to chat casually or just collect messages, Tawk.to is unbeatable for free.  
          If you’re growing a team and want predictable pricing, AI assistance, and real analytics that prove ROI   
          <strong>RhythmiqCX delivers all of that at a low monthly cost.</strong>
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

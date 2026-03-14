import BlogLayout from "@/components/marketing/BlogLayout";
import { generateMetadata } from "@/utils";
import Link from "next/link";

export const metadata = generateMetadata({
  title:
    "AI vs Remote vs In-Person Receptionist: The Real Comparison Nobody Wants to Have",
  description:
    "Stop guessing which receptionist setup is right for your business. AI vs remote vs in-person  the brutally honest, no-fluff breakdown with real tradeoffs, real numbers, and zero vendor spin.",
  alternates: {
    canonical: "/blog/ai-vs-remote-vs-inperson-receptionist",
  },
  openGraph: {
    images: ["/images/blog/14-03-26.jpg"],
    type: "article",
    publishedTime: "2026-03-14",
    authors: ["PV8"],
  },
});

const SECTIONS = [
  { id: "in-person", label: "The In-Person Receptionist" },
  { id: "remote", label: "The Remote Receptionist" },
  { id: "ai", label: "The AI Receptionist" },
  { id: "comparison", label: "Head-to-Head Comparison" },
  { id: "verdict", label: "The Decision Framework" },
];

const RELATED = [
  {
    title: "AI Phone Receptionist: Complete Guide for Small Business (2026)",
    href: "/blog/ai-phone-receptionist",
    imageSrc: "/images/blog/11-03-26.jpg",
    date: "March 11, 2026",
    description:
      "Everything small businesses need to know about AI phone receptionists in 2026. Real setup guide, honest comparison, and why RhythmiqCX is built differently.",
  },
  {
    title:
      "AI Virtual Receptionist vs Human Receptionist: Which One Actually Works Better?",
    href: "/blog/ai-virtual-receptionist-vs-human-receptionist",
    imageSrc: "/images/blog/07-03-26.jpg",
    date: "March 7, 2026",
    description:
      "A brutally honest comparison of AI virtual receptionists vs human receptionists. Learn how voice AI and autonomous support systems are transforming customer experience.",
  },
  {
    title: "AI Chatbot ROI for Small Businesses: Real Numbers, No Fluff",
    href: "/blog/ai-chatbot-roi",
    imageSrc: "/images/blog/12-03-26.jpg",
    date: "March 12, 2026",
    description:
      "AI chatbot ROI isn't a theory. It's a spreadsheet. Here's the real math behind what small businesses actually save, earn, and stop wasting.",
  },
];

const COMPARISON_ROWS = [
  {
    criteria: "Monthly Cost",
    inPerson: "$4,500–$6,000+",
    remote: "$500–$2,000",
    ai: "$99–$399",
    winner: "ai",
  },
  {
    criteria: "Availability",
    inPerson: "Business hours only",
    remote: "Extended (extra cost)",
    ai: "24/7/365, no exceptions",
    winner: "ai",
  },
  {
    criteria: "Scalability",
    inPerson: "Hire another person",
    remote: "Add seats (costs more)",
    ai: "Infinite concurrent calls",
    winner: "ai",
  },
  {
    criteria: "Business Context",
    inPerson: "Deep (if long tenure)",
    remote: "Shallow (script-based)",
    ai: "Configured precisely",
    winner: "tie-ip-ai",
  },
  {
    criteria: "Emotional Empathy",
    inPerson: "Genuine & adaptive",
    remote: "Good (when trained)",
    ai: "Improving, not perfect",
    winner: "inPerson",
  },
  {
    criteria: "Setup Time",
    inPerson: "Weeks (hire + onboard)",
    remote: "Days",
    ai: "Hours",
    winner: "ai",
  },
  {
    criteria: "Consistency",
    inPerson: "Varies by day/mood",
    remote: "Varies by rep",
    ai: "Identical every call",
    winner: "ai",
  },
  {
    criteria: "Turnover Risk",
    inPerson: "High",
    remote: "Medium",
    ai: "Zero",
    winner: "ai",
  },
  {
    criteria: "After-Hours Calls",
    inPerson: "Voicemail",
    remote: "Extra cost",
    ai: "Handled automatically",
    winner: "ai",
  },
  {
    criteria: "Multilingual",
    inPerson: "Depends on hire",
    remote: "Limited",
    ai: "Built-in",
    winner: "ai",
  },
];

const DECISION_QUESTIONS = [
  {
    q: "Does your business run on walk-in presence?",
    hint: "If physical first impressions are core to your product  a clinic, salon, showroom  in-person wins the front desk. Pair it with AI for overflow and after-hours.",
  },
  {
    q: "Are most of your inbound calls repetitive?",
    hint: "If more than half your calls follow a predictable pattern  scheduling, pricing, directions  you should not be paying human rates for that. That's what AI was built for.",
  },
  {
    q: "How much does a missed call actually cost you?",
    hint: "Pull your missed call data. Multiply by average deal value. The number will be uncomfortable. That's the number AI fixes.",
  },
];

export default function AIvsRemotevsInPersonBlog() {
  return (
    <BlogLayout
      category={{
        href: "/blog/category/customer-support",
        label: "Customer Support",
      }}
      date="2026-03-14"
      title="AI vs Remote vs In-Person Receptionist: The Real Comparison Nobody Wants to Have"
      excerpt="I run an AI receptionist company. You'd expect me to say 'AI wins, case closed.' But I've talked to enough business owners to know that bad fit beats bad technology every time. So here's the comparison I wish existed."
      authors={[{ avatar: "/icons/PV8.png", name: "PV8" }]}
      readingTime={9}
      heroImage={{
        src: "/images/blog/14-03-26.jpg",
        alt: "AI vs Remote vs In-Person Receptionist  The Real Comparison",
      }}
      sections={SECTIONS}
      relatedArticles={RELATED}
    >
      {/* ── INTRO ── */}
      <section className="mt-16 space-y-6">
        <p>
          Let me be upfront: <strong>I run an AI receptionist company.</strong>{" "}
          So you&apos;d expect me to say &ldquo;AI wins, case closed, delete
          LinkedIn.&rdquo; But here&apos;s the thing I&apos;ve talked to enough
          small business owners, clinic managers, and e-commerce founders to
          know that <em>bad fit beats bad technology every single time.</em> So
          instead of handing you a vendor brochure, I&apos;m going to give you
          the comparison I wish existed when I was building RhythmiqCX.
        </p>

        <p>
          Three options are on the table: an in-person receptionist sitting at
          your front desk, a remote human receptionist working from wherever
          they are, and an{" "}
          <Link
            href="/blog/ai-phone-receptionist"
            className="text-blue-400 underline"
          >
            AI phone receptionist
          </Link>{" "}
          that never sleeps, never calls in sick, and never gets annoyed when
          the fifth caller asks the exact same question. Let&apos;s find out
          which one actually <em>works</em> and for <em>whom</em>.
        </p>

        <blockquote className="border-l-4 border-white/30 pl-6 italic text-neutral-300 text-xl leading-relaxed">
          The best receptionist for your business isn&apos;t the most human one.
          It&apos;s the one that doesn&apos;t drop the ball at 6:47 PM on a
          Friday.
        </blockquote>
      </section>

      {/* ══════════════════════════════════════════
          PART 1  IN-PERSON
      ══════════════════════════════════════════ */}
      <section id="in-person" className="mt-24 space-y-6">
        <h2 className="text-4xl font-bold">
          The In-Person Receptionist: Warm, Wonderful, and Wildly Expensive
        </h2>

        <p>
          There&apos;s something genuinely delightful about walking into a
          business and being greeted by a real human who knows your name.
          It&apos;s the gold standard of first impressions. A great in-person
          receptionist is a brand ambassador, a mood-setter, and a multitasker
          all rolled into one.
        </p>
        <p>
          The problem? That gold standard comes with a gold price tag and a lot
          of hidden bronze.
        </p>

        <h3 className="text-xl font-semibold text-white pt-2">
          What you&apos;re actually paying for
        </h3>

        <p>
          A full-time receptionist in the US runs you anywhere from{" "}
          <strong className="text-white">$35,000–$55,000/yr</strong> in salary
          alone. Add benefits, payroll taxes, PTO, sick leave, and the
          occasional &ldquo;I quit, effective immediately&rdquo; and you&apos;re
          closer to <strong className="text-white">$60,000–$75,000/yr</strong>{" "}
          all-in. For a solo practice or a bootstrapped startup, that&apos;s not
          a hire. That&apos;s a bet.
        </p>
        <p>
          And here&apos;s the kicker nobody mentions in the job listing:
          they&apos;re only available 40 hours a week. Every call that lands
          outside those hours goes to voicemail and we&apos;ve{" "}
          <Link
            href="/blog/the-first-second"
            className="text-blue-400 underline"
          >
            already established what happens in the first second of a missed
            call
          </Link>
          . Spoiler: it&apos;s not good.
        </p>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 space-y-1">
          <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">
            Reality Check
          </span>
          <p className="text-neutral-300 text-sm leading-relaxed">
            The average small business misses 62% of calls that come in outside
            core business hours. An in-person receptionist doesn&apos;t solve
            that. It just gives you someone to blame.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-white pt-2">
          Where in-person genuinely wins
        </h3>

        <p>
          High-touch, walk-in environments. A luxury spa. A law office where
          clients are already stressed and need a human face. A dental clinic
          with complex paperwork. In these contexts, presence is the product.
          The warmth isn&apos;t just nice it&apos;s functional.
        </p>
        <p>
          But be honest with yourself: is that your business? Or are 80% of your
          inbound interactions just scheduling, directions, pricing questions,
          and &ldquo;can I speak to someone about X?&rdquo; Because if it&apos;s
          the latter, you&apos;re paying premium for a feature you&apos;re
          barely using.
        </p>
      </section>

      {/* ── CTA 1 ── */}
      {/* INSERT CTA COMPONENT HERE
          Suggested copy: "See what your AI receptionist can actually do.
          Hear it handle real calls. Ask it hard questions. It won't flinch."
          CTA Button: "Book a 30-Min Demo" → https://calendly.com/ray-rhythmiqcx/30min
      */}

      {/* ══════════════════════════════════════════
          PART 2  REMOTE
      ══════════════════════════════════════════ */}
      <section id="remote" className="mt-24 space-y-6">
        <h2 className="text-4xl font-bold">
          The Remote Receptionist: A Good Idea That Usually Becomes a Scheduling
          Headache
        </h2>

        <p>
          Remote receptionists became a thing because businesses wanted human
          warmth without the overhead of a full-time hire. Virtual receptionist
          services are actually pretty solid products on paper you pay per
          minute, you get a real person, you don&apos;t have to manage HR.{" "}
          <em>Chef&apos;s kiss.</em>
        </p>
        <p>In practice? Let me walk you through what actually happens.</p>

        <h3 className="text-xl font-semibold text-white pt-2">
          The handoff problem nobody talks about
        </h3>

        <p>
          Remote receptionists work off a script you provide. When a caller asks
          something outside that script, there&apos;s a pause. Then a &ldquo;Let
          me check on that for you.&rdquo; Then sometimes a transfer. Then
          sometimes a voicemail. <em>Every handoff is a friction point</em>, and
          friction on a phone call in 2026 feels like dial-up internet. People
          hang up. They go to your competitor. They leave a one-star review that
          says &ldquo;nobody knew what they were talking about.&rdquo;
        </p>
        <p>
          This isn&apos;t a knock on the humans it&apos;s a structural problem.
          A remote receptionist has no context about your business beyond what
          you gave them during onboarding. They don&apos;t know that &ldquo;the
          back unit&rdquo; refers to suite 4B, or that your pricing changed last
          Tuesday. They&apos;re working with outdated information, and your
          callers pay the price.
        </p>

        <h3 className="text-xl font-semibold text-white pt-2">
          The billing model will surprise you
        </h3>

        <p>
          Most remote receptionist services charge by the minute, starting
          around <strong className="text-white">$1–$3/min</strong>. A busy month
          with 200 calls averaging 3 minutes each? That&apos;s $600–$1,800
          before you&apos;ve even looked at what the calls were actually about.
          And a significant chunk of those calls? FAQs. Directions. Hours of
          operation. Stuff that, as we covered in{" "}
          <Link
            href="/blog/voice-ai-is-quietly-killing"
            className="text-blue-400 underline"
          >
            How Voice AI Is Quietly Killing FAQ Pages
          </Link>
          , an AI handles flawlessly at a fraction of the cost.
        </p>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 space-y-1">
          <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">
            The Math That Stings
          </span>
          <p className="text-neutral-300 text-sm leading-relaxed">
            A growing SMB spending $1,200/month on remote receptionist services
            is spending $14,400/year to answer questions that an AI could handle
            for under $200/month. That&apos;s not a feature gap. That&apos;s a
            spreadsheet problem.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-white pt-2">
          Where remote receptionists genuinely shine
        </h3>
        <p>
          Complex scheduling situations. Calls that require empathy,
          negotiation, or real-time judgment. Businesses that get a lot of
          &ldquo;I need to speak to someone&rdquo; calls where human escalation
          is the default, not the exception. Remote humans are great as a{" "}
          <em>second layer</em> not a first line.
        </p>
      </section>

      {/* ══════════════════════════════════════════
          PART 3  AI
      ══════════════════════════════════════════ */}
      <section id="ai" className="mt-24 space-y-6">
        <h2 className="text-4xl font-bold">
          The AI Receptionist: Bias Fully Declared, Arguments Still Honest
        </h2>

        <p>
          I&apos;m not going to pretend I&apos;m Switzerland here. I built
          RhythmiqCX because I believe AI phone receptionists are the right
          answer for most small and medium businesses in 2026. But I&apos;ve
          also been wrong before, and I&apos;m not interested in selling you
          something that doesn&apos;t fit. So here&apos;s the real picture.
        </p>

        <h3 className="text-xl font-semibold text-white pt-2">
          What an AI receptionist actually does well
        </h3>

        <p>
          It picks up every call. Every. Single. One. No call waiting, no
          &ldquo;can you hold?&rdquo;, no{" "}
          <em>&ldquo;sorry, she just stepped out.&rdquo;</em> The modern AI
          receptionist isn&apos;t just a glorified IVR tree it understands
          intent, handles follow-up questions, books appointments, and hands off
          to a human when the situation genuinely calls for it.
        </p>
        <p>
          It also doesn&apos;t have bad days. It doesn&apos;t get rattled by a
          rude caller at 4:55 PM on a Friday. And critically there&apos;s no
          &ldquo;she&apos;s on vacation this week.&rdquo; There&apos;s just:{" "}
          <em>the phone got answered.</em>
        </p>

        <h3 className="text-xl font-semibold text-white pt-2">
          The tradeoffs I won&apos;t hide from you
        </h3>

        <p>
          AI receptionists are not yet perfect at highly emotional calls. If
          someone is calling because they just got in an accident and
          they&apos;re scared a human voice with genuine empathy is better. Full
          stop.{" "}
          <Link
            href="/blog/voice-ai-vs-chatbots"
            className="text-blue-400 underline"
          >
            Voice AI can handle a lot, but empathy on demand is still its
            ceiling
          </Link>
          , not its floor.
        </p>
        <p>
          Setup matters enormously. A poorly configured AI receptionist bad
          prompt, missing business context, no escalation path will frustrate
          callers faster than voicemail. This is the part the demos don&apos;t
          show you. A demo sounds smooth. Production is where the edge cases
          live.
        </p>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 space-y-1">
          <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">
            Honest Caveat
          </span>
          <p className="text-neutral-300 text-sm leading-relaxed">
            If your business model depends on deeply empathetic, bespoke
            conversations for every caller healthcare triage, crisis counseling,
            high-stakes legal intake AI is a support layer, not a replacement.
            Pair it smart, not blindly.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-white pt-2">
          The ROI case is genuinely compelling
        </h3>

        <p>
          We ran the full numbers in our{" "}
          <Link href="/blog/ai-chatbot-roi" className="text-blue-400 underline">
            AI Chatbot ROI breakdown
          </Link>
          . The short version: most small businesses see a payback period under
          6 weeks when replacing or supplementing a remote receptionist service
          with AI. The math gets even better when you factor in{" "}
          <Link
            href="/blog/how-ai-save-time"
            className="text-blue-400 underline"
          >
            time saved on repetitive call handling
          </Link>{" "}
          we&apos;re talking 8–12 hours a week that your team gets back to do
          actual work.
        </p>
      </section>

      {/* ── CTA 2 ── */}
      {/* INSERT CTA COMPONENT HERE
          Suggested copy: "Your Front Desk, Running 24/7  Without the Overhead.
          No scripts to memorize. No shifts to cover. Just calls answered, appointments
          booked, and customers who don't hit voicemail."
          CTA Button: "See It Live  Book Demo" → https://calendly.com/ray-rhythmiqcx/30min
      */}

      {/* ══════════════════════════════════════════
          PART 4  COMPARISON TABLE
      ══════════════════════════════════════════ */}
      <section id="comparison" className="mt-24 space-y-6">
        <h2 className="text-4xl font-bold">
          Head-to-Head: The Comparison Table Nobody Made Honestly Until Now
        </h2>

        {/* Score Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {[
            {
              name: "In-Person",
              score: "6.5",
              tag: "Situational",
              tagClass: "bg-neutral-700/60 text-neutral-300",
            },
            {
              name: "Remote",
              score: "6.8",
              tag: "Useful Layer",
              tagClass: "bg-neutral-700/60 text-neutral-300",
            },
            {
              name: "AI",
              score: "8.9",
              tag: "Best Default",
              tagClass: "bg-green-500/10 text-green-400",
            },
          ].map(({ name, score, tag, tagClass }) => (
            <div
              key={name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center space-y-3"
            >
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                Overall Score
              </span>
              <p className="text-white font-bold text-lg">{name}</p>
              <p className="font-mono text-5xl font-bold text-white italic leading-none">
                {score}
              </p>
              <span
                className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block ${tagClass}`}
              >
                {tag}
              </span>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="text-left px-8 py-6 font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  Criteria
                </th>
                <th className="text-left px-8 py-6 font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  In-Person
                </th>
                <th className="text-left px-8 py-6 font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  Remote
                </th>
                <th className="text-left px-8 py-6 font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  AI (RhythmiqCX)
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map(
                ({ criteria, inPerson, remote, ai, winner }, i) => (
                  <tr
                    key={criteria}
                    className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}
                  >
                    <td className="px-8 py-6 text-white font-medium">
                      {criteria}
                    </td>
                    <td
                      className={`px-8 py-6 ${winner === "inPerson" || winner === "tie-ip-ai" ? "text-green-400 font-semibold" : "text-neutral-500"}`}
                    >
                      {inPerson}
                    </td>
                    <td className="px-8 py-6 text-neutral-500">{remote}</td>
                    <td
                      className={`px-8 py-6 ${winner === "ai" || winner === "tie-ip-ai" ? "text-green-400 font-semibold" : "text-neutral-400"}`}
                    >
                      {ai}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        <p>
          Notice I didn&apos;t rig that table. In-person wins on empathy and
          deep business context. Remote wins as a human overflow layer. AI wins
          on everything that scales, costs money, or happens outside 9–5.
          That&apos;s not spin that&apos;s just where the data lands.
        </p>
      </section>

      {/* ══════════════════════════════════════════
          PART 5  DECISION FRAMEWORK
      ══════════════════════════════════════════ */}
      <section id="verdict" className="mt-24 space-y-6">
        <h2 className="text-4xl font-bold">
          So What Should You Actually Do? The Decision Framework I&apos;d Use.
        </h2>

        <p>
          Here&apos;s my honest, zero-fluff framework. Answer three questions:
        </p>

        <div className="space-y-2 pt-2">
          {DECISION_QUESTIONS.map(({ q, hint }, i) => (
            <div
              key={i}
              className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <span className="shrink-0 font-mono text-2xl font-bold text-green-400 mt-6">
                {i + 1}.
              </span>
              <div className="space-y-1">
                <p className="text-white font-semibold">{q}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {hint}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p>
          If you answered those three questions and felt a little sick about the
          numbers that&apos;s the right reaction. Now do something with it.
        </p>

        <p>
          My take? For most small businesses in 2026, the right stack is:{" "}
          <strong>AI as the first line</strong>, smart escalation to a human
          (in-house or remote) for the edge cases. Not because humans
          aren&apos;t valuable but because humans are <em>too</em> valuable to
          spend their time answering &ldquo;what are your hours?&rdquo; for the
          400th time.
        </p>

        <p>
          The businesses that crack this aren&apos;t choosing one. They&apos;re
          stacking them smart. And if you want a full breakdown of what that
          hybrid looks like in practice, the{" "}
          <Link
            href="/blog/ai-virtual-receptionist-vs-human-receptionist"
            className="text-blue-400 underline"
          >
            AI vs Human Receptionist deep-dive
          </Link>{" "}
          is worth reading next. The ones that haven&apos;t figured it out?
          They&apos;re still losing calls to voicemail and wondering why their
          competitor is growing faster.
        </p>

        <blockquote className="border-l-4 border-white/30 pl-6 italic text-neutral-300 text-xl leading-relaxed">
          The future of front desk isn&apos;t human vs machine. It&apos;s
          knowing which calls need a heartbeat and which ones just need an
          answer.
        </blockquote>

        <p>
          And if you want help answering that specifically, for your business,
          with your numbers we&apos;re one conversation away. As we broke down
          in the{" "}
          <Link
            href="/blog/autonomous-customer-support"
            className="text-blue-400 underline"
          >
            autonomous customer support piece
          </Link>
          : the businesses winning with AI right now aren&apos;t the ones with
          the biggest budgets. They&apos;re the ones who stopped asking
          &ldquo;is AI worth it?&rdquo; and started asking exactly where it
          unlocks the most value.
        </p>
      </section>

      {/* ── FINAL CTA ── */}
      {/* INSERT CTA COMPONENT HERE
          Suggested copy: "Stop Losing Calls to Voicemail. Start With RhythmiqCX.
          Takes minutes to set up. Handles calls from day one.
          No scripts, no shifts, no surprises."
          CTA Button: "Book Your Free Demo" → https://calendly.com/ray-rhythmiqcx/30min
          Secondary: "Explore RhythmiqCX →" → /
      */}
      <section className="mt-24 pb-20">
        <div className="rounded-3xl border-2 border-white/10 bg-gradient-to-br from-neutral-900 to-black p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Stop Losing Calls to Voicemail. Start With RhythmiqCX.
          </h2>
          <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
            Takes minutes to set up. Handles calls from day one. No scripts, no
            shifts, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="https://calendly.com/ray-rhythmiqcx/30min"
              className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-neutral-200 transition"
            >
              Book Your Free Demo
            </a>
            <Link
              href="/"
              className="border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/5 transition"
            >
              Explore RhythmiqCX →
            </Link>
          </div>
        </div>
      </section>
    </BlogLayout>
  );
}

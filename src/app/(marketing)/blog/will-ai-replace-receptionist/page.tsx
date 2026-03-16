import BlogLayout from "@/components/marketing/BlogLayout";
import { generateMetadata } from "@/utils";
import Link from "next/link";

export const metadata = generateMetadata({
  title:
    "Will AI Replace Receptionists? The Honest 2026 Answer Nobody's Giving You",
  description:
    "Will AI replace receptionists in 2026? A founder-driven, strongly opinionated breakdown of what's actually happening with real data on the best AI voice for virtual receptionists.",
  alternates: {
    canonical: "/blog/will-ai-replace-receptionists",
  },
  openGraph: {
    images: ["/images/blog/16-03-26.jpg"],
    type: "article",
    publishedTime: "2026-03-16",
    authors: ["PV8"],
  },
});

const SECTIONS = [
  { id: "kill-the-binary", label: "It's Not AI vs Human" },
  { id: "what-ai-does", label: "What AI Actually Does" },
  { id: "best-ai-voice", label: "Best AI Voice What Matters" },
  { id: "real-cost", label: "The Real Cost Comparison" },
  { id: "final-answer", label: "My Final, Unfiltered Take" },
];

const RELATED = [
  {
    title: "AI Phone Receptionist: Complete Guide for Small Business (2026)",
    href: "/blog/ai-phone-receptionist",
    imageSrc: "/images/blog/14-03-26.jpg",
    date: "March 14, 2026",
    description:
      "Everything small businesses need to know about AI phone receptionists in 2026. Real setup guide, honest comparison, and why RhythmiqCX is built differently.",
  },
  {
    title: "AI Chatbot ROI for Small Businesses: Real Numbers, No Fluff",
    href: "/blog/ai-chatbot-roi",
    imageSrc: "/images/blog/12-03-26.jpg",
    date: "March 11, 2026",
    description:
      "AI chatbot ROI isn't a theory. It's a spreadsheet. Here's the real math behind what small businesses actually save, earn, and stop wasting.",
  },
  {
    title: "How AI Saves You 10+ Hours a Week (Real Examples, Zero Hype)",
    href: "/blog/how-ai-save-time",
    imageSrc: "/images/blog/10-03-26.jpg",
    date: "March 10, 2026",
    description:
      "A founder-driven breakdown of exactly where AI saves real time every week specific tools, real scenarios, and no productivity theater.",
  },
];

const VOICE_SCORES = [
  {
    name: "RhythmiqCX",
    score: "9.4",
    tag: "Top Rated",
    variant: "win",
    desc: "Sub-300ms latency, full context memory, tonal range across caller types",
  },
  {
    name: "Competitor A",
    score: "7.1",
    tag: "Decent Demo",
    variant: "mid",
    desc: "Good voice quality, but state loss on rescheduling scenarios",
  },
  {
    name: "Competitor B",
    score: "6.8",
    tag: "FAQ-Only",
    variant: "mid",
    desc: "Great for FAQs. Falls apart the moment a caller goes off-script",
  },
  {
    name: "Legacy IVR",
    score: "3.2",
    tag: "Dead Weight",
    variant: "lose",
    desc: "Customers hate it. Always have. Always will. Time to let go.",
  },
];

const COST_ROWS = [
  {
    criteria: "Monthly Cost",
    human: "$3,800–$5,500",
    ai: "$99–$399",
    winner: "ai",
  },
  {
    criteria: "After-Hours Coverage",
    human: "Voicemail (lost leads)",
    ai: "24/7, zero gaps",
    winner: "ai",
  },
  {
    criteria: "Concurrent Calls",
    human: "1 at a time",
    ai: "Unlimited",
    winner: "ai",
  },
  {
    criteria: "Consistency",
    human: "Varies by day/mood",
    ai: "Identical every call",
    winner: "ai",
  },
  {
    criteria: "Turnover Risk",
    human: "High (avg. 14 months)",
    ai: "Zero",
    winner: "ai",
  },
  {
    criteria: "Setup Time",
    human: "Weeks to hire + onboard",
    ai: "Hours",
    winner: "ai",
  },
  {
    criteria: "Multilingual",
    human: "Only what they speak",
    ai: "Built-in",
    winner: "ai",
  },
  {
    criteria: "Deep Empathy",
    human: "Genuine & adaptive",
    ai: "Good, not perfect",
    winner: "human",
  },
  {
    criteria: "Complex Edge Cases",
    human: "Handles in real time",
    ai: "Escalates intelligently",
    winner: "human",
  },
];

const DECISION_QUESTIONS = [
  {
    q: "What percentage of your calls are genuinely repetitive?",
    hint: "If it's more than 60% and it almost certainly is you're losing money every day you don't have an AI layer. Pull the call logs. Count the repeat questions.",
  },
  {
    q: "How many calls are you missing after hours right now?",
    hint: "Check your missed call data for the last 30 days. Multiply by your average deal value. That's not a statistic. That's a leaked revenue line item.",
  },
  {
    q: "What would your human receptionist do with 3 freed-up hours a day?",
    hint: "Better client onboarding? Proactive follow-ups? Actual relationship building? That's the real ROI the value unlocked when humans stop doing robot work.",
  },
];

export default function WillAIReplaceReceptionistsBlog() {
  return (
    <BlogLayout
      category={{
        href: "/blog/category/Tech",
        label: "Tech",
      }}
      date="2026-03-16"
      title="Will AI Replace Receptionists? The Honest 2026 Answer Nobody's Giving You"
      excerpt="Every receptionist has Googled this at 11pm. I get it. But the answers are either corporate-sanitized or doom-scrolly clickbait. Here's what's actually happening from someone building the thing that's supposedly doing the replacing."
      authors={[{ avatar: "/icons/PV8.png", name: "PV8" }]}
      readingTime={10}
      heroImage={{
        src: "/images/blog/16-03-26.jpg",
        alt: "Will AI Replace Receptionists? The Honest 2026 Answer",
      }}
      sections={SECTIONS}
      relatedArticles={RELATED}
    >
      <section className="mt-16 space-y-6">
        <p>
          Every receptionist I&apos;ve ever spoken to has Googled &ldquo;will AI
          replace receptionists&rdquo; at least once. Usually at 11pm. Usually
          right after their boss mentioned an AI demo they saw at some
          conference. I get it. The anxiety is real. But the <em>answer</em>{" "}
          everyone&apos;s giving is either corporate-sanitized (&ldquo;AI is
          just a tool!&rdquo;) or doom-scrolly clickbait (&ldquo;YOUR JOB IS
          GONE BY TUESDAY&rdquo;).
        </p>

        <p>
          Neither is true. Here&apos;s what&apos;s <em>actually</em> happening
          from someone building the thing that&apos;s supposedly doing the
          replacing.
        </p>

        <blockquote className="border-l-4 border-white/30 pl-6 italic text-neutral-300 text-xl leading-relaxed">
          AI isn&apos;t replacing good receptionists. It&apos;s replacing the
          parts of the job that were quietly making everyone miserable including
          the receptionist.
        </blockquote>

        <p>
          We&apos;ve covered a lot of this territory in our{" "}
          <Link
            href="/blog/ai-phone-receptionist"
            className="text-blue-400 underline"
          >
            complete guide to AI phone receptionists
          </Link>{" "}
          and the raw numbers behind{" "}
          <Link href="/blog/ai-chatbot-roi" className="text-blue-400 underline">
            AI chatbot ROI for small businesses
          </Link>
          . This post goes deeper on the question nobody wants to ask out loud.
        </p>
      </section>

      <section id="kill-the-binary" className="mt-24 space-y-6">
        <h2 className="text-4xl font-bold">
          Let&apos;s Kill the Binary. It&apos;s Not &ldquo;AI vs Human.&rdquo;
          It&apos;s &ldquo;AI + Human vs Everyone Else.&rdquo;
        </h2>

        <p>
          The question &ldquo;will AI replace receptionists?&rdquo; is the wrong
          question. It&apos;s like asking in 2010 &ldquo;will GPS replace
          drivers?&rdquo; GPS didn&apos;t replace drivers. It made bad drivers
          into decent ones and decent drivers into great ones. The ones who got
          replaced were the ones who refused to use it.
        </p>

        <p>
          The <strong>AI virtual receptionist</strong> space in 2026 isn&apos;t
          about eliminating humans from the front desk. It&apos;s about
          eliminating the <em>worst parts</em> of the front desk job the parts
          nobody signed up for:
        </p>

        <div className="space-y-2 pl-1">
          {[
            'Answering "what are your hours?" for the 300th time this month',
            "Getting yelled at because the hold music is bad",
            "Missing calls while helping someone at the counter",
            "Manually entering appointment bookings that could just… book themselves",
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-3 items-start text-neutral-300 text-sm leading-relaxed"
            >
              <span className="text-red-400 font-bold mt-4 shrink-0"></span>
              <p className="m-0">{item}</p>
            </div>
          ))}
        </div>

        <p>
          Here&apos;s my strong opinion, and I&apos;m sticking to it:{" "}
          <strong>
            any business that replaces their entire human front desk with AI and
            calls it &ldquo;done&rdquo; is making a brand mistake, not a cost
            saving.
          </strong>{" "}
          Customers notice. Always. But any business in 2026 running their front
          desk on pure human power alone no AI layer, no after-hours coverage,
          no automation is bleeding leads every single night.
        </p>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 space-y-2">
          <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">
            The Real Answer
          </span>
          <p className="text-neutral-300 text-sm leading-relaxed">
            AI replaces the <em>tasks</em>. Humans own the <em>relationship</em>
            . The businesses winning right now are the ones who figured out
            which is which and stopped paying human rates for robot work.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PART 2 WHAT AI ACTUALLY DOES
      ══════════════════════════════════════════ */}
      <section id="what-ai-does" className="mt-24 space-y-6">
        <h2 className="text-4xl font-bold">
          What an AI Receptionist Actually Does in 2026 (No Demo Magic, Real
          Production)
        </h2>

        <p>
          Let me tell you what a properly-built <strong>AI receptionist</strong>{" "}
          looks like in the wild not in a polished vendor demo, but in actual
          production at a real business.
        </p>

        <p>
          It&apos;s 8:43 PM on a Thursday. A potential patient calls a dental
          clinic. The front desk closed at 6. Old world: voicemail. Patient
          calls the competitor down the street who has after-hours.{" "}
          <em>
            You just lost a patient worth $3,000 in lifetime value to your
            voicemail greeting.
          </em>
        </p>

        <p>
          New world with an AI virtual receptionist: the call gets answered in
          under a second. The AI asks how it can help. The patient says they
          need a cleaning and a consult for a crown. The AI checks availability,
          books the appointment, confirms the time via SMS, and tells the
          patient what to bring. Total call time: 2 minutes and 14 seconds. Zero
          human involvement needed.
        </p>

        <p>
          That&apos;s not science fiction. That&apos;s what we do at RhythmiqCX
          every day. And it&apos;s also exactly what we laid out in our{" "}
          <Link
            href="/blog/ai-phone-receptionist"
            className="text-blue-400 underline"
          >
            complete AI phone receptionist guide
          </Link>{" "}
          the setup, the configuration, the stuff that actually matters.
        </p>

        <h3 className="text-xl font-semibold text-white pt-2">
          What it does NOT do (and I&apos;d rather you heard this from me)
        </h3>

        <p>
          It doesn&apos;t handle genuinely emotional calls perfectly. If someone
          is calling because they&apos;re scared about a diagnosis that&apos;s a
          human moment. AI can answer, triage, and route. But it shouldn&apos;t
          try to be the emotional support. That&apos;s not a limitation
          we&apos;re hiding. It&apos;s a design choice we&apos;re proud of. Know
          the lane. Stay in it.
        </p>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 space-y-2">
          <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">
            The 80/20 of Reception Calls
          </span>
          <p className="text-neutral-300 text-sm leading-relaxed">
            In our data across hundreds of businesses: roughly{" "}
            <strong className="text-white">78% of inbound calls</strong> are
            fully handleable by AI scheduling, FAQs, directions, pricing, status
            updates, rescheduling. The other 22% benefit from a human.{" "}
            <strong className="text-white">
              Stop paying human rates for the 78%.
            </strong>
          </p>
        </div>
      </section>

      <section id="best-ai-voice" className="mt-24 space-y-6">
        <h2 className="text-4xl font-bold">
          Best AI Voice for Virtual Receptionists: What Actually Matters (And
          What&apos;s Just Marketing)
        </h2>

        <p>
          OK so you&apos;re sold on the concept. Now you&apos;re Googling
          &ldquo;best AI voice for virtual receptionists&rdquo; and you&apos;re
          drowning in comparison articles written by people who have never
          actually deployed one in production. Let me cut through it.
        </p>

        <p>
          There are three things that determine whether an AI voice{" "}
          <em>works</em> for virtual reception tasks and only one of them shows
          up in demos:
        </p>

        <h3 className="text-xl font-semibold text-white pt-2">
          Latency The thing that kills trust before a word is spoken
        </h3>
        <p>
          When you call a business and there&apos;s a 1.5-second pause before
          the AI responds you immediately feel like you&apos;re talking to a
          broken robot. Sub-500ms response latency is table stakes in 2026. If a
          vendor can&apos;t hit that in production (not demo), walk away. We
          laid out{" "}
          <Link
            href="/blog/ai-phone-receptionist"
            className="text-blue-400 underline"
          >
            exactly what to look for in latency benchmarks
          </Link>{" "}
          worth reading before you sign anything.
        </p>

        <h3 className="text-xl font-semibold text-white pt-2">
          Tonal Range Does it sound like a person or a voicemail?
        </h3>
        <p>
          The <strong>best rated AI virtual receptionist voice</strong>{" "}
          platforms in 2026 have solved robotic monotone. The real
          differentiator now is <em>tonal range</em> can the voice slow down for
          a confused elderly caller? Can it match urgency when someone says
          &ldquo;I need this today&rdquo;? Can it handle &ldquo;actually, never
          mind&rdquo; gracefully? That&apos;s what separates the{" "}
          <strong>top-rated AI voice for virtual reception</strong> from the
          also-rans.
        </p>

        <h3 className="text-xl font-semibold text-white pt-2">
          Context Memory Does it remember what was said 30 seconds ago?
        </h3>
        <p>
          This is where most of the so-called{" "}
          <strong>best AI voice platforms for virtual receptionists</strong>{" "}
          quietly fall apart in production. The demo sounds great. Then your
          caller says &ldquo;actually, make that Tuesday instead of
          Monday&rdquo; and the AI treats it like a brand new conversation.
          State loss. Trust gone. Caller annoyed. We&apos;ve written about how{" "}
          <Link
            href="/blog/how-ai-save-time"
            className="text-blue-400 underline"
          >
            this hidden friction quietly kills hours of recovered productivity
          </Link>{" "}
          before it&apos;s even noticed.
        </p>

        {/* Voice Score Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {VOICE_SCORES.map(({ name, score, tag, variant, desc }) => (
            <div
              key={name}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3"
            >
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
                Score
              </span>
              <p className="text-white font-bold">{name}</p>
              <p
                className={`font-mono text-4xl font-bold italic leading-none ${
                  variant === "win"
                    ? "text-green-400"
                    : variant === "lose"
                      ? "text-red-400"
                      : "text-neutral-400"
                }`}
              >
                {score}
              </p>
              <span
                className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block ${
                  variant === "win"
                    ? "bg-green-500/10 text-green-400"
                    : variant === "lose"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-white/10 text-neutral-400"
                }`}
              >
                {tag}
              </span>
              <p className="text-neutral-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <p>
          The full breakdown on voice criteria tonal range, latency testing, and
          the demo illusion is in our{" "}
          <Link
            href="/blog/how-to-choose-the-best-ai-voice-for-virtual-receptionists"
            className="text-blue-400 underline"
          >
            How to Choose the Best AI Voice for Virtual Receptionists
          </Link>{" "}
          guide. If you&apos;re evaluating vendors right now, read it before
          your next demo call.
        </p>
      </section>

      <section id="real-cost" className="mt-24 space-y-6">
        <h2 className="text-4xl font-bold">
          The Real Cost Comparison: What Nobody Puts in the Brochure
        </h2>

        <p>
          Here&apos;s the comparison every business owner needs to see not the
          one in the vendor deck, but the one built from real numbers. And since
          we just published the{" "}
          <Link href="/blog/ai-chatbot-roi" className="text-blue-400 underline">
            definitive AI chatbot ROI breakdown for small businesses
          </Link>
          , I&apos;ll spare you the full math lesson and just give you the table
          that matters.
        </p>

        {/* Cost Comparison Table */}
        <div className="overflow-x-auto px-4 rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="text-left p-4 font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  Criteria
                </th>
                <th className="text-left p-4 font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  Human Receptionist
                </th>
                <th className="text-left p-4 font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  AI Receptionist
                </th>
              </tr>
            </thead>
            <tbody>
              {COST_ROWS.map(({ criteria, human, ai, winner }, i) => (
                <tr
                  key={criteria}
                  className={`border-b border-white/5 ${
                    i % 2 === 0 ? "" : "bg-white/[0.02]"
                  }`}
                >
                  <td className="p-4 text-white font-medium">{criteria}</td>
                  <td
                    className={`p-4 ${
                      winner === "human"
                        ? "text-green-400 font-semibold"
                        : "text-red-400"
                    }`}
                  >
                    {human}
                  </td>
                  <td
                    className={`p-4 ${
                      winner === "ai"
                        ? "text-green-400 font-semibold"
                        : "text-neutral-500"
                    }`}
                  >
                    {ai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Look at that table and tell me the bottom two rows justify the cost
          delta in the top seven. For most businesses? They don&apos;t. And we
          also ran the time-saving math in our{" "}
          <Link
            href="/blog/how-ai-save-time"
            className="text-blue-400 underline"
          >
            AI saves 10+ hours a week breakdown
          </Link>{" "}
          the call-handling time savings alone often justify the tool cost in
          week one.
        </p>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 space-y-2">
          <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">
            The Number That Changes Everything
          </span>
          <p className="text-neutral-300 text-sm leading-relaxed">
            If your business gets 15 after-hours calls a week and converts even
            20% of them, at an average deal value of $400 that&apos;s{" "}
            <strong className="text-white">
              $624 in recovered revenue per month
            </strong>
            . An AI receptionist at $200/month just paid for itself 3× over.
            Every. Single. Month.
          </p>
        </div>
      </section>

      {/* ── CTA 2 ── */}
      {/* INSERT CTA COMPONENT HERE CTA 2 (Post Comparison)
          Suggested copy: "Run the actual numbers for YOUR business.
          We'll do the ROI math with you live in 30 minutes."
          CTA Button: "Get My Free ROI Estimate" → https://calendly.com/ray-rhythmiqcx/30min
      */}

      {/* ══════════════════════════════════════════
          PART 5 FINAL ANSWER
      ══════════════════════════════════════════ */}
      <section id="final-answer" className="mt-24 space-y-6 pb-4">
        <h2 className="text-4xl font-bold">
          So Will AI Replace Receptionists? My Final, Unfiltered Take.
        </h2>

        <p>
          Yes. And no. And it depends entirely on what you mean by
          &ldquo;replace.&rdquo;
        </p>

        <div className="space-y-3 pt-1 mt-5">
          {[
            {
              q: "Will AI replace the task of answering FAQs at 9 PM?",
              a: "Absolutely. Already happening. Already paying for itself.",
              verdict: "yes",
            },
            {
              q: "Will AI replace the warm handshake when a nervous patient walks in?",
              a: "Not in my lifetime. Nor should it try.",
              verdict: "no",
            },
            {
              q: "Will AI replace the role of receptionist entirely?",
              a: "For some businesses, in some contexts yes, completely. For most no. It reshapes it.",
              verdict: "depends",
            },
          ].map(({ q, a, verdict }) => (
            <div
              key={q}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <span
                className={`shrink-0 font-mono text-xs font-bold uppercase tracking-widest px-2 py-1 rounded h-fit mt-4 ${
                  verdict === "yes"
                    ? "bg-green-500/10 text-green-400"
                    : verdict === "no"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {verdict === "yes"
                  ? "Yes"
                  : verdict === "no"
                    ? "No"
                    : "Depends"}
              </span>
              <div className="space-y-1">
                <p className="text-white font-semibold text-sm">{q}</p>
                <p className="text-neutral-500 text-xs leading-relaxed">{a}</p>
              </div>
            </div>
          ))}
        </div>

        <p>
          The receptionist who fights AI because they&apos;re scared of it will
          eventually be replaced <em>by a different receptionist</em> one who
          works alongside AI and handles 3× the client load with half the
          stress. That&apos;s just how tools work. The best ones don&apos;t make
          you obsolete. They make the version of you that uses them unstoppable.
        </p>

        <blockquote className="border-l-4 border-white/30 pl-6 italic text-neutral-300 text-xl leading-relaxed">
          The future of the front desk isn&apos;t AI or human. It&apos;s an AI
          that handles the volume and a human who handles the moments that
          matter.
        </blockquote>

        <h3 className="text-xl font-semibold text-white pt-2">
          The 3-question test before you make any decision
        </h3>

        <div className="space-y-3">
          {DECISION_QUESTIONS.map(({ q, hint }, i) => (
            <div
              key={i}
              className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="space-y-1">
                <p className="text-white font-semibold text-sm">{q}</p>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  {hint}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p>
          If you answered those questions and felt that uncomfortable mix of
          &ldquo;oh no&rdquo; and &ldquo;oh wait, this could actually
          help&rdquo; that&apos;s exactly the right place to be. That&apos;s
          where every business that&apos;s figured this out started.
        </p>

        <p>
          At RhythmiqCX, we don&apos;t sell AI to cut headcount. We sell AI to
          give your best people their time back. There&apos;s a big difference.
          And if you want to see what that looks like for your specific business
          with your call volume, your deal sizes, your actual numbers we&apos;re
          one conversation away.
        </p>

        <blockquote className="border-l-4 border-white/30 pl-6 italic text-neutral-300 text-xl leading-relaxed">
          The businesses winning in 2026 aren&apos;t the ones with the biggest
          AI budgets. They&apos;re the ones who stopped paying human rates for
          work that was always meant to be automated.
        </blockquote>
      </section>

      {/* ── FINAL CTA ── */}
      {/* INSERT CTA COMPONENT HERE CTA 3 (Final / Closing)
          Suggested copy: "Stop losing calls to voicemail.
          Your AI receptionist is 30 minutes away from being live."
          CTA Button: "Book Your Free Demo" → https://calendly.com/ray-rhythmiqcx/30min
          Secondary: "See How RhythmiqCX Works →" → /
      */}
      <section className="mt-24 pb-20">
        <div className="rounded-3xl border-2 border-white/10 bg-gradient-to-br from-neutral-900 to-black p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Your AI Receptionist Is 30 Minutes Away From Being Live
          </h2>
          <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
            Stop losing calls to voicemail. RhythmiqCX takes hours to set up,
            not weeks and handles calls from day one. No scripts, no shifts, no
            surprises.
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

import BlogLayout from "@/components/marketing/BlogLayout";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "How Indian Businesses Can Use Voice AI to Handle Customer Calls 24/7",
  description:
    "Discover how Indian businesses use AI voice agents to handle customer calls 24/7 with Sarvam's Indian-English neural TTS  starting at just $29/month.",
  alternates: {
    canonical: "/blog/ai-voice-agent-india",
  },
  openGraph: {
    images: ["/images/blog/19-03-26.jpg"],
    type: "article",
    publishedTime: "2026-03-19",
    authors: ["PV8"],
  },
});

// ── SECTIONS ──────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "intro", label: "The India Call Problem" },
  { id: "why-voice-ai", label: "Why Voice AI Suits India" },
  { id: "how-it-works", label: "How AI Voice Agents Work" },
  { id: "use-cases", label: "5 Indian Business Use Cases" },
  { id: "sarvam-advantage", label: "The Indian-English Advantage" },
  { id: "comparison", label: "How RhythmiqCX Compares" },
  { id: "verdict", label: "Final Verdict" },
  { id: "faq", label: "FAQ" },
];

// ── RELATED ───────────────────────────────────────────────────────────────────
const RELATED = [
  {
    title:
      "AI Answering Service for Small Business: What It Costs and Whether It's Worth It (2026)",
    href: "/blog/ai-answering-service-small-business",
    imageSrc: "/images/blog/18-03-26.jpg",
    date: "March 18, 2026",
    description:
      "The complete guide to AI answering services for small businesses in 2026. Real costs, honest comparisons, and exactly what to look for before you spend a dollar.",
  },
  {
    title: "Best AI Customer Support Tools Under $50/Month in 2026",
    href: "/blog/best-ai-customer-support-tools-under-50",
    imageSrc: "/images/blog/17-03-26.jpg",
    date: "March 17, 2026",
    description:
      "We compared the 6 best AI customer support tools under $50/month so you can pick the right one for your business without guessing.",
  },
  {
    title:
      "Will AI Replace Receptionists? The Honest 2026 Answer Nobody's Giving You",
    href: "/blog/will-ai-replace-receptionist",
    imageSrc: "/images/blog/16-03-26.jpg",
    date: "March 16, 2026",
    description:
      "A founder-driven, strongly opinionated breakdown of what's actually happening with real data on where AI wins and where humans still dominate.",
  },
];

// ── USE CASES ─────────────────────────────────────────────────────────────────
const USE_CASES = [
  {
    num: "01",
    title: "E-Commerce Order Tracking",
    body: '"Where is my order?" is the single most common inbound call in Indian e-commerce. An AI voice agent pulls live order status, handles change requests, and manages return initiation without a human agent. At 500+ calls per day  which is routine for mid-size D2C brands  this alone frees up an entire support floor.',
  },
  {
    num: "02",
    title: "Healthcare Appointment Booking",
    body: "Clinics and hospitals in India see massive phone booking volume, especially in metro areas where online booking adoption is still catching up. AI voice agents confirm availability, book slots, send reminders, and handle rescheduling. After-hours booking is recovered completely  no calls go to voicemail at 10 PM when a patient has a morning appointment query.",
  },
  {
    num: "03",
    title: "Fintech Balance and Transaction Queries",
    body: "NBFC and fintech customers call for balance checks, EMI schedules, and payment status constantly. AI voice agents handle these with API integration to the core banking system. All calls are logged with full transcripts, encrypted in transit and at rest, and stored in-region for DPDP compliance.",
  },
  {
    num: "04",
    title: "Outbound Payment Reminders",
    body: "Instead of human agents making collection calls with inconsistent scripts, AI voice agents place proactive outbound calls: \"Your EMI of ₹3,400 is due in 2 days  press 1 to auto-pay or say 'schedule' to set a reminder.\" Compliance-safe, cost-efficient, and far more consistent than a human dialling 200 numbers a day.",
  },
  {
    num: "05",
    title: "IVR Replacement for Multi-City Businesses",
    body: 'Multi-location businesses  restaurant chains, retail, service franchises  use AI voice agents to replace press-1 IVR trees. The caller speaks naturally: "I want to book a table at the Koramangala location for 4 people Saturday evening." The AI handles intent, location disambiguation, and booking in a single conversation turn.',
  },
];

// ── COMPARISON DATA ───────────────────────────────────────────────────────────
const COMPARE_DATA = [
  {
    name: "RhythmiqCX",
    voice: "Sarvam Bulbul v2 (native)",
    price: "$29/mo flat",
    channels: "Voice + Chat + WhatsApp",
    highlight: true,
  },
  {
    name: "Retell AI",
    voice: "US-market TTS",
    price: "$0.07+/min",
    channels: "Voice only",
    highlight: false,
  },
  {
    name: "Vapi AI",
    voice: "US-market TTS",
    price: "$0.13–0.31/min",
    channels: "Voice only",
    highlight: false,
  },
  {
    name: "My AI Front Desk",
    voice: "Limited",
    price: "$99/mo",
    channels: "Voice + SMS",
    highlight: false,
  },
  {
    name: "Synthflow",
    voice: "Limited",
    price: "$99/mo",
    channels: "Voice only",
    highlight: false,
  },
];

// ── FAQ SCHEMA ────────────────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI voice agent for Indian businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI voice agent for Indian businesses is conversational AI software that handles inbound and outbound phone calls in Indian-English and regional languages. It uses Sarvam's neural TTS (Bulbul v2) and STT (Saarika v2.5) trained specifically for Indian accents, enabling natural conversations without press-1 menus.",
      },
    },
    {
      "@type": "Question",
      name: "How does voice AI handle Indian languages and accents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Platforms built on Sarvam AI's stack handle Indian-English natively, including regional accent variation and Hindi-English code-switching. Saarika v2.5 (STT) and Bulbul v2 (TTS) are trained specifically for Indian speech patterns. Most US-market platforms use TTS systems not designed for Indian-English.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cost of AI voice agents for Indian businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI voice agents for Indian businesses start at $29/month flat-rate with RhythmiqCX, with no per-minute billing. Per-minute platforms like Retell and Vapi cost $65–$150+/month at moderate call volume. Enterprise plans scale with concurrent call capacity.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI voice agents handle mixed Hindi-English calls?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with the right platform. Sarvam's Saarika model handles code-switching between Hindi and English within the same call. Text-level multilingual NLP covers 60+ languages. Voice output defaults to Indian-English (Anushka persona) with additional language personas on the roadmap.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to deploy an AI voice agent in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most deployments go live within a day. Configure your AI persona, connect your phone number or telephony provider, upload your knowledge base, and the AI is taking calls. No engineering team required. RhythmiqCX deployments are typically live and answering real calls within hours.",
      },
    },
  ],
};

export default function AIVoiceAgentIndia() {
  return (
    <BlogLayout
      category={{ href: "/blog/category/voice-ai", label: "Voice AI" }}
      date="2026-03-19"
      title="How Indian Businesses Can Use Voice AI to Handle Customer Calls 24/7"
      excerpt="India has one of the world's highest call volumes per business and one of the most linguistically complex customer bases. AI voice agents built on Sarvam's Indian-English models are the first real solution  and they start at $29/month."
      authors={[{ avatar: "/icons/PV8.png", name: "PV8" }]}
      readingTime={7}
      heroImage={{
        src: "/images/blog/19-03-26.jpg",
        alt: "AI voice agent handling Indian business customer calls 24/7 with Sarvam Indian-English neural TTS",
      }}
      sections={SECTIONS}
      relatedArticles={RELATED}
    >
      <JsonLd schema={faqSchema} />

      {/* ── SECTION 1: INTRO ─────────────────────────────────────────────── */}
      <section id="intro" className="mt-16 space-y-6">
        <h2 className="text-4xl font-bold">
          The India Call Problem Nobody Is Solving
        </h2>

        <p>
          India has one of the world&apos;s largest and most linguistically
          diverse customer service challenges. Over a billion potential callers,
          dozens of languages, and a business culture where the phone call is
          still the primary trust signal not the email, not the chat widget. If
          a customer in Bengaluru, Jaipur, or Surat calls your business and hits
          voicemail, they don&apos;t leave a message. They call your competitor.
        </p>

        <p>
          The numbers are stark. India&apos;s e-commerce sector handles over 500
          million customer interactions per year. Healthcare clinics book 70% of
          appointments via phone. Fintech apps field thousands of balance and
          transaction queries daily by voice, not by chat. And 73% of Indian
          consumers prefer talking to a person or something that sounds like one
          over filling in a support form.
        </p>

        <p>
          This is exactly the problem that{" "}
          <strong>AI voice agents for India</strong> were built to solve. Not
          the US version of the problem (English only, single accent, press-1
          IVR). The Indian version: code-switching mid-sentence, regional
          accents, high call volumes, and cost pressure that makes 24/7 human
          staffing impossible for most businesses outside enterprise. For
          context on how AI receptionists fit into a broader small-business
          stack, our{" "}
          <Link
            href="/blog/ai-phone-receptionist"
            className="text-blue-400 underline"
          >
            complete AI phone receptionist guide
          </Link>{" "}
          covers the full setup. This post focuses specifically on the India
          opportunity and why the technology is finally good enough to deploy.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          {[
            {
              num: "500M+",
              label: "Customer interactions in Indian e-commerce annually",
            },
            {
              num: "70%",
              label: "Healthcare appointments in India booked by phone",
            },
            {
              num: "73%",
              label:
                "Indian consumers prefer voice over forms for support queries",
            },
            {
              num: "$29/mo",
              label:
                "Entry cost for 24/7 AI voice coverage with Indian-English native TTS",
            },
          ].map(({ num, label }, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
            >
              <span className="font-mono text-2xl font-bold text-yellow-400 block leading-none">
                {num}
              </span>
              <span className="text-neutral-500 text-xs mt-2 block leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: WHY VOICE AI ───────────────────────────────────────── */}
      <section id="why-voice-ai" className="mt-24 space-y-6">
        <h2 className="text-3xl font-semibold text-white">
          Why Voice AI Is Uniquely Suited to the Indian Market
        </h2>

        <p>
          The fundamental reason voice AI hasn&apos;t cracked India until
          recently is accent and language quality. Legacy TTS systems built for
          US-English markets sounded robotic the moment they hit Indian-English
          pronunciation patterns. Callers heard a machine and disengaged
          immediately. The tech existed on paper; it just didn&apos;t work in
          practice.
        </p>

        <p>
          That changed with Sarvam AI&apos;s Bulbul v2 model a neural TTS system
          trained specifically on Indian-English speech patterns, with
          native-quality prosody, appropriate pronunciation of Indian names and
          terms, and voice personas tuned for conversational support rather than
          corporate announcements. The difference between Bulbul v2 and a
          US-market TTS model on an Indian-English speaker is audible within
          seconds.
        </p>

        <p>
          The second barrier was speech recognition. Saarika v2.5 (Sarvam
          &apos;s STT model) is trained specifically for Indian-English accents
          and handles the realities of the Indian market: code-switching between
          Hindi and English, regional accent variation, informal contractions.
          Most US-built STT models fail badly on these inputs. Saarika handles
          them accurately. Together, these models enable something that
          wasn&apos;t possible two years ago: an AI voice agent that genuinely
          belongs in an Indian business context and doesn&apos;t break when a
          caller switches languages mid-sentence.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            Why This Matters for India Specifically
          </p>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Tier-2 and tier-3 city callers who represent the fastest-growing
            segment of Indian e-commerce and fintech often have stronger
            regional accents. When a US-market TTS system mispronounces their
            city name or fails to understand their phrasing, trust evaporates
            immediately. Native Indian-English voice AI doesn&apos;t just sound
            better it creates the baseline of credibility required for a caller
            to complete a transaction.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: HOW IT WORKS ───────────────────────────────────────── */}
      <section id="how-it-works" className="mt-24 space-y-6">
        <h2 className="text-3xl font-semibold text-white">
          How AI Voice Agents Work: The Pipeline Explained
        </h2>

        <p>
          The pipeline is straightforward: caller speaks → STT (Saarika v2.5)
          transcribes in real time → LLM (Sarvam-M) processes intent and
          generates a response → TTS (Bulbul v2) synthesises audio → caller
          hears the response. Total round-trip latency in production: under one
          second. That sub-second response is critical pause longer than 800
          milliseconds and the caller instantly registers that they&apos;re
          talking to a machine.
        </p>

        <p>
          Silence detection stops recording after 2 seconds of quiet the system
          knows when the caller has finished speaking without needing artificial
          pauses or press-1 prompts. The conversation is contextual: the AI
          holds memory across the entire call, so if a caller says
          &ldquo;actually, make it Friday instead,&rdquo; the system updates the
          booking from the exchange 90 seconds earlier, not just the last five
          words.
        </p>

        <p>
          When confidence drops below threshold a complex dispute, a billing
          query that needs live account access, anything outside the AI&apos;s
          knowledge base the call transfers to a human agent with a full live
          transcript. The customer never repeats themselves. Your agent starts
          the conversation with complete context. This escalation design is what
          separates a voice AI deployment that earns caller trust from one that
          destroys it. We covered{" "}
          <Link
            href="/blog/ai-virtual-receptionist-vs-human-receptionist"
            className="text-blue-400 underline"
          >
            how AI and human receptionists should divide responsibilities
          </Link>{" "}
          in detail the same principles apply here.
        </p>
      </section>

      {/* ── SECTION 4: USE CASES ─────────────────────────────────────────── */}
      <section id="use-cases" className="mt-24 space-y-6">
        <h2 className="text-3xl font-semibold text-white">
          5 Ways Indian Businesses Are Using Voice AI Right Now
        </h2>

        <p>
          These aren&apos;t hypothetical. Each use case below represents a
          deployment pattern already in production across Indian markets. The
          common thread: high inbound volume, repetitive query types, and cost
          pressure on human staffing that makes 24/7 coverage economically
          impossible without AI.
        </p>

        <div className="space-y-4">
          {USE_CASES.map(({ num, title, body }) => (
            <div
              key={num}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-2"
            >
              <span className="font-mono text-3xl font-bold text-neutral-700 shrink-0 leading-none pt-12">
                {num}
              </span>
              <div className="space-y-2">
                <h3 className="text-white font-semibold text-base">{title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p>
          The after-hours opportunity deserves special attention. Indian
          consumers shop, transact, and raise support queries late into the
          evening behaviour patterns that don&apos;t align with a 9-to-6 support
          window. Every business that goes dark at 6 PM is handing its
          after-hours callers to competitors who have AI running 24/7. As we
          explored in{" "}
          <Link
            href="/blog/ai-answering-service-small-business"
            className="text-blue-400 underline"
          >
            our breakdown of AI answering services for small businesses
          </Link>
          , at just 15 recovered after-hours calls per week with a ₹15,000
          average deal value, the ROI math pays for itself before the end of
          month one.
        </p>
      </section>

      {/* ── SECTION 5: SARVAM ADVANTAGE ──────────────────────────────────── */}
      <section id="sarvam-advantage" className="mt-24 space-y-6">
        <h2 className="text-3xl font-semibold text-white">
          The Indian-English Advantage: Why the Model Stack Matters
        </h2>

        <p>
          Most platforms offering voice AI in India are built on US-market TTS
          ElevenLabs, Deepgram, Azure with Indian-English as an afterthought.
          The accent quality is noticeable. Callers in tier-2 and tier-3 cities,
          who often have stronger regional accents, disengage within seconds
          when the AI clearly can&apos;t understand how they speak or sounds
          nothing like them.
        </p>

        <p>
          The technical stack that makes Indian-English voice AI actually work
          is Sarvam&apos;s models end to end: Saarika v2.5 for STT, Sarvam-M for
          LLM reasoning, and Bulbul v2 for TTS. Bulbul v2&apos;s default speaker
          (Anushka, 24 kHz WAV output) is configured for conversational support
          by default max 150 tokens per response, which is the correct output
          length for voice (not the paragraph-length answers that work in chat
          but feel endless on a call). For a deeper look at why voice selection
          is critical for caller trust, our post on{" "}
          <Link
            href="/blog/how-to-choose-the-best-ai-voice-for-virtual-receptionists"
            className="text-blue-400 underline"
          >
            choosing the best AI voice for virtual receptionists
          </Link>{" "}
          walks through the evaluation criteria.
        </p>

        <p>
          The multilingual picture matters too. Indian businesses rarely serve a
          single-language customer base. WhatsApp conversations happen in Hindi.
          Support calls come in Tamil, Telugu, Marathi. Text-level multilingual
          NLP covering 60+ languages means the underlying LLM can handle
          cross-language intent even when the voice output defaults to
          Indian-English. Additional regional language voice personas are on the
          roadmap.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            Sarvam Stack at a Glance
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              {
                label: "STT Model",
                value: "Saarika v2.5",
                note: "Trained for Indian-English accents + code-switching",
              },
              {
                label: "LLM",
                value: "Sarvam-M",
                note: "Concise by default  150 token max for voice calls",
              },
              {
                label: "TTS Model",
                value: "Bulbul v2",
                note: "24 kHz WAV, Anushka persona, sub-second synthesis",
              },
            ].map(({ label, value, note }) => (
              <div key={label} className="space-y-1">
                <p className="text-neutral-500 text-xs">{label}</p>
                <p className="text-white font-semibold">{value}</p>
                <p className="text-neutral-500 text-xs">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: COMPARISON ─────────────────────────────────────────── */}
      <section id="comparison" className="mt-24 space-y-6">
        <h2 className="text-3xl font-semibold text-white">
          How RhythmiqCX Compares to Other Voice AI Platforms for India
        </h2>

        <p>
          I&apos;ll be direct about where{" "}
          <Link href="/voice-ai" className="text-blue-400 underline">
            RhythmiqCX Voice AI
          </Link>{" "}
          sits in this market and what we&apos;re not. We&apos;re not a
          developer tool. We&apos;re not a platform where you BYO your own LLM
          and TTS stack. We&apos;re a packaged deployment for businesses that
          want AI voice agents live and taking real calls within a day, without
          an engineering team.
        </p>

        <div className="overflow-x-auto rounded-2xl border bg-white/[0.02] p-2">
          <table className="w-full text-sm text-center">
            <thead className="text-neutral-400 uppercase tracking-widest text-xs font-mono">
              <tr className="bg-white/5">
                <th className="px-5 py-4 rounded-tl-xl">Platform</th>
                <th className="px-5 py-4">India-Ready Voice</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4 rounded-tr-xl">Channels</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_DATA.map(
                ({ name, voice, price, channels, highlight }) => (
                  <tr
                    key={name}
                    className={`hover:bg-white/[0.03] transition-colors ${
                      highlight ? "bg-white/[0.04]" : ""
                    }`}
                  >
                    <td className="px-5 py-4 font-semibold text-white">
                      {highlight ? (
                        <span className="flex items-center gap-2">
                          {name}{" "}
                          <span className="text-[10px] font-mono bg-green-500/20 text-green-400 px-6 py-0.5 rounded uppercase tracking-widest">
                            Best for India
                          </span>
                        </span>
                      ) : (
                        name
                      )}
                    </td>
                    <td
                      className={`px-5 py-4 ${
                        highlight
                          ? "text-green-400 font-semibold"
                          : "text-neutral-400"
                      }`}
                    >
                      {voice}
                    </td>
                    <td
                      className={`px-5 py-4 font-mono ${
                        highlight
                          ? "text-green-400 font-bold"
                          : "text-neutral-300"
                      }`}
                    >
                      {price}
                    </td>
                    <td
                      className={`px-5 py-4 ${
                        highlight ? "text-green-400" : "text-neutral-400"
                      }`}
                    >
                      {channels}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        <p>
          The omnichannel angle matters for India specifically. Indian customers
          contact businesses via WhatsApp at higher rates than almost any other
          market India has over 500 million active WhatsApp users. A voice AI
          that hands off to WhatsApp seamlessly for order updates, reminders,
          and full call transcripts creates a customer experience that matches
          how Indian consumers actually communicate. No competitor at the $29/mo
          price point offers voice + chat + WhatsApp in a single deployment.
        </p>

        <p>
          For the full cost breakdown of what each platform actually costs at
          different Indian call volumes, the{" "}
          <Link
            href="/blog/real-cost-of-voice-ai"
            className="text-blue-400 underline"
          >
            real cost of voice AI infrastructure
          </Link>{" "}
          post runs the per-minute vs flat-rate numbers at 100, 500, and 1,500
          minutes per month. At every volume above 60 minutes, flat-rate wins
          and most Indian businesses hit that inside the first week.
        </p>

        <p>
          See the complete{" "}
          <Link href="/ai-chatbot-pricing" className="text-blue-400 underline">
            RhythmiqCX pricing tiers and what&apos;s included at each plan
          </Link>{" "}
          the 7-day free trial requires no credit card, which means you can test
          on real calls before committing to anything.
        </p>
      </section>

      {/* ── SECTION 7: VERDICT ───────────────────────────────────────────── */}
      <section id="verdict" className="mt-24 space-y-6">
        <h2 className="text-3xl font-semibold text-white">
          Final Verdict: The India Voice AI Opportunity Is Now
        </h2>

        <p>
          The market case for AI voice agents in India is stronger than anywhere
          else in the world. High call volumes, cost pressure on human staffing,
          linguistic complexity that legacy IVR can&apos;t handle, and 24/7
          expectations from a mobile-first consumer base who will not wait until
          9 AM to get an answer.
        </p>

        <p>
          The technology barrier accent quality, Indian-language STT accuracy is
          solved. Sarvam&apos;s models handle what US-market platforms cannot.
          What remains is deployment inertia: most Indian businesses are still
          running phone support on voicemail and human agents for FAQs that AI
          should handle at ₹2,400/month.
        </p>

        <blockquote className="border-l-4 border-white/30 pl-6 italic text-neutral-300 text-xl leading-relaxed">
          The Indian businesses winning in 2026 are not the ones with the most
          agents on shift. They&apos;re the ones who stopped letting 6 PM be the
          end of their customer service day.
        </blockquote>

        <p>
          If you&apos;re running a business in India with more than 30 inbound
          calls per week, the math works at $29/month flat. Start the 7-day free
          trial, connect your number, upload your FAQ, and test it on real
          calls. If the first week doesn&apos;t recover its cost in missed
          leads, cancel. No credit card required.
        </p>
      </section>

      {/* ── SECTION 8: FAQ ───────────────────────────────────────────────── */}
      <section id="faq" className="mt-24 space-y-8">
        <h2 className="text-3xl font-semibold text-white">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-white font-semibold text-base">
              What is an AI voice agent for Indian businesses?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              An AI voice agent for Indian businesses is conversational AI
              software that handles inbound and outbound phone calls in
              Indian-English and regional languages. It uses Sarvam&apos;s
              neural TTS (Bulbul v2) and STT (Saarika v2.5) trained specifically
              for Indian accents, enabling natural conversations without press-1
              menus or rigid IVR scripts.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-6">
            <h3 className="text-white font-semibold text-base">
              How does voice AI handle Indian languages and accents?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Platforms built on Sarvam AI&apos;s stack handle Indian-English
              natively, including regional accent variation and Hindi-English
              code-switching within the same call. Saarika v2.5 (STT) and Bulbul
              v2 (TTS) are trained specifically for Indian speech patterns. Most
              US-market platforms use TTS systems that were not designed for
              Indian-English and fail noticeably under real-world conditions.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-6">
            <h3 className="text-white font-semibold text-base">
              What is the cost of AI voice agents for Indian businesses?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              AI voice agents for Indian businesses start at $29/month flat with
              RhythmiqCX no per-minute billing, no surprise invoices at month
              end. Per-minute platforms like Retell AI and Vapi cost
              $65–$150+/month at moderate call volume (500 min/mo). Enterprise
              plans scale with concurrent call capacity.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-6">
            <h3 className="text-white font-semibold text-base">
              Can AI voice agents handle mixed Hindi-English calls?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Yes, with the right platform. Sarvam&apos;s Saarika model handles
              code-switching between Hindi and English within the same call.
              Text-level multilingual NLP covers 60+ languages. Voice output
              defaults to Indian-English with the Anushka persona; additional
              regional language voice personas are on the roadmap.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-6">
            <h3 className="text-white font-semibold text-base">
              How long does it take to deploy an AI voice agent in India?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Most deployments go live within a day. Configure your AI persona,
              connect your phone number or telephony provider, upload your
              knowledge base, and the AI is live and taking calls. No
              engineering team required. RhythmiqCX deployments are typically
              answering real calls within hours of setup.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="mt-24 pb-20">
        <div className="rounded-3xl border-2 border-white/10 bg-gradient-to-br from-neutral-900 to-black p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Handle Every Indian Customer Call 24/7 7-Day Free Trial
          </h2>
          <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
            RhythmiqCX Voice AI is built on Sarvam&apos;s Indian-English models.
            Upload your FAQ, connect your number, and your AI voice agent is
            live answering real calls in Indian-English, 24/7, from $29/mo. No
            credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/voice-ai"
              className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-neutral-200 transition"
            >
              Try Voice AI Free
            </Link>
            <a
              href="https://calendly.com/ray-rhythmiqcx/30min"
              className="border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/5 transition"
            >
              Book a Live Demo →
            </a>
          </div>
        </div>
      </section>
    </BlogLayout>
  );
}

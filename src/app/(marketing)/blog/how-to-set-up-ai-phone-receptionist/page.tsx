import BlogLayout from "@/components/marketing/BlogLayout";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "How to Set Up an AI Phone Receptionist in Under an Hour (2026)",
  description:
    "Step-by-step tutorial: set up an AI phone receptionist in under 60 minutes. No code, no hardware, no telephony engineer  works for any small business from $29/mo.",
  alternates: {
    canonical: "/blog/how-to-set-up-ai-phone-receptionist",
  },
  openGraph: {
    images: ["/images/blog/23-03-26.jpg"],
    type: "article",
    publishedTime: "2026-03-23",
    authors: ["PV8"],
  },
});

// ── SECTIONS ──────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "intro", label: "Why Under an Hour Is Realistic in 2026" },
  { id: "prerequisites", label: "Before You Start (5 min)" },
  { id: "choose-platform", label: "Choose Your Platform (10 min)" },
  { id: "configure-persona", label: "Configure Your AI Persona (10 min)" },
  { id: "build-knowledge-base", label: "Build Your Knowledge Base (15 min)" },
  { id: "connect-phone-number", label: "Connect Your Phone Number (5 min)" },
  { id: "test-go-live", label: "Test & Go Live (10 min)" },
  { id: "after-setup", label: "What Happens After Setup" },
  { id: "comparison", label: "Platform Comparison" },
  { id: "faq", label: "FAQ" },
];

const RELATED = [
  {
    title: "AI Phone Receptionist: Complete Guide for Small Business (2026)",
    href: "/blog/ai-phone-receptionist",
    imageSrc: "/images/blog/11-03-26.jpg",
    date: "March 11, 2026",
    description:
      "Everything small businesses need to know about AI phone receptionists in 2026. Real setup guide, honest comparison, multilingual support.",
  },
  {
    title:
      "AI Answering Service for Small Business: What It Costs and Whether It's Worth It (2026)",
    href: "/blog/ai-answering-service-small-business",
    imageSrc: "/images/blog/18-03-26.jpg",
    date: "March 18, 2026",
    description:
      "The complete guide to AI answering services for small businesses in 2026. Real costs, honest comparisons, and exactly what to look for.",
  },
  {
    title:
      "The $29/Month Tool That Answers My Calls When I'm Heads-Down Working",
    href: "/blog/ai-phone-answering-app-one-person",
    imageSrc: "/images/blog/20-03-26.jpg",
    date: "March 20, 2026",
    description:
      "Here's exactly what happens when someone calls me now and why a $29/month AI phone answering app changed how I work as a one-person business.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it actually take to set up an AI phone receptionist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With a no-code platform like RhythmiqCX, the full setup  account creation, AI persona configuration, knowledge base upload, phone number forwarding, and test call  takes 45–60 minutes for most users. Some complete it in under 30 minutes if they already have their FAQ written.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to buy a new phone number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You forward your existing business number to your AI receptionist platform. When you want the AI to handle calls, activate call forwarding. When you want calls to ring through to you directly, turn forwarding off. No new SIM, no porting, no hardware changes.",
      },
    },
    {
      "@type": "Question",
      name: "What information does the AI need to answer calls?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At minimum: your business name, what you do, your hours, how to book or contact you, and answers to the 8–10 questions you hear most often. This becomes the AI's knowledge base. The more specific your FAQ, the better the AI performs from day one.",
      },
    },
    {
      "@type": "Question",
      name: "Can the AI handle calls in Hindi or Indian-English?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX uses Sarvam's Bulbul v2 neural TTS and Saarika v2.5 speech-to-text, both optimised for Indian-English accents. The AI understands and responds naturally to callers with Indian accents  something US-built platforms consistently fail at.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when a caller asks something the AI doesn't know?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The AI is trained to say something like 'I'll make sure [Name] gets back to you on that  can I take your number for a callback?' It never guesses or makes up answers. Low-confidence queries always result in a human callback capture, not a dead end.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an AI phone receptionist cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RhythmiqCX starts at $29/month flat  no per-minute billing, no per-call fees. Competitors like My AI Front Desk and Synthflow charge $99/month. Retell AI and Bland AI charge per-minute, which adds up fast at real call volumes.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Set Up an AI Phone Receptionist in Under an Hour",
  description:
    "A step-by-step guide to setting up an AI phone receptionist for your small business using RhythmiqCX  no code, no hardware, no telephony engineer required.",
  totalTime: "PT1H",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "29",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Choose your AI phone receptionist platform",
      text: "Sign up for a no-code AI voice platform like RhythmiqCX. Look for flat-rate pricing, no-code setup, and native support for your callers' accents.",
      url: "https://rhythmiqcx.com/blog/how-to-set-up-ai-phone-receptionist#choose-platform",
    },
    {
      "@type": "HowToStep",
      name: "Configure your AI persona and greeting",
      text: "Set your AI's name, greeting script, tone, and voice. This is what callers hear in the first second  make it match your brand.",
      url: "https://rhythmiqcx.com/blog/how-to-set-up-ai-phone-receptionist#configure-persona",
    },
    {
      "@type": "HowToStep",
      name: "Build your knowledge base",
      text: "Write out the 8–10 questions callers ask most often. Add your services, hours, pricing signals, booking process, and callback instructions.",
      url: "https://rhythmiqcx.com/blog/how-to-set-up-ai-phone-receptionist#build-knowledge-base",
    },
    {
      "@type": "HowToStep",
      name: "Connect your phone number",
      text: "Set up call forwarding from your existing business number to your AI receptionist. No porting, no new SIM required.",
      url: "https://rhythmiqcx.com/blog/how-to-set-up-ai-phone-receptionist#connect-phone-number",
    },
    {
      "@type": "HowToStep",
      name: "Run a test call and go live",
      text: "Call your own number from a second phone. Ask the questions your callers typically ask. Adjust any FAQ answers that sound off. You're live.",
      url: "https://rhythmiqcx.com/blog/how-to-set-up-ai-phone-receptionist#test-go-live",
    },
  ],
};

export default function HowToSetUpAIPhoneReceptionist() {
  return (
    <BlogLayout
      category={{ href: "/blog/category/voice-ai", label: "Voice AI" }}
      date="2026-03-23"
      title="How to Set Up an AI Phone Receptionist in Under an Hour"
      excerpt="A step-by-step tutorial for any small business. No code. No telephony engineer. No expensive hardware. Just 5 steps and you're live."
      authors={[{ avatar: "/icons/PV8.png", name: "PV8" }]}
      readingTime={7}
      heroImage={{
        src: "/images/blog/23-03-26.jpg",
        alt: "Step-by-step AI phone receptionist setup guide for small businesses in 2026",
      }}
      sections={SECTIONS}
      relatedArticles={RELATED}
    >
      <JsonLd schema={faqSchema} />
      <JsonLd schema={howToSchema} />

      <section id="intro" className="mt-16 space-y-6">
        <h2 className="text-4xl font-bold">
          Why &ldquo;Under an Hour&rdquo; Is Realistic in 2026
        </h2>

        <p>
          Two years ago, setting up an AI phone receptionist meant hiring a
          developer, configuring a telephony stack, training a custom model, and
          spending two to four weeks in integration hell. The companies that
          could afford it were enterprises. Everyone else used voicemail and
          hoped for the best.
        </p>

        <p>
          That has changed. No-code AI voice platforms have collapsed the setup
          time to under an hour for most small businesses. You do not need a
          developer. You do not need new hardware. You do not need to port your
          phone number. You need a FAQ document, a 30-minute lunch break, and a
          second phone to run a test call.
        </p>

        <p>
          This guide walks you through the exact{" "}
          <strong>AI phone receptionist setup</strong> process honest time
          estimates for each, and what you&apos;ll have at the end. We&apos;re
          using{" "}
          <Link href="/voice-ai" className="text-blue-400 underline">
            RhythmiqCX Voice AI
          </Link>{" "}
          as the example throughout because it is the only platform with
          flat-rate pricing, Indian-English native voice, and no-code setup at
          $29/month. The steps are the same for other platforms just swap the UI
          details.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          {[
            { num: "5", label: "Steps to go live" },
            { num: "~55 min", label: "Total setup time" },
            { num: "$29/mo", label: "Starting price" },
            { num: "0", label: "Lines of code required" },
          ].map(({ num, label }) => (
            <div
              key={label}
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

      <section id="prerequisites" className="mt-24 space-y-6">
        <h2 className="text-3xl font-semibold text-white">
          Before You Start{" "}
          <span className="text-neutral-500 font-normal text-lg ml-2">
            ~5 min
          </span>
        </h2>

        <p>
          Gather these four things before you open a single tab. Having them
          ready is the difference between a 45-minute setup and a 2-hour one.
        </p>

        <div className="space-y-3 mt-4">
          {[
            {
              icon: "📋",
              title: "Your FAQ draft",
              body: "A rough list of the 8–10 questions callers ask most often. Don't worry about polish yet  you'll refine them in Step 3. Think: 'What do I, what do I charge, how do I book, what are my hours?'",
            },
            {
              icon: "📞",
              title: "Your current business phone number",
              body: "You'll forward this to the AI during setup. Know how to access call forwarding settings on your carrier or mobile phone  it takes 2 minutes and is reversible any time.",
            },
            {
              icon: "💳",
              title: "A payment method",
              body: "RhythmiqCX offers a 7-day free trial, no credit card required at signup. You'll only need payment details if you decide to continue past the trial.",
            },
            {
              icon: "📱",
              title: "A second phone for testing",
              body: "Any mobile will do. You'll call your own forwarded number at the end of Step 5 to hear exactly what your callers will hear.",
            },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-2"
            >
              <span className="text-2xl shrink-0 mt-12">{icon}</span>
              <div className="space-y-1">
                <h3 className="text-white font-semibold text-sm">{title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION: CHOOSE PLATFORM ─────────────────────────────────────── */}
      <section id="choose-platform" className="mt-24 space-y-6">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              Choose Your Platform{" "}
              <span className="text-neutral-500 font-normal text-lg ml-2">
                ~10 min
              </span>
            </h2>
          </div>
        </div>

        <p>
          Not all AI phone receptionist platforms are built for small business
          setup. Some require developer configuration. Some bill per minute,
          which means your monthly cost is unpredictable. Some are built
          exclusively for US-English voices a real problem if your callers have
          Indian, Southeast Asian, or other regional accents.
        </p>

        <p>
          For a no-code, under-one-hour setup, you need a platform that has:
        </p>

        <ul className="space-y-2 list-none pl-0">
          {[
            "No-code configuration  UI-based setup, no scripts or telephony APIs",
            "Flat-rate monthly pricing  predictable cost regardless of call volume",
            "Native support for your callers' accents and languages",
            "A knowledge base upload system  not just a static script",
            "Smart escalation  captures callbacks when the AI doesn't know an answer",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-neutral-300 text-sm">
              <span className="text-green-400 shrink-0 mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <p>
          Go to{" "}
          <Link href="/voice-ai" className="text-blue-400 underline">
            rhythmiqcx.com/voice-ai
          </Link>{" "}
          and create your account. The signup flow takes under 3 minutes.
          You&apos;ll be asked to name your business and select your primary
          language / accent region choose the one that best matches your typical
          caller. For Indian businesses, select Indian-English; this routes your
          setup to Sarvam&apos;s Bulbul v2 + Saarika v2.5 models, which are
          natively trained on Indian-English phonetics.
        </p>

        <p className="text-neutral-500 text-sm">
          ⏱ Time check: You should be inside the dashboard within 10 minutes of
          starting Step 1.
        </p>
      </section>

      {/* ── SECTION: CONFIGURE PERSONA ───────────────────────────────────── */}
      <section id="configure-persona" className="mt-24 space-y-6">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              Configure Your AI Persona &amp; Greeting{" "}
              <span className="text-neutral-500 font-normal text-lg ml-2">
                ~10 min
              </span>
            </h2>
          </div>
        </div>

        <p>
          This is what callers hear in the first second. Get it right and they
          assume they&apos;re speaking to your front desk. Get it wrong and they
          hang up before the AI can help them.
        </p>

        <p>Three things to configure at this stage:</p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
            <h3 className="text-white font-semibold">AI Name &amp; Identity</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Give the AI a name not a robotic designation, a real-sounding
              name. Something like &ldquo;Priya&rdquo; or &ldquo;Sam&rdquo; or
              whatever fits your brand tone. The AI introduces itself by this
              name and maintains it consistently across every call.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
            <h3 className="text-white font-semibold">Opening Greeting</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Write your greeting script in plain English. A good template:{" "}
              <em>
                &ldquo;Hi, you&apos;ve reached [Business Name]. [AI Name] here
                [Owner Name] is currently with a client. How can I help
                you?&rdquo;
              </em>{" "}
              Keep it under 2 sentences. Callers stop listening after that.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
            <h3 className="text-white font-semibold">Tone &amp; Pace</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Choose a tone that matches your business warm and conversational
              for a service business, professional and direct for a financial or
              legal firm. RhythmiqCX lets you set pace (words per minute) and
              formality level. Default settings work well for most businesses
              adjust only if the test call in Step 5 sounds off.
            </p>
          </div>
        </div>

        <p className="text-neutral-500 text-sm">
          ⏱ Time check: Persona configuration should take no more than 10
          minutes. If you&apos;re spending more time than that, you&apos;re
          over-engineering the greeting callers care about speed and
          helpfulness, not the perfect phrase.
        </p>
      </section>

      {/* ── SECTION: BUILD KNOWLEDGE BASE ────────────────────────────────── */}
      <section id="build-knowledge-base" className="mt-24 space-y-6">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              Build Your Knowledge Base{" "}
              <span className="text-neutral-500 font-normal text-lg ml-2">
                ~15 min
              </span>
            </h2>
          </div>
        </div>

        <p>
          This is the most important step and the one most people underestimate.
          Your AI is only as good as what you teach it. A thin knowledge base
          produces an AI that deflects everything. A well-structured one handles
          80% of inbound calls without escalation.
        </p>

        <p>
          Use the FAQ you drafted in the prerequisites and expand it using the
          categories below. Aim for 10–15 Q&amp;As total at minimum.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-sm text-left">
            <thead className="text-neutral-400 uppercase tracking-widest text-xs font-mono">
              <tr className="bg-white/5">
                <th className="px-5 py-4 rounded-tl-xl">Category</th>
                <th className="px-5 py-4">Example Questions to Cover</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                {
                  category: "What you do",
                  examples:
                    "What services do you offer? Do you work with [industry]? What's your specialty?",
                },
                {
                  category: "How to work with you",
                  examples:
                    "How do I get started? What does the process look like? How long does it take?",
                },
                {
                  category: "Pricing signals",
                  examples:
                    "How much do you charge? Do you have packages? What's your minimum project size?",
                },
                {
                  category: "Availability",
                  examples:
                    "Are you taking new clients? What are your hours? When can we schedule a call?",
                },
                {
                  category: "How to book",
                  examples:
                    "How do I schedule a consultation? Can I book online? What information do you need?",
                },
                {
                  category: "Location / delivery",
                  examples:
                    "Are you local or remote? Do you work with clients in [city/country]?",
                },
                {
                  category: "Social proof",
                  examples:
                    "Can I see examples of your work? Do you have references? How many clients do you have?",
                },
              ].map(({ category, examples }) => (
                <tr
                  key={category}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-5 py-4 font-semibold text-white whitespace-nowrap">
                    {category}
                  </td>
                  <td className="px-5 py-4 text-neutral-400">{examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Write your answers in the same natural, conversational language the AI
          will speak not formal policy language. The AI reproduces your tone. If
          your FAQ sounds like a terms-of-service document, the AI will too.
        </p>

        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5 space-y-2">
          <p className="text-yellow-400 text-sm font-semibold">
            Pro tip: Add a callback instruction
          </p>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Include a specific instruction for what the AI should do when it
            doesn&apos;t know the answer: &ldquo;If unsure, say: &apos;[Owner
            Name] will be able to answer that directly can I take your number
            for a callback?&apos; Then capture: full name, best number, and what
            the call is about.&rdquo; This single instruction eliminates
            dead-end calls.
          </p>
        </div>

        <p className="text-neutral-500 text-sm">
          ⏱ Time check: 15 minutes with your FAQ draft already written. If you
          have nothing written yet, budget 25–30 minutes. The FAQ is the highest
          leverage investment in this entire setup.
        </p>
      </section>

      {/* ── SECTION: CONNECT PHONE NUMBER ────────────────────────────────── */}
      <section id="connect-phone-number" className="mt-24 space-y-6">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              Connect Your Phone Number{" "}
              <span className="text-neutral-500 font-normal text-lg ml-2">
                ~5 min
              </span>
            </h2>
          </div>
        </div>

        <p>
          You do not need to buy a new phone number, port your existing one, or
          change your SIM. The connection works through call forwarding a
          feature every carrier supports, usually accessible from your phone
          settings or by dialling a short code.
        </p>

        <div className="space-y-3">
          {[
            {
              title: "Get your RhythmiqCX forwarding number",
              body: "After setup, RhythmiqCX provides you a dedicated inbound number. This is the number you'll forward your existing business line to.",
            },
            {
              title: "Activate call forwarding on your existing number",
              body: "On most Android/iOS phones: Settings → Phone → Call Forwarding → Always Forward → enter your RhythmiqCX number. On Airtel/Jio/Vodafone India: dial *21*[number]# to activate, #21# to deactivate.",
            },
            {
              title: "Choose your forwarding trigger",
              body: "Options: Always forward (AI always answers), Forward when busy (AI answers when you're on another call), Forward when unanswered after X rings (AI catches calls you don't pick up). Most small businesses start with 'always forward' during setup, then switch to 'unanswered after 3 rings' once confident.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="space-y-1">
                <h3 className="text-white font-semibold text-sm">{title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-neutral-500 text-sm">
          ⏱ Time check: 5 minutes maximum. The only delay is finding the call
          forwarding menu on your specific phone model or carrier a quick search
          of &ldquo;[phone model] call forwarding settings&rdquo; resolves this
          in under a minute.
        </p>
      </section>

      {/* ── SECTION: TEST GO LIVE ────────────────────────────────────────── */}
      <section id="test-go-live" className="mt-24 space-y-6">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              Test &amp; Go Live{" "}
              <span className="text-neutral-500 font-normal text-lg ml-2">
                ~10 min
              </span>
            </h2>
          </div>
        </div>

        <p>
          Call your own forwarded number from a second phone. Treat the test
          call exactly like a real client call use the questions real callers
          ask, not softballs you know the AI will ace.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4 font-mono text-sm">
          <p className="text-neutral-500 text-xs uppercase tracking-widest">
            Test call checklist
          </p>
          <div className="space-y-3">
            {[
              "Did the AI pick up within 2 seconds?",
              "Did the greeting sound natural, not robotic?",
              "Ask: 'What services do you offer?'  Did the answer match your FAQ?",
              "Ask: 'How much do you charge?'  Did it give a useful answer or price range?",
              "Ask something the AI wasn't trained on  Did it capture a callback instead of guessing?",
              "Did you receive a call summary notification within 2 minutes of hanging up?",
            ].map((item) => (
              <div key={item} className="flex gap-4 items-start">
                <span className="text-green-400 shrink-0 mt-0.5">✓</span>
                <span className="text-neutral-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p>
          If any answer sounds off, go back to your FAQ in Step 3 and revise the
          relevant Q&amp;A. Changes take effect immediately retest within
          seconds. Most setups need one or two small tweaks on the first test
          call. By the second test call, you&apos;re live.
        </p>

        <p className="text-neutral-500 text-sm">
          ⏱ Total time: Approximately 50–55 minutes from zero to live. Most
          users complete it faster once they have their FAQ ready going in.
        </p>
      </section>

      {/* ── SECTION: AFTER SETUP ─────────────────────────────────────────── */}
      <section id="after-setup" className="mt-24 space-y-6">
        <h2 className="text-3xl font-semibold text-white">
          What Happens After Setup
        </h2>

        <p>
          Once you&apos;re live, here is what your day-to-day looks like. Every
          call your AI handles generates a summary notification: who called,
          what they asked, what they said about their budget or timeline, and
          their callback number if they provided one. You return calls with
          context, not blind.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "Instant call summaries",
              body: "Within 60 seconds of each call ending, you receive a full transcript and a 3-line summary. You know exactly who called and why before you call back.",
            },
            {
              title: "24/7 coverage, automatic",
              body: "The AI answers at 2 AM with the same quality as at 2 PM. Callers in different time zones, late-night inquiries, and weekend calls get handled without you being on-call.",
            },
            {
              title: "Continuous improvement",
              body: "Review call transcripts weekly. Identify questions the AI handled poorly and add better FAQ entries. Most businesses see accuracy improve significantly in the first two weeks.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2"
            >
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <p>
          The other thing that changes: your relationship with your phone. For a
          detailed look at the financial case how many calls you need to recover
          to justify the cost see the{" "}
          <Link
            href="/blog/ai-answering-service-small-business"
            className="text-blue-400 underline"
          >
            AI answering service cost breakdown
          </Link>
          . The short version: one recovered qualified lead per month at any
          typical project size pays for the annual subscription.
        </p>
      </section>

      {/* ── SECTION: COMPARISON ──────────────────────────────────────────── */}
      <section id="comparison" className="mt-24 space-y-6">
        <h2 className="text-3xl font-semibold text-white">
          Platform Comparison: Which AI Receptionist Is Easiest to Set Up?
        </h2>

        <p>
          Not every AI phone receptionist is designed for no-code,
          under-one-hour setup. Here is how the major options compare on the
          metrics that matter for small business setup:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-sm text-left">
            <thead className="text-neutral-400 uppercase tracking-widest text-xs font-mono">
              <tr className="bg-white/5">
                <th className="px-5 py-4 rounded-tl-xl">Platform</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Setup Time</th>
                <th className="px-5 py-4">No-Code?</th>
                <th className="px-5 py-4 rounded-tr-xl">Indian English</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                {
                  name: "RhythmiqCX",
                  price: "$29/mo flat",
                  setup: "~45–60 min",
                  noCode: "✅ Full no-code",
                  indianEn: "✅ Native (Sarvam)",
                  highlight: true,
                },
                {
                  name: "My AI Front Desk",
                  price: "$99/mo",
                  setup: "~60–90 min",
                  noCode: "✅ No-code",
                  indianEn: "❌ US-only voices",
                  highlight: false,
                },
                {
                  name: "Retell AI",
                  price: "$0.07+/min",
                  setup: "2–4 hrs (dev setup)",
                  noCode: "❌ Requires developer",
                  indianEn: "❌ Limited",
                  highlight: false,
                },
                {
                  name: "Bland AI",
                  price: "~$0.09/min",
                  setup: "2–4 hrs (dev setup)",
                  noCode: "❌ Enterprise/dev only",
                  indianEn: "❌ None",
                  highlight: false,
                },
                {
                  name: "Synthflow",
                  price: "$99/mo",
                  setup: "~60–90 min",
                  noCode: "✅ No-code",
                  indianEn: "❌ Limited",
                  highlight: false,
                },
              ].map(({ name, price, setup, noCode, indianEn, highlight }) => (
                <tr
                  key={name}
                  className={`hover:bg-white/[0.03] transition-colors ${highlight ? "bg-white/[0.04]" : ""}`}
                >
                  <td className="px-5 py-4 font-semibold text-white">
                    {highlight ? (
                      <span className="flex items-center gap-2">
                        {name}{" "}
                        <span className="text-[10px] font-mono bg-green-500/20 text-green-400 px-2 py-0.5 rounded uppercase tracking-widest">
                          Recommended
                        </span>
                      </span>
                    ) : (
                      name
                    )}
                  </td>
                  <td
                    className={`px-5 py-4 font-mono ${highlight ? "text-green-400 font-bold" : "text-neutral-300"}`}
                  >
                    {price}
                  </td>
                  <td className="px-5 py-4 text-neutral-400">{setup}</td>
                  <td
                    className={`px-5 py-4 ${highlight ? "text-green-400" : "text-neutral-400"}`}
                  >
                    {noCode}
                  </td>
                  <td
                    className={`px-5 py-4 ${highlight ? "text-green-400" : "text-neutral-400"}`}
                  >
                    {indianEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Retell AI and Bland AI are powerful but require developer integration
          not realistic for a small business owner who wants to be live in an
          hour. My AI Front Desk and Synthflow are genuinely no-code but charge
          3x more and lack Indian-English voice quality. For the full pricing
          breakdown including per-minute vs flat-rate math, see the{" "}
          <Link
            href="/blog/real-cost-of-voice-ai"
            className="text-blue-400 underline"
          >
            real cost of voice AI
          </Link>
          .
        </p>
      </section>

      {/* ── SECTION: FAQ ─────────────────────────────────────────────────── */}
      <section id="faq" className="mt-24 space-y-8">
        <h2 className="text-3xl font-semibold text-white">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-white font-semibold text-base">
              How long does it actually take to set up an AI phone receptionist?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              With a no-code platform like RhythmiqCX, the full setup account
              creation, AI persona configuration, knowledge base upload, phone
              number forwarding, and test call takes 45–60 minutes for most
              users. Some complete it in under 30 minutes if they already have
              their FAQ written.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-6">
            <h3 className="text-white font-semibold text-base">
              Do I need to buy a new phone number?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              No. You forward your existing business number to your AI
              receptionist platform. When you want the AI to handle calls,
              activate call forwarding. When you want calls to ring through to
              you directly, turn forwarding off. No new SIM, no porting, no
              hardware changes.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-6">
            <h3 className="text-white font-semibold text-base">
              What information does the AI need to answer calls?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              At minimum: your business name, what you do, your hours, how to
              book or contact you, and answers to the 8–10 questions you hear
              most often. This becomes the AI&apos;s knowledge base. The more
              specific your FAQ, the better the AI performs from day one.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-6">
            <h3 className="text-white font-semibold text-base">
              Can the AI handle calls in Hindi or Indian-English?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              RhythmiqCX uses Sarvam&apos;s Bulbul v2 neural TTS and Saarika
              v2.5 speech-to-text, both optimised for Indian-English accents.
              The AI understands and responds naturally to callers with Indian
              accents something US-built platforms consistently fail at.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-6">
            <h3 className="text-white font-semibold text-base">
              What happens when a caller asks something the AI doesn&apos;t
              know?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              The AI is trained to say something like &ldquo;I&apos;ll make sure
              [Name] gets back to you on that can I take your number for a
              callback?&rdquo; It never guesses or makes up answers.
              Low-confidence queries always result in a human callback capture,
              not a dead end.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-6">
            <h3 className="text-white font-semibold text-base">
              How much does an AI phone receptionist cost?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              RhythmiqCX starts at $29/month flat no per-minute billing, no
              per-call fees. Competitors like My AI Front Desk and Synthflow
              charge $99/month. Retell AI and Bland AI charge per-minute, which
              adds up fast at real call volumes.{" "}
              <Link
                href="/ai-chatbot-pricing"
                className="text-blue-400 underline"
              >
                See full pricing plans here.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="mt-24 pb-20">
        <div className="rounded-3xl border-2 border-white/10 bg-gradient-to-br from-neutral-900 to-black p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Set Up Your AI Receptionist This Afternoon
          </h2>
          <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
            You now have the exact steps. RhythmiqCX starts at $29/month with a
            7-day free trial no credit card required. Go from zero to live in
            under an hour.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/voice-ai"
              className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-neutral-200 transition"
            >
              Start Free Trial
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

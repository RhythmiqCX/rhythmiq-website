// app/(marketing)/conversational-ai-chatbot/page.tsx
import { Metadata } from 'next';
import Container from '@/components/global/container';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import ImageTextSection from '@/components/marketing/imagetext';

export const metadata: Metadata = {
  title: 'Conversational AI Chatbot | Build Natural Dialogues that Convert',
  description:
    'Learn what conversational AI is, how chatbots use large language models, and step-by-step instructions to deploy a production ready conversational AI platform in 2025.',
  alternates: {
    canonical: '/conversational-ai-chatbot',
  },
};

export default function ConversationalAIChatbotPage() {
  return (
    <main className="flex flex-col">
      {/* ─────────────── Hero */}
      <section className="relative w-full bg-gradient-to-b from-cyan-600/20 to-background pt-28 pb-20 lg:py-32 text-center">
        <Container className="space-y-6">
          <h1 className="mx-auto max-w-4xl font-bold text-4xl md:text-5xl lg:text-7xl leading-tight">
            Your 2025 <span className="text-cyan-600">Conversational&nbsp;AI&nbsp;Chatbot</span> Guide
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-base md:text-lg">
            Discover how conversational AI platforms create natural dialogues, increase engagement and cut support costs — no PhD required.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/book-demo"><Button size="lg">Book Live Demo</Button></Link>
            <Link href="#implementation" className="flex items-center gap-2 group text-cyan-700 font-medium">
              <span>See Steps</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ─────────────── Definition snippet */}
      <section className="py-12 md:py-16">
        <Container>
          <p className="mx-auto max-w-3xl text-lg md:text-xl font-medium leading-relaxed">
            <strong>Conversational AI</strong> is a blend of natural language processing (NLP), large language models and dialogue management that lets chatbots and voice assistants understand questions, generate human‑like answers and learn from every interaction.
          </p>
        </Container>
      </section>

      {/* ─────────────── Benefit highlights */}
      <section className="py-16 md:py-20">
        <Container className="grid gap-10 md:grid-cols-3 text-center">
          <div>
            <h3 className="text-4xl font-bold text-cyan-600">40&nbsp;%</h3>
            <p className="font-semibold mt-2">Higher self‑service rate</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-cyan-600">3×</h3>
            <p className="font-semibold mt-2">Longer user engagement</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-cyan-600">50&nbsp;%</h3>
            <p className="font-semibold mt-2">Lower support costs</p>
          </div>
        </Container>
      </section>

            <ImageTextSection
        imgSrc="/images/conv-dialogue.svg"
        imgAlt="Multi-turn dialogue flow illustration"
        eyebrow="Deep Context"
        headline="Support Natural, Multi-Turn Conversations"
        body={`Let your bot remember every turn—no more “I'm sorry, can you repeat that?”\nContextual state ensures follow-up questions feel seamless and human.`}
        />

        <ImageTextSection
        imgSrc="/images/conv-personalize.svg"
        imgAlt="Personalized chatbot responses illustration"
        eyebrow="Dynamic Personalisation"
        headline="Deliver Responses Tailored to Each User"
        body="Pull in profile data, order history or sentiment signals to craft replies that resonate—and convert—every time."
        reverse
        />

        <ImageTextSection
        imgSrc="/images/conv-analytics.svg"
        imgAlt="Analytics dashboard illustration"
        eyebrow="Actionable Insights"
        headline="Unlock Real-Time Analytics & Feedback Loops"
        body={`Spot trending questions, gauge customer sentiment and close the loop with auto-optimization.\nTurn every chat into a data point for continuous improvement.`}
        />


      {/* ─────────────── Why Conversational AI */}
      <section className="py-16 md:py-24 bg-muted/10">
        <Container className="space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why businesses adopt Conversational AI platforms</h2>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Natural multi‑turn dialogue', copy: 'LLMs remember context so users can ask follow‑up questions without repeating themselves.' },
              { title: 'Omni‑channel reach', copy: 'Deploy the same bot on web, mobile, WhatsApp, Instagram and voice IVR.' },
              { title: 'Continuous learning', copy: 'Improve intent accuracy with every chat via built‑in feedback loops.' },
              { title: 'Personalised experiences', copy: 'Use CRM and order data to tailor responses and boosts conversions.' },
              { title: 'Multilingual at scale', copy: 'Serve 60+ languages instantly—no separate training sets required.' },
              { title: 'Analytics you can act on', copy: 'Spot trending questions, sentiment and drop‑off points in real time.' }
            ].map((b) => (
              <div key={b.title} className="space-y-3"><h3 className="text-xl font-semibold">{b.title}</h3><p>{b.copy}</p></div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────── Implementation steps */}
      <section id="implementation" className="py-16 md:py-24">
        <Container className="space-y-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Deploy a Conversational AI Chatbot in 6 Steps</h2>
          <ol className="space-y-8 list-decimal list-inside">
            <li><h4 className="font-semibold">Define KPIs & success metrics</h4><p>Choose targets like deflection %, CSAT or average order value.</p></li>
            <li><h4 className="font-semibold">Audit knowledge sources</h4><p>Gather help‑centre articles, existing chat logs and product docs.</p></li>
            <li><h4 className="font-semibold">Label intents & entities</h4><p>Use our auto‑label tool to speed up training for topics such as billing or tech support.</p></li>
            <li><h4 className="font-semibold">Choose language model tier</h4><p>Select GPT‑3.5 for basic FAQs or GPT‑4o for advanced reasoning.</p></li>
            <li><h4 className="font-semibold">Design dialogue flows</h4><p>Drag and drop conversation paths, fallback intents, and live‑agent handoff nodes.</p></li>
            <li><h4 className="font-semibold">Launch & optimise</h4><p>Monitor analytics, A/B test prompts and iterate weekly.</p></li>
          </ol>
        </Container>
      </section>

      {/* ─────────────── Feature list */}
      <section className="py-20 bg-muted/5">
        <Container className="space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Key conversational‑AI platform features</h2>
          <ul className="grid gap-8 md:grid-cols-2">
            {[
              { title: 'Visual flow builder', copy: 'No‑code canvas to orchestrate complex dialogues.' },
              { title: 'Real‑time sentiment', copy: 'Detect customer mood and trigger smart escalations.' },
              { title: 'Voice & text channels', copy: 'Deploy to IVR, smart speakers and chat widgets from one console.' },
              { title: 'Secure webhooks', copy: 'Integrate CRM, ERP and payment gateways via signed calls.' }
            ].map((f) => (
              <li key={f.title} className="space-y-3"><h3 className="text-xl font-semibold">{f.title}</h3><p>{f.copy}</p></li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─────────────── Internal links */}
      <section className="py-16 md:py-24">
        <Container className="grid gap-10 md:grid-cols-3 text-center">
          {[
            { href: '/ai-customer-support', title: 'AI Customer Support', desc: 'Automate web chat & email.' },
            { href: '/whatsapp-ai-chatbot', title: 'WhatsApp AI Chatbot', desc: 'Launch WhatsApp support with AI.' },
            { href: '/ai-chatbot-pricing', title: 'AI Chatbot Pricing', desc: 'See cost breakdowns & ROI.' }
          ].map((link) => (
            <Link key={link.href} href={link.href} className="space-y-2 border p-6 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="font-semibold">{link.title}</h3>
              <p className="text-sm text-muted-foreground">{link.desc}</p>
            </Link>
          ))}
        </Container>
      </section>

      {/* ─────────────── FAQ */}
      <section id="faq" className="py-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10">Conversational AI FAQ</h2>
          <div className="space-y-6">
            {[
              { q: 'Is conversational AI the same as a chatbot?', a: 'A chatbot is one application of conversational AI. Conversational AI includes the NLP engine, LLMs, voice processing and analytics that power the chatbot.' },
              { q: 'Do I need thousands of training phrases?', a: 'No. Transfer learning lets you start with as few as 15 examples per intent and improve over time.' },
              { q: 'What languages are supported?', a: 'Over 60 languages including Spanish, Hindi, Arabic and German.' },
              { q: 'Can I integrate with Zendesk or Salesforce?', a: 'Yes—use secure webhooks or our native connectors to sync tickets, contacts and transcripts.' }
            ].map((faq) => (
              <details key={faq.q} className="p-4 border rounded-lg"><summary className="font-semibold cursor-pointer">{faq.q}</summary><p className="mt-2 text-muted-foreground">{faq.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA */}
      <section className="bg-cyan-600 text-primary-foreground py-20 text-center">
        <Container className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to build your conversational AI chatbot?</h2>
          <p className="text-lg">Start a free 7 day trial—no credit card required.</p><br/>
          <Link href="/book-demo"><Button size="lg" className="bg-black hover:opacity-90 text-primary">Start Free Trial</Button></Link>
        </Container>
      </section>
    </main>
  );
}

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
      <section className="relative w-full px-4 bg-gradient-to-b from-cyan-600/20 to-background pt-28 pb-20 lg:py-32 text-center">
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
      <section className="py-12 px-4 md:py-16">
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
        body="Pull in profile data, customer history or sentiment signals to craft replies that resonate—and convert—every time."
        reverse
        />

        <ImageTextSection
        imgSrc="/images/conv-analytics.svg"
        imgAlt="Analytics dashboard illustration"
        eyebrow="Actionable Insights"
        headline="Unlock Real-Time Analytics & Feedback Loops"
        body={`Spot trending questions, gauge customer sentiment and close the loop with auto-optimization.\nTurn every chat into a data point for continuous improvement.`}
        />


<section className="py-16 px-4 md:py-24 bg-muted/10">
  <Container className="space-y-12">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
      Why Businesses Choose Rhythmiq Conversational AI
    </h2>
    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
      {[
        {
          title: 'Seamless Contextual Chat',
          copy: 'Our AI retains conversation history so customers can ask follow-ups naturally; no repetition needed.'
        },
        {
          title: 'Unified Web & WhatsApp',
          copy: 'One platform to manage website chat, WhatsApp support and other channels in a single dashboard.'
        },
        {
          title: 'Instant AI Responses',
          copy: 'Resolve common queries automatically with your knowledge base—live agents only when needed.'
        },
        {
          title: 'Data-Driven Optimization',
          copy: 'Track deflection, CSAT, and conversation trends to continuously improve support.'
        }
      ].map((b) => (
        <div key={b.title} className="space-y-3 text-center">
          <h3 className="text-xl font-semibold">{b.title}</h3>
          <p>{b.copy}</p>
        </div>
      ))}
    </div>
  </Container>
</section>

<section id="implementation" className="py-16 md:py-24">
  <Container className="space-y-10 px-4 max-w-4xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center">
      Roll Out Your Conversational AI Chatbot in 6 Simple Steps
    </h2>
    <ol className="space-y-8 list-decimal list-inside">
      <li>
        <h4 className="font-semibold">Set Your Goals</h4>
        <p>
          Define what success looks like, whether it's reducing tickets, boosting CSAT, or increasing engagement.
        </p>
      </li>
      <li>
        <h4 className="font-semibold">Gather Your FAQs</h4>
        <p>
          Compile your top support articles, past chat transcripts, and product guides for AI training.
        </p>
      </li>
      <li>
        <h4 className="font-semibold">Map Intents & Responses</h4>
        <p>
          Label common customer intents (e.g. billing, shipping, returns) and write fallback templates for handoffs.
        </p>
      </li>
      <li>
        <h4 className="font-semibold">Pick Your AI Model</h4>
        <p>
          Choose a plan with the right performance—GPT-3.5 for essentials or GPT-4o for complex (comes with Omni Plan), nuanced queries.
        </p>
      </li>
      <li>
        <h4 className="font-semibold">Build & Test Flows</h4>
        <p>
          Drag and drop your conversation paths, simulate user queries, and refine until you're ready to go live.
        </p>
      </li>
      <li>
        <h4 className="font-semibold">Go Live & Monitor</h4>
        <p>
          Launch on Web and WhatsApp, then track deflection rates, response time, and customer feedback to iterate.
        </p>
      </li>
    </ol>
  </Container>
</section>


    <section className="py-20 px-4 bg-muted/5">
      <Container className="space-y-12 container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Core Conversational AI Features
        </h2>
        <ul className="grid gap-8 md:grid-cols-2 justify-items-center">
          {[
            {
              title: 'No Code Builder',
              copy: 'No code canvas for designing conversation flows and agent handoffs.'
            },
            {
              title: 'Contextual Memory',
              copy: 'Keep track of multi-turn dialogues so customers never have to repeat themselves.'
            },
            {
              title: 'Web + WhatsApp Channels',
              copy: 'Deploy your bot on both website chat and WhatsApp from a single dashboard.'
            },
            {
              title: 'Analytics & Insights',
              copy: 'Monitor chat deflection, CSAT, and pinpoint areas to optimize with real data.'
            }
          ].map((f) => (
            <li key={f.title} className="space-y-3 text-center">
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p>{f.copy}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>


      {/* ─────────────── Internal links */}
      <section className="py-16 px-4 md:py-24">
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
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10">Conversational AI FAQ</h2>
          <div className="space-y-6">
            {[
              { q: 'Is conversational AI the same as a chatbot?', a: 'A chatbot is one application of conversational AI. Conversational AI includes the NLP engine, LLMs, voice processing and analytics that power the chatbot.' },
              { q: 'Do I need a lot of Knowledge Base documents?', a: 'No. Start by explaining what is important, for rest of the parts if they are generic, you can have prompt which tells how to handle certain queries in a generic manner.' },
              { q: 'What languages are supported?', a: 'Over 60+ languages including Spanish, Hindi, English, Telugu, Bengali, Arabic and German.' },
              { q: 'Can I integrate with Zendesk or Salesforce?', a: 'Yes, use secure webhooks to sync tickets, contacts and transcripts. Omni Plan users can also prioritize feature requests specific to them.' }
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

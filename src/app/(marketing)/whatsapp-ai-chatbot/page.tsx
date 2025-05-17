// app/(marketing)/whatsapp-ai-chatbot/page.tsx
import { Metadata } from 'next';
import Container from '@/components/global/container';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import ImageTextSection from '@/components/marketing/imagetext';

export const metadata: Metadata = {
  title: 'WhatsApp AI Chatbot | Automate Customer Support on WhatsApp Business API',
  description:
    'Step by step 2025 guide to building a WhatsApp AI chatbot. Learn approval, pricing, templates, and launch flows that deflect tickets and drive 5x higher engagement.',
  alternates: {
    canonical: '/whatsapp-ai-chatbot',
  },
};

export default function WhatsAppAIChatbotPage() {
  return (
    <main className="flex flex-col">
      {/* ─────────────── Hero */}
      <section className="relative w-full bg-gradient-to-b from-green-600/20 to-background pt-28 pb-20 lg:py-32 text-center">
        <Container className="space-y-6">
          <h1 className="mx-auto max-w-4xl font-bold text-4xl md:text-5xl lg:text-7xl leading-tight">
            Build a <span className="text-green-600">WhatsApp&nbsp;AI&nbsp;Chatbot</span> in Minutes
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-base md:text-lg">
            Launch a compliant WhatsApp chatbot that automates FAQs, order updates, and rich media campaigns—no code required.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/book-demo">
              <Button size="lg">Start Free Trial</Button>
            </Link>
            <Link href="#flow" className="flex items-center gap-2 group text-green-700 font-medium">
              <span>See How</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ─────────────── Definition snippet */}
      <section className="py-12 md:py-16">
        <Container>
          <p className="mx-auto max-w-3xl text-lg md:text-xl font-medium leading-relaxed">
            A <strong>WhatsApp AI chatbot</strong> is an automated conversational agent that runs on the official WhatsApp Business API. It understands natural language, sends templated notifications, and resolves customer requests—24 x 7—without human intervention.
          </p>
        </Container>
      </section>

      {/* ─────────────── ROI Highlights */}
      <section className="py-16 md:py-20">
        <Container className="grid gap-10 md:grid-cols-3 text-center">
          <div>
            <h3 className="text-4xl font-bold text-green-600">98&nbsp;%</h3>
            <p className="font-semibold mt-2">Message open rate</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-green-600">45&nbsp;%</h3>
            <p className="font-semibold mt-2">Faster resolution time</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-green-600">5×</h3>
            <p className="font-semibold mt-2">Higher conversions vs. email</p>
          </div>
        </Container>
      </section>

      {/* ─────────────── Why WhatsApp automation */}
      <section className="py-16 md:py-24 bg-muted/10">
        <Container className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Why automate customer service on WhatsApp in 2025
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Global reach, local trust',
                copy: '2.7 billion users already trust WhatsApp for daily chats—meet them where they live.'
              },
              {
                title: 'Rich media answers',
                copy: 'Send images, PDFs, voice notes and location pins directly in the chat.'
              },
              {
                title: 'Verified business profile',
                copy: 'Green tick improves credibility and click through rates.'
              },
              {
                title: '24 x 7 multilingual support',
                copy: 'Serve English, Hindi, Tamil, Spanish and 60+ languages via AI translation.'
              },
              {
                title: 'Opt in notifications',
                copy: 'Trigger order updates, payment reminders and back in stock alerts with template messages.'
              },
              {
                title: 'Cheaper than SMS',
                copy: 'Cut notification costs up to 60 % while keeping delivery rates near 100 %.'
              }
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

            <ImageTextSection
        imgSrc="/images/wa-catalog.svg"
        imgAlt="Product catalog icon"
        eyebrow="E-commerce"
        headline="Let shoppers buy direct from chat"
        body="Show carousels, size guides and payment links inside WhatsApp to trim cart abandonment."
        />

        <ImageTextSection
        imgSrc="/images/wa-voice.svg"
        imgAlt="Voice note to text icon"
        eyebrow="Voice Note Magic"
        headline="Auto-transcribe and summarise voice notes"
        body="Your bot converts long voice messages to text, sends concise replies, and logs everything to your help desk."
        reverse
        />

        <ImageTextSection
        imgSrc="/images/wa-cart.svg"
        imgAlt="Recover cart icon"
        eyebrow="Recovery Nudges"
        headline="Recover up to 30 % more abandoned carts"
        body="Triggered template messages remind customers to finish checkout—with personal discount codes."
        />


      {/* ─────────────── Implementation flow */}
      <section id="flow" className="py-16 md:py-24">
        <Container className="space-y-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Launch Your WhatsApp Bot in 5 Steps</h2>
          <ol className="space-y-8 list-decimal list-inside">
            <li>
              <h4 className="font-semibold">Apply for WhatsApp Business API</h4>
              <p>Submit your Facebook Business verification and display name. Most brands get approval in 48 hours.</p>
            </li>
            <li>
              <h4 className="font-semibold">Connect Rhythmiq as your BSP</h4>
              <p>Rhythmiq handles message routing, template management and hosting—no server setup required.</p>
            </li>
            <li>
              <h4 className="font-semibold">Sync FAQs & intents</h4>
              <p>Import your knowledge base, then label intents like <em>order status</em>, <em>refund</em> and <em>account login</em>.</p>
            </li>
            <li>
              <h4 className="font-semibold">Design flows with drag and drop</h4>
              <p>Create rich media journeys: product carousels, payment links, voice to text capture.</p>
            </li>
            <li>
              <h4 className="font-semibold">Go live & monitor analytics</h4>
              <p>Track open rate, CSAT and ticket deflection. Optimise templates and prompts weekly.</p>
            </li>
          </ol>
        </Container>
      </section>

      {/* ─────────────── Feature list */}
      <section className="py-20">
        <Container className="space-y-12 container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Key WhatsApp Chatbot Features</h2>
          <ul className="grid gap-8 md:grid-cols-2">
            {[
              { title: 'Quick‑reply buttons', copy: 'Increase completion rate with one‑tap replies and CTA buttons.' },
              { title: 'Voice‑to‑text bot', copy: 'Auto‑transcribe voice notes and answer in text or audio.' },
              { title: 'E‑commerce integrations', copy: 'Sync Shopify, WooCommerce or custom cart and send order updates automatically.' },
              { title: 'Smart routing', copy: 'Transfer high‑value chats to live agents in Zendesk or Intercom with full context.' }
            ].map((f) => (
              <li key={f.title} className="space-y-3">
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p>{f.copy}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─────────────── Internal links */}
      <section className="py-16 md:py-24">
        <Container className="grid gap-10 md:grid-cols-3 text-center">
          {[
            { href: '/ai-customer-support', title: 'AI Customer Support Guide', desc: 'Automate web chat and email with AI.' },
            { href: '/ai-chatbot-pricing', title: 'AI Chatbot Pricing', desc: 'Compare vendor costs & ROI.' },
            { href: '/conversational-ai-chatbot', title: 'Conversational AI Chatbot Guide', desc: 'Build natural, multi-turn chatbots powered by NLP and large-language models.' }
          ].map((link) => (
            <Link key={link.href} href={link.href} className="space-y-2 border p-6 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="font-semibold">{link.title}</h3>
              <p className="text-sm text-muted-foreground">{link.desc}</p>
            </Link>
          ))}
        </Container>
      </section>

   {/* FAQ */}
<section id="faq" className="py-20">
  <div className="container mx-auto max-w-3xl">
    <h2 className="text-3xl font-bold text-center mb-10">
      WhatsApp&nbsp;AI&nbsp;Chatbot&nbsp;FAQ
    </h2>

    <div className="space-y-6">
      <details className="p-4 border rounded-lg">
        <summary className="font-semibold">
          How do I connect the chatbot to the WhatsApp&nbsp;Business&nbsp;API?
        </summary>
        <p className="mt-2">
          Simply paste your BSP (Business Solution Provider) credentials in the dashboard,
          map your phone number, and click “Activate.” Most teams are live in
          under 15 minutes once Meta approves the number.
        </p>
      </details>

      <details className="p-4 border rounded-lg">
        <summary className="font-semibold">
          Is the bot officially approved by Meta / WhatsApp?
        </summary>
        <p className="mt-2">
          Yes—every deployment runs through Meta’s WhatsApp&nbsp;Business
          verification flow. We use approved message templates and stay within
          the 24-hour customer-care window.
        </p>
      </details>

      <details className="p-4 border rounded-lg">
        <summary className="font-semibold">
          Does it work in multiple languages?
        </summary>
        <p className="mt-2">
          Absolutely. The AI supports 60 + languages out-of-the-box, including
          Hindi, Tamil, Telugu, Spanish and Arabic. It automatically matches the
          user’s language or falls back to English.
        </p>
      </details>

      <details className="p-4 border rounded-lg">
        <summary className="font-semibold">
          What does it cost after the free trial?
        </summary>
        <p className="mt-2">
          Pricing starts at $49 /month for 2 000 conversations, with pay-as-you-go
          WhatsApp template fees. Custom annual plans are available for high-volume brands.
        </p>
      </details>
    </div>
  </div>
</section>


      {/* ─────────────── CTA */}
      <section className="bg-green-600 text-primary-foreground py-20 text-center">
        <Container className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to launch your WhatsApp AI Chatbot?</h2>
          <p className="text-lg">Start a free 7 day trial—no credit card required.</p><br/>
          <Link href="/book-demo">
            <Button size="lg" className="bg-black hover:opacity-90 text-primary">
              Book a Demo
            </Button>
          </Link>
        </Container>
      </section>
    </main>
  );
}

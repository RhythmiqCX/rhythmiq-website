// app/(marketing)/whatsapp-ai-chatbot/page.tsx
import Container from '@/components/global/container';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import ImageTextSection from '@/components/marketing/imagetext';
import { generateMetadata } from '@/utils';

export const metadata = generateMetadata({
  title: 'WhatsApp AI Chatbot | Automate Customer Support on WhatsApp Business API',
  description:
    'Step by step 2025 guide to building a WhatsApp AI chatbot. Learn approval, pricing, templates, and launch flows that deflect tickets and drive 5x higher engagement.',
  alternates: {
    canonical: '/whatsapp-ai-chatbot',
  },
});

export default function WhatsAppAIChatbotPage() {
  return (
    <main className="flex flex-col">
      {/* ─────────────── Hero */}
      <section className="relative w-full px-4 bg-gradient-to-b from-green-600/20 to-background pt-28 pb-20 lg:py-32 text-center">
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
      <section className="py-12 px-4 md:py-16">
        <Container>
          <p className="mx-auto max-w-3xl text-lg md:text-xl font-medium leading-relaxed">
            A <strong>WhatsApp AI chatbot</strong> is an automated conversational agent that runs on the official WhatsApp Business API. It understands natural language, sends templated notifications, and resolves customer requests 24 x 7 without human intervention.
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
            <h3 className="text-4xl font-bold text-green-600">5x</h3>
            <p className="font-semibold mt-2">Higher conversions vs. email</p>
          </div>
        </Container>
      </section>

      {/* ─────────────── Why WhatsApp automation */}
      <section className="py-16 px-4 md:py-24 bg-muted/10">
        <Container className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Why automate customer service on WhatsApp in 2025
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Global reach, local trust',
                copy: '2.7 billion users already trust WhatsApp for daily chats, meet them where they live.'
              },
              {
                title: 'Rich media answers',
                copy: 'Send images, voice notes and other media directly in the chat.'
              },
              {
                title: 'Verified business profile',
                copy: 'Green tick improves credibility and click through rates.'
              },
              {
                title: '24 x 7 multilingual support',
                copy: 'Serve English, Hindi, Bengali, Telugu, Tamil, Spanish and 60+ languages via AI translation.'
              },
              {
                title: 'Opt in notifications',
                copy: 'Trigger order updates, payment reminders and back in stock alerts with template messages.'
              },
              {
                title: 'Cheaper than SMS',
                copy: 'Cut notification costs up to 60% while keeping delivery rates near 100%.'
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
      imgAlt="Product information icon"
      eyebrow="Instant Info"
      headline="Answer FAQs and order queries instantly"
      body="Let customers ask about order status, shipping updates, and product details right from WhatsApp, no wait time."
    />

    <ImageTextSection
      imgSrc="/images/wa-voice.svg"
      imgAlt="Voice message icon"
      eyebrow="Hands-Free Help"
      headline="Handle voice with AI-powered accuracy"
      body="Customers can send voice messages; your bot transcribes, understands intent, and replies accurately to their queries."
      reverse
    />

    <ImageTextSection
      imgSrc="/images/wa-cart.svg"
      imgAlt="Order support icon"
      eyebrow="Order Assistance"
      headline="Resolve order issues in seconds"
      body="From cancellations to return requests, your WhatsApp bot guides customers through order support without human delays."
    />


    <section id="flow" className="py-16 px-4 md:py-24">
      <Container className="space-y-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Set Up Your WhatsApp Support Bot in 5 Simple Steps
        </h2>
        <ol className="space-y-8 list-decimal list-inside">
          <li>
            <h4 className="font-semibold">Get WhatsApp Business API Access</h4>
            <p>
              Provide your business details, and we'll handle verification and approval—usually live within 48 hours.
            </p>
          </li>
          <li>
            <h4 className="font-semibold">Connect Your WhatsApp Number</h4>
            <p>
              Link your existing number or let us provision one. We manage all BSP integration, message routing, and templates.
            </p>
          </li>
          <li>
            <h4 className="font-semibold">Upload Your FAQs & KB</h4>
            <p>
              Import your help articles, order policies, and support guides so the AI has the right answers at its fingertips.
            </p>
          </li>
          <li>
            <h4 className="font-semibold">Configure Intents & Workflows</h4>
            <p>
              Use our bot builder to map queries like <em>order status</em>, <em>refund</em>, and <em>store hours</em> to automated responses.
            </p>
          </li>
          <li>
            <h4 className="font-semibold">Launch & Analyze</h4>
            <p>
              Go live and monitor response rates, open rate, resolution time, and CSAT. Tweak workflows monthly to keep support sharp.
            </p>
          </li>
        </ol>
      </Container>
    </section>

      {/* ─────────────── Feature list */}
          <section className="py-20 px-4">
      <Container className="space-y-12 container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Core WhatsApp Support Features
        </h2>
        <ul className="text-center grid gap-8 md:grid-cols-2">
          {[
            { title: 'Template Management', copy: 'Pre-approved WhatsApp templates for order updates, refunds, and alerts.' },
            { title: 'AI-Powered Auto Replies', copy: 'Instant answers to common queries with fallback to live agents when needed.' },
            { title: 'Voice Note Support', copy: 'Transcribe and respond to customer voice messages automatically.' },
            { title: 'Unified Inbox', copy: 'View WhatsApp chats alongside web chats - no more platform switching.' }
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
      <section className="py-16 px-4 md:py-24">
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
    <section id="faq" className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-10">
          WhatsApp AI Chatbot FAQ
        </h2>

        <div className="space-y-6">
          <details className="p-4 border rounded-lg">
            <summary className="font-semibold">
              How do I set up my WhatsApp number?
            </summary>
            <p className="mt-2">
              After you buy a WhatsApp plan, we’ll guide you through connecting your existing number or getting a new one. No extra BSP setup needed—Rhythmiq handles everything.
            </p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold">
              Can I use my own BSP account?
            </summary>
            <p className="mt-2">
              Yes. If you already have a WhatsApp Business API provider, simply paste your API credentials in our dashboard and we’ll connect you immediately.
            </p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold">
              What happens if WhatsApp changes pricing?
            </summary>
            <p className="mt-2">
              We pass through Meta’s conversation rates without markup and adjust our overage fees accordingly. You get full visibility of any rate changes in your invoice.
            </p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold">
              How quickly can I add more agents?
            </summary>
            <p className="mt-2">
              You can add agents with just a few clicks—new seats activate instantly and are billed at ₹500 or $7 per agent per month, after the 5 initial that come with your plan.
            </p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold">
              Is there a trial available?
            </summary>
            <p className="mt-2">
              Yes, every plan includes a 7-day trial with full WhatsApp support features - no credit card required.
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

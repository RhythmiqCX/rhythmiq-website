// app/(marketing)/ai-chatbot-pricing/page.tsx
import { Metadata } from 'next';
import Container from '@/components/global/container';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import ImageTextSection from '@/components/marketing/imagetext';
import Pricing from '@/components/marketing/pricing';

export const metadata: Metadata = {
  title: 'AI Chatbot Pricing 2025 | Costs, ROI & Vendor Comparison',
  description:
    'Full 2025 breakdown of Rhythmiq AI chatbot pricing. Compare license fees, hosting, WhatsApp BSP charges and total cost of ownership before you buy.',
  alternates: {
    canonical: '/ai-chatbot-pricing',
  },
};

export default function AIChatbotPricingPage() {
  return (
    <main className="flex flex-col">
      {/* ─────────────── Hero */}
      <section className="relative w-full bg-gradient-to-b from-indigo-600/20 to-background pt-28 pb-20 lg:py-32 text-center px-4">
        <Container className="space-y-6">
          <h1 className="mx-auto max-w-4xl font-bold text-4xl md:text-5xl lg:text-7xl leading-tight">
            Rhythmiq <span className="text-indigo-600">AI&nbsp;Chatbot&nbsp;Pricing</span> for 2025
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-base md:text-lg">
            Understand every cost, discover the plan which suits your needs more, so you never overpay for automation.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/book-demo">
              <Button size="lg">Get Custom Quote</Button>
            </Link>
            <Link href="#pricingtab" className="flex items-center gap-2 group text-indigo-700 font-medium">
              <span>See Plans</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ─────────────── Definition snippet */}
      <section className="py-12 md:py-16 px-4">
        <Container>
          <p className="mx-auto max-w-3xl text-lg md:text-xl font-medium leading-relaxed">
            <strong>AI chatbot pricing</strong> refers to the total cost of deploying and running a conversational AI assistant — covering platform licence, custom integration charges (if applicable), hosting, channel add ons like WhatsApp Business&nbsp;API, and optional Webhook services.
          </p>
        </Container>
      </section>

      {/* ─────────────── Quick cost ranges */}
      {/* <section className="py-16 md:py-20">
        <Container className="grid gap-10 md:grid-cols-3 text-center">
          <div>
            <h3 className="text-4xl font-bold text-indigo-600">$0.01–$0.05</h3>
            <p className="font-semibold mt-2">Per chat on web & in‑app</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-indigo-600">$0.03–$0.08</h3>
            <p className="font-semibold mt-2">Per conversation on WhatsApp</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-indigo-600">$49–$499</h3>
            <p className="font-semibold mt-2">Monthly platform licence</p>
          </div>
        </Container>
      </section> */}

      {/* ─────────────── Why pricing varies */}
      {/* <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Four factors that drive AI chatbot cost
          </h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
            {[
              { title: 'Conversation volume', copy: 'Most vendors charge by number of monthly chats or 24 hour sessions.' },
              { title: 'Channels enabled', copy: 'WhatsApp, Instagram and SMS add separate per‑conversation fees.' },
              { title: 'Language models used', copy: 'Premium GPT 4o or multilingual models add $3 to 15 /1 k messages.' },
              { title: 'Support SLAs', copy: '24 x 7 dedicated support increases licence tiers.' }
            ].map((f) => (
              <div key={f.title} className="space-y-3">
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p>{f.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <Pricing/>

      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Four factors that drive AI chatbot cost
          </h2>
          <ul className="grid gap-8 md:grid-cols-2">
            <li className="space-y-2">
              <h3 className="text-xl font-semibold">
              Number of Agents
              </h3>
              <p>
              Rhythmiq is priced on a per agent basis, not on the number or volume of messages sent.
              </p>
            </li>
            <li className="space-y-2">
              <h3 className="text-xl font-semibold">
              Channels enabled
              </h3>
              <p>
              WhatsApp, Web, SMS or custom integrations can be treated as add on features.
              </p>
            </li>
            <li className="space-y-2">
              <h3 className="text-xl font-semibold">
              Language models used
              </h3>
              <p>
              Premium GPT 4o or multilingual models cost more for messages but would yield better quality responses.
              </p>
            </li>
            <li className="space-y-2">
              <h3 className="text-xl font-semibold">
              Support SLAs
              </h3>
              <p>
              24 x 7 dedicated support or short SLAs would mean more agents resulting in higher pricing.
              </p>
            </li>
          </ul>
        </div>
      </section>

            <ImageTextSection
        imgSrc="/images/price-wallet.svg"
        imgAlt="Wallet icon"
        eyebrow="Predictable Costs"
        headline="Flat per-seat license, no surprises"
        body="Pay Flat fee for your Plan, Add agents only if necessary"
        />

        <ImageTextSection
        imgSrc="/images/price-roi.svg"
        imgAlt="ROI graph icon"
        eyebrow="ROI on your support"
        headline="Break even in < 60 days"
        body="Savings on support head-count, increase sales and improve onboarding on customers."
        reverse
        />

        <ImageTextSection
        imgSrc="/images/price-shield.svg"
        imgAlt="Compliance shield icon"
        eyebrow="Compliance Bundled"
        headline="ISO 9001, SOC 2, GDPR & HIPAA at no extra cost"
        body="Industry grade security and regional data hosting included — even on starter plans."
        />


      {/* ─────────────── Detailed breakdown steps */}
      <section id="breakdown" className="py-16 px-4 md:py-24">
        <Container className="space-y-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Calculate Your Total Cost in 4 Steps</h2>
          <ol className="space-y-8 list-decimal list-inside">
            <li>
              <h4 className="font-semibold">Estimate monthly conversations</h4>
              <p>Check your current ticket volume or web chat/bot sessions and add a 30% buffer for growth. AI will cover as many of your queries using the knowledge base it is trained on.</p>
            </li>
            <li>
              <h4 className="font-semibold">Pick your channels</h4>
              <p>Web chatbot is cheapest; WhatsApp Business is charged on a BSP level for per conversation. A conversation is defined as a chat with customer over Whatsapp in a 24 hour window. Choose the Omni channel support if you want custom channel integration also.</p>
            </li>
            <li>
              <h4 className="font-semibold">Choose model tier</h4>
              <p>Based on whether you want to just use Web widget, Whatsapp or all the channels, choose your desired plan</p>
            </li>
            <li>
              <h4 className="font-semibold">Add service extras</h4>
              <p>Only add more agents, conversations, numbers if needed. Talk to our sales team for a custom quote that will help you save the most</p>
            </li>
          </ol>
        </Container>
      </section>

      {/* ─────────────── Feature list (price‑centric) */}
<section className="py-20 bg-muted/5 px-4">
  <Container className="space-y-12">
    <h2 className="text-3xl md:text-4xl font-bold text-center">
      What’s included in Rhythmiq plans
    </h2>

    {/* Center the grid items */}
    <ul className="grid gap-8 md:grid-cols-2 justify-items-center">
      {[
        { title: '5 agents', copy: '5 Customer support agents in your team can collaborate and manage queries.' },
        { title: 'LLM usage included', copy: 'Generous GPT token allowance on every tier' },
        { title: 'Free Virtual Number and Conversations for Whatsapp', copy: '1k+ convos in WA based on plans, so you focus on the customers and let us handle the logisitics on Whatsapp Business side' },
        { title: '24 x 7 email & chat support', copy: 'All plans get real human help in within SLA.' }
      ].map((item) => (
        <li key={item.title} className="space-y-3 text-center">
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p>{item.copy}</p>
        </li>
      ))}
    </ul>
  </Container>
</section>


      {/* ─────────────── Internal links */}
      <section className="py-16 px-4 md:py-24">
        <Container className="grid gap-10 md:grid-cols-3 text-center">
          {[
            { href: '/ai-customer-support', title: 'AI Customer Support Guide', desc: 'Automate web chat & email with AI.' },
            { href: '/whatsapp-ai-chatbot', title: 'WhatsApp AI Chatbot', desc: 'Launch compliant WhatsApp support.' },
            { href: '/conversational-ai-chatbot', title: 'Conversational AI Chatbot Guide', desc: 'Build natural, multi-turn chatbots powered by NLP and large-language models.' }
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
            <h2 className="text-3xl font-bold text-center mb-10">AI Chatbot Pricing FAQ</h2>
            <div className="space-y-6">
            <details className="p-4 border rounded-lg">
                <summary className="font-semibold">How many agents are included in each plan?</summary>
                <p className="mt-2">Each plan comes with up to 5 agents. You can add more agents as add-ons for ₹500/person or $10/person per month.</p>
            </details>
            <details className="p-4 border rounded-lg">
                <summary className="font-semibold">What happens if I exceed my WhatsApp conversation quota?</summary>
                <p className="mt-2">Extra conversations are billed at ₹0.75 per conversation (approx. $0.08) for WhatsApp plans.</p>
            </details>
            <details className="p-4 border rounded-lg">
                <summary className="font-semibold">Can I roll over unused WhatsApp conversations?</summary>
                <p className="mt-2">Yes, unused WhatsApp conversations roll over for 30 days. Use them within that period before they expire.</p>
            </details>
            <details className="p-4 border rounded-lg">
                <summary className="font-semibold">Do I need my own WhatsApp number?</summary>
                <p className="mt-2">No, Rhythmiq provides and manages your WhatsApp Business API number and other configuration. Just purchase a plan and we'll handle setup and compliance.</p>
            </details>
            <details className="p-4 border rounded-lg">
                <summary className="font-semibold">Is there a trial available?</summary>
                <p className="mt-2">We offer a 7-day free trial on any plan, including full access to web chat and WhatsApp features — no credit card required.</p>
            </details>
            </div>
        </div>
        </section>

      {/* ─────────────── CTA */}
      <section className="bg-indigo-600 text-primary-foreground py-20 text-center">
        <Container className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to see exact pricing for your use case?</h2>
          <p className="text-lg">Start a free 7 day trial—no credit card required.</p> <br/>
          <Link href="/book-demo">
            <Button size="lg" className="bg-black hover:opacity-90 text-primary">
              Get My Quote
            </Button>
          </Link>
        </Container>
      </section>
    </main>
  );
}

// app/(marketing)/ai-customer-support/page.tsx
import { Metadata } from 'next';
import Container from '@/components/global/container'
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Button } from "@/components/ui/button";
import Icons from "@/components/global/icons";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import ImageTextSection from '@/components/marketing/imagetext';

export const metadata: Metadata = {
  title: 'AI Customer Support Chatbot | Omni-Channel Automation & CSAT Boost',
  description:
    'Deploy an AI-powered customer support chatbot that deflects tickets, resolves FAQs and boosts CSAT across web, WhatsApp & more. Start a free demo today.',
  alternates: {
    canonical: '/ai-customer-support',
  },
};

export default function AICustomerSupportPage() {
  return (
    <main className="flex flex-col">
        <div className="relative flex flex-col items-center justify-center w-full py-20">

<div className="absolute flex lg:hidden size-40 rounded-full bg-blue-500 blur-[10rem] top-0 left-1/2 -translate-x-1/2 -z-10"></div>

<div className="flex flex-col items-center justify-center gap-y-8 relative">
    <Container className="hidden lg:flex absolute inset-0 top-0 mb-auto flex-col items-center justify-center w-full min-h-screen -z-10">
        <OrbitingCircles
            speed={0.5}
            radius={300}
        >
            <Icons.circle1 className="size-4 text-foreground/70" />
            <Icons.circle2 className="size-1 text-foreground/80" />
        </OrbitingCircles>
        <OrbitingCircles
            speed={0.25}
            radius={400}
        >
            <Icons.circle2 className="size-1 text-foreground/50" />
            <Icons.circle1 className="size-4 text-foreground/60" />
            <Icons.circle2 className="size-1 text-foreground/90" />
        </OrbitingCircles>
        <OrbitingCircles
            speed={0.1}
            radius={500}
        >
            <Icons.circle2 className="size-1 text-foreground/50" />
            <Icons.circle2 className="size-1 text-foreground/90" />
            <Icons.circle1 className="size-4 text-foreground/60" />
            <Icons.circle2 className="size-1 text-foreground/90" />
        </OrbitingCircles>
    </Container>

    <div className="flex flex-col items-center justify-center text-center gap-y-4 bg-background/0">
        <Container>
            <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold text-center !leading-tight max-w-4xl mx-auto">
                AI Customer Support {" "}
                <span className="">
                    Chatbot {" "}
                </span>
                {/* with AI */}
            </h1>
        </Container>
        <Container delay={0.2}>
            <p className="max-w-xl mx-auto mt-2 text-base lg:text-lg text-center text-muted-foreground">
                {/* AI-powered automation and insights to maximize your campaigns and grow your brand. */}
                Automate tickets, boost CSAT and delight customers 24x7 across web, WhatsApp & more.
            </p>
        </Container>
        <Container delay={0.25} className="z-20">
            <div className="flex items-center justify-center mt-6 gap-x-4">
                <Link href="/#waitlist" className="flex items-center gap-2 group">
                    <Button size="lg">
                        Explore
                        <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-all duration-300" />
                    </Button>
                </Link>
            </div>
        </Container>
    </div>
</div>
</div>

      {/* Value props */}
      <section className="py-16 ">
        <div className="container mx-auto grid gap-12 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              <span className="emoji">⚡</span> 70 % Ticket Deflection
            </h3>
            <p>
              Resolve repetitive queries instantly with our intent aware AI
              support assistant and cut average handle time by up to 70 %.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              <span className="emoji">📈</span> 35 % Higher CSAT
            </h3>
            <p>
              Customers get instant, accurate answers: no queues, no IVR. Faster
              first response equals happier users.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              <span className="emoji">💰</span> 50 % Support Cost Savings
            </h3>
            <p>
              Reduce live agent workload and reinvest savings into growth while
              still offering human quality support.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <p className="mx-auto max-w-3xl text-lg md:text-xl font-medium leading-relaxed">
            <strong>AI customer support</strong> is the use of conversational AI — large language model chatbots, intent detection and automated workflows to resolve customer questions without a human agent. It hooks into your existing help desk, knowledge base and channels so customers get instant, accurate answers 24 hours a day.
          </p>
        </Container>
      </section>

      {/* Feature list */}
      <section id="features" className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Omni Channel AI Support, Ready Out-of-the-Box
          </h2>
          <ul className="grid gap-8 md:grid-cols-2">
            <li className="space-y-2">
              <h3 className="text-xl font-semibold">
                Web & In App Chatbot
              </h3>
              <p>
                Embed a conversational AI widget that understands natural 
                language and pulls answers from your knowledge base.
              </p>
            </li>
            <li className="space-y-2">
              <h3 className="text-xl font-semibold">
                WhatsApp Business
              </h3>
              <p>
                Handle customer queries on Whatsapp directly from your integrated Inbox
                perfect for mobile as well as web users.
              </p>
            </li>
            <li className="space-y-2">
              <h3 className="text-xl font-semibold">
                Multilingual NLP
              </h3>
              <p>
                Serve customers in English, Hindi, Spanish and 60+ languages
                with region tuned large language models.
              </p>
            </li>
            <li className="space-y-2">
              <h3 className="text-xl font-semibold">
                Live Agent Handoff
              </h3>
              <p>
                Seamlessly transfer complex cases to actual Cutomer Support representatives or your
                CRM with full context & AI generated summaries.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <ImageTextSection
        imgSrc="/images/support-instant.svg"
        imgAlt="Instant answer icon"
        eyebrow="Instant Answers"
        headline="Resolve 70 % of tickets in under 2 seconds"
        body={`LLM-powered intent detection pulls answers straight from your knowledge base.\nNo queues, no IVR, just happy customers.`}
        />

        <ImageTextSection
        imgSrc="/images/support-handoff.svg"
        imgAlt="Agent handoff icon"
        eyebrow="Seamless Handoff"
        headline="Escalate complex chats with full context"
        body="If confidence drops, the bot hands over to a live agent with a summarised transcript—zero customer repetition."
        reverse
        />

        <ImageTextSection
        imgSrc="/images/support-multilingual.svg"
        imgAlt="Multilingual globe icon"
        eyebrow="Global Reach"
        headline="Serve 60 + languages out-of-the-box"
        body="Region-tuned models auto-detect and respond in your user’s language, boosting CSAT across borders."
        />



    <section id="implementation" className="py-16 md:py-24 bg-muted/5">
      <Container className="space-y-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          How to Get Started with Rhythmiq in 5 Steps
        </h2>
        <ol className="space-y-8 list-decimal list-inside">
          <li>
            <h4 className="font-semibold">Select Your Plan & Add Agents</h4>
            <p>
              Choose the Web, WhatsApp, or Omni plan and invite up to 5 agents. Need more seats? You can add them anytime as add‑ons.
            </p>
          </li>
          <li>
            <h4 className="font-semibold">Connect Your Channels</h4>
            <p>
              Embed our web chat widget on your site and link your WhatsApp Business number. We handle BSP setup and template approval for you.
            </p>
          </li>
          <li>
            <h4 className="font-semibold">Upload Your Knowledge Base</h4>
            <p>
              Sync FAQs, help‑centre articles, and policy docs so our AI replies with accurate, brand‑approved answers.
            </p>
          </li>
          <li>
            <h4 className="font-semibold">Configure AI Intents & Fallbacks</h4>
            <p>
              Label your key topics (e.g. orders, returns, account issues) and set confidence thresholds. Low‑confidence chats automatically go to live agents.
            </p>
          </li>
          <li>
            <h4 className="font-semibold">Monitor & Optimize Monthly</h4>
            <p>
              Track chat deflection, CSAT, and conversation volume. Adjust prompts, expand KB, or increase quotas to continuously improve support.
            </p>
          </li>
        </ol>
      </Container>
    </section>


      <section className="py-16 md:py-24">
        <Container className="grid gap-10 md:grid-cols-3 text-center">
          {[
            { href: '/whatsapp-ai-chatbot', title: 'WhatsApp AI Chatbot Guide', desc: 'Launch compliant WhatsApp support with AI.' },
            { href: '/ai-chatbot-pricing', title: 'AI Chatbot Pricing', desc: 'Costs, vendor fees and ROI math.' },
            { href: '/conversational-ai-chatbot', title: 'Conversational AI Chatbot Guide', desc: 'Build natural, multi-turn chatbots powered by NLP and large-language models.' },
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
            AI Customer Support FAQ
          </h2>
          <div className="space-y-6">
            <details className="p-4 border rounded-lg">
              <summary className="font-semibold">
                Can an AI customer support chatbot handle complex queries?
              </summary>
              <p className="mt-2">
                Yes. Our generative AI first tries to resolve the issue
                using your knowledge base. If confidence is low, it escalates to
                a live agent with a conversation summary so that nothing is lost.
              </p>
            </details>
            <details className="p-4 border rounded-lg">
              <summary className="font-semibold">
                How long does implementation take?
              </summary>
              <p className="mt-2">
                Most teams launch within 15 minutes: connect your help desk,
                paste the widget snippet, and you're live. WhatsApp approval
                typically adds 2-3 business days.
              </p>
            </details>
            <details className="p-4 border rounded-lg">
              <summary className="font-semibold">
                Is the AI chatbot GDPR & HIPAA compliant?
              </summary>
              <p className="mt-2">
                Yes. Data can be kept in region (depending on country). We encrypt at rest
                and in transit and keep full audit logs for regulatory
                compliance.
              </p>
            </details>
            <details className="p-4 border rounded-lg">
              <summary className="font-semibold">
                What languages does the chatbot support?
              </summary>
              <p className="mt-2">
                Over 60+ languages including English, Hindi, Bengali, Telugu, Tamil, Spanish, German, and
                French. Ideal for global products.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-500 text-primary-foreground py-16">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Ready to See AI Customer Support in Action?
          </h2>
          <p>Start a free 7 day trial—no credit card required.</p>
          <a
            href="/"
            className="inline-block rounded-xl px-8 py-4 font-semibold bg-black text-primary"
          >
            Book a Demo
          </a>
        </div>
      </section>
    </main>
  );
}

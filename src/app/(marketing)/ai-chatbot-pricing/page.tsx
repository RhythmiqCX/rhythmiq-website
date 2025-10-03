// app/(marketing)/ai-chatbot-pricing/page.tsx
import Container from '@/components/global/container';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import ImageTextSection from '@/components/marketing/imagetext';
import Pricing from '@/components/marketing/pricing';
import { generateMetadata } from '@/utils';

// Get current year dynamically
const currentYear = new Date().getFullYear();

export const metadata = generateMetadata({
  title: `AI Web Widget Pricing ${currentYear} | Transparent Costs & Plans`,
  description:
    `Simple, transparent pricing for Rhythmiq's AI web widget. Per Plan pricing with unlimited agents, no hidden fees. Compare plans and find the right fit for your business.`,
  alternates: {
    canonical: '/ai-chatbot-pricing',
  },
});

export default function AIChatbotPricingPage() {
  return (
    <main className="flex flex-col overflow-x-hidden">
      {/* ─────────────── Hero */}
      <section className="relative w-full bg-gradient-to-b from-indigo-600/20 to-background pt-28 pb-20 lg:py-32 text-center px-4">
        <Container className="space-y-6">
          <h1 className="mx-auto max-w-4xl font-bold text-4xl md:text-5xl lg:text-7xl leading-tight">
            Rhythmiq <span className="text-indigo-600">Web Widget&nbsp;Pricing</span> for {currentYear}
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-base md:text-lg">
            Simple, transparent pricing for AI powered customer support. No hidden fees, no per message charges. We beat our competitors on pricing on every single plan and objective metric, providing you the best value for your money.
          </p>
          <div className="flex justify-center gap-4">
            {/* <Link href="/book-demo">
              <Button size="lg">Get Custom Quote</Button>
            </Link> */}
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
          <div className="mx-auto max-w-4xl prose prose-lg prose-slate dark:prose-invert">
            <p className="text-xl leading-relaxed text-muted-foreground">
              <strong className='font-bold text-indigo-600'>AI web widget pricing</strong> covers everything you need to deploy intelligent customer support on your website. From the core platform license and AI model usage to custom integrations and advanced features: we've made pricing transparent so you know exactly what you're paying for.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Unlike traditional support tools that nickel-and-dime you with per-message fees, Rhythmiq uses a simple per-agent model. One price includes  conversations, AI processing, and all the features you need to deliver exceptional customer experiences.
            </p>
          </div>
        </Container>
      </section>

      <Pricing/>

      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What determines your web widget cost
            </h2>
            <div className="mx-auto max-w-3xl prose prose-lg prose-slate dark:prose-invert">
              <p className="text-lg text-muted-foreground">
                Unlike complex enterprise tools with confusing pricing tiers, Rhythmiq keeps it simple. Here's what actually affects your monthly cost with other products on the market and how Rhythmiq beats them on every single metric.
              </p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-card/50 rounded-xl p-6 border border-border/50">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3 text-indigo-400">1</span>
                Number of Support Agents
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Each plan includes a set number of agents who can manage conversations. With us you get unlimited agents on every plan. No nickel and dimeing you with per agent charges.
              </p>
            </div>
            <div className="bg-card/50 rounded-xl p-6 border border-border/50">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3 text-indigo-400">2</span>
                AI Model & Processing
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All plans include generous AI processing allowances, which mean we train on as many documents as you want with only an upper limit for extremely high usage cases. Premium models are available for higher tier plans with better response quality.
              </p>
            </div>
            <div className="bg-card/50 rounded-xl p-6 border border-border/50">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3 text-indigo-400">3</span>
                Integration Complexity
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Basic web widget integration is available with no limits or per api call charges. Custom CRM connections, advanced workflows, and API access are available in higher tiers.
              </p>
            </div>
            <div className="bg-card/50 rounded-xl p-6 border border-border/50">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3 text-indigo-400">4</span>
                Support & SLA Requirements
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Support is the backbone of any product, and we understand that. We offer 24 x 7 email support, phone and ticketing support to every single customer for any issue they are facing. SLAs apply, but no hidden fees or per message charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ImageTextSection
        imgSrc="/images/price-wallet.svg"
        imgAlt="Wallet icon"
        eyebrow="Predictable Costs"
        headline="Flat per plan fee, no surprises"
        body="Pay Flat fee for your Plan, upgrade only if necessary"
        imageWrapperClassName="w-[200px] md:w-[240px]"
        />

        <ImageTextSection
        imgSrc="/images/price-roi.svg"
        imgAlt="ROI graph icon"
        eyebrow="ROI on your support"
        headline="Break even in < 60 days"
        body="Savings on support head-count, increase sales and improve onboarding on customers."
        reverse
        imageWrapperClassName="w-[200px] md:w-[240px]"
        />

        <ImageTextSection
        imgSrc="/images/price-shield.svg"
        imgAlt="Compliance shield icon"
        eyebrow="Compliance Bundled"
        headline="ISO 9001, SOC 2, GDPR at no extra cost"
        body="Industry grade security and regional data hosting included with every plan."
        imageWrapperClassName="w-[200px] md:w-[240px]"
        />


      {/* ─────────────── Detailed breakdown steps */}
      <section id="breakdown" className="py-16 px-4 md:py-24">
        <Container className="space-y-12 max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How to choose your web widget plan</h2>
            <div className="mx-auto max-w-3xl prose prose-lg prose-slate dark:prose-invert">
              <p className="text-lg text-muted-foreground">
                Finding the right plan is simple. Start with your team size and website traffic, then add features as you grow.
              </p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Count your support team</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    How many people will manage the AI widget? Start small and scale up as your team grows.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Assess your website traffic</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Higher traffic sites benefit from advanced AI models and more higher message limits. Check your monthly visitors and conversation volume.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Choose your integration level</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Basic web widget works for most sites. Need custom CRM integration, custom workflows, or API access? Higher tiers include these features.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Consider support needs</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All plans include all support methods on standard SLA. Need priority support, dedicated success management, or custom SLAs?  Enterprise plans have you covered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────── Feature list (price‑centric) */}
<section className="py-20 px-4">
  <Container className="space-y-12">
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Everything you need to get started
      </h2>
      <div className="mx-auto max-w-3xl prose prose-lg prose-slate dark:prose-invert">
        <p className="text-lg text-muted-foreground">
          All Rhythmiq plans include the core features you need to deploy AI-powered customer support on your website. No setup fees, no hidden costs.
        </p>
      </div>
    </div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[
        { 
          title: 'Unlimited Agents', 
          copy: 'No agent limits in any plan. Your agents can handle as many customer interactions as needed.',
          icon: '💬'
        },
        { 
          title: 'AI Model Included', 
          copy: 'Generous token allowance on every plan, we outclass every competitor on this metric. Premium models available for higher tiers.',
          icon: '🧠'
        },
        { 
          title: 'Easy Website Integration', 
          copy: 'One-line code snippet gets your AI widget live on any website. Works with WordPress, Shopify, custom sites.',
          icon: '⚡'
        },
        { 
          title: 'Knowledge Base Training', 
          copy: 'Upload your docs, FAQs, and product info. AI learns your business and answers like your best support agent.',
          icon: '📚'
        },
        { 
          title: 'Real-time Analytics', 
          copy: 'Track conversation success, customer satisfaction, and identify areas for improvement with detailed insights.',
          icon: '📊'
        },
        { 
          title: 'Human Handoff', 
          copy: 'Seamlessly transfer complex queries to your support team when AI needs human assistance.',
          icon: '👥'
        }
      ].map((item) => (
        <div key={item.title} className="bg-card/50 rounded-xl p-6 border border-border/50 text-center">
          <div className="text-3xl mb-4">{item.icon}</div>
          <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{item.copy}</p>
        </div>
      ))}
    </div>
  </Container>
</section>


      {/* ─────────────── FAQ */}
      <section id="faq" className="py-20 px-4 bg-muted/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Web Widget Pricing FAQ</h2>
            <div className="mx-auto max-w-2xl prose prose-lg prose-slate dark:prose-invert">
              <p className="text-lg text-muted-foreground">
                Common questions about Rhythmiq's web widget pricing and features.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <details className="group p-6 bg-card/50 border border-border/50 rounded-xl hover:bg-card/70 transition-colors">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>How many support agents are included in each plan?</span>
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <div className="mt-4 prose prose-slate dark:prose-invert text-foreground">
                <p>Each plan includes a unlimited number of agents who can manage conversations and train the AI.</p>
              </div>
            </details>
            <details className="group p-6 bg-card/50 border border-border/50 rounded-xl hover:bg-card/70 transition-colors">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>Are there any per-message or conversation fees?</span>
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <div className="mt-4 prose prose-slate dark:prose-invert text-foreground">
                <p>No! All plans include unlimited conversations. Unlike other tools that charge per message, Rhythmiq uses a simple plan model with no conversation limits.
                  The limitations are only for the AI replies by the chatbot and even there we beat our competitors on value for your money.
                </p>
              </div>
            </details>
            <details className="group p-6 bg-card/50 border border-border/50 rounded-xl hover:bg-card/70 transition-colors">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>How easy is it to integrate the widget on my website?</span>
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <div className="mt-4 prose prose-slate dark:prose-invert text-foreground">
                <p>Very easy! Just add one line of code to your website and the AI widget is live. Works with WordPress, Shopify, custom sites, and any platform that supports JavaScript.</p>
              </div>
            </details>
            <details className="group p-6 bg-card/50 border border-border/50 rounded-xl hover:bg-card/70 transition-colors">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>What AI models are included in the plans?</span>
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <div className="mt-4 prose prose-slate dark:prose-invert text-foreground">
                <p>All plans include generous GPT token allowances. Even the basic plans use GPT-4, while higher tiers include access to latest GPT-o models for more sophisticated responses and better accuracy.</p>
              </div>
            </details>
            <details className="group p-6 bg-card/50 border border-border/50 rounded-xl hover:bg-card/70 transition-colors">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>Is there a free trial available?</span>
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <div className="mt-4 prose prose-slate dark:prose-invert text-foreground">
                <p>Yes! We offer a 7-day free trial on any plan with full access to all web widget features. No credit card required to get started.</p>
              </div>
            </details>
            <details className="group p-6 bg-card/50 border border-border/50 rounded-xl hover:bg-card/70 transition-colors">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>Can I customize the widget's appearance to match my brand?</span>
                <span className="text-indigo-500 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <div className="mt-4 prose prose-slate dark:prose-invert text-foreground">
                <p>Absolutely! Customize colors, fonts, positioning, and messaging to match your brand. Advanced customization options are available in higher-tier plans.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ─────────────── CTA */}
      <section className="w-full h-[60vh] flex flex-col justify-center text-white px-6 lg:px-16 py-16 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 animate-gradient-smooth" />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col justify-center items-center">
          <p className="text-sm sm:text-base uppercase tracking-wide text-indigo-200 mb-3">Don’t Miss Out</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
            Ready to Experience the Future of Support?
          </h2>
          <Link href="https://calendly.com/ray-rhythmiqcx/30min">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-700 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:opacity-90 hover:scale-105 transform transition">
              Schedule a Free Demo
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

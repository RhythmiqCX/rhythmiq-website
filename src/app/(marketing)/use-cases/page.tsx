import Link from "next/link";
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import Reveal from "@/components/marketing/restaurant/reveal";
import FinalCTA from "@/components/marketing/restaurant/final-cta";
import { DEMO_URL } from "@/constants/links";

export const metadata = genMeta({
  title: "Use Cases: Voice AI for D2C Ecommerce",
  description:
    "Six calls that recover revenue for D2C brands: failed delivery rescue, returns turned into exchanges, COD confirmation with upsell, reorder reminders, WISMO, and abandoned cart recovery.",
  keywords: [
    "voice AI use cases ecommerce",
    "NDR reduction calling",
    "RTO reduction voice AI",
    "returns to exchange calls",
    "COD confirmation calls",
    "abandoned cart recovery calls",
  ],
  alternates: {
    canonical: "/use-cases",
  },
  openGraph: {
    images: ["/icons/og-default.png"],
    type: "website",
  },
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rhythmiqcx.com/" },
    { "@type": "ListItem", position: 2, name: "Use cases", item: "https://rhythmiqcx.com/use-cases" },
  ],
};

type UseCase = {
  id: string;
  title: string;
  shape: string;
  body: string;
  example: string;
  /** Question + answer pair, also published as FAQPage structured data. */
  question: string;
  answer: string;
};

const USE_CASES: UseCase[] = [
  {
    id: "failed-delivery",
    title: "Failed delivery rescue",
    shape: "Outbound · ~45s",
    body: "The courier tried once and nobody was in. Rhythmiq calls before the parcel heads back, takes a new time slot, and fixes the address if that was the problem.",
    example: "“Our courier tried delivering this morning but couldn’t reach you. When are you around today?”",
    question: "How does voice AI reduce RTO and failed deliveries?",
    answer:
      "When a courier marks a delivery attempt as failed, Rhythmiq calls the customer within minutes, captures a new delivery window, corrects the address if needed, and writes the update back to your OMS so the courier reattempts instead of returning the parcel.",
  },
  {
    id: "return-to-exchange",
    title: "Return turned into an exchange",
    shape: "Outbound · ~90s",
    body: "Most return flows just process the refund. Rhythmiq asks what went wrong first, then offers a size swap, store credit, or a small discount, and keeps the sale more often than you would expect.",
    example: "“I can send the next size up today at no charge, or store credit plus $10 extra to spend.”",
    question: "Can voice AI turn a return into an exchange?",
    answer:
      "Yes. Rhythmiq calls the customer when a return is raised, finds out the real reason, and offers alternatives such as a different size, a different color, store credit with a bonus, or a discount to keep the item. The outcome is written back to your store automatically.",
  },
  {
    id: "cod-upsell",
    title: "COD confirmation with an upsell",
    shape: "Outbound · ~60s",
    body: "Unconfirmed cash-on-delivery orders are the ones that come back. Rhythmiq confirms the order before you ship it, and while the customer is on the phone, offers something that fits in the same parcel.",
    example: "“Since you’re getting the shampoo anyway, want the matching conditioner in the same parcel?”",
    question: "Does Rhythmiq confirm cash-on-delivery orders before shipping?",
    answer:
      "Yes. Rhythmiq calls every COD order before dispatch, confirms the customer still wants it, flags the ones that go unanswered after repeated attempts, and can offer a prepaid switch or an add-on item on the same call.",
  },
  {
    id: "reorder-reminder",
    title: "Reorder reminder",
    shape: "Outbound · ~45s",
    body: "For anything consumable, there is a predictable moment when the customer is about to run out. A short call at that moment brings in new revenue rather than recovering a loss.",
    example: "“You ordered a month’s supply about four weeks ago, it’s probably running low. Want another one out today?”",
    question: "Can voice AI drive repeat orders for consumable products?",
    answer:
      "Yes. Rhythmiq uses order history to work out when a customer is close to running out, then calls to offer a repeat of the same order. It ships on the same address and payment method, so the call takes well under a minute.",
  },
  {
    id: "wismo-inbound",
    title: "“Where is my order?”",
    shape: "Inbound · customers call you",
    body: "This is the single most common reason anyone calls an online store. Rhythmiq answers on the first ring with real tracking data, and hands over to your team the moment it cannot help.",
    example: "“It shipped Tuesday and is out for delivery today by 6 PM. Want me to text you the tracking link?”",
    question: "Can Rhythmiq answer inbound order status calls?",
    answer:
      "Yes. Rhythmiq handles inbound WISMO calls by looking up the live shipment status, reading it back in plain language, and texting the tracking link. If the answer is not clear or the customer is unhappy, it transfers to a human with the full transcript attached.",
  },
  {
    id: "abandoned-cart",
    title: "Abandoned cart recovery",
    shape: "Outbound · ~60s",
    body: "Roughly half your customers never open a recovery email. A call reaches that half, and it can answer the question that stopped them buying in the first place.",
    example: "“I noticed you were looking at the blue shirt, it’s the last one in your size. Want me to hold it and knock 10% off?”",
    question: "Does calling recover more abandoned carts than email?",
    answer:
      "It reaches a different group of people. Recovery emails and texts only ever convert the customers who open them. A call reaches the rest, and unlike an email it can answer the objection that caused the abandonment, whether that is sizing, delivery time, or price.",
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Voice AI use cases for D2C ecommerce",
  itemListElement: USE_CASES.map((uc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: uc.title,
    description: uc.body,
    url: `https://rhythmiqcx.com/use-cases#${uc.id}`,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: USE_CASES.map((uc) => ({
    "@type": "Question",
    name: uc.question,
    acceptedAnswer: { "@type": "Answer", text: uc.answer },
  })),
};

export default function UseCasesPage() {
  return (
    <div className="min-h-screen w-full paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={itemListSchema} />
      <JsonLd schema={faqSchema} />

      <section className="section text-center" aria-label="Use cases">
        <div className="wrap">
          <span className="eyebrow justify-center">Use cases</span>
          <h1 className="h-display mt-[18px] max-w-[20ch] mx-auto">
            Six calls that recover revenue.
          </h1>
          <p className="lede mt-5 max-w-[56ch] mx-auto">
            These are the calls that quietly cost D2C brands money every day, and the
            ones that quietly bring revenue in. Pick one to see it handled live.
          </p>
        </div>
      </section>

      <section className="section pt-0" aria-label="The six use cases">
        <div className="wrap grid sm:grid-cols-2 gap-5">
          {USE_CASES.map((uc, i) => (
            <Reveal key={uc.id} delay={(i % 3) * 0.08}>
              <div
                id={uc.id}
                className="rounded-[16px] bg-white p-6 h-full flex flex-col scroll-mt-24"
                style={{ border: "1px solid var(--line-soft)" }}
              >
                <span className="font-mono text-[11px] tracking-[0.04em] text-ink3">
                  {uc.shape}
                </span>
                <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink mt-2">
                  {uc.title}
                </h3>
                <p className="text-ink2 text-sm mt-2 leading-relaxed">{uc.body}</p>
                <p className="text-ink3 text-[13px] mt-3 italic leading-relaxed">
                  {uc.example}
                </p>
                <Link
                  href={`${DEMO_URL}?scenario=${uc.id}`}
                  className="link-arrow mt-4"
                >
                  See it handled <span className="arrow">→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Visible copy behind the FAQPage markup above. Google only honours the
          structured data when the same text is on the page. */}
      <section className="section pt-0" aria-label="Questions about these calls">
        <div className="wrap max-w-[760px]">
          <h2 className="h-section mb-7">Questions we get asked</h2>
          <div className="flex flex-col gap-6">
            {USE_CASES.map((uc) => (
              <Reveal key={`faq-${uc.id}`}>
                <div
                  className="pb-6"
                  style={{ borderBottom: "1px solid var(--line-soft)" }}
                >
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
                    {uc.question}
                  </h3>
                  <p className="text-ink2 text-sm mt-2 leading-relaxed">{uc.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

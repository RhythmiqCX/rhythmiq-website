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
  proves: string;
  example: string;
};

const USE_CASES: UseCase[] = [
  {
    id: "failed-delivery",
    title: "Failed delivery rescue",
    shape: "Outbound · ~45s",
    proves: "Table stakes: slot capture, address correction, write-back to your system.",
    example: "“Our courier tried delivering this morning but couldn’t reach you. When are you around today?”",
  },
  {
    id: "return-to-exchange",
    title: "Return turned into an exchange",
    shape: "Outbound · ~90s",
    proves: "The flagship: the agent handles a “no” and offers real alternatives, proving conversation, not a phone menu.",
    example: "“I can send the next size up today at no charge, or store credit plus ₹200 extra to spend.”",
  },
  {
    id: "cod-upsell",
    title: "COD confirmation + upsell",
    shape: "Outbound · ~60s",
    proves: "One call prevents a loss and adds revenue on the same call. Nobody else demos these together.",
    example: "“Since you’re getting the shampoo anyway, want the matching conditioner in the same parcel?”",
  },
  {
    id: "reorder-reminder",
    title: "Reorder reminder",
    shape: "Outbound · ~45s",
    proves: "New revenue, not recovered loss. A different tone proves range.",
    example: "“You ordered a month’s supply about four weeks ago, it’s probably running low. Want another one out today?”",
  },
  {
    id: "wismo-inbound",
    title: "“Where is my order” (inbound)",
    shape: "Inbound · they call us",
    proves: "Proves inbound handling, and a clean handoff when the agent can’t answer.",
    example: "“It shipped Tuesday and is out for delivery today by 6 PM. Want me to text you the tracking link?”",
  },
  {
    id: "abandoned-cart",
    title: "Abandoned cart recovery",
    shape: "Outbound · ~60s",
    proves: "Direct revenue lift, the number every brand already tracks.",
    example: "“I noticed you were looking at the blue shirt, it’s the last one in your size. Want me to hold it and knock 10% off?”",
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen w-full paper-surface bg-paper text-ink font-sans">
      <JsonLd schema={breadcrumbSchema} />

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
                className="rounded-[16px] bg-white p-6 h-full flex flex-col"
                style={{ border: "1px solid var(--line-soft)" }}
              >
                <span className="font-mono text-[11px] tracking-[0.04em] text-ink3">
                  {uc.shape}
                </span>
                <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink mt-2">
                  {uc.title}
                </h3>
                <p className="text-ink2 text-sm mt-2 leading-relaxed">{uc.proves}</p>
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

      <FinalCTA />
    </div>
  );
}

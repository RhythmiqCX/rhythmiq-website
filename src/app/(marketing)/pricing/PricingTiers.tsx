import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib";
import Reveal from "@/components/marketing/restaurant/reveal";
import { PRICING_TIERS } from "@/constants/pricing-plans";
import { CONTACT_URL } from "@/constants/links";

const PricingTiers = () => {
  return (
    <section className="section bg-paper2" aria-label="Plans">
      <div className="wrap">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {PRICING_TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.06} className="h-full">
              <div
                className={cn(
                  "relative rounded-[18px] bg-white p-6 flex flex-col h-full",
                  tier.highlight && "ring-2 ring-coral",
                )}
                style={tier.highlight ? undefined : { border: "1px solid var(--line-soft)" }}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-6 font-mono text-[10px] tracking-[0.1em] uppercase bg-coral text-white px-2.5 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-ink3">
                  {tier.name}
                </span>
                <div className="flex items-end gap-1 mt-3">
                  <span className="text-[40px] font-semibold tracking-[-0.03em] leading-none">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-ink3 text-sm mb-1">{tier.period}</span>
                  )}
                </div>
                <p className="text-ink2 text-sm mt-3 leading-relaxed min-h-[40px]">
                  {tier.tagline}
                </p>
                <Link
                  href={tier.cta.href}
                  className={cn(
                    "w-full justify-center mt-5",
                    tier.highlight ? "btn btn-accent" : "btn btn-ghost",
                  )}
                >
                  {tier.cta.label}
                </Link>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-ink2">
                      <Check className="w-4 h-4 text-coral mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-center text-sm text-ink3 mt-8">
          Prices in USD. Have a question about a plan?{" "}
          <Link href={CONTACT_URL} className="text-coral hover:underline">
            Talk to us
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default PricingTiers;

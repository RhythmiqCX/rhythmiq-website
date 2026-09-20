"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/marketing/restaurant/reveal";
import {
  PRICING_TIERS,
  ENTERPRISE_CALL_THRESHOLD,
  ENTERPRISE_RATE_PER_CALL,
} from "@/constants/pricing-plans";
import { BOOK_DEMO_URL, CONTACT_URL } from "@/constants/links";

const MIN_CALLS = 250;
const MAX_CALLS = 25000;
const STEP = 250;
const DEFAULT_CALLS = 2000;

const PRICED_TIERS = PRICING_TIERS.filter((t) => t.usage).map((t) => ({
  name: t.name,
  ...t.usage!,
}));

type Quote =
  | { kind: "plan"; tier: string; total: number; included: number; overage: number }
  | { kind: "enterprise"; indicative: number };

/** Cheapest published plan for a given volume, or a handover to sales. */
function quoteFor(calls: number): Quote {
  if (calls > ENTERPRISE_CALL_THRESHOLD) {
    return { kind: "enterprise", indicative: calls * ENTERPRISE_RATE_PER_CALL };
  }
  const priced = PRICED_TIERS.map((t) => {
    const extra = Math.max(0, calls - t.includedCalls);
    return {
      kind: "plan" as const,
      tier: t.name,
      total: t.base + extra * t.overagePerCall,
      included: t.includedCalls,
      overage: extra,
    };
  });
  return priced.reduce((best, t) => (t.total < best.total ? t : best));
}

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const UsageCalculator = () => {
  const [calls, setCalls] = useState(DEFAULT_CALLS);
  const quote = useMemo(() => quoteFor(calls), [calls]);

  const perCall =
    quote.kind === "enterprise"
      ? ENTERPRISE_RATE_PER_CALL
      : quote.total / Math.max(calls, 1);

  const pct = ((calls - MIN_CALLS) / (MAX_CALLS - MIN_CALLS)) * 100;

  return (
    <section className="section" aria-label="Usage calculator">
      <div className="wrap max-w-[900px]">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow justify-center">Usage based</span>
            <h2 className="h-section mt-3.5">What would it cost you?</h2>
            <p className="lede mt-4 max-w-[54ch] mx-auto">
              Every plan is a base fee plus a published per-call rate once you pass what is
              included. Drag the slider to your monthly call volume.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="rounded-[18px] bg-white mt-9 p-7 sm:p-9"
            style={{ border: "1px solid var(--line-soft)" }}
          >
            <label htmlFor="call-volume" className="block">
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink3">
                Calls a month
              </span>
              <div className="flex items-end gap-2 mt-1.5">
                <span className="text-[38px] font-semibold tracking-[-0.03em] leading-none tabular-nums">
                  {calls.toLocaleString("en-US")}
                </span>
                {calls >= MAX_CALLS && <span className="text-ink3 text-sm mb-1">+</span>}
              </div>
            </label>

            <input
              id="call-volume"
              type="range"
              min={MIN_CALLS}
              max={MAX_CALLS}
              step={STEP}
              value={calls}
              onChange={(e) => setCalls(Number(e.target.value))}
              aria-describedby="quote-summary"
              className="usage-range w-full mt-5"
              style={{ ["--pct" as string]: `${pct}%` }}
            />
            <div className="flex justify-between font-mono text-[11px] text-ink3 mt-2">
              <span>{MIN_CALLS.toLocaleString("en-US")}</span>
              <span>{MAX_CALLS.toLocaleString("en-US")}+</span>
            </div>

            <div
              id="quote-summary"
              aria-live="polite"
              className="grid sm:grid-cols-3 gap-5 mt-8 pt-7"
              style={{ borderTop: "1px solid var(--line-soft)" }}
            >
              <div>
                <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink3">
                  Recommended
                </div>
                <div className="text-[22px] font-semibold tracking-[-0.02em] mt-1.5">
                  {quote.kind === "enterprise" ? "Enterprise" : quote.tier}
                </div>
              </div>
              <div>
                <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink3">
                  {quote.kind === "enterprise" ? "Indicative" : "Estimated monthly"}
                </div>
                <div className="text-[22px] font-semibold tracking-[-0.02em] mt-1.5 tabular-nums">
                  {quote.kind === "enterprise"
                    ? `from ${money(quote.indicative)}`
                    : money(quote.total)}
                </div>
              </div>
              <div>
                <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink3">
                  Works out at
                </div>
                <div className="text-[22px] font-semibold tracking-[-0.02em] mt-1.5 tabular-nums">
                  ${perCall.toFixed(2)}
                  <span className="text-ink3 text-sm font-normal"> a call</span>
                </div>
              </div>
            </div>

            <p className="text-ink2 text-sm mt-6 leading-relaxed">
              {quote.kind === "enterprise" ? (
                <>
                  Past {ENTERPRISE_CALL_THRESHOLD.toLocaleString("en-US")} calls a month we price
                  the whole thing on usage, starting at ${ENTERPRISE_RATE_PER_CALL.toFixed(2)} a
                  call and dropping with volume. The number above is a starting point, not a
                  quote.
                </>
              ) : quote.overage > 0 ? (
                <>
                  {quote.tier} includes {quote.included.toLocaleString("en-US")} calls. The other{" "}
                  {quote.overage.toLocaleString("en-US")} bill at the published overage rate, so
                  there is no surprise at the end of the month.
                </>
              ) : (
                <>
                  {quote.tier} includes {quote.included.toLocaleString("en-US")} calls a month, so
                  this volume is covered by the base plan with room to grow.
                </>
              )}
            </p>

            <div className="flex flex-wrap gap-2.5 mt-7">
              <Link
                href={quote.kind === "enterprise" ? CONTACT_URL : BOOK_DEMO_URL}
                className="btn btn-dark"
              >
                {quote.kind === "enterprise" ? "Talk to sales" : "Book a demo"}
              </Link>
              <Link href={CONTACT_URL} className="btn btn-ghost">
                Ask about volume pricing
              </Link>
            </div>
          </div>
        </Reveal>

        <p className="text-center text-sm text-ink3 mt-6 max-w-[60ch] mx-auto">
          Estimates only, in USD, and they assume typical call lengths for these use cases. We
          will confirm the real number against your order volume on the demo.
        </p>
      </div>
    </section>
  );
};

export default UsageCalculator;

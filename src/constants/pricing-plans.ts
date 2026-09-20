// Pricing tiers for the dedicated /pricing page.
//
// Positioned against the per-minute developer platforms a D2C ops lead would
// otherwise be quoted. Their advertised rates understate the real bill: Vapi
// and Retell are BYOK, so the $0.05-0.07/min headline becomes a true
// $0.12-0.25/min once you add LLM, TTS and telephony. Bland's Scale plan is
// $499/mo at ~$0.11/min, Synthflow lands at $329-540/mo and $0.16-0.27/min.
//
// Rhythmiq sits in the same band on price but sells a finished product rather
// than middleware, so the comparison we want a buyer to make is "this versus
// paying an agency to build on Vapi", not "this versus a cheaper API".
//
// Billing is per completed call, not per minute, because a D2C ops lead plans
// in orders and calls rather than talk-time. Backend cost is ~$0.02-0.07 per
// call at these durations, so margins hold even at the Enterprise rate.
// Swap freely once finalized.

import { BOOK_DEMO_URL, CONTACT_URL } from "./links";

export type PricingTier = {
    name: string;
    price: string;
    period: string;
    tagline: string;
    highlight?: boolean;
    cta: { label: string; href: string };
    features: string[];
    /** Drives the usage calculator. Enterprise is quoted, so it has no base. */
    usage?: { base: number; includedCalls: number; overagePerCall: number };
};

export const PRICING_TIERS: PricingTier[] = [
    {
        name: "Growth",
        price: "$499",
        period: "/mo",
        tagline: "For a brand that has started losing real money to failed deliveries.",
        cta: { label: "Book a demo", href: BOOK_DEMO_URL },
        usage: { base: 499, includedCalls: 1200, overagePerCall: 0.38 },
        features: [
            "1,200 calls a month included",
            "1 store or catalogue",
            "Failed-delivery rescue + address correction",
            "COD confirmation calls",
            "Answers in English + 1 language",
            "Shopify or WooCommerce sync",
            "Email support",
        ],
    },
    {
        name: "Scale",
        price: "$1,499",
        period: "/mo",
        tagline: "For brands running enough volume that the call queue needs to run itself.",
        highlight: true,
        cta: { label: "Book a demo", href: BOOK_DEMO_URL },
        usage: { base: 1499, includedCalls: 5000, overagePerCall: 0.3 },
        features: [
            "5,000 calls a month included",
            "Everything in Growth",
            "Returns-to-exchange handling on every call",
            "Reorder, WISMO and abandoned cart calls",
            "All 12+ languages (Arabic, Spanish, Hindi and more)",
            "OMS/WMS, courier and CRM sync",
            "Custom greeting + voice",
            "Live call analytics",
            "Priority support",
        ],
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        tagline: "For multi-brand groups and anyone past 20,000 calls a month.",
        cta: { label: "Talk to sales", href: CONTACT_URL },
        features: [
            "Volume rates from $0.18 a call",
            "Everything in Scale",
            "Unlimited catalogues, brands and warehouses",
            "Custom and cloned voice models",
            "SSO, SLA, security review and DPA",
            "Dedicated success manager",
            "Onboarding and migration handled for you",
        ],
    },
];

/** Where the calculator stops quoting and hands over to sales. */
export const ENTERPRISE_CALL_THRESHOLD = 20000;
export const ENTERPRISE_RATE_PER_CALL = 0.18;

export type PricingFAQ = { q: string; a: string };

export const PRICING_FAQS: PricingFAQ[] = [
    {
        q: "How much does Rhythmiq cost?",
        a: "Growth is $499 a month and includes 1,200 calls. Scale is $1,499 a month and includes 5,000 calls plus returns-to-exchange handling and every language. Past 20,000 calls a month we quote Enterprise, where rates start at $0.18 a call. Use the calculator to see where your volume lands.",
    },
    {
        q: "Do you charge per minute or per call?",
        a: "Per completed call, not per minute. Most of these calls run under 90 seconds, and a per-minute meter punishes you for the conversations that go well. A per-call rate also means you can forecast the bill from your order volume instead of guessing at talk time.",
    },
    {
        q: "What happens if I go over the calls in my plan?",
        a: "You keep calling and the extra calls bill at your plan's published rate, $0.38 a call on Growth and $0.30 on Scale. We will flag it if you are consistently over, because moving up a plan is usually cheaper than sitting in overage.",
    },
    {
        q: "Is there usage-based pricing?",
        a: "Yes. Every plan is a base fee plus a published per-call rate once you pass what is included, and above 20,000 calls a month we price the whole thing on usage. The calculator on this page shows the real number for your volume.",
    },
    {
        q: "How does this compare to Vapi, Retell or Bland?",
        a: "Those are developer platforms billed per minute, and the advertised rate is not the real one. Because they are bring-your-own-key, you add LLM, speech and telephony on top, which puts the true cost around $0.12 to $0.27 a minute before anyone has built your call flows. Rhythmiq is the finished product with the delivery, COD and returns logic already in it, on one invoice.",
    },
    {
        q: "Do you support other languages?",
        a: "Yes, and we include them. Scale and Enterprise answer in 12+ languages including Arabic, Spanish and Hindi at no extra charge, and a customer can switch language mid-sentence without breaking the call.",
    },
    {
        q: "Can it actually turn a return into an exchange, not just log it?",
        a: "Yes. Scale handles the objection live: it offers a size swap, store credit, or a discount to keep the sale, and writes the outcome straight to your OMS. A lot of voice tools follow a script and hand off the moment a customer says no. Rhythmiq keeps the conversation going.",
    },
    {
        q: "Is there a free trial?",
        a: "Yes. Book a demo and we will set you up on your own catalogue so you can hear it make real calls before you pay for anything.",
    },
    {
        q: "Can I change plans later?",
        a: "Yes. You can move up or down at any time as your order volume changes. Nothing is locked in and there are no setup fees.",
    },
];

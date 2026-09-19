// Pricing tiers for the dedicated /pricing page.
//
// Value-based pricing for D2C voice AI: undercuts generic per-minute dev
// platforms ($0.07-0.09+/min) with a flat plan, while including the things
// a manual calling team can't scale and per-minute platforms don't build for:
// return-to-exchange handling and native multilingual (Arabic/Spanish/Hindi).
// Backend cost is ~$0.02-0.07/min, so margins stay healthy at these prices.
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
};

export const PRICING_TIERS: PricingTier[] = [
    {
        name: "Essentials",
        price: "$149",
        period: "/mo",
        tagline: "For a growing brand that can't afford another failed delivery.",
        cta: { label: "Start free", href: BOOK_DEMO_URL },
        features: [
            "1 store / catalogue",
            "Voice AI outbound + inbound, 24/7",
            "Up to 500 calls / mo",
            "Failed-delivery rescue + address correction",
            "COD confirmation calls",
            "Answers in English + 1 language",
            "Email support",
        ],
    },
    {
        name: "Pro",
        price: "$299",
        period: "/mo",
        tagline: "For D2C brands that want the whole call queue handled.",
        highlight: true,
        cta: { label: "Start free", href: BOOK_DEMO_URL },
        features: [
            "Everything in Essentials",
            "Up to 1,500 calls / mo",
            "Returns-to-exchange + COD confirmation on every call",
            "All 12+ languages included (Arabic, Spanish, Hindi & more)",
            "OMS/WMS + CRM sync",
            "Web chat widget",
            "Custom greeting + voice",
            "Live call analytics",
            "Priority support",
        ],
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        tagline: "For multi-brand groups and high-volume D2C operators.",
        cta: { label: "Talk to sales", href: CONTACT_URL },
        features: [
            "Everything in Pro",
            "Unlimited catalogues + calls",
            "Custom + cloned voice models",
            "SSO + dedicated success manager",
            "SLA, security review + DPA",
        ],
    },
];

export type PricingFAQ = { q: string; a: string };

export const PRICING_FAQS: PricingFAQ[] = [
    {
        q: "How much does Rhythmiq cost?",
        a: "Essentials is $149 a month for a single store or catalogue. Pro is $299 a month and adds returns-to-exchange handling and every language. Enterprise is custom pricing for multi-brand groups. Pick the plan that matches your order volume.",
    },
    {
        q: "Do you support other languages?",
        a: "Yes, and we include them. Pro and Enterprise answer in 12+ languages including Arabic, Spanish, and Hindi at no extra charge, so a call can switch languages mid-sentence and stay natural.",
    },
    {
        q: "Can it actually turn a return into an exchange, not just log it?",
        a: "Yes. Pro handles the objection live: offers a size swap, store credit, or a discount to keep the sale, and writes the outcome straight to your OMS. A lot of voice tools only follow a script and hand off the moment a customer says no. Rhythmiq keeps the conversation going.",
    },
    {
        q: "Is there a free trial?",
        a: "Yes. You can try Rhythmiq before you pay. Book a quick demo and we will set you up so you can hear it call on your own catalogue first.",
    },
    {
        q: "What happens if I go over my plan's calls?",
        a: "We give you a heads up well before you hit the cap and help you move up a plan. Any overage is billed at a clear, published rate, never a surprise. Some tools quietly tack on $200 to $400 in overage on a busy month. We tell you the number up front.",
    },
    {
        q: "Can I change plans later?",
        a: "Yes. You can move up or down a plan at any time as your order volume changes. Nothing is locked in.",
    },
    {
        q: "Do you offer pricing for multiple brands or warehouses?",
        a: "Yes. Enterprise is built for multi-brand groups and high-volume D2C operators, with custom pricing, unlimited catalogues, and a dedicated success manager. Talk to us and we will put together a plan that fits.",
    },
];

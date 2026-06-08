// Pricing tiers for the dedicated /pricing page.
//
// Value-based pricing modelled on the restaurant voice-AI market:
// Loman ~$199–529/mo, Slang.ai ~$399–599/location (and +$99/mo just for one
// extra language). Rhythmiq undercuts on price while including the two things
// they charge extra for or can't do: in-call order taking and native
// multilingual (Arabic/Spanish/Hindi). Backend cost is ~$0.02–0.07/min, so
// margins stay healthy at these prices. Swap freely once finalized.

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
        tagline: "For a single spot that just can't miss another call.",
        cta: { label: "Start free", href: BOOK_DEMO_URL },
        features: [
            "1 location",
            "AI phone host, 24/7",
            "Up to 500 answered calls / mo",
            "Reservations + SMS confirmations",
            "Missed-call recovery",
            "Answers in English + 1 language",
            "Email support",
        ],
    },
    {
        name: "Pro",
        price: "$299",
        period: "/mo",
        tagline: "For busy restaurants that want the whole phone handled.",
        highlight: true,
        cta: { label: "Start free", href: BOOK_DEMO_URL },
        features: [
            "Everything in Essentials",
            "Up to 1,500 answered calls / mo",
            "Full order taking + POS injection",
            "All 12+ languages included (Arabic, Spanish, Hindi & more)",
            "Reservation + CRM sync",
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
        tagline: "For groups, franchises, and multi-location brands.",
        cta: { label: "Talk to sales", href: CONTACT_URL },
        features: [
            "Everything in Pro",
            "Unlimited locations + calls",
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
        a: "Essentials is $149 a month for a single location. Pro is $299 a month and adds full order taking and every language. Enterprise is custom pricing for groups and franchises. Pick the plan that matches how busy your phone gets.",
    },
    {
        q: "Do you support other languages?",
        a: "Yes, and we include them. Pro and Enterprise answer in 12+ languages including Arabic, Spanish, and Hindi at no extra charge. Some tools charge $99 a month extra just to add one language. We bundle them all in.",
    },
    {
        q: "Can it actually take orders, not just reservations?",
        a: "Yes. Pro takes complete takeout and delivery orders, modifiers and all, and pushes them straight into your POS. A lot of voice tools only book reservations and bounce order callers to a website. Rhythmiq closes the order on the call.",
    },
    {
        q: "Is there a free trial?",
        a: "Yes. You can try Rhythmiq before you pay. Book a quick demo and we will set you up so you can hear it answer your own calls first.",
    },
    {
        q: "What happens if I go over my plan's calls?",
        a: "We give you a heads up well before you hit the cap and help you move up a plan. Any overage is billed at a clear, published rate, never a surprise. Some tools quietly tack on $200 to $400 in overage on a busy month. We tell you the number up front.",
    },
    {
        q: "Can I change plans later?",
        a: "Yes. You can move up or down a plan at any time as your call volume changes. Nothing is locked in.",
    },
    {
        q: "Do you offer pricing for multiple locations?",
        a: "Yes. Enterprise is built for groups, franchises, and multi unit brands, with custom pricing, unlimited locations, and a dedicated success manager. Talk to us and we will put together a plan that fits.",
    },
];

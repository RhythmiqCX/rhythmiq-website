// Pricing tiers for the dedicated /pricing page.
//
// NOTE: these numbers are PROVISIONAL. They are modelled on the restaurant
// voice-AI market (budget band ~$25–65/mo, flat band ~$149–299/mo, premium
// ~$349+/mo — e.g. Slang.ai ~$450–600, Loman/Hostie ~$199–299) while keeping
// Rhythmiq's existing $29 entry anchor so the "$29 vs $99/$349 competitors"
// story still holds. Swap freely once real pricing is set.

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
        name: "Starter",
        price: "$29",
        period: "/mo",
        tagline: "For a single location that just can't miss another call.",
        cta: { label: "Start free", href: BOOK_DEMO_URL },
        features: [
            "1 location",
            "AI phone host, 24/7",
            "Up to 500 answered calls / mo",
            "Reservations + SMS confirmations",
            "Takeout order capture",
            "Email support",
        ],
    },
    {
        name: "Pro",
        price: "$79",
        period: "/mo",
        tagline: "For busy restaurants that want the phone fully handled.",
        highlight: true,
        cta: { label: "Start free", href: BOOK_DEMO_URL },
        features: [
            "Everything in Starter",
            "Unlimited answered calls",
            "POS, reservation + CRM sync",
            "WhatsApp + web chat",
            "Custom greeting + voice",
            "Live call analytics",
            "Priority support",
        ],
    },
    {
        name: "Scale",
        price: "$199",
        period: "/mo",
        tagline: "For groups running several rooms at once.",
        cta: { label: "Start free", href: BOOK_DEMO_URL },
        features: [
            "Everything in Pro",
            "Up to 5 locations",
            "Advanced reporting + exports",
            "Dedicated onboarding",
            "Custom integrations",
            "Phone + priority support",
        ],
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        tagline: "For multi-unit brands and franchises.",
        cta: { label: "Talk to sales", href: CONTACT_URL },
        features: [
            "Everything in Scale",
            "Unlimited locations",
            "SSO + custom voice models",
            "SLA + dedicated success manager",
            "Security review + DPA",
        ],
    },
];

export type PricingFAQ = { q: string; a: string };

export const PRICING_FAQS: PricingFAQ[] = [
    {
        q: "How much does Rhythmiq cost?",
        a: "Plans start at $29 a month for a single location and go up to $199 for groups. Every plan is flat. You are not billed per minute or per call, so a busy Friday night never comes with a surprise bill.",
    },
    {
        q: "Is there a free trial?",
        a: "Yes. You can try Rhythmiq before you pay. Book a quick demo and we will set you up so you can hear it answer your own calls first.",
    },
    {
        q: "Do you charge per minute or per call?",
        a: "No. Rhythmiq is flat monthly pricing. Most voice AI tools bill $0.07 to $0.31 a minute, which adds up fast on a busy service. With Rhythmiq you know your bill before the month starts.",
    },
    {
        q: "Can I change plans later?",
        a: "Yes. You can move up or down a plan at any time as your call volume changes. Nothing is locked in.",
    },
    {
        q: "What happens if I go over my plan's calls?",
        a: "On Starter we give you a heads up well before you hit the cap and help you move to Pro, which is unlimited. We never cut off your phone in the middle of service.",
    },
    {
        q: "Do you offer pricing for multiple locations?",
        a: "Yes. Scale covers up to five locations and Enterprise is built for franchises and multi unit brands. Talk to us and we will put together a plan that fits.",
    },
];

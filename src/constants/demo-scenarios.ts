// Data for the interactive /demo funnel. The `{brand}` token in transcript
// lines is replaced with the name the visitor enters (falls back to "your
// brand"). `hl` is a substring of `text` that gets the coral highlight.
//
// These six scenarios are the locked MVP use cases: failed delivery rescue,
// return-to-exchange, COD confirmation + upsell, reorder reminder, WISMO
// (inbound), and abandoned cart recovery.

export type Tint = "default" | "sky" | "coral" | "sand" | "ink";

export type TranscriptLine = {
    who: "caller" | "ai";
    text: string;
    hl?: string;
};

export type DemoScenario = {
    id: string;
    title: string;
    blurb: string;
    tag: string;
    tint: Tint;
    transcript: TranscriptLine[];
    outcome: string;
};

export const DEMO_SCENARIOS: DemoScenario[] = [
    {
        id: "failed-delivery",
        title: "Failed delivery rescue",
        blurb: "The courier tried once, nobody was in. A call fixes it before it ships back.",
        tag: "Outbound · ~45s",
        tint: "sand",
        transcript: [
            {
                who: "ai",
                text: "Hi, this is {brand}. Our courier tried delivering your order this morning but couldn't reach you. When are you around today?",
                hl: "couldn't reach you",
            },
            { who: "caller", text: "Sorry, I was out. I'll be home after 6." },
            {
                who: "ai",
                text: "Perfect, I've rescheduled for today after 6 PM and texted you the update. Anything else before I let you go?",
                hl: "today after 6 PM",
            },
            { who: "caller", text: "No, that's it. Thanks." },
        ],
        outcome: "Delivery rescheduled · saved from RTO",
    },
    {
        id: "return-to-exchange",
        title: "Return turned into an exchange",
        blurb: "A refund request becomes a swap, no lost sale and no double shipping cost.",
        tag: "Outbound · ~90s",
        tint: "coral",
        transcript: [
            { who: "caller", text: "I want to return this dress, it's too small." },
            {
                who: "ai",
                text: "Sorry about that. I can send the next size up today at no extra charge, or give you store credit plus 200 rupees extra to spend. Which would you prefer?",
                hl: "next size up today at no extra charge",
            },
            { who: "caller", text: "Oh, I didn't realize that was an option. Send the next size up." },
            {
                who: "ai",
                text: "Done, the medium ships today and the return pickup is scheduled for the same visit.",
            },
        ],
        outcome: "Exchanged · sale kept, both shipping legs saved",
    },
    {
        id: "cod-upsell",
        title: "COD confirmation + upsell",
        blurb: "One call prevents a loss and adds revenue at the same time.",
        tag: "Outbound · ~60s",
        tint: "sky",
        transcript: [
            {
                who: "ai",
                text: "Hi, calling to confirm your cash-on-delivery order for the shampoo, arriving Thursday. Can you confirm you'll be home to receive it?",
                hl: "confirm your cash-on-delivery order",
            },
            { who: "caller", text: "Yes, that's right." },
            {
                who: "ai",
                text: "Great. Since you're getting the shampoo anyway, want the matching conditioner in the same parcel? No extra delivery, and I can knock 100 rupees off.",
                hl: "no extra delivery",
            },
            { who: "caller", text: "Sure, add it." },
        ],
        outcome: "COD confirmed · +1 item added",
    },
    {
        id: "reorder-reminder",
        title: "Reorder reminder",
        blurb: "A month's supply is running out. A quick call brings in new revenue, not saved losses.",
        tag: "Outbound · ~45s",
        tint: "sand",
        transcript: [
            {
                who: "ai",
                text: "Hi, this is {brand}. You ordered a month's supply of protein powder about four weeks ago, it's probably running low. Want me to send another one out today?",
                hl: "running low",
            },
            { who: "caller", text: "Actually yes, I was meaning to reorder." },
            {
                who: "ai",
                text: "Done, same order, same address, shipping today. You'll get a text with tracking shortly.",
            },
        ],
        outcome: "Reordered · new revenue",
    },
    {
        id: "wismo-inbound",
        title: "“Where is my order” (inbound)",
        blurb: "The most common reason customers call any online store, answered instantly.",
        tag: "Inbound · they call us",
        tint: "ink",
        transcript: [
            { who: "caller", text: "Hi, where's my order? It was supposed to arrive yesterday." },
            {
                who: "ai",
                text: "Let me check. It shipped Tuesday and is out for delivery today by 6 PM. Want me to text you the tracking link?",
                hl: "out for delivery today by 6 PM",
            },
            { who: "caller", text: "Yes please." },
            {
                who: "ai",
                text: "Sent. If it doesn't arrive by tonight, call this number back and I'll flag it right away.",
            },
        ],
        outcome: "Answered instantly · tracking sent",
    },
    {
        id: "abandoned-cart",
        title: "Abandoned cart recovery",
        blurb: "A call reaches the half of customers who never open a recovery email.",
        tag: "Outbound · ~60s",
        tint: "coral",
        transcript: [
            {
                who: "ai",
                text: "Hi, this is {brand}, an AI assistant calling on their behalf. I noticed you were looking at the blue shirt earlier, it's the last one in your size. Want me to hold it and knock 10% off?",
                hl: "last one in your size",
            },
            { who: "caller", text: "Oh, I forgot about that. Yes, go ahead." },
            {
                who: "ai",
                text: "Done, it's held with the discount applied and I've texted you the checkout link.",
            },
        ],
        outcome: "Cart recovered · 10% off applied",
    },
];

export type DemoFormField = {
    name: "name" | "category" | "city" | "orderValue" | "channel";
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
};

export const DEMO_FORM_FIELDS: DemoFormField[] = [
    { name: "name", label: "Brand name", placeholder: "Northgate Skincare", required: true },
    {
        name: "category",
        label: "Product category",
        options: ["Fashion & apparel", "Beauty & personal care", "Electronics", "Home & kitchen", "Food & FMCG", "Jewellery", "Other"],
    },
    { name: "city", label: "Primary market", placeholder: "India, UAE, USA" },
    { name: "orderValue", label: "Typical order value", placeholder: "₹1,200" },
    { name: "channel", label: "Where most orders come from", options: ["Own website", "Shopify", "WooCommerce", "Marketplace", "Other"] },
];

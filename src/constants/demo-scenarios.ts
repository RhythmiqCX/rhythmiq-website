// Data for the interactive /demo funnel. The `{restaurant}` token in transcript
// lines is replaced with the name the visitor enters (falls back to "your
// restaurant"). `hl` is a substring of `text` that gets the coral highlight.

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
        id: "missed-rush",
        title: "Missed dinner-rush call",
        blurb: "It's 7:42 on a Friday and every server is slammed. The phone still gets answered.",
        tag: "7:42 PM · Friday rush",
        tint: "sand",
        transcript: [
            { who: "caller", text: "Hi, do you have a table for four tonight around eight?" },
            {
                who: "ai",
                text: "Thanks for calling {restaurant}. We can seat four at eight fifteen. Want me to hold it?",
                hl: "eight fifteen",
            },
            { who: "caller", text: "Yes please, under Marcus." },
            {
                who: "ai",
                text: "Done, Marcus. Table for four at eight fifteen, and I just texted you a confirmation. See you tonight.",
            },
        ],
        outcome: "Booked · table for 4 · 8:15 PM",
    },
    {
        id: "reservation-change",
        title: "Reservation change",
        blurb: "A guest needs to grow their party at the last minute. No host time needed.",
        tag: "2:10 PM · change request",
        tint: "sky",
        transcript: [
            { who: "caller", text: "I booked for six tomorrow, but we are now eight." },
            {
                who: "ai",
                text: "No problem. I found your booking and moved you to eight guests at the same time. You are all set.",
                hl: "moved you to eight",
            },
            { who: "caller", text: "Amazing, thank you." },
            {
                who: "ai",
                text: "Anytime. I sent the updated confirmation by text. See you tomorrow.",
            },
        ],
        outcome: "Updated · party of 8",
    },
    {
        id: "takeout-order",
        title: "Takeout order",
        blurb: "A phone order goes straight to the kitchen with the total read back, no notepad.",
        tag: "12:30 PM · takeout",
        tint: "coral",
        transcript: [
            { who: "caller", text: "Can I get two margherita pizzas and a caesar salad for pickup?" },
            {
                who: "ai",
                text: "You got it. Two margherita pizzas and one caesar salad, ready in twenty minutes. That comes to thirty four dollars.",
                hl: "ready in twenty minutes",
            },
            { who: "caller", text: "Perfect." },
            {
                who: "ai",
                text: "Great. Your order is in with the kitchen and I texted you the pickup details.",
            },
        ],
        outcome: "Order sent to POS · $34",
    },
    {
        id: "after-hours",
        title: "After-hours booking",
        blurb: "An 11 PM call still turns into a Saturday reservation while you sleep.",
        tag: "11:18 PM · after hours",
        tint: "ink",
        transcript: [
            { who: "caller", text: "Are you still open? I wanted to book for Saturday." },
            {
                who: "ai",
                text: "We just closed for the night, but I am happy to book that now. How many and what time on Saturday?",
                hl: "happy to book that now",
            },
            { who: "caller", text: "Six people at seven." },
            {
                who: "ai",
                text: "Booked, six at seven on Saturday. Your confirmation is on its way by text. Have a good night.",
            },
        ],
        outcome: "Booked after hours · 6 at 7 PM Sat",
    },
    {
        id: "dietary",
        title: "Allergy or dietary question",
        blurb: "A careful guest gets a real answer from your menu, then a table.",
        tag: "4:05 PM · dietary question",
        tint: "sand",
        transcript: [
            { who: "caller", text: "Do you have gluten free pasta options?" },
            {
                who: "ai",
                text: "We do. We have three gluten free pastas and the kitchen preps them separately to avoid cross contact. Want me to hold a table so you can try them?",
                hl: "three gluten free pastas",
            },
            { who: "caller", text: "Sure, two of us at six thirty." },
            {
                who: "ai",
                text: "Done, two at six thirty. I noted the gluten free request for the kitchen.",
            },
        ],
        outcome: "Booked + note to kitchen",
    },
];

export type DemoFormField = {
    name: "name" | "cuisine" | "city" | "busyHours" | "tone";
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
};

export const DEMO_FORM_FIELDS: DemoFormField[] = [
    { name: "name", label: "Restaurant name", placeholder: "Bella Trattoria", required: true },
    {
        name: "cuisine",
        label: "Cuisine / type",
        options: ["Italian", "Indian", "Japanese", "Mexican", "Cafe", "Steakhouse", "Other"],
    },
    { name: "city", label: "City", placeholder: "Austin, TX" },
    { name: "busyHours", label: "Typical busy hours", placeholder: "Thu to Sat, 6 to 9 PM" },
    { name: "tone", label: "Greeting tone", options: ["Warm", "Upscale", "Casual", "Concise"] },
];

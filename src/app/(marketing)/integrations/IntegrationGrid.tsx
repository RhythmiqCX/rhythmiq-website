import Reveal from "@/components/marketing/restaurant/reveal";

type Category = { name: string; desc: string; items: string[] };

const CATEGORIES: Category[] = [
  {
    name: "Point of sale",
    desc: "Push phone orders straight to your POS so the kitchen and the register stay in sync.",
    items: ["Order injection", "Menu + modifier sync", "Open ticket lookup"],
  },
  {
    name: "Reservations",
    desc: "Read and write your booking calendar in real time, so the floor never gets double seated.",
    items: ["Live table availability", "Create + change bookings", "Waitlist + SMS confirmations"],
  },
  {
    name: "CRM + guest data",
    desc: "Every call writes back to your guest records, so regulars feel known the moment they ring.",
    items: ["Guest profiles", "Tags + notes", "Visit history"],
  },
  {
    name: "Delivery + online orders",
    desc: "Keep phone orders and delivery tickets together instead of scattered across tabs.",
    items: ["Takeout capture", "Delivery handoff", "Order status"],
  },
  {
    name: "Payments",
    desc: "Take deposits for large parties and events without chasing anyone for a card.",
    items: ["Deposit links", "Saved cards", "No show protection"],
  },
  {
    name: "Messaging + calendar",
    desc: "Follow every call with the right text and the right reminder, automatically.",
    items: ["SMS + WhatsApp", "Web chat", "Calendar holds"],
  },
];

const IntegrationGrid = () => {
  return (
    <section className="section bg-paper2" aria-label="Integration categories">
      <div className="wrap">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.name} delay={(i % 3) * 0.06}>
              <div
                className="rounded-[16px] bg-white p-6 h-full"
                style={{ border: "1px solid var(--line-soft)" }}
              >
                <span className="w-[34px] h-[34px] rounded-[10px] bg-paper2 grid place-items-center mb-4">
                  <span className="w-[15px] h-[15px] rounded-[5px] bg-coral block" />
                </span>
                <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">
                  {cat.name}
                </h3>
                <p className="text-ink2 text-sm mt-2 leading-relaxed">{cat.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-ink2">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Connect-anything note (generic, no specific brand claims) */}
        <Reveal>
          <div
            className="mt-6 rounded-[16px] bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
            style={{ border: "1px solid var(--line-soft)" }}
          >
            <div className="md:flex-1">
              <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">
                Running something custom?
              </h3>
              <p className="text-ink2 text-sm mt-2 leading-relaxed max-w-[60ch]">
                Rhythmiq connects to anything with a REST API, webhooks, or Zapier.
                If your team can name the tool, we can usually wire it up. Tell us
                what you run and we will map the setup with you.
              </p>
            </div>
            <div className="flex gap-2.5 flex-wrap">
              <span className="font-mono text-[11px] text-ink2 bg-paper2 px-3 py-1.5 rounded-full">
                REST API
              </span>
              <span className="font-mono text-[11px] text-ink2 bg-paper2 px-3 py-1.5 rounded-full">
                Webhooks
              </span>
              <span className="font-mono text-[11px] text-ink2 bg-paper2 px-3 py-1.5 rounded-full">
                Zapier
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default IntegrationGrid;

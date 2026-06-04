import { Plug, RefreshCw, Zap } from "lucide-react";

const steps = [
  {
    icon: Plug,
    step: "01",
    title: "Connect",
    description:
      "Link your POS, booking system, and CRM in a few clicks. No engineer required for the common stacks, and our team handles the rest.",
  },
  {
    icon: RefreshCw,
    step: "02",
    title: "Sync",
    description:
      "Rhythmiq reads your menu, your tables, and your hours, then writes bookings and orders back in real time. Both sides always match.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Go live",
    description:
      "Your AI host starts answering with full context from day one. Every call updates your tools automatically, with nothing to copy over by hand.",
  },
];

const HowIntegrationsWork = () => {
  return (
    <section className="section" aria-label="How integrations work">
      <div className="wrap">
        <div className="text-center mb-12">
          <span className="eyebrow justify-center">How it works</span>
          <h2 className="h-section text-ink mt-3">Connect once, then forget it</h2>
          <p className="lede mt-3 max-w-xl mx-auto">
            Most restaurants are live within a day. After that, the sync runs
            quietly in the background on every call.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.step}
              className="relative flex flex-col items-start gap-4 p-6 rounded-xl bg-white"
              style={{ border: "1px solid var(--line-soft)" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-ink3 font-mono leading-none">
                  {step.step}
                </span>
                <div className="p-2 rounded-lg bg-coral/10 border border-coral/20">
                  <step.icon className="w-5 h-5 text-coral" />
                </div>
              </div>
              <h3 className="text-ink font-semibold text-base">{step.title}</h3>
              <p className="text-ink2 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIntegrationsWork;

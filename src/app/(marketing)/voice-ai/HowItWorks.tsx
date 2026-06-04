import React from "react";
import { Settings, PhoneCall, Zap } from "lucide-react";

const steps = [
  {
    icon: Settings,
    step: "01",
    title: "Configure Your AI Persona",
    description:
      "Set your AI receptionist's name, voice, language, and knowledge base. Upload FAQs, product docs, or booking flows — no coding needed.",
  },
  {
    icon: PhoneCall,
    step: "02",
    title: "Connect Your Phone Number",
    description:
      "Point your existing business number to RhythmiqCX via our REST API or no-code connector. Works with most telephony providers and IVR systems in minutes.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Go Live — 24/7 from Day One",
    description:
      "Your AI phone receptionist answers every call instantly. Complex queries route to your team with full transcripts — customers never repeat themselves.",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full py-16 px-4 bg-paper2">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="eyebrow justify-center">How It Works</span>
          <h2 className="h-feature text-ink mt-3">
            Set Up Your AI Phone Receptionist in 3 Steps
          </h2>
          <p className="text-ink2 mt-3 max-w-xl mx-auto text-sm">
            Most businesses go live within one business day. No ML team, no developer required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
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

export default HowItWorks;

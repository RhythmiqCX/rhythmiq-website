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
    <section className="w-full py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-cyan-400 uppercase tracking-widest mb-2">
            How It Works
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Set Up Your AI Phone Receptionist in 3 Steps
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
            Most businesses go live within one business day. No ML team, no developer required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative flex flex-col items-start gap-4 p-6 rounded-xl border border-slate-700 bg-slate-900/40"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-slate-700 font-mono leading-none">
                  {step.step}
                </span>
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <step.icon className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-white font-semibold text-base">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

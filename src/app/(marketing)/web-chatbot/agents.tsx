"use client";

import { useState } from "react";

const sections = [
  {
    id: "analyze",
    title: "Analyze",
    desc: "Monitor, analyze, and optimize Fin by spotting trends, filling content gaps, and fixing quality issues topic by topic.",
    features: [
      "Fin performance report",
      "Customer Experience Score",
      "Holistic reporting",
      "Fin custom reporting",
      "Topics Explorer",
      "Fin unresolved questions report",
      "Conversation monitoring",
      "Optimize Fin dashboard",
      "Suggestions",
    ],
  },
  {
    id: "train",
    title: "Train",
    desc: "Customize Fin's tone of voice, teach it your support knowledge and policies, and configure how it handles complex tasks in over 45 languages.",
    features: [
      "Multi-source generative answers",
      "Knowledge sources",
      "Fin knowledge management",
      "Fin Guidance",
      "Tone of voice",
      "Multilingual",
      "Real-time translation",
      "Content targeting",
      "Fin Tasks",
      "Personalized answers",
      "Data connector templates",
      "Fin Vision",
    ],
  },
  {
    id: "test",
    title: "Test",
    desc: "Test answers, review the sources and settings that shape them, and get tailored recommendations to optimize performance.",
    features: [
      "Batch testing",
      "Answer rating",
      "Fin preview",
      "Answer inspection",
      "Audience testing",
    ],
  },
  {
    id: "deploy",
    title: "Deploy",
    desc: "From email and live chat to phone, SMS, and social—Fin can answer any question, across any channel, any time.",
    features: [
      "Fin Voice",
      "Fin over email",
      "Fin over WhatsApp & SMS",
      "Fin over Slack",
      "Human handoff",
      "Usage limits and notifications",
      "Fin over live chat",
      "Fin over API",
      "Fin over Social",
      "Workflows for Fin",
      "Audience targeting",
    ],
  },
];

export default function AIAgentSection() {
  const [active, setActive] = useState("deploy");
  const current = sections.find((s) => s.id === active);

  return (
    <section className="w-full bg-cream text-dark-blue h-[calc(100vh-4rem)] overflow-y-auto pt-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <p className="text-xs font-mono uppercase tracking-wider text-orange mb-4">
          AI Agent System
        </p>
        <h1 className="text-4xl lg:text-6xl font-serif leading-tight mb-6">
          Complete, fully configurable <br /> AI Agent System
        </h1>
        <p className="text-lg text-dark-blue/70 max-w-2xl mb-6">
          Fin is the only complete, fully configurable AI Agent System in customer service—empowering support teams to customize, test, and continuously improve Fin through a no-code user experience anyone can manage.
        </p>
        <button className="px-5 py-3 border border-black rounded-md font-medium hover:bg-black hover:text-white transition">
          Explore all capabilities
        </button>
      </div>

      {/* Capabilities Section */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 px-4 pb-12">
        {/* Left - Image Placeholder */}
        <div className="border border-black/10 bg-white rounded-md flex items-center justify-center p-8">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">[Carousel Image: {current?.title}]</span>
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex flex-col gap-6">
          {/* Pills */}
          <ul className="flex gap-3 flex-wrap">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s.id)}
                  className={`px-4 py-2 rounded-full border text-xs font-mono uppercase tracking-wider transition-colors ${
                    active === s.id
                      ? "bg-orange border-orange text-white"
                      : "border-black/20 bg-white hover:border-black"
                  }`}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>

          <div>
            <h2 className="text-2xl lg:text-3xl font-serif mb-4">{current?.title}</h2>
            <p className="text-base text-dark-blue/70 mb-6">{current?.desc}</p>

            <div>
              <span className="block font-mono text-xs uppercase tracking-wider text-dark-blue/60 border-b border-black/10 pb-2 mb-4">
                Featured Capabilities
              </span>
              <ul className="grid grid-cols-2 gap-2 text-sm text-dark-blue/80">
                {current?.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

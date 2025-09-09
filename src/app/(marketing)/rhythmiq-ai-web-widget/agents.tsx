"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const colorMap: Record<string, string> = {
  build: "from-indigo-500/40 via-indigo-700/30 to-indigo-900/40",
  integrate: "from-orange-400/40 via-orange-600/30 to-orange-800/40",
  train: "from-blue-400/40 via-blue-600/30 to-blue-800/40",
  optimize: "from-green-400/40 via-green-600/30 to-green-800/40",
};

const sections = [
  {
    id: "build",
    title: "Build",
    desc: "Design your chatbot exactly how you want it. RhythmiqCX gives you full control over flows, tone, and logic—without relying on third-party platforms.",
    image: "/images/feature-one.svg",
    features: [
      "Custom conversation builder",
      "Visual flow editor",
      "Message templates",
      "Context-aware replies",
      "Persona & tone control",
      "Multi-language setup",
      "Web SDK for easy embed",
      "Customizable UI components",
    ],
  },
  {
    id: "integrate",
    title: "Integrate",
    desc: "Seamlessly plug RhythmiqCX into your web app. Connect with your backend, CRM, or knowledge base through our native APIs and data connectors.",
    image: "/images/feature-two.svg",
    features: [
      "API-first architecture",
      "Webhook support",
      "CRM & support tool connectors",
      "Knowledge base sync",
      "Custom data integrations",
      "User authentication support",
      "Single sign-on (SSO)",
      "Secure data handling",
    ],
  },
  {
    id: "train",
    title: "Train",
    desc: "Power your chatbot with your own data and policies. Teach it product knowledge, FAQs, and support workflows while keeping everything private and in your control.",
    image: "/images/dashboard.png",
    features: [
      "Knowledge upload",
      "Custom FAQ training",
      "Policy & compliance guardrails",
      "Intent recognition",
      "Multi-source context handling",
      "Real-time learning updates",
      "Human fallback routing",
      "Conversation labeling",
    ],
  },
  {
    id: "optimize",
    title: "Optimize",
    desc: "Measure performance, analyze conversations, and continuously improve the chatbot experience for your customers and team.",
    image: "/images/feature-four.svg",
    features: [
      "Conversation analytics dashboard",
      "Customer satisfaction tracking",
      "Message-level insights",
      "Missed question detection",
      "Improvement recommendations",
      "Topic trend reports",
      "Agent handoff reporting",
      "A/B testing for flows",
    ],
  },
];

export default function AIAgentSection() {
  const [active, setActive] = useState("build");
  const current = sections.find((s) => s.id === active);

  return (
    <div className="w-full h-full flex flex-col justify-center text-dark-blue overflow-y-auto sm:overflow-y-hidden">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-3 sm:mb-6 lg:mb-8">
        <p className="text-xs font-mono uppercase tracking-wider text-indigo-600 mb-1 sm:mb-4">
          RhythmiqCX Webchatbot
        </p>
        <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-6xl font-serif leading-tight mb-2 sm:mb-6">
          Smarter, Faster <br className="hidden sm:block" /> Customer Support
        </h1>
        <p className="text-xs sm:text-base lg:text-lg text-dark-blue/70 max-w-2xl mb-3 sm:mb-6">
          RhythmiqCX is the intelligent website chatbot built to help startups
          and growing businesses deliver instant answers, reduce support costs,
          and keep customers happy—without adding more agents to your team.
        </p>
      </div>

      {/* Capabilities Section */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
        {/* Left - Image */}
        <div className="border border-black/10 bg-white rounded-md relative overflow-hidden flex items-center justify-center p-3 sm:p-6 min-h-[200px] sm:min-h-[400px] lg:min-h-[500px]">
          {/* Background Animation */}
          <motion.div
            key={active}
            className={`absolute inset-0 bg-gradient-to-r ${colorMap[active]}`}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />

          {/* SVG/Image */}
          {current?.image && (
            <Image
              src={current.image}
              alt={current.title}
              width={500}
              height={400}
              className="relative z-10 w-full max-w-md h-auto object-contain"
            />
          )}
        </div>

        {/* Right - Content */}
        <div className="flex flex-col gap-3 sm:gap-6 overflow-hidden">
          {/* Pills */}
          <ul className="flex gap-2 sm:gap-3 flex-wrap">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs font-mono uppercase tracking-wider transition-colors ${
                    active === s.id
                      ? "bg-indigo border-indigo text-white shadow-md"
                      : "bg-gray-100 border-black/30 text-black hover:bg-dark-blue hover:text-indigo-500 hover:border-dark-blue"
                  }`}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>

          {/* Content */}
          <div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-serif mb-2 sm:mb-4">
              {current?.title}
            </h2>
            <p className="text-sm sm:text-base text-dark-blue/70 mb-3 sm:mb-6">{current?.desc}</p>

            <div>
              <span className="block font-mono text-xs uppercase tracking-wider text-dark-blue/60 border-b border-black/10 pb-1 sm:pb-2 mb-2 sm:mb-4">
                Featured Capabilities
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm text-dark-blue/80">
                {current?.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

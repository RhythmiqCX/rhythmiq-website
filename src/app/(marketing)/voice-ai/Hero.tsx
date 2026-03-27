// Hero.tsx
"use client";
import AnimatedGradientButton from "./Animation";
import React from "react";

const Hero = () => {
  const handleScrollToDemo = () => {
    const demoSection = document.getElementById("voice-demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen w-full bg-background/80 flex items-center px-6 sm:px-12">
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-8">
        {/* Main Heading */}
        <div className="space-y-4">
          <p className="text-sm md:text-base text-gray-500 font-medium">
            Redefining Customer Conversations with the Power of Voice AI
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            AI Phone Receptionist &amp; <br /> Voice AI Agents
          </h1>
        </div>

        <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl">
          Deploy conversational AI voice agents that answer every customer call 24/7 — no hold queues, no missed leads. Human-like accuracy from $29/mo.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-6 text-center">
          <div>
            <p className="text-xl font-bold text-cyan-400">40%</p>
            <p className="text-xs text-gray-400">Cost Reduction</p>
          </div>
          <div className="border-l border-slate-700 pl-6">
            <p className="text-xl font-bold text-cyan-400">&lt;1s</p>
            <p className="text-xs text-gray-400">Response Time</p>
          </div>
          <div className="border-l border-slate-700 pl-6">
            <p className="text-xl font-bold text-cyan-400">60+</p>
            <p className="text-xs text-gray-400">Languages</p>
          </div>
          <div className="border-l border-slate-700 pl-6">
            <p className="text-xl font-bold text-cyan-400">1,000+</p>
            <p className="text-xs text-gray-400">Concurrent Calls</p>
          </div>
        </div>

        <AnimatedGradientButton />

        <div className="flex flex-col items-center">
          <p className="mb-1 text-xs text-gray-400">Already running a team? See how it works.</p>
          <a
            href="https://calendly.com/ray-rhythmiqcx/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border border-slate-600 hover:border-cyan-400
                           hover:bg-cyan-400/10 text-white font-medium py-2.5 px-6 rounded-md
                           text-xs sm:text-sm transition-all duration-300"
          >
            Book a Demo
          </a>
        </div>
        </div>
    </section>
  );
};

export default Hero;

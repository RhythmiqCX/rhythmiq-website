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
    <section className="min-h-screen w-full bg-paper flex items-center px-6 sm:px-12">
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-8">
        {/* Main Heading */}
        <div className="space-y-4">
          <span className="eyebrow justify-center">
            Redefining Customer Conversations with the Power of Voice AI
          </span>
          <h1 className="h-section text-ink">
            AI Phone Receptionist &amp; <br /> Voice AI Agents
          </h1>
        </div>

        <p className="lede leading-relaxed max-w-2xl">
          Deploy conversational AI voice agents that answer every customer call
          24/7 no hold queues, no missed leads. Human-like accuracy from $29/mo.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-6 text-center">
          <div>
            <p className="text-xl font-bold text-coral">40%</p>
            <p className="text-xs text-ink2">Cost Reduction</p>
          </div>
          <div className="border-l border-ink/10 pl-6">
            <p className="text-xl font-bold text-coral">&lt;1s</p>
            <p className="text-xs text-ink2">Response Time</p>
          </div>
          <div className="border-l border-ink/10 pl-6">
            <p className="text-xl font-bold text-coral">60+</p>
            <p className="text-xs text-ink2">Languages</p>
          </div>
          <div className="border-l border-ink/10 pl-6">
            <p className="text-xl font-bold text-coral">1,000+</p>
            <p className="text-xs text-ink2">Concurrent Calls</p>
          </div>
        </div>

        <AnimatedGradientButton />

        <div className="flex flex-col items-center">
          <p className="mb-1 text-xs text-ink2">
            Already running a team? See how it works.
          </p>
          <a
            href="https://calendly.com/ray-rhythmiqcx/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

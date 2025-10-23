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
          <h3 className="text-sm md:text-base text-gray-500 font-medium">
            Redefining Customer Conversations with the Power of Voice AI
          </h3>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Deploy Conversational <br /> Voice AI Agents
          </h1>
        </div>

        <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl">
          Transform your customer operations with AI agents so realistic, your customers will prefer them.
        </p>
                <AnimatedGradientButton />

          <div className="flex flex-col items-center">
            <p className="mb-1 text-xs text-gray-400">Ready to get started?</p>
            <button
              className="bg-transparent border border-slate-600 hover:border-cyan-400 
                             hover:bg-cyan-400/10 text-white font-medium py-2.5 px-6 rounded-md 
                             text-xs sm:text-sm transition-all duration-300"
            >
              Book a Demo
            </button>
          </div>
        </div>
    </section>
  );
};

export default Hero;

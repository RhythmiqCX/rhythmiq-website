"use client";

import React, { useState, useEffect } from "react";
import { Volume2, ShieldCheck, CheckCircle2 } from "lucide-react";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";

interface Message {
  role: "customer" | "ai";
  text: string;
}

interface Scenario {
  title: string;
  description: string;
  messages: Message[];
}

const CallSimulator = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenarios: Scenario[] = [
    {
      title: "Table Booking",
      description: "How Rhythmiq handles a standard reservation, noting special dietary requests.",
      messages: [
        { role: "customer", text: "Hi, I'd like to book a table for four tonight around 7:30 PM." },
        { role: "ai", text: "Checking availability for tonight... Yes, we have a table for four at 7:30 PM. Shall I book that under your name?" },
        { role: "customer", text: "Yes, under Tanvi please." },
        { role: "ai", text: "Got it, Tanvi. Do any of your guests have food allergies or dietary restrictions I should note?" },
        { role: "customer", text: "Yes, one is gluten free." },
        { role: "ai", text: "I've noted the gluten free request. Your table is booked for four at 7:30 PM tonight. A confirmation text is on its way!" }
      ]
    },
    {
      title: "Order Takeout",
      description: "How Rhythmiq handles food orders, pushes upsells, and coordinates with POS.",
      messages: [
        { role: "customer", text: "Hello, I'd like to place an order for pickup." },
        { role: "ai", text: "Sure! What can I get started for you today?" },
        { role: "customer", text: "I'll take two Margherita pizzas and a Caesar salad." },
        { role: "ai", text: "Got it: two Margheritas and one Caesar salad. Would you like to add some of our garlic dough knots or a drink with that order?" },
        { role: "customer", text: "Actually, let's add the garlic dough knots. That's all." },
        { role: "ai", text: "Awesome choice! That will be ready in 20 minutes. The total is $42.50. I'm sending the receipt to this number now." }
      ]
    },
    {
      title: "After-Hours & FAQs",
      description: "How Rhythmiq handles common restaurant information queries after closing.",
      messages: [
        { role: "customer", text: "Hi, are you guys open right now? Do you have parking?" },
        { role: "ai", text: "Hi! We are closed right now, but we open tomorrow at 11:30 AM. Yes, we have dedicated guest parking behind the building." },
        { role: "customer", text: "Okay, great. What are your weekend hours?" },
        { role: "ai", text: "We are open on Fridays and Saturdays from 11:30 AM until 11:00 PM, and Sundays from 11:30 AM until 9:00 PM. Anything else I can help with?" },
        { role: "customer", text: "No, that covers it. Thank you!" },
        { role: "ai", text: "You're welcome! Hope to see you soon. Have a great night!" }
      ]
    }
  ];

  const activeScenario = scenarios[activeTab];

  // Auto-typing message flow logic
  useEffect(() => {
    setVisibleCount(1);
    setIsPlaying(true);
  }, [activeTab]);

  useEffect(() => {
    if (!isPlaying) return;
    if (visibleCount >= activeScenario.messages.length) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [visibleCount, isPlaying, activeScenario]);

  const handleRestart = () => {
    setVisibleCount(1);
    setIsPlaying(true);
  };

  return (
    <section className="relative w-full py-20 bg-slate-950/40 border-y border-slate-900">
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Volume2 className="size-3.5" />
            Live Simulator
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
            Experience a Live Restaurant AI Call
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground">
            Experience how naturally Rhythmiq interacts with customers. Select a scenario to preview the call transcript.
          </p>
        </div>

        {/* Tab triggers */}
        <div className="flex justify-center gap-2 md:gap-4 mb-8 flex-wrap">
          {scenarios.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                activeTab === idx
                  ? "bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/15"
                  : "bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Unified Phone Dashboard Container */}
        <div className="max-w-5xl mx-auto rounded-[32px] border border-slate-900 bg-slate-950/20 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch backdrop-blur-md">
          {/* Left Block: Call Info Console */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-r lg:border-slate-900/80 lg:pr-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-500">Active Scenario</span>
              <h3 className="text-2xl font-bold text-white tracking-tight">{activeScenario.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeScenario.description}
              </p>
            </div>

            {/* Simulated wave animation */}
            <div className="py-6 flex items-center justify-center gap-1 h-20 my-2 bg-slate-950/30 rounded-2xl border border-slate-900/40">
              {[...Array(15)].map((_, i) => {
                const heights = ["h-3", "h-8", "h-5", "h-10", "h-6", "h-12", "h-4", "h-9", "h-6", "h-11", "h-5", "h-7", "h-3", "h-10", "h-4"];
                const animationClass = isPlaying ? "animate-pulse" : "";
                return (
                  <div
                    key={i}
                    className={`w-1 bg-amber-500 rounded-full ${heights[i % heights.length]} ${animationClass}`}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-900/80">
              <Button
                onClick={handleRestart}
                className="bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 text-xs px-4 py-2"
              >
                Restart Call
              </Button>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="size-4 text-green-500" />
                <span>Sarvam Bulbul v2</span>
              </div>
            </div>
          </div>

          {/* Right Block: Receptionist Transcript Panel */}
          <div className="lg:col-span-8 bg-slate-950/40 rounded-2xl border border-slate-900/80 p-5 flex flex-col justify-between min-h-[360px] relative overflow-hidden">
            {/* Scrollable Message Box */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {activeScenario.messages.slice(0, visibleCount).map((msg, index) => {
                const isAi = msg.role === "ai";
                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isAi ? "items-end" : "items-start"} animate-fade-in`}
                  >
                    <span className="text-[9px] text-slate-500 font-semibold px-1 mb-1">
                      {isAi ? "Voice Assistant" : "Guest"}
                    </span>
                    <div
                      className={`text-sm px-4 py-3 rounded-2xl max-w-[80%] leading-relaxed ${
                        isAi
                          ? "bg-amber-500/10 border border-amber-500/30 text-amber-200 rounded-tr-none"
                          : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom status badge */}
            <div className="mt-4 pt-4 border-t border-slate-900/80 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>
                  {isPlaying ? "Receiving voice stream..." : "Call simulation complete"}
                </span>
              </div>
              {visibleCount === activeScenario.messages.length && (
                <span className="text-green-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="size-3.5" /> Booked & POS Synced
                </span>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CallSimulator;

"use client";

import React, { useState } from "react";
import { Coffee, Utensils, Flame, Network, CheckCircle } from "lucide-react";
import Container from "@/components/global/container";

interface SolutionItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  headline: string;
  description: string;
  features: string[];
}

const NicheSolutions = () => {
  const [activeTab, setActiveTab] = useState(0);

  const solutions: SolutionItem[] = [
    {
      icon: Coffee,
      label: "Cafes & Diners",
      headline: "Keep Baristas Focused on Brewing, Not the Phone",
      description: "During morning and lunch rushes, your counter staff shouldn't be distracted by simple calls about parking, hours, or daily specials. Rhythmiq filters FAQs instantly.",
      features: [
        "Answer questions about wifi, menu items, and parking instantly",
        "Direct callers to your digital ordering link via SMS",
        "Never distract baristas during peak morning hours"
      ]
    },
    {
      icon: Flame,
      label: "Cloud Kitchens",
      headline: "High-Volume Direct Order Capture & Dispatch",
      description: "Reduce dependency on expensive third-party delivery apps. Rhythmiq answers high-volume phone orders, inputs details into your kitchen display, and schedules pickups.",
      features: [
        "Transcribe and process takeout orders directly into kitchen screens",
        "Handle up to 1,000 calls simultaneously during peak dinner rush",
        "Suggest upsells like drinks and desserts on every single order"
      ]
    },
    {
      icon: Utensils,
      label: "Fine Dining",
      headline: "Preserve the Premium Reservation Experience",
      description: "Fine dining requires careful seating rules. Rhythmiq coordinates with OpenTable and Resy to handle reservations under specific rules (VIP alerts, dining limits).",
      features: [
        "Fully sync guest profile details and seating preferences",
        "Notify callers about cancellation policies and deposit requirements",
        "Escalate complex requests to your manager with full audio summaries"
      ]
    },
    {
      icon: Network,
      label: "Restaurant Chains",
      headline: "Multi-Location Call Routing and Brand Consistency",
      description: "Manage multiple locations under a single front-desk system. Rhythmiq detects customer location preferences and routes bookings to the correct franchise portal.",
      features: [
        "Intelligently route calls to specific local branch databases",
        "Maintain identical brand voice, greeting formulas, and guidelines",
        "Consolidated dashboard to track stats across all operating venues"
      ]
    }
  ];

  const activeSolution = solutions[activeTab];
  const ActiveIcon = activeSolution.icon;

  return (
    <section className="relative w-full py-20 bg-background overflow-hidden">
      <div className="absolute left-10 top-10 w-[300px] h-[300px] -z-10 blur-[100px] rounded-full bg-cyan-500/5 pointer-events-none" />

      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
           Solutions for Every Restaurant Model
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Whether you run a high volume cloud kitchen or a reservation only fine dining room, Rhythmiq adapts to your operational flow.
          </p>
        </div>

        {/* Split Sidebar & Content Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">
          {/* Left Column: Sidebar Navigation Tab Triggers */}
          <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-28">
            {solutions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-200 ${
                    activeTab === idx
                      ? "bg-slate-950 border-amber-500/20 text-amber-400 shadow-md shadow-amber-500/5"
                      : "bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-950/20"
                  }`}
                >
                  <Icon className={`size-5 ${activeTab === idx ? "text-amber-400" : "text-slate-500"}`} />
                  <span className="text-sm font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Solution Content Panel */}
          <div className="lg:col-span-8 rounded-3xl border border-slate-900 bg-slate-950/20 p-8 md:p-10 min-h-[380px] relative overflow-hidden backdrop-blur-md flex flex-col justify-between">
            {/* Subtle watermark in background */}
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 pointer-events-none -z-10 select-none">
              <ActiveIcon className="size-64 text-amber-500" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs text-amber-500 font-semibold uppercase tracking-wider block">
                  {activeSolution.label} Solution
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight font-heading">
                  {activeSolution.headline}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  {activeSolution.description}
                </p>
              </div>

              <ul className="space-y-3 border-t border-slate-900/80 pt-6">
                {activeSolution.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                    <CheckCircle className="size-4.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NicheSolutions;

"use client";

import React, { useState } from "react";
import { TrendingUp, Calculator } from "lucide-react";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const RevenueCalculator = () => {
  const [aov, setAov] = useState(65);
  const [missedCalls, setMissedCalls] = useState(10);
  const [operatingDays, setOperatingDays] = useState(30);

  // Math calculations
  const monthlyLeak = aov * missedCalls * operatingDays;
  const yearlyLeak = monthlyLeak * 12;
  const annualRecovered = Math.round(yearlyLeak * 0.90);

 

  return (
    <section className="relative w-full py-20 bg-background overflow-hidden border-t border-slate-900/60">
      {/* Background ambient light */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] -z-10 blur-[150px] rounded-full bg-amber-500/5 pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/25 bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-wider">
            <Calculator className="size-3.5" />
            ROI Calculator
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
           How Much Revenue is Slipping Away?
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground">
            Calculate your estimated revenue leakage from unanswered phone calls and see how much Rhythmiq can recover for your restaurant.
          </p>
        </div>

        
        {/* Unified Calculator Panel */}
        <div className="max-w-5xl mx-auto rounded-[32px] border border-slate-900 bg-slate-950/20 p-6 md:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Block: Sliders (Input) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 lg:pr-6">
              <div className="space-y-6">
                {/* Slider 1: Average Order Value / Check Size */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-200">
                      Average Order Value (Check Size)
                    </label>
                    <span className="text-lg font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                      ${aov}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="300"
                    step="5"
                    value={aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>$15</span>
                    <span>$150</span>
                    <span>$300</span>
                  </div>
                </div>

                {/* Slider 2: Missed Calls Per Day */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-200">
                      Estimated Missed Calls / Day
                    </label>
                    <span className="text-lg font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                      {missedCalls} calls
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    step="1"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>2 calls</span>
                    <span>25 calls</span>
                    <span>50 calls</span>
                  </div>
                </div>

                {/* Slider 3: Operating Days Per Month */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-200">
                      Operating Days / Month
                    </label>
                    <span className="text-lg font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                      {operatingDays} days
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="31"
                    step="1"
                    value={operatingDays}
                    onChange={(e) => setOperatingDays(Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>15 days</span>
                    <span>26 days</span>
                    <span>31 days</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed pt-4 border-t border-slate-900/60">
                {"*Calculations assume a conservative booking conversion rate of 90% using Rhythmiq's voice assistant. Actually recovered revenue may vary based on check sizes and customer intent."}
              </p>
            </div>

            {/* Right Block: Stats Display (Output) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-amber-500/5 via-orange-600/5 to-slate-950/60 border border-amber-500/10 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              {/* Soft decorative glow */}
              <div className="absolute -top-10 -right-10 size-24 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Estimated Monthly Leakage
                  </span>
                  <div className="text-4xl font-extrabold text-red-400 tracking-tight flex items-baseline leading-none">
                    ${monthlyLeak.toLocaleString()}
                    <span className="text-xs text-slate-500 font-medium ml-1">/ month</span>
                  </div>
                </div>

                <div className="border-t border-slate-900/60 pt-6">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Yearly Recovered with Rhythmiq
                  </span>
                  <div className="text-5xl font-extrabold text-amber-400 tracking-tight flex items-baseline leading-none drop-shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                    ${annualRecovered.toLocaleString()}
                    <span className="text-xs text-slate-500 font-medium ml-1">/ year</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded border border-green-500/20">
                    <TrendingUp className="size-3.5" />
                    Assumes 90% answer & conversion rate
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-900/60">
                <Link href="/book-demo" className="block w-full">
                  <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-6 rounded-2xl transition-all duration-300">
                    Stop Leaking Revenue
                  </Button>
                </Link>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500">
                    Starts at just $29/mo — Pay for itself in 1 recovered booking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RevenueCalculator;

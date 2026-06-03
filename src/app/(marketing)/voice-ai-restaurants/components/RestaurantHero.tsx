"use client";

import React from "react";
import Link from "next/link";
import { Mic, ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";

const RestaurantHero = () => {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-background">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] -z-10 blur-[120px] rounded-full bg-gradient-to-r from-amber-500/10 via-cyan-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-10 w-[300px] h-[300px] -z-10 blur-[100px] rounded-full bg-orange-600/5 pointer-events-none" />

      <Container className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="size-3.5" />
              Built for the Peak Hour Rush
            </div>

            <h1 className="max-w-[650px] text-4xl md:text-5xl lg:text-[56px] font-bold font-heading leading-[1.05] text-white">
  AI Receptionist for
  <br />
  Restaurants That Never Miss Calls
</h1>
            <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Deploy an <Link href="/voice-ai" className="text-amber-400 hover:text-amber-300 font-semibold hover:underline">AI phone receptionist</Link> that answers every customer call 24/7. Automate <Link href="/ai-customer-support" className="text-amber-400 hover:text-amber-300 font-semibold hover:underline">customer support</Link>, handle reservations, and capture orders instantly without distracting your kitchen staff. Integrates directly with your POS.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
              <Link href="/book-demo" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-semibold shadow-md shadow-amber-500/10 gap-2 border-0"
                >
                  See Rhythmiq in Action
                  <Mic className="size-4" />
                </Button>
              </Link>
              
              <Link href="https://calendly.com/ray-rhythmiqcx/30min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 text-white hover:bg-slate-900 gap-2">
                  Talk to an Expert
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            </div>

          {/* Right Column: High-Fidelity Call Simulation Card */}
          <div className="lg:col-span-5 relative flex justify-end items-center">
            {/* Soft backdrop glow behind mock interface */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-cyan-500/10 blur-3xl -z-10 rounded-full" />

            <div className="w-full max-w-[500px] rounded-3xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-xl p-5 shadow-2xl relative overflow-hidden">
              {/* Call indicator top bar */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex size-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Active Call</span>
                </div>
                <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  Table for 4
                </span>
              </div>

              {/* Chat script bubbles */}
              <div className="space-y-4 my-2">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[10px] text-slate-500 font-medium ml-2">Customer</span>
                  <div className="bg-slate-800 text-slate-200 text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-none max-w-[85%] leading-relaxed">
                    {"\"Hi, I'd like to book a table for 4 people tonight around 7:30 PM under Ray.\""}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-slate-500 font-medium mr-2">Rhythmiq AI</span>
                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 text-amber-200 text-xs px-3.5 py-2.5 rounded-2xl rounded-tr-none max-w-[85%] leading-relaxed">
                    {"\"Let me check that... Yes, I can book you a table at 7:30 PM. I'll send a confirmation SMS. Any dietary restrictions for your party?\""}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-1">
                  <span className="text-[10px] text-slate-500 font-medium ml-2">Customer</span>
                  <div className="bg-slate-800 text-slate-200 text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-none max-w-[85%] leading-relaxed">
                    {"\"One guest is gluten-free. That's it!\""}
                  </div>
                </div>
              </div>

              {/* Dashboard notification banner */}
              <div className="mt-6 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <PhoneCall className="size-4 text-green-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-semibold text-slate-200">Table Booked Successfully</h4>
                    <p className="text-[10px] text-slate-500">Synced to Reservation Manager</p>
                  </div>
                </div>
                <span className="text-[10px] text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20">
                  Toast POS Sync
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RestaurantHero;

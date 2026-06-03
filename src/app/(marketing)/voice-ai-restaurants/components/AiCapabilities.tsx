"use client";

import React from "react";
import { CheckCircle2, ArrowRightLeft, Sparkles, AlertCircle } from "lucide-react";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AiCapabilities = () => {
  const resolvedItems = [
    "Table Reservations (syncs instantly with Resy & OpenTable)",
    "takeout & Pickup Orders (registers automatically in Toast & Square)",
    "Frequently Asked Questions (parking availability, menu details, operating hours)",
    "Dietary & Allergen Filtering (logs gluten-free, vegan preferences in system)",
    "After-Hours Message Capture & Callback Scheduling"
  ];

  const routedItems = [
    "Large Group & Event Bookings (12+ people, routes to sales manager)",
    "Catering Inquiries (alerts event coordinator with transcript history)",
    "Customer Complaints & Feedbacks (transfers directly to floor manager)",
    "Complex Billing / Payment Issues (sends alert notification to host stand)",
    "VIP Guest Arrivals (rings managers desk instantly with profile logs)"
  ];

  return (
    <section className="relative w-full py-20 bg-background overflow-hidden border-t border-slate-900/60">
      <div className="absolute left-1/4 top-1/2 w-[350px] h-[350px] -z-10 blur-[130px] rounded-full bg-amber-500/5 pointer-events-none" />

      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="size-3.5" />
            Capabilities Matrix
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
            Transparent Automation You Can Trust
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground">
            Rhythmiq AI handles the routine reservations and phone orders, keeping your staff focused on food. Complex issues are automatically escalated to your team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch max-w-5xl mx-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-900">
          {/* Resolved by AI Column */}
          <div className="pb-8 lg:pb-0 lg:pr-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Auto-Resolved by AI</h3>
                  <p className="text-xs text-slate-500">Handled instantly 24/7 without staff intervention</p>
                </div>
              </div>

              <ul className="space-y-4">
                {resolvedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-colors duration-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-6 border-t border-slate-900/60 text-xs text-slate-500">
              *All reservation and POS mappings are completed in near zero-latency.
            </div>
          </div>

          {/* Routed to Staff Column */}
          <div className="pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <ArrowRightLeft className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Escalated to Staff</h3>
                  <p className="text-xs text-slate-500">Routed automatically with context summaries</p>
                </div>
              </div>

              <ul className="space-y-4">
                {routedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-colors duration-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-900/60 flex items-center gap-2 text-xs text-slate-500">
              <AlertCircle className="size-4 text-amber-500 shrink-0" />
              <span>Transfers include a summarized live call transcript to your device.</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/book-demo">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold py-6 px-8 rounded-xl shadow-lg border-0">
              Customize Your Routing Guidelines
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default AiCapabilities;

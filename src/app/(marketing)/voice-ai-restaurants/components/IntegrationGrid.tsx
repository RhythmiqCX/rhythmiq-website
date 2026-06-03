"use client";

import React from "react";
import { Link2, CheckCircle2 } from "lucide-react";
import Container from "@/components/global/container";

interface IntegrationItem {
  name: string;
  type: "POS System" | "Reservation Portal" | "Guest Management";
  description: string;
  status: "Native Sync" | "Beta Sync";
}

const IntegrationGrid = () => {
  const integrations: IntegrationItem[] = [
    {
      name: "Toast POS",
      type: "POS System",
      description: "Direct sync pushes telephone orders directly to kitchen tickets and kitchen displays.",
      status: "Native Sync"
    },
    {
      name: "OpenTable",
      type: "Reservation Portal",
      description: "Creates bookings, reads tables limits, and records client dining preferences.",
      status: "Native Sync"
    },
    {
      name: "Square POS",
      type: "POS System",
      description: "Secures guest ticket transactions and registers takeaway orders in real time.",
      status: "Native Sync"
    },
    {
      name: "Resy",
      type: "Reservation Portal",
      description: "Fetches table availabilities instantly and places reservation logs directly.",
      status: "Native Sync"
    },
    {
      name: "Clover POS",
      type: "POS System",
      description: "Instantly logs phone order tickets to your local bar or diner kitchen printing terminal.",
      status: "Beta Sync"
    },
    {
      name: "SevenRooms",
      type: "Guest Management",
      description: "Enforces VIP lists, notes guest profiles, and notifies managers of high-priority covers.",
      status: "Native Sync"
    }
  ];

  return (
    <section className="relative w-full py-20 bg-slate-950/40 border-y border-slate-900">
      <Container>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Link2 className="size-3.5" />
            Integrations
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
          Integrates With Your Existing Tools
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground">
            Zero disruption to your workflow. Rhythmiq integrates natively with the industry-leading POS systems and reservation software you already use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto border-t border-l border-slate-900/60">
          {integrations.map((item, index) => (
            <div
              key={index}
              className="border-r border-b border-slate-900/60 p-6 md:p-8 hover:bg-slate-950/40 transition-colors duration-300 group flex flex-col justify-between min-h-[220px]"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
                      {item.type}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                    item.status === "Native Sync"
                      ? "text-green-400 bg-green-400/5 border-green-500/20"
                      : "text-amber-400 bg-amber-400/5 border-amber-500/20"
                  }`}>
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-4 border-t border-slate-900/60 mt-6">
                <CheckCircle2 className="size-3.5 text-green-500 shrink-0" />
                <span>Zero Latency Sync</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default IntegrationGrid;

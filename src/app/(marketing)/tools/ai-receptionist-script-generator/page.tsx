import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import AIReceptionistScriptGenerator from "@/components/tools/ai-receptionist-script-generator/tool";
import {
  ChevronLeft,
  Headphones,
  PhoneCall,
  Volume2,
  Users,
  Mic,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title:
    "AI Receptionist Script Generator | Free AI Phone Script Tool | RhythmiqCX",
  description:
    "Generate a custom AI receptionist phone script for your business in 60 seconds. Free tool by RhythmiqCX. Perfect for healthcare, legal, real estate, and more.",
  alternates: {
    canonical: "/tools/ai-receptionist-script-generator",
  },
});

const AIReceptionistScriptGeneratorPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-6">
            <Link
              href="/tools"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </Link>

            <div className="flex flex-col gap-4 max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm w-fit">
                ✨ Free AI Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                AI Receptionist Script Generator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Build a production-ready call script for your AI receptionist in
                under 60 seconds. Customize tone, handle edge cases, and map out
                routing logic based on your specific industry.
              </p>
            </div>
          </div>

          <AIReceptionistScriptGenerator />

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-12 pt-16 border-t border-border/40">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  Why Use This Script Generator?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Most businesses struggle to transition from traditional IVR
                  trees to open-ended AI voice models. The gap between a basic
                  &quot;Hello&quot; and a high-converting, empathetic customer
                  journey comes down to the script instructions you provide the
                  AI.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This tool replaces hours of prompt engineering. By defining
                  your business context, caller personas, and edge cases, it
                  outputs a highly structured prompt designed to be pasted
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Headphones className="w-6 h-6 text-blue-500" />
                  Common Scenarios Handled
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground text-sm">
                  {[
                    "Appointment Booking",
                    "After-Hours Overflows",
                    "Lead Qualification",
                    "Order Tracking",
                    "Emergency Escalation",
                    "Case Intake Routing",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-2xl border border-border bg-muted/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <PhoneCall className="w-32 h-32" />
                </div>
                <h3 className="font-semibold text-xl mb-4 relative z-10">
                  Stop the &quot;Blank Page&quot; Paralysis
                </h3>
                <p className="text-muted-foreground leading-relaxed relative z-10 mb-6">
                  Deploying an AI receptionist shouldn&apos;t require a degree
                  in prompt engineering. Our generator uses the exact framework
                  we apply when onboarding enterprise clients at RhythmiqCX.
                </p>

                <div className="grid gap-3 relative z-10">
                  {[
                    {
                      icon: <Clock className="w-4 h-4 text-emerald-500" />,
                      text: "Drafts completed in 60s",
                    },
                    {
                      icon: <Volume2 className="w-4 h-4 text-blue-500" />,
                      text: "Tone-matched to your brand",
                    },
                    {
                      icon: <Mic className="w-4 h-4 text-violet-500" />,
                      text: "Interruption recovery baked in",
                    },
                    {
                      icon: <Users className="w-4 h-4 text-orange-500" />,
                      text: "Multi-persona handling",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/50 text-sm font-medium"
                    >
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default AIReceptionistScriptGeneratorPage;

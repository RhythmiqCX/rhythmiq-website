import React from "react";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import FloorPlanGeneratorTool from "@/components/tools/ai-floor-plan-generator/tool";
import {
  ChevronLeft,
  Home,
  Layout,
  PenTool,
  Download,
  Layers,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "AI Floor Plan Generator | Instant 2D Layouts",
  description:
    "Generate optimal floor plans instantly with AI. Customize plot size, rooms, and layouts. Download as PNG/PDF.",
  alternates: {
    canonical: "/tools/ai-floor-plan-generator",
  },
});

const AiFloorPlanGeneratorPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
                <Home className="mr-2 h-4 w-4" />
                Architectural Design
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                AI Floor Plan Generator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Instantly generate optimized 2D floor plans based on your plot
                size and requirements. Perfect for homeowners, architects, and
                real estate developers.
              </p>
            </div>
          </div>

          <FloorPlanGeneratorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Smart Layouts</h3>
              <p className="text-muted-foreground">
                Our rule-based AI engine optimizes room placement for natural
                light, ventilation, and flow.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-500">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Customizable</h3>
              <p className="text-muted-foreground">
                Input your exact plot dimensions and room requirements to get a
                tailored floor plan.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Instant Export</h3>
              <p className="text-muted-foreground">
                Download your generate floor plan as a high-quality image or PDF
                for printing and sharing.
              </p>
            </div>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default AiFloorPlanGeneratorPage;

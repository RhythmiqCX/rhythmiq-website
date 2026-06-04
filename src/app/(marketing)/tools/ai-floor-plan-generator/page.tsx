import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import FloorPlanGeneratorTool from "@/components/tools/ai-floor-plan-generator/tool";
import { ChevronLeft, Home, Layout, PenTool, Download } from "lucide-react";
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
      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-6">
            <Link
              href="/tools"
              className="flex items-center gap-2 text-sm text-ink3 hover:text-ink transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </Link>

            <div className="flex flex-col gap-4 max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-coral/20 bg-coralSoft px-3 py-1 text-sm font-medium text-coral w-fit">
                <Home className="mr-2 h-4 w-4" />
                Architectural Design
              </div>
              <span className="eyebrow">Free Tool</span>
              <h1 className="h-section">AI Floor Plan Generator</h1>
              <p className="lede max-w-2xl">
                Instantly generate optimized 2D floor plans based on your plot
                size and requirements. Perfect for homeowners, architects, and
                real estate developers.
              </p>
            </div>
          </div>

          <FloorPlanGeneratorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Smart Layouts</h3>
              <p className="text-ink2">
                Our rule-based AI engine optimizes room placement for natural
                light, ventilation, and flow.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Customizable</h3>
              <p className="text-ink2">
                Input your exact plot dimensions and room requirements to get a
                tailored floor plan.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Instant Export</h3>
              <p className="text-ink2">
                Download your generate floor plan as a high-quality image or PDF
                for printing and sharing.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default AiFloorPlanGeneratorPage;

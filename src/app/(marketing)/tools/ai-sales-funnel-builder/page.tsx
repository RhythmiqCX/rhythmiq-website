import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import AISalesFunnelBuilderTool from "@/components/tools/ai-sales-funnel-builder/tool";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = generateMetadata({
  title: "Free AI Sales Funnel Builder | Rhythmiq",
  description:
    "Build complete, high-converting sales funnels in seconds using AI. Generate landing page copy, outreach emails, and more.",
});

export default function AISalesFunnelBuilderPage() {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
                AI Sales Funnel Builder
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Build complete, high-converting sales funnels in seconds using
                AI. Generate landing page copy, outreach emails, ad creatives,
                call scripts, and objection handling all tailored to your
                business perfectly.
              </p>
            </div>
          </div>

          <AISalesFunnelBuilderTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">AI-Optimized Messaging</h3>
              <p className="text-muted-foreground">
                Save hours of copywriting with proven frameworks like AIDA, PAS,
                and SPIN automatically applied to your funnel contents.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Industry-Specific Results
              </h3>
              <p className="text-muted-foreground">
                Maintain message consistency across touchpoints, with copy
                exactly tailored for your target audience and industry.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Ready-to-Use Sequences</h3>
              <p className="text-muted-foreground">
                Increase reply rates immediately by pasting our ready-made email
                sequences and objection handling scripts directly into your CRM.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

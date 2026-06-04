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

            <div className="flex flex-col gap-3 max-w-3xl">
              <span className="eyebrow">Free tool</span>
              <h1 className="h-section">AI Sales Funnel Builder</h1>
              <p className="lede max-w-2xl">
                Build complete, high-converting sales funnels in seconds using
                AI. Generate landing page copy, outreach emails, ad creatives,
                call scripts, and objection handling all tailored to your
                business perfectly.
              </p>
            </div>
          </div>

          <AISalesFunnelBuilderTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">AI-Optimized Messaging</h3>
              <p className="text-ink2">
                Save hours of copywriting with proven frameworks like AIDA, PAS,
                and SPIN automatically applied to your funnel contents.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">
                Industry-Specific Results
              </h3>
              <p className="text-ink2">
                Maintain message consistency across touchpoints, with copy
                exactly tailored for your target audience and industry.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Ready-to-Use Sequences</h3>
              <p className="text-ink2">
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

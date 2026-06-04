import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import B2BEmailGeneratorTool from "@/components/tools/b2b-lead-gen-email-generator/tool";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = generateMetadata({
  title: "Free B2B Cold Email Generator | High-Converting Templates",
  description:
    "Generate personalized, professional B2B outreach emails, LinkedIn messages, and follow-ups in seconds. Perfect for SDRs, founders, and agencies.",
});

export default function B2BEmailGeneratorPage() {
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
              <h1 className="h-section">B2B Cold Email Generator</h1>
              <p className="lede max-w-2xl">
                Stop staring at a blank screen. Generate high-converting cold
                outreach campaigns that get replies.
              </p>
            </div>
          </div>

          <B2BEmailGeneratorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Cold Outreach</h3>
              <p className="text-ink2">
                Craft compelling initial emails that hook your prospect and
                clearly state your value proposition.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Multi-Channel</h3>
              <p className="text-ink2">
                Get ready-to-use templates for Email, LinkedIn DMs, and quick
                elevator pitches.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Follow-Up Strategy</h3>
              <p className="text-ink2">
                Don&apos;t let leads go cold. Use our generated follow-up
                sequences to bump your thread to the top of their inbox.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

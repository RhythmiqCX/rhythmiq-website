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
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                B2B Cold Email Generator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stop staring at a blank screen. Generate high-converting cold
                outreach campaigns that get replies.
              </p>
            </div>
          </div>

          <B2BEmailGeneratorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Cold Outreach</h3>
              <p className="text-muted-foreground">
                Craft compelling initial emails that hook your prospect and
                clearly state your value proposition.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Multi-Channel</h3>
              <p className="text-muted-foreground">
                Get ready-to-use templates for Email, LinkedIn DMs, and quick
                elevator pitches.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Follow-Up Strategy</h3>
              <p className="text-muted-foreground">
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

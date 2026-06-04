import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import WebpageToFaqTool from "@/components/tools/webpage-to-faq/tool";
import { ChevronLeft, HelpCircle, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Webpage to FAQ Generator | AI-Powered Q&A Creator",
  description:
    "Instantly generate comprehensive FAQs from any webpage URL. Perfect for customer support, knowledge bases, and content repurposing. Free AI tool.",
  alternates: {
    canonical: "/tools/webpage-to-faq",
  },
});

const WebpageToFaqPage = () => {
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
                <Zap className="mr-2 h-4 w-4" />
                AI-Powered
              </div>
              <h1 className="h-section text-ink">
                Webpage to FAQ Generator
              </h1>
              <p className="lede">
                Turn any webpage content into a clear, structured FAQ section in
                seconds. Ideal for support docs, help centers, and quick
                summaries.
              </p>
            </div>
          </div>

          <WebpageToFaqTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Instant Answers</h3>
              <p className="text-ink2">
                Automatically extracts key information and formulates it into
                natural question-and-answer pairs.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Customizable Tone</h3>
              <p className="text-ink2">
                Choose the perfect voice for your audience, from professional
                corporate to casual and friendly.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">SEO Optimized</h3>
              <p className="text-ink2">
                Generate FAQs that target common user queries, improving your
                content&apos;s relevance and search engine visibility.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default WebpageToFaqPage;

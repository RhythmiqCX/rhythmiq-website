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
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
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
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm w-fit">
                <Zap className="mr-2 h-4 w-4" />
                AI-Powered
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Webpage to FAQ Generator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Turn any webpage content into a clear, structured FAQ section in
                seconds. Ideal for support docs, help centers, and quick
                summaries.
              </p>
            </div>
          </div>

          <WebpageToFaqTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Instant Answers</h3>
              <p className="text-muted-foreground">
                Automatically extracts key information and formulates it into
                natural question-and-answer pairs.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Customizable Tone</h3>
              <p className="text-muted-foreground">
                Choose the perfect voice for your audience, from professional
                corporate to casual and friendly.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">SEO Optimized</h3>
              <p className="text-muted-foreground">
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

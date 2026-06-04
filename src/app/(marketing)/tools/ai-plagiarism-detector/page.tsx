import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import AIPlagiarismDetectorTool from "@/components/tools/ai-plagiarism-detector/tool";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = generateMetadata({
  title:
    "Free AI Plagiarism Detector – Detect AI-Generated & Copied Content | Rhythmiq",
  description:
    "Instantly detect AI-generated content and plagiarism patterns. Get perplexity scores, burstiness analysis, sentence-level risk reports, and originality checking. Free, secure, no sign-up required.",
  alternates: {
    canonical: "/tools/ai-plagiarism-detector",
  },
});

export default function AIPlagiarismDetectorPage() {
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
                🧠 AI Detection Tool
              </div>
              <h1 className="h-section text-ink">
                AI Plagiarism Detector
              </h1>
              <p className="lede">
                Detect AI-generated content instantly using advanced statistical
                analysis. Check perplexity, burstiness, and stylometric patterns
                to determine if text was written by ChatGPT, Claude, Gemini, or
                other AI models. Free, secure, no sign-up required.
              </p>
            </div>
          </div>

          <AIPlagiarismDetectorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">AI Content Detection</h3>
              <p className="text-ink2">
                Analyze text for AI-generated patterns using perplexity scoring,
                burstiness analysis, and AI phrase detection across ChatGPT,
                GPT-4, Claude, and Gemini outputs.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Sentence-Level Analysis</h3>
              <p className="text-ink2">
                Each sentence is individually scored with AI probability,
                detection flags, and risk classification so you can pinpoint
                exactly which parts may be AI-generated.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Detailed Reports</h3>
              <p className="text-ink2">
                Get comprehensive originality reports with perplexity,
                burstiness, vocabulary richness scores, and sentence uniformity
                metrics. Download or copy instantly.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

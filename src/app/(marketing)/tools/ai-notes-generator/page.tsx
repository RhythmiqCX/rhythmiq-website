import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import AiNotesGeneratorTool from "@/components/tools/ai-notes-generator/tool";
import { ChevronLeft, NotebookPen, Brain, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "AI Notes Generator | Summarize Lectures & Meetings",
  description:
    "Convert raw text, transcripts, and lectures into clear, structured revision notes. Supports Cornell method, outlines, and meeting minutes.",
  alternates: {
    canonical: "/tools/ai-notes-generator",
  },
});

const AiNotesGeneratorPage = () => {
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
                <NotebookPen className="mr-2 h-4 w-4" />
                Revision Ready
              </div>
              <h1 className="h-section text-ink">
                AI Notes Generator
              </h1>
              <p className="lede">
                Transform messy transcripts, long articles, or rough ideas into
                structured, easy-to-read notes. Perfect for students,
                professionals, and anyone who needs clarity fast.
              </p>
            </div>
          </div>

          <AiNotesGeneratorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Active Recall</h3>
              <p className="text-ink2">
                Generate Cornell-style notes with cues and summaries designed
                specifically to help you remember and retain information better.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Instant Clarity</h3>
              <p className="text-ink2">
                Turn hours of reading or listening into minutes of reviewing.
                Cut through the noise and get straight to the key concepts.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <NotebookPen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Multiple Formats</h3>
              <p className="text-ink2">
                simplified &quot;ELI5&quot; explanations, we&apos;ve got a
                template for you.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default AiNotesGeneratorPage;

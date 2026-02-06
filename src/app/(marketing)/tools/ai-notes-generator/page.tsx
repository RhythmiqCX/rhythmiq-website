import React from "react";
import Container from "@/components/global/container";
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
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
                <NotebookPen className="mr-2 h-4 w-4" />
                Revision Ready
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                AI Notes Generator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Transform messy transcripts, long articles, or rough ideas into
                structured, easy-to-read notes. Perfect for students,
                professionals, and anyone who needs clarity fast.
              </p>
            </div>
          </div>

          <AiNotesGeneratorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Active Recall</h3>
              <p className="text-muted-foreground">
                Generate Cornell-style notes with cues and summaries designed
                specifically to help you remember and retain information better.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Instant Clarity</h3>
              <p className="text-muted-foreground">
                Turn hours of reading or listening into minutes of reviewing.
                Cut through the noise and get straight to the key concepts.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <NotebookPen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Multiple Formats</h3>
              <p className="text-muted-foreground">
                simplified &quot;ELI5&quot; explanations, we&apos;ve got a
                template for you.
              </p>
            </div>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default AiNotesGeneratorPage;

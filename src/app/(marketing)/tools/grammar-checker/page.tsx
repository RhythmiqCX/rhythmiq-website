import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import GrammarCheckerTool from "@/components/tools/grammar-checker/tool";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = generateMetadata({
  title:
    "Free Grammar Checker – Fix Grammar, Spelling & Punctuation | Rhythmiq",
  description:
    "Instantly check grammar, spelling, and punctuation errors with our free Grammar Checker. Get readability scores, writing analysis, and AI-powered suggestions. No sign-up required.",
  alternates: {
    canonical: "/tools/grammar-checker",
  },
});

export default function GrammarCheckerPage() {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
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
              <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-500 backdrop-blur-sm w-fit">
                ✨ Free Writing Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Free Grammar Checker
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Instantly check grammar, spelling, punctuation, and writing
                clarity. Get a comprehensive writing score, readability
                analysis, and one-click corrections. No sign-up required — 100%
                free to use.
              </p>
            </div>
          </div>

          <GrammarCheckerTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Fix Grammar Mistakes</h3>
              <p className="text-muted-foreground">
                Detect subject-verb agreement errors, tense inconsistencies,
                article misuse, and more. Get instant suggestions to fix every
                issue.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Readability &amp; Writing Score
              </h3>
              <p className="text-muted-foreground">
                Receive a comprehensive writing score with Flesch Reading Ease
                analysis, sentence stats, and clarity recommendations.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Spelling &amp; Punctuation
              </h3>
              <p className="text-muted-foreground">
                Catch common misspellings, confused words (their/there,
                your/you&apos;re), and punctuation issues with one-click
                corrections.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

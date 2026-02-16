import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import AIPromptGeneratorTool from "@/components/tools/ai-prompt-generator/tool";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = generateMetadata({
  title: "Free AI Prompt Generator | Optimize Your ChatGPT Prompts",
  description:
    "Create high-quality AI prompts using tested frameworks like CREATE, APE, and RACE. Generate explicit, powerful prompts for ChatGPT, Claude, and Midjourney to get better responses instantly.",
});

export default function AIPromptGeneratorPage() {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-violet-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
                AI Prompt Generator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stop guessing. Use proven prompt frameworks to unlock the full
                potential of AI models like ChatGPT, Claude, and Gemini.
              </p>
            </div>
          </div>

          <AIPromptGeneratorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Structured Frameworks</h3>
              <p className="text-muted-foreground">
                Choose from industry-standard frameworks like CREATE, APE, and
                RACE to structure your thoughts effectively.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Better Outputs</h3>
              <p className="text-muted-foreground">
                Clear inputs lead to precise outputs. Reduce hallucinations and
                imprecise generic answers.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Multi-Model Ready</h3>
              <p className="text-muted-foreground">
                Designed to work across all major LLMs including GPT-4, Claude
                3, and Gemini Pro.
              </p>
            </div>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

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
              <h1 className="h-section text-ink">
                AI Prompt Generator
              </h1>
              <p className="lede">
                Stop guessing. Use proven prompt frameworks to unlock the full
                potential of AI models like ChatGPT, Claude, and Gemini.
              </p>
            </div>
          </div>

          <AIPromptGeneratorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Structured Frameworks</h3>
              <p className="text-ink2">
                Choose from industry-standard frameworks like CREATE, APE, and
                RACE to structure your thoughts effectively.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Better Outputs</h3>
              <p className="text-ink2">
                Clear inputs lead to precise outputs. Reduce hallucinations and
                imprecise generic answers.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Multi-Model Ready</h3>
              <p className="text-ink2">
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

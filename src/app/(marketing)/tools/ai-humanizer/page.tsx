import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import AIHumanizerTool from "@/components/tools/ai-humanizer/tool";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = generateMetadata({
  title: "Free AI Humanizer – Make AI Text Sound Human | Rhythmiq",
  description:
    "Transform AI-generated text into natural, human-like writing instantly. Improve readability, reduce AI detection, and enhance tone with our free AI Humanizer. No sign-up required.",
  alternates: {
    canonical: "/tools/ai-humanizer",
  },
});

export default function AIHumanizerPage() {
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
                🤖➡️🧑 AI Writing Tool
              </div>
              <span className="eyebrow">Free Tool</span>
              <h1 className="h-section">AI Humanizer</h1>
              <p className="lede max-w-2xl">
                Transform robotic AI-generated text into smooth, natural, and
                engaging human-style writing. Choose your preferred tone, and
                our AI rewrites your content while preserving the original
                meaning. Free to use, no sign-up required.
              </p>
            </div>
          </div>

          <AIHumanizerTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">
                Natural Sentence Restructuring
              </h3>
              <p className="text-ink2">
                Breaks uniform AI patterns by varying sentence length, adding
                contractions, removing AI-typical phrases, and introducing
                natural human writing irregularities.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">
                Multiple Tone Options
              </h3>
              <p className="text-ink2">
                Choose from Conversational, Casual, Professional, Academic, or
                Creative tones. Each mode adjusts vocabulary, sentence flow, and
                writing style to match your needs.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">
                Meaning Preservation
              </h3>
              <p className="text-ink2">
                Your original facts, data, and core message stay intact. Only
                the writing style changes — making it sound authentic and
                natural without losing any information.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

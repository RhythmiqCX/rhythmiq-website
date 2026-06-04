import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import YouTubeQuotesGeneratorTool from "@/components/tools/youtube-description-quotes-generator/tool";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = generateMetadata({
  title: "Free YouTube Description Quotes Generator | Viral Hooks & Captions",
  description:
    "Generate engaging, powerful, and viral-ready quotes for your YouTube video descriptions in seconds. Perfect for creators, influencers, and vloggers to boost engagement.",
});

export default function YouTubeQuotesGeneratorPage() {
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
                YouTube Description Quotes Generator
              </h1>
              <p className="lede">
                Stop struggling with description hooks. Create viral, engaging
                quotes that keep your viewers watching and reading.
              </p>
            </div>
          </div>

          <YouTubeQuotesGeneratorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Viral Hooks</h3>
              <p className="text-ink2">
                Grab attention immediately with powerful opening lines designed
                to stop the scroll.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Engagement Boost</h3>
              <p className="text-ink2">
                Encourage likes, comments, and shares with emotionally resonant
                quotes and questions.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Multiple Styles</h3>
              <p className="text-ink2">
                Whether you need deep, funny, or motivational quotes, our AI
                adapts to your video&apos;s vibe.
              </p>
            </div>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

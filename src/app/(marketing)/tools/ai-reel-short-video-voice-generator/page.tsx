import { generateMetadata } from "@/utils";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import AiReelVoiceGeneratorTool from "@/components/tools/ai-reel-voice-generator/tool";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = generateMetadata({
  title: "AI Reel & Short Video Voice Generator - Rhythmiq",
  description:
    "Create viral-ready scripts and instant AI voiceovers for Instagram Reels, YouTube Shorts, and TikTok — in seconds.",
  alternates: {
    canonical: "/tools/ai-reel-short-video-voice-generator",
  },
});

export default function AiReelVoiceGeneratorPage() {
  return (
    <div className="relative w-full py-12 md:py-20 overflow-hidden">
      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-8 md:gap-12">
          <div className="w-full">
            <Button
              asChild
              variant="ghost"
              className="group -ml-4 hover:bg-transparent"
            >
              <Link
                href="/tools"
                className="flex items-center text-ink3 hover:text-ink transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Tools
              </Link>
            </Button>
          </div>

          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <span className="eyebrow">Reels & Shorts Voiceover</span>
            <h1 className="h-section text-ink">
              AI Reel & Short Video Voice Generator
            </h1>
            <p className="lede max-w-2xl">
              Create viral-ready scripts and instant AI voiceovers for Instagram
              Reels, YouTube Shorts, and TikTok — in seconds using natural voice
              narration.
            </p>
          </div>

          <Container delay={0.2} className="w-full">
            <AiReelVoiceGeneratorTool />
          </Container>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

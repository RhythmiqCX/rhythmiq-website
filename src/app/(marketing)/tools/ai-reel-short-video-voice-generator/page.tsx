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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/20 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Tools
              </Link>
            </Button>
          </div>

          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 leading-tight">
              AI Reel & Short Video Voice Generator
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
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

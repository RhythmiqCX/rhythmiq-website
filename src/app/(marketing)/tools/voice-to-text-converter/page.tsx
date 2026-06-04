import { generateMetadata } from "@/utils";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import VoiceToTextConverterTool from "@/components/tools/voice-to-text-converter/tool";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = generateMetadata({
  title: "Voice to Text Converter (Multi-Language) - Rhythmiq",
  description:
    "Convert your voice into accurate text instantly. Speak in any language and get automatic transcription with optional translation. Perfect for students, creators, and professionals.",
  alternates: {
    canonical: "/tools/voice-to-text-converter",
  },
});

export default function VoiceToTextConverterPage() {
  return (
    <div className="relative w-full py-12 md:py-20 overflow-hidden">
      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-8 md:gap-12">
          {/* Back Button */}
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
            <h1 className="h-section text-ink">
              Voice to Text Converter
            </h1>
            <p className="lede max-w-2xl">
              Convert your voice into accurate text instantly. Speak in any
              language and get automatic transcription with optional
              translation.
            </p>
          </div>

          <Container delay={0.2} className="w-full">
            <VoiceToTextConverterTool />
          </Container>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

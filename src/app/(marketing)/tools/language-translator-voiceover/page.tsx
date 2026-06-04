import { generateMetadata } from "@/utils";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import TranslatorVoiceoverTool from "@/components/tools/language-translator-voiceover/tool";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = generateMetadata({
  title: "AI Language Translator + Voiceover - Rhythmiq",
  description:
    "Automatically translate speech from one language into another and generate a natural AI voiceover instantly. Ideal for creators and businesses expanding reach.",
  alternates: {
    canonical: "/tools/language-translator-voiceover",
  },
});

export default function LanguageTranslatorVoiceoverPage() {
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
            <span className="eyebrow">AI Voiceover</span>
            <h1 className="h-section text-ink leading-tight">
              AI Language Translator + Voiceover
            </h1>
            <p className="lede max-w-2xl">
              Automatically translate speech from one language into another and
              generate a high-quality, natural AI voiceover in seconds.
            </p>
          </div>

          <Container delay={0.2} className="w-full">
            <TranslatorVoiceoverTool />
          </Container>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

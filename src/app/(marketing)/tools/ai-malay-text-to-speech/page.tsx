import { generateMetadata } from "@/utils";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import AiMalayTextToSpeechTool from "@/components/tools/ai-malay-text-to-speech/tool";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import JsonLd from "@/components/global/JsonLd";

export const metadata = generateMetadata({
  title: "Free AI Text to Speech Malay (Bahasa Malaysia) — RhythmiqCX",
  description:
    "Convert Bahasa Malaysia text to natural AI speech instantly. Free Malay TTS no sign-up required. Near-zero competition for Malay AI voice online.",
  keywords: [
    "AI text to speech Malay",
    "Bahasa Malaysia TTS",
    "free Malay AI voice generator",
    "Malay text to speech",
    "AI voice generator Malaysia",
    "Bahasa Malaysia AI voice",
  ],
  alternates: {
    canonical: "/tools/ai-malay-text-to-speech",
  },
});

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free AI Text to Speech — Bahasa Malaysia",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/tools/ai-malay-text-to-speech",
  description:
    "Free AI text-to-speech tool for Bahasa Malaysia (Malay). Generate natural AI voice from Malay text instantly. No sign-up required.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function AiMalayTextToSpeechPage() {
  return (
    <div className="relative w-full py-12 md:py-20 overflow-hidden">
      <JsonLd schema={toolSchema} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-yellow-500/20 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
              Free AI Text to Speech <br />
              <span className="text-yellow-400">Bahasa Malaysia</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Convert Bahasa Malaysia (Malay) text to natural-sounding AI voice
              in seconds. One of the most underserved languages in AI voice —
              almost no competition. No sign-up required.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ No sign-up</span>
              <span>✓ Instant generation</span>
              <span>✓ Download as .wav</span>
              <span>✓ 5 free generations/day</span>
            </div>
          </div>

          <Container delay={0.2} className="w-full">
            <AiMalayTextToSpeechTool />
          </Container>

          <div className="max-w-3xl mx-auto w-full space-y-6 text-muted-foreground text-sm leading-relaxed border-t border-border/50 pt-10">
            <h2 className="text-xl font-bold text-foreground">
              About This Malay AI Text to Speech Tool
            </h2>
            <p>
              This free Malay TTS tool converts Bahasa Malaysia text into
              natural AI speech. Bahasa Malaysia has over 33 million native
              speakers in Malaysia and millions more across Brunei and
              Singapore. Despite this, almost no AI voice platform offers
              high-quality Malay TTS making this one of the most underserved AI
              voice markets in Southeast Asia.
            </p>
            <h3 className="text-base font-semibold text-foreground">
              Use Cases
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>IVR greetings and automated phone responses in Malay</li>
              <li>WhatsApp voice messages for Malaysian businesses</li>
              <li>Customer service voice responses in Bahasa Malaysia</li>
              <li>E-learning audio content in Malay</li>
              <li>Accessibility features for Malaysian apps and websites</li>
            </ul>
            <p>
              Malaysian businesses looking for a full AI phone receptionist with
              WhatsApp integration can explore{" "}
              <Link
                href="/voice-ai/southeast-asia"
                className="text-primary hover:underline"
              >
                Voice AI for Southeast Asia
              </Link>
              .
            </p>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

import { generateMetadata } from "@/utils";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import AiIndianEnglishVoiceGeneratorTool from "@/components/tools/ai-indian-english-voice-generator/tool";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import JsonLd from "@/components/global/JsonLd";

export const metadata = generateMetadata({
  title: "Free Indian English AI Voice Generator — Powered by Sarvam Bulbul v2",
  description:
    "Free Indian English AI voice generator powered by Sarvam Bulbul v2 — the only neural TTS built for Indian-English accents. Natural prosody, multiple voices. No sign-up.",
  keywords: [
    "Indian English AI voice generator",
    "Sarvam AI voice",
    "Sarvam Bulbul v2",
    "Indian accent TTS",
    "free Indian voice generator",
    "Indian English text to speech",
    "AI voice generator India",
  ],
  alternates: {
    canonical: "/tools/ai-indian-english-voice-generator",
  },
});

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Indian English AI Voice Generator — Sarvam Bulbul v2",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/tools/ai-indian-english-voice-generator",
  description:
    "Free Indian English AI voice generator powered by Sarvam Bulbul v2. The only neural TTS built specifically for Indian-English accents. Multiple voices, instant generation.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function AiIndianEnglishVoiceGeneratorPage() {
  return (
    <div className="relative w-full py-12 md:py-20 overflow-hidden">
      <JsonLd schema={toolSchema} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orange-500/20 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-8 md:gap-12">
          <div className="w-full">
            <Button asChild variant="ghost" className="group -ml-4 hover:bg-transparent">
              <Link href="/tools" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Tools
              </Link>
            </Button>
          </div>

          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
              Powered by Sarvam Bulbul v2
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 leading-tight">
              Indian English <br />
              <span className="text-orange-400">AI Voice Generator</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              The only free AI voice generator built specifically for Indian-English.
              Powered by Sarvam Bulbul v2 — natural prosody, authentic accent, multiple voices.
              No sign-up, no credit card.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ Sarvam Bulbul v2 model</span>
              <span>✓ Native Indian-English accent</span>
              <span>✓ 5 voices to choose from</span>
              <span>✓ No sign-up required</span>
            </div>
          </div>

          <Container delay={0.2} className="w-full">
            <AiIndianEnglishVoiceGeneratorTool />
          </Container>

          <div className="max-w-3xl mx-auto w-full space-y-6 text-muted-foreground text-sm leading-relaxed border-t border-border/50 pt-10">
            <h2 className="text-xl font-bold text-foreground">Why Sarvam Bulbul v2 for Indian English?</h2>
            <p>
              Most AI voice tools — including ElevenLabs and Murf AI — are trained primarily on American or British English.
              The result is an awkward, unnatural sound when generating Indian-English content.
              Sarvam Bulbul v2 is the first neural TTS model built specifically for Indian-English phonetics,
              prosody, and intonation patterns. The difference is immediately audible.
            </p>
            <h3 className="text-base font-semibold text-foreground">Use Cases for Indian English AI Voice</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>IVR greetings and call-centre scripts for Indian businesses</li>
              <li>AI phone receptionist voice for Indian startups and SMBs</li>
              <li>Customer service voice responses in Indian English</li>
              <li>Explainer video narration for Indian audiences</li>
              <li>Accessibility features for Indian language apps</li>
            </ul>
            <p>
              For a full AI phone receptionist with Indian-English voice, WhatsApp support, and flat ₹2,400/month pricing,
              see <Link href="/voice-ai/india" className="text-primary hover:underline">Voice AI for India</Link>.
              Also explore our <Link href="/tools/ai-hindi-voice-generator" className="text-primary hover:underline">AI Hindi Voice Generator</Link> for Hindi-language TTS.
            </p>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

import { generateMetadata } from "@/utils";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import AiTagalogVoiceGeneratorTool from "@/components/tools/ai-tagalog-voice-generator/tool";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import JsonLd from "@/components/global/JsonLd";

export const metadata = generateMetadata({
  title: "Free AI Voice Generator for Tagalog (Filipino) — RhythmiqCX",
  description:
    "Convert Tagalog text to natural AI speech instantly. Free Filipino AI voice generator — no sign-up required. Over 100M Tagalog speakers globally.",
  keywords: [
    "AI voice for Tagalog",
    "Tagalog AI voice generator",
    "Filipino AI text to speech",
    "free Tagalog TTS",
    "Tagalog voice generator",
    "Filipino voice AI",
  ],
  alternates: {
    canonical: "/tools/ai-tagalog-voice-generator",
  },
});

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free AI Voice Generator for Tagalog",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/tools/ai-tagalog-voice-generator",
  description:
    "Free AI voice generator for Tagalog (Filipino). Convert Tagalog text to natural-sounding AI audio. No sign-up required.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function AiTagalogVoiceGeneratorPage() {
  return (
    <div className="relative w-full py-12 md:py-20 overflow-hidden">
      <JsonLd schema={toolSchema} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/20 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 leading-tight">
              Free AI Voice Generator <br />
              <span className="text-blue-400">for Tagalog</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Convert Tagalog (Filipino) text to natural AI speech in seconds.
              100M+ Tagalog speakers globally — finally a voice generator that works for Filipino.
              No sign-up required.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ No sign-up</span>
              <span>✓ Instant generation</span>
              <span>✓ Download as .wav</span>
              <span>✓ 5 free generations/day</span>
            </div>
          </div>

          <Container delay={0.2} className="w-full">
            <AiTagalogVoiceGeneratorTool />
          </Container>

          <div className="max-w-3xl mx-auto w-full space-y-6 text-muted-foreground text-sm leading-relaxed border-t border-border/50 pt-10">
            <h2 className="text-xl font-bold text-foreground">About This Tagalog AI Voice Generator</h2>
            <p>
              This free tool converts Tagalog and Filipino text into natural AI speech using advanced neural TTS technology.
              With over 100 million Tagalog speakers worldwide — the majority in the Philippines — Tagalog is one of Southeast Asia&apos;s most important languages.
              Yet most AI voice tools are trained on English and handle Tagalog poorly. RhythmiqCX supports Asian language markets from the ground up.
            </p>
            <h3 className="text-base font-semibold text-foreground">Popular Use Cases</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>IVR greetings and call centre scripts in Tagalog</li>
              <li>BPO voice automation for Philippine call centres</li>
              <li>Customer service responses for Filipino businesses</li>
              <li>Social media content narration in Filipino</li>
              <li>E-learning audio for Filipino language content</li>
            </ul>
            <p>
              Philippine businesses using AI for phone answering can explore our{" "}
              <Link href="/voice-ai/philippines" className="text-primary hover:underline">AI Receptionist for Philippines</Link> or the full{" "}
              <Link href="/voice-ai" className="text-primary hover:underline">RhythmiqCX Voice AI platform</Link>.
            </p>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

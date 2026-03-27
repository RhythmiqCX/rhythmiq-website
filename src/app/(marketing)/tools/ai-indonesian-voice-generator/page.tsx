import { generateMetadata } from "@/utils";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import AiIndonesianVoiceGeneratorTool from "@/components/tools/ai-indonesian-voice-generator/tool";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import JsonLd from "@/components/global/JsonLd";

export const metadata = generateMetadata({
  title: "Free AI Voice Generator for Bahasa Indonesia — RhythmiqCX",
  description:
    "Convert Bahasa Indonesia text to natural AI speech instantly. Free Indonesian AI voice generator — no sign-up required. Powered by advanced neural TTS.",
  keywords: [
    "Bahasa Indonesia AI voice generator",
    "AI text to speech Indonesia",
    "free Indonesian TTS",
    "Indonesian AI voice",
    "Bahasa Indonesia text to speech",
    "AI voice generator Indonesia",
  ],
  alternates: {
    canonical: "/tools/ai-indonesian-voice-generator",
  },
});

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free AI Voice Generator for Bahasa Indonesia",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: "https://rhythmiqcx.com/tools/ai-indonesian-voice-generator",
  description:
    "Free AI text-to-speech tool for Bahasa Indonesia. Convert Indonesian text to natural-sounding AI audio instantly. No sign-up required.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function AiIndonesianVoiceGeneratorPage() {
  return (
    <div className="relative w-full py-12 md:py-20 overflow-hidden">
      <JsonLd schema={toolSchema} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/20 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
              <span className="text-emerald-400">Bahasa Indonesia</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Convert Bahasa Indonesia text to natural-sounding AI speech instantly.
              270 million Indonesian speakers — finally a voice AI built for them.
              No sign-up required, completely free.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">✓ No sign-up</span>
              <span className="flex items-center gap-1">✓ Instant generation</span>
              <span className="flex items-center gap-1">✓ Download as .wav</span>
              <span className="flex items-center gap-1">✓ 5 free generations/day</span>
            </div>
          </div>

          <Container delay={0.2} className="w-full">
            <AiIndonesianVoiceGeneratorTool />
          </Container>

          {/* SEO content block */}
          <div className="max-w-3xl mx-auto w-full space-y-6 text-muted-foreground text-sm leading-relaxed border-t border-border/50 pt-10">
            <h2 className="text-xl font-bold text-foreground">About This Bahasa Indonesia AI Voice Generator</h2>
            <p>
              This free tool converts Bahasa Indonesia text into natural-sounding AI speech using advanced neural text-to-speech technology.
              With 270 million speakers across Indonesia, Bahasa Indonesia is one of the most spoken languages in the world — yet most AI voice tools handle it poorly.
              RhythmiqCX is built for Asian language markets from the ground up.
            </p>
            <h3 className="text-base font-semibold text-foreground">Use Cases for Indonesian AI Voice</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>IVR and call centre greetings in Bahasa Indonesia</li>
              <li>E-commerce product narration for Indonesian shoppers</li>
              <li>Customer service voice responses for Indonesian businesses</li>
              <li>Social media content and video narration in Bahasa</li>
              <li>Accessibility features for Indonesian-language apps</li>
            </ul>
            <p>
              For businesses needing a full AI phone receptionist in Indonesia (handling inbound calls, WhatsApp messages, and web chat),
              see <Link href="/voice-ai/southeast-asia" className="text-primary hover:underline">Voice AI for Southeast Asia</Link> or{" "}
              <Link href="/voice-ai" className="text-primary hover:underline">explore RhythmiqCX Voice AI</Link>.
            </p>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

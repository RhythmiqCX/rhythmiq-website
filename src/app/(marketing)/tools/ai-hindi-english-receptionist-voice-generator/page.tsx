import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import AIReceptionistVoiceGeneratorTool from "@/components/tools/ai-hindi-english-receptionist-voice-generator/tool";
import { ChevronLeft, Headphones, Search, Play, Globe2 } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata = generateMetadata({
  title: "AI Hindi & English Receptionist Voice Generator | Free Tool",
  description:
    "Generate natural-sounding AI receptionist voices in Hindi and English instantly using advanced text-to-speech. Perfect for IVR and call centers.",
  alternates: {
    canonical: "/tools/ai-hindi-english-receptionist-voice-generator",
  },
});

export default function AIHindiEnglishReceptionistVoiceGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Hindi / English Receptionist Voice Generator",
    description:
      "Generate natural-sounding AI receptionist voices in Hindi and English instantly using advanced text-to-speech technology. Perfect for IVR prompts and call center voice scripts.",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    operatingSystem: "Any",
    browserRequirements: "Requires Web browser",
  };

  return (
    <div className="relative w-full py-20 overflow-hidden">
      <Script
        id="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
          {/* Header Section */}
          <div className="flex flex-col items-start gap-6">
            <Link
              href="/tools"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </Link>

            <div className="flex flex-col gap-4 max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm w-fit">
                ✨ Free AI Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                AI Hindi / English Receptionist Voice Generator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Generate natural-sounding AI receptionist voices in Hindi and
                English instantly. Perfect for AI phone receptionist greetings,
                IVR prompts, and call center voice scripts without hiring voice
                artists or booking recording studios.
              </p>
            </div>
          </div>

          {/* Interactive Tool Component */}
          <AIReceptionistVoiceGeneratorTool />

          {/* Marketing Content */}
          <div className="grid md:grid-cols-2 gap-12 pt-16 border-t border-border/40">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Headphones className="w-6 h-6 text-indigo-500" />
                  Why We Built This Tool
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  When businesses set up phone systems, they usually need things
                  like welcome greetings, IVR menus, hold messages, appointment
                  confirmations, and support instructions.
                </p>
                <p className="text-muted-foreground leading-relaxed font-medium mt-4">
                  Traditionally this means:
                </p>
                <ul className="space-y-2 mt-2 ml-4 mb-4 text-muted-foreground list-disc marker:text-primary">
                  <li>Hiring a voice artist</li>
                  <li>Recording audio</li>
                  <li>Editing files</li>
                  <li>Updating them every time something changes</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed font-semibold italic text-red-400">
                  That’s slow.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Search className="w-6 h-6 text-blue-500" />
                  Perfect For
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Startups",
                    "Call Centers",
                    "Clinics",
                    "E-commerce Businesses",
                    "Customer Support Teams",
                    "Virtual Reception Systems",
                    "AI Phone Systems",
                    "Automated Phone Menus",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/20 border border-border/50 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-2xl border border-border bg-gradient-to-br from-indigo-500/5 to-primary/5 shadow-inner">
                <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-emerald-500" />
                  Instant Audio Generation
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  So we built an AI Receptionist Voice Generator that instantly
                  converts text into professional receptionist voice audio.
                  Simply enter your text and the tool converts it into
                  high-quality AI voice audio.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "No microphone needed",
                    "No recording studio required",
                    "No editing software",
                  ].map((pro) => (
                    <li
                      key={pro}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-red-500 text-xs font-bold">
                        ✕
                      </span>
                      {pro}
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 pt-4 border-t border-border/50">
                  <h4 className="font-medium flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-indigo-400" /> Example
                    Output
                  </h4>
                  <div className="bg-background/80 p-4 rounded-lg border border-border/50 text-sm italic text-muted-foreground shadow-sm">
                    &quot;Namaste! Aapka swagat hai RhythmiqCX mein. Kripya
                    sales ke liye 1 dabayein.&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

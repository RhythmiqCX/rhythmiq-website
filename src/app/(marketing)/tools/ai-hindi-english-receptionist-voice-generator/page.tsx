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

      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
          {/* Header Section */}
          <div className="flex flex-col items-start gap-6">
            <Link
              href="/tools"
              className="flex items-center gap-2 text-sm text-ink3 hover:text-ink transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </Link>

            <div className="flex flex-col gap-4 max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-coral/20 bg-coralSoft px-3 py-1 text-sm font-medium text-coral w-fit">
                ✨ Free AI Tool
              </div>
              <span className="eyebrow">Free Tool</span>
              <h1 className="h-section">
                AI Hindi / English Receptionist Voice Generator
              </h1>
              <p className="lede max-w-2xl">
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
          <div className="grid md:grid-cols-2 gap-12 pt-16 border-t border-ink/10">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ink flex items-center gap-2">
                  <Headphones className="w-6 h-6 text-coral" />
                  Why We Built This Tool
                </h2>
                <p className="text-ink2 leading-relaxed">
                  When businesses set up phone systems, they usually need things
                  like welcome greetings, IVR menus, hold messages, appointment
                  confirmations, and support instructions.
                </p>
                <p className="text-ink2 leading-relaxed font-medium mt-4">
                  Traditionally this means:
                </p>
                <ul className="space-y-2 mt-2 ml-4 mb-4 text-ink2 list-disc marker:text-coral">
                  <li>Hiring a voice artist</li>
                  <li>Recording audio</li>
                  <li>Editing files</li>
                  <li>Updating them every time something changes</li>
                </ul>
                <p className="text-ink2 leading-relaxed font-semibold italic text-[#C9461F]">
                  That’s slow.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ink flex items-center gap-2">
                  <Search className="w-6 h-6 text-coral" />
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
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-ink/10 text-sm text-ink2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-coral" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-2xl border border-ink/10 bg-white">
                <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-ink">
                  <Play className="w-5 h-5 text-[#1F7A4D]" />
                  Instant Audio Generation
                </h3>
                <p className="text-ink2 leading-relaxed mb-6">
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
                      className="flex items-center gap-2 text-sm font-medium text-ink"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F6DCD2] text-[#C9461F] text-xs font-bold">
                        ✕
                      </span>
                      {pro}
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 pt-4 border-t border-ink/10">
                  <h4 className="font-medium flex items-center gap-2 text-ink">
                    <Globe2 className="w-4 h-4 text-coral" /> Example
                    Output
                  </h4>
                  <div className="bg-paper p-4 rounded-lg border border-ink/10 text-sm italic text-ink2">
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

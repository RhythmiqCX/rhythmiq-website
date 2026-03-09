import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import AIVoiceAgentScriptGeneratorTool from "@/components/tools/ai-voice-agent-script-generator/tool";
import {
  ChevronLeft,
  Zap,
  Headphones,
  PhoneCall,
  Users,
  Mic,
  BarChart3,
  Clock,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title:
    "Free AI Voice Agent Script Generator | Create Voice Assistant Scripts Instantly",
  description:
    "Generate professional AI voice assistant scripts instantly. Create ready-to-use scripts for AI receptionists, voice bots, and automated call systems. Free to use.",
  alternates: {
    canonical: "/tools/ai-voice-agent-script-generator",
  },
});

const AIVoiceAgentScriptGeneratorPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-6">
            <Link
              href="/tools"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </Link>

            <div className="flex flex-col gap-4 max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-500 backdrop-blur-sm w-fit">
                ✨ Free AI Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                AI Voice Agent Script Generator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Create professional, ready-to-use scripts for AI voice
                assistants, AI receptionists, and automated call center systems.
                Simply enter your business type and customer scenario to
                generate natural, structured voice interaction scripts.
              </p>
            </div>
          </div>

          <AIVoiceAgentScriptGeneratorTool />

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-border/40">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  What This Tool Does
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The AI Voice Agent Script Generator creates structured,
                  natural-sounding scripts for AI voice systems. Each script
                  includes a greeting, intent recognition, information response,
                  call routing, and closing — designed to sound professional
                  when spoken by text-to-speech systems.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Scripts are tailored to your specific industry and customer
                  scenario, ensuring relevant terminology, appropriate tone, and
                  actionable next steps that feel natural in a phone
                  conversation.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Clock className="w-6 h-6 text-green-500" />
                  How It Works
                </h2>
                <ul className="space-y-3 text-muted-foreground list-decimal list-inside">
                  <li>Select your business type or industry</li>
                  <li>Enter your business name (optional)</li>
                  <li>Describe the customer query or scenario</li>
                  <li>Choose the language and conversation tone</li>
                  <li>
                    Click <strong>Generate Script</strong>
                  </li>
                  <li>Copy the script to your AI voice platform</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Headphones className="w-6 h-6 text-blue-500" />
                  Perfect For
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "AI Receptionists",
                    "Call Center Automation",
                    "Voice Chatbots",
                    "Lead Qualification Bots",
                    "Appointment Scheduling",
                    "FAQ Handling Systems",
                    "Customer Support Bots",
                    "IVR Script Design",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card/50 text-sm"
                    >
                      <PhoneCall className="w-4 h-4 text-primary/50" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-violet-500" />
                  Why Use AI Voice Scripts?
                </h2>
                <div className="grid gap-3">
                  {[
                    {
                      icon: <Mic className="w-4 h-4 text-teal-500" />,
                      text: "Faster customer support responses",
                    },
                    {
                      icon: <BarChart3 className="w-4 h-4 text-emerald-500" />,
                      text: "Reduced operational costs",
                    },
                    {
                      icon: <Clock className="w-4 h-4 text-blue-500" />,
                      text: "24/7 automated customer assistance",
                    },
                    {
                      icon: <Users className="w-4 h-4 text-violet-500" />,
                      text: "Consistent, professional communication",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card/50 text-sm"
                    >
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-muted/20">
                <h3 className="font-semibold mb-2">Did you know?</h3>
                <p className="text-sm text-muted-foreground">
                  Businesses using AI voice agents can handle up to 80% of
                  routine customer inquiries without human intervention,
                  reducing wait times and improving customer satisfaction scores
                  by over 30%.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="pt-12 border-t border-border/40">
            <h2 className="text-2xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "What is an AI voice agent?",
                  a: "An AI voice agent is an automated system that interacts with customers using speech technology and artificial intelligence, handling calls, answering questions, and routing inquiries.",
                },
                {
                  q: "Can I use these scripts for call center automation?",
                  a: "Yes, the generated scripts are designed to work with AI-powered call centers, virtual receptionists, and voice assistant platforms.",
                },
                {
                  q: "Are the scripts customizable?",
                  a: "Absolutely. You can modify and adjust the generated scripts to match your specific business needs, brand voice, and customer service standards.",
                },
                {
                  q: "Is this tool free?",
                  a: "Yes, the AI Voice Agent Script Generator is completely free to use with a generous daily usage limit.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border bg-card/50 space-y-2"
                >
                  <h3 className="font-semibold text-sm">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default AIVoiceAgentScriptGeneratorPage;

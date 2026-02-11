import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import EmailResponseGeneratorTool from "@/components/tools/ai-email-response-generator/tool";
import {
  ChevronLeft,
  Zap,
  Briefcase,
  MessageSquare,
  Clock,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "AI Email Response Generator | Professional Replies in Seconds",
  description:
    "Generate professional, personalized, and context-aware email replies instantly. Perfect for business, job applications, and formal communication. Free to use.",
  alternates: {
    canonical: "/tools/ai-email-response-generator",
  },
});

const EmailResponseGeneratorPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500 backdrop-blur-sm w-fit">
                ✨ Free AI Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                AI Email Response Generator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Streamline your communication with professional, personalized,
                and context-aware email replies generated instantly.
              </p>
            </div>
          </div>

          <EmailResponseGeneratorTool />

          {/* Features / Explanation Section */}
          <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-border/40">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  What This Tool Does
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The AI Email Response Generator helps you craft polished email
                  replies by understanding the received email, subject, intent,
                  and communication tone. It generates responses that are
                  professional, clear, contextually accurate, and ready to send.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Clock className="w-6 h-6 text-green-500" />
                  How It Works
                </h2>
                <ul className="space-y-3 text-muted-foreground list-decimal list-inside">
                  <li>Paste the received email content</li>
                  <li>Enter the subject and your response goal</li>
                  <li>Provide sender and recipient names</li>
                  <li>Choose the desired language and tone</li>
                  <li>
                    Click <strong>Generate Response</strong>
                  </li>
                  <li>Copy and send your perfect email</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                  Perfect For
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Interview invitations",
                    "Job-related emails",
                    "Business communication",
                    "Meeting confirmations",
                    "Customer support replies",
                    "Formal announcements",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card/50 text-sm"
                    >
                      <MessageSquare className="w-4 h-4 text-primary/50" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-muted/20">
                <h3 className="font-semibold mb-2">Did you know?</h3>
                <p className="text-sm text-muted-foreground">
                  Spending just 2 minutes less on an email can save you hours
                  per week. Let AI handle the drafting while you focus on the
                  decision making.
                </p>
              </div>
            </div>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default EmailResponseGeneratorPage;

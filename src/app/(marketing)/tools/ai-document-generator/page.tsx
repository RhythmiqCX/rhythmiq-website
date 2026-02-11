import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import AiDocumentGeneratorTool from "@/components/tools/ai-document-generator/tool";
import { ChevronLeft, FileText, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "AI Document Generator | Standard Operating Procedures & Proposals",
  description:
    "Generate structured, professional business documents instantly. Create SOPs, Business Proposals, Legal Notices, and HR Policies with AI precision and strict template control.",
  alternates: {
    canonical: "/tools/ai-document-generator",
  },
});

const AiDocumentGeneratorPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm w-fit">
                <FileText className="mr-2 h-4 w-4" />
                No Hallucinations
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                AI Document Generator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Create structured, professional documents in seconds. Select a
                template, fill in the details, and let AI handle the formatting
                and language expansion while adhering to strict business
                standards.
              </p>
            </div>
          </div>

          <AiDocumentGeneratorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Reliable & Structured</h3>
              <p className="text-muted-foreground">
                Unlike free-form chat AI, this tool strictly follows
                professional templates for SOPs, Proposals, and Legal drafts to
                ensure consistency.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Privacy Focused</h3>
              <p className="text-muted-foreground">
                Your inputs are processed securely and not used to train public
                models. Perfect for sensitive business operations and HR
                documentation.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Ready to Use</h3>
              <p className="text-muted-foreground">
                Download your generated documents or copy them directly into
                your favorite editor. Formatted and ready for distribution.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default AiDocumentGeneratorPage;

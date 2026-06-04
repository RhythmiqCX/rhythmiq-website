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
      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
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
                <FileText className="mr-2 h-4 w-4" />
                No Hallucinations
              </div>
              <span className="eyebrow">Free Tool</span>
              <h1 className="h-section">AI Document Generator</h1>
              <p className="lede max-w-2xl">
                Create structured, professional documents in seconds. Select a
                template, fill in the details, and let AI handle the formatting
                and language expansion while adhering to strict business
                standards.
              </p>
            </div>
          </div>

          <AiDocumentGeneratorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">
                Reliable & Structured
              </h3>
              <p className="text-ink2">
                Unlike free-form chat AI, this tool strictly follows
                professional templates for SOPs, Proposals, and Legal drafts to
                ensure consistency.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Privacy Focused</h3>
              <p className="text-ink2">
                Your inputs are processed securely and not used to train public
                models. Perfect for sensitive business operations and HR
                documentation.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Ready to Use</h3>
              <p className="text-ink2">
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

import React from "react";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import { generateMetadata } from "@/utils";
import EmailSignatureTool from "@/components/tools/email-signature-generator/tool";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = generateMetadata({
  title: "Free Email Signature Generator | Professional Templates",
  description:
    "Create a professional email signature in minutes. Choose from minimal, corporate, and creative templates. Works with Gmail, Outlook, and Apple Mail.",
  alternates: {
    canonical: "/tools/email-signature-generator",
  },
});

const EmailSignatureGeneratorPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
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
              <span className="eyebrow">Free Tool</span>
              <h1 className="h-section">Email Signature Generator</h1>
              <p className="lede max-w-2xl">
                Create a professional, branded email signature in minutes.
                Customize your name, company, social links, and layout then copy
                & paste into Gmail, Outlook, or Apple Mail.
              </p>
            </div>
          </div>

          {/* Main Tool */}
          <EmailSignatureTool />

          {/* Features / SEO Content */}
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10 mt-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Live Preview</h3>
              <p className="text-ink2">
                See your signature update in real-time as you type. Choose from
                multiple professional layouts to match your brand.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Works Everywhere</h3>
              <p className="text-ink2">
                Compatible with all major email clients including Gmail,
                Outlook, Apple Mail, Yahoo, and Thunderbird.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">100% Free</h3>
              <p className="text-ink2">
                No sign-up required. No watermarks. Just create, copy, and paste
                your professional signature instantly.
              </p>
            </div>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default EmailSignatureGeneratorPage;

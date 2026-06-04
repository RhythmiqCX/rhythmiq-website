import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import FaviconGeneratorTool from "@/components/tools/favicon-generator/tool";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Free Favicon Generator Tool | Create ICO & PNG Favicons",
  description:
    "Generate website favicons in seconds. Convert images or text to .ico, .png, and apple-touch-icon formats. Download all sizes in a single ZIP file.",
  alternates: {
    canonical: "/tools/favicon-generator",
  },
});

const FaviconGeneratorPage = () => {
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
              <span className="eyebrow">Free Tool</span>
              <h1 className="h-section">Favicon Generator</h1>
              <p className="lede max-w-2xl">
                Generate favicons in all sizes instantly from text or images.
                Everything happens in your browser—no uploads, no quality loss.
                Perfect for modern web apps.
              </p>
            </div>
          </div>

          <FaviconGeneratorTool />
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default FaviconGeneratorPage;

import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import MetaTagGeneratorTool from "@/components/tools/meta-tag-generator/tool";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Free Meta Tag Generator Tool | SEO & Social Media Tags",
  description:
    "Generate SEO-friendly meta tags, Open Graph tags for Facebook/LinkedIn, and Twitter Cards instantly. Improve your website's visibility and social sharing appearance.",
  alternates: {
    canonical: "/tools/meta-tag-generator",
  },
});

const MetaTagGeneratorPage = () => {
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
              <span className="eyebrow">SEO Tool</span>
              <h1 className="h-section mt-3 text-ink">
                Meta Tag Generator
              </h1>
              <p className="lede mt-3 max-w-2xl">
                Create perfect SEO meta tags, Open Graph tags, and Twitter Cards
                for your website. Boost your search rankings and make your links
                look great on social media.
              </p>
            </div>
          </div>

          <MetaTagGeneratorTool />
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default MetaTagGeneratorPage;

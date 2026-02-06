import React from "react";
import Container from "@/components/global/container";
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
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
              <h1 className="text-4xl md:text-4xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Meta Tag Generator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Create perfect SEO meta tags, Open Graph tags, and Twitter Cards
                for your website. Boost your search rankings and make your links
                look great on social media.
              </p>
            </div>
          </div>

          <MetaTagGeneratorTool />
        </Container>
      </Wrapper>
    </div>
  );
};

export default MetaTagGeneratorPage;

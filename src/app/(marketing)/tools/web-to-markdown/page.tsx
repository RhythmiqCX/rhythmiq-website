import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import WebToMarkdownTool from "@/components/tools/web-to-markdown/tool";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Convert Webpage to Markdown | Free Online Tool",
  description:
    "Convert any webpage into clean, readable Markdown instantly. Perfect for documentation, content migration, AI workflows, and content archiving. Free to use.",
  alternates: {
    canonical: "/tools/web-to-markdown",
  },
});

const WebToMarkdownPage = () => {
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
              <h1 className="h-section text-ink">
                Convert Webpage to Markdown
              </h1>
              <p className="lede">
                Convert any webpage into clean, readable Markdown instantly.
                Perfect for documentation, content migration, AI workflows, and
                content archiving.
              </p>
            </div>
          </div>

          <WebToMarkdownTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Fast & Clean</h3>
              <p className="text-ink2">
                Instantly fetches HTML and converts it to clean Markdown,
                removing unnecessary clutter like ads and navigation.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">AI & LLM Ready</h3>
              <p className="text-ink2">
                Perfect for feeding web content into LLMs, creating training
                data, or archiving knowledge bases in a readable format.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Privacy Focused</h3>
              <p className="text-ink2">
                Conversion logic runs client-side after fetching. We do not
                store any URLs or content you convert.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default WebToMarkdownPage;

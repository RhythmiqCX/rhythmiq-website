import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import ContentRepurposerTool from "@/components/tools/content-repurposer/tool";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Free Content Repurposer Tool | YouTube to LinkedIn, Twitter & Blog",
  description:
    "Turn your YouTube videos or blog posts into LinkedIn posts, Twitter threads, and Newsletters instantly with AI content repurposing.",
  alternates: {
    canonical: "/tools/content-repurposer",
  },
});

const ContentRepurposerPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
              <div className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-500 backdrop-blur-sm w-fit">
                ✨ AI Power Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Content Repurposer
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stop creating from scratch. Turn one piece of content into a
                weeks worth of social posts. Instantly generate LinkedIn posts,
                Twitter threads, and Newsletters in your brand voice.
              </p>
            </div>
          </div>

          <ContentRepurposerTool />
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default ContentRepurposerPage;

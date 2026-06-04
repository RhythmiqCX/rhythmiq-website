import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import NotionToMarkdownTool from "@/components/tools/notion-to-markdown/tool";
import {
  ChevronLeft,
  BookOpen,
  Repeat,
  Database,
  FileOutput,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Convert Notion to Markdown | Free Online Tool",
  description:
    "Convert any public Notion page into clean, readable Markdown instantly. Perfect for documentation, content migration, and archiving.",
  alternates: {
    canonical: "/tools/notion-to-markdown",
  },
});

const NotionToMarkdownPage = () => {
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
                <BookOpen className="mr-2 h-4 w-4" />
                Documentation Export
              </div>
              <h1 className="h-section text-ink">
                Convert Notion to Markdown
              </h1>
              <p className="lede max-w-2xl">
                Convert any <strong>public Notion page</strong> into clean,
                readable Markdown instantly. Perfect for documentation, content
                migration, knowledge bases, and archiving.
              </p>
            </div>
          </div>

          <NotionToMarkdownTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Repeat className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Content Migration</h3>
              <p className="text-ink2">
                Easily move your Notion content to GitHub, Obsidian, VS Code, or
                any other Markdown-supported platform.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Knowledge Backup</h3>
              <p className="text-ink2">
                Archive your Notion knowledge base into portable, future-proof
                Markdown files.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <FileOutput className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">AI & LLM Training</h3>
              <p className="text-ink2">
                Clean data export for feeding Notion content into LLMs or vector
                databases for RAG applications.
              </p>
            </div>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default NotionToMarkdownPage;

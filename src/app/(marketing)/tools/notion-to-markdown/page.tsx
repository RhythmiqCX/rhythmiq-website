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
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-slate-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gray-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
                <BookOpen className="mr-2 h-4 w-4" />
                Documentation Export
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Convert Notion to Markdown
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Convert any <strong>public Notion page</strong> into clean,
                readable Markdown instantly. Perfect for documentation, content
                migration, knowledge bases, and archiving.
              </p>
            </div>
          </div>

          <NotionToMarkdownTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Repeat className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Content Migration</h3>
              <p className="text-muted-foreground">
                Easily move your Notion content to GitHub, Obsidian, VS Code, or
                any other Markdown-supported platform.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Knowledge Backup</h3>
              <p className="text-muted-foreground">
                Archive your Notion knowledge base into portable, future-proof
                Markdown files.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <FileOutput className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">AI & LLM Training</h3>
              <p className="text-muted-foreground">
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

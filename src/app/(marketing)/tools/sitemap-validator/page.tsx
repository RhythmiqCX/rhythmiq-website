import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import SitemapValidatorTool from "@/components/tools/sitemap-validator/tool";
import {
  ChevronLeft,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Search,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Sitemap Validator | Free XML Sitemap Checker & SEO Tool",
  description:
    "Instantly validate your XML sitemap for errors, broken URLs, and formatting issues. Ensure better SEO indexing with our free validator tool.",
  alternates: {
    canonical: "/tools/sitemap-validator",
  },
});

const SitemapValidatorPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
          {/* Header */}
          {/* Header */}
          <Link
            href="/tools"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors self-start"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Tools
          </Link>

          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <FileCode className="mr-2 h-4 w-4" />
              SEO Utility
            </div>

            <h1 className="text-4xl md:text-6xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 leading-tight">
              Sitemap Validator
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Validate your XML sitemap instantly to ensure it follows proper
              search engine guidelines. Check for errors, broken URLs, and
              formatting issues.
            </p>
          </div>

          {/* Tool Component */}
          <div className="max-w-4xl mx-auto w-full">
            <SitemapValidatorTool />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4 p-6 bg-card/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Instant Validation</h3>
              <p className="text-muted-foreground">
                Get immediate feedback on your XML structure, required tags, and
                URL limits.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-card/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">SEO Optimized</h3>
              <p className="text-muted-foreground">
                Ensure search engines like Google and Bing can crawl your site
                efficiently.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-card/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Error Detection</h3>
              <p className="text-muted-foreground">
                Identify missing tags, incorrect date formats, and broken links
                before they affect your ranking.
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-2 gap-12 pt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">📋 What We Check</h2>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li>XML structure validity & proper nesting</li>
                <li>
                  Presence of required <code>&lt;loc&gt;</code> tags
                </li>
                <li>
                  Correct date format in <code>&lt;lastmod&gt;</code>
                </li>
                <li>Valid URL format and encoding</li>
                <li>Sitemap size limits (50,000 URLs / 50MB)</li>
                <li>
                  Valid <code>&lt;urlset&gt;</code> namespace
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">💡 Common Errors</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/20 border border-border">
                  <h4 className="font-semibold text-sm mb-1 text-foreground">
                    Missing Tags
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Forgetting the{" "}
                    <code className="bg-muted px-1 rounded">&lt;loc&gt;</code>{" "}
                    tag or having empty URL entries.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/20 border border-border">
                  <h4 className="font-semibold text-sm mb-1 text-foreground">
                    Invalid Dates
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Using incorrect date formats. W3C Datetime format
                    (YYYY-MM-DD) is required.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/20 border border-border">
                  <h4 className="font-semibold text-sm mb-1 text-foreground">
                    Namespace Errors
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Incorrect or missing <code>xmlns</code> attribute in the
                    root element.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-border/40">
            <h2 className="text-2xl font-bold">📈 Why Validation Matters</h2>
            <p className="text-muted-foreground max-w-4xl">
              A clean sitemap is the roadmap for search engine bots. Validating
              your sitemap ensures that Googlebot and Bingbot can discover and
              index your pages without issues. Broken sitemaps can lead to poor
              crawl efficiency and delayed indexing of new content.
            </p>
          </div>

          <div className="text-center py-8 text-sm text-muted-foreground border-t border-border/40 mt-8">
            © 2026 Sitemap Validator Tool
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default SitemapValidatorPage;

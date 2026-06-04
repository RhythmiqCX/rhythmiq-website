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
      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
          {/* Header */}
          <Link
            href="/tools"
            className="flex items-center gap-2 text-sm text-ink3 hover:text-ink transition-colors self-start"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Tools
          </Link>

          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-coral/20 bg-coralSoft px-3 py-1 text-sm font-medium text-coral">
              <FileCode className="mr-2 h-4 w-4" />
              SEO Utility
            </div>

            <h1 className="h-section text-ink">
              Sitemap Validator
            </h1>
            <p className="lede max-w-2xl">
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
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4 p-6 bg-white rounded-xl border border-ink/10">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Instant Validation</h3>
              <p className="text-ink2">
                Get immediate feedback on your XML structure, required tags, and
                URL limits.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-white rounded-xl border border-ink/10">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">SEO Optimized</h3>
              <p className="text-ink2">
                Ensure search engines like Google and Bing can crawl your site
                efficiently.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-white rounded-xl border border-ink/10">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Error Detection</h3>
              <p className="text-ink2">
                Identify missing tags, incorrect date formats, and broken links
                before they affect your ranking.
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-2 gap-12 pt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">📋 What We Check</h2>
              <ul className="list-disc list-inside space-y-3 text-ink2">
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
              <h2 className="text-2xl font-bold text-ink">💡 Common Errors</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white border border-ink/10">
                  <h4 className="font-semibold text-sm mb-1 text-ink">
                    Missing Tags
                  </h4>
                  <p className="text-sm text-ink2">
                    Forgetting the{" "}
                    <code className="bg-paper2 px-1 rounded">&lt;loc&gt;</code>{" "}
                    tag or having empty URL entries.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-ink/10">
                  <h4 className="font-semibold text-sm mb-1 text-ink">
                    Invalid Dates
                  </h4>
                  <p className="text-sm text-ink2">
                    Using incorrect date formats. W3C Datetime format
                    (YYYY-MM-DD) is required.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-ink/10">
                  <h4 className="font-semibold text-sm mb-1 text-ink">
                    Namespace Errors
                  </h4>
                  <p className="text-sm text-ink2">
                    Incorrect or missing <code>xmlns</code> attribute in the
                    root element.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-ink/10">
            <h2 className="text-2xl font-bold text-ink">📈 Why Validation Matters</h2>
            <p className="text-ink2 max-w-4xl">
              A clean sitemap is the roadmap for search engine bots. Validating
              your sitemap ensures that Googlebot and Bingbot can discover and
              index your pages without issues. Broken sitemaps can lead to poor
              crawl efficiency and delayed indexing of new content.
            </p>
          </div>

          <div className="text-center py-8 text-sm text-ink3 border-t border-ink/10 mt-8">
            © 2026 Sitemap Validator Tool
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default SitemapValidatorPage;

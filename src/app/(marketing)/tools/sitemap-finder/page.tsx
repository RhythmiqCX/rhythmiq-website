import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import SitemapFinderTool from "@/components/tools/sitemap-finder/tool";
import { ChevronLeft, FileCode, AlertTriangle, Search } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Sitemap Finder & Checker | Discover Website Sitemaps Instantly",
  description:
    "Find and validate all sitemaps on any website instantly. Discover hidden sitemaps, verify XML validity, and extract total URL counts.",
  alternates: {
    canonical: "/tools/sitemap-finder",
  },
});

const SitemapFinderPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
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
              <Search className="mr-2 h-4 w-4" />
              Sitemap Discovery
            </div>

            <h1 className="text-4xl md:text-6xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 leading-tight">
              Sitemap Finder & Checker
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Find and validate all sitemaps on any website instantly. Discover
              hidden sitemaps, verify XML validity, and extract total URL counts
              — all in one place.
            </p>
          </div>

          {/* Tool Component */}
          <div className="max-w-4xl mx-auto w-full">
            <SitemapFinderTool />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4 p-6 bg-card/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Auto Discovery</h3>
              <p className="text-muted-foreground">
                Automatically scans robots.txt and common paths to find every
                sitemap index and file.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-card/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <FileCode className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Content Analysis</h3>
              <p className="text-muted-foreground">
                Extracts URL counts and checks for valid XML formatting across
                all discovered files.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-card/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Health Check</h3>
              <p className="text-muted-foreground">
                Instantly spots broken sitemaps (404s) and empty files that
                could hurt your SEO.
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-2 gap-12 pt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">📋 What This Tool Does</h2>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li>🔎 Automatically detects sitemap.xml</li>
                <li>🗂 Finds sitemap index files</li>
                <li>📄 Extracts all sitemap URLs</li>
                <li>📊 Counts total URLs inside each sitemap</li>
                <li>✅ Validates XML format</li>
                <li>🔗 Checks HTTP status codes</li>
                <li>🚫 Detects broken or redirected URLs</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">🧠 How It Works</h2>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Enter your website URL (e.g., https://example.com).</li>
                <li>
                  The tool checks <code>/robots.txt</code> for specific sitemap
                  directives.
                </li>
                <li>
                  It also scans common locations like <code>/sitemap.xml</code>{" "}
                  and <code>/sitemap_index.xml</code>.
                </li>
                <li>
                  It fetches each found sitemap to validate structure and count
                  URLs.
                </li>
                <li>
                  Finally, it presents a comprehensive report of your
                  site&apos;s map structure.
                </li>
              </ol>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-border/40">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">🚀 Why Use This Tool?</h2>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li>Improve search engine crawling efficiency</li>
                <li>Detect missing or broken sitemaps immediately</li>
                <li>Analyze competitor sitemap structures</li>
                <li>Identify indexing issues early</li>
                <li>Optimize large websites with multiple sitemaps</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">💡 Who Is This For?</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/30 rounded-lg text-sm font-medium text-center border border-border">
                  SEO Professionals
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-sm font-medium text-center border border-border">
                  Digital Marketers
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-sm font-medium text-center border border-border">
                  Website Owners
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-sm font-medium text-center border border-border">
                  Developers
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-border/40">
            <h2 className="text-2xl font-bold">🔐 Privacy & Security</h2>
            <p className="text-muted-foreground max-w-4xl">
              We do not store or share your website data. All checks are
              performed securely and temporarily for the duration of your
              session.
            </p>
          </div>

          <div className="text-center py-8 text-sm text-muted-foreground border-t border-border/40 mt-8">
            © 2026 Sitemap Finder & Checker Tool
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default SitemapFinderPage;

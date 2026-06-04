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
              <Search className="mr-2 h-4 w-4" />
              Sitemap Discovery
            </div>

            <h1 className="h-section text-ink">
              Sitemap Finder & Checker
            </h1>
            <p className="lede max-w-2xl">
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
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4 p-6 bg-white rounded-xl border border-ink/10">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Auto Discovery</h3>
              <p className="text-ink2">
                Automatically scans robots.txt and common paths to find every
                sitemap index and file.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-white rounded-xl border border-ink/10">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <FileCode className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Content Analysis</h3>
              <p className="text-ink2">
                Extracts URL counts and checks for valid XML formatting across
                all discovered files.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-white rounded-xl border border-ink/10">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Health Check</h3>
              <p className="text-ink2">
                Instantly spots broken sitemaps (404s) and empty files that
                could hurt your SEO.
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-2 gap-12 pt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">📋 What This Tool Does</h2>
              <ul className="list-disc list-inside space-y-3 text-ink2">
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
              <h2 className="text-2xl font-bold text-ink">🧠 How It Works</h2>
              <ol className="list-decimal list-inside space-y-3 text-ink2">
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

          <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-ink/10">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">🚀 Why Use This Tool?</h2>
              <ul className="list-disc list-inside space-y-3 text-ink2">
                <li>Improve search engine crawling efficiency</li>
                <li>Detect missing or broken sitemaps immediately</li>
                <li>Analyze competitor sitemap structures</li>
                <li>Identify indexing issues early</li>
                <li>Optimize large websites with multiple sitemaps</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">💡 Who Is This For?</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-lg text-sm font-medium text-center border border-ink/10 text-ink">
                  SEO Professionals
                </div>
                <div className="p-3 bg-white rounded-lg text-sm font-medium text-center border border-ink/10 text-ink">
                  Digital Marketers
                </div>
                <div className="p-3 bg-white rounded-lg text-sm font-medium text-center border border-ink/10 text-ink">
                  Website Owners
                </div>
                <div className="p-3 bg-white rounded-lg text-sm font-medium text-center border border-ink/10 text-ink">
                  Developers
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-ink/10">
            <h2 className="text-2xl font-bold text-ink">🔐 Privacy & Security</h2>
            <p className="text-ink2 max-w-4xl">
              We do not store or share your website data. All checks are
              performed securely and temporarily for the duration of your
              session.
            </p>
          </div>

          <div className="text-center py-8 text-sm text-ink3 border-t border-ink/10 mt-8">
            © 2026 Sitemap Finder & Checker Tool
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default SitemapFinderPage;

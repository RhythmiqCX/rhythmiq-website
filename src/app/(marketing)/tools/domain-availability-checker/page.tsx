import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import DomainAvailabilityCheckerTool from "@/components/tools/domain-availability-checker/tool";
import { ChevronLeft, Globe, Search, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Domain Availability Checker | Instant Whois & Domain Search",
  description:
    "Instantly check domain name availability across multiple extensions (.com, .net, .io, etc). Free bulk domain search tool with WHOIS lookup.",
  alternates: {
    canonical: "/tools/domain-availability-checker",
  },
});

const DomainAvailabilityPage = () => {
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
              <Globe className="mr-2 h-4 w-4" />
              Instant Lookup
            </div>

            <span className="eyebrow">Free Tool</span>
            <h1 className="h-section">Domain Availability Checker</h1>
            <p className="lede max-w-2xl">
              Instantly check if your desired website domain is available.
              Search across popular extensions like .com, .net, .org, .io, and
              more.
            </p>
          </div>

          {/* Tool Component */}
          <div className="max-w-4xl mx-auto w-full">
            <DomainAvailabilityCheckerTool />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4 p-6 bg-white rounded-xl border border-ink/10">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Real-time Check</h3>
              <p className="text-ink2">
                Get instant availability results for your domain names across
                multiple TLDs simultaneously.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-white rounded-xl border border-ink/10">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Multiple Extensions</h3>
              <p className="text-ink2">
                Support for all popular top-level domains including .com, .net,
                .org, .io, .ai, .co, and .dev.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-white rounded-xl border border-ink/10">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center text-coral">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Secure & Private</h3>
              <p className="text-ink2">
                We respect your privacy. All checks are performed securely and
                we do not store your search data.
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-2 gap-12 pt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">💡 How It Works</h2>
              <ol className="list-decimal list-inside space-y-3 text-ink2">
                <li>Enter your desired domain name (without extension).</li>
                <li>
                  Select the extensions you want to check (e.g. .com, .io).
                </li>
                <li>
                  Click{" "}
                  <span className="font-semibold text-ink">
                    Check Availability
                  </span>
                  .
                </li>
                <li>
                  Instantly see which domains are available and register them.
                </li>
              </ol>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">🚀 Pro Tips</h2>
              <ul className="list-disc list-inside space-y-3 text-ink2">
                <li>Keep it short, memorable, and easy to spell.</li>
                <li>Avoid numbers and hyphens if possible.</li>
                <li>
                  Prefer <strong>.com</strong> for global brands.
                </li>
                <li>Check social media username availability alongside.</li>
                <li>Make it brandable rather than generic.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-ink/10">
            <h2 className="text-2xl font-bold text-ink">
              🔧 API Integration (For Developers)
            </h2>
            <p className="text-ink2">
              Looking to build your own domain checker? You can integrate these
              popular APIs:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {["GoDaddy API", "Namecheap API", "WhoisXML API", "RapidAPI"].map(
                (api) => (
                  <div
                    key={api}
                    className="p-4 rounded-lg border border-ink/10 bg-white text-center font-medium text-ink"
                  >
                    {api}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-ink/10">
            <h2 className="text-2xl font-bold text-ink">📌 Example Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white border border-ink/10">
                <h4 className="font-semibold mb-2 text-ink">Startups</h4>
                <p className="text-sm text-ink2">
                  Checking brand name availability before launching a new
                  product.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-ink/10">
                <h4 className="font-semibold mb-2 text-ink">Bloggers</h4>
                <p className="text-sm text-ink2">
                  Finding the perfect domain for a new niche blog or portfolio.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-ink/10">
                <h4 className="font-semibold mb-2 text-ink">Agencies</h4>
                <p className="text-sm text-ink2">
                  Securing domains for client projects and campaigns.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-ink/10">
                <h4 className="font-semibold mb-2 text-ink">Investors</h4>
                <p className="text-sm text-ink2">
                  Researching and valuing potential domain names for resale.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center py-8 text-sm text-ink3 border-t border-ink/10 mt-8">
            © 2026 Domain Availability Checker Tool
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default DomainAvailabilityPage;

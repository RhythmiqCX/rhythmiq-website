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
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
              <Globe className="mr-2 h-4 w-4" />
              Instant Lookup
            </div>

            <h1 className="text-4xl md:text-6xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 leading-tight">
              Domain Availability Checker
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
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
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4 p-6 bg-card/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Check</h3>
              <p className="text-muted-foreground">
                Get instant availability results for your domain names across
                multiple TLDs simultaneously.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-card/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Multiple Extensions</h3>
              <p className="text-muted-foreground">
                Support for all popular top-level domains including .com, .net,
                .org, .io, .ai, .co, and .dev.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-card/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Secure & Private</h3>
              <p className="text-muted-foreground">
                We respect your privacy. All checks are performed securely and
                we do not store your search data.
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-2 gap-12 pt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">💡 How It Works</h2>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Enter your desired domain name (without extension).</li>
                <li>
                  Select the extensions you want to check (e.g. .com, .io).
                </li>
                <li>
                  Click{" "}
                  <span className="font-semibold text-foreground">
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
              <h2 className="text-2xl font-bold">🚀 Pro Tips</h2>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
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

          <div className="space-y-6 pt-8 border-t border-border/40">
            <h2 className="text-2xl font-bold">
              🔧 API Integration (For Developers)
            </h2>
            <p className="text-muted-foreground">
              Looking to build your own domain checker? You can integrate these
              popular APIs:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {["GoDaddy API", "Namecheap API", "WhoisXML API", "RapidAPI"].map(
                (api) => (
                  <div
                    key={api}
                    className="p-4 rounded-lg border border-border bg-muted/30 text-center font-medium"
                  >
                    {api}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-border/40">
            <h2 className="text-2xl font-bold">📌 Example Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <h4 className="font-semibold mb-2">Startups</h4>
                <p className="text-sm text-muted-foreground">
                  Checking brand name availability before launching a new
                  product.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <h4 className="font-semibold mb-2">Bloggers</h4>
                <p className="text-sm text-muted-foreground">
                  Finding the perfect domain for a new niche blog or portfolio.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <h4 className="font-semibold mb-2">Agencies</h4>
                <p className="text-sm text-muted-foreground">
                  Securing domains for client projects and campaigns.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <h4 className="font-semibold mb-2">Investors</h4>
                <p className="text-sm text-muted-foreground">
                  Researching and valuing potential domain names for resale.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center py-8 text-sm text-muted-foreground border-t border-border/40 mt-8">
            © 2026 Domain Availability Checker Tool
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default DomainAvailabilityPage;

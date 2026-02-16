import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import LinkedInEmailFinderTool from "@/components/tools/linkedin-email-finder/tool";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "LinkedIn Email Finder | Find Verified Professional Emails Instantly",
  description:
    "Discover verified business email addresses using a person’s name and company domain. Perfect for sales teams, recruiters, and marketers.",
  alternates: {
    canonical: "/tools/linkedin-email-finder",
  },
});

const LinkedInEmailFinderPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

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
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                LinkedIn Email Finder
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Find verified professional email addresses in seconds. Enter a
                name and company to generate and verify email patterns
                instantly.
              </p>
            </div>
          </div>

          <LinkedInEmailFinderTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/40">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Smart Pattern Generator</h3>
              <p className="text-muted-foreground">
                Our algorithm generates the most common corporate email patterns
                based on the prospect&apos;s name and company domain.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Real-Time Verification</h3>
              <p className="text-muted-foreground">
                We verify each email address in real-time to ensure high
                deliverability and reduce bounce rates for your campaigns.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">CSV Export</h3>
              <p className="text-muted-foreground">
                Easily export your found emails to CSV for quick import into
                your CRM or cold outreach tools.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default LinkedInEmailFinderPage;

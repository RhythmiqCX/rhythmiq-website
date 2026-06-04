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
              <span className="eyebrow">Prospecting Tool</span>
              <h1 className="h-section mt-3 text-ink">
                LinkedIn Email Finder
              </h1>
              <p className="lede mt-3 max-w-2xl">
                Find verified professional email addresses in seconds. Enter a
                name and company to generate and verify email patterns
                instantly.
              </p>
            </div>
          </div>

          <LinkedInEmailFinderTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Smart Pattern Generator</h3>
              <p className="text-ink2">
                Our algorithm generates the most common corporate email patterns
                based on the prospect&apos;s name and company domain.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Real-Time Verification</h3>
              <p className="text-ink2">
                We verify each email address in real-time to ensure high
                deliverability and reduce bounce rates for your campaigns.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">CSV Export</h3>
              <p className="text-ink2">
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

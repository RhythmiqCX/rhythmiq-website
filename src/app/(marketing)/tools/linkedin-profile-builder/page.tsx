import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import LinkedInProfileBuilderTool from "@/components/tools/linkedin-profile-builder/tool";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "LinkedIn Profile Builder | Free Professional Profile Generator",
  description:
    "Generate a professional LinkedIn profile instantly. Optimize your headline, summary, experience, and skills to attract recruiters.",
  alternates: {
    canonical: "/tools/linkedin-profile-builder",
  },
});

const LinkedInProfileBuilderPage = () => {
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
              <span className="eyebrow">Career Tool</span>
              <h1 className="h-section mt-3 text-ink">
                LinkedIn Profile Builder
              </h1>
              <p className="lede mt-3 max-w-2xl">
                Create a professional, optimized LinkedIn profile in minutes.
                Identify keywords, craft powerful summaries, and stand out to
                recruiters.
              </p>
            </div>
          </div>

          <LinkedInProfileBuilderTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">ATS-Friendly</h3>
              <p className="text-ink2">
                Generate content optimized for Application Tracking Systems and
                LinkedIn's internal search algorithms.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Recruiter Focused</h3>
              <p className="text-ink2">
                Highlights your achievements and skills in a format that hiring
                managers and recruiters prefer.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Instant Export</h3>
              <p className="text-ink2">
                Copy your new headline, summary, and experience directly to your
                clipboard or download as a text file.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default LinkedInProfileBuilderPage;

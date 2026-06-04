import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import CTCCalculatorTool from "@/components/tools/ctc-calculator/tool";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = generateMetadata({
  title: "Free CTC Calculator – Monthly In-Hand Salary | Rhythmiq",
  description:
    "Calculate your monthly in-hand salary from your annual CTC. Detailed salary breakdown including PF, tax, HRA, gratuity, and allowances for Indian professionals.",
});

export default function CTCCalculatorPage() {
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
              <span className="eyebrow">Free Tool</span>
              <h1 className="h-section">CTC Calculator</h1>
              <p className="lede max-w-2xl">
                Calculate your monthly in-hand salary from your annual CTC (Cost
                to Company). Get a detailed salary breakdown including Basic,
                HRA, PF, Gratuity, Professional Tax, and Income Tax estimation
                under both Old and New tax regimes.
              </p>
            </div>
          </div>

          <CTCCalculatorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Compare Job Offers</h3>
              <p className="text-ink2">
                Instantly see the real take-home pay from different CTCs so you
                can make data-driven career decisions.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Tax Regime Comparison</h3>
              <p className="text-ink2">
                Switch between Old and New tax regimes to find the option that
                saves you more money based on your investments.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">
                Complete Salary Breakdown
              </h3>
              <p className="text-ink2">
                View every component — Basic, HRA, PF, Gratuity, Tax — in a
                clear monthly and annual breakdown table.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

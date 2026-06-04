import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import ChatbotROICalculatorTool from "@/components/tools/chatbot-roi-calculator/tool";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = generateMetadata({
  title: "Free Chatbot ROI Calculator | Rhythmiq",
  description:
    "Instantly see how much money and time you could save by automating customer support with an AI chatbot.",
});

export default function ChatbotROICalculatorPage() {
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

            <div className="flex flex-col gap-3 max-w-3xl">
              <span className="eyebrow">Free tool</span>
              <h1 className="h-section">Chatbot ROI Calculator</h1>
              <p className="lede max-w-2xl">
                Thinking about implementing a chatbot or AI voice agent but
                unsure about the financial impact? Use our free ROI calculator
                to instantly see how much money and time you could save by
                automating customer support.
              </p>
            </div>
          </div>

          <ChatbotROICalculatorTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">
                Reduce Operational Costs
              </h3>
              <p className="text-ink2">
                Lower your cost per interaction significantly by routing routine
                queries to AI instead of human agents.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Scale Without Hiring</h3>
              <p className="text-ink2">
                Handle seasonal spikes and growing support volume without the
                need to endlessly increase your headcount.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Free Your Team</h3>
              <p className="text-ink2">
                Allow your human agents to focus on high-value, complex issues
                that require empathy and critical thinking.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

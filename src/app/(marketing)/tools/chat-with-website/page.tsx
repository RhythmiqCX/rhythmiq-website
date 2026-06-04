import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import ChatWithWebsiteTool from "@/components/tools/chat-with-website/tool";
import Link from "next/link";
import { ChevronLeft, Zap, Lock, BookOpen } from "lucide-react";

export const metadata = generateMetadata({
  title: "AI Chat with Your Website Data | Free URL Analysis Tool",
  description:
    "Enter any webpage URL and chat with our AI to ask any questions, generate FAQs, or extract insights and get instant, accurate answers - Free to use. No sign up required.",
});

export default function ChatWithWebsitePage() {
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
              <h1 className="h-section">AI Chat with Your Website Data</h1>
              <p className="lede max-w-2xl">
                Enter any webpage URL and chat with our AI to ask any questions,
                generate FAQs, or extract insights and get instant, accurate
                answers - Free to use. No sign up required.
              </p>
            </div>
          </div>

          <ChatWithWebsiteTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center">
                <Zap className="w-5 h-5 text-coral" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Instant Analysis</h3>
              <p className="text-ink2">
                Get immediate answers from any webpage without reading through
                endless content.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center">
                <Lock className="w-5 h-5 text-coral" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Secure & Private</h3>
              <p className="text-ink2">
                We process the content in real-time and do not store any data
                permanently on our servers.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-coralSoft flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-coral" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Universal Support</h3>
              <p className="text-ink2">
                Works with any public webpage - blogs, documentation, product
                pages, news articles, and more.
              </p>
            </div>
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
}

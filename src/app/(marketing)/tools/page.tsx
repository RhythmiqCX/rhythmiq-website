import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";

import {
  ArrowRight,
  Repeat,
  Sparkles,
  Tag,
  Image,
  FileJson,
  FileCode,
  FileText,
  BookOpen,
  NotebookPen,
  Home,
  CalendarCheck,
  Globe,
  Mail,
  HelpCircle,
  Search,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata } from "@/utils";
import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib";

export const metadata = generateMetadata({
  title: "Free AI Tools for Customer Support | Rhythmiq",
  description:
    "Free AI-powered tools to help you optimize your customer support, calculate ROI, and improve agent productivity.",
  alternates: {
    canonical: "/tools",
  },
});

const tools = [
  {
    title: "AI Chat with Your Website Data",
    description:
      "Enter any webpage URL and chat with our AI to ask any questions, generate FAQs, or extract insights and get instant, accurate answers - Free to use. No sign up required.",
    icon: Globe,
    href: "/tools/chat-with-website",
    comingSoon: false,
    gradientFrom: "#3b82f6",
    gradientTo: "#6366f1",
  },
  {
    title: "Email Signature Generator",
    description:
      "Create a professional, branded email signature in minutes. Customize your name, company, social links, and layout.",
    icon: Mail,
    href: "/tools/email-signature-generator",
    comingSoon: false,
    gradientFrom: "#f472b6", // Pink
    gradientTo: "#a855f7", // Purple
  },
  {
    title: "AI Document Generator",
    description:
      "Create professional SOPs, Proposals, and Legal Drafts instantly. Strictly structured templates with AI-powered expansion.",
    icon: FileText,
    href: "/tools/ai-document-generator",
    comingSoon: false,
    gradientFrom: "#6366f1",
    gradientTo: "#a855f7",
  },
  {
    title: "AI Notes Generator",
    description:
      "Convert raw text and transcripts into structured Cornell notes, outlines, and summaries for better retention.",
    icon: NotebookPen,
    href: "/tools/ai-notes-generator",
    comingSoon: false,
    gradientFrom: "#22c55e",
    gradientTo: "#14b8a6",
  },
  {
    title: "Meta Tag Generator",
    description:
      "Generate perfect SEO meta tags, Open Graph tags, and Twitter Cards to boost your website's visibility and social sharing.",
    icon: Tag,
    href: "/tools/meta-tag-generator",
    comingSoon: false,
    gradientFrom: "#38bdf8",
    gradientTo: "#3b82f6",
  },
  {
    title: "Content Repurposer",
    description:
      "Transform one piece of content into LinkedIn posts, Twitter threads, and Newsletters. Multiply your output with AI.",
    icon: Repeat,
    href: "/tools/content-repurposer",
    comingSoon: false,
    gradientFrom: "#8b5cf6",
    gradientTo: "#d946ef",
  },
  {
    title: "Favicon Generator",
    description:
      "Generate website favicons in all sizes instantly. Convert text or images to .ico and .png files for your web app.",
    icon: Image,
    href: "/tools/favicon-generator",
    comingSoon: false,
    gradientFrom: "#f59e0b",
    gradientTo: "#d97706",
  },
  {
    title: "JSON to XML Converter",
    description:
      "Convert JSON data into clean, well-structured XML instantly. No signup, no uploads, secure client-side conversion.",
    icon: FileJson,
    href: "/tools/json-to-xml-converter",
    comingSoon: false,
    gradientFrom: "#10b981",
    gradientTo: "#0ea5e9",
  },
  {
    title: "JSON to YAML Converter",
    description:
      "Convert JSON object to YAML format instantly. Clean, readable output for configuration files and more.",
    icon: FileCode,
    href: "/tools/json-to-yaml-converter",
    heading: "JSON to YAML Converter",
    gradientFrom: "#ec4899",
    gradientTo: "#8b5cf6",
  },
  {
    title: "JSON to PDF Converter",
    description:
      "Convert JSON data into clean, well-structured PDF documents. Customize layout, formatting, and more.",
    icon: FileText,
    href: "/tools/json-to-pdf-converter",
    heading: "JSON to PDF Converter",
    gradientFrom: "#ef4444",
    gradientTo: "#f97316",
  },
  {
    title: "LinkedIn Profile Builder",
    description:
      "Create a professional, optimized LinkedIn profile. Generate headlines, summaries, and experience points.",
    icon: Briefcase,
    href: "/tools/linkedin-profile-builder",
    comingSoon: false,
    gradientFrom: "#0077b5", // LinkedIn Blue
    gradientTo: "#0e76a8",
  },
  {
    title: "LinkedIn Email Finder",
    description:
      "Find verified professional email addresses. Enter a name and company to generate and verify email patterns instantly.",
    icon: Search,
    href: "/tools/linkedin-email-finder",
    comingSoon: false,
    gradientFrom: "#0077b5",
    gradientTo: "#00a0dc",
  },
  {
    title: "Web to Markdown",
    description:
      "Convert any webpage into clean, readable Markdown instantly. Perfect for LLMs and archiving.",
    icon: Globe,
    href: "/tools/web-to-markdown",
    comingSoon: false,
    gradientFrom: "#3b82f6",
    gradientTo: "#8b5cf6",
  },
  {
    title: "Notion to Markdown",
    description:
      "Convert any public Notion page into clean, readable Markdown instantly. Perfect for documentation and archiving.",
    icon: BookOpen,
    href: "/tools/notion-to-markdown",
    comingSoon: false,
    gradientFrom: "#64748b", // Slate
    gradientTo: "#94a3b8", // Gray
  },
  {
    title: "AI Floor Plan Generator",
    description:
      "Generate optimized 2D floor plans instantly. Customize dimensions, rooms, and layouts based on your needs.",
    icon: Home,
    href: "/tools/ai-floor-plan-generator",
    comingSoon: false,
    gradientFrom: "#0ea5e9", // Sky
    gradientTo: "#6366f1", // Indigo
  },
  {
    title: "AI Schedule Maker",
    description:
      "Automatically generate optimized daily schedules. prioritize tasks, insert breaks, and maximize productivity.",
    icon: CalendarCheck,
    href: "/tools/ai-schedule-maker",
    comingSoon: false,
    gradientFrom: "#f97316",
    gradientTo: "#ec4899",
  },
  {
    title: "AI Email Response Generator",
    description:
      "Draft professional email replies instantly. Customize tone and intent to perfect your communication.",
    icon: Mail,
    href: "/tools/ai-email-response-generator",
    comingSoon: false,
    gradientFrom: "#3b82f6",
    gradientTo: "#6366f1",
  },
  {
    title: "Webpage to FAQ Generator",
    description:
      "Turn any webpage content into a clear, structured FAQ section in seconds. Ideal for support docs and help centers.",
    icon: HelpCircle,
    href: "/tools/webpage-to-faq",
    comingSoon: false,
    gradientFrom: "#10b981",
    gradientTo: "#3b82f6",
  },
  {
    title: "Domain Availability Checker",
    description:
      "Instantly check if your desired domain name is available. Search across popular extensions like .com, .net, and .io.",
    icon: Globe,
    href: "/tools/domain-availability-checker",
    comingSoon: false,
    gradientFrom: "#8b5cf6", // Violet
    gradientTo: "#ec4899", // Pink
  },
  {
    title: "Sitemap Validator",
    description:
      "Validate your XML sitemap instantly. Check for errors, broken URLs, missing tags, and formatting issues.",
    icon: FileCode,
    href: "/tools/sitemap-validator",
    comingSoon: false,
    gradientFrom: "#f59e0b", // Amber
    gradientTo: "#ef4444", // Red
  },
  {
    title: "Sitemap Finder & Checker",
    description:
      "Find and validate all sitemaps on any website instantly. Discover hidden sitemaps and extract URL counts.",
    icon: Search,
    href: "/tools/sitemap-finder",
    comingSoon: false,
    gradientFrom: "#3b82f6", // Blue
    gradientTo: "#06b6d4", // Cyan
  },
  {
    title: "AI Prompt Generator",
    description:
      "Create high-quality AI prompts using proven frameworks like CREATE, APE, and RACE. Optimize for ChatGPT, Claude, and Midjourney.",
    icon: Sparkles,
    href: "/tools/ai-prompt-generator",
    comingSoon: false,
    gradientFrom: "#8b5cf6", // Violet
    gradientTo: "#d946ef", // Fuchsia
  },
];

const ToolsPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/20 blur-[120px] rounded-full -z-10 opacity-50 pointer-events-none" />

      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-16">
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto pt-10">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              Free Resources
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 leading-tight">
              Free AI Tools for <br />
              <span className="font-subheading italic text-primary">
                The Community
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A curated collection of free AI-powered tools designed to help you
              analyze, optimize, and supercharge your customer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-4">
            {tools.map((tool, index) => (
              <Container
                key={index}
                delay={0.1 + index * 0.1}
                className="h-full"
              >
                <Link
                  href={tool.href}
                  className={cn(
                    "block h-full",
                    tool.comingSoon && "cursor-default",
                  )}
                >
                  <MagicCard
                    gradientFrom={tool.gradientFrom}
                    gradientTo={tool.gradientTo}
                    className="p-7 min-h-[350px] h-full flex flex-col items-start gap-6 border-border/50 hover:border-border/100 transition-all duration-300"
                    gradientColor="rgba(255,255,255,0.05)"
                  >
                    <div
                      className={cn(
                        "px-3 py-2 rounded-xl bg-gradient-to-br text-white shadow-lg my-2",
                        `from-[${tool.gradientFrom}] to-[${tool.gradientTo}]`,
                      )}
                      style={{
                        background: `linear-gradient(135deg, ${tool.gradientFrom}, ${tool.gradientTo})`,
                      }}
                    >
                      <tool.icon className="w-8 h-8" />
                    </div>

                    <div className="space-y-3 flex-1">
                      <h3 className="text-2xl font-bold font-heading">
                        {tool.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 w-full flex items-center justify-between border-t border-border/50 pt-6">
                      <span
                        className={cn(
                          "text-sm font-semibold flex items-center gap-2",
                          tool.comingSoon
                            ? "text-muted-foreground"
                            : "text-primary group-hover:gap-3 transition-all",
                        )}
                      >
                        {tool.comingSoon ? "Coming Soon" : "Try Tool"}
                        {!tool.comingSoon && <ArrowRight className="w-4 h-4" />}
                      </span>
                      {tool.comingSoon && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground border border-border">
                          Planned
                        </span>
                      )}
                    </div>
                  </MagicCard>
                </Link>
              </Container>
            ))}
          </div>

          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default ToolsPage;

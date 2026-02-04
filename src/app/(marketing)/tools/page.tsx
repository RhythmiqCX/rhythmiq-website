import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Repeat,
  Sparkles,
  Tag,
  Image,
  FileJson,
  FileCode,
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
    comingSoon: false,
    gradientFrom: "#ec4899",
    gradientTo: "#8b5cf6",
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

          <Container delay={0.4} className="mt-12">
            <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm p-8 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
                <h3 className="text-3xl font-heading font-bold">
                  Ready for the full experience?
                </h3>
                <p className="text-muted-foreground text-lg">
                  These tools are just the beginning. Unlock the full potential
                  of AI-driven support with Rhythmiq&apos;s complete platform.
                </p>
                <Link href="https://calendly.com/ray-rhythmiqcx/30min">
                  <Button
                    size="lg"
                    className="rounded-full px-8 h-12 text-base shadow-xl shadow-primary/20"
                  >
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Container>
      </Wrapper>
    </div>
  );
};

export default ToolsPage;

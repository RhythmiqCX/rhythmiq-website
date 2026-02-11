"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Copy,
  Download,
  Trash2,
  Check,
  Globe,
  FileText,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib";
import { fetchUrlAction } from "@/actions/tools/web-to-markdown";

export default function WebToMarkdownTool() {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const htmlToMarkdown = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Clean unnecessary elements
    const elementsToRemove = doc.querySelectorAll(
      "script, style, noscript, iframe, svg, nav, footer, header, form, button, [aria-hidden='true']",
    );
    elementsToRemove.forEach((el) => el.remove());

    function traverse(node: Node | null): string {
      if (!node) return "";

      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent?.replace(/\s+/g, " ") || "";
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return "";

      const el = node as HTMLElement;
      const tagName = el.tagName.toLowerCase();

      // Inline elements handling
      const isInline = [
        "a",
        "strong",
        "b",
        "em",
        "i",
        "code",
        "span",
        "small",
      ].includes(tagName);

      let content = "";

      // Handle pre specially - get raw text
      if (tagName === "pre") {
        return `\n\`\`\`\n${el.textContent || ""}\n\`\`\`\n\n`;
      }

      el.childNodes.forEach((child) => {
        content += traverse(child);
      });

      if (!isInline) {
        // block elements logic
        content = content.trim();
      }

      switch (tagName) {
        case "h1":
          return `# ${content}\n\n`;
        case "h2":
          return `## ${content}\n\n`;
        case "h3":
          return `### ${content}\n\n`;
        case "h4":
          return `#### ${content}\n\n`;
        case "h5":
          return `##### ${content}\n\n`;
        case "h6":
          return `###### ${content}\n\n`;
        case "p":
          return `${content}\n\n`;
        case "br":
          return `\n`;
        case "hr":
          return `\n---\n\n`;
        case "strong":
        case "b":
          return content ? ` **${content}** ` : "";
        case "em":
        case "i":
          return content ? ` *${content}* ` : "";
        case "code":
          return content ? ` \`${content}\` ` : "";
        case "blockquote":
          return `> ${content}\n\n`;
        case "ul":
          // We need to handle list items properly in traverse/recurse, but for simple AST,
          // we can rely on LI returning its bullet.
          // However, LI needs to know it's in a list.
          // Simplified: just return content which are LIs
          return `${content}\n`;
        case "ol":
          return `${content}\n`;
        case "li":
          return `- ${content}\n`;
        case "a":
          const href = el.getAttribute("href");
          return href ? `[${content}](${href})` : content;
        case "img":
          const src = el.getAttribute("src");
          const alt = el.getAttribute("alt") || "image";
          return src ? `![${alt}](${src})` : "";
        case "div":
        case "section":
        case "article":
        case "main":
          return `${content}\n\n`;
        default:
          return isInline ? content : `${content}\n`;
      }
    }

    // Start with body
    let markdown = traverse(doc.body);

    // Post-processing cleanup
    // Remove multiple newlines
    markdown = markdown.replace(/\n\s*\n\s*\n/g, "\n\n");
    // decode typical html entities if any remain (DOMParser handles most)

    return markdown.trim();
  };

  const handleConvert = async () => {
    setError(null);
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      new URL(url); // Validate URL format
    } catch {
      setError("Please enter a valid URL (e.g., https://example.com).");
      return;
    }

    setLoading(true);
    try {
      const result = await fetchUrlAction(url);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result.html) {
        const markdown = htmlToMarkdown(result.html);
        setOutput(markdown || "No content found on readability parsing.");
      }
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred during conversion.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/markdown" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "converted-page.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };

  const handleClear = () => {
    setUrl("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Tool Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-[600px] lg:h-[700px]">
        {/* Input Section */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              Webpage URL
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          <div
            className={cn(
              "relative flex-none rounded-xl border-2 transition-all bg-card overflow-hidden p-6 gap-4 flex flex-col",
              error
                ? "border-destructive/50"
                : "border-border hover:border-border/80 focus-within:border-primary/50",
            )}
          >
            <Label htmlFor="url-input" className="sr-only">
              URL
            </Label>
            <Input
              id="url-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/blog/article"
              className="w-full text-base py-6"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConvert();
              }}
            />
            <Button
              size="lg"
              onClick={handleConvert}
              className="w-full font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Fetching & Converting...
                </>
              ) : (
                <>
                  Convert Webpage
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Info/Instructions when empty */}
          <div className="flex-1 rounded-xl border border-dashed border-border/50 bg-muted/20 p-6 flex items-center justify-center text-muted-foreground text-center">
            <div className="max-w-xs space-y-2">
              <Globe className="w-8 h-8 mx-auto opacity-50 mb-2" />
              <p className="text-sm">
                Enter a URL above to convert any webpage into clean Markdown
                format.
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm font-medium animate-in slide-in-from-top-2 fade-in bg-destructive/10 p-3 rounded-lg border border-destructive/20 mt-auto">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" />
              Markdown Output
            </Label>
            <div className="flex gap-2">
              {output && (
                <>
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleDownload}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="relative flex-1 rounded-xl border-2 border-border/50 bg-muted/30 overflow-hidden group">
            {!output ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <FileText className="w-12 h-12 mb-4 opacity-20 hidden lg:block" />
                <p>Markdown content will appear here</p>
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                className="w-full h-full p-4 md:p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed text-foreground/90 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

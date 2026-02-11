"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Copy,
  Download,
  Trash2,
  Check,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  Loader2,
  Settings2,
} from "lucide-react";
import { fetchUrlAction } from "@/actions/tools/web-to-markdown";
import { generateFaqsAction, FaqItem } from "@/actions/tools/webpage-to-faq";

const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "italian", label: "Italian" },
  { value: "portuguese", label: "Portuguese" },
  { value: "dutch", label: "Dutch" },
  { value: "japanese", label: "Japanese" },
  { value: "chinese", label: "Chinese" },
  { value: "russian", label: "Russian" },
];

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "humorous", label: "Humorous" },
  { value: "technical", label: "Technical" },
  { value: "persuasive", label: "Persuasive" },
];

export default function WebpageToFaqTool() {
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("english");
  const [tone, setTone] = useState("professional");
  const [count, setCount] = useState("5");
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const cleanHtml = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove unwanted elements
    const elementsToRemove = doc.querySelectorAll(
      "script, style, noscript, iframe, svg, nav, footer, header, form, button, [aria-hidden='true']",
    );
    elementsToRemove.forEach((el) => el.remove());

    // Get text content
    return doc.body.textContent || "";
  };

  const handleGenerate = async () => {
    setError(null);
    setFaqs([]);

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
      // 1. Fetch URL content
      const fetchResult = await fetchUrlAction(url);

      if (fetchResult.error) {
        throw new Error(fetchResult.error);
      }

      if (!fetchResult.html) {
        throw new Error("No content found on the webpage.");
      }

      // 2. Clean content
      const cleanContent = cleanHtml(fetchResult.html);

      if (cleanContent.trim().length < 100) {
        throw new Error(
          "Not enough readable content found on the page to generate FAQs.",
        );
      }

      // 3. Generate FAQs using AI
      const genResult = await generateFaqsAction({
        content: cleanContent,
        language,
        tone,
        count: parseInt(count),
      });

      if (genResult.error) {
        throw new Error(genResult.error);
      }

      const generatedFaqs = genResult.faqs;
      if (!generatedFaqs || generatedFaqs.length === 0) {
        throw new Error(
          "AI failed to generate any FAQs. The content might be too short or unclear.",
        );
      }

      setFaqs(generatedFaqs);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (faqs.length === 0) return;

    const text = faqs
      .map((faq, i) => `Q${i + 1}: ${faq.question}\nA: ${faq.answer}`)
      .join("\n\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (faqs.length === 0) return;

    // Create Markdown content
    const content = faqs
      .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
      .join("\n\n");

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-faqs.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setUrl("");
    setFaqs([]);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Tool Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Input Section - Left Side */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-blue-500" />
              Configuration
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="space-y-4 p-6 bg-card rounded-xl border border-border shadow-sm">
            <div className="space-y-2">
              <Label htmlFor="url-input">Webpage URL</Label>
              <Input
                id="url-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/product-page"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TONES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Number of FAQs</Label>
              <Select value={count} onValueChange={setCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Questions</SelectItem>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15">15 Questions</SelectItem>
                  <SelectItem value="20">20 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              size="lg"
              onClick={handleGenerate}
              className="w-full font-semibold mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate FAQs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {error && (
              <div className="flex items-start gap-2 text-destructive text-sm font-medium animate-in slide-in-from-top-2 fade-in bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Output Section - Right Side */}
        <div className="lg:col-span-7 flex flex-col gap-6 h-full min-h-[500px]">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-500" />
              Generated FAQs
            </Label>

            {faqs.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Text
                    </>
                  )}
                </Button>
                <Button size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download MD
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1 rounded-xl border border-border bg-card/50 overflow-hidden relative">
            {faqs.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-muted/20">
                <div className="w-16 h-16 rounded-full bg-background border-2 border-dashed border-muted-foreground/20 flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 opacity-20" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  No FAQs generated yet
                </h3>
                <p className="text-sm max-w-sm mx-auto">
                  Enter a URL on the left and click Generate to analyze the
                  content and create FAQs.
                </p>
              </div>
            ) : (
              <div className="h-full overflow-y-auto p-6">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-border rounded-lg bg-card px-4 shadow-sm"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                        <span className="mr-2 text-primary font-bold">
                          Q{index + 1}.
                        </span>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 pl-8 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

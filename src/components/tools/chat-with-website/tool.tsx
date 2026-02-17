"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Globe,
  Send,
  X,
  Bot,
  User,
  Loader2,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib";
import { MagicCard } from "@/components/ui/magic-card";
import { fetchUrlAction } from "@/actions/tools/web-to-markdown";
import { chatWithWebsite } from "@/app/actions/chat-with-website";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWithWebsiteTool() {
  const [url, setUrl] = useState("");
  const [websiteContent, setWebsiteContent] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isGenerating]);

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

  const handleFetch = async () => {
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

    setIsFetching(true);

    try {
      const result = await fetchUrlAction(url);

      if (result.error) {
        throw new Error(result.error);
      }

      if (!result.html) {
        throw new Error("No content found on the webpage.");
      }

      const text = cleanHtml(result.html);

      if (text.trim().length < 50) {
        throw new Error("Not enough readable content found on the page.");
      }

      setWebsiteContent(text);
      setMessages([
        {
          role: "assistant",
          content: `Hi! I've analyzed the content from **${url}**. What would you like to know?`,
        },
      ]);
      toast.success("Website processed successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      toast.error(err.message || "Failed to fetch website.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleReset = () => {
    setWebsiteContent("");
    setMessages([]);
    setInput("");
    setError(null);
    setUrl("");
  };

  const sendMessage = async () => {
    if (!input.trim() || !websiteContent) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsGenerating(true);

    const newHistory = [
      ...messages,
      { role: "user", content: userMessage },
    ] as Message[];

    const result = await chatWithWebsite(websiteContent, newHistory);

    if (result.error) {
      toast.error(result.error);
    } else if (result.response) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.response },
      ]);
    }
    setIsGenerating(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {!websiteContent ? (
        <MagicCard
          className="p-8 md:p-12 border-2 border-border/50 transition-all duration-300 group"
          gradientColor="rgba(59, 130, 246, 0.05)"
        >
          <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Chat with any website</h3>
              <p className="text-muted-foreground">
                Enter a URL below to start chatting with its content.
              </p>
            </div>

            <div className="space-y-4 bg-card/50 p-6 rounded-xl border border-border/50">
              <div className="space-y-2">
                <Label htmlFor="url-input">Website URL</Label>
                <div className="relative">
                  <Input
                    id="url-input"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.acmecorp.com/features"
                    className="pl-10 h-12 text-base"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleFetch();
                    }}
                  />
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  disabled={!url || isFetching}
                  className="flex-1"
                >
                  Reset
                </Button>
                <Button
                  onClick={handleFetch}
                  disabled={!url || isFetching}
                  className="flex-[2] font-semibold"
                  size="lg"
                >
                  {isFetching ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Chat Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <div className="flex items-start gap-2 text-destructive text-sm font-medium animate-in slide-in-from-top-2 fade-in bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 justify-center flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setUrl(
                    "https://en.wikipedia.org/wiki/Artificial_intelligence",
                  )
                }
                className="text-xs"
              >
                Try: Wikipedia AI
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUrl("https://nextjs.org/docs")}
                className="text-xs"
              >
                Try: Next.js Docs
              </Button>
            </div>
          </div>
        </MagicCard>
      ) : (
        <div className="grid lg:grid-cols-[300px_1fr] gap-6 h-[600px]">
          {/* Sidebar / Info */}
          <div className="space-y-4 h-full flex flex-col">
            <Card className="p-4 border-border/50 bg-secondary/20 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex-shrink-0 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate text-sm" title={url}>
                      {new URL(url).hostname}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {url}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="w-full mt-4 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <X className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </Card>

            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex-1">
              <h4 className="font-semibold text-primary flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4" />
                Suggested Questions
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  "Summarize this page",
                  "What are the key features?",
                  "Explain the main topic",
                  "Create a FAQ section",
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(q);
                    }}
                    className="text-left text-sm p-2 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <Card className="flex flex-col border-border/50 shadow-xl overflow-hidden bg-background/50 backdrop-blur-md">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-3",
                      m.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {m.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted/50 border border-border/50 rounded-tl-sm",
                      )}
                    >
                      <div className="markdown-content whitespace-pre-wrap">
                        {m.content}
                      </div>
                    </div>

                    {m.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isGenerating && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            <div className="p-4 bg-background border-t border-border/50">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question about the website..."
                  className="pr-12 py-6 bg-secondary/30 border-border/50 focus:bg-background transition-all"
                  disabled={isGenerating}
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={sendMessage}
                  disabled={!input.trim() || isGenerating}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

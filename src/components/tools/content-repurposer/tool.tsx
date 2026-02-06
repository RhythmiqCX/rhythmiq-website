"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Copy,
  Check,
  Sparkles,
  Youtube,
  FileText,
  Loader2,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

type Platform = "linkedin" | "twitter" | "newsletter";

interface GeneratedContent {
  linkedin: string;
  twitter: string[];
  newsletter: string;
}

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "storytelling", label: "Storytelling" },
  { value: "bold", label: "Bold / Opinionated" },
  { value: "educational", label: "Educational" },
  { value: "founder", label: "Founder-style" },
];

import { repurposeContent } from "@/actions/tools/repurpose-content";
import { checkUsageAction } from "@/actions/tools/check-usage";
import { useEffect } from "react";

// ... previous imports ...

const ContentRepurposerTool = () => {
  // ... previous state ...
  const [inputType, setInputType] = useState<"url" | "text">("url");
  const [inputValue, setInputValue] = useState("");
  const [selectedTone, setSelectedTone] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [activeTab, setActiveTab] = useState<Platform>("linkedin");
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    checkUsageAction("content-repurposer").then((res) =>
      setIsLimitReached(res.isLimitReached),
    );
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedState(null), 2000);
  };

  const generateContent = async () => {
    if (!inputValue.trim()) {
      toast.error("Please provide a URL or text content.");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const result = await repurposeContent({
        content: inputValue,
        tone: selectedTone,
        type: inputType,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        setGeneratedContent({
          linkedin: result.linkedin,
          twitter: result.twitter,
          newsletter: result.newsletter,
        });
        toast.success("Content generated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
      checkUsageAction("content-repurposer").then((res) =>
        setIsLimitReached(res.isLimitReached),
      );
    }
  };

  // Removed mock generators

  return (
    <div className="flex flex-col gap-8">
      {/* Input Section */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>1. Input Source</CardTitle>
          <CardDescription>
            Choose your source content. We&apos;ll analyze it and extract the
            key ideas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs
            defaultValue="url"
            className="w-full"
            onValueChange={(v) => setInputType(v as "url" | "text")}
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="url" className="flex gap-2 items-center">
                <Youtube className="w-4 h-4" /> Media URL
              </TabsTrigger>
              <TabsTrigger value="text" className="flex gap-2 items-center">
                <FileText className="w-4 h-4" /> Manual Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label>YouTube or Blog URL</Label>
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Supported: YouTube Videos, Blog Articles, Medium Posts.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label>Paste Content / Transcript</Label>
                <Textarea
                  className="min-h-[150px] resize-y"
                  placeholder="Paste your script, article text, or rough notes here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
            <div className="space-y-2">
              <Label>2. Brand Voice</Label>
              <Select value={selectedTone} onValueChange={setSelectedTone}>
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

            <div className="flex items-end">
              <Button
                variant="default"
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0"
                onClick={generateContent}
                disabled={isGenerating || isLimitReached}
              >
                {isLimitReached ? (
                  <>Limit Reached (5/5)</>
                ) : isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Repurposing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Generate Content
                  </>
                )}
              </Button>
              {isLimitReached && (
                <p className="text-xs text-red-500 text-center mt-2">
                  You have reached your daily limit of 5 generations for this
                  tool.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {generatedContent && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="border-b border-border/50">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab("linkedin")}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === "linkedin"
                      ? "border-blue-500 text-blue-500 bg-blue-500/5"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn Post
                </button>
                <button
                  onClick={() => setActiveTab("twitter")}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === "twitter"
                      ? "border-sky-500 text-sky-500 bg-sky-500/5"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Twitter className="w-4 h-4" /> Twitter Thread
                </button>
                <button
                  onClick={() => setActiveTab("newsletter")}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === "newsletter"
                      ? "border-orange-500 text-orange-500 bg-orange-500/5"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Mail className="w-4 h-4" /> Newsletter
                </button>
              </div>
            </div>

            <CardContent className="p-6 min-h-[300px]">
              {activeTab === "linkedin" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border bg-background/50 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {generatedContent.linkedin}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={() =>
                        handleCopy(generatedContent.linkedin, "li")
                      }
                    >
                      {copiedState === "li" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      Copy Post
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "twitter" && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    {generatedContent.twitter.map((tweet, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center text-xs font-bold text-sky-500">
                            {i + 1}
                          </div>
                          {i !== generatedContent.twitter.length - 1 && (
                            <div className="w-0.5 flex-1 bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="p-3 rounded-xl border border-border bg-background/50 text-sm">
                            {tweet}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={() =>
                        handleCopy(generatedContent.twitter.join("\n\n"), "tw")
                      }
                    >
                      {copiedState === "tw" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      Copy Thread
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "newsletter" && (
                <div className="space-y-4">
                  <div className="p-6 rounded-lg border border-border bg-white text-black dark:bg-zinc-900 dark:text-gray-200 whitespace-pre-wrap font-serif text-base leading-relaxed">
                    {generatedContent.newsletter}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={() =>
                        handleCopy(generatedContent.newsletter, "nl")
                      }
                    >
                      {copiedState === "nl" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      Copy Email
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContentRepurposerTool;

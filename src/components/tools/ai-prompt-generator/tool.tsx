"use client";

import React, { useState } from "react";
import { Copy, RefreshCw, Wand2, Check, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MagicCard } from "@/components/ui/magic-card";
import { toast } from "sonner";
import { enhancePromptWithAI } from "@/app/actions/ai-prompt-generator";

// Framework Definitions
const frameworks = {
  CREATE: {
    name: "CREATE",
    description: "Best for Creative Projects (Art, Writing, Video)",
    sections: [
      {
        id: "character",
        label: "Character (C)",
        placeholder:
          "Act as an expert screenwriter with 20 years of experience...",
      },
      {
        id: "request",
        label: "Request (R)",
        placeholder: "Write a script for a 60-second commercial...",
      },
      {
        id: "examples",
        label: "Examples (E)",
        placeholder: "Style like a Nike ad, inspirational and high energy...",
      },
      {
        id: "adjustments",
        label: "Adjustments (A)",
        placeholder: "Keep it under 150 words, use short sentences...",
      },
      {
        id: "type",
        label: "Type of Output (T)",
        placeholder: "Screenplay format with scene headings...",
      },
      {
        id: "extras",
        label: "Extras (E)",
        placeholder: "Include camera angles and lighting cues...",
      },
    ],
  },
  APE: {
    name: "APE",
    description: "Action, Purpose, Expectation (Simple & Direct)",
    sections: [
      {
        id: "action",
        label: "Action (A)",
        placeholder: "Write a blog post about...",
      },
      {
        id: "purpose",
        label: "Purpose (P)",
        placeholder: "To educate beginners about...",
      },
      {
        id: "expectation",
        label: "Expectation (E)",
        placeholder: "Use a friendly tone, include 3 examples...",
      },
    ],
  },
  RACE: {
    name: "RACE",
    description: "Role, Action, Context, Expectation (Professional)",
    sections: [
      {
        id: "role",
        label: "Role (R)",
        placeholder: "Act as a senior marketing manager...",
      },
      {
        id: "action",
        label: "Action (A)",
        placeholder: "Draft a quarterly report email...",
      },
      {
        id: "context",
        label: "Context (C)",
        placeholder: "Q3 sales were up 20%, but Q4 looks slow...",
      },
      {
        id: "expectation",
        label: "Expectation (E)",
        placeholder: "Professional tone, bullet points for key metrics...",
      },
    ],
  },
  SPARK: {
    name: "SPARK",
    description: "Situation, Problem, Aspiration, Result, Kicker (Persuasive)",
    sections: [
      {
        id: "situation",
        label: "Situation (S)",
        placeholder: "Our website traffic is high but conversion is low...",
      },
      {
        id: "problem",
        label: "Problem (P)",
        placeholder: "Users drop off at the checkout page...",
      },
      {
        id: "aspiration",
        label: "Aspiration (A)",
        placeholder: "We want to increase checkout completion by 10%...",
      },
      {
        id: "result",
        label: "Result (R)",
        placeholder: "Suggest 5 UX improvements...",
      },
      {
        id: "kicker",
        label: "Kicker (K)",
        placeholder: "Focus on mobile users specifically...",
      },
    ],
  },
};

export default function AIPromptGeneratorTool() {
  const [framework, setFramework] = useState<keyof typeof frameworks>("CREATE");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [enhancing, setEnhancing] = useState(false);

  const handleInputChange = (sectionId: string, value: string) => {
    setInputs((prev) => ({ ...prev, [sectionId]: value }));
  };

  const generatePrompt = () => {
    const currentFramework = frameworks[framework];
    let prompt = "";

    // Build the prompt based on the framework structure
    currentFramework.sections.forEach((section) => {
      const value = inputs[section.id];
      if (value) {
        prompt += `**${section.label}:**\n${value}\n\n`;
      }
    });

    if (!prompt.trim()) {
      toast.error("Please fill in at least one section.");
      return;
    }

    setGeneratedPrompt(prompt.trim());
    toast.success("Prompt generated successfully!");
  };

  const handleEnhance = async () => {
    if (!generatedPrompt) return;
    setEnhancing(true);
    const result = await enhancePromptWithAI(
      generatedPrompt,
      frameworks[framework].name,
    );
    if (result.enhancedPrompt) {
      setGeneratedPrompt(result.enhancedPrompt);
      toast.success("Prompt enhanced by AI!");
    } else {
      toast.error(result.error || "Failed to enhance");
    }
    setEnhancing(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearInputs = () => {
    setInputs({});
    setGeneratedPrompt("");
    toast.info("Inputs cleared.");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <MagicCard
        className="p-8 border-border/50 shadow-2xl"
        gradientColor="rgba(124, 58, 237, 0.05)"
      >
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                AI Prompt Generator
              </h2>
              <p className="text-muted-foreground mt-2">
                Create high-quality AI prompts using proven frameworks like
                CREATE, APE, and RACE.
              </p>
            </div>
            <Select
              value={framework}
              onValueChange={(val) => {
                setFramework(val as keyof typeof frameworks);
                setInputs({});
                setGeneratedPrompt("");
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Framework" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(frameworks).map(([key, fw]) => (
                  <SelectItem key={key} value={key}>
                    {fw.name} Framework
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
            <h3 className="font-semibold text-primary mb-1">
              About {frameworks[framework].name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {frameworks[framework].description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {frameworks[framework].sections.map((section) => (
              <div key={section.id} className="space-y-2">
                <Label htmlFor={section.id} className="text-sm font-medium">
                  {section.label}
                </Label>
                <Textarea
                  id={section.id}
                  placeholder={section.placeholder}
                  value={inputs[section.id] || ""}
                  onChange={(e) =>
                    handleInputChange(section.id, e.target.value)
                  }
                  className="min-h-[100px] resize-none bg-background/50 focus:bg-background transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={generatePrompt}
              className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Prompt
            </Button>
            <Button variant="outline" onClick={clearInputs}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </MagicCard>

      {generatedPrompt && (
        <Card className="border-border/50 shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Generated Prompt</CardTitle>
              <CardDescription>
                Ready to copy and paste into ChatGPT, Claude, or Midjourney.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEnhance}
                disabled={enhancing}
                className="bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20 hover:text-blue-700 dark:border-blue-800 dark:text-blue-400"
              >
                {enhancing ? (
                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3 mr-2" />
                )}
                Enhance with AI
              </Button>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
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
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap leading-relaxed border border-border/50">
              {generatedPrompt}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

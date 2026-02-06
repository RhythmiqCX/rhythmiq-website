"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Printer, Copy, Check, NotebookPen } from "lucide-react";
import { toast } from "sonner";
import { generateNotes, NoteStyle } from "@/actions/tools/generate-notes";
import { checkUsageAction } from "@/actions/tools/check-usage";
import { useEffect } from "react";

const NOTE_STYLES: { value: NoteStyle; label: string; description: string }[] =
  [
    {
      value: "outline",
      label: "Structured Outline",
      description: "Hierarchical bullet points with clear headings.",
    },
    {
      value: "cornell",
      label: "Cornell Method",
      description:
        "Cues on the left, detailed notes on the right, summary at bottom.",
    },
    {
      value: "meeting",
      label: "Meeting Minutes",
      description: "Agenda, discussion points, decisions, and action items.",
    },
    {
      value: "simplify",
      label: "Simplify (ELI5)",
      description: "Complex topics explained simply with analogies.",
    },
    {
      value: "action-items",
      label: "Action Items Only",
      description: "Extracts only tasks and to-dos from the text.",
    },
  ];

export default function AiNotesGeneratorTool() {
  const [content, setContent] = useState("");
  const [style, setStyle] = useState<NoteStyle>("outline");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState<{
    content: string;
    title: string;
  } | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    checkUsageAction("ai-notes-generator").then((res) =>
      setIsLimitReached(res.isLimitReached),
    );
  }, []);

  const handleGenerate = async () => {
    if (!content.trim() || content.length < 50) {
      toast.error("Please enter at least 50 characters of text to summarize.");
      return;
    }

    setIsGenerating(true);
    setGeneratedNotes(null);

    try {
      const result = await generateNotes({
        content,
        style,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        setGeneratedNotes({ content: result.content, title: result.title });
        toast.success("Notes generated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
      checkUsageAction("ai-notes-generator").then((res) =>
        setIsLimitReached(res.isLimitReached),
      );
    }
  };

  const handleCopy = () => {
    if (!generatedNotes) return;

    // Create temp div to strip HTML for plain text copy
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = generatedNotes.content;
    const plainText = tempDiv.innerText || tempDiv.textContent || "";

    const clipboardItem = new ClipboardItem({
      "text/html": new Blob([generatedNotes.content], { type: "text/html" }),
      "text/plain": new Blob([plainText], { type: "text/plain" }),
    });
    navigator.clipboard.write([clipboardItem]).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
      toast.success("Copied to clipboard!");
    });
  };

  const handlePrint = () => {
    if (!generatedNotes) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <html>
          <head>
            <title>${generatedNotes.title}</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; color: #000; }
              h1 { font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #ccc; padding-bottom: 10px; }
              h2 { font-size: 20px; margin-top: 24px; color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px; }
              h3 { font-size: 18px; margin-top: 18px; color: #444; }
              p { margin-bottom: 10px; }
              ul, ol { margin-bottom: 10px; padding-left: 20px; }
              li { margin-bottom: 5px; }
              strong { color: #000; }
            </style>
          </head>
          <body>
            <h1>${generatedNotes.title}</h1>
            ${generatedNotes.content}
          </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full min-h-[600px]">
      {/* LEFT: Input Area */}
      <div className="flex flex-col gap-6">
        <Card className="border-border/50 shadow-sm h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">Content Input</CardTitle>
            <CardDescription>
              Paste your lecture, transcript, or raw text here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-1 flex flex-col">
            <div className="space-y-2">
              <Label>Note Style</Label>
              <Select
                value={style}
                onValueChange={(val) => setStyle(val as NoteStyle)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  {NOTE_STYLES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                {NOTE_STYLES.find((s) => s.value === style)?.description}
              </p>
            </div>

            <div className="space-y-2 flex-1 flex flex-col">
              <Label htmlFor="content">Raw Text</Label>
              <Textarea
                id="content"
                placeholder="Paste your content here..."
                className="flex-1 min-h-[200px] resize-none font-mono text-sm leading-relaxed"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground text-right">
                {content.length} characters
              </p>
            </div>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
              disabled={isGenerating || content.length < 50 || isLimitReached}
              onClick={handleGenerate}
            >
              {isLimitReached ? (
                <>Limit Reached (5/5)</>
              ) : isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Notes...
                </>
              ) : (
                <>
                  <NotebookPen className="w-4 h-4 mr-2" />
                  Generate Notes
                </>
              )}
            </Button>
            {isLimitReached && (
              <p className="text-xs text-red-500 text-center mt-2">
                You have reached your daily limit of 5 generations for this
                tool.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT: Output Area */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-semibold">Your Notes</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              disabled={!generatedNotes}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print (PDF)
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              disabled={!generatedNotes}
            >
              {hasCopied ? (
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
        </div>

        <Card className="flex-1 border-border/50 bg-card overflow-hidden min-h-[500px] flex flex-col">
          {generatedNotes ? (
            <div className="flex-1 p-8 overflow-y-auto max-h-[700px] prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-strong:font-bold">
              <div
                dangerouslySetInnerHTML={{ __html: generatedNotes.content }}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-muted/10 p-8 text-center">
              <NotebookPen className="w-16 h-16 mb-4 opacity-20 text-foreground" />
              <h4 className="text-lg font-semibold mb-2 text-foreground">
                No Notes Yet
              </h4>
              <p className="max-w-[300px] text-muted-foreground/80">
                Paste your content on the left and select a style to generate
                clear, structured notes.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

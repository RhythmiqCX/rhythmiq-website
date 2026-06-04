"use client";

import { useState, useMemo, useCallback } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Copy,
  Download,
  Trash2,
  FileText,
  Type,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Wand2,
  RefreshCw,
  Sparkles,
  MessageSquare,
  GraduationCap,
  Briefcase,
  Palette,
  Users,
  ArrowLeftRight,
  ListChecks,
} from "lucide-react";
import { humanizeContent } from "@/actions/tools/humanize-content";

// ─── Types ────────────────────────────────────────────────────────────────
type ToneOption =
  | "casual"
  | "professional"
  | "academic"
  | "creative"
  | "conversational";

interface HumanizeResult {
  humanizedText: string;
  changesSummary: string[];
  originalWordCount: number;
  humanizedWordCount: number;
}

const TONE_OPTIONS: Array<{
  value: ToneOption;
  label: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    value: "conversational",
    label: "Conversational",
    description: "Friendly, natural, direct",
    icon: <MessageSquare className="w-4 h-4" />,
  },
  {
    value: "casual",
    label: "Casual",
    description: "Relaxed, warm, informal",
    icon: <Users className="w-4 h-4" />,
  },
  {
    value: "professional",
    label: "Professional",
    description: "Polished, clear, authoritative",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    value: "academic",
    label: "Academic",
    description: "Scholarly, precise, structured",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    value: "creative",
    label: "Creative",
    description: "Vivid, expressive, unique",
    icon: <Palette className="w-4 h-4" />,
  },
];

// ─── Component ────────────────────────────────────────────────────────────
export default function AIHumanizerTool() {
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState<ToneOption>("conversational");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<HumanizeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  // Live stats
  const inputStats = useMemo(() => {
    const words = inputText.split(/\s+/).filter((w) => w.length > 0);
    return {
      wordCount: words.length,
      charCount: inputText.length,
    };
  }, [inputText]);

  // ─── Handlers ──────────────────────────────────────────────────────────
  const handleHumanize = useCallback(async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const response = await humanizeContent({ text: inputText, tone });

      if (response.error) {
        setError(response.error);
        setIsProcessing(false);
        return;
      }

      setResult({
        humanizedText: response.humanizedText,
        changesSummary: response.changesSummary,
        originalWordCount: response.originalWordCount,
        humanizedWordCount: response.humanizedWordCount,
      });
    } catch {
      setError("Failed to humanize content. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, tone]);

  const handleClear = useCallback(() => {
    setInputText("");
    setResult(null);
    setError(null);
  }, []);

  const handleCopyInput = useCallback(async () => {
    await navigator.clipboard.writeText(inputText);
    setCopiedInput(true);
    setTimeout(() => setCopiedInput(false), 2000);
  }, [inputText]);

  const handleCopyOutput = useCallback(async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.humanizedText);
    setCopiedOutput(true);
    setTimeout(() => setCopiedOutput(false), 2000);
  }, [result]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const blob = new Blob([result.humanizedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "humanized-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  const handleUseAsInput = useCallback(() => {
    if (!result) return;
    setInputText(result.humanizedText);
    setResult(null);
  }, [result]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Controls Bar */}
      <MagicCard
        className="p-6 border border-ink/10 bg-white shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]"
        gradientColor="rgba(232, 93, 47, 0.06)"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div className="flex-1 space-y-2 w-full sm:w-auto">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <Wand2 className="w-4 h-4 text-coral" />
              Writing Tone
            </Label>
            <Select
              value={tone}
              onValueChange={(v) => setTone(v as ToneOption)}
            >
              <SelectTrigger className="bg-paper w-full sm:w-[280px]">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {TONE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className="flex items-center gap-2">
                      {opt.icon}
                      <span>{opt.label}</span>
                      <span className="text-muted-foreground text-xs ml-1">
                        — {opt.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleHumanize}
            disabled={!inputText.trim() || isProcessing}
            className="h-10 px-6 btn btn-accent justify-center gap-2 transition-all duration-300 w-full sm:w-auto"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Humanizing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Humanize Text
              </>
            )}
          </Button>
        </div>
      </MagicCard>

      {/* Error Banner */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F6DCD2] border border-[#C9461F]/30">
          <AlertTriangle className="w-4 h-4 text-[#C9461F] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-[#C9461F]">{error}</p>
        </div>
      )}

      {/* Editor Grid — Side by Side */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Input */}
        <MagicCard
          className="p-6 border border-ink/10 bg-white shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]"
          gradientColor="rgba(232, 93, 47, 0.06)"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-coralSoft rounded-lg text-coral">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-ink">Original Text</h2>
                <Badge variant="secondary" className="text-xs">
                  AI Content
                </Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyInput}
                  disabled={!inputText}
                  className="h-8 px-2"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="ml-1 text-xs">
                    {copiedInput ? "Copied!" : "Copy"}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  disabled={!inputText}
                  className="h-8 px-2 text-[#C9461F] hover:text-[#C9461F]/80"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="ml-1 text-xs">Clear</span>
                </Button>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setResult(null);
                  setError(null);
                }}
                placeholder="Paste your AI-generated text here...

Example: In today's rapidly evolving digital landscape, it is important to note that artificial intelligence plays a crucial role in transforming how we approach content creation. Furthermore, leveraging cutting-edge technology enables organizations to optimize their workflows and enhance operational efficiency."
                className="w-full min-h-[400px] max-h-[600px] p-4 rounded-xl border border-ink/10 bg-paper text-ink text-[14px] leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral/50 transition-all placeholder:text-ink3"
                spellCheck={false}
              />
              <div className="absolute bottom-3 right-4 text-xs text-muted-foreground/70">
                {inputStats.wordCount} words · {inputStats.charCount} chars
              </div>
            </div>
          </div>
        </MagicCard>

        {/* Right: Output */}
        <MagicCard
          className="p-6 border border-ink/10 bg-white shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]"
          gradientColor="rgba(232, 93, 47, 0.06)"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#E2F1E8] rounded-lg text-[#1F7A4D]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-ink">Humanized Text</h2>
                <Badge
                  variant="secondary"
                  className="text-xs bg-[#E2F1E8] text-[#1F7A4D] border-[#1F7A4D]/20"
                >
                  Natural
                </Badge>
              </div>
              {result && (
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyOutput}
                    className="h-8 px-2"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span className="ml-1 text-xs">
                      {copiedOutput ? "Copied!" : "Copy"}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDownload}
                    className="h-8 px-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="ml-1 text-xs">Save</span>
                  </Button>
                </div>
              )}
            </div>

            <div className="relative">
              {result ? (
                <div className="w-full min-h-[400px] max-h-[600px] overflow-y-auto p-4 rounded-xl border border-[#1F7A4D]/20 bg-[#E2F1E8]/40 text-ink text-[14px] leading-relaxed">
                  {result.humanizedText}
                </div>
              ) : (
                <div className="w-full min-h-[400px] p-4 rounded-xl border border-ink/10 bg-paper flex flex-col items-center justify-center text-center gap-4">
                  {isProcessing ? (
                    <>
                      <div className="w-12 h-12 border-[3px] border-coral/20 border-t-coral rounded-full animate-spin" />
                      <div className="space-y-1">
                        <p className="font-medium text-ink">
                          Humanizing your text...
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Analyzing patterns and rewriting naturally
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-paper2 flex items-center justify-center">
                        <Wand2 className="w-7 h-7 text-ink3" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-muted-foreground">
                          Humanized output will appear here
                        </p>
                        <p className="text-sm text-muted-foreground/70">
                          Paste your AI text on the left and click Humanize
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
              {result && (
                <div className="absolute bottom-3 right-4 text-xs text-muted-foreground/70">
                  {result.humanizedWordCount} words
                </div>
              )}
            </div>

            {/* Re-humanize button */}
            {result && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUseAsInput}
                  className="gap-2 flex-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Re-humanize (use output as input)
                </Button>
              </div>
            )}
          </div>
        </MagicCard>
      </div>

      {/* Results Panel */}
      {result && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Word Count Comparison */}
          <Card className="border border-ink/10 bg-white shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-coralSoft rounded-lg text-coral">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
                <p className="font-semibold text-ink">Word Count</p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-ink">
                    {result.originalWordCount}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Original</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground/50" />
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-[#1F7A4D]">
                    {result.humanizedWordCount}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Humanized
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-ink/10 text-center">
                <p className="text-xs text-muted-foreground">
                  {result.humanizedWordCount > result.originalWordCount
                    ? `+${result.humanizedWordCount - result.originalWordCount} words added`
                    : result.humanizedWordCount < result.originalWordCount
                      ? `${result.originalWordCount - result.humanizedWordCount} words reduced`
                      : "Same word count"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tone Applied */}
          <Card className="border border-ink/10 bg-white shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-coralSoft rounded-lg text-coral">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <p className="font-semibold text-ink">Tone Applied</p>
              </div>
              <div className="flex items-center gap-3">
                {TONE_OPTIONS.find((t) => t.value === tone)?.icon}
                <div>
                  <p className="font-semibold text-lg capitalize text-ink">
                    {tone}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {TONE_OPTIONS.find((t) => t.value === tone)?.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-ink/10">
                <Badge
                  variant="secondary"
                  className="bg-[#E2F1E8] text-[#1F7A4D] border-[#1F7A4D]/20"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Applied Successfully
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Changes Summary */}
          <Card className="border border-ink/10 bg-white shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-coralSoft rounded-lg text-coral">
                  <ListChecks className="w-5 h-5" />
                </div>
                <p className="font-semibold text-ink">Changes Made</p>
              </div>
              <div className="space-y-2">
                {result.changesSummary.map((change, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-[#1F7A4D] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">
                      {change}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* How It Works */}
      {!result && !isProcessing && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "1",
              title: "Paste Text",
              desc: "Paste your AI-generated content",
              icon: <FileText className="w-5 h-5" />,
              color: "text-coral",
              bg: "bg-coralSoft",
            },
            {
              step: "2",
              title: "Choose Tone",
              desc: "Select your preferred writing tone",
              icon: <Wand2 className="w-5 h-5" />,
              color: "text-coral",
              bg: "bg-coralSoft",
            },
            {
              step: "3",
              title: "Humanize",
              desc: "AI rewrites with natural patterns",
              icon: <Sparkles className="w-5 h-5" />,
              color: "text-coral",
              bg: "bg-coralSoft",
            },
            {
              step: "4",
              title: "Copy & Use",
              desc: "Use your human-like text anywhere",
              icon: <Copy className="w-5 h-5" />,
              color: "text-coral",
              bg: "bg-coralSoft",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="border border-ink/10 bg-white shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)] hover:shadow-[0_18px_30px_-16px_rgba(25,24,20,0.28)] transition-shadow"
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                    {item.icon}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Step {item.step}
                  </Badge>
                </div>
                <h3 className="font-semibold mb-1 text-ink">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo, useCallback } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Bot,
  User,
  Copy,
  Download,
  Trash2,
  ScanSearch,
  FileText,
  Type,
  Clock,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Zap,
  AlertTriangle,
  CheckCircle,
  Brain,
  Sparkles,
  TrendingUp,
  Activity,
  Fingerprint,
  Eye,
} from "lucide-react";
import { detectAIContent } from "@/actions/tools/detect-ai-content";

// ─── Types ────────────────────────────────────────────────────────────────
interface SentenceResult {
  sentence: string;
  aiProbability: number;
  riskLevel: "low" | "moderate" | "high";
  flags: string[];
}

interface AnalysisResult {
  overallAiScore: number;
  overallHumanScore: number;
  riskLevel: "low" | "moderate" | "high";
  summary: string;
  sentenceResults: SentenceResult[];
  detectionMetrics: {
    perplexityIndicator: number;
    burstinessIndicator: number;
    vocabularyRichness: number;
    sentenceUniformity: number;
  };
  stats: TextStats;
}

interface TextStats {
  wordCount: number;
  charCount: number;
  sentenceCount: number;
  paragraphCount: number;
  avgWordsPerSentence: number;
  readingTime: string;
}

// ─── Text Stats Calculator ───────────────────────────────────────────────
function calculateStats(text: string): TextStats {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;
  const charCount = text.length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 5);
  const sentenceCount = Math.max(sentences.length, 1);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const paragraphCount = Math.max(paragraphs.length, 1);
  const avgWordsPerSentence = wordCount / sentenceCount;
  const readingMinutes = Math.ceil(wordCount / 200);
  const readingTime = readingMinutes <= 1 ? "~1 min" : `~${readingMinutes} min`;

  return {
    wordCount,
    charCount,
    sentenceCount,
    paragraphCount,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    readingTime,
  };
}

// ─── Component ────────────────────────────────────────────────────────────
export default function AIPlagiarismDetectorTool() {
  const [text, setText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [expandedSentence, setExpandedSentence] = useState<number | null>(null);
  const [showAllSentences, setShowAllSentences] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Live text stats
  const liveStats = useMemo(() => {
    const words = text.split(/\s+/).filter((w) => w.length > 0);
    return {
      wordCount: words.length,
      charCount: text.length,
    };
  }, [text]);

  // ─── Handlers ──────────────────────────────────────────────────────────
  const handleScan = useCallback(async () => {
    if (!text.trim()) return;
    setIsScanning(true);
    setError(null);
    setExpandedSentence(null);
    setShowAllSentences(false);
    setResult(null);

    try {
      const response = await detectAIContent({ text });

      if (response.error) {
        setError(response.error);
        setIsScanning(false);
        return;
      }

      const stats = calculateStats(text);

      setResult({
        overallAiScore: response.overallAiScore,
        overallHumanScore: response.overallHumanScore,
        riskLevel: response.riskLevel,
        summary: response.summary,
        sentenceResults: response.sentenceResults,
        detectionMetrics: response.detectionMetrics,
        stats,
      });
    } catch {
      setError("Failed to analyze content. Please try again.");
    } finally {
      setIsScanning(false);
    }
  }, [text]);

  const handleClear = useCallback(() => {
    setText("");
    setResult(null);
    setExpandedSentence(null);
    setShowAllSentences(false);
    setError(null);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    const report = `AI Plagiarism Detection Report
================================
AI Probability: ${result.overallAiScore}%
Human Probability: ${result.overallHumanScore}%
Risk Level: ${result.riskLevel.toUpperCase()}

Summary: ${result.summary}

Detection Metrics:
- Perplexity Indicator: ${result.detectionMetrics.perplexityIndicator}
- Burstiness Indicator: ${result.detectionMetrics.burstinessIndicator}
- Vocabulary Richness: ${result.detectionMetrics.vocabularyRichness}
- Sentence Uniformity: ${result.detectionMetrics.sentenceUniformity}

Text Statistics:
- Words: ${result.stats.wordCount}
- Characters: ${result.stats.charCount}
- Sentences: ${result.stats.sentenceCount}
- Paragraphs: ${result.stats.paragraphCount}
- Avg Words/Sentence: ${result.stats.avgWordsPerSentence}
- Reading Time: ${result.stats.readingTime}

Sentence Analysis:
${result.sentenceResults
  .map(
    (s) =>
      `[${s.riskLevel.toUpperCase()} - ${s.aiProbability}%] ${s.sentence}\n  Flags: ${s.flags.join("; ")}`,
  )
  .join("\n\n")}
`;
    await navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const report = `AI Plagiarism Detection Report
================================
Generated: ${new Date().toLocaleString()}
Powered by: Rhythmiq AI Detection Engine

OVERALL RESULTS
───────────────
AI Probability:      ${result.overallAiScore}%
Human Probability:   ${result.overallHumanScore}%
Risk Level:          ${result.riskLevel.toUpperCase()}

SUMMARY
───────────────
${result.summary}

DETECTION METRICS
───────────────
Perplexity Indicator:  ${result.detectionMetrics.perplexityIndicator} (lower = more predictable/AI-like)
Burstiness Indicator:  ${result.detectionMetrics.burstinessIndicator} (lower = more uniform/AI-like)
Vocabulary Richness:   ${result.detectionMetrics.vocabularyRichness}%
Sentence Uniformity:   ${result.detectionMetrics.sentenceUniformity}% (higher = more uniform/AI-like)

TEXT STATISTICS
───────────────
Words:               ${result.stats.wordCount}
Characters:          ${result.stats.charCount}
Sentences:           ${result.stats.sentenceCount}
Paragraphs:          ${result.stats.paragraphCount}
Avg Words/Sentence:  ${result.stats.avgWordsPerSentence}
Reading Time:        ${result.stats.readingTime}

SENTENCE-LEVEL ANALYSIS
───────────────
${result.sentenceResults
  .map(
    (s, i) =>
      `${i + 1}. [${s.riskLevel.toUpperCase()} ${s.aiProbability}%] ${s.sentence}\n   Flags: ${s.flags.join("; ")}\n`,
  )
  .join("\n")}

DISCLAIMER
───────────────
AI detection is probabilistic and may not be 100% accurate.
Results should be used as guidance rather than definitive proof.
`;
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-plagiarism-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  // ─── Helpers ───────────────────────────────────────────────────────────
  const getRiskColor = (risk: "low" | "moderate" | "high") => {
    switch (risk) {
      case "low":
        return "text-emerald-500";
      case "moderate":
        return "text-amber-500";
      case "high":
        return "text-red-500";
    }
  };

  const getRiskBg = (risk: "low" | "moderate" | "high") => {
    switch (risk) {
      case "low":
        return "bg-emerald-500/10 border-emerald-500/30";
      case "moderate":
        return "bg-amber-500/10 border-amber-500/30";
      case "high":
        return "bg-red-500/10 border-red-500/30";
    }
  };

  const getRiskIcon = (risk: "low" | "moderate" | "high") => {
    switch (risk) {
      case "low":
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case "moderate":
        return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      case "high":
        return <ShieldX className="w-5 h-5 text-red-500" />;
    }
  };

  const displayedSentences = result
    ? showAllSentences
      ? result.sentenceResults
      : result.sentenceResults.slice(0, 10)
    : [];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Column: Editor — 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          <MagicCard
            className="p-8 border-border/50 shadow-2xl"
            gradientColor="rgba(239, 68, 68, 0.05)"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-500/10 rounded-xl text-rose-500">
                    <ScanSearch className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Content Scanner</h2>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {result && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="gap-2"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copied ? "Copied!" : "Copy Report"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        className="gap-2"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    disabled={!text}
                    className="gap-2 text-red-400 hover:text-red-300 hover:border-red-500/40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground text-sm">
                Paste your text below and click <strong>Scan Content</strong> to
                detect AI-generated patterns using our AI-powered analysis
                engine.
              </p>

              {/* Error banner */}
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setResult(null);
                    setError(null);
                  }}
                  placeholder="Paste your content here to scan for AI-generated text...

Example: In today's rapidly evolving digital landscape, it is important to note that artificial intelligence has fundamentally transformed the way we approach content creation. Furthermore, the advent of large language models has ushered in a new paradigm shift in how we communicate and produce written content."
                  className="w-full min-h-[350px] max-h-[600px] p-5 rounded-xl border border-border/60 bg-background/60 text-foreground text-[15px] leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500/50 transition-all placeholder:text-muted-foreground/50"
                  spellCheck={false}
                />
                <div className="absolute bottom-3 right-4 text-xs text-muted-foreground/70">
                  {liveStats.charCount.toLocaleString()} characters
                </div>
              </div>

              {/* Scan Button */}
              <Button
                onClick={handleScan}
                disabled={!text.trim() || isScanning}
                className="w-full h-12 text-base font-semibold gap-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-lg shadow-rose-500/25 transition-all duration-300"
                size="lg"
              >
                {isScanning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Scan Content
                  </>
                )}
              </Button>

              {/* Live Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/30">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Words</p>
                    <p className="font-semibold text-sm">
                      {liveStats.wordCount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/30">
                  <Type className="w-4 h-4 text-violet-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Characters</p>
                    <p className="font-semibold text-sm">
                      {liveStats.charCount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/30">
                  <Brain className="w-4 h-4 text-rose-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="font-semibold text-sm">
                      {isScanning
                        ? "Scanning..."
                        : result
                          ? "Complete"
                          : "Ready"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/30">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Read Time</p>
                    <p className="font-semibold text-sm">
                      {result
                        ? result.stats.readingTime
                        : liveStats.wordCount > 0
                          ? `~${Math.ceil(liveStats.wordCount / 200)} min`
                          : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </MagicCard>
        </div>

        {/* Right Column: Results — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Score Card */}
          <Card className="border-border/40 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-bl-full -z-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/5 rounded-tr-full -z-10" />
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    AI Detection Score
                  </p>
                  {result ? (
                    <>
                      <h3
                        className={`text-5xl font-bold tracking-tight ${getRiskColor(
                          result.riskLevel,
                        )}`}
                      >
                        {result.overallAiScore}
                        <span className="text-xl text-muted-foreground font-normal">
                          %
                        </span>
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        likely AI-generated
                      </p>
                    </>
                  ) : (
                    <h3 className="text-5xl font-bold tracking-tight text-muted-foreground/30">
                      —
                    </h3>
                  )}
                </div>
                <div
                  className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                    result
                      ? result.riskLevel === "high"
                        ? "border-red-500/50"
                        : result.riskLevel === "moderate"
                          ? "border-amber-500/50"
                          : "border-emerald-500/50"
                      : "border-border/30"
                  }`}
                >
                  {result ? (
                    getRiskIcon(result.riskLevel)
                  ) : (
                    <ScanSearch className="w-8 h-8 text-muted-foreground/30" />
                  )}
                </div>
              </div>
              {result && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Risk Level</span>
                    <Badge
                      className={`${getRiskBg(result.riskLevel)} ${getRiskColor(
                        result.riskLevel,
                      )} border uppercase text-xs tracking-wider font-semibold`}
                    >
                      {result.riskLevel}
                    </Badge>
                  </div>
                  <Progress value={result.overallAiScore} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> Human
                    </span>
                    <span className="flex items-center gap-1">
                      AI <Bot className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI vs Human Split */}
          {result && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-red-400 font-medium">
                    AI Probability
                  </span>
                </div>
                <p className="text-3xl font-bold text-red-500">
                  {result.overallAiScore}%
                </p>
              </div>
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-emerald-400 font-medium">
                    Human Probability
                  </span>
                </div>
                <p className="text-3xl font-bold text-emerald-500">
                  {result.overallHumanScore}%
                </p>
              </div>
            </div>
          )}

          {/* AI Summary */}
          {result && result.summary && (
            <Card className="border-border/40 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                    <Brain className="w-5 h-5" />
                  </div>
                  <p className="font-semibold">AI Analysis Summary</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.summary}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Detection Metrics */}
          {result && (
            <Card className="border-border/40 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <p className="font-semibold">Detection Metrics</p>
                </div>

                <div className="space-y-4 text-sm">
                  {/* Perplexity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-blue-500" />
                        Perplexity
                      </span>
                      <span className="font-medium">
                        {result.detectionMetrics.perplexityIndicator}
                      </span>
                    </div>
                    <Progress
                      value={result.detectionMetrics.perplexityIndicator}
                      className="h-1.5"
                    />
                    <p className="text-[11px] text-muted-foreground/70">
                      Lower = more predictable (AI-like)
                    </p>
                  </div>

                  {/* Burstiness */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                        Burstiness
                      </span>
                      <span className="font-medium">
                        {result.detectionMetrics.burstinessIndicator}
                      </span>
                    </div>
                    <Progress
                      value={result.detectionMetrics.burstinessIndicator}
                      className="h-1.5"
                    />
                    <p className="text-[11px] text-muted-foreground/70">
                      Lower = more uniform sentence length (AI-like)
                    </p>
                  </div>

                  {/* Vocabulary Richness */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                        Vocabulary Richness
                      </span>
                      <span className="font-medium">
                        {result.detectionMetrics.vocabularyRichness}%
                      </span>
                    </div>
                    <Progress
                      value={result.detectionMetrics.vocabularyRichness}
                      className="h-1.5"
                    />
                  </div>

                  {/* Uniformity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Fingerprint className="w-3.5 h-3.5 text-rose-500" />
                        Sentence Uniformity
                      </span>
                      <span className="font-medium">
                        {result.detectionMetrics.sentenceUniformity}%
                      </span>
                    </div>
                    <Progress
                      value={result.detectionMetrics.sentenceUniformity}
                      className="h-1.5"
                    />
                    <p className="text-[11px] text-muted-foreground/70">
                      Higher = more uniform (AI-like)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Text Statistics */}
          {result && (
            <Card className="border-border/40 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <p className="font-semibold">Text Statistics</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Words</span>
                    <span className="font-medium">
                      {result.stats.wordCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Characters</span>
                    <span className="font-medium">
                      {result.stats.charCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sentences</span>
                    <span className="font-medium">
                      {result.stats.sentenceCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paragraphs</span>
                    <span className="font-medium">
                      {result.stats.paragraphCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Avg Words/Sentence
                    </span>
                    <span className="font-medium">
                      {result.stats.avgWordsPerSentence}
                    </span>
                  </div>
                  <div className="border-t border-border/40 pt-3 flex justify-between">
                    <span className="text-muted-foreground">Reading Time</span>
                    <span className="font-semibold">
                      {result.stats.readingTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Sentence-Level Analysis Panel */}
      {result && result.sentenceResults.length > 0 && (
        <MagicCard
          className="p-8 border-border/50 shadow-2xl"
          gradientColor="rgba(239, 68, 68, 0.03)"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Eye className="w-6 h-6 text-rose-500" />
                Sentence-Level Analysis
                <Badge variant="secondary" className="text-sm">
                  {result.sentenceResults.length} sentences
                </Badge>
              </h2>

              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  Low Risk
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                  Moderate
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  High Risk
                </span>
              </div>
            </div>

            {/* Sentence cards */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {displayedSentences.map((analysis, idx) => {
                const isExpanded = expandedSentence === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border transition-all duration-200 hover:shadow-md ${getRiskBg(
                      analysis.riskLevel,
                    )}`}
                  >
                    <button
                      onClick={() =>
                        setExpandedSentence(isExpanded ? null : idx)
                      }
                      className="flex items-start gap-3 p-4 w-full text-left"
                    >
                      {/* Risk indicator */}
                      <div className="flex flex-col items-center gap-1 min-w-[48px]">
                        <span
                          className={`text-lg font-bold ${getRiskColor(
                            analysis.riskLevel,
                          )}`}
                        >
                          {analysis.aiProbability}%
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          AI
                        </span>
                      </div>

                      {/* Sentence text */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                          {analysis.sentence}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className={`text-[10px] uppercase tracking-wider px-2 py-0 ${
                              analysis.riskLevel === "high"
                                ? "border-red-500/40 text-red-400"
                                : analysis.riskLevel === "moderate"
                                  ? "border-amber-500/40 text-amber-400"
                                  : "border-emerald-500/40 text-emerald-400"
                            }`}
                          >
                            {analysis.riskLevel} risk
                          </Badge>
                          {analysis.flags[0] !==
                            "No significant AI indicators detected" && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-2 py-0"
                            >
                              {analysis.flags.length} flag
                              {analysis.flags.length !== 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Expand */}
                      <div className="text-muted-foreground mt-1">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 space-y-3 animate-in slide-in-from-top-1 duration-200">
                        <div className="pl-[60px] space-y-3">
                          {/* Full sentence */}
                          <div>
                            <p className="text-xs text-muted-foreground mb-1 font-medium">
                              Full Sentence:
                            </p>
                            <p className="text-sm bg-background/60 border border-border/40 rounded-lg px-3 py-2 text-foreground leading-relaxed">
                              {analysis.sentence}
                            </p>
                          </div>

                          {/* Flags */}
                          <div>
                            <p className="text-xs text-muted-foreground mb-1.5 font-medium">
                              Detection Flags:
                            </p>
                            <div className="space-y-1.5">
                              {analysis.flags.map((flag, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 text-xs"
                                >
                                  {flag ===
                                  "No significant AI indicators detected" ? (
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                  ) : (
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                                  )}
                                  <span className="text-muted-foreground">
                                    {flag}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Show more / less */}
              {result.sentenceResults.length > 10 && (
                <button
                  onClick={() => setShowAllSentences(!showAllSentences)}
                  className="w-full py-3 text-sm font-medium text-rose-500 hover:text-rose-400 transition-colors flex items-center justify-center gap-2"
                >
                  {showAllSentences ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show All {result.sentenceResults.length} Sentences
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/30">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Disclaimer:</strong> AI detection is probabilistic and
                may not be 100% accurate. This tool uses advanced AI analysis
                including perplexity, burstiness, and stylometric pattern
                recognition. Results should be used as guidance rather than
                definitive proof.
              </p>
            </div>
          </div>
        </MagicCard>
      )}
    </div>
  );
}

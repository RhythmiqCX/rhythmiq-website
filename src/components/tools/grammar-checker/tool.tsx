"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Copy,
  Download,
  Trash2,
  SpellCheck,
  BookOpen,
  Type,
  Clock,
  BarChart3,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  FileText,
  Zap,
  Eye,
  PenLine,
} from "lucide-react";

interface GrammarIssue {
  id: string;
  type: "grammar" | "spelling" | "punctuation" | "style";
  severity: "error" | "warning" | "suggestion";
  message: string;
  context: string;
  suggestion: string;
  startIndex: number;
  endIndex: number;
  rule: string;
}

interface TextStats {
  wordCount: number;
  charCount: number;
  charCountNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: string;
  fleschScore: number;
  fleschLabel: string;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
}

// ─── Grammar Rules Engine ────────────────────────────────────────────────

// Common misspellings dictionary
const COMMON_MISSPELLINGS: Record<string, string> = {
  teh: "the",
  adn: "and",
  taht: "that",
  wiht: "with",
  thier: "their",
  recieve: "receive",
  untill: "until",
  occured: "occurred",
  seperate: "separate",
  definately: "definitely",
  accomodate: "accommodate",
  occurence: "occurrence",
  neccessary: "necessary",
  succesful: "successful",
  goverment: "government",
  enviroment: "environment",
  wich: "which",
  becuase: "because",
  beleive: "believe",
  acheive: "achieve",
  calender: "calendar",
  carribean: "Caribbean",
  cemetary: "cemetery",
  collegue: "colleague",
  comming: "coming",
  committment: "commitment",
  concious: "conscious",
  curiousity: "curiosity",
  dissapoint: "disappoint",
  embarass: "embarrass",
  existance: "existence",
  foriegn: "foreign",
  freind: "friend",
  gaurd: "guard",
  happend: "happened",
  ignorence: "ignorance",
  independant: "independent",
  knowlege: "knowledge",
  labratory: "laboratory",
  liason: "liaison",
  maintainance: "maintenance",
  manuever: "maneuver",
  medeval: "medieval",
  millenium: "millennium",
  mischievious: "mischievous",
  noticable: "noticeable",
  parliment: "parliament",
  persistant: "persistent",
  playwrite: "playwright",
  posession: "possession",
  priveledge: "privilege",
  pronounciation: "pronunciation",
  publically: "publicly",
  recomend: "recommend",
  refrence: "reference",
  relevent: "relevant",
  religous: "religious",
  resistence: "resistance",
  rythm: "rhythm",
  sentance: "sentence",
  sieze: "seize",
  suprise: "surprise",
  tommorow: "tomorrow",
  tounge: "tongue",
  truely: "truly",
  tyrany: "tyranny",
  wierd: "weird",
  writting: "writing",
  alot: "a lot",
  arguement: "argument",
  begining: "beginning",
  bussiness: "business",
  completly: "completely",
  diffrent: "different",
  dissapear: "disappear",
  excercise: "exercise",
  familar: "familiar",
  grammer: "grammar",
  humourous: "humorous",
  imediately: "immediately",
  inteligence: "intelligence",
  judgement: "judgment",
  liesure: "leisure",
  libary: "library",
  lisense: "license",
  mispell: "misspell",
  naturaly: "naturally",
  ocasion: "occasion",
  paralel: "parallel",
  peice: "piece",
  percieve: "perceive",
  prefered: "preferred",
  questionaire: "questionnaire",
  restaraunt: "restaurant",
  reciept: "receipt",
  scedule: "schedule",
  sargent: "sergeant",
  similer: "similar",
  speach: "speech",
  strenght: "strength",
  succedd: "succeed",
  tendancy: "tendency",
  threshhold: "threshold",
  vaccuum: "vacuum",
  visable: "visible",
  wether: "whether",
};

// Confused word pairs
const CONFUSED_WORDS: Array<{
  pattern: RegExp;
  message: string;
  suggestion: string;
  rule: string;
}> = [
  {
    pattern:
      /\btheir\s+(is|are|was|were|has|have|had|will|would|can|could|should|shall|may|might)\b/gi,
    message:
      '"their" is possessive. Did you mean "there" (location/existence)?',
    suggestion: "there",
    rule: "their/there confusion",
  },
  {
    pattern:
      /\byour\s+(welcome|right|wrong|correct|the\s+best|amazing|awesome|great|welcome)\b/gi,
    message: '"your" is possessive. Did you mean "you\'re" (you are)?',
    suggestion: "you're",
    rule: "your/you're confusion",
  },
  {
    pattern:
      /\bits\s+(a\s+)?(good|great|time|important|necessary|clear|obvious|possible)\b/gi,
    message: 'Check if "its" (possessive) should be "it\'s" (it is).',
    suggestion: "it's",
    rule: "its/it's confusion",
  },
  {
    pattern: /\bthen\b(?=\s+(?:expected|anticipated|planned))/gi,
    message: '"then" is for time. Did you mean "than" (comparison)?',
    suggestion: "than",
    rule: "then/than confusion",
  },
  {
    pattern: /\beffect\b(?=\s+(?:the|a|an|your|my|our|their|his|her))/gi,
    message:
      '"effect" is typically a noun. Did you mean "affect" (to influence)?',
    suggestion: "affect",
    rule: "affect/effect confusion",
  },
  {
    pattern:
      /\bto\s+(much|many|few|little|often|late|early|far|long|short)\b/gi,
    message: 'Did you mean "too" (excessively/also)?',
    suggestion: "too",
    rule: "to/too confusion",
  },
  {
    pattern:
      /\blose\s+(the\s+)?(game|match|race|battle|war|fight|opportunity|chance)\b/gi,
    message:
      'This looks correct! But just confirming: "lose" means to fail to win or misplace.',
    suggestion: "",
    rule: "lose/loose check",
  },
  {
    pattern:
      /\bloose\s+(the\s+)?(game|match|race|battle|war|fight|opportunity|chance)\b/gi,
    message: '"loose" means not tight. Did you mean "lose" (fail to win)?',
    suggestion: "lose",
    rule: "loose/lose confusion",
  },
];

// Grammar patterns
const GRAMMAR_PATTERNS: Array<{
  pattern: RegExp;
  message: string;
  suggestion: string;
  type: GrammarIssue["type"];
  severity: GrammarIssue["severity"];
  rule: string;
}> = [
  // Double words
  {
    pattern: /\b(\w+)\s+\1\b/gi,
    message: "Repeated word detected.",
    suggestion: "$1",
    type: "grammar",
    severity: "error",
    rule: "repeated-word",
  },
  // Missing capital after period
  {
    pattern: /\.\s+[a-z]/g,
    message: "Sentence should start with a capital letter.",
    suggestion: "",
    type: "punctuation",
    severity: "error",
    rule: "capitalize-sentence",
  },
  // Double spaces
  {
    pattern: /[^\n]\s{2,}(?=[^\s])/g,
    message: "Multiple spaces detected. Use a single space.",
    suggestion: " ",
    type: "style",
    severity: "warning",
    rule: "double-space",
  },
  // Missing space after comma
  {
    pattern: /,(?=[a-zA-Z])/g,
    message: "Missing space after comma.",
    suggestion: ", ",
    type: "punctuation",
    severity: "error",
    rule: "space-after-comma",
  },
  // Missing space after period (but not in abbreviations like Mr. Dr.)
  {
    pattern: /(?<![A-Z])\.(?=[A-Z][a-z])/g,
    message: "Missing space after period.",
    suggestion: ". ",
    type: "punctuation",
    severity: "error",
    rule: "space-after-period",
  },
  // Passive voice detection
  {
    pattern:
      /\b(is|are|was|were|be|been|being)\s+(being\s+)?(asked|called|considered|done|expected|found|given|made|placed|reported|said|seen|shown|taken|thought|told|used|written|accepted|achieved|addressed|affected|applied|based|built|caused|changed|checked|combined|compared|completed|composed|concerned|conducted|connected|controlled|converted|covered|created|dealt|decided|defined|delivered|described|designed|determined|developed|directed|discussed|distributed|drawn|driven|employed|established|estimated|examined|expressed|filled|followed|forced|formed|held|identified|included|increased|indicated|influenced|intended|introduced|involved|issued|kept|known|led|limited|linked|listed|located|lost|maintained|measured|mentioned|needed|noted|obtained|offered|opened|operated|ordered|organized|owned|paid|performed|permitted|planned|pointed|prepared|presented|produced|proposed|protected|provided|published|raised|reached|read|recognized|recorded|reduced|referred|reflected|regarded|related|released|remained|removed|replaced|represented|required|resulted|returned|revealed|selected|sent|served|set|signed|sought|spread|stated|suggested|supported|supposed|tested|transferred|treated|turned|understood|wanted)\b/gi,
    message: "Passive voice detected. Consider using active voice.",
    suggestion: "",
    type: "style",
    severity: "suggestion",
    rule: "passive-voice",
  },
  // Very long sentences (more than 40 words)
  {
    pattern: /(?:^|[.!?]\s+)([^.!?]{200,})[.!?]/g,
    message: "This sentence is very long. Consider splitting it for clarity.",
    suggestion: "",
    type: "style",
    severity: "suggestion",
    rule: "long-sentence",
  },
  // Subject-verb agreement issues
  {
    pattern: /\b(he|she|it)\s+(are|were|have)\b/gi,
    message: "Subject-verb agreement issue.",
    suggestion: "",
    type: "grammar",
    severity: "error",
    rule: "subject-verb-agreement",
  },
  {
    pattern: /\b(they|we|you)\s+(is|was|has)\b/gi,
    message: "Subject-verb agreement issue.",
    suggestion: "",
    type: "grammar",
    severity: "error",
    rule: "subject-verb-agreement",
  },
  // a vs an
  {
    pattern: /\ba\s+(?=[aeiouAEIOU])\w+/g,
    message: 'Consider using "an" before words starting with a vowel sound.',
    suggestion: "",
    type: "grammar",
    severity: "warning",
    rule: "article-a-an",
  },
  {
    pattern:
      /\ban\s+(?=[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ](?!our|on))\w+/g,
    message: 'Consider using "a" before words starting with a consonant sound.',
    suggestion: "",
    type: "grammar",
    severity: "warning",
    rule: "article-an-a",
  },
  // Run-on sentence (no comma before coordinating conjunction)
  {
    pattern: /\b\w+\s+(and|but|or|nor|for|yet|so)\s+\b(?=[^,]{30,}[.!?])/gi,
    message:
      "Possible run-on sentence. Consider adding a comma before the conjunction.",
    suggestion: "",
    type: "style",
    severity: "suggestion",
    rule: "run-on-sentence",
  },
];

// ─── Syllable Counter ────────────────────────────────────────────────────
function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");

  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}

// ─── Text Analysis ───────────────────────────────────────────────────────
function analyzeText(text: string): TextStats {
  if (!text.trim()) {
    return {
      wordCount: 0,
      charCount: 0,
      charCountNoSpaces: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      readingTime: "0 min",
      fleschScore: 0,
      fleschLabel: "N/A",
      avgWordsPerSentence: 0,
      avgSyllablesPerWord: 0,
    };
  }

  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const wordCount = words.length;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, "").length;

  // Sentences
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(sentences.length, 1);

  // Paragraphs
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const paragraphCount = Math.max(paragraphs.length, 1);

  // Reading time (average 200 words per minute)
  const minutes = Math.ceil(wordCount / 200);
  const readingTime = minutes <= 1 ? "~1 min" : `~${minutes} min`;

  // Syllable count
  const totalSyllables = words.reduce(
    (sum, word) => sum + countSyllables(word),
    0,
  );

  // Flesch Reading Ease
  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = totalSyllables / Math.max(wordCount, 1);
  const fleschScore = Math.round(
    Math.max(
      0,
      Math.min(
        100,
        206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord,
      ),
    ),
  );

  let fleschLabel: string;
  if (fleschScore >= 90) fleschLabel = "Very Easy";
  else if (fleschScore >= 80) fleschLabel = "Easy";
  else if (fleschScore >= 70) fleschLabel = "Fairly Easy";
  else if (fleschScore >= 60) fleschLabel = "Standard";
  else if (fleschScore >= 50) fleschLabel = "Fairly Difficult";
  else if (fleschScore >= 30) fleschLabel = "Difficult";
  else fleschLabel = "Very Difficult";

  return {
    wordCount,
    charCount,
    charCountNoSpaces,
    sentenceCount,
    paragraphCount,
    readingTime,
    fleschScore,
    fleschLabel,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 10) / 10,
  };
}

// ─── Grammar Check Engine ────────────────────────────────────────────────
function checkGrammar(text: string): GrammarIssue[] {
  if (!text.trim()) return [];

  const issues: GrammarIssue[] = [];
  let issueId = 0;

  // Check spelling
  const words = text.split(/\b/);
  let currentIndex = 0;
  for (const word of words) {
    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
    if (cleanWord && COMMON_MISSPELLINGS[cleanWord]) {
      issues.push({
        id: `spell-${issueId++}`,
        type: "spelling",
        severity: "error",
        message: `"${word}" is commonly misspelled. Did you mean "${COMMON_MISSPELLINGS[cleanWord]}"?`,
        context: text.substring(
          Math.max(0, currentIndex - 20),
          Math.min(text.length, currentIndex + word.length + 20),
        ),
        suggestion: COMMON_MISSPELLINGS[cleanWord],
        startIndex: currentIndex,
        endIndex: currentIndex + word.length,
        rule: "common-misspelling",
      });
    }
    currentIndex += word.length;
  }

  // Check confused words
  for (const rule of CONFUSED_WORDS) {
    let match;
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      if (rule.suggestion) {
        issues.push({
          id: `confused-${issueId++}`,
          type: "grammar",
          severity: "warning",
          message: rule.message,
          context: text.substring(
            Math.max(0, match.index - 20),
            Math.min(text.length, match.index + match[0].length + 20),
          ),
          suggestion: rule.suggestion,
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          rule: rule.rule,
        });
      }
    }
  }

  // Check grammar patterns
  for (const grammarRule of GRAMMAR_PATTERNS) {
    let match;
    const regex = new RegExp(
      grammarRule.pattern.source,
      grammarRule.pattern.flags,
    );
    while ((match = regex.exec(text)) !== null) {
      // Avoid duplicate issues at the same position
      const isDuplicate = issues.some(
        (i) =>
          Math.abs(i.startIndex - match!.index) < 5 &&
          i.rule === grammarRule.rule,
      );
      if (!isDuplicate) {
        issues.push({
          id: `grammar-${issueId++}`,
          type: grammarRule.type,
          severity: grammarRule.severity,
          message: grammarRule.message,
          context: text.substring(
            Math.max(0, match.index - 30),
            Math.min(text.length, match.index + match[0].length + 30),
          ),
          suggestion: grammarRule.suggestion,
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          rule: grammarRule.rule,
        });
      }
    }
  }

  // Sort by position in text
  issues.sort((a, b) => a.startIndex - b.startIndex);

  return issues;
}

// ─── Score Calculation ───────────────────────────────────────────────────
function calculateWritingScore(
  stats: TextStats,
  issues: GrammarIssue[],
): number {
  if (stats.wordCount === 0) return 0;

  let score = 100;

  // Deduct for errors
  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const suggestionCount = issues.filter(
    (i) => i.severity === "suggestion",
  ).length;

  score -= errorCount * 8;
  score -= warningCount * 4;
  score -= suggestionCount * 2;

  // Bonus for readability
  if (stats.fleschScore >= 60) score += 5;
  if (stats.fleschScore >= 70) score += 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

// ─── Component ────────────────────────────────────────────────────────────
export default function GrammarCheckerTool() {
  const [text, setText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ─── Computed Results ──────────────────────────────────────────────────
  const stats = useMemo(() => analyzeText(text), [text]);
  const issues = useMemo(
    () => (isChecked ? checkGrammar(text) : []),
    [text, isChecked],
  );
  const writingScore = useMemo(
    () => calculateWritingScore(stats, issues),
    [stats, issues],
  );

  const filteredIssues = useMemo(() => {
    if (activeFilter === "all") return issues;
    return issues.filter((i) => i.type === activeFilter);
  }, [issues, activeFilter]);

  const issueCountsByType = useMemo(() => {
    return {
      all: issues.length,
      grammar: issues.filter((i) => i.type === "grammar").length,
      spelling: issues.filter((i) => i.type === "spelling").length,
      punctuation: issues.filter((i) => i.type === "punctuation").length,
      style: issues.filter((i) => i.type === "style").length,
    };
  }, [issues]);

  // ─── Handlers ──────────────────────────────────────────────────────────
  const handleCheck = useCallback(() => {
    setIsChecked(true);
    setActiveFilter("all");
    setExpandedIssue(null);
  }, []);

  const handleClear = useCallback(() => {
    setText("");
    setIsChecked(false);
    setActiveFilter("all");
    setExpandedIssue(null);
  }, []);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grammar-checked-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [text]);

  const handleApplySuggestion = useCallback(
    (issue: GrammarIssue) => {
      if (!issue.suggestion) return;
      const matchedText = text.substring(issue.startIndex, issue.endIndex);
      let newText: string;

      if (issue.rule === "repeated-word") {
        // For repeated words, extract the first word from the match
        const firstWord = matchedText.split(/\s+/)[0];
        newText =
          text.substring(0, issue.startIndex) +
          firstWord +
          text.substring(issue.endIndex);
      } else if (issue.rule === "common-misspelling") {
        newText =
          text.substring(0, issue.startIndex) +
          issue.suggestion +
          text.substring(issue.endIndex);
      } else {
        newText =
          text.substring(0, issue.startIndex) +
          issue.suggestion +
          text.substring(issue.endIndex);
      }

      setText(newText);
      // Re-check after applying
      setIsChecked(true);
    },
    [text],
  );

  const getSeverityStyles = (severity: GrammarIssue["severity"]) => {
    switch (severity) {
      case "error":
        return {
          bg: "bg-[#C9461F]/10",
          border: "border-[#C9461F]/30",
          text: "text-[#C9461F]",
          badge: "bg-[#C9461F]/15 text-[#C9461F] border-[#C9461F]/30",
          icon: <XCircle className="w-4 h-4" />,
        };
      case "warning":
        return {
          bg: "bg-amber-500/10",
          border: "border-amber-500/30",
          text: "text-amber-600",
          badge: "bg-amber-500/15 text-amber-600 border-amber-500/30",
          icon: <AlertTriangle className="w-4 h-4" />,
        };
      case "suggestion":
        return {
          bg: "bg-coralSoft",
          border: "border-coral/30",
          text: "text-coral",
          badge: "bg-coral/15 text-coral border-coral/30",
          icon: <Lightbulb className="w-4 h-4" />,
        };
    }
  };

  const getTypeIcon = (type: GrammarIssue["type"]) => {
    switch (type) {
      case "grammar":
        return <SpellCheck className="w-3.5 h-3.5" />;
      case "spelling":
        return <Type className="w-3.5 h-3.5" />;
      case "punctuation":
        return <PenLine className="w-3.5 h-3.5" />;
      case "style":
        return <Eye className="w-3.5 h-3.5" />;
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-[#1F7A4D]";
    if (score >= 60) return "text-amber-600";
    return "text-[#C9461F]";
  };

  const getFleschColor = (score: number): string => {
    if (score >= 70) return "text-[#1F7A4D]";
    if (score >= 50) return "text-amber-600";
    return "text-[#C9461F]";
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Column: Editor — 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          <MagicCard
            className="p-8 bg-white border border-ink/10 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]"
            gradientColor="rgba(232, 93, 47, 0.05)"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-coralSoft rounded-xl text-coral">
                    <SpellCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-ink">Text Editor</h2>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!text}
                    className="gap-2"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    disabled={!text}
                    className="gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    disabled={!text}
                    className="gap-2 text-[#C9461F] hover:text-[#C9461F] hover:border-[#C9461F]/40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground text-sm">
                Paste or type your text below and click{" "}
                <strong>Check Grammar</strong> to analyze.
              </p>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setIsChecked(false);
                  }}
                  placeholder="Start typing or paste your text here...

The quick brown fox jumps over the lazy dog. She recieve teh package yesterday. Their is no reason to worry. I have a unusual request for you."
                  className="w-full min-h-[350px] max-h-[600px] p-5 rounded-xl border border-ink/10 bg-white text-ink text-[15px] leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral/50 transition-all placeholder:text-muted-foreground/50"
                  spellCheck={false}
                />
                {/* Character counter */}
                <div className="absolute bottom-3 right-4 text-xs text-muted-foreground/70">
                  {stats.charCount.toLocaleString()} characters
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleCheck}
                disabled={!text.trim()}
                className="btn btn-accent w-full h-12 text-base font-semibold gap-3 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]"
                size="lg"
              >
                <Zap className="w-5 h-5" />
                Check Grammar
              </Button>

              {/* Live Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-paper2 border border-ink/10">
                  <FileText className="w-4 h-4 text-coral" />
                  <div>
                    <p className="text-xs text-muted-foreground">Words</p>
                    <p className="font-semibold text-sm text-ink">
                      {stats.wordCount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-paper2 border border-ink/10">
                  <Type className="w-4 h-4 text-coral" />
                  <div>
                    <p className="text-xs text-muted-foreground">Characters</p>
                    <p className="font-semibold text-sm text-ink">
                      {stats.charCount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-paper2 border border-ink/10">
                  <BookOpen className="w-4 h-4 text-coral" />
                  <div>
                    <p className="text-xs text-muted-foreground">Sentences</p>
                    <p className="font-semibold text-sm text-ink">
                      {stats.sentenceCount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-paper2 border border-ink/10">
                  <Clock className="w-4 h-4 text-coral" />
                  <div>
                    <p className="text-xs text-muted-foreground">Read Time</p>
                    <p className="font-semibold text-sm text-ink">{stats.readingTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </MagicCard>
        </div>

        {/* Right Column: Results — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Writing Score Card */}
          <Card className="bg-white border border-ink/10 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)] overflow-hidden relative">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Writing Score
                  </p>
                  <h3
                    className={`text-5xl font-bold tracking-tight ${
                      isChecked
                        ? getScoreColor(writingScore)
                        : "text-muted-foreground"
                    }`}
                  >
                    {isChecked ? writingScore : "—"}
                    {isChecked && (
                      <span className="text-xl text-muted-foreground font-normal">
                        /100
                      </span>
                    )}
                  </h3>
                </div>
                <div
                  className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                    isChecked
                      ? writingScore >= 80
                        ? "border-[#1F7A4D]/50"
                        : writingScore >= 60
                          ? "border-amber-500/50"
                          : "border-[#C9461F]/50"
                      : "border-ink/10"
                  }`}
                >
                  {isChecked ? (
                    writingScore >= 80 ? (
                      <CheckCircle className="w-8 h-8 text-[#1F7A4D]" />
                    ) : writingScore >= 60 ? (
                      <AlertTriangle className="w-8 h-8 text-amber-600" />
                    ) : (
                      <XCircle className="w-8 h-8 text-[#C9461F]" />
                    )
                  ) : (
                    <SpellCheck className="w-8 h-8 text-muted-foreground/30" />
                  )}
                </div>
              </div>
              {isChecked && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quality</span>
                    <span
                      className={`font-medium ${getScoreColor(writingScore)}`}
                    >
                      {writingScore >= 80
                        ? "Excellent"
                        : writingScore >= 60
                          ? "Good"
                          : writingScore >= 40
                            ? "Needs Work"
                            : "Poor"}
                    </span>
                  </div>
                  <Progress value={writingScore} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Issue Summary Cards */}
          {isChecked && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-[#C9461F]/20 bg-[#C9461F]/5">
                <div className="flex items-center gap-2 mb-1">
                  <XCircle className="w-4 h-4 text-[#C9461F]" />
                  <span className="text-xs text-[#C9461F] font-medium">
                    Errors
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#C9461F]">
                  {issues.filter((i) => i.severity === "error").length}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-xs text-amber-600 font-medium">
                    Warnings
                  </span>
                </div>
                <p className="text-2xl font-bold text-amber-600">
                  {issues.filter((i) => i.severity === "warning").length}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-coral/20 bg-coralSoft">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="w-4 h-4 text-coral" />
                  <span className="text-xs text-coral font-medium">
                    Suggestions
                  </span>
                </div>
                <p className="text-2xl font-bold text-coral">
                  {issues.filter((i) => i.severity === "suggestion").length}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#1F7A4D]/20 bg-[#1F7A4D]/5">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4 text-[#1F7A4D]" />
                  <span className="text-xs text-[#1F7A4D] font-medium">
                    Readability
                  </span>
                </div>
                <p
                  className={`text-2xl font-bold ${getFleschColor(stats.fleschScore)}`}
                >
                  {stats.fleschScore}
                </p>
              </div>
            </div>
          )}

          {/* Detailed Analysis */}
          {isChecked && (
            <Card className="bg-white border border-ink/10 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-coralSoft rounded-lg text-coral">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <p className="font-semibold text-ink">Writing Analysis</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paragraphs</span>
                    <span className="font-medium text-ink">{stats.paragraphCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Avg. Words/Sentence
                    </span>
                    <span className="font-medium text-ink">
                      {stats.avgWordsPerSentence}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Avg. Syllables/Word
                    </span>
                    <span className="font-medium text-ink">
                      {stats.avgSyllablesPerWord}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Characters (no spaces)
                    </span>
                    <span className="font-medium text-ink">
                      {stats.charCountNoSpaces.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-ink/10 pt-3 flex justify-between">
                    <span className="text-muted-foreground">
                      Flesch Reading Ease
                    </span>
                    <span
                      className={`font-semibold ${getFleschColor(
                        stats.fleschScore,
                      )}`}
                    >
                      {stats.fleschScore} — {stats.fleschLabel}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Issues Panel */}
      {isChecked && (
        <MagicCard
          className="p-8 bg-white border border-ink/10 shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)]"
          gradientColor="rgba(232, 93, 47, 0.03)"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-ink">
                <SpellCheck className="w-6 h-6 text-coral" />
                Issues Found
                <Badge variant="secondary" className="text-sm">
                  {issues.length}
                </Badge>
              </h2>
            </div>

            {/* Filter Tabs */}
            <Tabs
              value={activeFilter}
              onValueChange={setActiveFilter}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-5 h-auto">
                <TabsTrigger
                  value="all"
                  className="gap-1.5 text-xs sm:text-sm py-2.5"
                >
                  All
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs px-1.5 py-0"
                  >
                    {issueCountsByType.all}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="grammar"
                  className="gap-1.5 text-xs sm:text-sm py-2.5"
                >
                  <SpellCheck className="w-3.5 h-3.5 hidden sm:block" />
                  Grammar
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs px-1.5 py-0"
                  >
                    {issueCountsByType.grammar}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="spelling"
                  className="gap-1.5 text-xs sm:text-sm py-2.5"
                >
                  <Type className="w-3.5 h-3.5 hidden sm:block" />
                  Spelling
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs px-1.5 py-0"
                  >
                    {issueCountsByType.spelling}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="punctuation"
                  className="gap-1.5 text-xs sm:text-sm py-2.5"
                >
                  <PenLine className="w-3.5 h-3.5 hidden sm:block" />
                  Punct.
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs px-1.5 py-0"
                  >
                    {issueCountsByType.punctuation}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="style"
                  className="gap-1.5 text-xs sm:text-sm py-2.5"
                >
                  <Eye className="w-3.5 h-3.5 hidden sm:block" />
                  Style
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs px-1.5 py-0"
                  >
                    {issueCountsByType.style}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Issues List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredIssues.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1F7A4D]/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-[#1F7A4D]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-ink">
                    {activeFilter === "all"
                      ? "No issues found!"
                      : `No ${activeFilter} issues found!`}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {activeFilter === "all"
                      ? "Your text looks great. Well done!"
                      : "Try checking other categories for suggestions."}
                  </p>
                </div>
              ) : (
                filteredIssues.map((issue) => {
                  const styles = getSeverityStyles(issue.severity);
                  const isExpanded = expandedIssue === issue.id;

                  return (
                    <div
                      key={issue.id}
                      className={`rounded-xl border ${styles.border} ${styles.bg} transition-all duration-200 hover:shadow-md`}
                    >
                      <button
                        onClick={() =>
                          setExpandedIssue(isExpanded ? null : issue.id)
                        }
                        className="flex items-start gap-3 p-4 w-full text-left"
                      >
                        <div className={`mt-0.5 ${styles.text}`}>
                          {styles.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <Badge
                              variant="outline"
                              className={`${styles.badge} text-[10px] uppercase tracking-wider px-2 py-0`}
                            >
                              {issue.severity}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="text-[10px] uppercase tracking-wider px-2 py-0 gap-1"
                            >
                              {getTypeIcon(issue.type)}
                              {issue.type}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-foreground leading-relaxed">
                            {issue.message}
                          </p>
                        </div>
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
                          <div className="pl-7">
                            <p className="text-xs text-muted-foreground mb-1 font-medium">
                              Context:
                            </p>
                            <code className="text-sm bg-paper2 border border-ink/10 rounded-lg px-3 py-2 block text-muted-foreground">
                              &quot;...{issue.context}...&quot;
                            </code>
                          </div>
                          {issue.suggestion && (
                            <div className="pl-7 flex items-center gap-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplySuggestion(issue);
                                }}
                                className="gap-2 border-[#1F7A4D]/30 text-[#1F7A4D] hover:bg-[#1F7A4D]/10 hover:text-[#1F7A4D]"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                Apply: &quot;{issue.suggestion}&quot;
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </MagicCard>
      )}
    </div>
  );
}

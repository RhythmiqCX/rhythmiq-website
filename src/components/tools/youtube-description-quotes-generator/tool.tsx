"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MagicCard } from "@/components/ui/magic-card";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Sparkles, Copy, Check, Quote } from "lucide-react";
import { toast } from "sonner";
import { generateYouTubeQuotesAction } from "@/actions/tools/generate-youtube-quotes";

const tones = [
  "Motivational",
  "Funny",
  "Professional",
  "Emotional",
  "Dark & Intense",
  "Inspirational",
  "Minimal",
  "Business Mindset",
];

const styles = ["Short", "Deep", "Viral", "Powerful", "Minimal"];

export default function YouTubeQuotesGeneratorTool() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Motivational");
  const [style, setStyle] = useState("Powerful");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a video topic.");
      return;
    }

    setLoading(true);
    setQuotes([]);

    try {
      const result = await generateYouTubeQuotesAction({ topic, tone, style });

      if (result.error) {
        toast.error(result.error);
      } else if (result.quotes) {
        setQuotes(result.quotes);
        toast.success("Quotes generated successfully!");
      }
    } catch (error) {
      console.error("Error generating quotes:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (quote: string, index: number) => {
    navigator.clipboard.writeText(quote);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <MagicCard
        className="p-8 border-border/50 shadow-2xl"
        gradientColor="rgba(255, 0, 0, 0.05)" // Red tint for YouTube
      >
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              YouTube Description Quotes
            </h2>
            <p className="text-muted-foreground mt-2">
              Generate viral-ready hooks and quotes for your video descriptions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="topic">Video Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., How to stay disciplined, Minecraft survival tips..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-background/50 focus:bg-background transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Quote Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Quotes...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Quotes
              </>
            )}
          </Button>
        </div>
      </MagicCard>

      {/* Generaiton Results */}
      {quotes.length > 0 && (
        <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Quote className="w-5 h-5 text-red-500" />
            Generated Quotes
          </h3>
          <div className="grid gap-4">
            {quotes.map((quote, index) => (
              <Card
                key={index}
                className="group hover:border-red-500/50 transition-colors border-border/50"
              >
                <CardContent className="p-6 flex items-start gap-4 justify-between">
                  <p className="text-lg font-medium leading-relaxed italic text-foreground/90">
                    &quot;{quote}&quot;
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(quote, index)}
                    className="shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                    <span className="sr-only">Copy quote</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

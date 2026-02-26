"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Download, Volume2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { generateHindiAudioAction } from "@/actions/tools/ai-hindi-voice-generator";
import { checkUsageAction } from "@/actions/tools/check-usage";

const VOICES = [
  { id: "neha", name: "Neha (Female)" },
  { id: "kavya", name: "Kavya (Female)" },
  { id: "ritu", name: "Ritu (Female)" },
  { id: "shubh", name: "Shubh (Male)" },
  { id: "aditya", name: "Aditya (Male)" },
  { id: "priya", name: "Priya (Female)" },
];

const AiHindiVoiceGeneratorTool = () => {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(VOICES[3].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    checkUsageAction("ai-hindi-voice-generator").then((res) =>
      setIsLimitReached(res.isLimitReached),
    );
  }, []);

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error("Please enter some Hindi text to convert.");
      return;
    }

    if (text.length > 500) {
      toast.error("Text must be under 500 characters per generation.");
      return;
    }

    setIsGenerating(true);
    setAudioSrc(null);

    try {
      const result = await generateHindiAudioAction({
        text,
        model: selectedVoice,
      });

      if (result.error) {
        toast.error(result.error);
      } else if (result.audio) {
        setAudioSrc(result.audio);
        toast.success("Audio generated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate audio.");
    } finally {
      setIsGenerating(false);
      checkUsageAction("ai-hindi-voice-generator").then((res) =>
        setIsLimitReached(res.isLimitReached),
      );
    }
  };

  const handleDownload = () => {
    if (!audioSrc) return;
    const a = document.createElement("a");
    a.href = audioSrc;
    a.download = "generated-hindi-voice.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2">
            <Volume2 className="w-5 h-5 text-indigo-500" />
            Text Configuration
          </CardTitle>
          <CardDescription>
            Enter your conversational prompt in Hindi (Devanagari script) or
            English transliteration. Our AI voice will read it aloud.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hindiText">Text for Audio (Hindi or English)</Label>
            <Textarea
              id="hindiText"
              className="min-h-[150px] resize-none text-base p-4"
              placeholder="नमस्ते! मैं एक एआई वॉयस जनरेटर हूं... OR Namaste! Main ek AI voice generator hu..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
            />
            <div className="text-right text-xs text-muted-foreground w-full">
              {text.length} / 500 characters
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <Label>Voice Model</Label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VOICES.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="default"
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-indigo-500 to-primary hover:from-indigo-600 hover:to-primary/90 text-white border-0 shadow-md"
                onClick={handleGenerate}
                disabled={isGenerating || isLimitReached}
              >
                {isLimitReached ? (
                  <>Limit Reached (5/5)</>
                ) : isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Synthesizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Generate Audio
                  </>
                )}
              </Button>
            </div>
          </div>
          {isLimitReached && (
            <p className="text-sm text-red-500 text-center font-medium mt-2">
              You have reached your daily limit of 5 generations for this tool.
            </p>
          )}
        </CardContent>
      </Card>

      {audioSrc && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden border-indigo-500/20 shadow-xl">
            <CardHeader className="bg-indigo-500/5 py-4 border-b border-indigo-500/10">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Resulting Audio</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-2 h-8"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center p-6 bg-background/50 rounded-xl border border-border/50 gap-4">
                <audio
                  ref={audioRef}
                  controls
                  className="w-full max-w-md h-12"
                  src={audioSrc}
                  autoPlay
                >
                  Your browser does not support the audio element.
                </audio>
                <p className="text-sm text-muted-foreground text-center">
                  Click the play button to hear the synthesized Hindi audio
                  using the select AI voice.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AiHindiVoiceGeneratorTool;

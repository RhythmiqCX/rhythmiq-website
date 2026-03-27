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
import { generateSEAVoiceAction } from "@/actions/tools/ai-sea-voice-generator";
import { checkUsageAction } from "@/actions/tools/check-usage";

const TOOL_NAME = "ai-indian-english-voice-generator";

const VOICES = [
  { id: "anushka", name: "Anushka (Female)" },
  { id: "manisha", name: "Manisha (Female)" },
  { id: "vidya", name: "Vidya (Female)" },
  { id: "arjun", name: "Arjun (Male)" },
  { id: "abhilash", name: "Abhilash (Male)" },
];

const AiIndianEnglishVoiceGeneratorTool = () => {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(VOICES[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    checkUsageAction(TOOL_NAME).then((res) =>
      setIsLimitReached(res.isLimitReached),
    );
  }, []);

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to convert.");
      return;
    }
    if (text.length > 500) {
      toast.error("Text must be under 500 characters.");
      return;
    }

    setIsGenerating(true);
    setAudioSrc(null);

    try {
      const result = await generateSEAVoiceAction({
        text,
        language: "en-IN",
        toolName: TOOL_NAME,
      });
      if (result.error) {
        toast.error(result.error);
      } else if (result.audio) {
        setAudioSrc(result.audio);
        toast.success("Audio generated successfully!");
      }
    } catch {
      toast.error("Failed to generate audio.");
    } finally {
      setIsGenerating(false);
      checkUsageAction(TOOL_NAME).then((res) =>
        setIsLimitReached(res.isLimitReached),
      );
    }
  };

  const handleDownload = () => {
    if (!audioSrc) return;
    const a = document.createElement("a");
    a.href = audioSrc;
    a.download = "generated-indian-english-voice.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-orange-500" />
            Indian English AI Voice Generator
          </CardTitle>
          <CardDescription>
            Powered by Sarvam Bulbul v2 — the only neural TTS model built
            specifically for Indian-English accents. Natural prosody, no robotic
            tone.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="indianEnglishText">Text in Indian English</Label>
            <Textarea
              id="indianEnglishText"
              className="min-h-[150px] resize-none text-base p-4"
              placeholder="Hello! Thank you for calling. How may I assist you today? Our office hours are Monday to Friday, 9 AM to 6 PM..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
            />
            <div className="text-right text-xs text-muted-foreground">
              {text.length} / 500
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <Label>Voice (Sarvam Bulbul v2)</Label>
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
                className="w-full gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 shadow-md"
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
                    <Sparkles className="w-4 h-4" /> Generate Indian English
                    Voice
                  </>
                )}
              </Button>
            </div>
          </div>

          {isLimitReached && (
            <p className="text-sm text-red-500 text-center">
              Daily limit of 5 free generations reached. Sign up for unlimited
              access.
            </p>
          )}
        </CardContent>
      </Card>

      {audioSrc && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-orange-500/20 bg-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-orange-500/5 py-4 border-b border-orange-500/10">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Generated Indian English Audio</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-2 h-8"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center p-6 bg-background/50 rounded-xl border border-border/50 gap-4">
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
                  Natural Indian-English AI voice via Sarvam Bulbul v2. Download
                  as .wav.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AiIndianEnglishVoiceGeneratorTool;

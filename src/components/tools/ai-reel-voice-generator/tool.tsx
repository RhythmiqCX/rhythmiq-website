"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
import { Loader2, Download, Volume2, Sparkles, PenLine } from "lucide-react";
import { toast } from "sonner";
import {
  generateScriptAction,
  generateVoiceAction,
} from "@/actions/tools/ai-reel-voice-generator";

const VOICES = {
  English: [
    {
      id: "aura-asteria-en",
      name: "Asteria (Female - US)",
      provider: "deepgram",
    },
    {
      id: "aura-luna-en",
      name: "Luna (Female - US)",
      provider: "deepgram",
    },
    {
      id: "aura-stella-en",
      name: "Stella (Female - US)",
      provider: "deepgram",
    },
    {
      id: "aura-orion-en",
      name: "Orion (Male - US)",
      provider: "deepgram",
    },
    {
      id: "aura-arcas-en",
      name: "Arcas (Male - US)",
      provider: "deepgram",
    },
    {
      id: "aura-perseus-en",
      name: "Perseus (Male - US)",
      provider: "deepgram",
    },
    {
      id: "aura-zeus-en",
      name: "Zeus (Male - US)",
      provider: "deepgram",
    },
  ],
  Hindi: [
    { id: "neha", name: "Neha (Female)", provider: "sarvam" },
    { id: "kavya", name: "Kavya (Female)", provider: "sarvam" },
    { id: "ritu", name: "Ritu (Female)", provider: "sarvam" },
    { id: "shubh", name: "Shubh (Male)", provider: "sarvam" },
    { id: "aditya", name: "Aditya (Male)", provider: "sarvam" },
    { id: "priya", name: "Priya (Female)", provider: "sarvam" },
  ],
};

const TONES = [
  "Motivational",
  "News Anchor",
  "Cinematic",
  "Funny / Entertaining",
  "Professional Business",
  "Educational Explainer",
];

const DURATIONS = ["30s (Short)", "60s (Standard)", "90s (Long)"];

const AiReelVoiceGeneratorTool = () => {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState(TONES[0]);
  const [duration, setDuration] = useState(DURATIONS[0]);
  const [script, setScript] = useState("");

  const [selectedVoice, setSelectedVoice] = useState(VOICES.English[0].id);
  const [audioSrc, setAudioSrc] = useState("");

  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleGenerateScript = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic for the script.");
      return;
    }

    setIsGeneratingScript(true);
    setAudioSrc(null);

    try {
      const result = await generateScriptAction(
        topic,
        tone,
        language,
        duration,
      );
      if (result.error) {
        toast.error(result.error);
      } else if (result.script) {
        setScript(result.script);
        toast.success("Script generated successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate script.");
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handleGenerateVoice = async () => {
    if (!script.trim()) {
      toast.error("Script matches are required to generate voice.");
      return;
    }

    setIsGeneratingVoice(true);

    try {
      const voiceConfig =
        VOICES[language === "Hindi" ? "Hindi" : "English"].find(
          (v) => v.id === selectedVoice,
        ) || VOICES[language === "Hindi" ? "Hindi" : "English"][0];
      const result = await generateVoiceAction({
        text: script,
        provider: voiceConfig.provider,
        voiceModel: voiceConfig.id,
      });

      if (result.error) {
        toast.error(result.error);
      } else if (result.audio) {
        setAudioSrc(result.audio);
        toast.success("Voiceover generated successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate voiceover.");
    } finally {
      setIsGeneratingVoice(false);
    }
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setSelectedVoice(VOICES[value === "Hindi" ? "Hindi" : "English"][0].id);
  };

  const handleDownload = () => {
    if (!audioSrc) return;
    const a = document.createElement("a");
    a.href = audioSrc;
    a.download = `voiceover-${Date.now()}.${language === "Hindi" ? "wav" : "mp3"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Script Generation Card */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2">
            <PenLine className="w-5 h-5 text-indigo-500" />
            1. Generate Script
          </CardTitle>
          <CardDescription>
            Enter your topic, choose your style, and let AI write the perfect
            script for your reel or short.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic / Idea</Label>
            <Input
              id="topic"
              placeholder="e.g., Top 5 AI tools in 2026, Morning Motivation..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tone / Style</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DURATIONS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            variant="default"
            className="w-full gap-2"
            onClick={handleGenerateScript}
            disabled={isGeneratingScript}
          >
            {isGeneratingScript ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Writing Script...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> AI Generate Script
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Voice Generation Card */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2">
            <Volume2 className="w-5 h-5 text-indigo-500" />
            2. AI Voiceover
          </CardTitle>
          <CardDescription>
            Review the script and generate a natural sounding voiceover. Note:
            Deepgram is used for English, while Sarvam AI is used for Hindi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="scriptText">Your Script (Edit as needed)</Label>
            <Textarea
              id="scriptText"
              className="min-h-[200px] resize-none p-4 font-mono text-sm leading-relaxed"
              placeholder="Script will appear here... Or write your own."
              value={script}
              onChange={(e) => setScript(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <Label>Select {language} AI Voice</Label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VOICES[language === "Hindi" ? "Hindi" : "English"].map(
                    (v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-indigo-500 to-primary hover:from-indigo-600 hover:to-primary/90 text-white border-0 shadow-md"
                onClick={handleGenerateVoice}
                disabled={isGeneratingVoice || !script.trim()}
              >
                {isGeneratingVoice ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Synthesizing
                    Voice...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" /> Generate Voiceover
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Result Card */}
      {audioSrc && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden border-indigo-500/20 shadow-xl">
            <CardHeader className="bg-indigo-500/5 py-4 border-b border-indigo-500/10">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Resulting Voiceover</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-2 h-8"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Audio
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
                  Click play to review the voiceover. If you need changes, edit
                  the script above and regenerate.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AiReelVoiceGeneratorTool;

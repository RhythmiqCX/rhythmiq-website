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
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Download,
  Volume2,
  Sparkles,
  Wand2,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";
import { checkUsageAction } from "@/actions/tools/check-usage";
import { generateReceptionistVoiceAction } from "@/actions/tools/generate-receptionist-voice";

const LANGUAGES = [
  { id: "hi-IN", name: "Hindi" },
  { id: "en-IN", name: "Indian English" },
];

const VOICES = [
  { id: "kavya", name: "Kavya (Female / Upbeat)", lang: "hi-IN" },
  { id: "ritu", name: "Ritu (Female / Calm)", lang: "hi-IN" },
  { id: "neha", name: "Neha (Female / Professional)", lang: "hi-IN" },
  { id: "shubh", name: "Shubh (Male)", lang: "hi-IN" },
  { id: "aditya", name: "Aditya (Male)", lang: "en-IN" },
  { id: "priya", name: "Priya (Female)", lang: "en-IN" },
];

const PRESETS = [
  {
    label: "Hindi Reception Greeting",
    text: "नमस्ते! RhythmiqCX में आपका स्वागत है।\nबिक्री विभाग से बात करने के लिए 1 दबाएँ।\nकस्टमर सपोर्ट के लिए 2 दबाएँ।",
    lang: "hi-IN",
    voice: "neha",
  },
  {
    label: "English IVR Menu",
    text: "Hello! Thank you for calling RhythmiqCX.\nPress 1 for Sales.\nPress 2 for Customer Support.\nPlease wait while we connect you to our agent.",
    lang: "en-IN",
    voice: "priya",
  },
  {
    label: "After Hours Notice",
    text: "आप काम के घंटों के बाद कॉल कर रहे हैं। कृपया कल सुबह 9 बजे के बाद कॉल करें। धन्यवाद।",
    lang: "hi-IN",
    voice: "shubh",
  },
];

export default function AIReceptionistVoiceGeneratorTool() {
  const [text, setText] = useState(PRESETS[0].text);
  const [selectedLanguage, setSelectedLanguage] = useState(PRESETS[0].lang);
  const [selectedVoice, setSelectedVoice] = useState(PRESETS[0].voice);

  const [isGenerating, setIsGenerating] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Filter voices based on selected language
  const availableVoices = VOICES.filter(
    (v) =>
      v.lang === selectedLanguage ||
      (selectedLanguage === "hi-IN" && v.lang === "hi-IN") ||
      (selectedLanguage === "en-IN" && v.lang === "en-IN"),
  );

  // Ensure selected voice matches the new language when toggled
  useEffect(() => {
    if (!availableVoices.find((v) => v.id === selectedVoice)) {
      setSelectedVoice(availableVoices[0]?.id || "priya");
    }
  }, [selectedLanguage, availableVoices, selectedVoice]);

  useEffect(() => {
    checkUsageAction("ai-hindi-english-receptionist-voice-generator").then(
      (res) => setIsLimitReached(res.isLimitReached),
    );
  }, []);

  const handlePresetSelect = (preset: (typeof PRESETS)[0]) => {
    setText(preset.text);
    setSelectedLanguage(preset.lang);
    setSelectedVoice(preset.voice);
    setAudioSrc(null);
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error("Please enter the script text to convert.");
      return;
    }

    if (text.length > 300) {
      toast.error(
        "Please keep scripts under 300 characters for optimal AI pacing.",
      );
      return;
    }

    setIsGenerating(true);
    setAudioSrc(null);

    try {
      const result = await generateReceptionistVoiceAction({
        text: text.trim(),
        language: selectedLanguage,
        speaker: selectedVoice,
      });

      if (result.error) {
        toast.error(result.error);
        if (result.error.includes("limit")) setIsLimitReached(true);
      } else if (result.audio) {
        setAudioSrc(result.audio);
        toast.success("Voice prompt generated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate voice prompt.");
    } finally {
      setIsGenerating(false);
      checkUsageAction("ai-hindi-english-receptionist-voice-generator").then(
        (res) => setIsLimitReached(res.isLimitReached),
      );
    }
  };

  const handleDownload = () => {
    if (!audioSrc) return;
    const a = document.createElement("a");
    a.href = audioSrc;
    a.download = `receptionist_prompt_${selectedLanguage}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader className="border-b border-border/50 pb-6">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Wand2 className="w-5 h-5 text-indigo-500" />
                Script to Speech Generator
              </CardTitle>
              <CardDescription className="mt-1">
                Convert your receptionist script into an HD audio file.
              </CardDescription>
            </div>
            {isLimitReached && (
              <div className="text-xs bg-red-500/10 text-red-500 px-3 py-1 rounded-full border border-red-500/20 font-medium">
                Daily Limit Reached
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Quick Shortcuts */}
          <CardTitle className="text-xl">Common Templates</CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetSelect(preset)}
                className={`text-left text-sm p-3 rounded-xl border transition-all ${
                  text === preset.text
                    ? "border-indigo-500 bg-indigo-500/5 text-indigo-400 font-medium"
                    : "border-border/50 bg-muted/20 hover:bg-muted/40 text-muted-foreground"
                }`}
              >
                <span className="block mb-1">{preset.label}</span>
                <span className="text-xs opacity-60">
                  [{preset.lang === "hi-IN" ? "Hindi" : "English"}]
                </span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-4 rounded-xl border border-border/50 bg-background/50">
            <div className="space-y-2">
              <Label>Target Language</Label>
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Voice Model (Speaker)</Label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableVoices.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="scriptText">
                Call Script Text <span className="text-red-500">*</span>
              </Label>
              <span
                className={`text-xs ${text.length > 300 ? "text-red-500" : "text-muted-foreground"}`}
              >
                {text.length} / 300 chars
              </span>
            </div>
            <Textarea
              id="scriptText"
              className="min-h-[150px] resize-y text-base p-4 font-medium leading-relaxed"
              placeholder="नमस्ते! आपका स्वागत है..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={400} // Soft limit, visually encourage 300
            />
          </div>
        </CardContent>

        <CardFooter className="border-t border-border/50 p-6 bg-muted/5 flex items-center justify-between rounded-b-xl gap-4 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setText("");
              setAudioSrc(null);
            }}
            className="text-muted-foreground"
          >
            <RefreshCcw className="w-4 h-4 mr-2" /> Clear
          </Button>

          <Button
            size="lg"
            className="w-full sm:w-auto min-w-[200px] gap-2 bg-gradient-to-r from-indigo-500 to-primary hover:from-indigo-600 hover:to-primary/90"
            onClick={handleGenerate}
            disabled={isGenerating || isLimitReached || text.length === 0}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Rendering Audio...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Synthesize Voice
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {audioSrc && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-2">
          <Card className="border border-indigo-500/30 bg-card backdrop-blur-sm overflow-hidden shadow-2xl shadow-indigo-500/10">
            <div className="bg-gradient-to-r from-indigo-500/10 to-transparent p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-indigo-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg leading-tight text-white">
                    Generated Voice Prompt
                  </h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
                    Ready for Deployment
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={handleDownload}
                className="gap-2 sm:w-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Download className="w-4 h-4" />
                Download WAV
              </Button>
            </div>

            <CardContent className="p-6">
              <div className="flex flex-col gap-6">
                {/* Audio Player Wrapper */}
                <div className="bg-background rounded-xl p-4 border border-border shadow-inner">
                  <audio
                    ref={audioRef}
                    controls
                    className="w-full h-12 outline-none"
                    src={audioSrc}
                    autoPlay
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>

                {/* Display what was read */}
                <div className="text-sm font-medium text-muted-foreground whitespace-pre-wrap border-l-2 border-indigo-500/30 pl-4 py-1 italic">
                  &quot;{text}&quot;
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Mic,
  Square,
  Loader2,
  Copy,
  Download,
  Languages,
  Check,
  Volume2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { processLanguageTranslatorVoiceoverAction } from "@/actions/tools/translator-voiceover";
import { checkUsageAction } from "@/actions/tools/check-usage";
import { cn } from "@/lib";

const TARGET_LANGUAGES = [
  { id: "English", name: "English" },
  { id: "Hindi", name: "Hindi" },
];

const VOICES = [
  { id: "anushka", name: "Anushka (Female)" },
  { id: "neha", name: "Neha (Female)" },
  { id: "abhilash", name: "Abhilash (Male)" },
];

const TranslatorVoiceoverTool = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("Hindi");
  const [targetVoice, setTargetVoice] = useState("anushka");

  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isCopiedOriginal, setIsCopiedOriginal] = useState(false);
  const [isCopiedTranslated, setIsCopiedTranslated] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    checkUsageAction("language-translator-voiceover").then((res) =>
      setIsLimitReached(res.isLimitReached),
    );

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = handleRecordingStop;

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setOriginalText("");
      setTranslatedText("");
      setDetectedLanguage("");
      setAudioSrc(null);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Microphone access is required to use this tool.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Stop all audio tracks
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const handleRecordingStop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    const audioFile = new File([audioBlob], "recording.webm", {
      type: "audio/webm",
    });

    await processAudioFile(audioFile);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const audioFile = e.target.files[0];

      // Basic size / format check (10MB limit for web audio processing)
      if (audioFile.size > 10 * 1024 * 1024) {
        toast.error("File size must be under 10MB");
        return;
      }

      setOriginalText("");
      setTranslatedText("");
      setDetectedLanguage("");
      setAudioSrc(null);

      await processAudioFile(audioFile);
    }
  };

  const processAudioFile = async (audioFile: File) => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("audio", audioFile);
      formData.append("sourceLanguage", sourceLanguage);
      formData.append("targetLanguage", targetLanguage);
      formData.append("targetVoice", targetVoice);

      const response = await processLanguageTranslatorVoiceoverAction(formData);

      if (response.error) {
        toast.error(response.error);
      } else {
        setOriginalText(response.originalText || "No speech detected.");
        setTranslatedText(response.translatedText || "");
        setDetectedLanguage(response.detectedLanguage || "Unknown");
        if (response.audioData) setAudioSrc(response.audioData);
        toast.success("Audio processed successfully!");
      }
    } catch (error) {
      console.error("Processing error:", error);
      toast.error("An error occurred while processing the audio.");
    } finally {
      setIsProcessing(false);
      checkUsageAction("language-translator-voiceover").then((res) =>
        setIsLimitReached(res.isLimitReached),
      );
    }
  };

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
      audioRef.current.play().catch((e) => {
        console.error("Audio autoplay prevented or failed:", e);
      });
    }
  }, [audioSrc]);

  const copyToClipboard = (text: string, isOriginal: boolean) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (isOriginal) {
      setIsCopiedOriginal(true);
      setTimeout(() => setIsCopiedOriginal(false), 2000);
    } else {
      setIsCopiedTranslated(true);
      setTimeout(() => setIsCopiedTranslated(false), 2000);
    }
    toast.success("Copied to clipboard");
  };

  const downloadAsTxt = (text: string, filename: string) => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAudio = () => {
    if (!audioSrc) return;
    const a = document.createElement("a");
    a.href = audioSrc;
    a.download = `translated-voiceover-${targetLanguage.toLowerCase()}.wav`;
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
            Language Translator + Voiceover
          </CardTitle>
          <CardDescription>
            Record or upload audio to translate it into another language, and
            automatically generate an AI voiceover of the new text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Source Language</Label>
              <Select
                value={sourceLanguage}
                onValueChange={setSourceLanguage}
                disabled={isRecording || isProcessing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Detect Automatically" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Detect Automatically</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Target Language</Label>
              <Select
                value={targetLanguage}
                onValueChange={setTargetLanguage}
                disabled={isRecording || isProcessing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Target Language" />
                </SelectTrigger>
                <SelectContent>
                  {TARGET_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Target Output Voice</Label>
              <Select
                value={targetVoice}
                onValueChange={setTargetVoice}
                disabled={isRecording || isProcessing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target voice role" />
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
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-muted/30 border border-border/50 max-w-2xl mx-auto w-full">
            <div className="flex items-center gap-4 w-full justify-center md:justify-start">
              {!isRecording ? (
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 p-0 bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/20"
                  onClick={startRecording}
                  disabled={isProcessing || isLimitReached}
                >
                  <Mic className="w-6 h-6 text-white" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="destructive"
                  className="rounded-full w-16 h-16 p-0 shadow-lg animate-pulse"
                  onClick={stopRecording}
                >
                  <Square className="w-5 h-5 text-white fill-current" />
                </Button>
              )}
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-2xl font-mono font-medium tracking-wider",
                    isRecording ? "text-red-500" : "text-foreground",
                  )}
                >
                  {formatTime(recordingTime)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {isRecording
                    ? "Recording..."
                    : isProcessing
                      ? "Processing..."
                      : "Record Audio"}
                </span>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center -translate-y-2 opacity-50">
              <div className="h-10 border-l border-border" />
              <span className="text-xs uppercase bg-background px-2 py-1 relative z-10 -translate-y-2 rounded">
                Or
              </span>
            </div>

            <div className="flex items-center justify-center w-full md:w-auto">
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
                disabled={isRecording || isProcessing || isLimitReached}
              />
              <Button
                variant="outline"
                className="gap-2 h-12 px-6 border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-500"
                onClick={() => fileInputRef.current?.click()}
                disabled={isRecording || isProcessing || isLimitReached}
              >
                <Upload className="w-4 h-4" /> Upload Audio
              </Button>
            </div>
          </div>

          {isProcessing && (
            <div className="flex flex-col items-center justify-center p-8 gap-4 text-center animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin relative z-10" />
              </div>
              <p className="text-muted-foreground font-medium animate-pulse">
                Running AI models to transcribe and generate voiceover...
              </p>
            </div>
          )}

          {isLimitReached && (
            <p className="text-sm text-red-500 text-center font-medium">
              You have reached your daily limit of 5 generations for this tool.
            </p>
          )}
        </CardContent>
      </Card>

      {audioSrc && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden border-indigo-500/20 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-pink-500/10 opacity-30 pointer-events-none" />

            <CardHeader className="bg-indigo-500/5 py-4 border-b border-indigo-500/10 relative z-10">
              <CardTitle className="text-lg flex items-center justify-between text-indigo-500">
                <span className="flex items-center gap-2 select-none">
                  <Volume2 className="w-5 h-5" /> AI Voiceover ({targetLanguage}
                  )
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadAudio}
                  className="gap-2 h-8 hover:bg-indigo-500 hover:text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Audio
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col items-center justify-center p-6 bg-background/50 rounded-xl border border-indigo-500/20 gap-4 shadow-[inset_0px_0px_10px_rgba(0,0,0,0.05)]">
                <div className="w-full h-8 bg-indigo-500/10 rounded overflow-hidden flex items-center gap-[2px] px-1 animate-pulse">
                  {/* Visualizer bars placeholder */}
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-indigo-500/40 rounded-full"
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                    ></div>
                  ))}
                </div>
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
                  Listen to your translated voiceover. Use the download button
                  above to save it.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {(originalText || translatedText) && (
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Original Text */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg flex flex-col">
            <CardHeader className="bg-muted/20 py-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Mic className="w-4 h-4 text-muted-foreground" />
                  Source Speech
                  {detectedLanguage && detectedLanguage !== sourceLanguage && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-medium ml-2">
                      {detectedLanguage.charAt(0).toUpperCase() +
                        detectedLanguage.slice(1)}
                    </span>
                  )}
                </CardTitle>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      window.speechSynthesis.cancel();
                      const utterance = new SpeechSynthesisUtterance(
                        originalText,
                      );
                      window.speechSynthesis.speak(utterance);
                    }}
                    title="Play Text"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => copyToClipboard(originalText, true)}
                    title="Copy Text"
                  >
                    {isCopiedOriginal ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() =>
                      downloadAsTxt(originalText, "source_transcription.txt")
                    }
                    title="Download as TXT"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 relative">
              <Textarea
                value={originalText}
                readOnly
                className="min-h-[250px] h-full resize-none border-0 focus-visible:ring-0 rounded-none bg-transparent p-6 text-base leading-relaxed"
                placeholder="Source speech transcription will appear here..."
              />
            </CardContent>
          </Card>

          {/* Translated Text  */}
          {translatedText && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg flex flex-col border-indigo-500/20">
              <CardHeader className="bg-indigo-500/5 py-4 border-b border-indigo-500/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2 text-foreground">
                    <Languages className="w-4 h-4 text-indigo-500" />
                    Translated Speech
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-medium ml-2">
                      {targetLanguage}
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        window.speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance(
                          translatedText,
                        );
                        if (targetLanguage === "Hindi")
                          utterance.lang = "hi-IN";
                        else if (targetLanguage === "English")
                          utterance.lang = "en-IN";
                        window.speechSynthesis.speak(utterance);
                      }}
                      title="Play Translated Text"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => copyToClipboard(translatedText, false)}
                      title="Copy Text"
                    >
                      {isCopiedTranslated ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        downloadAsTxt(
                          translatedText,
                          `translation-${targetLanguage.toLowerCase()}.txt`,
                        )
                      }
                      title="Download as TXT"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 relative">
                <Textarea
                  value={translatedText}
                  readOnly
                  className="min-h-[250px] h-full resize-none border-0 focus-visible:ring-0 rounded-none bg-transparent p-6 text-base leading-relaxed"
                  placeholder="Translation will appear here..."
                />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {!originalText && !isProcessing && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden mt-4">
          <div className="bg-muted/30 p-6 md:p-8">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-indigo-500" />
              How It Works
            </h3>
            <ol className="space-y-4 text-muted-foreground list-decimal list-inside ml-2">
              <li>Record your voice directly or upload a short audio file.</li>
              <li>Select your target language and target voice style.</li>
              <li>Our AI transcribes the incoming audio instantly.</li>
              <li>
                The text is expertly translated to retain tone and intent.
              </li>
              <li>
                High quality Indian/Global voice AI dictates the translation
                forming your new voiceover.
              </li>
            </ol>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TranslatorVoiceoverTool;

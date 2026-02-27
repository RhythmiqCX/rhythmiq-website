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
import { Switch } from "@/components/ui/switch";
import {
  Mic,
  Square,
  Loader2,
  Copy,
  Download,
  Languages,
  Check,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { processVoiceToTextAction } from "@/actions/tools/voice-to-text";
import { checkUsageAction } from "@/actions/tools/check-usage";
import { cn } from "@/lib";

const TARGET_LANGUAGES = [
  { id: "English", name: "English" },
  { id: "Hindi", name: "Hindi" },
  { id: "Spanish", name: "Spanish" },
  { id: "French", name: "French" },
  { id: "German", name: "German" },
  { id: "Arabic", name: "Arabic" },
  { id: "Chinese", name: "Chinese (Simplified)" },
  { id: "Japanese", name: "Japanese" },
  { id: "Portuguese", name: "Portuguese" },
  { id: "Russian", name: "Russian" },
  { id: "Italian", name: "Italian" },
  { id: "Korean", name: "Korean" },
];

const VoiceToTextConverterTool = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shouldTranslate, setShouldTranslate] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("English");

  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");

  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isCopiedOriginal, setIsCopiedOriginal] = useState(false);
  const [isCopiedTranslated, setIsCopiedTranslated] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkUsageAction("voice-to-text-converter").then((res) =>
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

    // Convert to File
    const audioFile = new File([audioBlob], "recording.webm", {
      type: "audio/webm",
    });

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("audio", audioFile);
      formData.append("shouldTranslate", String(shouldTranslate));
      formData.append("targetLanguage", targetLanguage);

      const response = await processVoiceToTextAction(formData);

      if (response.error) {
        toast.error(response.error);
      } else {
        setOriginalText(response.originalText || "No speech detected.");
        setTranslatedText(response.translatedText || "");
        setDetectedLanguage(response.detectedLanguage || "Unknown");
        toast.success("Audio processed successfully!");
      }
    } catch (error) {
      console.error("Processing error:", error);
      toast.error("An error occurred while processing the audio.");
    } finally {
      setIsProcessing(false);
      checkUsageAction("voice-to-text-converter").then((res) =>
        setIsLimitReached(res.isLimitReached),
      );
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }

    setOriginalText("");
    setTranslatedText("");
    setDetectedLanguage("");

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("audio", file);
      formData.append("shouldTranslate", String(shouldTranslate));
      formData.append("targetLanguage", targetLanguage);

      const response = await processVoiceToTextAction(formData);

      if (response.error) {
        toast.error(response.error);
      } else {
        setOriginalText(response.originalText || "No speech detected.");
        setTranslatedText(response.translatedText || "");
        setDetectedLanguage(response.detectedLanguage || "Unknown");
        toast.success("Audio processed successfully!");
      }
    } catch (error) {
      console.error("Processing error:", error);
      toast.error("An error occurred while processing the audio.");
    } finally {
      setIsProcessing(false);
      checkUsageAction("voice-to-text-converter").then((res) =>
        setIsLimitReached(res.isLimitReached),
      );
    }
    e.target.value = "";
  };

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

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2">
            <Mic className="w-5 h-5 text-blue-500" />
            Voice Recording
          </CardTitle>
          <CardDescription>
            Speak in any language. We&apos;ll automatically transcribe it and
            optionally translate it to your preferred language.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-muted/30 border border-border/50">
            <div className="flex items-center gap-4 w-full md:w-auto">
              {!isRecording ? (
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 p-0 bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/20"
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
                      : "Ready to record"}
                </span>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center -translate-y-2 opacity-50 px-4">
              <div className="h-10 border-l border-border" />
              <span className="text-xs uppercase bg-background px-2 py-1 relative z-10 -translate-y-2 rounded">
                Or
              </span>
            </div>

            <div className="flex items-center justify-center w-full md:w-auto">
              <input
                type="file"
                accept="audio/*,video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
                disabled={isRecording || isProcessing || isLimitReached}
              />
              <Button
                variant="outline"
                className="gap-2 h-12 px-6 border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-500"
                onClick={() => fileInputRef.current?.click()}
                disabled={isRecording || isProcessing || isLimitReached}
              >
                <Upload className="w-4 h-4" /> Upload Audio/Video
              </Button>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4 bg-background p-4 rounded-xl border border-border/50">
              <div className="flex items-center gap-2">
                <Switch
                  id="translate"
                  checked={shouldTranslate}
                  onCheckedChange={setShouldTranslate}
                  disabled={isRecording || isProcessing}
                />
                <Label
                  htmlFor="translate"
                  className="cursor-pointer font-medium flex items-center gap-1.5"
                >
                  <Languages className="w-4 h-4 text-muted-foreground" />
                  Translate
                </Label>
              </div>

              {shouldTranslate && (
                <Select
                  value={targetLanguage}
                  onValueChange={setTargetLanguage}
                  disabled={isRecording || isProcessing}
                >
                  <SelectTrigger className="w-[160px] h-9">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {TARGET_LANGUAGES.map((lang) => (
                      <SelectItem key={lang.id} value={lang.id}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {isProcessing && (
            <div className="flex flex-col items-center justify-center p-8 gap-4 text-center animate-in fade-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin relative z-10" />
              </div>
              <p className="text-muted-foreground font-medium animate-pulse">
                Running AI models to transcribe your audio...
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

      {(originalText || translatedText) && (
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Original Text */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg flex flex-col">
            <CardHeader className="bg-muted/20 py-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Mic className="w-4 h-4 text-muted-foreground" />
                  Transcription
                  {detectedLanguage && detectedLanguage !== "Unknown" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-medium ml-2">
                      Detected:{" "}
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
                      downloadAsTxt(originalText, "transcription.txt")
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
                placeholder="Your transcription will appear here..."
              />
            </CardContent>
          </Card>

          {/* Translated Text if selected */}
          {shouldTranslate && translatedText && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg flex flex-col border-blue-500/20">
              <CardHeader className="bg-blue-500/5 py-4 border-b border-blue-500/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2 text-foreground">
                    <Languages className="w-4 h-4 text-blue-500" />
                    Translation
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-medium ml-2">
                      {targetLanguage}
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-1.5">
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
                  placeholder="Your translation will appear here..."
                />
              </CardContent>
            </Card>
          )}

          {shouldTranslate && !translatedText && !isProcessing && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg flex flex-col items-center justify-center p-8 text-center text-muted-foreground h-full min-h-[300px]">
              <Languages className="w-12 h-12 mb-4 opacity-20" />
              <p>Translation will appear here after recording</p>
            </Card>
          )}
        </div>
      )}

      {!originalText && !isProcessing && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden mt-4">
          <div className="bg-muted/30 p-6 md:p-8">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-500" />
              How It Works
            </h3>
            <ol className="space-y-4 text-muted-foreground list-decimal list-inside ml-2">
              <li>Allow microphone access when prompted.</li>
              <li>
                Click the <strong>Start Recording</strong> button to begin.
              </li>
              <li>
                Speak naturally in any language. Our AI detects the spoken
                language automatically.
              </li>
              <li>
                Click the <strong>Stop</strong> button to process the audio.
              </li>
              <li>
                Toggle <strong>Translate</strong> and select a target language
                to get a translated version.
              </li>
            </ol>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VoiceToTextConverterTool;

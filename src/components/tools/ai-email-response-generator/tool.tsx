"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Check, Sparkles, Loader2, Send, Mail } from "lucide-react";
import { toast } from "sonner";
import { generateEmailResponse } from "@/actions/tools/generate-email-response";
import { checkUsageAction } from "@/actions/tools/check-usage";

interface GeneratedEmail {
  subject: string;
  body: string;
}

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly / Casual" },
  { value: "formal", label: "Strictly Formal" },
  { value: "persuasive", label: "Persuasive / Sales" },
  { value: "apologetic", label: "Apologetic / Empathetic" },
  { value: "concise", label: "Concise / Direct" },
];

const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "italian", label: "Italian" },
  { value: "portuguese", label: "Portuguese" },
];

const EmailResponseGeneratorTool = () => {
  const [receivedEmail, setReceivedEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [goal, setGoal] = useState("");
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [language, setLanguage] = useState("english");
  const [tone, setTone] = useState("professional");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(
    null,
  );
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    checkUsageAction("ai-email-response-generator").then((res) =>
      setIsLimitReached(res.isLimitReached),
    );
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedState(null), 2000);
  };

  const generateEmail = async () => {
    if (!receivedEmail.trim()) {
      toast.error("Please paste the received email content.");
      return;
    }

    setIsGenerating(true);
    setGeneratedEmail(null);

    try {
      const result = await generateEmailResponse({
        receivedEmail,
        subject,
        goal,
        sender,
        recipient,
        language,
        tone,
      });

      if (result.error) {
        toast.error(result.error);
        if (result.error.includes("Usage limit exceeded")) {
          setIsLimitReached(true);
        }
      } else {
        setGeneratedEmail({
          subject: result.subject,
          body: result.body,
        });
        toast.success("Email generated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
      checkUsageAction("ai-email-response-generator").then((res) =>
        setIsLimitReached(res.isLimitReached),
      );
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Input Section */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Email Details</CardTitle>
          <CardDescription>
            Provide context to generate the perfect response.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Received Email (Paste content here)</Label>
            <Textarea
              className="min-h-[120px] resize-y"
              placeholder="Paste the email you received..."
              value={receivedEmail}
              onChange={(e) => setReceivedEmail(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Subject (Optional)</Label>
              <Input
                placeholder="Re: Project Update"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Response Goal</Label>
              <Input
                placeholder="Accept meeting, ask for details, decline offer..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Sender Name (You)</Label>
              <Input
                placeholder="Your Name"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Recipient Name (They)</Label>
              <Input
                placeholder="Their Name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4">
            <Button
              variant="default"
              size="lg"
              className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
              onClick={generateEmail}
              disabled={isGenerating || isLimitReached}
            >
              {isLimitReached ? (
                <>Limit Reached</>
              ) : isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Writing Email...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate Response
                </>
              )}
            </Button>
            {isLimitReached && (
              <p className="text-xs text-red-500 text-center mt-2">
                You have used all your free generations for today.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {generatedEmail && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" /> Generated Email
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground uppercase text-xs font-bold tracking-wider">
                  Subject
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={generatedEmail.subject}
                    className="bg-background/50"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      handleCopy(generatedEmail.subject, "subject")
                    }
                    className="shrink-0"
                  >
                    {copiedState === "subject" ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground uppercase text-xs font-bold tracking-wider">
                  Message Body
                </Label>
                <div className="relative">
                  <Textarea
                    readOnly
                    value={generatedEmail.body}
                    className="min-h-[250px] bg-background/50 font-sans text-sm leading-relaxed p-4 resize-none"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2 gap-1 text-xs"
                    onClick={() => handleCopy(generatedEmail.body, "body")}
                  >
                    {copiedState === "body" ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    const fullEmail = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
                    handleCopy(fullEmail, "full");
                  }}
                >
                  {copiedState === "full" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  Copy Full Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EmailResponseGeneratorTool;

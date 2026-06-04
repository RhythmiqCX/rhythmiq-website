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
import {
  Copy,
  Check,
  Sparkles,
  Loader2,
  Phone,
  User,
  MessageCircle,
  Route,
  PhoneOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import { generateVoiceScript } from "@/actions/tools/generate-voice-script";
import { checkUsageAction } from "@/actions/tools/check-usage";

const BUSINESS_TYPES = [
  { value: "healthcare", label: "Healthcare & Medical" },
  { value: "real-estate", label: "Real Estate" },
  { value: "saas", label: "SaaS / Software" },
  { value: "ecommerce", label: "E-Commerce & Retail" },
  { value: "finance", label: "Finance & Banking" },
  { value: "insurance", label: "Insurance" },
  { value: "legal", label: "Legal Services" },
  { value: "education", label: "Education" },
  { value: "hospitality", label: "Hospitality & Hotels" },
  { value: "restaurant", label: "Restaurant & Food Service" },
  { value: "automotive", label: "Automotive" },
  { value: "telecom", label: "Telecom & Internet" },
  { value: "logistics", label: "Logistics & Shipping" },
  { value: "travel", label: "Travel & Tourism" },
  { value: "customer-support", label: "General Customer Support" },
  { value: "other", label: "Other" },
];

const TONES = [
  { value: "professional", label: "Professional & Polished" },
  { value: "friendly", label: "Friendly & Warm" },
  { value: "empathetic", label: "Empathetic & Supportive" },
  { value: "concise", label: "Concise & Direct" },
  { value: "formal", label: "Formal & Corporate" },
  { value: "casual", label: "Casual & Conversational" },
];

const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "hindi", label: "Hindi" },
  { value: "portuguese", label: "Portuguese" },
];

interface ScriptSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: string;
  color: string;
}

const AIVoiceAgentScriptGeneratorTool = () => {
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [customerQuery, setCustomerQuery] = useState("");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("english");

  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptSections, setScriptSections] = useState<ScriptSection[] | null>(
    null,
  );
  const [fullScript, setFullScript] = useState("");
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    checkUsageAction("ai-voice-agent-script-generator").then((res) =>
      setIsLimitReached(res.isLimitReached),
    );
  }, []);

  useEffect(() => {
    if (scriptSections) {
      setExpandedSections(new Set(scriptSections.map((s) => s.id)));
    }
  }, [scriptSections]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedState(null), 2000);
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleGenerate = async () => {
    if (!businessType) {
      toast.error("Please select a business type.");
      return;
    }
    if (!customerQuery.trim()) {
      toast.error("Please enter a customer query or scenario.");
      return;
    }

    setIsGenerating(true);
    setScriptSections(null);
    setFullScript("");

    try {
      const result = await generateVoiceScript({
        businessType,
        businessName,
        customerQuery,
        tone,
        language,
      });

      if (result.error) {
        toast.error(result.error);
        if (result.error.includes("Usage limit exceeded")) {
          setIsLimitReached(true);
        }
      } else {
        const sections: ScriptSection[] = [
          {
            id: "greeting",
            label: "Greeting",
            icon: <Phone className="w-4 h-4" />,
            content: result.greeting,
            color: "text-coral",
          },
          {
            id: "intent",
            label: "Intent Recognition",
            icon: <User className="w-4 h-4" />,
            content: result.intentRecognition,
            color: "text-coral",
          },
          {
            id: "response",
            label: "Information Response",
            icon: <MessageCircle className="w-4 h-4" />,
            content: result.informationResponse,
            color: "text-coral",
          },
          {
            id: "routing",
            label: "Call Routing",
            icon: <Route className="w-4 h-4" />,
            content: result.callRouting,
            color: "text-coral",
          },
          {
            id: "closing",
            label: "Closing",
            icon: <PhoneOff className="w-4 h-4" />,
            content: result.closing,
            color: "text-coral",
          },
        ];
        setScriptSections(sections);
        setFullScript(result.fullScript);
        toast.success("Voice script generated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
      checkUsageAction("ai-voice-agent-script-generator").then((res) =>
        setIsLimitReached(res.isLimitReached),
      );
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Input Section */}
      <Card className="border border-ink/10 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-coral" />
            Script Details
          </CardTitle>
          <CardDescription>
            Provide your business context and customer scenario to generate a
            professional AI voice script.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Business Type *</Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger id="business-type-select">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_TYPES.map((bt) => (
                    <SelectItem key={bt.value} value={bt.value}>
                      {bt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Business Name (Optional)</Label>
              <Input
                id="business-name-input"
                placeholder="e.g., RhythmiqCX"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Customer Query / Scenario *</Label>
            <Textarea
              id="customer-query-input"
              className="min-h-[120px] resize-y"
              placeholder="Describe the customer's question or scenario, e.g., 'Customer calls asking about pricing plans and wants to upgrade their current subscription'"
              value={customerQuery}
              onChange={(e) => setCustomerQuery(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-ink/10">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language-select">
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
                <SelectTrigger id="tone-select">
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
              id="generate-script-button"
              size="lg"
              className="btn btn-accent w-full gap-2"
              onClick={handleGenerate}
              disabled={isGenerating || isLimitReached}
            >
              {isLimitReached ? (
                <>Limit Reached</>
              ) : isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Generating
                  Script...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate Script
                </>
              )}
            </Button>
            {isLimitReached && (
              <p className="text-xs text-[#C9461F] text-center mt-2">
                You have used all your free generations for today.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {scriptSections && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          {/* Structured Script Sections */}
          <Card className="border border-ink/10 bg-white overflow-hidden">
            <CardHeader className="border-b border-ink/10">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-coral" />
                  Generated Voice Script
                </CardTitle>
                <Button
                  id="copy-full-script-button"
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => handleCopy(fullScript, "full")}
                >
                  {copiedState === "full" ? (
                    <Check className="w-3 h-3 text-[#1F7A4D]" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  Copy Full Script
                </Button>
              </div>
              <CardDescription>
                A structured AI voice agent script ready for deployment in your
                voice assistant or call automation platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {scriptSections.map((section, index) => (
                <div
                  key={section.id}
                  className={`border-b border-ink/10 last:border-b-0 transition-colors hover:bg-paper2`}
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg bg-coralSoft ${section.color}`}
                      >
                        {section.icon}
                      </div>
                      <div>
                        <span className="text-xs text-ink3 uppercase tracking-wider font-medium">
                          Step {index + 1}
                        </span>
                        <h4 className="font-semibold text-sm md:text-base text-ink">
                          {section.label}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(section.content, section.id);
                        }}
                      >
                        {copiedState === section.id ? (
                          <Check className="w-3.5 h-3.5 text-[#1F7A4D]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </Button>
                      {expandedSections.has(section.id) ? (
                        <ChevronUp className="w-4 h-4 text-ink3" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-ink3" />
                      )}
                    </div>
                  </button>
                  {expandedSections.has(section.id) && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                      <div className="bg-paper2 rounded-lg p-4 text-sm leading-relaxed text-ink border border-ink/10">
                        {section.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Full Script Preview */}
          <Card className="border border-ink/10 bg-white">
            <CardHeader>
              <CardTitle className="text-base">Full Script Preview</CardTitle>
              <CardDescription>
                Complete script in a single block — ready to copy into your AI
                voice platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  id="full-script-preview"
                  readOnly
                  value={fullScript}
                  className="min-h-[250px] bg-paper2 font-sans text-sm leading-relaxed p-4 resize-none"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2 gap-1 text-xs"
                  onClick={() => handleCopy(fullScript, "preview")}
                >
                  {copiedState === "preview" ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIVoiceAgentScriptGeneratorTool;

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Layers,
  Settings,
  Sparkles,
  Loader2,
  Check,
  Copy,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Building,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { generateReceptionistScript } from "@/actions/tools/generate-receptionist-script";

const INDUSTRIES = [
  "Healthcare & Clinic",
  "Legal Services",
  "Real Estate",
  "SaaS / Tech",
  "Home Services (Plumbing, HVAC, etc.)",
  "Financial Services",
  "Hospitality & Hotels",
  "E-commerce",
  "Automotive",
  "Logistics",
  "Other",
];

const SCENARIO_OPTIONS = [
  { id: "greeting", label: "Greeting / Opening Line", default: true },
  { id: "business-hours", label: "Business Hours Inquiry", default: true },
  {
    id: "transfer",
    label: "Transfer to Department / Team Member",
    default: true,
  },
  { id: "voicemail", label: "Leave a Message / Voicemail", default: true },
  { id: "callback", label: "Call Back Request", default: false },
  { id: "website-address", label: "Website / Address Inquiry", default: false },
  { id: "appointment-booking", label: "Appointment Booking", default: false },
  { id: "order-status", label: "Order Status / Tracking", default: false },
  {
    id: "property-inquiry",
    label: "Property Inquiry / Viewing Request",
    default: false,
  },
  {
    id: "prescription-refill",
    label: "Prescription Refill Routing",
    default: false,
  },
  {
    id: "case-intake",
    label: "Case Intake / New Client Inquiry",
    default: false,
  },
  {
    id: "billing-payment",
    label: "Billing & Payment Questions",
    default: false,
  },
  {
    id: "emergency-escalation",
    label: "Urgent / Emergency Escalation",
    default: false,
  },
  { id: "returns-refunds", label: "Returns & Refunds", default: false },
  { id: "lead-qualification", label: "Lead Qualification", default: false },
  { id: "after-hours", label: "After-Hours Message", default: false },
];

export default function AIReceptionistScriptGenerator() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [copiedState, setCopiedState] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    businessSize: "solo",
    phonePurpose: [] as string[],
    hoursOfOperation: "",
    scenarios: ["greeting", "business-hours", "transfer", "voicemail"],
    customScenario: "",
    tone: "professional",
    pace: "natural",
    includeFillers: true,
    callerPersona: "first-time",
    language: "english",
    scriptLength: "standard",
    includeInterruptionHandling: true,
    includeComplianceDisclaimer: false,
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedState(null), 2000);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateForm = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleScenario = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      scenarios: prev.scenarios.includes(id)
        ? prev.scenarios.filter((s) => s !== id)
        : [...prev.scenarios, id],
    }));
  };

  const handleGenerate = async () => {
    if (!formData.industry) {
      toast.error("Please select an industry in Step 1.");
      setStep(1);
      return;
    }
    if (formData.scenarios.length === 0 && !formData.customScenario) {
      toast.error("Please select at least one scenario in Step 2.");
      setStep(2);
      return;
    }

    setIsGenerating(true);
    setStep(5);

    try {
      const res = await generateReceptionistScript({
        businessName: formData.businessName,
        industry: formData.industry,
        businessSize: formData.businessSize,
        phonePurpose: formData.phonePurpose,
        hoursOfOperation: formData.hoursOfOperation,
        scenarios: formData.scenarios,
        customScenario: formData.customScenario,
        tone: formData.tone,
        pace: formData.pace,
        includeFillers: formData.includeFillers,
        callerPersona: formData.callerPersona,
        language: formData.language,
        scriptLength: formData.scriptLength,
        includeInterruptionHandling: formData.includeInterruptionHandling,
        includeComplianceDisclaimer: formData.includeComplianceDisclaimer,
      });

      if (res.error) {
        toast.error(res.error);
        setStep(4); // Go back before generation step
      } else {
        setResult(res);
        toast.success("Script generated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during generation.");
      setStep(4);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4 gap-4">
        {[
          { icon: Building, label: "Business" },
          { icon: Layers, label: "Scenarios" },
          { icon: MessageSquare, label: "Tone" },
          { icon: Settings, label: "Adjustments" },
          { icon: Wand2, label: "Script" },
        ].map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 whitespace-nowrap ${
              step === i + 1
                ? "text-primary"
                : step > i + 1
                  ? "text-primary/70"
                  : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step === i + 1
                  ? "border-primary bg-primary/10"
                  : step > i + 1
                    ? "border-primary/50 bg-primary/5"
                    : "border-muted"
              }`}
            >
              <s.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium hidden sm:block">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-xl">
        <CardHeader className="border-b border-border/50 pb-6">
          <CardTitle className="text-2xl flex items-center gap-2">
            {step === 1 && "Step 1: Business Profile"}
            {step === 2 && "Step 2: Key Call Scenarios"}
            {step === 3 && "Step 3: Tone & Personality"}
            {step === 4 && "Step 4: Advanced Settings"}
            {step === 5 && "Your Generated Script"}
          </CardTitle>
          <CardDescription>
            {step === 1 &&
              "The foundation. This maps the vocabulary and formality level."}
            {step === 2 && "What common situations should your AI handle?"}
            {step === 3 && "How should your AI sound to callers?"}
            {step === 4 && "Fine-tune the output formatting and edge cases."}
            {step === 5 && "Ready to deploy or use as a starting point."}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input
                  value={formData.businessName}
                  onChange={(e) => updateForm("businessName", e.target.value)}
                  placeholder="e.g. Acme Legal Corp"
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Industry <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.industry}
                  onValueChange={(val) => updateForm("industry", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry..." />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Business Size</Label>
                <RadioGroup
                  value={formData.businessSize}
                  onValueChange={(val) => updateForm("businessSize", val)}
                  className="flex flex-wrap gap-4"
                >
                  {[
                    { val: "solo", lbl: "Solo/Small (1-10)" },
                    { val: "growing", lbl: "Growing (11-50)" },
                    { val: "midsize", lbl: "Mid-size (51-200)" },
                    { val: "enterprise", lbl: "Enterprise+" },
                  ].map((sz) => (
                    <div key={sz.val} className="flex items-center space-x-2">
                      <RadioGroupItem value={sz.val} id={`size-${sz.val}`} />
                      <Label
                        htmlFor={`size-${sz.val}`}
                        className="cursor-pointer font-normal"
                      >
                        {sz.lbl}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Hours of Operation</Label>
                <Input
                  value={formData.hoursOfOperation}
                  onChange={(e) =>
                    updateForm("hoursOfOperation", e.target.value)
                  }
                  placeholder="e.g. 9 AM to 5 PM EST, Monday through Friday"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid sm:grid-cols-2 gap-4">
                {SCENARIO_OPTIONS.map((sce) => (
                  <div
                    key={sce.id}
                    className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <Checkbox
                      id={`sce-${sce.id}`}
                      checked={formData.scenarios.includes(sce.id)}
                      onCheckedChange={() => toggleScenario(sce.id)}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor={`sce-${sce.id}`}
                      className="cursor-pointer leading-tight font-medium"
                    >
                      {sce.label}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4 border-t border-border/50">
                <Label>Custom Scenario (Optional)</Label>
                <Textarea
                  placeholder="Describe a specific scenario your AI needs to handle..."
                  value={formData.customScenario}
                  onChange={(e) => updateForm("customScenario", e.target.value)}
                  className="h-24"
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <Label className="text-base">Vocal Tone</Label>
                <RadioGroup
                  value={formData.tone}
                  onValueChange={(val) => updateForm("tone", val)}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {[
                    {
                      v: "warm",
                      l: "Warm & Friendly",
                      d: "Approachable, conversational, uses first names",
                    },
                    {
                      v: "professional",
                      l: "Professional & Calm",
                      d: "Measured, clear, zero filler",
                    },
                    {
                      v: "confident",
                      l: "Confident & Efficient",
                      d: "Fast-paced, direct, no fluff",
                    },
                    {
                      v: "empathetic",
                      l: "Empathetic & Reassuring",
                      d: "Soft cadence, validating language",
                    },
                    {
                      v: "upbeat",
                      l: "Upbeat & Energetic",
                      d: "Bright tone, enthusiastic",
                    },
                    {
                      v: "neutral",
                      l: "Neutral / Balanced",
                      d: "Adaptable default, general business",
                    },
                  ].map((t) => (
                    <div
                      key={t.v}
                      className="flex items-start space-x-3 p-4 rounded-lg border border-border/50 bg-muted/10 relative"
                    >
                      <RadioGroupItem
                        value={t.v}
                        id={`tone-${t.v}`}
                        className="mt-1"
                      />
                      <div>
                        <Label
                          htmlFor={`tone-${t.v}`}
                          className="font-semibold cursor-pointer"
                        >
                          {t.l}
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <Label className="text-base">Conversational Pace</Label>
                <Select
                  value={formData.pace}
                  onValueChange={(val) => updateForm("pace", val)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slow">Slow & Measured</SelectItem>
                    <SelectItem value="natural">
                      Natural / Conversational (Default)
                    </SelectItem>
                    <SelectItem value="brisk">Brisk & Efficient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50">
                <div className="space-y-0.5">
                  <Label>Include Filler Phrases</Label>
                  <p className="text-xs text-muted-foreground">
                    Add natural phrases like &quot;Of course&quot; or
                    &quot;Absolutely&quot;
                  </p>
                </div>
                <Switch
                  checked={formData.includeFillers}
                  onCheckedChange={(val) => updateForm("includeFillers", val)}
                />
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Expected Caller Persona</Label>
                  <Select
                    value={formData.callerPersona}
                    onValueChange={(v) => updateForm("callerPersona", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-time">
                        First-time / General Inquiry
                      </SelectItem>
                      <SelectItem value="returning">
                        Returning Customer
                      </SelectItem>
                      <SelectItem value="angry">
                        Frustrated / Anxious Caller
                      </SelectItem>
                      <SelectItem value="mixed">
                        Mixed / Broad Audience
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Script Length</Label>
                  <Select
                    value={formData.scriptLength}
                    onValueChange={(v) => updateForm("scriptLength", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">
                        Concise (Brevity First)
                      </SelectItem>
                      <SelectItem value="standard">
                        Standard (Balanced)
                      </SelectItem>
                      <SelectItem value="detailed">
                        Detailed (Covers edge cases)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Primary Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(v) => updateForm("language", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="portuguese">Portuguese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="space-y-0.5 pr-4">
                    <Label className="font-semibold text-sm">
                      Add Interruption Handling
                    </Label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Include fallback lines for when the caller speaks over the
                      AI. Crucial for realistic voice AI deployment.
                    </p>
                  </div>
                  <Switch
                    checked={formData.includeInterruptionHandling}
                    onCheckedChange={(v) =>
                      updateForm("includeInterruptionHandling", v)
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="space-y-0.5 pr-4">
                    <Label className="font-semibold text-sm">
                      Add Compliance Disclaimer
                    </Label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Auto-append a call recording notice (TCPA / GDPR compliant
                      standard language) at the start.
                    </p>
                  </div>
                  <Switch
                    checked={formData.includeComplianceDisclaimer}
                    onCheckedChange={(v) =>
                      updateForm("includeComplianceDisclaimer", v)
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 - Generating / Result */}
          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                    <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">
                      Crafting your script...
                    </h3>
                    <p className="text-muted-foreground">
                      Tailoring vocabulary to{" "}
                      {formData.industry || "your industry"}
                    </p>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-8">
                  {/* Stats Banner */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Blocks
                      </span>
                      <p className="font-medium">
                        {result.blocks?.length || 0} Scenarios
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Avg Duration
                      </span>
                      <p className="font-medium text-emerald-500">
                        {result.usageNotes.estimatedAvgCallDuration}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Tone
                      </span>
                      <p className="font-medium capitalize">
                        {result.usageNotes.recommendedTone}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Status
                      </span>
                      <p className="font-medium text-blue-500 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Deployment Ready
                      </p>
                    </div>
                  </div>

                  {/* Scenarios Tabs-style list */}
                  <div className="space-y-4">
                    {result.blocks?.map(
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (block: any, idx: number) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-border/50 bg-card overflow-hidden"
                        >
                          <div className="flex items-center justify-between p-4 bg-muted/30 border-b border-border/50">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/20 text-primary text-xs font-bold">
                                {idx + 1}
                              </span>
                              {block.scenarioLabel}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 hover:bg-background"
                              onClick={() =>
                                handleCopy(block.content, block.scenarioId)
                              }
                            >
                              {copiedState === block.scenarioId ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <div className="p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                            {block.content}
                          </div>
                        </div>
                      ),
                    )}
                  </div>

                  {/* Full Script Textarea */}
                  <div className="space-y-2 mt-8">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg">Full Text Export</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleCopy(result.fullScript, "full")}
                      >
                        {copiedState === "full" ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        Copy All
                      </Button>
                    </div>
                    <Textarea
                      value={result.fullScript}
                      readOnly
                      className="min-h-[300px] font-mono text-sm leading-relaxed bg-muted/10 resize-y"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t border-border/50 p-6 bg-muted/10 rounded-b-xl">
          {step > 1 && step < 5 && (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          )}
          {step === 1 && <div />} {/* Spacer */}
          {step < 4 && (
            <Button className="ml-auto" onClick={() => setStep((s) => s + 1)}>
              Next Step <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {step === 4 && (
            <Button
              className="ml-auto bg-gradient-to-r from-primary to-indigo-600 border-0 text-white"
              onClick={handleGenerate}
            >
              <Sparkles className="w-4 h-4 mr-2" /> Generate Script
            </Button>
          )}
          {step === 5 && !isGenerating && (
            <Button variant="outline" onClick={() => setStep(4)}>
              <Settings className="w-4 h-4 mr-2" /> Refine Settings
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Post Gen CTA */}
      {step === 5 && !isGenerating && result && (
        <div className="mt-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-3">
            Your script is ready. Now deploy it.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            RhythmiqCX can run this exact script on real calls — with a
            human-like voice, sub-500ms latency, and zero hold queues.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a
                href="https://calendly.com/ray-rhythmiqcx/30min"
                target="_blank"
                rel="noreferrer"
              >
                Book a Live Demo
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/50"
              onClick={() => setStep(1)}
            >
              <Layers className="w-4 h-4 mr-2" /> Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

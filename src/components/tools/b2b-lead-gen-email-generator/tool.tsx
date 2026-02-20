"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MagicCard } from "@/components/ui/magic-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Send, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { generateB2BEmailAction } from "@/actions/tools/generate-b2b-email";

const tones = [
  "Formal",
  "Professional",
  "Casual",
  "Friendly",
  "Bold",
  "Direct",
  "Humorous",
  "Persuasive",
];

export default function B2BEmailGeneratorTool() {
  const [formData, setFormData] = useState({
    industry: "",
    jobTitle: "",
    painPoint: "",
    productDescription: "",
    tone: "Professional",
  });

  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (
      !formData.industry ||
      !formData.jobTitle ||
      !formData.painPoint ||
      !formData.productDescription
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setGeneratedContent(null);

    try {
      const result = await generateB2BEmailAction(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        setGeneratedContent(result);
        toast.success("Email templates generated successfully!");
      }
    } catch (error) {
      console.error("Error generating email:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <MagicCard
        className="p-8 border-border/50 shadow-2xl"
        gradientColor="rgba(59, 130, 246, 0.05)" // Blue tint for professional/B2B feel
      >
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
              B2B Lead Generation Tool
            </h2>
            <p className="text-muted-foreground mt-2">
              Create personalized cold outreach emails that get opened and
              convert.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">Target Industry</Label>
              <Input
                id="industry"
                name="industry"
                placeholder="e.g., SaaS, Healthcare, Real Estate"
                value={formData.industry}
                onChange={handleInputChange}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                placeholder="e.g., CTO, VP of Marketing"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="painPoint">Pain Point to Solve</Label>
              <Textarea
                id="painPoint"
                name="painPoint"
                placeholder="e.g., Struggling with high support ticket volume and slow response times."
                value={formData.painPoint}
                onChange={handleInputChange}
                className="min-h-[80px] bg-background/50 resize-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="productDescription">Your Product/Service</Label>
              <Textarea
                id="productDescription"
                name="productDescription"
                placeholder="e.g., AI-powered voice agents that automate customer support calls."
                value={formData.productDescription}
                onChange={handleInputChange}
                className="min-h-[80px] bg-background/50 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select
                value={formData.tone}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, tone: val }))
                }
              >
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
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Generate Outreach Kit
              </>
            )}
          </Button>
        </div>
      </MagicCard>

      {generatedContent && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Tabs defaultValue="email" className="w-full space-y-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-muted/50 p-1">
              <TabsTrigger value="email">Main Email</TabsTrigger>
              <TabsTrigger value="subjects">Subject Lines</TabsTrigger>
              <TabsTrigger value="followups">Follow-Ups</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
              <TabsTrigger value="pitch">Short Pitch</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <Card className="border-border/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">
                      Cold Outreach Email
                    </CardTitle>
                    <CardDescription>
                      Optimized for open rates and conversions.
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleCopy(generatedContent.mainEmail, "mainEmail")
                    }
                  >
                    {copiedKey === "mainEmail" ? (
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    Copy
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap leading-relaxed border border-border/50 text-sm md:text-base">
                    {generatedContent.mainEmail}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects">
              <Card className="border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Subject Lines</CardTitle>
                  <CardDescription>
                    High-converting subject lines to boost open rates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Handle potentially nested arrays or string output if AI messed up, although TS says string[] */}
                  {Array.isArray(generatedContent.subjectLines) ? (
                    generatedContent.subjectLines.map(
                      (subject: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50 group hover:border-blue-500/50 transition-colors"
                        >
                          <span className="font-medium text-sm md:text-base">
                            {subject}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() =>
                              handleCopy(subject, `subject-${idx}`)
                            }
                          >
                            {copiedKey === `subject-${idx}` ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      ),
                    )
                  ) : (
                    <p className="text-red-500">
                      Error displaying subject lines.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="followups">
              <div className="space-y-6">
                {Array.isArray(generatedContent.followUps) &&
                  generatedContent.followUps.map(
                    (followUp: string, idx: number) => (
                      <Card key={idx} className="border-border/50 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between py-3 bg-muted/30 border-b border-border/50">
                          <CardTitle className="text-base font-semibold">
                            Follow-Up Email #{idx + 1}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8"
                            onClick={() =>
                              handleCopy(followUp, `followup-${idx}`)
                            }
                          >
                            {copiedKey === `followup-${idx}` ? (
                              <Check className="w-4 h-4 mr-1 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 mr-1" />
                            )}
                            Copy
                          </Button>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                            {followUp}
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
              </div>
            </TabsContent>

            <TabsContent value="linkedin">
              <Card className="border-border/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle>LinkedIn Message</CardTitle>
                    <CardDescription>
                      Ideal for connection requests or InMail.
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleCopy(generatedContent.linkedIn, "linkedin")
                    }
                  >
                    {copiedKey === "linkedin" ? (
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    Copy
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap leading-relaxed border border-border/50 text-sm md:text-base">
                    {generatedContent.linkedIn}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pitch">
              <Card className="border-border/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle>Elevator Pitch</CardTitle>
                    <CardDescription>
                      Short, punchy pitch for quick intros.
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleCopy(generatedContent.shortPitch, "pitch")
                    }
                  >
                    {copiedKey === "pitch" ? (
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    Copy
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap leading-relaxed border border-border/50 text-sm md:text-base font-medium">
                    {generatedContent.shortPitch}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

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
import {
  Loader2,
  Copy,
  Check,
  Rocket,
  Home,
  Mail,
  MessageSquare,
  Phone,
  ShieldAlert,
  Megaphone,
} from "lucide-react";
import { toast } from "sonner";
import {
  generateSalesFunnelAction,
  SalesFunnelResponse,
} from "@/actions/tools/generate-sales-funnel";

const tones = ["Professional", "Bold", "Conversational", "Premium"];

export default function AISalesFunnelBuilderTool() {
  const [formData, setFormData] = useState({
    industry: "",
    productDescription: "",
    targetAudience: "",
    tone: "Professional",
  });

  const [generatedContent, setGeneratedContent] =
    useState<SalesFunnelResponse | null>(null);
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
      !formData.productDescription ||
      !formData.targetAudience
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setGeneratedContent(null);

    try {
      const result = await generateSalesFunnelAction(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        setGeneratedContent(result);
        toast.success("Sales funnel generated successfully!");
      }
    } catch (error) {
      console.error("Error generating sales funnel:", error);
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
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <MagicCard
        className="p-8 border-border/50 shadow-2xl"
        gradientColor="rgba(239, 68, 68, 0.05)"
      >
        <div className="space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              Build Your Funnel
            </h2>
            <p className="text-muted-foreground mt-2">
              Enter your product details to generate a complete, high-converting
              sales funnel.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                placeholder="e.g., SaaS, E-commerce, Real Estate"
                value={formData.industry}
                onChange={handleInputChange}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone of Voice</Label>
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

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="targetAudience">
                Target Audience <span className="text-red-500">*</span>
              </Label>
              <Input
                id="targetAudience"
                name="targetAudience"
                placeholder="e.g., Head of Customer Support at mid-size SaaS companies"
                value={formData.targetAudience}
                onChange={handleInputChange}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="productDescription">
                Product or Service Description{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="productDescription"
                name="productDescription"
                placeholder="e.g., AI customer support automation platform that resolves 50% of tickets."
                value={formData.productDescription}
                onChange={handleInputChange}
                className="min-h-[100px] bg-background/50 resize-none"
              />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Generating
                Funnel...
              </>
            ) : (
              <>
                <Rocket className="w-6 h-6 mr-2" /> Generate Complete Funnel
              </>
            )}
          </Button>
        </div>
      </MagicCard>

      {generatedContent && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
          <Tabs defaultValue="landing" className="w-full space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 bg-muted/50 p-1 min-h-[48px] h-auto">
              <TabsTrigger value="landing" className="flex items-center gap-2">
                <Home className="w-4 h-4" /> Landing
              </TabsTrigger>
              <TabsTrigger value="emails" className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Emails
              </TabsTrigger>
              <TabsTrigger value="ads" className="flex items-center gap-2">
                <Megaphone className="w-4 h-4" /> Ads
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> LinkedIn
              </TabsTrigger>
              <TabsTrigger value="call" className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> Calls
              </TabsTrigger>
              <TabsTrigger
                value="objections"
                className="flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" /> Objections
              </TabsTrigger>
            </TabsList>

            {/* Landing Page Copy */}
            <TabsContent value="landing">
              {generatedContent.landingPage && (
                <Card className="border-border/50 shadow-lg bg-background/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        Landing Page Copy
                      </CardTitle>
                      <CardDescription>
                        Optimized for conversions and clarity.
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleCopy(
                          `# ${generatedContent.landingPage?.headline}\n\n## ${generatedContent.landingPage?.subheadline}\n\n**Value Prop**: ${generatedContent.landingPage?.valueProposition}\n\n**Benefits**: \n${generatedContent.landingPage?.benefits.map((b) => "- " + b).join("\n")}\n\n**CTA**: ${generatedContent.landingPage?.cta}`,
                          "landingPage",
                        )
                      }
                    >
                      {copiedKey === "landingPage" ? (
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 mr-2" />
                      )}
                      Copy All
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2 text-center p-8 bg-muted/20 border-b border-border/50 rounded-t-lg">
                      <h1 className="text-4xl md:text-5xl font-black">
                        {generatedContent.landingPage.headline}
                      </h1>
                      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        {generatedContent.landingPage.subheadline}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 pt-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-red-500">
                          Value Proposition
                        </h3>
                        <p className="text-lg font-medium leading-relaxed">
                          {generatedContent.landingPage.valueProposition}
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-orange-500">
                          Key Benefits
                        </h3>
                        <ul className="space-y-2">
                          {generatedContent.landingPage.benefits.map(
                            (benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">
                                  {benefit}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-border/50 text-center">
                      <div className="inline-block px-8 py-4 bg-red-500 text-white font-bold text-lg rounded-lg shadow-xl shadow-red-500/20">
                        {generatedContent.landingPage.cta}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Email Sequence */}
            <TabsContent value="emails">
              <div className="space-y-6">
                {generatedContent.emailSequence?.map((email, idx) => (
                  <Card key={idx} className="border-border/50 shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between py-3 bg-muted/30 border-b border-border/50">
                      <CardTitle className="text-base font-semibold">
                        {email.type}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleCopy(
                            `Subject: ${email.subject}\n\n${email.body}`,
                            `email-${idx}`,
                          )
                        }
                      >
                        {copiedKey === `email-${idx}` ? (
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 mr-2" />
                        )}
                        Copy
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                      <div className="p-3 bg-muted/20 rounded-md border border-border/50">
                        <span className="font-semibold text-muted-foreground mr-2">
                          Subject:
                        </span>
                        <strong className="text-foreground">
                          {email.subject}
                        </strong>
                      </div>
                      <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                        {email.body}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Ad Copy */}
            <TabsContent value="ads">
              <div className="space-y-6">
                {generatedContent.adCopy?.map((ad, idx) => (
                  <Card key={idx} className="border-border/50 shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between py-3 bg-muted/30 border-b border-border/50">
                      <CardTitle className="text-base font-semibold">
                        {ad.type}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(ad.copy, `ad-${idx}`)}
                      >
                        {copiedKey === `ad-${idx}` ? (
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 mr-2" />
                        )}
                        Copy
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="whitespace-pre-wrap leading-relaxed p-4 bg-muted/10 rounded-lg border border-border/50 text-sm md:text-base">
                        {ad.copy}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* LinkedIn */}
            <TabsContent value="linkedin">
              <Card className="border-border/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">
                      LinkedIn Outreach Message
                    </CardTitle>
                    <CardDescription>
                      Short, punchy DM for connecting.
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleCopy(generatedContent.linkedIn || "", "linkedinMsg")
                    }
                  >
                    {copiedKey === "linkedinMsg" ? (
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    Copy Message
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/20 p-6 rounded-lg whitespace-pre-wrap leading-relaxed border border-border/50 text-base font-medium shadow-inner">
                    {generatedContent.linkedIn}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Call Script */}
            <TabsContent value="call">
              <Card className="border-border/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">Sales Call Script</CardTitle>
                    <CardDescription>
                      Step-by-step framework for discovery and closing.
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleCopy(
                        generatedContent.callScript || "",
                        "callScript",
                      )
                    }
                  >
                    {copiedKey === "callScript" ? (
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    Copy Script
                  </Button>
                </CardHeader>
                <CardContent>
                  <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none p-6 bg-muted/10 rounded-lg border border-border/50 whitespace-pre-wrap">
                    {generatedContent.callScript}
                  </article>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Objections */}
            <TabsContent value="objections">
              <div className="grid md:grid-cols-2 gap-6">
                {generatedContent.objectionHandling?.map((obj, idx) => (
                  <Card key={idx} className="border-border/50 shadow-md">
                    <CardHeader className="pb-3 border-b border-border/50">
                      <CardTitle className="text-base text-red-500 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" />
                        {obj.objection}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 relative">
                      <p className="text-sm md:text-base leading-relaxed text-muted-foreground pr-8">
                        {obj.response}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-2 text-muted-foreground"
                        onClick={() => handleCopy(obj.response, `obj-${idx}`)}
                      >
                        {copiedKey === `obj-${idx}` ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

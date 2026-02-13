"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  Briefcase,
  Copy,
  Check,
  RefreshCcw,
  Lightbulb,
  Sparkles,
} from "lucide-react";

// Mock AI Generation Function (In a real app, this would call an API)
/* eslint-disable @typescript-eslint/no-explicit-any */
const generateContent = async (
  type: "headline" | "summary" | "experience",
  data: any,
) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (type === "headline") {
    return `${data.role} | ${data.skills.split(",")[0]} Expert | Helping businesses scale with ${data.industry} solutions | ${data.currentCompany}`;
  }
  if (type === "summary") {
    return `Results-driven ${data.role} with over ${data.yearsExperience} years of experience in the ${data.industry} industry. Proven track record of delivering innovative solutions and driving growth. Expertise in ${data.skills}. Passionate about leveraging technology to solve complex business challenges.`;
  }
  if (type === "experience") {
    return `• Led development of scalable web applications using ${data.skills.split(",")[0]}.\n• Improved system performance by 30% through code optimization.\n• Collaborated with cross-functional teams to deliver projects on time and within budget.\n• Mentored junior developers and conducted code reviews to ensure high-quality standards.`;
  }
  return "";
};

export default function LinkedInProfileBuilderTool() {
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    industry: "",
    yearsExperience: "",
    skills: "",
    currentCompany: "",
    education: "",
  });

  // Generated Content State
  const [generatedContent, setGeneratedContent] = useState({
    headline: "",
    summary: "",
    experience: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (
    type: "headline" | "summary" | "experience",
  ) => {
    setLoading(type);
    try {
      const content = await generateContent(type, formData);
      setGeneratedContent((prev) => ({ ...prev, [type]: content }));
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setLoading(null);
    }
  };

  const handleGenerateAll = async () => {
    setLoading("all");
    try {
      const headline = await generateContent("headline", formData);
      const summary = await generateContent("summary", formData);
      const experience = await generateContent("experience", formData);
      setGeneratedContent({ headline, summary, experience });
      setActiveTab("preview");
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setLoading(null);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="details">1. Enter Details</TabsTrigger>
          <TabsTrigger value="preview">2. Generated Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal & Professional Details
              </CardTitle>
              <CardDescription>
                Provide your information to generate a tailored profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Current Role / Target Job</Label>
                  <Input
                    id="role"
                    name="role"
                    placeholder="Software Engineer"
                    value={formData.role}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    placeholder="Tech / Marketing / Finance"
                    value={formData.industry}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentCompany">Current Company</Label>
                  <Input
                    id="currentCompany"
                    name="currentCompany"
                    placeholder="Company Name"
                    value={formData.currentCompany}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <Input
                    id="yearsExperience"
                    name="yearsExperience"
                    type="number"
                    placeholder="5"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Latest Education</Label>
                  <Input
                    id="education"
                    name="education"
                    placeholder="BS Computer Science"
                    value={formData.education}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills (Comma separated)</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  placeholder="React, Node.js, Project Management, SEO..."
                  value={formData.skills}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-muted-foreground">
                  Highlights your achievements and skills in a format that
                  hiring managers and recruiters prefer.
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  size="lg"
                  onClick={handleGenerateAll}
                  disabled={
                    loading === "all" || !formData.role || !formData.skills
                  }
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading === "all" ? (
                    <>
                      <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Profile...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Full Profile
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-8">
          {/* Headline Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Professional Headline
                </CardTitle>
                <CardDescription>
                  A catchy headline to grab recruiters&apos; attention.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGenerate("headline")}
                disabled={loading === "headline"}
              >
                {loading === "headline" ? (
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCcw className="w-4 h-4" />
                )}
                <span className="sr-only">Regenerate</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative mt-2 p-4 bg-muted/40 rounded-lg border border-border/50">
                <p className="text-lg font-medium text-foreground">
                  {generatedContent.headline ||
                    "Your headline will appear here..."}
                </p>
                {generatedContent.headline && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={() =>
                      handleCopy(generatedContent.headline, "headline")
                    }
                  >
                    {copied === "headline" ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  About Section (Summary)
                </CardTitle>
                <CardDescription>
                  A compelling summary of your professional journey.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGenerate("summary")}
                disabled={loading === "summary"}
              >
                {loading === "summary" ? (
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCcw className="w-4 h-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative mt-2 p-4 bg-muted/40 rounded-lg border border-border/50 min-h-[100px]">
                <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
                  {generatedContent.summary ||
                    "Your summary will appear here..."}
                </p>
                {generatedContent.summary && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={() =>
                      handleCopy(generatedContent.summary, "summary")
                    }
                  >
                    {copied === "summary" ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-500" />
                  Experience Descriptions
                </CardTitle>
                <CardDescription>
                  Bullet points optimized for impact and results.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGenerate("experience")}
                disabled={loading === "experience"}
              >
                {loading === "experience" ? (
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCcw className="w-4 h-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative mt-2 p-4 bg-muted/40 rounded-lg border border-border/50 min-h-[100px]">
                <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap font-mono text-sm">
                  {generatedContent.experience ||
                    "Your experience bullets will appear here..."}
                </p>
                {generatedContent.experience && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={() =>
                      handleCopy(generatedContent.experience, "experience")
                    }
                  >
                    {copied === "experience" ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-8">
            <Button variant="outline" onClick={() => setActiveTab("details")}>
              Modify Details
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

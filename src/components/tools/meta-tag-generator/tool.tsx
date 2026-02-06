"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterCard: string;
}

const MetaTagGeneratorTool = () => {
  const [values, setValues] = useState<MetaTags>({
    title: "",
    description: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogUrl: "",
    ogType: "website",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    twitterCard: "summary_large_image",
  });

  const [generatedCode, setGeneratedCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Update specific fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };

      // Auto-fill OG and Twitter fields if they are empty when main fields change
      if (name === "title") {
        if (!prev.ogTitle) newValues.ogTitle = value;
        if (!prev.twitterTitle) newValues.twitterTitle = value;
      }
      if (name === "description") {
        if (!prev.ogDescription) newValues.ogDescription = value;
        if (!prev.twitterDescription) newValues.twitterDescription = value;
      }

      return newValues;
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Generate HTML
  useEffect(() => {
    const {
      title,
      description,
      keywords,
      ogTitle,
      ogDescription,
      ogImage,
      ogUrl,
      ogType,
      twitterTitle,
      twitterDescription,
      twitterImage,
      twitterCard,
    } = values;

    const html = `<!-- Primary Meta Tags -->
<title>${title || "Meta Tag Generator - Rhythmiq"}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ""}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${ogUrl}">
<meta property="og:title" content="${ogTitle || title}">
<meta property="og:description" content="${ogDescription || description}">
${ogImage ? `<meta property="og:image" content="${ogImage}">` : ""}

<!-- Twitter -->
<meta property="twitter:card" content="${twitterCard}">
<meta property="twitter:url" content="${ogUrl}">
<meta property="twitter:title" content="${twitterTitle || title}">
<meta property="twitter:description" content="${twitterDescription || description}">
${twitterImage ? `<meta property="twitter:image" content="${twitterImage}">` : ""}`.trim();

    setGeneratedCode(html);
  }, [values]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setIsCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetForm = () => {
    setValues({
      title: "",
      description: "",
      keywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      ogUrl: "",
      ogType: "website",
      twitterTitle: "",
      twitterDescription: "",
      twitterImage: "",
      twitterCard: "summary_large_image",
    });
    toast.info("Form reset");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        {/* Basic SEO */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Basic SEO Meta Tags</CardTitle>
            <CardDescription>
              These tags are essential for search engine ranking.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Rhythmiq - AI Customer Support"
                value={values.title}
                onChange={handleChange}
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground text-right">
                {values.title.length}/60 recommended
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="e.g. Automate your support with AI..."
                value={values.description}
                onChange={handleChange}
                maxLength={160}
                className="resize-none h-24"
              />
              <p className="text-xs text-muted-foreground text-right">
                {values.description.length}/160 recommended
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (Optional)</Label>
              <Input
                id="keywords"
                name="keywords"
                placeholder="e.g. ai, customer support, automation"
                value={values.keywords}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Open Graph */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Open Graph (Facebook, LinkedIn)</CardTitle>
            <CardDescription>
              Control how your content looks when shared on social media.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2 md:col-span-1">
                <Label htmlFor="ogType">Type</Label>
                <Select
                  value={values.ogType}
                  onValueChange={(val) => handleSelectChange("ogType", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="profile">Profile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2 md:col-span-1">
                <Label htmlFor="ogUrl">URL</Label>
                <Input
                  id="ogUrl"
                  name="ogUrl"
                  placeholder="https://example.com"
                  value={values.ogUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogTitle">OG Title</Label>
              <Input
                id="ogTitle"
                name="ogTitle"
                placeholder="Title for social media"
                value={values.ogTitle}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogDescription">OG Description</Label>
              <Textarea
                id="ogDescription"
                name="ogDescription"
                placeholder="Description for social media"
                value={values.ogDescription}
                onChange={handleChange}
                className="resize-none h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogImage">OG Image URL</Label>
              <Input
                id="ogImage"
                name="ogImage"
                placeholder="https://example.com/image.jpg"
                value={values.ogImage}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Twitter */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Twitter Card</CardTitle>
            <CardDescription>
              Customize appearance for Twitter shares.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="twitterCard">Card Type</Label>
              <Select
                value={values.twitterCard}
                onValueChange={(val) => handleSelectChange("twitterCard", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="summary_large_image">
                    Summary Large Image
                  </SelectItem>
                  <SelectItem value="app">App</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitterTitle">Twitter Title</Label>
              <Input
                id="twitterTitle"
                name="twitterTitle"
                placeholder="Twitter specific title"
                value={values.twitterTitle}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitterDescription">Twitter Description</Label>
              <Textarea
                id="twitterDescription"
                name="twitterDescription"
                placeholder="Twitter specific description"
                value={values.twitterDescription}
                onChange={handleChange}
                className="resize-none h-20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitterImage">Twitter Image URL</Label>
              <Input
                id="twitterImage"
                name="twitterImage"
                placeholder="https://example.com/twitter-image.jpg"
                value={values.twitterImage}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Output Section */}
      <div className="space-y-6">
        <div className="sticky top-24">
          <Card className="border-primary/20 bg-primary/5 backdrop-blur-sm overflow-hidden h-fit">
            <CardHeader className="border-b border-border/10 bg-muted/20">
              <div className="flex items-center justify-between">
                <CardTitle>Generated Code</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetForm}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    title="Reset Form"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-2"
                    variant={isCopied ? "outline" : "default"}
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {isCopied ? "Copied" : "Copy Code"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <pre className="p-6 overflow-x-auto text-sm font-mono text-muted-foreground bg-[#0f1117]">
                <code>{generatedCode}</code>
              </pre>
            </CardContent>
          </Card>

          <div className="mt-8 p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
            <h3 className="flex items-center gap-2 font-semibold text-blue-500 mb-2">
              ℹ️ SEO Tips
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
              <li>Title should be unique and max 60 characters.</li>
              <li>
                Meta description interacts with click-through rates (CTR). Keep
                it under 160 characters.
              </li>
              <li>
                Use high-quality images for OG tags (recommended 1200x630px).
              </li>
              <li>
                Test your tags using LinkedIn Post Inspector or Facebook
                Debugger.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaTagGeneratorTool;

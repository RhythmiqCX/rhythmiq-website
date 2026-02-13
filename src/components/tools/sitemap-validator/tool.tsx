"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Search,
  FileCode,
  Globe,
  Download,
} from "lucide-react";
import { fetchSitemapAction } from "@/actions/tools/sitemap-validator";

interface ValidationIssue {
  type: "error" | "warning";
  message: string;
}

interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  urlCount: number;
  lastModCount: number;
  priorityCount: number;
  changeFreqCount: number;
  sitemapType: "urlset" | "sitemapindex" | "unknown";
  contentType: string;
  sizeBytes: number;
}

export default function SitemapValidatorTool() {
  const [activeTab, setActiveTab] = useState("url");
  const [url, setUrl] = useState("");
  const [manualXml, setManualXml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleValidate = async () => {
    setError(null);
    setResult(null);

    let contentToValidate = "";
    let contentType = "xml";

    if (activeTab === "url") {
      if (!url.trim()) {
        setError("Please enter a Sitemap URL.");
        return;
      }
      setLoading(true);
      try {
        const fetchRes = await fetchSitemapAction(url);
        if (fetchRes.error) {
          setError(fetchRes.error);
          setLoading(false);
          return;
        }
        contentToValidate = fetchRes.content || "";
        contentType = fetchRes.contentType || "xml";
      } catch (err: any) {
        setError(err.message || "Failed to fetch sitemap.");
        setLoading(false);
        return;
      }
    } else {
      if (!manualXml.trim()) {
        setError("Please paste XML content.");
        return;
      }
      contentToValidate = manualXml;
      contentType = "text/xml";
      setLoading(true);
    }

    // Client-side Validation Logic
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(contentToValidate, "text/xml");

      const parserError = doc.querySelector("parsererror");
      if (parserError) {
        setError("Invalid XML format: Unable to parse the content.");
        setLoading(false);
        return;
      }

      const issues: ValidationIssue[] = [];
      let urlCount = 0;
      let lastModCount = 0;
      let priorityCount = 0;
      let changeFreqCount = 0;
      let sitemapType: ValidationResult["sitemapType"] = "unknown";

      const urlset = doc.querySelector("urlset");
      const sitemapindex = doc.querySelector("sitemapindex");

      if (urlset) {
        sitemapType = "urlset";
        const urls = urlset.querySelectorAll("url");
        urlCount = urls.length;

        if (urlCount > 50000) {
          issues.push({
            type: "error",
            message: `Sitemap contains ${urlCount} URLs (limit is 50,000).`,
          });
        }

        urls.forEach((urlNode, index) => {
          const loc = urlNode.querySelector("loc");
          const lastmod = urlNode.querySelector("lastmod");
          const priority = urlNode.querySelector("priority");
          const changefreq = urlNode.querySelector("changefreq");

          if (!loc || !loc.textContent?.trim()) {
            issues.push({
              type: "error",
              message: `URL at index ${index + 1} is missing <loc> tag.`,
            });
          } else {
            try {
              new URL(loc.textContent.trim());
            } catch {
              issues.push({
                type: "error",
                message: `URL at index ${index + 1} has invalid <loc> format: "${loc.textContent}"`,
              });
            }
          }

          if (lastmod) {
            lastModCount++;
            // Basic ISO check
            if (isNaN(Date.parse(lastmod.textContent || ""))) {
              issues.push({
                type: "warning",
                message: `URL at index ${index + 1} has invalid <lastmod> date format.`,
              });
            }
          } else {
            // Not strictly an error, but worth noting as warning if desired, or just count.
          }

          if (priority) {
            priorityCount++;
            const pVal = parseFloat(priority.textContent || "-1");
            if (pVal < 0.0 || pVal > 1.0) {
              issues.push({
                type: "warning",
                message: `URL at index ${index + 1} has invalid <priority> value (must be 0.0 to 1.0).`,
              });
            }
          }

          if (changefreq) changeFreqCount++;
        });
      } else if (sitemapindex) {
        sitemapType = "sitemapindex";
        const sitemaps = sitemapindex.querySelectorAll("sitemap");
        urlCount = sitemaps.length; // Counting sitemaps as "URLs" in context of index

        if (urlCount > 50000) {
          issues.push({
            type: "error",
            message: `Sitemap Index contains ${urlCount} sitemaps (limit is 50,000).`,
          });
        }

        sitemaps.forEach((smNode, index) => {
          const loc = smNode.querySelector("loc");
          const lastmod = smNode.querySelector("lastmod");

          if (!loc || !loc.textContent?.trim()) {
            issues.push({
              type: "error",
              message: `Sitemap at index ${index + 1} is missing <loc> tag.`,
            });
          }
          if (lastmod) lastModCount++;
        });
      } else {
        issues.push({
          type: "error",
          message: "Root element must be <urlset> or <sitemapindex>.",
        });
      }

      // Check file size (approximate for string)
      const sizeBytes = new Blob([contentToValidate]).size;
      if (sizeBytes > 50 * 1024 * 1024) {
        // 50MB
        issues.push({
          type: "error",
          message: `Sitemap size exceeds 50MB limit (${(sizeBytes / 1024 / 1024).toFixed(2)}MB).`,
        });
      }

      setResult({
        valid: issues.filter((i) => i.type === "error").length === 0,
        issues,
        urlCount,
        lastModCount,
        priorityCount,
        changeFreqCount,
        sitemapType,
        contentType,
        sizeBytes,
      });
    } catch (err: any) {
      setError("Validation failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUrl("");
    setManualXml("");
    setResult(null);
    setError(null);
  };

  const handleDownloadReport = () => {
    if (!result) return;

    const reportContent = `Sitemap Validation Report
Date: ${new Date().toISOString()}
Type: ${result.sitemapType}
Status: ${result.valid ? "Valid" : "Invalid"}
URLs Found: ${result.urlCount}
Issues Found: ${result.issues.length}

Issues:
${result.issues.map((i) => `[${i.type.toUpperCase()}] ${i.message}`).join("\n")}
`;
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap-validation-report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      {/* Input Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-500" />
            Validate Sitemap
          </Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground hover:text-destructive"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
          <Tabs
            defaultValue="url"
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="url">Enter Sitemap URL</TabsTrigger>
              <TabsTrigger value="xml">Paste XML Code</TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url-input">Sitemap URL</Label>
                <div className="relative">
                  <Input
                    id="url-input"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/sitemap.xml"
                    className="pl-10 h-12"
                    onKeyDown={(e) => e.key === "Enter" && handleValidate()}
                  />
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="xml" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="xml-input">XML Content</Label>
                <Textarea
                  id="xml-input"
                  value={manualXml}
                  onChange={(e) => setManualXml(e.target.value)}
                  placeholder='<?xml version="1.0" encoding="UTF-8"?>...'
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
            </TabsContent>

            <Button
              size="lg"
              className="w-full mt-4 font-semibold h-12"
              onClick={handleValidate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validating...
                </>
              ) : (
                "Validate Sitemap"
              )}
            </Button>
          </Tabs>

          {error && (
            <Alert
              variant="destructive"
              className="mt-6 animate-in fade-in slide-in-from-top-2"
            >
              <AlertTitle className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Validation Error
              </AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Validation Results
            </h2>
            <Button variant="outline" size="sm" onClick={handleDownloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-lg border flex flex-col items-center justify-center text-center gap-2 ${result.valid ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400" : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"}`}
            >
              {result.valid ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <XCircle className="w-8 h-8" />
              )}
              <div className="font-bold text-lg">
                {result.valid ? "Valid Sitemap" : "Issues Found"}
              </div>
            </div>
            <div className="p-4 rounded-lg border bg-card flex flex-col items-center justify-center text-center gap-1">
              <div className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">
                Type
              </div>
              <div className="text-2xl font-bold capitalize">
                {result.sitemapType}
              </div>
            </div>
            <div className="p-4 rounded-lg border bg-card flex flex-col items-center justify-center text-center gap-1">
              <div className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">
                URLs Found
              </div>
              <div className="text-2xl font-bold">
                {result.urlCount.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="border border-border rounded-xl overflow-hidden bg-card">
            <div className="p-4 bg-muted/30 border-b border-border font-semibold flex items-center gap-2">
              <FileCode className="w-4 h-4" />
              Detailed Analysis
            </div>
            <div className="p-6 space-y-4">
              {result.issues.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground flex flex-col items-center gap-3">
                  <CheckCircle2 className="w-12 h-12 text-green-500/20" />
                  <p>
                    No issues found! Your sitemap follows standard guidelines.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-sm flex items-start gap-3 ${issue.type === "error" ? "bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400" : "bg-yellow-500/5 border-yellow-500/20 text-yellow-600 dark:text-yellow-400"}`}
                    >
                      {issue.type === "error" ? (
                        <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                      )}
                      <span>{issue.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-muted/30 border-t border-border p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">Format</span>
                <span>XML 1.0</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">Encoding</span>
                <span>UTF-8</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">
                  Priority Tags
                </span>
                <span>{result.priorityCount} found</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">
                  LastMod Tags
                </span>
                <span>{result.lastModCount} found</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Search,
  Globe,
  FileCode,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  findSitemapsAction,
  SitemapFinderResult,
} from "@/actions/tools/sitemap-finder";
import { cn } from "@/lib";

export default function SitemapFinderTool() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SitemapFinderResult | null>(null);

  const handleFind = async () => {
    setError(null);
    setResult(null);

    if (!domain.trim()) {
      setError("Please enter a website URL.");
      return;
    }

    setLoading(true);

    try {
      // Basic normalization client-side
      let url = domain.trim();
      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }

      const finderResult = await findSitemapsAction(url);

      if (finderResult.error) {
        setError(finderResult.error);
      } else {
        setResult(finderResult);
      }
    } catch (err: any) {
      setError("Failed to find sitemaps. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDomain("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-500" />
              Find & Check Sitemaps
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

          <div className="p-6 bg-card rounded-xl border border-border shadow-sm space-y-6">
            <div className="space-y-2">
              <Label htmlFor="domain-input">Website URL</Label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Input
                    id="domain-input"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="https://example.com"
                    className="pl-10 h-12 text-lg"
                    onKeyDown={(e) => e.key === "Enter" && handleFind()}
                  />
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                <Button
                  size="lg"
                  className="h-12 px-8 font-semibold"
                  onClick={handleFind}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    "Scan Website"
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                We'll check robots.txt and common paths to discover all public
                sitemaps.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-destructive text-sm font-medium animate-in slide-in-from-top-2 fade-in bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                Total Sitemaps
              </div>
              <div className="text-3xl font-bold">
                {result.summary.totalSitemaps}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                Total URLs Found
              </div>
              <div className="text-3xl font-bold text-primary">
                {result.summary.totalUrls.toLocaleString()}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                Broken Sitemaps
              </div>
              <div
                className={cn(
                  "text-3xl font-bold",
                  result.summary.brokenSitemaps > 0
                    ? "text-destructive"
                    : "text-green-500",
                )}
              >
                {result.summary.brokenSitemaps}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                Missing LastMod
              </div>
              <div className="text-3xl font-bold text-orange-500">
                {result.summary.totalMissingLastMod}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileCode className="w-5 h-5 text-purple-500" />
              Discovered Sitemaps
            </h2>

            <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-card">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[50%]">Sitemap URL</TableHead>
                    <TableHead className="w-[15%]">Status</TableHead>
                    <TableHead className="w-[15%]">Type</TableHead>
                    <TableHead className="w-[10%] text-right">URLs</TableHead>
                    <TableHead className="w-[10%] text-right">Valid</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.sitemaps.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No sitemaps found. Check if /robots.txt exists or if
                        standard paths like /sitemap.xml are used.
                      </TableCell>
                    </TableRow>
                  ) : (
                    result.sitemaps.map((sitemap, idx) => (
                      <TableRow key={idx} className="hover:bg-muted/30">
                        <TableCell className="font-medium break-all">
                          <a
                            href={sitemap.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center hover:underline hover:text-primary transition-colors gap-2 group"
                          >
                            {sitemap.url}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold",
                              sitemap.status === 200
                                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                                : "bg-red-500/10 text-red-600 border border-red-500/20",
                            )}
                          >
                            {sitemap.status === 0 ? "Error" : sitemap.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/50">
                            {sitemap.type}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm">
                          {sitemap.urlCount > 0
                            ? sitemap.urlCount.toLocaleString()
                            : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          {sitemap.valid ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive ml-auto" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

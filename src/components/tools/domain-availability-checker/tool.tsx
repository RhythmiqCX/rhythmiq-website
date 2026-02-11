"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  AlertCircle,
  Search,
  ExternalLink,
  Globe,
  RotateCcw,
} from "lucide-react";
import {
  checkDomainAvailability,
  DomainCheckResult,
} from "@/actions/tools/domain-checker";
import { cn } from "@/lib";

const EXTENSIONS = [
  { value: ".com", label: ".com" },
  { value: ".net", label: ".net" },
  { value: ".org", label: ".org" },
  { value: ".io", label: ".io" },
  { value: ".co", label: ".co" },
  { value: ".ai", label: ".ai" },
  { value: ".dev", label: ".dev" },
  { value: ".app", label: ".app" },
  { value: ".biz", label: ".biz" },
  { value: ".info", label: ".info" },
];

const DEFAULT_EXTENSIONS = [".com", ".net", ".org", ".io", ".co"];

export default function DomainAvailabilityCheckerTool() {
  const [domain, setDomain] = useState("");
  const [selectedExtensions, setSelectedExtensions] =
    useState<string[]>(DEFAULT_EXTENSIONS);
  const [results, setResults] = useState<DomainCheckResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateCheck = async () => {
    setError(null);
    setResults([]);

    if (!domain.trim()) {
      setError("Please enter a domain name.");
      return;
    }

    if (selectedExtensions.length === 0) {
      setError("Please select at least one extension.");
      return;
    }

    setLoading(true);

    try {
      // Clean domain input just in case (remove protocol/www/extension if typed)
      const cleanName = domain
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .split(".")[0];

      const checkResults = await checkDomainAvailability(
        cleanName,
        selectedExtensions,
      );
      setResults(checkResults);
    } catch (err) {
      console.error(err);
      setError("Failed to check domain availability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleExtension = (ext: string) => {
    setSelectedExtensions((prev) =>
      prev.includes(ext) ? prev.filter((e) => e !== ext) : [...prev, ext],
    );
  };

  const handleReset = () => {
    setDomain("");
    setSelectedExtensions(DEFAULT_EXTENSIONS);
    setResults([]);
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
              Search Domain
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
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="domain-input">Domain Name</Label>
                <div className="relative">
                  <Input
                    id="domain-input"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example"
                    className="pl-10 h-12 text-lg"
                    onKeyDown={(e) => e.key === "Enter" && handleCreateCheck()}
                  />
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              <Button
                size="lg"
                className="h-12 px-8 font-semibold"
                onClick={handleCreateCheck}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  "Check Availability"
                )}
              </Button>
            </div>

            <div className="space-y-3">
              <Label>Select Extensions</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {EXTENSIONS.map((ext) => (
                  <div
                    key={ext.value}
                    className={cn(
                      "flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors hover:bg-muted/50",
                      selectedExtensions.includes(ext.value)
                        ? "border-primary bg-primary/5"
                        : "border-border",
                    )}
                    onClick={() => toggleExtension(ext.value)}
                  >
                    <Checkbox
                      id={ext.value}
                      checked={selectedExtensions.includes(ext.value)}
                      onCheckedChange={() => toggleExtension(ext.value)}
                    />
                    <label
                      htmlFor={ext.value}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                    >
                      {ext.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-destructive text-sm font-medium animate-in slide-in-from-top-2 fade-in bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Availability Results
          </h2>

          <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-card">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[40%]">Domain</TableHead>
                  <TableHead className="w-[30%]">Status</TableHead>
                  <TableHead className="w-[30%] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.domain} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-lg">
                      {result.domain}
                    </TableCell>
                    <TableCell>
                      {result.status === "available" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-600 border border-green-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Available
                        </span>
                      ) : result.status === "taken" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 border border-red-500/20">
                          <XCircle className="w-3.5 h-3.5" />
                          Taken
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Unknown
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {result.status === "available" ? (
                        <Button
                          variant="default"
                          size="sm"
                          asChild
                          className="h-8"
                        >
                          <a
                            href={`https://www.namecheap.com/domains/registration/results/?domain=${result.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Register Now
                            <ExternalLink className="w-3.5 h-3.5 ml-2" />
                          </a>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-8"
                        >
                          <a
                            href={`https://who.is/whois/${result.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View WHOIS
                            <Search className="w-3.5 h-3.5 ml-2" />
                          </a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

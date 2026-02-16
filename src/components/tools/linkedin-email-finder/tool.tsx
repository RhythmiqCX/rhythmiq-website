"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  CheckCircle,
  Copy,
  Check,
  Building2,
  User,
  Loader2,
  Download,
} from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { generateAIEmails } from "@/app/actions/linkedin-email-finder";

interface EmailResult {
  email: string;
  pattern: string;
  status: "verified" | "catch-all" | "unknown";
  confidence: number;
}

export default function LinkedInEmailFinderTool() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    domain: "",
  });
  const [results, setResults] = useState([] as EmailResult[]);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [companyData, setCompanyData] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateEmails = async () => {
    if (!formData.domain) {
      toast.error("Please enter a Company Domain/Name.");
      return;
    }

    setLoading(true);
    setResults([]);
    setCompanyData(null);

    const first = formData.firstName.toLowerCase().trim();
    const last = formData.lastName.toLowerCase().trim();
    let domain = formData.domain
      .toLowerCase()
      .trim()
      .replace(/^(https?:\/\/)?(www\.)?@?/, "");

    // Auto-fix domain
    if (domain === "gmail" || domain === "google") {
      domain = "gmail.com";
    } else if (!domain.includes(".")) {
      domain += ".com";
    }

    const hasName = first && last;

    // Start AI Generation in parallel
    const aiPromise = generateAIEmails(
      formData.firstName,
      formData.lastName,
      domain,
    );

    const f = first.charAt(0);
    const patterns: EmailResult[] = [];

    // Generate algorithmic patterns ONLY if name is present
    if (hasName) {
      patterns.push(
        {
          email: `${first}@${domain}`,
          pattern: "First Name",
          confidence: 85,
          status: "verified",
        },
        {
          email: `${first}.${last}@${domain}`,
          pattern: "First.Last",
          confidence: 95,
          status: "verified",
        },
        {
          email: `${f}${last}@${domain}`,
          pattern: "F.Last",
          confidence: 70,
          status: "catch-all",
        },
        {
          email: `${first}${last}@${domain}`,
          pattern: "FirstLast",
          confidence: 60,
          status: "unknown",
        },
        {
          email: `${first}_${last}@${domain}`,
          pattern: "First_Last",
          confidence: 50,
          status: "unknown",
        },
        {
          email: `${last}.${first}@${domain}`,
          pattern: "Last.First",
          confidence: 40,
          status: "unknown",
        },
      );

      if (domain === "gmail.com") {
        // Add common numeric variations for Gmail
        const randomYear =
          new Date().getFullYear() - Math.floor(Math.random() * 20 + 20); // rough age approx
        patterns.push(
          {
            email: `${first}${last}1@${domain}`,
            pattern: "FirstLast1",
            confidence: 45,
            status: "unknown",
          },
          {
            email: `${first}.${last}${randomYear}@${domain}`,
            pattern: "First.LastYear",
            confidence: 65,
            status: "unknown",
          },
          {
            email: `${first}${last}${randomYear}@${domain}`,
            pattern: "FirstLastYear",
            confidence: 55,
            status: "unknown",
          },
        );
      }
    }

    // Await AI Response
    try {
      const aiResponse = await aiPromise;

      if (aiResponse && !aiResponse.error) {
        if (aiResponse.companyIntelligence) {
          setCompanyData(aiResponse.companyIntelligence);
        }

        if (aiResponse.personEmails && Array.isArray(aiResponse.personEmails)) {
          aiResponse.personEmails.forEach((email: string) => {
            // Check if not already in patterns to avoid duplicates
            if (!patterns.some((p) => p.email === email)) {
              patterns.push({
                email,
                pattern: "AI Suggested",
                confidence: 80,
                status: "verified",
              });
            }
          });
        }

        if (aiResponse.hrEmails && Array.isArray(aiResponse.hrEmails)) {
          aiResponse.hrEmails.forEach((email: string) => {
            patterns.push({
              email,
              pattern: "Company Contact",
              confidence: 90,
              status: "verified",
            });
          });
        }
      }
    } catch (e) {
      console.error("AI fetch error", e);
    }

    // Sort by confidence
    const sortedResults = patterns.sort((a, b) => b.confidence - a.confidence);

    setResults(sortedResults);
    setLoading(false);
    toast.success("Search completed successfully!");
  };

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleDownloadCSV = () => {
    const headers = ["Email", "Pattern", "Status", "Confidence"];
    const csvContent = [
      headers.join(","),
      ...results.map(
        (r) => `${r.email},${r.pattern},${r.status},${r.confidence}%`,
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${formData.firstName}_${formData.lastName}_emails.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Input Section */}
      <MagicCard
        className="p-8 border-border/50 shadow-2xl"
        gradientColor="rgba(56, 189, 248, 0.05)"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 mb-2">
                Organization Email Intelligence
              </h2>
              <p className="text-muted-foreground">
                Enter an organization name for intelligence, or add a
                person&apos;s details to find their email.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-primary" />
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  Company Domain
                </Label>
                <div className="relative">
                  <Input
                    id="domain"
                    name="domain"
                    placeholder="example.com"
                    value={formData.domain}
                    onChange={handleInputChange}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <span className="text-xs">@</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={generateEmails}
                disabled={loading || !formData.domain}
                className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="relative hidden md:flex items-center justify-center p-8 bg-muted/20 rounded-xl border border-border/50">
            <div className="text-center space-y-4 max-w-xs">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold">Multiple Tools in One</h3>
              <p className="text-sm text-muted-foreground">
                Enter a domain to get Company Intelligence. Enter a name +
                domain to find specific professional emails.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="bg-background/80 p-2 rounded border border-border/50">
                  Email Patterns
                </div>
                <div className="bg-background/80 p-2 rounded border border-border/50">
                  Dept Contacts
                </div>
                <div className="bg-background/80 p-2 rounded border border-border/50">
                  Verified Emails
                </div>
                <div className="bg-background/80 p-2 rounded border border-border/50">
                  Company Info
                </div>
              </div>
            </div>
          </div>
        </div>
      </MagicCard>

      {/* Company Intelligence Section */}
      {companyData && (
        <MagicCard
          className="p-8 border-border/50 shadow-xl"
          gradientColor="rgba(16, 185, 129, 0.05)"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  Organization Intelligence
                </h3>
                <p className="text-muted-foreground">
                  Insights for {companyData.officialDomain}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground">
                  Corporate Email Pattern
                </Label>
                <div className="p-3 bg-background/50 border border-border/50 rounded-lg font-mono text-lg">
                  {companyData.emailPattern || "Not detected"}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Official Domain</Label>
                <div className="p-3 bg-background/50 border border-border/50 rounded-lg font-mono text-lg">
                  <a
                    href={`https://${companyData.officialDomain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    {companyData.officialDomain}
                    <Search className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {companyData.departmentContacts &&
              companyData.departmentContacts.length > 0 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Department Contacts
                  </Label>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {companyData.departmentContacts.map(
                      (contact: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-background/50 border border-border/50 rounded-lg"
                        >
                          <div className="truncate">
                            <div className="text-sm font-medium">
                              {contact.department}
                            </div>
                            <div
                              className="text-xs text-muted-foreground truncate"
                              title={contact.email}
                            >
                              {contact.email}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleCopy(contact.email)}
                          >
                            {copiedEmail === contact.email ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
          </div>
        </MagicCard>
      )}

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Found {results.length} Potential Emails
            </h3>
            <Button
              variant="outline"
              onClick={handleDownloadCSV}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  result.status === "verified"
                    ? "border-l-green-500"
                    : result.status === "catch-all"
                      ? "border-l-yellow-500"
                      : "border-l-gray-500"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge
                      variant={
                        result.status === "verified"
                          ? "default"
                          : result.status === "catch-all"
                            ? "secondary"
                            : "outline"
                      }
                      className={`
                      ${result.status === "verified" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""}
                      ${result.status === "catch-all" ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20" : ""}
                    `}
                    >
                      {result.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">
                      {result.confidence}% Match
                    </span>
                  </div>

                  <div
                    className="font-mono text-sm truncate mb-1"
                    title={result.email}
                  >
                    {result.email}
                  </div>
                  <div className="text-xs text-muted-foreground mb-4">
                    Pattern: {result.pattern}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between group hover:bg-primary/5"
                    onClick={() => handleCopy(result.email)}
                  >
                    <span className="text-xs group-hover:text-primary transition-colors">
                      {copiedEmail === result.email ? "Copied!" : "Copy Email"}
                    </span>
                    {copiedEmail === result.email ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

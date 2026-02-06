"use client";

import React, { useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Loader2, Printer, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import {
  generateDocument,
  DocumentType,
} from "@/actions/tools/generate-document";
import { checkUsageAction } from "@/actions/tools/check-usage";
import { useEffect } from "react";

const DOCUMENT_TYPES: {
  value: DocumentType;
  label: string;
  description: string;
}[] = [
  {
    value: "sop",
    label: "Standard Operating Procedure (SOP)",
    description: "Step-by-step instructions for routine operations.",
  },
  {
    value: "proposal",
    label: "Business Proposal",
    description:
      "Persuasive document for clients outlining a project or service.",
  },
  {
    value: "legal-notice",
    label: "Legal Notice (Draft)",
    description: "Formal warning or demand letter. Use for reference only.",
  },
  {
    value: "hr-policy",
    label: "HR Policy",
    description: "Company rules and guidelines for employees.",
  },
  {
    value: "compliance-report",
    label: "Compliance Report",
    description: "Audit findings and adherence to regulations.",
  },
  {
    value: "technical-doc",
    label: "Technical Documentation",
    description: "System architecture, API usage, or setup guides.",
  },
];

const INPUT_FIELDS: Record<
  DocumentType,
  {
    name: string;
    label: string;
    placeholder: string;
    type: "input" | "textarea";
  }[]
> = {
  sop: [
    {
      name: "title",
      label: "Procedure Title",
      placeholder: "e.g. Customer Refund Process",
      type: "input",
    },
    {
      name: "scope",
      label: "Scope & Purpose",
      placeholder: "Who is this for? Why is it needed?",
      type: "textarea",
    },
    {
      name: "procedure_steps",
      label: "Key Steps (Rough Notes)",
      placeholder: "List the main steps...",
      type: "textarea",
    },
  ],
  proposal: [
    {
      name: "project_name",
      label: "Project Name",
      placeholder: "e.g. Website Redesign 2024",
      type: "input",
    },
    {
      name: "client_name",
      label: "Client/Company Name",
      placeholder: "e.g. Acme Corp",
      type: "input",
    },
    {
      name: "scope",
      label: "Project Scope & Deliverables",
      placeholder: "What will you deliver?",
      type: "textarea",
    },
    {
      name: "budget",
      label: "Budget/Investment",
      placeholder: "e.g. $5,000",
      type: "input",
    },
  ],
  "legal-notice": [
    {
      name: "recipient",
      label: "Recipient Name",
      placeholder: "Name of person/company",
      type: "input",
    },
    {
      name: "sender",
      label: "Sender Name",
      placeholder: "Your name/company",
      type: "input",
    },
    {
      name: "incident",
      label: "Incident Details",
      placeholder: "What happened? What was violated?",
      type: "textarea",
    },
    {
      name: "demand",
      label: "Demand/Action Required",
      placeholder: "What must they do? By when?",
      type: "textarea",
    },
  ],
  "hr-policy": [
    {
      name: "policy_name",
      label: "Policy Name",
      placeholder: "e.g. Remote Work Policy",
      type: "input",
    },
    {
      name: "purpose",
      label: "Policy Purpose",
      placeholder: "Why format this policy?",
      type: "textarea",
    },
    {
      name: "guidelines",
      label: "Key Guidelines & Rules",
      placeholder: "List the main rules...",
      type: "textarea",
    },
  ],
  "compliance-report": [
    {
      name: "title",
      label: "Report Title",
      placeholder: "e.g. Q1 Security Audit",
      type: "input",
    },
    {
      name: "period",
      label: "Period Covered",
      placeholder: "e.g. Jan 2024 - Mar 2024",
      type: "input",
    },
    {
      name: "findings",
      label: "Key Findings",
      placeholder: "What issues were found?",
      type: "textarea",
    },
    {
      name: "summary",
      label: "Executive Summary",
      placeholder: "Brief overview...",
      type: "textarea",
    },
  ],
  "technical-doc": [
    {
      name: "system_name",
      label: "System/Component Name",
      placeholder: "e.g. Auth Service API",
      type: "input",
    },
    {
      name: "overview",
      label: "System Overview",
      placeholder: "What does it do?",
      type: "textarea",
    },
    {
      name: "setup",
      label: "Setup/Installation",
      placeholder: "How to install/run it?",
      type: "textarea",
    },
  ],
};

export default function AiDocumentGeneratorTool() {
  const [selectedType, setSelectedType] = useState<DocumentType>("sop");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<{
    content: string;
    title: string;
  } | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    checkUsageAction("ai-document-generator").then((res) =>
      setIsLimitReached(res.isLimitReached),
    );
  }, []);

  // Handle inputs change
  const handleInputChange = (name: string, value: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    // Basic validation
    const currentFields = INPUT_FIELDS[selectedType];
    const missing = currentFields.filter((f) => !inputs[f.name]);
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }

    setIsGenerating(true);
    setGeneratedDoc(null);

    try {
      const result = await generateDocument({
        type: selectedType,
        inputs: inputs,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        setGeneratedDoc({ content: result.content, title: result.title });
        toast.success("Document generated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
      checkUsageAction("ai-document-generator").then((res) =>
        setIsLimitReached(res.isLimitReached),
      );
    }
  };

  const handleCopy = () => {
    if (!generatedDoc) return;

    // Create a temporary element to strip HTML tags
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = generatedDoc.content;
    const plainText = tempDiv.innerText || tempDiv.textContent || "";

    const clipboardItem = new ClipboardItem({
      "text/html": new Blob([generatedDoc.content], { type: "text/html" }),
      "text/plain": new Blob([plainText], { type: "text/plain" }),
    });
    navigator.clipboard.write([clipboardItem]).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
      toast.success("Copied to clipboard!");
    });
  };

  const handlePrint = () => {
    if (!generatedDoc) return;

    // Use an iframe for printing to avoid popup blockers and better UX
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    // Write content to iframe
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <html>
          <head>
            <title>${generatedDoc.title}</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; color: #000; }
              h1 { font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #ccc; padding-bottom: 10px; }
              h2 { font-size: 20px; margin-top: 20px; color: #333; }
              p { margin-bottom: 10px; }
              ul { margin-bottom: 10px; padding-left: 20px; }
              li { margin-bottom: 5px; }
            </style>
          </head>
          <body>
            ${generatedDoc.content}
          </body>
        </html>
      `);
      doc.close();

      // Print after loading
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      // Cleanup after a delay to ensure print dialog opens
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }
  };

  const currentFields = INPUT_FIELDS[selectedType];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full min-h-[600px]">
      {/* LEFT: Configuration & Inputs */}
      <div className="flex flex-col gap-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Document Setup</CardTitle>
            <CardDescription>
              Choose a template and provide the details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Document Type</Label>
              <Select
                value={selectedType}
                onValueChange={(val) => {
                  setSelectedType(val as DocumentType);
                  setInputs({}); // Reset inputs on type change
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a document type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                {
                  DOCUMENT_TYPES.find((d) => d.value === selectedType)
                    ?.description
                }
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <Label className="text-base font-semibold">
                Document Details
              </Label>
              {currentFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.name}
                      placeholder={field.placeholder}
                      className="min-h-[100px] resize-y"
                      value={inputs[field.name] || ""}
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                    />
                  ) : (
                    <Input
                      id={field.name}
                      placeholder={field.placeholder}
                      value={inputs[field.name] || ""}
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <Button
              className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
              disabled={isGenerating || isLimitReached}
              onClick={handleGenerate}
            >
              {isLimitReached ? (
                <>Limit Reached (5/5)</>
              ) : isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Document...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Document
                </>
              )}
            </Button>
            {isLimitReached && (
              <p className="text-xs text-red-500 text-center mt-2">
                You have reached your daily limit of 5 generations for this
                tool.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT: Preview & Output */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-semibold">Preview</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              disabled={!generatedDoc}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print (Save as PDF)
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              disabled={!generatedDoc}
            >
              {hasCopied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        <Card className="flex-1 border-border/50 bg-card overflow-hidden min-h-[500px] flex flex-col">
          {generatedDoc ? (
            <div className="flex-1 p-8 overflow-y-auto max-h-[700px] prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-code:text-blue-300 prose-code:bg-blue-950/30 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-secondary/50 prose-pre:text-blue-300">
              <div dangerouslySetInnerHTML={{ __html: generatedDoc.content }} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-muted/10 p-8 text-center">
              <FileText className="w-16 h-16 mb-4 opacity-20 text-foreground" />
              <h4 className="text-lg font-semibold mb-2 text-foreground">
                No Document Generated Yet
              </h4>
              <p className="max-w-[300px] text-muted-foreground/80">
                Fill out the details on the left and click &quot;Generate
                Document&quot; to see your result here.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

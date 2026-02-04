"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Copy,
  Download,
  Trash2,
  Check,
  FileJson,
  FileCode,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib";

const SAMPLE_JSON = `{
  "name": "RhythmiqCX",
  "type": "Online Tools Platform",
  "active": true,
  "users": 12500,
  "features": [
    "JSON to XML",
    "JSON to YAML",
    "Meta Tag Generator"
  ],
  "settings": {
    "theme": "dark",
    "notifications": true
  }
}`;

export default function JsonToYamlConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Simple and working for most cases
  const toYAML = (obj: unknown, indent = 0): string => {
    const padding = "  ".repeat(indent);

    if (typeof obj !== "object" || obj === null) {
      // Wrap strings if needed
      if (typeof obj === "string") {
        if (
          obj.includes("\n") ||
          obj.includes(":") ||
          obj.trim().startsWith("-")
        ) {
          return JSON.stringify(obj);
        }
        return obj;
      }
      return String(obj);
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]";
      return obj
        .map((item) => {
          const itemStr = toYAML(item, indent + 1);
          if (
            typeof item === "object" &&
            item !== null &&
            !Array.isArray(item)
          ) {
            // If object, first key is inline with dash, others indented
            return `\n${padding}- ${itemStr.replace(/^\s+/, "")}`;
          }
          // If array, nested
          if (Array.isArray(item)) {
            return `\n${padding}-\n${itemStr}`;
          }

          return `\n${padding}- ${itemStr}`;
        })
        .join("");
    }

    // Object
    const record = obj as Record<string, unknown>;
    const keys = Object.keys(record);
    if (keys.length === 0) return "{}";

    return keys
      .map((key, i) => {
        const val = record[key];
        const valStr = toYAML(val, indent + 1);

        if (typeof val === "object" && val !== null) {
          if (Array.isArray(val) && val.length === 0) {
            return `${i === 0 ? "" : "\n"}${padding}${key}: []`;
          }
          if (!Array.isArray(val) && Object.keys(val as object).length === 0) {
            return `${i === 0 ? "" : "\n"}${padding}${key}: {}`;
          }
          // For complex objects/arrays, they start on next line
          return `${i === 0 ? "" : "\n"}${padding}${key}:${valStr}`;
        }

        return `${i === 0 ? "" : "\n"}${padding}${key}: ${valStr}`;
      })
      .join("");
  };

  const handleConvert = () => {
    setError(null);
    if (!input.trim()) {
      setError("Please enter some JSON to convert.");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      // Remove leading newline from recursive result if present and trim
      const yamlResult = toYAML(parsed).trim();
      setOutput(yamlResult);
    } catch (e) {
      console.error(e);
      setError("Invalid JSON format. Please check your syntax.");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.yaml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setInput(SAMPLE_JSON);
    setError(null);
    try {
      const parsed = JSON.parse(SAMPLE_JSON);
      const yamlResult = toYAML(parsed).trim();
      setOutput(yamlResult);
    } catch {}
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Tool Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-[600px] lg:h-[700px]">
        {/* Input Section */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <FileJson className="w-5 h-5 text-yellow-500" />
              Input JSON
            </Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setInput("")}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
              <Button variant="secondary" size="sm" onClick={loadSample}>
                Load Sample
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "relative flex-1 rounded-xl border-2 transition-all bg-card overflow-hidden",
              error
                ? "border-destructive/50"
                : "border-border hover:border-border/80 focus-within:border-primary/50",
            )}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full h-full p-4 md:p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
              spellCheck={false}
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm font-medium animate-in slide-in-from-top-2 fade-in bg-destructive/10 p-3 rounded-lg border border-destructive/20">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Action Button (Mobile Only) */}
        <div className="lg:hidden">
          <Button
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
            onClick={handleConvert}
          >
            Convert JSON to YAML
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <FileCode className="w-5 h-5 text-purple-500" />
              Output YAML
            </Label>
            <div className="flex gap-2">
              {output && (
                <>
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? (
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
                  <Button
                    size="sm"
                    onClick={handleDownload}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="relative flex-1 rounded-xl border-2 border-border/50 bg-muted/30 overflow-hidden group">
            {!output ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <ArrowRight className="w-12 h-12 mb-4 opacity-20 hidden lg:block" />
                <p>Click &quot;Convert&quot; to see the YAML result here</p>
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                className="w-full h-full p-4 md:p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed text-foreground/90 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
              />
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex justify-center">
        <Button
          size="lg"
          className="min-w-[200px] bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-lg py-6"
          onClick={handleConvert}
        >
          Convert to YAML
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}

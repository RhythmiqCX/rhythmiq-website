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
  "users": 12500
}`;

export default function JsonToXmlConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const convertJsonToXml = (jsonObj: unknown, tab = "  ") => {
    const toXml = (v: unknown, name: string, ind: string): string => {
      if (v === null || v === undefined) return "";

      let xml = "";
      if (Array.isArray(v)) {
        v.forEach((item) => {
          xml += toXml(item, name, ind);
        });
      } else if (typeof v === "object") {
        let hasChildren = false;
        xml += ind + "<" + name + ">";
        const obj = v as Record<string, unknown>;
        for (const m in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, m)) {
            hasChildren = true;
            xml += "\n" + toXml(obj[m], m, ind + tab);
          }
        }
        if (hasChildren) {
          xml += ind + "</" + name + ">\n";
        } else {
          xml += "</" + name + ">\n";
        }
      } else {
        const str = String(v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&apos;");
        xml += ind + "<" + name + ">" + str + "</" + name + ">\n";
      }
      return xml;
    };

    let xml = '<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n';
    try {
      if (typeof jsonObj === "object" && jsonObj !== null) {
        const obj = jsonObj as Record<string, unknown>;
        for (const key in obj) {
          xml += toXml(obj[key], key, tab);
        }
      }
    } catch {
      throw new Error("Conversion failed");
    }
    xml += "</root>";
    return xml;
  };

  const handleConvert = () => {
    setError(null);
    if (!input.trim()) {
      setError("Please enter some JSON to convert.");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const xmlResult = convertJsonToXml(parsed);
      setOutput(xmlResult);
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
    const blob = new Blob([output], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setInput(SAMPLE_JSON);
    setError(null);
    // Auto convert sample
    try {
      const parsed = JSON.parse(SAMPLE_JSON);
      const xmlResult = convertJsonToXml(parsed);
      setOutput(xmlResult);
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
            Convert JSON to XML
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <FileCode className="w-5 h-5 text-blue-500" />
              Output XML
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
                <p>Click &quot;Convert&quot; to see the XML result here</p>
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

      {/* Desktop Convert Action - Centered or Floated? 
          Actually, I prefer real-time or a clear center button. 
          Given the height, let's put a big button in the middle or below inputs if we weren't doing 2 columns.
          But with 2 columns, maybe a button in between or just rely on manual trigger.
      */}
      <div className="hidden lg:flex justify-center">
        <Button
          size="lg"
          className="min-w-[200px] bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-lg py-6"
          onClick={handleConvert}
        >
          Convert to XML
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}

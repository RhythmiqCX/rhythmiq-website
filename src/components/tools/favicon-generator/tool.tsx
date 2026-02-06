"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Download,
  Upload,
  Type,
  Image as ImageIcon,
  Copy,
  Check,
  RefreshCcw,
  FileArchive,
  Palette,
} from "lucide-react";
import JSZip from "jszip";

// Favicon sizes to generate
const SIZES = [
  { size: 16, name: "favicon-16x16.png", label: "16x16" },
  { size: 32, name: "favicon-32x32.png", label: "32x32" },
  { size: 48, name: "favicon-48x48.png", label: "48x48" },
  { size: 64, name: "favicon-64x64.png", label: "64x64" },
  { size: 128, name: "favicon-128x128.png", label: "128x128" },
  { size: 180, name: "apple-touch-icon.png", label: "Apple Touch" },
  { size: 192, name: "android-chrome-192x192.png", label: "Android 192" },
  { size: 512, name: "android-chrome-512x512.png", label: "Android 512" },
];

interface GeneratedIcon {
  size: number;
  name: string;
  label: string;
  url: string;
  blob: Blob;
}

export default function FaviconGeneratorTool() {
  // State
  const [sourceType, setSourceType] = useState<"image" | "text">("image");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [textConfig, setTextConfig] = useState({
    text: "F",
    fontFamily: "sans-serif",
    fontSize: 200,
    textColor: "#ffffff",
    backgroundColor: "#3b82f6",
    borderRadius: 20,
  });

  const [generatedIcons, setGeneratedIcons] = useState<GeneratedIcon[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [copied, setCopied] = useState(false);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setUploadedImage(event.target.result);
        setSourceType("image");
      }
    };
    reader.readAsDataURL(file);
  };

  // Generate Icons
  const generateIcons = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsGenerating(true);

    const icons: GeneratedIcon[] = [];
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    try {
      // Create a master canvas for the source content
      const masterSize = 1024;
      const masterCanvas = document.createElement("canvas");
      masterCanvas.width = masterSize;
      masterCanvas.height = masterSize;
      const masterCtx = masterCanvas.getContext("2d");

      if (!masterCtx) {
        setIsGenerating(false);
        return;
      }

      // Draw source to master canvas
      if (sourceType === "image" && uploadedImage) {
        const img = new Image();
        img.src = uploadedImage;
        await new Promise((resolve) => {
          img.onload = () => {
            // Calculate aspect ratio fit
            const scale = Math.min(
              masterSize / img.width,
              masterSize / img.height,
            );
            const x = (masterSize - img.width * scale) / 2;
            const y = (masterSize - img.height * scale) / 2;
            masterCtx.drawImage(
              img,
              x,
              y,
              img.width * scale,
              img.height * scale,
            );
            resolve(null);
          };
        });
      } else {
        // Draw Text/Shape
        masterCtx.fillStyle = textConfig.backgroundColor;

        // Draw background (circle, rounded rect, or square) - using rounded rect for now based on borderRadius
        if (textConfig.borderRadius >= 50) {
          masterCtx.beginPath();
          masterCtx.arc(
            masterSize / 2,
            masterSize / 2,
            masterSize / 2,
            0,
            Math.PI * 2,
          );
          masterCtx.fill();
        } else {
          const r = (textConfig.borderRadius / 100) * (masterSize / 2);
          masterCtx.beginPath();
          masterCtx.roundRect(0, 0, masterSize, masterSize, r);
          masterCtx.fill();
        }

        masterCtx.fillStyle = textConfig.textColor;
        masterCtx.font = `bold ${textConfig.fontSize * 2.5}px ${textConfig.fontFamily}`; // Scale font relative to 1024px
        masterCtx.textAlign = "center";
        masterCtx.textBaseline = "middle";
        masterCtx.fillText(textConfig.text, masterSize / 2, masterSize / 2);
      }

      // Generate all sizes from master canvas
      for (const spec of SIZES) {
        const iconCanvas = document.createElement("canvas");
        iconCanvas.width = spec.size;
        iconCanvas.height = spec.size;
        const iconCtx = iconCanvas.getContext("2d");

        if (iconCtx) {
          // High quality resizing
          iconCtx.drawImage(masterCanvas, 0, 0, spec.size, spec.size);

          const blob = await new Promise<Blob | null>((resolve) =>
            iconCanvas.toBlob(resolve, "image/png"),
          );

          if (blob) {
            icons.push({
              ...spec,
              url: URL.createObjectURL(blob),
              blob: blob,
            });
          }
        }
      }

      setGeneratedIcons(icons);
    } catch (error) {
      console.error("Error generating icons:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [sourceType, uploadedImage, textConfig]);

  // Initial generation and updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      generateIcons();
    }, 100); // Debounce
    return () => clearTimeout(timeout);
  }, [generateIcons]);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      generatedIcons.forEach((icon) => URL.revokeObjectURL(icon.url));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const downloadSingle = (icon: GeneratedIcon) => {
    const link = document.createElement("a");
    link.href = icon.url;
    link.download = icon.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    generatedIcons.forEach((icon) => {
      zip.file(icon.name, icon.blob);
    });

    // Also add favicon.ico (using 32x32 for simplicity or combine sizes if library allows, but PNG is fine for now usually)
    // Note: Creating a real multi-size .ico in client-side JS without heavyweight libs is tricky.
    // We will duplicate the 32x32 PNG as favicon.ico for basic compatibility or just leave it.
    // Let's copy 32x32 as favicon.ico
    const icon32 = generatedIcons.find((i) => i.size === 32);
    if (icon32) {
      zip.file("favicon.ico", icon32.blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "favicons.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const copyHTML = () => {
    const html = `
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
    `.trim();
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      <canvas ref={canvasRef} className="hidden" />

      {/* Controls Section */}
      <div className="lg:col-span-5 space-y-8">
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <Tabs
            defaultValue="image"
            className="w-full"
            value={sourceType}
            onValueChange={(v) => setSourceType(v as "image" | "text" | "ai")}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="image" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Image
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <Type className="w-4 h-4" /> Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="image" className="space-y-4">
              <div
                className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-muted/20"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) {
                    const file = e.dataTransfer.files[0];
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      if (typeof ev.target?.result === "string") {
                        setUploadedImage(ev.target.result);
                        setSourceType("image");
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {uploadedImage ? (
                  <div className="relative w-32 h-32 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <Upload className="w-10 h-10 text-muted-foreground mb-4" />
                )}

                <h3 className="font-semibold text-lg">
                  {uploadedImage ? "Change Image" : "Upload Image"}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                  Drag & drop or click to upload. we support PNG, JPG, or SVG
                </p>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-6">
              <div className="space-y-2">
                <Label>Text / Initials</Label>
                <Input
                  value={textConfig.text}
                  onChange={(e) =>
                    setTextConfig({ ...textConfig, text: e.target.value })
                  }
                  maxLength={3}
                  className="text-center text-2xl font-bold h-14"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Palette className="w-3 h-3" /> Background
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={textConfig.backgroundColor}
                      onChange={(e) =>
                        setTextConfig({
                          ...textConfig,
                          backgroundColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 p-1 px-1"
                    />
                    <Input
                      value={textConfig.backgroundColor}
                      onChange={(e) =>
                        setTextConfig({
                          ...textConfig,
                          backgroundColor: e.target.value,
                        })
                      }
                      className="font-mono uppercase" // Added uppercase here
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Palette className="w-3 h-3" /> Text Color
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={textConfig.textColor}
                      onChange={(e) =>
                        setTextConfig({
                          ...textConfig,
                          textColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 p-1 px-1"
                    />
                    <Input
                      value={textConfig.textColor}
                      onChange={(e) =>
                        setTextConfig({
                          ...textConfig,
                          textColor: e.target.value,
                        })
                      }
                      className="font-mono uppercase" // Added uppercase here
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Roundness</Label>
                    <span className="text-xs text-muted-foreground">
                      {textConfig.borderRadius}%
                    </span>
                  </div>
                  <Slider
                    value={[textConfig.borderRadius]}
                    onValueChange={(val) =>
                      setTextConfig({ ...textConfig, borderRadius: val[0] })
                    }
                    min={0}
                    max={50}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Font Size</Label>
                    <span className="text-xs text-muted-foreground">
                      {textConfig.fontSize}px
                    </span>
                  </div>
                  <Slider
                    value={[textConfig.fontSize]}
                    onValueChange={(val) =>
                      setTextConfig({ ...textConfig, fontSize: val[0] })
                    }
                    min={50}
                    max={400}
                    step={10}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* HTML output */}
        {generatedIcons.length > 0 && (
          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="text-primary">&lt;/&gt;</span> HTML Code
              </h3>
              <Button variant="ghost" size="sm" onClick={copyHTML}>
                {copied ? (
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-border/50">
              <pre className="text-muted-foreground">
                {`<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
`}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground">
              Place these tags in the{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">
                &lt;head&gt;
              </code>{" "}
              section of your HTML.
            </p>
          </div>
        )}
      </div>

      {/* Preview Section */}
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Preview & Download</h3>
            <Button
              onClick={downloadAll}
              disabled={generatedIcons.length === 0 || isGenerating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
            >
              {isGenerating ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />{" "}
                  Generating...
                </>
              ) : (
                <>
                  <FileArchive className="w-4 h-4 mr-2" /> Download All (ZIP)
                </>
              )}
            </Button>
          </div>

          {generatedIcons.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <RefreshCcw className="w-12 h-12 mb-4 opacity-20" />
              <p>Start by uploading an image or entering text</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {generatedIcons.map((icon) => (
                <div
                  key={icon.name}
                  className="group relative border border-border/50 rounded-xl p-4 flex flex-col items-center gap-3 hover:border-border transition-all hover:shadow-md bg-card/50"
                >
                  <div className="relative w-16 h-16 flex items-center justify-center bg-transparent checkerboard-bg rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={icon.url}
                      alt={icon.label}
                      className="max-w-full max-h-full object-contain shadow-sm"
                    />
                  </div>
                  <div className="text-center w-full">
                    <p
                      className="font-medium text-sm truncate w-full"
                      title={icon.name}
                    >
                      {icon.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {icon.size}x{icon.size}
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => downloadSingle(icon)}
                    >
                      <Download className="w-4 h-4 mr-2" /> Save
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl p-6">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Did you know?
          </h4>
          <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>
              A <strong>favicon</strong> (favorite icon) helps users identify
              your site quickly in tabs and bookmarks.
            </li>
            <li>
              <strong>.ico</strong> files are crucial for legacy browser support
              (IE).
            </li>
            <li>
              <strong>Apple Touch Icons</strong> are used when users add your
              site to their iPhone home screen.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

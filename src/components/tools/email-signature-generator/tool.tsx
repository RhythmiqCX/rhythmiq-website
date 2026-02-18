"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  Image as ImageIcon,
  Copy,
  Check,
  LayoutTemplate,
  Palette,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib";

// --- Types ---

type SignatureData = {
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  photoUrl: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  color: string;
};

type LayoutType = "minimal" | "corporate" | "modern" | "creative" | "compact";

// --- Signature Templates (Componentized for Preview) ---

const SignaturePreview = ({
  data,
  layout,
  previewRef,
}: {
  data: SignatureData;
  layout: LayoutType;
  previewRef: React.RefObject<HTMLDivElement>;
}) => {
  // Common styles for email compatibility
  const linkStyle = {
    color: data.color,
    textDecoration: "none",
    fontWeight: "bold",
  } as React.CSSProperties;

  const textStyle = {
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#333333",
  } as React.CSSProperties;

  // Helper to render social links text if they exist
  const renderSocials = () => {
    const socials = [];
    if (data.linkedin)
      socials.push(
        <a
          key="li"
          href={data.linkedin}
          style={{ ...linkStyle, marginRight: "10px" }}
        >
          LinkedIn
        </a>,
      );
    if (data.twitter)
      socials.push(
        <a
          key="tw"
          href={data.twitter}
          style={{ ...linkStyle, marginRight: "10px" }}
        >
          Twitter
        </a>,
      );
    if (data.instagram)
      socials.push(
        <a
          key="ig"
          href={data.instagram}
          style={{ ...linkStyle, marginRight: "10px" }}
        >
          Instagram
        </a>,
      );
    return socials;
  };

  // --- Layout Implementations ---

  if (layout === "minimal") {
    return (
      <div
        ref={previewRef}
        style={{
          ...textStyle,
          borderTop: `2px solid ${data.color}`,
          paddingTop: "16px",
        }}
      >
        <div
          style={{ fontWeight: "bold", fontSize: "16px", color: data.color }}
        >
          {data.name || "Your Name"}
        </div>
        <div style={{ fontStyle: "italic", marginBottom: "8px" }}>
          {data.jobTitle || "Job Title"}
        </div>
        <div>
          {data.email && (
            <div style={{ marginBottom: "4px" }}>
              <a
                href={`mailto:${data.email}`}
                style={{ color: "#333", textDecoration: "none" }}
              >
                {data.email}
              </a>
            </div>
          )}
          {data.phone && (
            <div style={{ marginBottom: "4px" }}>
              <a
                href={`tel:${data.phone}`}
                style={{ color: "#333", textDecoration: "none" }}
              >
                {data.phone}
              </a>
            </div>
          )}
          {data.website && (
            <div style={{ marginBottom: "4px" }}>
              <a
                href={data.website}
                style={{ color: "#333", textDecoration: "none" }}
              >
                {data.website}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (layout === "corporate") {
    return (
      <div
        ref={previewRef}
        style={{
          ...textStyle,
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
        }}
      >
        {data.photoUrl && (
          <img
            src={data.photoUrl}
            alt={data.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
        <div
          style={{ borderLeft: `3px solid ${data.color}`, paddingLeft: "16px" }}
        >
          <div style={{ fontWeight: "bold", fontSize: "18px", color: "#000" }}>
            {data.name || "Your Name"}
          </div>
          <div
            style={{
              color: data.color,
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {data.jobTitle || "Job Title"} {data.company && `| ${data.company}`}
          </div>
          <div style={{ fontSize: "13px", color: "#555" }}>
            {data.email && (
              <div>
                E:{" "}
                <a
                  href={`mailto:${data.email}`}
                  style={{ color: "#555", textDecoration: "none" }}
                >
                  {data.email}
                </a>
              </div>
            )}
            {data.phone && (
              <div>
                P:{" "}
                <a
                  href={`tel:${data.phone}`}
                  style={{ color: "#555", textDecoration: "none" }}
                >
                  {data.phone}
                </a>
              </div>
            )}
            {data.website && (
              <div>
                W:{" "}
                <a
                  href={data.website}
                  style={{ color: "#555", textDecoration: "none" }}
                >
                  {data.website}
                </a>
              </div>
            )}
            {data.address && <div>A: {data.address}</div>}
          </div>
          <div style={{ marginTop: "8px", fontSize: "12px" }}>
            {renderSocials()}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "modern") {
    return (
      <div ref={previewRef} style={textStyle}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              {data.photoUrl && (
                <td
                  style={{
                    width: "100px",
                    verticalAlign: "top",
                    paddingRight: "20px",
                  }}
                >
                  <img
                    src={data.photoUrl}
                    alt={data.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </td>
              )}
              <td style={{ verticalAlign: "top" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: data.color,
                    marginBottom: "4px",
                  }}
                >
                  {data.name || "Your Name"}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#666",
                    marginBottom: "12px",
                  }}
                >
                  {data.jobTitle || "Job Title"}
                </div>
                <table style={{ fontSize: "13px", color: "#444" }}>
                  <tbody>
                    {data.email && (
                      <tr>
                        <td style={{ paddingRight: "10px", color: data.color }}>
                          ✉
                        </td>
                        <td>
                          <a
                            href={`mailto:${data.email}`}
                            style={{ color: "#444", textDecoration: "none" }}
                          >
                            {data.email}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.phone && (
                      <tr>
                        <td style={{ paddingRight: "10px", color: data.color }}>
                          ☎
                        </td>
                        <td>
                          <a
                            href={`tel:${data.phone}`}
                            style={{ color: "#444", textDecoration: "none" }}
                          >
                            {data.phone}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.website && (
                      <tr>
                        <td style={{ paddingRight: "10px", color: data.color }}>
                          🌐
                        </td>
                        <td>
                          <a
                            href={data.website}
                            style={{ color: "#444", textDecoration: "none" }}
                          >
                            {data.website}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.address && (
                      <tr>
                        <td style={{ paddingRight: "10px", color: data.color }}>
                          📍
                        </td>
                        <td>{data.address}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div style={{ marginTop: "12px" }}>{renderSocials()}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (layout === "creative") {
    return (
      <div
        ref={previewRef}
        style={{
          ...textStyle,
          textAlign: "center",
          border: `1px solid ${data.color}`,
          borderRadius: "12px",
          padding: "20px",
          maxWidth: "400px",
        }}
      >
        {data.photoUrl && (
          <img
            src={data.photoUrl}
            alt={data.name}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "12px",
              border: `4px solid ${data.color}`,
            }}
          />
        )}
        <div
          style={{
            fontWeight: "900",
            fontSize: "22px",
            color: "#333",
            marginBottom: "4px",
          }}
        >
          {data.name || "Your Name"}
        </div>
        <div
          style={{
            color: data.color,
            fontWeight: "bold",
            fontSize: "14px",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          {data.jobTitle || "Job Title"}
        </div>
        <div style={{ fontSize: "14px", color: "#555", lineHeight: "1.8" }}>
          {data.email && (
            <div>
              <a
                href={`mailto:${data.email}`}
                style={{ color: "#555", textDecoration: "none" }}
              >
                {data.email}
              </a>
            </div>
          )}
          {data.phone && (
            <div>
              <a
                href={`tel:${data.phone}`}
                style={{ color: "#555", textDecoration: "none" }}
              >
                {data.phone}
              </a>
            </div>
          )}
          {data.website && (
            <div>
              <a
                href={data.website}
                style={{ color: "#555", textDecoration: "none" }}
              >
                {data.website}
              </a>
            </div>
          )}
        </div>
        <div
          style={{
            marginTop: "16px",
            borderTop: "1px solid #eee",
            paddingTop: "12px",
            fontSize: "12px",
          }}
        >
          {renderSocials()}
        </div>
      </div>
    );
  }

  if (layout === "compact") {
    return (
      <div ref={previewRef} style={{ ...textStyle }}>
        <div style={{ fontWeight: "bold", color: "#000" }}>
          {data.name || "Your Name"}{" "}
          <span style={{ fontWeight: "normal", color: "#777" }}>
            | {data.jobTitle || "Job Title"}
          </span>
        </div>
        <div style={{ fontSize: "13px", color: data.color, marginTop: "4px" }}>
          {data.email && (
            <span style={{ marginRight: "10px" }}>
              <a
                href={`mailto:${data.email}`}
                style={{ color: data.color, textDecoration: "none" }}
              >
                {data.email}
              </a>
            </span>
          )}
          {data.phone && (
            <span style={{ marginRight: "10px" }}>
              <a
                href={`tel:${data.phone}`}
                style={{ color: data.color, textDecoration: "none" }}
              >
                {data.phone}
              </a>
            </span>
          )}
          {data.website && (
            <span>
              <a
                href={data.website}
                style={{ color: data.color, textDecoration: "none" }}
              >
                {data.website}
              </a>
            </span>
          )}
        </div>
      </div>
    );
  }

  return <div>Select a layout</div>;
};

// --- Main Tool Component ---

export default function EmailSignatureTool() {
  const [data, setData] = useState<SignatureData>({
    name: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    photoUrl: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    color: "#3b82f6", // Default Blue
  });

  const [layout, setLayout] = useState<LayoutType>("corporate");
  const previewRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // --- Handlers ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = async () => {
    if (previewRef.current) {
      try {
        // We create a Blob with text/html content
        const htmlContent = previewRef.current.innerHTML;
        const blobInput = new Blob([htmlContent], { type: "text/html" });
        const clipboardItem = new ClipboardItem({ "text/html": blobInput });

        // Also copy plain text for broader support
        // await navigator.clipboard.writeText(previewRef.current.innerText);

        await navigator.clipboard.write([clipboardItem]);

        setCopied(true);
        toast.success("Signature copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
        // Fallback to plain text copy if HTML copy fails (e.g. widely supported but sometimes tricky)
        try {
          // Create a temporary selection
          const range = document.createRange();
          range.selectNode(previewRef.current);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          document.execCommand("copy");
        } catch {
          toast.error(
            "Failed to copy signature. Please select and copy manually.",
          );
        }
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT COLUMN: Controls */}
      <div className="space-y-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-4 h-4" /> Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Parshant Vardhan"
                      value={data.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      placeholder="Product Designer"
                      value={data.jobTitle}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Rhythmiq"
                    value={data.company}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={data.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={data.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://www.example.com"
                    value={data.website}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address / City</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="San Francisco, CA"
                    value={data.address}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4" /> Layout
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      "minimal",
                      "corporate",
                      "modern",
                      "creative",
                      "compact",
                    ] as LayoutType[]
                  ).map((l) => (
                    <div
                      key={l}
                      onClick={() => setLayout(l)}
                      className={cn(
                        "cursor-pointer border-2 rounded-lg p-3 text-center capitalize hover:bg-muted transition-all",
                        layout === l
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-transparent bg-muted/50",
                      )}
                    >
                      {l}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Profile Photo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="photoUrl">Photo URL (Public Link)</Label>
                  <Input
                    id="photoUrl"
                    name="photoUrl"
                    placeholder="https://example.com/photo.jpg"
                    value={data.photoUrl}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: Use a URL from LinkedIn or your company website.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Brand Color
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "#3b82f6", // Blue
                    "#ef4444", // Red
                    "#22c55e", // Green
                    "#eab308", // Yellow
                    "#a855f7", // Purple
                    "#f97316", // Orange
                    "#000000", // Black
                    "#64748b", // Slate
                  ].map((c) => (
                    <button
                      key={c}
                      className={cn(
                        "w-8 h-8 rounded-full border-2",
                        data.color === c
                          ? "border-foreground ring-2 ring-primary/20"
                          : "border-transparent",
                      )}
                      style={{ backgroundColor: c }}
                      onClick={() => setData((prev) => ({ ...prev, color: c }))}
                    />
                  ))}
                  <div className="flex items-center gap-2 ml-2">
                    <Label className="text-xs">Custom:</Label>
                    <Input
                      type="color"
                      value={data.color}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, color: e.target.value }))
                      }
                      className="w-8 h-8 p-0 border-0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/..."
                    value={data.linkedin}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter / X URL</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    placeholder="https://twitter.com/..."
                    value={data.twitter}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    placeholder="https://instagram.com/..."
                    value={data.instagram}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* RIGHT COLUMN: Preview */}
      <div className="space-y-6">
        <div className="sticky top-24 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-heading">Live Preview</h2>
            <span className="text-sm text-muted-foreground">
              Updates instantly
            </span>
          </div>

          <Card className="overflow-hidden border-2 border-dashed border-primary/20">
            <CardContent className="p-8 bg-white min-h-[300px] flex items-center justify-center">
              <SignaturePreview
                data={data}
                layout={layout}
                previewRef={previewRef}
              />
            </CardContent>
            <div className="bg-muted/50 p-4 border-t flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                HTML Signature Preview
              </p>
              <Button onClick={handleCopy} className="gap-2">
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied!" : "Copy Signature"}
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Add Your Signature</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="gmail">
                <TabsList className="grid grid-cols-4 w-full h-auto flex-wrap">
                  <TabsTrigger value="gmail">Gmail</TabsTrigger>
                  <TabsTrigger value="outlook">Outlook</TabsTrigger>
                  <TabsTrigger value="apple">Apple</TabsTrigger>
                  <TabsTrigger value="yahoo">Yahoo</TabsTrigger>
                </TabsList>
                <TabsContent value="gmail" className="text-sm space-y-2 pt-4">
                  <ol className="list-decimal pl-4 space-y-1 text-muted-foreground">
                    <li>
                      Open{" "}
                      <span className="font-medium text-foreground">Gmail</span>{" "}
                      and go to <strong>Settings (⚙️)</strong> {">"}{" "}
                      <strong>See all settings</strong>.
                    </li>
                    <li>
                      Scroll down to the <strong>Signature</strong> section.
                    </li>
                    <li>
                      Click <strong>Create new</strong> or select an existing
                      signature.
                    </li>
                    <li>
                      Paste <strong>(Ctrl+V / Cmd+V)</strong> your copied
                      signature into the text box.
                    </li>
                    <li>
                      Scroll to the bottom and click{" "}
                      <strong>Save Changes</strong>.
                    </li>
                  </ol>
                </TabsContent>
                <TabsContent value="outlook" className="text-sm space-y-2 pt-4">
                  <ol className="list-decimal pl-4 space-y-1 text-muted-foreground">
                    <li>
                      Open{" "}
                      <span className="font-medium text-foreground">
                        Outlook
                      </span>
                      .
                    </li>
                    <li>
                      Go to <strong>Settings</strong> {">"}{" "}
                      <strong>Mail</strong> {">"}{" "}
                      <strong>Compose & Reply</strong>.
                    </li>
                    <li>
                      In the <strong>Email signature</strong> tab, type a name
                      for your signature.
                    </li>
                    <li>Paste your copied signature into the editor.</li>
                    <li>
                      Click <strong>Save</strong>.
                    </li>
                  </ol>
                </TabsContent>
                <TabsContent value="apple" className="text-sm space-y-2 pt-4">
                  <ol className="list-decimal pl-4 space-y-1 text-muted-foreground">
                    <li>
                      Open{" "}
                      <span className="font-medium text-foreground">Mail</span>{" "}
                      app.
                    </li>
                    <li>
                      Go to <strong>Mail</strong> {">"}{" "}
                      <strong>Settings</strong> {">"}{" "}
                      <strong>Signatures</strong>.
                    </li>
                    <li>
                      Select your account and click the <strong>+</strong> icon.
                    </li>
                    <li>
                      Uncheck{" "}
                      <strong>
                        &quot;Always match my default message font&quot;
                      </strong>
                      .
                    </li>
                    <li>Paste your signature into the box.</li>
                  </ol>
                </TabsContent>
                <TabsContent value="yahoo" className="text-sm space-y-2 pt-4">
                  <ol className="list-decimal pl-4 space-y-1 text-muted-foreground">
                    <li>
                      Open{" "}
                      <span className="font-medium text-foreground">
                        Yahoo Mail
                      </span>
                      .
                    </li>
                    <li>
                      Click <strong>Settings</strong> {">"}{" "}
                      <strong>More Settings</strong>.
                    </li>
                    <li>
                      Select <strong>Writing email</strong> from the left menu.
                    </li>
                    <li>
                      Toggle on the <strong>Signature</strong> switch.
                    </li>
                    <li>Paste your signature into the text box.</li>
                  </ol>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

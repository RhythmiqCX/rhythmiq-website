import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import JsonToXmlConverterTool from "@/components/tools/json-to-xml-converter/tool";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "JSON to XML Converter | Free Online Developer Tool",
  description:
    "Convert JSON object to XML format instantly. Free developer tool with syntax highlighting, copy to clipboard, and file download options. Secure client-side conversion.",
  alternates: {
    canonical: "/tools/json-to-xml-converter",
  },
});

const JsonToXmlConverterPage = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      <Wrapper className="relative z-10">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-6">
            <Link
              href="/tools"
              className="flex items-center gap-2 text-sm text-ink3 hover:text-ink transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </Link>

            <div className="flex flex-col gap-4 max-w-3xl">
              <span className="eyebrow">Developer Tool</span>
              <h1 className="h-section mt-3 text-ink">
                JSON to XML Converter
              </h1>
              <p className="lede mt-3 max-w-2xl">
                Transform your JSON data into clean, formatted XML. Fast,
                secure, and client-side only processing for developers.
              </p>
            </div>
          </div>

          <JsonToXmlConverterTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Fast & Secure</h3>
              <p className="text-ink2">
                All conversions happen locally in your browser. Your data never
                leaves your device, ensuring 100% privacy and security.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Instant Download</h3>
              <p className="text-ink2">
                Copy the formatted XML to your clipboard or download it as a
                .xml file with a single click.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Easy API Formatting</h3>
              <p className="text-ink2">
                Perfect for debugging API responses or converting legacy data
                structures between JSON and XML formats.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default JsonToXmlConverterPage;

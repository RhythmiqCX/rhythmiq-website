import React from "react";
import Container from "@/components/global/container";
import ToolsCTA from "@/components/marketing/tools-cta";
import Wrapper from "@/components/global/wrapper";
import { generateMetadata } from "@/utils";
import JsonToPdfConverterTool from "@/components/tools/json-to-pdf-converter/tool";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "JSON to PDF Converter | Free Online Developer Tool",
  description:
    "Convert JSON data into professional PDF documents instantly. Customize layout, formatting, and more. Secure client-side conversion.",
  alternates: {
    canonical: "/tools/json-to-pdf-converter",
  },
});

const JsonToPdfConverterPage = () => {
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
              <span className="eyebrow">Free Tool</span>
              <h1 className="h-section">JSON to PDF Converter</h1>
              <p className="lede max-w-2xl">
                Transform your JSON data into clean, well-structured PDF
                documents. Perfect for reports, documentation, and data sharing.
              </p>
            </div>
          </div>

          <JsonToPdfConverterTool />

          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Fast & Secure</h3>
              <p className="text-ink2">
                All conversions happen locally in your browser. Your data never
                leaves your device, ensuring 100% privacy and security.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Customizable Layout</h3>
              <p className="text-ink2">
                Adjust page size, orientation, fonts, and table formatting to
                create the perfect document for your needs.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink">Professional Reports</h3>
              <p className="text-ink2">
                Automatically convert JSON arrays and objects into clean tables
                and structured text suitable for business reports.
              </p>
            </div>
          </div>
          <ToolsCTA />
        </Container>
      </Wrapper>
    </div>
  );
};

export default JsonToPdfConverterPage;

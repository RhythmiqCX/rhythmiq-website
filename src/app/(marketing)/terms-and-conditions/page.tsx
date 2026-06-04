import React from "react";
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata({
  title: "Terms & Conditions - RhythmiqCX | User Agreement",
  description:
    "Review RhythmiqCX's Terms and Conditions to understand your rights, obligations, and limitations when using our services and platform.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
});

export default function TermsPage() {
  return (
    <div className="paper-surface bg-paper text-ink font-sans flex flex-col">
      {/* Hero Section */}
      <section className="section-tight text-center px-4">
        <div className="max-w-4xl mx-auto">
          <span className="eyebrow justify-center">Legal</span>
          <h1 className="h-section mt-3">
            RhythmiqCX Terms & Conditions
          </h1>
          <p className="lede mt-3 max-w-2xl mx-auto">
            Your rights, obligations, and limitations when using our Services.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:text-ink prose-p:text-ink2 prose-li:text-ink2 prose-a:text-coral prose-a:no-underline hover:prose-a:underline">
            <p className="font-semibold text-lg mb-4 text-ink">
              Please Read These Terms Carefully
            </p>
            <p className="text-ink2">
              These Terms & Conditions (“Terms”, “Agreement”) govern your access
              and use of RhythmiqCX Inc.’s (“we”, “our”, “us”) software-as-a-service
              platform, website, and related services (collectively, the
              “Services”). By using our Services, you agree to comply with these
              Terms. If you do not agree, you may not use our Services.
            </p>

            <h2 className="font-bold mt-8 text-ink">
              1. Eligibility & Acceptance
            </h2>
            <p className="text-ink2">
              By accessing or using our Services, you confirm that you are at least
              18 years old and legally capable of entering into binding agreements.
            </p>

            <h2 className="font-bold mt-8 text-ink">2. User Accounts</h2>
            <ul className="list-disc pl-6 text-ink2">
              <li>You must provide accurate and complete information.</li>
              <li>You are responsible for maintaining account confidentiality.</li>
              <li>
                You are responsible for all activities under your account and must
                notify us immediately of any unauthorized use.
              </li>
            </ul>

            <h2 className="font-bold mt-8 text-ink">3. Use of Services</h2>
            <p className="text-ink2">
              You agree to use the Services only for lawful purposes. You may not:
            </p>
            <ul className="list-disc pl-6 text-ink2">
              <li>Misuse or exploit the Services for illegal purposes.</li>
              <li>Attempt to reverse-engineer, copy, or resell the Services.</li>
              <li>Introduce viruses, malware, or harmful code.</li>
            </ul>

            <h2 className="font-bold mt-8 text-ink">4. Payments & Billing</h2>
            <p className="text-ink2">
              Subscription fees (if applicable) will be billed in accordance with
              the plan you choose. All payments are non-refundable unless required
              by law.
            </p>

            <h2 className="font-bold mt-8 text-ink">5. Intellectual Property</h2>
            <p className="text-ink2">
              All intellectual property rights in the Services, including software,
              content, trademarks, and branding, remain the property of RhythmiqCX
              Inc. or its licensors.
            </p>

            <h2 className="font-bold mt-8 text-ink">6. Third-Party Integrations</h2>
            <p className="text-ink2">
              Our Services may integrate with third-party tools. We are not
              responsible for third-party services, and your use of them is subject
              to their own terms.
            </p>

            <h2 className="font-bold mt-8 text-ink">7. Limitation of Liability</h2>
            <p className="text-ink2">
              To the maximum extent permitted by law, RhythmiqCX shall not be liable
              for indirect, incidental, or consequential damages arising out of your
              use of the Services.
            </p>

            <h2 className="font-bold mt-8 text-ink">8. Termination</h2>
            <p className="text-ink2">
              We may suspend or terminate your access to the Services if you violate
              these Terms or misuse our platform.
            </p>

            <h2 className="font-bold mt-8 text-ink">9. Governing Law</h2>
            <p className="text-ink2">
              These Terms shall be governed by the laws of Delaware, USA. Any
              disputes shall be resolved exclusively in the courts of Delaware.
            </p>

            <h2 className="font-bold mt-8 text-ink">10. Amendments</h2>
            <p className="text-ink2">
              We may update these Terms from time to time. Continued use of the
              Services constitutes acceptance of updated Terms.
            </p>

            <h2 className="font-bold mt-8 text-ink">11. Contact Us</h2>
            <p className="text-ink2">
              If you have any questions or concerns about these Terms, please
              contact us at:
            </p>
            <p className="text-ink2">
              📧 <strong className="text-ink">legal@rhythmiqcx.com</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

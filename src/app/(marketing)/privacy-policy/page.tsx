import React from "react";
import { generateMetadata } from '@/utils';

export const metadata = generateMetadata({
  title: "Privacy Policy - RhythmiqCX | Data Protection & Privacy",
  description: "Read RhythmiqCX's privacy policy to understand how we collect, use, and protect your personal information. GDPR compliant and transparent data practices.",
  alternates: {
    canonical: "/privacy-policy"
  },
});

export default function PrivacyPolicyPage() {
  return (
    <div className="paper-surface bg-paper text-ink font-sans flex flex-col">
      {/* Hero section */}
      <section className="section-tight text-center px-4">
        <div className="max-w-4xl mx-auto">
          <span className="eyebrow justify-center">Legal</span>
          <h1 className="h-section mt-3">RhythmiqCX Privacy Policy</h1>
          <p className="lede mt-3 max-w-2xl mx-auto">
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Content section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:text-ink prose-p:text-ink2 prose-li:text-ink2 prose-a:text-coral prose-a:no-underline hover:prose-a:underline">
            <p className="font-semibold text-lg mb-4 text-ink">
              Please Read This Policy Carefully
            </p>
            <p className="text-ink2">
              We, RhythmiqCX Inc. ("we", "us", "our"), are the owners of the
              software-as-a-service platform offered under the brand RhythmiqCX
              (collectively referred to as the "Services" or "Software" as the
              context may require).
            </p>
            <p className="text-ink2">
              We respect your data privacy rights and are committed to protecting
              personal information collected by or through use of the Services and/or
              our website by you. This privacy policy ("Privacy Policy" or "Policy")
              sets forth how we use and protect such personal information collected
              on our website and/or collected by the use of or access to the
              Software.
            </p>

            <h2 className="font-bold mt-8 text-ink">1. What Qualifies as Personal Information</h2>
            <p className="text-ink2">
              For the purposes of this Privacy Policy, any information (such as name,
              email ID, company name, phone number, location, IP address, calendar
              access, etc.) provided by you, or persons you invite to use the
              Software ("Participants"), or collected by us, as a result of your
              use/access of the website and/or Services, that can identify you as a
              person shall be referred to as "Personal Information."
            </p>
            <p className="text-ink2">
              For the sake of convenience and for the purposes of this Policy, we
              shall also consider the information disclosed by you and the
              Participants during usage of the Software as Personal Information.
            </p>

            <h2 className="font-bold mt-8 text-ink">2. Applicability of GDPR</h2>
            <p className="text-ink2">
              Residents of the European Union ("EU") should note that this Privacy
              Policy has been created in accordance with the requirements of the EU
              General Data Protection Regulation (GDPR). As per the provisions of the
              GDPR, we shall be considered the Controllers of the Personal
              Information collected as a result of your use/access to the Services.
            </p>
            <p className="text-ink2">
              For non-EU residents, by continuing to use or access the Services, you
              agree to this Privacy Policy. If you do not agree, you may not use or
              access the Services.
            </p>

            <h2 className="font-bold mt-8 text-ink">
              3. What Personal/Non-Personal Information Do We Collect?
            </h2>
            <p className="text-ink2">We may collect Personal Information when you:</p>
            <ul className="list-disc pl-6 text-ink2">
              <li>
                Get in touch with us through the "Contact Us" section, subscribe to
                our newsletter/blog, or use customer support functions.
              </li>
              <li>
                Create an account for using our Services (e.g., your email address,
                full name, payment details, calendar integrations, contacts, and IP
                address).
              </li>
              <li>
                Use the Software, including interaction data, meeting records (if
                applicable), third-party integrations, and participant details.
              </li>
              <li>Interact with our website analytics and marketing tools.</li>
            </ul>
            <p className="text-ink2">
              <strong className="text-ink">Analytics –</strong> We use Google Analytics and similar tools
              to understand how users interact with our website. These may collect
              anonymized IP addresses, browser types, usage patterns, and geographic
              data.
            </p>
            <p className="text-ink2">
              <strong className="text-ink">Social Media & Third-Party Logins –</strong> When you interact
              with our content on LinkedIn, Twitter, or other platforms, or log in
              using Google/social accounts, we may collect limited data.
            </p>
            <p className="text-ink2">
              <strong className="text-ink">Cookies –</strong> We use cookies and tracking technologies
              (session cookies, secure cookies, third-party cookies, etc.) to:
            </p>
            <ul className="list-disc pl-6 text-ink2">
              <li>Improve the product and user experience</li>
              <li>Understand geographical and demographic usage patterns</li>
              <li>
                Track sessions, clicks, scrolls, and technical details (browser, OS,
                device)
              </li>
            </ul>
            <p className="text-ink2">
              You may disable cookies in your browser. Our Services remain accessible
              even if cookies are disabled.
            </p>

            <h2 className="font-bold mt-8 text-ink">4. Accuracy of Information</h2>
            <p className="text-ink2">
              Please ensure that any Personal Information you share with us is
              accurate and up to date. If you are sharing information on behalf of a
              third party, ensure you are authorized to do so.
            </p>

            <h2 className="font-bold mt-8 text-ink">5. How We Use Your Personal Information</h2>
            <p className="text-ink2">We may use your Personal Information to:</p>
            <ul className="list-disc pl-6 text-ink2">
              <li>Provide and maintain the Services</li>
              <li>Communicate with you regarding our offerings</li>
              <li>Support customer relationships and billing</li>
              <li>Develop business intelligence, analytics, and product improvements</li>
              <li>Prevent fraud, abuse, and enhance security</li>
              <li>Run marketing and promotional campaigns</li>
              <li>Improve the usability and performance of our Software</li>
              <li>Comply with legal or regulatory obligations</li>
            </ul>
            <p className="text-ink2">
              If you wish to cancel your account or request deletion of your data,
              please contact us at <strong className="text-ink">privacy@rhythmiqcx.com</strong>.
            </p>
            <p className="text-ink2">
              <strong className="text-ink">Legal Basis (for EU Residents):</strong> Processing will be
              based on consent, contractual necessity, or legitimate interests, in
              line with GDPR requirements.
            </p>

            <h2 className="font-bold mt-8 text-ink">6. Whom Do We Disclose Your Data To?</h2>
            <p className="text-ink2">
              We do not sell or rent your Personal Information. However, we may share
              it in the following cases:
            </p>
            <ul className="list-disc pl-6 text-ink2">
              <li>
                <strong className="text-ink">Service Providers –</strong> With trusted partners who help
                us operate and maintain the Services.
              </li>
              <li>
                <strong className="text-ink">Business Transfers –</strong> If RhythmiqCX undergoes a
                merger, acquisition, or restructuring.
              </li>
              <li>
                <strong className="text-ink">Legal Requirements –</strong> To comply with applicable laws,
                regulations, or court orders.
              </li>
              <li>
                <strong className="text-ink">Participants –</strong> Details of collaborative interactions
                may be shared with relevant Participants.
              </li>
            </ul>

            <h2 className="font-bold mt-8 text-ink">
              7. Transfer of Your Personal Information Across Borders (for EU
              Residents)
            </h2>
            <p className="text-ink2">
              Your Personal Information may be processed outside the EU, including in
              secure data centers located in the US or India, in compliance with GDPR
              provisions.
            </p>

            <h2 className="font-bold mt-8 text-ink">8. Data Retention</h2>
            <p className="text-ink2">
              We only retain Personal Information for as long as necessary for the
              purposes described in this Policy. Upon reasonable written request, we
              will delete or anonymize your data, subject to technical and legal
              limitations.
            </p>

            <h2 className="font-bold mt-8 text-ink">9. Security Measures</h2>
            <p className="text-ink2">
              We implement appropriate technical and organizational measures (e.g.,
              encryption, firewalls, access controls). However, no system is fully
              secure, and we cannot guarantee absolute protection. Please remain
              vigilant against phishing or fraudulent attempts requesting your
              information.
            </p>

            <h2 className="font-bold mt-8 text-ink">10. Your Rights (For EU Residents)</h2>
            <ul className="list-disc pl-6 text-ink2">
              <li>Request access to the Personal Information we hold about you</li>
              <li>Rectify or update inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Restrict or object to processing</li>
              <li>Exercise data portability</li>
            </ul>
            <p className="text-ink2">
              To exercise these rights, contact us at{" "}
              <strong className="text-ink">privacy@rhythmiqcx.com</strong>.
            </p>

            <h2 className="font-bold mt-8 text-ink">11. Third-Party Links</h2>
            <p className="text-ink2">
              Our Services may contain links to third-party websites or applications.
              We are not responsible for the privacy practices of those entities.
              Please review their policies before sharing any information.
            </p>

            <h2 className="font-bold mt-8 text-ink">12. Limitation of Liability</h2>
            <p className="text-ink2">
              To the maximum extent permitted by law, RhythmiqCX is not liable for
              direct, indirect, incidental, or consequential damages arising from the
              use of this Privacy Policy or the Services.
            </p>

            <h2 className="font-bold mt-8 text-ink">13. Governing Laws and Disputes</h2>
            <p className="text-ink2">
              This Privacy Policy shall be governed by the laws of Delaware, USA,
              without regard to conflict of laws principles. The courts of Delaware
              shall have exclusive jurisdiction to handle disputes relating to this
              Policy. For EU residents, GDPR provisions will apply.
            </p>

            <h2 className="font-bold mt-8 text-ink">14. Changes to This Policy</h2>
            <p className="text-ink2">
              We may update this Privacy Policy from time to time. Updates will be
              posted on our website, and the "last modified" date will be updated
              accordingly. This Policy was last modified in August 2025.
            </p>

            <h2 className="font-bold mt-8 text-ink">15. Contact Us</h2>
            <p className="text-ink2">
              If you have any questions, concerns, or grievances regarding this
              Privacy Policy, please contact us at:
            </p>
            <p className="text-ink2">
              📧 <strong className="text-ink">privacy@rhythmiqcx.com</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

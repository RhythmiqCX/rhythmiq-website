import React from "react";
import Link from "next/link";
import { generateMetadata } from "@/utils";

export const metadata = generateMetadata({
  title: "About RhythmiqCX | AI-Powered Customer Support Platform",
  description: "Learn about RhythmiqCX, the AI CX platform that transforms how companies interact with customers. Our mission is delivering world-class customer support through cutting-edge AI automation and analytics.",
  keywords: [
    "about RhythmiqCX",
    "AI customer support company",
    "AI CX platform",
    "RhythmiqCX team",
    "customer support automation company",
  ],
  alternates: {
    canonical: "/about-us"
  },
  openGraph: {
    images: ["/icons/og-default.png"],
    type: "website",
  },
});

export default function AboutUs() {
  return (
    <div className="paper-surface bg-paper text-ink font-sans flex flex-col">
      {/* Hero section */}
      <section className="section-tight text-center px-4">
        <div className="max-w-4xl mx-auto">
          <span className="eyebrow justify-center">About us</span>
          <h1 className="h-section mt-3">About RhythmiqCX</h1>
          <p className="lede mt-3 max-w-2xl mx-auto">
            Helping businesses deliver world-class customer support through AI-powered automation.
          </p>
        </div>
      </section>

      {/* Content section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:text-ink prose-p:text-ink2 prose-li:text-ink2 prose-a:text-coral prose-a:no-underline hover:prose-a:underline">
            <p>
              At RhythmiqCX, we believe world-class customer support is the foundation of lasting business success.
              Our mission is helping organizations of all sizes deliver experiences that delight customers and
              strengthen loyalty. From seamless omnichannel service to cutting-edge automation and analytics,
              we provide everything you need to support your customers with confidence.
            </p>
            <p>
              We are Engineers at heart, and that principle drives everything we do. We approach every challenge
              with precision, creativity, and a problem-solving mindset to design solutions that are not only
              effective today but scalable for tomorrow. Our dedication to quality engineering ensures reliability,
              innovation, and long-term value for our clients.
            </p>
            <p>
              Our mission is to deliver the best customer support solutions. By combining technical
              excellence with deep customer experience expertise, we create systems that are efficient, adaptable,
              and impactful. Partner with us, and together we&apos;ll transform the way you engage with your customers.
            </p>
          </div>
        </div>
      </section>

      {/* Internal links to products */}
      <section className="py-16 px-4 bg-paper2">
        <div className="max-w-4xl mx-auto">
          <h2 className="h-feature mb-8 text-center text-ink">Our Products</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/voice-ai",
                title: "AI Phone Host",
                desc: "Answer every call, book tables, and take orders 24/7.",
              },
              {
                href: "/retell-ai-alternative",
                title: "Compare Rhythmiq",
                desc: "See how Rhythmiq stacks up against other voice AI platforms.",
              },
              {
                href: "/contact-us",
                title: "Talk to Sales",
                desc: "See a live demo and find the right plan for your venue.",
              },
              {
                href: "/tools",
                title: "Free Tools",
                desc: "Calculators and generators for AI receptionists and more.",
              },
              {
                href: "/blog",
                title: "Blog",
                desc: "Guides and ideas on voice AI and front-of-house automation.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block space-y-2 bg-white border border-ink/10 p-5 rounded-xl hover:shadow-[0_14px_24px_-16px_rgba(25,24,20,0.2)] transition-all no-underline"
              >
                <h3 className="font-semibold text-ink group-hover:text-coral transition-colors">{item.title}</h3>
                <p className="text-sm text-ink2">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

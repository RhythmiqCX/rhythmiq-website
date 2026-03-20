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
    images: ["/icons/white.jpeg"],
    type: "website",
  },
});

export default function AboutUs() {
  return (
    <main className="flex flex-col">
      {/* Hero section with gradient */}
      <section className="py-20 bg-gradient-to-b from-blue-500/20 to-background text-center px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-5xl font-bold text-gray-200">About RhythmiqCX</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Helping businesses deliver world-class customer support through AI-powered automation.
          </p>
        </div>
      </section>

      {/* Content section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none">
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
      <section className="py-16 px-4 bg-muted/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Products</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/ai-customer-support",
                title: "AI Customer Support",
                desc: "Automate tickets and boost CSAT across web, WhatsApp & more.",
              },
              {
                href: "/rhythmiq-ai-web-widget",
                title: "AI Web Widget",
                desc: "Embed smart customer support on any website in 60 seconds.",
              },
              {
                href: "/whatsapp-ai-chatbot",
                title: "WhatsApp AI Chatbot",
                desc: "Handle customer queries on WhatsApp Business API with AI.",
              },
              {
                href: "/voice-ai",
                title: "Voice AI Agents",
                desc: "Deploy conversational voice agents for 24x7 support.",
              },
              {
                href: "/conversational-ai-chatbot",
                title: "Conversational AI",
                desc: "Build natural multi-turn chatbots powered by LLMs.",
              },
              {
                href: "/ai-chatbot-pricing",
                title: "Pricing",
                desc: "Simple, transparent plans. No hidden fees.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block space-y-2 border p-5 rounded-xl hover:shadow-lg transition-shadow no-underline"
              >
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

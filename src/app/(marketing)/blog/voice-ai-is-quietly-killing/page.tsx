import BlogLayout from "@/components/marketing/BlogLayout";
import BlogCTA from "@/components/marketing/blog-cta";
import { generateMetadata } from "@/utils";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "How Voice AI Is Quietly Killing FAQ Pages",
  description:
    "A strongly opinionated look at why FAQ pages are dying and how voice AI is absorbing them without anyone noticing.",
  alternates: {
    canonical: "/blog/voice-ai-killing-faqs",
  },
  openGraph: {
    images: ["/images/blog/30-01-26.jpg"],
    type: "article",
    publishedTime: "2026-01-30",
    authors: ["PV8"],
  },
});

const SECTIONS = [
  { id: "asking-not-reading", label: "Nobody Wants to Read FAQs" },
  { id: "wrong-questions", label: "The Assumption of Knowledge" },
  { id: "timing-matters", label: "Timing and Trust" },
  { id: "absorbed-not-replaced", label: "The Absorption of Content" },
  { id: "cta", label: "The Future of Support" },
];

const RELATED = [
  {
    title: "The End of FAQs: Teach Your AI From Screens, Not PDFs",
    href: "/blog/end-of-faqs",
    imageSrc: "/images/blog/26-11-25.jpg",
    date: "November 26, 2025",
    description:
      "Why documentation is dead and AI should learn from real interfaces.",
  },
  {
    title: "Voice AI Hallucinations Are More Dangerous Than Text Ones",
    href: "/blog/voice-ai-hallucinations",
    imageSrc: "/images/blog/12-01-26.jpg",
    date: "January 12, 2026",
    description: "Why spoken confidence makes wrong answers harder to detect.",
  },
  {
    title: "Why Voice AI Needs Fewer Words Than Chat AI",
    href: "/blog/voice-ai-sounds",
    imageSrc: "/images/blog/19-01-26.jpg",
    date: "January 19, 2026",
    description:
      "A strongly opinionated, story-driven take on why over-talking kills confidence faster in voice AI and why the best voice systems speak less, not more.",
  },
];

export default function VoiceAIKillingFAQs() {
  return (
    <BlogLayout
      category={{ href: "/blog/category/Tech", label: "Tech" }}
      date="2026-01-30"
      title="How Voice AI Is Quietly Killing FAQ Pages"
      excerpt="FAQs aren’t being replaced loudly. They’re being ignored silently because users would rather ask than read."
      authors={[{ avatar: "/icons/PV8.png", name: "PV8" }]}
      readingTime={6}
      heroImage={{
        src: "/images/blog/30-01-26.jpg",
        alt: "FAQ page dissolving into a voice waveform",
      }}
      sections={SECTIONS}
      relatedArticles={RELATED}
    >
      {/* SECTION 1 */}
      <section id="asking-not-reading" className="mt-16 space-y-6">
        <h2>Nobody Wants to Read FAQs Anymore</h2>
        <p>
          FAQs were built for a patient user who no longer exists. Today’s
          customers have been conditioned by instant interfaces to expect
          immediate results, making the act of scanning a wall of text for a
          single relevant sentence feel like an unnecessary cognitive tax.
        </p>
        <p>
          As we detailed in{" "}
          <Link href="/blog/the-end-of-faq" className="text-coral">
            The End of FAQs
          </Link>
          , people don’t want documentation; they want outcomes. When a user
          realizes they can simply speak a question and receive a precise
          answer, the mental model shifts from "searching" to "conversing,"
          rendering static pages obsolete.
        </p>
      </section>

      {/* SECTION 2 */}
      <section id="wrong-questions" className="mt-24 space-y-6">
        <h2>FAQs Assume Users Know the Right Question</h2>
        <p>
          The fundamental flaw of an FAQ is that it requires the user to already
          understand your system's vocabulary. If a user asks a messy or
          emotionally charged question like "Why is my bill weird?", a static
          list of categories fails because it cannot navigate the ambiguity of
          human frustration.
        </p>
        <p>
          Voice AI bridges this gap by focusing on intent rather than keyword
          matching. While an FAQ page collapses under the weight of non-standard
          queries, voice-first systems use semantic understanding to provide
          clarity to users who don't yet know the "correct" way to phrase their
          problem.
        </p>
      </section>

      {/* SECTION 3 */}
      <section id="timing-matters" className="mt-24 space-y-6">
        <h2>FAQs Die When Timing Matters</h2>
        <p>
          In high-stakes moments like service outages or payment failures, the
          latency of finding an FAQ is a dealbreaker. Trust is won or lost in
          the{" "}
          <Link href="/blog/the-first-second" className="text-coral">
            first three seconds
          </Link>{" "}
          of an interaction a window that a static page can never hit regardless
          of how well-written it is.
        </p>
        <p>
          Voice AI provides "just-in-time" support, delivering the exact
          solution at the moment of peak need. By removing the friction of
          navigation, these systems transform support from a reactive
          destination into a proactive service that meets the customer exactly
          where they are.
        </p>
      </section>

      {/* SECTION 4 */}
      <section id="absorbed-not-replaced" className="mt-24 space-y-6">
        <h2>FAQs Aren’t Replaced They’re Absorbed</h2>
        <p>
          We aren't deleting the content of FAQs; we are repurposing it as the
          training data for more intelligent systems. Your documentation is no
          longer a front-facing product for humans to read it is the raw
          material, fallback logic, and guardrails that power a voice
          assistant’s decision-making engine.
        </p>
        <p>
          The future of SEO and user experience isn't about ranking an FAQ page
          on a search engine. It is about ensuring your data is structured so
          that an AI can digest it and deliver a verbal resolution to a customer
          in milliseconds, effectively killing the page while preserving the
          knowledge.
        </p>
      </section>

      {/* SECTION 5 - CTA */}
      <section id="cta" className="mt-24 space-y-6">
        <h2>The Future is Predictive, Not Reactive</h2>
        <p>
          The final evolution of customer support is the complete integration of
          help into the user experience. By moving away from static pages and
          toward voice-first decision systems, we allow support to become
          invisible, solving problems before the user even has a chance to feel
          lost.
        </p>
        <p>
          RhythmiqCX replaces static documentation with real-time, voice-first
          decision systems designed for the modern user. We help you move beyond
          the "help ghetto" of FAQ pages and toward a future where every
          customer interaction is fast, fluid, and focused on results.
        </p>

        <BlogCTA
          title="Stop making your customers read"
          description="Ready to turn your documentation into a voice-first powerhouse? Book a demo to see how RhythmiqCX can transform your support experience."
          primaryLabel="Book a live demo"
          primaryHref="https://calendly.com/ray-rhythmiqcx/30min"
          secondaryLabel="Explore the product"
          secondaryHref="https://rhythmiqcx.com"
        />
      </section>
    </BlogLayout>
  );
}

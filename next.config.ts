import type { NextConfig } from "next";

// 301 redirects for removed old-product pillar pages (chatbot / widget / TTS).
// Sources are EXACT paths so blog posts with similar slugs
// (e.g. /blog/ai-chatbot-pricing-how-much-should-you-really-budget) are untouched.
// These preserve and consolidate the backlink authority of the retired URLs.
const removedPillarRedirects = [
  // Old chatbot / widget / TTS pillars
  { source: "/whatsapp-ai-chatbot", destination: "/" },
  { source: "/conversational-ai-chatbot", destination: "/" },
  { source: "/ai-chatbot-pricing", destination: "/" },
  { source: "/ai-customer-support", destination: "/" },
  { source: "/rhythmiq-ai-web-widget", destination: "/" },
  { source: "/tawk-to-vs-rhythmiqcx", destination: "/" },
  { source: "/elevenlabs-alternative", destination: "/voice-ai" },
  { source: "/murf-ai-alternative", destination: "/voice-ai" },
  // Retired voice-ai regional/vertical sub-pages → consolidated into /voice-ai
  { source: "/voice-ai/dental", destination: "/voice-ai" },
  { source: "/voice-ai/tradies", destination: "/voice-ai" },
  { source: "/voice-ai/india", destination: "/voice-ai" },
  { source: "/voice-ai/canada", destination: "/voice-ai" },
  { source: "/voice-ai/philippines", destination: "/voice-ai" },
  { source: "/voice-ai/southeast-asia", destination: "/voice-ai" },
];

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    // statusCode 301 (not `permanent: true`, which emits 308) to match the
    // conventional "301 Moved Permanently" for retired GET pages.
    return removedPillarRedirects.map((r) => ({ ...r, statusCode: 301 as const }));
  },
};

export default nextConfig;

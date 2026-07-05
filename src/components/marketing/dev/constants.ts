// Content + config for the Rhythmiq Dev landing page (dev.rhythmiqcx.com).
// Copy is lifted verbatim from the finalized design handoff so the page reads
// exactly as approved. Booking link reuses the shared Calendly constant.

import { BOOK_DEMO_URL } from "@/constants/links";

// CTA destinations for the dev studio site.
export const DEV_BOOKING_URL = BOOK_DEMO_URL;
export const DEV_EMAIL = "ray@rhythmiqcx.com";
export const DEV_DOMAIN = "dev.rhythmiqcx.com";

// Self-hosted hero video (see public/videos/). Owned assets, no longer dependent
// on the third-party CloudFront URL from the prototype. WebM (VP9) is smaller and
// preferred where supported; MP4 (H.264) is the universal fallback. The poster
// paints instantly so there's never a blank/black frame while the video loads.
export const DEV_HERO_VIDEO = "/videos/dev-hero.mp4";
export const DEV_HERO_VIDEO_WEBM = "/videos/dev-hero.webm";
export const DEV_HERO_POSTER = "/images/dev-hero-poster.jpg";

// Fixed-nav links (single-page anchors — path-independent so they work whether
// the page is served at dev.rhythmiqcx.com/ or rhythmiqcx.com/dev).
export const DEV_NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
] as const;

// Capability marquee (mixed type styles, coral "·" separators).
export const DEV_MARQUEE_ITEMS = [
  { text: "Websites", style: "heading" },
  { text: "CRUD apps", style: "mono" },
  { text: "e-commerce", style: "serif" },
  { text: "Mobile", style: "heading" },
  { text: "dashboards", style: "mono" },
  { text: "internal tools", style: "serif" },
  { text: "AI integration", style: "heading" },
] as const;

// Services — three numbered cards.
export const DEV_SERVICES = [
  {
    no: "01",
    title: "Websites that earn their keep",
    body: "Marketing sites, storefronts, and landing pages designed to convert and built to load fast. Handed over with everything you need to run them yourself.",
    tags: ["design", "build", "SEO", "hosting"],
  },
  {
    no: "02",
    title: "Web apps, end to end",
    body: "Dashboards, portals, and internal tools: the CRUD backbone of a business. Auth, admin, APIs, and a codebase your next hire will thank you for.",
    tags: ["auth", "admin", "APIs", "Postgres"],
  },
  {
    no: "03",
    title: "Mobile, one codebase",
    body: "iOS and Android from a single codebase, with the app-store release handled. The same product on every screen your customers carry.",
    tags: ["React Native", "iOS", "Android"],
  },
] as const;

// Selected work — real shipped projects. Screenshots are shown "contained" on a
// tint so the mixed shapes (landscape web + portrait mobile) never get cropped.
// `href` links to the live product where there's a distinct destination.
export const DEV_WORK = [
  {
    id: "rhythmiq",
    image: "/images/dev/work-rhythmiq.png",
    title: "Rhythmiq",
    caption: "The AI phone host for restaurants. Answers every call, 24/7.",
    href: "https://rhythmiqcx.com",
  },
  {
    id: "voice-ai",
    image: "/images/dev/work-voiceai.png",
    title: "Real-time voice AI",
    caption: "Answers business calls and talks back in real time.",
    href: "https://livekit-react-red.vercel.app/",
  },
  {
    id: "chatbot",
    image: "/images/dev/work-chatbot.png",
    title: "AI support chatbot",
    caption: "Answers website questions 24/7, hands the hard ones to a human.",
    href: null as string | null,
  },
  {
    id: "motoriq",
    image: "/images/dev/work-motoriq.png",
    title: "MotorIQ",
    caption: "Tracks a car's fuel, mileage, and spending from a scanned receipt.",
    href: "https://play.google.com/store/apps/details?id=com.rhythmiq.motoriq",
  },
] as const;

// Process — 4-step scrollytelling timeline.
export const DEV_PROCESS_STEPS = [
  {
    when: "Week 0",
    title: "Scope",
    body: "One call, one page. We agree what ships and what it costs before anything starts.",
  },
  {
    when: "Week 1",
    title: "Design in the browser",
    body: "No static mockups that lie about the real thing. You review the actual product, on your own phone, from day one.",
  },
  {
    when: "Weeks 2-5",
    title: "Build",
    body: "A working link every Friday. You see progress, not promises, and you can change your mind while it's still cheap to.",
  },
  {
    when: "Launch",
    title: "Hand over",
    body: "Docs, access, and a walkthrough. It's yours to run, keys and all.",
  },
] as const;

// About — numbered principles.
export const DEV_PRINCIPLES = [
  "The engineers you talk to are the ones writing the code. No sales layer, no handoffs.",
  "We run our own software in production, so we build yours like we will be on call for it.",
  "If a template or an off-the-shelf tool does the job, we will say so and save you the money.",
] as const;

// About — engineering pedigree shown in the credentials panel. These are the
// companies our engineers currently build at (not former employers).
export const DEV_PEDIGREE = ["Meta", "Google", "Paytm"] as const;

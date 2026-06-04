// Navigation data for the restaurant redesign chrome.
// Every href points to a surviving route (old chatbot/widget pillars were removed
// and 301-redirected — see next.config.ts). Homepage anchors (/#…) resolve to
// sections on the new landing page.

export type NavItem = { name: string; href: string; description?: string };

export const PRODUCT_LINKS: NavItem[] = [
    { name: "AI Phone Host", href: "/voice-ai", description: "Answers every call, 24/7" },
    { name: "How it works", href: "/voice-ai#how-it-works", description: "From ring to booking" },
    { name: "Live demo", href: "/demo", description: "See it take a call" },
    { name: "Integrations", href: "/integrations", description: "POS, reservations, CRM" },
];

export const COMPARE_LINKS: NavItem[] = [
    { name: "Rhythmiq vs Retell AI", href: "/retell-ai-alternative" },
    { name: "Rhythmiq vs Bland AI", href: "/bland-ai-alternative" },
    { name: "Rhythmiq vs Vapi", href: "/vapi-alternative" },
    { name: "Rhythmiq vs Synthflow", href: "/synthflow-alternative" },
];

export const RESOURCE_LINKS: NavItem[] = [
    { name: "Blog", href: "/blog", description: "Guides & ideas" },
    { name: "Free tools", href: "/tools", description: "Calculators & generators" },
    { name: "About us", href: "/about-us" },
    { name: "Contact", href: "/contact-us" },
];

// Top-level dropdown groups rendered in the desktop nav.
export const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
    { label: "Product", items: PRODUCT_LINKS },
    { label: "Resources", items: RESOURCE_LINKS },
    { label: "Compare", items: COMPARE_LINKS },
];

// Simple (non-dropdown) top-level links.
export const NAV_LINKS: NavItem[] = [
    { name: "Pricing", href: "/pricing" },
];

// Action / CTA destinations.
export const APP_LOGIN_URL = "https://app.rhythmiqcx.com";
export const BOOK_DEMO_URL = "https://calendly.com/ray-rhythmiqcx/30min";
export const CONTACT_URL = "/contact-us";
// Interactive product demo (scenario → restaurant info → sign-up gate).
export const DEMO_URL = "/demo";
// Dedicated integrations page (the homepage also has a /#integrations section).
export const INTEGRATIONS_URL = "/integrations";

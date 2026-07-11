// Catalog for the prospect-prototype system (try.rhythmiqcx.com/<slug>).
//
// This is the single source of truth for which verticals + variants exist, the
// per-vertical house accent / default hero treatment, and the fallback content
// used when an operator skips an optional field during the /new-prospect
// interview. Both the render layer (templates/sections) and the skill read this,
// so adding a vertical = add an entry here + a template + one registry line.

// Verticals we ship a real template for today. Add "dentist"/"salon"/etc here
// (and a matching template + registry entry) to expand. Anything authored for a
// vertical without a dedicated template gracefully falls back to `generic`.
export const VERTICALS = ["restaurant", "dentist", "pets", "realestate", "architecture", "retail", "beauty", "finance", "travel", "security", "generic"] as const;
export type Vertical = (typeof VERTICALS)[number];

export const HERO_MODES = ["gradient", "particles", "ken-burns", "video"] as const;
export type HeroMode = (typeof HERO_MODES)[number];

// Named accent presets offered as a low-friction "pick a vibe" during the
// interview, so an operator never has to know a hex code.
export const VIBES = {
  coral: { label: "Coral", accent: "#E8643C" },
  blue: { label: "Deep Blue", accent: "#2F5FE0" },
  forest: { label: "Forest", accent: "#2E7D57" },
  plum: { label: "Plum", accent: "#7A3E8E" },
  charcoal: { label: "Charcoal", accent: "#2A2620" },
} as const;
export type VibeKey = keyof typeof VIBES;

export type ServiceSeed = { title: string; blurb?: string };

export type VerticalMeta = {
  label: string;
  houseAccent: string;
  defaultVariant: string;
  defaultHeroMode: HeroMode;
  variants: ReadonlyArray<{ id: string; label: string; scheme: "light" | "dark" }>;
  defaultServices: ReadonlyArray<ServiceSeed>;
};

export const VERTICAL_META: Record<Vertical, VerticalMeta> = {
  restaurant: {
    label: "Restaurant / Café",
    houseAccent: "#E8643C",
    defaultVariant: "warm-editorial",
    defaultHeroMode: "ken-burns",
    variants: [
      { id: "warm-editorial", label: "Warm editorial (paper + coral)", scheme: "light" },
      { id: "bold-dark", label: "Bold dark (cinematic)", scheme: "dark" },
      { id: "retro-vibe", label: "Retro / neo-brutalist (70s + Gen-Z, bold & loud)", scheme: "light" },
    ],
    defaultServices: [
      { title: "Dine in", blurb: "A room worth lingering in, plate after plate." },
      { title: "Takeaway & delivery", blurb: "Your favourites, ready to go." },
      { title: "Private events", blurb: "Celebrations and gatherings, catered to." },
    ],
  },
  dentist: {
    label: "Dentist / Clinic",
    houseAccent: "#111111",
    defaultVariant: "clean-clinic",
    defaultHeroMode: "ken-burns",
    variants: [
      { id: "clean-clinic", label: "Clean clinic (mono photo-mosaic + splash)", scheme: "light" },
    ],
    defaultServices: [
      { title: "Dental\nVeneers", blurb: "Natural, custom-shaded porcelain veneers." },
      { title: "Dental\nCrowns", blurb: "Durable, precise tooth restorations." },
      { title: "Teeth\nWhitening", blurb: "A brighter smile in a single visit." },
      { title: "Dental\nImplants", blurb: "Permanent replacements for missing teeth." },
    ],
  },
  pets: {
    label: "Pet store / Vet",
    houseAccent: "#E86A10",
    defaultVariant: "boutique-hero",
    defaultHeroMode: "ken-burns",
    variants: [
      { id: "boutique-hero", label: "Boutique hero (mint + serif, single-screen storefront)", scheme: "light" },
    ],
    defaultServices: [
      { title: "Cozy Cat House", blurb: "Snug, stylish, and built to last." },
      { title: "Dog Beds", blurb: "Orthopedic comfort for every size." },
      { title: "Toys & Treats", blurb: "Vet-approved, tail-wag guaranteed." },
    ],
  },
  realestate: {
    label: "Real estate / Property",
    houseAccent: "#213138",
    defaultVariant: "luxury-estate",
    defaultHeroMode: "ken-burns",
    variants: [
      { id: "luxury-estate", label: "Luxury estate (Velar — typewriter intro, scroll-driven building, video gallery)", scheme: "light" },
    ],
    defaultServices: [
      { title: "Residences", blurb: "Hand-chosen homes built with vision and permanence." },
      { title: "Story", blurb: "A brand built on refinement and timeless detail." },
      { title: "Listings", blurb: "Stately estates across our global portfolio." },
    ],
  },
  architecture: {
    label: "Architecture / Studio",
    houseAccent: "#241f21",
    defaultVariant: "layered-depth",
    defaultHeroMode: "video",
    variants: [
      { id: "layered-depth", label: "Layered depth (Qelora — ambient video, parallax slab, frosted panels)", scheme: "dark" },
    ],
    defaultServices: [
      { title: "Projects", blurb: "Places designed beyond what's expected." },
      { title: "Studio", blurb: "A quiet dialogue between site, light, and use." },
      { title: "Responsibility", blurb: "Resilient communities and purposeful places." },
    ],
  },
  retail: {
    label: "Boutique / DTC product",
    houseAccent: "#332023",
    defaultVariant: "wild-scent",
    defaultHeroMode: "video",
    variants: [
      { id: "wild-scent", label: "Wild scent (Wild Daisy — video hero + split product panels)", scheme: "light" },
    ],
    defaultServices: [
      { title: "Eau So Fresh", blurb: "100 ml / 3.4 oz" },
      { title: "Eau So Sweet", blurb: "100 ml / 3.3 oz" },
      { title: "Eau So Extra", blurb: "100 ml / 3.3 oz" },
    ],
  },
  beauty: {
    label: "Beauty / Spa / Perfumery",
    houseAccent: "#000000",
    defaultVariant: "luxury-botanical",
    defaultHeroMode: "video",
    variants: [
      { id: "luxury-botanical", label: "Luxury botanical (Beyond — scroll-driven orbit of bottles)", scheme: "light" },
    ],
    defaultServices: [
      { title: "Wild Vetiver", blurb: "Smoky vetiver wrapped in saffron and leather." },
      { title: "Radiant Osmanthus", blurb: "Apricot-tinged osmanthus over soft musks." },
      { title: "Vibrant Hibiscus", blurb: "Bright hibiscus and pink pepper on sandalwood." },
      { title: "Mellow Heliotrope", blurb: "Almond, vanilla and heliotrope petals." },
      { title: "Magnetic Amber", blurb: "Resinous amber, oud and rich woods." },
      { title: "Crystal Edition", blurb: "A limited cut — etched facets, lavender pour." },
    ],
  },
  finance: {
    label: "Finance / Wealth / Advisory",
    houseAccent: "#020b1f",
    defaultVariant: "synthesis",
    defaultHeroMode: "video",
    variants: [
      { id: "synthesis", label: "Synthesis (Elias Norden — scroll-scrubbed video, revealed statements)", scheme: "dark" },
    ],
    defaultServices: [
      { title: "Purpose", blurb: "Committed to a tomorrow where people enjoy more vibrant, rewarding decades beside loved ones." },
      { title: "Alliance", blurb: "Co-founded a global nonprofit backing early-stage science on prolonging the healthy human lifespan." },
      { title: "Ventures", blurb: "A managing partner backing bold pioneers in biotech and lifespans." },
    ],
  },
  travel: {
    label: "Travel / Hotel / Resort",
    houseAccent: "#1c1c1c",
    defaultVariant: "scenic",
    defaultHeroMode: "video",
    variants: [
      { id: "scenic", label: "Scenic (split-screen mirrored headline + scenic video + gem card)", scheme: "light" },
    ],
    defaultServices: [
      { title: "Hidden Gems", blurb: "Handpicked authentic stays and secluded retreats where nature meets comfort." },
      { title: "Curated tours", blurb: "Unique travel experiences tailored to your rhythm and spirit." },
      { title: "Concierge", blurb: "Every detail arranged, from arrival to the last horizon." },
    ],
  },
  security: {
    label: "Security / Automation",
    houseAccent: "#12f542",
    defaultVariant: "akor",
    defaultHeroMode: "video",
    variants: [
      { id: "akor", label: "AKOR (dark security landing — video hero, inverted services grid, green accent)", scheme: "dark" },
    ],
    defaultServices: [
      { title: "AI-Driven\nSecurity Solutions", blurb: "Threat detection and response, powered by on-site AI." },
      { title: "Smart Building\nAutomation", blurb: "Access, climate, and energy — orchestrated from one console." },
      { title: "AI Consulting\nand Integration", blurb: "Design, deploy, and integrate with your existing stack." },
      { title: "Training\nand Support", blurb: "Onboarding and 24/7 support that keeps systems sharp." },
    ],
  },
  generic: {
    label: "Local business",
    houseAccent: "#E8643C",
    defaultVariant: "default",
    defaultHeroMode: "gradient",
    variants: [{ id: "default", label: "Clean & modern", scheme: "light" }],
    defaultServices: [
      { title: "What we do", blurb: "Quality work, done right the first time." },
      { title: "Why us", blurb: "Trusted by the neighbourhood, built on referrals." },
      { title: "Get in touch", blurb: "Tell us what you need — we'd love to help." },
    ],
  },
};

export function getVerticalMeta(vertical: string): VerticalMeta {
  return (VERTICAL_META as Record<string, VerticalMeta>)[vertical] ?? VERTICAL_META.generic;
}

// A short monogram from a business name, for logo-less fallbacks (nav + OG).
export function monogram(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "R";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

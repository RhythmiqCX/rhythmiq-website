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
export const VERTICALS = ["restaurant", "dentist", "pets", "generic"] as const;
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

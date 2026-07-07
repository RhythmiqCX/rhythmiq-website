import type { Prospect } from "@/lib/try/schema";

export type Cta = { label: string; href: string; external: boolean };

/**
 * The single most important action for a prospect's customer, chosen from
 * whatever contact methods exist. Booking beats a phone call beats an email.
 */
export function primaryCta(data: Prospect): Cta {
  const c = data.contact;
  const s = data.socials;
  if (c.bookingUrl) return { label: "Book a table", href: c.bookingUrl, external: true };
  if (c.phone) return { label: `Call ${c.phone}`, href: `tel:${c.phone.replace(/\s+/g, "")}`, external: false };
  if (c.email) return { label: "Get in touch", href: `mailto:${c.email}`, external: false };
  // Social-only prospects (common with Instagram-sourced outreach): the CTA
  // becomes a message/visit link. Schema guarantees at least one of these exists.
  if (s?.instagram) return { label: "Message on Instagram", href: s.instagram, external: true };
  if (s?.facebook) return { label: "Message on Facebook", href: s.facebook, external: true };
  return { label: "Visit website", href: s?.website ?? "#contact", external: true };
}

/** A secondary action distinct from the primary, when we have a second method. */
export function secondaryCta(data: Prospect, primary: Cta): Cta | null {
  const c = data.contact;
  if (c.phone && primary.href !== `tel:${c.phone.replace(/\s+/g, "")}`)
    return { label: "Call us", href: `tel:${c.phone.replace(/\s+/g, "")}`, external: false };
  if (c.email && !primary.href.startsWith("mailto:"))
    return { label: "Email", href: `mailto:${c.email}`, external: false };
  return null;
}

export function ctaVerb(data: Prospect): string {
  if (data.contact.bookingUrl) return "Book a table";
  if (data.contact.phone) return "Call to reserve";
  return "Get in touch";
}

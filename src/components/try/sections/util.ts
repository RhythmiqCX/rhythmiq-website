import type { Prospect } from "@/lib/try/schema";

export type Cta = { label: string; href: string; external: boolean };

/**
 * The single most important action for a prospect's customer, chosen from
 * whatever contact methods exist. Booking beats a phone call beats an email.
 */
export function primaryCta(data: Prospect): Cta {
  const c = data.contact;
  if (c.bookingUrl) return { label: "Book a table", href: c.bookingUrl, external: true };
  if (c.phone) return { label: `Call ${c.phone}`, href: `tel:${c.phone.replace(/\s+/g, "")}`, external: false };
  // Schema guarantees at least one of booking/phone/email, so email is the floor.
  return { label: "Get in touch", href: `mailto:${c.email}`, external: false };
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

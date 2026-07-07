import { z } from "zod";
import { VERTICALS, HERO_MODES } from "./catalog";

/**
 * Prospect prototype data model. One JSON file per prospect lives in
 * `content/try/<slug>.json` and is validated against this schema at build time
 * (the loader parses + `.parse()`s it inside a try/catch, so a malformed file
 * 404s that one slug instead of throwing the whole build).
 *
 * Everything an operator would have to hunt for is optional with a sane
 * default — only 5 things are truly required (see `.refine` + `.min(1)`s):
 * business name, one-liner, vertical, variant, and ≥1 contact method.
 */
export const prospectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "kebab-case slug"),
    vertical: z.enum(VERTICALS),
    variant: z.string().default("default"),
    status: z.enum(["live", "archived"]).default("live"),

    business: z.object({
      name: z.string().min(1),
      tagline: z.string().optional(),
      oneLiner: z.string().min(1),
      logo: z.string().optional(), // e.g. /try/<slug>/logo.png
    }),

    theme: z
      .object({
        accent: z
          .string()
          .regex(/^#([0-9a-fA-F]{6})$/, "6-digit hex")
          .default("#E8643C"),
        scheme: z.enum(["light", "dark"]).default("light"),
      })
      .default({ accent: "#E8643C", scheme: "light" }),

    hero: z
      .object({
        mode: z.enum(HERO_MODES).default("gradient"),
        photo: z.string().optional(), // for ken-burns
        videoMp4: z.string().optional(), // optional stock-video slot
        videoWebm: z.string().optional(),
        poster: z.string().optional(),
      })
      .default({ mode: "gradient" }),

    services: z
      .array(z.object({ title: z.string().min(1), blurb: z.string().optional() }))
      .max(6)
      .default([]),

    // Short proof-point band under the hero (e.g. "12 yrs" / "Established").
    highlights: z
      .array(z.object({ value: z.string().min(1), label: z.string().min(1) }))
      .max(4)
      .optional(),

    // Optional oversized "signature" statement for the feature section.
    signature: z.string().optional(),

    photos: z.array(z.string()).max(6).default([]),

    testimonial: z.object({ quote: z.string().min(1), author: z.string().min(1) }).optional(),

    contact: z
      .object({
        phone: z.string().optional(),
        email: z.string().email().optional(),
        bookingUrl: z.string().url().optional(),
        address: z.string().optional(),
        hours: z.string().optional(),
        mapUrl: z.string().url().optional(),
      })
      .default({}),

    socials: z
      .object({
        instagram: z.string().url().optional(),
        facebook: z.string().url().optional(),
        website: z.string().url().optional(),
        x: z.string().url().optional(),
      })
      .partial()
      .optional(),
  })
  .refine(
    (d) =>
      Boolean(
        d.contact.phone ||
          d.contact.email ||
          d.contact.bookingUrl ||
          d.socials?.instagram ||
          d.socials?.facebook ||
          d.socials?.website,
      ),
    {
      message:
        "At least one contact is required (phone, email, bookingUrl, or an Instagram/Facebook/website link).",
      path: ["contact"],
    },
  );

export type Prospect = z.infer<typeof prospectSchema>;

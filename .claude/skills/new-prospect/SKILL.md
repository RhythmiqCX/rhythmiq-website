---
name: new-prospect
description: >
  Create OR remove tailored single-page prototype websites for sales prospects,
  served at try.rhythmiqcx.com/<slug>. To create: interviews the operator for a
  few low-friction details, writes a validated data file, wires any photos, runs
  typecheck + lint, and commits on staging. To remove: archives or deletes a
  prototype we're no longer using. Use when an operator says "make a demo site
  for <business>", "new prospect", "remove/retire/take down the site for
  <business>", or "clean up old prototypes". Runs inside the rhythmiq-website repo.
license: MIT
metadata:
  author: Rhythmiq
  version: "1.0.0"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - AskUserQuestion
---

# /new-prospect — build a tailored prototype site

You generate a polished, mobile-first, single-page prototype for a prospect
business and publish it at `try.rhythmiqcx.com/<slug>`. The whole point is
**zero friction**: keep the interview short, never make the operator hunt for an
asset, and get to a shareable link fast. The prototype's job is to earn a reply —
it is not the final product.

The rendering system already exists; you only create **one JSON data file** (and
optionally drop in a photo or two). Do not write new React components unless the
operator explicitly asks to add a new vertical/variant.

## Requirements to run this skill

An operator needs, on their machine:
- A local clone of the **rhythmiq-website** repo (the skill + the whole rendering
  system live inside it). Open it in **Claude Code** (VS Code extension or CLI).
- **Node.js 18.18+** and **npm**, with deps installed once: `npm install`.
- **Git** access to the repo with push rights (prototypes are committed to
  `staging`; publishing merges `staging → main`).
- Be on the **`staging`** branch.
- **macOS** for the `sips` image-resize step (built in). On Linux/Windows,
  install ImageMagick or `cwebp` and resize with that instead.
- To actually publish a link: **Vercel** access, with `try.rhythmiqcx.com` added
  under Project → Domains + DNS (one-time setup, already done for the project).

## How the system works (read these first)

- Data model + validation: `src/lib/try/schema.ts` (Zod). Your JSON must satisfy it.
- Verticals, variants, vibes, service defaults: `src/lib/try/catalog.ts` and
  `.claude/skills/new-prospect/reference.md`.
- One file per prospect lives at `content/try/<slug>.json`. A stable route
  (`src/app/try/[slug]/page.tsx`) renders it; a dynamic OG card is generated
  automatically. Photos go in `public/try/<slug>/`.

## Step 1 — Preflight

1. Confirm the working dir is the rhythmiq-website repo and you're on the
   `staging` branch: `git branch --show-current`. If not on `staging`, tell the
   operator and offer to `git checkout staging` (or branch from it). Never work
   on `main`.
2. Skim `reference.md` for the current vertical/variant catalog.

## Step 2 — Interview

**How to run it:** In ONE chat message, show the operator the exact field list
below — split into **Required** and **Optional (with the default shown)** — and
let them answer in plain chat. The free-text fields (name, description, contact,
services, etc.) have no fixed options, so the operator types them; do **NOT**
wrap free-text in an `AskUserQuestion` popup with invented example options
(that's useless and frustrating). Use `AskUserQuestion` popups **only** for the
visual choices — **Style / template** (which variant) and **Accent color** — and
only if the operator didn't already state them. Some variants ship a fixed
palette (e.g. `retro-vibe`), so skip the accent popup when one of those is picked.
If the operator gives everything in one message, skip the popups and build.

Present this list verbatim (adjust defaults per vertical):

**REQUIRED**
1. **Business name**
2. **Type / niche** — restaurant/café, **dentist/clinic**, or anything else
   (→ generic). See `reference.md` for the verticals we ship templates for.
3. **What they do** — one sentence (becomes the hero line)
4. **One contact** — a phone number, booking link, email, **or an Instagram /
   Facebook page** (many IG-sourced prospects are social-only; the CTA then
   becomes "Message on Instagram")

**OPTIONAL — skip any; default in parentheses**
5. **Style / template** — which variant. Restaurant: **warm-editorial** (warm
   paper + coral) · **bold-dark** (cinematic dark) · **retro-vibe** (bold 70s /
   neo-brutalist, Gen-Z). Default: warm-editorial — popup choice. See
   `reference.md` for the current list per vertical.
6. **Accent color** — Coral / Deep Blue / Forest / Plum / Charcoal (default:
   Coral) — popup choice
7. **Tagline** — short phrase (default: reuse #3)
8. **Highlights** — 2–4 proof points, e.g. "Est. 2015" · "4.8★" (default: none)
9. **Signature line** — one bold statement for the mid-page feature (default:
   reuse tagline)
10. **Services** — 3–6 items, each an optional one-liner (default: generic)
11. **Photo(s)** — 0–3 images, or an Instagram/Maps link. **If the operator
    gives none, auto-source them (Step 3) — never ship a bare gradient for a
    food/venue/visual business.** A photo makes the hero a full-bleed cinematic
    shot; that's the whole point of the tool.
12. **Address** (default: omit) · 13. **Hours** (default: omit) ·
    14. **Socials** (default: omit) · 15. **Testimonial** — quote + author
    (default: omit)

**Optional — offer, but never block. Apply the default if skipped:**
- Tagline (short) → shown as hero eyebrow + OG tagline; defaults to the one-liner.
- Accent color → offer the named **vibes** (Coral / Deep Blue / Forest / Plum /
  Charcoal) so they never need a hex. Default to the vertical's house accent.
- Scheme (light/dark) → usually implied by the chosen variant; don't ask
  separately unless they want to override.
- Hero mode → default per vertical (restaurant → `ken-burns` if a photo is
  provided, else `gradient`; generic → `gradient`). Only `ken-burns`/`video`
  need assets — if none, use `gradient` or `particles` (no assets, always sharp).
- Services (3–6) → else the vertical defaults are used automatically.
- Highlights (2–4 `{ value, label }` proof points, e.g. "Est. 2012" / "Family
  run", "4.9★" / "1,200+ reviews") → strongly recommended, they make photo-less
  prototypes feel substantial. Pull them from the prospect's Google/Instagram if
  you can; omit if unknown.
- Signature → one oversized statement line for the feature section (e.g. "Every
  plate leaves the kitchen the way we'd serve it to family."). Defaults to the
  tagline/one-liner if skipped.
- Photos (0–3) → if provided, save + auto-size (Step 3). Else omit; the gradient
  hero needs none. **For restaurants especially, grabbing one good photo from
  their Instagram and using `hero.mode: "ken-burns"` is the single biggest
  upgrade** — it turns the hero into a full-bleed, slowly-panning showcase.
- Address, hours, socials, testimonial → include only if volunteered.

**Hard rules:**
- **Never ask the operator to source, shoot, compress, or resize a video.** The
  default hero is code-driven. The `video` mode exists only for pre-curated
  stock and is opt-in.
- **Never ask for a hex code** — offer vibes.
- If the operator pastes an Instagram/Maps link, extract what you can
  (name, one-liner, maybe a photo URL) to save them typing, then confirm.

## Step 3 — Slug + assets

- **Slug:** kebab-case the business name → lowercase, `[a-z0-9-]` only, collapse
  and trim dashes (e.g. "Bella's Bistro" → `bellas-bistro`). Reject reserved
  names (`index`, `api`). If `content/try/<slug>.json` already exists, suffix
  (`-2`, a city, etc.) or ask.
- **Photos:** save provided images to `public/try/<slug>/` and reference them as
  `/try/<slug>/<file>`. Auto-size to ~1600px wide before committing (macOS
  `sips` is allow-listed):
  `sips -s format jpeg -s formatOptions 72 -Z 1600 public/try/<slug>/<file>`.
  Never commit a multi-MB original.
- **Auto-source images when the operator gives none** — this is the default, not
  a fallback. A gradient hero on a food/venue business defeats the tool.
  1. **With an API key** (best): if `UNSPLASH_ACCESS_KEY` or `PEXELS_API_KEY` is
     set, query it by the business's keywords (e.g. "fried chicken", "chicken
     burger", "barbershop interior").
  2. **Without a key:** pull from the Unsplash CDN by photo id —
     `https://images.unsplash.com/photo-<id>?w=1600&q=75&auto=format&fit=crop`
     (no key needed). Grab several candidates.
  3. **Always VIEW each candidate and curate.** Pick appetizing, on-brand,
     high-res (≥1200px), watermark-free shots. **Avoid LoremFlickr** (random
     watermarked snapshots / wrong subjects) and **anything showing a
     competitor's branding or logo** (e.g. a KFC wrapper on a chicken shop).
  4. Use **1 dramatic landscape shot for the hero** (a dark background reads best
     under the white headline) with `hero.mode: "ken-burns"`, and **2–3 more for
     the gallery** (`photos`). `sips` them and save to `public/try/<slug>/`.
  - **Licensing:** stock is fine for the outreach *prototype*; for the paid build
    swap in the prospect's real photos.
- **Logo:** if none, omit it — the templates + OG fall back to a monogram.

## Step 4 — Write the data file

Write `content/try/<slug>.json` conforming to `src/lib/try/schema.ts`. See
`reference.md` for a complete, filled-in example. Minimum shape:

```json
{
  "slug": "bellas-bistro",
  "vertical": "restaurant",
  "variant": "warm-editorial",
  "business": { "name": "Bella's Bistro", "oneLiner": "Wood-fired Italian in the heart of Bandra." },
  "theme": { "accent": "#E8643C", "scheme": "light" },
  "hero": { "mode": "gradient" },
  "contact": { "phone": "+91 98765 43210" }
}
```

Set `hero.mode` to `ken-burns` and `hero.photo` to a `/try/<slug>/...` path only
if a good photo was provided. For a `dark` variant, set `theme.scheme` to `dark`.

## Step 5 — Validate

Run both (allow-listed):
- `npx --no-install tsc --noEmit`
- `npx --no-install next lint`

If the loader can't parse the JSON, or Zod rejects it, fix the data file and
re-run. A malformed file only 404s its own slug, but we still want it valid.

## Step 6 — Preview (optional, recommended)

Tell the operator they can preview locally at
`http://localhost:3010/try/<slug>` (run `npm run dev` if not already up) — the
route resolves without the subdomain. The OG card is at
`http://localhost:3010/try/<slug>/opengraph-image`.

## Step 7 — Commit

Commit on `staging` only:

```
git add content/try/<slug>.json public/try/<slug>
git commit -m "feat(try): prototype site for <Business Name> (<slug>)"
```

End the commit message with the standard trailer:
`Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

**Do not push** unless the operator asks. When they do, `git push`; staging
auto-deploys a Vercel preview. Merging `staging → main` publishes to
`try.rhythmiqcx.com`.

## Step 8 — Hand back

Give the operator the link: `https://try.rhythmiqcx.com/<slug>` (note it's
`noindex`, so it won't show up in search). Suggest recording a 30-second Loom
walkthrough to send alongside it — it dramatically lifts reply rates.

## Removing / retiring a prototype

When an operator wants to take down one prototype, or bulk-clean the ones we're
no longer pursuing. Always on `staging`, never `main`.

1. **Identify the slug(s).** To see everything live: list `content/try/*.json`
   (ignore files starting with `_`). Confirm the exact slug(s) with the operator
   before removing anything — do not guess.
2. **Pick a method:**
   - **Archive (reversible, keeps history):** set `"status": "archived"` in
     `content/try/<slug>.json`. The loader returns null for archived prospects,
     so the page 404s but the file (and its content) is preserved. Use this when
     we might revive the prospect later.
   - **Delete (permanent):** remove the data file and its assets —
     `git rm content/try/<slug>.json` and `git rm -r public/try/<slug>` (if it
     exists). This drops the slug from `generateStaticParams` on the next build.
     Use this for true cleanup.
3. **For a bulk cleanup**, repeat per slug. Read each candidate's `business.name`
   back to the operator and get an explicit yes for each before removing.
4. **Validate + commit:** run `npx --no-install tsc --noEmit`, then commit on
   `staging`:
   - archive → `chore(try): archive prototype <slug>`
   - delete → `chore(try): remove prototype <slug>`
   Add the standard `Co-Authored-By` trailer. Push only if asked.
5. **Note the timing:** prototypes are statically generated, so a removal only
   takes effect once `staging`/`main` redeploys. Until then the old page may
   still be cached at its URL. Tell the operator when it will actually be gone.

## Adding a new vertical or variant (only if asked)

1. Add the vertical to `VERTICALS` + `VERTICAL_META` in `src/lib/try/catalog.ts`.
2. Create `src/components/try/templates/<vertical>/<variant>.tsx` (compose the
   shared sections in `src/components/try/sections/`).
3. Register it in `src/components/try/registry.ts`.
4. Update `reference.md`.

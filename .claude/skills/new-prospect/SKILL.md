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

## Step 2 — Interview (keep it short)

Use the **AskUserQuestion** tool for the closed-choice questions (batch them),
and plain conversation for free text. Ask only what you need.

**Required (5):**
1. **Business name** (may be given as the command arg).
2. **Vertical** — closed choice from the catalog (currently `restaurant`,
   `generic`). Pick `generic` when nothing fits.
3. **Variant** — closed choice from that vertical's variants (e.g. restaurant →
   `warm-editorial`, `bold-dark`). Default to the vertical's default variant.
4. **One-liner** — one sentence: what they do / who for. Becomes the hero
   subhead.
5. **At least one contact method** — phone, booking URL, or email. (The schema
   rejects a prospect with none.)

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
  `sips -Z 1600 public/try/<slug>/<file>` (use `-s format jpeg` if converting).
  Never commit a multi-MB original.
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

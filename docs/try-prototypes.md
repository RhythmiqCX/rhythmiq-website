# Prospect-prototype system (`/try`)

Single-page demo websites for sales prospects, served at
`try.rhythmiqcx.com/<slug>` (local: `http://localhost:3010/try/<slug>`).
Created and removed via the `/new-prospect` skill.

Companion docs — keep the split in mind so each stays current:

- **This file** — how the system works (stable; rarely changes).
- [`content/try/SHOWCASE.md`](../content/try/SHOWCASE.md) — the *live map*:
  which sites exist, which template/prompt each uses. Update when sites are
  added/removed.
- [`.claude/skills/new-prospect/reference.md`](../.claude/skills/new-prospect/reference.md)
  — per-variant data-slot mapping (which JSON field lands where in each
  template) + asset-compression commands.

## Data flow

1. `content/try/<slug>.json` is the entire definition of a site. One file per
   prospect. `slug` field must match the filename.
2. `src/app/try/[slug]/page.tsx` statically generates one page per JSON file
   (`dynamicParams = false`). `src/lib/try/load.ts` reads and validates against
   the Zod schema in `src/lib/try/schema.ts`; any validation failure (or
   `status: "archived"`) → 404. Nothing invalid ever renders.
3. Template selection: `pickTemplate(vertical, variant)` in
   `src/components/try/registry.ts`. Cascade: exact variant → vertical's default
   variant → `generic/default`.
4. `src/components/try/theme.ts` turns `theme.accent` + `theme.scheme` into ~15
   CSS custom properties (`--accent`, `--bg`, `--fg`, …) injected inline on
   `<main>`. Text-on-accent color is computed via WCAG luminance.
5. CTA resolution (`src/components/try/sections/util.ts`): `primaryCta()` picks
   the first available of bookingUrl > phone > email > Instagram > Facebook >
   website. Schema guarantees at least one contact method exists.

## Registries — adding a vertical/variant

`src/lib/try/catalog.ts` is the single source of truth for verticals, variants,
per-vertical accent/hero defaults, and fallback services used when the operator
skips optional interview fields. Adding a vertical = one entry in `catalog.ts`
+ a template component under `src/components/try/templates/<vertical>/` + one
line in `registry.ts`.

Hard-won rule (see "Tried and removed" in SHOWCASE.md): only build a new
vertical when a single source prompt genuinely declares itself that business —
don't re-skin or assemble prompts to force a niche.

## Content schema (`src/lib/try/schema.ts`)

| Field | Notes |
|---|---|
| `slug`, `vertical`, `variant`, `status` | status `archived` → 404 |
| `business.name` | required; also feeds OG title + monogram fallback |
| `business.oneLiner` | required; OG description |
| `business.tagline`, `.about`, `.logo`, `.avatar` | optional |
| `theme.accent` (hex), `theme.scheme` (light/dark) | showcase templates ignore accent (fixed palettes) |
| `hero.mode` | gradient / particles / ken-burns / video |
| `hero.photo`, `.videoMp4`, `.videoWebm`, `.poster` | media slots |
| `services[0..5]` | title required; blurb / price / tag / photo optional; `\n` in titles renders as line break |
| `highlights[0..3]` | value + label proof points (e.g. count-up stats) |
| `signature` | oversized statement line |
| `photos[0..5]` | image *or video* paths — several templates use these slots for videos |
| `testimonial` | quote + author, both required if present |
| `contact.*` / `socials.*` | at least one contact method required overall |

Templates repurpose slots freely (e.g. Velar uses `photos[]` for gallery
videos, `hero.poster` for its building PNG). The authoritative slot→meaning
mapping per variant lives in the new-prospect reference doc.

## Template inventory (design intent)

Simple shared-section templates (compose `src/components/try/sections/*`):

- **restaurant/warm-editorial** — light "paper" editorial, coral accent (the
  in-house redesign look). Default restaurant variant.
- **restaurant/bold-dark** — dark cinematic variant of the same sections.
- **generic/default** — clean fallback for any vertical without a template.

Bespoke single-file templates (each mirrors a specific source design; fixed
palette, custom scroll/animation code, ~150–650 lines each):

- **restaurant/retro-vibe** — 70s neo-brutalist, loud type, richer menu schema.
- **dentist/clean-clinic** — mono photo-mosaic with masked cards + splash intro.
- **pets/boutique-hero** — mint + serif single-screen storefront.
- **realestate/luxury-estate** — typewriter preloader, scroll-driven building
  PNG rising between sections, count-up stats, hover-expand video gallery.
- **architecture/layered-depth** — ambient video, giant wordmark, parallax slab,
  bird state machine (4 webm clips), frosted panels, second video statement.
- **retail/wild-scent** — video hero + floating product card, two mirrored
  product panels with intersection-observer reveals.
- **beauty/luxury-botanical** — 600vh scroll: clip-path ellipse wipes open onto
  orbiting product bottles (CSS offset-path), newsletter + full footer.
- **finance/synthesis** — 700vh scroll-scrubbed video (`currentTime` driven by
  smoothed RAF), cross-fade to navy layer with sequential paragraph reveals.
- **travel/scenic** — split-screen mirrored/clipped headline (dark on cream,
  white on video), floating "gem" card with video background.
- **security/akor** — dark video hero, inverted light 2×2 services grid,
  black about section; green accent; on-load animations only.

Design conventions for the bespoke set (intentional, don't "fix" casually):

- Palettes and nav labels are hardcoded per template to stay faithful to the
  source design; `theme.accent` is decorative in the JSON.
- These are one-page demos — nav links are largely decorative anchors.
- Fallback copy baked into templates lets a site render even from a minimal
  JSON.

## Assets & fonts

- All demo media self-hosted in `public/try/<slug>/` — nothing hotlinked.
  Compress before committing (ffmpeg → lean H.264 mp4; cwebp; HLS sources get
  transcoded). Exact commands: new-prospect reference doc. Site folders run
  ~0.3–2 MB total each; keep it that way.
- Template-specific fonts (Syne, Playfair, Space Grotesk, Open Sauce One,
  Inter, DM Serif Display, Bricolage Grotesque, Manrope, Sora) are self-hosted
  in `src/constants/fonts.ts`.

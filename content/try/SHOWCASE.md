# Try/ showcase — templates in use & the sites they power

Reference map of every prototype site under `try.rhythmiqcx.com/<slug>` (local
preview: `http://localhost:3010/try/<slug>`), which template variant it uses,
and the source design/prompt each template was built from.

- **Templates** live in `src/components/try/templates/<vertical>/<variant>.tsx`
- **Per-site content** lives in `content/try/<slug>.json`
- **Verticals/variants registry** is `src/lib/try/catalog.ts` + `src/components/try/registry.ts`
- **Source prompt bodies** (motionsites catalog, 326 prompts, free + paid) live
  in `design-refs/motionsites/prompts/<id>.md` — this folder is **gitignored**
  (local only). The niche pick-list is `design-refs/motionsites/CATALOG.md`.

## Sites (13 live)

| Vertical | Variant (template) | Source design / prompt | Site slug | Business | Scheme |
|----------|--------------------|------------------------|-----------|----------|--------|
| restaurant | `warm-editorial` | In-house "paper" redesign (Monte-inspired) | `bellas-bistro` | Bella's Bistro | light |
| restaurant | `warm-editorial` | In-house "paper" redesign | `cluckin-chicken` | Cluckin Chicken | light |
| restaurant | `bold-dark` | In-house cinematic variant | `dorasani` | Dorasani | dark |
| restaurant | `retro-vibe` | User prompt (70s neo-brutalist) | `vibe-bistro` | Vibe Bistro | light |
| dentist | `clean-clinic` | User prompt (masked-card mosaic + splash) | `northgate-dental` | Northgate Dental | light |
| pets | `boutique-hero` | User prompt (CozyPaws hero) | `cozypaws` | CozyPaws | light |
| realestate | `luxury-estate` | motionsites `luxury-real-estate` (Velar) | `velar` | Velar. | dark |
| architecture | `layered-depth` | motionsites `layered-depth` (Qelora) | `qelora` | Qelora | dark |
| retail | `wild-scent` | motionsites `shop` (Wild Daisy Fragrances) | `wilddaisy` | Wild Daisy Fragrances | light |
| beauty | `luxury-botanical` | motionsites `luxury-botanical` (Bentley "Beyond") | `botanical` | Bentley | light |
| finance | `synthesis` | motionsites `synthesis` (Elias Norden) | `synthesis` | Elias Norden | dark |
| travel | `scenic` | motionsites `travel-hero` (Scenic split-screen) | `scenic` | Voyage | light |
| security | `akor` | motionsites `akor-security-landing` (AKOR) | `akor` | AKOR | dark |

Each vertical currently has exactly one site, except **restaurant** (4 sites
across 3 variants). Every variant's data-slot mapping is documented in
`.claude/skills/new-prospect/reference.md`.

## New fonts added for these templates
`src/constants/fonts.ts` — Syne, Playfair Display, Space Grotesk, Open Sauce One
(dentist), Inter, DM Serif Display (pets), **Bricolage Grotesque** (architecture),
**Manrope** (beauty), **Sora** (security). All self-hosted via `next/font`.

## Tried and removed (do not re-attempt as-is)
- `fitness` / **`yoga-coach`** (from motionsites `yoga-coach`) — built, then removed;
  the two-state design didn't hold up.
- `automotive` / **`velorah`** (from motionsites `focus-ai-landing`) — built, then
  removed; the prompt is nominally an "electric camper" but its footage is abstract
  clouds/starfields, so it never read as automotive. **Lesson: only build a niche
  when a single prompt genuinely declares itself that business — don't re-skin or
  assemble to force a niche.**

## Vetted-but-unused prompts (ready single-prompt niches, not yet built)
- **Creative studio / photography** → motionsites `prisma-landing` (framer-motion, clean)
- **Luxury jewelry** → motionsites `luxury-focus` ("Sculpted by Time") — needs Three.js added
- **Art / editorial** → motionsites `art-landing` (Manrope/Italiana, clean)

## Asset self-hosting
All demo media is pulled from source and compressed into `public/try/<slug>/`
(ffmpeg for video → lean H.264 mp4; cwebp for stills). HLS (`.m3u8`) sources are
transcoded to mp4. Nothing is hotlinked. See the "Self-hosting heavy assets"
note in `.claude/skills/new-prospect/reference.md` for the exact commands.

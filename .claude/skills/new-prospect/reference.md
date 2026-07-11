# new-prospect — catalog & reference

The live source of truth is `src/lib/try/catalog.ts` and `src/lib/try/schema.ts`.
This file is the quick human-readable version for the interview.

## Verticals & variants

| Vertical       | Variants                                        | Default variant  | Default hero | House accent |
|----------------|-------------------------------------------------|------------------|--------------|--------------|
| `restaurant`   | `warm-editorial`, `bold-dark`, `retro-vibe`     | `warm-editorial` | `ken-burns`  | `#E8643C`    |
| `dentist`      | `clean-clinic`                                  | `clean-clinic`   | `ken-burns`  | `#111111`    |
| `pets`         | `boutique-hero`                                 | `boutique-hero`  | `ken-burns`  | `#E86A10`    |
| `realestate`   | `luxury-estate`                                 | `luxury-estate`  | `ken-burns`  | `#213138`    |
| `architecture` | `layered-depth`                                 | `layered-depth`  | `video`      | `#241f21`    |
| `retail`       | `wild-scent`                                    | `wild-scent`     | `video`      | `#332023`    |
| `beauty`       | `luxury-botanical`                              | `luxury-botanical` | `video`    | `#000000`    |
| `finance`      | `synthesis`                                     | `synthesis`      | `video`      | `#020b1f`    |
| `travel`       | `scenic`                                        | `scenic`         | `video`      | `#1c1c1c`    |
| `security`     | `akor`                                          | `akor`           | `video`      | `#12f542`    |
| `generic`      | `default`                                       | `default`        | `gradient`   | `#E8643C`    |

- `warm-editorial` — light "paper + coral" editorial. Set `theme.scheme` = `light`.
- `bold-dark` — cinematic dark. Set `theme.scheme` = `dark`.
- `retro-vibe` — bold 70s / neo-brutalist "Gen-Z" look: cream canvas, thick black borders, hard offset shadows, Syne caps + Playfair italic accents, film grain, crosshair cursor. Fixed palette (orange `#ff4d00` / blue `#2d31fa` / neon `#bff000` / cream / near-black), so `theme.accent` is ignored. Uses the richer `services` fields — `price`, `tag` ("Best Seller"/"Spicy"/"Popular"), `photo` — plus `business.about` for the "Vibe Check" story. **Photo slots:** `hero.photo` → framed hero; `services[].photo` → the 3 menu cards; `photos[0..3]` → the Instagram grid.
- `clean-clinic` (dentist) — single-page dental clinic: a "masked card" photo-mosaic (one image sliced across several cards so they read as one photo), a 0→100 splash counter, a fixed navbar + mobile slide-menu, strict black/white/glass, Open Sauce One, huge `clamp()` headings. Fixed identity (`theme.accent` ignored). **Photo slots:** `hero.photo` → section-1 mosaic bg; `photos[0]` → section-2 mosaic bg; `photos[1]` + `photos[2]` → section-3 side images; `photos[3]` → section-3 tall image. `highlights` → the 3 feature bars; `services` (title, use `\n` for a line break) → the 4 service cards; `signature` → hero headline; `oneLiner` → hero mission line.
- `boutique-hero` (pets) — a single-viewport (`h-screen`, no-scroll) pet-store hero modelled on "CozyPaws": mint canvas, DM Serif Display heading with a word-pop entrance, floating product + video cards, and three bottom photos revealing upward with stat / rating / "Explore Products" overlays. Uses lucide-react icons. Fixed identity (`theme.accent` ignored). **Slots:** `business.logo` → header logo; `business.avatar` → avatars; `business.tagline` → heading (word 1 / rest); `services[0]` (title/price/photo) → product card; `hero.photo` → video card; `photos[0..2]` → the three bottom photos; `highlights[0]`/`[1]` → the "98K+" stat / rating.
- `luxury-estate` (realestate) — "Velar." luxury property site: a typewriter preloader lifts to reveal an oversized Syne hero over a cinematic render, a scroll-driven building rises + scales into a dark sticky statement with count-up stats, then a hover-expand video gallery. Fixed warm-off-white/teal identity. **Slots:** `business.tagline` → hero top word ("LIVE IN"); `signature` → hero headline ("IRREPLACEABLE"); `oneLiner` → hero subtitle; `business.about` → dark statement; `highlights[0..2]` → count-up stats; `hero.photo` → hero bg; `hero.poster` → the rising building PNG; `photos[0..4]` → the five gallery videos (`.mp4`).
- `layered-depth` (architecture) — "Qelora" studio site: a two-section, all-inline-styled page — ambient hero video, an alpha-WebM bird that enters/idles/leaves on scroll, a giant centred wordmark, a parallax sculpture slab, frosted nav pills + two bottom panels, then a video Section 2. Bricolage Grotesque. **Slots:** `business.tagline` → tagline panel; `oneLiner` → CTA-card line; `signature` → Section-2 statement; `business.about` → Section-2 subtext; `hero.videoMp4` → hero bg; `hero.poster` → sculpture slab; `photos[0]` → CTA-card photo; `photos[1]` → Section-2 bg video. (Bird WebMs live in `public/try/<slug>/bird-*.webm`.)
- `wild-scent` (retail / DTC) — "Wild Daisy Fragrances": a video hero with an editorial title, floating product card + italic "01" index, then two split product panels (blue + lime) whose bottle/caption/notes/CTA stagger in on scroll. **Slots:** `business.tagline` → hero title (newline-separated); `services[0..2]` (title/blurb=size/photo) → the three products; `hero.videoMp4` → hero bg. Panel videos live at `public/try/<slug>/scent.mp4` + `wild.mp4`; scent-notes are editable template defaults.
- `luxury-botanical` (beauty / spa / perfumery) — "Beyond The Collection" fragrance orbit: a 600vh scroll story where a clip-path ellipse wipes open to reveal a ring of bottles orbiting a motion-path (framer-motion), scaling up at the focal point, then a "Stay in the collection" newsletter section + footer. Instrument Serif + Manrope. **Slots:** `business.tagline` → "Beyond The Collection" wordmark; `services[0..5]` (title/blurb/photo) → the orbiting bottles + note labels; `oneLiner` → bottom-right blurb; `hero.videoMp4` → ambient bg. (Stay image at `public/try/<slug>/stay.webp`.)
- `synthesis` (finance / wealth) — "Elias Norden — Health Capital": a 700vh scroll-scrubbed video hero that cross-fades to near-black and reveals three statement paragraphs one by one. Dark navy, Instrument-Serif accents. **Slots:** `business.name` → logo (last word italic); `business.tagline` → headline; `signature` → italic headline accent; `services[0..2].blurb` → the three reveal paragraphs; `hero.videoMp4` → scrubbed video (re-encode with dense keyframes: `-g 6`).
- `scenic` (travel / hotel / resort) — split-screen hero: cream left half + full-bleed scenic video right half, with the headline rendered twice and clipped down the middle (dark on cream, white over video), plus a floating "Hidden Gems" card with its own looping video. **Slots:** `business.tagline` → headline (two lines, newline-split); `oneLiner` → hero paragraph; `services[0]` (title/blurb/photo=gem video) → the Hidden Gems card; `hero.videoMp4` → scenic bg.
- `akor` (security / automation) — dark single-page security site: a fixed navbar with a green hexagon mark, a full-viewport video hero with bottom-left copy + two CTAs, an inverted near-white Services section (2×2 icon cards), and a black About section with a looping video beside a mission block. Sora type, vivid-green accent. **Slots:** `business.tagline` → hero H1 (use `\n` for the line break); `oneLiner` → hero subtext; `business.about` → Services heading; `services[0..3]` (title with `\n`, blurb, photo=icon) → the 4 service cards; `signature` → About heading; `hero.videoMp4` → hero bg; `photos[0]` → About video.
- Unknown vertical/variant gracefully falls back (variant → vertical default → generic).

More verticals (salon, gym, clinic, …) get added by extending `catalog.ts` +
`registry.ts` + a template file. Until then, use `generic` for other niches.

### Self-hosting heavy assets (videos)
These new variants are video-first. Always self-host: pull the source, transcode
to a lean web MP4 with `ffmpeg` (`-vf scale=1280:-2 -c:v libx264 -crf 30 -an
-movflags +faststart -pix_fmt yuv420p`), and drop it under `public/try/<slug>/`.
For a *scroll-scrubbed* video (`synthesis`) add dense keyframes: `-g 6 -keyint_min
6 -sc_threshold 0`. HLS (`.m3u8`) sources transcode directly: `ffmpeg -i URL.m3u8
… out.mp4`. Convert stills to `webp` with `cwebp -q 86` (add `-alpha_q 100` to keep
transparency). Only reach for a CDN loader if a single asset is still large enough
to slow first paint.

## Vibes (offer these instead of asking for a hex)

| Vibe      | Accent    |
|-----------|-----------|
| Coral     | `#E8643C` |
| Deep Blue | `#2F5FE0` |
| Forest    | `#2E7D57` |
| Plum      | `#7A3E8E` |
| Charcoal  | `#2A2620` |

## Hero modes

| Mode        | Needs an asset? | Use when                                        |
|-------------|-----------------|-------------------------------------------------|
| `gradient`  | No              | Default. Animated accent-tinted blobs. Always sharp. |
| `particles` | No              | Techy/modern feel. Cursor-reactive network.     |
| `ken-burns` | A photo         | Restaurants with a good food/room photo.        |
| `video`     | Curated stock   | Opt-in only. Never source per prospect.         |

## Default services (used when the operator skips services)

- **restaurant:** Dine in · Takeaway & delivery · Private events
- **generic:** What we do · Why us · Get in touch

## Full example data file (`content/try/bellas-bistro.json`)

```json
{
  "slug": "bellas-bistro",
  "vertical": "restaurant",
  "variant": "warm-editorial",
  "status": "live",
  "business": {
    "name": "Bella's Bistro",
    "tagline": "Wood-fired Italian, since 2012.",
    "oneLiner": "A neighbourhood trattoria serving wood-fired pizza and fresh pasta in the heart of Bandra."
  },
  "theme": { "accent": "#E8643C", "scheme": "light" },
  "hero": { "mode": "ken-burns", "photo": "/try/bellas-bistro/hero.jpg" },
  "services": [
    { "title": "Wood-fired pizza", "blurb": "Blistered, 90-second Neapolitan crusts." },
    { "title": "Fresh pasta", "blurb": "Rolled and cut in-house every morning." },
    { "title": "Private dining", "blurb": "A cand-lit room for up to 30 guests." }
  ],
  "photos": ["/try/bellas-bistro/room.jpg", "/try/bellas-bistro/plate.jpg"],
  "testimonial": { "quote": "The best carbonara this side of Rome.", "author": "Mumbai Food Weekly" },
  "contact": {
    "phone": "+91 98765 43210",
    "bookingUrl": "https://example.com/book",
    "address": "12 Hill Road, Bandra West, Mumbai",
    "hours": "Tue–Sun · 12pm–11pm",
    "mapUrl": "https://maps.google.com/?q=Bella's+Bistro+Bandra"
  },
  "socials": { "instagram": "https://instagram.com/bellasbistro" }
}
```

## Minimal example (photo-less, one contact — the fast path)

```json
{
  "slug": "sunrise-dental",
  "vertical": "generic",
  "variant": "default",
  "business": {
    "name": "Sunrise Dental",
    "oneLiner": "Gentle, modern dentistry for the whole family."
  },
  "theme": { "accent": "#2F5FE0", "scheme": "light" },
  "hero": { "mode": "gradient" },
  "contact": { "phone": "+91 90000 00000" }
}
```

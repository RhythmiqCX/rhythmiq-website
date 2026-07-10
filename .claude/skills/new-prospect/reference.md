# new-prospect — catalog & reference

The live source of truth is `src/lib/try/catalog.ts` and `src/lib/try/schema.ts`.
This file is the quick human-readable version for the interview.

## Verticals & variants

| Vertical     | Variants                                        | Default variant  | Default hero | House accent |
|--------------|-------------------------------------------------|------------------|--------------|--------------|
| `restaurant` | `warm-editorial`, `bold-dark`, `retro-vibe`     | `warm-editorial` | `ken-burns`  | `#E8643C`    |
| `generic`    | `default`                                       | `default`        | `gradient`   | `#E8643C`    |

- `warm-editorial` — light "paper + coral" editorial. Set `theme.scheme` = `light`.
- `bold-dark` — cinematic dark. Set `theme.scheme` = `dark`.
- `retro-vibe` — bold 70s / neo-brutalist "Gen-Z" look: cream canvas, thick black borders, hard offset shadows, Syne caps + Playfair italic accents, film grain, crosshair cursor. Fixed palette (orange `#ff4d00` / blue `#2d31fa` / neon `#bff000` / cream / near-black), so `theme.accent` is ignored. Uses the richer `services` fields — `price`, `tag` ("Best Seller"/"Spicy"/"Popular"), `photo` — plus `business.about` for the "Vibe Check" story. **Photo slots:** `hero.photo` → framed hero; `services[].photo` → the 3 menu cards; `photos[0..3]` → the Instagram grid.
- Unknown vertical/variant gracefully falls back (variant → vertical default → generic).

More verticals (dentist, salon, …) get added by extending `catalog.ts` +
`registry.ts` + a template file. Until then, use `generic` for non-restaurants.

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

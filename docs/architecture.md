# Site architecture (marketing, blog, tools, APIs)

Everything outside the `/try` prototype system (that has its own doc:
[try-prototypes.md](try-prototypes.md)).

## Hostname routing

`src/middleware.ts` rewrites by host — it's the only piece of code that knows
about subdomains:

- `dev.rhythmiqcx.com/*` → `/dev/*`
- `try.rhythmiqcx.com/*` → `/try/*`
- everything else (apex, www, Vercel previews, localhost) passes through

A subdomain also needs to be attached to the Vercel project (Project → Domains)
and pointed via DNS; the middleware only handles paths.

## Marketing site — `src/app/(marketing)/`

The main RhythmiqCX site: home, `about-us`, `pricing`, `demo`, `contact-us`,
`integrations`, `voice-ai` (voice product pillar), `tools` (free-tools index),
`blog`, legal pages, and competitor comparison pages (`vapi-alternative`,
`retell-ai-alternative`, `bland-ai-alternative`, `synthflow-alternative`) —
these comparison pages are SEO surfaces; treat their copy carefully.

Page sections live in `src/components/marketing/` (hero, features, pricing,
navbar, footer, etc., plus `restaurant/` and `dev/` subdirs for those surfaces).
Shared primitives: `src/components/ui/` (shadcn) and `src/components/global/`
(Container, Wrapper, JsonLd, icons, smooth-scroll).

Sitewide constants live in `src/constants/` — pricing plans, feature lists,
nav links, demo scenarios, and **fonts.ts** (all fonts self-hosted via
`next/font`).

## Blog — the two-artifact system

~120 posts. Mechanics:

- `content/blog/<slug>.md` — frontmatter (`title`, `date`, `description`,
  `cover`, `tag`, `category`, `author`) is read with gray-matter by the blog
  **index** (`blog/page.tsx`) and **category** pages (`blog/category/[tag]`).
  The markdown *body* is not what renders on the post page.
- `src/app/(marketing)/blog/<slug>/page.tsx` — the actual post, hand-authored
  TSX using `BlogLayout` + `BlogCTA`, with its own `generateMetadata` (canonical,
  OG image, publishedTime).

So a new post = both files, matching slugs. A post rename/removal must touch
both, plus a 301 in `next.config.ts` if the URL had authority.

## Free tools — `/tools/*`

~40 SEO/lead-gen tools. Pattern per tool:

- Route: `src/app/(marketing)/tools/<tool>/page.tsx`
- UI: `src/components/tools/<tool>/`
- Server logic: `src/actions/tools/*.ts` (a few older ones in
  `src/app/actions/`)

Backends by tool type: OpenAI / Groq / Gemini for generation, Deepgram for
speech-to-text, Sarvam for Indic TTS (proxied through the legacy Pages-router
route `src/pages/api/sarvam-proxy.ts`). `src/lib/rate-limit.ts` provides rate
limiting for the tool actions.

## API routes — `src/app/api/`

- `waitlist` — waitlist signups (Supabase)
- `lead-notify` — lead-capture notification (Resend email)
- `chatwoot-demo` — demo-chat integration

## SEO conventions

- `src/utils/metadata.ts` exports the `generateMetadata()` helper used on every
  page (title/description/canonical/OG).
- Structured data via `src/components/global/JsonLd.tsx`.
- `next.config.ts` holds explicit **301** redirects (not 308) for retired
  pillar pages — sources are exact paths so blog slugs that share prefixes are
  untouched. Retired-URL authority is consolidated there; extend that list when
  removing pages.
- Image optimization: AVIF/WebP with long cache TTL configured in
  `next.config.ts`; `scripts/optimize-images.mjs` for one-off batch compression.

## External services / env

Supabase (waitlist), Resend (email), OpenAI, Groq, Google Gemini, Deepgram,
Sarvam. Keys come from env — check `.env.local` locally and Vercel project env
in production before debugging a "broken" tool.

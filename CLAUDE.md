# CLAUDE.md

## What this is

Marketing + demo monorepo for **RhythmiqCX** — an AI customer-support / voice-AI
receptionist platform (60+ languages, restaurant & SMB focus). One Next.js app
serves three surfaces, split by hostname in `src/middleware.ts`:

| Surface | Host | Route subtree |
|---|---|---|
| Main marketing site | rhythmiqcx.com | `src/app/(marketing)/` |
| Software-studio landing ("Rhythmiq Dev") | dev.rhythmiqcx.com | `src/app/dev/` |
| Prospect demo sites | try.rhythmiqcx.com/`<slug>` | `src/app/try/` |

Deployed on Vercel. `staging` is the day-to-day working branch; `main` is
production. Commits follow loose conventional style (`feat(try): ...`).

## Commands

- `npm run dev` — dev server (Turbopack) on **port 3010**
- `npm run build` — production build. **Lint errors do not fail the build**
  (`eslint.ignoreDuringBuilds`), so run checks yourself:
- `npm run lint` and `npx tsc --noEmit` (no typecheck script exists)

## Stack

Next.js 15 App Router + React 19 + TypeScript. Tailwind 3 with shadcn/Radix
primitives in `src/components/ui/`. Animation: framer-motion mostly, plus
GSAP/lenis/ogl in places. Validation: Zod. All fonts self-hosted via
`next/font` in `src/constants/fonts.ts` — never load fonts from a CDN.
Tools/API backends use OpenAI, Groq, Gemini, Deepgram, Sarvam, Supabase, Resend.

## Repo map

- `src/app/(marketing)/` — main site pages (home, pricing, voice-ai, competitor
  `*-alternative` pages, blog, ~40 free SEO tools under `tools/`)
- `src/app/try/[slug]/` + `src/components/try/` + `src/lib/try/` + `content/try/`
  — the prospect-prototype system (see below)
- `src/app/dev/` — Rhythmiq Dev studio landing
- `src/app/api/` + `src/actions/tools/` + `src/app/actions/` — lead capture,
  waitlist, and server actions backing the free tools
- `src/components/` — `marketing/` (site sections), `try/` (demo templates),
  `tools/` (one dir per free tool), `ui/` (shadcn), `global/` (shared)
- `content/blog/` — blog post markdown (frontmatter only feeds the index; see
  gotcha below)
- `public/try/<slug>/` — self-hosted demo media; `public/images/` — site media
- `design-refs/` — **gitignored** local design sources (motionsites prompt catalog)

## Key subsystems (details in docs/)

- **Prospect demos (`/try`)** — JSON-per-site, Zod-validated, rendered through a
  vertical/variant template registry. Create/remove sites with the
  `/new-prospect` skill, not by hand. Architecture + schema + template
  inventory: **[docs/try-prototypes.md](docs/try-prototypes.md)**. Live
  site↔template↔prompt map: **[content/try/SHOWCASE.md](content/try/SHOWCASE.md)**.
- **Marketing site, blog, tools** — routes, blog mechanics, tools pattern, SEO
  conventions: **[docs/architecture.md](docs/architecture.md)**.

## Gotchas worth knowing up front

1. **Blog posts are two artifacts.** The listing/category pages read frontmatter
   from `content/blog/*.md`, but each post's actual page is hand-authored TSX at
   `src/app/(marketing)/blog/<slug>/page.tsx`. Adding or renaming a post means
   touching both, with matching slugs.
2. **Subdomain rewrites only work if the domain is attached in Vercel** and
   pointed via DNS. Middleware does the path rewrite; it can't create the domain.
3. **Demo media is never hotlinked.** Everything under `public/try/<slug>/`,
   compressed first (ffmpeg → H.264 mp4, cwebp for stills). Commands are in
   `.claude/skills/new-prospect/reference.md`.
4. **`/try` templates intentionally ignore `theme.accent`** — each showcase
   template ships a fixed palette that mirrors its source design.
5. Root-level `*.md` files (`REDESIGN-TODO.md`, `PRODUCTION-PUNCHLIST.md`,
   `LAUNCH-FOLLOWUPS.md`) are historical status docs — may be stale; don't treat
   them as current state. `rhythmiq-knowledge-base.md` is product marketing
   knowledge, useful for writing copy.

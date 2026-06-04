# Rhythmiq — Launch Follow-ups

Handoff after the production-polish pass. Branch: `redesign/restaurant-paper`
(pushed to `origin`). The `PRODUCTION-PUNCHLIST.md` items are all done; what's
left is mostly real data, deploy config, and optional polish.

Run locally: `rm -rf .next && npm run dev` (a stale `.next` from a prior `next build`
causes the "Missing required error components" loop). Visit http://localhost:3010.

---

## 1) Needs your input / real data (before public launch)

- [ ] **Real pricing.** The `/pricing` tiers (**$29 / $79 / $199 / Custom**) are
  placeholders modeled on the restaurant voice-AI market, with $29 kept as the
  entry anchor. Replace numbers + feature bullets in
  `src/constants/pricing-plans.ts` (`PRICING_TIERS`). FAQs that mention price live
  in the same file (`PRICING_FAQS`). The `$29` value prop also appears in the
  competitor table reused on `/pricing` and on `/voice-ai`
  (`src/app/(marketing)/voice-ai/PricingComparison.tsx`) and in the pricing JSON-LD
  (`src/app/(marketing)/pricing/page.tsx`, `offerSchema`).

- [ ] **Social proof is still placeholder** (intentionally kept for now):
  - Logo-cloud restaurant names ("Saltwater", "Maison Reine"…) →
    `src/components/marketing/restaurant/logo-cloud.tsx`
  - Strapline "Trusted by hospitality teams pouring **4M+ guest calls a year**" →
    same file. This is an unverifiable claim; soften or back it with real numbers.
  - Testimonial (quote + "Mara Velez, Director of Operations, Saltwater") →
    `src/components/marketing/restaurant/testimonial.tsx`
  - The caller quote in `world-class-agent.tsx` is also illustrative.
  Action: swap in a real customer name/logo + at least one real testimonial, or
  remove these sections, before going public.

- [ ] **Demo sign-up gate.** `/demo` collects scenario + restaurant info, then the
  "Talk to the AI live" button plain-redirects to `APP_LOGIN_URL`
  (`https://app.rhythmiqcx.com`) — your separate app, not hosted yet. No lead
  capture (your call). Once the app is live the redirect just works. If you later
  want to capture those leads (name/scenario) via email, that's a small add in
  `src/app/(marketing)/demo/DemoFlow.tsx` (the `APP_LOGIN_URL` anchor) using the
  existing Resend setup. Scenarios/copy: `src/constants/demo-scenarios.ts`.

- [ ] **Real photography (optional).** You chose SVG illustrations everywhere
  (`src/components/marketing/restaurant/visuals.tsx`). If you later want real
  restaurant photos, each slot can become a `next/image`; needs the actual image
  files (or a Pexels/Unsplash API key) and AVIF/WebP optimization.

---

## 2) Deploy / ops

- [ ] **Env vars.** Production build fails at `/api/*` page-data collection without:
  `OPENAI_API_KEY`, `RESEND_API_KEY`, `SUPABASE_URL` (+ `NEXT_PUBLIC_SUPABASE_URL`),
  `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`. Set these in the host
  (Vercel/etc.). The pages themselves compile + prerender clean. Also set
  `SITE_URL` (defaults to `https://rhythmiqcx.com`) so sitemap/canonical/OG URLs
  are correct.
- [ ] **Pre-launch QA on a deployed preview.** Verified so far: `tsc`, production
  build (page compile/prerender), dev 200s, sitemap (170 URLs) + robots. Still
  worth: a real **Lighthouse / PageSpeed** run and a **mobile + cross-browser**
  visual pass (the landing sections use framer-motion scroll-reveal, which renders
  for real users but looks blank in headless screenshots — verify in a browser).
- [ ] **Open the PR** when ready:
  https://github.com/RhythmiqCX/rhythmiq-website/pull/new/redesign/restaurant-paper

---

## 3) Optional polish (out of the agreed scope)

- [ ] **Drop legacy fonts** (Satoshi `heading`, Inter `base`, Instrument Serif
  `subheading`) for a payload/PageSpeed win. Blocked: the 41 `/tools/*` pages still
  use `font-heading` and a few legacy marketing components
  (`features.tsx`, `cta.tsx`, `pricing.tsx`, `analysis.tsx`, `lang-support.tsx`,
  `companies.tsx`, `integration.tsx` + some tool components) use `font-subheading`.
  Migrate those off the legacy fonts first, then remove from
  `src/constants/fonts.ts` + `src/app/layout.tsx` + `tailwind.config.ts`.
- [ ] **`/voice-ai` copy** still carries the older "Indian-English / Sarvam / 60+
  languages / RhythmiqCX" positioning and em dashes (it was outside the landing
  rewrite). Revise `src/app/(marketing)/voice-ai/*` (page metadata + JSON-LD +
  Hero/HowItWorks/FAQ) for full restaurant-repositioning consistency.
- [ ] **Blog body copy.** The 50 migrated posts had only colors/CTAs fixed, not the
  prose — some still has em dashes / older framing. Optional copy sweep.
- [ ] **OG image type.** `public/icons/og-default.png` renders the wordmark in a
  Helvetica fallback (the brand font Schibsted Grotesk isn't available to the SVG
  rasterizer). Refine if you want the exact brand wordmark in the social image.
  Regeneration script logic lives in the logo asset generator (re-run after any
  logo change).

---

## Key references
- Logo: `src/components/marketing/restaurant/logo.tsx` (`LogoMark` — Allura R +
  coral beat dot). Favicons: `public/icons/rhythmiq-mark-*.png`,
  `src/app/favicon.ico`. OG: `public/icons/og-default.png`. Metadata wiring:
  `src/utils/metadata.ts`, `src/app/layout.tsx`.
- New pages: `src/app/(marketing)/{pricing,integrations,demo}/`.
- Nav/CTA links: `src/constants/links.ts`. Shared blog CTA:
  `src/components/marketing/blog-cta.tsx`.
- SEO: `src/app/sitemap.ts`, `src/app/robots.ts`, image config in `next.config.ts`.

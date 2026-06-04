# Rhythmiq — Production Punch-List

Remaining work to take the paper redesign to production. Branch: `redesign/restaurant-paper`.
Status snapshot from the redesign session (all pages converted to paper; this is the polish/asset/content layer).

How the paper system works (for any conversion work below): tokens + primitives live in
[globals.css](src/styles/globals.css) `@layer components` (`.wrap .section .eyebrow
.h-display/.h-section/.h-feature .lede .btn-* .frame .ph`). Colors: `paper/paper2/paper3`,
`ink/ink2/ink3`, `coral/coral2/coralSoft`, `dark/dark2`, `onDark/onDark2`. Dark→paper remap:
`text-white→text-ink`, `text-gray-300/400→ink2`, `text-gray-500/600→ink3`,
`bg-gray-800/900 / bg-white/5 → bg-white border-ink/10`, indigo/cyan/violet/blue accents→`coral`,
primary CTA→`.btn.btn-accent`, success `#1F7A4D` / error `#C9461F`.

---

## 1) Blog post content still on the dark theme  ← biggest item
Only the blog *layout* was converted; the *content inside each post* (children passed to
`BlogLayout`) was authored for the old dark theme and breaks on paper. Affected (of 115 posts):
- [ ] **47 posts** use `text-white` headings → invisible on paper
- [ ] **47 posts** use `bg-white/5` / `border-white/10` cards → barely visible
- [ ] **41 posts** use `text-blue-400/500` links → off-brand (should be `text-coral`)
- [ ] **38 posts** have dark CTA boxes (`bg-neutral-900` / `bg-gradient-to-br from-neutral-900 to-black`) → see #2

Action: run the dark→paper remap inside the affected `src/app/(marketing)/blog/<slug>/page.tsx`
content. Best parallelized with subagents (same approach used for the 41 tool pages).
Find affected files: `grep -rliE "text-white|bg-white/5|text-blue-[45]00|from-neutral-900|bg-neutral-900" "src/app/(marketing)/blog" --include=page.tsx`

## 2) Blog bottom-CTA bug (subset of #1)
- [ ] Inline blog CTA is `bg-gradient-to-br from-neutral-900 to-black` (black box) but the paper
  `prose` wrapper forces the text inside to dark ink → **dark-on-dark, invisible** (~38 posts).
- [ ] Fix: use the tools' CTA combo (`bg-dark` + `text-onDark/onDark2` + coral `.btn-accent`).
  Recommended: extract a shared `<BlogCTA>` (or reuse [tools-cta.tsx](src/components/marketing/tools-cta.tsx))
  and swap it into the posts.

## 3) Links to tie up
**Broken anchors (page loads, but the `#` target doesn't exist):**
- [ ] Nav "Product → How it works" + footer "How it works" → `/voice-ai#how-it-works` — add
  `id="how-it-works"` to the HowItWorks section on [voice-ai/page.tsx](src/app/(marketing)/voice-ai/page.tsx) (only `hero`, `voice-demo` exist), or repoint.
- [ ] Nav "Pricing" → `/voice-ai#pricing` — no `id="pricing"` on the PricingComparison section.
  Add the id, or build a real `/pricing` page (old one was removed/redirected).
- ✅ "Product → Integrations" → `/#integrations` works (homepage has the id).

**Placeholder / verify** (in [links.ts](src/constants/links.ts) + [announcement-bar.tsx](src/components/marketing/announcement-bar.tsx)):
- [ ] Announcement bar "Read the update →" → `/blog` (point to a real launch/changelog post).
- [ ] "Log in" → `https://app.rhythmiqcx.com` — **verify** this is the real app URL.
- [ ] Generic CTAs all funnel to `/voice-ai` or Calendly ("Hear a live call", "Watch demo",
  "See how it learns", "Learn more", "Browse integrations", "Hear it for yourself"). Give them
  dedicated destinations (real demo/video, an integrations page, a signup flow vs Calendly).
- [ ] Logo-cloud restaurant names are fake ([logo-cloud.tsx](src/components/marketing/restaurant/logo-cloud.tsx)) — swap for real customer logos.

## 4) Logos & assets
- [ ] **Logo:** interim CSS `.brand-mark` (two coral bars) is the brand everywhere — used in
  [navbar.tsx](src/components/marketing/navbar.tsx), [footer.tsx](src/components/marketing/footer.tsx),
  [brand.tsx](src/components/marketing/restaurant/brand.tsx). Replace with a real designed logo/wordmark.
- [ ] **Favicon:** `/public/icons/rhythmiq-icon.png` (old brand) — referenced in
  [metadata.ts](src/utils/metadata.ts) + Organization JSON-LD in [layout.tsx](src/app/layout.tsx). New favicon set.
- [ ] **OG/social image:** `/icons/white.jpeg` (old/generic) is the default `openGraph` image on
  homepage, comparison pages, voice-ai, tools. Create a branded restaurant OG image.
- [ ] **Landing photography:** 14 `.ph` placeholder boxes need real images — dining room,
  chef plating, phone ringing, host stand, guests, night service, workspace screenshot,
  abstract line illustration, analytics dashboard, call composer screenshot, portrait,
  unified inbox screenshot, flock line illustration, illustration.
- [ ] **Cleanup:** stale `/public/icons` files (`icon-old.png`, `rhythmiq-icon-old.png`,
  `icon-dark-old.png`, `white-svg.svg`). (Blog covers + author avatars are fine.)

## 5) Misc polish
- [ ] [not-found.tsx](src/app/not-found.tsx) (404) renders on paper but its badge is a blue
  gradient (`from-sky-400 to-blue-600`) — recolor to coral.
- [ ] Final copy pass on landing section text (currently from the design handoff).
- [ ] Once no page uses them, drop legacy fonts (Satoshi `heading`, Inter `base`, Instrument
  Serif `subheading`) from [fonts.ts](src/constants/fonts.ts) + [layout.tsx](src/app/layout.tsx) to trim payload.

## Notes / gotchas
- Pages wrapping content in `Container` (framer-motion `whileInView`, content starts at
  `opacity:0`) render fine for real users but look **blank in headless screenshots** — to
  screenshot-verify, temporarily render `Container` as a plain `<div>`. Don't add a
  `useReducedMotion` guard to `Container` (hydration-mismatch risk).
- Production build needs env vars (`OPENAI_API_KEY`, `RESEND_API_KEY`, etc.) or it fails at
  page-data collection — unrelated to the redesign.
- Redirects for removed pages live in [next.config.ts](next.config.ts) (`removedPillarRedirects`). Keep them.

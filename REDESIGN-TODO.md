# Rhythmiq Redesign — Status

The whole site is now on the new **paper** design. The `.legacy-theme` scoping has
been removed — every page renders paper.

## Done ✅
- Design system + global chrome (announcement bar, navbar, footer, mobile menu).
- Homepage rebuilt to the restaurant paper design.
- Blog fully re-skinned (index, post layout, category) — all 113 posts, no per-post edits.
- Smooth scroll (Lenis); removed the auto lead-capture popup.
- **A) Comparison pages** (retell / bland / vapi / synthflow `-alternative`) → paper.
- **B) `/voice-ai`** (hero, how-it-works, pricing, FAQ, demo, CTA) → paper; removed the dead `MarketsSection`.
- **C) Legal/utility** (about-us, contact-us, privacy-policy, terms-and-conditions) → paper.
- **D) Free tools** — `/tools` hub + 41 tool pages + their components + shared `ToolsCTA` → paper.
- Removed `legacy-theme.tsx` + the `.legacy-theme` CSS block (all pages migrated).
- Removed old chatbot/widget/TTS pillars + the 6 voice-ai regional sub-pages, all **301-redirected**
  (see `removedPillarRedirects` in [next.config.ts](next.config.ts)).

Conversion method: a shared spec mapped the old dark utility classes to the paper system
(`text-white→text-ink`, `text-gray-*→ink2/ink3`, `bg-gray-*→bg-white/border-ink-10`,
indigo/cyan/violet accents→`coral`, primary CTAs→`.btn.btn-accent`, success `#1F7A4D` / error `#C9461F`,
glow blobs deleted, page headers → `.eyebrow`+`.h-section`+`.lede`). Metadata, canonicals,
JSON-LD, keywords, copy, and all tool logic/URLs were preserved throughout.

Note on verification: pages that wrap content in the `Container` scroll-reveal (framer-motion
`whileInView`) animate in for real users but don't settle in headless screenshots — verified those
by rendering `Container` as a plain div in a throwaway check; all rendered correctly in paper.

## Remaining (optional / assets — not blocking)
- Replace `.ph` placeholder boxes with real photography/illustration; add a real logo
  (interim is the CSS `.brand-mark`), restaurant OG image, and favicons.
- Once confirmed no page relies on the legacy fonts, drop Satoshi (`heading`), Inter (`base`),
  Instrument Serif (`subheading`) from [src/constants/fonts.ts](src/constants/fonts.ts) and
  [src/app/layout.tsx](src/app/layout.tsx) to trim the font payload.
- Final copy pass on section text + logo-cloud restaurant names (currently handoff placeholders).

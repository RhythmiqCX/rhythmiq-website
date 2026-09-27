# Build a demo for someone who replied

Only for a lead whose status is `replied` or `call booked` and whose "Their
problem" column isn't empty. If it's empty, stop and ask what they said.

Every problem is different, so there's no fixed demo. The job is to find the
smallest thing that shows their problem solved, then build only that.

## 0. Preflight: the website repo

Demos live on try.rhythmiqcx.com, which is the rhythmiq-website repo.

- Check you're in that repo: `package.json` has `"name": "rhythmiq-website"`,
  and `src/app/try/` and `content/try/` both exist. If not, stop and say:
  "Open the rhythmiq-website repo, or add it to this workspace, then run this
  again." Never build a demo anywhere else.
- Check you're on `staging` with `git branch --show-current`. If not, offer to
  run `git checkout staging`. Never build on `main`.

## 1. Scope it with the sender

Ask these in one plain chat message before suggesting anything:

1. What exactly did they say hurts? Anything more since then?
2. Who at their company would use this, and at what moment in their day?
3. What would make them say "oh, that's it" on the call?
4. What public material of theirs can we use? Site, services, FAQs, portfolio,
   or anything they sent us.
5. Anything to avoid? Their language, their brand, something they tried and
   hated.
6. When's the call, if it's booked?

Also reread their website yourself for content you can use.

## 2. Pitch 2 or 3 ideas, smallest first

For each idea, give:
- one line on what the prospect would see
- what's real and what's sample data
- which build level it is (below)
- rough effort: about an hour, or about half a day

Recommend one, and let the sender pick or change it.

**Build levels.** Use the lowest one that clearly shows their problem solved.

1. **Existing template.** A `/try` site made from one JSON file, via the
   `/new-prospect` skill. Takes minutes. Right when the problem is their
   website, booking flow or first impression.
2. **Custom page.** One page at `src/app/try/<slug>/page.tsx`, reusing
   `src/components/try/sections/*` where it fits. Sample data is a fixed,
   hand-written array: pick the numbers first so they tell the story, and
   never use random values. Right for showing a workflow, like a dashboard, a
   before and after, an inbox being sorted, or a quote builder.
3. **Custom page plus one server action.** Level 2 plus one server action that
   calls an LLM, copying the pattern in
   `src/actions/tools/generate-receptionist-script.ts`: a lazy Groq client and
   `rateLimit` from `@/lib/rate-limit`. Right when the key moment is the AI
   actually answering, like "ask about our services" or "paste an email, get
   the quote back".

**Too big for a demo:** login, a database, payments, connecting to their real
systems, new npm packages, background jobs, more than one page. Anything like
that is the paid project. Say so, and suggest showing a level 1 or 2 version
and pitching the rest on the call.

## 3. Build it

- **Slug:** kebab-case company name. Check nothing in `content/try/` or
  `src/app/try/` already uses it.
- **Level 1:** hand off to `/new-prospect` with the details you already have.
  Set `"unlisted": true` so it stays off the public showcase grid.
- **Level 2 or 3:**
  - Export metadata with `generateMetadata` from `@/utils`, passing
    `noIndex: true`, the same way `src/app/try/[slug]/page.tsx` does.
  - Use their public content. Label sample data clearly on the page ("Sample
    data").
  - Mobile first, with the key moment on the first screen.
  - Self-host media in `public/try/<slug>/`. Never hotlink.
  - No em dashes anywhere in the copy. Links only to our own sites and the
    booking link.
- **Level 3 server action:**
  - Put it in `src/actions/try/<slug>.ts`.
  - Rate limit it. The shared limiter allows 5 uses per visitor per day, which
    is fine for a demo.
  - If the API key is missing, return a friendly message instead of crashing.
  - Keep the prompt short and grounded in their public content.
- Run `npx --no-install tsc --noEmit` and `npx --no-install next lint`.
- Preview at `http://localhost:3010/try/<slug>` (start `npm run dev` if it's
  not running) and click through it yourself.

## 4. Look at it as the prospect

Spend 90 seconds on it cold, as that person, and ask:
- Is their problem, as they described it, visibly solved on the first screen?
- Does anything read like our internal notes, or criticise them?
- Could any sample number be mistaken for their real data?
- Any em dash, filler phrase or outside link?

Fix anything you find before handing over.

## 5. Hand over

**Commit** on `staging` only: `feat(try): demo for <Company> (<slug>)`, with the
standard Co-Authored-By trailer. Don't push until the sender says so.
Publishing means pushing staging, then merging staging into main
(production). Ask before each step, and remind them the link only works once
main has deployed.

**Give the sender three things:**
- The link: `https://try.rhythmiqcx.com/<slug>`
- A script for a Loom they record themselves, 60 to 90 seconds in their own
  voice. Only describe what's actually on screen:
  1. "You mentioned X" (about 10 seconds)
  2. Show the one moment that fixes it (about 40 seconds)
  3. What the real version would take, in one sentence (about 15 seconds)
  4. Ask for the call (about 10 seconds)
- The message to send with it: 70 words max, tagged `[demo]`, run through
  `scripts/check-copy.mjs`.

**Update the tracker:** Demo link, and Next message set to that message. The
sender sets `demo sent` once they've sent it.

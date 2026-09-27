---
name: linkedin-outreach
description: >
  Rhythmiq Dev's LinkedIn outreach helper for ray (Dubai) and money
  (Hungary). Turns a Sales Navigator lead list copied to the clipboard into
  ready-to-paste connection notes. Researches and drafts the first message for
  people who accept, drafts follow-ups, helps answer replies and records the
  prospect's problem. Scopes then builds a small demo on try.rhythmiqcx.com for
  someone who replied. Keeps the shared Google Sheet tracker up to date. Use
  when someone says "copied", "here are some leads", "draft connection notes",
  "they accepted", "who needs a follow-up", "they replied", "build a demo for
  <lead>", or "set up my sender profile". Never sends anything and never
  touches linkedin.com.
---

# LinkedIn outreach (Rhythmiq Dev)

Two senders reach out to small companies and agencies on LinkedIn: ray covers
Dubai, money covers Hungary. The goal of every message is a booked call.
Claude researches, drafts, keeps the tracker, and builds a demo only once
someone has replied. A person sends every message by hand.

## Start every run with two questions

Ask both in one AskUserQuestion popup, unless the user's message already
answers them:

1. **Who's running this?** One option per file in `senders/` (skip
   `_template.md`), plus "New sender". Load that sender's file. If it's a new
   sender, or their Voice section still says "Pending", run
   `modes/setup-sender.md` before anything else.
2. **What do you want to do?**
   - Draft connection notes for a batch of leads → `modes/draft-openers.md`
   - Accepted and follow-ups: first messages for people who accepted, plus who's due → `modes/follow-ups.md`
   - Someone replied → `modes/handle-reply.md`
   - Build a demo for someone who replied → `modes/build-demo.md`

   Setting up or editing a sender profile comes in through "Other" →
   `modes/setup-sender.md`.

Read only the mode file you need. Every mode also uses the sender file,
`local.md`, `company.md`, `writing-rules.md` and `tracker.md`. The accepted and reply modes also
use `tracks.md`.

## Rules for every mode

1. **Claude never sends anything.** No LinkedIn messages, connection requests,
   emails or form submissions. The output is drafts in chat plus rows in the
   tracker. The sender copies and sends.
2. **Don't touch linkedin.com.** No Playwright, no browser automation, no
   fetching LinkedIn pages. LinkedIn restricts accounts that get automated, and
   the Sales Navigator seat is paid for. Lead details come from what the sender
   pastes. Everything else comes from the open web: company site, careers page,
   job boards, Google reviews, news.
3. **Only mention what you actually saw.** Every hook in a message points to
   something real: a page, a job post, a review, a post the sender pasted. If
   research finds nothing specific, write a lighter note and say so. Never
   invent a problem, a number or a compliment.
4. **No demo before a reply.** First messages ask about their problem. A demo
   is built only for someone who replied, around what they said in their own
   words.
5. **Internal notes stay internal.** The tracker's Hook and Notes columns are
   for us. A message never tells a prospect what's wrong with their business
   ("your site is slow", "you look understaffed"). Ask about it instead.
6. **Cheap by default.** No subagents and no parallel agents. Connection notes
   need no research at all. Research happens only for people who accept, with
   at most three web lookups each. If something needs more, ask first.
7. **Writing rules aren't optional.** Every draft passes `writing-rules.md` and
   `scripts/check-copy.mjs` before the sender sees it.

## Files

- `company.md`: who Rhythmiq Dev is, what we build, proof, allowed links
- `local.md`: sheet link, pricing and personal notes. It's gitignored because the repo is public, so never copy its contents into any other file. New machine: copy `local.example.md` and ask ray for the values.
- `senders/<name>.md`: each sender's market, language, niches, voice and real sample messages
- `senders/_template.md`: blank profile for a new sender
- `tracks.md`: the two kinds of prospect (small companies, agencies) and what to look for
- `writing-rules.md` + `banned-phrases.txt`: how messages must read
- `tracker.md`: the Google Sheet tab, its columns and statuses, how to read and write it
- `modes/*.md`: one file per job
- `scripts/check-copy.mjs`: flags dashes, banned phrases, links and over-long drafts
- `scripts/read-salesnav.mjs`: reads a Sales Navigator list copied to the clipboard, links included

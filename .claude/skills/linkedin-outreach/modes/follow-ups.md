# Follow-ups

## 1. Catch up first

Read the sender's rows in the tracker. Ask: "Anything new since last time? Who
accepted, who replied?" Update the rows from their answer. Anyone who replied
goes to `handle-reply.md`, not here.

## 2. Work out who's due

| Current status | Due when | Action |
|---|---|---|
| `connected` | now | If Next message is empty, research them and draft the first message (step 3a). Otherwise remind them to send it. |
| `messaged` | 4+ days since Last touch | Draft follow-up 1 |
| `follow-up 1` | 7+ days since Last touch | Draft follow-up 2 |
| `follow-up 2` | 10+ days since Last touch | Set to `no reply`. Nothing more is sent. |
| `later` | Next step date reached | Draft a light check-in |
| `request sent` | 14+ days, not accepted | Mention it. The sender can withdraw the request or leave it. |

## 3a. They accepted: research and draft the first message

This is where research happens, and only for people who accepted.

- **Research:** three lookups at most. If the website isn't known, search for
  `<company> <city>`. Read the homepage plus one of services, careers or about.
  Use `tracks.md` for what to look for. Never open linkedin.com.
- **Hook:** write down one specific thing you actually saw, plus its URL, and
  an internal guess at the problem. Both go in the tracker's Hook column.
- **First message** (70 words max), in the sender's voice:
  - "thanks for connecting"
  - the hook
  - one plain line on what you build that fits it
  - one easy question about how they handle that today
  - No link, no price, no call ask yet.
- If research finds nothing specific, write a simple version around their role
  and flag it.

## 3b. Follow-ups (50 words max each)

Each follow-up adds something new. Pick one of these:
- a short, useful thought about their niche
- a small relevant example of our work: a try.rhythmiqcx.com or
  dev.rhythmiqcx.com link is fine from follow-up 1 on
- an easy yes or no question

Never "just following up", never guilt, never repeat the first message.

Follow-up 2 is the last. Make it easy to say no, something like "if it's not a
priority right now, all good, I'll leave it here", in the sender's own words.

## 4. Check, show, save

1. Run `scripts/check-copy.mjs` on the drafts.
2. Show them grouped by action.
3. For each row, put the draft in Next message and set the Next step date.
   Don't change the status until the sender confirms they sent it.

# Writing rules

Messages must read like the sender typed them on their phone. If it sounds
like a tool wrote it, it's wrong, however polished it is.

## Voice

- Follow the sender file first: their greeting, sign-off, sentence length,
  punctuation habits, emoji or none. Their real sample messages beat anything
  in this file.
- Write like a text to a peer. Short sentences, contractions, plain words.
- One idea per message, and at most one question.
- A real detail from their site beats any compliment.
- Talk about the result in their terms (quotes out the same day, no missed
  calls after 6pm), not about the tech. Don't open with "AI".

## Never

- Em dashes (—) or en dashes (–). A spaced hyphen used as a dash ( - ) counts
  too. Use a comma or a full stop, or rewrite the sentence.
- Anything in `banned-phrases.txt`.
- The tells that give away generated copy:
  - "it's not just X, it's Y"
  - lists of three
  - restating the benefit in a trailing clause
  - neat, balanced sentence pairs
  - opening with praise
  - semicolons
  - more than one exclamation mark
- Telling them what's wrong with their business. Ask about it instead.
- A price, a deck or any link in the connection note or first message.
- Links other than the ones in `company.md`.
- Made-up familiarity, like "loved your recent post" when you haven't seen one.

## Lengths

| Message | Limit |
|---|---|
| Connection note | 250 characters (LinkedIn allows 300, stay well under) |
| First message after they accept | 70 words |
| InMail | subject of 6 words or fewer, body of 90 words |
| Follow-up | 50 words |
| Reply to their reply | 90 words |
| Message sent with a demo | 70 words |

## Check before showing any draft

1. Put every draft in a scratch file, one per block, with blocks separated by a
   line that is just `---`. Start each block with a tag line:
   `[note] Name, Company`, `[dm]`, `[inmail]`, `[followup]`, `[reply]` or
   `[demo]`. For an InMail, the next line is `Subject: ...`.
2. Run `node .claude/skills/linkedin-outreach/scripts/check-copy.mjs <file>`
   and fix everything it flags.
3. Reread each draft once and ask: would this sender actually type this? Cut
   any line that sounds like a brochure.

# Someone replied

1. Ask the sender to paste the reply, and the whole thread if there's been
   more than one message.
2. Find their tracker row and read what we already sent.
3. Work out what kind of reply it is, and draft the answer (90 words max, in
   the sender's voice):

| They... | Draft |
|---|---|
| describe a problem or sound interested | Put what they said in your own words, ask one question that shows you get it, and offer a 20 to 30 minute call with the booking link. If the problem is concrete and small enough for a demo (see `build-demo.md`), you can add an offer to mock up a quick example before the call. |
| ask what we do, or the price | A short, plain answer. No price in writing unless the sender says so. Offer the call. |
| say not now | A friendly close. Status `later`, Next step about 60 days out. |
| say not interested, or wrong person | Thank them. Ask who'd be better only if it's natural. Status `lost`. |

4. Put their problem, in their own words, in the "Their problem" column. Keep
   it to the real quote or a close paraphrase. `build-demo.md` reads this, so
   it matters more than anything else in the row.
5. Run `scripts/check-copy.mjs`, show the draft, then update the row:
   - Status: `replied` (or `later` / `lost`)
   - Last touch: today
   - Next message: the draft
6. When the sender says they booked a call, set the status to `call booked`.
   If a demo would help on that call, suggest `build-demo.md`.

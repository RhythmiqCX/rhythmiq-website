# Set up a sender

Run this for a new sender, when a sender's Voice section is still pending, or
when someone asks to edit their profile. It's the only way the messages end up
sounding like that person, so don't skip it or rush it.

## 1. The basics

For a new sender, copy `senders/_template.md` to
`senders/<first-name-lowercase>.md`. Otherwise open their existing file.

Ask for the profile fields in one plain chat message, not a popup: market,
language(s), current niches, booking link, the team line, where they're based
and whether to mention it, and what they say they do in one line.

## 2. The voice interview

Ask these in one plain chat message. They're open questions, so let them
answer in their own words. The first one matters most.

1. Paste 3 to 5 messages you've actually sent: to a client, a colleague, or a
   friend about work. WhatsApp, Slack, email, LinkedIn, anything. Unedited,
   typos and all.
2. When someone asks what you do, what do you say, word for word?
3. Why are you doing this? The version you'd tell a friend, not a pitch.
4. A cold message you got and hated, and one you actually answered, if you
   remember any. What was the difference?
5. Hi, Hey, or just their name? How do you sign off? Emojis? Exclamation marks?
6. Words or phrases that make you cringe, or that you'd never say?
7. What have you built that you're proud of and happy to bring up?
8. How formal are people in your market? What would feel too stiff, and what
   would feel too casual?

## 3. Write it down, then test it

1. Write the Voice section as concrete rules taken from their answers and
   messages: greeting, sign-off, sentence length, punctuation, emoji use,
   words they use, words to avoid. Paste their real messages under "Real
   messages from this sender".
2. Draft the three connection note templates: owner or founder, other roles,
   and no company listed. See `senders/ray.md` for the shape: a short hello
   with name and company, one plain line about who they are, no selling, and
   their sign-off. Also draft one first message for a made-up lead in their
   market. Run everything through `scripts/check-copy.mjs`.
3. Ask: "Does this sound like you? What would you change?" Fold their edits
   into the Voice rules. Do one more round if needed.
4. Save the approved drafts under "Drafts they approved".

Save the file. Don't commit unless they ask.

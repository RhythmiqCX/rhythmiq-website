# Draft connection notes for a batch

Connection notes stay simple: name and company from the list, no research.
Research only pays off for people who accept, so it happens later, in
`follow-ups.md`.

## 1. Get the batch

The easiest way, which keeps the profile links:
1. The sender opens their lead list in Sales Navigator in Chrome, drag-selects
   the table, and presses Cmd+C.
2. Run `node .claude/skills/linkedin-outreach/scripts/read-salesnav.mjs --out <scratch>/leads.json`.
   It reads the clipboard and prints one line per lead, with profile links.

If that fails, ask them to paste leads one per line:
`Name | Title | Company | LinkedIn URL`.

Ask once for the whole batch: which niche it is (a short label for the
tracker).

## 2. Filter

- **Duplicates:** check the tracker for anyone already there by LinkedIn URL,
  from either sender. Drop them and say who has them.
- **Not a buyer:** drop government employees, junior staff, and people at
  companies that are clearly large. Say who you dropped and why, in one line
  each.
- Keep the batch at 25 or fewer.

## 3. Draft the notes

Use the connection-note templates in the sender's file. A connection note
never says what we sell. Anything like "I build tools for..." reads as a pitch
before they've even accepted.

Clean up company names so they read naturally: drop LLC, FZE, FZCO or FZ-LLC,
and use normal capitalisation. Flag any first name you're unsure of. A
common case is a name starting with Muhammad, Mohammad or Syed, where the
person may go by the next name.

If the sender asks for custom notes for a specific lead, research that one lead
(three lookups at most) and write a note with a real hook.

Run all notes through `scripts/check-copy.mjs`.

## 4. Show and save

The sender just copies and pastes, so format for that. For each lead, a bold
label line followed by the note in its own `text` code block, so the copy
button takes the whole note, sign-off included:

````
**1. Luke Stevenson, AirCo**
```text
Hey Luke, saw you're running AirCo. I'm a founder too, working in tech, mostly AI. Happy to connect!
-Rythm
```
````

- Number them 1 to N in the order you show them.
- Put anything to check in brackets on the label line, like
  `(check he goes by Parvez)`.
- Before the list, add one line on who you dropped and why. Nothing else.
- Add a tracker row per lead:
  - Status: `drafted`
  - Hook: "Not researched yet"
  - Next message: empty
- Tell the sender to update statuses as they send, or to tell you ("sent all
  except 5"). Stop there.

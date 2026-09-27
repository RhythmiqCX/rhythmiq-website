# Tracker

One Google Sheet tab, shared by both senders. It's the single record of who
we've contacted and where each conversation stands.

- **Sheet:** the link is in `local.md`, which isn't committed because the repo
  is public. It's the same sheet the Maps scraper fills. If `local.md` is
  missing, ask the sender for the link and create it from `local.example.md`.
- **Tab:** `LinkedIn`. Never edit the `Leads` or `Restaurants` tabs. Those belong
  to the scraper.
- One row per person. The LinkedIn URL is the unique key.

## Columns, in this order

| Column | What goes in it |
|---|---|
| Added | date the row was created, YYYY-MM-DD |
| Sender | whose lead this is (sender file name) |
| Track | A (small company) or B (agency) |
| Niche | the niche the sender picked for this batch |
| Name | |
| Title | |
| Company | |
| LinkedIn URL | unique key |
| Website | |
| Hook | internal: what we noticed, plus the source URL |
| Status | see below |
| Last touch | date of the last message sent, YYYY-MM-DD |
| Next step | date the next action is due, YYYY-MM-DD |
| Next message | the ready-to-send text for whatever comes next |
| Their problem | what they told us, in their own words |
| Demo link | try.rhythmiqcx.com link, once built |
| Notes | anything else, internal |

## Statuses

`drafted` → `request sent` → `connected` → `messaged` → `follow-up 1` →
`follow-up 2` → `replied` → `call booked` → `demo sent` → `won` / `lost` /
`no reply` / `later`

- Claude sets `drafted` when it adds a row. After that, the sender either
  updates the sheet directly or tells Claude ("sent 1 to 12", "Ahmed
  accepted") and Claude updates it.
- `no reply`: no answer after follow-up 2. This skill never messages them again.
- `later`: they said not now. Set Next step about 60 days out.

## Reading and writing

Use the Google Drive connector. Load the `google-workspace` skill before the
first write in a run. If the `LinkedIn` tab doesn't exist yet, ask, then create
it with the header row above.

If the connector isn't available (not authorized, or it errors), don't stop.
- **To read:** ask the sender to paste the rows you need, or a CSV export of the tab.
- **To write:** save the new or changed rows as a CSV (header row first) to
  `~/Downloads/linkedin-tracker-<sender>-<date>.csv`. They import it with
  File → Import → Upload → "Append to current sheet". Don't paste
  tab-separated text instead: messages run over several lines, and a paste
  splits them into separate rows.
- Either way, say plainly that the sheet was not updated.

Before adding rows, check the LinkedIn URL column for anyone already there,
from either sender. Skip duplicates and say who already has them and at what
status.

## Privacy

Store business details only: name, title, company, public URLs, and what they
told us. No personal phone numbers or emails unless they gave them to us. If
someone asks to be removed, delete their row. Hungary is in the EU, so this
matters under GDPR.

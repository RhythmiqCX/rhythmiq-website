#!/usr/bin/env node
// Checks a drafts file against writing-rules.md before a sender sees it.
//
// Drafts file format: blocks separated by a line that is just `---`. Each block
// starts with a tag line like `[note] Ahmed, Acme` / `[dm]` / `[inmail]` /
// `[followup]` / `[reply]` / `[demo]`. For an inmail, the next line is
// `Subject: ...`.
//
// Usage: node check-copy.mjs drafts.txt
// Exit 0 when every block passes, 1 when anything needs fixing.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const banned = readFileSync(join(here, "..", "banned-phrases.txt"), "utf8")
  .split("\n")
  .map((l) => l.trim().toLowerCase())
  .filter(Boolean);

// Limits per message type: chars for connection notes, words for the rest.
const LIMITS = {
  note: { chars: 250 },
  dm: { words: 70 },
  inmail: { words: 90 },
  followup: { words: 50 },
  reply: { words: 90 },
  demo: { words: 70 },
};
const NO_LINKS = new Set(["note", "dm", "inmail"]);
const ALLOWED_HOSTS = [
  "rhythmiqcx.com",
  "dev.rhythmiqcx.com",
  "try.rhythmiqcx.com",
  "www.rhythmiqcx.com",
  "calendly.com",
];

const file = process.argv[2];
if (!file) {
  console.error("Usage: node check-copy.mjs <drafts-file>");
  process.exit(2);
}

const blocks = readFileSync(file, "utf8")
  .split(/^---\s*$/m)
  .map((b) => b.trim())
  .filter(Boolean);

let failed = false;

for (const block of blocks) {
  const lines = block.split("\n");
  const tagMatch = lines[0].match(/^\[(\w+)\]\s*(.*)$/);
  const problems = [];
  if (!tagMatch || !LIMITS[tagMatch[1]]) {
    console.log(`FIX  (untagged block) "${lines[0].slice(0, 40)}": first line must be a tag like [note] or [dm]`);
    failed = true;
    continue;
  }
  const [, type, label] = tagMatch;
  let bodyLines = lines.slice(1);

  if (type === "inmail") {
    const subject = bodyLines[0]?.match(/^Subject:\s*(.*)$/i);
    if (!subject) problems.push("inmail needs a `Subject:` line after the tag");
    else {
      const subjectWords = subject[1].trim().split(/\s+/).filter(Boolean).length;
      if (subjectWords > 6) problems.push(`subject is ${subjectWords} words (max 6)`);
      bodyLines = bodyLines.slice(1);
    }
  }

  const body = bodyLines.join("\n").trim();
  const lower = body.toLowerCase();
  const chars = body.length;
  const words = body.split(/\s+/).filter(Boolean).length;
  const limit = LIMITS[type];

  if (limit.chars && chars > limit.chars) problems.push(`${chars} characters (max ${limit.chars})`);
  if (limit.words && words > limit.words) problems.push(`${words} words (max ${limit.words})`);
  if (/[—–]/.test(body)) problems.push("contains an em or en dash");
  if (/\s-\s/.test(body)) problems.push("spaced hyphen used as a dash");
  if (body.includes(";")) problems.push("semicolon");
  if ((body.match(/!/g) || []).length > 1) problems.push("more than one exclamation mark");

  for (const phrase of banned) {
    if (lower.includes(phrase)) problems.push(`banned phrase "${phrase}"`);
  }

  const urls = (body.match(/https?:\/\/[^\s)]+|(?:www\.)?[a-z0-9-]+\.(?:com|io|co|ai|net|org|hu|ae)\b\S*/gi) || [])
    .map((u) => u.replace(/[.,;:!?]+$/, ""));
  if (urls.length && NO_LINKS.has(type)) problems.push(`no links allowed in a ${type} (found ${urls[0]})`);
  for (const u of urls) {
    const host = u.replace(/^https?:\/\//i, "").split(/[/?#]/)[0].toLowerCase();
    if (!ALLOWED_HOSTS.includes(host)) problems.push(`link not on our own sites: ${u}`);
  }

  const name = `[${type}] ${label}`.trim();
  if (problems.length) {
    failed = true;
    console.log(`FIX  ${name}: ${problems.join("; ")}`);
  } else {
    console.log(`OK   ${name} (${type === "note" ? `${chars} chars` : `${words} words`})`);
  }
}

process.exit(failed ? 1 : 0);

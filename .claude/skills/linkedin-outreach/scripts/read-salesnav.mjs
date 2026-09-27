#!/usr/bin/env node
// Reads a Sales Navigator lead list that the sender copied (Cmd+C) in Chrome,
// keeping the profile and company links that a plain-text paste loses.
//
// Usage:
//   node read-salesnav.mjs                 read the clipboard (macOS)
//   node read-salesnav.mjs --file x.html   read a saved HTML copy instead
//   add --out leads.json to also write the rows as JSON
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

let html;
if (opt("--file")) {
  html = readFileSync(opt("--file"), "utf8");
} else {
  let raw = "";
  try {
    raw = execSync(`osascript -e 'the clipboard as «class HTML»'`, { maxBuffer: 64 * 1024 * 1024 }).toString();
  } catch {
    // no HTML flavour on the clipboard, handled below
  }
  const hex = raw.match(/«data HTML([0-9A-Fa-f]+)»/);
  if (!hex) {
    console.error("No HTML on the clipboard. Select the lead table in Sales Navigator (Chrome), press Cmd+C, and run this again.");
    process.exit(1);
  }
  html = Buffer.from(hex[1], "hex").toString("utf8");
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

// Walk the markup and collect every text node with the link it sits inside.
const events = [];
const stack = [];
const token = /<a\b[^>]*?href="([^"]*)"[^>]*>|<\/a\s*>|<(script|style)\b[\s\S]*?<\/\2>|<[^>]+>|([^<]+)/gi;
let m;
while ((m = token.exec(html))) {
  if (m[1] !== undefined) stack.push(decode(m[1]));
  else if (/^<\/a/i.test(m[0])) stack.pop();
  else if (m[3] !== undefined) {
    const text = decode(m[3]).trim();
    if (text) events.push({ text, href: stack[stack.length - 1] || "" });
  }
}

// Each lead row starts with its checkbox label, "Select <Name>".
const rows = [];
let cur = null;
for (const { text, href } of events) {
  if (text.startsWith("Select ") && !text.includes("profile picture")) {
    cur = { texts: [], lead: "", companyUrl: "", companyName: "" };
    rows.push(cur);
    continue;
  }
  if (!cur) continue;
  cur.texts.push(text);
  if (href.includes("/sales/lead/") && !cur.lead) cur.lead = href.split("?")[0];
  if (href.includes("/sales/company/") && !cur.companyUrl) {
    cur.companyUrl = href.split("?")[0];
    cur.companyName = text;
  }
}

const NOISE = /^(\d+ Lists?|Saved Badge|Add note|\(\+\d+\)|Add Account|Open the account matching modal.*|.*connection|.*profile picture)$/i;
const leads = rows.map((r) => {
  const t = r.texts;
  const name = t[0] || "";
  const degIdx = t.findIndex((x) => /^(1st|2nd|3rd)$/.test(x));
  const rest = t.slice(degIdx >= 0 ? degIdx + 1 : 1).filter((x) => !NOISE.test(x) && x !== name);
  const title = rest[0] || "";
  const noAccount = t.includes("Add Account");
  const company = r.companyName || "";
  const afterCompany = rest.slice(company ? rest.indexOf(company) + 1 : 1);
  const date = t.find((x) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(x)) || "";
  const activity = t.find((x) => /activity|^Messaged|^Sent|^Replied|^Viewed/i.test(x)) || "";
  const geo = afterCompany.find((x) => x !== activity && x !== date) || "";
  return {
    name,
    title,
    company: noAccount ? "" : company,
    geography: geo,
    degree: degIdx >= 0 ? t[degIdx] : "",
    activity,
    dateAdded: date,
    leadUrl: r.lead,
    companyUrl: r.companyUrl,
  };
});

if (opt("--out")) writeFileSync(opt("--out"), JSON.stringify(leads, null, 1));
leads.forEach((l, i) =>
  console.log(
    `${String(i + 1).padStart(2)}. ${l.name} | ${l.title} | ${l.company || "(no company)"} | ${l.geography} | ${l.degree} | ${l.activity} | link:${l.leadUrl ? "Y" : "N"}`,
  ),
);
console.log(`${leads.length} leads, ${leads.filter((l) => l.leadUrl).length} with profile links`);

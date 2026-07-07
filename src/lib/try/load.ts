import fs from "node:fs";
import path from "node:path";
import { prospectSchema, type Prospect } from "./schema";
import { getVerticalMeta, type ServiceSeed } from "./catalog";

const DIR = path.join(process.cwd(), "content", "try");

/**
 * Every slug that has a committed data file. Files prefixed with `_` (e.g. an
 * `_example.json`) are ignored so we can keep templates/fixtures alongside real
 * prospects without publishing them.
 */
export function listSlugs(): string[] {
  try {
    if (!fs.existsSync(DIR)) return [];
    return fs
      .readdirSync(DIR)
      .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
      .map((f) => f.replace(/\.json$/, ""));
  } catch {
    return [];
  }
}

/**
 * Load + validate a single prospect. Returns null (→ 404) for anything wrong:
 * missing file, invalid JSON, schema violation, slug mismatch, or archived
 * status. Crucially this NEVER throws, so one bad prototype cannot break the
 * whole static build.
 */
export function loadProspect(slug: string): Prospect | null {
  try {
    const raw = fs.readFileSync(path.join(DIR, `${slug}.json`), "utf8");
    const data = prospectSchema.parse(JSON.parse(raw));
    if (data.slug !== slug) return null;
    return data.status === "archived" ? null : data;
  } catch {
    return null;
  }
}

export function listLiveProspects(): Prospect[] {
  return listSlugs()
    .map(loadProspect)
    .filter((p): p is Prospect => p !== null);
}

/** Services to render — the prospect's own, or the vertical's sensible defaults. */
export function resolveServices(data: Prospect): ReadonlyArray<ServiceSeed> {
  return data.services.length ? data.services : getVerticalMeta(data.vertical).defaultServices;
}

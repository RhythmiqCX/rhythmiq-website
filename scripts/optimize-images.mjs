// One-shot (and re-runnable) raster image optimizer for /public/images.
//
// Why: blog hero/source images shipped at 4000px+ and 10–17MB each, even though
// they render at <=880px. next/image still transforms them on demand, but the
// huge sources bloat the deploy and make the optimizer slow/expensive on cold hits.
// This downsizes the *source* in place to a sane max width + modern quality,
// preserving the original file path/format so every `/images/...` reference and
// OG/social/LLM crawler URL keeps working.
//
// Usage:  node scripts/optimize-images.mjs           (optimize)
//         node scripts/optimize-images.mjs --dry-run (report only)
//
// Safe to re-run: files already <= MAX_WIDTH and under MIN_BYTES are skipped.

import sharp from "sharp";
import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "images");
const MAX_WIDTH = 1600; // widest these are ever displayed is ~880px; 1600 covers 2x DPR
const JPEG_QUALITY = 80;
const MIN_BYTES = 350 * 1024; // leave already-small files (icons, hero webp, etc.) alone
const DRY_RUN = process.argv.includes("--dry-run");
const EXTS = new Set([".jpg", ".jpeg", ".png"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function fmt(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (!EXTS.has(ext)) continue;

  const { size: beforeBytes } = await stat(file);
  if (beforeBytes < MIN_BYTES) {
    skipped++;
    continue;
  }

  const img = sharp(file, { failOn: "none" });
  const meta = await img.metadata();
  const needsResize = (meta.width ?? 0) > MAX_WIDTH;

  let pipeline = img.rotate(); // respect EXIF orientation before stripping it
  if (needsResize) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 90 });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const tmp = file + ".tmp";
  const buf = await pipeline.toBuffer();

  // Only replace if we actually saved space; never make a file bigger.
  if (buf.length >= beforeBytes) {
    totalBefore += beforeBytes;
    totalAfter += beforeBytes;
    skipped++;
    continue;
  }

  totalBefore += beforeBytes;
  totalAfter += buf.length;
  processed++;

  const rel = path.relative(process.cwd(), file);
  console.log(`${DRY_RUN ? "[dry] " : ""}${rel}  ${fmt(beforeBytes)} -> ${fmt(buf.length)}`);

  if (!DRY_RUN) {
    const { writeFile } = await import("node:fs/promises");
    await writeFile(tmp, buf);
    await rename(tmp, file).catch(async (e) => {
      await unlink(tmp).catch(() => {});
      throw e;
    });
  }
}

console.log("\n────────────────────────────────────────");
console.log(`Processed: ${processed} files   Skipped (already small): ${skipped}`);
console.log(`Total: ${fmt(totalBefore)} -> ${fmt(totalAfter)}  (saved ${fmt(totalBefore - totalAfter)})`);

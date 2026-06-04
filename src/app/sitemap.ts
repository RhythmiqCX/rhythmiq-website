import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const SITE_URL = process.env.SITE_URL || "https://rhythmiqcx.com";

// Route group on disk; the "(marketing)" segment is NOT part of the public URL.
const MARKETING_DIR = path.join(process.cwd(), "src", "app", "(marketing)");

// Return the names of immediate sub-directories that are real routes
// (i.e. contain a page.tsx). Skips co-located component files like
// blog/BlogListSection.tsx and any non-route folders.
function routeSlugs(dir: string): string[] {
    try {
        return fs
            .readdirSync(dir, { withFileTypes: true })
            .filter((e) => e.isDirectory())
            .filter((e) => fs.existsSync(path.join(dir, e.name, "page.tsx")))
            .map((e) => e.name);
    } catch {
        return [];
    }
}

function lastModified(dir: string, slug: string): Date {
    try {
        return fs.statSync(path.join(dir, slug, "page.tsx")).mtime;
    } catch {
        return new Date();
    }
}

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Top-level, hand-curated routes with intentional priorities.
    const core: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
        { url: `${SITE_URL}/voice-ai`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${SITE_URL}/integrations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/demo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
        { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${SITE_URL}/retell-ai-alternative`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/bland-ai-alternative`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/vapi-alternative`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/synthflow-alternative`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${SITE_URL}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
        { url: `${SITE_URL}/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ];

    const blogDir = path.join(MARKETING_DIR, "blog");
    const blog: MetadataRoute.Sitemap = routeSlugs(blogDir).map((slug) => ({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: lastModified(blogDir, slug),
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    const toolsDir = path.join(MARKETING_DIR, "tools");
    const tools: MetadataRoute.Sitemap = routeSlugs(toolsDir).map((slug) => ({
        url: `${SITE_URL}/tools/${slug}`,
        lastModified: lastModified(toolsDir, slug),
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...core, ...blog, ...tools];
}

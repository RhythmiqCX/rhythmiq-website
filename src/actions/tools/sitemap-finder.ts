"use server";

export interface SitemapResult {
    url: string;
    status: number;
    urlCount: number;
    valid: boolean;
    type: "urlset" | "sitemapindex" | "unknown" | "error";
    error?: string;
    missingLastMod?: number;
}

export interface SitemapFinderResult {
    sitemaps: SitemapResult[];
    summary: {
        totalSitemaps: number;
        totalUrls: number;
        brokenSitemaps: number;
        totalMissingLastMod: number;
    };
    error?: string;
}

async function fetchSitemapDetails(url: string): Promise<SitemapResult> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; SitemapFinderBot/1.0; +https://rhythmiqcx.com)",
                "Accept": "application/xml, text/xml, */*",
            },
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const status = response.status;

        if (!response.ok) {
            return {
                url,
                status,
                urlCount: 0,
                valid: false,
                type: "error",
                error: `HTTP Error: ${status}`
            };
        }

        const content = await response.text();

        // Very Basic XML Parsing (to avoid heavy deps just for counting)
        // In a real prod app, use a proper parser. Here we use regex for speed/simplicity in serverless environment
        // or string matching.

        let type: SitemapResult["type"] = "unknown";
        let urlCount = 0;
        let missingLastMod = 0;

        if (content.includes("<urlset")) {
            type = "urlset";
            const matches = content.match(/<loc>/g);
            urlCount = matches ? matches.length : 0;

            // Check lastmod
            // Count <url> blocks
            const urlBlocks = content.match(/<url>[\s\S]*?<\/url>/g) || [];
            urlBlocks.forEach(block => {
                if (!block.includes("<lastmod>")) missingLastMod++;
            });

        } else if (content.includes("<sitemapindex")) {
            type = "sitemapindex";
            const matches = content.match(/<loc>/g); // These are child sitemaps
            urlCount = matches ? matches.length : 0;
            // Technically these are child sitemaps, but user asked for "URL Count"
        } else {
            return {
                url,
                status,
                urlCount: 0,
                valid: false,
                type: "unknown",
                error: "Invalid XML or missing root element"
            };
        }

        return {
            url,
            status,
            urlCount,
            valid: true,
            type,
            missingLastMod
        };

    } catch (error: any) {
        return {
            url,
            status: 0,
            urlCount: 0,
            valid: false,
            type: "error",
            error: error.message || "Failed to fetch"
        };
    }
}

export async function findSitemapsAction(domainUrl: string): Promise<SitemapFinderResult> {
    if (!domainUrl) return { sitemaps: [], summary: { totalSitemaps: 0, totalUrls: 0, brokenSitemaps: 0, totalMissingLastMod: 0 }, error: "Domain URL is required" };

    let normalizeUrl = domainUrl;
    if (!/^https?:\/\//i.test(normalizeUrl)) {
        normalizeUrl = "https://" + normalizeUrl;
    }

    // Remove trailing slash
    normalizeUrl = normalizeUrl.replace(/\/$/, "");

    const potentialSitemaps = new Set<string>();

    // 1. Check robots.txt
    try {
        const robotsUrl = `${normalizeUrl}/robots.txt`;
        const response = await fetch(robotsUrl, {
            method: "GET",
            headers: { "User-Agent": "Mozilla/5.0 (compatible; SitemapFinderBot/1.0; +https://rhythmiqcx.com)" }
        });

        if (response.ok) {
            const text = await response.text();
            const lines = text.split('\n');
            for (const line of lines) {
                if (line.trim().toLowerCase().startsWith("sitemap:")) {
                    const parts = line.split(/:\s+/);
                    if (parts.length > 1) {
                        potentialSitemaps.add(parts[1].trim());
                    }
                }
            }
        }
    } catch (e) {
        console.error("Error fetching robots.txt", e);
    }

    // 2. Add common paths if robots.txt didn't yield any (or add anyway)
    // Often sitemaps declared in robots.txt are the same as default ones
    potentialSitemaps.add(`${normalizeUrl}/sitemap.xml`);
    potentialSitemaps.add(`${normalizeUrl}/sitemap_index.xml`);
    potentialSitemaps.add(`${normalizeUrl}/wp-sitemap.xml`); // WordPress 5.5+ default

    const uniqueSitemapUrls = Array.from(potentialSitemaps);
    const results: SitemapResult[] = [];

    // Parallel fetch (limited batch size ideally, but for this tool assume small count)
    // We only check the top-level sitemaps found. We don't recursively check child sitemaps in THIS tool version 
    // unless we want to explode complexity. The user example shows "/blog-sitemap.xml" which implies 
    // either recursive checking or finding them in sitemap_index.
    // Let's implement 1-level depth if it's a sitemap index.

    const topLevelChecks = await Promise.all(uniqueSitemapUrls.map(url => fetchSitemapDetails(url)));

    // Filter valid ones
    const validTopLevel = topLevelChecks.filter(r => r.valid && r.status === 200);

    // If we found a valid sitemap index, fetch its children?
    // The user prompt example output shows "/sitemap.xml", "/blog-sitemap.xml", "/product-sitemap.xml".
    // This usually happens when /sitemap.xml IS an index, and it points to the others.
    // So we should try to expand IF it's a sitemap index.

    const finalResults: SitemapResult[] = [];
    const processedUrls = new Set<string>();

    for (const r of topLevelChecks) {
        if (processedUrls.has(r.url)) continue;
        processedUrls.add(r.url);

        if (r.type === 'sitemapindex' && r.valid) {
            // We found an index. It's good to list the index itself, AND maybe its children?
            // But actually, usually you either listing the index OR the children.
            // The example table shows "/sitemap.xml" (index likely) and others.
            // Let's just list what we found. If the user wants to traverse, that's complex.
            // However, to be "Finder", detecting children is valuable.
            // BUT, we can't fetch 1000 child sitemaps in a server action easily without timeout.
            // Let's stick to reporting what we found in robots.txt + common paths.
            // If we found a sitemap index at /sitemap.xml, we report it.
            // If the user's robots.txt pointed to /blog-sitemap.xml specifically, we report that too.
            // We won't recursively fetch all children of an index to avoid massive scraping.

            finalResults.push(r);
        } else {
            finalResults.push(r);
        }
    }

    // Calculate summary
    const summary = {
        totalSitemaps: finalResults.filter(r => r.status === 200).length,
        totalUrls: finalResults.reduce((acc, r) => acc + r.urlCount, 0),
        brokenSitemaps: finalResults.filter(r => r.status !== 200 || !r.valid).length,
        totalMissingLastMod: finalResults.reduce((acc, r) => acc + (r.missingLastMod || 0), 0)
    };

    return { sitemaps: finalResults, summary };
}

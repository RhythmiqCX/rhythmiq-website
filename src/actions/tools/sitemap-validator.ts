"use server";

export interface SitemapFetchResult {
    content?: string;
    status?: number;
    contentType?: string;
    error?: string;
}

export async function fetchSitemapAction(url: string): Promise<SitemapFetchResult> {
    if (!url) {
        return { error: "URL is required" };
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; RhythmiqBot/1.0; +https://rhythmiqcx.com)",
                "Accept": "application/xml, text/xml, */*",
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const contentType = response.headers.get("content-type") || "";
        const status = response.status;

        if (!response.ok) {
            return {
                error: `Failed to fetch sitemap: ${status} ${response.statusText}`,
                status
            };
        }

        const content = await response.text();

        return {
            content,
            status,
            contentType
        };

    } catch (error: any) {
        if (error.name === 'AbortError') {
            return { error: 'Request timed out' };
        }
        return { error: error.message || "Failed to fetch sitemap" };
    }
}

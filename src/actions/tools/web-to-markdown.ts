'use server'

export async function fetchUrlAction(url: string) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; RhythmiqBot/1.0; +https://rhythmiqcx.com)',
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            return { error: `Failed to fetch: ${response.status} ${response.statusText}` };
        }

        const html = await response.text();
        return { html };
    } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
            return { error: 'Request timed out' };
        }
        const message = error instanceof Error ? error.message : 'Failed to fetch URL';
        return { error: message };
    }
}

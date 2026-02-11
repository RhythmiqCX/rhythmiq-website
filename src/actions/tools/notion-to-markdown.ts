"use server";

export async function fetchNotionPageAction(url: string) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout for notion

        const response = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            return {
                error: `Failed to fetch: ${response.status} ${response.statusText}`,
            };
        }

        const html = await response.text();
        return { html };
    } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
            return { error: "Request timed out" };
        }
        const message =
            error instanceof Error ? error.message : "Failed to fetch URL";
        return { error: message };
    }
}

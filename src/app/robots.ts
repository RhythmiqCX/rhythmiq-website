import type { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL || "https://rhythmiqcx.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // Internal/utility routes that shouldn't be indexed.
                disallow: ["/api/"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}

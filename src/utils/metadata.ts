import { Metadata } from "next";

interface MetadataProps {
    title?: string;
    description?: string;
    icons?: Metadata["icons"];
    noIndex?: boolean;
    keywords?: string[];
    author?: string;
    twitterHandle?: string;
    type?: "website" | "article" | "profile";
    locale?: string;
    alternates?: Record<string, string>;
    openGraph?: {
        images?: string[];
        type?: string;
        publishedTime?: string;
        authors?: string[];
    };
    publishedTime?: string;
    modifiedTime?: string;
}

const DEFAULT_OG_IMAGE = "/icons/og-default.png";

export const generateMetadata = ({
    title = `Rhythmiq: Voice AI That Rescues Failed Deliveries & Returns`,
    description = `Rhythmiq calls your D2C customers to rescue failed deliveries, confirm COD orders, turn returns into exchanges, and bring back abandoned carts, 24/7, in 12+ languages. Plans from $149 a month.`,
    icons = [
        { rel: "icon", url: "/icons/rhythmiq-mark-32.png", sizes: "32x32", type: "image/png" },
        { rel: "icon", url: "/icons/rhythmiq-mark-16.png", sizes: "16x16", type: "image/png" },
        { rel: "icon", url: "/icons/rhythmiq-mark-192.png", sizes: "192x192", type: "image/png" },
        { rel: "icon", url: "/icons/rhythmiq-mark-512.png", sizes: "512x512", type: "image/png" },
        { rel: "apple-touch-icon", url: "/icons/rhythmiq-mark-180.png", sizes: "180x180" },
    ],
    noIndex = false,
    keywords = [
        "voice AI for D2C ecommerce",
        "reduce RTO with voice AI",
        "NDR reduction calling",
        "COD confirmation calls",
        "AI call for failed delivery",
        "returns to exchange voice AI",
        "abandoned cart call AI",
    ],
    author = process.env.NEXT_PUBLIC_AUTHOR_NAME || "Rhythmiq",
    type = "website",
    alternates,
    openGraph,
}: MetadataProps = {}): Metadata => {
    const metadataBase = new URL(process.env.SITE_URL || "https://rhythmiqcx.com");
    const siteName = process.env.NEXT_PUBLIC_APP_NAME || "Rhythmiq";

    const canonical = alternates?.canonical
        ? new URL(alternates.canonical, metadataBase).toString()
        : undefined;

    const ogImages = (openGraph?.images ?? [DEFAULT_OG_IMAGE]).map((img) =>
        new URL(img, metadataBase).toString(),
    );

    return {
        metadataBase,
        title: {
            template: `%s | ${siteName}`,
            default: title,
        },
        description,
        keywords,
        authors: [{ name: author }],
        creator: author,
        publisher: siteName,
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons,
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
        alternates: canonical ? { canonical } : undefined,
        openGraph: {
            title,
            description,
            siteName,
            url: canonical ?? metadataBase.toString(),
            type: (openGraph?.type as "website" | "article" | "profile") ?? type,
            images: ogImages,
            publishedTime: openGraph?.publishedTime,
            authors: openGraph?.authors,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImages,
        },
    };
};

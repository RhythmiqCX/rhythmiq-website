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

export const generateMetadata = ({
    title = `Rhythmiq - AI-Powered Customer Support Agent`,
    description = `Rhythmiq is an AI CX platform that transforms how companies interact with Customers. Leverage AI to automate support queries, create personalized AI agents, and boost productivity. Experience smarter Customer Services today.`,
    icons = [
        // Browser tab icons (small, specific sizes) - MUST be first for browser tabs
        {
            rel: "icon",
            url: "/icons/icon.png",
            sizes: "16x16",
            type: "image/png",
        },
        {
            rel: "icon",
            url: "/icons/icon.png",
            sizes: "32x32",
            type: "image/png",
            media: "(prefers-color-scheme: light)",
        },
        {
            rel: "icon",
            url: "/icons/icon.png",
            sizes: "32x32",
            type: "image/png",
            media: "(prefers-color-scheme: dark)",
        },
        // Search results and social media icons (larger) - Google will pick these
        {
            rel: "icon",
            url: "/icons/rhythmiq-icon.png",
            sizes: "192x192",
            type: "image/png",
        },
        {
            rel: "icon",
            url: "/icons/rhythmiq-icon.png",
            sizes: "512x512",
            type: "image/png",
        },
        // Apple touch icon
        {
            rel: "apple-touch-icon",
            url: "/icons/rhythmiq-icon.png",
            sizes: "180x180",
        },
        // Android icons
        {
            rel: "icon",
            url: "/icons/rhythmiq-icon.png",
            sizes: "192x192",
            type: "image/png",
        },
    ],
    noIndex = false,
    keywords = [
        "AI customer support",
        "whatsapp customer support",
        "whatsapp chatbot india",
        "AI chat bot",
        "AI chatbot india",
        "customer service bot",
        "AI bot for customer support",
        "marketing workflow",
        "AI customer service",
        "AI bot providers india"
    ],
    author = process.env.NEXT_PUBLIC_AUTHOR_NAME,
    type = "website",
    alternates,
    openGraph,
}: MetadataProps = {}): Metadata => {
    const metadataBase = new URL(process.env.SITE_URL || "https://rhythmiqcx.com");

    return {
        metadataBase,
        title: {
            template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
            default: title
        },
        description,
        keywords,
        authors: [{ name: author }],
        creator: author,
        publisher: process.env.NEXT_PUBLIC_APP_NAME,
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons,
        alternates: alternates ? {
            canonical: alternates.canonical ? new URL(alternates.canonical, metadataBase).toString() : undefined
        } : undefined,
        openGraph: openGraph ? {
            images: openGraph.images,
            type: openGraph.type as "website" | "article" | "profile",
            publishedTime: openGraph.publishedTime,
            authors: openGraph.authors,
        } : undefined,
    };
};
import { generateMetadata as genMeta } from "@/utils";
import JsonLd from "@/components/global/JsonLd";

export const metadata = genMeta({
    title: "Rhythmiq AI Web Widget | Embed Smart Customer Support on Any Website",
    description:
        "Add an AI-powered chat widget to your website in 60 seconds. Resolve FAQs instantly, hand off to live agents seamlessly, and support 60+ languages out of the box.",
    keywords: [
        "AI web widget",
        "website chat widget",
        "AI chatbot widget",
        "embed AI chat",
        "customer support widget",
        "live chat widget AI",
        "no code chat widget",
    ],
    alternates: {
        canonical: "/rhythmiq-ai-web-widget",
    },
    openGraph: {
        images: ["/icons/white.jpeg"],
        type: "website",
    },
});

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Rhythmiq AI Web Widget",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://rhythmiqcx.com/rhythmiq-ai-web-widget",
    description:
        "Embed a fully customisable AI chat widget on any website in 60 seconds. Handles FAQs, routes to live agents, and supports 60+ languages.",
    offers: {
        "@type": "Offer",
        price: "29",
        priceCurrency: "USD",
    },
};

export default function WebWidgetLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd schema={softwareSchema} />
            {children}
        </>
    );
}

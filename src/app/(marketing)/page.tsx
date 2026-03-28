import Wrapper from "@/components/global/wrapper";
import Analysis from "@/components/marketing/analysis";
import Companies from "@/components/marketing/companies";
import CTA from "@/components/marketing/cta";
import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import Integration from "@/components/marketing/integration";
import LanguageSupport from "@/components/marketing/lang-support";
import Pricing from "@/components/marketing/pricing";
import { generateMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";

export const metadata = generateMetadata({
    title: "AI Phone Receptionist & Voice AI Agents | RhythmiqCX — From $29/mo",
    description: "Deploy AI voice agents that answer every customer call 24/7 with human-like accuracy. No-code setup, 60+ languages, smart call routing — start free from $29/mo.",
    keywords: [
        "AI customer support",
        "AI CX platform",
        "customer support automation",
        "AI chatbot",
        "WhatsApp chatbot",
        "voice AI",
        "AI support agent",
        "multilingual AI support",
        "AI chat widget",
        "customer service AI India",
    ],
    alternates: {
        canonical: "/"
    },
    openGraph: {
        images: ['/icons/white.jpeg'],
        type: 'website',
    }
});

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RhythmiqCX",
    url: "https://rhythmiqcx.com",
    description: "AI CX platform that transforms customer support through automation, WhatsApp chatbots, and voice AI agents.",
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: "https://rhythmiqcx.com/blog?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
    },
};


const HomePage = () => {
    return (
        <Wrapper className="py-20 relative">
            <JsonLd schema={websiteSchema} />
            <Hero />
            {/* <Companies /> */}
            <Features />
            <Analysis />
            <Integration />
            {/* <Pricing /> */}
            <LanguageSupport />
            <CTA/>
        </Wrapper>
    )
};

export default HomePage

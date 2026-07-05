import { generateMetadata as buildMetadata } from "@/utils";
import JsonLd from "@/components/global/JsonLd";
import { DevLanding } from "@/components/marketing/dev";

export const metadata = buildMetadata({
  title: "Rhythmiq Dev: Websites, web apps & mobile, built like clockwork",
  description:
    "Rhythmiq Dev is the software studio arm of RhythmiqCX. We build websites, CRUD web apps, and mobile products for businesses everywhere. Fixed scope, weekly ships, senior hands only.",
  keywords: [
    "web development studio",
    "custom web app development",
    "CRUD app development",
    "mobile app development agency",
    "React Native development",
    "software studio for small business",
    "website design and build",
    "dev.rhythmiqcx.com",
  ],
  alternates: {
    canonical: "https://dev.rhythmiqcx.com/",
  },
  openGraph: {
    images: ["/icons/og-default.png"],
    type: "website",
  },
});

// ProfessionalService schema for the studio (distinct from the main
// restaurant-voice-AI Organization schema in the root layout).
const studioSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rhythmiq Dev",
  url: "https://dev.rhythmiqcx.com",
  parentOrganization: {
    "@type": "Organization",
    name: "RhythmiqCX",
    url: "https://rhythmiqcx.com",
  },
  description:
    "The software studio arm of RhythmiqCX. We build websites, CRUD web apps, and mobile products for businesses. Fixed scope, weekly ships.",
  areaServed: "Worldwide",
  serviceType: [
    "Website development",
    "Web application development",
    "Mobile app development",
    "AI integration",
  ],
};

const DevPage = () => {
  return (
    <>
      <JsonLd schema={studioSchema} />
      <DevLanding />
    </>
  );
};

export default DevPage;

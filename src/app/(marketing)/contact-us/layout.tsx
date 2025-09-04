import { generateMetadata } from '@/utils';

export const metadata = generateMetadata({
  title: "Contact Us - RhythmiqCX | Get in Touch with Our Team",
  description: "Get in touch with RhythmiqCX for AI-powered customer support solutions. Contact our team for demos, support, or partnership opportunities.",
  alternates: {
    canonical: "/contact-us"
  },
});

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

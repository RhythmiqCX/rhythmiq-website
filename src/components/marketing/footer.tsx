import Link from "next/link";
import Brand from "./restaurant/brand";
import { BOOK_DEMO_URL, COMPARE_LINKS } from "@/constants/links";

const FOOTER_COLUMNS: { title: string; links: { name: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { name: "AI Phone Host", href: "/voice-ai" },
      { name: "How it works", href: "/voice-ai#how-it-works" },
      { name: "Live demo", href: "/demo" },
      { name: "Integrations", href: "/integrations" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Compare",
    // Reuse the four real comparison pages (drop the "Rhythmiq " prefix for the footer).
    links: COMPARE_LINKS.map((l) => ({ name: l.name.replace("Rhythmiq ", ""), href: l.href })),
  },
  {
    title: "Company",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Free tools", href: "/tools" },
      { name: "About us", href: "/about-us" },
      { name: "Contact", href: "/contact-us" },
      { name: "Privacy", href: "/privacy-policy" },
      { name: "Terms", href: "/terms-and-conditions" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-dark text-onDark2 pt-14 lg:pt-[90px] pb-9 font-sans">
      <div className="wrap">
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)] gap-8">
          <div>
            <Brand onDark className="mb-4" />
            <p className="text-sm max-w-[30ch] leading-[1.55] mb-[18px]">
              The AI phone host for restaurants. Answer every call, book every table, never lose a cover.
            </p>
            <Link href={BOOK_DEMO_URL} className="btn btn-light">
              Start free trial
            </Link>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h5 className="font-mono text-[11px] tracking-[0.1em] uppercase text-onDark2 mb-4 font-medium">
                {col.title}
              </h5>
              <ul className="space-y-[11px] text-sm">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.name}`}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="foot-wordmark mt-8" aria-hidden>
          Rhythmiq
        </div>

        <div
          className="flex justify-between items-center flex-wrap gap-3.5 mt-10 lg:mt-[72px] pt-[22px] text-[13px]"
          style={{ borderTop: "1px solid var(--line-dark)" }}
        >
          <span>&copy; {new Date().getFullYear()} Rhythmiq, Inc. All rights reserved.</span>
          <span>Made for restaurants that never want to miss a call.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

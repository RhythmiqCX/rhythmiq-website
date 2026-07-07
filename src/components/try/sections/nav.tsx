"use client";

import { useEffect, useState } from "react";
import type { Prospect } from "@/lib/try/schema";
import { monogram } from "@/lib/try/catalog";
import { primaryCta } from "./util";

/**
 * Fixed nav. Starts transparent over the hero, fades to a frosted bar with a
 * hairline once scrolled past ~55vh. Over image/video heroes the brand + links
 * read white; over gradient/particle heroes they use the theme foreground.
 */
const TryNav = ({ data }: { data: Prospect }) => {
  const [overHero, setOverHero] = useState(true);
  const heroOnImage = data.hero.mode === "ken-burns" || data.hero.mode === "video";
  const cta = primaryCta(data);

  useEffect(() => {
    const onScroll = () => setOverHero(window.scrollY <= window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = overHero && heroOnImage; // white treatment
  const brandColor = light ? "#FFFFFF" : "var(--fg)";

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50"
      style={{
        background: overHero ? "transparent" : "color-mix(in srgb, var(--bg) 80%, transparent)",
        backdropFilter: overHero ? "none" : "blur(12px)",
        WebkitBackdropFilter: overHero ? "none" : "blur(12px)",
        borderBottom: `1px solid ${overHero ? "transparent" : "var(--line-soft)"}`,
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div className="wrap flex h-16 items-center gap-6">
        <a href="#top" aria-label={`${data.business.name}, back to top`} className="inline-flex items-center gap-2.5">
          {data.business.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.business.logo} alt="" className="h-7 w-auto object-contain" style={{ maxWidth: 140 }} />
          ) : (
            <span
              className="grid h-7 w-7 place-items-center rounded-[8px] font-heading text-[13px] font-bold"
              style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
            >
              {monogram(data.business.name)}
            </span>
          )}
          <span
            className="font-heading text-[19px] font-bold tracking-[-0.02em]"
            style={{ color: brandColor, transition: "color 0.4s" }}
          >
            {data.business.name}
          </span>
        </a>

        <span className="flex-1" />

        <a
          href={cta.href}
          {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
          className="shrink-0 rounded-full font-sans text-[14.5px] font-semibold no-underline transition-transform duration-200 hover:-translate-y-0.5"
          style={{ padding: "9px 20px", background: "var(--accent)", color: "var(--accent-ink)" }}
        >
          {data.contact.bookingUrl
            ? "Book now"
            : data.contact.phone
              ? "Call us"
              : data.contact.email
                ? "Email"
                : data.socials?.instagram
                  ? "Message"
                  : "Contact"}
        </a>
      </div>
    </header>
  );
};

export default TryNav;

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib";
import { LogoMark } from "@/components/marketing/restaurant/logo";
import { DEV_NAV_LINKS } from "./constants";

/**
 * Fixed nav for the dev studio site. Starts transparent over the video hero
 * (white links, on-dark logo) and fades to translucent paper + blur + hairline
 * once scrolled past ~55vh. Single-page anchor links.
 */
const DevNav = () => {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const onScroll = () => setOverHero(window.scrollY <= window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: overHero ? "transparent" : "rgba(250,248,243,0.8)",
        backdropFilter: overHero ? "none" : "blur(12px)",
        WebkitBackdropFilter: overHero ? "none" : "blur(12px)",
        borderBottom: `1px solid ${overHero ? "transparent" : "var(--line-soft)"}`,
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div className="wrap flex items-center gap-7 h-16">
        <Link href="#top" aria-label="Rhythmiq Dev, back to top" className="inline-flex items-center gap-2.5">
          <span
            className="inline-flex items-center gap-2.5 font-sans font-bold text-[20px] tracking-[-0.03em]"
            style={{ color: overHero ? "#FFFFFF" : "#191814", transition: "color 0.4s" }}
          >
            <LogoMark size={24} onDark={overHero} />
            Rhythmiq
          </span>
          <span
            className="font-mono text-[12px] tracking-[0.08em] pl-2.5"
            style={{
              color: overHero ? "#FF9A78" : "#8B847A",
              borderLeft: `1px solid ${overHero ? "rgba(244,239,230,0.35)" : "var(--line)"}`,
              transition: "color 0.4s, border-color 0.4s",
            }}
          >
            DEV
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-[22px]" aria-label="Primary">
          {DEV_NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium"
              style={{
                color: overHero ? "rgba(255,255,255,0.85)" : "#57534B",
                transition: "color 0.4s",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span className="flex-1" />

        {/* Transparent outlined pill so it blends into the nav rather than
            reading as a heavy filled button; border + text adapt to the state. */}
        <a
          href="#start"
          className={cn(
            "group shrink-0 inline-flex items-center gap-2 rounded-full font-semibold text-[14.5px] whitespace-nowrap transition-colors duration-300",
            overHero ? "hover:bg-white/10" : "hover:bg-ink/[0.05]",
          )}
          style={{
            padding: "9px 18px",
            color: overHero ? "#FFFFFF" : "#191814",
            border: `1px solid ${overHero ? "rgba(255,255,255,0.5)" : "rgba(25,24,20,0.25)"}`,
          }}
        >
          Start a project
          <span
            className="transition-transform duration-200 group-hover:translate-x-[3px]"
            style={{ color: overHero ? "#FF9A78" : "#E8643C" }}
          >
            →
          </span>
        </a>
      </div>
    </header>
  );
};

export default DevNav;

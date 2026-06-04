import Link from "next/link";
import { BOOK_DEMO_URL } from "@/constants/links";

interface BlogCTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * Shared end-of-post CTA. A dark box is intentional contrast on the paper page
 * (same idiom as the tool pages). `not-prose` is required so the BlogLayout
 * `prose` wrapper stops forcing ink text inside the dark box — without it the
 * copy renders dark-on-dark and disappears.
 */
export default function BlogCTA({
  title = "See Rhythmiq answer a real call from your business",
  description = "Watch our AI phone host take a live inbound call, tricky questions and all. No slide deck, just a real call on your number.",
  primaryLabel = "Book a live demo",
  primaryHref = BOOK_DEMO_URL,
  secondaryLabel,
  secondaryHref,
}: BlogCTAProps) {
  const primaryIsExternal = primaryHref.startsWith("http");

  return (
    <div className="not-prose my-16 rounded-3xl bg-dark text-onDark p-8 md:p-12 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-5">
        <h2 className="h-feature text-onDark">{title}</h2>
        <p className="text-onDark2 text-lg leading-relaxed">{description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-2">
          {primaryIsExternal ? (
            <a
              href={primaryHref}
              className="btn btn-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              {primaryLabel} <span className="arrow">→</span>
            </a>
          ) : (
            <Link href={primaryHref} className="btn btn-accent">
              {primaryLabel} <span className="arrow">→</span>
            </Link>
          )}
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} className="btn btn-ondark">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Container from "@/components/global/container";
import Link from "next/link";
import { ReactNode } from "react";
import JsonLd from "@/components/global/JsonLd";

const SITE_URL = "https://rhythmiqcx.com";

const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p.startsWith("/") ? "" : "/"}${p}`);

// Parse the human/ISO date string into an ISO date; returns undefined if unparseable.
function toIsoDate(date: string): string | undefined {
  const t = Date.parse(date);
  return Number.isNaN(t) ? undefined : new Date(t).toISOString();
}

type Section = { id: string; label: string };

type AuthorType = { avatar: string; name: string };

type RelatedArticle = {
  title: string;
  href: string;
  imageSrc: string;
  date: string;
  description: string;
};

interface BlogLayoutProps {
  category: { href: string; label: string };
  date: string;
  title: string;
  excerpt: string;
  authors: AuthorType[];
  readingTime: number;
  heroImage: { src: string; alt: string };
  sections: Section[];
  children: ReactNode;
  relatedArticles: RelatedArticle[];
}

export default function BlogLayout({
  category,
  date,
  title,
  excerpt,
  authors,
  readingTime,
  heroImage,
  sections,
  children,
  relatedArticles,
}: BlogLayoutProps) {
  const publishedIso = toIsoDate(date);

  // BlogPosting + BreadcrumbList structured data — emitted for every post so search
  // engines and LLMs get rich, grounded metadata (headline, author, date, image).
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    image: [abs(heroImage.src)],
    ...(publishedIso ? { datePublished: publishedIso, dateModified: publishedIso } : {}),
    author: authors.map((a) => ({ "@type": "Person", name: a.name })),
    publisher: {
      "@type": "Organization",
      name: "RhythmiqCX",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/rhythmiq-mark-512.png` },
    },
    inLanguage: "en",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: category.label, item: abs(category.href) },
      { "@type": "ListItem", position: 4, name: title },
    ],
  };

  return (
    <main className="paper-surface bg-paper text-ink font-sans flex flex-col">
      <JsonLd schema={[blogPostingSchema, breadcrumbSchema]} />
      {/* Hero header — not animation-gated so it paints immediately (LCP) */}
      <section className="section-tight text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center items-center gap-4 text-sm">
            <Link href={category.href} className="eyebrow no-underline">
              {category.label}
            </Link>
            <span className="text-ink3 hidden sm:inline">·</span>
            <time dateTime={date} className="font-mono text-[12px] text-ink3 hidden sm:inline">
              {date}
            </time>
          </div>
          <h1 className="h-section md:h-display !leading-[1.05]">{title}</h1>
          <p className="lede mx-auto max-w-[60ch]">{excerpt}</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {authors.map((author) => (
              <Author key={author.name} avatar={author.avatar} name={author.name} />
            ))}
            <ReadingTime minutes={readingTime} />
          </div>
          <div className="frame frame-light p-2 sm:p-3 mt-4">
            <div className="relative w-full h-56 sm:h-72 md:h-[440px] rounded-[12px] overflow-hidden ph">
              <Image
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content + sidebar */}
      <section className="flex flex-col lg:flex-row gap-10 py-8 lg:py-12 wrap">
        {sections.length > 0 && (
          <aside className="hidden lg:block lg:w-56 shrink-0">
            <nav className="sticky top-28">
              <h2 className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink3 mb-4">
                Contents
              </h2>
              <ul className="space-y-2.5 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-ink2 hover:text-coral transition-colors">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
        <article
          className="mx-auto max-w-3xl w-full prose prose-lg max-w-none
            prose-headings:font-sans prose-headings:text-ink prose-headings:font-semibold prose-headings:tracking-[-0.02em]
            prose-p:text-ink2 prose-li:text-ink2 prose-strong:text-ink
            prose-a:text-coral prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-coral prose-blockquote:text-ink prose-blockquote:font-medium
            prose-code:text-ink prose-img:rounded-[14px] prose-hr:border-ink/10
            [&_section]:scroll-mt-28"
        >
          {children}
        </article>
      </section>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="section-tight bg-paper2">
          <Container className="wrap space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="h-feature">Related articles</h2>
              <Link href="/blog" className="link-arrow">
                Browse all <span className="arrow">→</span>
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {relatedArticles.map((ra) => (
                <RelatedCard key={ra.href} {...ra} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}

// Inline helpers
function Author({ avatar, name }: { avatar: string; name: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-ink2">
      <Image src={avatar} alt={name} width={28} height={28} className="rounded-full" />
      <span>{name}</span>
    </div>
  );
}

function ReadingTime({ minutes }: { minutes: number }) {
  return (
    <span className="flex items-center gap-1.5 font-mono text-[12px] text-ink3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.462 0H5.539A1.846 1.846 0 0 0 3.692 1.846V6a1.85 1.85 0 0 0 .739 1.477L10.462 12l-6.031 4.523A1.85 1.85 0 0 0 3.692 18v4.154A1.846 1.846 0 0 0 5.54 24h12.923a1.846 1.846 0 0 0 1.846-1.846V18.04a1.86 1.86 0 0 0-.733-1.473L13.531 12l6.044-4.57a1.85 1.85 0 0 0 .733-1.472V1.846A1.846 1.846 0 0 0 18.462 0Z"
        />
      </svg>
      {minutes} min
    </span>
  );
}

function RelatedCard({ title, href, imageSrc, date, description }: RelatedArticle) {
  return (
    <div
      className="bg-paper rounded-[14px] overflow-hidden transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_24px_-16px_rgba(25,24,20,0.4)]"
      style={{ border: "1px solid var(--line-soft)" }}
    >
      <Link href={href} className="block relative h-44 ph">
        <Image src={imageSrc} alt={title} fill sizes="320px" className="object-cover" />
      </Link>
      <div className="p-4">
        <p className="font-mono text-[11px] text-ink3 mb-1.5">Published {date}</p>
        <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.01em] mb-1.5">
          <Link href={href} className="hover:text-coral transition-colors">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-ink2 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}

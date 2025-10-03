import Image from 'next/image';
import Container from '@/components/global/container';
import Link from 'next/link';
import { ReactNode } from 'react';

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
  return (
    <main className="flex flex-col">
      {/* Hero header */}
      <section className="py-20 bg-gradient-to-b from-indigo-600/20 to-background text-center px-4">
        <Container className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center items-center gap-4 text-sm text-indigo-400">
            <Link href={category.href} className="uppercase tracking-wide font-medium hover:text-indigo-600">
              {category.label}
            </Link>
            <span className="text-muted-foreground hidden sm:inline">·</span>
            <time dateTime={date} className="text-muted-foreground hidden sm:inline">
              {date}
            </time>
          </div>
          <h1 className="text-4xl/tight md:text-5xl font-bold">{title}</h1>
          <p className="text-lg text-muted-foreground mx-auto max-w-prose">{excerpt}</p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-indigo-400">
            {authors.map((author) => (
              <Author key={author.name} avatar={author.avatar} name={author.name} />
            ))}
            <ReadingTime minutes={readingTime} />
          </div>
          <div className="relative w-11/12 max-w-md mx-auto h-56 sm:h-72 md:h-[420px] md:w-full md:max-w-none rounded-2xl overflow-hidden">
            <Image sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 80vw,
         50vw" src={heroImage.src} alt={heroImage.alt} fill className="object-cover" />
          </div>
        </Container>
      </section>

      {/* Content + sidebar */}
      <section className="flex flex-col lg:flex-row py-12 px-4 lg:px-12">
        <aside className="hidden lg:block">
          <nav className="sticky top-28">
            <h2 className="font-semibold mb-4">Contents</h2>
            <ul className="space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-indigo-600">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <Container className="mx-auto max-w-4xl px-4">
          <article className="prose prose-lg lg:prose-xl dark:prose-invert [&_*]:text-gray-300 [&_a]:text-blue-500 [&_a]:no-underline">
            {children}
          </article>
        </Container>
      </section>

      {/* Related articles */}
      <section className="py-16 bg-gradient-to-b from-background to-indigo-600/10">
        <Container className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Related articles</h2>
            <Link href="/blog" className="text-indigo-400 hover:text-indigo-600">
              Browse all →
            </Link>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {relatedArticles.map((ra) => (
              <RelatedCard key={ra.href} {...ra} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

// Inline helpers
function Author({ avatar, name }: { avatar: string; name: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground ">
      <Image src={avatar} alt={name} width={28} height={28} className="rounded-full" />
      <span>{name}</span>
    </div>
  );
}

function ReadingTime({ minutes }: { minutes: number }) {
  return (
    <span className="flex items-center gap-1 text-sm text-muted-foreground">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
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
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <Link href={href}>
        <Image src={imageSrc} alt={title} width={320} height={149} className="w-full h-44 object-cover" />
      </Link>
      <div className="p-4">
        <p className="text-xs text-muted-foreground">Published {date}</p>
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={href} className="hover:text-indigo-400">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
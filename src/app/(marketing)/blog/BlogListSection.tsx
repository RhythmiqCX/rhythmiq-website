// components/blog/BlogListSection.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/global/container';
import { format, parseISO } from 'date-fns';

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  cover?: string;
  tag?: string;
  category?: string;
}

interface BlogListSectionProps {
  title?: string;
  subtitle?: string;
  posts: PostMeta[];
  alternate?: boolean; // to switch layout or color if needed
}

export default function BlogListSection({
  title,
  subtitle,
  posts,
  alternate = false,
}: BlogListSectionProps) {
  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  if (!posts.length) {
    return (
      <section className="py-20 text-center bg-gradient-to-b from-indigo-600/20 to-background">
        <Container>
          <h2 className="text-4xl font-bold">No Posts Found</h2>
          <p className="text-muted-foreground mt-2">
            Please check back later for more content.
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <Container className="mx-auto max-w-6xl">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">{title}</h2>
            {subtitle && (
              <p className="text-lg text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>
        )}

        {posts.map((post, index) => (
          <div
            key={post.slug}
            className={`grid md:grid-cols-2 gap-12 items-center py-12 border-b border-none ${
              index % 2 === 1 && alternate ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Blog Image */}
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
              <Link href={`/blog/${post.slug}`}>
                <Image
                  src={post.cover || '/images/blog-placeholder.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>

            {/* Blog Content */}
            <div className="space-y-3">
              {(() => {
                const label = post.category || post.tag || 'Insights';
                const href = `/blog/category/${encodeURIComponent(slugify(label))}`;
                return (
                  <Link
                    href={href}
                    className="text-sm uppercase tracking-wide text-indigo-600 font-medium no-underline"
                  >
                    {label}
                  </Link>
                );
              })()}

              <h3 className="text-2xl md:text-3xl font-semibold leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600 ">
                  {post.title}
                </Link>
              </h3>

              <time className="text-sm text-muted-foreground block">
                {format(parseISO(post.date), 'MMMM d, yyyy')}
              </time>

              <p className="text-muted-foreground max-w-xl">{post.description}</p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-indigo-600 font-medium"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

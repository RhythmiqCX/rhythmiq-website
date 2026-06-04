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

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function BlogListSection({
  title,
  subtitle,
  posts,
  alternate = false,
}: BlogListSectionProps) {
  if (!posts.length) {
    return (
      <section className="section-tight text-center bg-paper text-ink">
        <Container>
          <h2 className="h-section">No posts found</h2>
          <p className="text-ink2 mt-2">Please check back later for more content.</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="section-tight bg-paper text-ink">
      <Container className="wrap">
        {title && (
          <div className="text-center mb-12">
            <h2 className="h-section">{title}</h2>
            {subtitle && <p className="lede mt-2">{subtitle}</p>}
          </div>
        )}

        <div className="divide-y divide-ink/[0.08]">
          {posts.map((post, index) => {
            const label = post.category || post.tag || 'Insights';
            const href = `/blog/category/${encodeURIComponent(slugify(label))}`;
            const reversed = index % 2 === 1 && alternate;
            return (
              <article
                key={post.slug}
                className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center py-10 lg:py-12"
              >
                {/* Blog Image */}
                <Link
                  href={`/blog/${post.slug}`}
                  className={`relative w-full h-60 md:h-80 rounded-[14px] overflow-hidden ph ${
                    reversed ? 'md:order-2' : ''
                  }`}
                  style={{ border: '1px solid var(--line-soft)' }}
                >
                  <Image
                    src={post.cover || '/images/blog-placeholder.jpg'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>

                {/* Blog Content */}
                <div className={`${reversed ? 'md:order-1' : ''}`}>
                  <Link href={href} className="eyebrow no-underline">
                    {label}
                  </Link>

                  <h3 className="h-feature mt-3 mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-coral transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  <time className="font-mono text-[12px] text-ink3 block mb-3">
                    {format(parseISO(post.date), 'MMMM d, yyyy')}
                  </time>

                  <p className="text-ink2 text-[15.5px] leading-[1.55] max-w-[52ch] mb-4">
                    {post.description}
                  </p>

                  <Link href={`/blog/${post.slug}`} className="link-arrow">
                    Read more <span className="arrow">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// app/(marketing)/blog/page.tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Container from '@/components/global/container';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

// app/(marketing)/blog/page.tsx
export const metadata = {
  title: "Rhythmiq Blog | AI Chatbot Pricing, Customer Support Automation & Conversational AI",
  description:
    "Actionable guides, ROI studies and comparisons on AI chatbots, WhatsApp automation and customer service.",
  openGraph: {
    images: ['/images/blog/blog-cover.jpeg'],
    type: 'website',
  },
};


interface PostMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  cover?: string;
  tag?: string;
}

export default async function BlogListingPage() {
  const postsDir = path.join(process.cwd(), 'content', 'blog');

  // Handle missing blog folder
  if (!fs.existsSync(postsDir)) {
    return (
      <main className="flex flex-col">
        <section className="py-20 bg-gradient-to-b from-indigo-600/20 to-background text-center">
          <Container className="space-y-4">
            <h1 className="text-5xl font-bold">Rhythmiq Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No posts available yet.
            </p>
          </Container>
        </section>
      </main>
    );
  }

  const filenames = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  const posts: PostMeta[] = filenames.map((fn) => {
    const filePath = path.join(postsDir, fn);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      title: data.title,
      date: data.date,
      description: data.description,
      tag: data.tag || 'Insights',
      cover: data.cover || '/images/blog-placeholder.jpg',
      slug: fn.replace(/\.md$/, ''),
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [featured, ...rest] = posts;

  return (
    <main className="flex flex-col">
    {/* Hero */}
    <section className="py-20 bg-gradient-to-b from-indigo-600/20 to-background text-center px-4">
      <Container className="space-y-4">
        <h1 className="text-5xl font-bold">The Rhythmiq Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Thoughts on Conversational AI, CX automation, and Customer experience.
        </p>
      </Container>
    </section>
  
    {/* Every post displayed as “featured” */}
    {posts.map((post) => (
      <section key={post.slug} className="py-16 px-4">
        <Container className="mx-auto max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
            <Image
              src={post.cover!}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <span className="text-sm uppercase tracking-wide text-indigo-600 font-medium">
              {post.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
              <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600">
                {post.title}
              </Link>
            </h2>
            <time className="text-sm text-muted-foreground">
              {format(parseISO(post.date), 'MMMM d, yyyy')}
            </time>
            <p className="text-muted-foreground">{post.description}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-indigo-600 font-medium"
            >
              Read more →
            </Link>
          </div>
        </Container>
      </section>
    ))}
  </main>
  );
}

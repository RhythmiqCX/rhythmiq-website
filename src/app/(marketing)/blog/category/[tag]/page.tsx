import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Container from '@/components/global/container';
import { notFound } from 'next/navigation';
import { generateMetadata as makeMetadata } from '@/utils';
import BlogListSection, { PostMeta } from '../../BlogListSection';

type PageProps = { params: Promise<{ tag: string }> };

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/&/g, 'and').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return makeMetadata({
    title: `${decoded} Articles | Rhythmiq Blog`,
    description: `Browse ${decoded} posts and insights on the Rhythmiq Blog.`,
    alternates: { canonical: `/blog/category/${encodeURIComponent(tag)}` },
    openGraph: { images: ['/icons/white.jpeg'], type: 'website' },
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const tagSlug = slugify(decodedTag);

  const postsDir = path.join(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(postsDir)) notFound();

  const filenames = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  const posts: PostMeta[] = filenames.map((fn) => {
    const file = fs.readFileSync(path.join(postsDir, fn), 'utf8');
    const { data } = matter(file);
    return {
      title: data.title,
      date: data.date,
      description: data.description,
      tag: data.tag,
      category: data.category,
      cover: data.cover,
      slug: fn.replace(/\.md$/, ''),
    };
  });

  const filtered = posts.filter((p) => {
    const combined = `${p.tag ?? ''} ${p.category ?? ''}`.toLowerCase();
    const normalized = slugify(combined);
    return normalized.includes(tagSlug) || combined.includes(decodedTag.toLowerCase());
  });

  if (!filtered.length) notFound();

  return (
    <main>
      <section className="py-20 bg-gradient-to-b from-indigo-600/20 to-background text-center px-4">
        <Container className="space-y-4">
          <h1 className="text-5xl font-bold capitalize">{decodedTag}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore articles related to {decodedTag}.
          </p>
        </Container>
      </section>

      <BlogListSection posts={filtered} alternate />
    </main>
  );
}

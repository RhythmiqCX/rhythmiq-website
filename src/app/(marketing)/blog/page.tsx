import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Container from '@/components/global/container';
import { generateMetadata } from '@/utils';
import BlogListSection, { PostMeta } from './BlogListSection';

export const metadata = generateMetadata({
  title: "Rhythmiq Blog | Voice AI, AI Phone Hosts & Restaurant Automation",
  description:
    "Actionable guides, comparisons, and ideas on voice AI, AI phone receptionists, reservations, and automating front-of-house for restaurants and small businesses.",
  alternates: { canonical: "/blog" },
  openGraph: { images: ['/icons/og-default.png'], type: 'website' },
});

export default async function BlogListingPage() {
  const postsDir = path.join(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(postsDir)) {
    return <BlogListSection title="Rhythmiq Blog" subtitle="No posts available yet." posts={[]} />;
  }

  const filenames = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  const posts: PostMeta[] = filenames.map((fn) => {
    const file = fs.readFileSync(path.join(postsDir, fn), 'utf8');
    const { data } = matter(file);
    return {
      title: data.title,
      date: data.date,
      description: data.description,
      tag: data.tag || 'Insights',
      cover: data.cover || '/images/blog-placeholder.jpg',
      slug: fn.replace(/\.md$/, ''),
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="paper-surface bg-paper text-ink font-sans">
      <section className="section-tight text-center">
        <Container className="wrap">
          <span className="eyebrow justify-center">The Rhythmiq Blog</span>
          <h1 className="h-display mt-4">Notes on voice AI &amp; hospitality</h1>
          <p className="lede max-w-2xl mx-auto mt-4">
            Guides, comparisons, and ideas on AI phone hosts, reservations, and running a
            front-of-house that never misses a call.
          </p>
        </Container>
      </section>

      <BlogListSection posts={posts} alternate />
    </main>
  );
}

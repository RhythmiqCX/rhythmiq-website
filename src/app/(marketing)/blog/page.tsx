import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Container from '@/components/global/container';
import { generateMetadata } from '@/utils';
import BlogListSection, { PostMeta } from './BlogListSection';

export const metadata = generateMetadata({
  title: "Rhythmiq Blog | AI Chatbot Pricing, Customer Support Automation & Conversational AI",
  description:
    "Actionable guides, ROI studies and comparisons on AI chatbots, WhatsApp automation and customer service.",
  alternates: { canonical: "/blog" },
  openGraph: { images: ['/icons/white.jpeg'], type: 'website' },
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
    <main>
      <section className="py-20 bg-gradient-to-b from-indigo-600/20 to-background text-center px-4">
        <Container className="space-y-4">
          <h1 className="text-5xl font-bold">The Rhythmiq Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts on Conversational AI, CX automation, and Customer experience.
          </p>
        </Container>
      </section>

      <BlogListSection posts={posts} alternate />
    </main>
  );
}

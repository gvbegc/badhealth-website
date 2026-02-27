import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { marked } from "marked";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — BadHealth Blog`,
    description: post.excerpt,
  };
}

const categoryColors: Record<string, string> = {
  "Our Story": "bg-[#0B352B] text-white",
  "Cooking Tips": "bg-amber-100 text-amber-800",
  Nutrition: "bg-emerald-100 text-emerald-800",
  "Meal Planning": "bg-blue-100 text-blue-800",
  "Family Meals": "bg-rose-100 text-rose-800",
  Science: "bg-purple-100 text-purple-800",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = await marked(post.content);

  return (
    <main>
      {/* Back */}
      <div className="max-w-3xl mx-auto px-6 pt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-black transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8H3M3 8L7 4M3 8L7 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All posts
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-12">
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-6 ${
            categoryColors[post.category] ?? "bg-zinc-100 text-zinc-700"
          }`}
        >
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-normal text-black leading-tight">
          {post.title}
        </h1>
        <p className="mt-5 text-lg text-zinc-500 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center gap-4 text-sm text-zinc-400 border-b border-zinc-100 pb-8">
          <span className="font-medium text-zinc-600">{post.author}</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      {/* Hero image placeholder — swap for real image when available */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-zinc-100 rounded-2xl aspect-[16/7] w-full" />
      </div>

      {/* Body */}
      <article
        className="blog-content max-w-3xl mx-auto px-6 pb-20"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* CTA */}
      <section className="bg-[#0B352B] py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-normal text-white leading-tight">
            Put this into practice tonight.
          </h2>
          <p className="mt-3 text-base text-white/70">
            Scan your fridge, get personalized meal recommendations aligned with
            your goals.
          </p>
          <a
            href="https://apps.apple.com/us/app/badhealth-smart-recipes/id6740097820"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 rounded-full bg-white px-8 py-3 text-base font-medium text-[#0B352B] hover:bg-zinc-100 transition-colors"
          >
            Download BadHealth Free
          </a>
        </div>
      </section>
    </main>
  );
}

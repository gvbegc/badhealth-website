import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — BadHealth | Healthy Eating, Meal Planning & Nutrition Tips",
  description:
    "Recipes, nutrition science, meal planning guides, and cooking tips from the BadHealth team. Learn how to eat better with what's already in your fridge.",
};

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

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main>
      {/* Header */}
      <section className="pt-20 pb-12 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-[#0B352B] tracking-widest uppercase mb-4">
            The BadHealth Blog
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-black leading-tight max-w-2xl">
            Eat better, starting tonight.
          </h1>
          <p className="mt-4 text-base text-zinc-500 max-w-xl">
            Practical nutrition science, cooking tips, and meal ideas — all
            built around what&apos;s already in your fridge.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Featured Post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="relative rounded-2xl aspect-[16/10] overflow-hidden">
                <Image
                  src="/badhealth-fridge-scan-app-hero.png"
                  alt="BadHealth blog"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                    categoryColors[featured.category] ??
                    "bg-zinc-100 text-zinc-700"
                  }`}
                >
                  {featured.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-normal text-black leading-tight group-hover:text-[#0B352B] transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base text-zinc-500 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-zinc-400">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0B352B] group-hover:gap-3 transition-all">
                  Read article
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Divider */}
        <div className="border-t border-zinc-100 mb-16" />

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col"
            >
              <div className="relative rounded-xl aspect-[16/10] mb-5 overflow-hidden">
                <Image
                  src="/badhealth-fridge-scan-app-hero.png"
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span
                className={`inline-block self-start text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                  categoryColors[post.category] ?? "bg-zinc-100 text-zinc-700"
                }`}
              >
                {post.category}
              </span>
              <h3 className="text-xl font-normal text-black leading-snug group-hover:text-[#0B352B] transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-500 leading-relaxed line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400">
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="bg-[#0B352B] py-20 mt-10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-white leading-tight">
            Ready to eat better starting tonight?
          </h2>
          <p className="mt-4 text-base text-white/70">
            Scan your fridge, get personalized meal recommendations, and stop
            staring into the abyss every evening.
          </p>
          <a
            href="https://apps.apple.com/us/app/badhealth-smart-recipes/id6740097820"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 rounded-full bg-white px-8 py-3 text-base font-medium text-[#0B352B] hover:bg-zinc-100 transition-colors"
          >
            Download BadHealth Free
          </a>
        </div>
      </section>
    </main>
  );
}

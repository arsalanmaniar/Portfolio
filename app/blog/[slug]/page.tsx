import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import {
  blogPosts,
  getPostBySlug,
  formatPostDate,
} from "@/lib/blog-posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: `${post.title} | Arsalan Maniar`,
      description: post.excerpt,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Arsalan Maniar`,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="py-24">
      <div className="container max-w-3xl">
        {/* Back button */}
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          {"< back to blog"}
        </Link>

        {/* Meta */}
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>

        {/* Tags */}
        <ul className="mb-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 font-mono text-xs text-primary"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Terminal-style content frame */}
        <div className="rounded-lg border border-border/70 bg-card/40 shadow-xl">
          <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-destructive/80" />
              <span className="size-2.5 rounded-full bg-secondary/80" />
              <span className="size-2.5 rounded-full bg-primary/80" />
            </span>
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              cat {post.slug}.md
            </span>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            {post.content.map((para, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {para}
              </p>
            ))}

            <p className="pt-2 font-mono text-sm text-primary glow-cyan-sm">
              {"> end of file"}
              <span className="terminal-cursor" aria-hidden />
            </p>
          </div>
        </div>

        {/* Footer back link */}
        <Link
          href="/blog"
          className="mt-10 inline-flex items-center gap-2 font-mono text-sm text-secondary transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          {"< back to blog"}
        </Link>
      </div>
    </article>
  );
}

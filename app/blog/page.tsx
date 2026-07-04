import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { blogPosts, formatPostDate } from "@/lib/blog-posts";

const title = "Blog";
const description =
  "Articles by Arsalan Maniar on AI engineering, RAG, chatbots, and building practical AI-powered products.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: `${title} | Arsalan Maniar`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Arsalan Maniar`,
    description,
  },
};

export default function BlogPage() {
  return (
    <section className="py-24">
      <div className="container">
        <SectionHeading
          path="> BLOG.posts"
          title="Blog"
          description="Notes on AI engineering, RAG, chatbots, and shipping real-world AI products."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05} className="h-full">
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex h-full flex-col rounded-lg border border-border/70 bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_16px_40px_-16px_hsl(188_94%_43%/0.45)]">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="mb-3 font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>

                  <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <ul className="mb-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 font-mono text-xs text-primary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center gap-1.5 font-mono text-sm text-secondary">
                    read post
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

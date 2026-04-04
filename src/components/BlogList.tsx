"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import type { PostData } from "@/lib/posts";

type BlogListProps = {
  posts: PostData[];
  categories: string[];
  tags: string[];
};

export default function BlogList({ posts, categories, tags }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchCategory = selectedCategory
      ? post.categories?.includes(selectedCategory)
      : true;
    const matchTag = selectedTag ? post.tags?.includes(selectedTag) : true;
    return matchCategory && matchTag;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar for Filters */}
      <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <button
                className={`text-sm hover:text-primary transition-colors ${
                  !selectedCategory ? "text-primary font-bold" : "text-muted-foreground"
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className={`text-sm hover:text-primary transition-colors ${
                    selectedCategory === cat
                      ? "text-primary font-bold"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                !selectedTag
                  ? "bg-primary text-primary-foreground hover:bg-primary/80"
                  : "bg-background hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setSelectedTag(null)}
            >
              All Tags
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "bg-background hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory || selectedTag
            ? `Viewing: ${[selectedCategory, selectedTag].filter(Boolean).join(" & ")}`
            : "All Posts"}
        </h2>
        {filteredPosts.length === 0 ? (
          <p className="text-muted-foreground">No posts found matching the criteria.</p>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article key={post.slug.join("/")} className="border-b pb-6 last:border-0">
                <Link href={`/blog/${post.slug.join("/")}`} className="group relative">
                  <span className="text-sm text-muted-foreground mb-2 block">
                    {format(new Date(post.date), "MMMM dd, yyyy")}
                  </span>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-muted-foreground line-clamp-2 md:line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
                <div className="flex gap-2">
                  {post.categories?.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs font-medium text-emerald-600 dark:text-emerald-400"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

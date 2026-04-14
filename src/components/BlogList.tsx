"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import type { PostData } from "@/lib/posts";
import Sidebar from "./Sidebar";
import { Search, Calendar, ChevronRight } from "lucide-react";

type SidebarItem = {
  name: string
  count: number
}

type BlogListProps = {
  posts: PostData[];
  categories: SidebarItem[];
  tags: SidebarItem[];
};

export default function BlogList({ posts, categories, tags }: BlogListProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;

    const searchTarget = [
      post.title,
      post.excerpt,
      post.category || "",
      ...(post.tags || []),
    ].join(" ").toLowerCase();

    return searchTarget.includes(searchQuery);
  });

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-center items-start w-full">
        {/* Main Content */}
        <div className="flex-1 space-y-12 max-w-4xl w-full">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[1.2]">
              {searchQuery ? `Search: ${searchQuery}` : "The Archive"}
            </h1>
            <p className="text-muted-foreground font-medium max-w-xl">
              Exploring the intersection of code, design, and future tech.
              {searchQuery && ` Found ${filteredPosts.length} results.`}
            </p>
          </header>

          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed rounded-3xl border-primary/10 bg-primary/5">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-20" />
              <p className="text-lg font-bold text-muted-foreground">No posts matching your search.</p>
              <Link href="/blog" className="text-sm text-primary font-black uppercase tracking-widest mt-4 inline-block hover:underline">
                Clear Filters
              </Link>
            </div>
          ) : (
            <div className="grid gap-12">
              {filteredPosts.map((post) => (
                <article key={post.slug.join("/")} className="group relative grid md:grid-cols-4 gap-8 items-start">
                  <div className="md:col-span-1 pt-2">
                    <div className="flex flex-col gap-3">
                      {/* Date Badge */}
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-fit">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(post.date), "MMM dd, yyyy")}
                      </div>
                      
                      {/* Category Identity */}
                      {post.category && (
                        <div className="flex items-center gap-2">
                          {(() => {
                            const categoryColors: Record<string, string> = {
                              Investment: "bg-blue-600",
                              "Book Review": "bg-amber-600",
                              Education: "bg-emerald-600",
                              "Life & Growth": "bg-indigo-600",
                              Default: "bg-slate-400",
                            };
                            const color = categoryColors[post.category as keyof typeof categoryColors] || categoryColors.Default;
                            return (
                              <>
                                <span className={`w-2 h-2 rounded-full ${color}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                                  {post.category}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-3 space-y-4">
                    <Link href={`/blog/${post.slug.join("/")}`} className="block group">
                      <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-muted-foreground font-medium leading-relaxed mt-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                    </Link>
                    <Link
                      href={`/blog/${post.slug.join("/")}`}
                      className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:translate-x-2 transition-transform"
                    >
                      Read Article <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-24">
            <Sidebar categories={categories} tags={tags} totalPosts={posts.length} />
          </div>
        </div>
      </div>
    </div>
  );
}

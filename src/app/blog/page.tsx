import { getSortedPostsData, getAllCategories, getAllTags } from "@/lib/posts";
import BlogList from "@/components/BlogList";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";

export default function BlogPage() {
  const posts = getSortedPostsData();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
      <h1 className="text-4xl font-bold tracking-tight mb-12 border-b pb-4 text-center">Blog Archive</h1>
      <div className="flex flex-col lg:flex-row gap-12">
        <Suspense fallback={<div className="py-20 text-center font-black uppercase opacity-20">Loading Archive...</div>}>
          <BlogList posts={posts} categories={categories} tags={tags} />
        </Suspense>
        <div className="lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-24">
            <Suspense fallback={<div className="h-40 rounded-3xl bg-secondary animate-pulse" />}>
              <Sidebar categories={categories} tags={tags} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getSortedPostsData, getAllCategories, getAllTags } from "@/lib/posts";
import BlogList from "@/components/BlogList";
import { Suspense } from "react";

export default function BlogPage() {
  const posts = getSortedPostsData();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
      <Suspense fallback={<div className="py-20 text-center font-black uppercase opacity-20">Loading Archive...</div>}>
        <BlogList posts={posts} categories={categories} tags={tags} />
      </Suspense>
    </div>
  );
}

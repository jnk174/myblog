import { getSortedPostsData, getAllCategories, getAllTags } from "@/lib/posts";
import BlogList from "@/components/BlogList";

export default function BlogPage() {
  const posts = getSortedPostsData();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
      <h1 className="text-4xl font-bold tracking-tight mb-12 border-b pb-4">Blog</h1>
      <BlogList posts={posts} categories={categories} tags={tags} />
    </div>
  );
}

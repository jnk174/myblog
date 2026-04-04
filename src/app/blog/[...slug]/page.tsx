import { getPostData, getAllPostSlugs } from "@/lib/posts";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Params = {
  slug: string[];
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((s) => ({
    slug: s.slug,
  }));
}

export default async function PostPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const postData = await getPostData(params.slug);

  return (
    <article className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>
      
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {postData.title}
        </h1>
        <div className="flex items-center justify-center space-x-4 text-muted-foreground">
          <time dateTime={postData.date}>
            {format(new Date(postData.date), "MMMM dd, yyyy")}
          </time>
          {postData.categories && postData.categories.length > 0 && (
            <>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {postData.categories.join(", ")}
              </span>
            </>
          )}
        </div>
        {postData.tags && postData.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {postData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
      />
    </article>
  );
}

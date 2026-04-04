import { getPostData, getAllPostSlugs } from "@/lib/posts";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CommentSection from "@/components/CommentSection";

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
  const slugJoined = params.slug.join("/");

  return (
    <article className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>
      
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-balance">
          {postData.title}
        </h1>
        <div className="flex items-center justify-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <time dateTime={postData.date}>
            {format(new Date(postData.date), "MMMM dd, yyyy")}
          </time>
          {postData.categories && postData.categories.length > 0 && (
            <>
              <span>•</span>
              <span className="text-primary">
                {postData.categories.join(", ")}
              </span>
            </>
          )}
        </div>
      </header>

      <div
        className="prose prose-neutral dark:prose-invert max-w-none 
          prose-headings:font-black prose-headings:tracking-tighter
          prose-p:font-medium prose-p:leading-relaxed
          prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
      />

      <div className="mt-24 pt-12 border-t">
        <CommentSection postSlug={slugJoined} />
      </div>
    </article>
  );
}

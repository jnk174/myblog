import { getPostData, getAllPostSlugs, getAllCategories, getAllTags, getSortedPostsData } from "@/lib/posts";
import { format } from "date-fns";
import Link from "next/link";
import { Calendar, Tag, ChevronLeft } from "lucide-react";
import CommentSection from "@/components/CommentSection";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";

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

  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-center items-start w-full">
        {/* Main Article Content */}
        <div className="flex-1 max-w-4xl w-full">
          <Link
            href="/blog"
            className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary mb-12 transition-all group"
          >
            <ChevronLeft className="mr-1 h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to Archive
          </Link>

          <article className="space-y-12">
            <header className="space-y-6">
              {/* Category-specific accent bar */}
              {postData.category && (
                <div className={`h-1 w-20 rounded-full mb-8 ${(() => {
                  const categoryColors: Record<string, string> = {
                    투자: "bg-sky-600",
                    독서: "bg-amber-600",
                    교육: "bg-emerald-600",
                    코딩: "bg-violet-600",
                    자동화: "bg-teal-600",
                    Default: "bg-slate-400",
                  };
                  return categoryColors[postData.category as keyof typeof categoryColors] || categoryColors.Default;
                })()}`} />
              )}
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground border px-3 py-1.5 rounded-full">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(postData.date), "MMMM dd, yyyy")}
                </div>
                {postData.category && (
                  <span className={`text-[10px] font-black uppercase tracking-widest text-white px-3 py-1.5 rounded-full ${(() => {
                    const categoryColors: Record<string, string> = {
                      투자: "bg-sky-600",
                      독서: "bg-amber-600",
                      교육: "bg-emerald-600",
                      코딩: "bg-violet-600",
                      자동화: "bg-teal-600",
                      Default: "bg-slate-400",
                    };
                    return categoryColors[postData.category as keyof typeof categoryColors] || categoryColors.Default;
                  })()}`}>
                    {postData.category}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.2] text-balance">
                {postData.title}
              </h1>

              <div className="flex flex-wrap gap-2 pt-4">
                {postData.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/60"
                  >
                    <Tag className="mr-1 h-3 w-3 opacity-50" />
                    #{tag}
                  </span>
                ))}
              </div>
            </header>

            <div
              className="prose prose-neutral dark:prose-invert max-w-none 
                prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
                prose-p:text-lg prose-p:font-medium prose-p:leading-relaxed prose-p:text-foreground/80
                prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-3xl
                prose-img:rounded-3xl prose-img:border prose-img:shadow-2xl"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
            />

            <div className="mt-32 pt-16 border-t border-primary/10">
              <CommentSection postSlug={slugJoined} />
            </div>
          </article>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-24">
            <Suspense fallback={<div className="h-40 rounded-3xl bg-secondary animate-pulse" />}>
              <Sidebar categories={categories} tags={tags} totalPosts={getSortedPostsData().length} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { format } from "date-fns";
import type { PostData } from "@/lib/posts";
import Image from "next/image";

interface PostCardProps {
  post: PostData;
}

const categoryStyles: Record<string, string> = {
  투자: "border-l-sky-500 bg-sky-50/60 dark:bg-sky-950/20",
  독서: "border-l-amber-500 bg-amber-50/70 dark:bg-amber-950/20",
  코딩: "border-l-violet-500 bg-violet-50/60 dark:bg-violet-950/20",
  자동화: "border-l-teal-500 bg-teal-50/60 dark:bg-teal-950/20",
  교육: "border-l-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20",
  Default: "border-l-slate-400 bg-slate-50/30 dark:bg-slate-900/10",
};

const categoryBadgeStyles: Record<string, string> = {
  투자: "border-sky-200 bg-sky-100 text-sky-800 dark:border-sky-800/60 dark:bg-sky-950/60 dark:text-sky-200",
  독서: "border-amber-200 bg-amber-100 text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/60 dark:text-amber-200",
  코딩: "border-violet-200 bg-violet-100 text-violet-800 dark:border-violet-800/60 dark:bg-violet-950/60 dark:text-violet-200",
  자동화: "border-teal-200 bg-teal-100 text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-200",
  교육: "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-emerald-200",
  Default: "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
};

export default function PostCard({ post }: PostCardProps) {
  const style = categoryStyles[post.category as keyof typeof categoryStyles] || categoryStyles.Default;
  const badgeStyle = categoryBadgeStyles[post.category as keyof typeof categoryBadgeStyles] || categoryBadgeStyles.Default;

  return (
    <Link key={post.slug.join("/")} href={`/blog/${post.slug.join("/")}`} className="group h-full">
      <div className={`flex flex-col h-full border rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-card ${style} border-l-4`}>
        {post.thumbnail ? (
          <div className="relative w-full h-48 overflow-hidden">
            <Image 
              src={post.thumbnail} 
              alt={post.title} 
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-24 flex items-center justify-center bg-muted/50">
             <span className="text-4xl font-serif text-muted-foreground/20 italic">
               {post.category?.charAt(0) || "G"}
             </span>
          </div>
        )}
        
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-black uppercase tracking-widest ${badgeStyle}`}>
              {post.category || "General"}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground">
               {format(new Date(post.date), "MMM dd, yyyy")}
            </span>
          </div>
          
          <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-3">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          <div className="mt-auto pt-4 flex gap-1.5 flex-wrap">
            {post.tags?.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

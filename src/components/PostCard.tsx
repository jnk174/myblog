import Link from "next/link";
import { format } from "date-fns";
import type { PostData } from "@/lib/posts";
import Image from "next/image";

interface PostCardProps {
  post: PostData;
}

const categoryStyles: Record<string, string> = {
  Investment: "border-l-blue-500 bg-blue-50/30 dark:bg-blue-900/10",
  "Book Review": "border-l-amber-500 bg-amber-50/30 dark:bg-amber-900/10",
  "Coding & Automation": "border-l-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10",
  Education: "border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10",
  Default: "border-l-slate-400 bg-slate-50/30 dark:bg-slate-900/10",
};

export default function PostCard({ post }: PostCardProps) {
  const style = categoryStyles[post.category as keyof typeof categoryStyles] || categoryStyles.Default;

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
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
              {post.category || "General"}
            </span>
            <span className="text-muted-foreground/30">•</span>
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

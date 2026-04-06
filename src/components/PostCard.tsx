import Link from "next/link";
import { format } from "date-fns";
import type { PostData } from "@/lib/posts";

interface PostCardProps {
  post: PostData;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link key={post.slug.join("/")} href={`/blog/${post.slug.join("/")}`}>
      <div className="flex flex-col space-y-2 rounded-lg border bg-card p-4 hover:shadow-md transition-shadow h-full">
        <span className="text-sm text-muted-foreground">
          {format(new Date(post.date), "MMMM dd, yyyy")}
        </span>
        <h3 className="text-xl font-bold">{post.title}</h3>
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto pt-4 flex gap-2 flex-wrap">
          {post.tags?.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

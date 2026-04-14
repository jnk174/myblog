import Link from "next/link";
import Image from "next/image";
import type { PostData } from "@/lib/posts";
import { format } from "date-fns";

interface FeaturedPostProps {
  post: PostData;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="container mx-auto px-4 max-w-5xl py-12 md:py-20">
      <div className="flex flex-col mb-10">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-2">Featured Selection</h2>
        <div className="h-1 w-20 bg-primary/20 rounded-full" />
      </div>

      <Link href={`/blog/${post.slug.join("/")}`} className="group gap-12 grid md:grid-cols-2 items-center">
        <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl shadow-xl transition-transform duration-700 group-hover:scale-[1.02]">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-6xl font-serif text-muted-foreground/10 italic">Archival</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider">
                {post.category || "Insight"}
              </span>
              <span className="text-sm text-muted-foreground">
                {format(new Date(post.date), "MMMM dd, yyyy")}
              </span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-extrabold leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed line-clamp-4">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-4">
            <span className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-4 transition-all">
              자세히 읽어보기 <span className="text-lg">→</span>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}

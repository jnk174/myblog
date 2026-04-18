import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import type { PostContext } from '@/lib/posts';

type Props = {
  posts: PostContext['relatedPosts'];
};

export default function RelatedPosts({ posts }: Props) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="mt-16 mb-16 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black tracking-tighter uppercase">
          함께 읽으면 좋은 글
        </h3>
        <div className="h-1 flex-1 bg-primary/10 ml-6 rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug.join('/')}
            href={`/blog/${post.slug.join('/')}`}
            className="group flex flex-col gap-4 p-4 rounded-3xl bg-slate-50 dark:bg-white/5 border border-primary/5 hover:border-primary/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
          >
            {post.thumbnail ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted/50">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ) : (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Read Now</div>
              </div>
            )}
            
            <div className="flex flex-col gap-2 px-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  {post.category || 'Blog'}
                </span>
                <span className="text-muted-foreground/30">•</span>
                <div className="flex items-center text-[10px] font-bold text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {format(new Date(post.date), 'yyyy.MM.dd')}
                </div>
              </div>
              <h4 className="font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors break-keep text-[15px]">
                {post.title}
              </h4>
              {post.excerpt && (
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-1 hidden md:block">
                  {post.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

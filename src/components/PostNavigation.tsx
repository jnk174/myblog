import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { PostContext } from '@/lib/posts';

type Props = {
  prevPost: PostContext['prevPost'];
  nextPost: PostContext['nextPost'];
};

export default function PostNavigation({ prevPost, nextPost }: Props) {
  if (!prevPost && !nextPost) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-16">
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug.join('/')}`}
          className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-slate-50 dark:bg-white/5 p-8 transition-all hover:border-primary/30 hover:bg-white dark:hover:bg-white/10 hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-center"
        >
          <div className="flex flex-col gap-3 relative z-10">
            <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              이전 글
            </div>
            <div className="text-xl font-black tracking-tight line-clamp-2 text-balance group-hover:text-primary transition-colors">
              {prevPost.title}
            </div>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug.join('/')}`}
          className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-slate-50 dark:bg-white/5 p-8 transition-all hover:border-primary/30 hover:bg-white dark:hover:bg-white/10 hover:shadow-xl hover:shadow-primary/5 sm:text-right flex flex-col justify-center"
        >
          <div className="flex flex-col gap-3 relative z-10 sm:items-end">
            <div className="flex items-center justify-end text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
              다음 글
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
            <div className="text-xl font-black tracking-tight line-clamp-2 text-balance group-hover:text-primary transition-colors">
              {nextPost.title}
            </div>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </div>
  );
}

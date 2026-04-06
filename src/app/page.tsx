import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import VisitorCounter from "@/components/VisitorCounter";
import GuestBook from "@/components/GuestBook";

import InfiniteScrollPosts from "@/components/InfiniteScrollPosts";

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
      <section className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Welcome to Gill&apos;s Log
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            배우고, 기록하고, 성장하는 것을 좋아하는 사람의 학습 일지입니다.
          </p>
        </div>
        <div className="space-x-4">
          <Link
            href="/blog"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Read the Blog
          </Link>
          <Link
            href="/about"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            About Me
          </Link>
        </div>
      </section>

      <section className="mt-16 md:mt-24 max-w-5xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <h2 className="text-2xl font-bold uppercase tracking-widest">The Archive</h2>
          <span className="text-sm font-medium text-muted-foreground">{allPosts.length} Posts</span>
        </div>
        <InfiniteScrollPosts allPosts={allPosts} initialBatchSize={6} />
      </section>

      <section className="mt-24 mb-16">
        <GuestBook />
      </section>

      <section className="mt-12">
        <VisitorCounter />
      </section>
    </div>
  );
}

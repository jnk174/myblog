"use client";

import { useState, useEffect, useRef } from "react";
import type { PostData } from "@/lib/posts";
import PostCard from "./PostCard";

interface InfiniteScrollPostsProps {
  allPosts: PostData[];
  initialBatchSize?: number;
}

export default function InfiniteScrollPosts({
  allPosts,
  initialBatchSize = 6,
}: InfiniteScrollPostsProps) {
  const [visibleCount, setVisibleCount] = useState(initialBatchSize);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < allPosts.length) {
          setVisibleCount((prev) => Math.min(prev + 6, allPosts.length));
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [allPosts.length, visibleCount]);

  const visiblePosts = allPosts.slice(0, visibleCount);

  return (
    <div className="space-y-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <PostCard key={post.slug.join("/")} post={post} />
        ))}
      </div>
      
      {visibleCount < allPosts.length && (
        <div 
          ref={observerTarget} 
          className="h-20 flex items-center justify-center"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {visibleCount >= allPosts.length && allPosts.length > 0 && (
        <p className="text-center text-muted-foreground pt-8 italic">
          You&apos;ve reached the end of the archive.
        </p>
      )}
    </div>
  );
}

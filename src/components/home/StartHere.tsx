import PostCard from "@/components/PostCard";
import type { PostData } from "@/lib/posts";

interface StartHereProps {
  posts: PostData[];
}

export default function StartHere({ posts }: StartHereProps) {
  return (
    <section className="bg-muted/30 py-20 border-y">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">처음 오셨다면 읽기 좋은 글</h2>
          <p className="text-muted-foreground max-w-2xl">
            <span className="block">처음 오셨다면 이 글들부터 읽어보셔도 좋습니다.</span>
            <span className="block">제가 요즘 오래 붙잡고 있는 관심사들이 담겨 있습니다.</span>
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug.join("/")} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

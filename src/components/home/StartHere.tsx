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
            Gill&apos;s Log의 핵심 카테고리인 독서, 투자, 교육의 결을 가장 잘 보여주는 기록들입니다.
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
